export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  resources: string[];
}

export interface Course {
  id: string;
  courseName: string;
  term?: string;
  active?: boolean;
  price?: number;
  grade?: string;
  description: string;
  imagePath: string;
  modificationDate: string;
}

export interface CourseState {
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
} 