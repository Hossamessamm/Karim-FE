import axios from 'axios';
import { getTenantHeaders } from '../config/tenant';

const API_BASE_URL = 'https://api.ibrahim-magdy.com/api';

export const checkEnrollment = async (studentId: string, courseId: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('No authentication token found');
      return false;
    }

    const response = await axios.get(
      `${API_BASE_URL}/AdminStudent/IsEnrolled?studentId=${studentId}&courseId=${courseId}`,
      {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          ...getTenantHeaders()
        }
      }
    );
    return response.data as boolean;
  } catch (error) {
    console.error('Error checking enrollment:', error);
    return false;
  }
};

// Add empty export to make this a module
export {}; 