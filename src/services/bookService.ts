import axios from 'axios';
import api from './api';

// Book interfaces based on the API documentation
export interface Book {
  id: string;
  title: string;
  description?: string;
  imagePath?: string;
  price: number;
  grade: 'Secondary1' | 'Secondary2' | 'Secondary3';
  active: boolean;
  createdAt: string;
  modifiedAt: string;
}

export interface BookResponse {
  success: boolean;
  message: string;
  data: {
    books: Book[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface SingleBookResponse {
  success: boolean;
  message: string;
  data: Book;
}

// Book service functions
export const bookService = {
  // Get all active books with pagination
  getActiveBooks: async (pageNumber: number = 1, pageSize: number = 10): Promise<BookResponse> => {
    try {
      const response = await api.get<BookResponse>('/api/Book/active', {
        params: {
          pageNumber,
          pageSize
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching active books:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch books');
    }
  },

  // Get active books by grade
  getActiveBooksByGrade: async (
    grade: 'Secondary1' | 'Secondary2' | 'Secondary3',
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<BookResponse> => {
    try {
      const response = await api.get<BookResponse>(`/api/Book/active/grade/${grade}`, {
        params: {
          pageNumber,
          pageSize
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching books by grade:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch books');
    }
  },

  // Get book by ID
  getBookById: async (id: string): Promise<SingleBookResponse> => {
    try {
      const response = await api.get<SingleBookResponse>(`/api/Book/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching book by ID:', error);
      throw new Error(error.response?.data?.message || 'Book not found');
    }
  }
};

export default bookService; 