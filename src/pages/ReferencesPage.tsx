import React from 'react';
import { useApp } from '../context/AppContext';
import { SectionManager, FieldDef } from '../components/common/SectionManager';
import { Badge } from '../components/ui/Badge';
import { Users, Star, Mail, Phone } from 'lucide-react';
import { ReferenceItem } from '../types';

export const ReferencesPage: React.FC = () => {
  const { activeResume, updateResume } = useApp();
  const resume = activeResume;
  if (!resume) return null;

  const items = resume.references;

  const fields: FieldDef[] = [
    { name: 'name', label: 'Имя', span: 2 },
    { name: 'position', label: 'Должность' },
    { name: 'company', label: 'Компания' },
    { name: 'email', label: 'Email' },
    { name: 'phone', label: 'Телефон' },
    { name: 'relation', label: 'Кем приходится', options: ['Руководитель', 'Коллега', 'Клиент', 'Ментор'] },
  ];

  const handleCreate = (v: Record<string, string>) => {
    const item: ReferenceItem = {
      id: `ref-${Date.now()}`,
      name: v.name || 'Имя',
      position: v.position,
      company: v.company,
      email: v.email,
      phone: v.phone,
      relation: v.relation,
      rating: 5,
    };
    updateResume(resume.id, { references: [item, ...items] });
  };

  const handleDelete = (item: ReferenceItem) => {
    updateResume(resume.id, { references: items.filter((i) => i.id !== item.id) });
  };

  return (
    <SectionManager
      title="Рекомендации"
      subtitle={`Резюме: ${resume.name} · ${items.length} рекомендателей`}
      badge={<Badge tone="emerald"><Users className="w-3 h-3" /> проверенные контакты</Badge>}
      items={items}
      itemKey={(i) => i.id}
      fields={fields}
      onCreate={handleCreate}
      onDelete={handleDelete}
      emptyIcon={Users}
      emptyTitle="Рекомендаций нет"
      emptyDescription="Попросите бывших руководителей дать рекомендацию — это сильный сигнал для рекрутёров."
      addButtonLabel="Добавить рекомендацию"
      renderItem={(item) => (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shrink-0 font-bold text-emerald-300 text-sm">
              {item.name
                .split(' ')
                .map((p) => p[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white">{item.name}</h3>
              <p className="text-xs text-slate-400">
                {item.position}{item.company ? `, ${item.company}` : ''} · {item.relation}
              </p>
              <div className="flex flex-wrap gap-3 mt-1 text-[11px] text-slate-500">
                {item.email && (
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {item.email}</span>
                )}
                {item.phone && (
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {item.phone}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            {Array.from({ length: item.rating }).map((_, idx) => (
              <Star key={idx} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>
      )}
    />
  );
};
