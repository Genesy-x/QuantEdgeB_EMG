import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { XCircle, AlertTriangle } from 'lucide-react';

export const WhopErrorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'missing_code':
        return 'Authorization code was not received from Whop. Please try connecting again.';
      case 'missing_state':
        return 'Invalid authentication state. Please try connecting again.';
      case 'code_exchange_failed':
        return 'Failed to exchange authorization code with Whop. Please try again.';
      case 'membership_fetch_failed':
        return 'Unable to fetch your Whop membership information. Please try again.';
      case 'no_valid_subscription':
        return 'No active QuantEdgeB subscription found on your Whop account. Please ensure you have an active subscription.';
      case 'server_error':
        return 'A server error occurred during verification. Please try again later.';
      default:
        return 'An unknown error occurred during Whop connection. Please try again.';
    }
  };

  const getErrorIcon = (errorCode: string | null) => {
    if (errorCode === 'no_valid_subscription') {
      return <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />;
    }
    return <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />;
  };

  const getErrorTitle = (errorCode: string | null) => {
    if (errorCode === 'no_valid_subscription') {
      return 'No Active Subscription';
    }
    return 'Connection Failed';
  };

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

          {getErrorIcon(error)}
          <h2 className="text-2xl font-bold text-white mb-2">{getErrorTitle(error)}</h2>
          <p className="text-gray-400 mb-6">{getErrorMessage(error)}</p>
          
          <div className="space-y-3">
            {error === 'no_valid_subscription' ? (
              <>
                <a 
                  href="https://whop.com/quantedgeb-premium/?a=quantedge17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Get Premium Subscription
                </a>
                <Link 
                  to="/dashboard"
                  className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Back to Dashboard
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {error && (
            <p className="mt-6 text-xs text-gray-500">
              Error Code: {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};