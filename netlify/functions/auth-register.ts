import { Handler } from '@netlify/functions';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createTransporter } from './utils/email';
import { createUser, getUserByEmail } from './utils/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';
const SITE_URL = process.env.URL || 'http://localhost:3000';

export const handler: Handler = async (event) => {
  // Handle CORS
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
    const { email, password, name } = JSON.parse(event.body || '{}');

    // Validation
    if (!email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Email and password are required' }),
      };
    }

    if (password.length < 6) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Password must be at least 6 characters' }),
      };
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'User already exists with this email' }),
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await createUser({
      email,
      password: hashedPassword,
      name: name || email.split('@')[0],
      verified: false,
      whopVerified: false,
      tier: 'free',
      createdAt: new Date().toISOString()
    });

    // Generate email verification token
    const verificationToken = jwt.sign(
      { userId: user.id, type: 'email_verification' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send verification email
    try {
      const transporter = createTransporter();
      const verificationUrl = `${SITE_URL}/auth/verify-email?token=${verificationToken}`;

      await transporter.sendMail({
        from: '"QuantEdgeB" <noreply@quantedgeb.co>',
        to: email,
        subject: 'Verify Your QuantEdgeB Account',
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0c10; color: #ffffff;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent; margin: 0; font-size: 32px; font-weight: bold;">QuantEdgeB</h1>
              <p style="color: #60a5fa; margin: 8px 0 0 0; font-size: 14px;">Trading Made Easy</p>
            </div>
            
            <h2 style="color: #3b82f6;">Welcome to QuantEdgeB!</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #ffffff;">Thanks for signing up! To complete your registration, please verify your email address.</p>
            
            <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 1px; border-radius: 12px; margin: 30px 0;">
              <div style="background-color: #111827; padding: 24px; border-radius: 11px; text-align: center;">
                <a href="${verificationUrl}" 
                   target="_blank" 
                   style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                  ✅ Verify Email Address
                </a>
                <p style="color: #d1d5db; margin-top: 16px; font-size: 14px;">This link expires in 24 hours.</p>
              </div>
            </div>
            
            <p style="font-size: 14px; color: #9ca3af;">– The QuantEdgeB Team</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #374151;">
            <p style="font-size: 12px; color: #6b7280;">
              If you didn't create an account, you can safely ignore this email.
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue even if email fails
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Registration successful! Please check your email to verify your account.'
      }),
    };

  } catch (error) {
    console.error('Registration error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Internal server error'
      }),
    };
  }
};