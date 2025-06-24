import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Sparkles, Save, X } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

const CreateQuiz: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manual' | 'ai'>('manual');
  const [quizData, setQuizData] = useState({
    title: '',
    subject: '',
    timeLimit: 30
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [aiPrompt, setAiPrompt] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const generateAIQuestions = () => {
    // Simulate AI generation with mock questions
    const mockQuestions: Question[] = [
      {
        id: '1',
        text: 'What is the primary purpose of machine learning?',
        options: ['Data storage', 'Pattern recognition', 'File compression', 'Network security'],
        correctAnswer: 1,
        explanation: 'Machine learning is primarily used for pattern recognition and making predictions from data.'
      },
      {
        id: '2',
        text: 'Which algorithm is commonly used for classification tasks?',
        options: ['K-means', 'Linear regression', 'Decision tree', 'Bubble sort'],
        correctAnswer: 2,
        explanation: 'Decision trees are widely used for classification tasks due to their interpretability.'
      }
    ];
    setQuestions(mockQuestions);
  };

  const handleSubmit = () => {
    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }
    setShowConfirmation(true);
  };

  const confirmSubmission = () => {
    // Handle quiz submission logic here
    console.log('Quiz submitted:', { quizData, questions });
    setShowConfirmation(false);
    // Reset form
    setQuizData({ title: '', subject: '', timeLimit: 30 });
    setQuestions([]);
    setAiPrompt('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-900">Create Quiz</h1>
        <p className="text-green-600 mt-2">Build comprehensive quizzes for your students</p>
      </div>

      {/* Quiz Details */}
      <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6">
        <h2 className="text-xl font-semibold text-green-900 mb-4">Quiz Details</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-green-700 mb-2">
              Quiz Title
            </label>
            <input
              type="text"
              id="title"
              value={quizData.title}
              onChange={(e) => setQuizData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter quiz title"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-green-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={quizData.subject}
              onChange={(e) => setQuizData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter subject name"
            />
          </div>
          <div>
            <label htmlFor="timeLimit" className="block text-sm font-medium text-green-700 mb-2">
              Time Limit (minutes)
            </label>
            <input
              type="number"
              id="timeLimit"
              value={quizData.timeLimit}
              onChange={(e) => setQuizData(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="5"
              max="180"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-green-200">
        <div className="border-b border-green-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === 'manual'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-green-700'
              }`}
            >
              Manual Entry
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === 'ai'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-green-700'
              }`}
            >
              AI Generation
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'manual' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-green-900">Add Questions Manually</h3>
                <button
                  onClick={addQuestion}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Question</span>
                </button>
              </div>

              {questions.map((question, questionIndex) => (
                <div key={question.id} className="border border-green-200 rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-md font-medium text-green-900">Question {questionIndex + 1}</h4>
                    <button
                      onClick={() => deleteQuestion(questionIndex)}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Question Text
                    </label>
                    <textarea
                      value={question.text}
                      onChange={(e) => updateQuestion(questionIndex, 'text', e.target.value)}
                      className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter your question here..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Answer Options
                    </label>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name={`correct-${questionIndex}`}
                            checked={question.correctAnswer === optionIndex}
                            onChange={() => updateQuestion(questionIndex, 'correctAnswer', optionIndex)}
                            className="text-green-600"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                            className="flex-1 px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Explanation (Optional)
                    </label>
                    <textarea
                      value={question.explanation || ''}
                      onChange={(e) => updateQuestion(questionIndex, 'explanation', e.target.value)}
                      className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={2}
                      placeholder="Explain the correct answer..."
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-4">Generate Quiz with AI</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="aiPrompt" className="block text-sm font-medium text-green-700 mb-2">
                      Topic Description
                    </label>
                    <textarea
                      id="aiPrompt"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={4}
                      placeholder="Describe the topic you want to create questions about..."
                    />
                  </div>
                  <div>
                    <label htmlFor="questionCount" className="block text-sm font-medium text-green-700 mb-2">
                      Number of Questions
                    </label>
                    <select
                      id="questionCount"
                      value={questionCount}
                      onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value={5}>5 Questions</option>
                      <option value={10}>10 Questions</option>
                      <option value={20}>20 Questions</option>
                    </select>
                    
                    <button
                      onClick={generateAIQuestions}
                      className="w-full mt-4 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Questions</span>
                    </button>
                  </div>
                </div>
              </div>

              {questions.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-green-900">Generated Questions (Editable)</h4>
                  {questions.map((question, questionIndex) => (
                    <div key={question.id} className="border border-green-200 rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="text-md font-medium text-green-900">Question {questionIndex + 1}</h5>
                        <div className="flex space-x-2">
                          <button className="text-green-600 hover:text-green-700 p-2 hover:bg-green-50 rounded-lg transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteQuestion(questionIndex)}
                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-green-900 mb-2">{question.text}</p>
                        <div className="space-y-1">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-2 rounded ${
                                question.correctAnswer === optionIndex
                                  ? 'bg-green-50 text-green-800 border border-green-200'
                                  : 'bg-gray-50 text-gray-700'
                              }`}
                            >
                              {optionIndex + 1}. {option}
                            </div>
                          ))}
                        </div>
                        {question.explanation && (
                          <div className="mt-2 p-2 bg-green-50 rounded text-green-800 text-sm">
                            <strong>Explanation:</strong> {question.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      {questions.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Quiz</span>
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Save className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">Confirm Quiz Submission</h3>
              <p className="text-green-600 mb-6">
                Are you sure you want to save this quiz? It will be available for students to take.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={confirmSubmission}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Confirm</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;