import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileCheck,
  Search,
  FileText,
  Code2,
  FileSpreadsheet,
  Settings,
  ChevronRight,
  Landmark,
} from 'lucide-react';

export const BankSidebar: React.FC<{ isOpenMobile?: boolean; onCloseMobile?: () => void }> = ({
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems = [
    { path: '/bank', label: 'Обзор', icon: LayoutDashboard },
    { path: '/bank/applications', label: 'Заявки', icon: FileCheck },
    { path: '/bank/search', label: 'Проверка хозяйства', icon: Search },
    { path: '/bank/passports', label: 'Financial Passports', icon: FileText },
    { path: '/bank/api', label: 'API Portal', icon: Code2 },
    { path: '/bank/reports', label: 'Отчёты', icon: FileSpreadsheet },
    { path: '/bank/settings', label: 'Настройки', icon: Settings },
  ];

  return (
    <>
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 glass-panel border-r border-cyan-950/40 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 flex-1 overflow-y-auto">
          {/* Bank Header Badge */}
          <div className="mb-6 p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">
                B2B Financial Risk
              </span>
              <h3 className="text-xs font-bold text-white truncate">Halyk / Agrarian Bank</h3>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path + item.label}
                  to={item.path}
                  end={item.path === '/bank'}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-900/60 to-cyan-800/40 text-cyan-300 border border-cyan-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-cyan-950/30'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500" />
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Quick Status Card */}
        <div className="p-4 border-t border-cyan-950/40 bg-slate-950/40">
          <div className="text-[11px] text-slate-400 flex justify-between items-center mb-1">
            <span>Проверено КХ:</span>
            <strong className="text-white font-mono">1 248</strong>
          </div>
          <div className="text-[11px] text-slate-400 flex justify-between items-center">
            <span>Средний Score:</span>
            <strong className="text-cyan-400 font-mono">76 / 100</strong>
          </div>
        </div>
      </aside>
    </>
  );
};
