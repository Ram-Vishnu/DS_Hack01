import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      {/* Global Ambient Lights */}
      <div className="bg-ambient-light-1"></div>
      <div className="bg-ambient-light-2"></div>
      
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 relative">
          {/* Scrollable content area */}
          <div className="max-w-7xl mx-auto space-y-8 pb-20">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
