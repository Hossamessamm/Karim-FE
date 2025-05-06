export const getGradeInArabic = (grade: string): string => {
  const gradeMap: { [key: string]: string } = {
    '1': 'الأول الثانوي',
    '2': 'الثاني الثانوي',
    '3': 'الثالث الثانوي',
    'First': 'الأول الثانوي',
    'Second': 'الثاني الثانوي',
    'Third': 'الثالث الثانوي',
    'secondary1': 'الصف الأول الثانوي',
    'secondary2': 'الصف الثاني الثانوي',
    'secondary3': 'الصف الثالث الثانوي',
    'Secondary1': 'الصف الأول الثانوي',
    'Secondary2': 'الصف الثاني الثانوي',
    'Secondary3': 'الصف الثالث الثانوي'
  };

  return gradeMap[grade] || grade;
};

// Function to get recommended courses text
export const getRecommendedCoursesText = (grade: string): string => {
  return `الدورات المقترحة للصف ${getGradeInArabic(grade)}`;
};

export const courseSectionTranslations = {
  availableCourses: 'الدورات المتاحة',
  currentGrade: 'الصف الحالي',
  previous: 'السابق',
  next: 'التالي',
  noCoursesFound: 'لم يتم العثور على دورات',
  errorLoading: 'حدث خطأ أثناء تحميل الدورات',
  featuredCourses: 'الدورات المميزة',
  discoverCourses: 'اكتشف مجموعتنا المختارة بعناية من دورات اللغة الإنجليزية',
  recommendedForGrade: getRecommendedCoursesText
}; 