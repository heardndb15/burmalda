import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { GovernmentSidebar } from './GovernmentSidebar';
import { MobileNav } from './MobileNav';
import { AIAssistant } from '../common/AIAssistant';
import { DemoTourModal } from '../common/DemoTourModal';

export const GovernmentLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d140e] text-slate-100 flex flex-col font-sans">
      <Header onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      <div className="flex-1 flex overflow-hidden">
        {/* Akimat B2G Sidebar */}
        <GovernmentSidebar
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Government Viewport */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-8 p-4 lg:p-6 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <MobileNav />
      <AIAssistant />
      <DemoTourModal />
    </div>
  );
};
