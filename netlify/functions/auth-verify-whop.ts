import { Handler } from '@netlify/functions';
import jwt from 'jsonwebtoken';
import { getUserById, setWhopVerified } from './utils/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';

// Mock Whop verification - replace with actual Whop API integration
const mockWhopEmails = [
  'test@example.com',
  'premium@quantedgeb.com',
  'alpha@test.com'
];

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

    // Mock Whop verification - replace with actual API call to Whop
    // Example: const isWhopSubscriber = await checkWhopSubscription(email);
    const isWhopSubscriber = mockWhopEmails.includes(email.toLowerCase());

    if (!isWhopSubscriber) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Email not found in Whop subscriptions. Please ensure you\'re using the correct email address.' 
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
      statusCode: 401,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Invalid token or verification failed'
      }),
    };
  }
};