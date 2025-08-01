import React, { useEffect, useState, useMemo } from 'react';

// Import biology icons
import microbiologyIcon from '../../assets/images/microbiology.png';
import bacteriaIcon from '../../assets/images/bacteria.png';
import experimentIcon from '../../assets/images/experiment.png';
import microscopeIcon from '../../assets/images/microscope.png';
import genomeIcon from '../../assets/images/genome.png';

interface FloatingBiologyIconsProps {
  count?: number;
  opacity?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
  containerClassName?: string;
}

const FloatingBiologyIcons: React.FC<FloatingBiologyIconsProps> = ({
  count = 20,
  opacity = 0.15,
  minSize = 45,
  maxSize = 75,
  className = '',
  containerClassName = ''
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const icons = [microbiologyIcon, bacteriaIcon, experimentIcon, microscopeIcon, genomeIcon];
  const animations = ['animate-float-slow', 'animate-float-medium', 'animate-float-fast'];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate grid-based positions for better separation on mobile
  const generateGridPositions = (iconCount: number) => {
    const positions = [];
    
    if (isMobile) {
      // Mobile: Use a 3x4 grid for better separation
      const cols = 3;
      const rows = Math.ceil(iconCount / cols);
      
      for (let i = 0; i < iconCount; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        
        // Larger cell spacing for mobile
        const cellWidth = 100 / cols;
        const cellHeight = 100 / rows;
        
        const baseLeft = col * cellWidth;
        const baseTop = row * cellHeight;
        
        // Smaller random offset for mobile to keep icons more centered in their cells
        const leftOffset = (Math.random() * 0.4 + 0.3) * cellWidth; // 30% to 70% of cell width
        const topOffset = (Math.random() * 0.4 + 0.3) * cellHeight; // 30% to 70% of cell height
        
        positions.push({
          left: baseLeft + leftOffset,
          top: baseTop + topOffset
        });
      }
    } else {
      // Desktop: Use a 6-column grid
      const cols = 6;
      const rows = Math.ceil(iconCount / cols);
      
      for (let i = 0; i < iconCount; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        
        const cellWidth = 100 / cols;
        const cellHeight = 100 / rows;
        
        const baseLeft = col * cellWidth;
        const baseTop = row * cellHeight;
        
        // Larger random offset for desktop
        const leftOffset = (Math.random() * 0.6 + 0.2) * cellWidth; // 20% to 80% of cell width
        const topOffset = (Math.random() * 0.6 + 0.2) * cellHeight; // 20% to 80% of cell height
        
        positions.push({
          left: baseLeft + leftOffset,
          top: baseTop + topOffset
        });
      }
    }
    
    return positions;
  };

  // Use useMemo to cache the icon data and only regenerate when necessary
  const iconData = useMemo(() => {
    const iconArray = [];
    const mobileCount = Math.floor(count * 0.5); // Reduce count more on mobile for better separation
    const actualCount = isMobile ? mobileCount : count;
    
    // Use grid positions for better separation
    const positions = generateGridPositions(actualCount);
    
    for (let i = 0; i < actualCount; i++) {
      const icon = icons[Math.floor(Math.random() * icons.length)];
      const animation = animations[Math.floor(Math.random() * animations.length)];
      
      // Responsive sizing with better mobile optimization
      const mobileMinSize = Math.floor(minSize * 0.6); // Even smaller on mobile
      const mobileMaxSize = Math.floor(maxSize * 0.7);
      const actualMinSize = isMobile ? mobileMinSize : minSize;
      const actualMaxSize = isMobile ? mobileMaxSize : maxSize;
      
      const size = Math.floor(Math.random() * (actualMaxSize - actualMinSize + 1)) + actualMinSize;
      const delay = Math.random() * 4; // 0 to 4 seconds

      iconArray.push({
        icon,
        top: `${positions[i].top}%`,
        left: `${positions[i].left}%`,
        size,
        animation,
        delay
      });
    }
    return iconArray;
  }, [count, minSize, maxSize, isMobile]); // Only regenerate when these values change

  return (
    <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${containerClassName}`}>
      {iconData.map((item, index) => (
        <div
          key={`biology-icon-${index}-${item.left}-${item.top}`} // Stable key based on position
          className={`absolute ${item.animation} ${className}`}
          style={{
            top: item.top,
            left: item.left,
            opacity: opacity,
            width: `${item.size}px`,
            height: `${item.size}px`,
            animationDelay: `${item.delay}s`,
            // Ensure icons don't overlap on mobile
            zIndex: Math.floor(Math.random() * 10),
          }}
        >
          <img
            src={item.icon}
            alt="biology icon"
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingBiologyIcons; 