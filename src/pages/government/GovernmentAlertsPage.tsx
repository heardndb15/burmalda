import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, AlertTriangle, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GovernmentAlertsPage: React.FC = () => {
  const { governmentAlerts } = useApp();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/40">
            B2G Alerts Center
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Центр оперативных рисков округа</h1>
          <p className="text-xs text-slate-300 mt-1">
            Предупреждения о перевыпасе, деградации почвенного покрова и неиспользуемых землях.
          </p>
        </div>

        <button
          onClick={() => navigate('/government/map')}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition shrink-0"
        >
          Карта рисков
        </button>
      </div>

      {/* Alerts list */}
      <div className="space-y-4">
        {governmentAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`glass-panel p-6 rounded-3xl border transition space-y-3 ${
              alert.severity === 'high'
                ? 'border-red-500/40 bg-red-950/10'
                : alert.severity === 'warning'
                ? 'border-amber-500/40 bg-amber-950/10'
                : 'border-blue-500/40 bg-blue-950/10'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 ${
                    alert.severity === 'high'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                      : alert.severity === 'warning'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                  }`}
                >
                  {alert.type === 'high_load' ? '🚨' : alert.type === 'degradation' ? '⚠️' : '🔎'}
                </div>
                <div>
                  <h3 className="text-base font-black text-white">{alert.title}</h3>
                  <p className="text-xs text-amber-400 font-semibold">{alert.locationName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-xs text-slate-400 font-mono">{alert.timestamp}</span>
                <button
                  onClick={() =>
                    alert.type === 'requires_verification'
                      ? navigate('/government/land')
                      : navigate('/government/map')
                  }
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-1.5 transition"
                >
                  <span>Детали</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-2xl border border-slate-800">
              {alert.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
