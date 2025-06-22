import React, { useState, useEffect } from 'react';
import CourseList from '../components/course/CourseList';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import teacherImage from '../assets/images/teachers/mr.karim.jpg';
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
  
  // Testimonials carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
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
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ];

  const testimonials = [
    {
      name: 'أحمد علي',
      role: 'طالب في المنصة',
      content: 'شرح الدكتور كريم فوق الممتاز، المنصة ساعدتني أفهم الأحياء بجد.',
      rating: 5,
    },
    {
      name: 'سارة محمود',
      role: 'طالبة في المنصة',
      content: 'أفضل منصة للأحياء، الامتحانات والمتابعة فرقت معايا كتير.',
      rating: 5,
    },
    {
      name: 'محمد حسن',
      role: 'طالب في المنصة',
      content: 'المنصة متكاملة وشرح الدكتور بسيط ومباشر. شكرًا دكتور كريم!',
      rating: 5,
    }
  ];

  const achievements = [
    { icon: '🏆', title: 'أفضل منصة تعليمية', desc: '2024', color: 'bg-yellow-100 text-yellow-800' },
    { icon: '⭐', title: 'تقييم 4.9/5', desc: 'من الطلاب', color: 'bg-blue-100 text-blue-800' },
    { icon: '📚', title: 'منهج شامل', desc: '100% مطابق', color: 'bg-green-100 text-green-800' },
    { icon: '🎯', title: 'نسبة نجاح', desc: '98%', color: 'bg-purple-100 text-purple-800' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 font-cairo" dir="rtl">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">
        {/* Biology Symbols Background */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* DNA */}
          <svg className="absolute top-10 left-10 w-32 h-32 opacity-10" viewBox="0 0 64 64" fill="none"><path d="M16 8c0 16 32 32 32 48" stroke="#4B5563" strokeWidth="2"/><path d="M48 8c0 16-32 32-32 48" stroke="#4B5563" strokeWidth="2"/></svg>
          {/* Microscope */}
          <svg className="absolute bottom-20 right-20 w-28 h-28 opacity-10" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke="#4B5563" strokeWidth="2"/><rect x="28" y="20" width="8" height="24" rx="4" fill="#4B5563" opacity="0.2"/><rect x="24" y="44" width="16" height="4" rx="2" fill="#4B5563" opacity="0.2"/></svg>
          {/* Atom */}
          <svg className="absolute top-1/2 left-1/4 w-24 h-24 opacity-10" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="8" fill="#4B5563" opacity="0.1"/><ellipse cx="32" cy="32" rx="24" ry="8" stroke="#4B5563" strokeWidth="2"/><ellipse cx="32" cy="32" rx="8" ry="24" stroke="#4B5563" strokeWidth="2" transform="rotate(45 32 32)"/></svg>
          {/* Leaf */}
          <svg className="absolute bottom-10 left-1/3 w-28 h-28 opacity-10" viewBox="0 0 64 64" fill="none"><path d="M32 56C32 56 56 40 56 16C56 16 40 8 32 8C24 8 8 16 8 16C8 40 32 56 32 56Z" stroke="#4B5563" strokeWidth="2"/></svg>
        </div>
        {/* Subtle Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(156,163,175,0.08)_1px,transparent_0)] bg-[size:20px_20px] opacity-30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8 text-center lg:text-right">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-rose-200 rounded-2xl px-6 py-3 shadow-lg">
                <Sparkles className="w-5 h-5 text-rose-500" />
                <span className="text-sm font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                منصة الأحياء الأولى في مصر
                </span>
              </div>

              {/* Main Title */}
              <div className="space-y-6">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight">
                  <span className="block text-3xl sm:text-3xl lg:text-4xl font-bold text-gray-600 mt-4">
                    منصة  
                  </span>
                  <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                    د/ كريم أيوب
                  </span>
                  
                </h1>
                
                <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  اكتشف طريقة جديدة وممتعة لتعلم مادة الأحياء مع أفضل المناهج التعليمية
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={scrollToCourses}
                  className="group relative bg-gradient-to-r from-rose-500 to-orange-500 text-white px-8 py-4 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-bold text-lg">
                      ابدأ رحلتك الآن
                    </span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
                
                <Link
                  to="/about"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl hover:border-rose-300 hover:bg-rose-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span className="font-semibold">اكتشف المزيد</span>
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-12">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center group">
                      <div className="mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Teacher Image */}
            <div className="relative">
              <div className="relative group">
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-200/50 via-pink-200/50 to-orange-200/50 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
                
                {/* Main Container */}
                <div className="relative bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 transform group-hover:scale-105 transition-all duration-500 shadow-2xl">
                  <img
                    src={teacherImage}
                    alt="المعلم عمر الخولي"
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl p-4 shadow-xl">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-4 shadow-xl">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* Atom */}
          <svg className="absolute top-8 right-1/4 w-24 h-24 opacity-10" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="8" fill="#4B5563" opacity="0.1"/><ellipse cx="32" cy="32" rx="24" ry="8" stroke="#4B5563" strokeWidth="2"/><ellipse cx="32" cy="32" rx="8" ry="24" stroke="#4B5563" strokeWidth="2" transform="rotate(45 32 32)"/></svg>
          {/* Leaf */}
          <svg className="absolute bottom-8 left-1/4 w-20 h-20 opacity-10" viewBox="0 0 64 64" fill="none"><path d="M32 56C32 56 56 40 56 16C56 16 40 8 32 8C24 8 8 16 8 16C8 40 32 56 32 56Z" stroke="#4B5563" strokeWidth="2"/></svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                لماذا نحن مختلفون؟
              </span>
            </h2>
            <div className="flex justify-center my-8">
              <span className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 shadow-lg text-white text-2xl font-extrabold tracking-wide">
                <svg className="w-7 h-7 text-white opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M7 22V2M17 22V2M2 7h20M2 17h20" />
                </svg>
                طلاب الدكتور غير✌️
              </span>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full mx-auto mt-6"></div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 ${feature.bgColor} rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  
                  <div className="relative bg-white border border-gray-100 rounded-3xl p-8 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className={`text-2xl font-bold ${feature.textColor}`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievements */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${achievement.color} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-2xl">{achievement.icon}</span>
                </div>
                <div className="font-bold text-gray-800 mb-1">{achievement.title}</div>
                <div className="text-sm text-gray-600">{achievement.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
            ماذا يقول طلابنا؟
          </h2>
          
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 transform transition-all duration-500 shadow-2xl">
              <div className="text-6xl mb-6">{testimonials[currentTestimonial].avatar}</div>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </p>
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <div className="font-bold text-gray-800">{testimonials[currentTestimonial].name}</div>
              <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
            </div>
            
            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-rose-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400 w-3'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Courses Section */}
      <section id="courses-section" className="relative py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                {isAuthenticated ? 'دوراتك المخصصة' : 'اكتشف دوراتنا'}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              محتوى تعليمي متميز مصمم خصيصاً لضمان تفوقك الأكاديمي
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full mx-auto mt-6"></div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 via-pink-100/50 to-orange-100/50 rounded-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-2xl">
              <CourseList />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;