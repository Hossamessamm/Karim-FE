import React from 'react';
import teacherImage from '../assets/images/teachers/mr.karim2.jpg';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50" dir="rtl">
      {/* Header Section with Photo */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center bg-emerald-100 rounded-full px-6 py-3">
                <div className="w-3 h-3 bg-emerald-600 rounded-full ml-3 animate-pulse"></div>
                <span className="text-emerald-800 font-bold text-lg">طبيب و مُدرِّس الأحياء</span>
              </div>
            </div>
            
            {/* Teacher Photo and Text Layout */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
              {/* Teacher Photo - Left Side */}
              <div className="order-2 lg:order-1">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-blue-400/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white rounded-3xl p-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                    <img
                      src={teacherImage}
                      alt="د/ كريم أيوب"
                      className="w-72 h-96 rounded-2xl object-contain shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500 bg-white"
                      />
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white rounded-full p-3 shadow-lg border-2 border-emerald-100">
                        <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Text Content - Right Side */}
              <div className="order-1 lg:order-2 text-center lg:text-right">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-arabic">
                  د/ كريم أيوب
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                  طبيب بكلية الطب جامعة عين شمس - مستشفى الدمرداش
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Bio Section */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center ml-4">
                <span className="text-white text-2xl">🧬</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 font-arabic">نبذة عن الدكتور</h2>
            </div>
            <div className="bg-gradient-to-br from-emerald-50/50 to-blue-50/50 rounded-2xl p-8">
              <p className="text-xl leading-relaxed text-gray-700 mb-6 font-arabic">
                خبرة أكثر من خمس سنوات في تدريس مادة الأحياء للصف الثالث الثانوي العام والأزهر 
                بأكبر مراكز القاهرة والقليوبية وأسيوط وسوهاج.
              </p>
              <div className="bg-white/80 rounded-xl p-6 border-l-4 border-emerald-500">
                <p className="text-lg text-gray-700 font-arabic">
                  <strong className="text-emerald-700">التميز في الحل:</strong> اشتهر د.كريم أيوب باهتمامه بجزء الحل، 
                  حيث يعمل الدكتور على حل جميع الكتب الخارجية المتواجدة في مادة الأحياء مع الطلاب.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience & Locations */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Experience Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center ml-3">
                <span className="text-blue-600 text-xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-arabic">الخبرة التعليمية</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-emerald-500 rounded-full ml-3"></span>
                أكثر من 5 سنوات خبرة
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-emerald-500 rounded-full ml-3"></span>
                الثانوية العامة والأزهر
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-emerald-500 rounded-full ml-3"></span>
                تخصص في مادة الأحياء
              </li>
            </ul>
          </div>

          {/* Locations Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center ml-3">
                <span className="text-emerald-600 text-xl">📍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-arabic">مناطق التدريس</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['القاهرة', 'القليوبية', 'أسيوط', 'سوهاج'].map((location, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors">
                  <span className="text-gray-700 font-medium">{location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Teaching Approach */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="flex items-center mb-10">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-2xl flex items-center justify-center ml-4">
                <span className="text-white text-2xl">⚗️</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 font-arabic">منهجية التدريس</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">🔬</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-arabic">الشرح العلمي</h3>
                <p className="text-gray-700 leading-relaxed">
                  شرح مبسط ومتدرج يربط النظرية بالتطبيق العملي
                </p>
              </div>

              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">📖</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-arabic">حل الكتب</h3>
                <p className="text-gray-700 leading-relaxed">
                  حل شامل لجميع الكتب الخارجية المتاحة في المادة
                </p>
              </div>

              <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 hover:from-purple-100 hover:to-purple-200 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-arabic">التدريب المكثف</h3>
                <p className="text-gray-700 leading-relaxed">
                  تدريب مستمر على حل المسائل والتطبيقات العملية
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Specialization Highlight */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
            <div className="relative">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center ml-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h2 className="text-3xl font-bold font-arabic">ما يميزنا</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 font-arabic">الخلفية الطبية</h3>
                  <p className="text-white/90 leading-relaxed">
                    فهم عميق للمفاهيم البيولوجية من خلال التطبيق الطبي العملي
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 font-arabic">التركيز على الحل</h3>
                  <p className="text-white/90 leading-relaxed">
                    اهتمام خاص بجزء الحل والتطبيق العملي لضمان فهم كامل
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-block relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <button className="relative px-12 py-6 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold text-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 transform group-hover:scale-105 shadow-xl">
              ابدأ رحلة التفوق في الأحياء
            </button>
          </div>
          <p className="mt-6 text-gray-600 text-lg">
            انضم إلى آلاف الطلاب الذين حققوا النجاح معنا
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;