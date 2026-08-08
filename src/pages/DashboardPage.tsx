import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/ui/StatCard';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Button } from '../components/ui/Button';
import {
  Eye,
  Download,
  Trophy,
  EyeOff,
  FilePenLine,
  Plus,
  Sparkles,
  TrendingUp,
  WandSparkles,
  Send,
  ArrowRight,
  CalendarClock,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, resumes, notifications, coverLetters, applications } = useApp();
  const navigate = useNavigate();

  const totalViews = resumes.reduce((acc, r) => acc + r.stats.views, 0);
  const totalDownloads = resumes.reduce((acc, r) => acc + r.stats.downloads, 0);
  const totalInterviews = resumes.reduce((acc, r) => acc + r.stats.interviews, 0);
  const avgAts = resumes.length
    ? Math.round(resumes.reduce((acc, r) => acc + r.atsScore, 0) / resumes.length)
    : 0;

  const unread = notifications.filter((n) => !n.isRead);
  const bestResume = [...resumes].sort((a, b) => b.atsScore - a.atsScore)[0];
  const upcomingInterviews = applications.filter((a) => a.status === 'interview');

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Карьерный коуч включён</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Добрый день, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              {user.headline} · {user.location}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <div className="flex items-center space-x-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 shrink-0">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div className="text-xs">
                <span className="block text-slate-400 font-medium">Статус поиска:</span>
                <span className="font-extrabold text-emerald-400 text-sm">Активный · 23 отклика</span>
              </div>
            </div>
            <Button size="sm" onClick={() => navigate('/resumes/new')}>
              <Plus className="w-3.5 h-3.5" /> Новое резюме
            </Button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Eye} label="Просмотры резюме" value={totalViews.toLocaleString('ru-RU')} sub="за всё время" tone="emerald" />
        <StatCard icon={Download} label="Скачивания PDF" value={totalDownloads.toLocaleString('ru-RU')} sub="работодателями" tone="blue" />
        <StatCard icon={Trophy} label="Интервью" value={String(totalInterviews)} sub={`конверсия ${resumes.length ? Math.round((totalInterviews / Math.max(totalViews, 1)) * 1000) / 10 : 0}%`} tone="amber" />
        <StatCard icon={EyeOff} label="Средний ATS" value={`${avgAts}/100`} sub={avgAts >= 85 ? 'отличный уровень' : 'можно улучшить'} tone="violet" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Resume list */}
        <div className="lg:col-span-2 space-y-6">
          <Card
            title="Мои резюме"
            subtitle={`${resumes.length} шт. · активное выделено`}
            action={
              <Button size="sm" variant="outline" onClick={() => navigate('/resumes')}>
                Все резюме <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            }
          >
            <div className="space-y-3">
              {resumes.map((r) => (
                <div
                  key={r.id}
                  onClick={() => navigate(`/resumes/${r.id}`)}
                  className="flex items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <FilePenLine className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate">{r.name}</p>
                      <p className="text-[11px] text-slate-400">
                        Обновлено {r.updatedAt} · {r.stats.views.toLocaleString('ru-RU')} просмотров
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex items-center gap-1.5">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] font-bold">
                        <Eye className="w-3 h-3 text-emerald-400" />
                        ATS {r.atsScore}
                      </div>
                    </div>
                    <Badge
                      tone={
                        r.status === 'optimized'
                          ? 'emerald'
                          : r.status === 'completed'
                          ? 'blue'
                          : r.status === 'in_progress'
                          ? 'amber'
                          : 'slate'
                      }
                    >
                      {r.status === 'optimized'
                        ? 'Оптимизировано'
                        : r.status === 'completed'
                        ? 'Готово'
                        : r.status === 'in_progress'
                        ? 'В работе'
                        : 'Черновик'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card
            title="Карьерная аналитика"
            subtitle="Просмотры резюме за 6 месяцев"
            action={
              <Button size="sm" variant="ghost" onClick={() => navigate('/analytics')}>
                Подробнее
              </Button>
            }
          >
            <div className="flex items-end justify-between gap-2 h-32 pt-2">
              {[
                { m: 'Мар', v: 84 },
                { m: 'Апр', v: 132 },
                { m: 'Май', v: 218 },
                { m: 'Июн', v: 296 },
                { m: 'Июл', v: 254 },
                { m: 'Авг', v: 300 },
              ].map((d) => (
                <div key={d.m} className="flex flex-col items-center gap-1 flex-1">
                  <span className="text-[10px] font-bold text-emerald-300">{d.v}</span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-emerald-700 to-emerald-400 opacity-80"
                    style={{ height: `${(d.v / 300) * 100}%` }}
                  />
                  <span className="text-[10px] text-slate-500">{d.m}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <Card title="Лучшее резюме" subtitle="по ATS-скорингу">
            {bestResume ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{bestResume.name}</p>
                    <p className="text-[11px] text-slate-400">ATS {bestResume.atsScore}/100</p>
                  </div>
                </div>
                <Progress value={bestResume.atsScore} color="bg-emerald-500" showLabel />
                <Button size="sm" className="w-full" onClick={() => navigate(`/resumes/${bestResume.id}`)}>
                  Открыть резюме
                </Button>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Резюме пока нет.</p>
            )}
          </Card>

          <Card title="Ближайшие собеседования" subtitle={`${upcomingInterviews.length} в процессе`}>
            <div className="space-y-3">
              {upcomingInterviews.length === 0 && (
                <p className="text-xs text-slate-400">Пока нет активных этапов.</p>
              )}
              {upcomingInterviews.map((a) => (
                <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <CalendarClock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">{a.company} — {a.position}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{a.notes}</p>
                    <button
                      onClick={() => navigate('/interview')}
                      className="text-[11px] font-bold text-emerald-400 hover:underline mt-1"
                    >
                      Подготовиться →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Уведомления" subtitle={`${unread.length} непрочитанных`}>
            <div className="space-y-2.5">
              {unread.slice(0, 3).map((n) => (
                <button
                  key={n.id}
                  onClick={() => navigate(n.link ?? '/notifications')}
                  className="w-full text-left p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition"
                >
                  <p className="text-xs font-semibold text-white leading-snug">{n.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                </button>
              ))}
              {unread.length === 0 && <p className="text-xs text-slate-400">Всё прочитано 🎉</p>}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick actions strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => navigate('/resumes/new')}
          className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-3 hover:border-emerald-500/50 transition text-left"
        >
          <WandSparkles className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-white">AI-генерация</p>
            <p className="text-[10px] text-slate-400">новое резюме за минуту</p>
          </div>
        </button>
        <button
          onClick={() => navigate('/cover-letters')}
          className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-3 hover:border-emerald-500/50 transition text-left"
        >
          <Send className="w-5 h-5 text-blue-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-white">Cover letter</p>
            <p className="text-[10px] text-slate-400">{coverLetters.length} письма</p>
          </div>
        </button>
        <button
          onClick={() => navigate('/ats')}
          className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-3 hover:border-emerald-500/50 transition text-left"
        >
          <TrendingUp className="w-5 h-5 text-violet-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-white">ATS-анализ</p>
            <p className="text-[10px] text-slate-400">совместимость вакансий</p>
          </div>
        </button>
        <button
          onClick={() => navigate('/applications')}
          className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-3 hover:border-emerald-500/50 transition text-left"
        >
          <ArrowRight className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-white">Отклики</p>
            <p className="text-[10px] text-slate-400">{applications.length} вакансий</p>
          </div>
        </button>
      </div>
    </div>
  );
};
