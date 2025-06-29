import React, { useState } from 'react';
import { X, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-900/80 to-blue-800/80 backdrop-blur-sm border-b border-blue-700/30">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-center text-center relative">
          <Link 
            to="/documentation" 
            className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors group"
          >
            <Download className="h-4 w-4 group-hover:animate-pulse" />
            <span className="text-sm font-medium">
              Free Indicators Available
            </span>
          </Link>
          
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-0 text-white/70 hover:text-white transition-colors p-1"
            aria-label="Close announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};