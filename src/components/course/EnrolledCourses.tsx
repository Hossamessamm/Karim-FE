import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useCourseApi, Course } from '../../hooks/useCourseApi';
import CourseCard from './CourseCard';
import { CourseCardShimmer } from '../common/Shimmer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// Constants for pagination
const ITEMS_PER_PAGE = 10;
const INITIAL_VISIBLE_PAGES = 5;

// Reuse Pagination component from CourseList
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

const LoadingGrid = React.memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
    {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
      <CourseCardShimmer key={`shimmer-${index}`} />
    ))}
  </div>
));

const EnrolledCourses: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const courseGridRef = useRef<HTMLDivElement | null>(null);
  const { fetchEnrolledCourses, isLoading, error } = useCourseApi();
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch enrolled courses when page changes
  useEffect(() => {
    const loadCourses = async () => {
      const response = await fetchEnrolledCourses(currentPage, ITEMS_PER_PAGE);
      if (response?.success) {
        setCourses(response.data.courses);
        setTotalPages(response.data.totalPages);
        setTotalCount(response.data.totalCount);
      }
    };

    loadCourses();
  }, [currentPage, fetchEnrolledCourses]);

  // Handle page change with smooth scroll to first course
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
        Error loading enrolled courses: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Enrolled Courses</h1>
          <div className="bg-primary/10 px-4 py-2 rounded-lg">
            <span className="text-primary font-medium">{totalCount} Courses</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingGrid />
      ) : courses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500">You haven't enrolled in any courses yet.</div>
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