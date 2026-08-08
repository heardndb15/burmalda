export interface NDVIBreakdown {
  ndvi: number;
  label: string;
  colorClass: string;
  feedDays: number;
  recommendation: string;
  severity: 'critical' | 'warning' | 'info' | 'success';
}

export class NDVIEngine {
  public static analyzeNDVI(ndvi: number): NDVIBreakdown {
    // 80–100 (0.80 - 1.00): 🟢 Хорошее
    // 60–79 (0.60 - 0.79): 🟡 Среднее
    // 40–59 (0.40 - 0.59): 🟠 Ослабленное
    // 0–39 (0.00 - 0.39): 🔴 Истощённое
    
    if (ndvi >= 0.80) {
      return {
        ndvi,
        label: 'Хорошее состояние',
        colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        feedDays: 14,
        recommendation: '🌱 Отличное состояние растительности. Корма в избытке. Выпас разрешен.',
        severity: 'success',
      };
    } else if (ndvi >= 0.60) {
      return {
        ndvi,
        label: 'Среднее состояние',
        colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        feedDays: 9,
        recommendation: '🌱 Среднее состояние травостоя. Рекомендуется умеренный выпас.',
        severity: 'info',
      };
    } else if (ndvi >= 0.40) {
      return {
        ndvi,
        label: 'Ослабленное состояние',
        colorClass: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
        feedDays: 5,
        recommendation: '⚠️ Растительность ослаблена. Запас корма снижен. Подготовьте ротацию стада в течение 3-5 дней.',
        severity: 'warning',
      };
    } else {
      return {
        ndvi,
        label: 'Истощённое состояние',
        colorClass: 'text-red-400 bg-red-500/10 border-red-500/30',
        feedDays: 2,
        recommendation: '🚨 Пастбище критически истощено! Запас корма на исходе. Срочно переведите стадо на другой участок.',
        severity: 'critical',
      };
    }
  }
}
