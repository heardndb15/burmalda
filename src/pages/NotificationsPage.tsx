import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Bell, ShieldAlert, Trees, FileText, CheckCircle2 } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, t } = useApp();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white">{t('notificationsTitle')}</h1>
        <span className="text-xs text-slate-400">
          Всего уведомлений: {notifications.length}
        </span>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
          {t('notificationToday')}
        </h3>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationRead(n.id);
                if (n.link) navigate(n.link);
              }}
              className={`p-4 rounded-xl border transition cursor-pointer flex items-start space-x-3.5 ${
                n.type === 'danger'
                  ? 'bg-red-950/30 border-red-500/40 hover:border-red-500'
                  : n.type === 'warning'
                  ? 'bg-amber-950/30 border-amber-500/40 hover:border-amber-500'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              } ${!n.isRead ? 'ring-2 ring-emerald-500/20' : 'opacity-80'}`}
            >
              <div className="shrink-0 mt-0.5">
                {n.type === 'danger' && <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse" />}
                {n.type === 'warning' && <Trees className="w-5 h-5 text-amber-400" />}
                {n.type === 'info' && <FileText className="w-5 h-5 text-blue-400" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{n.title}</h4>
                  <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
