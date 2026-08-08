import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LifeBuoy, MessageSquare, Mail, BookOpen, ChevronDown, Zap } from 'lucide-react';

const faqs = [
  {
    q: 'Как улучшить ATS-скоринг резюме?',
    a: 'Добавьте ключевые слова из вакансии, используйте стандартные заголовки разделов и избегайте таблиц. Запустите ATS-анализ на странице «Проверка ATS» — он подскажет точные формулировки.',
  },
  {
    q: 'Могу ли я скачать резюме в PDF?',
    a: 'Да, на странице «Экспорт и ссылки». На Free-плане PDF содержит водяной знак CVGen, на Pro — без него.',
  },
  {
    q: 'Как работает AI-генерация текста?',
    a: 'AI анализирует вашу должность, опыт и вакансию, после чего предлагает формулировки для Summary, достижений и сопроводительных писем. Вы всегда можете их отредактировать.',
  },
  {
    q: 'Можно ли перенести данные из LinkedIn?',
    a: 'Да, подключите LinkedIn в «Настройках → Интеграции» — опыт, навыки и контакты подтянутся автоматически.',
  },
  {
    q: 'Как отменить подписку?',
    a: 'На странице «Тарифы и оплата» нажмите «Отменить подписку». Доступ сохранится до конца оплаченного периода.',
  },
];

export const SupportPage: React.FC = () => {
  const { user } = useApp();
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0].q);
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Поддержка"
        subtitle="Поможем с любым вопросом по CVGen"
        badge={<Badge tone="emerald"><LifeBuoy className="w-3 h-3" /> отвечаем за 2 часа</Badge>}
      />

      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
          <div className="w-11 h-11 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-3">
            <MessageSquare className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-white">Чат поддержки</p>
          <p className="text-[11px] text-slate-400 mt-1">в приложении · 24/7</p>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
          <div className="w-11 h-11 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400 mx-auto mb-3">
            <Mail className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-white">support@cvgen.ai</p>
          <p className="text-[11px] text-slate-400 mt-1">ответ до 2 часов</p>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
          <div className="w-11 h-11 rounded-xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-white">База знаний</p>
          <p className="text-[11px] text-slate-400 mt-1">статьи и гайды</p>
        </div>
      </div>

      <Card title="Частые вопросы" subtitle="Возможно, ответ уже здесь">
        <div className="space-y-2.5">
          {faqs.map((f) => {
            const isOpen = openFaq === f.q;
            return (
              <div key={f.q} className="rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : f.q)}
                  className="w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left"
                >
                  <span className="text-xs font-bold text-white">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <p className="px-4 pb-4 text-xs text-slate-300 leading-relaxed">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <Card title="Написать в поддержку" subtitle={`Обращение от ${user.email}`}>
        <div className="space-y-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Опишите вашу проблему..."
            className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white resize-none"
          />
          <Button className="w-full" disabled={!message.trim()}>
            <MessageSquare className="w-4 h-4" /> Отправить обращение
          </Button>
        </div>
      </Card>

      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2">
        <Zap className="w-4 h-4 shrink-0 mt-0.5" />
        <span>
          Pro-поддержка: персональный менеджер по карьере поможет с резюме и переговорами об оффере.
          Подключите тариф «Pro», чтобы получить доступ.
        </span>
      </div>
    </div>
  );
};
