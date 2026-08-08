import React from 'react';
import { useApp } from '../context/AppContext';
import { SectionManager, FieldDef } from '../components/common/SectionManager';
import { Badge } from '../components/ui/Badge';
import { Languages, Globe } from 'lucide-react';
import { LanguageSkill } from '../types';

export const LanguagesPage: React.FC = () => {
  const { activeResume, updateResume } = useApp();
  const resume = activeResume;
  if (!resume) return null;

  const items = resume.languages;

  const fields: FieldDef[] = [
    { name: 'name', label: 'Язык' },
    { name: 'level', label: 'Уровень', options: ['Родной', 'C2 — носитель', 'C1 — Advanced', 'B2 — Upper-Intermediate', 'B1 — Intermediate', 'A2 — Elementary'] },
    { name: 'certification', label: 'Сертификация (напр. IELTS 7.5)', span: 2 },
  ];

  const handleCreate = (v: Record<string, string>) => {
    const pct =
      v.level === 'Родной'
        ? 100
        : v.level.startsWith('C2')
        ? 95
        : v.level.startsWith('C1')
        ? 85
        : v.level.startsWith('B2')
        ? 70
        : v.level.startsWith('B1')
        ? 55
        : 35;
    const item: LanguageSkill = {
      id: `lg-${Date.now()}`,
      name: v.name || 'Язык',
      level: v.level,
      levelPercent: pct,
      certification: v.certification || undefined,
    };
    updateResume(resume.id, { languages: [item, ...items] });
  };

  const handleDelete = (item: LanguageSkill) => {
    updateResume(resume.id, { languages: items.filter((i) => i.id !== item.id) });
  };

  return (
    <SectionManager
      title="Языки"
      subtitle={`Резюме: ${resume.name} · ${items.length} языков`}
      badge={<Badge tone="blue"><Globe className="w-3 h-3" /> для международных вакансий</Badge>}
      items={items}
      itemKey={(i) => i.id}
      fields={fields}
      onCreate={handleCreate}
      onDelete={handleDelete}
      emptyIcon={Languages}
      emptyTitle="Языки не указаны"
      emptyDescription="Уровень владения языками важен для международных и remote-вакансий."
      addButtonLabel="Добавить язык"
      renderItem={(item) => (
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center shrink-0">
            <Languages className="w-5 h-5 text-blue-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-white">{item.name}</p>
              <span className="text-xs text-slate-400">{item.level}</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                style={{ width: `${item.levelPercent}%` }}
              />
            </div>
          </div>
          {item.certification && (
            <Badge tone="cyan" className="shrink-0">{item.certification}</Badge>
          )}
        </div>
      )}
    />
  );
};
