import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, LogOut, Menu, X, Home, BookOpen, GraduationCap, PlayCircle } from 'lucide-react';
import logoImage from '../../assets/images/logo/logo.jpg';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, currentUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const scrollToCourses = () => {
    const coursesSection = document.getElementById('courses-section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      window.location.href = '/#courses-section';
    }
  };

  const navLinkClasses = (path: string) => `
    relative px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 group
    ${isCurrentPath(path)
      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
    }
  `;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Main navbar container */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl shadow-black/5">
          {/* Inner gradient border */}
          <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-r from-white/20 to-transparent pointer-events-none"></div>
          
          <div className="relative px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left side - Navigation */}
              <div className="flex items-center">
                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:space-x-2">
                  <Link to="/" className={navLinkClasses('/')}>
                    <Home className="w-4 h-4 inline-block ml-2" />
                    الرئيسية
                    {isCurrentPath('/') && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    )}
                  </Link>
                  
                  <button
                    onClick={scrollToCourses}
                    className={`${navLinkClasses('/courses')} cursor-pointer`}
                  >
                    <BookOpen className="w-4 h-4 inline-block ml-2" />
                    الباقات
                  </button>
                  
                  {isAuthenticated && (
                    <>
                      <Link
                        to="/my-lectures"
                        className={navLinkClasses('/my-lectures')}
                      >
                        <PlayCircle className="w-4 h-4 inline-block ml-2" />
                        محاضرات السنتر
                      </Link>
                      <Link
                        to="/enrolled-courses"
                        className={navLinkClasses('/enrolled-courses')}
                      >
                        <GraduationCap className="w-4 h-4 inline-block ml-2" />
                        باقاتي
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Center - Logo */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <Link to="/" className="flex items-center group">
                  <img 
                    src={logoImage} 
                    alt="Elshekh Logo" 
                    className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              </div>

              {/* Auth Section */}
              <div className="hidden md:flex md:items-center">
                {isAuthenticated ? (
                  <div className="flex items-center gap-4">
                    {/* User info card */}
                    <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200/50 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">مرحباً،</span>
                        <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {currentUser?.name}
                        </span>
                      </div>
                    </div>
                    
                    {/* Logout button */}
                    <button
                      onClick={logout}
                      className="group relative px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                        تسجيل الخروج
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      to="/login"
                      className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-full transition-all duration-300 hover:bg-blue-50"
                    >
                      تسجيل الدخول
                    </Link>
                    <Link
                      to="/register"
                      className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                    >
                      <span className="relative z-10">إنشاء حساب</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="relative p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {!isMobileMenuOpen ? (
                    <Menu className="w-6 h-6 text-gray-700" />
                  ) : (
                    <X className="w-6 h-6 text-gray-700" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl shadow-black/5 overflow-hidden">
            <div className="p-4 space-y-2">
              {/* Mobile Logo */}
              <div className="flex justify-center mb-4">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img 
                    src={logoImage} 
                    alt="Elshekh Logo" 
                    className="h-10 w-auto object-contain"
                  />
                </Link>
              </div>
              <Link
                to="/"
                className={`flex items-center gap-3 w-full text-right px-4 py-3 rounded-xl transition-all duration-300 ${
                  isCurrentPath('/') 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                الرئيسية
              </Link>
              
              <button
                onClick={() => {
                  scrollToCourses();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-right px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                الباقات
              </button>
              
              {/* Authenticated user navigation links */}
              {isAuthenticated && (
                <>
                  <Link
                    to="/my-lectures"
                    className={`flex items-center gap-3 w-full text-right px-4 py-3 rounded-xl transition-all duration-300 ${
                      isCurrentPath('/my-lectures')
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <PlayCircle className="w-5 h-5" />
                    محاضرات السنتر
                  </Link>
                  <Link
                    to="/enrolled-courses"
                    className={`flex items-center gap-3 w-full text-right px-4 py-3 rounded-xl transition-all duration-300 ${
                      isCurrentPath('/enrolled-courses')
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <GraduationCap className="w-5 h-5" />
                    باقاتي
                  </Link>
                </>
              )}
              
              {/* Mobile auth section */}
              <div className="pt-4 border-t border-gray-200/50">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        مرحباً، {currentUser?.name}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full text-right px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300"
                    >
                      <LogOut className="w-5 h-5" />
                      تسجيل الخروج
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="flex items-center gap-3 w-full text-right px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      تسجيل الدخول
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center gap-3 w-full text-right px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      إنشاء حساب
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 