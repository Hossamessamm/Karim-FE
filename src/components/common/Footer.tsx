import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const socialLinks = [
  { href: 'https://wa.me/', label: 'واتساب', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12 12 0 0 0 3.48 20.52a12 12 0 0 0 16.8-16.8zm-8.52 17.1a9.1 9.1 0 0 1-4.62-1.27l-.33-.19-3.07.8.82-2.99-.21-.34A9.1 9.1 0 1 1 12 20.58zm5.06-6.44c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.22.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
  ) },
  { href: 'https://facebook.com/', label: 'فيسبوك', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
  ) },
  { href: 'https://youtube.com/', label: 'يوتيوب', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.108-2.116C19.24 3.5 12 3.5 12 3.5s-7.24 0-9.39.57A2.994 2.994 0 0 0 .502 6.186C0 8.34 0 12 0 12s0 3.66.502 5.814a2.994 2.994 0 0 0 2.108 2.116C4.76 20.5 12 20.5 12 20.5s7.24 0 9.39-.57a2.994 2.994 0 0 0 2.108-2.116C24 15.66 24 12 24 12s0-3.66-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  ) },
];

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Scroll to courses section handler
  const handleCoursesClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const section = document.getElementById('courses-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/', { replace: false });
      setTimeout(() => {
        const section = document.getElementById('courses-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
    }
  };

  return (
    <footer className="relative bg-gray-100 text-gray-800 pt-0" dir="rtl">
      {/* Top Wave SVG */}
      <div className="absolute -top-8 left-0 w-full overflow-hidden leading-none pointer-events-none select-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16">
          <path fill="#f3f4f6" d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,58.7C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
            {/* Brand and Description */}
            <div className="md:w-1/2 text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end mb-3">
                <span className="text-3xl font-extrabold text-blue-700">د/ كريم أيوب</span>
              </div>
              <p className="text-gray-600 max-w-md mx-auto md:mx-0 leading-relaxed text-base">
                نقدم تعليمًا عالي الجودة لطلاب جميع المراحل. تعلم بالسرعة التي تناسبك مع دوراتنا التي يقودها الخبراء.
              </p>
              <div className="flex justify-center md:justify-end gap-4 mt-6">
                {socialLinks.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="text-blue-600 hover:text-blue-800 bg-gray-100 rounded-full p-2 shadow transition-colors duration-200">
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
            {/* Links */}
            <div className="md:w-1/2 grid grid-cols-2 gap-8 text-center md:text-right">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-700 flex items-center gap-2 justify-center md:justify-end">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
                  روابط سريعة
                </h4>
                <ul className="space-y-2">
                  <li><Link to="/" onClick={scrollToTop} className="text-gray-700 hover:text-blue-700 transition-colors text-sm">الرئيسية</Link></li>
                  <li><Link to="/about" onClick={scrollToTop} className="text-gray-700 hover:text-blue-700 transition-colors text-sm">عن المنصة</Link></li>
                  <li><Link to="/courses" onClick={handleCoursesClick} className="text-gray-700 hover:text-blue-700 transition-colors text-sm">الدورات</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-700 flex items-center gap-2 justify-center md:justify-end">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  حسابك
                </h4>
                <ul className="space-y-2">
                  <li><Link to="/login" onClick={scrollToTop} className="text-gray-700 hover:text-blue-700 transition-colors text-sm">تسجيل الدخول</Link></li>
                  <li><Link to="/profile" onClick={scrollToTop} className="text-gray-700 hover:text-blue-700 transition-colors text-sm">الملف الشخصي</Link></li>
                  <li><Link to="/enrolled-courses" onClick={scrollToTop} className="text-gray-700 hover:text-blue-700 transition-colors text-sm">دوراتي</Link></li>
                  <li><Link to="/register" onClick={scrollToTop} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors text-sm">سجل الآن</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright Bar */}
      <div className="bg-gray-200 border-t border-gray-300 text-center py-3 text-sm text-gray-500">
        © {new Date().getFullYear()} د/ كريم أيوب. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
};

export default Footer; 