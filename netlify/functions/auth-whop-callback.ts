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
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed - use GET' }),
    };
  }

  try {
    // Get code and state from query parameters (this is a GET request from Whop redirect)
    const url = new URL(event.rawUrl || `https://example.com${event.path}?${event.rawQuery || ''}`);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code) {
      return {
        statusCode: 302,
        headers: {
          ...headers,
          'Location': '/auth/whop-error?error=missing_code'
        },
        body: ''
      };
    }

    if (!state) {
      return {
        statusCode: 302,
        headers: {
          ...headers,
          'Location': '/auth/whop-error?error=missing_state'
        },
        body: ''
      };
    }

    // Exchange the code for a token using official Whop SDK
    const authResponse = await whopApi.oauth.exchangeCode({
      code,
      redirectUri: `${process.env.URL}/auth/whop-callback`,
    });

    if (!authResponse.ok) {
      console.error('Whop OAuth exchange failed:', authResponse.error);
      return {
        statusCode: 302,
        headers: {
          ...headers,
          'Location': '/auth/whop-error?error=code_exchange_failed'
        },
        body: ''
      };
    }

    const { access_token } = authResponse.tokens;

    // Get user's memberships using the access token
    const userMemberships = await whopApi.oauth.getUserMemberships(access_token);

    if (!userMemberships.ok) {
      console.error('Failed to get user memberships:', userMemberships.error);
      return {
        statusCode: 302,
        headers: {
          ...headers,
          'Location': '/auth/whop-error?error=membership_fetch_failed'
        },
        body: ''
      };
    }

    // Check if user has any valid memberships for your company
    const validMembership = userMemberships.memberships.find((membership: any) => {
      return membership.valid === true && 
             membership.status === 'completed' &&
             membership.product?.company_id === process.env.NEXT_PUBLIC_WHOP_COMPANY_ID;
    });

    if (!validMembership) {
      return {
        statusCode: 302,
        headers: {
          ...headers,
          'Location': '/auth/whop-error?error=no_valid_subscription'
        },
        body: ''
      };
    }

    // Get user info
    const userInfo = await whopApi.oauth.getUserInfo(access_token);
    
    // The state parameter should contain our user ID (we need to modify the frontend to include this)
    // For now, we'll redirect to a success page that will handle the verification client-side
    return {
      statusCode: 302,
      headers: {
        ...headers,
        'Location': `/auth/whop-success?token=${access_token}&membership=${validMembership.id}&user=${userInfo.ok ? userInfo.user.id : 'unknown'}`
      },
      body: ''
    };

  } catch (error) {
    console.error('Whop callback error:', error);
    return {
      statusCode: 302,
      headers: {
        ...headers,
        'Location': '/auth/whop-error?error=server_error'
      },
      body: ''
    };
  }
};