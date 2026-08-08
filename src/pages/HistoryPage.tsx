import React from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Clock, RotateCcw, Eye, GitBranch, Download, CheckCircle2 } from 'lucide-react';
import { CVStatus } from '../types';

const versionList = [
  { id: 'v-3', date: '2026-08-05', name: 'С фидбеком AI', ats: 92, status: 'optimized' as CVStatus },
  { id: 'v-2', date: '2026-07-20', name: 'Добавлены метрики', ats: 87, status: 'optimized' as CVStatus },
  { id: 'v-1', date: '2026-07-11', name: 'Первая версия', ats: 79, status: 'completed' as CVStatus },
  { id: 'v-0', date: '2026-07-02', name: 'Черновик наброска', ats: 61, status: 'draft' as CVStatus },
];

export const HistoryPage: React.FC = () => {
  const { resumes, activeResume } = useApp();
  const resume = activeResume ?? resumes[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Версии и история"
        subtitle="Все версии резюме · автоверсионирование при каждом изменении"
        badge={<Badge tone="slate"><GitBranch className="w-3 h-3" /> Автосохранение включено</Badge>}
      />

      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-wrap items-center gap-3">
        <Clock className="w-5 h-5 text-emerald-400" />
        <div>
          <p className="text-xs font-bold text-white">Резюме: {resume?.name ?? '—'}</p>
          <p className="text-[11px] text-slate-400">Последнее изменение: {resume?.updatedAt ?? '—'}</p>
        </div>
      </div>

      <div className="relative space-y-4">
        {versionList.map((v, idx) => (
          <div key={v.id} className="relative flex gap-4">
            {/* Timeline line */}
            {idx < versionList.length - 1 && (
              <div className="absolute left-[19px] top-10 bottom-0 w-px bg-slate-800" />
            )}
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 z-10 ${
              idx === 0
                ? 'bg-emerald-950 border-emerald-500/60 text-emerald-400'
                : 'bg-slate-900 border-slate-700 text-slate-500'
            }`}>
              <GitBranch className="w-4 h-4" />
            </div>

            <Card className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{v.name}</h3>
                    {idx === 0 && <Badge tone="emerald">текущая</Badge>}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{v.date} · ATS {v.ats}/100</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button size="sm" variant="secondary" disabled={idx === 0}>
                    <RotateCcw className="w-3.5 h-3.5" /> Откатить
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Eye className="w-3.5 h-3.5" /> Просмотр
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <Card title="Как работает версионирование" subtitle="Ваши изменения всегда безопасны">
        <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <Clock className="w-4 h-4 text-emerald-400 mb-2" />
            <p className="font-bold text-white mb-1">Автосохранение</p>
            <p className="text-slate-400">Каждое изменение фиксируется как новая версия — история хранится 90 дней.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <RotateCcw className="w-4 h-4 text-amber-400 mb-2" />
            <p className="font-bold text-white mb-1">Откат в один клик</p>
            <p className="text-slate-400">Вернитесь к любой версии и сделайте её текущей без потери остальных.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-blue-400 mb-2" />
            <p className="font-bold text-white mb-1">Сравнение ATS</p>
            <p className="text-slate-400">Видите, как менялся ATS-скоринг между версиями, и оставляете лучшую.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
