import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Mail } from 'lucide-react';
import { authAPI } from '../lib/auth';
import { LoadingSpinner } from '../components/ui/loading-spinner';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      try {
        const response = await authAPI.verifyEmail(token);
        if (response.success) {
          setStatus('success');
          setMessage('Email verified successfully!');
        } else {
          setStatus('error');
          setMessage(response.message || 'Verification failed');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred during verification');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="max-w-md w-full text-center">
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
          <Link to="/" className="inline-block mb-6">
            <img 
              src="https://res.cloudinary.com/dq4flimtm/image/upload/v1749311877/G-removebg-preview_lrikjg.webp" 
              alt="QuantEdgeB Logo" 
              className="h-16 w-16 mx-auto"
            />
          </Link>

          {status === 'loading' && (
            <>
              <LoadingSpinner />
              <h2 className="text-2xl font-bold text-white mt-4 mb-2">Verifying Email</h2>
              <p className="text-gray-400">Please wait while we verify your email address...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Email Verified!</h2>
              <p className="text-gray-400 mb-6">{message}</p>
              <Link 
                to="/auth/login"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Sign In to Your Account
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
              <p className="text-gray-400 mb-6">{message}</p>
              <div className="space-y-3">
                <Link 
                  to="/auth/register"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Create New Account
                </Link>
                <Link 
                  to="/auth/login"
                  className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};