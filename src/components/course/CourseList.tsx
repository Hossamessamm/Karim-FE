import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import CourseCard from './CourseCard';
import { grades } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { CourseCardShimmer, GradeSelectionShimmer, CourseStatsShimmer } from '../common/Shimmer';
import { useCourseApi, Course } from '../../hooks/useCourseApi';
import { getGradeInArabic, courseSectionTranslations } from '../../utils/gradeTranslations';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// Constants for pagination
const ITEMS_PER_PAGE = 10;
const INITIAL_VISIBLE_PAGES = 5;

// Memoize the grade button to prevent re-renders
const GradeButton = React.memo(({ 
  grade, 
  isSelected, 
  onClick 
}: { 
  grade: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
      isSelected
        ? 'bg-primary text-white shadow-md hover:shadow-lg hover:bg-primary-dark'
        : 'bg-white text-gray-600 hover:bg-primary-light hover:text-primary'
    }`}
  >
    {getGradeInArabic(grade)}
  </button>
));

// Memoize the course stats component
const CourseStats = React.memo(({ 
  coursesCount, 
  selectedGrade 
}: { 
  coursesCount: number;
  selectedGrade: string;
}) => (
  <div className="bg-white rounded-2xl shadow-sm p-4 px-6 flex items-center gap-4 border border-gray-100" dir="rtl">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-primary-light rounded-lg">
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div>
        <div className="text-2xl font-bold text-primary">{coursesCount}</div>
        <div className="text-sm text-gray-500">{courseSectionTranslations.availableCourses}</div>
      </div>
    </div>
    <div className="w-px h-12 bg-gray-100 mx-4"></div>
    <div className="flex items-center gap-3">
      <div className="p-2 bg-primary-light rounded-lg">
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <div>
        <div className="text-2xl font-bold text-primary">
          {getGradeInArabic(selectedGrade)}
        </div>
        <div className="text-sm text-gray-500">{courseSectionTranslations.currentGrade}</div>
      </div>
    </div>
  </div>
));

// Pagination component
const Pagination = React.memo(({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pages = useMemo(() => {
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
        className="px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-primary-light hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-100"
      >
        {courseSectionTranslations.previous}
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg transition-all duration-200 ${
            currentPage === page
              ? 'bg-primary text-white shadow-md hover:bg-primary-dark'
              : 'bg-white text-gray-600 hover:bg-primary-light hover:text-primary border border-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-primary-light hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-100"
      >
        {courseSectionTranslations.next}
      </button>
    </div>
  );
});

// Add EmptyState component
const EmptyState = React.memo(() => (
  <div className="text-center py-12">
    <div className="inline-block p-4 bg-primary-light rounded-full mb-4">
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد دورات متاحة</h3>
    <p className="text-gray-500">لا توجد دورات متاحة حالياً لهذه المرحلة الدراسية. يرجى المحاولة مرة أخرى لاحقاً.</p>
  </div>
));

// Update CourseGrid component
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

  if (courses.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div 
        ref={setRefs}
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

const CourseList: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<string>(currentUser?.grade || grades[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const courseGridRef = useRef<HTMLDivElement | null>(null);
  const { getCourses, isLoading, error } = useCourseApi();
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Memoize the API call function to prevent recreation on every render
  const fetchCourses = useCallback(async (grade: string, page: number) => {
    const response = await getCourses(grade, page, ITEMS_PER_PAGE);
    if (response?.success) {
      setCourses(response.data.courses);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.totalCount);
    }
  }, [getCourses]);

  // Load courses only when grade or page changes
  useEffect(() => {
    if (!isInitialLoad) {
      fetchCourses(selectedGrade, currentPage);
    }
  }, [selectedGrade, currentPage, fetchCourses, isInitialLoad]);

  // Initial load effect
  useEffect(() => {
    if (isInitialLoad) {
      fetchCourses(selectedGrade, 1);
      setIsInitialLoad(false);
    }
  }, [selectedGrade, fetchCourses, isInitialLoad]);

  // Reset page when grade changes, but don't trigger a fetch
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGrade]);

  // Memoize the grade change handler
  const handleGradeChange = useCallback((grade: string) => {
    if (grade !== selectedGrade) {
      setSelectedGrade(grade);
    }
  }, [selectedGrade]);

  // Handle page change with debounced scroll
  const handlePageChange = useCallback((page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      // Debounce the scroll to prevent unnecessary re-renders
      setTimeout(() => {
        courseGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [currentPage]);

  // Memoize grade buttons to prevent unnecessary re-renders
  const gradeButtons = useMemo(() => (
    <div className="flex flex-wrap gap-3 justify-center">
      {grades.map((grade) => (
        <GradeButton
          key={grade}
          grade={grade}
          isSelected={selectedGrade === grade}
          onClick={() => handleGradeChange(grade)}
        />
      ))}
    </div>
  ), [selectedGrade, handleGradeChange]);

  // Memoize course stats to prevent unnecessary re-renders
  const courseStats = useMemo(() => (
    <CourseStats
      coursesCount={totalCount}
      selectedGrade={selectedGrade}
    />
  ), [totalCount, selectedGrade]);

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading courses: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {isLoading && isInitialLoad ? <GradeSelectionShimmer /> : gradeButtons}
        
        <div className="mt-8 flex justify-center">
          {isLoading && isInitialLoad ? (
            <CourseStatsShimmer />
          ) : (
            courseStats
          )}
        </div>
      </div>

      {isLoading && isInitialLoad ? (
        <LoadingGrid />
      ) : (
        <CourseGrid
          courses={courses}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          gridRef={courseGridRef.current}
        />
      )}
    </div>
  );
};

export default React.memo(CourseList); 