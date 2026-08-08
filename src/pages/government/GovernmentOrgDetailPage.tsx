import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Building, Phone, User, FileText, ArrowLeft, ShieldCheck, MapPin } from 'lucide-react';

export const GovernmentOrgDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { organizations, financialPassports } = useApp();
  const navigate = useNavigate();

  const org = organizations.find((o) => o.id === id) || organizations[0];
  const passport = financialPassports.find((p) => p.bin === org.bin);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <button
        onClick={() => navigate('/government/organizations')}
        className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Назад к списку организаций</span>
      </button>

      {/* Profile Header */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/40">
            Профиль КХ / СПК
          </span>
          <h1 className="text-2xl font-black text-white mt-1">{org.name}</h1>
          <p className="text-xs text-slate-300 mt-0.5">БИН: {org.bin} · Кадастровый код: {org.cadastralCode}</p>
        </div>

        <button
          onClick={() => navigate('/government/map')}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center space-x-1.5 shrink-0 transition"
        >
          <MapPin className="w-4 h-4" />
          <span>Участки на карте</span>
        </button>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">Контакты и владелец</h3>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-slate-400" />
              <span>Глава КХ: <strong>{org.ownerName}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>Телефон: <strong>{org.phone}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-slate-400" />
              <span>Регион: <strong>{org.region}, {org.district}</strong></span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">Земля и поголовье</h3>
          <div className="space-y-2 text-xs text-slate-300">
            <div>Площадь земель: <strong className="text-white font-bold">{org.areaHectares} га</strong></div>
            <div>КРС: <strong className="text-white">{org.cattleCount} голов</strong></div>
            <div>Лошади: <strong className="text-white">{org.horseCount} голов</strong></div>
            <div>МРС: <strong className="text-white">{org.sheepCount} голов</strong></div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">AgroRadar Индикаторы</h3>
          <div className="space-y-2 text-xs text-slate-300">
            <div>Состояние пастбищ: <strong className="text-emerald-400 font-bold">🟢 Хорошее</strong></div>
            <div>Нагрузка скота: <strong className="text-amber-400 font-bold">0.08 УГС/га (Норма)</strong></div>
            {passport && (
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-bold flex items-center justify-between mt-2">
                <span>Financial Passport Score:</span>
                <span className="text-sm font-black">{passport.overallScore}/100</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
