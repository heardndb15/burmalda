import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AgroMap } from '../components/map/AgroMap';
import { herdsData } from '../data/herds';
import { dangerZonesData } from '../data/dangerZones';
import { waterSourcesData } from '../data/waterSources';
import { getDistanceToPolyline } from '../services/geo/distance';
import {
  ArrowLeft, Footprints, Radio, Droplets, ShieldAlert,
  Navigation, Phone, AlertTriangle, CheckCircle, MapPin
} from 'lucide-react';

export const HerdDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { herds } = useApp();

  const herd = herds.find((h) => h.id === id) || herdsData.find((h) => h.id === id) || herdsData[0];
  const [isLiveTracking, setIsLiveTracking] = useState(herd.isLiveTracking);

  // Live distance to road computed from demo data
  const road = dangerZonesData.find((d) => d.type === 'road');
  const [distanceToRoad, setDistanceToRoad] = useState(herd.distanceToRoadMeters);
  const [liveLocation, setLiveLocation] = useState<[number, number]>(herd.currentLocation);

  useEffect(() => {
    if (!isLiveTracking) return;

    const interval = setInterval(() => {
      const latNoise = (Math.random() - 0.5) * 0.0005;
      const lngNoise = (Math.random() - 0.5) * 0.0005;
      const newLat = liveLocation[0] + latNoise;
      const newLng = liveLocation[1] + lngNoise;
      setLiveLocation([newLat, newLng]);

      if (road) {
        const dist = getDistanceToPolyline(newLat, newLng, road.coordinates);
        setDistanceToRoad(Math.round(dist));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveTracking, liveLocation]);

  const dtpSeverity = distanceToRoad < 300 ? 'critical' : distanceToRoad < 500 ? 'warning' : 'safe';
  const animalIcon = herd.animalType === 'cattle' ? '🐄' : herd.animalType === 'horse' ? '🐎' : '🐑';

  // Nearest water source distance
  const nearestWater = waterSourcesData
    .map((w) => ({
      ...w,
      dist: getDistanceToPolyline(liveLocation[0], liveLocation[1], [w.coordinates]),
    }))
    .sort((a, b) => a.dist - b.dist)[0];

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
      <div
        className={`glass-panel p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border ${
          dtpSeverity === 'critical'
            ? 'border-red-500/50 bg-red-950/10'
            : dtpSeverity === 'warning'
            ? 'border-amber-500/40'
            : 'border-blue-500/30'
        }`}
      >
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-2">
            <Radio className="w-3.5 h-3.5" />
            <span>GPS-Мониторинг Стада</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {animalIcon} {herd.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Поголовье: <strong>{herd.headCount} животных</strong> · Пастух: <strong>{herd.shepherdName}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* DTP alert badge */}
          {dtpSeverity === 'critical' && (
            <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-red-950/60 border border-red-500/50 text-red-400 text-xs font-extrabold animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              <span>⚠️ {distanceToRoad} м от трассы!</span>
            </div>
          )}
          {dtpSeverity === 'warning' && (
            <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-400 text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>⚠️ {distanceToRoad} м от трассы</span>
            </div>
          )}

          <button
            onClick={() => setIsLiveTracking(!isLiveTracking)}
            className={`px-4 py-3 rounded-2xl font-extrabold text-xs shadow-lg transition flex items-center space-x-2 ${
              isLiveTracking
                ? 'bg-blue-600 text-white shadow-blue-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Radio className={`w-4 h-4 ${isLiveTracking ? 'animate-pulse' : ''}`} />
            <span>{isLiveTracking ? 'GPS Онлайн' : 'Включить GPS'}</span>
          </button>
        </div>
      </div>

      {/* Grid: Map & Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Map centred on this herd */}
        <div className="md:col-span-2 rounded-2xl overflow-hidden min-h-[440px]">
          <AgroMap
            center={liveLocation}
            zoom={13}
            herds={[{ ...herd, currentLocation: liveLocation, distanceToRoadMeters: distanceToRoad }]}
            showControls={false}
            height="h-full"
          />
        </div>

        <div className="space-y-4">
          {/* Live GPS Parameters */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              Параметры GPS (Реальное время)
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Координаты:</span>
                <strong className="text-white font-mono text-[10px]">
                  {liveLocation[0].toFixed(4)}, {liveLocation[1].toFixed(4)}
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Скорость:</span>
                <strong className="text-white">{herd.speedKmh} км/ч</strong>
              </div>
              <div className="flex justify-between">
                <span>Направление:</span>
                <strong className="text-white">{herd.headingDirection}</strong>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2">
                <span>Ближайший водопой:</span>
                <strong className="text-cyan-400">
                  💧 {nearestWater?.name} ({Math.round(nearestWater?.dist ?? 0)} м)
                </strong>
              </div>
              <div className="flex justify-between">
                <span>До трассы А-3:</span>
                <strong
                  className={
                    distanceToRoad < 500
                      ? 'text-red-400 font-extrabold'
                      : distanceToRoad < 1000
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }
                >
                  {distanceToRoad} м
                  {distanceToRoad < 500 ? ' 🚨' : distanceToRoad < 1000 ? ' ⚠️' : ' ✓'}
                </strong>
              </div>
            </div>
          </div>

          {/* Anti-DTP Status */}
          <div
            className={`glass-panel p-4 rounded-2xl border space-y-2 ${
              dtpSeverity === 'critical'
                ? 'border-red-500/50 bg-red-950/10'
                : dtpSeverity === 'warning'
                ? 'border-amber-500/40 bg-amber-950/10'
                : 'border-emerald-500/30 bg-emerald-950/10'
            }`}
          >
            <div className="flex items-center space-x-2">
              {dtpSeverity === 'critical' ? (
                <>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <h4 className="text-sm font-extrabold text-red-400">КРИТИЧЕСКАЯ ОПАСНОСТЬ</h4>
                </>
              ) : dtpSeverity === 'warning' ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-amber-400">Приближение к трассе</h4>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-bold text-emerald-400">Стадо в безопасности</h4>
                </>
              )}
            </div>
            <p className="text-xs text-slate-300">
              {dtpSeverity === 'critical'
                ? `Стадо находится в ${distanceToRoad} м от автомагистрали. Требуется немедленный отзыв пастуха!`
                : dtpSeverity === 'warning'
                ? `Дистанция до трассы А-3 сократилась до ${distanceToRoad} м. Рекомендуется корректировка маршрута.`
                : `Минимальное расстояние до опасных зон: ${distanceToRoad} м. Продолжайте мониторинг.`}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => alert(`Экстренный вызов пастуху ${herd.shepherdName}!`)}
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Вызвать пастуха ({herd.shepherdName})</span>
            </button>
            <button
              onClick={() => alert('Маршрут сформирован!')}
              className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-1.5"
            >
              <Navigation className="w-4 h-4" />
              <span>Перевести стадо</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
