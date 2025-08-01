import React, { useState, useEffect } from 'react';
import CourseList from '../components/course/CourseList';
import BooksList from '../components/common/BooksList';
import CodeEntryForm from '../components/common/CodeEntryForm';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import teacherImage from '../assets/images/teachers/mr.karim.jpg';
import FloatingBiologyIcons from '../components/common/FloatingBiologyIcons';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Star, 
  Play, 
  Target, 
  MessageCircle, 
  Zap,
  Trophy,
  Brain,
  Sparkles,
  ChevronDown,
  Check
} from 'lucide-react';

interface Stat {
  number: string;
  label: string;
  icon: React.ComponentType<any>;
}

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Testimonials carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const scrollToCourses = () => {
    const coursesSection = document.getElementById('courses-section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats: Stat[] = [
    { number: '4000+', label: 'طالب مشترك', icon: Users },
    { number: '99+', label: 'فيديو تعليمي', icon: Play },
    { number: '24/7', label: 'دعم متواصل', icon: MessageCircle }
  ];

  const features = [
    {
      icon: Brain,
      title: 'تعلم ذكي',
      description: 'نظام تعلم تكيفي يتناسب مع مستواك وسرعة تعلمك',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    {
      icon: Target,
      title: 'أهداف واضحة',
      description: 'خطة دراسية مُحكمة تضمن وصولك للتفوق',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      icon: Zap,
      title: 'تفاعل مباشر',
      description: 'تمارين تفاعلية وامتحانات فورية لتقييم مستواك',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700'
    },
    {
      icon: Trophy,
      title: 'إنجازات ومكافآت',
      description: 'نظام نقاط وشارات لتحفيزك على التقدم',
      color: 'from-orange-500 to-rose-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  const testimonials = [
    {
      name: 'أحمد علي',
      role: 'طالب في المنصة',
      content: 'شرح الدكتور كريم فوق الممتاز، المنصة ساعدتني أفهم الأحياء بجد.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'فاطمة محمد',
      role: 'طالبة متفوقة',
      content: 'أفضل منصة تعليمية للأحياء، المحتوى منظم ومفهوم جداً.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'محمد أحمد',
      role: 'طالب في الثانوية',
      content: 'المنصة غيرت طريقة فهمي للأحياء، أصبحت أحب المادة.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 font-cairo" dir="rtl">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">
        {/* Floating Biology Icons */}
        <FloatingBiologyIcons 
          count={40}
          opacity={0.15}
          minSize={45}
          maxSize={75}
        />
        
        {/* Subtle Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(156,163,175,0.08)_1px,transparent_0)] bg-[size:20px_20px] opacity-30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8 text-center lg:text-right">
              {/* Badge */}
              <div className={`inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-rose-200 rounded-2xl px-6 py-3 shadow-lg transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <Sparkles className="w-5 h-5 text-rose-500 animate-pulse" />
                <span className="text-sm font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent animate-text-shimmer">
                منصة الأحياء الأولى في مصر
                </span>
              </div>

              {/* Main Title */}
              <div className="space-y-6">
                <h1 className={`text-4xl sm:text-6xl lg:text-6xl font-black leading-tight py-8 overflow-visible z-10 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <span className="block text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-600 mt-4 mb-4 animate-fade-in-up">منصة</span>
                  <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent overflow-visible leading-[1.15] animate-gradient-shift">د/ كريم أيوب</span>
                </h1>
                
                <p className={`text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 mt-6 mb-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  اكتشف طريقة جديدة وممتعة لتعلم مادة الأحياء مع أفضل المناهج التعليمية
                </p>
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <button
                  onClick={scrollToCourses}
                  className="group relative bg-gradient-to-r from-rose-500 to-orange-500 text-white px-8 py-4 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-bounce-subtle"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-2xl"></div>
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    <span className="font-bold text-lg">
                      ابدأ رحلتك الآن
                    </span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
                
                <Link
                  to="/about"
                  className="group relative bg-white text-gray-700 px-8 py-4 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 hover:border-rose-300"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-bold text-lg">
                      تعرف علينا
                    </span>
                    <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" />
                  </div>
                </Link>
              </div>

              {/* Stats */}
              <div className={`grid grid-cols-3 gap-6 pt-8 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group hover:scale-105 transition-all duration-300">
                    <div className="flex justify-center mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className={`relative transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
              <div className="relative z-10 group">
                <img
                  src={teacherImage}
                  alt="د/ كريم أيوب"
                  className="w-full h-auto rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Floating Experience Badge */}
              <div className="absolute top-1 sm:top-6 right-1 sm:right-6 bg-white rounded-xl shadow-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3 animate-float border border-rose-200 backdrop-blur-sm z-20" style={{ animationDelay: '1s' }}>
                <div className="bg-rose-50 rounded-lg p-1.5 sm:p-2">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">خبرة تدريس</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">+10 سنوات</div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Floating Biology Icons */}
        <FloatingBiologyIcons 
          count={40}
          opacity={0.1}
          minSize={40}
          maxSize={60}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              ليه تختار منصتنا؟
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
معنا درجات الأحياء مضمونة            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className={`${feature.bgColor} rounded-3xl p-8 h-full transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:-translate-y-2`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold ${feature.textColor} mb-4 group-hover:scale-105 transition-transform duration-300`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* Courses Section */}
      <section id="courses-section" className="py-20 bg-white relative overflow-hidden">
        {/* Floating Biology Icons */}
        <FloatingBiologyIcons 
          count={12}
          opacity={0.12}
          minSize={45}
          maxSize={65}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              اكتشف دوراتنا التعليمية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
              مجموعة شاملة من الدورات التعليمية تغطي جميع فصول مادة الأحياء
            </p>
          </div>

          <div className="animate-fade-in-up delay-500">
            <CourseList />
          </div>
        </div>
      </section>
      {/* Books Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Floating Biology Icons */}
        <FloatingBiologyIcons 
          count={8}
          opacity={0.1}
          minSize={40}
          maxSize={60}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent mb-4 animate-fade-in-up animate-gradient-shift">
              الكتب التعليمية
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
              مجموعة شاملة من الكتب والمراجع التعليمية لدعم دراستك
            </p>
          </div>

          <div className="animate-fade-in-up delay-500">
            <BooksList />
          </div>
        </div>
      </section>

      {/* Unit Codes Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Floating Biology Icons */}
        <FloatingBiologyIcons 
          count={6}
          opacity={0.08}
          minSize={35}
          maxSize={50}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent mb-4 animate-fade-in-up animate-gradient-shift">
              أكواد المحاضرات
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
              ادخل كود المحاضرة للوصول إلى المحتوى التعليمي المميز
            </p>
          </div>

          <div className="flex justify-center animate-fade-in-up delay-500">
            <CodeEntryForm />
          </div>
        </div>
      </section>
      
      

      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @keyframes text-shimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }

          .animate-gradient-shift {
            background-size: 200% 200%;
            animation: gradient-shift 3s ease infinite;
          }

          .animate-text-shimmer {
            background-size: 200% 200%;
            animation: text-shimmer 2s ease infinite;
          }

          .animate-bounce-subtle {
            animation: bounce-subtle 2s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg);
            }
            50% { 
              transform: translateY(-10px) rotate(2deg);
            }
          }

          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `
      }} />
    </div>
  );
};

export default Home;