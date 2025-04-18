import React from 'react';
import Sidebar from './sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar: fixed on desktop, static on mobile */}
      <div className="hidden md:block">
        <div className="fixed inset-y-0 left-0 w-64">
          <Sidebar />
        </div>
      </div>
      {/* Mobile sidebar (shows normally, not fixed) */}
      <div className="block md:hidden w-full">
        <Sidebar />
      </div>
      {/* Main content with left margin on desktop */}
      <div className="flex-grow md:ml-64">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
