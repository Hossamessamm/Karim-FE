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
  const { fetchCourseDetails, isLoading, error } = useCourseApi();
  const [selectedSection, setSelectedSection] = useState('curriculum');
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [showEnrollmentPopup, setShowEnrollmentPopup] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(true);
  
  useEffect(() => {
    const loadCourseDetails = async () => {
      if (id) {
        const response = await fetchCourseDetails(id);
        if (response?.success) {
          setCourseDetails(response.data);
        }
      }
    };

    loadCourseDetails();
  }, [id, fetchCourseDetails]);

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
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !courseDetails) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50">
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden" dir="rtl">
      {/* Biology SVGs */}
      <svg className="absolute top-0 left-0 w-40 h-40 opacity-10" viewBox="0 0 64 64" fill="none"><path d="M16 8c0 16 32 32 32 48" stroke="#059669" strokeWidth="2"/><path d="M48 8c0 16-32 32-32 48" stroke="#2563eb" strokeWidth="2"/></svg>
      <svg className="absolute bottom-0 right-0 w-32 h-32 opacity-10" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke="#2563eb" strokeWidth="2"/><rect x="28" y="20" width="8" height="24" rx="4" fill="#2563eb" opacity="0.2"/><rect x="24" y="44" width="16" height="4" rx="2" fill="#059669" opacity="0.2"/></svg>
      {/* Atom Symbol */}
      <svg className="absolute top-1/2 left-10 w-24 h-24 opacity-10" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="8" fill="#059669" opacity="0.1"/><ellipse cx="32" cy="32" rx="24" ry="8" stroke="#059669" strokeWidth="2"/><ellipse cx="32" cy="32" rx="8" ry="24" stroke="#2563eb" strokeWidth="2" transform="rotate(45 32 32)"/></svg>
      {/* Leaf Symbol */}
      <svg className="absolute bottom-10 left-1/3 w-28 h-28 opacity-10" viewBox="0 0 64 64" fill="none"><path d="M32 56C32 56 56 40 56 16C56 16 40 8 32 8C24 8 8 16 8 16C8 40 32 56 32 56Z" stroke="#059669" strokeWidth="2"/></svg>
      {/* Microscope Symbol */}
      <svg className="absolute top-10 right-10 w-24 h-24 opacity-10" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke="#2563eb" strokeWidth="2"/><rect x="28" y="20" width="8" height="24" rx="4" fill="#2563eb" opacity="0.2"/><rect x="24" y="44" width="16" height="4" rx="2" fill="#059669" opacity="0.2"/></svg>
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          {/* Course Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
            <div className="relative bg-white rounded-3xl shadow-2xl p-4 md:p-8 border border-blue-100 flex items-center justify-center">
              <img 
                src={courseDetails.imagePath} 
                alt={courseDetails.courseName}
                className="w-72 h-72 md:w-96 md:h-[28rem] object-contain rounded-2xl shadow-xl bg-white" 
              />
            </div>
          </div>
          {/* Course Info */}
          <div className="w-full md:w-1/2 text-center md:text-right">
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-semibold text-sm">
                الصف {courseDetails.grade}
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
                {totalLessons} درس
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold text-sm">
                {courseDetails.price.toFixed(2)} جنيه
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-gray-900">{courseDetails.courseName}</h1>
            <p className="text-xl text-gray-600 mb-8">{courseDetails.description}</p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 items-center">
              {isCheckingEnrollment ? (
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
              ) : isEnrolled ? (
                <button
                  onClick={handleContinue}
                  className="px-8 py-4 text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  استمرار
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="px-8 py-4 text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  اشترك الآن
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div className="py-16 bg-white/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Tabs */}
          <div className="flex gap-8 mb-8 border-b border-gray-200 justify-center md:justify-start">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedSection(tab.id)}
                className={`pb-4 px-2 font-medium transition-all duration-200 border-b-2 ${
                  selectedSection === tab.id
                    ? 'text-emerald-600 border-emerald-600 bg-emerald-50 rounded-t-lg'
                    : 'text-slate-500 border-transparent hover:text-blue-700'
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
                <h2 className="text-2xl font-bold mb-6 text-gray-900">عن هذه الدورة</h2>
                <p className="text-gray-600 mb-8 text-lg">{courseDetails.description}</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-6 text-gray-900">تفاصيل الدورة</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">الصف: {courseDetails.grade}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">الفصل الدراسي: {courseDetails.term}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{totalLessons} درس</span>
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
    </div>
  );
};

export default CourseDetail; 
