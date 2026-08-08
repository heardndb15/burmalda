import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, CheckCircle2, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoBanner: React.FC = () => {
  const { isDemoMode, stopDemoMode, t } = useApp();
  const navigate = useNavigate();

  if (!isDemoMode) return null;

  return (
    <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-b border-amber-500/40 px-4 py-2.5 flex items-center justify-between text-xs text-amber-200">
      <div className="flex items-center space-x-3 overflow-x-auto">
        <span className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-extrabold text-[10px] tracking-wider uppercase border border-amber-500/40 shrink-0">
          <Play className="w-3 h-3 fill-current" />
          <span>{t('demoBadge')}</span>
        </span>
        <div className="flex items-center space-x-4 text-amber-100 font-medium whitespace-nowrap">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            1. GPS-трекеры отслеживают стадо №2
          </span>
          <span className="flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            2. Детекция приближения к дороге A-3
          </span>
          <button
            onClick={() => navigate('/map')}
            className="text-emerald-400 font-bold underline flex items-center gap-1 hover:text-emerald-300"
          >
            3. Открыть интерактивную карту <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <button
        onClick={stopDemoMode}
        className="p-1 text-amber-400 hover:text-white shrink-0 ml-2"
        title="Завершить демо"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
