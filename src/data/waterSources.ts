import { WaterSource } from '../types';

export const waterSourcesData: WaterSource[] = [
  {
    id: 'water-1',
    name: 'Озеро Жайлау',
    type: 'lake',
    status: 'available',
    coordinates: [43.625, 77.215],
  },
  {
    id: 'water-2',
    name: 'Скважина №1',
    type: 'well',
    status: 'available',
    coordinates: [43.675, 77.130],
  },
  {
    id: 'water-3',
    name: 'Скважина №2',
    type: 'well',
    status: 'available',
    coordinates: [43.630, 77.195],
  },
  {
    id: 'water-4',
    name: 'Ручей Аксу',
    type: 'river',
    status: 'available',
    coordinates: [43.680, 77.150],
  },
];
