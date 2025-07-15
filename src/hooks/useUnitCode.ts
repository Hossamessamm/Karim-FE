import { useState, useCallback, useEffect } from 'react';
import { unitCodeService } from '../services/unitCodeService';
import {
  MyUnitCodeDto,
  UnitLessonDto,
  UnitLessonWithProgressDto,
  UnitWithProgressDto,
  LessonContent,
  UnitState
} from '../types/unit';

interface UseUnitCodeReturn {
  // State
  units: MyUnitCodeDto[];
  currentUnit: MyUnitCodeDto | null;
  unitDetails: { unitName: string; unitTitle: string; courseName: string } | null;
  lessons: UnitLessonDto[];
  currentLesson: UnitLessonDto | null;
  lessonContent: LessonContent | null;
  // New state for unit with progress
  unitWithProgress: UnitWithProgressDto | null;
  isLoading: boolean;
  isEnteringCode: boolean;
  error: string | null;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  
  // Actions
  enterUnitCode: (code: string) => Promise<boolean>;
  getMyUnits: (page?: number, pageSize?: number) => Promise<void>;
  getUnitLessons: (unitId: number, page?: number, pageSize?: number) => Promise<void>;
  // New method for getting unit with progress
  getUnitWithProgress: (unitId: number) => Promise<void>;
  getLessonContent: (lessonId: number) => Promise<void>;
  setCurrentUnit: (unit: MyUnitCodeDto | null) => void;
  setCurrentLesson: (lesson: UnitLessonDto | null) => void;
  clearError: () => void;
  refreshUnits: () => Promise<void>;
}

// Cache for API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const useUnitCode = (): UseUnitCodeReturn => {
  const [state, setState] = useState<UnitState>({
    units: [],
    currentUnit: null,
    lessons: [],
    currentLesson: null,
    isLoading: false,
    error: null,
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
  const [unitDetails, setUnitDetails] = useState<{ unitName: string; unitTitle: string; courseName: string } | null>(null);
  const [unitWithProgress, setUnitWithProgress] = useState<UnitWithProgressDto | null>(null);
  const [isEnteringCode, setIsEnteringCode] = useState(false);

  // Cache helper functions
  const getCachedData = (key: string) => {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  };

  const setCachedData = (key: string, data: any) => {
    cache.set(key, { data, timestamp: Date.now() });
  };

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Enter unit code
  const enterUnitCode = useCallback(async (code: string): Promise<boolean> => {
    if (!unitCodeService.validateCodeFormat(code)) {
      setState(prev => ({ ...prev, error: 'الرجاء إدخال كود صحيح' }));
      return false;
    }

    setIsEnteringCode(true);
    clearError();

    try {
      const response = await unitCodeService.enterUnitCode(code);
      if (response.success) {
        // Refresh units after successful code entry
        await getMyUnits();
        return true;
      } else {
        setState(prev => ({ ...prev, error: response.message || 'فشل في إدخال الكود' }));
        return false;
      }
    } catch (error: any) {
      const errorMessage = unitCodeService.formatErrorMessage(error);
      setState(prev => ({ ...prev, error: errorMessage }));
      return false;
    } finally {
      setIsEnteringCode(false);
    }
  }, []);

  // Get my units
  const getMyUnits = useCallback(async (page: number = 1, pageSize: number = 10): Promise<void> => {
    const cacheKey = `my-units-${page}-${pageSize}`;
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
      setState(prev => ({
        ...prev,
        units: cachedData.units,
        totalCount: cachedData.totalCount,
        totalPages: cachedData.totalPages,
        currentPage: cachedData.currentPage,
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await unitCodeService.getMyUnitCodes(page, pageSize);
      if (response.success && response.data) {
        const { units, totalCount, totalPages, currentPage } = response.data;
        
        setState(prev => ({
          ...prev,
          units: units,
          totalCount: totalCount,
          totalPages: totalPages,
          currentPage: currentPage,
          isLoading: false,
        }));

        // Cache the response
        setCachedData(cacheKey, {
          units: units,
          totalCount: totalCount,
          totalPages: totalPages,
          currentPage: currentPage,
        });
      } else {
        setState(prev => ({
          ...prev,
          error: response.message || 'فشل في جلب الوحدات',
          isLoading: false,
        }));
      }
    } catch (error: any) {
      const errorMessage = unitCodeService.formatErrorMessage(error);
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, []);

  // Get unit lessons
  const getUnitLessons = useCallback(async (
    unitId: number, 
    page: number = 1, 
    pageSize: number = 10
  ): Promise<void> => {
    const cacheKey = `unit-lessons-${unitId}-${page}-${pageSize}`;
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
      setState(prev => ({
        ...prev,
        lessons: cachedData.lessons,
      }));
      if (cachedData.unitDetails) {
        setUnitDetails(cachedData.unitDetails);
      }
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await unitCodeService.getUnitLessons(unitId, page, pageSize);
      if (response.success && response.data) {
        const { lessons, unitName, unitTitle, courseName } = response.data;
        
        setState(prev => ({
          ...prev,
          lessons: lessons,
          isLoading: false,
        }));

        // Store unit details
        const unitDetailsData = { unitName, unitTitle, courseName };
        setUnitDetails(unitDetailsData);

        // Cache the response including unit details
        setCachedData(cacheKey, { lessons: lessons, unitDetails: unitDetailsData });
      } else {
        setState(prev => ({
          ...prev,
          error: response.message || 'فشل في جلب دروس الوحدة',
          isLoading: false,
        }));
      }
    } catch (error: any) {
      const errorMessage = unitCodeService.formatErrorMessage(error);
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, []);

  // Get lesson content
  const getLessonContent = useCallback(async (lessonId: number): Promise<void> => {
    const cacheKey = `lesson-content-${lessonId}`;
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
      setLessonContent(cachedData);
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await unitCodeService.getLessonContent(lessonId);
      if (response.success) {
        setLessonContent(response.data);
        
        // Cache the response
        setCachedData(cacheKey, response.data);
      } else {
        setState(prev => ({ ...prev, error: 'فشل في جلب محتوى الدرس' }));
      }
    } catch (error: any) {
      const errorMessage = unitCodeService.formatErrorMessage(error);
      setState(prev => ({ ...prev, error: errorMessage }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Get unit with progress
  const getUnitWithProgress = useCallback(async (unitId: number): Promise<void> => {
    const cacheKey = `unit-with-progress-${unitId}`;
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
      setUnitWithProgress(cachedData);
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await unitCodeService.getUnitWithProgress(unitId);
      if (response.success && response.data) {
        setUnitWithProgress(response.data);
        
        // Cache the response
        setCachedData(cacheKey, response.data);
      } else {
        setState(prev => ({
          ...prev,
          error: response.message || 'فشل في جلب بيانات الوحدة',
          isLoading: false,
        }));
      }
    } catch (error: any) {
      const errorMessage = unitCodeService.formatErrorMessage(error);
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Set current unit
  const setCurrentUnit = useCallback((unit: MyUnitCodeDto | null) => {
    setState(prev => ({ ...prev, currentUnit: unit, lessons: [], currentLesson: null }));
    setLessonContent(null);
  }, []);

  // Set current lesson
  const setCurrentLesson = useCallback((lesson: UnitLessonDto | null) => {
    setState(prev => ({ ...prev, currentLesson: lesson }));
    setLessonContent(null);
  }, []);

  // Refresh units (clear cache and reload)
  const refreshUnits = useCallback(async (): Promise<void> => {
    // Clear cache for units
    const keysToDelete = Array.from(cache.keys()).filter(key => key.startsWith('my-units-'));
    keysToDelete.forEach(key => cache.delete(key));
    
    await getMyUnits(state.currentPage);
  }, [getMyUnits, state.currentPage]);

  // Auto-load units on mount if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      getMyUnits();
    }
  }, [getMyUnits]);

  return {
    // State
    units: state.units,
    currentUnit: state.currentUnit,
    unitDetails,
    lessons: state.lessons,
    currentLesson: state.currentLesson,
    lessonContent,
    unitWithProgress,
    isLoading: state.isLoading,
    isEnteringCode,
    error: state.error,
    totalCount: state.totalCount,
    totalPages: state.totalPages,
    currentPage: state.currentPage,
    
    // Actions
    enterUnitCode,
    getMyUnits,
    getUnitLessons,
    getUnitWithProgress,
    getLessonContent,
    setCurrentUnit,
    setCurrentLesson,
    clearError,
    refreshUnits,
  };
};

export default useUnitCode; 