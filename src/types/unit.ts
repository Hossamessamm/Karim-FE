// Unit Code related types and interfaces

export interface UnitCodeDto {
  Code: string;
  Grade: string;
  UnitName: string;
}

export interface MyUnitCodeDto {
  unitId: number;
  unitName: string;
  unitTitle: string;
  courseId: string;
  courseName: string;
  grade: string;
  term: string;
  active: boolean;
}

export interface UnitLessonDto {
  id: number;
  lessonName: string;
  title: string;
  order: number;
  type: LessonType;
  active: boolean;
}

export enum LessonType {
  Video = 'Video',
  Quiz = 'Quiz'
}

// API Response types
export interface UnitCodeResponse {
  success: boolean;
  message: string;
  data: UnitCodeDto;
}

export interface MyUnitCodesResponse {
  success: boolean;
  message: string;
  data: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    units: MyUnitCodeDto[];
  };
}

export interface UnitLessonsResponse {
  success: boolean;
  message: string;
  data: {
    unitId: number;
    unitName: string;
    unitTitle: string;
    courseName: string;
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    lessons: UnitLessonDto[];
  };
}

// Lesson Content types
export interface VideoLessonContent {
  id: number;
  videoUrl: string;
  attachmentUrl?: string;
  attachmentTitle?: string;
}

export interface QuizAnswer {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  text: string;
  type: 'MultipleChoice' | 'TrueFalse';
  answers: QuizAnswer[];
}

export type LessonContent = VideoLessonContent | QuizQuestion[];

export interface LessonContentResponse {
  success: boolean;
  data: LessonContent;
}

// UI State types
export interface UnitState {
  units: MyUnitCodeDto[];
  currentUnit: MyUnitCodeDto | null;
  lessons: UnitLessonDto[];
  currentLesson: UnitLessonDto | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

// Form types
export interface EnterCodeForm {
  code: string;
} 