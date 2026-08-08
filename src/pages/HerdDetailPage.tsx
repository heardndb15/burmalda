import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AgroMap } from '../components/map/AgroMap';
import { ArrowLeft, Footprints, Radio, Droplets, ShieldAlert, Navigation, Phone } from 'lucide-react';

export const HerdDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { herds } = useApp();

  const herd = herds.find((h) => h.id === id) || herds[0];
  const [isLiveTracking, setIsLiveTracking] = useState(herd.isLiveTracking);

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        to="/herd"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Назад к списку стад</span>
      </Link>

      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-2">
            <Radio className="w-3.5 h-3.5" />
            <span>GPS-Мониторинг Стада #{herd.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{herd.name}</h1>
          <p className="text-xs text-slate-300 mt-1">
            Поголовье: <strong>{herd.headCount} животных</strong> · Пастух: <strong>{herd.shepherdName}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsLiveTracking(!isLiveTracking)}
            className={`px-4 py-3 rounded-2xl font-extrabold text-xs shadow-lg transition flex items-center space-x-2 ${
              isLiveTracking
                ? 'bg-blue-600 text-white animate-pulse shadow-blue-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>{isLiveTracking ? 'Режим слежения ON' : 'Включить слежение'}</span>
          </button>
        </div>
      </div>

      {/* Grid: Map & Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-2xl overflow-hidden min-h-[440px]">
          <AgroMap height="h-full" />
        </div>

        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              Текущие параметры GPS
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Скорость перемещения:</span>
                <strong className="text-white">{herd.speedKmh} км/ч</strong>
              </div>
              <div className="flex justify-between">
                <span>Направление:</span>
                <strong className="text-white">{herd.headingDirection}</strong>
              </div>
              <div className="flex justify-between">
                <span>Ближайший водопой:</span>
                <strong className="text-cyan-400">💧 {herd.nearestWaterName} ({herd.nearestWaterDistanceMeters} м)</strong>
              </div>
              <div className="flex justify-between">
                <span>До трассы А-3:</span>
                <strong className={herd.distanceToRoadMeters < 500 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                  🔴 {herd.distanceToRoadMeters} м
                </strong>
              </div>
              <div className="flex justify-between">
                <span>ID Трекера:</span>
                <strong className="text-white">{herd.trackerId}</strong>
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white">Связь с пастухом</h3>
            <p className="text-xs text-slate-400">Пастух: {herd.shepherdName}</p>
            <a
              href="tel:+77015554321"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-slate-700 flex items-center justify-center space-x-2 transition"
            >
              <Phone className="w-4 h-4" />
              <span>Позвонить пастуху</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
