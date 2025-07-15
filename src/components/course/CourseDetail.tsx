import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCourseApi, CourseDetails } from '../../hooks/useCourseApi';
import { Curriculum } from './Curriculum';
import { checkEnrollment } from '../../services/enrollmentService';
import { getGradeInArabic, getTermInArabic } from '../../utils/gradeTranslations';
import axios from 'axios';

interface ContactInfo {
  id: number;
  whatsApp_Number: string;
  facebook_Page: string;
  youTube_Channel: string;
  tiktokChannel: string;
}

interface ContactApiResponse {
  success: boolean;
  message: string;
  data: ContactInfo[];
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const { fetchCourseDetailsWithoutProgress, isLoading, error, enrollInCourse } = useCourseApi();
  const [selectedSection, setSelectedSection] = useState('curriculum');
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(true);
  
  // Enrollment states
  const [showEnrollmentOptions, setShowEnrollmentOptions] = useState(true); // Show options by default
  const [showCodeInput, setShowCodeInput] = useState(true); // Show code input by default
  const [code, setCode] = useState('');
  const [enrollmentError, setEnrollmentError] = useState('');
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  useEffect(() => {
    const loadCourseDetails = async () => {
      if (id) {
        const response = await fetchCourseDetailsWithoutProgress(id);
        if (response?.success) {
          setCourseDetails(response.data);
        }
      }
    };

    loadCourseDetails();
  }, [id, fetchCourseDetailsWithoutProgress]);

  useEffect(() => {
    const checkUserEnrollment = async () => {
      if (id && currentUser?.id) {
        setIsCheckingEnrollment(true);
        const enrolled = await checkEnrollment(currentUser.id, id);
        setIsEnrolled(enrolled);
        setIsCheckingEnrollment(false);
      } else {
        setIsCheckingEnrollment(false);
      }
    };

    checkUserEnrollment();
  }, [id, currentUser?.id]);

  useEffect(() => {
    const fetchWhatsAppNumber = async () => {
      try {
        const response = await axios.get<ContactApiResponse>('https://api.ibrahim-magdy.com/api/Contact/getAll');
        if (response.data.success && response.data.data.length > 0) {
          setWhatsappNumber(response.data.data[0].whatsApp_Number);
        }
      } catch (error) {
        console.error('Error fetching WhatsApp number:', error);
      }
    };

    fetchWhatsAppNumber();
  }, []);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectTo: `/courses/${id}` } });
      return;
    }
    setShowEnrollmentOptions(true);
  };

  const handleContinue = () => {
    navigate(`/course-player/${id}`);
  };

  const handleWhatsAppContact = () => {
    if (whatsappNumber) {
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=مرحباً، أريد الاستفسار عن التسجيل في الدورة`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleCodeSubmit = async () => {
    if (!code.trim()) {
      setEnrollmentError('يرجى إدخال كود التسجيل');
      setEnrollmentSuccess(false);
      return;
    }

    if (!isAuthenticated) {
      setEnrollmentError('يرجى تسجيل الدخول للتسجيل في هذه الدورة');
      setEnrollmentSuccess(false);
      return;
    }

    try {
      setIsEnrolling(true);
      setEnrollmentError('');
      setEnrollmentSuccess(false);
      const response = await enrollInCourse(id || '', code);
      
      if (response.success && response.message !== 'Code not found.') {
        setEnrollmentSuccess(true);
        setEnrollmentError('');
        setShowSuccessPopup(true);
        // Refresh enrollment status
        if (id && currentUser?.id) {
          const enrolled = await checkEnrollment(currentUser.id, id);
          setIsEnrolled(enrolled);
        }
      } else {
        setEnrollmentSuccess(false);
        setEnrollmentError(response.message || 'كود التسجيل غير صحيح');
      }
    } catch (err) {
      setEnrollmentSuccess(false);
      setEnrollmentError('حدث خطأ أثناء التسجيل في الدورة');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isEnrolling) {
      handleCodeSubmit();
    }
  };

  const resetEnrollmentStates = () => {
    setShowEnrollmentOptions(false);
    setShowCodeInput(false);
    setCode('');
    setEnrollmentError('');
    setEnrollmentSuccess(false);
    setShowSuccessPopup(false);
  };

  const handleStartCourse = () => {
    setShowSuccessPopup(false);
    navigate(`/course-player/${id}`);
  };

  const handleGoToMyCourses = () => {
    setShowSuccessPopup(false);
    navigate('/my-lectures');
  };

  const tabs = [
    { id: 'curriculum', label: 'المنهج' },
    { id: 'overview', label: 'نظرة عامة' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !courseDetails) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">لم يتم العثور على الدورة</h2>
          <p className="text-gray-600 mb-6">الدورة التي تبحث عنها غير موجودة.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            تصفح جميع الدورات
          </button>
        </div>
      </div>
    );
  }
  
  const totalLessons = courseDetails.units.reduce((total, unit) => total + unit.lessons.length, 0);

  return (
    <div className="kadence-theme min-h-screen bg-slate-50" dir="rtl">
      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform animate-pulse">
            {/* Success Icon */}
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">تم التسجيل بنجاح!</h3>
              <p className="text-gray-600">مرحباً بك في {courseDetails?.courseName}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleStartCourse}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:from-green-700 hover:to-green-800 transform hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-green-500/25"
              >
                بدأ
              </button>
              <button
                onClick={handleGoToMyCourses}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-500/25"
              >
                الانتقال لدوراتي
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="hero-section relative bg-gradient-to-br from-indigo-900 to-blue-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-right">
              <div className="inline-flex items-center px-4 py-2 bg-teal-500/20 rounded-full mb-6 gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                <span className="text-teal-300 text-sm font-medium">{getGradeInArabic(courseDetails.grade)}</span>
                <span className="mx-2">•</span>
                <span className="text-teal-300 text-sm font-medium">{totalLessons} درس</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{courseDetails.courseName}</h1>
              <p className="text-xl text-slate-300 mb-8">{courseDetails.description}</p>
              
              {/* Enrollment Section */}
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse items-center">
                <div className="px-6 py-3 bg-teal-500/20 rounded-full text-2xl font-bold">
                  {courseDetails.price.toFixed(2)} جنيه
                </div>
                
                {isCheckingEnrollment ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                ) : isEnrolled ? (
                  <button
                    onClick={handleContinue}
                    className="px-8 py-4 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-indigo-500/25"
                  >
                    استمرار
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    {!showEnrollmentOptions ? (
                      <button
                        onClick={handleEnroll}
                        className="px-8 py-4 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-indigo-500/25"
                      >
                        اشترك الآن
                      </button>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-3">
                        {/* <button
                          onClick={() => setShowCodeInput(true)}
                          className="px-6 py-3 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-lg"
                        >
                          لدي كود تسجيل
                        </button> */}
                        <button
                          onClick={handleWhatsAppContact}
                          className="px-6 py-3 text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition-all duration-300 shadow-lg flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          التواصل مع الإشراف
                        </button>
                       
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Code Input Section */}
              {showCodeInput && (
                <div className="mt-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="أدخل كود التسجيل"
                      className={`flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 text-gray-900
                        ${enrollmentError ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary'}
                      `}
                      disabled={isEnrolling}
                    />
                    <button
                      onClick={handleCodeSubmit}
                      disabled={isEnrolling}
                      className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 disabled:opacity-50"
                    >
                      {isEnrolling ? 'جاري التسجيل...' : 'تسجيل'}
                    </button>

                  </div>
                  {enrollmentError && (
                    <div className="mt-2 text-red-300 text-sm text-center">{enrollmentError}</div>
                  )}
                  {enrollmentSuccess && (
                    <div className="mt-2 text-green-300 text-sm text-center">تم التسجيل بنجاح!</div>
                  )}
                </div>
              )}
            </div>
            
            <div className="mt-10 md:mt-0">
              <div className="relative mx-auto max-w-md">
                <div className="kadence-blob absolute -top-8 -left-8 w-full h-full bg-teal-500/30 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
                <div className="kadence-blob absolute -bottom-8 -right-8 w-full h-full bg-purple-500/30 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="kadence-blob absolute -bottom-8 left-20 w-full h-full bg-pink-500/30 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform hover:scale-[1.02] transition-all duration-500">
                  <img 
                    src={courseDetails.imagePath} 
                    alt={courseDetails.courseName}
                    className="w-full h-auto object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 bg-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Tabs */}
          <div className="flex gap-8 mb-8 border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedSection(tab.id)}
                className={`pb-4 px-2 font-medium transition-all duration-200 ${
                  selectedSection === tab.id
                    ? 'text-teal-600 border-b-2 border-teal-600 transform -translate-y-[2px]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {selectedSection === 'curriculum' ? (
              <Curriculum units={courseDetails.units} courseId={courseDetails.id} />
            ) : (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-6 text-slate-900">عن هذه الدورة</h2>
                <p className="text-slate-600 mb-8 text-lg">{courseDetails.description}</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-6 text-slate-900">تفاصيل الدورة</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-700">الصف: {getGradeInArabic(courseDetails.grade)}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-700">الفصل الدراسي: {getTermInArabic(courseDetails.term)}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-700">{totalLessons} درس</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Kadence theme styles */}
      <style>{`
        .kadence-theme {
          --primary: #14b8a6;
          --primary-light: #e6fffa;
          --secondary: #7c3aed;
          --dark: #0f172a;
          --light: #f8fafc;
          --text: #334155;
          font-family: 'Poppins', 'Segoe UI', sans-serif;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CourseDetail; 
