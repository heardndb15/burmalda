import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Map,
  Footprints,
  Trees,
  Grid,
  Radio,
  ShieldAlert,
  Users,
  FileText,
  Bell,
  BarChart3,
  Home,
  Settings,
  X,
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { t } = useApp();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainItems = [
    { path: '/app', label: t('navToday'), icon: Sun },
    { path: '/map', label: t('navMap'), icon: Map },
    { path: '/herd', label: t('navHerd'), icon: Footprints },
    { path: '/pastures', label: t('navPastures'), icon: Trees },
  ];

  const moreItems = [
    { path: '/trackers', label: t('navTrackers'), icon: Radio },
    { path: '/safety', label: t('navSafety'), icon: ShieldAlert },
    { path: '/workers', label: t('navWorkers'), icon: Users },
    { path: '/contracts', label: t('navContracts'), icon: FileText },
    { path: '/notifications', label: t('navNotifications'), icon: Bell },
    { path: '/analytics', label: t('navAnalytics'), icon: BarChart3 },
    { path: '/farm', label: t('navFarm'), icon: Home },
    { path: '/settings', label: t('navSettings'), icon: Settings },
  ];

  return (
    <>
      {/* Mobile More Sheet */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col justify-end lg:hidden">
          <div className="bg-slate-900 border-t border-slate-800 rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-sm font-bold text-emerald-400 uppercase tracking-wide">
                Все разделы AgroRadar
              </span>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {moreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMoreOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-2.5 p-3 rounded-xl border text-sm font-medium transition ${
                        isActive
                          ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-800/60 border-slate-700/50 text-slate-300'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-lg border-t border-emerald-950/50 py-2 px-3 flex items-center justify-around lg:hidden">
        {mainItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 text-[11px] font-medium transition ${
                  isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <button
          onClick={() => setIsMoreOpen(true)}
          className="flex flex-col items-center space-y-1 text-[11px] font-medium text-slate-400 hover:text-slate-200"
        >
          <Grid className="w-5 h-5" />
          <span>{t('navMore')}</span>
        </button>
      </div>
    </>
  );
};
