import React from 'react';
import { Link } from 'react-router-dom';
import { MyUnitCodeDto } from '../../types/unit';
import { BookOpen, Clock, Users, Play, Sparkles, GraduationCap } from 'lucide-react';

interface UnitCardProps {
  unit: MyUnitCodeDto;
}

const UnitCard: React.FC<UnitCardProps> = ({ unit }) => {
  const getGradeInArabic = (grade: string) => {
    switch (grade) {
      case 'Secondary1': return 'الصف الأول الثانوي';
      case 'Secondary2': return 'الصف الثاني الثانوي';
      case 'Secondary3': return 'الصف الثالث الثانوي';
      default: return grade;
    }
  };

  const getTermInArabic = (term: string) => {
    switch (term) {
      case 'First': return 'الترم الأول';
      case 'Second': return 'الترم الثاني';
      default: return term;
    }
  };

  return (
    <div className="group relative">
      {/* Outer glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-teal-400/20 to-cyan-400/20 rounded-[1.5rem] blur-xl group-hover:blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      
      {/* Main card */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-[1.5rem] border border-white/30 shadow-lg group-hover:shadow-2xl group-hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden transform group-hover:-translate-y-2">
        {/* Inner gradient border */}
        <div className="absolute inset-[1px] rounded-[1.5rem] bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
        
        {/* Header Section */}
        <div className="relative p-6 bg-gradient-to-br from-emerald-50 to-teal-50">
          {/* Status badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
              unit.active 
                ? 'bg-green-100 text-green-700 border-green-200' 
                : 'bg-gray-100 text-gray-600 border-gray-200'
            }`}>
              {unit.active ? 'نشط' : 'غير نشط'}
            </div>
          </div>
          
          {/* Grade and Term badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {getGradeInArabic(unit.grade)}
            </div>
            <div className="bg-white/70 backdrop-blur-sm text-emerald-700 px-3 py-1 rounded-full text-xs font-medium border border-emerald-200">
              {getTermInArabic(unit.term)}
            </div>
          </div>
          
          {/* Unit icon */}
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl mb-4 group-hover:scale-110 transition-transform duration-300">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6 relative">
          {/* Unit title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:bg-clip-text transition-all duration-300">
            {unit.unitName}
          </h3>
          
          {/* Unit subtitle */}
         
          
          {/* Course info */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-6 border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-700">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-medium">{unit.courseName}</span>
            </div>
          </div>
          
          {/* Action button */}
          <div className="text-center">
            <Link 
              to={`/unit-viewer/${unit.unitId}`}
              className="group/btn relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">دخول الوحدة</span>
              <Play className="w-4 h-4 relative z-10 transform group-hover/btn:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 -left-6 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg shadow-lg flex items-center justify-center animate-pulse opacity-60">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        
        <div className="absolute bottom-1/3 -right-6 w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full shadow-lg animate-pulse opacity-60"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default React.memo(UnitCard); 