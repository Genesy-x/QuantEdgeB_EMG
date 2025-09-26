import { Handler } from '@netlify/functions';
import jwt from 'jsonwebtoken';
import { getUserById, setWhopVerified } from './utils/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';

// Whop API integration
async function checkWhopSubscription(email: string): Promise<boolean> {
  const WHOP_API_KEY = process.env.WHOP_API_KEY;
  const WHOP_COMPANY_ID = process.env.NEXT_PUBLIC_WHOP_COMPANY_ID;

  if (!WHOP_API_KEY || !WHOP_COMPANY_ID) {
    console.error('Missing Whop API credentials');
    return false;
  }

  try {
    // Get all memberships for the company
    const response = await fetch(`https://api.whop.com/api/v2/memberships`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${WHOP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      // Add query parameters to filter by company
      body: null
    });

    if (!response.ok) {
      console.error('Whop API error:', response.status, response.statusText);
      return false;
    }

    const data = await response.json();
    
    // Check if any membership has the provided email and is valid
    const memberships = data.data || [];
    const validMembership = memberships.find((membership: any) => {
      return membership.email?.toLowerCase() === email.toLowerCase() && 
             membership.valid === true &&
             membership.status === 'completed';
    });

    return !!validMembership;

  } catch (error) {
    console.error('Whop API call failed:', error);
    return false;
  }
}

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
      body: JSON.stringify({ message: 'Method Not Allowed' }),
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
    
    const { email } = JSON.parse(event.body || '{}');

    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Email is required' }),
      };
    }

    // Real Whop verification
    const isWhopSubscriber = await checkWhopSubscription(email);

    if (!isWhopSubscriber) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Email not found in active Whop subscriptions. Please ensure you\'re using the correct email address and have an active subscription.' 
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
        message: 'Whop email verified successfully! You now have premium access.',
        user: updatedUser
      }),
    };

  } catch (error) {
    console.error('Whop verification error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Verification failed. Please try again later.'
      }),
    };
  }
};