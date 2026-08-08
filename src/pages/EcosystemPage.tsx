import React from 'react';
import { Network, Building2, Landmark, UserCheck, Satellite, Radio, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const EcosystemPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserRole } = useApp();

  const handleNavigateRole = (role: 'AKIMAT_ADMIN' | 'BANK_ANALYST' | 'FARMER', path: string) => {
    setUserRole(role);
    navigate(path);
  };

  const monetizationPoints = [
    { title: 'Farmer', model: 'Free / Pro Subscription', desc: 'Мониторинг стада, карты пастбищ, тревоги безопасности.' },
    { title: 'Akimat (B2G)', model: 'Government Infrastructure Contract', desc: 'Цифровой округ, планирование пастбищ, земконтроль.' },
    { title: 'Bank / MFO (B2B)', model: 'API & Passport Subscription', desc: 'Оценка кормовых и пространственных рисков заёмщика.' },
    { title: 'Insurance Companies', model: 'Risk Intelligence API', desc: 'Страхование индексных засух и убытка поголовья.' },
    { title: 'Agro-Business / Suppliers', model: 'Analytics & Supply API', desc: 'Гео-аналитика кормовой потребности районов.' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 text-center space-y-2 bg-gradient-to-b from-emerald-950/20 to-slate-950">
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/40 inline-flex items-center gap-1.5">
          <Network className="w-3.5 h-3.5" />
          <span>Platform Ecosystem Architecture</span>
        </span>
        <h1 className="text-3xl font-black text-white">Инфраструктурная платформа Burmalda</h1>
        <p className="text-xs text-slate-300 max-w-2xl mx-auto">
          Один набор геоданных → разные продукты для Фермера, Акимата и Банка.
        </p>
      </div>

      {/* Section 39 Requirement: Interactive Ecosystem Diagram */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-8 text-center bg-slate-950/90 shadow-2xl">
        <h3 className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider">
          Интерактивная схема информационных потоков (Нажмите на узел)
        </h3>

        {/* Top Node: Akimat */}
        <div className="flex justify-center">
          <button
            onClick={() => handleNavigateRole('AKIMAT_ADMIN', '/government')}
            className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 hover:bg-amber-900/60 transition group max-w-xs w-full shadow-lg"
          >
            <Building2 className="w-8 h-8 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-base font-black text-white">Акиматы (B2G)</h4>
            <span className="text-[10px] text-amber-300 block mt-1">Цифровой сельский округ →</span>
          </button>
        </div>

        {/* Middle Row: Satellites -> Burmalda Core <- GPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <Satellite className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <h5 className="text-xs font-bold text-white">Спутники</h5>
            <span className="text-[10px] text-slate-400">Sentinel-2 & Landsat-9</span>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-950/60 border border-emerald-500/50 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white mx-auto mb-2">
              <Network className="w-5 h-5 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white">Burmalda Core Data Layer</h4>
            <span className="text-[10px] text-emerald-300 block">AI & Analytics Engine</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <Radio className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <h5 className="text-xs font-bold text-white">GPS-Трекеры</h5>
            <span className="text-[10px] text-slate-400">Телеметрия стада</span>
          </div>
        </div>

        {/* Bottom Row: Farmers & Banks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button
            onClick={() => handleNavigateRole('FARMER', '/app')}
            className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/60 transition group shadow-lg"
          >
            <UserCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-base font-black text-white">Фермеры КХ</h4>
            <span className="text-[10px] text-emerald-300 block mt-1">Farmer Platform →</span>
          </button>

          <button
            onClick={() => handleNavigateRole('BANK_ANALYST', '/bank')}
            className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 hover:bg-cyan-900/60 transition group shadow-lg"
          >
            <Landmark className="w-8 h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-base font-black text-white">Банки / МФО (B2B)</h4>
            <span className="text-[10px] text-cyan-300 block mt-1">Financial Risk Intelligence →</span>
          </button>
        </div>
      </div>

      {/* Section 40 Requirement: Platform Monetization Model */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold uppercase text-amber-400 tracking-wider flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          <span>Платформенная модель монетизации (Future Monetization Points)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {monetizationPoints.map((mp, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-black text-white block">{mp.title}</span>
              <span className="text-xs text-amber-400 font-bold block">{mp.model}</span>
              <p className="text-[11px] text-slate-400">{mp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
