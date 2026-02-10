import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "/images/anotherone.jpg";
import WalletIcon from "./WalletIcon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
   
    const storedUsername = localStorage.getItem("name");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setUsername(null);
    navigate("/");
  };

  const navLinks = [
    { name: "About Us", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/98 backdrop-blur-xl shadow-xl border-b border-slate-200/60' 
          : 'bg-white/90 backdrop-blur-lg border-b border-slate-100/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
        
          <a 
            href="/" 
            className="flex items-center gap-3 group cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 ring-2 ring-indigo-100 group-hover:ring-indigo-300">
              <img 
                src={Logo} 
                alt="CreatorStack Logo" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="navfam text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
              CreatorStack
            </span>
          </a>

   
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="relative px-5 py-2.5 text-slate-700 hover:text-indigo-600 font-medium text-sm rounded-xl hover:bg-gradient-to-br hover:from-indigo-50 hover:to-violet-50 transition-all duration-300 group"
              >
                {link.name}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
              </a>
            ))}
          </div>

     
          <div className="hidden lg:flex items-center gap-4">
            {username ? (
              <>
               
                
                
                
                <span className="text-slate-700 font-medium">
                  Welcome, <span className="text-indigo-600 font-bold">{username}</span>
                </span>
                
               
                <a 
                  href="/dashboard"
                  className="px-6 py-2.5 text-slate-700 hover:text-indigo-600 font-semibold text-sm transition-all duration-300 hover:scale-105"
                >
                  Dashboard
                </a>
                
              
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 border-2 border-slate-300 text-slate-700 hover:border-red-500 hover:text-red-500 font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  Logout
                </button>
                <WalletIcon />
              </>
            ) : (
              <>
                <a 
                  href="/login"
                  className="px-6 py-2.5 text-slate-700 hover:text-indigo-600 font-semibold text-sm transition-all duration-300 hover:scale-105"
                >
                  Log in
                </a>
                <a 
                  href="/addaccount"
                  className="relative px-7 py-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-700 hover:via-violet-700 hover:to-purple-700 text-white font-semibold text-sm rounded-xl shadow-xl shadow-indigo-300/50 hover:shadow-2xl hover:shadow-indigo-400/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                >
                  <span className="relative z-10">Sign Up Free</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </>
            )}
          </div>

         
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-slate-200/60 pt-6 animate-fadeIn">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-3.5 text-slate-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-violet-50 font-medium text-base rounded-xl transition-all duration-300 border border-transparent hover:border-indigo-100"
                >
                  {link.name}
                </a>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-slate-200/60">
                {username ? (
                  <>
                    {/* Mobile Wallet */}
                    <div className="flex justify-center mb-2">
                      <WalletIcon />
                    </div>
                    
                    <div className="px-5 py-2 text-center text-slate-700 font-medium">
                      Welcome, <span className="text-indigo-600 font-bold">{username}</span>
                    </div>
                    
                    <a 
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-5 py-3.5 text-center bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-700 hover:via-violet-700 hover:to-purple-700 text-white font-semibold text-base rounded-xl shadow-xl shadow-indigo-300/50 hover:shadow-2xl transition-all duration-300"
                    >
                      Dashboard
                    </a>
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="px-5 py-3.5 text-center text-red-600 hover:text-red-700 font-semibold text-base border-2 border-red-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <a 
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-5 py-3.5 text-center text-slate-700 hover:text-indigo-600 font-semibold text-base border-2 border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300"
                    >
                      Log in
                    </a>
                    <a 
                      href="/addaccount"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-5 py-3.5 text-center bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-700 hover:via-violet-700 hover:to-purple-700 text-white font-semibold text-base rounded-xl shadow-xl shadow-indigo-300/50 hover:shadow-2xl transition-all duration-300"
                    >
                      Sign Up Free
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}