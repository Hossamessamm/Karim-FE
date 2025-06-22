import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CoursePlayer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      navigate(`/course-viewer/${courseId}`);
    }
  }, [courseId, navigate]);

  return null;
};

export default CoursePlayer; 