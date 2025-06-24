import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, User } from 'lucide-react';

interface NavigationProps {
  userRole: 'admin' | 'student';
}

const Navigation: React.FC<NavigationProps> = ({ userRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-800 to-teal-800 text-white border-b-4 border-orange-400 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-green-800" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Riverside University</h1>
              <p className="text-green-200 text-sm">Student Quiz Portal</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-green-200">
              <User className="w-5 h-5" />
              <span className="capitalize">Welcome, {userRole}</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;