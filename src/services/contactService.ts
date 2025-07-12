import api from './api';

// Contact interfaces
export interface ContactInfo {
  id: number;
  whatsApp_Number: string;
  facebook_Page: string;
  youTube_Channel: string;
  tiktokChannel: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data: ContactInfo[];
}

// Contact service functions
export const contactService = {
  // Get all contact information
  getAll: async (): Promise<ContactResponse> => {
    try {
      const response = await api.get<ContactResponse>('/api/Contact/getAll');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching contact information:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch contact information');
    }
  },

  // Get WhatsApp number specifically
  getWhatsAppNumber: async (): Promise<string | null> => {
    try {
      const response = await contactService.getAll();
      if (response.success && response.data.length > 0) {
        return response.data[0].whatsApp_Number || null;
      }
      return null;
    } catch (error) {
      console.error('Error fetching WhatsApp number:', error);
      return null;
    }
  },

  // Get all social media links
  getSocialLinks: async (): Promise<ContactInfo | null> => {
    try {
      const response = await contactService.getAll();
      if (response.success && response.data.length > 0) {
        return response.data[0];
      }
      return null;
    } catch (error) {
      console.error('Error fetching social links:', error);
      return null;
    }
  }
};

export default contactService; 