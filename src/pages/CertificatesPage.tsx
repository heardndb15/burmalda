import React from 'react';
import { useApp } from '../context/AppContext';
import { SectionManager, FieldDef } from '../components/common/SectionManager';
import { Badge } from '../components/ui/Badge';
import { Award, BadgeCheck, ExternalLink } from 'lucide-react';
import { Certificate } from '../types';

export const CertificatesPage: React.FC = () => {
  const { activeResume, updateResume } = useApp();
  const resume = activeResume;
  if (!resume) return null;

  const items = resume.certificates;

  const fields: FieldDef[] = [
    { name: 'name', label: 'Название сертификата', span: 2 },
    { name: 'issuer', label: 'Кто выдал' },
    { name: 'date', label: 'Дата (ММ.ГГГГ)' },
    { name: 'credentialUrl', label: 'Ссылка на подтверждение' },
  ];

  const handleCreate = (v: Record<string, string>) => {
    const item: Certificate = {
      id: `cert-${Date.now()}`,
      name: v.name || 'Сертификат',
      issuer: v.issuer,
      date: v.date,
      credentialUrl: v.credentialUrl,
      verified: true,
    };
    updateResume(resume.id, { certificates: [item, ...items] });
  };

  const handleDelete = (item: Certificate) => {
    updateResume(resume.id, { certificates: items.filter((i) => i.id !== item.id) });
  };

  return (
    <SectionManager
      title="Сертификаты"
      subtitle={`Резюме: ${resume.name} · ${items.length} сертификатов`}
      badge={<Badge tone="amber"><Award className="w-3 h-3" /> {items.filter((c) => c.verified).length} подтверждено</Badge>}
      items={items}
      itemKey={(i) => i.id}
      fields={fields}
      onCreate={handleCreate}
      onDelete={handleDelete}
      emptyIcon={Award}
      emptyTitle="Сертификатов пока нет"
      emptyDescription="Добавьте курсы и сертификации — они доказывают актуальность навыков."
      addButtonLabel="Добавить сертификат"
      renderItem={(item) => (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
              <p className="text-xs text-slate-400">{item.issuer} · {item.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {item.verified && (
              <Badge tone="emerald"><BadgeCheck className="w-3 h-3" /> проверено</Badge>
            )}
            {item.credentialUrl && (
              <a href={item.credentialUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-300">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}
      help={
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200">
          🏅 Подтверждённые сертификаты (с ссылкой) повышают доверие — рекрутёр может проверить их за 10 секунд.
        </div>
      }
    />
  );
};
