import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { MOCK_QUIZZES } from '../../utils/constants';

const TakeQuiz: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const quiz = MOCK_QUIZZES.find(q => q.id === selectedQuiz);

  useEffect(() => {
    if (selectedQuiz && quiz) {
      setTimeRemaining(quiz.timeLimit * 60); // Convert to seconds
    }
  }, [selectedQuiz, quiz]);

  useEffect(() => {
    if (timeRemaining > 0 && selectedQuiz && !quizCompleted) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && selectedQuiz) {
      handleSubmitQuiz();
    }
  }, [timeRemaining, selectedQuiz, quizCompleted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    setQuizCompleted(true);
    setShowSubmitConfirm(false);
    // Calculate score and handle submission logic here
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  if (!selectedQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 pt-20 pb-8">
        <div className="container mx-auto px-6 space-y-6">
          <div className="bg-white rounded-xl shadow-lg border-l-4 border-orange-400 p-6">
            <h1 className="text-3xl font-bold text-green-800">Available Quizzes</h1>
            <p className="text-green-600 mt-2">Select a quiz to begin</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_QUIZZES.map((quiz) => (
              <div key={quiz.id} className="bg-white rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-green-800 mb-2">{quiz.title}</h3>
                  <p className="text-green-600 mb-4">{quiz.subject}</p>
                  
                  <div className="space-y-2 text-sm text-green-700 mb-4">
                    <div className="flex items-center justify-between">
                      <span>Questions:</span>
                      <span className="font-medium">{quiz.questions.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Time Limit:</span>
                      <span className="font-medium">{quiz.timeLimit} minutes</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedQuiz(quiz.id)}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-teal-700 transition-all duration-200"
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 pt-20 pb-8">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-green-200 p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-green-800 mb-4">Quiz Completed!</h1>
              <p className="text-green-600 mb-6">You have successfully completed {quiz?.title}</p>
              
              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6 mb-6 border border-green-200">
                <div className="text-4xl font-bold text-green-600 mb-2">{score}%</div>
                <p className="text-green-700">Your Score</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">{Object.keys(answers).length}</div>
                  <div className="text-sm text-green-600">Questions Answered</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {quiz?.questions.filter((q, i) => answers[i] === q.correctAnswer).length}
                  </div>
                  <div className="text-sm text-green-600">Correct Answers</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {quiz?.questions.filter((q, i) => answers[i] !== q.correctAnswer).length}
                  </div>
                  <div className="text-sm text-orange-600">Incorrect Answers</div>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setSelectedQuiz(null);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setQuizCompleted(false);
                }}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-200"
              >
                Take Another Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) return <div>Quiz not found</div>;

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg border border-green-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-green-800">{quiz.title}</h1>
                <p className="text-green-600">{quiz.subject}</p>
              </div>
              <div className="flex items-center space-x-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-lg border border-orange-200">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-600">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <div className="w-64 bg-green-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-600 to-teal-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-xl shadow-lg border border-green-200 p-8">
            <h2 className="text-xl font-semibold text-green-800 mb-6">{question.text}</h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    answers[currentQuestion] === index
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-green-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      answers[currentQuestion] === index
                        ? 'border-green-500 bg-green-500'
                        : 'border-green-300'
                    }`}>
                      {answers[currentQuestion] === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="font-medium text-green-800">{String.fromCharCode(65 + index)}.</span>
                    <span className="ml-2">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="bg-green-100 text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex space-x-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    index === currentQuestion
                      ? 'bg-green-600 text-white'
                      : answers[index] !== undefined
                      ? 'bg-green-100 text-green-800'
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-teal-700 transition-all duration-200"
              >
                Next
              </button>
            )}
          </div>

          {/* Submit Confirmation Modal */}
          {showSubmitConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 border border-green-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Submit Quiz?</h3>
                  <p className="text-green-600 mb-6">
                    Are you sure you want to submit your quiz? You won't be able to change your answers after submission.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowSubmitConfirm(false)}
                      className="flex-1 bg-green-100 text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-200 transition-colors"
                    >
                      Continue Quiz
                    </button>
                    <button
                      onClick={handleSubmitQuiz}
                      className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                    >
                      Submit Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;