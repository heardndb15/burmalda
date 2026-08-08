import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, MapPin, Trees, Footprints, Radio, Users, Building, ShieldCheck } from 'lucide-react';

export const FarmPage: React.FC = () => {
  const { farm, pastures, herds, trackers, workers, t } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <Building className="w-3.5 h-3.5" />
            <span>ID Хозяйства #{farm.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{farm.name}</h1>
          <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            {farm.region}, {farm.district}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-extrabold text-xs flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Верифицировано Акиматом
          </span>
        </div>
      </div>

      {/* Grid Specs */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            Общие характеристики
          </h3>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Владелец:</span>
              <strong className="text-white">{farm.ownerName}</strong>
            </div>
            <div className="flex justify-between">
              <span>Телефон:</span>
              <strong className="text-white">{farm.phone}</strong>
            </div>
            <div className="flex justify-between">
              <span>Email:</span>
              <strong className="text-white">{farm.email}</strong>
            </div>
            <div className="flex justify-between">
              <span>{t('totalArea')}</span>
              <strong className="text-emerald-400">{farm.areaHectares} га</strong>
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            Состав поголовья ({farm.totalAnimals} голов)
          </h3>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>🐄 КРС (Коровы):</span>
              <strong className="text-white">{farm.cattleCount} голов</strong>
            </div>
            <div className="flex justify-between">
              <span>🐎 Лошади:</span>
              <strong className="text-white">{farm.horseCount} голов</strong>
            </div>
            <div className="flex justify-between">
              <span>🐑 Овцы:</span>
              <strong className="text-white">{farm.sheepCount} голов</strong>
            </div>
            <div className="flex justify-between">
              <span>🐐 Козы:</span>
              <strong className="text-white">{farm.goatCount} голов</strong>
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            Инфраструктура AgroRadar
          </h3>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Пастбищные участки:</span>
              <strong className="text-emerald-400">{pastures.length} участков</strong>
            </div>
            <div className="flex justify-between">
              <span>GPS-Трекеры:</span>
              <strong className="text-blue-400">{trackers.length} устройств</strong>
            </div>
            <div className="flex justify-between">
              <span>Пастухи:</span>
              <strong className="text-white">{workers.length} человек</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
