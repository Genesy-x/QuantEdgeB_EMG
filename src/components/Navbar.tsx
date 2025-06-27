import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, X, Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [plansDropdownOpen, setPlansDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleContactClick = () => {
    setMobileMenuOpen(false);
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll to contact
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // If we're already on the home page, just scroll to contact
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHomePage = location.pathname === '/';

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center">
              <img src="https://res.cloudinary.com/dq4flimtm/image/upload/v1749311877/G-removebg-preview_lrikjg.webp" alt="QuantEdgeB Logo" className="h-16 w-16 mr-1" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                QuantEdgeB
              </span>
            </Link>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/products" 
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                Products
                {/* Existing effect */}
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-0 group-hover:opacity-100 shadow-[0_0_10px_rgba(59,130,246,0.5)] blur-[1px]"></span>
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-0 group-hover:opacity-70"></span>
                
                {/* New neon effect */}
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-t-full transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <span className="absolute w-12 h-6 bg-blue-500/20 rounded-full blur-md -top-2 -left-2" />
                  <span className="absolute w-8 h-6 bg-blue-500/20 rounded-full blur-md -top-1" />
                  <span className="absolute w-4 h-4 bg-blue-500/20 rounded-full blur-sm top-0 left-2" />
                </span>
              </Link>
              
              {/* Plans Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setPlansDropdownOpen(true)}
                onMouseLeave={() => setPlansDropdownOpen(false)}
              >
                <button className="text-gray-300 hover:text-white transition-colors relative group flex items-center">
                  Plans
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${plansDropdownOpen ? 'rotate-180' : ''}`} />
                  {/* Existing effect */}
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-0 group-hover:opacity-100 shadow-[0_0_10px_rgba(59,130,246,0.5)] blur-[1px]"></span>
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-0 group-hover:opacity-70"></span>
                  
                  {/* New neon effect */}
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-t-full transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <span className="absolute w-12 h-6 bg-blue-500/20 rounded-full blur-md -top-2 -left-2" />
                    <span className="absolute w-8 h-6 bg-blue-500/20 rounded-full blur-md -top-1" />
                    <span className="absolute w-4 h-4 bg-blue-500/20 rounded-full blur-sm top-0 left-2" />
                  </span>
                </button>
                
                {plansDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-48">
                    <div className="bg-black/70 backdrop-blur-md rounded-lg border border-gray-700/50 shadow-xl overflow-hidden">
                      <Link 
                        to="/plans/fundamental" 
                        className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-black/40 transition-all duration-200"
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        Fundamental
                      </Link>
                      <Link 
                        to="/plans/premium" 
                        className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-black/40 transition-all duration-200"
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        Premium+
                      </Link>
                      <Link 
                        to="/plans/alpha" 
                        className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-black/40 transition-all duration-200"
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        Alpha
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <Link 
                to="/about" 
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                About Us
                {/* Existing effect */}
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-0 group-hover:opacity-100 shadow-[0_0_10px_rgba(59,130,246,0.5)] blur-[1px]"></span>
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-0 group-hover:opacity-70"></span>
                
                {/* New neon effect */}
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-t-full transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <span className="absolute w-12 h-6 bg-blue-500/20 rounded-full blur-md -top-2 -left-2" />
                  <span className="absolute w-8 h-6 bg-blue-500/20 rounded-full blur-md -top-1" />
                  <span className="absolute w-4 h-4 bg-blue-500/20 rounded-full blur-sm top-0 left-2" />
                </span>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile menu sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-md border-l border-gray-700/50 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center">
              <img src="https://res.cloudinary.com/dq4flimtm/image/upload/v1749311877/G-removebg-preview_lrikjg.webp" alt="QuantEdgeB Logo" className="h-10 w-10 mr-2" />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                QuantEdgeB
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Menu items */}
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="px-6 space-y-2">
              <Link 
                to="/products" 
                className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-lg">Products</span>
              </Link>
              
              {/* Plans section */}
              <div className="space-y-1">
                <div className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Plans
                </div>
                <Link 
                  to="/plans/fundamental" 
                  className="flex items-center px-4 py-3 ml-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Fundamental
                </Link>
                <Link 
                  to="/plans/premium" 
                  className="flex items-center px-4 py-3 ml-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Premium+
                </Link>
                <Link 
                  to="/plans/alpha" 
                  className="flex items-center px-4 py-3 ml-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Alpha
                </Link>
              </div>
              
              <Link 
                to="/about" 
                className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-lg">About Us</span>
              </Link>
              
              <Link 
                to="/documentation" 
                className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-lg">Documentation</span>
              </Link>
              
              <Link 
                to="/faq" 
                className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-lg">FAQ</span>
              </Link>
            </nav>
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-gray-700/50">
            <button
              onClick={handleContactClick}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </>
  );
};