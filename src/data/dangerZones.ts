import { DangerZone } from '../types';

export const dangerZonesData: DangerZone[] = [
  {
    id: 'danger-1',
    name: 'Автомагистраль А-3 (Опасность ДТП)',
    type: 'road',
    severity: 'critical',
    coordinates: [
      [43.645, 77.100],
      [43.648, 77.130],
      [43.652, 77.160],
      [43.655, 77.190],
    ],
    radius: 300,
  },
  {
    id: 'danger-2',
    name: 'Железная дорога Алматы-Отар',
    type: 'railway',
    severity: 'warning',
    coordinates: [
      [43.610, 77.080],
      [43.612, 77.130],
      [43.615, 77.180],
    ],
    radius: 500,
  },
  {
    id: 'danger-3',
    name: 'Овражная зона (Риск эрозии)',
    type: 'erosion',
    severity: 'info',
    coordinates: [
      [43.665, 77.165],
      [43.668, 77.170],
      [43.667, 77.175],
      [43.664, 77.170],
    ],
  },
];
