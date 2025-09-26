import { Handler } from '@netlify/functions';
import jwt from 'jsonwebtoken';
import { WhopServerSdk } from '@whop/api';
import { setWhopVerified } from './utils/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';

// Initialize Whop SDK
const whopApi = WhopServerSdk({
  appApiKey: process.env.WHOP_API_KEY!,
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID,
});

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
    
    const { whopToken, membershipId, whopUserId } = JSON.parse(event.body || '{}');

    if (!whopToken || !membershipId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Missing verification data' }),
      };
    }

    // Verify the Whop token and get user info
    const userInfo = await whopApi.oauth.getUserInfo(whopToken);
    
    if (!userInfo.ok) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to verify Whop token' 
        }),
      };
    }

    // Get user memberships to double-check
    const userMemberships = await whopApi.oauth.getUserMemberships(whopToken);
    
    if (!userMemberships.ok) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to verify membership status' 
        }),
      };
    }

    // Verify the membership is still valid
    const validMembership = userMemberships.memberships.find((membership: any) => {
      return membership.id === membershipId && 
             membership.valid === true && 
             membership.status === 'completed' &&
             membership.product?.company_id === process.env.NEXT_PUBLIC_WHOP_COMPANY_ID;
    });

    if (!validMembership) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Membership is no longer valid or does not belong to QuantEdgeB' 
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
        message: 'Whop verification completed successfully! You now have premium access.',
        user: updatedUser,
        membership: {
          id: validMembership.id,
          product: validMembership.product?.title,
          plan: validMembership.plan?.title,
          whopUserId: userInfo.user.id
        }
      }),
    };

  } catch (error) {
    console.error('Whop verification completion error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to complete verification. Please try again.'
      }),
    };
  }
};