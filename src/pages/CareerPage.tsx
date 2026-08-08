import React from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { EmptyState } from '../components/ui/EmptyState';
import { Target, Plus, CheckCircle2, Circle, TrendingUp } from 'lucide-react';

const statusTone: Record<string, 'emerald' | 'amber' | 'slate'> = {
  active: 'emerald',
  planned: 'amber',
  completed: 'slate',
};

const statusLabel: Record<string, string> = {
  active: 'В работе',
  planned: 'Запланировано',
  completed: 'Завершено',
};

export const CareerPage: React.FC = () => {
  const { careerGoals } = useApp();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Карьерный план"
        subtitle="Цели, сроки и контрольные точки"
        badge={<Badge tone="emerald"><Target className="w-3 h-3" /> {careerGoals.filter((g) => g.status === 'active').length} активные цели</Badge>}
        actions={
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition">
            <Plus className="w-4 h-4" /> Новая цель
          </button>
        }
      />

      <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200 flex items-start gap-2">
        <TrendingUp className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
        <span>
          Общий прогресс по плану: <strong>{Math.round(careerGoals.reduce((a, g) => a + g.progress, 0) / Math.max(careerGoals.length, 1))}%</strong>. 
          Следующая контрольная точка: «Провести 2 архитектурных ревью» (Tech Lead).
        </span>
      </div>

      {careerGoals.length === 0 ? (
        <EmptyState
          icon={Target}
          title="Целей пока нет"
          description="Сформулируйте карьерную цель — план сделает её достижимой."
          action={
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">
              <Plus className="w-4 h-4" /> Создать цель
            </button>
          }
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {careerGoals.map((goal) => (
            <Card key={goal.id} className="flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                    goal.status === 'completed'
                      ? 'bg-emerald-950 border-emerald-500/40 text-emerald-400'
                      : goal.status === 'active'
                      ? 'bg-amber-950 border-amber-500/40 text-amber-400'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}>
                    {goal.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Target className="w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white">{goal.title}</h3>
                    <p className="text-[11px] text-slate-400">Срок: {goal.timeframe}</p>
                  </div>
                </div>
                <Badge tone={statusTone[goal.status]}>{statusLabel[goal.status]}</Badge>
              </div>

              <Progress value={goal.progress} color={goal.status === 'completed' ? 'bg-emerald-500' : goal.status === 'active' ? 'bg-amber-500' : 'bg-slate-500'} showLabel className="mb-4" />

              <div className="space-y-2">
                {goal.milestones.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    {goal.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    )}
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card title="Совет карьерного коуча" subtitle="AI">
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          🎯 Разбейте большую цель на этапы по 2–4 недели и привяжите к конкретным действиям
          (резюме → отклики → интервью → оффер). Пересматривайте план раз в месяц и отмечайте прогресс —
          это держит мотивацию и фокус.
        </div>
      </Card>
    </div>
  );
};
