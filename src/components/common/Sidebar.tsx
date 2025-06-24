import React from 'react';
import { NavLink } from 'react-router-dom';
import {
   Users,
   PlusCircle,
   BookOpen,
   TrendingUp,
} from 'lucide-react';

interface SidebarProps {
  userRole: 'admin' | 'student';
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const adminLinks = [
    { to: '/admin/classes', icon: Users, label: 'Class Management' },
    { to: '/admin/create-quiz', icon: PlusCircle, label: 'Create Quiz' },
  ];

  const studentLinks = [
    { to: '/student/quiz', icon: BookOpen, label: 'Take Quiz' },
    { to: '/student/analytics', icon: TrendingUp, label: 'View Analytics' },
  ];

  const links = userRole === 'admin' ? adminLinks : studentLinks;

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-64 bg-gradient-to-b from-green-800 to-teal-800 border-r-4 border-orange-400 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-6 border-b border-green-600 pb-3">
          {userRole === 'admin' ? 'Admin Panel' : 'Student Portal'}
        </h2>
                
        <nav className="space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-5 py-4 rounded-xl transition-all duration-300 font-medium ${
                  isActive
                    ? 'bg-white text-green-800 shadow-lg transform scale-105 border-l-4 border-orange-400'
                    : 'text-green-100 hover:bg-green-700 hover:text-white hover:transform hover:scale-102'
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;