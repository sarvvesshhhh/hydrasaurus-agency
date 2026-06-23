'use client';

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import RosterSidebar from './RosterSidebar';
import SmoothScroll from './SmoothScroll';
import PageTransition from './PageTransition';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Set initial state based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col relative ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar Toggle Button */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className={`fixed top-8 right-8 z-50 hover:opacity-70 transition-all duration-500 group flex items-center justify-center ${
          sidebarOpen ? 'translate-x-[150%] opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'
        }`} 
        id="sidebar-toggle"
        aria-label="Open Roster Sidebar"
      >
        <div className="flex flex-col gap-1.5 items-end">
          <span className="w-8 h-[1px] bg-white block"></span>
          <span className="w-6 h-[1px] bg-white block group-hover:w-8 transition-all"></span>
          <span className="w-4 h-[1px] bg-white block group-hover:w-8 transition-all"></span>
        </div>
      </button>

      <SmoothScroll>
        <div 
          id="main-content"
          className={`flex-grow flex flex-col transition-[padding] duration-500 ease-[cubic-bezier(0.8,0,0.2,1)] ${
            sidebarOpen ? 'lg:pr-[400px]' : 'lg:pr-0'
          }`}
        >
          <Navbar sidebarOpen={sidebarOpen} />
          <div className="flex-grow">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer />
        </div>
        <RosterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </SmoothScroll>
    </div>
  );
}
