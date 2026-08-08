import L from 'leaflet';
import { DangerZone } from '../../types';

export function createDangerZoneLayer(dangerZones: DangerZone[]): L.Polyline[] {
  return dangerZones.map((dz) => {
    const color = dz.severity === 'critical' ? '#EF4444' : dz.severity === 'warning' ? '#F59E0B' : '#3B82F6';
    const polyline = L.polyline(dz.coordinates, {
      color: color,
      weight: dz.severity === 'critical' ? 5 : 3,
      dashArray: '8, 8',
    });

    polyline.bindTooltip(`<b>${dz.name}</b>`, { permanent: false });
    return polyline;
  });
}
export default createDangerZoneLayer;
