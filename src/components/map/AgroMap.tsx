import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../../context/AppContext';
import { Pasture, Herd, WaterSource, DangerZone } from '../../types';
import { pasturesData } from '../../data/pastures';
import { herdsData } from '../../data/herds';
import { waterSourcesData } from '../../data/waterSources';
import { dangerZonesData } from '../../data/dangerZones';
import { getDistanceToPolyline } from '../../services/geo/distance';
import { MapLegend } from './MapLegend';
import { MapControls } from './MapControls';
import { Play, RotateCcw, AlertTriangle, Eye, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AgroMapProps {
  center?: [number, number];
  zoom?: number;
  pastures?: Pasture[];
  herds?: Herd[];
  waterSources?: WaterSource[];
  dangerZones?: DangerZone[];
  showNDVI?: boolean;
  height?: string;
  showControls?: boolean;
}

export const AgroMap: React.FC<AgroMapProps> = ({
  center = [43.655, 77.165],
  zoom = 12,
  pastures = pasturesData,
  herds = herdsData,
  waterSources = waterSourcesData,
  dangerZones = dangerZonesData,
  showNDVI = false,
  height = 'h-[calc(100vh-140px)]',
  showControls = true,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);

  const { addNotification } = useApp();
  const navigate = useNavigate();
  const alertTierRef = useRef<Record<string, 'warning' | 'emergency' | 'critical' | null>>({});

  // Map state controls
  const [mapLayers, setMapLayers] = useState({
    pastures: true,
    herds: true,
    waterSources: true,
    dangerZones: true,
    showNDVI,
  });

  const [activeHerds, setActiveHerds] = useState<Herd[]>(herds);
  const [activePastures, setActivePastures] = useState<Pasture[]>(pastures);
  const [demoStep, setDemoStep] = useState<number | null>(null);
  const [demoText, setDemoText] = useState<string | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current || leafletInstance.current) return;

    const map = L.map(mapRef.current, {
      center: center,
      zoom: zoom,
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

  // Sync state prop with controls
  useEffect(() => {
    setMapLayers((prev) => ({ ...prev, showNDVI }));
  }, [showNDVI]);

  // GPS Simulation (Mock Movement) & Anti-DTP Logic
  useEffect(() => {
    if (demoStep !== null) return; // Freeze auto-move during demo script

    const interval = setInterval(() => {
      setActiveHerds((prevHerds) =>
        prevHerds.map((herd) => {
          // Add small random noise to simulate grazing movement
          const latNoise = (Math.random() - 0.5) * 0.0006;
          const lngNoise = (Math.random() - 0.5) * 0.0006;
          const newLat = herd.currentLocation[0] + latNoise;
          const newLng = herd.currentLocation[1] + lngNoise;

          // Compute distance to nearest highway
          const road = dangerZones.find((d) => d.type === 'road');
          let distanceMeters = herd.distanceToRoadMeters;
          if (road) {
            distanceMeters = getDistanceToPolyline(newLat, newLng, road.coordinates);
          }

          // Trigger warning messages in notifications dynamically if close to highway
          let status: 'safe' | 'warning' | 'danger' = 'safe';
          if (distanceMeters < 300) {
            status = 'danger';
          } else if (distanceMeters < 500) {
            status = 'danger';
          } else if (distanceMeters < 1000) {
            status = 'warning';
          }

          // Anti-DTP: push a notification into the shared notification system only
          // when the herd newly crosses a threshold (avoid re-alerting every tick)
          const tier: 'warning' | 'emergency' | 'critical' | null =
            distanceMeters < 300 ? 'critical' : distanceMeters < 500 ? 'emergency' : distanceMeters < 1000 ? 'warning' : null;
          const prevTier = alertTierRef.current[herd.id] ?? null;
          if (tier !== prevTier && tier !== null) {
            const messages: Record<'warning' | 'emergency' | 'critical', { title: string; message: string; type: 'warning' | 'danger' }> = {
              warning: {
                title: '⚠️ Приближение к опасной зоне',
                message: `${herd.name} приближается к опасной зоне (${distanceMeters} м).`,
                type: 'warning',
              },
              emergency: {
                title: '🚨 Экстренная ситуация',
                message: `${herd.name} находится в ${distanceMeters} м от дороги.`,
                type: 'danger',
              },
              critical: {
                title: '🚨 КРИТИЧЕСКАЯ ОПАСНОСТЬ',
                message: `${herd.name} находится в ${distanceMeters} м от дороги.`,
                type: 'danger',
              },
            };
            const alert = messages[tier];
            addNotification({ title: alert.title, message: alert.message, type: alert.type, link: `/herd/${herd.id}` });
          }
          alertTierRef.current[herd.id] = tier;

          return {
            ...herd,
            currentLocation: [newLat, newLng],
            distanceToRoadMeters: distanceMeters,
            status,
            routeHistory: [...herd.routeHistory, [newLat, newLng]],
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [demoStep, dangerZones]);

  // Draw/Redraw leaflet elements when layers state changes
  useEffect(() => {
    if (!leafletInstance.current || !layersGroupRef.current) return;

    const group = layersGroupRef.current;
    group.clearLayers();

    // 1. Draw Pastures
    if (mapLayers.pastures) {
      activePastures.forEach((p) => {
        let color = '#10B981'; // Good 80-100
        const score = Math.round(p.ndviScore * 100);

        if (score < 40) {
          color = '#EF4444'; // Depleted 0-39
        } else if (score < 60) {
          color = '#F97316'; // Weakened 40-59
        } else if (score < 80) {
          color = '#F59E0B'; // Medium 60-79
        }

        const polygon = L.polygon(p.coordinates, {
          color: color,
          fillColor: color,
          fillOpacity: mapLayers.showNDVI ? 0.6 : 0.35,
          weight: 2,
        });

        const popupContent = L.DomUtil.create('div', 'p-2 space-y-1.5 text-xs text-slate-100');
        popupContent.innerHTML = `
          <h4 class="font-extrabold text-white text-sm">${p.name}</h4>
          <div>Состояние: <strong class="text-emerald-400">${score >= 80 ? '🟢 Хорошее' : score >= 60 ? '🟡 Среднее' : score >= 40 ? '🟠 Ослабленное' : '🔴 Истощённое'}</strong></div>
          <div>NDVI: <strong class="text-amber-400">${p.ndviScore}</strong></div>
          <div>Запас: <strong class="text-white">${p.feedDaysRemaining} дней</strong></div>
          <div>Площадь: <strong class="text-white">${p.areaHectares} га</strong></div>
          <div>Вода: <strong class="text-white">${p.hasWater ? '✓ Есть' : 'Нет'}</strong></div>
        `;

        const detailsBtn = L.DomUtil.create('button', 'w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs mt-2 transition', popupContent);
        detailsBtn.innerText = 'Подробнее';
        L.DomEvent.on(detailsBtn, 'click', () => {
          navigate(`/pastures/${p.id}`);
        });

        polygon.bindPopup(popupContent, { minWidth: 160 });
        group.addLayer(polygon);
      });
    }

    // 2. Draw Danger Zones (Roads & Railways)
    if (mapLayers.dangerZones) {
      dangerZones.forEach((dz) => {
        const color = dz.severity === 'critical' ? '#EF4444' : dz.severity === 'warning' ? '#F59E0B' : '#3B82F6';
        const polyline = L.polyline(dz.coordinates, {
          color: color,
          weight: dz.severity === 'critical' ? 5 : 3,
          dashArray: '8, 8',
        });

        polyline.bindTooltip(`<b>${dz.name}</b>`, { permanent: false });
        group.addLayer(polyline);
      });
    }

    // 3. Draw Water Sources
    if (mapLayers.waterSources) {
      waterSources.forEach((w) => {
        const waterIcon = L.divIcon({
          className: 'custom-water-marker',
          html: `<div style="background:#0284c7; color:white; border-radius:999px; padding:5px; box-shadow:0 2px 6px rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; width:26px; height:26px; border:2.5px solid white; font-size:12px;">💧</div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });

        const marker = L.marker(w.coordinates, { icon: waterIcon });
        marker.bindPopup(`
          <div class="p-1 space-y-1 text-xs">
            <h4 class="font-extrabold text-slate-800">💧 ${w.name}</h4>
            <div>Тип: <b>${w.type === 'well' ? 'Скважина' : w.type === 'lake' ? 'Озеро' : 'Река'}</b></div>
            <div>Статус: <strong class="text-emerald-600">Доступен</strong></div>
          </div>
        `);
        group.addLayer(marker);
      });
    }

    // 4. Draw Herds
    if (mapLayers.herds) {
      activeHerds.forEach((h) => {
        const isWarning = h.status === 'warning' || h.status === 'danger';
        const herdIcon = L.divIcon({
          className: 'custom-herd-marker',
          html: `
            <div style="background:${isWarning ? '#EF4444' : '#10B981'}; color:white; border-radius:10px; padding:3px 6px; font-weight:bold; font-size:10px; display:flex; align-items:center; gap:3px; border:2.5px solid white; box-shadow:0 3px 8px rgba(0,0,0,0.4); white-space:nowrap;" class="${isWarning ? 'danger-pulse-marker animate-pulse' : ''}">
              <span>${h.animalType === 'cattle' ? '🐄' : h.animalType === 'horse' ? '🐎' : '🐑'}</span>
              <span>${h.name} (${h.headCount})</span>
            </div>
          `,
          iconSize: [110, 26],
          iconAnchor: [55, 13],
        });

        const marker = L.marker(h.currentLocation, { icon: herdIcon });

        const popupContent = L.DomUtil.create('div', 'p-2 space-y-1 text-xs');
        popupContent.innerHTML = `
          <h4 class="font-extrabold text-slate-800">${h.name}</h4>
          <div>Поголовье: <strong>${h.headCount} животных</strong></div>
          <div>Пастух: <strong>${h.shepherdName}</strong></div>
          <div>GPS: <strong class="text-emerald-600">Онлайн</strong></div>
          <div>До трассы: <strong class="${h.distanceToRoadMeters < 500 ? 'text-red-600 font-bold' : 'text-slate-800'}">${h.distanceToRoadMeters} м</strong></div>
        `;

        const detailsBtn = L.DomUtil.create('button', 'w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs mt-2 transition', popupContent);
        detailsBtn.innerText = 'Открыть стадо';
        L.DomEvent.on(detailsBtn, 'click', () => {
          navigate(`/herd/${h.id}`);
        });

        marker.bindPopup(popupContent, { minWidth: 160 });
        group.addLayer(marker);

        // Draw trail route history
        if (h.routeHistory && h.routeHistory.length > 1) {
          const path = L.polyline(h.routeHistory, {
            color: isWarning ? '#F97316' : '#3B82F6',
            weight: 2.5,
            opacity: 0.6,
          });
          group.addLayer(path);
        }
      });
    }
  }, [mapLayers, activeHerds, activePastures]);

  // Demo Script Execution Timeline (Section 29 Prompt)
  const handleLaunchDemo = async () => {
    // Step 1: Center pastures
    setDemoStep(1);
    setDemoText('Шаг 1: Карта загружает контуры пастбищ хозяйства КХ «Өтеген батыр»...');
    leafletInstance.current?.setView([43.655, 77.165], 12);
    setMapLayers((prev) => ({ ...prev, showNDVI: false }));

    // Step 2: Enable NDVI Layer
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setDemoStep(2);
    setDemoText('Шаг 2: Включение спектрального слоя NDVI (Снимки Sentinel-2)...');
    setMapLayers((prev) => ({ ...prev, showNDVI: true }));

    // Step 3: Pasture 5 turns red
    await new Promise((resolve) => setTimeout(resolve, 3500));
    setDemoStep(3);
    setDemoText('Шаг 3: Вегетационный индекс пастбища №5 опускается до критического уровня (0.27)...');
    setActivePastures((prev) =>
      prev.map((p) => (p.id === 'pasture-5' ? { ...p, ndviScore: 0.18, health: 'depleted' } : p))
    );

    // Step 4: Display Alert
    await new Promise((resolve) => setTimeout(resolve, 3500));
    setDemoStep(4);
    setDemoText('🌱 Предупреждение: Пастбище №5 истощается! Недостаток кормового запаса.');

    // Step 5: Herd 2 starts moving
    await new Promise((resolve) => setTimeout(resolve, 3500));
    setDemoStep(5);
    setDemoText('Шаг 5: Стадо №2 (Табун) начинает бесконтрольное движение в сторону автомагистрали А-3...');
    setActiveHerds((prev) =>
      prev.map((h) =>
        h.id === 'herd-2'
          ? {
              ...h,
              currentLocation: [43.651, 77.140],
              distanceToRoadMeters: 620,
              status: 'warning',
            }
          : h
      )
    );

    // Step 6: Herd 2 gets closer
    await new Promise((resolve) => setTimeout(resolve, 3500));
    setDemoStep(6);
    setDemoText('Шаг 6: Дистанция до автомагистрали сократилась до опасного порога...');
    setActiveHerds((prev) =>
      prev.map((h) =>
        h.id === 'herd-2'
          ? {
              ...h,
              currentLocation: [43.649, 77.135],
              distanceToRoadMeters: 450,
              status: 'danger',
            }
          : h
      )
    );

    // Step 7: Push Emergency alert notification
    await new Promise((resolve) => setTimeout(resolve, 3500));
    setDemoStep(7);
    setDemoText('🚨 ТРЕВОГА (Анти-ДТП): Стадо №2 находится в 450 м от трассы А-3!');

    // Step 8: Recommendation suggestion
    await new Promise((resolve) => setTimeout(resolve, 4000));
    setDemoStep(8);
    setDemoText('💡 Рекомендация AgroRadar: переведите стадо №2 на участок №3 (Восточное) с хорошим запасом NDVI (0.84).');

    // End / reset scenario after 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 6000));
    setDemoStep(null);
    setDemoText(null);
    setActiveHerds(herdsData);
    setActivePastures(pasturesData);
    setMapLayers((prev) => ({ ...prev, showNDVI: false }));
  };

  return (
    <div className={`relative w-full ${height} rounded-3xl overflow-hidden border border-slate-800 shadow-2xl`}>
      {/* Map Element */}
      <div ref={mapRef} className="w-full h-full z-10" />

      {/* Floating Demo Status Card */}
      {demoText && (
        <div className="absolute top-4 left-4 right-4 md:right-auto md:w-96 z-20 p-4 rounded-2xl bg-slate-950/90 border border-amber-500/40 text-xs text-slate-100 shadow-2xl animate-in fade-in duration-200">
          <div className="flex items-center space-x-2 text-amber-400 font-extrabold uppercase text-[10px] mb-1">
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            <span>Демонстрация сценария</span>
          </div>
          <p className="leading-relaxed font-semibold">{demoText}</p>
        </div>
      )}

      {/* Map Control Panels */}
      {showControls && (
        <div className="absolute bottom-4 left-4 z-20 flex flex-col space-y-2 pointer-events-auto">
          <MapControls layers={mapLayers} setLayers={setMapLayers} />
          <MapLegend />
        </div>
      )}

      {/* Demo Action Floating Pill Button */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
        {demoStep === null ? (
          <button
            onClick={handleLaunchDemo}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-lg shadow-emerald-950 hover:from-emerald-500 hover:to-teal-500 transition active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Запустить демонстрацию</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setDemoStep(null);
              setDemoText(null);
              setActiveHerds(herdsData);
              setActivePastures(pasturesData);
              setMapLayers((prev) => ({ ...prev, showNDVI: false }));
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs flex items-center space-x-1.5 shadow-lg transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Сбросить демо</span>
          </button>
        )}
      </div>

      {/* Sidebar NDVI detail information Panel when NDVI layer is checked */}
      {mapLayers.showNDVI && (
        <div className="absolute top-16 right-4 z-20 glass-panel p-4 rounded-2xl border border-amber-500/30 max-w-xs w-full shadow-2xl animate-in slide-in-from-right duration-200">
          <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>NDVI MONITORING</span>
          </div>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between border-b border-slate-800 pb-1">
              <span>Последний анализ:</span>
              <strong className="text-white">08.08.2026</strong>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1">
              <span>Средний NDVI округа:</span>
              <strong className="text-emerald-400 font-mono">0.61</strong>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1">
              <span>Лучший участок:</span>
              <strong className="text-white">№3 (NDVI 0.84)</strong>
            </div>
            <div className="flex justify-between">
              <span>Требует внимания:</span>
              <strong className="text-red-400">№5 (NDVI 0.27)</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AgroMap;
