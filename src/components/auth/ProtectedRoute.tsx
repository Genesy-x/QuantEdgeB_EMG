import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../ui/loading-spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePremium?: boolean;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requirePremium = false,
  fallback 
}) => {
  const { isLoading, isAuthenticated, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-gray-400 mb-6">
            You need to be logged in to access this content.
          </p>
          <a 
            href="/auth/login" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (requirePremium && user && !user.whopVerified) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Premium Access Required</h2>
          <p className="text-gray-400 mb-6">
            This content is only available for premium members. Verify your Whop subscription or upgrade your account.
          </p>
          <div className="space-y-3">
            <a 
              href="/dashboard/verify-whop" 
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Verify Whop Subscription
            </a>
            <a 
              href="https://whop.com/quantedgeb-premium/?a=quantedge17" 
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Upgrade to Premium
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};