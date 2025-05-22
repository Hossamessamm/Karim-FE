import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { resetPassword, resetPasswordWithOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if email is passed in the URL
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setEmail(emailParam);
      setStep(2); // Jump to OTP input
    }
  }, [location]);
  
  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);
    
    try {
      const result = await resetPassword(email);
      
      if (result.success) {
        setMessage(result.message || 'تم إرسال رمز التحقق إلى بريدك الإلكتروني');
        setStep(2);
      } else {
        setError(result.error || 'فشل إعادة تعيين كلمة المرور');
      }
    } catch (err) {
      setError('فشل إعادة تعيين كلمة المرور');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResetConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    if (newPassword !== confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('كلمة المرور يجب أن تكون على الأقل 6 أحرف');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await resetPasswordWithOtp(
        email,
        otp,
        newPassword,
        confirmPassword
      );
      
      if (result.success) {
        setMessage(result.message || 'تم إعادة تعيين كلمة المرور بنجاح');
        setStep(3);
      } else {
        setError(result.error || 'فشل إعادة تعيين كلمة المرور');
      }
    } catch (err) {
      setError('فشل إعادة تعيين كلمة المرور');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">إعادة تعيين كلمة المرور</h2>
          {step === 1 && (
            <p className="mt-2 text-center text-sm text-gray-600">
              أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق.
            </p>
          )}
          {step === 2 && (
            <p className="mt-2 text-center text-sm text-gray-600">
              تم إرسال رمز التحقق إلى بريدك الإلكتروني. يرجى إدخال الرمز وكلمة المرور الجديدة.
            </p>
          )}
          {step === 3 && (
            <p className="mt-2 text-center text-sm text-gray-600">
              تم إعادة تعيين كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.
            </p>
          )}
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        
        {step === 1 && (
          <form className="mt-8 space-y-6" onSubmit={handleResetRequest}>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isLoading ? 'جاري الإرسال...' : 'إرسال رمز التحقق'}
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                تتذكر كلمة المرور؟{' '}
                <Link to="/login" className="font-medium text-primary hover:text-indigo-500">
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </form>
        )}
        
        {step === 2 && (
          <form className="mt-8 space-y-6" onSubmit={handleResetConfirm}>
            <div>
              <label htmlFor="email-display" className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني
              </label>
              <input
                id="email-display"
                type="email"
                readOnly
                value={email}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none sm:text-sm"
              />
            </div>
            
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
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="أدخل رمز التحقق"
              />
            </div>
            
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                كلمة المرور الجديدة
              </label>
              <input
                id="new-password"
                name="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="أدخل كلمة المرور الجديدة"
              />
              <p className="mt-1 text-xs text-gray-500">كلمة المرور يجب أن تكون على الأقل 6 أحرف</p>
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                تأكيد كلمة المرور
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="أدخل كلمة المرور مرة أخرى"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isLoading ? 'جاري الإرسال...' : 'إعادة تعيين كلمة المرور'}
              </button>
            </div>
          </form>
        )}
        
        {step === 3 && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col items-center justify-center mb-6">
              <svg className="w-16 h-16 text-green-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="11" strokeWidth="2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-lg font-medium text-gray-800">تم إعادة تعيين كلمة المرور بنجاح!</p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              الذهاب لتسجيل الدخول
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword; 