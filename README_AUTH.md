# QuantEdgeB Authentication System

## Overview
This authentication system provides user registration, login, and premium access verification for QuantEdgeB. It's designed to work seamlessly with your existing Whop subscription system.

## Features
- ✅ Email/password registration and login
- ✅ Email verification
- ✅ Whop subscription verification
- ✅ Tiered access (free vs premium)
- ✅ Protected routes
- ✅ JWT-based authentication
- ⏳ Google OAuth (ready to implement)

## Architecture
- **Frontend**: React with TypeScript, React Router
- **Backend**: Netlify Functions (serverless)
- **Database**: JSON file storage (easily migrable to Supabase)
- **Email**: Resend API
- **Authentication**: JWT tokens

## Setup Instructions

### 1. Environment Configuration
Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
- `JWT_SECRET`: Strong secret key for JWT signing
- `RESEND_API_KEY`: Your existing Resend API key
- `URL`: Your site's URL

### 2. Google OAuth Setup (Optional)
1. Create a Google Cloud Console project
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add your domain to authorized origins
5. Set `REACT_APP_GOOGLE_CLIENT_ID` in environment

### 3. Whop Integration
Currently uses mock verification. To integrate with Whop:
1. Get Whop API credentials
2. Update `/netlify/functions/auth-verify-whop.ts`
3. Replace mock verification with actual Whop API calls

## File Structure
```
src/
├── components/auth/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── ProtectedRoute.tsx
├── hooks/
│   └── useAuth.tsx
├── lib/
│   └── auth.ts
├── pages/
│   ├── DashboardPage.tsx
│   ├── VerifyEmailPage.tsx
│   └── WhopVerificationPage.tsx
└── ...

netlify/functions/
├── auth-register.ts
├── auth-login.ts
├── auth-profile.ts
├── auth-verify-email.ts
├── auth-verify-whop.ts
├── auth-logout.ts
└── utils/
    ├── database.ts
    └── email.ts
```

## User Flow
1. **Registration**: User signs up with email/password
2. **Email Verification**: User clicks link in email to verify
3. **Login**: User can log in and access dashboard
4. **Whop Verification**: User can verify premium subscription
5. **Premium Access**: Verified users get access to premium content

## Access Levels
- **Unregistered**: Public content only
- **Free Tier**: Basic dashboard, limited features
- **Premium Tier**: Full access to all content and tools

## API Endpoints
- `POST /.netlify/functions/auth-register` - User registration
- `POST /.netlify/functions/auth-login` - User login
- `GET /.netlify/functions/auth-profile` - Get user profile
- `POST /.netlify/functions/auth-verify-email` - Verify email
- `POST /.netlify/functions/auth-verify-whop` - Verify Whop subscription
- `POST /.netlify/functions/auth-logout` - Logout user

## Database Migration to Supabase
The current JSON file storage can be easily migrated to Supabase:

1. Create Supabase project
2. Update `utils/database.ts` to use Supabase client
3. Migrate user data
4. Update environment variables

## Security Features
- Password hashing with bcrypt
- JWT token authentication
- Email verification required
- Protected routes
- Secure session management

## Testing
- Test registration flow
- Test email verification
- Test Whop verification (mock)
- Test protected routes
- Test logout functionality

## Future Enhancements
- Google OAuth implementation
- Password reset functionality
- User profile management
- Admin dashboard
- Analytics integration
- Real Whop API integration