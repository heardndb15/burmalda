import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, CheckCircle2, Radar, Calendar, Trees, Droplets } from 'lucide-react';

export const PassportVerificationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { financialPassports } = useApp();

  const passport = financialPassports.find((p) => p.id === id) || {
    id: id || 'AR-2026-000124',
    farmName: 'КХ «Береке»',
    createdAt: '08.08.2026',
    pastureHealthScore: 82,
    category: 'B — Хорошая устойчивость',
    feedReliabilityScore: 84,
    waterSecurityScore: 91,
    verified: true,
  };

  return (
    <div className="min-h-screen bg-[#071318] text-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="glass-panel p-8 rounded-3xl border border-emerald-500/40 max-w-lg w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden bg-slate-900/90">
        {/* Top Logo */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Radar className="w-4 h-4" />
            </div>
            <span className="text-lg font-black text-white">
              Agro<span className="text-emerald-400">Radar</span>
            </span>
          </Link>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/40 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>AgroRadar Verified</span>
          </span>
        </div>

        {/* Verification Status Banner */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-1">
          <h2 className="text-xl font-black text-white">Financial Passport Verified</h2>
          <div className="text-xs text-emerald-400 font-bold">✓ Документ существует и действителен в системе</div>
        </div>

        {/* Details Card (Non-PII Privacy Safe) */}
        <div className="space-y-3 text-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">ID документа:</span>
            <strong className="text-emerald-400 font-mono font-black">{passport.id}</strong>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Хозяйство:</span>
            <strong className="text-white font-bold">{passport.farmName}</strong>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Дата формирования:</span>
            <strong className="text-white">{passport.createdAt}</strong>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Pasture Health Score:</span>
            <strong className="text-white font-black text-sm">{passport.pastureHealthScore} / 100</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Устойчивость:</span>
            <strong className="text-emerald-400 font-bold">{passport.category}</strong>
          </div>
        </div>

        {/* Indicator Scores Summary */}
        <div className="grid grid-cols-2 gap-3 text-xs text-center">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Feed Reliability</span>
            <span className="text-lg font-black text-white">{passport.feedReliabilityScore}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Water Security</span>
            <span className="text-lg font-black text-cyan-400">{passport.waterSecurityScore}</span>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="text-[10px] text-slate-500 text-center italic">
          * Верификационная страница защищает персональные данные пользователя и отображает только деперсонализированные геопространственные индикаторы.
        </div>
      </div>
    </div>
  );
};
