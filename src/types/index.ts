export type Language = 'ru' | 'kk' | 'en';

export type AnimalType = 'cattle' | 'horse' | 'sheep' | 'goat' | 'camel';

export type PastureHealth = 'good' | 'medium' | 'depleted'; // 🟢 🟡 🔴

export interface Farm {
  id: string;
  name: string;
  region: string;
  district: string;
  areaHectares: number;
  ownerName: string;
  phone: string;
  email: string;
  cattleCount: number;
  horseCount: number;
  sheepCount: number;
  goatCount: number;
  camelCount: number;
  totalAnimals: number;
  createdAt: string;
}

export interface PastureHistoryItem {
  month: string;
  health: PastureHealth;
  ndvi: number; // 0.0 to 1.0
  feedDays: number;
}

export interface Pasture {
  id: string;
  farmId: string;
  name: string;
  areaHectares: number;
  health: PastureHealth;
  ndviScore: number;
  feedDaysRemaining: number;
  hasWater: boolean;
  waterSources: string[];
  coordinates: [number, number][]; // Lat, Lng polygon
  center: [number, number];
  history: PastureHistoryItem[];
  notes?: string;
  currentHerdId?: string;
}

export interface Herd {
  id: string;
  farmId: string;
  name: string;
  animalType: AnimalType;
  headCount: number;
  shepherdId: string;
  shepherdName: string;
  currentPastureId: string;
  currentPastureName: string;
  trackerId: string;
  status: 'safe' | 'warning' | 'danger';
  currentLocation: [number, number]; // Lat, Lng
  routeHistory: [number, number][];
  speedKmh: number;
  headingDirection: string;
  distanceToRoadMeters: number;
  nearestWaterName: string;
  nearestWaterDistanceMeters: number;
  isLiveTracking: boolean;
}

export interface Tracker {
  id: string;
  code: string;
  herdId?: string;
  herdName?: string;
  batteryLevel: number;
  lastPing: string;
  status: 'online' | 'offline' | 'low_battery';
  signalStrength: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface Worker {
  id: string;
  fullName: string;
  rating: number;
  experienceYears: number;
  region: string;
  district: string;
  animalTypes: AnimalType[];
  completionRate: number;
  phone: string;
  avatarUrl: string;
  isAvailable: boolean;
  bio: string;
  completedContractsCount: number;
  reviews: { author: string; rating: number; date: string; comment: string }[];
}

export interface Contract {
  id: string;
  workerId: string;
  workerName: string;
  farmId: string;
  farmName: string;
  position: string;
  monthlySalaryKzt: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'completed';
  duties: string;
  aiGenerated: boolean;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'danger' | 'warning' | 'info' | 'success';
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface EmergencyAlert {
  id: string;
  herdId: string;
  herdName: string;
  distanceMeters: number;
  speedKmh: number;
  direction: string;
  timestamp: string;
  isResolved: boolean;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  farmName: string;
  region: string;
  district: string;
  isAuthenticated: boolean;
}
