import React from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import {
  Bell,
  CheckCheck,
  TrendingUp,
  Sparkles,
  CalendarClock,
  AlertTriangle,
  Info,
  CircleCheck,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const toneMeta: Record<string, { icon: typeof Info; bg: string }> = {
  success: { icon: CircleCheck, bg: 'bg-emerald-950 border-emerald-500/40 text-emerald-400' },
  info: { icon: Info, bg: 'bg-blue-950 border-blue-500/40 text-blue-400' },
  warning: { icon: CalendarClock, bg: 'bg-amber-950 border-amber-500/40 text-amber-400' },
  danger: { icon: AlertTriangle, bg: 'bg-red-950 border-red-500/40 text-red-400' },
};

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const navigate = useNavigate();

  const unread = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        title="Уведомления"
        subtitle={`${unread} непрочитанных`}
        badge={unread > 0 ? <Badge tone="red">{unread} новых</Badge> : undefined}
        actions={
          unread > 0 ? (
            <Button variant="secondary" onClick={markAllNotificationsRead}>
              <CheckCheck className="w-4 h-4" /> Прочитать все
            </Button>
          ) : undefined
        }
      />

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="Уведомлений нет"
          description="Здесь будут появляться события по вашим резюме, откликам и AI-рекомендациям."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => {
            const meta = toneMeta[n.type] ?? toneMeta.info;
            const Icon = meta.icon;
            return (
              <div
                key={n.id}
                onClick={() => {
                  markNotificationRead(n.id);
                  if (n.link) navigate(n.link);
                }}
                className={`glass-card rounded-2xl border p-4 flex gap-4 cursor-pointer transition ${
                  n.isRead ? 'border-slate-800 opacity-70' : 'border-slate-700'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${meta.bg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-white">{n.title}</h3>
                    {!n.isRead && <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{n.message}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                    {n.link && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                        Перейти <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-300">
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <TrendingUp className="w-4 h-4 text-emerald-400 mb-2" />
          <p className="font-bold text-white mb-1">Статистика</p>
          <p className="text-slate-400">Еженедельный отчёт по просмотрам и откликам.</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <Sparkles className="w-4 h-4 text-amber-400 mb-2" />
          <p className="font-bold text-white mb-1">AI-подсказки</p>
          <p className="text-slate-400">Рекомендации по улучшению резюме в реальном времени.</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <CalendarClock className="w-4 h-4 text-blue-400 mb-2" />
          <p className="font-bold text-white mb-1">Напоминания</p>
          <p className="text-slate-400">Собеседования, дедлайны офферов, сроки ссылок.</p>
        </div>
      </div>
    </div>
  );
};
