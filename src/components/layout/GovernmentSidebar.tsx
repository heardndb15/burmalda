import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Map,
  Trees,
  Compass,
  Footprints,
  ShieldAlert,
  FileCheck2,
  FileSpreadsheet,
  Bell,
  Building,
  Settings,
  ChevronRight,
  Building2,
} from 'lucide-react';

export const GovernmentSidebar: React.FC<{ isOpenMobile?: boolean; onCloseMobile?: () => void }> = ({
  isOpenMobile,
  onCloseMobile,
}) => {
  const { governmentAlerts } = useApp();

  const activeAlertsCount = governmentAlerts.filter((a) => a.status === 'active').length;

  const navItems = [
    { path: '/government', label: 'Обзор', icon: LayoutDashboard },
    { path: '/government/map', label: 'Карта', icon: Map },
    { path: '/government/pastures', label: 'Пастбища', icon: Trees },
    { path: '/government/land', label: 'Земли', icon: Compass },
    { path: '/government/livestock', label: 'Животноводство', icon: Footprints },
    { path: '/government/alerts', label: 'Риски', icon: ShieldAlert, badge: activeAlertsCount > 0 ? activeAlertsCount : undefined },
    { path: '/government/management-plan', label: 'План управления', icon: FileCheck2 },
    { path: '/government/reports', label: 'Отчёты', icon: FileSpreadsheet },
    { path: '/government/alerts', label: 'Уведомления', icon: Bell },
    { path: '/government/organizations', label: 'Организации', icon: Building },
    { path: '/government/settings', label: 'Настройки', icon: Settings },
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
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 glass-panel border-r border-amber-950/40 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 flex-1 overflow-y-auto">
          {/* Header Badge */}
          <div className="mb-6 p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                B2G Акимат
              </span>
              <h3 className="text-xs font-bold text-white truncate">Илийский сельский округ</h3>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path + item.label}
                  to={item.path}
                  end={item.path === '/government'}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-900/60 to-amber-800/40 text-amber-300 border border-amber-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-amber-950/30'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500" />
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer District Status Quick Card */}
        <div className="p-4 border-t border-amber-950/40 bg-slate-950/40">
          <div className="text-[11px] text-slate-400 flex justify-between items-center mb-1">
            <span>Площадь округа:</span>
            <strong className="text-white font-mono">1 248 000 га</strong>
          </div>
          <div className="text-[11px] text-slate-400 flex justify-between items-center">
            <span>Деградация:</span>
            <strong className="text-amber-400 font-mono">18% (Зона риска)</strong>
          </div>
        </div>
      </aside>
    </>
  );
};
