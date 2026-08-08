import { FinancialPassport, SpatialRiskFactors } from '../types';

export class ScoreEngine {
  public static generateFinancialPassport(
    farmId: string,
    farmName: string,
    bin: string,
    cadastralNumber: string,
    periodYears: number = 3
  ): FinancialPassport {
    const pastureHealthScore = 82;
    const feedReliabilityScore = 84;
    const waterSecurityScore = 91;
    const pastureStabilityScore = 78;
    const spatialRiskScore = 74;

    const overallScore = Math.round(
      pastureHealthScore * 0.3 +
      feedReliabilityScore * 0.25 +
      waterSecurityScore * 0.2 +
      spatialRiskScore * 0.25
    );

    const category =
      overallScore >= 80
        ? 'B — Хорошая устойчивость'
        : overallScore >= 60
        ? 'C — Умеренный риск'
        : 'D — Высокий риск';

    const spatialRisk: SpatialRiskFactors = {
      droughtRisk: 'medium',
      fireRisk: 'low',
      erosionRisk: 'low',
      roadDangerZones: 1,
    };

    const passportId = `AR-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      id: passportId,
      farmId,
      farmName,
      bin,
      cadastralNumber,
      createdAt: '08.08.2026',
      periodYears,
      pastureHealthScore,
      category,
      feedCapacityAreaHa: 1240,
      feedCapacityUgs: 120,
      currentHerdUgs: 96,
      feedCapacityRatioPct: 80,
      waterSourcesWithin3km: 2,
      waterStatus: 'good',
      spatialRisk,
      feedReliabilityScore,
      waterSecurityScore,
      pastureStabilityScore,
      spatialRiskScore,
      overallScore,
      verified: true,
      bankConsentGranted: true,
      qrCodeUrl: `/verify/${passportId}`,
    };
  }
}
