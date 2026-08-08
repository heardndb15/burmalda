import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navGroups } from './navConfig';
import { X, Grid } from 'lucide-react';

const mainItems = [
  { path: '/app', label: 'Дашборд' },
  { path: '/resumes', label: 'Резюме' },
  { path: '/templates', label: 'Шаблоны' },
  { path: '/analytics', label: 'Аналитика' },
];

export const MobileNav: React.FC = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <>
      {isMoreOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col justify-end lg:hidden">
          <div className="bg-slate-900 border-t border-slate-800 rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-sm font-bold text-emerald-400 uppercase tracking-wide">
                Все разделы CVGen
              </span>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {navGroups.map((group) => (
              <div key={group.title} className="mb-4">
                <p className="px-1 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400/60">
                  {group.title}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMoreOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-2 p-2.5 rounded-xl border text-xs font-medium transition ${
                            isActive
                              ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300'
                              : 'bg-slate-800/60 border-slate-700/50 text-slate-300'
                          }`
                        }
                      >
                        <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-lg border-t border-emerald-950/50 py-2 px-3 flex items-center justify-around lg:hidden">
        {mainItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 text-[11px] font-medium transition ${
                isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <span>{item.label}</span>
          </NavLink>
        ))}

        <button
          onClick={() => setIsMoreOpen(true)}
          className="flex flex-col items-center space-y-1 text-[11px] font-medium text-slate-400 hover:text-slate-200"
        >
          <Grid className="w-5 h-5" />
          <span>Ещё</span>
        </button>
      </div>
    </>
  );
};
