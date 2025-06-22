import React, { useState } from 'react';
import { QuizQuestion } from '../../hooks/useCourseApi';

interface QuizContentProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export const QuizContent: React.FC<QuizContentProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answerIndex;
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleComplete = () => {
    onComplete();
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

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedAnswers[currentQuestion] === undefined
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {currentQuestion < questions.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}
            </button>
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
          </div>
          <button
            onClick={handleComplete}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            إنهاء وعودة للدرس
          </button>
        </div>
      )}
    </div>
  );
}; 