import React from 'react';
import { useApp } from '../context/AppContext';
import { SectionManager, FieldDef } from '../components/common/SectionManager';
import { Badge } from '../components/ui/Badge';
import { Briefcase } from 'lucide-react';
import { WorkExperience } from '../types';

export const ExperiencePage: React.FC = () => {
  const { activeResume, updateResume } = useApp();
  const resume = activeResume;
  if (!resume) return null;

  const items = resume.workExperience;

  const fields: FieldDef[] = [
    { name: 'company', label: 'Компания' },
    { name: 'position', label: 'Должность' },
    { name: 'location', label: 'Локация' },
    { name: 'startDate', label: 'Начало (ММ.ГГГГ)', placeholder: '2020-01' },
    { name: 'endDate', label: 'Окончание / Настоящее время' },
    { name: 'description', label: 'Описание', type: 'textarea', span: 2 },
    { name: 'achievements', label: 'Достижения (через |)', type: 'textarea', span: 2, placeholder: 'Сократил расходы на 20% | Внедрил CI/CD' },
  ];

  const handleCreate = (v: Record<string, string>) => {
    const item: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: v.company || 'Компания',
      position: v.position || 'Должность',
      location: v.location,
      startDate: v.startDate,
      endDate: v.endDate || 'Настоящее время',
      current: !v.endDate,
      description: v.description,
      achievements: v.achievements ? v.achievements.split('|').map((s) => s.trim()).filter(Boolean) : [],
      techStack: [],
    };
    updateResume(resume.id, { workExperience: [item, ...items] });
  };

  const handleDelete = (item: WorkExperience) => {
    updateResume(resume.id, { workExperience: items.filter((i) => i.id !== item.id) });
  };

  return (
    <SectionManager
      title="Опыт работы"
      subtitle={`Резюме: ${resume.name} · ${items.length} мест`}
      badge={<Badge tone="emerald">{items.reduce((a, i) => a + i.achievements.length, 0)} достижений</Badge>}
      items={items}
      itemKey={(i) => i.id}
      fields={fields}
      onCreate={handleCreate}
      onDelete={handleDelete}
      emptyIcon={Briefcase}
      emptyTitle="Нет опыта работы"
      emptyDescription="Добавьте последнее место работы — это главный раздел для рекрутёров."
      addButtonLabel="Добавить место"
      renderItem={(item) => (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white">{item.position}</h3>
              <p className="text-xs text-emerald-400 font-semibold">{item.company}</p>
            </div>
            <span className="text-[11px] text-slate-400">{item.startDate} — {item.endDate}</span>
          </div>
          {item.location && <p className="text-[11px] text-slate-500 mt-1">{item.location}</p>}
          {item.description && (
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.description}</p>
          )}
          {item.achievements.length > 0 && (
            <ul className="mt-2 space-y-1">
              {item.achievements.map((a, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                  <span className="text-emerald-400 mt-0.5">•</span> {a}
                </li>
              ))}
            </ul>
          )}
          {item.techStack.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.techStack.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      help={
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200">
          💡 Добавляйте цифры в достижения («−74% времени», «+38% конверсии») — такие резюме получают на 38% больше откликов.
        </div>
      }
    />
  );
};
