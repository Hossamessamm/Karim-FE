import React, { useState } from 'react';
import { QuizQuestion } from '../../hooks/useCourseApi';
import { submitQuizResult } from '../../services/courseService';

interface QuizContentProps {
  questions: QuizQuestion[];
  onComplete: () => void;
  hasNextLesson?: boolean;
  onMoveToNextLesson?: () => void;
  lessonId: number;
}

export const QuizContent: React.FC<QuizContentProps> = ({ questions, onComplete, hasNextLesson = false, onMoveToNextLesson, lessonId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitAttempts, setSubmitAttempts] = useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answerIndex;
      return newAnswers;
    });
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setSubmitting(true);
      setError(null);

      const score = calculateScore();
      console.log('Quiz completed with score:', score);
      
      try {
        const result = await submitQuizResult({
          lessonId,
          score: score.percentage,
          notes: `Correct answers: ${score.correct}/${score.total}`
        });
        
        console.log('Quiz submission successful:', result);
        setShowResults(true);
        onComplete(); // Mark the lesson as complete
      } catch (err: any) {
        console.error('Quiz submission error:', err);
        setError(err.message || 'فشل في حفظ نتيجة الاختبار');
        setSubmitAttempts(prev => prev + 1);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleRetry = () => {
    setSubmitting(false);
    setError(null);
    setSubmitAttempts(0);
  };

  const handleComplete = () => {
    if (hasNextLesson && onMoveToNextLesson) {
      onMoveToNextLesson();
    }
  };

  const handleViewAnswers = () => {
    setShowAnswers(true);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    selectedAnswers.forEach((selectedIndex, questionIndex) => {
      if (questions[questionIndex].answers[selectedIndex]?.isCorrect) {
        correctAnswers++;
      }
    });
    return {
      correct: correctAnswers,
      total: questions.length,
      percentage: Math.round((correctAnswers / questions.length) * 100)
    };
  };

  if (!questions.length) {
    return <div className="text-center text-gray-600">لا توجد أسئلة متاحة</div>;
  }

  const question = questions[currentQuestion];
  const score = showResults ? calculateScore() : null;

  const getAnswerStatusClass = (questionIndex: number, answerIndex: number) => {
    const isSelected = selectedAnswers[questionIndex] === answerIndex;
    const isCorrect = questions[questionIndex].answers[answerIndex].isCorrect;
    
    if (!isSelected && !isCorrect) return 'border-gray-200 text-gray-700';
    if (isSelected && isCorrect) return 'border-green-500 bg-green-50 text-green-700';
    if (isSelected && !isCorrect) return 'border-red-500 bg-red-50 text-red-700';
    if (!isSelected && isCorrect) return 'border-green-500 bg-green-50 text-green-700';
  };

  return (
    <div className="quiz-content" dir="rtl">
      {!showResults ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">السؤال {currentQuestion + 1} من {questions.length}</h3>
            <span className="text-sm text-gray-600">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% مكتمل
            </span>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-lg text-gray-900 mb-6">{question.text}</p>
            <div className="space-y-3">
              {question.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-right p-4 rounded-lg border transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="mr-3">
                    <p className="text-sm text-red-700">{error}</p>
                    {submitAttempts > 0 && (
                      <button
                        onClick={handleRetry}
                        className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
                      >
                        حاول مرة أخرى
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined || submitting}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedAnswers[currentQuestion] === undefined || submitting
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    جاري الحفظ...
                  </span>
                ) : currentQuestion < questions.length - 1 ? (
                  'السؤال التالي'
                ) : (
                  'إنهاء الاختبار'
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">تم إكمال الاختبار!</h3>
            <p className="text-gray-600 mb-6">أحسنت! لقد أكملت جميع الأسئلة.</p>
            
            {score && (
              <div className="bg-gray-50 rounded-xl p-6 max-w-sm mx-auto mb-6">
                <div className="text-4xl font-bold text-primary mb-2">{score.percentage}%</div>
                <div className="text-gray-600">
                  <span className="font-medium text-gray-900">{score.correct}</span> إجابات صحيحة من{' '}
                  <span className="font-medium text-gray-900">{score.total}</span> أسئلة
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                  <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-1000" 
                    style={{ width: `${score.percentage}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              {!showAnswers && (
                <button
                  onClick={handleViewAnswers}
                  className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  عرض الإجابات الصحيحة
                </button>
              )}
              
              {hasNextLesson && (
                <button
                  onClick={handleComplete}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  الانتقال إلى الدرس التالي
                </button>
              )}
            </div>

            {showAnswers && (
              <div className="max-w-2xl mx-auto mt-8 space-y-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">الإجابات الصحيحة</h4>
                {questions.map((q, qIndex) => (
                  <div key={qIndex} className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-lg text-gray-900 mb-4 font-medium">{q.text}</p>
                    <div className="space-y-3">
                      {q.answers.map((a, aIndex) => (
                        <div
                          key={aIndex}
                          className={`p-4 rounded-lg border ${getAnswerStatusClass(qIndex, aIndex)}`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{a.text}</span>
                            {selectedAnswers[qIndex] === aIndex && (
                              <span className="text-sm">
                                {a.isCorrect ? '✓ إجابتك صحيحة' : '✗ إجابتك خاطئة'}
                              </span>
                            )}
                          </div>
                          {a.isCorrect && selectedAnswers[qIndex] !== aIndex && (
                            <div className="mt-2 text-sm text-green-600">
                              ✓ الإجابة الصحيحة
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 