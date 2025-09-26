import { Handler } from '@netlify/functions';
import jwt from 'jsonwebtoken';
import { WhopServerSdk } from '@whop/api';

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
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed - use GET' }),
    };
  }

  try {
    // Get the user's JWT token from query params or headers
    const url = new URL(event.rawUrl || `https://example.com${event.path}?${event.rawQuery || ''}`);
    const userToken = url.searchParams.get('token') || event.headers.authorization?.replace('Bearer ', '');
    const next = url.searchParams.get('next') || '/dashboard';

    if (!userToken) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'User authentication required. Please log in first.' 
        }),
      };
    }

    // Verify the user's JWT token
    let decoded;
    try {
      decoded = jwt.verify(userToken, JWT_SECRET) as { userId: string; email: string };
    } catch (error) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Invalid authentication token' 
        }),
      };
    }

    // Setup the OAuth flow using official Whop SDK
    const { url: authUrl, state } = whopApi.oauth.getAuthorizationUrl({
      // This has to be defined in the redirect URIs in Whop dashboard
      redirectUri: `${process.env.URL}/auth/whop-callback`,
      // These are the authorization scopes you want to request from the user
      scope: ['read_user', 'read_memberships'],
    });

    // Store the user ID and next URL in the state for retrieval after callback
    // In a production app, you'd store this more securely (database, encrypted cookie, etc.)
    const stateData = {
      userId: decoded.userId,
      next: next,
      timestamp: Date.now()
    };

    // For simplicity, we'll include the user ID in the URL state parameter
    // In production, store this server-side with the state as a key
    const enhancedAuthUrl = new URL(authUrl);
    enhancedAuthUrl.searchParams.set('state', `${state}:${decoded.userId}:${encodeURIComponent(next)}`);

    // Redirect to Whop OAuth
    return {
      statusCode: 302,
      headers: {
        ...headers,
        'Location': enhancedAuthUrl.toString()
      },
      body: ''
    };

  } catch (error) {
    console.error('Whop OAuth init error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to initiate OAuth flow'
      }),
    };
  }
};