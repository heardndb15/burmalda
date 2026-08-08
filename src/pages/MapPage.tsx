import React from 'react';
import { AgroMap } from '../components/map/AgroMap';
import { useApp } from '../context/AppContext';
import { Radio, Trees, Droplets, ShieldAlert } from 'lucide-react';

export const MapPage: React.FC = () => {
  const { pastures, herds } = useApp();

  return (
    <div className="space-y-4">
      {/* Top Map Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-panel p-3 rounded-xl flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-xs">
            <Trees className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 font-semibold uppercase">Пастбища</span>
            <span className="text-sm font-extrabold text-white">{pastures.length} участков (3480 га)</span>
          </div>
        </div>

        <div className="glass-panel p-3 rounded-xl flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center font-bold text-xs">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 font-semibold uppercase">Стадо на карте</span>
            <span className="text-sm font-extrabold text-white">{herds.reduce((acc, h) => acc + h.headCount, 0)} голов</span>
          </div>
        </div>

        <div className="glass-panel p-3 rounded-xl flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-xs">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 font-semibold uppercase">Водопои</span>
            <span className="text-sm font-extrabold text-white">3 объекта (Озеро + Скважины)</span>
          </div>
        </div>

        <div className="glass-panel p-3 rounded-xl flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-red-950 text-red-400 flex items-center justify-center font-bold text-xs">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 font-semibold uppercase">Опасные зоны</span>
            <span className="text-sm font-extrabold text-red-400">Трасса А-3 (430м)</span>
          </div>
        </div>
      </div>

      {/* Main Fullscreen Interactive Map */}
      <AgroMap height="h-[calc(100vh-210px)]" />
    </div>
  );
};
