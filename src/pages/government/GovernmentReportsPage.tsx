import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileSpreadsheet, Download, FileText, CheckCircle2 } from 'lucide-react';

export const GovernmentReportsPage: React.FC = () => {
  const { addAuditLog } = useApp();
  const [reportType, setReportType] = useState('pasture_health');
  const [period, setPeriod] = useState('2026_q3');
  const [territory, setTerritory] = useState('Илийский сельский округ');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const reportTypes = [
    { id: 'pasture_health', label: 'Состояние пастбищ (NDVI & деградация)' },
    { id: 'livestock_load', label: 'Нагрузка скота и ёмкость кормовой базы' },
    { id: 'land_use', label: 'Мониторинг использования земель' },
    { id: 'livestock_census', label: 'Животноводство (поголовье по КХ)' },
    { id: 'risks_summary', label: 'Сводный отчёт по оперативным рискам' },
    { id: 'management_plan', label: 'План управления пастбищами' },
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const selectedObj = reportTypes.find((r) => r.id === reportType);
      addAuditLog({
        userRole: 'AKIMAT_ADMIN',
        userName: 'Сотрудник Акимата',
        action: 'Сформирован сводный отчёт PDF',
        target: selectedObj?.label || reportType,
        ipAddress: '127.0.0.1',
      });
      setDownloadNotice(`Отчёт «${selectedObj?.label}» успeшно сформирован в формате PDF.`);
      setTimeout(() => setDownloadNotice(null), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30">
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/40">
          B2G Report Generator
        </span>
        <h1 className="text-2xl font-black text-white mt-1">Генератор государственных отчётов</h1>
        <p className="text-xs text-slate-300 mt-1">
          Формирование ведомственных PDF-отчётов по земельным ресурсам и животноводству округа.
        </p>
      </div>

      {downloadNotice && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{downloadNotice}</span>
          </div>
          <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition">
            Скачать файл
          </button>
        </div>
      )}

      {/* Generator Form */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5 max-w-2xl mx-auto">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-amber-400" />
          <span>Параметры отчёта</span>
        </h3>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-bold mb-1">Тип отчёта:</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {reportTypes.map((rt) => (
                <button
                  key={rt.id}
                  onClick={() => setReportType(rt.id)}
                  className={`p-3 rounded-xl text-left border font-semibold transition ${
                    reportType === rt.id
                      ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 font-extrabold'
                      : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {rt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Период отчёта:</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white font-bold p-2.5 rounded-xl"
              >
                <option value="2026_q3">III Квартал 2026 г.</option>
                <option value="2026_year">За 2026 год</option>
                <option value="2025_year">За 2025 год</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 font-bold mb-1">Территория:</label>
              <input
                type="text"
                value={territory}
                onChange={(e) => setTerritory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white font-bold p-2.5 rounded-xl"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-950 transition active:scale-95 disabled:opacity-50"
        >
          {isGenerating ? (
            <span>Генерация PDF...</span>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Сформировать PDF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
