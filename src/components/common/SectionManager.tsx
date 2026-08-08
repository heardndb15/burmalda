import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { EmptyState } from '../ui/EmptyState';
import { Plus, Trash2 } from 'lucide-react';

export interface FieldDef {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'select';
  options?: string[];
  placeholder?: string;
  span?: 1 | 2;
}

interface SectionManagerProps<T> {
  title: string;
  subtitle: string;
  badge?: React.ReactNode;
  items: T[];
  itemKey: (item: T) => string;
  fields: FieldDef[];
  renderItem: (item: T) => React.ReactNode;
  onCreate: (values: Record<string, string>) => void;
  onDelete: (item: T) => void;
  emptyIcon: LucideIcon;
  emptyTitle: string;
  emptyDescription: string;
  addButtonLabel?: string;
  help?: React.ReactNode;
}

export function SectionManager<T>({
  title,
  subtitle,
  badge,
  items,
  itemKey,
  fields,
  renderItem,
  onCreate,
  onDelete,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  addButtonLabel = 'Добавить',
  help,
}: SectionManagerProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const openModal = () => {
    const initial: Record<string, string> = {};
    fields.forEach((f) => {
      initial[f.name] = f.options?.[0] ?? '';
    });
    setValues(initial);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(values);
    setIsOpen(false);
  };

  const setValue = (name: string, value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        subtitle={subtitle}
        badge={badge}
        actions={
          <Button onClick={openModal}>
            <Plus className="w-4 h-4" /> {addButtonLabel}
          </Button>
        }
      />

      {items.length === 0 ? (
        <EmptyState
          icon={emptyIcon}
          title={emptyTitle}
          description={emptyDescription}
          action={<Button onClick={openModal}><Plus className="w-4 h-4" /> {addButtonLabel}</Button>}
        />
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={itemKey(item)}
              className="glass-card rounded-2xl border border-slate-800 p-5 group"
            >
              <div className="flex gap-3">
                <div className="flex-1 min-w-0">{renderItem(item)}</div>
                <button
                  onClick={() => onDelete(item)}
                  title="Удалить"
                  className="self-start p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {help}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`Добавить: ${title.toLowerCase()}`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {fields.map((f) => (
              <div key={f.name} className={f.span === 2 ? 'col-span-2' : 'col-span-1'}>
                <label className="block text-xs font-semibold text-slate-300 mb-1">{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea
                    value={values[f.name] ?? ''}
                    onChange={(e) => setValue(f.name, e.target.value)}
                    rows={3}
                    placeholder={f.placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white resize-none"
                  />
                ) : f.type === 'select' ? (
                  <select
                    value={values[f.name] ?? ''}
                    onChange={(e) => setValue(f.name, e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  >
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    value={values[f.name] ?? ''}
                    onChange={(e) => setValue(f.name, e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                )}
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4" /> Сохранить
          </Button>
        </form>
      </Modal>
    </div>
  );
}
