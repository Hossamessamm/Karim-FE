import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/api';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<{
    success: boolean;
    error?: string;
    isUnconfirmedEmail?: boolean;
  }>;
  register: (name: string, email: string, password: string, confirmPassword: string, phoneNumber: string, grade: string) => Promise<{success: boolean, error?: string}>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => boolean;
  updateProfile: (user: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check for saved user and token on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem('currentUser');
        const token = localStorage.getItem('auth_token');
        if (savedUser && token) {
          setCurrentUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authService.login(email, password);
      
      if (result.success && result.data) {
        // Extract user data from the response
        const userData = result.data.user;
        const token = result.data.token;

        const user: User = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          password: '', // We don't store the password
          grade: userData.academicYear,
          enrolledCourses: [],
          phoneNumber: userData.phoneNumber
        };
        
        // Save auth token and user ID
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_id', userData.id);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        setCurrentUser(user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string,
    confirmPassword: string, 
    phoneNumber: string,
    grade: string
  ): Promise<{success: boolean, error?: string}> => {
    setIsLoading(true);
    
    try {
      const userData = {
        userName: name,
        email,
        password,
        confirmPassword,
        phoneNumber,
        academicYear: grade
      };
      
      const result = await authService.register(userData);
      
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
        setCurrentUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_id');
      } else {
        console.error('Logout failed:', result.error);
        // Still clear local state even if API call fails
        setCurrentUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_id');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Clear all auth data even if there's an error
      setCurrentUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_id');
    }
  };

  const resetPassword = (email: string): boolean => {
    // In a real app, this would call an API endpoint
    // For now, we'll just return true to simulate success
    return true;
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
    updateProfile,
    isAuthenticated,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 