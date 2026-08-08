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
  contractText?: string;
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

export type UserRole = 'FARMER' | 'WORKER' | 'AKIMAT_ADMIN' | 'BANK_ANALYST' | 'SUPER_ADMIN';

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  farmName: string;
  region: string;
  district: string;
  isAuthenticated: boolean;
  role: UserRole;
}

export interface Organization {
  id: string;
  name: string;
  type: 'farm' | 'cooperative' | 'agrokombinat';
  district: string;
  region: string;
  areaHectares: number;
  cattleCount: number;
  horseCount: number;
  sheepCount: number;
  pastureCondition: 'good' | 'medium' | 'depleted';
  riskLevel: 'low' | 'medium' | 'high';
  status: 'active' | 'under_review' | 'inactive';
  cadastralCode: string;
  bin: string;
  ownerName: string;
  phone: string;
}

export interface LandUseObservation {
  id: string;
  plotId: string;
  plotName: string;
  areaHectares: number;
  ownerName: string;
  bin: string;
  observedActivityLevel: 'high' | 'medium' | 'low' | 'none';
  periodMonths: number;
  status: 'used' | 'not_used' | 'requires_verification';
  reason: string;
  coordinates: [number, number][];
  lastSatelliteCheck: string;
  cadastralNumber: string;
}

export interface GovernmentDistrict {
  id: string;
  name: string;
  region: string;
  totalPastureAreaHa: number;
  activeFarmsCount: number;
  totalLivestock: number;
  degradationPercentage: number;
  unusedPlotsCount: number;
  dangerZonesCount: number;
}

export interface GovernmentAlert {
  id: string;
  type: 'high_load' | 'degradation' | 'requires_verification' | 'water_shortage' | 'fire_risk';
  severity: 'high' | 'warning' | 'info';
  title: string;
  locationName: string;
  plotId?: string;
  farmName?: string;
  description: string;
  timestamp: string;
  status: 'active' | 'investigating' | 'resolved';
}

export interface ManagementPlan {
  id: string;
  period: string; // e.g. "2027-2028"
  territoryName: string;
  status: 'draft' | 'under_review' | 'approved';
  createdAt: string;
  goals: string[];
  pasturesCount: number;
  recommendedRotation: string;
  riskZonesCount: number;
  waterInfrastructureNotes: string;
  recommendations: string[];
  isAiGenerated: boolean;
}

export interface SpatialRiskFactors {
  droughtRisk: 'low' | 'medium' | 'high';
  fireRisk: 'low' | 'medium' | 'high';
  erosionRisk: 'low' | 'medium' | 'high';
  roadDangerZones: number;
}

export interface FinancialPassport {
  id: string; // e.g. "AR-2026-000124"
  farmId: string;
  farmName: string;
  bin: string;
  cadastralNumber: string;
  createdAt: string;
  periodYears: number;
  pastureHealthScore: number; // 0-100 e.g. 82
  category: string; // e.g. "B — Хорошая устойчивость"
  feedCapacityAreaHa: number; // 1240
  feedCapacityUgs: number; // 120
  currentHerdUgs: number; // 96
  feedCapacityRatioPct: number; // 80%
  waterSourcesWithin3km: number;
  waterStatus: 'good' | 'medium' | 'poor';
  spatialRisk: SpatialRiskFactors;
  feedReliabilityScore: number; // 84
  waterSecurityScore: number; // 91
  pastureStabilityScore: number; // 78
  spatialRiskScore: number; // 74
  overallScore: number; // 82
  verified: boolean;
  bankConsentGranted: boolean;
  qrCodeUrl: string;
}

export interface BankApplication {
  id: string;
  farmId: string;
  farmName: string;
  passportId: string;
  requestedAmountKzt: number;
  purpose: string;
  burmaldaScore: number;
  status: 'new' | 'reviewing' | 'approved' | 'rejected';
  submittedDate: string;
}

export interface InspectionTask {
  id: string;
  plotId: string;
  plotName: string;
  ownerName: string;
  assignedTo: string;
  createdDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  reason: string;
  notes?: string;
}

export interface ApiKey {
  key: string;
  clientName: string;
  createdAt: string;
  status: 'active' | 'revoked';
}

export interface ApiRequest {
  id: string;
  endpoint: string;
  method: string;
  timestamp: string;
  status: number;
}

export interface AuditLogEntry {
  id: string;
  userRole: UserRole;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
  ipAddress: string;
}

export interface WaterSource {
  id: string;
  name: string;
  type: 'well' | 'lake' | 'river' | 'tank';
  status: 'available' | 'unavailable';
  coordinates: [number, number];
}

export interface DangerZone {
  id: string;
  name: string;
  type: 'road' | 'railway' | 'erosion';
  severity: 'critical' | 'warning' | 'info';
  coordinates: [number, number][];
  radius?: number;
}

export interface NDVIObservation {
  pastureId: string;
  date: string;
  ndvi: number;
  healthStatus: 'good' | 'medium' | 'depleted' | 'critical';
  feedDays: number;
  recommendation: string;
}

export interface PastureRecommendation {
  pastureId: string;
  ndvi: number;
  feedDays: number;
  recommendation: string;
  actionRequired: boolean;
}

export interface SatelliteObservation {
  observationId: string;
  plotId: string;
  timestamp: string;
  satelliteConstellation: 'Sentinel-2' | 'Landsat-9' | 'Copernicus-DEM';
  ndvi: number;
  ndwi: number;
  evi: number;
  cloudCoverPct: number;
  health: PastureHealth;
  biomassKgPerHa: number;
  soilMoisturePct: number;
}



