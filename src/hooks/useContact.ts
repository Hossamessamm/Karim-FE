import { useState, useEffect, useCallback } from 'react';
import { contactService, ContactInfo } from '../services/contactService';

// Cache for contact information to avoid repeated API calls
let contactCache: ContactInfo | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useContact = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if cache is still valid
  const isCacheValid = useCallback(() => {
    return contactCache && (Date.now() - cacheTimestamp) < CACHE_DURATION;
  }, []);

  // Load contact information
  const loadContactInfo = useCallback(async (forceRefresh = false) => {
    // Use cache if valid and not forcing refresh
    if (!forceRefresh && isCacheValid()) {
      setContactInfo(contactCache);
      return contactCache;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await contactService.getAll();
      if (response.success && response.data.length > 0) {
        const contact = response.data[0];
        
        // Update cache
        contactCache = contact;
        cacheTimestamp = Date.now();
        
        setContactInfo(contact);
        return contact;
      } else {
        setContactInfo(null);
        return null;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to load contact information';
      setError(errorMessage);
      console.error('Error loading contact info:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isCacheValid]);

  // Load contact info on mount
  useEffect(() => {
    loadContactInfo();
  }, [loadContactInfo]);

  // Get WhatsApp number specifically
  const getWhatsAppNumber = useCallback((): string | null => {
    return contactInfo?.whatsApp_Number || null;
  }, [contactInfo]);

  // Get WhatsApp URL for a specific message
  const getWhatsAppUrl = useCallback((message: string = 'مرحباً'): string | null => {
    const whatsappNumber = getWhatsAppNumber();
    if (whatsappNumber) {
      return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    }
    return null;
  }, [getWhatsAppNumber]);

  // Open WhatsApp with message
  const openWhatsApp = useCallback((message: string = 'مرحباً') => {
    const whatsappUrl = getWhatsAppUrl(message);
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank');
    } else {
      console.warn('WhatsApp number not available');
    }
  }, [getWhatsAppUrl]);

  return {
    contactInfo,
    isLoading,
    error,
    loadContactInfo,
    getWhatsAppNumber,
    getWhatsAppUrl,
    openWhatsApp,
    // Convenience getters
    whatsappNumber: contactInfo?.whatsApp_Number || null,
    facebookPage: contactInfo?.facebook_Page || null,
    youtubeChannel: contactInfo?.youTube_Channel || null,
    tiktokChannel: contactInfo?.tiktokChannel || null,
  };
};

export default useContact; 