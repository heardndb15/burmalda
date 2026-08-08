import { PastureHealth } from '../types';

export interface SatelliteObservation {
  observationId: string;
  plotId: string;
  timestamp: string;
  satelliteConstellation: 'Sentinel-2' | 'Landsat-9' | 'Copernicus-DEM';
  ndvi: number; // Normalized Difference Vegetation Index 0.0 - 1.0
  ndwi: number; // Normalized Difference Water Index -1.0 - 1.0
  evi: number;  // Enhanced Vegetation Index
  cloudCoverPct: number;
  health: PastureHealth;
  biomassKgPerHa: number;
  soilMoisturePct: number;
}

export interface SatelliteDataProvider {
  getLatestObservation(plotId: string): Promise<SatelliteObservation>;
  getHistoricalObservations(plotId: string, months: number): Promise<SatelliteObservation[]>;
  detectLandUseAnomaly(plotId: string): Promise<{ isAnomaly: boolean; confidenceScore: number; reason: string }>;
}

export class MockSatelliteProvider implements SatelliteDataProvider {
  async getLatestObservation(plotId: string): Promise<SatelliteObservation> {
    return {
      observationId: `sat-obs-${Date.now()}`,
      plotId,
      timestamp: new Date().toISOString(),
      satelliteConstellation: 'Sentinel-2',
      ndvi: 0.68,
      ndwi: 0.35,
      evi: 0.52,
      cloudCoverPct: 2.1,
      health: 'good',
      biomassKgPerHa: 1450,
      soilMoisturePct: 38.5,
    };
  }

  async getHistoricalObservations(plotId: string, months: number = 12): Promise<SatelliteObservation[]> {
    const list: SatelliteObservation[] = [];
    const now = new Date();
    for (let i = 0; i < months; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 15);
      const ndviVal = Math.max(0.2, Math.min(0.85, 0.5 + Math.sin(i / 2) * 0.25));
      list.push({
        observationId: `hist-sat-${plotId}-${i}`,
        plotId,
        timestamp: d.toISOString().split('T')[0],
        satelliteConstellation: i % 2 === 0 ? 'Sentinel-2' : 'Landsat-9',
        ndvi: Number(ndviVal.toFixed(2)),
        ndwi: Number((ndviVal * 0.6).toFixed(2)),
        evi: Number((ndviVal * 0.8).toFixed(2)),
        cloudCoverPct: 1.5 + (i % 4),
        health: ndviVal > 0.6 ? 'good' : ndviVal > 0.4 ? 'medium' : 'depleted',
        biomassKgPerHa: Math.round(ndviVal * 2000),
        soilMoisturePct: Math.round(ndviVal * 50),
      });
    }
    return list;
  }

  async detectLandUseAnomaly(plotId: string): Promise<{ isAnomaly: boolean; confidenceScore: number; reason: string }> {
    return {
      isAnomaly: true,
      confidenceScore: 0.88,
      reason: 'Низкая наблюдаемая активность выпаса скота по трекинговым данным за 24 месяца.',
    };
  }
}

export const satelliteProvider = new MockSatelliteProvider();
