import React, { createContext, useContext, useState } from 'react';
import { Course } from '../types';
import { courses as initialCourses } from '../data/mockData';
import { useAuth } from './AuthContext';

interface CourseContextType {
  courses: Course[];
  enrolledCourses: Course[];
  filteredCourses: Course[];
  filterCourses: (grade: string | null) => void;
  getCourseById: (id: string) => Course | undefined;
  enrollInCourse: (courseId: string) => boolean;
  isEnrolled: (courseId: string) => boolean;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(initialCourses);
  const { currentUser, updateProfile } = useAuth();
  
  const enrolledCourses = courses.filter(course => 
    course.enrolledUsers?.includes(currentUser?.id || '')
  );

  const filterCourses = (grade: string | null) => {
    if (!grade) {
      setFilteredCourses(courses);
      return;
    }
    
    const filtered = courses.filter(course => course.grade === grade);
    setFilteredCourses(filtered);
  };

  const getCourseById = (id: string) => {
    return courses.find(course => course.id === id);
  };

  const isEnrolled = (courseId: string) => {
    const course = getCourseById(courseId);
    return course?.enrolledUsers?.includes(currentUser?.id || '') || false;
  };

  const enrollInCourse = (courseId: string): boolean => {
    if (!currentUser) return false;

    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex === -1) return false;

    const course = courses[courseIndex];
    if (course.enrolledUsers?.includes(currentUser.id)) return false;

    const updatedUser = {
      ...currentUser,
      enrolledCourses: [...(currentUser.enrolledCourses || []), courseId]
    };

    // Create a new array if enrolledUsers is undefined, otherwise spread the existing array
    const existingEnrolledUsers = course.enrolledUsers || [];
    const updatedCourse: Course = {
      ...course,
      enrolledUsers: [...existingEnrolledUsers, currentUser.id]
    };

    const updatedCourses = [...courses];
    updatedCourses[courseIndex] = updatedCourse;

    updateProfile(updatedUser);
    setCourses(updatedCourses);
    
    // Update filtered courses if necessary
    if (!course.grade || filteredCourses.some(c => c.id === courseId)) {
      const updatedFiltered = filteredCourses.map(c => 
        c.id === courseId ? updatedCourse : c
      );
      setFilteredCourses(updatedFiltered);
    }
    
    return true;
  };

  return (
    <CourseContext.Provider value={{
      courses,
      filteredCourses,
      enrolledCourses,
      filterCourses,
      getCourseById,
      enrollInCourse,
      isEnrolled,
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
}; 