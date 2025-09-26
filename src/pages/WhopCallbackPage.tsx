import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/loading-spinner';

export const WhopCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleWhopCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const state = searchParams.get('state'); // This should be the user ID

      if (error) {
        setStatus('error');
        setMessage('Connection cancelled or failed');
        return;
      }

      if (!code) {
        setStatus('error');
        setMessage('Invalid callback - no authorization code received');
        return;
      }

      try {
        // Exchange code for access token and verify subscription
        const response = await fetch('/.netlify/functions/auth-whop-callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('quantedgeb_token')}`
          },
          body: JSON.stringify({ code, state })
        });

        const result = await response.json();

        if (result.success) {
          setStatus('success');
          setMessage('Whop account connected successfully!');
          
          // Close popup and refresh parent window
          setTimeout(() => {
            if (window.opener) {
              window.opener.postMessage({ type: 'whop-success', data: result }, '*');
              window.close();
            } else {
              window.location.href = '/dashboard';
            }
          }, 2000);
        } else {
          setStatus('error');
          setMessage(result.message || 'Failed to connect Whop account');
        }

      } catch (error) {
        setStatus('error');
        setMessage('Network error occurred');
      }
    };

    handleWhopCallback();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="max-w-md w-full text-center">
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
          <img 
            src="https://res.cloudinary.com/dq4flimtm/image/upload/v1749311877/G-removebg-preview_lrikjg.webp" 
            alt="QuantEdgeB Logo" 
            className="h-16 w-16 mx-auto mb-6"
          />

          {status === 'loading' && (
            <>
              <Loader className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-bold text-white mb-2">Connecting...</h2>
              <p className="text-gray-400">Verifying your Whop subscription</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
              <p className="text-gray-400 mb-4">{message}</p>
              <p className="text-sm text-gray-500">This window will close automatically...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Connection Failed</h2>
              <p className="text-gray-400 mb-6">{message}</p>
              <button 
                onClick={() => window.close()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Close Window
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};