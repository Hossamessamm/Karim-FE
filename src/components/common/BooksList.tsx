import React, { useState, useEffect, useMemo } from 'react';
import BookCard from './BookCard';
import { useBookApi } from '../../hooks/useBookApi';
import { Book } from '../../services/bookService';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

// Grade options
const gradeOptions = [
  { value: 'all', label: 'جميع المراحل' },
  { value: 'Secondary1', label: 'الصف الأول الثانوي' },
  { value: 'Secondary2', label: 'الصف الثاني الثانوي' },
  { value: 'Secondary3', label: 'الصف الثالث الثانوي' },
];

// Loading shimmer component
const BookCardShimmer = () => (
  <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 animate-pulse">
    <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
    <div className="space-y-3">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      <div className="flex justify-between items-center mt-6">
        <div className="h-8 bg-gray-200 rounded w-24"></div>
        <div className="h-10 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  </div>
);

// Empty state component
const EmptyState = () => (
  <div className="col-span-full text-center py-12">
    <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
      <BookOpen className="w-8 h-8 text-purple-600" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد كتب متاحة</h3>
    <p className="text-gray-500">لا توجد كتب متاحة حالياً لهذه المرحلة الدراسية.</p>
  </div>
);

// Error state component
const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="col-span-full text-center py-12">
    <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
      <BookOpen className="w-8 h-8 text-red-600" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">حدث خطأ</h3>
    <p className="text-gray-500 mb-4">{error}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      إعادة المحاولة
    </button>
  </div>
);

// Pagination component
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void; 
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={typeof page !== 'number'}
          className={`px-3 py-2 rounded-lg ${
            page === currentPage
              ? 'bg-purple-600 text-white'
              : typeof page === 'number'
              ? 'border border-gray-300 hover:bg-gray-50'
              : 'cursor-default'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
    </div>
  );
};

const BooksList: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  const { isLoading, error, getActiveBooks, getActiveBooksByGrade } = useBookApi();
  
  const pageSize = 8; // Number of books per page

  // Load books when grade or page changes
  useEffect(() => {
    const loadBooks = async () => {
      try {
        let response;
        
        if (selectedGrade === 'all') {
          response = await getActiveBooks(currentPage, pageSize);
        } else {
          response = await getActiveBooksByGrade(
            selectedGrade as 'Secondary1' | 'Secondary2' | 'Secondary3',
            currentPage,
            pageSize
          );
        }
        
        if (response?.success && response.data) {
          setBooks(response.data.books || []);
          setTotalPages(response.data.totalPages || 1);
          setTotalCount(response.data.totalCount || 0);
        } else {
          setBooks([]);
          setTotalPages(1);
          setTotalCount(0);
        }
      } catch (error) {
        console.error('Error loading books:', error);
        setBooks([]);
        setTotalPages(1);
        setTotalCount(0);
      }
    };

    loadBooks();
  }, [selectedGrade, currentPage, getActiveBooks, getActiveBooksByGrade]);

  // Reset page when grade changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGrade]);

  const handleGradeChange = (grade: string) => {
    setSelectedGrade(grade);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of books section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    // Force a reload by changing the page temporarily
    setCurrentPage(1);
  };

  // Memoize grade buttons
  const gradeButtons = useMemo(() => (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {gradeOptions.map((grade) => (
        <button
          key={grade.value}
          onClick={() => handleGradeChange(grade.value)}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedGrade === grade.value
              ? 'bg-purple-600 text-white shadow-md hover:shadow-lg hover:bg-purple-700'
              : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
          }`}
        >
          {grade.label}
        </button>
      ))}
    </div>
  ), [selectedGrade]);

  return (
    <div className="space-y-8">
      {/* Grade Selection */}
      {gradeButtons}
      
      {/* Books Count */}
      {!isLoading && !error && (
        <div className="text-center">
          <p className="text-gray-600">
            {totalCount > 0 ? (
              <>
                عرض <span className="font-semibold text-purple-600">{books.length}</span> من أصل{' '}
                <span className="font-semibold text-purple-600">{totalCount}</span> كتاب
              </>
            ) : (
              'لا توجد كتب متاحة'
            )}
          </p>
        </div>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {isLoading ? (
          // Loading state
          Array.from({ length: pageSize }).map((_, index) => (
            <BookCardShimmer key={`shimmer-${index}`} />
          ))
        ) : error ? (
          // Error state
          <ErrorState error={error} onRetry={handleRetry} />
        ) : books.length === 0 ? (
          // Empty state
          <EmptyState />
        ) : (
          // Books list
          books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        )}
      </div>

      {/* Pagination */}
      {!isLoading && !error && books.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default BooksList; 