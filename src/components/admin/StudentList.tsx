import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, User, BarChart3, Mail } from 'lucide-react';
import { MOCK_STUDENTS, MOCK_CLASSES } from '../../utils/constants';

const StudentList: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ usn: '', name: '', email: '' });

  const classInfo = MOCK_CLASSES.find(c => c.id === classId);
  const students = MOCK_STUDENTS.filter(s => s.classId === classId);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle add student logic here
    setShowAddForm(false);
    setNewStudent({ usn: '', name: '', email: '' });
  };

  const handleViewAnalytics = (studentId: string) => {
    navigate(`/admin/analytics/${studentId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/classes')}
            className="p-2 hover:bg-green-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-green-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{classInfo?.name} Students</h1>
            <p className="text-gray-600 mt-2">Manage students in this class</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Add Student Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Student</h2>
          <form onSubmit={handleAddStudent} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="usn" className="block text-sm font-medium text-gray-700 mb-2">
                  USN (Roll Number)
                </label>
                <input
                  type="text"
                  id="usn"
                  required
                  value={newStudent.usn}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, usn: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., CS21001"
                />
              </div>
              <div>
                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  id="studentName"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="studentEmail"
                  required
                  value={newStudent.email}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="student@university.edu"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-green-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Add Student
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Student List</h2>
          <p className="text-gray-600 mt-1">{students.length} students enrolled</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  USN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {student.usn}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {student.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleViewAnalytics(student.id)}
                      className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center space-x-2 ml-auto"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>View Analytics</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;