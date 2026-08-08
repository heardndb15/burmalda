import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Toggle } from '../components/ui/Toggle';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { User, Mail, Phone, MapPin, Shield, Globe, KeyRound, Trash2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, setUser } = useApp();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [location, setLocation] = useState(user.location);
  const [headline, setHeadline] = useState(user.headline);

  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(false);
  const [aiAuto, setAiAuto] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);

  const handleSave = () => {
    setUser((prev) => ({ ...prev, name, email, phone, location, headline }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Настройки"
        subtitle="Профиль, уведомления и безопасность"
        actions={<Button onClick={handleSave}>Сохранить изменения</Button>}
      />

      {/* Profile */}
      <Card
        title="Профиль"
        subtitle="Данные используются во всех резюме по умолчанию"
        action={<Badge tone="emerald"><User className="w-3 h-3" /> {user.plan === 'pro' ? 'Pro' : 'Free'}</Badge>}
      >
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">ФИО</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Телефон</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Локация</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Заголовок по умолчанию</label>
            <input value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" />
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card title="Уведомления" subtitle="Как с вами связываться">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <Toggle checked={notifEmail} onChange={setNotifEmail} label="Email-уведомления" description="Просмотры, отклики, офферы" />
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <Toggle checked={notifPush} onChange={setNotifPush} label="Push-уведомления" description="Мгновенные уведомления в браузере" />
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <Toggle checked={notifWeekly} onChange={setNotifWeekly} label="Еженедельный отчёт" description="Статистика резюме раз в неделю" />
          </div>
        </div>
      </Card>

      {/* AI & Privacy */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="AI и автопилот" subtitle="Настройки умных функций">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <Toggle checked={aiAuto} onChange={setAiAuto} label="AI-подсказки в редакторе" description="Подсказки формулировок в реальном времени" />
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <Toggle checked={publicProfile} onChange={setPublicProfile} label="Публичный профиль" description="Виден рекрутёрам по ссылке" />
            </div>
          </div>
        </Card>

        <Card title="Безопасность" subtitle="Аккаунт и сессии">
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition">
              <span className="flex items-center gap-3 text-xs font-semibold text-white">
                <KeyRound className="w-4 h-4 text-emerald-400" /> Сменить пароль
              </span>
            </button>
            <button className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition">
              <span className="flex items-center gap-3 text-xs font-semibold text-white">
                <Shield className="w-4 h-4 text-amber-400" /> Двухфакторная аутентификация
              </span>
              <Badge tone="slate">выкл</Badge>
            </button>
            <button className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-red-500/40 transition">
              <span className="flex items-center gap-3 text-xs font-semibold text-red-300">
                <Trash2 className="w-4 h-4" /> Удалить аккаунт
              </span>
            </button>
          </div>
        </Card>
      </div>

      <Card title="Интеграции" subtitle="Подключённые сервисы">
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: 'LinkedIn', desc: 'Импорт профиля и опыта', connected: user.linkedinConnected, tone: 'text-blue-400' },
            { name: 'GitHub', desc: 'Автоподтягивание проектов', connected: user.githubConnected, tone: 'text-slate-300' },
            { name: 'Google Drive', desc: 'Бэкап резюме в облако', connected: false, tone: 'text-amber-400' },
            { name: 'Notion', desc: 'Карьерные заметки', connected: false, tone: 'text-slate-300' },
          ].map((int) => (
            <div key={int.name} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <Globe className={`w-4 h-4 shrink-0 ${int.tone}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white">{int.name}</p>
                <p className="text-[11px] text-slate-400">{int.desc}</p>
              </div>
              {int.connected ? (
                <Badge tone="emerald">подключено</Badge>
              ) : (
                <Button size="sm" variant="secondary">Подключить</Button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
