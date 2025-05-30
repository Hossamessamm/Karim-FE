import React from 'react';
import CourseList from '../components/course/CourseList';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import teacherImage from '../assets/images/teachers/omar-elkholy.png';

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
    { number: '4000+', label: 'طالب مشترك' },
    { number: '99+', label: 'فيديو تعليمي' },
    { number: '24 ساعة', label: 'دعم متواصل' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-light/5 to-white" dir="rtl">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Modern background elements */}
        <div className="absolute inset-0">
          {/* Animated gradient blur */}
          <div className="absolute inset-0 opacity-75 mix-blend-multiply">
            <div className="absolute -inset-[100%] animate-[move_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_deg_60deg,#3b82f610_60deg_120deg,transparent_120deg_180deg,#60a5fa10_180deg_240deg,transparent_240deg_300deg,#3b82f610_300deg)]"></div>
          </div>

          {/* Modern grid */}
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
            <div className="absolute inset-0 backdrop-blur-[100px] bg-[linear-gradient(transparent_1px,white_1px),linear-gradient(90deg,transparent_1px,white_1px)] bg-[size:40px_40px] [background-position:center] opacity-20"></div>
          </div>

          {/* Gradient accent - Adjusted for better mobile visibility */}
          <div className="absolute right-0 top-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute left-0 bottom-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl"></div>

          {/* Modern shapes - Hidden on small screens */}
          <div className="absolute inset-0 hidden sm:block">
            {/* Floating elements */}
            <div className="absolute top-20 right-[20%] animate-float">
              <svg className="w-16 sm:w-20 md:w-24 text-primary/10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
              </svg>
            </div>
            <div className="absolute bottom-32 left-[15%] animate-float-delayed">
              <svg className="w-12 sm:w-14 md:w-16 text-primary/5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z"></path>
              </svg>
            </div>

            {/* Decorative dots */}
            <div className="absolute top-1/4 left-[10%] w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-[30%] w-2 sm:w-3 h-2 sm:h-3 bg-primary/10 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-1/4 left-[25%] w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary/15 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>

        {/* Content container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="text-right space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in order-2 lg:order-1">
              {/* Modern badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-primary/10 animate-slide-down" style={{ animationDelay: '0.2s' }}>
                <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  أفضل منصة تعليمية
                </span>
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary animate-pulse"></div>
              </div>

              {/* Main heading */}
              <div className="animate-slide-right" style={{ animationDelay: '0.4s' }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-gray-900">منصة المـبـيـن</span>
                  <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                    منصة تعليمية رائدة
                  </span>
                </h1>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 leading-relaxed">
                أكبر منصة تعليمية متكاملة في الوطن العربي لتعلم اللغة العربية وإتقانها للمرحلة الثانوية.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <button
                  onClick={scrollToCourses}
                  className="group inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                  <span className="font-medium">ابدأ التعلم الآن</span>
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2 rtl:rotate-180 group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <Link
                  to="/about"
                  className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 border border-primary/20 text-primary rounded-xl hover:bg-primary-light hover:border-primary transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  <span className="font-medium">تعرف علينا</span>
                </Link>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center px-2 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 group">
                    <div className="text-base sm:text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div className="relative flex items-center justify-center lg:justify-end opacity-0 animate-image-reveal order-1 lg:order-2" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                {/* Main image container */}
                <div className="relative bg-white rounded-2xl p-2 sm:p-3 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-primary/10">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-white rounded-2xl opacity-50"></div>
                  <img
                    src={teacherImage}
                    alt="المعلم إبراهيم مجدي"
                    className="w-full h-auto rounded-xl relative z-10"
                    style={{ opacity: 0 }}
                    onLoad={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.transition = 'opacity 0.5s ease-in';
                      img.style.opacity = '1';
                    }}
                  />
                  
                  {/* Achievement card */}
                  <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-white rounded-xl shadow-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3 animate-float border border-primary/10 backdrop-blur-sm opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                    <div className="bg-primary-light rounded-lg p-1.5 sm:p-2">
                      <svg className="w-4 h-4 sm:w-6 sm:h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">خبرة تدريس</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">+10 سنوات</div>
                    </div>
                  </div>

                  {/* Students card */}
                  <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white rounded-xl shadow-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3 animate-float-delayed border border-primary/10 backdrop-blur-sm opacity-0" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
                    <div className="bg-primary-light rounded-lg p-1.5 sm:p-2">
                      <svg className="w-4 h-4 sm:w-6 sm:h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">طلاب نشطين</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">+1000طالب</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How Basatthalk Works Section */}
      <section className="relative py-16 sm:py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2 rtl:gap-4">
              <span>منصة</span>
              <span className="text-primary font-extrabold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">                    الـمُـبِـيـنْ
              </span>
              <span>هتفيدك بإيه</span>
            </h2>
            <div className="flex justify-center">
              <svg width="120" height="16" viewBox="0 0 120 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10C30 0 90 20 110 10" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-blue-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-md">
              <div className="mb-4">
                {/* Clipboard Icon */}
                <svg className="w-10 h-10 text-blue-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="6" y="4" width="12" height="16" rx="2" strokeWidth="1.5" />
                  <rect x="9" y="2" width="6" height="4" rx="1" strokeWidth="1.5" />
                  <path d="M9 8h6M9 12h6M9 16h2" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">
                <span className="bg-yellow-200 text-yellow-700 rounded px-2 py-0.5 font-extrabold">هتتدرب</span>
              </h3>
              <p className="text-gray-700 text-sm">بعد كل درس في امتحان علشان تقييم نفسك 📝</p>
            </div>
            {/* Card 2 */}
            <div className="bg-blue-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-md">
              <div className="mb-4">
                {/* Map/Location Icon */}
                <svg className="w-10 h-10 text-blue-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 21c-4.418 0-8-4.03-8-9 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.97-3.582 9-8 9z" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">
                <span className="bg-yellow-200 text-yellow-700 rounded px-2 py-0.5 font-extrabold">هنجهزك</span>
              </h3>
              <p className="text-gray-700 text-sm">مش محتاج تسأل مذاكر إيه النهاردة.. إحنا هنقولك</p>
            </div>
            {/* Card 3 */}
            <div className="bg-blue-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-md">
              <div className="mb-4">
                {/* Flag Icon */}
                <svg className="w-10 h-10 text-blue-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 21V5a2 2 0 012-2h7.5a2 2 0 012 2v2.5a2 2 0 01-2 2H7" strokeWidth="1.5" />
                  <circle cx="7" cy="7" r="1.5" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">
                <span className="bg-yellow-200 text-yellow-700 rounded px-2 py-0.5 font-extrabold">هتتعلم صح</span>
              </h3>
              <p className="text-gray-700 text-sm">فيديوهات لشرح المنهج بطريقة سهلة ومبسطة📚</p>
            </div>
            {/* Card 4 */}
            <div className="bg-blue-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-md">
              <div className="mb-4">
                {/* Chat/Speech Bubble Icon */}
                <svg className="w-10 h-10 text-blue-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <ellipse cx="12" cy="12" rx="9" ry="7" strokeWidth="1.5" />
                  <circle cx="9" cy="12" r="1" fill="currentColor" />
                  <circle cx="12" cy="12" r="1" fill="currentColor" />
                  <circle cx="15" cy="12" r="1" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">
                <span className="bg-yellow-200 text-yellow-700 rounded px-2 py-0.5 font-extrabold">مش هتبقى لوحدك </span>
              </h3>
              <p className="text-gray-700 text-sm">هنتابع معاك أول بأول </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Courses Section */}
      <div id="courses-section" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-dark">
              {isAuthenticated 
                ? 'الدورات المقترحة لك'
                : 'استكشف دوراتنا التعليمية'}
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              اختر من مجموعة متنوعة من الدورات التعليمية المصممة خصيصاً لك
            </p>
          </div>
          <div className="mt-12">
            <CourseList />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes move {
          100% { transform: translate(100%, 100%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes image-reveal {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slide-right {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite, fade-in 0.5s ease-out forwards;
        }

        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite, fade-in 0.5s ease-out forwards;
          animation-delay: 1.5s;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-image-reveal {
          animation: image-reveal 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.8s ease-out forwards;
        }

        .animate-slide-right {
          animation: slide-right 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home; 