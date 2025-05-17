import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import teacherImage from '../../assets/images/teachers/omar-elkholy.png';
import ApiErrorAlert from '../common/ApiErrorAlert';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle verification success state
  useEffect(() => {
    if (location.state?.verificationSuccess) {
      setSuccessMessage(location.state.message);
      if (location.state.email) {
        setEmail(location.state.email);
      }
      // Clear the state after reading it
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    try {
      const result = await login(email, password);
      if (result.success) {
        // Always navigate to home page after successful login
        navigate('/', { replace: true });
      } else {
        if (result.isUnconfirmedEmail) {
          navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
        } else {
          setError(result.error || 'فشل تسجيل الدخول');
        }
      }
    } catch (error) {
      setError('حدث خطأ غير متوقع');
    }
  };

  const handleRetry = () => {
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4" dir="rtl">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8 relative">
        {/* Left side - Teacher Image */}
        <div className="md:w-1/2 relative h-[400px] md:h-[550px]">
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg will-change-transform">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent z-10"></div>
            <img
              src={teacherImage}
              alt="أ/ أبراهيم مجدي"
              className="w-full h-full object-cover object-[center_top]"
              loading="eager"
              decoding="async"
            />
            <div className="absolute bottom-0 right-0 left-0 p-8 z-20 bg-gradient-to-t from-blue-900/90 to-transparent">
              <h2 className="text-3xl font-bold mb-2 text-white">أ/ أبراهيم مجدي</h2>
              <p className="text-blue-100 text-lg">مدرس اللغة العربية</p>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg w-full max-w-md mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">مرحباً بعودتك!</h1>
              <p className="text-gray-600">سجل دخولك لمواصلة رحلة التعلم</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <ApiErrorAlert message={error} onRetry={handleRetry} />}
              
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-green-700 text-sm font-medium">{successMessage}</p>
                </div>
              )}

              <div className="space-y-5">
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
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="أدخل كلمة المرور"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link to="/reset-password" className="font-medium text-blue-600 hover:text-blue-700">
                    نسيت كلمة المرور؟
                  </Link>
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
                      جاري تسجيل الدخول...
                    </>
                  ) : (
                    'تسجيل الدخول'
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
                  <span className="px-4 bg-white text-gray-500">جديد على منصتنا؟</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/register"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  إنشاء حساب جديد
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 