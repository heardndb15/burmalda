import L from 'leaflet';
import { Herd } from '../../types';

export function createHerdLayer(
  herds: Herd[],
  onNavigate: (path: string) => void
): { markers: L.Marker[]; polylines: L.Polyline[] } {
  const markers: L.Marker[] = [];
  const polylines: L.Polyline[] = [];

  herds.forEach((h) => {
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
      <div>Поголовье: <strong>${h.headCount}</strong></div>
      <div>Пастух: <strong>${h.shepherdName}</strong></div>
      <div>До дороги: <strong>${h.distanceToRoadMeters} м</strong></div>
    `;

    const detailsBtn = L.DomUtil.create('button', 'w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs mt-2 transition', popupContent);
    detailsBtn.innerText = 'Открыть стадо';
    L.DomEvent.on(detailsBtn, 'click', () => {
      onNavigate(`/herd/${h.id}`);
    });

    marker.bindPopup(popupContent, { minWidth: 160 });
    markers.push(marker);

    if (h.routeHistory && h.routeHistory.length > 1) {
      const path = L.polyline(h.routeHistory, {
        color: isWarning ? '#F97316' : '#3B82F6',
        weight: 2.5,
        opacity: 0.6,
      });
      polylines.push(path);
    }
  });

  return { markers, polylines };
}
export default createHerdLayer;
