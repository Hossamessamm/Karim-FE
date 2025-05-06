import { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';

export type QuestionType = 'multiple_choice' | 'true_false';

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: string[];  // For multiple choice questions
  correctAnswer: string | boolean;
}

export interface QuizAnswer {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  text: string;
  type: 'MultipleChoice';
  answers: QuizAnswer[];
}

export interface BaseLesson {
  id: number;
  lessonName: string;
  titel: string | 'null';
  order: number;
  active: boolean;
  type: 'Video' | 'Quiz';
}

export interface VideoLesson extends BaseLesson {
  type: 'Video';
}

export interface QuizLesson extends BaseLesson {
  type: 'Quiz';
}

export type Lesson = VideoLesson | QuizLesson;

export interface Unit {
  id: number;
  unitName: string;
  titel: string | 'null';
  active: boolean;
  order: number;
  lessons: Lesson[];
}

export interface CourseDetails {
  id: string;
  courseName: string;
  term: string;
  active: boolean;
  price: number;
  grade: string;
  description: string;
  imagePath: string;
  modificationDate: string;
  units: Unit[];
}

export interface Course {
  id: string;
  courseName: string;
  term?: string;
  active?: boolean;
  price?: number;
  grade?: string;
  description: string;
  imagePath: string;
  modificationDate: string;
}

interface CourseResponse {
  success: boolean;
  message: string;
  data: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    courses: Course[];
  };
}

interface CourseDetailsResponse {
  success: boolean;
  message: string;
  data: CourseDetails;
}

interface AuthUser {
  id: string;
  name: string;
  // Add other user properties as needed
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface EnrollmentResponse {
  success: boolean;
  message: string;
  data?: string;
}

export interface VideoLessonResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    videoUrl: string;
    attachmentUrl: string;
    attachmentTitle: string;
  };
}

export interface QuizLessonResponse {
  success: boolean;
  message: string;
  data: QuizQuestion[];
}

// Function to get cached auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Function to get cached user ID
const getUserId = (): string | null => {
  const user = localStorage.getItem('currentUser');
  if (user) {
    const userData = JSON.parse(user);
    return userData.id;
  }
  return null;
};

// Function to cache auth data
export const cacheAuthData = (authResponse: AuthResponse) => {
  localStorage.setItem('auth_token', authResponse.token);
  localStorage.setItem('user_id', authResponse.user.id);
  localStorage.setItem('user_data', JSON.stringify(authResponse.user));
};

// Function to clear cached auth data
export const clearAuthData = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_data');
};

const formatGrade = (grade: string): string => {
  // Handle "1st Secondary" format
  const match = grade.match(/(\d+)(?:st|nd|rd|th)?\s*Secondary/i);
  if (match) {
    return `Secondary${match[1]}`;
  }

  // Handle when only number is passed
  if (/^\d+$/.test(grade)) {
    return `Secondary${grade}`;
  }

  // If the grade is already in correct format (Secondary1), return as is
  if (/^Secondary\d+$/i.test(grade)) {
    // Ensure correct casing
    return grade.replace(/^secondary/i, 'Secondary');
  }

  // Default case: try to extract any number and format it
  const numberMatch = grade.match(/\d+/);
  if (numberMatch) {
    return `Secondary${numberMatch[0]}`;
  }

  return grade; // Return original if no patterns match
};

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useCourseApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async (
    grade: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const formattedGrade = formatGrade(grade);
      const response = await api.get<CourseResponse>('/AdminStudent/CourseActive', {
        params: {
          grade: formattedGrade,
          pagenumber: pageNumber,
          pagesize: pageSize,
        },
      });

      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchEnrolledCourses = useCallback(async (
    pageNumber: number = 1,
    pageSize: number = 10
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const studentId = getUserId();
      if (!studentId) {
        throw new Error('User not authenticated');
      }

      const response = await api.get<CourseResponse>('/Student/Student-Enrolled-Courses', {
        params: {
          studentId,
          pagenumber: pageNumber,
          pagesize: pageSize,
        },
      });

      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch enrolled courses');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCourseDetails = useCallback(async (courseId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<CourseDetailsResponse>('/Course/tree', {
        params: {
          courseid: courseId
        },
      });

      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch course details');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchLessonDetails = useCallback(async (lessonId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<VideoLessonResponse | QuizLessonResponse>(`/AdminStudent/Details/${lessonId}`);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lesson details');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const enrollInCourse = async (courseId: string, code: string): Promise<EnrollmentResponse> => {
    try {
      const studentId = getUserId();
      const token = getAuthToken();
      
      if (!studentId) {
        return {
          success: false,
          message: 'User not authenticated'
        };
      }

      const response = await fetch(
        `${BASE_URL}/Student/add-course-by-code?Code=${code}&StudentId=${studentId}`,
        {
          method: 'POST',
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        return {
          success: true,
          message: data.message,
          data: data.data
        };
      }

      return {
        success: false,
        message: data.message || 'Failed to enroll in the course'
      };
    } catch (error) {
      console.error('Error enrolling in course:', error);
      return {
        success: false,
        message: 'An error occurred while enrolling in the course'
      };
    }
  };

  return {
    fetchCourses,
    fetchEnrolledCourses,
    fetchCourseDetails,
    fetchLessonDetails,
    isLoading,
    error,
    enrollInCourse,
  };
}; 