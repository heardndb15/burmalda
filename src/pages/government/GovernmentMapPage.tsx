import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../../context/AppContext';
import { Layers, Flame, FileText, CheckSquare, History, ShieldAlert, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dangerZonesData } from '../../data/dangerZones';

type ActiveLayer = 'pastures' | 'land_use' | 'density' | 'infrastructure';
type HeatmapMode = 'pasture_health' | 'livestock_load' | 'degradation' | 'land_use' | 'water_access' | 'risks';

export const GovernmentMapPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);

  const { pastures, addAuditLog, addInspectionTask } = useApp();
  const navigate = useNavigate();

  const [activeLayer, setActiveLayer] = useState<ActiveLayer>('pastures');
  const [heatmapMode, setHeatmapMode] = useState<HeatmapMode>('livestock_load');
  const [selectedPlot, setSelectedPlot] = useState<{
    id: string;
    number: string;
    farmName: string;
    areaHa: number;
    currentLoad: number;
    recommendedLoad: number;
    health: 'good' | 'medium' | 'depleted';
    dynamics: string;
    waterSourcesCount: number;
    lastMonitoringDate: string;
  } | null>({
    id: 'plot-124',
    number: '124',
    farmName: 'КХ «Береке»',
    areaHa: 1240,
    currentLoad: 0.11,
    recommendedLoad: 0.08,
    health: 'medium',
    dynamics: '↓ -12% за сезон',
    waterSourcesCount: 2,
    lastMonitoringDate: '08.08.2026',
  });

  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Initialize District Map
  useEffect(() => {
    if (!mapRef.current || leafletInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [43.655, 77.165],
      zoom: 11,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    layersGroupRef.current = L.layerGroup().addTo(map);
    leafletInstance.current = map;

    return () => {
      map.remove();
      leafletInstance.current = null;
    };
  }, []);

  // Render District Layers & Heatmap Overlay
  useEffect(() => {
    if (!leafletInstance.current || !layersGroupRef.current) return;

    const group = layersGroupRef.current;
    group.clearLayers();

    // Render Pasture Polygons
    pastures.forEach((p, idx) => {
      let fillColor = p.health === 'good' ? '#10B981' : p.health === 'medium' ? '#F59E0B' : '#EF4444';
      
      // If Heatmap is active, adjust color based on Heatmap Mode
      if (heatmapMode === 'livestock_load') {
        fillColor = idx === 0 ? '#EF4444' : idx === 1 ? '#F59E0B' : '#10B981'; // Red: High, Yellow: Elevated, Green: Optimal
      } else if (heatmapMode === 'degradation') {
        fillColor = p.health === 'depleted' ? '#EF4444' : '#F59E0B';
      } else if (heatmapMode === 'land_use') {
        fillColor = idx === 1 ? '#3B82F6' : '#10B981';
      }

      const polygon = L.polygon(p.coordinates, {
        color: fillColor,
        fillColor: fillColor,
        fillOpacity: heatmapMode === 'livestock_load' ? 0.6 : 0.4,
        weight: 3,
      });

      polygon.on('click', () => {
        setSelectedPlot({
          id: `plot-${124 + idx}`,
          number: `${124 + idx * 4}`,
          farmName: idx === 0 ? 'КХ «Береке»' : idx === 1 ? 'Агро-Шаруашылық "Өтеген батыр"' : 'КХ «Ак-Булак»',
          areaHa: p.areaHectares,
          currentLoad: idx === 0 ? 0.11 : 0.07,
          recommendedLoad: 0.08,
          health: p.health,
          dynamics: idx === 0 ? '↓ -12% за сезон' : '↑ +5% вегетация',
          waterSourcesCount: p.waterSources.length || 1,
          lastMonitoringDate: '08.08.2026',
        });
      });

      polygon.bindTooltip(
        `<div style="font-weight:bold; color:white;">Участок №${124 + idx * 4} (${p.name})</div>
         <div style="font-size:11px; opacity:0.9;">КХ «Береке» · ${p.areaHectares} га · NDVI: ${p.ndviScore}</div>`,
        { permanent: false }
      );

      group.addLayer(polygon);
    });

    // Danger Zones Layer (roads, railways, erosion risk) — required for district oversight
    dangerZonesData.forEach((dz) => {
      const color = dz.severity === 'critical' ? '#EF4444' : dz.severity === 'warning' ? '#F59E0B' : '#3B82F6';
      const polyline = L.polyline(dz.coordinates, {
        color,
        weight: dz.severity === 'critical' ? 5 : 3,
        dashArray: '8, 8',
      });
      polyline.bindTooltip(`<b>${dz.name}</b>`, { permanent: false });
      group.addLayer(polyline);
    });

    // Infrastructure Layer (Roads, Wells, Settlements)
    if (activeLayer === 'infrastructure' || true) {
      const wells = [
        { name: 'Скважина Акимата №1', coords: [43.675, 77.130] as [number, number] },
        { name: 'Водопой «Жайлау»', coords: [43.625, 77.215] as [number, number] },
      ];
      wells.forEach((w) => {
        const icon = L.divIcon({
          className: 'well-icon',
          html: `<div style="background:#0284c7; color:white; border-radius:999px; width:26px; height:26px; display:flex; align-items:center; justify-center; border:2px solid white; font-size:12px; box-shadow:0 2px 8px rgba(0,0,0,0.5);">💧</div>`,
          iconSize: [26, 26],
        });
        const m = L.marker(w.coords, { icon });
        m.bindTooltip(`<b>${w.name}</b>`);
        group.addLayer(m);
      });
    }
  }, [pastures, heatmapMode, activeLayer]);

  const handleSendForInspection = () => {
    if (!selectedPlot) return;
    addInspectionTask({
      plotId: selectedPlot.id,
      plotName: `Участок №${selectedPlot.number}`,
      ownerName: selectedPlot.farmName,
      assignedTo: 'Инспектор Акимата',
      reason: 'Превышение нагрузки и риск деградации по спутниковым данным',
    });
    addAuditLog({
      userRole: 'AKIMAT_ADMIN',
      userName: 'Сотрудник акимата',
      action: 'Отправка участка на проверку',
      target: `Участок №${selectedPlot.number} (${selectedPlot.farmName})`,
      ipAddress: '127.0.0.1',
    });
    setNotificationMsg(`Участок №${selectedPlot.number} передан в отдел земельного инспектирования.`);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Top Controls Header */}
      <div className="glass-panel p-4 rounded-2xl border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/40">
              B2G Map Engine
            </span>
            <span className="text-xs font-bold text-white">Илийский сельский округ</span>
          </div>
          <h2 className="text-lg font-black text-white">Главная карта акимата</h2>
        </div>

        {/* Layer Switcher & Heatmap Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer Controls */}
          <div className="flex items-center space-x-1 glass-panel p-1 rounded-xl border border-slate-800">
            <Layers className="w-3.5 h-3.5 text-amber-400 ml-2" />
            <button
              onClick={() => setActiveLayer('pastures')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                activeLayer === 'pastures' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Пастбища
            </button>
            <button
              onClick={() => setActiveLayer('land_use')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                activeLayer === 'land_use' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Земли
            </button>
            <button
              onClick={() => setActiveLayer('infrastructure')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                activeLayer === 'infrastructure' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Инфраструктура
            </button>
          </div>

          {/* Heatmap Selector */}
          <div className="flex items-center space-x-1.5 glass-panel p-1 rounded-xl border border-amber-500/30">
            <Flame className="w-4 h-4 text-orange-400 ml-1.5" />
            <select
              value={heatmapMode}
              onChange={(e) => setHeatmapMode(e.target.value as HeatmapMode)}
              className="bg-slate-900 text-amber-300 text-xs font-bold px-2 py-1 rounded-lg border border-slate-800 focus:outline-none"
            >
              <option value="pasture_health">Состояние пастбищ</option>
              <option value="livestock_load">🔥 Нагрузка скота (Heatmap)</option>
              <option value="degradation">Деградация</option>
              <option value="land_use">Использование земель</option>
              <option value="water_access">Водная обеспеченность</option>
              <option value="risks">Риски</option>
            </select>
          </div>
        </div>
      </div>

      {notificationMsg && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-in fade-in">
          ✓ {notificationMsg}
        </div>
      )}

      {/* Map Viewport & Legend */}
      <div className="relative w-full h-[calc(100vh-230px)] min-h-[500px] rounded-3xl overflow-hidden border border-amber-950/60 shadow-2xl">
        <div ref={mapRef} className="w-full h-full z-10" />

        {/* Heatmap Indicator Legend */}
        {heatmapMode === 'livestock_load' && (
          <div className="absolute top-4 left-4 z-20 glass-panel p-3 rounded-2xl border border-amber-500/40 shadow-xl space-y-1.5">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Тепловая карта нагрузки</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-slate-200">Красный: Высокая нагрузка</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-slate-200">Жёлтый: Повышенная нагрузка</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-200">Зелёный: Оптимальная нагрузка</span>
              </div>
            </div>
          </div>
        )}

        {/* Section 8 Required: Pasture Details Modal / Drawer for Akimat */}
        {selectedPlot && (
          <div className="absolute bottom-4 right-4 z-20 glass-panel p-5 rounded-3xl border border-amber-500/40 shadow-2xl max-w-sm w-full animate-in slide-in-from-bottom duration-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider">
                  Анализ участка (Акимат)
                </span>
                <h4 className="text-base font-extrabold text-white">Участок №{selectedPlot.number}</h4>
              </div>
              <button
                onClick={() => setSelectedPlot(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300 my-3">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>КХ / Владелец:</span>
                <strong className="text-white">{selectedPlot.farmName}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Площадь:</span>
                <strong className="text-white">{selectedPlot.areaHa} га</strong>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Текущая нагрузка:</span>
                <strong className="text-amber-400 font-bold">{selectedPlot.currentLoad} УГС/га</strong>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Рекомендуемая:</span>
                <strong className="text-emerald-400">{selectedPlot.recommendedLoad} УГС/га</strong>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Состояние:</span>
                <strong className={selectedPlot.health === 'good' ? 'text-emerald-400' : 'text-amber-400'}>
                  {selectedPlot.health === 'good' ? '🟢 Хорошее' : '🟡 Среднее'}
                </strong>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Динамика:</span>
                <strong className="text-red-400 font-bold">{selectedPlot.dynamics}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Водные источники:</span>
                <strong className="text-white">💧 {selectedPlot.waterSourcesCount} источника</strong>
              </div>
              <div className="flex justify-between">
                <span>Последний мониторинг:</span>
                <span className="text-slate-400">{selectedPlot.lastMonitoringDate}</span>
              </div>
            </div>

            {/* 3 Action Buttons Required by #8 Prompt */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <button
                onClick={() => navigate('/government/reports')}
                className="px-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] flex flex-col items-center justify-center space-y-1 transition"
              >
                <History className="w-3.5 h-3.5 text-amber-400" />
                <span>История</span>
              </button>
              <button
                onClick={() => navigate('/government/reports')}
                className="px-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] flex flex-col items-center justify-center space-y-1 transition"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Отчёт</span>
              </button>
              <button
                onClick={handleSendForInspection}
                className="px-2 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] flex flex-col items-center justify-center space-y-1 shadow-md transition"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>На проверку</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
