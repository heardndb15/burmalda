import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AgroMap } from '../components/map/AgroMap';
import { pasturesData } from '../data/pastures';
import { NDVIEngine } from '../services/satellite/NDVIEngine';
import { RecommendationEngine } from '../services/recommendations/recommendationEngine';
import {
  ArrowLeft, Trees, Droplets, Calendar, Sparkles, Navigation,
  TrendingDown, TrendingUp, AlertTriangle
} from 'lucide-react';

export const PastureDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { pastures } = useApp();

  // First look in context pastures (may have extra entries), fallback to demo data
  const contextPasture = pastures.find((p) => p.id === id);
  const demoPasture = pasturesData.find((p) => p.id === id) || pasturesData[0];
  const pasture = contextPasture || demoPasture;

  const analysis = NDVIEngine.analyzeNDVI(pasture.ndviScore);
  const recommendation = RecommendationEngine.generatePastureRecommendation(pasture);

  const ndviHistory = pasture.history || demoPasture.history;
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(ndviHistory.length - 1);
  const currentHistory = ndviHistory[selectedMonthIdx];

  const ndviMax = Math.max(...ndviHistory.map((h) => h.ndvi));
  const ndviMin = Math.min(...ndviHistory.map((h) => h.ndvi));
  const ndviTrend = ndviHistory.length > 1
    ? ndviHistory[ndviHistory.length - 1].ndvi - ndviHistory[0].ndvi
    : 0;

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
            <span>Пастбищный участок</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{pasture.name}</h1>
          <p className="text-xs text-slate-300 mt-1">
            Площадь: <strong>{pasture.areaHectares} га</strong> · Вода:{' '}
            <strong>{pasture.hasWater ? '💧 Есть' : 'Нет'}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div
            className={`px-4 py-3 rounded-2xl border text-center min-w-[110px] ${analysis.colorClass}`}
          >
            <span className="block text-[10px] font-extrabold uppercase mb-1">Состояние</span>
            <span className="text-sm font-extrabold">{analysis.label}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-[100px]">
            <span className="block text-[10px] text-slate-400 font-semibold uppercase">NDVI</span>
            <span className="text-xl font-black text-emerald-400 font-mono">{pasture.ndviScore}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-[110px]">
            <span className="block text-[10px] text-slate-400 font-semibold uppercase">Запас корма</span>
            <span className="text-xl font-black text-amber-400">{pasture.feedDaysRemaining} дней</span>
          </div>
        </div>
      </div>

      {/* Smart Recommendation Banner */}
      {recommendation.actionRequired && (
        <div className="glass-panel p-4 rounded-2xl border border-red-500/40 bg-red-950/15 flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-extrabold text-red-400 mb-0.5">Требуется действие</p>
            <p className="text-xs text-slate-300">{recommendation.recommendation}</p>
          </div>
        </div>
      )}

      {/* NDVI History Timeline */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Динамика вегетации (NDVI История)</span>
          </h3>

          <div className="flex items-center space-x-2 text-xs">
            {ndviTrend >= 0 ? (
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                +{ndviTrend.toFixed(2)} за сезон
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-400 font-bold">
                <TrendingDown className="w-3.5 h-3.5" />
                {ndviTrend.toFixed(2)} за сезон
              </span>
            )}
          </div>
        </div>

        {/* Month selector buttons */}
        <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${ndviHistory.length}, 1fr)` }}>
          {ndviHistory.map((hist, idx) => {
            const isGood = hist.health === 'good';
            const isMedium = hist.health === 'medium';
            const barHeight = Math.round((hist.ndvi / ndviMax) * 80);

            return (
              <button
                key={hist.month}
                onClick={() => setSelectedMonthIdx(idx)}
                className={`p-3 rounded-xl border text-center transition ${
                  selectedMonthIdx === idx
                    ? 'bg-emerald-950 border-emerald-500 text-white shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {/* Mini bar chart */}
                <div className="flex flex-col items-center mb-2">
                  <div className="w-full flex items-end justify-center h-12">
                    <div
                      className={`w-4 rounded-t transition-all ${
                        isGood ? 'bg-emerald-500' : isMedium ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ height: `${barHeight}px` }}
                    />
                  </div>
                </div>
                <span className="block text-xs font-bold mb-1">{hist.month}</span>
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                    isGood
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : isMedium
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {hist.ndvi}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected month detail */}
        {currentHistory && (
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-800">
            <div className="bg-slate-900 rounded-xl p-3 text-center">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">NDVI</span>
              <span className="text-lg font-black text-emerald-400 font-mono">{currentHistory.ndvi}</span>
            </div>
            <div className="bg-slate-900 rounded-xl p-3 text-center">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Запас корма</span>
              <span className="text-lg font-black text-amber-400">{currentHistory.feedDays} дн.</span>
            </div>
            <div className="bg-slate-900 rounded-xl p-3 text-center">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Статус</span>
              <span className={`text-sm font-extrabold ${
                currentHistory.health === 'good' ? 'text-emerald-400' :
                currentHistory.health === 'medium' ? 'text-amber-400' : 'text-red-400'
              }`}>
                {currentHistory.health === 'good' ? '🟢 Хорошее' :
                 currentHistory.health === 'medium' ? '🟡 Среднее' : '🔴 Истощение'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Map & Recommendations Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-2xl overflow-hidden min-h-[420px]">
          <AgroMap
            center={pasture.center as [number, number] | undefined}
            zoom={13}
            pastures={[pasture]}
            height="h-full"
            showControls={false}
          />
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Рекомендация Burmalda</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs leading-relaxed space-y-2">
              <p className={`font-bold ${analysis.severity === 'critical' ? 'text-red-400' : analysis.severity === 'warning' ? 'text-amber-400' : 'text-emerald-400'}`}>
                {analysis.recommendation}
              </p>
              <p className="text-slate-400">
                Примерный запас корма: <strong className="text-white">{analysis.feedDays} дней</strong>
              </p>
              {pasture.waterSources.length > 0 && (
                <p className="text-slate-400">
                  💧 Источники воды: {pasture.waterSources.join(', ')}
                </p>
              )}
              {pasture.notes && (
                <p className="text-slate-500 italic border-t border-slate-800 pt-2">{pasture.notes}</p>
              )}
            </div>

            <div className="p-3 rounded-xl bg-amber-950/10 border border-amber-500/20 text-[10px] text-amber-300/70">
              ℹ️ Данные NDVI получены из демонстрационного провайдера (MockSatelliteProvider). Для продакшена подключите Sentinel-2 / Landsat-9.
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
