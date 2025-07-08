import React from 'react';
import teacherImage from '../assets/images/teachers/omar-elkholy2.png';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="min-h-screen flex flex-col lg:flex-row">
          {/* Left Side - Photo */}
          <div className="lg:w-[45%] bg-white relative">
            <div className="sticky top-0 h-screen flex items-center justify-center p-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative">
                  <img
                    src={teacherImage}
                    alt="الأستاذ إبراهيم مجدي"
                    className="w-full h-auto max-w-lg rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute -bottom-6 right-8 left-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1 font-arabic text-center">
                      الأستاذ إبراهيم مجدي
                    </h1>
                    <div className="flex justify-center">
                      <span className="text-lg text-blue-600 font-medium font-arabic">منصة م.محمود الشيخ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-[55%] bg-white p-8 lg:p-16">
            {/* Title Badge */}
            <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-2 mb-12">
              <span className="w-2 h-2 bg-blue-600 rounded-full ml-3"></span>
              <span className="text-blue-800 font-semibold">مُعلِّم أول اللغة العربية</span>
            </div>

            {/* About Section */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
                <p className="text-xl leading-relaxed text-gray-700 mb-6 font-arabic">
                  تخرَّج من كلية التربية قسم اللغة العربية بتقدير امتياز مع مرتبة الشرف، خبرة عشْر سنوات في تدريس المناهج الثانوية العامة.
                </p>
                <p className="text-lg text-gray-600 font-arabic">
                  مُعلِّم أول للغة في أكاديمية إدراك الحديثة الدولية، والعديد من المراكز المشهورة.
                </p>
              </div>
            </div>

            {/* Qualifications */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center ml-3">
                  <span className="text-blue-600">✓</span>
                </span>
                الدورات والمؤهلات
              </h2>
              <div className="grid gap-4">
                {['المُعلِّم المثالي', 'صعوبات التعلم', 'إدارة الصف'].map((cert, index) => (
                  <div 
                    key={index} 
                    className="flex items-center bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-colors"
                  >
                    <span className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center ml-4 text-blue-600 font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center ml-3">
                  <span className="text-blue-600">★</span>
                </span>
                ما يميز أسلوبنا
              </h2>
              <div className="grid gap-4">
                {[
                  'التدرج في شرح المعلومات',
                  'تبسيط الشرح لحد الإتقان',
                  'التدريب المستمر للوصل لمستوى عالٍ',
                  'الخبرة والتمكن من اللغة'
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="group flex items-center bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center ml-4 group-hover:scale-110 transition-transform">
                      <span className="text-white">{'٠' + (index + 1)}</span>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="relative group inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
              <button className="relative px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                ابدأ رحلة التفوق معنا
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 