import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import teacherImage from '../../assets/images/teachers/omar-elkholy2.png';
import ApiErrorAlert from '../common/ApiErrorAlert';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [parentPhoneNumber, setParentPhoneNumber] = useState(''); // Parent phone
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    if (!grade) {
      setError('الرجاء اختيار الصف الدراسي');
      return;
    }

    if (!phoneNumber) {
      setError('رقم الهاتف مطلوب');
      return;
    }

    if (!parentPhoneNumber) {
      setError('رقم هاتف ولي الأمر مطلوب');
      return;
    }

    // Convert grade format for API
    let academicGrade = grade;
    if (grade === "الصف الأول الثانوي") academicGrade = "Secondary1";
    if (grade === "الصف الثاني الثانوي") academicGrade = "Secondary2";
    if (grade === "الصف الثالث الثانوي") academicGrade = "Secondary3";

    try {
      const result = await register(name, email, password, confirmPassword, phoneNumber, academicGrade);
      
      if (result.success) {
        // Navigate directly to login page with success message
        navigate('/login', {
          state: {
            registrationSuccess: true,
            message: 'تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول.',
            email: email
          }
        });
      } else {
        setError(result.error || 'فشل إنشاء الحساب. الرجاء المحاولة مرة أخرى.');
      }
    } catch (error) {
      setError('حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.');
    }
  };

  const handleRetry = () => {
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4" dir="rtl">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8 relative">
        {/* Left side - Teacher Image */}
        <div className="md:w-1/2 relative h-[400px] md:h-[550px] w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-3xl"></div>
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-[1.02]">
            {/* Loading placeholder */}
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/50 to-transparent opacity-60 z-10"></div>
            
            {/* Image */}
            <img
              src={teacherImage}
              alt="أ/ إبراهيم مجدي"
              className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-700 ease-out"
              style={{
                objectPosition: '50% 20%',
                imageRendering: 'crisp-edges'
              }}
              loading="eager"
              onLoad={(e) => {
                const target = e.target as HTMLImageElement;
                target.previousElementSibling?.classList.add('opacity-0');
                target.previousElementSibling?.classList.remove('animate-pulse');
              }}
            />

            {/* Content overlay */}
            <div className="absolute bottom-0 right-0 left-0 p-8 z-20 bg-gradient-to-t from-blue-900 to-transparent">
              <div className="transform transition-all duration-300 hover:translate-y-[-5px]">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                  م. محمود الشيخ
                </h2>
                <p className="text-blue-50 text-base md:text-lg opacity-90">
                  انضم إلى مجتمع تعلم اللغة العربية
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg w-full max-w-md mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">إنشاء حساب</h1>
              <p className="text-gray-600">ابدأ رحلة التعلم اليوم</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <ApiErrorAlert message={error} onRetry={handleRetry} />}

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    الاسم الكامل
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    رقم الهاتف
                  </label>
                  <div className="relative">
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="أدخل رقم هاتفك"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="parentPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    ادخل رقم هاتف ولي الامر
                  </label>
                  <div className="relative">
                    <input
                      id="parentPhoneNumber"
                      name="parentPhoneNumber"
                      type="tel"
                      required
                      value={parentPhoneNumber}
                      onChange={(e) => setParentPhoneNumber(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="ادخل رقم هاتف ولي الامر"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                    الصف الدراسي
                  </label>
                  <div className="relative">
                    <select
                      id="grade"
                      name="grade"
                      required
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                    >
                      <option value="">اختر صفك الدراسي</option>
                      <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
                      <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
                      <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="أنشئ كلمة مرور"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    تأكيد كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="أكد كلمة المرور"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -mr-1 ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري إنشاء الحساب...
                    </>
                  ) : (
                    'إنشاء الحساب'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">لديك حساب بالفعل؟</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  تسجيل الدخول
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 