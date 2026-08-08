import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AgroMap } from '../components/map/AgroMap';
import { MapPin, Layers, Droplets, ShieldAlert, CheckCircle2, ArrowRight, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OnboardingPage: React.FC = () => {
  const { farm, addPasture } = useApp();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [pastureName, setPastureName] = useState('Пастбище №4 (Новый участок)');
  const [areaHectares, setAreaHectares] = useState(850);
  const [hasWater, setHasWater] = useState(true);

  const handleFinishOnboarding = () => {
    // Add drafted pasture
    addPasture({
      farmId: farm.id,
      name: pastureName,
      areaHectares,
      health: 'good',
      ndviScore: 0.82,
      feedDaysRemaining: 15,
      hasWater,
      waterSources: hasWater ? ['Скважина №3'] : [],
      coordinates: [
        [43.660, 77.190],
        [43.675, 77.210],
        [43.658, 77.225],
        [43.645, 77.200],
      ],
      center: [43.659, 77.206],
      history: [
        { month: 'Август', health: 'good', ndvi: 0.82, feedDays: 15 },
      ],
      notes: 'Новый участок, нанесённый во время Onboarding.',
    });

    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#08140e] text-slate-100 flex flex-col p-4">
      {/* Onboarding Top Navigation */}
      <div className="max-w-7xl mx-auto w-full mb-4 flex items-center justify-between glass-panel p-4 rounded-2xl">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Первоначальная настройка AgroRadar
          </span>
          <h2 className="text-xl font-black text-white">Карта вашего хозяйства ({farm.name})</h2>
        </div>

        <button
          onClick={handleFinishOnboarding}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center space-x-1.5"
        >
          <span>Завершить и открыть "Сегодня"</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Onboarding Grid: Sidebar Wizard & Map */}
      <div className="max-w-7xl mx-auto w-full flex-1 grid lg:grid-cols-3 gap-4">
        {/* Step Guide Panel */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">
              Шаги разметки земли на карте:
            </h3>

            {/* Step 1 */}
            <div
              onClick={() => setActiveStep(1)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                activeStep === 1
                  ? 'bg-emerald-950 border-emerald-500/50 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2.5 mb-1">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">1. Найдите хозяйство</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Карта автоматически центрирована на {farm.region}, {farm.district}.
              </p>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => setActiveStep(2)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                activeStep === 2
                  ? 'bg-emerald-950 border-emerald-500/50 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2.5 mb-1">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">2. Нарисуйте границы пастбищ</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Нажмите на карту для создания полигона участка и указания кормовой площади.
              </p>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => setActiveStep(3)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                activeStep === 3
                  ? 'bg-emerald-950 border-emerald-500/50 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2.5 mb-1">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold">3. Отметьте источники воды</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Укажите расположение озер, скважин и водопоев для отслеживания маршрутов.
              </p>
            </div>

            {/* Step 4 */}
            <div
              onClick={() => setActiveStep(4)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                activeStep === 4
                  ? 'bg-emerald-950 border-emerald-500/50 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2.5 mb-1">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span className="text-xs font-bold">4. Укажите опасные автодороги</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Обозначьте проезжие трассы для автоматического срабатывания системы Анти-ДТП.
              </p>
            </div>
          </div>

          {/* Form preview */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Название создаваемого пастбища
              </label>
              <input
                type="text"
                value={pastureName}
                onChange={(e) => setPastureName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Площадь (га)</label>
                <input
                  type="number"
                  value={areaHectares}
                  onChange={(e) => setAreaHectares(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer pb-2">
                  <input
                    type="checkbox"
                    checked={hasWater}
                    onChange={(e) => setHasWater(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-emerald-500"
                  />
                  <span>Есть вода 💧</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleFinishOnboarding}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Сохранить участок и перейти к автопилоту</span>
            </button>
          </div>
        </div>

        {/* Interactive Map View */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden min-h-[500px]">
          <AgroMap height="h-full" />
        </div>
      </div>
    </div>
  );
};
