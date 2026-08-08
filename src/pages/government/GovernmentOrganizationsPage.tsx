import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building, ArrowUpRight, Search, ShieldCheck, Footprints } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GovernmentOrganizationsPage: React.FC = () => {
  const { organizations } = useApp();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/40">
            B2G Organizations Directory
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Реестр сельхозформирований округа</h1>
          <p className="text-xs text-slate-300 mt-1">
            Учёт КХ, СПК и агроформирований с показателями землепользования и рисков.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400">Всего хозяйств: </span>
          <strong className="text-white font-bold">{organizations.length} КХ/СПК</strong>
        </div>
      </div>

      {/* Organizations Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3">Название</th>
                <th className="p-3">Район</th>
                <th className="p-3">Площадь</th>
                <th className="p-3">Поголовье</th>
                <th className="p-3">Пастбища</th>
                <th className="p-3">Риск</th>
                <th className="p-3">Статус</th>
                <th className="p-3">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {organizations.map((org) => (
                <tr key={org.id} className="hover:bg-slate-900/50 transition">
                  <td className="p-3">
                    <div className="font-bold text-white text-sm">{org.name}</div>
                    <div className="text-[10px] text-slate-400">БИН: {org.bin}</div>
                  </td>
                  <td className="p-3">{org.district}</td>
                  <td className="p-3 font-mono font-bold text-white">{org.areaHectares} га</td>
                  <td className="p-3 font-mono">
                    {org.cattleCount + org.horseCount + org.sheepCount} животных
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold border text-[10px] ${
                        org.pastureCondition === 'good'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : org.pastureCondition === 'medium'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}
                    >
                      {org.pastureCondition === 'good'
                        ? '🟢 Хорошее'
                        : org.pastureCondition === 'medium'
                        ? '🟡 Среднее'
                        : '🔴 Истощённое'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`font-bold ${
                        org.riskLevel === 'high'
                          ? 'text-red-400'
                          : org.riskLevel === 'medium'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {org.riskLevel === 'high' ? 'Низкий' : 'Низкий'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                      {org.status === 'active' ? 'Активен' : 'Проверка'}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/government/organizations/${org.id}`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center space-x-1 transition"
                    >
                      <span>Профиль</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
