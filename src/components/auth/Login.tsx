import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, GraduationCap, Sparkles, ArrowRight } from 'lucide-react';
import FloatingBiologyIcons from '../common/FloatingBiologyIcons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isMaxDevicesError, setIsMaxDevicesError] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const validateEmailOrMobile = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^01[0-9]{9}$/;
    return emailRegex.test(value) || mobileRegex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsMaxDevicesError(false);

    if (!validateEmailOrMobile(email)) {
      setError('يرجى إدخال بريد إلكتروني صحيح أو رقم هاتف مصري صحيح');
      return;
    }

    try {
      const result = await login(email, password);
      
      if (result.success) {
        setSuccessMessage('تم تسجيل الدخول بنجاح!');
        // Navigate to home page after successful login
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        if (result.isMaxDevicesError) {
          setIsMaxDevicesError(true);
        } else {
          setError(result.error || 'حدث خطأ في تسجيل الدخول');
        }
      }
    } catch (error) {
      setError('حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.');
    }
  };

  const handleRetry = () => {
    setError('');
    setIsMaxDevicesError(false);
  };

  const handleContactSupport = () => {
    console.log('Contact support clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 font-cairo" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(156,163,175,0.08)_1px,transparent_0)] bg-[size:20px_20px] opacity-30"></div>
      
      {/* Background Floating Biology Icons */}
      <FloatingBiologyIcons 
        count={20}
        opacity={0.12}
        minSize={40}
        maxSize={60}
      />

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
            {/* Biology Icons inside the card */}
            <div className="absolute inset-0 pointer-events-none">
              <FloatingBiologyIcons 
                count={30}
                opacity={0.15}
                minSize={35}
                maxSize={40}
                containerClassName="rounded-3xl"
              />
            </div>

            {/* Content with higher z-index */}
            <div className="relative z-10">
              {/* Logo Section */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">منصة د/ كريم أيوب</h2>
                <p className="text-slate-600 text-sm">للتعليم والتفوق</p>
              </div>

              {/* Welcome Text */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">أهلاً وسهلاً</h1>
                <p className="text-slate-600">سجل دخولك للمتابعة</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Messages */}
                {error && !isMaxDevicesError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700 text-sm">{error}</p>
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      حاول مرة أخرى
                    </button>
                  </div>
                )}

                {isMaxDevicesError && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-amber-800 mb-2">تم تجاوز الحد المسموح به من الأجهزة</h3>
                    <p className="text-sm text-amber-700 mb-4">
                      لا يمكنك تسجيل الدخول من أكثر من جهازين. يرجى تسجيل الخروج من أحد الأجهزة الأخرى أو التواصل مع الدعم الفني.
                    </p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleContactSupport}
                        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                      >
                        تواصل مع الدعم
                      </button>
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        حاول مرة أخرى
                      </button>
                    </div>
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-green-700 text-sm font-medium">{successMessage}</p>
                  </div>
                )}

                {/* Email/Phone Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    البريد الإلكتروني أو رقم الهاتف
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 bg-white border border-gray-300 rounded-xl text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200"
                      placeholder="أدخل بريدك الإلكتروني أو رقم الجوال"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pr-10 pl-12 py-3 bg-white border border-gray-300 rounded-xl text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200"
                      placeholder="أدخل كلمة المرور"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="text-left">
                    <button className="text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors">
                      نسيت كلمة المرور؟
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent ml-3"></div>
                        جاري تسجيل الدخول...
                      </>
                    ) : (
                      <>
                        تسجيل الدخول
                        <ArrowRight className="w-4 h-4 mr-2" />
                      </>
                    )}
                  </div>
                </button>
              </form>

              {/* Divider */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500">جديد على منصتنا؟</span>
                  </div>
                </div>

                {/* Register Link */}
                <div className="mt-6 text-center">
                  <Link
                    to="/register"
                    className="inline-flex items-center px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <Sparkles className="w-4 h-4 ml-2 text-rose-500" />
                    إنشاء حساب جديد
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-slate-500 text-sm mt-8">
            بتسجيل الدخول، أنت توافق على شروط الاستخدام وسياسة الخصوصية
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;