import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Award, Star, ChevronRight, Play, Sparkles } from 'lucide-react';
import teacherImage from '../assets/images/teachers/mahmoudelshikh.png';

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
    { number: "5000+", label: "طالب متفوق معانا", icon: Users },
    { number: "98%", label: "نسبة النجاح", icon: Award },
    { number: "5", label: "تقييم الطلاب", icon: Star }
  ];

  const testimonials = [
    { text: "منصة جامدة جداً ساعدتني أجيب درجات عالية", name: "أحمد محمد" },
    { text: "أسلوب التدريس حلو والشرح واضح أوي", name: "فاطمة علي" },
    { text: "أحسن منصة تعليمية استخدمتها  ", name: "محمد حسن" }
  ];

  const scrollToCourses = () => {
    const coursesSection = document.getElementById('courses-section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBooks = () => {
    const booksSection = document.getElementById('books-section');
    if (booksSection) {
      booksSection.scrollIntoView({ behavior: 'smooth' });
    }
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
              {/* Main Card - Modern Design */}
              <div className="relative w-full h-[480px] group">
                {/* Outer glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 via-blue-400/30 to-indigo-400/30 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                
                {/* Main container */}
                <div className="relative w-full h-full rounded-[2rem] bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 overflow-hidden shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500">
                  {/* Inner gradient border */}
                  <div className="absolute inset-[1px] rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent"></div>
                  
                  {/* Image container */}
                  <div className="relative w-full h-full p-4">
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-slate-50 to-white shadow-inner">
                      <img
                        src={teacherImage}
                        alt="محمود الشيخ"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-6 -right-6 w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl shadow-lg flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="absolute top-1/3 -left-8 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl shadow-lg flex items-center justify-center animate-pulse">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Decorative dots */}
                  <div className="absolute top-8 right-8 w-3 h-3 bg-white/60 rounded-full animate-ping"></div>
                  <div className="absolute bottom-12 right-12 w-2 h-2 bg-purple-400/70 rounded-full animate-ping delay-1000"></div>
                  <div className="absolute top-1/2 left-8 w-2 h-2 bg-blue-400/70 rounded-full animate-ping delay-2000"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
                
                {/* Background decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>
              
              {/* Name and Subject - Modern Card */}
              <div className="mt-6 w-full max-w-sm">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center shadow-lg hover:bg-white/15 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    محمود الشيخ
                  </h3>
                  <p className="text-purple-300 font-medium flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    مدرس مادة التاريخ
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-white/80 text-sm mr-2">4.9</span>
                  </div>
                </div>
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
            <div className="mb-8 flex items-center justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <span className="text-lg sm:text-2xl font-bold text-white tracking-wide">درجة التاريخ مضمونة</span>
              </span>
            </div>
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
              <button 
                onClick={scrollToBooks}
                className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                الكتب المميزة
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