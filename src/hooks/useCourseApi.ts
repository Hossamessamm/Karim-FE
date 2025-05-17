import { useState, useCallback, useRef, useEffect } from 'react';
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

type AxiosRequestConfig = {
  headers?: Record<string, string>;
  [key: string]: any;
};

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface CourseListData {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  courses: Course[];
}

interface CourseResponse {
  success: boolean;
  message: string;
  data: CourseListData;
}

type AxiosApiResponse<T> = {
  data: ApiResponse<T>;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: any;
};

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
  const token = localStorage.getItem('auth_token');
  if (!token) {
    console.warn('No auth token found in localStorage');
    return null;
  }
  return token;
};

// Function to get cached user ID
const getUserId = (): string | null => {
  const user = localStorage.getItem('currentUser');
  if (!user) {
    console.warn('No user data found in localStorage');
    return null;
  }
  try {
    const userData = JSON.parse(user);
    return userData.id;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
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
  baseURL: 'https://api.ibrahim-magdy.com',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request deduplication
const pendingRequests = new Map<string, Promise<any>>();

const getRequestKey = (url: string, params?: any): string => {
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
  if (!params) return normalizedUrl;
  return `${normalizedUrl}?${new URLSearchParams(params).toString()}`;
};

const executeRequest = async <T>(
  key: string,
  requestFn: () => Promise<T>
): Promise<T> => {
  const existingRequest = pendingRequests.get(key);
  if (existingRequest) {
    console.log(`Using existing request for ${key}`);
    return existingRequest as Promise<T>;
  }

  const request = requestFn().finally(() => {
    pendingRequests.delete(key);
  });
  
  pendingRequests.set(key, request);
  return request;
};

// Cache for successful responses
const responseCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedResponse = (key: string) => {
  const cached = responseCache.get(key);
  if (!cached) return null;
  
  const now = Date.now();
  if (now - cached.timestamp > CACHE_DURATION) {
    responseCache.delete(key);
    return null;
  }
  
  return cached.data;
};

const setCachedResponse = (key: string, data: any) => {
  responseCache.set(key, { data, timestamp: Date.now() });
};

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    // Clear the pending request after it completes
    if (response.config.url) {
      const key = getRequestKey(response.config.url, response.config.params);
      pendingRequests.delete(key);
    }
    return response;
  },
  (error) => {
    // Clear the pending request on error
    if (error.config?.url) {
      const key = getRequestKey(error.config.url, error.config.params);
      pendingRequests.delete(key);
    }

    if (error.response?.status === 401) {
      console.error('Received 401 unauthorized response:', {
        url: error.config?.url,
        method: error.config?.method
      });
      // Clear auth state on 401 Unauthorized
      localStorage.removeItem('auth_token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const useCourseApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestTimeoutRef = useRef<NodeJS.Timeout>();

  const makeRequest = useCallback(async <T>(
    url: string,
    params: any,
    requestFn: () => Promise<AxiosApiResponse<T>>
  ): Promise<ApiResponse<T>> => {
    const key = getRequestKey(url, params);
    
    // Check if there's already a pending request
    if (pendingRequests.has(key)) {
      console.log('Using existing request:', key);
      return (pendingRequests.get(key) as Promise<ApiResponse<T>>);
    }

    // Create new request
    console.log('Creating new request:', key);
    const request = requestFn().then(response => response.data);
    pendingRequests.set(key, request);

    try {
      return await request;
    } finally {
      // Clear the request after a short delay to prevent immediate duplicate calls
      if (requestTimeoutRef.current) {
        clearTimeout(requestTimeoutRef.current);
      }
      requestTimeoutRef.current = setTimeout(() => {
        pendingRequests.delete(key);
      }, 1000);
    }
  }, []);

  const getCourses = async (
    grade: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<CourseResponse> => {
    const formattedGrade = formatGrade(grade);
    const params = { grade: formattedGrade, pagenumber: page, pagesize: pageSize };
    const key = getRequestKey('/AdminStudent/CourseActive', params);

    console.log('Fetching active courses:', {
      grade: formattedGrade,
      page,
      pageSize,
      endpoint: '/AdminStudent/CourseActive'
    });

    // Check cache first
    const cached = getCachedResponse(key);
    if (cached) {
      console.log(`Using cached response for ${key}`);
      return cached as CourseResponse;
    }

    return executeRequest<CourseResponse>(key, async () => {
      try {
        const response = await api.get<ApiResponse<CourseListData>>('/AdminStudent/CourseActive', { params });
        
        console.log('Active courses response:', {
          success: response.data.success,
          totalCount: response.data.data.totalCount,
          coursesCount: response.data.data.courses.length,
          firstCourse: response.data.data.courses[0]?.courseName
        });

        const result: CourseResponse = {
          success: response.data.success,
          message: response.data.message,
          data: {
            totalCount: response.data.data.totalCount,
            totalPages: response.data.data.totalPages,
            currentPage: response.data.data.currentPage,
            pageSize: response.data.data.pageSize,
            courses: response.data.data.courses.map(course => ({
              ...course,
              // Ensure all required fields are present
              term: course.term || 'First',
              active: course.active ?? true,
              price: course.price ?? 0,
              grade: course.grade || formattedGrade,
              description: course.description || '',
              imagePath: course.imagePath || 'https://dummyimage.com/600x400/000/fff'
            }))
          }
        };
        
        // Cache successful response
        if (result.success) {
          setCachedResponse(key, result);
        }
        
        return result;
      } catch (error: any) {
        console.error('Error fetching active courses:', {
          error: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
        
        // If it's a 404, return an empty course list
        if (error.response?.status === 404) {
          const emptyResponse: CourseResponse = {
            success: true,
            message: 'No active courses found for this grade',
            data: {
              totalCount: 0,
              totalPages: 0,
              currentPage: page,
              pageSize: pageSize,
              courses: []
            }
          };
          return emptyResponse;
        }
        
        // For other errors, throw them to be handled by the component
        throw error;
      }
    });
  };

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

      const token = getAuthToken();
      if (!token) {
        throw new Error('No auth token available');
      }

      console.log('Fetching enrolled courses:', {
        studentId,
        pageNumber,
        pageSize,
        hasToken: !!token
      });

      const params = {
        studentId,
        pagenumber: pageNumber,
        pagesize: pageSize,
      };

      const response = await makeRequest<CourseListData>(
        '/Student/Student-Enrolled-Courses',
        params,
        () => api.get<ApiResponse<CourseListData>>('/Student/Student-Enrolled-Courses', { params })
      );

      console.log('Enrolled courses response:', {
        success: response.success,
        totalCount: response.data.totalCount,
        coursesCount: response.data.courses.length
      });

      return response;
    } catch (err: any) {
      console.error('Error fetching enrolled courses:', err);
      let errorMessage = 'Failed to fetch enrolled courses';
      
      // Check if it's an axios error with response status
      if (err.response?.status === 404) {
        errorMessage = 'No enrolled courses found. Please enroll in a course to get started.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [makeRequest]);

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

  useEffect(() => {
    return () => {
      // Clean up any pending timeouts
      if (requestTimeoutRef.current) {
        clearTimeout(requestTimeoutRef.current);
      }
    };
  }, []);

  return {
    getCourses,
    fetchEnrolledCourses,
    fetchCourseDetails,
    fetchLessonDetails,
    isLoading,
    error,
    enrollInCourse,
  };
}; 