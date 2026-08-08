import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { FilePenLine, Crown, Check, Sparkles } from 'lucide-react';

const categories = [
  { id: 'all', label: 'Все' },
  { id: 'modern', label: 'Современные' },
  { id: 'classic', label: 'Классические' },
  { id: 'creative', label: 'Креативные' },
  { id: 'technical', label: 'Технические' },
] as const;

export const TemplatesPage: React.FC = () => {
  const { templates, user } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = templates.filter(
    (t) => activeCategory === 'all' || t.category === activeCategory
  );

  const isPro = user.plan !== 'free';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Шаблоны резюме"
        subtitle={`${templates.length} дизайнов · все проходят ATS-проверку`}
        actions={
          isPro ? (
            <Badge tone="amber"><Crown className="w-3 h-3" /> Pro доступен</Badge>
          ) : (
            <Button size="sm" onClick={() => navigate('/billing')}>
              <Crown className="w-3.5 h-3.5" /> Открыть Pro
            </Button>
          )
        }
      />

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition ${
              activeCategory === c.id
                ? 'bg-emerald-950 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tpl) => {
          const locked = tpl.isPremium && !isPro;
          return (
            <div
              key={tpl.id}
              className={`glass-card rounded-2xl border border-slate-800 overflow-hidden flex flex-col ${
                locked ? 'opacity-90' : ''
              }`}
            >
              <div className={`relative h-44 bg-gradient-to-tr ${tpl.previewGradient} flex items-center justify-center`}>
                {tpl.popular && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/90 text-slate-900 text-[10px] font-black flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Популярный
                  </span>
                )}
                {tpl.isPremium && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-400/90 text-slate-950 text-[10px] font-black flex items-center gap-1">
                    <Crown className="w-3 h-3" /> PRO
                  </span>
                )}
                <div className="w-24 h-32 bg-slate-950/40 backdrop-blur-sm rounded-lg border border-white/30 p-2.5 space-y-1.5">
                  <div className="h-2 w-14 bg-white/80 rounded" />
                  <div className="h-1.5 w-16 bg-white/50 rounded" />
                  <div className="h-1.5 w-12 bg-white/40 rounded" />
                  <div className="pt-1 space-y-1">
                    <div className="h-1.5 w-full bg-white/30 rounded" />
                    <div className="h-1.5 w-5/6 bg-white/30 rounded" />
                    <div className="h-1.5 w-full bg-white/30 rounded" />
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{tpl.name}</h3>
                  <span className="text-[11px] font-bold" style={{ color: tpl.accentColor }}>
                    {tpl.category === 'classic'
                      ? 'Классика'
                      : tpl.category === 'modern'
                      ? 'Современный'
                      : tpl.category === 'creative'
                      ? 'Креатив'
                      : 'Технический'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed flex-1">{tpl.description}</p>
                <div className="flex flex-wrap gap-1">
                  {tpl.suitability.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant={locked ? 'secondary' : 'primary'}
                  className="w-full mt-1"
                  onClick={() => (locked ? navigate('/billing') : navigate('/resumes/new'))}
                >
                  {locked ? (
                    <>
                      <Crown className="w-3.5 h-3.5" /> Открыть в Pro
                    </>
                  ) : (
                    <>
                      <FilePenLine className="w-3.5 h-3.5" /> Использовать шаблон
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Card title="Что внутри Pro" subtitle="Премиум-шаблоны и возможности">
        <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-300">
          {['2 премиум-шаблона (Creative, Executive)', 'Без водяного знака CVGen', 'Неограниченные адаптации резюме'].map((f) => (
            <div key={f} className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
