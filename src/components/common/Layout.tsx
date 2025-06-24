import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Sidebar from './Sidebar';

interface LayoutProps {
  userRole?: 'admin' | 'student';
}

const Layout: React.FC<LayoutProps> = ({ userRole }) => {
  if (!userRole) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <Navigation userRole={userRole} />
      <div className="flex">
        <Sidebar userRole={userRole} />
        <main className="flex-1 ml-64 pt-20">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;