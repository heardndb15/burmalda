import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { Card } from '../components/ui/Card';
import {
  FilePenLine,
  Plus,
  Eye,
  Download,
  Copy,
  Trash2,
  Sparkles,
  Share2,
} from 'lucide-react';

const statusTone: Record<string, 'emerald' | 'blue' | 'amber' | 'slate'> = {
  optimized: 'emerald',
  completed: 'blue',
  in_progress: 'amber',
  draft: 'slate',
};

const statusLabel: Record<string, string> = {
  optimized: 'Оптимизировано',
  completed: 'Готово',
  in_progress: 'В работе',
  draft: 'Черновик',
};

export const ResumesPage: React.FC = () => {
  const { resumes, deleteResume, duplicateResume, setActiveResumeId } = useApp();
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteResume(id);
  };

  const handleDuplicate = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    duplicateResume(id);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Мои резюме"
        subtitle={`${resumes.length} резюме · суммарно ${resumes.reduce((a, r) => a + r.stats.views, 0).toLocaleString('ru-RU')} просмотров`}
        badge={<Badge tone="emerald">{resumes.filter((r) => r.status === 'optimized').length} оптимизировано</Badge>}
        actions={
          <>
            <Button variant="outline" onClick={() => navigate('/templates')}>
              <Sparkles className="w-4 h-4" /> Шаблоны
            </Button>
            <Button onClick={() => navigate('/resumes/new')}>
              <Plus className="w-4 h-4" /> Создать резюме
            </Button>
          </>
        }
      />

      {resumes.length === 0 ? (
        <EmptyState
          icon={FilePenLine}
          title="Пока нет резюме"
          description="Создайте первое резюме — AI-генератор соберёт его за минуту на основе вашего профиля."
          action={
            <Button onClick={() => navigate('/resumes/new')}>
              <Plus className="w-4 h-4" /> Создать резюме
            </Button>
          }
        />
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {resumes.map((r) => (
            <div
              key={r.id}
              onClick={() => {
                setActiveResumeId(r.id);
                navigate(`/resumes/${r.id}`);
              }}
              className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition cursor-pointer flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <FilePenLine className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{r.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{r.title}</p>
                  </div>
                </div>
                <Badge tone={statusTone[r.status]}>{statusLabel[r.status]}</Badge>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" /> {r.stats.views.toLocaleString('ru-RU')}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="w-3.5 h-3.5 text-blue-400" /> {r.stats.downloads}
                </span>
                <span className="ml-auto font-bold text-emerald-400">ATS {r.atsScore}</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">Обновлено {r.updatedAt}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleDuplicate(e, r.id)}
                    title="Дублировать"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-emerald-950/40 transition"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, r.id)}
                    title="Удалить"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate('/resumes/new')}
            className="glass-card rounded-2xl border border-dashed border-slate-700 hover:border-emerald-500/60 transition flex flex-col items-center justify-center gap-3 p-6 min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-300">Новое резюме</span>
          </button>
        </div>
      )}

      <Card title="Как улучшить результат" subtitle="Практические советы">
        <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <Share2 className="w-4 h-4 text-emerald-400 mb-2" />
            <p className="font-bold text-white mb-1">Один профиль — много версий</p>
            <p className="text-slate-400">Дублируйте резюме и адаптируйте под каждую вакансию.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <Sparkles className="w-4 h-4 text-amber-400 mb-2" />
            <p className="font-bold text-white mb-1">Метрики решают</p>
            <p className="text-slate-400">Добавляйте цифры: «−74%», «+38%», «500+» — конверсия растёт.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <Eye className="w-4 h-4 text-blue-400 mb-2" />
            <p className="font-bold text-white mb-1">Проверяйте ATS</p>
            <p className="text-slate-400">Перед откликом запускайте ATS-анализ совместимости.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
