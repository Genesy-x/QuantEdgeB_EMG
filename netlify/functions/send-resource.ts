import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event: any, context: any) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, name, title, downloadUrl } = JSON.parse(event.body);

    if (!email || !name || !title || !downloadUrl) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head> 
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Free Resource from QuantEdgeB</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #0a0c10; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #111827; border-radius: 12px; overflow: hidden; border: 1px solid #374151;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">QuantEdgeB</h1>
              <p style="margin: 8px 0 0 0; color: #bfdbfe; font-size: 16px;">Your Free Resource is Ready!</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 32px 24px;">
              <p style="margin: 0 0 16px 0; color: #e5e7eb; font-size: 18px; line-height: 1.6;">
                Hi <strong style="color: #60a5fa;">${name}</strong>,
              </p>
              
              <p style="margin: 0 0 24px 0; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                Here's your free download as promised 🎁
              </p>
              
              <p style="margin: 0 0 32px 0; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                <strong style="color: #ffffff;">${title}</strong> is now available for download.
              </p>
              
              <!-- Download Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${downloadUrl}" 
                   style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);"
                   target="_blank">
                  👉 Download Your Free Resource
                </a>
              </div>
              
              <!-- Fallback Link -->
              <p style="margin: 24px 0 0 0; color: #9ca3af; font-size: 14px; text-align: center;">
                Button not working? Copy and paste this link: <br>
                <a href="${downloadUrl}" style="color: #60a5fa; text-decoration: none;" target="_blank">${downloadUrl}</a>
              </p>
              
              <hr style="border: none; border-top: 1px solid #374151; margin: 32px 0;">
              
              <p style="margin: 0 0 16px 0; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                Want to take your trading to the next level? Check out our premium tools and strategies.
              </p>
              
              <div style="text-align: center; margin: 24px 0;">
                <a href="https://quantedgeb.com/plans/premium" 
                   style="display: inline-block; background: transparent; color: #60a5fa; text-decoration: none; padding: 12px 24px; border: 2px solid #60a5fa; border-radius: 8px; font-weight: 600; font-size: 14px;"
                   target="_blank">
                  Explore Premium Plans
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #0f172a; padding: 24px; text-align: center; border-top: 1px solid #374151;">
              <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 14px;">
                – The QuantEdgeB Team
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                Trading Made Easy.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'QuantEdgeB <onboarding@resend.dev>',
      to: [email],
      subject: `Your Free Resource: ${title}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to send email' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        emailId: data?.id 
      }),
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};