import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { useLocation } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const location = useLocation();
  // Hide Navbar and Footer on CourseViewer page
  const isCourseViewer = location.pathname.startsWith('/course-player/');
  return (
    <div className="min-h-screen flex flex-col">
      {!isCourseViewer && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isCourseViewer && <Footer />}
    </div>
  );
};

export default MainLayout; 