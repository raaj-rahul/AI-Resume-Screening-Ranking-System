import React, { useState } from 'react';
import { TrendingUp, Target, Clock, Award, BookOpen } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { MOCK_QUIZ_ATTEMPTS, MOCK_QUIZZES } from '../../utils/constants';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

const ReviewAnalytics: React.FC = () => {
  // Mock student ID - in real app this would come from auth context
  const studentId = '1';
  const [attempts] = useState(MOCK_QUIZ_ATTEMPTS.filter(a => a.studentId === studentId));

  // Chart data
  const scoreData = {
    labels: attempts.map((_, index) => `Quiz ${index + 1}`),
    datasets: [
      {
        label: 'Score (%)',
        data: attempts.map(a => a.score),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1
      }
    ]
  };

  const performanceData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [78, 22],
        backgroundColor: ['#10B981', '#F97316'],
        borderWidth: 0
      }
    ]
  };

  const trendData = {
    labels: attempts.map((_, index) => `Quiz ${index + 1}`),
    datasets: [
      {
        label: 'Score Trend',
        data: attempts.map(a => a.score),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    }
  };

  const averageScore = attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length || 0;
  const totalQuizzes = attempts.length;
  const totalTimeSpent = attempts.reduce((sum, a) => sum + a.timeSpent, 0);
  const bestScore = Math.max(...attempts.map(a => a.score));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 pt-20 pb-8">
      <div className="container mx-auto px-6 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border-l-4 border-orange-400 p-6">
          <h1 className="text-3xl font-bold text-green-800">My Analytics</h1>
          <p className="text-green-600 mt-2">Track your quiz performance and progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Average Score</p>
                <p className="text-3xl font-bold text-green-800">{averageScore.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Quizzes Taken</p>
                <p className="text-3xl font-bold text-green-800">{totalQuizzes}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Time Spent</p>
                <p className="text-3xl font-bold text-green-800">{totalTimeSpent}m</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Best Score</p>
                <p className="text-3xl font-bold text-green-800">{bestScore}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-green-200 p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Quiz Scores</h3>
            <Bar data={scoreData} options={chartOptions} />
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-green-200 p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Overall Performance</h3>
            <div className="h-64 flex items-center justify-center">
              <Pie data={performanceData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-green-200 p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Progress Trend</h3>
          <Line data={trendData} options={chartOptions} />
        </div>

        {/* Quiz History */}
        <div className="bg-white rounded-xl shadow-lg border border-green-200">
          <div className="p-6 border-b border-green-200 bg-gradient-to-r from-green-800 to-teal-800 rounded-t-xl">
            <h2 className="text-xl font-semibold text-white">Quiz History</h2>
            <p className="text-green-200 mt-1">Your recent quiz attempts</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                    Quiz
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                    Time Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-200">
                {attempts.map((attempt) => {
                  const quiz = MOCK_QUIZZES.find(q => q.id === attempt.quizId);
                  return (
                    <tr key={attempt.id} className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-green-800">{quiz?.title}</div>
                            <div className="text-sm text-green-600">{quiz?.subject}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          attempt.score >= 80 ? 'bg-green-100 text-green-800' :
                          attempt.score >= 60 ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {attempt.score}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700">
                        {attempt.timeSpent} minutes
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700">
                        {new Date(attempt.completedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Completed
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAnalytics;