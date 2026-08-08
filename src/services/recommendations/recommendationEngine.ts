import { PastureRecommendation, Pasture } from '../../types';
import { NDVIEngine } from '../satellite/NDVIEngine';

export class RecommendationEngine {
  public static generatePastureRecommendation(pasture: Pasture): PastureRecommendation {
    const analysis = NDVIEngine.analyzeNDVI(pasture.ndviScore);

    let recommendationText = analysis.recommendation;
    let actionRequired = false;

    if (pasture.ndviScore < 0.40) {
      actionRequired = true;
      recommendationText = `${pasture.name} истощается (запас корма ${pasture.feedDaysRemaining} дн.). Рекомендуется перевести стада на другое пастбище (например, Пастбище №3) в течение ближайших 2 дней.`;
    }

    return {
      pastureId: pasture.id,
      ndvi: pasture.ndviScore,
      feedDays: pasture.feedDaysRemaining,
      recommendation: recommendationText,
      actionRequired,
    };
  }
}
export const recommendationEngine = new RecommendationEngine();
