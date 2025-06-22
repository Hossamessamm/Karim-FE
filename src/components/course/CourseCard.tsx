import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../hooks/useCourseApi';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const formattedPrice = (course.price ?? 0).toFixed(2);
//
  return (
    <div className="course-card-animate bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="relative aspect-video w-full overflow-hidden">
        <img 
          src={course.imagePath} 
          alt={course.courseName}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
          {formattedPrice} جنيه
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 hover:text-primary transition-colors duration-200">
          {course.courseName}
        </h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-2">{course.description}</p>
        <div className="flex justify-between items-center">
          <Link 
            to={`/courses/${course.id}`}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-sm hover:shadow group"
          >
            <span>عرض الدورة</span>
            <svg 
              className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform rtl:rotate-180" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <div className="text-lg font-bold text-primary">
            {formattedPrice} جنيه
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CourseCard); 