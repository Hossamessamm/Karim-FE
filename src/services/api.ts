import axios from 'axios';
import { getDeviceId } from '../utils/deviceId';

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    academicYear: string;
    registrationDate: string;
  };
  token: string;
}

// Update to use the proxy setup in setupProxy.js instead of direct URL
const API_URL = 'https://api.ibrahim-magdy.com';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Change to false to avoid CORS credentials issues
  withCredentials: false
});

// Request interceptor for handling common request issues
api.interceptors.request.use(
  (config: any) => {
    // Add device ID to headers
    config.headers['Deviceid'] = getDeviceId();
    
    // Add auth token to headers if it exists
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Adding token to request:', {
        url: config.url,
        method: config.method,
        hasToken: !!token,
        headers: config.headers
      });
    } else {
      console.log('No token found for request:', {
        url: config.url,
        method: config.method
      });
    }
    
    return config;
  },
  (error: any) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common response issues
api.interceptors.response.use(
  (response: any) => {
    console.log('Response received:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error: any) => {
    console.error('Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      error: error
    });
    if (error.response?.status === 401) {
      // Clear auth state on 401 Unauthorized
      localStorage.removeItem('currentUser');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_id');
    }
    return Promise.reject(error);
  }
);

// Auth service functions
export const authService = {
  register: async (userData: {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    academicYear: string;
  }) => {
    try {
      // Update the endpoint path to match the API structure
      const response = await api.post('/api/Auth/register', userData);
      console.log('Registration response:', response);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Registration error details:', error);
      // More detailed error handling
      if (error.code === 'ERR_NETWORK') {
        return { success: false, error: 'Network error. Please check your connection or contact administrator about CORS settings.' };
      }
      const errorMessage = error.response?.data?.message || 'Registration failed';
      return { success: false, error: errorMessage };
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/api/Auth/logout');
      console.log('Logout response:', response);
      return { success: true, message: (response.data as any).message };
    } catch (error: any) {
      console.error('Logout error details:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to logout' 
      };
    }
  },

  verifyOtp: async (email: string, otp: string) => {
    try {
      const response = await api.post('/api/Auth/confirm-email', null, {
        params: { email, otp }
      });
      console.log('OTP verification response:', response);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('OTP verification error details:', error);
      if (error.code === 'ERR_NETWORK') {
        return { success: false, error: 'Network error. Please check your connection.' };
      }
      const errorMessage = error.response?.data?.message || 'OTP verification failed';
      return { success: false, error: errorMessage };
    }
  },

  resendOtp: async (email: string) => {
    try {
      const response = await api.post('/api/Auth/ReSendOtp', null, {
        params: { email }
      });
      console.log('Resend OTP response:', response);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Resend OTP error details:', error);
      if (error.code === 'ERR_NETWORK') {
        return { success: false, error: 'Network error. Please check your connection.' };
      }
      const errorMessage = error.response?.data?.message || 'Failed to resend OTP';
      return { success: false, error: errorMessage };
    }
  },

  validateToken: async () => {
    try {
      // Get student profile
      const response = await api.get('/api/Student/profile');
      console.log('Token validation response:', response);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Token validation error:', error);
      console.log('Token validation error response:', error.response);
      if (error.response?.status === 401) {
        return { success: false, error: 'Invalid token' };
      }
      return { success: false, error: 'Failed to validate token' };
    }
  },

  login: async (email: string, password: string) => {
    try {
      // Update the endpoint path to match the API structure with /api/ prefix
      const response = await api.post<LoginResponse>('/api/Auth/login', { email, password });
      console.log('Login response:', response);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Login error details:', error);
      if (error.code === 'ERR_NETWORK') {
        return { success: false, error: 'Network error. Please check your connection or contact administrator about CORS settings.' };
      }
      const errorMessage = error.response?.data?.message || 'Login failed';
      // If email is unconfirmed, return special error object
      if (error.response?.data?.message === 'Please confirm your email first.') {
        return { 
          success: false, 
          error: error.response.data.message,
          isUnconfirmedEmail: true,
          email: email
        };
      }
      return { success: false, error: errorMessage };
    }
  },
};

export default api; 