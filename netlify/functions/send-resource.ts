import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event: any) => {
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
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { email, name, title, downloadUrl } = JSON.parse(event.body);

    // Validate required fields
    if (!email || !name || !title) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: 'Email service not configured' }),
      };
    }

    await resend.emails.send({
      from: 'QuantEdgeB <onboarding@resend.dev>', // Use verified domain
      to: [email],
      subject: `Your Free Download: ${title}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0c10; color: #ffffff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent; margin: 0; font-size: 32px; font-weight: bold;">QuantEdgeB</h1>
            <p style="color: #60a5fa; margin: 8px 0 0 0; font-size: 14px;">Trading Made Easy</p>
          </div>
          
          <h2 style="color: #3b82f6;">Hi ${name},</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #ffffff;">Here's your free download as promised 🎁</p>
          
          <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 1px; border-radius: 12px; margin: 30px 0;">
            <div style="background-color: #111827; padding: 24px; border-radius: 11px;">
              <h3 style="color: #60a5fa; margin-top: 0; font-size: 20px;">${title}</h3>
              <p style="color: #d1d5db; margin-bottom: 20px;">Your requested resource is ready for download.</p>
              <a href="${downloadUrl || 'https://quantedgeb.com'}" 
                 target="_blank" 
                 style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                👉 Download Now
              </a>
            </div>
          </div>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #111827; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <p style="color: #d1d5db; margin: 0; font-size: 14px;">
              <strong style="color: #60a5fa;">Want to take your trading to the next level?</strong><br>
              Check out our premium tools and strategies designed to give you a real edge in the markets.
            </p>
            <a href="https://quantedgeb.com/plans/premium" 
               target="_blank" 
               style="display: inline-block; margin-top: 12px; color: #60a5fa; text-decoration: none; font-weight: 600; border: 2px solid #60a5fa; padding: 8px 16px; border-radius: 6px; font-size: 14px;">
              Explore Premium Plans
            </a>
          </div>
          
          <p style="font-size: 14px; color: #9ca3af;">– The QuantEdgeB Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #374151;">
          <p style="font-size: 12px; color: #6b7280;">
            This email was sent because you requested a free resource from QuantEdgeB. 
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Resend API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};