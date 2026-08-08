import { Pasture, Herd } from '../types';

export interface PastureAnalyticsResult {
  vegetationScore: number;       // 0-100
  pastureHealthScore: number;    // 0-100
  feedReliabilityScore: number;  // 0-100
  waterSecurityScore: number;   // 0-100
  livestockPressureScore: number;// 0-100 (lower is better pressure balance)
  spatialRiskScore: number;      // 0-100 (higher score = lower risk)
  overallScore: number;          // 0-100
}

export class PastureAnalyticsEngine {
  public static calculatePastureMetrics(
    pasture: Pasture,
    herds: Herd[],
    waterSourcesCount: number = 2
  ): PastureAnalyticsResult {
    const ndvi = pasture.ndviScore || 0.65;
    const vegetationScore = Math.round(ndvi * 100);

    const healthFactor =
      pasture.health === 'good' ? 90 : pasture.health === 'medium' ? 65 : 40;
    const pastureHealthScore = Math.round((vegetationScore + healthFactor) / 2);

    // Calculate livestock load vs capacity
    const assignedHerd = herds.find((h) => h.currentPastureId === pasture.id);
    const headCount = assignedHerd ? assignedHerd.headCount : 96;
    const recommendedUgs = Math.round(pasture.areaHectares * 0.08); // 0.08 UGS / ha
    const currentUgs = headCount;
    const loadRatio = currentUgs / (recommendedUgs || 1);

    let livestockPressureScore = 80;
    if (loadRatio > 1.3) livestockPressureScore = 45;
    else if (loadRatio > 1.0) livestockPressureScore = 65;
    else livestockPressureScore = 90;

    const feedDays = pasture.feedDaysRemaining || 45;
    const feedReliabilityScore = Math.min(100, Math.round((feedDays / 60) * 100));

    const waterSecurityScore = pasture.hasWater ? Math.min(100, 60 + waterSourcesCount * 15) : 30;

    const spatialRiskScore = Math.round(
      (pastureHealthScore * 0.3) + (waterSecurityScore * 0.3) + (livestockPressureScore * 0.4)
    );

    const overallScore = Math.round(
      pastureHealthScore * 0.35 +
      feedReliabilityScore * 0.25 +
      waterSecurityScore * 0.2 +
      spatialRiskScore * 0.2
    );

    return {
      vegetationScore,
      pastureHealthScore,
      feedReliabilityScore,
      waterSecurityScore,
      livestockPressureScore,
      spatialRiskScore,
      overallScore,
    };
  }
}
