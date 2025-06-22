import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

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
    px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
    ${isCurrentPath(path)
      ? 'bg-primary-light text-primary'
      : 'text-gray-600 hover:bg-primary-light hover:text-primary'
    }
  `;

  return (
    <nav className="bg-transparent pt-4 pb-2 z-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 px-6 py-3 flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                {/* Logo icon */}
                {/* Logo icon removed */}
                {/* Brand name */}
                <div className="relative">
                  <span className="inline-block px-6 py-2 text-2xl font-extrabold text-blue-700 bg-white border-2 border-blue-200 rounded-full shadow-sm font-['Reem_Kufi'] tracking-[0.5px]">
                    منصة د. كريم أيوب
                  </span>
                </div>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:mr-8 md:space-x-1">
              <Link to="/" className={navLinkClasses('/') + ' hover:bg-blue-100 hover:text-blue-700 rounded-full px-5 py-2 mx-1 ' + (isCurrentPath('/') ? 'bg-blue-100 text-blue-700 font-bold shadow' : '')}>
                الرئيسية
              </Link>
              <Link to="/about" className={navLinkClasses('/about') + ' hover:bg-blue-100 hover:text-blue-700 rounded-full px-5 py-2 mx-1 ' + (isCurrentPath('/about') ? 'bg-blue-100 text-blue-700 font-bold shadow' : '')}>
                عن المنصة
              </Link>
              <button
                onClick={scrollToCourses}
                className={navLinkClasses('/courses') + ' cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded-full px-5 py-2 mx-1 ' + (isCurrentPath('/courses') ? 'bg-blue-100 text-blue-700 font-bold shadow' : '')}
              >
                الدورات
              </button>
              {isAuthenticated && (
                <Link
                  to="/enrolled-courses"
                  className={navLinkClasses('/enrolled-courses') + ' hover:bg-blue-100 hover:text-blue-700 rounded-full px-5 py-2 mx-1 ' + (isCurrentPath('/enrolled-courses') ? 'bg-blue-100 text-blue-700 font-bold shadow' : '')}
                >
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
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">مرحباً،</span>
                      <span className="text-sm font-semibold text-blue-700">
                        {currentUser?.name}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg group"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      خروج
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
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
        <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mt-2 py-4 px-4 flex flex-col gap-2">
            <Link
              to="/"
              className={`block rounded-full px-5 py-2 text-center ${isCurrentPath('/') ? 'bg-blue-100 text-blue-700 font-bold shadow' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link
              to="/about"
              className={`block rounded-full px-5 py-2 text-center ${isCurrentPath('/about') ? 'bg-blue-100 text-blue-700 font-bold shadow' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              عن المنصة
            </Link>
            <button
              onClick={() => { scrollToCourses(); setIsMobileMenuOpen(false); }}
              className={`block rounded-full px-5 py-2 text-center ${isCurrentPath('/courses') ? 'bg-blue-100 text-blue-700 font-bold shadow' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`}
            >
              الدورات
            </button>
            {isAuthenticated && (
              <Link
                to="/enrolled-courses"
                className={`block rounded-full px-5 py-2 text-center ${isCurrentPath('/enrolled-courses') ? 'bg-blue-100 text-blue-700 font-bold shadow' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                دوراتي
              </Link>
            )}
            <hr className="my-2 border-gray-200"/>
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                className="w-full text-center px-5 py-2 text-sm font-medium bg-red-500 text-white rounded-full transition-all duration-200 shadow-md"
              >
                تسجيل الخروج
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="w-full text-center px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center px-5 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-all duration-200 shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 