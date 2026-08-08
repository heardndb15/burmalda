import React from 'react';
import { useApp } from '../context/AppContext';
import { SectionManager, FieldDef } from '../components/common/SectionManager';
import { Badge } from '../components/ui/Badge';
import { Trophy, Medal } from 'lucide-react';
import { AchievementItem } from '../types';

const categoryLabels: Record<AchievementItem['category'], string> = {
  professional: 'Профессиональные',
  academic: 'Академические',
  sport: 'Спортивные',
  volunteer: 'Волонтёрство',
  community: 'Сообщество',
};

export const AchievementsPage: React.FC = () => {
  const { activeResume, updateResume } = useApp();
  const resume = activeResume;
  if (!resume) return null;

  const items = resume.achievements;

  const fields: FieldDef[] = [
    { name: 'title', label: 'Название', span: 2 },
    { name: 'date', label: 'Дата' },
    { name: 'category', label: 'Категория', type: 'select', options: Object.values(categoryLabels) },
    { name: 'description', label: 'Описание', type: 'textarea', span: 2 },
  ];

  const handleCreate = (v: Record<string, string>) => {
    const cat = (Object.keys(categoryLabels).find(
      (k) => categoryLabels[k as AchievementItem['category']] === v.category
    ) ?? 'professional') as AchievementItem['category'];
    const item: AchievementItem = {
      id: `ac-${Date.now()}`,
      title: v.title || 'Достижение',
      date: v.date,
      category: cat,
      description: v.description,
    };
    updateResume(resume.id, { achievements: [item, ...items] });
  };

  const handleDelete = (item: AchievementItem) => {
    updateResume(resume.id, { achievements: items.filter((i) => i.id !== item.id) });
  };

  return (
    <SectionManager
      title="Достижения"
      subtitle={`Резюме: ${resume.name} · ${items.length} достижений`}
      badge={<Badge tone="amber"><Trophy className="w-3 h-3" /> отличает от конкурентов</Badge>}
      items={items}
      itemKey={(i) => i.id}
      fields={fields}
      onCreate={handleCreate}
      onDelete={handleDelete}
      emptyIcon={Trophy}
      emptyTitle="Достижений пока нет"
      emptyDescription="Награды, победы, титулы — всё, чем можно гордиться, усиливает резюме."
      addButtonLabel="Добавить достижение"
      renderItem={(item) => (
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Medal className="w-5 h-5 text-amber-400" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <Badge tone="amber">{categoryLabels[item.category]}</Badge>
              {item.date && <span className="text-[11px] text-slate-500">{item.date}</span>}
            </div>
            {item.description && (
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.description}</p>
            )}
          </div>
        </div>
      )}
    />
  );
};
