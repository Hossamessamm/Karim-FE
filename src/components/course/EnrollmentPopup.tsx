import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourseApi } from '../../hooks/useCourseApi';
import { useAuth } from '../../contexts/AuthContext';

interface EnrollmentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

const EnrollmentPopup: React.FC<EnrollmentPopupProps> = ({ isOpen, onClose, courseId }) => {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showModeratorContact, setShowModeratorContact] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const { enrollInCourse } = useCourseApi();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      // Reset states when opening
      setError('');
      setCode('');
      setSuccess(false);
      setShowCodeInput(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setShowCodeInput(false);
      setError('');
      setCode('');
      setSuccess(false);
      setIsClosing(false);
    }, 200);
  };

  const handleCodeSubmit = async () => {
    if (!code.trim()) {
      setError('Please enter an enrollment code');
      setSuccess(false);
      return;
    }

    if (!isAuthenticated) {
      setError('Please log in to enroll in this course');
      setSuccess(false);
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setSuccess(false);
      const response = await enrollInCourse(courseId, code);
      
      console.log('API Response:', response);
      
      if (response.success && response.message !== 'Code not found.') {
        console.log('Setting success to true');
        setSuccess(true);
        setError('');
      } else {
        console.log('Setting error to:', response.message);
        setSuccess(false);
        setError(response.message || 'Invalid enrollment code');
      }
    } catch (err) {
      console.log('Error caught:', err);
      setSuccess(false);
      setError('An error occurred while enrolling in the course');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleCodeSubmit();
    }
  };

  const handleGoToCourse = () => {
    navigate(`/course-player/${courseId}`);
    onClose();
  };

  const handleGoToEnrolledCourses = () => {
    navigate('/enrolled-courses');
    onClose();
  };

  const handleConnectModerator = () => {
    // This would typically open a chat or contact form
    window.alert('Connecting with moderator... (This is a mock implementation)');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div 
        className={`relative w-full max-w-lg transform rounded-2xl bg-white shadow-2xl transition-all duration-300 
          ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
          ${showCodeInput ? 'sm:max-w-md' : 'sm:max-w-lg'}`}
      >
        <div className="p-6 sm:p-8" dir="rtl">
          {!showCodeInput && !success && !error && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">اختر طريقة التسجيل  </h2>
                <p className="text-gray-600">حدد كيف تريد التسجيل في هذه الدورة</p>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => setShowCodeInput(true)}
                  className="group relative w-full flex items-center justify-center gap-3 py-3 px-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/25"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  لدي كود تسجيل
                  <span className="absolute left-4 opacity-0 group-hover:opacity-100 transition-opacity">←</span>
                </button>
                <button
                  onClick={() => setShowModeratorContact(true)}
                  className="group relative w-full flex items-center justify-center gap-3 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  تواصل مع المشرف
                  <span className="absolute left-4 opacity-0 group-hover:opacity-100 transition-opacity">←</span>
                </button>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-2 px-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                إلغاء
              </button>
            </div>
          )}

          {(showCodeInput || error) && !success && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">أدخل الكود</h2>
                <p className="text-gray-600">يرجى إدخال كود التسجيل أدناه</p>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="أدخل كود التسجيل"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200
                      ${error ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary'}
                    `}
                    disabled={isLoading}
                  />
                  {error && (
                    <div className="absolute -bottom-6 right-0 text-red-500 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error === 'Please enter an enrollment code' ? 'يرجى إدخال كود التسجيل' :
                       error === 'Please log in to enroll in this course' ? 'يرجى تسجيل الدخول للتسجيل في هذه الدورة' :
                       error === 'Invalid enrollment code' ? 'كود التسجيل غير صالح' :
                       error === 'Code not found.' ? 'الكود غير موجود' :
                       error === 'An error occurred while enrolling in the course' ? 'حدث خطأ أثناء التسجيل في الدورة' :
                       error}
                    </div>
                  )}
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleCodeSubmit}
                    disabled={isLoading}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200
                      ${isLoading 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-primary/25'
                      }
                    `}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        جاري التحقق...
                      </span>
                    ) : 'تحقق من الكود'}
                  </button>
                  <button
                    onClick={() => {
                      setShowCodeInput(false);
                      setError('');
                      setCode('');
                    }}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200"
                    disabled={isLoading}
                  >
                    رجوع
                  </button>
                </div>
              </div>
            </div>
          )}

          {success && !error && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">تم التسجيل بنجاح!</h2>
                <p className="text-gray-600">تم تسجيلك في الدورة بنجاح</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleGoToCourse}
                  className="flex-1 py-3 px-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/25"
                >
                  ابدأ الدورة
                </button>
                <button
                  onClick={handleGoToEnrolledCourses}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200"
                >
                  عرض دوراتي
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPopup; 