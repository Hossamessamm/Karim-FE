import axios from 'axios';
import { getDeviceId } from '../utils/deviceId';

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
    console.log('API Request:', config.method, config.url, config.data);
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common response issues
api.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response && error.response.status === 0) {
      // CORS error or network error
      console.error('CORS or Network Error:', error);
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

  login: async (email: string, password: string) => {
    try {
      // Update the endpoint path to match the API structure with /api/ prefix
      const response = await api.post('/api/Auth/login', { email, password });
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