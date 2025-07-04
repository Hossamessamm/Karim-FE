import axios from 'axios';
import { BASE_URL } from '../apiConfig';

export const checkEnrollment = async (studentId: string, courseId: string): Promise<boolean> => {
  try {
    const response = await axios.get<boolean>(
      `${BASE_URL}/AdminStudent/IsEnrolled?studentId=${studentId}&courseId=${courseId}`,
      {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error checking enrollment:', error);
    return false;
  }
};

// Add empty export to make this a module
export {}; 