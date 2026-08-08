import { ManagementPlan, FinancialPassport } from '../types';

export interface AIService {
  generateManagementPlan(period: string, territoryName: string): Promise<ManagementPlan>;
  generatePassportSummary(passport: FinancialPassport): Promise<string>;
  explainRisk(riskType: string, locationName: string): Promise<string>;
}

export class MockAIService implements AIService {
  async generateManagementPlan(period: string, territoryName: string): Promise<ManagementPlan> {
    // Simulates multi-step AI analysis engine
    return {
      id: `plan-${Date.now()}`,
      period,
      territoryName,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      goals: [
        'Снизить антропогенную нагрузку на деградированные пастбища в восточном секторе округа на 18%.',
        'Внедрить 4-польную пастбищеоборотную систему для 12 крупных крестьянских хозяйств.',
        'Строительство 3 новых артскважин в засушливых зонах для равномерного распределения водопоя.',
      ],
      pasturesCount: 48,
      recommendedRotation: 'Пастбищеоборот: Весна — Участок #124, Лето — Участок #48, Осень/Зима — Отгонные участки #201-#205',
      riskZonesCount: 4,
      waterInfrastructureNotes: 'Требуется модернизация 2 существующих скважин и установка солнечных насосных станций.',
      recommendations: [
        'Установить временные сезонные ограничения выпаса на участке №17 (деградация 22%).',
        'Перенаправить 2 крупных стада (1 400 УГС) на резервные отгонные пастбища реки Аксу.',
        'Организовать выездную группу акимата для проверки документации на неиспользуемые участки №481 и №124.',
      ],
      isAiGenerated: true,
    };
  }

  async generatePassportSummary(passport: FinancialPassport): Promise<string> {
    return `Хозяйство ${passport.farmName} демонстрирует стабильно высокую кормовую устойчивость (Score: ${passport.overallScore}/100, Категория: ${passport.category}). Наличие 2 независимых водных источников и оптимальная нагрузка выпаса (80% от лимита) обеспечивают низкий риск дефольта по кормовой базе на период 3-5 лет.`;
  }

  async explainRisk(riskType: string, locationName: string): Promise<string> {
    switch (riskType) {
      case 'high_load':
        return `На участке ${locationName} плотность выпаса составляет 0.11 УГС/га при норме 0.08 УГС/га. Риск истощения покрова в течение 60 дней.`;
      case 'degradation':
        return `Индекс NDVI на участке ${locationName} снизился на 22% за сезон. Требуется временный отдых пастбища.`;
      case 'requires_verification':
        return `По спутниковым данным Sentinel-2 за 24 месяца на участке ${locationName} не зафиксировано устойчивой активности скота. Требуется плановая проверка акиматом.`;
      default:
        return `Обнаружено отклонение геопространственных показателей на участке ${locationName}.`;
    }
  }
}

export const aiService = new MockAIService();
