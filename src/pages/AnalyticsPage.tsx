import React from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Eye, Download, Trophy, TrendingUp, BarChart3, PieChart as PieIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const viewsData = [
  { month: 'Мар', views: 84, downloads: 22 },
  { month: 'Апр', views: 132, downloads: 38 },
  { month: 'Май', views: 218, downloads: 61 },
  { month: 'Июн', views: 296, downloads: 89 },
  { month: 'Июл', views: 254, downloads: 74 },
  { month: 'Авг', views: 300, downloads: 92 },
];

const sourceData = [
  { name: 'Прямые переходы', value: 44, color: '#10B981' },
  { name: 'LinkedIn', value: 28, color: '#3B82F6' },
  { name: 'Вакансии/HR', value: 18, color: '#F59E0B' },
  { name: 'Рекомендации', value: 10, color: '#8B5CF6' },
];

const tooltipStyle = { background: '#12281c', border: '1px solid #10b981', color: '#fff', fontSize: 12 };

export const AnalyticsPage: React.FC = () => {
  const { resumes } = useApp();

  const totalViews = resumes.reduce((a, r) => a + r.stats.views, 0);
  const totalDownloads = resumes.reduce((a, r) => a + r.stats.downloads, 0);
  const totalInterviews = resumes.reduce((a, r) => a + r.stats.interviews, 0);
  const avgAts = resumes.length
    ? Math.round(resumes.reduce((a, r) => a + r.atsScore, 0) / resumes.length)
    : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Аналитика"
        subtitle="Как работают ваши резюме"
        badge={<Badge tone="emerald"><TrendingUp className="w-3 h-3" /> +18% к просмотрам за месяц</Badge>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Eye} label="Просмотры" value={totalViews.toLocaleString('ru-RU')} sub="суммарно по всем резюме" tone="emerald" />
        <StatCard icon={Download} label="Скачивания" value={totalDownloads.toLocaleString('ru-RU')} sub="PDF-версий" tone="blue" />
        <StatCard icon={Trophy} label="Интервью" value={String(totalInterviews)} sub="за весь период" tone="amber" />
        <StatCard icon={BarChart3} label="Средний ATS" value={`${avgAts}/100`} sub="по активным резюме" tone="violet" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Просмотры и скачивания" subtitle="За последние 6 месяцев">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="views" name="Просмотры" stroke="#10B981" fill="url(#viewsGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="downloads" name="Скачивания" stroke="#3B82F6" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Источники трафика" subtitle="Откуда приходят просмотры">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Эффективность резюме" subtitle="Просмотры → отклики → интервью" className="md:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resumes.map((r) => ({ name: r.name.slice(0, 20), views: r.stats.views, apps: r.stats.applications, int: r.stats.interviews }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} interval={0} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="views" name="Просмотры" fill="#10B981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="apps" name="Отклики" fill="#F59E0B" radius={[6, 6, 0, 0]} />
                <Bar dataKey="int" name="Интервью" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="Что улучшить" subtitle="Рекомендации AI по аналитике">
        <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <PieIcon className="w-4 h-4 text-emerald-400 mb-2" />
            <p className="font-bold text-white mb-1">Больше прямых переходов</p>
            <p className="text-slate-400">Добавьте ссылку на резюме в подпись email и профили — прямо на кандидата.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <TrendingUp className="w-4 h-4 text-amber-400 mb-2" />
            <p className="font-bold text-white mb-1">Пик активности — вторник</p>
            <p className="text-slate-400">Обновляйте резюме и откликайтесь в вт/ср утром: конверсия в просмотры выше на 22%.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <Eye className="w-4 h-4 text-blue-400 mb-2" />
            <p className="font-bold text-white mb-1">Первый экран решает</p>
            <p className="text-slate-400">Рекрутёр смотрит резюме 7 секунд — Summary и контакты должны быть наверху.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
