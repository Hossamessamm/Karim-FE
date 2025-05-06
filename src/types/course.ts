export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  resources: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CourseState {
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
} 