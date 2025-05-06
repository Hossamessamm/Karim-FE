import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#4285f4] text-white py-6" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Description - Centered */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">المُــبــيــن</h2>
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed text-sm">
            نقدم تعليمًا عالي الجودة لطلاب جميع المراحل.
            تعلم بالسرعة التي تناسبك مع دوراتنا التي يقودها الخبراء.
          </p>
        </div>

        {/* Links and Register - Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3">روابط سريعة</h3>
            <div className="flex flex-col items-center space-y-2">
              <Link to="/" className="text-white/80 hover:text-white transition-colors text-sm">
                الرئيسية
              </Link>
              <Link to="/about" className="text-white/80 hover:text-white transition-colors text-sm">
                عن المنصة
              </Link>
              <Link to="/courses" className="text-white/80 hover:text-white transition-colors text-sm">
                الدورات
              </Link>
            </div>
          </div>

          {/* Contact/Register - Centered */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3">انضم إلينا</h3>
            <Link 
              to="/register" 
              className="inline-block bg-white text-[#4285f4] px-6 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all duration-200 hover:transform hover:scale-105"
            >
              سجل الآن
            </Link>
          </div>

          {/* Additional Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3">روابط مهمة</h3>
            <div className="flex flex-col items-center space-y-2">
              <Link to="/login" className="text-white/80 hover:text-white transition-colors text-sm">
                تسجيل الدخول
              </Link>
              <Link to="/profile" className="text-white/80 hover:text-white transition-colors text-sm">
                الملف الشخصي
              </Link>
              <Link to="/enrolled-courses" className="text-white/80 hover:text-white transition-colors text-sm">
                دوراتي
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright - With Border */}
        <div className="pt-4 border-t border-white/10 text-center">
          <p className="text-white/70 text-sm">© {new Date().getFullYear()} المُــبــيــن. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 