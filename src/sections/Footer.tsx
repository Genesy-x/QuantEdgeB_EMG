import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Twitter, Bitcoin } from 'lucide-react';

export const Footer: React.FC = () => { 
  return (
    <footer className="py-12 px-4 bg-gray-950 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="https://res.cloudinary.com/dq4flimtm/image/upload/v1749311877/G-removebg-preview_lrikjg.webp" alt="QuantEdgeB Logo" className="h-12 w-12 mr-1" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-blue-300">
                QuantEdgeB
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Empowering traders and crypto investors with powerful indicators and advanced market tools.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://x.com/quantedgeb" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://whop.com/quantedgeb/?a=quantedge17" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Whop"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a 
                href="https://www.tradingview.com/u/QuantEdgeB/#published-scripts" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="TradingView"
              >
                <Bitcoin className="h-5 w-5 s-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/plans/premium" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Plans
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Products
                </a>
              </li>
               <li>
                <a href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/documentation" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-900 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} QuantEdgeB. All rights reserved.
          </p>
          <p className="mt-4 text-xs text-gray-600 max-w-3xl mx-auto px-4">
            Disclaimer: Past performance is not indicative of future results. Cryptocurrency trading involves substantial risk and is not suitable for all investors. The information provided is for educational purposes only and should not be considered as financial advice. Always conduct your own research and consult with a qualified financial advisor before making any investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};