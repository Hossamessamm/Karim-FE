import React, { useState, useEffect } from 'react';
import { PlayCircle, BookOpen, Search, Filter, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import useUnitCode from '../hooks/useUnitCode';
import UnitCard from '../components/unit/UnitCard';
import { MyUnitCodeDto } from '../types/unit';
import { useNavigate } from 'react-router-dom';

const MyLectures: React.FC = () => {
  const { 
    units, 
    isLoading, 
    error, 
    totalCount, 
    totalPages, 
    currentPage,
    getMyUnits,
    clearError,
    refreshUnits
  } = useUnitCode();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<string>('all');
  const [filteredUnits, setFilteredUnits] = useState<MyUnitCodeDto[]>([]);

  // Filter units based on search and filters
  useEffect(() => {
    let filtered = units;

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(unit => 
        unit.unitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.unitTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Grade filter
    if (selectedGrade !== 'all') {
      filtered = filtered.filter(unit => unit.grade === selectedGrade);
    }

    // Term filter
    if (selectedTerm !== 'all') {
      filtered = filtered.filter(unit => unit.term === selectedTerm);
    }

    setFilteredUnits(filtered);
  }, [units, searchTerm, selectedGrade, selectedTerm]);

  const handlePageChange = (page: number) => {
    getMyUnits(page);
  };

  const handleRefresh = () => {
    clearError();
    refreshUnits();
  };

  const handleUnitClick = (unitId: number) => {
    navigate(`/unit-viewer/${unitId}`);
  };

  const getGradeInArabic = (grade: string) => {
    switch (grade) {
      case 'Secondary1': return 'الصف الأول الثانوي';
      case 'Secondary2': return 'الصف الثاني الثانوي';
      case 'Secondary3': return 'الصف الثالث الثانوي';
      default: return grade;
    }
  };

  const getTermInArabic = (term: string) => {
    switch (term) {
      case 'First': return 'الترم الأول';
      case 'Second': return 'الترم الثاني';
      default: return term;
    }
  };

  // Loading shimmer component
  const UnitCardShimmer = () => (
    <div className="bg-white/80 backdrop-blur-xl rounded-[1.5rem] border border-white/30 shadow-lg overflow-hidden animate-pulse">
      <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="w-16 h-16 mx-auto bg-gray-300 rounded-2xl mb-4"></div>
      </div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 bg-gray-200 rounded mb-6"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="inline-block p-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mb-6">
        <PlayCircle className="w-16 h-16 text-emerald-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">لا توجد محاضرات بعد</h3>
      <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
        لم تقم بإدخال أي أكواد محاضرات حتى الآن. قم بإدخال كود المحاضرة للوصول إلى المحتوى التعليمي.
      </p>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="text-center py-16">
      <div className="inline-block p-6 bg-red-100 rounded-full mb-6">
        <AlertCircle className="w-16 h-16 text-red-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">حدث خطأ</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      <button
        onClick={handleRefresh}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <RefreshCw className="w-4 h-4" />
        إعادة المحاولة
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-3 rounded-full border border-emerald-200/50 mb-6">
            <PlayCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">محاضراتي</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
            <span className="inline-flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-gray-800">محاضرات السنتر</span>
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"></span>
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث في المحاضرات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              />
            </div>
            
            {/* Grade Filter */}
            <div className="relative">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              >
                <option value="all">جميع المراحل</option>
                <option value="Secondary1">الصف الأول الثانوي</option>
                <option value="Secondary2">الصف الثاني الثانوي</option>
                <option value="Secondary3">الصف الثالث الثانوي</option>
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            
            {/* Term Filter */}
            <div className="relative">
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              >
                <option value="all">جميع الفصول</option>
                <option value="First">الترم الأول</option>
                <option value="Second">الترم الثاني</option>
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Stats */}
        {!isLoading && !error && (
          <div className="text-center mb-8">
            <p className="text-gray-600">
              {filteredUnits.length > 0 ? (
                <>
                  عرض <span className="font-semibold text-emerald-600">{filteredUnits.length}</span> من أصل{' '}
                  <span className="font-semibold text-emerald-600">{totalCount}</span> وحدة
                </>
              ) : searchTerm || selectedGrade !== 'all' || selectedTerm !== 'all' ? (
                'لا توجد نتائج مطابقة للبحث'
              ) : (
                'لا توجد وحدات متاحة'
              )}
            </p>
          </div>
        )}

        {/* Content */}
        {error ? (
          <ErrorState />
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <UnitCardShimmer key={`shimmer-${index}`} />
            ))}
          </div>
        ) : filteredUnits.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUnits.map((unit) => (
              <div
                key={unit.unitId}
                onClick={() => handleUnitClick(unit.unitId)}
                className="cursor-pointer"
              >
                <UnitCard unit={unit} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-200"
            >
              السابق
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-200"
            >
              التالي
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLectures; 