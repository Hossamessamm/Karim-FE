import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ContactData {
  id: number;
  whatsApp_Number: string;
  facebook_Page: string;
  youTube_Channel: string;
  tiktokChannel: string;
}

const Footer: React.FC = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch('https://api.ibrahim-magdy.com/api/Contact/getAll');
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
          setContactData(result.data[0]);
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchContactData();
  }, []);

  const renderSocialIcon = (
    type: 'whatsapp' | 'facebook' | 'youtube' | 'tiktok',
    link: string | undefined,
    hoverColor: string
  ) => {
    const icons = {
      whatsapp: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      facebook: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      youtube: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      tiktok: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    };

    const IconWrapper = link ? 'a' as const : 'div' as const;
    const props = link ? {
      href: type === 'whatsapp' ? `https://wa.me/${link}` : link,
      target: "_blank",
      rel: "noopener noreferrer",
      className: `text-white hover:${hoverColor} transition-colors transform hover:scale-110`,
      title: type.charAt(0).toUpperCase() + type.slice(1)
    } : {
      className: "text-white/50 cursor-not-allowed",
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} غير متاح`
    };

    return (
      <IconWrapper {...props}>
        {icons[type]}
      </IconWrapper>
    );
  };

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

          {/* Social Media Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3">تواصل معنا</h3>
            <div className="flex justify-center items-center gap-4">
              {renderSocialIcon('whatsapp', contactData?.whatsApp_Number, 'text-green-400')}
              {renderSocialIcon('facebook', contactData?.facebook_Page, 'text-blue-400')}
              {renderSocialIcon('youtube', contactData?.youTube_Channel, 'text-red-400')}
              {renderSocialIcon('tiktok', contactData?.tiktokChannel, 'text-gray-300')}
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