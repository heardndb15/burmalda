import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trees,
  Building,
  Footprints,
  AlertTriangle,
  Compass,
  ShieldAlert,
  ArrowUpRight,
  TrendingDown,
  Sparkles,
  FileText,
  MapPin,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GovernmentOverviewPage: React.FC = () => {
  const { district, governmentAlerts, landObservations, setIsDemoTourOpen } = useApp();
  const navigate = useNavigate();

  const metrics = [
    {
      title: 'Пастбища',
      value: '1 248 000 га',
      sub: 'Общая площадь округа',
      icon: Trees,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      title: 'Активные КХ',
      value: `${district.activeFarmsCount}`,
      sub: 'Зарегистрировано в округе',
      icon: Building,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    },
    {
      title: 'Поголовье',
      value: `${district.totalLivestock.toLocaleString('ru-RU')} УГС`,
      sub: 'КРС, лошади, МРС',
      icon: Footprints,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
    },
    {
      title: 'Зоны деградации',
      value: `${district.degradationPercentage}%`,
      sub: 'Требует пастбищеоборота',
      icon: TrendingDown,
      color: 'text-red-400 bg-red-500/10 border-red-500/30',
    },
    {
      title: 'Неиспользуемые участки',
      value: `${district.unusedPlotsCount}`,
      sub: 'Требует проверки акиматом',
      icon: Compass,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      title: 'Опасные зоны',
      value: `${district.dangerZonesCount}`,
      sub: 'Трассы и эрозионные склоны',
      icon: ShieldAlert,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 relative overflow-hidden bg-gradient-to-r from-slate-950 via-amber-950/20 to-slate-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/40 tracking-wider">
                B2G Platform
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold border border-slate-700">
                Demo data
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              Цифровой сельский округ
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl font-medium">
              Единая картина состояния пастбищ, земель и животноводства округа.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/government/map')}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-amber-950 transition"
            >
              <MapPin className="w-4 h-4" />
              <span>Карта округа</span>
            </button>
            <button
              onClick={() => navigate('/government/management-plan')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center space-x-2 border border-amber-500/30 transition"
            >
              <FileText className="w-4 h-4" />
              <span>План управления</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl glass-panel border ${m.color} flex flex-col justify-between hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {m.title}
                </span>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-black text-white">{m.value}</div>
                <div className="text-[10px] text-slate-400 mt-1 font-medium truncate">{m.sub}</div>
              </div>
              <div className="mt-2 text-[9px] font-bold uppercase tracking-wider text-slate-500 text-right">
                Demo data
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Alerts & Inspection Needs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Government Alerts Feed */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Оперативные риски и предупреждения</span>
              </h3>
              <button
                onClick={() => navigate('/government/alerts')}
                className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Все риски ({governmentAlerts.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {governmentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-2xl border transition flex items-start justify-between ${
                    alert.severity === 'high'
                      ? 'bg-red-950/20 border-red-500/30'
                      : alert.severity === 'warning'
                      ? 'bg-amber-950/20 border-amber-500/30'
                      : 'bg-blue-950/20 border-blue-500/30'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-white">{alert.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">
                        {alert.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{alert.description}</p>
                    <p className="text-[11px] text-slate-400 font-medium">📍 {alert.locationName}</p>
                  </div>
                  <button
                    onClick={() => navigate('/government/map')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-amber-300 text-xs font-bold hover:bg-slate-700 transition shrink-0 ml-3"
                  >
                    На карте
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Land Use Monitoring Verification Tasks */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-teal-400" />
                  <span>Мониторинг использования земель</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Участки с сигналом низкого использования по спутниковым данным
                </p>
              </div>
              <button
                onClick={() => navigate('/government/land')}
                className="text-xs text-teal-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Все земли</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {landObservations
                .filter((l) => l.status === 'requires_verification')
                .map((plot) => (
                  <div
                    key={plot.id}
                    className="p-4 rounded-2xl bg-amber-950/15 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-extrabold text-white">{plot.plotName}</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                          🟠 Требует проверки
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        Владелец: <strong>{plot.ownerName}</strong> ({plot.areaHectares} га)
                      </p>
                      <p className="text-[11px] text-amber-300/80 italic mt-0.5">
                        Причина: {plot.reason}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate('/government/land')}
                      className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shrink-0 transition"
                    >
                      Создать задачу проверки
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Col: Quick Actions & Legal Note */}
        <div className="space-y-6">
          {/* Quick Government AI Generator Card */}
          <div className="glass-panel p-5 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/30 to-slate-950">
            <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-sm mb-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>AI Plan Generator</span>
            </div>
            <h4 className="text-base font-extrabold text-white mb-2">План управления пастбищами 2027–2028</h4>
            <p className="text-xs text-slate-300 mb-4">
              Автоматический анализ гидрографии, NDVI-динамики и нагрузки скота для создания черновика плана округа.
            </p>
            <button
              onClick={() => navigate('/government/management-plan')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-950 transition"
            >
              Сформировать черновик
            </button>
          </div>

          {/* Legal Disclaimer Box (#10 Requirement) */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800 bg-slate-950/60 text-xs text-slate-300 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>Юридическая оговорка B2G</span>
            </div>
            <p className="leading-relaxed">
              Космические данные Sentinel-2 и алгоритмы Burmalda используются исключительно для <strong>Risk / Anomaly Detection</strong> и присвоения статуса <strong>«Требует проверки»</strong>.
            </p>
            <p className="leading-relaxed text-slate-400">
              Система и AI <strong>не принимают правовых или административных решений</strong> об изъятии земель. Все решения принимаются уполномоченными сотрудниками акимата на основе официальной процедуры.
            </p>
          </div>

          {/* Interactive Demo Tour Shortcut */}
          <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 text-center">
            <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-1">
              Презентация для руководства
            </h4>
            <p className="text-xs text-slate-300 mb-3">
              Запустите пошаговый интерактивный тур «Один набор данных → 3 пользователя».
            </p>
            <button
              onClick={() => setIsDemoTourOpen(true)}
              className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
            >
              Запустить Burmalda Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
