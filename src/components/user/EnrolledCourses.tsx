import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCourseApi, Course } from '../../hooks/useCourseApi';
import { CourseCardShimmer } from '../common/Shimmer';
import { useAuth } from '../../contexts/AuthContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// Constants for pagination
const ITEMS_PER_PAGE = 10;
const INITIAL_VISIBLE_PAGES = 5;

// Pagination Component
const Pagination = React.memo(({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pages = React.useMemo(() => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(INITIAL_VISIBLE_PAGES / 2));
    const endPage = Math.min(totalPages, startPage + INITIAL_VISIBLE_PAGES - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }, [currentPage, totalPages]);
  
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:bg-gray-50"
      >
        Previous
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg shadow-sm ${
            currentPage === page
              ? 'bg-primary text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:bg-gray-50"
      >
        Next
      </button>
        </div>
  );
});

// Course Card Component
const CourseCard = React.memo(({ course }: { course: Course }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-video w-full overflow-hidden">
        <img 
          src={course.imagePath} 
          alt={course.courseName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.courseName}</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{course.description}</p>
                
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-secondary h-2.5 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">0% complete</p>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Link 
                    to={`/course-player/${course.id}`}
            className="flex-1 bg-primary hover:bg-primary-dark text-white px-3 py-2 rounded text-sm font-medium text-center transition-colors"
                  >
                    Continue Learning
                  </Link>
                  <Link 
                    to={`/courses/${course.id}`}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm font-medium transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
  );
});

// Loading Grid Component
const LoadingGrid = React.memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
    {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
      <CourseCardShimmer key={`shimmer-${index}`} />
    ))}
  </div>
));

// Course Grid Component
const CourseGrid = React.memo(({ 
  courses,
  currentPage,
  totalPages,
  onPageChange,
  gridRef
}: { 
  courses: Course[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  gridRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const animationRef = useScrollAnimation();

  return (
    <>
      <div 
        ref={(el) => {
          if (el) {
            if (gridRef) {
              gridRef.current = el;
            }
            if (animationRef) {
              animationRef.current = el;
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4"
      >
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
});

// Main EnrolledCourses Component
const EnrolledCourses: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const courseGridRef = useRef<HTMLDivElement | null>(null);
  const { fetchEnrolledCourses, isLoading, error } = useCourseApi();
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch enrolled courses when page changes
  useEffect(() => {
    const loadCourses = async () => {
      if (!isAuthenticated || !currentUser) {
        navigate('/login', { state: { from: '/enrolled-courses' } });
        return;
      }

      const response = await fetchEnrolledCourses(currentPage, ITEMS_PER_PAGE);
      if (response?.success) {
        setCourses(response.data.courses);
        setTotalPages(response.data.totalPages);
        setTotalCount(response.data.totalCount);
      }
    };

    loadCourses();
  }, [currentPage, fetchEnrolledCourses, isAuthenticated, currentUser, navigate]);

  // Handle page change with smooth scroll
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Smooth scroll to the course grid
    setTimeout(() => {
      courseGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Enrolled Courses</h1>
        <div className="bg-primary/10 px-4 py-2 rounded-lg">
          <span className="text-primary font-medium">{totalCount} Courses</span>
        </div>
      </div>

      {isLoading ? (
        <LoadingGrid />
      ) : courses.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <h2 className="text-xl font-medium text-gray-700 mb-4">You haven't enrolled in any courses yet</h2>
          <p className="text-gray-500 mb-6">Browse our courses and start learning today!</p>
          <Link
            to="/"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <CourseGrid
          courses={courses}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          gridRef={courseGridRef}
        />
      )}
    </div>
  );
};

export default EnrolledCourses; 