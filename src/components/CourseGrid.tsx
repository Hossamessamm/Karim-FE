import React from 'react';
import { Course } from '../types';

interface CourseGridProps {
  courses: Course[];
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-gray-600">{course.description}</p>
            <div className="mt-2">
              <span className="text-blue-600 font-semibold">${course.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseGrid; 