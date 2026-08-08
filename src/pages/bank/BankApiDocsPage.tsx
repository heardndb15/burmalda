import React from 'react';
import { BookOpen, Key, Globe, ShieldAlert, Code2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BankApiDocsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <button
        onClick={() => navigate('/bank/api')}
        className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Назад к API Portal</span>
      </button>

      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40">
        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-extrabold uppercase border border-cyan-500/40">
          Official API Reference
        </span>
        <h1 className="text-2xl font-black text-white mt-1">Документация Burmalda B2B API</h1>
        <p className="text-xs text-slate-300 mt-1">
          Техническое руководство по интегрированию геопространственных показателей в банковские скоринговые системы.
        </p>
      </div>

      {/* Section 1: Authentication */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-cyan-400" />
          <span>1. Authentication (Аутентификация)</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Все запросы к API Burmalda требуют передачи ключа авторизации в заголовке `Authorization` с префиксом `Bearer`:
        </p>
        <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs">
          Authorization: Bearer ar_demo_98f4a1b87c2049e29a83
        </pre>
      </div>

      {/* Section 2: Endpoints */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>2. Endpoints (Конечные точки)</span>
        </h3>
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="font-mono font-bold text-emerald-400">GET /api/v1/passports/{'{id}'}</span>
            <p className="text-slate-300 mt-1">Возвращает полные показатели верифицированного паспорта хозяйства.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="font-mono font-bold text-emerald-400">GET /api/v1/risk/{'{id}'}</span>
            <p className="text-slate-300 mt-1">Возвращает пространственные риски засухи, пожаров и эрозии почв.</p>
          </div>
        </div>
      </div>

      {/* Section 3: Responses & Errors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-base font-extrabold text-white">3. Responses & Format</h3>
          <p className="text-xs text-slate-300">
            Все ответы возвращаются в формате `application/json` в кодировке UTF-8 с полем статуса `200 OK`.
          </p>
        </div>
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-base font-extrabold text-white">4. Errors & Rate Limits</h3>
          <p className="text-xs text-slate-300">
            Коды ошибок: `401 Unauthorized`, `404 Not Found`, `429 Too Many Requests` (лимит Sandbox: 100 req/min).
          </p>
        </div>
      </div>

      {/* Section 5: Code Example */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span>5. Code Example (cURL / Python)</span>
        </h3>
        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-amber-300 font-mono text-xs overflow-x-auto">
{`curl -X GET "https://agroradar.kz/api/v1/passports/AR-2026-000124" \\
  -H "Authorization: Bearer ar_demo_98f4a1b87c2049e29a83" \\
  -H "Accept: application/json"`}
        </pre>
      </div>
    </div>
  );
};
