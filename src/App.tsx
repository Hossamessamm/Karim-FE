import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CourseProvider } from './contexts/CourseContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';

// Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ResetPassword from './components/auth/ResetPassword';
import OtpVerification from './components/auth/OtpVerification';
import Profile from './components/user/Profile';
import CourseDetail from './components/course/CourseDetail';
import CourseViewer from './components/course/CourseViewer';
import EnrolledCourses from './components/user/EnrolledCourses';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <CourseProvider>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/verify-otp" element={<OtpVerification />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  
                  {/* Protected Routes */}
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/enrolled-courses" element={
                    <ProtectedRoute>
                      <EnrolledCourses />
                    </ProtectedRoute>
                  } />
                  <Route path="/courses/:id" element={<CourseDetail />} />
                  <Route path="/course-player/:courseId" element={
                    <ProtectedRoute>
                      <CourseViewer />
                    </ProtectedRoute>
                  } />
                </Route>
              </Routes>
            </CourseProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
