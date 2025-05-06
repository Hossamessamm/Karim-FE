import axios from 'axios';
import { BASE_URL } from '../apiConfig';

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