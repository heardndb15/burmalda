import React from 'react';
import { useApp } from '../context/AppContext';
import { SectionManager, FieldDef } from '../components/common/SectionManager';
import { Badge } from '../components/ui/Badge';
import { Folder, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types';

export const ProjectsPage: React.FC = () => {
  const { activeResume, updateResume } = useApp();
  const resume = activeResume;
  if (!resume) return null;

  const items = resume.projects;

  const fields: FieldDef[] = [
    { name: 'name', label: 'Название проекта' },
    { name: 'role', label: 'Ваша роль' },
    { name: 'url', label: 'Ссылка' },
    { name: 'techStack', label: 'Стек (через запятую)', span: 2 },
    { name: 'description', label: 'Описание', type: 'textarea', span: 2 },
    { name: 'highlights', label: 'Ключевые результаты (через |)', type: 'textarea', span: 2 },
  ];

  const handleCreate = (v: Record<string, string>) => {
    const item: ProjectItem = {
      id: `pr-${Date.now()}`,
      name: v.name || 'Проект',
      role: v.role,
      description: v.description,
      techStack: v.techStack ? v.techStack.split(',').map((s) => s.trim()).filter(Boolean) : [],
      url: v.url,
      gradient: 'from-emerald-600 to-teal-400',
      highlights: v.highlights ? v.highlights.split('|').map((s) => s.trim()).filter(Boolean) : [],
    };
    updateResume(resume.id, { projects: [item, ...items] });
  };

  const handleDelete = (item: ProjectItem) => {
    updateResume(resume.id, { projects: items.filter((i) => i.id !== item.id) });
  };

  return (
    <SectionManager
      title="Проекты и портфолио"
      subtitle={`Резюме: ${resume.name} · ${items.length} проектов`}
      badge={<Badge tone="cyan">{items.reduce((a, i) => a + i.techStack.length, 0)} технологий</Badge>}
      items={items}
      itemKey={(i) => i.id}
      fields={fields}
      onCreate={handleCreate}
      onDelete={handleDelete}
      emptyIcon={Folder}
      emptyTitle="Проекты не добавлены"
      emptyDescription="Покажите реальные проекты — для разработчиков и дизайнеров это главный раздел."
      addButtonLabel="Добавить проект"
      renderItem={(item) => (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.gradient} flex items-center justify-center shrink-0`}>
                <Folder className="w-5 h-5 text-white/90" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{item.name}</h3>
                <p className="text-xs text-emerald-400 font-semibold">{item.role}</p>
              </div>
            </div>
            {item.url && (
              <a href={item.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-300">
                <ExternalLink className="w-3.5 h-3.5" /> {item.url.replace('https://', '')}
              </a>
            )}
          </div>
          {item.description && <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.description}</p>}
          {item.highlights.length > 0 && (
            <ul className="mt-2 space-y-1">
              {item.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                  <span className="text-cyan-400 mt-0.5">▸</span> {h}
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
        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200">
          🚀 Опишите проекты формулой «Результат + метрика»: «Увеличил конверсию на 18% за квартал».
        </div>
      }
    />
  );
};
