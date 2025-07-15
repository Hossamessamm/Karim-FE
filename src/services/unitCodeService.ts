import api from './api';
import {
  UnitCodeResponse,
  MyUnitCodesResponse,
  UnitLessonsResponse,
  LessonContentResponse,
  EnterCodeForm
} from '../types/unit';

export class UnitCodeService {
  private static instance: UnitCodeService;
  
  public static getInstance(): UnitCodeService {
    if (!UnitCodeService.instance) {
      UnitCodeService.instance = new UnitCodeService();
    }
    return UnitCodeService.instance;
  }

  /**
   * Enter a unit code to gain access to a specific unit
   * @param code - The unit code to enter
   * @returns Promise<UnitCodeResponse>
   */
  async enterUnitCode(code: string): Promise<UnitCodeResponse> {
    try {
      const response = await api.post<UnitCodeResponse>(
        `/api/UnitCode/EnterCode?code=${encodeURIComponent(code)}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Error entering unit code:', error);
      throw new Error(
        error.response?.data?.message || 'فشل في إدخال كود الوحدة'
      );
    }
  }

  /**
   * Get units that the student has enrolled in
   * @param pageNumber - Page number (default: 1)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise<MyUnitCodesResponse>
   */
  async getMyUnitCodes(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<MyUnitCodesResponse> {
    try {
      const response = await api.get<MyUnitCodesResponse>(
        `/api/UnitCode/GetMyUnitCodes?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Error fetching my unit codes:', error);
      throw new Error(
        error.response?.data?.message || 'فشل في جلب الوحدات المسجل بها'
      );
    }
  }

  /**
   * Get lessons in a specific unit that the student is enrolled in
   * @param unitId - The ID of the unit
   * @param pageNumber - Page number (default: 1)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Promise<UnitLessonsResponse>
   */
  async getUnitLessons(
    unitId: number,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<UnitLessonsResponse> {
    try {
      const response = await api.get<UnitLessonsResponse>(
        `/api/Unit/${unitId}/lessons?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Error fetching unit lessons:', error);
      throw new Error(
        error.response?.data?.message || 'فشل في جلب دروس الوحدة'
      );
    }
  }

  /**
   * Get the content of a specific lesson
   * @param lessonId - The ID of the lesson
   * @returns Promise<LessonContentResponse>
   */
  async getLessonContent(lessonId: number): Promise<LessonContentResponse> {
    try {
      const response = await api.get<LessonContentResponse>(
        `/api/Student/contentlesson/${lessonId}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Error fetching lesson content:', error);
      throw new Error(
        error.response?.data?.message || 'فشل في جلب محتوى الدرس'
      );
    }
  }

  /**
   * Validate unit code format
   * @param code - The unit code to validate
   * @returns boolean
   */
  validateCodeFormat(code: string): boolean {
    // Basic validation - code should not be empty and should be a string
    if (!code || typeof code !== 'string') {
      return false;
    }
    
    // Remove whitespace and check if not empty
    const trimmedCode = code.trim();
    if (trimmedCode.length === 0) {
      return false;
    }
    
    // Additional validation can be added here based on requirements
    // For now, we'll accept any non-empty string
    return true;
  }

  /**
   * Format error message for UI display
   * @param error - The error object
   * @returns string
   */
  formatErrorMessage(error: any): string {
    if (error.response?.status === 404) {
      return 'كود الوحدة غير صحيح أو غير موجود';
    }
    if (error.response?.status === 401) {
      return 'يجب تسجيل الدخول أولاً';
    }
    if (error.response?.status === 403) {
      return 'ليس لديك صلاحية للوصول لهذه الوحدة';
    }
    return error.message || 'حدث خطأ غير متوقع';
  }
}

// Export singleton instance
export const unitCodeService = UnitCodeService.getInstance(); 