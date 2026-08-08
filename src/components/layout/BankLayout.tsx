import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BankSidebar } from './BankSidebar';
import { MobileNav } from './MobileNav';
import { AIAssistant } from '../common/AIAssistant';
import { DemoTourModal } from '../common/DemoTourModal';

export const BankLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#071318] text-slate-100 flex flex-col font-sans">
      <Header onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      <div className="flex-1 flex overflow-hidden">
        {/* B2B Bank Sidebar */}
        <BankSidebar
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Bank Viewport */}
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
