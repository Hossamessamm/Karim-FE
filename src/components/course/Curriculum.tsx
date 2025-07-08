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
      className="flex items-center gap-4 p-4 border-t border-slate-100 hover:bg-primary/5 transition-all duration-200 cursor-pointer group relative"
      style={{ background: '#fff' }}
    >
      {/* Accent dot removed */}
      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
        <span className="text-primary font-semibold">
          {(unitIndex + 1).toString().padStart(2, '0')}.
          {(lessonIndex + 1).toString().padStart(2, '0')}
        </span>
      </div>
      <div className="flex-grow">
        <h4 className="font-medium text-slate-800 group-hover:text-primary transition-colors">{lesson.lessonName}</h4>
        <p className="text-xs text-gray-400">{lesson.type}</p>
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
    <div className="border rounded-2xl overflow-hidden shadow-md bg-white transition-shadow duration-300 hover:shadow-lg relative">
      {/* Accent bar */}
      <div className="absolute top-0 right-0 h-full w-2 bg-gradient-to-b from-primary to-teal-400"></div>
      <div 
        onClick={onToggle}
        className="flex items-center justify-between p-6 bg-gray-50 cursor-pointer hover:bg-primary/10 transition-colors duration-200 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg shadow-sm">
            {unitIndex + 1}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-800 group-hover:text-primary transition-colors">{unit.unitName}</h3>
            <p className="text-gray-500 text-sm">{unit.lessons.length} دروس</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400">
            {unit.lessons.length} {unit.lessons.length === 1 ? 'درس' : 'دروس'}
          </span>
          <span className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${isExpanded ? 'bg-primary/10 rotate-180' : 'bg-gray-200'}`}>
            <svg 
              className="w-6 h-6 text-primary transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>
      <div className={`transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}
        style={{ background: '#f9fafb' }}>
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
  const [expandedUnits, setExpandedUnits] = useState<number[]>([]); // All units collapsed by default

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