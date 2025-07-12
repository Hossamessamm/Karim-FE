import React from 'react';
import { useContact } from '../../hooks/useContact';

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  disabled?: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = 'مرحباً',
  className = '',
  variant = 'primary',
  size = 'md',
  showText = true,
  disabled = false
}) => {
  const { openWhatsApp, whatsappNumber, isLoading } = useContact();

  const handleClick = () => {
    if (!disabled && whatsappNumber) {
      openWhatsApp(message);
    }
  };

  const isDisabled = disabled || !whatsappNumber || isLoading;

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  // Variant classes
  const variantClasses = {
    primary: isDisabled
      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-105 hover:shadow-green-500/25',
    secondary: isDisabled
      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
      : 'bg-white text-green-600 border-2 border-green-500 hover:bg-green-50 hover:border-green-600',
    minimal: isDisabled
      ? 'text-gray-400 hover:text-gray-400 cursor-not-allowed'
      : 'text-green-600 hover:text-green-700 hover:bg-green-50'
  };

  const baseClasses = 'inline-flex items-center gap-2 rounded-xl transition-all duration-300 transform shadow-lg';

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      title={
        isLoading
          ? 'جاري تحميل معلومات الاتصال...'
          : whatsappNumber
          ? 'تواصل عبر واتساب'
          : 'رقم واتساب غير متوفر'
      }
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      )}
      {showText && (
        <span className="hidden sm:inline font-medium">
          {isLoading ? 'جاري التحميل...' : 'واتساب'}
        </span>
      )}
    </button>
  );
};

export default WhatsAppButton; 