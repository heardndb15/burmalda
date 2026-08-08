import L from 'leaflet';
import { Pasture } from '../../types';

export function createPastureLayer(
  pastures: Pasture[],
  showNDVI: boolean,
  onNavigate: (path: string) => void
): L.Polygon[] {
  return pastures.map((p) => {
    let color = '#10B981'; // Good
    const score = Math.round(p.ndviScore * 100);

    if (score < 40) {
      color = '#EF4444'; // Depleted
    } else if (score < 60) {
      color = '#F97316'; // Weakened
    } else if (score < 80) {
      color = '#F59E0B'; // Medium
    }

    const polygon = L.polygon(p.coordinates, {
      color: color,
      fillColor: color,
      fillOpacity: showNDVI ? 0.6 : 0.35,
      weight: 2,
    });

    const popupContent = L.DomUtil.create('div', 'p-2 space-y-1.5 text-xs text-slate-100');
    popupContent.innerHTML = `
      <h4 class="font-extrabold text-white text-sm">${p.name}</h4>
      <div>Состояние: <strong class="text-emerald-400">${score >= 80 ? '🟢 Хорошее' : score >= 60 ? '🟡 Среднее' : score >= 40 ? '🟠 Ослабленное' : '🔴 Истощённое'}</strong></div>
      <div>NDVI: <strong class="text-amber-400">${p.ndviScore}</strong></div>
      <div>Запас: <strong class="text-white">${p.feedDaysRemaining} дней</strong></div>
      <div>Площадь: <strong class="text-white">${p.areaHectares} га</strong></div>
    `;

    const detailsBtn = L.DomUtil.create('button', 'w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs mt-2 transition', popupContent);
    detailsBtn.innerText = 'Подробнее';
    L.DomEvent.on(detailsBtn, 'click', () => {
      onNavigate(`/pastures/${p.id}`);
    });

    polygon.bindPopup(popupContent, { minWidth: 160 });
    return polygon;
  });
}
export default createPastureLayer;
