import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  FileText,
  Trees,
  CheckCircle2,
  MapPin,
  Clock,
  Compass,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TodayPage: React.FC = () => {
  const { user, farm, t, triggerEmergencyAlert } = useApp();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Greeting Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Цифровой автопилот включён</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              {t('todayGreeting')}
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              {farm.name} · {farm.region}, {farm.district} ({farm.areaHectares} га)
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 shrink-0">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div className="text-xs">
              <span className="block text-slate-400 font-medium">Статус хозяйства:</span>
              <span className="font-extrabold text-emerald-400 text-sm">🟢 Всё спокойно (Хорошее)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>{t('todayRecommends')}</span>
        </h2>
        <span className="text-xs text-slate-400">Обновлено: Только что (Спутник NDVI)</span>
      </div>

      {/* Actionable Today Recommendation Cards Stack */}
      <div className="grid gap-4">
        {/* Recommendation 1: Pasture Relocation */}
        <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 hover:border-emerald-500/60 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-2xl shrink-0 shadow-lg">
              🌱
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-1 border border-amber-500/30">
                Ротация скота
              </div>
              <h3 className="text-lg font-bold text-white">{t('recMoveHerdTitle')}</h3>
              <p className="text-xs text-slate-300 mt-1">
                Пастбище №1 (Солтүстік) истощается (кормовой запас: 3 дня).
              </p>
              <div className="mt-2 flex items-center space-x-4 text-xs font-semibold">
                <span className="text-emerald-400">
                  Рекомендуемый участок: <strong>Пастбище №3 (Шығыс)</strong>
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-amber-300">
                  Кормовой запас: <strong>12 дней</strong>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/map')}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 transition flex items-center justify-center space-x-2 shrink-0 active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>{t('recMoveHerdBtn')}</span>
          </button>
        </div>

        {/* Recommendation 2: Road Safety Alert */}
        <div className="glass-card p-5 rounded-2xl border border-red-500/40 hover:border-red-500/70 transition flex flex-col md:flex-row md:items-center justify-between gap-4 bg-red-950/20">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-500/40 flex items-center justify-center text-red-400 text-2xl shrink-0 shadow-lg danger-pulse-marker">
              🚨
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[11px] font-bold uppercase tracking-wider mb-1 border border-red-500/30">
                Анти-ДТП Предупреждение
              </div>
              <h3 className="text-lg font-bold text-white">{t('recAlertTitle')}</h3>
              <p className="text-xs text-slate-300 mt-1">
                Стадо №2 (Табун лошадей) находится в <strong>430 м</strong> от опасной зоны автодороги A-3.
              </p>
              <div className="mt-2 flex items-center space-x-3 text-xs text-slate-400">
                <span>Скорость: <strong>1.8 км/ч</strong></span>
                <span>•</span>
                <span>Направление: <strong>Северо-Запад</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              triggerEmergencyAlert();
              navigate('/map');
            }}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-950 transition flex items-center justify-center space-x-2 shrink-0 active:scale-95"
          >
            <MapPin className="w-4 h-4" />
            <span>{t('recAlertBtn')}</span>
          </button>
        </div>

        {/* Recommendation 3: Worker Contract Expiration */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 text-2xl shrink-0 shadow-lg">
              👨‍🌾
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-bold uppercase tracking-wider mb-1 border border-slate-700">
                Кадровый менеджмент
              </div>
              <h3 className="text-lg font-bold text-white">{t('recWorkerTitle')}</h3>
              <p className="text-xs text-slate-300 mt-1">
                Трудовой договор со старшим пастухом Ерланом Смағұловым заканчивается через <strong>7 дней</strong> (15 августа 2026).
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/contracts')}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center justify-center space-x-2 shrink-0 active:scale-95"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>{t('recWorkerBtn')}</span>
          </button>
        </div>
      </div>

      {/* Farm Status Overview Footer */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          <div>
            <h4 className="text-sm font-bold text-white">{t('farmStatusTitle')}</h4>
            <p className="text-xs text-slate-400">
              Все 3 пастбища и 2 стада под непрерывным контролем AgroRadar.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/analytics')}
          className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
        >
          <span>Полная аналитика</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
