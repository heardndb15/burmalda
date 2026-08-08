import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AgroMap } from '../components/map/AgroMap';
import { ArrowLeft, Trees, Droplets, Calendar, Sparkles, Navigation } from 'lucide-react';

export const PastureDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { pastures } = useApp();

  const pasture = pastures.find((p) => p.id === id) || pastures[0];

  const months = ['Май', 'Июнь', 'Июль', 'Август'];
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(3); // August default

  const currentHistory = pasture.history[selectedMonthIdx] || pasture.history[pasture.history.length - 1];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        to="/pastures"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Назад к списку пастбищ</span>
      </Link>

      {/* Header Info Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <Trees className="w-3.5 h-3.5" />
            <span>Пастбищный участок #{pasture.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{pasture.name}</h1>
          <p className="text-xs text-slate-300 mt-1">
            Площадь: <strong>{pasture.areaHectares} га</strong> · Режим водопоя: <strong>{pasture.hasWater ? '💧 Есть' : 'Нет'}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-[100px]">
            <span className="block text-[10px] text-slate-400 font-semibold uppercase">NDVI Индекс</span>
            <span className="text-xl font-black text-emerald-400">{currentHistory?.ndvi || pasture.ndviScore}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-[110px]">
            <span className="block text-[10px] text-slate-400 font-semibold uppercase">Кормовой запас</span>
            <span className="text-xl font-black text-amber-400">{currentHistory?.feedDays || pasture.feedDaysRemaining} дней</span>
          </div>
        </div>
      </div>

      {/* Seasonal NDVI Timeline Slider */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Сезонная динамика вегетации (NDVI Timeline)</span>
          </h3>
          <span className="text-xs font-extrabold text-emerald-400">
            Выбран месяц: {months[selectedMonthIdx]}
          </span>
        </div>

        {/* Timeline Slider Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {months.map((m, idx) => {
            const hist = pasture.history[idx];
            const isGood = hist?.health === 'good';
            const isMedium = hist?.health === 'medium';

            return (
              <button
                key={m}
                onClick={() => setSelectedMonthIdx(idx)}
                className={`p-3 rounded-xl border text-center transition ${
                  selectedMonthIdx === idx
                    ? 'bg-emerald-950 border-emerald-500 text-white shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span className="block text-xs font-bold mb-1">{m}</span>
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                    isGood
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : isMedium
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  NDVI {hist?.ndvi || '0.5'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map & Recommendations Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-2xl overflow-hidden min-h-[420px]">
          <AgroMap height="h-full" />
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Рекомендация автопилота</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs leading-relaxed space-y-2">
              <p className="text-slate-200">
                {pasture.health === 'depleted' ? (
                  <strong className="text-red-400">
                    ⚠️ Участок истощён. Рекомендуется дать земле отдых минимум 25 дней для восстановления травостоя.
                  </strong>
                ) : (
                  <strong className="text-emerald-400">
                    🟢 Участок находится в отличной форме. Кормовой запас пригоден для выпаса КРС.
                  </strong>
                )}
              </p>
              <p className="text-slate-400">
                Источники воды на участке: {pasture.waterSources.join(', ') || 'Отсутствуют'}.
              </p>
            </div>
          </div>

          <button
            onClick={() => alert('Маршрут сформирован и передан пастуху!')}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-1.5"
          >
            <Navigation className="w-4 h-4" />
            <span>Сформировать маршрут ротации</span>
          </button>
        </div>
      </div>
    </div>
  );
};
