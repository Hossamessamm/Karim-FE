import React, { useState, useEffect } from 'react';

interface VideoWatermarkProps {
  phoneNumber: string;
  isVisible?: boolean;
  opacity?: number;
  speed?: number;
}

const VideoWatermark: React.FC<VideoWatermarkProps> = ({ 
  phoneNumber, 
  isVisible = true,
  opacity = 0.7,
  speed = 20 // seconds for one complete cycle
}) => {
  const [position, setPosition] = useState({ x: 20, y: 20 });

  useEffect(() => {
    if (!isVisible) return;

    let animationFrame: number;
    const startTime = Date.now();
    
    // Center position with small random offset
    const centerX = 50 + (Math.random() * 6 - 3); // 47% to 53%
    const centerY = 50 + (Math.random() * 6 - 3); // 47% to 53%

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000; // seconds
      const progress = (elapsed / speed) % 1; // 0 to 1 cycle

      // Create multiple overlapping sine waves for more natural movement
      const angle1 = progress * 2 * Math.PI;
      const angle2 = progress * 1.7 * Math.PI; // Different frequency
      const angle3 = progress * 0.8 * Math.PI; // Even slower frequency
      
      // Use center position as base
      const baseX = centerX;
      const baseY = centerY;
      
      // Smaller movement components to keep watermark near center
      const moveX1 = Math.sin(angle1) * 8; // Primary horizontal movement (reduced range)
      const moveX2 = Math.cos(angle2) * 4; // Secondary horizontal movement (reduced range)
      const moveY1 = Math.cos(angle1) * 6; // Primary vertical movement (reduced range)
      const moveY2 = Math.sin(angle3) * 3; // Secondary vertical movement (reduced range)
      
      // Smaller drift
      const driftX = Math.sin(angle3) * 3;
      const driftY = Math.cos(angle3) * 3;
      
      const x = baseX + moveX1 + moveX2 + driftX;
      const y = baseY + moveY1 + moveY2 + driftY;
      
      // Tighter bounds to keep near center
      const boundedX = Math.max(40, Math.min(60, x));
      const boundedY = Math.max(40, Math.min(60, y));
      
      setPosition({ x: boundedX, y: boundedY });
      
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, speed]);

  if (!isVisible || !phoneNumber) {
    return null;
  }

  return (
    <div 
      className="absolute z-[100] pointer-events-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div 
        className="bg-black/50 backdrop-blur-md text-white text-sm px-3 py-1.5 rounded-md font-mono select-none border border-white/30 shadow-lg animate-pulse"
        style={{ 
          opacity: Math.min(1, opacity * 1.3), // Increase opacity but cap at 1
          filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.4))',
          animationDuration: '3s',
          letterSpacing: '0.5px',
          fontWeight: 500
        }}
      >
        {phoneNumber}
      </div>
    </div>
  );
};

export default VideoWatermark; 