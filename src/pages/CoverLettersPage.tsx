import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { FileText, Plus, Sparkles, Send, Pencil, Trash2 } from 'lucide-react';
import { CoverLetter } from '../types';

const statusTone: Record<CoverLetter['status'], 'slate' | 'emerald' | 'blue'> = {
  draft: 'slate',
  ready: 'emerald',
  sent: 'blue',
};

const statusLabel: Record<CoverLetter['status'], string> = {
  draft: 'Черновик',
  ready: 'Готово',
  sent: 'Отправлено',
};

export const CoverLettersPage: React.FC = () => {
  const { coverLetters, resumes, addCoverLetter } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [resumeId, setResumeId] = useState(resumes[0]?.id ?? '');
  const [tone, setTone] = useState<'formal' | 'professional' | 'friendly'>('professional');
  const [content, setContent] = useState('');

  const handleCreate = () => {
    addCoverLetter({
      resumeId,
      resumeName: resumes.find((r) => r.id === resumeId)?.name ?? '',
      company: company || 'Компания',
      position: position || 'Должность',
      tone,
      aiGenerated: true,
      status: 'draft',
      content:
        content ||
        `Здравствуйте! Меня зовут Алексей Петров, я хочу присоединиться к команде ${company || 'вашей компании'} на позицию ${position || 'должность'}. За 9 лет я построил 20+ продуктов и помогал командам расти. Буду рад обсудить детали на созвоне.`,
    });
    setIsOpen(false);
    setCompany('');
    setPosition('');
    setContent('');
  };

  const aiFill = () => {
    setContent(
      `Здравствуйте! Я заинтересован в позиции «${position || '...'}» в компании ${company || '...'}. Мой опыт идеально подходит: 9 лет разработки, сильные метрики (−74% времени загрузки), лидерство команды из 8 человек. Готов подробно рассказать о релевантных кейсах на собеседовании.`
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Сопроводительные письма"
        subtitle={`${coverLetters.length} писем · AI пишет их за 30 секунд`}
        actions={
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="w-4 h-4" /> Новое письмо
          </Button>
        }
      />

      {coverLetters.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Писем пока нет"
          description="Сопроводительное письмо повышает шансы на отклик на 24%. Создайте первое за минуту."
          action={<Button onClick={() => setIsOpen(true)}><Plus className="w-4 h-4" /> Создать письмо</Button>}
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {coverLetters.map((cl) => (
            <div key={cl.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">{cl.position}</h3>
                  <p className="text-xs text-emerald-400 font-semibold">{cl.company}</p>
                </div>
                <Badge tone={statusTone[cl.status]}>{statusLabel[cl.status]}</Badge>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-4 flex-1">{cl.content}</p>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">
                  {cl.resumeName} · {cl.tone === 'formal' ? 'официальный' : cl.tone === 'friendly' ? 'дружеский' : 'деловой'} тон · {cl.createdAt}
                </span>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-300" title="Изменить">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-300" title="Отправить">
                    <Send className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-400" title="Удалить">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200">
        💡 Письмо должно быть на 3–4 абзаца: кто вы, чем релевантен, что можете дать, призыв к созвону.
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Новое сопроводительное письмо">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Компания</label>
              <input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Должность</label>
              <input value={position} onChange={(e) => setPosition(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Связать с резюме</label>
            <select
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
            >
              {resumes.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Тон</label>
            <div className="grid grid-cols-3 gap-2">
              {(['formal', 'professional', 'friendly'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-2 py-2 rounded-xl border text-[11px] font-semibold transition ${
                    tone === t
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {t === 'formal' ? 'Официальный' : t === 'friendly' ? 'Дружеский' : 'Деловой'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300">Текст письма</label>
              <button
                onClick={aiFill}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold hover:bg-amber-500/25 transition"
              >
                <Sparkles className="w-3 h-3" /> AI-заполнение
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white resize-none"
            />
          </div>
          <Button onClick={handleCreate} className="w-full">
            <Sparkles className="w-4 h-4" /> Создать письмо
          </Button>
        </div>
      </Modal>
    </div>
  );
};
