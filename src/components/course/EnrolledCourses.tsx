import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCourseApi } from '../../hooks/useCourseApi';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Course } from '../../types/course';

// Constants for pagination
const ITEMS_PER_PAGE = 9;
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
        className="px-4 py-2 rounded-lg bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg ${
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
        className="px-4 py-2 rounded-lg bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
});

// Course Card Component
const CourseCard = React.memo(({ course }: { course: Course }) => {
  return (
    <div className="course-card-animate bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={course.imagePath || '/placeholder-course.jpg'}
          alt={course.courseName}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.courseName}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-medium">{course.grade || 'All Grades'}</span>
          <Link
            to={`/course/${course.id}`}
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            View Course →
          </Link>
        </div>
      </div>
    </div>
  );
});

// Loading Grid Component
const LoadingGrid = React.memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
      <div key={`shimmer-${index}`} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200" />
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-full mb-4" />
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
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
  gridRef: (node: HTMLDivElement | null) => void;
}) => {
  const animationRef = useScrollAnimation();

  const setRefs = useCallback((element: HTMLDivElement | null) => {
    gridRef(element);
    animationRef(element);
  }, [gridRef, animationRef]);

  return (
    <>
      <div 
        ref={setRefs}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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

// Main Component
const EnrolledCourses: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const courseGridRef = useRef<HTMLDivElement | null>(null);
  const { fetchEnrolledCourses, isLoading, error } = useCourseApi();
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const setGridRef = useCallback((node: HTMLDivElement | null) => {
    courseGridRef.current = node;
  }, []);

  // Fetch enrolled courses when page changes
  useEffect(() => {
    const loadCourses = async () => {
      if (!user) {
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
  }, [currentPage, fetchEnrolledCourses, user, navigate]);

  // Handle page change with smooth scroll
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to the course grid with a small delay to ensure content is rendered
    setTimeout(() => {
      courseGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading courses: {error}
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

      {/* Course Grid with Pagination */}
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
          gridRef={setGridRef}
        />
      )}
    </div>
  );
};

export default EnrolledCourses; 