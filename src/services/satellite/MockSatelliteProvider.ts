import { SatelliteDataProvider } from './SatelliteDataProvider';
import { NDVIObservation, SatelliteObservation, PastureHealth } from '../../types';

export class MockSatelliteProvider implements SatelliteDataProvider {
  private ndviValues: Record<string, number> = {
    'pasture-1': 0.34,
    'pasture-2': 0.51,
    'pasture-3': 0.72,
    'pasture-4': 0.63,
    'pasture-5': 0.27,
  };

  async getNDVI(pastureId: string, date: string): Promise<NDVIObservation> {
    const ndvi = this.ndviValues[pastureId] || 0.50;
    
    let healthStatus: 'good' | 'medium' | 'depleted' | 'critical' = 'medium';
    let feedDays = 7;
    let recommendation = 'Состояние среднее. Рекомендуется умеренный выпас.';

    if (ndvi >= 0.70) {
      healthStatus = 'good';
      feedDays = 12;
      recommendation = 'Состояние хорошее. Рекомендуется продолжить плановый выпас.';
    } else if (ndvi >= 0.60) {
      healthStatus = 'medium';
      feedDays = 9;
      recommendation = 'Состояние удовлетворительное. Выпас разрешен.';
    } else if (ndvi >= 0.40) {
      healthStatus = 'depleted';
      feedDays = 5;
      recommendation = 'Состояние ослабленное. Рекомендуется подготовить ротацию стада.';
    } else {
      healthStatus = 'critical';
      feedDays = 3;
      recommendation = 'Пастбище истощено! Срочно переведите стадо на другой участок.';
    }

    return {
      pastureId,
      date,
      ndvi,
      healthStatus,
      feedDays,
      recommendation,
    };
  }

  async getLatestObservation(plotId: string): Promise<SatelliteObservation> {
    const ndvi = this.ndviValues[plotId] || 0.50;
    const health: PastureHealth = ndvi >= 0.70 ? 'good' : ndvi >= 0.40 ? 'medium' : 'depleted';

    return {
      observationId: `sat-obs-latest-${plotId}`,
      plotId,
      timestamp: new Date().toISOString(),
      satelliteConstellation: 'Sentinel-2',
      ndvi,
      ndwi: Number((ndvi * 0.45).toFixed(2)),
      evi: Number((ndvi * 0.75).toFixed(2)),
      cloudCoverPct: 1.8,
      health,
      biomassKgPerHa: Math.round(ndvi * 2000),
      soilMoisturePct: Math.round(ndvi * 48),
    };
  }

  async getHistoricalObservations(plotId: string, months: number = 6): Promise<SatelliteObservation[]> {
    const observations: SatelliteObservation[] = [];
    const baseNdvi = this.ndviValues[plotId] || 0.50;
    
    for (let i = 0; i < months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const ndviOffset = Math.sin(i / 2) * 0.1;
      const ndvi = Number(Math.max(0.15, Math.min(0.95, baseNdvi + ndviOffset)).toFixed(2));
      const health: PastureHealth = ndvi >= 0.70 ? 'good' : ndvi >= 0.40 ? 'medium' : 'depleted';

      observations.push({
        observationId: `sat-obs-hist-${plotId}-${i}`,
        plotId,
        timestamp: date.toISOString().split('T')[0],
        satelliteConstellation: i % 2 === 0 ? 'Sentinel-2' : 'Landsat-9',
        ndvi,
        ndwi: Number((ndvi * 0.45).toFixed(2)),
        evi: Number((ndvi * 0.75).toFixed(2)),
        cloudCoverPct: 2.3,
        health,
        biomassKgPerHa: Math.round(ndvi * 2000),
        soilMoisturePct: Math.round(ndvi * 48),
      });
    }
    return observations;
  }
}

export const mockSatelliteProvider = new MockSatelliteProvider();
