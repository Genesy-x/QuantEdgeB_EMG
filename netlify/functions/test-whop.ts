import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const WHOP_API_KEY = process.env.WHOP_API_KEY;
  const WHOP_COMPANY_ID = process.env.NEXT_PUBLIC_WHOP_COMPANY_ID;

  if (!WHOP_API_KEY || !WHOP_COMPANY_ID) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Missing Whop credentials',
        hasApiKey: !!WHOP_API_KEY,
        hasCompanyId: !!WHOP_COMPANY_ID
      }),
    };
  }

  try {
    // Test Whop API connectivity
    const response = await fetch('https://api.whop.com/api/v2/memberships?limit=5', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${WHOP_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: response.ok,
        status: response.status,
        message: response.ok ? 'Whop API connection successful!' : 'Whop API connection failed',
        data: response.ok ? {
          membershipCount: responseData.data?.length || 0,
          hasData: !!responseData.data
        } : {
          error: responseData,
          statusText: response.statusText
        },
        credentials: {
          hasApiKey: !!WHOP_API_KEY,
          hasCompanyId: !!WHOP_COMPANY_ID,
          apiKeyPreview: WHOP_API_KEY ? `${WHOP_API_KEY.substring(0, 8)}...` : 'missing'
        }
      }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Network error connecting to Whop API',
        error: error.message
      }),
    };
  }
};