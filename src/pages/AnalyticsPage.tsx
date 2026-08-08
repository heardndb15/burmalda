import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, TrendingUp, ShieldAlert, Trees, Activity } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { t } = useApp();

  const pastureHealthData = [
    { name: 'Хорошие (🟢)', value: 1240, color: '#10B981' },
    { name: 'Средние (🟡)', value: 1120, color: '#F59E0B' },
    { name: 'Истощённые (🔴)', value: 1120, color: '#EF4444' },
  ];

  const grazingHistoryData = [
    { month: 'Май', days: 31, ndvi: 0.82 },
    { month: 'Июнь', days: 30, ndvi: 0.76 },
    { month: 'Июль', days: 31, ndvi: 0.62 },
    { month: 'Авг', days: 15, ndvi: 0.54 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">{t('analyticsTitle')}</h1>
        <p className="text-xs text-slate-300 mt-1">
          Единственное место сводной аналитики и эффективности использования земель
        </p>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold mb-1">
            <Trees className="w-4 h-4" />
            <span>Кормовая база</span>
          </div>
          <span className="text-2xl font-black text-white">3 480 га</span>
          <span className="block text-[10px] text-slate-400 mt-0.5">Эффективность: 92%</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl">
          <div className="flex items-center space-x-2 text-red-400 text-xs font-bold mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Предотвращено ДТП</span>
          </div>
          <span className="text-2xl font-black text-white">14 случаев</span>
          <span className="block text-[10px] text-slate-400 mt-0.5">За 2026 год</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold mb-1">
            <Activity className="w-4 h-4" />
            <span>Дни ротации</span>
          </div>
          <span className="text-2xl font-black text-white">107 дней</span>
          <span className="block text-[10px] text-slate-400 mt-0.5">Выпас без перевыпаса</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Прирост веса скота</span>
          </div>
          <span className="text-2xl font-black text-white">+14.2%</span>
          <span className="block text-[10px] text-slate-400 mt-0.5">В сравнении с 2025</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pasture Health Distribution */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">{t('pastureHealthDist')} (в гектарах)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pastureHealthData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => `${entry.name}: ${entry.value}га`}
                >
                  {pastureHealthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#12281c', border: '1px solid #10b981', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grazing Days Bar Chart */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">{t('grazingDaysHistory')} (по месяцам)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={grazingHistoryData}>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#12281c', border: '1px solid #10b981', color: '#fff' }} />
                <Bar dataKey="days" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
