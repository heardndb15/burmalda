import L from 'leaflet';
import { WaterSource } from '../../types';

export function createWaterLayer(waterSources: WaterSource[]): L.Marker[] {
  return waterSources.map((w) => {
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
    return marker;
  });
}
export default createWaterLayer;
