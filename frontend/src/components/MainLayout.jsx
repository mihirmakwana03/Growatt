import React from 'react';
import Sidebar from './sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">{children}</div>
    </div>

  );
};

export default MainLayout;
