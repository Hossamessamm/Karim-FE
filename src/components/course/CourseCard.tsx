import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../hooks/useCourseApi';
import { Star, BookOpen, ArrowLeft, Sparkles } from 'lucide-react';
import { getTermInArabic } from '../../utils/gradeTranslations';
import { BASE_URL } from '../../apiConfig';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const formattedPrice = (course.price ?? 0).toFixed(2);

  // Helper function to construct course image URL
  const getCourseImageSrc = (course: Course) => {
    // If imagePath is null or undefined, use default image
    if (!course.imagePath) {
      return '/default-course.jpg';
    }
    
    if (course.imagePath) {
      // If imagePath is a relative path, prepend the API base URL
      if (course.imagePath.startsWith('/') || course.imagePath.startsWith('images/')) {
        return `${BASE_URL}${course.imagePath}`;
      }
      // If it's already a full URL, use it as is
      if (course.imagePath.startsWith('http')) {
        return course.imagePath;
      }
      // Otherwise, assume it's relative to the API base
      return `${BASE_URL}${course.imagePath}`;
    }
    // Fallback to a default image if no image path is provided
    return '/default-course.jpg';
  };

  return (
    <div className="group relative">
      {/* Outer glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-indigo-400/20 rounded-[1.5rem] blur-xl group-hover:blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      
      {/* Main card */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-[1.5rem] border border-white/30 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500 overflow-hidden transform group-hover:-translate-y-2">
        {/* Inner gradient border */}
        <div className="absolute inset-[1px] rounded-[1.5rem] bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
        
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={getCourseImageSrc(course)} 
            alt={course.courseName}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                // Fallback to default image if the API image fails to load
                const target = e.target as HTMLImageElement;
                target.src = '/default-course.jpg';
              }}
          />
          
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          
          {/* Price badge - modern design */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20">
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {formattedPrice} جنيه
            </div>
          </div>
          
          {/* Course type badge */}
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium border border-white/30">
            {getTermInArabic(course.term || 'First')}
          </div>
          
          {/* Floating elements */}
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl shadow-lg flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500 opacity-80">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6 relative">
          {/* Course title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
            {course.courseName}
          </h3>
          
          {/* Course description */}
          <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
            {course.description || 'دورة تعليمية شاملة مع أحدث الأساليب والتقنيات التعليمية'}
          </p>
          
          {/* Action section */}
          <div className="flex items-center justify-between">
            {/* View course button */}
            <Link 
              to={`/courses/${course.id}`}
              className="group/btn relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">عرض الدورة</span>
              <ArrowLeft className="w-4 h-4 relative z-10 transform group-hover/btn:translate-x-1 transition-transform rtl:rotate-180" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            {/* Price display */}
            <div className="text-right">
              <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">
                {formattedPrice}
              </div>
              <div className="text-xs text-gray-500 font-medium">جنيه مصري</div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 -left-6 w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg shadow-lg flex items-center justify-center animate-pulse opacity-60">
          <Star className="w-4 h-4 text-white" />
        </div>
        
        <div className="absolute bottom-1/3 -right-6 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg animate-pulse opacity-60"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default React.memo(CourseCard); 