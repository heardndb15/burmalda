import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, CheckCircle2, MapPin, Building2, Landmark, ShieldCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoTourModal: React.FC = () => {
  const { isDemoTourOpen, setIsDemoTourOpen, setUserRole, addAuditLog } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  if (!isDemoTourOpen) return null;

  const tourSteps = [
    {
      title: 'Шаг 1: Выбор сельского округа',
      subtitle: 'Аким видит общую картину региона в режиме реального времени',
      role: 'AKIMAT_ADMIN' as const,
      route: '/government',
      icon: Building2,
      content: 'Выбирается Илийский сельский округ (Алматинская область, 1 248 000 га). Платформа загружает единый слой геоданных по 324 хозяйствам.',
      badge: 'Акимат (B2G)',
    },
    {
      title: 'Шаг 2: Загрузка тепловой карты округа',
      subtitle: 'Космический мониторинг вегетации и распределения скота',
      role: 'AKIMAT_ADMIN' as const,
      route: '/government/map',
      icon: MapPin,
      content: 'Карта объединяет данные спутников Sentinel-2 и GPS-трекеров стад. Доступно мгновенное переключение слоёв: пастбища, земли, плотность скота и инфраструктура.',
      badge: 'B2G Map Engine',
    },
    {
      title: 'Шаг 3: Обнаружение 12 зон риска деградации',
      subtitle: 'Система подсвечивает проблемные участки',
      role: 'AKIMAT_ADMIN' as const,
      route: '/government/alerts',
      icon: Sparkles,
      content: 'Обнаружено 18% деградированных территорий и 37 участков, требующих проверки использования. Никаких автоматических изъятий — только задачи для инспекторов.',
      badge: 'AI Anomaly Detector',
    },
    {
      title: 'Шаг 4: Выбор участка №124 (КХ «Береке»)',
      subtitle: 'Фермер анализирует состояние своего пастбища',
      role: 'FARMER' as const,
      route: '/pastures',
      icon: CheckCircle2,
      content: 'Участок №124 (1 240 га, 96 УГС). Pasture Health = 82/100, 2 источника воды. Фермер получает рекомендации по ротации стада.',
      badge: 'Фермер КХ',
    },
    {
      title: 'Шаг 5: Формирование Financial Passport',
      subtitle: 'Инфраструктурный отчёт для кредитования и субсидий',
      role: 'FARMER' as const,
      route: '/financial-passport',
      icon: ShieldCheck,
      content: 'В 1 клик формируется Финансовый паспорт КХ с уникальным QR-кодом верификации (ID: AR-2026-000124) и скорингом кормовой базы 82/100.',
      badge: 'B2B Passport Flow',
    },
    {
      title: 'Шаг 6: Банк открывает паспорт по QR-коду',
      subtitle: 'Предварительная геопространственная оценка рисков',
      role: 'BANK_ANALYST' as const,
      route: '/verify/AR-2026-000124',
      icon: Landmark,
      content: 'Банковский аналитик сканирует QR-код или ищет ID. Система мгновенно подтверждает подлинность геоданных и кормовой устойчивости без раскрытия PII.',
      badge: 'Public Verification',
    },
    {
      title: 'Шаг 7: Аналитика для банка (Agricultural Risk)',
      subtitle: '3-летняя история NDVI и индекс водно-кормового покрытия',
      role: 'BANK_ANALYST' as const,
      route: '/bank',
      icon: Landmark,
      content: 'Банк видит Feed Reliability (84), Water Security (91), Pasture Stability (78). Юридическая оговорка: показатели не являются кредитным решением.',
      badge: 'Bank Portal (B2B)',
    },
    {
      title: 'Шаг 8: Единая платформа Burmalda',
      subtitle: 'Один набор данных → 3 пользователя → 3 решения',
      role: 'AKIMAT_ADMIN' as const,
      route: '/ecosystem',
      icon: Sparkles,
      content: 'Фермер бережёт землю, Акимат сохраняет пастбища округа, Банк снижает финансовые риски. Инфраструктура полностью готова к реальным API!',
      badge: 'Platform Result',
    },
  ];

  const step = tourSteps[currentStep];
  const StepIcon = step.icon;

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      const nextIdx = currentStep + 1;
      setCurrentStep(nextIdx);
      const nextStep = tourSteps[nextIdx];
      setUserRole(nextStep.role);
      navigate(nextStep.route);
      addAuditLog({
        userRole: nextStep.role,
        userName: 'Demo Tour Runner',
        action: `Интерактивный тур: ${nextStep.title}`,
        target: nextStep.route,
        ipAddress: '127.0.0.1',
      });
    } else {
      setIsDemoTourOpen(false);
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevIdx = currentStep - 1;
      setCurrentStep(prevIdx);
      const prevStep = tourSteps[prevIdx];
      setUserRole(prevStep.role);
      navigate(prevStep.route);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsDemoTourOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header Badge */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-extrabold border border-emerald-500/40 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{step.badge}</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {currentStep + 1} / {tourSteps.length}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
            <StepIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">{step.title}</h3>
            <p className="text-xs text-emerald-400 font-medium">{step.subtitle}</p>
          </div>
        </div>

        {/* Body Description */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-sm text-slate-200 leading-relaxed mb-6">
          {step.content}
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-1.5">
            {tourSteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStep ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
              >
                Назад
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center space-x-1.5 shadow-lg shadow-emerald-950 transition active:scale-95"
            >
              <span>{currentStep === tourSteps.length - 1 ? 'Завершить тур' : 'Далее'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
