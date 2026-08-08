import React from 'react';

export const MapLegend: React.FC = () => {
  return (
    <div className="glass-panel p-3 rounded-2xl border border-slate-800 text-xs space-y-2 max-w-[180px]">
      <div className="font-extrabold text-white text-[10px] uppercase tracking-wider text-emerald-400">
        Состояние пастбищ
      </div>
      <div className="space-y-1.5 font-medium text-slate-300">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
          <span>🟢 Хорошее (80-100)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
          <span>🟡 Среднее (60-79)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-orange-500 shrink-0" />
          <span>🟠 Ослабленное (40-59)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
          <span>🔴 Истощённое (0-39)</span>
        </div>
      </div>
    </div>
  );
};
