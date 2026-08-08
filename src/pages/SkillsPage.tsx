import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Card } from '../components/ui/Card';
import { Zap, Plus, Trash2, Sparkles } from 'lucide-react';
import { SkillItem, SkillLevel } from '../types';

const levelMap: Record<SkillLevel, { label: string; color: string; pct: number }> = {
  beginner: { label: 'Начальный', color: 'bg-slate-500', pct: 30 },
  intermediate: { label: 'Средний', color: 'bg-blue-500', pct: 55 },
  advanced: { label: 'Продвинутый', color: 'bg-emerald-500', pct: 80 },
  expert: { label: 'Эксперт', color: 'bg-amber-500', pct: 100 },
};

const suggestions = ['Agile / Scrum', 'SQL', 'REST API', 'Figma', 'Python', 'Google Analytics', 'SEO', 'Jira'];

export const SkillsPage: React.FC = () => {
  const { activeResume, updateResume } = useApp();
  const resume = activeResume;
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [level, setLevel] = useState<SkillLevel>('intermediate');
  const [category, setCategory] = useState('Другое');

  if (!resume) return null;
  const skills = resume.skills;

  const categories = [...new Set(['Другое', ...skills.map((s) => s.category)])];

  const handleAdd = () => {
    if (!name.trim()) return;
    const item: SkillItem = {
      id: `sk-${Date.now()}`,
      name: name.trim(),
      level,
      category,
      years: 1,
    };
    updateResume(resume.id, { skills: [...skills, item] });
    setName('');
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    updateResume(resume.id, { skills: skills.filter((s) => s.id !== id) });
  };

  const avgLevel = skills.length
    ? Math.round(skills.reduce((a, s) => a + levelMap[s.level].pct, 0) / skills.length)
    : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Навыки"
        subtitle={`Резюме: ${resume.name} · ${skills.length} навыков`}
        badge={<Badge tone="violet"><Zap className="w-3 h-3" /> Сила профиля: {avgLevel}%</Badge>}
        actions={
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="w-4 h-4" /> Добавить навык
          </Button>
        }
      />

      {skills.length === 0 ? (
        <Card title="Навыки">
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 mx-auto mb-3">
              <Zap className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-white">Навыки не добавлены</p>
            <p className="text-xs text-slate-400 mt-1">Добавьте навыки, чтобы ATS-скоринг резюме вырос.</p>
            <Button size="sm" className="mt-4" onClick={() => setIsOpen(true)}>
              <Plus className="w-3.5 h-3.5" /> Добавить
            </Button>
          </div>
        </Card>
      ) : (
        categories.map((cat) => {
          const group = skills.filter((s) => s.category === cat);
          if (group.length === 0) return null;
          return (
            <Card key={cat} title={cat} subtitle={`${group.length} навыков`}>
              <div className="grid sm:grid-cols-2 gap-3">
                {group.map((s) => {
                  const lvl = levelMap[s.level];
                  return (
                    <div key={s.id} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 group">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-bold text-white">{s.name}</p>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-slate-400">{lvl.label}</span>
                          <button
                            onClick={() => handleDelete(s.id)}
                            className="p-1 rounded text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className={`h-full ${lvl.color} rounded-full`} style={{ width: `${lvl.pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })
      )}

      <Card title="Популярные навыки в вашей нише" subtitle="Добавьте в один клик">
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => {
                if (skills.some((x) => x.name.toLowerCase() === s.toLowerCase())) return;
                updateResume(resume.id, {
                  skills: [...skills, { id: `sk-sug-${Date.now()}-${s}`, name: s, level: 'intermediate', category: 'Другое', years: 1 }],
                });
              }}
              disabled={skills.some((x) => x.name.toLowerCase() === s.toLowerCase())}
              className="px-3 py-1.5 rounded-full border text-[11px] font-semibold transition disabled:opacity-40 disabled:pointer-events-none bg-slate-900 border-slate-700 text-slate-300 hover:border-emerald-500/60 hover:text-emerald-300"
            >
              {skills.some((x) => x.name.toLowerCase() === s.toLowerCase()) ? '✓ ' : '+ '}{s}
            </button>
          ))}
        </div>
      </Card>

      <Card title="Как улучшить раздел" subtitle="Советы AI">
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-200 flex items-start gap-2">
          <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <span>Используйте формулировки из вакансий: «React», а не «фронтенд-фреймворки». ATS-системы ищут точные совпадения.</span>
        </div>
      </Card>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Добавить навык">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Название навыка</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: React"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Уровень</label>
            <div className="grid grid-cols-4 gap-2">
              {(Object.keys(levelMap) as SkillLevel[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`px-2 py-2 rounded-xl border text-[11px] font-semibold transition ${
                    level === l
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {levelMap[l].label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Категория</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <Button onClick={handleAdd} className="w-full">
            <Plus className="w-4 h-4" /> Добавить навык
          </Button>
        </div>
      </Modal>
    </div>
  );
};
