import React from 'react';
import { useApp } from '../context/AppContext';
import { SectionManager, FieldDef } from '../components/common/SectionManager';
import { Badge } from '../components/ui/Badge';
import { GraduationCap } from 'lucide-react';
import { EducationItem } from '../types';

export const EducationPage: React.FC = () => {
  const { activeResume, updateResume } = useApp();
  const resume = activeResume;
  if (!resume) return null;

  const items = resume.education;

  const fields: FieldDef[] = [
    { name: 'institution', label: 'Учебное заведение', span: 2 },
    { name: 'degree', label: 'Степень', options: ['Бакалавр', 'Магистр', 'Среднее профессиональное', 'Курсы', 'Самообучение'] },
    { name: 'field', label: 'Специальность' },
    { name: 'startDate', label: 'Начало' },
    { name: 'endDate', label: 'Окончание' },
    { name: 'gpa', label: 'GPA / балл' },
    { name: 'description', label: 'Описание', type: 'textarea', span: 2 },
  ];

  const handleCreate = (v: Record<string, string>) => {
    const item: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: v.institution || 'Учебное заведение',
      degree: v.degree,
      field: v.field,
      startDate: v.startDate,
      endDate: v.endDate,
      gpa: v.gpa,
      description: v.description,
    };
    updateResume(resume.id, { education: [item, ...items] });
  };

  const handleDelete = (item: EducationItem) => {
    updateResume(resume.id, { education: items.filter((i) => i.id !== item.id) });
  };

  return (
    <SectionManager
      title="Образование и курсы"
      subtitle={`Резюме: ${resume.name} · ${items.length} записей`}
      badge={<Badge tone="blue">{items.length} учебных заведений</Badge>}
      items={items}
      itemKey={(i) => i.id}
      fields={fields}
      onCreate={handleCreate}
      onDelete={handleDelete}
      emptyIcon={GraduationCap}
      emptyTitle="Образование не добавлено"
      emptyDescription="Укажите образование и релевантные курсы — это повышает доверие рекрутёров."
      addButtonLabel="Добавить образование"
      renderItem={(item) => (
        <div>
          <h3 className="text-base font-bold text-white">{item.institution}</h3>
          <p className="text-xs text-emerald-400 font-semibold">
            {item.degree}{item.field ? `, ${item.field}` : ''}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] text-slate-400">
            <span>{item.startDate} — {item.endDate}</span>
            {item.gpa && <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold border border-amber-500/30">GPA {item.gpa}</span>}
          </div>
          {item.description && <p className="text-xs text-slate-300 mt-2">{item.description}</p>}
        </div>
      )}
      help={
        <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-200">
          🎓 Если специальность не связана с желаемой должностью — добавьте профильные курсы и сертификаты, они важнее диплома.
        </div>
      }
    />
  );
};
