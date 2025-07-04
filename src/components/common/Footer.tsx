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
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      facebook: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      youtube: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      tiktok: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    };

    const IconWrapper = link ? 'a' as const : 'div' as const;
    const props = link ? {
      href: type === 'whatsapp' ? `https://wa.me/${link}` : link,
      target: "_blank",
      rel: "noopener noreferrer",
      className: `bg-white/10 p-3 rounded-lg hover:${hoverColor} hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg`,
      title: type.charAt(0).toUpperCase() + type.slice(1)
    } : {
      className: "bg-white/5 p-3 rounded-lg cursor-not-allowed text-white/40",
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} غير متاح`
    };

    return (
      <IconWrapper {...props}>
        {icons[type]}
      </IconWrapper>
    );
  };

  return (
    <footer className="relative bg-[#1a1a2e] text-white" dir="rtl">
      {/* Hexagon Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}/>
      </div>

      {/* Glowing Top Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"/>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12">
          {/* Brand Section - 5 columns */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  منصة د. كريم أيوب
                </span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                نقدم تعليمًا عالي الجودة لطلاب جميع المراحل.
                تعلم بالسرعة التي تناسبك مع دوراتنا التي يقودها الخبراء.
              </p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              {renderSocialIcon('whatsapp', contactData?.whatsApp_Number, 'text-green-500')}
              {renderSocialIcon('facebook', contactData?.facebook_Page, 'text-blue-500')}
              {renderSocialIcon('youtube', contactData?.youTube_Channel, 'text-red-500')}
              {renderSocialIcon('tiktok', contactData?.tiktokChannel, 'text-gray-500')}
            </div>
          </div>

          {/* Quick Links - 3 columns */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">روابط سريعة</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" 
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm group flex items-center gap-2">
                <span className="h-px w-4 bg-blue-500/50 group-hover:w-6 transition-all duration-300"/>
                الرئيسية
              </Link>
              <Link to="/about" 
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm group flex items-center gap-2">
                <span className="h-px w-4 bg-blue-500/50 group-hover:w-6 transition-all duration-300"/>
                عن المنصة
              </Link>
              <Link to="/courses" 
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm group flex items-center gap-2">
                <span className="h-px w-4 bg-blue-500/50 group-hover:w-6 transition-all duration-300"/>
                الدورات
              </Link>
            </div>
          </div>

          {/* Join Us - 4 columns */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">انضم إلينا</h3>
            <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm space-y-4">
              <p className="text-sm text-gray-400">
                كن جزءاً من مجتمعنا التعليمي المتميز واحصل على أفضل تجربة تعليمية
              </p>
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-xl text-sm font-medium hover:from-blue-500 hover:to-blue-300 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                سجل الآن
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} د. كريم أيوب. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-blue-400 transition-colors duration-300">
                سياسة الخصوصية
              </Link>
              <span className="text-gray-700">•</span>
              <Link to="/terms" className="hover:text-blue-400 transition-colors duration-300">
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 