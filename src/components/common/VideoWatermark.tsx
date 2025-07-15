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
    
    // Random starting position
    const randomStartX = Math.random() * 60 + 20; // 20% to 80%
    const randomStartY = Math.random() * 60 + 20; // 20% to 80%

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000; // seconds
      const progress = (elapsed / speed) % 1; // 0 to 1 cycle

      // Create multiple overlapping sine waves for more natural movement
      const angle1 = progress * 2 * Math.PI;
      const angle2 = progress * 1.7 * Math.PI; // Different frequency
      const angle3 = progress * 0.8 * Math.PI; // Even slower frequency
      
      // Combine multiple sine waves for complex movement
      const baseX = randomStartX;
      const baseY = randomStartY;
      
      // Multiple movement components
      const moveX1 = Math.sin(angle1) * 15; // Primary horizontal movement
      const moveX2 = Math.cos(angle2) * 8;  // Secondary horizontal movement
      const moveY1 = Math.cos(angle1) * 12; // Primary vertical movement  
      const moveY2 = Math.sin(angle3) * 6;  // Secondary vertical movement
      
      // Add some drift over time
      const driftX = Math.sin(angle3) * 10;
      const driftY = Math.cos(angle3) * 8;
      
      const x = baseX + moveX1 + moveX2 + driftX;
      const y = baseY + moveY1 + moveY2 + driftY;
      
      // Ensure the watermark stays within bounds with padding
      const boundedX = Math.max(8, Math.min(88, x));
      const boundedY = Math.max(8, Math.min(88, y));
      
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
        className="bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-md font-mono select-none border border-white/20 shadow-lg animate-bounce"
        style={{ 
          opacity,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          animationDuration: '3s'
        }}
      >
        {phoneNumber}
      </div>
    </div>
  );
};

export default VideoWatermark; 