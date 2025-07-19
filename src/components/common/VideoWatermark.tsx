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
    
    // Full screen movement with random starting position
    const startX = 10 + (Math.random() * 80); // 10% to 90%
    const startY = 10 + (Math.random() * 80); // 10% to 90%

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000; // seconds
      
      // Fixed speed movement - pixels per second
      const pixelsPerSecond = 150; // Fast fixed speed
      const totalDistance = elapsed * pixelsPerSecond;
      
      // Screen dimensions for boundary calculations
      const screenWidth = 80; // 5% to 85% = 80% of screen
      const screenHeight = 80; // 5% to 85% = 80% of screen
      
      // Calculate position based on fixed speed
      const cycleTime = (screenWidth + screenHeight) * 2 / pixelsPerSecond; // Time for one complete cycle
      const cycleProgress = (elapsed % cycleTime) / cycleTime;
      
      let x, y;
      
      // Create a rectangular path around the screen
      if (cycleProgress < 0.25) {
        // Top edge: left to right
        const edgeProgress = cycleProgress * 4;
        x = 5 + (edgeProgress * screenWidth);
        y = 5;
      } else if (cycleProgress < 0.5) {
        // Right edge: top to bottom
        const edgeProgress = (cycleProgress - 0.25) * 4;
        x = 85;
        y = 5 + (edgeProgress * screenHeight);
      } else if (cycleProgress < 0.75) {
        // Bottom edge: right to left
        const edgeProgress = (cycleProgress - 0.5) * 4;
        x = 85 - (edgeProgress * screenWidth);
        y = 85;
      } else {
        // Left edge: bottom to top
        const edgeProgress = (cycleProgress - 0.75) * 4;
        x = 5;
        y = 85 - (edgeProgress * screenHeight);
      }
      
      // Add some variation to make it less predictable
      const variationX = Math.sin(elapsed * 2) * 3;
      const variationY = Math.cos(elapsed * 1.5) * 3;
      
      const boundedX = Math.max(5, Math.min(85, x + variationX));
      const boundedY = Math.max(5, Math.min(85, y + variationY));
      
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