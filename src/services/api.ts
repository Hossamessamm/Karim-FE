import axios from 'axios';
import { getDeviceId } from '../utils/deviceId';
import { getTenantHeaders } from '../config/tenant';

// Update to use the proxy setup in setupProxy.js instead of direct URL
const API_URL = 'https://api.ibrahim-magdy.com';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true  // Enable credentials to allow cookies
});

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any = null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor for handling common request issues
api.interceptors.request.use(
  (config) => {
    // Add device ID to headers
    config.headers = config.headers || {};
    config.headers['DeviceId'] = getDeviceId();
    
    // Add tenant headers
    const tenantHeaders = getTenantHeaders();
    Object.assign(config.headers, tenantHeaders);
    
    // Add Authorization header if we have a token
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log('API Request:', config.method, config.url, config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common response issues
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't already tried to refresh the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If we're already refreshing, add this request to the queue
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Get the current token (even if expired) for the refresh request
        const currentToken = localStorage.getItem('auth_token');
        console.log('Attempting token refresh with current token:', currentToken);
        
        // Call refresh token endpoint with required headers
        const response = await axios.post(`${API_URL}/api/Auth/refresh-token`, {}, {
          withCredentials: true,
          headers: {
            'Authorization': currentToken ? `Bearer ${currentToken}` : '',
            'DeviceId': getDeviceId(),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...getTenantHeaders()
          }
        });

        console.log('Refresh token response:', response.data);
        if ((response.data as any).success) {
          const { token } = (response.data as any).data;
          console.log('Received new token');
          // Store the new token
          localStorage.setItem('auth_token', token);
          // Update the authorization header for the original request
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          // Update the default headers for future requests
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          // Process any queued requests with the new token
          processQueue(null, token);
          return api(originalRequest);
        } else {
          console.error('Refresh token response was not successful');
          throw new Error('Refresh token failed');
        }
      } catch (refreshError: any) {
        processQueue(refreshError, null);
        // If refresh token fails, clear tokens and redirect to login
        if (refreshError.response?.status === 401 || refreshError.response?.status === 403) {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response && error.response.status === 0) {
      // CORS error or network error
      console.error('CORS or Network Error:', error);
    }
    return Promise.reject(error);
  }
);

// Auth service functions
export const authService = {
  register: async (formData: FormData) => {
    try {
      // Update the endpoint path to match the API structure
      const response = await api.post('/api/Auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
    console.log('Starting login process...');
    try {
      // Update the endpoint path to match the API structure with /api/ prefix
      console.log('Making API call to /api/Auth/login...');
      const response = await api.post('/api/Auth/login', { EmailorMobile: email, password });
      console.log('Login response:', response);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Login error details:', error);
      console.error('Error response status:', error.response?.status);
      console.error('Error response data:', error.response?.data);
      console.error('Error response data type:', typeof error.response?.data);
      
      // Check for network errors
      if (error.code === 'ERR_NETWORK') {
        return { 
          success: false, 
          error: 'Network error. Please check your connection or contact administrator about CORS settings.' 
        };
      }
      
      // Check for device limit error - this can come in different formats
      const maxDevicesErrorMessage = "You can't log in from more than two devices.";
      
      // Check if the error is in response.data as a string
      if (typeof error.response?.data === 'string' && error.response?.data.includes(maxDevicesErrorMessage)) {
        return {
          success: false,
          error: maxDevicesErrorMessage,
          isMaxDevicesError: true
        };
      }
      
      // Check if the error is in response.data.message
      const errorMessage = error.response?.data?.message || 'Login failed';
      console.log('Error message variable:', errorMessage);
      
      // Check if the regular error message contains the max devices text
      if (errorMessage.includes(maxDevicesErrorMessage)) {
        return {
          success: false,
          error: maxDevicesErrorMessage,
          isMaxDevicesError: true
        };
      }
      
      // Handle invalid credentials error (400 status)
      if (error.response?.status === 400) {
        console.log('400 error response data:', error.response?.data);
        console.log('400 error response data type:', typeof error.response?.data);
        
        // If the response data is a string, convert "Invalid credentials" to Arabic
        if (typeof error.response?.data === 'string') {
          console.log('Using response data string directly:', error.response.data);
          if (error.response.data === 'Invalid credentials') {
            return { success: false, error: "البريد الإلكتروني أو الباسورد غير صحيح" };
          }
          return { success: false, error: error.response.data };
        }
        
        // Check if the response data.message contains "Invalid credentials"
        if (error.response?.data?.message === 'Invalid credentials') {
          console.log('Found "Invalid credentials" in response data.message');
          return { success: false, error: "Invalid credentials" };
        }
        
        // Check for the Arabic message as fallback
        const arabicInvalidCredentials = "البريد الإلكتروني أو الباسورد غير صحيح";
        if (errorMessage === arabicInvalidCredentials) {
          console.log('Found Arabic invalid credentials message, converting to English');
          return { success: false, error: "Invalid credentials" };
        }
        
        console.log('No specific invalid credentials pattern found, using original error message');
      }
      
      return { success: false, error: errorMessage };
    }
  },

  // Test function for refresh token
  testRefreshToken: async () => {
    try {
      console.log('Starting refresh token test...');
      
      // Step 1: Make initial request with invalid token to force 401
      console.log('Making initial request with invalid token...');
      try {
        const initialResponse = await axios.get(`${API_URL}/api/Student/Student-Enrolled-Courses`, {
          params: {
            studentId: '61205712-b563-44ae-b208-be53b776848d',
            pagenumber: 1,
            pagesize: 10
          },
          headers: {
            'Authorization': 'Bearer invalid_token_to_force_401',
            'DeviceId': getDeviceId(),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        console.log('Initial request succeeded unexpectedly:', initialResponse);
        return { success: false, error: 'Expected 401 but got 200' };
      } catch (initialError: any) {
        console.log('Initial request failed as expected with:', initialError.response?.status);
        
        // Step 2: Perform token refresh
        console.log('Attempting token refresh...');
        const currentToken = localStorage.getItem('auth_token');
        const refreshResponse = await axios.post(`${API_URL}/api/Auth/refresh-token`, {}, {
          withCredentials: true,
          headers: {
            'Authorization': currentToken ? `Bearer ${currentToken}` : '',
            'DeviceId': getDeviceId(),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...getTenantHeaders()
          }
        });
        
        if ((refreshResponse.data as any).success) {
          const { token } = (refreshResponse.data as any).data;
          localStorage.setItem('auth_token', token);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          console.log('Token refresh successful, retrying original request...');
          
          // Step 3: Retry original request with new token
          const retryResponse = await api.get('/api/Student/Student-Enrolled-Courses', {
            params: {
              studentId: '61205712-b563-44ae-b208-be53b776848d',
              pagenumber: 1,
              pagesize: 10
            }
          });
          
          console.log('Retry request successful:', retryResponse.status);
          return { 
            success: true, 
            data: {
              refreshResponse: refreshResponse.data,
              retryResponse: retryResponse.data
            }
          };
        }
      }
      
      return { success: false, error: 'Unexpected flow in refresh token test' };
    } catch (error: any) {
      console.error('Test refresh token error:', error);
      console.error('Error response:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.message || 'Refresh token test failed',
        status: error.response?.status,
        details: error.response?.data
      };
    }
  },

  resetPassword: async (email: string) => {
    try {
      const response = await api.post('/api/Auth/ForgotPassword', null, {
        params: { email }
      });
      console.log('Password reset response:', response);
      return { 
        success: true, 
        message: (response.data as any).message
      };
    } catch (error: any) {
      console.error('Password reset error details:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to send password reset OTP'
      };
    }
  },

  resetPasswordWithOtp: async (email: string, otp: string, newPassword: string, confirmPassword: string) => {
    try {
      const response = await api.post('/api/Auth/ResetPassword', {
        email,
        otp,
        newPassword,
        confirmPassword
      });
      console.log('Password reset with OTP response:', response);
      return {
        success: true,
        message: (response.data as any).message || 'Password has been reset successfully'
      };
    } catch (error: any) {
      console.error('Password reset with OTP error details:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to reset password'
      };
    }
  },
};

export default api; 