import { useState, useCallback, useEffect } from 'react';
import { cacheAuthData, clearAuthData } from './useCourseApi';

interface AuthUser {
  id: string;
  name: string;
  // Add other user properties as needed
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Initialize auth state from localStorage
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    return {
      isAuthenticated: !!token,
      user: userData ? JSON.parse(userData) : null,
      token: token,
    };
  });

  // Handle successful login
  const handleLogin = useCallback((response: { token: string; user: AuthUser }) => {
    // Cache the auth data
    cacheAuthData(response);

    // Update auth state
    setAuthState({
      isAuthenticated: true,
      user: response.user,
      token: response.token,
    });
  }, []);

  // Handle logout
  const handleLogout = useCallback(() => {
    // Clear cached auth data
    clearAuthData();

    // Reset auth state
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  }, []);

  // Listen for storage events (for multi-tab support)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token') {
        if (!e.newValue) {
          // Token was removed
          handleLogout();
        } else if (e.newValue !== authState.token) {
          // Token was changed
          const userData = localStorage.getItem('user_data');
          if (userData) {
            handleLogin({
              token: e.newValue,
              user: JSON.parse(userData),
            });
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [authState.token, handleLogin, handleLogout]);

  return {
    ...authState,
    login: handleLogin,
    logout: handleLogout,
  };
}; 