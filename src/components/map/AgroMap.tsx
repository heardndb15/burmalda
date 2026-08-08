import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../../context/AppContext';
import { Pasture, Herd } from '../../types';
import { Layers, Droplets, ShieldAlert, Navigation, ArrowRight, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type MapTileLayer = 'satellite' | 'streets' | 'terrain';

export const AgroMap: React.FC<{
  height?: string;
  onSelectPasture?: (p: Pasture) => void;
  onSelectHerd?: (h: Herd) => void;
  showControls?: boolean;
}> = ({ height = 'h-[calc(100vh-140px)]', onSelectPasture, onSelectHerd, showControls = true }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);

  const { pastures, herds, selectedPasture, setSelectedPasture, selectedHerd, setSelectedHerd, t } = useApp();
  const [activeTile, setActiveTile] = useState<MapTileLayer>('satellite');
  const navigate = useNavigate();

  const tileUrls: Record<MapTileLayer, { url: string; attribution: string }> = {
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS',
    },
    streets: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{y}/{x}.png',
      attribution: '&copy; OpenStreetMap contributors',
    },
    terrain: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{y}/{x}.png',
      attribution: '&copy; OpenTopoMap contributors',
    },
  };

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current || leafletInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [43.65, 77.16],
      zoom: 12,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    tileLayerRef.current = L.tileLayer(tileUrls.satellite.url, {
      attribution: tileUrls.satellite.attribution,
      maxZoom: 18,
    }).addTo(map);

    layersGroupRef.current = L.layerGroup().addTo(map);
    leafletInstance.current = map;

    return () => {
      map.remove();
      leafletInstance.current = null;
    };
  }, []);

  // Update Base Tile Layer when changed
  useEffect(() => {
    if (!leafletInstance.current || !tileLayerRef.current) return;
    tileLayerRef.current.setUrl(tileUrls[activeTile].url);
  }, [activeTile]);

  // Render Vector Polygons & Markers
  useEffect(() => {
    if (!leafletInstance.current || !layersGroupRef.current) return;

    const group = layersGroupRef.current;
    group.clearLayers();

    // 1. Draw Pasture Polygons
    pastures.forEach((pasture) => {
      const color =
        pasture.health === 'good'
          ? '#10B981'
          : pasture.health === 'medium'
          ? '#F59E0B'
          : '#EF4444';

      const polygon = L.polygon(pasture.coordinates, {
        color: color,
        fillColor: color,
        fillOpacity: 0.35,
        weight: 3,
        dashArray: pasture.health === 'depleted' ? '6, 6' : undefined,
      });

      polygon.on('click', () => {
        if (onSelectPasture) onSelectPasture(pasture);
        else setSelectedPasture(pasture);
      });

      polygon.bindTooltip(
        `<div style="font-weight:bold; color:white;">${pasture.name}</div>
         <div style="font-size:11px; opacity:0.9;">NDVI: ${pasture.ndviScore} · Запас: ${pasture.feedDaysRemaining} дн.</div>`,
        { permanent: false, direction: 'center', className: 'custom-map-tooltip' }
      );

      group.addLayer(polygon);
    });

    // 2. Draw Water Source Markers (💧)
    const waterPoints = [
      { name: 'Озеро Жайлау', coords: [43.625, 77.215] as [number, number] },
      { name: 'Скважина №1', coords: [43.675, 77.130] as [number, number] },
      { name: 'Ручей Аксу', coords: [43.680, 77.150] as [number, number] },
    ];

    waterPoints.forEach((water) => {
      const waterIcon = L.divIcon({
        className: 'custom-water-icon',
        html: `<div style="background:#0284c7; color:white; border-radius:9999px; padding:6px; box-shadow:0 2px 8px rgba(0,0,0,0.5); display:flex; items-center; justify-center; width:28px; height:28px; border:2px solid white;">💧</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker(water.coords, { icon: waterIcon });
      marker.bindTooltip(`<b>${water.name}</b>`, { permanent: false });
      group.addLayer(marker);
    });

    // 3. Draw Danger Highway Buffer Line (🔴)
    const highwayCoords: [number, number][] = [
      [43.645, 77.110],
      [43.648, 77.140],
      [43.652, 77.170],
      [43.655, 77.200],
    ];

    const roadPolyline = L.polyline(highwayCoords, {
      color: '#EF4444',
      weight: 4,
      dashArray: '8, 8',
    });
    roadPolyline.bindTooltip('<b>🔴 Трасса А-3 (Опасная зона скота)</b>');
    group.addLayer(roadPolyline);

    // 4. Draw Herds Markers (🐄)
    herds.forEach((herd) => {
      const isWarning = herd.status === 'warning' || herd.status === 'danger';
      const herdIcon = L.divIcon({
        className: 'custom-herd-icon',
        html: `
          <div style="background:${isWarning ? '#EF4444' : '#10B981'}; color:white; border-radius:12px; padding:4px 8px; font-weight:bold; font-size:11px; display:flex; items-center; gap:4px; border:2px solid white; box-shadow:0 4px 12px rgba(0,0,0,0.4); white-space:nowrap;" class="${isWarning ? 'danger-pulse-marker' : ''}">
            <span>${herd.animalType === 'cattle' ? '🐄' : '🐎'}</span>
            <span>${herd.name} (${herd.headCount})</span>
          </div>
        `,
        iconSize: [120, 30],
        iconAnchor: [60, 15],
      });

      const marker = L.marker(herd.currentLocation, { icon: herdIcon });
      marker.on('click', () => {
        if (onSelectHerd) onSelectHerd(herd);
        else setSelectedHerd(herd);
      });

      group.addLayer(marker);

      // Draw Trajectory line for herds
      if (herd.routeHistory && herd.routeHistory.length > 1) {
        const routeLine = L.polyline(herd.routeHistory, {
          color: isWarning ? '#F59E0B' : '#3B82F6',
          weight: 3,
          opacity: 0.7,
        });
        group.addLayer(routeLine);
      }
    });
  }, [pastures, herds]);

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden border border-emerald-950/60 shadow-xl`}>
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full z-10" />

      {/* Map Layer Switcher Floating Pill */}
      {showControls && (
        <div className="absolute top-4 left-4 z-20 glass-panel p-1.5 rounded-xl flex items-center space-x-1 shadow-lg">
          <Layers className="w-4 h-4 text-emerald-400 ml-1.5 mr-1" />
          {(['satellite', 'streets', 'terrain'] as MapTileLayer[]).map((tile) => (
            <button
              key={tile}
              onClick={() => setActiveTile(tile)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition ${
                activeTile === tile
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tile === 'satellite' && t('mapLayerSatellite')}
              {tile === 'streets' && t('mapLayerStreets')}
              {tile === 'terrain' && t('mapLayerTerrain')}
            </button>
          ))}
        </div>
      )}

      {/* Floating Interactive Drawer Card for Selected Pasture */}
      {selectedPasture && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-20 glass-panel p-4 rounded-2xl shadow-2xl border border-emerald-500/40 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                {t('mapPastureCardTitle')}
              </span>
              <h4 className="text-base font-extrabold text-white">{selectedPasture.name}</h4>
            </div>
            <button
              onClick={() => setSelectedPasture(null)}
              className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded bg-slate-800"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300 my-3">
            <div className="flex justify-between">
              <span>{t('mapArea')}</span>
              <strong className="text-white">{selectedPasture.areaHectares} га</strong>
            </div>
            <div className="flex justify-between">
              <span>Состояние:</span>
              <strong
                className={
                  selectedPasture.health === 'good'
                    ? 'text-emerald-400'
                    : selectedPasture.health === 'medium'
                    ? 'text-amber-400'
                    : 'text-red-400'
                }
              >
                {selectedPasture.health === 'good'
                  ? '🟢 Хорошее'
                  : selectedPasture.health === 'medium'
                  ? '🟡 Среднее'
                  : '🔴 Истощённое'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>{t('mapFeedReserve')}</span>
              <strong className="text-white">{selectedPasture.feedDaysRemaining} дней (NDVI {selectedPasture.ndviScore})</strong>
            </div>
            <div className="flex justify-between">
              <span>{t('mapWaterAccess')}</span>
              <strong className="text-white">
                {selectedPasture.hasWater ? `💧 ${selectedPasture.waterSources.join(', ')}` : 'Нет'}
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={() => navigate(`/pastures/${selectedPasture.id}`)}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t('mapBtnDetails')}</span>
            </button>
            <button
              onClick={() => navigate('/app')}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center space-x-1"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>Маршрут</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Interactive Drawer Card for Selected Herd */}
      {selectedHerd && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-20 glass-panel p-4 rounded-2xl shadow-2xl border border-blue-500/40 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                Мониторинг стада
              </span>
              <h4 className="text-base font-extrabold text-white">{selectedHerd.name}</h4>
            </div>
            <button
              onClick={() => setSelectedHerd(null)}
              className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded bg-slate-800"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300 my-3">
            <div className="flex justify-between">
              <span>Поголовье:</span>
              <strong className="text-white">{selectedHerd.headCount} животных</strong>
            </div>
            <div className="flex justify-between">
              <span>Пастух:</span>
              <strong className="text-white">{selectedHerd.shepherdName}</strong>
            </div>
            <div className="flex justify-between">
              <span>Скорость:</span>
              <strong className="text-white">{selectedHerd.speedKmh} км/ч ({selectedHerd.headingDirection})</strong>
            </div>
            <div className="flex justify-between">
              <span>До дороги:</span>
              <strong className={selectedHerd.distanceToRoadMeters < 500 ? 'text-red-400 font-black' : 'text-emerald-400'}>
                {selectedHerd.distanceToRoadMeters} м
              </strong>
            </div>
          </div>

          <button
            onClick={() => navigate(`/herd/${selectedHerd.id}`)}
            className="w-full px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 mt-2"
          >
            <span>Детали стада & Трекинг</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
