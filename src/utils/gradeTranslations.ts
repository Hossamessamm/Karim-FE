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
    'Secondary3': 'الصف الثالث الثانوي',
    '1st': 'الصف الأول الثانوي',
    '2nd': 'الصف الثاني الثانوي',
    '3rd': 'الصف الثالث الثانوي'
  };

  return gradeMap[grade] || grade;
};

// Function to get term in Arabic
export const getTermInArabic = (term: string): string => {
  const termMap: { [key: string]: string } = {
    'First': 'الترم الأول',
    'Second': 'الترم الثاني',
    'first': 'الترم الأول',
    'second': 'الترم الثاني',
    '1': 'الترم الأول',
    '2': 'الترم الثاني'
  };

  return termMap[term] || term;
};

// Function to get recommended courses text
export const getRecommendedCoursesText = (grade: string): string => {
  return `الباقات المقترحة للصف ${getGradeInArabic(grade)}`;
};

export const courseSectionTranslations = {
  availableCourses: 'الباقات المتاحة',
  currentGrade: 'الصف الحالي',
  previous: 'السابق',
  next: 'التالي',
  noCoursesFound: 'لم يتم العثور على باقات',
  errorLoading: 'حدث خطأ أثناء تحميل الباقة',
  featuredCourses: 'الباقات المميزة',
  discoverCourses: 'اكتشف مجموعتنا المختارة بعناية من الباقات  ',
  recommendedForGrade: getRecommendedCoursesText
}; 