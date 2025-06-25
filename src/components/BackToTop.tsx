import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop} 
          className="fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r from-blue-900 to-blue-1000 /80 backdrop-blur-sm 
                   hover:bg-blue-800 transition-all duration-300 z-50 shadow-[0_0_15px_rgba(30,64,175,0.5)]
                   hover:shadow-[0_0_20px_rgba(30,64,175,0.8)] group"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5 text-white group-hover:animate-pulse" />
        </button>
      )}
    </>
  );
};