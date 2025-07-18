import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import api from './api';
import { getTenantHeaders } from '../config/tenant';

export interface Course {
  id: string;
  courseName: string;
  term: string;
  active: boolean;
  price: number;
  grade: string;
  description: string;
  imagePath: string;
  modificationDate: string;
}

export interface CourseResponse {
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

export const getCourses = async (
  grade: string,
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<CourseResponse> => {
  try {
    const response = await axios.get<CourseResponse>(
      `${BASE_URL}/api/AdminStudent/CourseActive`,
      {
        params: {
          grade,
          pagenumber: pageNumber,
          pagesize: pageSize,
        },
        headers: {
          ...getTenantHeaders()
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch courses');
  }
};

interface QuizResultSubmission {
  lessonId: number;
  score: number;
  notes?: string;
}

interface QuizResultResponse {
  success: boolean;
  message: string;
  data: null;
}

export const submitQuizResult = async (result: QuizResultSubmission): Promise<QuizResultResponse> => {
  try {
    const response = await api.post<QuizResultResponse>('/api/quizresult/submit', result);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('You are not authorized to submit quiz results');
    }
    throw new Error(error.response?.data?.message || 'Failed to submit quiz result');
  }
}; 