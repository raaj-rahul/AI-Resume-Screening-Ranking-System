import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Target, Clock, Award } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { MOCK_STUDENTS, MOCK_QUIZ_ATTEMPTS, MOCK_QUIZZES } from '../../utils/constants';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

const StudentAnalytics: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const [student] = useState(MOCK_STUDENTS.find(s => s.id === studentId));
  const [attempts] = useState(MOCK_QUIZ_ATTEMPTS.filter(a => a.studentId === studentId));

  // Chart data
  const scoreData = {
    labels: attempts.map((_, index) => `Quiz ${index + 1}`),
    datasets: [
      {
        label: 'Score (%)',
        data: attempts.map(a => a.score),
        backgroundColor: 'rgba(20, 184, 166, 0.8)',
        borderColor: 'rgb(20, 184, 166)',
        borderWidth: 1
      }
    ]
  };

  const performanceData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [75, 25],
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
        borderColor: 'rgb(20, 184, 166)',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
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

  if (!student) {
    return <div>Student not found</div>;
  }

  const averageScore = attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length || 0;
  const totalQuizzes = attempts.length;
  const totalTimeSpent = attempts.reduce((sum, a) => sum + a.timeSpent, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-green-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-green-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{student.name} Analytics</h1>
          <p className="text-gray-600 mt-2">USN: {student.usn} • Performance Overview</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-3xl font-bold text-gray-900">{averageScore.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Quizzes Taken</p>
              <p className="text-3xl font-bold text-gray-900">{totalQuizzes}</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-800" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Time Spent</p>
              <p className="text-3xl font-bold text-gray-900">{totalTimeSpent}m</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Best Score</p>
              <p className="text-3xl font-bold text-gray-900">{Math.max(...attempts.map(a => a.score))}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Scores</h3>
          <Bar data={scoreData} options={chartOptions} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Performance</h3>
          <div className="h-64 flex items-center justify-center">
            <Pie data={performanceData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Trend</h3>
        <Line data={trendData} options={chartOptions} />
      </div>

      {/* Quiz History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Quiz History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quiz
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attempts.map((attempt) => {
                const quiz = MOCK_QUIZZES.find(q => q.id === attempt.quizId);
                return (
                  <tr key={attempt.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{quiz?.title}</div>
                      <div className="text-sm text-gray-500">{quiz?.subject}</div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {attempt.timeSpent} minutes
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(attempt.completedAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;