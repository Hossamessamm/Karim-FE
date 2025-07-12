import { useState, useCallback } from 'react';
import { bookService, Book, BookResponse, SingleBookResponse } from '../services/bookService';

export const useBookApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getActiveBooks = useCallback(async (pageNumber: number = 1, pageSize: number = 10): Promise<BookResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await bookService.getActiveBooks(pageNumber, pageSize);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch books';
      setError(errorMessage);
      console.error('Error in getActiveBooks:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getActiveBooksByGrade = useCallback(async (
    grade: 'Secondary1' | 'Secondary2' | 'Secondary3',
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<BookResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await bookService.getActiveBooksByGrade(grade, pageNumber, pageSize);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch books by grade';
      setError(errorMessage);
      console.error('Error in getActiveBooksByGrade:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getBookById = useCallback(async (id: string): Promise<SingleBookResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await bookService.getBookById(id);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch book';
      setError(errorMessage);
      console.error('Error in getBookById:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    getActiveBooks,
    getActiveBooksByGrade,
    getBookById
  };
};

export default useBookApi; 