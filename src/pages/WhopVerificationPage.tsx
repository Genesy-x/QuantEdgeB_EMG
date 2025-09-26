import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Shield, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/neon-button';
import { useAuth } from '../hooks/useAuth';

export const WhopVerificationPage: React.FC = () => {
  const { user, verifyWhopEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage('Please enter your Whop email address');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const result = await verifyWhopEmail(email);
      if (result.success) {
        setIsSuccess(true);
        setMessage(result.message || 'Verification successful!');
      } else {
        setIsSuccess(false);
        setMessage(result.message || 'Verification failed');
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.whopVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-black">
        <div className="max-w-md w-full text-center">
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Already Verified!</h2>
            <p className="text-gray-400 mb-6">
              Your Whop subscription is already verified and you have premium access.
            </p>
            <Link 
              to="/dashboard"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/dashboard" className="inline-block mb-6">
            <img 
              src="https://res.cloudinary.com/dq4flimtm/image/upload/v1749311877/G-removebg-preview_lrikjg.webp" 
              alt="QuantEdgeB Logo" 
              className="h-16 w-16 mx-auto"
            />
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Verify Whop Subscription</h2>
          <p className="text-gray-400">
            Enter the email address associated with your Whop subscription to unlock premium features.
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
          {/* Information Section */}
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-200 mb-1">How It Works</h3>
                <p className="text-xs text-blue-300">
                  We'll verify your email against our Whop subscriber database. If found, you'll get instant premium access to all QuantEdgeB tools.
                </p>
              </div>
            </div>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              isSuccess 
                ? 'bg-green-900/20 border border-green-700' 
                : 'bg-red-900/20 border border-red-700'
            }`}>
              <p className={`text-sm ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your Whop email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                         focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
                         transition-all duration-300 text-white placeholder-gray-400
                         disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full text-white"
              disabled={isLoading}
            >
              <div className="flex items-center justify-center">
                <Shield className="h-5 w-5 mr-2" />
                {isLoading ? 'Verifying...' : 'Verify Subscription'}
              </div>
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-center text-sm text-gray-400 mb-4">
              Don't have a Whop subscription yet?
            </p>
            <a 
              href="https://whop.com/quantedgeb-premium/?a=quantedge17"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Get Premium Access
            </a>
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            <Link to="/dashboard" className="text-blue-400 hover:text-blue-300 transition-colors">
              ← Back to Dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};