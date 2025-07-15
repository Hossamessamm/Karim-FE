/**
 * Utility function to get user's phone number from localStorage for watermark
 */
export const getUserPhoneNumber = (): string | null => {
  try {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      return null;
    }
    
    const userData = JSON.parse(currentUser);
    return userData.phoneNumber || null;
  } catch (error) {
    console.error('Error parsing user data for watermark:', error);
    return null;
  }
};

/**
 * Component for video watermark displaying user's phone number
 */
export interface WatermarkProps {
  phoneNumber: string;
} 