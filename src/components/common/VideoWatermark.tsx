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
  opacity = 0.3,
  speed = 300 // Much slower - 300 seconds (5 minutes) for one complete cycle
}) => {
  const [position, setPosition] = useState({ x: 20, y: 20 });

  useEffect(() => {
    if (!isVisible) return;

    let animationFrame: number;
    const startTime = Date.now();
    
    // Increased border area - stay within 5-35% from edges
    const borderArea = 5;
    const startX = borderArea + (Math.random() * (35 - borderArea));
    const startY = borderArea + (Math.random() * (35 - borderArea));

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      // Extremely slow movement - pixels per second
      const pixelsPerSecond = 6; // Very slow fixed speed
      const totalDistance = elapsed * pixelsPerSecond;
      
      // Increased border area dimensions
      const borderWidth = 30; // 5% to 35% = 30% of screen width
      const borderHeight = 30; // 5% to 35% = 30% of screen height
      
      const cycleTime = (borderWidth + borderHeight) * 2 / pixelsPerSecond;
      const cycleProgress = (elapsed % cycleTime) / cycleTime;
      
      let x, y;
      
      if (cycleProgress < 0.25) {
        const edgeProgress = cycleProgress * 4;
        x = 5 + (edgeProgress * borderWidth);
        y = 5;
      } else if (cycleProgress < 0.5) {
        const edgeProgress = (cycleProgress - 0.25) * 4;
        x = 35;
        y = 5 + (edgeProgress * borderHeight);
      } else if (cycleProgress < 0.75) {
        const edgeProgress = (cycleProgress - 0.5) * 4;
        x = 35 - (edgeProgress * borderWidth);
        y = 35;
      } else {
        const edgeProgress = (cycleProgress - 0.75) * 4;
        x = 5;
        y = 35 - (edgeProgress * borderHeight);
      }
      
      const variationX = Math.sin(elapsed * 0.1) * 1; // Very slow variation
      const variationY = Math.cos(elapsed * 0.08) * 1; // Very slow variation
      
      const boundedX = Math.max(5, Math.min(35, x + variationX));
      const boundedY = Math.max(5, Math.min(35, y + variationY));
      
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
        transition: 'all 8s cubic-bezier(0.4, 0, 0.2, 1)' // Much slower transition
      }}
    >
      <div 
        className="bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-mono select-none border border-white/20 shadow-sm"
        style={{ 
          opacity: Math.min(0.8, opacity),
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
          animationDuration: '10s', // Much slower pulse
          letterSpacing: '0.3px',
          fontWeight: 400
        }}
      >
        {phoneNumber}
      </div>
    </div>
  );
};

export default VideoWatermark; 