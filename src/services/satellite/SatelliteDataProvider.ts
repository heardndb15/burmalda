import { NDVIObservation, SatelliteObservation } from '../../types';

export interface SatelliteDataProvider {
  getNDVI(pastureId: string, date: string): Promise<NDVIObservation>;
  getLatestObservation(plotId: string): Promise<SatelliteObservation>;
  getHistoricalObservations(plotId: string, months: number): Promise<SatelliteObservation[]>;
}
