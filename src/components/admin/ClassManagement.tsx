import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, BookOpen } from 'lucide-react';
import { MOCK_CLASSES } from '../../utils/constants';

const ClassManagement: React.FC = () => {
  const navigate = useNavigate();
  const [classes] = useState(MOCK_CLASSES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', description: '' });

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle add class logic here
    setShowAddForm(false);
    setNewClass({ name: '', description: '' });
  };

  const handleViewStudents = (classId: string) => {
    navigate(`/admin/students/${classId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Management</h1>
          <p className="text-gray-600 mt-2">Organize and manage your classes</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Class</span>
        </button>
      </div>

      {/* Add Class Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Class</h2>
          <form onSubmit={handleAddClass} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  id="className"
                  required
                  value={newClass.name}
                  onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Machine Learning"
                />
              </div>
              <div>
                <label htmlFor="classDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  id="classDescription"
                  required
                  value={newClass.description}
                  onChange={(e) => setNewClass(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Brief description of the class"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-green-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Add Class
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

      {/* Classes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div key={classItem.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                  {classItem.studentCount} students
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{classItem.name}</h3>
              <p className="text-gray-600 mb-4">{classItem.description}</p>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleViewStudents(classItem.id)}
                  className="flex-1 bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Students</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassManagement;