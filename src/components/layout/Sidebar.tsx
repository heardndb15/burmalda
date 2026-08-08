import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { navGroups } from './navConfig';
import { FilePenLine, ChevronRight } from 'lucide-react';

export const Sidebar: React.FC<{ isOpenMobile?: boolean; onCloseMobile?: () => void }> = ({
  isOpenMobile,
  onCloseMobile,
}) => {
  const { user, notifications } = useApp();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 glass-panel border-r border-emerald-950/40 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="px-4 pt-4 pb-2 border-b border-emerald-950/40 lg:hidden">
          <span className="text-xs font-semibold text-emerald-400/70 tracking-wider uppercase">
            Навигация
          </span>
        </div>

        <div className="p-3 flex-1 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.title} className="mb-4">
              <p className="px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400/60">
                {group.title}
              </p>
              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const badge =
                    item.badge === 'notifications' && unreadCount > 0 ? unreadCount : undefined;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        `group flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-emerald-900/60 to-emerald-800/40 text-emerald-300 border border-emerald-500/30'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950/30'
                        }`
                      }
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {badge ? (
                        <span className="px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/30">
                          {badge}
                        </span>
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 shrink-0" />
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom user card */}
        <div className="p-3 border-t border-emerald-950/40 bg-slate-950/40">
          <NavLink
            to="/settings"
            className="flex items-center space-x-3 p-2 rounded-xl hover:bg-emerald-950/30 transition"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center overflow-hidden">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <FilePenLine className="w-4 h-4 text-emerald-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[11px] text-emerald-400 capitalize flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {user.plan === 'pro' ? 'Pro-тариф' : user.plan === 'team' ? 'Team' : 'Free'}
              </p>
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
