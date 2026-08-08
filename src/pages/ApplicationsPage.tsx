import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Send, Briefcase, TrendingUp, MessageSquare, CircleCheck, Plus, ExternalLink } from 'lucide-react';
import { JobApplication } from '../types';

const statusMeta: Record<
  JobApplication['status'],
  { label: string; tone: 'slate' | 'blue' | 'amber' | 'emerald' | 'red' }
> = {
  saved: { label: 'Сохранено', tone: 'slate' },
  applied: { label: 'Отклик', tone: 'blue' },
  interview: { label: 'Интервью', tone: 'amber' },
  offer: { label: 'Оффер', tone: 'emerald' },
  rejected: { label: 'Отказ', tone: 'red' },
};

const statusOrder: JobApplication['status'][] = ['saved', 'applied', 'interview', 'offer', 'rejected'];

export const ApplicationsPage: React.FC = () => {
  const { applications, updateApplicationStatus } = useApp();
  const [statusFilter, setStatusFilter] = useState<JobApplication['status'] | 'all'>('all');

  const filtered = applications.filter((a) => statusFilter === 'all' || a.status === statusFilter);

  const count = (s: JobApplication['status']) => applications.filter((a) => a.status === s).length;
  const interviewCount = count('interview');
  const offerCount = count('offer');
  const appliedCount = count('applied');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Отклики на вакансии"
        subtitle="Воронка поиска работы в одном месте"
        actions={
          <Button>
            <Plus className="w-4 h-4" /> Добавить вакансию
          </Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Send} label="Откликнулся" value={String(appliedCount)} sub="в процессе" tone="blue" />
        <StatCard icon={MessageSquare} label="Интервью" value={String(interviewCount)} sub="этапов активно" tone="amber" />
        <StatCard icon={CircleCheck} label="Офферы" value={String(offerCount)} sub="отличный результат" tone="emerald" />
        <StatCard icon={TrendingUp} label="Конверсия" value={`${applications.length ? Math.round((interviewCount + offerCount) / applications.length * 100) : 0}%`} sub="в следующий этап" tone="violet" />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition ${
            statusFilter === 'all'
              ? 'bg-emerald-950 border-emerald-500/60 text-emerald-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Все ({applications.length})
        </button>
        {statusOrder.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition ${
              statusFilter === s
                ? 'bg-emerald-950 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {statusMeta[s].label} ({count(s)})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="Ничего не найдено"
          description="Измените фильтр или добавьте новую вакансию в отслеживание."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => {
            const meta = statusMeta[a.status];
            return (
              <div key={a.id} className="glass-card p-5 rounded-2xl border border-slate-800">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-white text-sm shrink-0">
                      {a.company
                        .split(' ')
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white">{a.company} — {a.position}</h3>
                      <p className="text-[11px] text-slate-400">
                        {a.source} · {a.date} · {a.salary} · резюме «{a.resumeName}»
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                      Совпадение {a.matchScore}%
                    </span>
                    <Badge tone={meta.tone}>{meta.label}</Badge>
                  </div>
                </div>

                {a.notes && <p className="mt-3 text-xs text-slate-300 bg-slate-900/60 border border-slate-800 rounded-xl p-3">📌 {a.notes}</p>}

                <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mr-1">
                    Статус:
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {statusOrder.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateApplicationStatus(a.id, s)}
                        className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold transition ${
                          a.status === s
                            ? 'bg-emerald-950 border-emerald-500/60 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {statusMeta[s].label}
                      </button>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="ml-auto flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:underline"
                  >
                    Вакансия <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
