import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { StatCard } from '../components/ui/StatCard';
import { MessageSquare, ChevronDown, Star, Sparkles, CalendarClock } from 'lucide-react';
import { InterviewQuestion } from '../types';

const categories = ['Все', ...new Set(initialCategories())];
function initialCategories(): string[] {
  return ['System Design', 'JavaScript', 'React', 'Архитектура', 'Тестирование', 'Безопасность'];
}

const diffTone: Record<InterviewQuestion['difficulty'], 'emerald' | 'amber' | 'red'> = {
  easy: 'emerald',
  medium: 'amber',
  hard: 'red',
};

const diffLabel: Record<InterviewQuestion['difficulty'], string> = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
};

export const InterviewPage: React.FC = () => {
  const { interviewQuestions } = useApp();
  const [activeCategory, setActiveCategory] = useState('Все');
  const [openId, setOpenId] = useState<string | null>(interviewQuestions[0]?.id ?? null);

  const filtered = interviewQuestions.filter(
    (q) => activeCategory === 'Все' || q.category === activeCategory
  );

  const avgRating = interviewQuestions.length
    ? (interviewQuestions.reduce((a, q) => a + q.rating, 0) / interviewQuestions.length).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Подготовка к собеседованию"
        subtitle={`${interviewQuestions.length} вопросов с ответами · AI-тренер`}
        badge={<Badge tone="amber"><Sparkles className="w-3 h-3" /> AI-коуч</Badge>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={MessageSquare} label="Вопросов" value={String(interviewQuestions.length)} sub="в базе" tone="emerald" />
        <StatCard icon={Star} label="Средняя сложность" value={avgRating} sub="по ответам" tone="amber" />
        <StatCard icon={CalendarClock} label="Ближайшее" value="12 авг" sub="Яндекс · System Design" tone="blue" />
        <StatCard icon={Sparkles} label="Готовность" value="78%" sub="по оценке AI" tone="violet" />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition ${
              activeCategory === c
                ? 'bg-emerald-950 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((q) => {
          const isOpen = openId === q.id;
          return (
            <Card key={q.id} className="p-0 overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : q.id)}
                className="w-full p-5 flex items-center justify-between gap-3 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="slate">{q.category}</Badge>
                      <Badge tone={diffTone[q.difficulty]}>{diffLabel[q.difficulty]}</Badge>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1.5 leading-snug">{q.question}</h3>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5">
                  <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1.5">
                      Модель ответа
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">{q.answer}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-white">{q.rating}</span>
                      <span className="text-[10px] text-slate-500">оценка сообщества</span>
                    </div>
                    <Button size="sm" variant="secondary">
                      <Sparkles className="w-3.5 h-3.5" /> Прогнать в AI-тренере
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
