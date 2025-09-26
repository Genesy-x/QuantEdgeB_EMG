import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { authAPI } from '../lib/auth';

export const WhopSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('');
  const { refreshUser } = useAuth();

  useEffect(() => {
    const processWhopSuccess = async () => {
      const whopToken = searchParams.get('token');
      const membershipId = searchParams.get('membership');
      const whopUserId = searchParams.get('user');

      if (!whopToken || !membershipId) {
        setStatus('error');
        setMessage('Missing verification data. Please try connecting again.');
        return;
      }

      try {
        // Call our backend to complete the Whop verification
        const response = await fetch('/.netlify/functions/auth-complete-whop-verification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('quantedgeb_token')}`
          },
          body: JSON.stringify({
            whopToken,
            membershipId,
            whopUserId
          })
        });

        const result = await response.json();

        if (result.success) {
          setStatus('success');
          setMessage('Your Whop subscription has been verified! You now have premium access.');
          
          // Refresh user data to update the UI
          await refreshUser();
        } else {
          setStatus('error');
          setMessage(result.message || 'Failed to complete verification');
        }

      } catch (error) {
        setStatus('error');
        setMessage('Network error occurred while completing verification');
      }
    };

    processWhopSuccess();
  }, [searchParams, refreshUser]);

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

          {status === 'processing' && (
            <>
              <Loader className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-bold text-white mb-2">Completing Verification</h2>
              <p className="text-gray-400">Processing your Whop subscription verification...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Verification Complete!</h2>
              <p className="text-gray-400 mb-6">{message}</p>
              <div className="space-y-3">
                <Link 
                  to="/dashboard"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Go to Dashboard
                </Link>
                <Link 
                  to="/premium-content"
                  className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Access Premium Content
                </Link>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="h-16 w-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❌</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
              <p className="text-gray-400 mb-6">{message}</p>
              <div className="space-y-3">
                <Link 
                  to="/dashboard"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Try Again
                </Link>
                <Link 
                  to="/dashboard/verify-whop"
                  className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Manual Verification
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};