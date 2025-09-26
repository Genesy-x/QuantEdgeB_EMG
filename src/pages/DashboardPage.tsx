import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Settings, Shield, Star, Mail, LogOut, User } from 'lucide-react';
import { Button } from '../components/ui/neon-button';
import { WhopConnect } from '../components/auth/WhopConnect';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getWelcomeMessage = () => {
    if (user.whopVerified) {
      return `Welcome back, ${user.name || 'Premium Member'}!`;
    }
    return `Welcome, ${user.name || 'Trader'}!`;
  };

  const getTierBadge = () => {
    if (user.whopVerified) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <Star className="h-4 w-4 mr-1" />
          Premium Member
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300">
        Free Tier
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center">
                <img 
                  src="https://res.cloudinary.com/dq4flimtm/image/upload/v1749311877/G-removebg-preview_lrikjg.webp" 
                  alt="QuantEdgeB Logo" 
                  className="h-12 w-12"
                />
                <span className="ml-3 text-xl font-bold">QuantEdgeB</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {getTierBadge()}
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-gray-300 hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {getWelcomeMessage()}
          </h1>
          <p className="text-gray-400">
            Manage your account and access your trading tools.
          </p>
        </div>

        {/* Account Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Account Status</h3>
                <p className="text-gray-400">
                  {user.verified ? 'Email verified ✓' : 'Email not verified'}
                </p>
              </div>
              <Mail className={`h-8 w-8 ${user.verified ? 'text-green-500' : 'text-yellow-500'}`} />
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Premium Access</h3>
                <p className="text-gray-400">
                  {user.whopVerified ? 'Active subscription' : 'Free tier'}
                </p>
              </div>
              <Shield className={`h-8 w-8 ${user.whopVerified ? 'text-blue-500' : 'text-gray-500'}`} />
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Member Since</h3>
                <p className="text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <User className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Verification Section */}
        {!user.whopVerified && (
          <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-700/50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Unlock Premium Features</h3>
            <p className="text-blue-200 mb-6">
              Already have a Whop subscription? Verify your email to get premium access to all QuantEdgeB tools and content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard/verify-whop">
                <Button variant="default" className="w-full sm:w-auto">
                  Verify Whop Subscription
                </Button>
              </Link>
              <a 
                href="https://whop.com/quantedgeb-premium/?a=quantedge17"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" className="w-full sm:w-auto border border-blue-500 text-blue-400 hover:bg-blue-900/20">
                  Get Premium Access
                </Button>
              </a>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            to="/dashboard/profile"
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <Settings className="h-8 w-8 text-blue-500 group-hover:text-blue-400 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Profile Settings</h3>
            <p className="text-gray-400 text-sm">
              Update your account information and preferences
            </p>
          </Link>

          {user.whopVerified && (
            <Link 
              to="/premium-content"
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <Star className="h-8 w-8 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Premium Content</h3>
              <p className="text-gray-400 text-sm">
                Access exclusive trading tools and analysis
              </p>
            </Link>
          )}

          <Link 
            to="/documentation"
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <Mail className="h-8 w-8 text-green-500 group-hover:text-green-400 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Documentation</h3>
            <p className="text-gray-400 text-sm">
              Learn how to use QuantEdgeB tools effectively
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};