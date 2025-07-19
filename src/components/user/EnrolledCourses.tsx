import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BASE_URL } from '../../apiConfig';
import { getTenantHeaders } from '../../config/tenant';

interface Course {
  id: string;
  courseName: string;
  term: string;
  active: boolean;
  price: number;
  grade: string;
  description: string;
  imagePath: string;
  modificationDate: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    courses: Course[];
  };
}

// Centralized request deduplication
const pendingRequests = new Map<string, Promise<any>>();

const EnrolledCourses: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10; // Updated to match API default
  
  // Helper function to construct course image URL
  const getCourseImageSrc = (course: Course) => {
    // If imagePath is null or undefined, use default image
    if (!course.imagePath) {
      return '/default-course.jpg';
    }
    
    if (course.imagePath) {
      // If it's already a full URL, use it as is
      if (course.imagePath.startsWith('http')) {
        return course.imagePath;
      }
      
      // Handle relative paths - remove leading slash to avoid double slashes
      let imagePath = course.imagePath;
      if (imagePath.startsWith('/')) {
        imagePath = imagePath.substring(1); // Remove leading slash
      }
      
      // Ensure BASE_URL ends with a slash
      const baseUrl = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';
      return `${baseUrl}${imagePath}`;
    }
    // Fallback to a default image if no image path is provided
    return '/default-course.jpg';
  };

  useEffect(() => {
    fetchCourses();
  }, [currentPage, currentUser?.id]);

  const fetchCourses = async () => {
    // Create a unique key for this request to prevent duplicates
    const requestKey = `courses_${currentUser?.id}_${currentPage}_${pageSize}`;
    
    // Check if there's already a pending request for this key
    if (pendingRequests.has(requestKey)) {
      console.log('Request already in progress, skipping duplicate call');
      return pendingRequests.get(requestKey);
    }

    const requestPromise = (async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setError('لم يتم العثور على رمز المصادقة. الرجاء تسجيل الدخول مرة أخرى.');
          return;
        }

        console.log('Fetching enrolled courses:', { userId: currentUser?.id, page: currentPage });

        const response = await fetch(
          `${BASE_URL}api/Student/Student-Enrolled-Courses?studentId=${currentUser?.id}&pagenumber=${currentPage}&pagesize=${pageSize}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              ...getTenantHeaders()
            },
          }
        );

        if (!response.ok) {
        if (response.status === 401) {
          setError('انتهت صلاحية الجلسة. الرجاء تسجيل الدخول مرة أخرى.');
          navigate('/login');
          return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
          
        if (data.success && data.data) {
            setCourses(data.data.courses);
            setTotalPages(data.data.totalPages);
          setTotalCount(data.data.totalCount);
        } else {
          setError(data.message || 'حدث خطأ أثناء جلب الدورات');
          setCourses([]);
          setTotalPages(1);
          setTotalCount(0);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('حدث خطأ أثناء جلب الدورات');
        setCourses([]);
        setTotalPages(1);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    })();
    
    // Store the promise and clean it up when done
    pendingRequests.set(requestKey, requestPromise);
    
    try {
      await requestPromise;
    } finally {
      pendingRequests.delete(requestKey);
    }
  };

  const handleStartCourse = (courseId: string) => {
    navigate(`/course-player/${courseId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">دوراتي</h1>
          <p className="text-gray-600">
            {totalCount > 0 ? `لديك ${totalCount} ${totalCount === 1 ? 'دورة' : 'دورات'} مسجلة` : 'اكتشف دوراتك المسجلة وابدأ رحلة التعلم'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 bg-red-50 rounded-lg p-4">
            {error}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد دورات مسجلة</h3>
            <p className="mt-1 text-sm text-gray-500">ابدأ بالتسجيل في دورة جديدة للبدء في التعلم</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
                >
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={getCourseImageSrc(course)}
                      alt={course.courseName}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to default image if the API image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = '/default-course.jpg';
                      }}
                    />
                    {course.term && (
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                        {course.term === 'First' ? 'الترم الأول' : 'الترم الثاني'}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.courseName}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                   
                    <button
                      onClick={() => handleStartCourse(course.id)}
                      className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center gap-2 group"
                    >
                      <span>بدء الدورة</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  السابق
                </button>
                <span className="px-4 py-2 bg-primary text-white rounded-lg">
                  {currentPage} من {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  التالي
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses; 