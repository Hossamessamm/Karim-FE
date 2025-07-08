import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Award, Star, ChevronRight, Play, Sparkles } from 'lucide-react';
import teacherImage from '../assets/images/teachers/omar-elkholy.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "500+", label: "طالب متفوق", icon: Users },
    { number: "98%", label: "نسبة النجاح", icon: Award },
    { number: "4.9", label: "تقييم الطلاب", icon: Star }
  ];

  const testimonials = [
    { text: "منصة رائعة ساعدتني في تحقيق درجات عالية", name: "أحمد محمد" },
    { text: "أسلوب التدريس مميز والشرح واضح جداً", name: "فاطمة علي" },
    { text: "أفضل منصة تعليمية استخدمتها على الإطلاق", name: "محمد حسن" }
  ];

  const scrollToCourses = () => {
    console.log('Scrolling to courses...');
  };

  return (
    <div>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden pt-24">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        {/* Main Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 lg:px-12 max-w-7xl mx-auto">
          {/* Right Side - Teacher Image (now first for mobile) */}
          <div className={`flex-1 lg:pl-12 mb-12 lg:mb-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center">
              {/* Main Card - Only Image */}
              <div className="relative w-full h-96 rounded-3xl p-1 bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 shadow-lg flex items-center justify-center border-none">
                <div className="w-full h-full rounded-3xl bg-white/70 backdrop-blur-md flex items-center justify-center overflow-hidden border border-white">
                  <img
                    src={teacherImage}
                    alt="محمود الشيخ"
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Decorative icon */}
                <div className="absolute top-4 left-4 bg-amber-400 text-white p-2 rounded-full shadow-md">
                  <Star className="w-6 h-6" />
                </div>
                {/* Floating Icons */}
                <div className="absolute -top-8 -right-8 bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-full shadow-lg animate-float">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-full shadow-lg animate-float delay-1000">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-1/2 -left-12 bg-gradient-to-br from-pink-400 to-purple-500 p-4 rounded-full shadow-lg animate-float delay-2000">
                  <Star className="w-8 h-8 text-white" />
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 w-4 h-4 bg-white/40 rounded-full animate-ping"></div>
                <div className="absolute bottom-12 right-12 w-3 h-3 bg-purple-400/60 rounded-full animate-ping delay-1000"></div>
                <div className="absolute top-1/3 left-8 w-2 h-2 bg-blue-400/60 rounded-full animate-ping delay-2000"></div>
              </div>
              {/* Name and Subject below the image container */}
              <div className="p-6 text-center w-full">
                <p className="text-gray-700 font-bold text-xl mb-1">محمود الشيخ</p>
                <p className="text-gray-500">مدرس مادة التاريخ</p>
              </div>
            </div>
          </div>
          {/* Left Side - Content (now second for mobile) */}
          <div className={`flex-1 lg:pr-12 text-center lg:text-right transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg mb-6 animate-bounce">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold">مدرس مادة التاريخ</span>
            </div>
            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
                منصة محمود الشيخ
              </span>
            </h1>
            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              اكتشف طريقة جديدة للتعلم مع منصة محمود الشيخ - أحدث المناهج التعليمية والأدوات التفاعلية لتحقيق أفضل النتائج الأكاديمية.
            </p>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-end">
              <button
                onClick={scrollToCourses}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  الباقات المميزة
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 hover:border-white/40 transition-all duration-300">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                شاهد العرض التوضيحي
              </button>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto lg:mx-0">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  <div className="flex flex-col items-center">
                    <stat.icon className="w-8 h-8 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Testimonial Carousel */}
            <div className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="transition-all duration-500">
                <p className="text-white text-lg italic mb-4">"{testimonials[currentTestimonial].text}"</p>
                <p className="text-purple-300 font-semibold">- {testimonials[currentTestimonial].name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-sm mt-2">اسحب لأسفل</span>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default HeroSection; 