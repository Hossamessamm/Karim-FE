import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import api from './api';

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
    console.log('Submitting quiz result:', result);
    const response = await api.post<QuizResultResponse>('/api/quizresult/submit', result);
    console.log('Quiz result submission response:', response.data);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to submit quiz result');
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Quiz submission error:', error);
    
    if (error.response?.status === 401) {
      throw new Error('يرجى تسجيل الدخول لحفظ نتيجة الاختبار');
    }
    
    if (error.response?.status === 400) {
      throw new Error(error.response.data.message || 'بيانات الاختبار غير صحيحة');
    }
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('حدث خطأ أثناء حفظ نتيجة الاختبار');
  }
}; 