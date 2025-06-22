export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'pdf' | 'video' | 'link' | 'doc';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  passingScore?: number; // percentage
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  duration: string;
  videoUrl?: string;
  resources?: Resource[];
  quiz?: Quiz;
  type: 'video' | 'quiz';
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Teacher {
  id: string;
  name: string;
  photoUrl: string;
  bio: string;
  specialization: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  imageUrl?: string;
  grade: string | number;
  units: Unit[];
  teacher: Teacher;
  enrolledUsers?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  enrolledCourses: string[];
  grade: string;
  phoneNumber?: string;
} 