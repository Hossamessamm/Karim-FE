import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, validateAuthState } = useAuth();
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const validationTimeoutRef = useRef<NodeJS.Timeout>();
  const lastValidationRef = useRef(0);

  const validateAuth = useCallback(async () => {
    // Skip validation if not authenticated
    if (!isAuthenticated) {
      setIsValid(false);
      setIsValidating(false);
      return;
    }

    // Skip if already validating
    if (isValidating && isValid) {
      return;
    }

    // Prevent too frequent validations (minimum 5 seconds between validations)
    const now = Date.now();
    if (now - lastValidationRef.current < 5000) {
      return;
    }

    console.log('ProtectedRoute: Starting auth validation...', {
      isAuthenticated,
      isValidating,
      isValid
    });

    try {
      lastValidationRef.current = now;
      const validationResult = await validateAuthState();
      console.log('ProtectedRoute: Validation result:', validationResult);
      setIsValid(validationResult);
    } catch (error) {
      console.error('ProtectedRoute: Validation error:', error);
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  }, [isAuthenticated, validateAuthState, isValidating, isValid]);

  // Run validation when authentication state changes
  useEffect(() => {
    // Clear any existing timeout
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
    }

    // Add a small delay to prevent rapid re-validations
    validationTimeoutRef.current = setTimeout(() => {
      validateAuth();
    }, 100);

    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
  }, [validateAuth]);

  // Show loading state while checking authentication
  if (isLoading || isValidating) {
    console.log('ProtectedRoute: Showing loading state', {
      isLoading,
      isValidating,
      isAuthenticated,
      isValid
    });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated or validation failed, redirect to login
  if (!isAuthenticated || !isValid) {
    console.log('ProtectedRoute: Access denied, redirecting to login', {
      isAuthenticated,
      isValid,
      isValidating,
      from: location.pathname
    });
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If authenticated and validation passed, render the protected content
  console.log('ProtectedRoute: Access granted, rendering content', {
    isAuthenticated,
    isValid,
    isValidating
  });
  return <>{children}</>;
};

export default React.memo(ProtectedRoute); 