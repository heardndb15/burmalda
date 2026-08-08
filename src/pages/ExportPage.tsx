import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Download, Share2, Link2, Copy, QrCode, FileJson, FileText, Eye } from 'lucide-react';

const formats = [
  { id: 'pdf', name: 'PDF', desc: 'Классический формат для отправки', icon: FileText, tone: 'text-red-400' },
  { id: 'docx', name: 'DOCX', desc: 'Редактируемый Word-документ', icon: FileJson, tone: 'text-blue-400' },
  { id: 'json', name: 'JSON', desc: 'Машинный формат для ATS и парсеров', icon: FileJson, tone: 'text-emerald-400' },
];

export const ExportPage: React.FC = () => {
  const { resumes, activeResume } = useApp();
  const resume = activeResume ?? resumes[0];
  const [copied, setCopied] = useState(false);
  const [expires, setExpires] = useState('30 дней');

  const publicUrl = `https://cvgen.ai/cv/${resume?.id ?? 'abc123'}?ref=pro`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Экспорт и публикация"
        subtitle="Скачивание, публичные ссылки и распространение"
        badge={<Badge tone="emerald"><Share2 className="w-3 h-3" /> Про публикация</Badge>}
      />

      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-wrap items-center gap-3">
        <Eye className="w-5 h-5 text-emerald-400" />
        <p className="text-xs text-slate-300">
          Активное резюме: <strong className="text-white">{resume?.name ?? '—'}</strong> · последний просмотр: {resume?.stats.lastViewed ?? '—'}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Download formats */}
        <Card title="Скачать резюме" subtitle="Выберите формат">
          <div className="space-y-3">
            {formats.map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 transition text-left group"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:scale-105 transition">
                    <Icon className={`w-5 h-5 ${f.tone}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{f.name}</p>
                    <p className="text-[11px] text-slate-400">{f.desc}</p>
                  </div>
                  <Download className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition" />
                </button>
              );
            })}
          </div>
        </Card>

        {/* Public link */}
        <Card title="Публичная ссылка" subtitle="Поделитесь резюме одним кликом">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 truncate">
                {publicUrl}
              </div>
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                <Copy className="w-3.5 h-3.5" /> {copied ? 'Скопировано!' : 'Копировать'}
              </Button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Срок действия ссылки</label>
              <select
                value={expires}
                onChange={(e) => setExpires(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              >
                <option>30 дней</option>
                <option>90 дней</option>
                <option>1 год</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline">
                <QrCode className="w-4 h-4" /> QR-код
              </Button>
              <Button variant="outline">
                <Link2 className="w-4 h-4" /> Сократить
              </Button>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-200">
              📊 Ссылка отслеживается: вы увидите просмотры и гео посетителей на странице «Аналитика».
            </div>
          </div>
        </Card>
      </div>

      <Card title="Поделиться резюме" subtitle="Куда вставить ссылку">
        <div className="flex flex-wrap gap-2">
          {['Подпись в email', 'LinkedIn «Featured»', 'Мессенджеры', 'Блок «Обо мне» на сайте', 'HR-чаты'].map((place) => (
            <span key={place} className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-[11px] text-slate-300">
              {place}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
};
