import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/api';
import { BASE_URL } from '../apiConfig';
import { getTenantHeaders } from '../config/tenant';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<{
    success: boolean;
    error?: string;
    isUnconfirmedEmail?: boolean;
    isMaxDevicesError?: boolean;
  }>;
  register: (formData: FormData) => Promise<{success: boolean, error?: string}>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  resetPasswordWithOtp: (email: string, otp: string, newPassword: string, confirmPassword: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  updateProfile: (user: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  validateAuthState: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Map to track pending validation requests and prevent duplicates
  const pendingValidations = new Map<string, Promise<boolean>>();
  
  // Add function to update authentication state
  const updateAuthState = (authenticated: boolean, user: User | null = null, token: string | null = null) => {
    console.log('Updating auth state:', { authenticated, hasUser: !!user, hasToken: !!token });
    
    setIsAuthenticated(authenticated);
    setCurrentUser(user);
    
    if (authenticated && user && token) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isAuthenticated');
    }
  };

  // Function to validate current auth state
  const validateAuthState = async (): Promise<boolean> => {
    console.log('Validating auth state...');
    const token = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('currentUser');
    const savedIsAuthenticated = localStorage.getItem('isAuthenticated');
    
    console.log('Current auth state:', {
      hasToken: !!token,
      hasUser: !!savedUser,
      isAuthenticatedInStorage: savedIsAuthenticated === 'true',
      isAuthenticatedInState: isAuthenticated,
      hasCurrentUser: !!currentUser
    });

    if (!token || !savedUser || savedIsAuthenticated !== 'true') {
      console.log('Missing auth data, clearing auth state');
      updateAuthState(false);
      return false;
    }

    try {
      // Parse saved user to get ID
      const user = JSON.parse(savedUser);
      
      // If user state is already properly set and localStorage says authenticated,
      // trust it and skip API validation (performance optimization)
      if (currentUser && isAuthenticated && currentUser.id === user.id) {
        console.log('User already authenticated and state is correct, skipping validation');
        return true;
      }
      
      // Create a unique key for this validation request to prevent duplicates
      const validationKey = `validation_${user.id}`;
      
      // Check if there's already a pending validation for this user
      if (pendingValidations.has(validationKey)) {
        console.log('Using existing validation request');
        return pendingValidations.get(validationKey)!;
      }

      console.log('Making validation request...', {
        userId: user.id,
        hasToken: !!token,
        reason: 'State not properly set or user mismatch'
      });

      // Use the enrolled courses endpoint for token validation but with minimal data
      const url = new URL(`${BASE_URL}api/Student/Student-Enrolled-Courses`);
      url.searchParams.append('studentId', user.id);
      url.searchParams.append('pagenumber', '1');
      url.searchParams.append('pagesize', '1'); // Minimal data for validation

      const validationPromise = fetch(url, {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          ...getTenantHeaders()
        }
      }).then(response => {
        console.log('Validation response:', {
          status: response.status,
          ok: response.ok
        });

        if (!response.ok) {
          if (response.status === 404) {
            // For 404, keep the user logged in but log the error
            console.log('No enrolled courses found, but keeping user logged in');
            // Ensure user state is set
            if (!currentUser || !isAuthenticated) {
              setCurrentUser(user);
              setIsAuthenticated(true);
              localStorage.setItem('isAuthenticated', 'true');
            }
            return true;
          }
          
          // For other error statuses (like 401, 403, 500, etc.)
          console.log('Token validation failed, clearing auth state');
          updateAuthState(false);
          return false;
        }

        // Token is valid, ensure user state is set
        if (!currentUser || !isAuthenticated) {
          console.log('Restoring user state after successful validation');
          setCurrentUser(user);
          setIsAuthenticated(true);
          localStorage.setItem('isAuthenticated', 'true');
        }

        return true;
      }).catch(error => {
        console.error('Token validation error:', error);
        updateAuthState(false);
        return false;
      }).finally(() => {
        pendingValidations.delete(validationKey);
      });

      pendingValidations.set(validationKey, validationPromise);
      return validationPromise;
    } catch (error) {
      console.error('Token validation error:', error);
      updateAuthState(false);
      return false;
    }
  };
  
  // Check for saved user and token on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('Starting auth initialization...');
      setIsLoading(true);
      try {
        const savedUser = localStorage.getItem('currentUser');
        const token = localStorage.getItem('auth_token');
        const savedIsAuthenticated = localStorage.getItem('isAuthenticated');
        
        console.log('Saved auth data:', { 
          hasUser: !!savedUser, 
          hasToken: !!token,
          isAuthenticated: !!savedIsAuthenticated
        });
        
        if (savedUser && token && savedIsAuthenticated === 'true') {
          const user = JSON.parse(savedUser);
          
          // Set initial state based on saved data
          setCurrentUser(user);
          setIsAuthenticated(true);
          
          // Validate the token with the backend
          const isValid = await validateAuthState();
          if (!isValid) {
            console.log('Initial token validation failed');
            updateAuthState(false);
          } else {
            console.log('Initial token validation successful');
          }
        } else {
          console.log('No saved auth data found');
          updateAuthState(false);
        }
      } catch (error) {
        console.error('Error during auth initialization:', error);
        updateAuthState(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Debug effect to log state changes
  useEffect(() => {
    console.log('Auth state changed:', {
      isAuthenticated,
      hasUser: !!currentUser,
      isLoading,
      hasToken: !!localStorage.getItem('auth_token')
    });
  }, [isAuthenticated, currentUser, isLoading]);

  const login = async (email: string, password: string) => {
    console.log('Starting login process...');
    setIsLoading(true);
    try {
      const result = await authService.login(email, password);
      console.log('Login result:', result);
      
      if (result.success && result.data) {
        const { user, token } = result.data as LoginResponse;

        const userData: User = {
          id: user.id,
          name: user.name,
          email: user.email,
          password: '',
          grade: user.academicYear,
          enrolledCourses: [],
          phoneNumber: user.phoneNumber
        };
        
        updateAuthState(true, userData, token);
        localStorage.setItem('user_id', user.id);
        
        console.log('Login successful, auth state updated');
        return { success: true };
      }
      
      // Pass through any special flags like isMaxDevicesError
      return {
        success: false,
        error: result.error,
        isMaxDevicesError: result.isMaxDevicesError
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData: FormData): Promise<{success: boolean, error?: string}> => {
    setIsLoading(true);
    
    try {
      const result = await authService.register(formData);
      
      if (result.success && result.data) {
        // Don't set user or authentication state after registration
        // User needs to verify email and then log in
        return { success: true };
      }
      
      return { 
        success: false, 
        error: result.error || 'Registration failed'
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.message || 'An unexpected error occurred'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const result = await authService.logout();
      if (result.success) {
        // Clear all auth data after successful API logout
        updateAuthState(false);
        localStorage.removeItem('user_id');
      } else {
        console.error('Logout failed:', result.error);
        // Still clear local state even if API call fails
        updateAuthState(false);
        localStorage.removeItem('user_id');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Clear all auth data even if there's an error
      updateAuthState(false);
      localStorage.removeItem('user_id');
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      // Use authService which is already configured with axios
      const response = await authService.resetPassword(email);
      
      if (response.success) {
        return { 
          success: true, 
          message: response.message || 'OTP has been sent to your email.' 
        };
      } else {
        return { 
          success: false, 
          error: response.error || 'Password reset failed.' 
        };
      }
    } catch (error: any) {
      console.error('Reset password error:', error);
      return { 
        success: false, 
        error: 'An unexpected error occurred. Please try again later.' 
      };
    }
  };

  const resetPasswordWithOtp = async (
    email: string, 
    otp: string, 
    newPassword: string, 
    confirmPassword: string
  ): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const response = await authService.resetPasswordWithOtp(
        email,
        otp,
        newPassword,
        confirmPassword
      );
      
      return response;
    } catch (error: any) {
      console.error('Reset password with OTP error:', error);
      return { 
        success: false, 
        error: 'An unexpected error occurred. Please try again later.' 
      };
    }
  };

  const updateProfile = (userUpdates: Partial<User>) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...userUpdates };
    setCurrentUser(updatedUser as User);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    resetPassword,
    resetPasswordWithOtp,
    updateProfile,
    isAuthenticated,
    isLoading,
    validateAuthState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 