import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ApiErrorAlert from '../common/ApiErrorAlert';
import { Mail, Lock, Eye, EyeOff, GraduationCap, Sparkles, BookOpen, Star } from 'lucide-react';

// Define the login result type based on the AuthContext
interface LoginResult {
  success: boolean;
  error?: string;
  isUnconfirmedEmail?: boolean;
  isMaxDevicesError?: boolean;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isMaxDevicesError, setIsMaxDevicesError] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle verification and registration success state
  useEffect(() => {
    if (location.state?.verificationSuccess || location.state?.registrationSuccess) {
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
    setIsMaxDevicesError(false);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Always navigate to home page after successful login
        navigate('/', { replace: true });
      } else if (result.isMaxDevicesError) {
        // Handle max devices error using the flag from the API service
        setIsMaxDevicesError(true);
        setError(result.error || "You can't log in from more than two devices.");
      } else {
        // Handle other errors
        setError(result.error || 'فشل تسجيل الدخول');
      }
    } catch (error: any) {
      const maxDevicesErrorMessage = "You can't log in from more than two devices.";
      const errorMessage = error.message || error.toString();
      
      if (errorMessage.includes(maxDevicesErrorMessage)) {
        setIsMaxDevicesError(true);
        setError(maxDevicesErrorMessage);
      } else {
        setError(errorMessage || 'حدث خطأ غير متوقع');
      }
    }
  };

  const handleRetry = () => {
    setError('');
    setIsMaxDevicesError(false);
  };

  const handleContactSupport = () => {
    // Fetch WhatsApp number and redirect to WhatsApp
    fetch('https://api.ibrahim-magdy.com/api/Contact/getAll')
      .then(response => response.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          const whatsappNumber = data.data[0].whatsApp_Number;
          if (whatsappNumber) {
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=مرحباً، أواجه مشكلة في تسجيل الدخول. لقد تجاوزت الحد المسموح به من الأجهزة. البريد الإلكتروني: ${encodeURIComponent(email)}`;
            window.open(whatsappUrl, '_blank');
          }
        }
      })
      .catch(err => console.error('Error fetching contact info:', err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300 hover:scale-110">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            مرحباً بعودتك!
          </h1>
          <p className="text-gray-600 text-lg">
            سجل دخولك لمواصلة رحلة التعلم
          </p>
          
          {/* Feature Icons */}
          <div className="flex justify-center gap-6 mt-8">
            <div className="flex flex-col items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-xs text-gray-600 font-medium">دورات تعليمية</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <Star className="w-6 h-6 text-yellow-500 mb-2" />
              <span className="text-xs text-gray-600 font-medium">محتوى مميز</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <Sparkles className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-xs text-gray-600 font-medium">تجربة فريدة</span>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/60 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 rounded-2xl"></div>
          
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && !isMaxDevicesError && <ApiErrorAlert message={error} onRetry={handleRetry} />}
              
              {isMaxDevicesError && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 shadow-sm">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="mr-3">
                      <h3 className="text-sm font-semibold text-yellow-800">تم تجاوز الحد المسموح به من الأجهزة</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>لا يمكنك تسجيل الدخول من أكثر من جهازين. يرجى تسجيل الخروج من أحد الأجهزة الأخرى أو التواصل مع الدعم الفني.</p>
                      </div>
                      <div className="mt-4 flex gap-3">
                        <button
                          type="button"
                          onClick={handleContactSupport}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
                        >
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          تواصل مع الدعم
                        </button>
                        <button
                          type="button"
                          onClick={handleRetry}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-sm"
                        >
                          حاول مرة أخرى
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {successMessage && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm">
                  <p className="text-green-800 text-sm font-medium">{successMessage}</p>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    كلمة المرور
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pr-10 pl-10 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm"
                      placeholder="أدخل كلمة المرور"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-700 transition-colors hover:underline">
                    نسيت كلمة المرور؟
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg shadow-md ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center">
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -mr-1 ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جاري تسجيل الدخول...
                      </div>
                    ) : (
                      'تسجيل الدخول'
                    )}
                  </div>
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">جديد على منصتنا؟</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
                >
                  <Sparkles className="w-4 h-4 ml-2 text-purple-600" />
                  إنشاء حساب جديد
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Name */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm font-medium">
            منصة م. محمود الشيخ للتعليم
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;