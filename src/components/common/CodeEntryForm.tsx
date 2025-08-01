import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { unitCodeService } from '../../services/unitCodeService';

const CodeEntryForm: React.FC = () => {
  const [code, setCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEnteringCode, setIsEnteringCode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!code.trim()) {
      return;
    }

    setError(null);
    setIsEnteringCode(true);
    
    try {
      const response = await unitCodeService.enterUnitCode(code.trim());
      
      if (response.success) {
        setShowSuccess(true);
        setCode('');
        
        // Show success message for 2 seconds then redirect
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/my-lectures');
        }, 2000);
      } else {
        setError(response.message || 'فشل في إدخال الكود');
      }
    } catch (error: any) {
      const errorMessage = unitCodeService.formatErrorMessage(error);
      setError(errorMessage);
    } finally {
      setIsEnteringCode(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-md">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-700 mb-2 drop-shadow">
            أكواد محاضرات السنتر
          </h2>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-rose-100">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-700 mb-6 text-center">
            ادخل كود المحاضرة علشان تتفتحلك
          </h3>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="mr-3">
                  <p className="text-green-800 font-medium">
                    تم إدخال الكود بنجاح! جاري التوجيه إلى محاضراتك...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mr-3">
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="اكتب كود المحاضرة هنا..."
                className="w-full px-6 py-4 rounded-2xl border-2 border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 bg-white text-lg text-right shadow-sm transition-all duration-200 outline-none"
                disabled={isEnteringCode || showSuccess}
              />
            </div>

            <button
              type="submit"
              disabled={isEnteringCode || showSuccess || !code.trim()}
              className="w-full px-8 py-4 bg-gradient-to-r from-rose-600 to-orange-600 text-white font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isEnteringCode ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  جاري التحقق...
                </div>
              ) : showSuccess ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  تم بنجاح!
                </div>
              ) : (
                'فتح المحاضرة'
              )}
            </button>
          </form>

          {/* Login Prompt for Unauthenticated Users */}
          {!isAuthenticated && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="mr-3">
                  <p className="text-blue-800 text-sm">
                    يجب تسجيل الدخول أولاً لإدخال كود المحاضرة
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEntryForm; 