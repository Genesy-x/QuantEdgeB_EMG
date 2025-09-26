import { Handler } from '@netlify/functions';
import jwt from 'jsonwebtoken';
import { setWhopVerified } from './utils/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' }),
    };
  }

  try {
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ success: false, message: 'No token provided' }),
      };
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    
    const { code, state } = JSON.parse(event.body || '{}');

    if (!code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Authorization code is required' }),
      };
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://api.whop.com/api/v2/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_WHOP_APP_ID,
        client_secret: process.env.WHOP_CLIENT_SECRET, // You'll need this
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.URL}/auth/whop-callback`
      })
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Whop token exchange failed:', errorData);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to exchange authorization code'
        }),
      };
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get user's memberships using the access token
    const membershipsResponse = await fetch('https://api.whop.com/api/v2/me/memberships', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!membershipsResponse.ok) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to fetch membership information'
        }),
      };
    }

    const membershipsData = await membershipsResponse.json();
    const memberships = membershipsData.data || [];

    // Check if user has any valid memberships for your company
    const validMembership = memberships.find((membership: any) => {
      return membership.valid === true && 
             membership.status === 'completed' &&
             membership.product?.company_id === process.env.NEXT_PUBLIC_WHOP_COMPANY_ID;
    });

    if (!validMembership) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'No active QuantEdgeB subscription found on your Whop account'
        }),
      };
    }

    // Update user's Whop verification status
    const updatedUser = await setWhopVerified(decoded.userId, true);
    
    if (!updatedUser) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ success: false, message: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Whop account connected successfully! You now have premium access.',
        user: updatedUser,
        membership: {
          product: validMembership.product?.title,
          plan: validMembership.plan?.title
        }
      }),
    };

  } catch (error) {
    console.error('Whop callback error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Connection failed. Please try again.'
      }),
    };
  }
};