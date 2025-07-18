import React, { useState, useEffect } from 'react';

interface UnitAccessTimerProps {
  unitIndex: number;
  enrollmentDate: string;
  className?: string;
  totalUnits?: number; // Optional: total number of units in the course
}

const UnitAccessTimer: React.FC<UnitAccessTimerProps> = ({ 
  unitIndex, 
  enrollmentDate, 
  className = '',
  totalUnits
}) => {
  const [timeInfo, setTimeInfo] = useState<{
    currentUnitTimeLeft: string;
    nextUnitOpensIn: string;
    isCurrentUnitActive: boolean;
    hasNextUnit: boolean;
  } | null>(null);

  useEffect(() => {
    if (!enrollmentDate) return;

    const updateTimer = () => {
      const enrollment = new Date(enrollmentDate);
      const now = new Date();
      const daysSinceEnrollment = Math.floor((now.getTime() - enrollment.getTime()) / (1000 * 60 * 60 * 24));
      const hoursSinceEnrollment = (now.getTime() - enrollment.getTime()) / (1000 * 60 * 60);
      
      // Each unit is accessible for 7 days
      const currentUnitStartDay = unitIndex * 7;
      const currentUnitEndDay = (unitIndex + 1) * 7;
      const nextUnitStartDay = (unitIndex + 1) * 7;
      const nextUnitEndDay = (unitIndex + 2) * 7;
      
      // Calculate remaining time for current unit
      const currentUnitEndTime = new Date(enrollment.getTime() + (currentUnitEndDay * 24 * 60 * 60 * 1000));
      const currentUnitTimeRemaining = currentUnitEndTime.getTime() - now.getTime();
      
      // Calculate time until next unit opens
      const nextUnitStartTime = new Date(enrollment.getTime() + (nextUnitStartDay * 24 * 60 * 60 * 1000));
      const nextUnitTimeUntilOpen = nextUnitStartTime.getTime() - now.getTime();
      
      // Check if current unit is active
      const isCurrentUnitActive = daysSinceEnrollment >= currentUnitStartDay && daysSinceEnrollment < currentUnitEndDay;
      
      // Check if there's a next unit
      const hasNextUnit = totalUnits ? (unitIndex + 1) < totalUnits : true;
      
      // Convert numbers to Arabic-Indic numerals
      const toArabicNumbers = (num: number): string => {
        const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)]).join('');
      };

      // Format time remaining
      const formatTimeRemaining = (milliseconds: number): string => {
        if (milliseconds <= 0) return 'انتهى';
        
        const totalSeconds = Math.floor(milliseconds / 1000);
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        
        if (days > 0) {
          if (hours > 0) {
            return `${toArabicNumbers(days)} ${days === 1 ? 'يوم' : 'أيام'}, ${toArabicNumbers(hours)} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
          } else {
            return `${toArabicNumbers(days)} ${days === 1 ? 'يوم' : 'أيام'}`;
          }
        } else if (hours > 0) {
          return `${toArabicNumbers(hours)} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
        } else {
          const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
          if (minutes > 0) {
            return `${toArabicNumbers(minutes)} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`;
          } else {
            return 'أقل من دقيقة';
          }
        }
      };
      
      setTimeInfo({
        currentUnitTimeLeft: formatTimeRemaining(currentUnitTimeRemaining),
        nextUnitOpensIn: formatTimeRemaining(nextUnitTimeUntilOpen),
        isCurrentUnitActive,
        hasNextUnit
      });
    };

    // Update immediately
    updateTimer();
    
    // Update every second
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [unitIndex, enrollmentDate]);

  if (!timeInfo) return null;

  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`} dir="rtl">
      <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg border border-white/20">
        {timeInfo.isCurrentUnitActive ? (
          <div className="flex items-center gap-2 flex-row-reverse">
            <span className="text-lg font-bold text-red-400" style={{ fontFamily: 'Arial, sans-serif' }}>
              {timeInfo.currentUnitTimeLeft}
            </span>
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-row-reverse">
            <span className="text-sm text-gray-300">غير متاحة</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitAccessTimer; 