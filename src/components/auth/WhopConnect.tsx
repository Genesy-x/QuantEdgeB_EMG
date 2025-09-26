import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '../ui/neon-button';
import { useAuth } from '../../hooks/useAuth';
import { getToken } from '../../lib/auth';

export const WhopConnect: React.FC = () => {
  const { user } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [message, setMessage] = useState('');

  const handleWhopConnect = () => {
    const token = getToken();
    
    if (!token) {
      setMessage('Please log in first to connect your Whop account');
      return;
    }

    setIsConnecting(true);
    
    // Use the official Whop OAuth flow via our Netlify function
    const whopOAuthUrl = `/.netlify/functions/auth-whop-init?token=${encodeURIComponent(token)}&next=${encodeURIComponent('/dashboard')}`;
    
    // Redirect to start OAuth flow
    window.location.href = whopOAuthUrl;
  };

  const handleManualVerify = () => {
    // Redirect to manual verification
    window.location.href = '/dashboard/verify-whop';
  };

  if (user?.whopVerified) {
    return (
      <div className="bg-green-900/20 border border-green-700/50 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <div>
            <h3 className="text-lg font-semibold text-white">Premium Access Active</h3>
            <p className="text-green-200 text-sm">Your Whop subscription is verified</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-700/50 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Shield className="h-6 w-6 text-blue-400 mr-3" />
        Connect Your Whop Account
      </h3>
      
      <p className="text-blue-200 mb-6 text-sm">
        Connect your Whop account to automatically verify your Alpha subscription and unlock all QuantEdgeB features.
      </p>

      {message && (
        <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
          <p className="text-yellow-400 text-sm">{message}</p>
        </div>
      )}

      <div className="space-y-4">
        {/* Primary: Official Whop Connect */}
        <Button
          onClick={handleWhopConnect}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
        >
          <div className="flex items-center justify-center">
            <ExternalLink className="h-5 w-5 mr-2" />
            {isConnecting ? 'Redirecting to Whop...' : 'Connect with Whop'}
          </div>
        </Button>

        {/* Alternative: Manual Verification */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Or verify manually:</p>
          <Button
            onClick={handleManualVerify}
            variant="ghost"
            className="w-full border border-gray-600 text-gray-300 hover:bg-gray-800/50"
          >
            Enter Whop Email Manually
          </Button>
        </div>

        {/* Link to Purchase */}
        <div className="pt-4 border-t border-gray-700">
          <p className="text-center text-sm text-gray-400 mb-3">
            Don't have a subscription yet?
          </p>
          <a 
            href="https://whop.com/quantedgeb-premium/?a=quantedge17"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Get Alpha Access
          </a>
        </div>
      </div>
    </div>
  );
};