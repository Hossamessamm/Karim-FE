import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContact } from '../../hooks/useContact';
import { BookOpen, Home, Users, Star, Sparkles } from 'lucide-react';
import microbiologyIcon from '../../assets/images/microbiology.png';
import bacteriaIcon from '../../assets/images/bacteria.png';
import experimentIcon from '../../assets/images/experiment.png';
import microscopeIcon from '../../assets/images/microscope.png';
import genomeIcon from '../../assets/images/genome.png';

const Footer: React.FC = () => {
  const { contactInfo } = useContact();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToCourses = () => {
    const coursesSection = document.getElementById('courses-section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      window.location.href = '/#courses-section';
    }
  };

  const renderSocialIcon = (
    type: 'whatsapp' | 'facebook' | 'youtube' | 'tiktok',
    link: string | undefined,
    hoverColor: string,
    bgColor: string
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

    return (
      <div className="group relative">
        {link ? (
          <a
            href={type === 'whatsapp' ? `https://wa.me/${link}` : link}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative flex items-center justify-center w-12 h-12 rounded-2xl ${bgColor} text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${hoverColor} backdrop-blur-sm border border-white/20`}
            title={type.charAt(0).toUpperCase() + type.slice(1)}
          >
            {icons[type]}
            <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        ) : (
          <div
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
            title={`${type.charAt(0).toUpperCase() + type.slice(1)} غير متاح`}
          >
            {icons[type]}
          </div>
        )}
      </div>
    );
  };

  return (
    <footer className="relative bg-white text-slate-800 overflow-hidden border-t border-slate-200" dir="rtl">
      {/* Floating Biology Icons Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {[
          // Top row
          { icon: microbiologyIcon, top: '5%', left: '8%', size: 45, animation: 'animate-float-slow', delay: 0 },
          { icon: bacteriaIcon, top: '10%', left: '30%', size: 40, animation: 'animate-float-medium', delay: 1 },
          { icon: experimentIcon, top: '8%', left: '60%', size: 50, animation: 'animate-float-fast', delay: 2 },
          { icon: microscopeIcon, top: '12%', left: '85%', size: 35, animation: 'animate-float-slow', delay: 3 },
          
          // Middle top row
          { icon: genomeIcon, top: '25%', left: '15%', size: 55, animation: 'animate-float-medium', delay: 1.5 },
          { icon: microbiologyIcon, top: '30%', left: '45%', size: 40, animation: 'animate-float-fast', delay: 2.5 },
          { icon: bacteriaIcon, top: '28%', left: '75%', size: 45, animation: 'animate-float-slow', delay: 3.5 },
          
          // Middle row
          { icon: experimentIcon, top: '45%', left: '8%', size: 55, animation: 'animate-float-medium', delay: 0.5 },
          { icon: microscopeIcon, top: '48%', left: '35%', size: 40, animation: 'animate-float-fast', delay: 1.5 },
          { icon: genomeIcon, top: '52%', left: '65%', size: 50, animation: 'animate-float-slow', delay: 2.5 },
          { icon: microbiologyIcon, top: '47%', left: '90%', size: 35, animation: 'animate-float-medium', delay: 3.5 },
          
          // Middle bottom row
          { icon: bacteriaIcon, top: '65%', left: '20%', size: 45, animation: 'animate-float-fast', delay: 1 },
          { icon: experimentIcon, top: '68%', left: '50%', size: 55, animation: 'animate-float-slow', delay: 2 },
          { icon: microscopeIcon, top: '70%', left: '80%', size: 40, animation: 'animate-float-medium', delay: 3 },
          
          // Bottom row
          { icon: genomeIcon, top: '85%', left: '12%', size: 50, animation: 'animate-float-fast', delay: 0.5 },
          { icon: microbiologyIcon, top: '88%', left: '40%', size: 35, animation: 'animate-float-slow', delay: 1.5 },
          { icon: bacteriaIcon, top: '82%', left: '70%', size: 45, animation: 'animate-float-medium', delay: 2.5 },
          { icon: experimentIcon, top: '86%', left: '92%', size: 40, animation: 'animate-float-fast', delay: 3.5 }
        ].map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.animation}`}
            style={{
              top: item.top,
              left: item.left,
              opacity: 0.05,
              width: `${item.size}px`,
              height: `${item.size}px`,
              animationDelay: `${item.delay}s`,
            }}
          >
            <img
              src={item.icon}
              alt="biology icon"
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center shadow-lg shadow-rose-500/25">
                <Sparkles className="w-6 h-6 text-white" />
                <div className="absolute inset-0 rounded-2xl bg-white/10"></div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-rose-600 bg-clip-text text-transparent">
منصة د/ كريم أيوب              </h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
              نقدم تعليمًا عالي الجودة لطلاب جميع المراحل الدراسية. 
              تعلم بالسرعة التي تناسبك مع باقاتنا التفاعلية التي يقودها الخبراء.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              {[
                { icon: Users, number: "5000+", label: "طالب متفوق" },
                { icon: BookOpen, number: "98%", label: "نسبة النجاح" },
                { icon: Star, number: "4.9", label: "تقييم الطلاب" }
              ].map((stat, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 hover:bg-slate-100 transition-all duration-300 hover:border-rose-300">
                  <stat.icon className="w-6 h-6 text-rose-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-slate-800">{stat.number}</div>
                  <div className="text-xs text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-right">
            <h3 className="text-xl font-bold mb-6 flex items-center justify-center lg:justify-start gap-2 text-slate-800">
              <Home className="w-5 h-5 text-rose-500" />
              روابط سريعة
            </h3>
            <div className="space-y-4">
              {[
                { to: "/", label: "الرئيسية", icon: Home, isLink: true },
                // { to: "/about", label: "عن المنصة", icon: Users },
                { label: "الباقات", icon: BookOpen, isLink: false },
              ].map((link, index) => (
                link.isLink && link.to ? (
                  <Link
                    key={index}
                    to={link.to}
                    className="group flex items-center justify-center lg:justify-start gap-3 text-slate-600 hover:text-slate-800 transition-all duration-300 hover:translate-x-1"
                  >
                    <link.icon className="w-4 h-4 text-rose-500 group-hover:text-rose-600" />
                    <span className="group-hover:text-slate-800">{link.label}</span>
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={scrollToCourses}
                    className="group flex items-center justify-center lg:justify-start gap-3 text-slate-600 hover:text-slate-800 transition-all duration-300 hover:translate-x-1 w-full text-right"
                  >
                    <link.icon className="w-4 h-4 text-rose-500 group-hover:text-rose-600" />
                    <span className="group-hover:text-slate-800">{link.label}</span>
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="text-center lg:text-right">
            <h3 className="text-xl font-bold mb-6 flex items-center justify-center lg:justify-start gap-2 text-slate-800">
              <Users className="w-5 h-5 text-rose-500" />
              تواصل معنا
            </h3>
            
            {/* Register Button */}
            <div className="mb-6">
              <Link 
                to="/register" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-rose-500/25 hover:shadow-rose-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <Star className="w-5 h-5" />
                انضم إلينا الآن
              </Link>
            </div>

            {/* Social Media */}
            <div className="flex justify-center lg:justify-start items-center gap-4">
              {renderSocialIcon('whatsapp', contactInfo?.whatsApp_Number, 'hover:shadow-green-500/50', 'bg-gradient-to-br from-green-500 to-green-600')}
              {renderSocialIcon('facebook', contactInfo?.facebook_Page, 'hover:shadow-blue-500/50', 'bg-gradient-to-br from-blue-500 to-blue-600')}
              {renderSocialIcon('youtube', contactInfo?.youTube_Channel, 'hover:shadow-red-500/50', 'bg-gradient-to-br from-red-500 to-red-600')}
              {renderSocialIcon('tiktok', contactInfo?.tiktokChannel, 'hover:shadow-gray-500/50', 'bg-gradient-to-br from-gray-600 to-gray-700')}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-right flex flex-col sm:flex-row items-center gap-2">
             
              <a
                href="https://wa.me/201114706613"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-600 text-sm font-bold hover:underline hover:text-rose-700 transition-colors duration-200 cursor-pointer ml-2"
                title="تواصل مع Edu Craft عبر واتساب"
              >
                جميع الحقوق محفوظة لشركة Edu Craft
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                <span>متاح الآن</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 