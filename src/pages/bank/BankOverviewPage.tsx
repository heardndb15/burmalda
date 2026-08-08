import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Landmark,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  TrendingUp,
  ArrowUpRight,
  ShieldAlert,
  Code2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BankOverviewPage: React.FC = () => {
  const { financialPassports } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('AR-2026-000124');

  const bankMetrics = [
    { title: 'Проверено хозяйств', value: '1 248', sub: 'За последние 12 месяцев', icon: Landmark, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
    { title: 'Средний Pasture Score', value: '76 / 100', sub: 'Категория B (Устойчивые)', icon: TrendingUp, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { title: 'Высокий риск', value: '83 КХ', sub: 'Требует повышенного залога', icon: AlertTriangle, color: 'text-red-400 border-red-500/30 bg-red-500/10' },
    { title: 'Новые паспорта', value: '47', sub: 'За текущую неделю', icon: FileText, color: 'text-teal-400 border-teal-500/30 bg-teal-500/10' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/bank/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-cyan-950/20 to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-extrabold uppercase border border-cyan-500/40">
              B2B Financial Risk Intelligence
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold border border-slate-700">
              Demo data
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white">Agricultural Risk Intelligence</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Геопространственные данные для предварительной оценки сельскохозяйственных рисков.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/bank/api')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center space-x-2 border border-cyan-500/30 transition"
          >
            <Code2 className="w-4 h-4" />
            <span>API Portal</span>
          </button>
        </div>
      </div>

      {/* Section 26 Prompt Requirement: Bank Search Box */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40 bg-slate-950/80 shadow-2xl">
        <h2 className="text-base font-extrabold text-white mb-2 flex items-center gap-2">
          <Search className="w-5 h-5 text-cyan-400" />
          <span>Проверить хозяйство</span>
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          Поиск по Passport ID (`AR-2026-000124`), кадастровому номеру (`19-280-045-124`), БИН или QR-коду.
        </p>

        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Введите Passport ID (например AR-2026-000124) или кадастровый номер..."
            className="flex-1 bg-slate-900 border border-slate-800 text-white font-mono text-sm px-4 py-3 rounded-2xl focus:outline-none focus:border-cyan-500 transition"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs shadow-lg shadow-cyan-950 transition active:scale-95 shrink-0 flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Найти</span>
          </button>
        </form>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {bankMetrics.map((bm, idx) => {
          const Icon = bm.icon;
          return (
            <div key={idx} className={`p-5 rounded-3xl glass-panel border ${bm.color} space-y-2`}>
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                <span>{bm.title}</span>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-2xl lg:text-3xl font-black text-white">{bm.value}</div>
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>{bm.sub}</span>
                <span className="font-bold text-slate-500 uppercase">Demo data</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Financial Passports for Bank */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white">Последние запрошенные Financial Passports</h3>
          <button
            onClick={() => navigate('/bank/search?q=AR-2026-000124')}
            className="text-xs text-cyan-400 font-bold hover:underline flex items-center gap-1"
          >
            <span>Посмотреть все</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {financialPassports.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/bank/search?q=${p.id}`)}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-black text-white">{p.farmName}</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                    {p.id}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Кадастр: {p.cadastralNumber} · Дата: {p.createdAt}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-black text-emerald-400">{p.overallScore} / 100</div>
                  <div className="text-[10px] text-slate-400">{p.category}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Bank Disclaimer Box (#28 Requirement) */}
      <div className="glass-panel p-5 rounded-3xl border border-cyan-500/30 bg-slate-950/60 text-xs text-slate-300 space-y-2">
        <div className="flex items-center space-x-2 text-cyan-400 font-extrabold">
          <ShieldAlert className="w-4 h-4" />
          <span>IMPORTANT BANK DISCLAIMER</span>
        </div>
        <p className="leading-relaxed">
          «Burmalda предоставляет аналитические и геопространственные показатели. Они не являются кредитным решением и не заменяют внутреннюю оценку рисков финансовой организации.»
        </p>
        <p className="text-[11px] text-slate-400">
          Показатели платформы приводятся исключительно под заголовком <strong>«Burmalda Risk Indicators»</strong>.
        </p>
      </div>
    </div>
  );
};
