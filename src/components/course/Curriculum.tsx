import React, { useState } from 'react';
import { Unit, Lesson } from '../../hooks/useCourseApi';

interface CurriculumProps {
  units: Unit[];
  courseId: string;
  onLessonSelect?: (lesson: Lesson) => void;
}

const LessonIcon: React.FC<{ type: string }> = ({ type }) => {
  if (type === 'Video') {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
};

const LessonItem: React.FC<{
  lesson: Lesson;
  unitIndex: number;
  lessonIndex: number;
  onSelect: (lesson: Lesson) => void;
}> = ({ lesson, unitIndex, lessonIndex, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(lesson)}
      className="flex items-center gap-4 p-4 border-t hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
        <span className="text-primary font-semibold">
          {(unitIndex + 1).toString().padStart(2, '0')}.
          {(lessonIndex + 1).toString().padStart(2, '0')}
        </span>
      </div>
      <div className="flex-grow">
        <h4 className="font-medium">{lesson.lessonName}</h4>
        <p className="text-sm text-gray-500">{lesson.type}</p>
      </div>
      <div className="text-primary">
        <LessonIcon type={lesson.type} />
      </div>
    </div>
  );
};

const UnitAccordion: React.FC<{
  unit: Unit;
  unitIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectLesson: (lesson: Lesson) => void;
}> = ({ unit, unitIndex, isExpanded, onToggle, onSelectLesson }) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div 
        onClick={onToggle}
        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
      >
        <div>
          <h3 className="text-xl font-semibold">{unit.unitName}</h3>
          <p className="text-gray-600">{unit.lessons.length} دروس</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {unit.lessons.length} {unit.lessons.length === 1 ? 'lesson' : 'lessons'}
          </span>
          <svg 
            className={`w-6 h-6 transform transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      <div className={`transition-all duration-300 ${
        isExpanded ? 'block' : 'hidden'
      }`}>
        {unit.lessons.map((lesson, lessonIndex) => (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            unitIndex={unitIndex}
            lessonIndex={lessonIndex}
            onSelect={onSelectLesson}
          />
        ))}
      </div>
    </div>
  );
};

export const Curriculum: React.FC<CurriculumProps> = ({ units, courseId, onLessonSelect }) => {
  const [expandedUnits, setExpandedUnits] = useState<number[]>([0]); // First unit expanded by default

  const toggleUnit = (unitId: number) => {
    setExpandedUnits(prev => 
      prev.includes(unitId)
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId]
    );
  };

  const handleLessonSelect = (lesson: Lesson) => {
    if (onLessonSelect) {
      onLessonSelect(lesson);
    }
  };

  return (
    <div className="space-y-6">
      {units.map((unit, unitIndex) => (
        <UnitAccordion
          key={unit.id}
          unit={unit}
          unitIndex={unitIndex}
          isExpanded={expandedUnits.includes(unit.id)}
          onToggle={() => toggleUnit(unit.id)}
          onSelectLesson={handleLessonSelect}
        />
      ))}
    </div>
  );
}; 