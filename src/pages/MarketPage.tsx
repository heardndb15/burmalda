import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { TrendingUp, Banknote, Users, Flame, Briefcase } from 'lucide-react';

const salaryData = [
  { role: 'Junior Frontend', mid: 1200, top: 1800 },
  { role: 'Middle Frontend', mid: 2400, top: 3600 },
  { role: 'Senior Frontend', mid: 4200, top: 6000 },
  { role: 'Senior Fullstack', mid: 4800, top: 7500 },
  { role: 'Tech Lead', mid: 6500, top: 9500 },
  { role: 'Principal Engineer', mid: 7800, top: 12000 },
];

const marketTrends = [
  { role: 'React', trend: '+24%', hot: true },
  { role: 'TypeScript', trend: '+31%', hot: true },
  { role: 'Node.js', trend: '+18%', hot: true },
  { role: 'GraphQL', trend: '+9%', hot: false },
  { role: 'Kubernetes', trend: '+22%', hot: true },
  { role: 'PHP', trend: '-11%', hot: false },
  { role: 'WordPress', trend: '-8%', hot: false },
];

const cities = [
  { city: 'Минск', senior: 4200, demand: 210, remote: '80%' },
  { city: 'Алматы', senior: 3600, demand: 150, remote: '70%' },
  { city: 'Москва', senior: 5200, demand: 900, remote: '60%' },
  { city: 'Remote EU', senior: 6800, demand: 400, remote: '100%' },
  { city: 'Remote US', senior: 9500, demand: 300, remote: '100%' },
];

export const MarketPage: React.FC = () => {
  const { user } = useApp();
  const [city, setCity] = useState('Минск');

  const targetRow = salaryData.find((s) => s.role.includes('Fullstack'));
  const currentCity = cities.find((c) => c.city === city) ?? cities[0];
  const maxTop = Math.max(...salaryData.map((s) => s.top));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Рынок и зарплаты"
        subtitle="Актуальные данные для вашей роли"
        badge={<Badge tone="emerald"><TrendingUp className="w-3 h-3" /> Обновлено сегодня</Badge>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Banknote} label="Медиана по вашей роли" value="4 800$" sub="Senior Fullstack" tone="emerald" />
        <StatCard icon={TrendingUp} label="Рост зп за год" value="+12%" sub="по нише fullstack" tone="amber" />
        <StatCard icon={Users} label="Вакансий открыто" value="1 860" sub="fullstack в СНГ" tone="blue" />
        <StatCard icon={Flame} label="Горячий навык" value="TypeScript" sub="+31% спрос" tone="red" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Зарплатные вилки" subtitle="Медиана и верхняя граница, $/мес" action={<Badge tone="slate">гросс</Badge>}>
          <div className="space-y-3">
            {salaryData.map((row) => (
              <div key={row.role}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-white">{row.role}</span>
                  <span className="text-slate-400">{row.mid.toLocaleString('ru-RU')}$ — {row.top.toLocaleString('ru-RU')}$</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden flex">
                  <div className="bg-emerald-600" style={{ width: `${(row.mid / maxTop) * 100}%` }} />
                  <div className="bg-emerald-400 opacity-80" style={{ width: `${((row.top - row.mid) / maxTop) * 100}%` }} />
                </div>
              </div>
            ))}
            <p className="text-[10px] text-slate-500">
              Тёмный сегмент — медиана, светлый — верхняя граница. Вы сейчас: <strong className="text-emerald-300">{targetRow?.role}</strong>
            </p>
          </div>
        </Card>

        <Card title="Спрос на навыки" subtitle="Динамика упоминаний в вакансиях за год">
          <div className="space-y-2.5">
            {marketTrends.map((t) => (
              <div key={t.role} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-xs font-semibold text-white">{t.role}</span>
                <span className={`text-xs font-black ${t.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {t.trend}
                  {t.hot && <span className="ml-1.5 px-1.5 py-0.5 rounded bg-red-950 text-red-300 text-[9px] font-bold border border-red-500/40">hot</span>}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Зарплаты по городам" subtitle="Senior Fullstack · гросс" action={
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
        >
          {cities.map((c) => (
            <option key={c.city} value={c.city}>{c.city}</option>
          ))}
        </select>
      }>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center">
            <p className="text-[11px] text-emerald-300 font-bold">Медиана</p>
            <p className="text-2xl font-black text-white">{currentCity.senior.toLocaleString('ru-RU')}$</p>
          </div>
          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 text-center">
            <p className="text-[11px] text-blue-300 font-bold">Открытых вакансий</p>
            <p className="text-2xl font-black text-white">{currentCity.demand}</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-center">
            <p className="text-[11px] text-amber-300 font-bold">Remote-вакансий</p>
            <p className="text-2xl font-black text-white">{currentCity.remote}</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400">
          Ваша медианная цель в {city}: <strong className="text-emerald-300">{Math.round(currentCity.senior * 1.25).toLocaleString('ru-RU')}$</strong> при готовности к Senior-уровню. Оффер на Floom (9 500$) уже выше рынка.
        </p>
      </Card>

      <Card title="Ваши позиции на рынке" subtitle="Сравнение с вилками">
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { role: user.headline, gap: 'Верхняя граница', note: 'Вы готовы к переговорам на верхней границе' },
            { role: 'Tech Lead', gap: '+35% к текущему', note: 'Цель карьерного плана' },
            { role: 'Principal', gap: '+55% к текущему', note: 'Долгосрочная цель' },
          ].map((p) => (
            <div key={p.role} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <Briefcase className="w-4 h-4 text-emerald-400 mb-2" />
              <p className="text-xs font-bold text-white">{p.role}</p>
              <p className="text-[11px] text-emerald-400 font-bold mt-0.5">{p.gap}</p>
              <p className="text-[10px] text-slate-400 mt-1">{p.note}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
