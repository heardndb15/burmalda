import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, ShieldAlert, CheckSquare, Plus, AlertCircle, FileSpreadsheet } from 'lucide-react';

export const GovernmentLandPage: React.FC = () => {
  const { landObservations, inspectionTasks, addInspectionTask, addAuditLog } = useApp();
  const [createdTaskNotice, setCreatedTaskNotice] = useState<string | null>(null);

  const handleCreateInspectionTask = (plotName: string, ownerName: string, plotId: string, reason: string) => {
    addInspectionTask({
      plotId,
      plotName,
      ownerName,
      assignedTo: 'Инспектор Акимата (Земельный отдел)',
      reason,
    });

    addAuditLog({
      userRole: 'AKIMAT_ADMIN',
      userName: 'Сотрудник Акимата (Касымов Т.)',
      action: 'Создание задачи официальной проверки участка',
      target: `${plotName} (${ownerName})`,
      ipAddress: '127.0.0.1',
    });

    setCreatedTaskNotice(`Создана официальная задача проверки для ${plotName} (${ownerName}).`);
    setTimeout(() => setCreatedTaskNotice(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/40">
              B2G Land Monitoring
            </span>
          </div>
          <h1 className="text-2xl font-black text-white">Мониторинг использования земель</h1>
          <p className="text-xs text-slate-300 mt-1">
            Автоматическое выявление потенциальных отклонений использования пастбищных угодий.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Требует проверки: </span>
            <strong className="text-amber-400 font-bold">
              {landObservations.filter((l) => l.status === 'requires_verification').length} участка
            </strong>
          </div>
        </div>
      </div>

      {createdTaskNotice && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-in fade-in">
          ✓ {createdTaskNotice}
        </div>
      )}

      {/* Critical Legal Disclaimer (#10 Requirement) */}
      <div className="glass-panel p-5 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-slate-950 to-slate-950 text-xs space-y-3">
        <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-sm">
          <ShieldAlert className="w-5 h-5" />
          <span>ВАЖНАЯ ЮРИДИЧЕСКАЯ ОГОВОРКА И РЕГЛАМЕНТ АКИМАТА</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-[11px] text-slate-300 pt-2 border-t border-amber-500/20">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-amber-400 font-bold block">1. Satellite Data</span>
            <span className="text-[10px] text-slate-400">Снимки Sentinel-2 & GPS</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-amber-400 font-bold block">2. Anomaly Detection</span>
            <span className="text-[10px] text-slate-400">Поиск аномалий выпаса</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-center">
            <span className="text-amber-300 font-bold block">3. «Требует проверки»</span>
            <span className="text-[10px] text-amber-200/80">Информационный статус</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-emerald-400 font-bold block">4. Проверка акимата</span>
            <span className="text-[10px] text-slate-400">Документы и факт-выезд</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-teal-400 font-bold block">5. Процедура</span>
            <span className="text-[10px] text-slate-400">Официальное решение</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 italic">
          * Искусственный интеллект и спутники не принимают юридических решений. Система подсвечивает вероятные зоны риска для выездной проверки государственным инспектором.
        </p>
      </div>

      {/* Grid of Plots Requiring Inspection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {landObservations.map((plot) => (
          <div
            key={plot.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-amber-500/40 transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400">Кадастр: {plot.cadastralNumber}</span>
                <h3 className="text-lg font-black text-white">{plot.plotName}</h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black border ${
                  plot.status === 'requires_verification'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {plot.status === 'requires_verification' ? '🟠 Требует проверки' : '🟢 Используется'}
              </span>
            </div>

            {/* Spec breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px]">Площадь:</span>
                <strong className="text-white font-bold">{plot.areaHectares} га</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Владелец:</span>
                <strong className="text-white font-bold">{plot.ownerName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Наблюдаемая активность:</span>
                <strong className={plot.observedActivityLevel === 'low' ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                  {plot.observedActivityLevel === 'low' ? 'Низкая' : 'Нормальная'}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Период наблюдения:</span>
                <strong className="text-white font-bold">{plot.periodMonths} месяца</strong>
              </div>
            </div>

            {/* Reason Box */}
            <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
              <span className="font-bold text-amber-400 block mb-0.5">Причина:</span>
              <span>«{plot.reason}»</span>
            </div>

            {/* Action button */}
            <button
              onClick={() =>
                handleCreateInspectionTask(plot.plotName, plot.ownerName, plot.plotId, plot.reason)
              }
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-950 transition"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Создать задачу проверки</span>
            </button>
          </div>
        ))}
      </div>

      {/* Active Tasks Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-amber-400" />
          <span>Активные задачи инспектирования</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3">ID задачи</th>
                <th className="p-3">Участок</th>
                <th className="p-3">Владелец</th>
                <th className="p-3">Инспектор</th>
                <th className="p-3">Дата создания</th>
                <th className="p-3">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {inspectionTasks.map((t) => (
                <tr key={t.id} className="hover:bg-slate-900/50 transition">
                  <td className="p-3 font-mono text-amber-400 font-bold">{t.id}</td>
                  <td className="p-3 font-bold text-white">{t.plotName}</td>
                  <td className="p-3">{t.ownerName}</td>
                  <td className="p-3">{t.assignedTo}</td>
                  <td className="p-3">{t.createdDate}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      В работе
                    </span>
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
