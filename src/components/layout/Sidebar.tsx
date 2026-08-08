import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Map,
  Trees,
  Footprints,
  Radio,
  ShieldAlert,
  Users,
  FileText,
  Bell,
  BarChart3,
  Home,
  Settings,
  ChevronRight,
} from 'lucide-react';

export const Sidebar: React.FC<{ isOpenMobile?: boolean; onCloseMobile?: () => void }> = ({
  isOpenMobile,
  onCloseMobile,
}) => {
  const { t, notifications } = useApp();

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const navItems = [
    { path: '/app', label: t('navToday'), icon: Sun },
    { path: '/map', label: t('navMap'), icon: Map },
    { path: '/pastures', label: t('navPastures'), icon: Trees },
    { path: '/herd', label: t('navHerd'), icon: Footprints },
    { path: '/trackers', label: t('navTrackers'), icon: Radio },
    { path: '/safety', label: t('navSafety'), icon: ShieldAlert },
    { path: '/workers', label: t('navWorkers'), icon: Users },
    { path: '/contracts', label: t('navContracts'), icon: FileText },
    {
      path: '/notifications',
      label: t('navNotifications'),
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined,
    },
    { path: '/analytics', label: t('navAnalytics'), icon: BarChart3 },
    { path: '/farm', label: t('navFarm'), icon: Home },
    { path: '/settings', label: t('navSettings'), icon: Settings },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 glass-panel border-r border-emerald-950/40 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="mb-6 px-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400/70 tracking-wider uppercase">
              Навигация
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-900/60 to-emerald-800/40 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-950'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950/30'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
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

        {/* Bottom Farm Quick Card */}
        <div className="p-4 border-t border-emerald-950/40 bg-slate-950/40">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
              АШ
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">Өтеген батыр</p>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                🟢 3 480 га
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
