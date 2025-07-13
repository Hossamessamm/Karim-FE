import React from 'react';
import CourseList from '../components/course/CourseList';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import teacherImage from '../assets/images/teachers/omar-elkholy.jpg';
import BooksList from '../components/common/BooksList';
import HeroSection from '../components/HeroSection';
import CodeEntryForm from '../components/common/CodeEntryForm';

interface Stat {
  number: string;
  label: string;
}

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  const scrollToCourses = () => {
    const coursesSection = document.getElementById('courses-section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats: Stat[] = [
    { number: '4000+', label: 'طالب معانا' },
    { number: '99+', label: 'فيديو تعليمي' },
    { number: '24 ساعة', label: 'دعم على طول' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-white" dir="rtl">
      <HeroSection />

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 backdrop-blur-md px-6 py-3 rounded-full border border-purple-200/50 mb-8">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-purple-700 font-medium">إيه اللي مميزنا</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              <span>ليه تختار </span>
              <span className="mx-3 text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">منصة م.محمود الشيخ</span>
              <span>؟</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              تعال شوف إيه اللي هيخليك تحب الدراسة وتتفوق فيها
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'حل كل الكتب الخارجية',
                description: 'هنحل الامتحان - المصدر - البوكليت - التميز وكل حاجة تخطر على بالك',
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                ),
                title: 'مراجعة على طول',
                description: 'امتحانات قبل المحاضرة وبعدها وامتحانات شهرية عشان متنساش اللي اتعلمته',
                gradient: 'from-emerald-500 to-teal-600'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'تشجيع وهدايا',
                description: 'جوائز حلوة وهدايا مميزة للطلاب المتفوقين عشان نحفزك على التفوق',
                gradient: 'from-purple-500 to-pink-600'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                ),
                title: 'دعم 24 ساعة',
                description: 'فريق الدعم موجود معاك في أي وقت لو عندك أي استفسار أو مشكلة',
                gradient: 'from-orange-500 to-red-600'
              }
            ].map((feature, index) => (
              <div key={index} className="group relative p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/50 hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-2 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Courses Section */}
      <div id="courses-section" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            {/* Modern Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-100 to-orange-100 px-8 py-4 rounded-full border border-amber-200/50 mb-8 shadow-lg">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-amber-700 font-bold text-lg">
                {isAuthenticated ? 'مخصوص ليك' : 'اختار اللي يناسبك'}
              </span>
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                </svg>
              </div>
            </div>
            
            {/* Enhanced Title */}
            <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="inline-flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12 animate-pulse">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </div>
                <span className="text-gray-800">
                الباقات
                </span>
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                المميزة
                </span>
              </span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              شوف الباقات المميزة اللي عملناها خصيصاً عشان تنجح وتتفوق
            </p>
            
            {/* Decorative Elements */}
            <div className="flex justify-center items-center gap-4 mb-12">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            </div>
          </div>
          
          {/* Course List Container */}
          <div className="relative">
            <CourseList />
          </div>
        </div>
      </div>

      {/* Books Section */}
      <div id="books-section" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 backdrop-blur-md px-6 py-3 rounded-full border border-green-200/50 mb-8">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 2H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H8V4h11v16zM6 6H4v16c0 1.1.9 2 2 2h12v-2H6V6z"/>
              </svg>
              <span className="text-green-700 font-medium">كتبنا المميزة</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-4">
              <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 2H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H8V4h11v16zM6 6H4v16c0 1.1.9 2 2 2h12v-2H6V6z"/>
              </svg>
              <span> كتبنا <span className="text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">المميزة</span></span>
            </h2>
          </div>
          <BooksList />
        </div>
      </div>

      {/* Lecture Code Section */}
      <div className="py-16 bg-gradient-to-br from-white via-blue-50 to-purple-50">
        <CodeEntryForm />
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        @keyframes slide-in-right {
          from { 
            opacity: 0;
            transform: translateX(50px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-left {
          from { 
            opacity: 0;
            transform: translateX(-50px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes image-reveal {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-gradient {
          animation: gradient 8s ease infinite;
          background-size: 400% 400%;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 400% 400%;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-image-reveal {
          animation: image-reveal 1s ease-out;
        }

        /* Glassmorphism effect */
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Home;