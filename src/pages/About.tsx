import React from 'react';
import teacherImage from '../assets/images/teachers/mahmoudelshikh.png';

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
                    alt="م. محمود الشيخ - مدرس التاريخ"
                    className="w-full h-auto max-w-lg rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute -bottom-6 right-8 left-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1 font-arabic text-center">
                      م. محمود الشيخ
                    </h1>
                    <div className="flex justify-center">
                      <span className="text-lg text-blue-600 font-medium font-arabic">مدرس التاريخ</span>
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
              <span className="text-blue-800 font-semibold">مدرس التاريخ المتميز</span>
            </div>

            {/* About Section */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
                <p className="text-xl leading-relaxed text-gray-700 mb-6 font-arabic">
                  م. محمود الشيخ - مدرس متميز في التاريخ مع خبرة أكثر من 10 سنوات في التدريس. تخرج من كلية الآداب قسم التاريخ بتقدير امتياز، ويحمل درجة الماجستير في التاريخ الإسلامي.
                </p>
                <p className="text-lg text-gray-600 font-arabic mb-4">
                  متخصص في تدريس التاريخ لجميع المراحل الدراسية، من الابتدائية حتى الثانوية العامة، مع التركيز على تبسيط الأحداث التاريخية وجعل التعلم ممتعاً وفعالاً.
                </p>
                <p className="text-lg text-gray-600 font-arabic">
                  عمل في العديد من المدارس والمراكز التعليمية المرموقة، وساعد مئات الطلاب في تحقيق التفوق الدراسي والنجاح في الامتحانات.
                </p>
              </div>
            </div>

            {/* Qualifications */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center ml-3">
                  <span className="text-blue-600">✓</span>
                </span>
                المؤهلات والدورات
              </h2>
              <div className="grid gap-4">
                {[
                  'ماجستير التاريخ الإسلامي',
                  'دبلومة في طرق التدريس الحديثة',
                  'شهادة في تعليم التاريخ التفاعلي',
                  'دورة في تعليم التاريخ الحديث',
                  'شهادة في إدارة الفصول الدراسية',
                  'دورة في تقنيات التعليم الإلكتروني'
                ].map((cert, index) => (
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
                ما يميز أسلوب التدريس
              </h2>
              <div className="grid gap-4">
                {[
                  'تبسيط الأحداث التاريخية بطريقة سهلة',
                  'استخدام قصص وأمثلة من التاريخ',
                  'التدريب المستمر على تحليل الأحداث',
                  'التركيز على الفهم العميق للتاريخ',
                  'استخدام التقنيات الحديثة في التعليم',
                  'المتابعة المستمرة لتقدم الطالب'
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

            {/* Subjects Taught */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
                <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center ml-3">
                  <span className="text-green-600">📚</span>
                </span>
                المواد الدراسية
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { subject: 'التاريخ', level: 'جميع المراحل' },
                  { subject: 'التاريخ الإسلامي', level: 'الثانوية العامة' },
                  { subject: 'التاريخ الحديث', level: 'الثانوية العامة' },
                  { subject: 'التاريخ القديم', level: 'المرحلة الثانوية' },
                  { subject: 'تاريخ مصر', level: 'المرحلة الثانوية' },
                  { subject: 'تاريخ العالم', level: 'الثانوية العامة' }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200"
                  >
                    <h3 className="font-bold text-gray-800 mb-1">{item.subject}</h3>
                    <p className="text-sm text-gray-600">{item.level}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
                <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center ml-3">
                  <span className="text-purple-600">📊</span>
                </span>
                إحصائيات التدريس
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { number: '10+', label: 'سنوات خبرة' },
                  { number: '500+', label: 'طالب نجحوا' },
                  { number: '1000+', label: 'درس تم تقديمه' },
                  { number: '95%', label: 'معدل نجاح الطلاب' }
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className="text-center bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-xl"
                  >
                    <div className="text-2xl font-bold text-purple-600 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="relative group inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
              <button className="relative px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                ابدأ رحلة التفوق مع منصة م. محمود الشيخ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 