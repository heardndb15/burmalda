import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AgroMap } from '../../components/map/AgroMap';
import { Search, ShieldAlert, Landmark, CheckCircle2, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const BankSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || 'AR-2026-000124';
  const [query, setQuery] = useState(initialQuery);

  const { financialPassports } = useApp();

  const passport = financialPassports.find(
    (p) =>
      p.id.toLowerCase() === query.toLowerCase() ||
      p.cadastralNumber.includes(query) ||
      p.farmName.toLowerCase().includes(query.toLowerCase())
  ) || financialPassports[0];

  const historicalTrendData = [
    { year: '2024', ndvi: 0.72, feedScore: 78, score: 76 },
    { year: '2025', ndvi: 0.78, feedScore: 82, score: 80 },
    { year: '2026', ndvi: 0.84, feedScore: 84, score: 82 },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Search Input Bar */}
      <div className="glass-panel p-4 rounded-3xl border border-cyan-500/40">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по Passport ID, Кадастру или названию КХ..."
            className="flex-1 bg-slate-900 border border-slate-800 text-white font-mono text-sm px-4 py-2.5 rounded-2xl focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs transition"
          >
            Найти
          </button>
        </form>
      </div>

      {/* Section 27 Requirement: Farm Risk Profile Header */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40 space-y-6 bg-slate-950/80 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black border border-cyan-500/40">
                FARM RISK PROFILE
              </span>
              <span className="text-xs font-mono text-slate-400">ID: {passport.id}</span>
            </div>
            <h1 className="text-3xl font-black text-white mt-1">{passport.farmName}</h1>
            <p className="text-xs text-slate-400 mt-1">
              БИН: {passport.bin} · Кадастровый номер: {passport.cadastralNumber}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-center shrink-0">
            <span className="text-[10px] font-extrabold uppercase text-cyan-400 tracking-wider">
              Overall Burmalda Score
            </span>
            <div className="text-4xl font-black text-white">{passport.overallScore} <span className="text-xl text-slate-400">/ 100</span></div>
            <span className="text-xs font-bold text-emerald-400">{passport.category}</span>
          </div>
        </div>

        {/* 4 Score Indicators Breakdown (#27 Requirement) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <span className="text-[11px] text-slate-400 block font-bold">Feed Reliability</span>
            <span className="text-3xl font-black text-white">{passport.feedReliabilityScore}</span>
            <span className="text-[10px] text-emerald-400 block">80% от ёмкости</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <span className="text-[11px] text-slate-400 block font-bold">Water Security</span>
            <span className="text-3xl font-black text-cyan-400">{passport.waterSecurityScore}</span>
            <span className="text-[10px] text-cyan-300 block">2 источника (3км)</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <span className="text-[11px] text-slate-400 block font-bold">Pasture Stability</span>
            <span className="text-3xl font-black text-white">{passport.pastureStabilityScore}</span>
            <span className="text-[10px] text-emerald-400 block">NDVI 0.84 (Высокий)</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <span className="text-[11px] text-slate-400 block font-bold">Spatial Risk</span>
            <span className="text-3xl font-black text-emerald-400">{passport.spatialRiskScore}</span>
            <span className="text-[10px] text-emerald-300 block">Низкая эрозия</span>
          </div>
        </div>

        {/* 3-Year Historical Trend Graph (#27 Requirement: 2024 -> 2025 -> 2026) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase text-cyan-400 tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>Динамика за 3 года (2024 → 2025 → 2026)</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Sentinel-2 Telemetry</span>
          </div>

          <div className="h-44 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalTrendData}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                <YAxis domain={[50, 100]} stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Map Preview */}
        <div className="space-y-2">
          <h3 className="text-xs font-extrabold uppercase text-cyan-400 tracking-wider">
            Геопространственное расположение и залог
          </h3>
          <AgroMap height="h-64" showControls={false} />
        </div>

        {/* Mandatory Bank Disclaimer (#28 Requirement) */}
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-slate-300 space-y-1">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>Burmalda Risk Indicators Disclaimer</span>
          </div>
          <p className="leading-relaxed">
            «Burmalda предоставляет аналитические и геопространственные показатели. Они не являются кредитным решением и не заменяют внутреннюю оценку рисков финансовой организации.»
          </p>
        </div>
      </div>
    </div>
  );
};
