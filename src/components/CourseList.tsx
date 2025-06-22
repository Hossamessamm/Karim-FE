import React from 'react';
import { Course } from '../types';

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div key={course.id} className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <p className="text-gray-600">{course.description}</p>
          <div className="mt-2">
            <span className="text-blue-600 font-semibold">${course.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList; 