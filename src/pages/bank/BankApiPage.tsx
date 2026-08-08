import React, { useState } from 'react';
import { Code2, Copy, RefreshCw, Check, ExternalLink, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BankApiPage: React.FC = () => {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState('ar_demo_98f4a1b87c2049e29a83');
  const [copied, setCopied] = useState(false);

  const endpoints = [
    { method: 'GET', path: '/api/v1/farms/{id}', desc: 'Получение профиля хозяйства и поголовья' },
    { method: 'GET', path: '/api/v1/pastures/{id}', desc: 'Текущее состояние пастбища и NDVI-индекс' },
    { method: 'GET', path: '/api/v1/passports/{id}', desc: 'Данные верифицированного Financial Passport' },
    { method: 'GET', path: '/api/v1/risk/{id}', desc: 'Геопространственные индикаторы рисков (AgroRadar Risk Indicators)' },
  ];

  const jsonSample = `{
  "farm_id": "AR-124",
  "passport_id": "AR-2026-000124",
  "pasture_health_score": 82,
  "water_security_score": 91,
  "spatial_risk_score": 74,
  "category": "B — Хорошая устойчивость",
  "feed_capacity_ratio_pct": 80,
  "verified": true,
  "timestamp": "2026-08-08T15:32:00Z"
}`;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateKey = () => {
    const newKey = `ar_demo_${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 12)}`;
    setApiKey(newKey);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-extrabold uppercase border border-cyan-500/40">
            B2B Integration Gateway
          </span>
          <h1 className="text-2xl font-black text-white mt-1">API Portal для Банков и МФО</h1>
          <p className="text-xs text-slate-300 mt-1">
            Интеграция геоданных AgroRadar в скоринговые системы финансовых организаций.
          </p>
        </div>

        <button
          onClick={() => navigate('/bank/api/docs')}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs flex items-center space-x-1.5 shadow-lg shadow-cyan-950 transition"
        >
          <BookOpen className="w-4 h-4" />
          <span>API Documentation</span>
        </button>
      </div>

      {/* Section 29 Requirement: API Access Box */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-cyan-400" />
          <span>API Access Credentials</span>
        </h2>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 block font-bold">Ваш API Key (Demo Sandbox):</span>
            <span className="font-mono text-cyan-300 text-sm font-bold tracking-wider">{apiKey}</span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleCopyKey}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center space-x-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Скопировано' : 'Copy'}</span>
            </button>
            <button
              onClick={handleRegenerateKey}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center space-x-1.5 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Endpoints List */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold uppercase text-cyan-400 tracking-wider">
          Доступные REST API Endpoints
        </h3>

        <div className="space-y-3">
          {endpoints.map((ep, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono text-xs font-black border border-emerald-500/30">
                  {ep.method}
                </span>
                <span className="font-mono text-white text-xs font-bold">{ep.path}</span>
              </div>
              <span className="text-xs text-slate-400">{ep.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Response JSON Sample */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        <h3 className="text-sm font-extrabold uppercase text-cyan-400 tracking-wider">
          Пример JSON Ответа (Sample Response)
        </h3>
        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto">
          {jsonSample}
        </pre>
      </div>
    </div>
  );
};
