import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import teacherImage from '../../assets/images/teachers/omar-elkholy.png';
import ApiErrorAlert from '../common/ApiErrorAlert';

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
              {error && !isMaxDevicesError && <ApiErrorAlert message={error} onRetry={handleRetry} />}
              
              {isMaxDevicesError && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="mr-3">
                      <h3 className="text-sm font-medium text-yellow-800">تم تجاوز الحد المسموح به من الأجهزة</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>لا يمكنك تسجيل الدخول من أكثر من جهازين. يرجى تسجيل الخروج من أحد الأجهزة الأخرى أو التواصل مع الدعم الفني.</p>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={handleContactSupport}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          تواصل مع الدعم الفني
                        </button>
                        <button
                          type="button"
                          onClick={handleRetry}
                          className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          حاول مرة أخرى
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
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
                  <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-700">
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