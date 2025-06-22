import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiErrorAlert from '../common/ApiErrorAlert';
import { authService } from '../../services/api';

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await authService.verifyOtp(email, otp);
      if (result.success) {
        navigate('/login', {
          state: {
            verificationSuccess: true,
            message: 'تم التحقق من البريد الإلكتروني بنجاح! يمكنك الآن تسجيل الدخول.',
            email: email
          }
        });
      } else {
        setError(result.error || 'فشل التحقق من الرمز. الرجاء المحاولة مرة أخرى.');
      }
    } catch (error) {
      setError('حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setResendSuccess(false);
    setIsResending(true);

    try {
      const result = await authService.resendOtp(email);
      if (result.success) {
        setResendSuccess(true);
        // Clear the success message after 5 seconds
        setTimeout(() => setResendSuccess(false), 5000);
      } else {
        setError(result.error || 'فشل إعادة إرسال الرمز. الرجاء المحاولة مرة أخرى.');
      }
    } catch (error) {
      setError('حدث خطأ غير متوقع أثناء إعادة إرسال الرمز.');
    } finally {
      setIsResending(false);
    }
  };

  const handleRetry = () => {
    setError('');
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4" dir="rtl">
        <div className="bg-white rounded-3xl p-8 shadow-lg max-w-md w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">طلب غير صالح</h1>
            <p className="text-gray-600 mb-6">لم يتم تقديم عنوان بريد إلكتروني للتحقق.</p>
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              العودة إلى تسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">تحقق من بريدك الإلكتروني</h1>
            <p className="text-gray-600">أدخل رمز التحقق المرسل إلى {email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <ApiErrorAlert message={error} onRetry={handleRetry} />}
            {resendSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                <p className="text-green-700 text-sm">
                  تم إرسال رمز تحقق جديد إلى بريدك الإلكتروني.
                </p>
              </div>
            )}

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                رمز التحقق
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                placeholder="أدخل رمز التحقق"
              />
            </div>

            <div className="space-y-4">
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
                    جاري التحقق...
                  </>
                ) : (
                  'تحقق من البريد الإلكتروني'
                )}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending}
                className={`w-full flex justify-center py-3 px-4 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 ${isResending ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isResending ? (
                  <>
                    <svg className="animate-spin -mr-1 ml-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري إعادة الإرسال...
                  </>
                ) : (
                  'إعادة إرسال رمز التحقق'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification; 