import React, { useState } from 'react';
import Sidebar from './sidebar';
import { MdMenu } from 'react-icons/md';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between bg-gray-700 dark:bg-gray-900 p-4 shadow-md">
        <img src="../assets/logo-nav.png" alt="Logo" className="h-8" />
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl">
          <MdMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-100 dark:bg-gray-900 transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:block`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay on mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
        ></div>
      )}

      {/* Main content */}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default MainLayout;
