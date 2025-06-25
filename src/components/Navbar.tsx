import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [plansDropdownOpen, setPlansDropdownOpen] = useState(false);
  const location = useLocation();

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

  const isHomePage = location.pathname === '/';

  return (
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
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-0 group-hover:opacity-100 shadow-[0_0_10px_rgba(59,130,246,0.5)] blur-[1px]"></span>
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-0 group-hover:opacity-70"></span>
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
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-0 group-hover:opacity-100 shadow-[0_0_10px_rgba(59,130,246,0.5)] blur-[1px]"></span>
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-0 group-hover:opacity-70"></span>
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
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-0 group-hover:opacity-100 shadow-[0_0_10px_rgba(59,130,246,0.5)] blur-[1px]"></span>
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-0 group-hover:opacity-70"></span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/services" 
              className="block px-3 py-2 text-gray-300 hover:text-white relative group"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
            </Link>
            <Link 
              to="/products" 
              className="block px-3 py-2 text-gray-300 hover:text-white relative group"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
            </Link>
            <div className="px-3 py-2">
              <div className="text-gray-400 text-sm mb-2">Plans</div>
              <Link 
                to="/plans/fundamental" 
                className="block px-3 py-2 text-gray-300 hover:text-white relative group"
                onClick={() => setMobileMenuOpen(false)}
              >
                Fundamental
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
              </Link>
              <Link 
                to="/plans/premium" 
                className="block px-3 py-2 text-gray-300 hover:text-white relative group"
                onClick={() => setMobileMenuOpen(false)}
              >
                Premium(+)
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
              </Link>
              <Link 
                to="/plans/alpha" 
                className="block px-3 py-2 text-gray-300 hover:text-white relative group"
                onClick={() => setMobileMenuOpen(false)}
              >
                Alpha
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
              </Link>
            </div>
            <Link 
              to="/about" 
              className="block px-3 py-2 text-gray-300 hover:text-white relative group"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};