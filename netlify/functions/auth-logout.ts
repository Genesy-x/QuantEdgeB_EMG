import { Handler } from '@netlify/functions';
import { deleteSession } from './utils/database';

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
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      await deleteSession(token);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Logged out successfully' }),
    };

  } catch (error) {
    console.error('Logout error:', error);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Logged out' }),
    };
  }
};