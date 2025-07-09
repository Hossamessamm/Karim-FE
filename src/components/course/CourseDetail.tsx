import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCourseApi, CourseDetails } from '../../hooks/useCourseApi';
import { Curriculum } from './Curriculum';
import EnrollmentPopup from './EnrollmentPopup';
import { checkEnrollment } from '../../services/enrollmentService';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const { fetchCourseDetailsWithoutProgress, isLoading, error } = useCourseApi();
  const [selectedSection, setSelectedSection] = useState('curriculum');
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [showEnrollmentPopup, setShowEnrollmentPopup] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(true);
  
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

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectTo: `/courses/${id}` } });
      return;
    }
    setShowEnrollmentPopup(true);
  };

  const handleContinue = () => {
    navigate(`/course-player/${id}`);
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
      {/* Hero Section */}
      <div className="hero-section relative bg-gradient-to-br from-indigo-900 to-blue-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-right">
              <div className="inline-flex items-center px-4 py-2 bg-teal-500/20 rounded-full mb-6 gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                <span className="text-teal-300 text-sm font-medium">الصف {courseDetails.grade}</span>
                <span className="mx-2">•</span>
                <span className="text-teal-300 text-sm font-medium">{totalLessons} درس</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{courseDetails.courseName}</h1>
              <p className="text-xl text-slate-300 mb-8">{courseDetails.description}</p>
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
                  <button
                    onClick={handleEnroll}
                    className="px-8 py-4 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-indigo-500/25"
                  >
                    اشترك الآن
                  </button>
                )}
              </div>
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
                        <span className="text-slate-700">الصف: {courseDetails.grade}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-700">الفصل الدراسي: {courseDetails.term}</span>
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
      
      {/* Enrollment Popup */}
      <EnrollmentPopup
        isOpen={showEnrollmentPopup}
        onClose={() => setShowEnrollmentPopup(false)}
        courseId={id || ''}
      />

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
