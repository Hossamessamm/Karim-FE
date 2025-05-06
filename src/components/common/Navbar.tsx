import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, currentUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
    px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
    ${isCurrentPath(path)
      ? 'bg-primary-light text-primary'
      : 'text-gray-600 hover:bg-primary-light hover:text-primary'
    }
  `;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                {/* Logo icon */}
                <div className="relative w-8 h-8 mr-2 rounded-lg bg-gradient-to-tr from-primary to-primary-dark group-hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-white opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <svg className="w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  </svg>
                  <div className="absolute inset-0 border border-white/10 rounded-lg"></div>
                </div>
                
                {/* Brand name */}
                <div className="relative">
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent group-hover:opacity-90 transition-opacity font-['Reem_Kufi'] tracking-[0.5px]">
                    الـمُـبِـيْـنْ
                  </span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-dark group-hover:w-full transition-all duration-300"></div>
                  <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-all duration-300"></div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:mr-6 md:space-x-1">
              <Link to="/" className={navLinkClasses('/')}>
                الرئيسية
              </Link>
              <Link to="/about" className={navLinkClasses('/about')}>
                عن المنصة
              </Link>
              {!isAuthenticated && (
                <button
                  onClick={scrollToCourses}
                  className={`${navLinkClasses('/courses')} cursor-pointer`}
                >
                  الدورات
                </button>
              )}
              {isAuthenticated && (
                <Link to="/enrolled-courses" className={navLinkClasses('/enrolled-courses')}>
                  دوراتي
                </Link>
              )}
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex md:items-center">
            {isAuthenticated ? (
              <>
                <div className="relative mr-3 flex items-center space-x-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-light/50 to-transparent rounded-full border border-primary/10 group">
                    {/* User avatar/icon */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-primary-dark flex items-center justify-center shadow-sm">
                      <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    
                    {/* Welcome text */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">مرحباً،</span>
                      <span className="text-sm font-semibold bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent group-hover:opacity-80 transition-all duration-300">
                        {currentUser?.name}
                      </span>
                      
                      {/* Decorative dot */}
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary/50 transition-colors duration-300"></div>
                    </div>
                  </div>
                  
                  {/* Logout button (keeping existing logout button) */}
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-full hover:from-rose-600 hover:to-red-700 transition-all duration-300 shadow-sm hover:shadow group"
                  >
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      تسجيل الخروج
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-primary-light hover:text-primary rounded-full transition-all duration-200"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary-dark rounded-full transition-all duration-200 shadow-sm hover:shadow"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-primary-light hover:text-primary transition-all duration-200"
            >
              <span className="sr-only">فتح القائمة الرئيسية</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 text-base font-medium ${
                isCurrentPath('/') 
                  ? 'bg-primary-light text-primary' 
                  : 'text-gray-600 hover:bg-primary-light hover:text-primary'
              } rounded-md`}
            >
              الرئيسية
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 text-base font-medium ${
                isCurrentPath('/about') 
                  ? 'bg-primary-light text-primary' 
                  : 'text-gray-600 hover:bg-primary-light hover:text-primary'
              } rounded-md`}
            >
              عن المنصة
            </Link>
            {!isAuthenticated && (
              <button
                onClick={scrollToCourses}
                className="block w-full text-right px-3 py-2 text-base font-medium text-gray-600 hover:bg-primary-light hover:text-primary rounded-md"
              >
                الدورات
              </button>
            )}
            {isAuthenticated && (
              <Link
                to="/enrolled-courses"
                className={`block px-3 py-2 text-base font-medium ${
                  isCurrentPath('/enrolled-courses') 
                    ? 'bg-primary-light text-primary' 
                    : 'text-gray-600 hover:bg-primary-light hover:text-primary'
                } rounded-md`}
              >
                دوراتي
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-base font-medium text-gray-600">
                  مرحباً، {currentUser?.name}
                </div>
                <button
                  onClick={logout}
                  className="block w-full text-right px-3 py-2 text-base font-medium bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-full hover:from-rose-600 hover:to-red-700 transition-all duration-300 shadow-sm hover:shadow group"
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    تسجيل الخروج
                  </span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-primary-light hover:text-primary rounded-md"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-base font-medium text-white bg-primary hover:bg-primary-dark rounded-md shadow-sm hover:shadow"
                >
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 