import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Course {
  id: string;
  courseName: string;
  imagePath: string;
  description: string;
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

const EnrolledCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 9;
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, [currentPage]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('auth_token');
      console.log('Auth Token:', token ? 'Found' : 'Not Found');

      if (!token) {
        setError('لم يتم العثور على رمز المصادقة. الرجاء تسجيل الدخول مرة أخرى.');
        return;
      }

      const response = await fetch(
        `https://api.ibrahim-magdy.com/api/Student/Student-Enrolled-Courses?studentId=${currentUser?.id}&pagenumber=${currentPage}&pagesize=${pageSize}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      console.log('API Response Status:', response.status);
      const data: ApiResponse = await response.json();
      console.log('API Response Data:', data);

      if (response.status === 401) {
        setError('انتهت صلاحية الجلسة. الرجاء تسجيل الدخول مرة أخرى.');
        navigate('/login');
        return;
      }

      if (data.success) {
        console.log('Courses received:', data.data.courses);
        console.log('Total pages:', data.data.totalPages);
        console.log('Current page:', data.data.currentPage);
        
        if (Array.isArray(data.data.courses)) {
          setCourses(data.data.courses);
          setTotalPages(data.data.totalPages);
        } else {
          console.error('Courses data is not an array:', data.data.courses);
          setError('تنسيق البيانات غير صحيح');
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('حدث خطأ أثناء جلب الدورات');
    } finally {
      setLoading(false);
    }
  };

  const handleStartCourse = (courseId: string) => {
    navigate(`/course-player/${courseId}`);
  };

  // Debug render information
  console.log('Render state:', {
    loading,
    error,
    coursesCount: courses.length,
    currentPage,
    totalPages
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">دوراتي</h1>
          <p className="text-gray-600">اكتشف دوراتك المسجلة وابدأ رحلة التعلم</p>
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
                      src={course.imagePath !== 'string' ? course.imagePath : 'https://via.placeholder.com/400x225'}
                      alt={course.courseName}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.courseName}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description !== 'string' ? course.description : 'لا يوجد وصف متاح لهذه الدورة'}
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