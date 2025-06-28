import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import teacherImage from '../../assets/images/teachers/mr.karim2.jpg';
import ApiErrorAlert from '../common/ApiErrorAlert';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
    let academicGrade = grade;
    if (grade === "الصف الأول الثانوي") academicGrade = "Secondary1";
    if (grade === "الصف الثاني الثانوي") academicGrade = "Secondary2";
    if (grade === "الصف الثالث الثانوي") academicGrade = "Secondary3";
    try {
      const result = await register(name, email, password, confirmPassword, phoneNumber, academicGrade);
      if (result.success) {
        navigate('/login');
      } else {
        setError(result.error || 'فشل إنشاء الحساب. الرجاء المحاولة مرة أخرى.');
      }
    } catch (error) {
      setError('حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.');
    }
  };
  const handleRetry = () => setError('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden p-4" dir="rtl">
      {/* Decorative Biology SVGs */}
      <svg className="absolute top-0 left-0 w-40 h-40 opacity-10" viewBox="0 0 64 64" fill="none"><path d="M16 8c0 16 32 32 32 48" stroke="#059669" strokeWidth="2"/><path d="M48 8c0 16-32 32-32 48" stroke="#2563eb" strokeWidth="2"/></svg>
      <svg className="absolute bottom-0 right-0 w-32 h-32 opacity-10" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke="#2563eb" strokeWidth="2"/><rect x="28" y="20" width="8" height="24" rx="4" fill="#2563eb" opacity="0.2"/><rect x="24" y="44" width="16" height="4" rx="2" fill="#059669" opacity="0.2"/></svg>
      {/* Atom Symbol */}
      <svg className="absolute top-1/2 left-10 w-24 h-24 opacity-10" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="8" fill="#059669" opacity="0.1"/><ellipse cx="32" cy="32" rx="24" ry="8" stroke="#059669" strokeWidth="2"/><ellipse cx="32" cy="32" rx="8" ry="24" stroke="#2563eb" strokeWidth="2" transform="rotate(45 32 32)"/></svg>
      {/* Leaf Symbol */}
      <svg className="absolute bottom-10 left-1/3 w-28 h-28 opacity-10" viewBox="0 0 64 64" fill="none"><path d="M32 56C32 56 56 40 56 16C56 16 40 8 32 8C24 8 8 16 8 16C8 40 32 56 32 56Z" stroke="#059669" strokeWidth="2"/></svg>
      {/* Microscope Symbol */}
      <svg className="absolute top-10 right-10 w-24 h-24 opacity-10" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke="#2563eb" strokeWidth="2"/><rect x="28" y="20" width="8" height="24" rx="4" fill="#2563eb" opacity="0.2"/><rect x="24" y="44" width="16" height="4" rx="2" fill="#059669" opacity="0.2"/></svg>
      <div className="w-full max-w-md mx-auto relative z-10">
        <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl px-6 pt-12 pb-10 flex flex-col items-center border border-blue-100 w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 mt-2">إنشاء حساب</h1>
          <p className="text-blue-700 mb-8 text-lg">ابدأ رحلتك مع الأحياء الآن</p>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {error && <ApiErrorAlert message={error} onRetry={handleRetry} />}
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الكامل
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/70 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-sm"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/70 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-sm"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/70 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-sm"
                  placeholder="أدخل رقم هاتفك"
                />
              </div>
              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                  الصف الدراسي
                </label>
                <select
                  id="grade"
                  name="grade"
                  required
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/70 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-sm"
                >
                  <option value="">اختر صفك الدراسي</option>
                  <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
                  <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
                  <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
                </select>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  كلمة المرور
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/70 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-sm"
                  placeholder="أنشئ كلمة مرور"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  تأكيد كلمة المرور
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/70 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-sm"
                  placeholder="أكد كلمة المرور"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
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
          </form>
          <div className="mt-8 w-full">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-gray-500">لديك حساب بالفعل؟</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 