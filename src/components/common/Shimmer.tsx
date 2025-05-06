import React from 'react';

interface ShimmerProps {
  className?: string;
}

// Base shimmer component with memoization
const Shimmer: React.FC<ShimmerProps> = React.memo(({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200" />
    </div>
  );
});

// Memoized course card shimmer
export const CourseCardShimmer: React.FC = React.memo(() => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <Shimmer className="w-full h-48" />
      <div className="p-6 space-y-4">
        <Shimmer className="h-6 w-3/4 rounded-lg" />
        <Shimmer className="h-4 w-full rounded-lg" />
        <Shimmer className="h-4 w-2/3 rounded-lg" />
        <div className="flex justify-between items-center pt-4">
          <Shimmer className="h-8 w-24 rounded-full" />
          <Shimmer className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
});

// Memoized grade selection shimmer with reduced number of items
export const GradeSelectionShimmer: React.FC = React.memo(() => {
  // Pre-calculate array to avoid recreation on each render
  const shimmerItems = Array.from({ length: 3 });
  
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Shimmer className="w-24 h-12 rounded-full" />
      {shimmerItems.map((_, index) => (
        <Shimmer key={index} className="w-32 h-12 rounded-full" />
      ))}
    </div>
  );
});

// Memoized course stats shimmer
export const CourseStatsShimmer: React.FC = React.memo(() => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 px-6 flex items-center gap-4">
      <div className="flex items-center gap-3">
        <Shimmer className="w-10 h-10 rounded-lg" />
        <div className="space-y-2">
          <Shimmer className="w-16 h-8 rounded-lg" />
          <Shimmer className="w-24 h-4 rounded-lg" />
        </div>
      </div>
      <div className="w-px h-12 bg-gray-200 mx-4"></div>
      <div className="flex items-center gap-3">
        <Shimmer className="w-10 h-10 rounded-lg" />
        <div className="space-y-2">
          <Shimmer className="w-24 h-8 rounded-lg" />
          <Shimmer className="w-20 h-4 rounded-lg" />
        </div>
      </div>
    </div>
  );
});

Shimmer.displayName = 'Shimmer';
CourseCardShimmer.displayName = 'CourseCardShimmer';
GradeSelectionShimmer.displayName = 'GradeSelectionShimmer';
CourseStatsShimmer.displayName = 'CourseStatsShimmer';

export default Shimmer; 