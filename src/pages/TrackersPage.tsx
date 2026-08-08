import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Radio, Plus, Battery, Signal, CheckCircle2, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TrackersPage: React.FC = () => {
  const { trackers, herds, addTracker, t } = useApp();

  const [isPairingModalOpen, setIsPairingModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [deviceCode, setDeviceCode] = useState('TR-004-KZ');
  const [selectedHerdId, setSelectedHerdId] = useState<string>('');

  const handleNextStep = () => {
    if (step === 1) setStep(2);
    else if (step === 2) {
      setStep(3);
      setTimeout(() => {
        setStep(4);
        addTracker(deviceCode, selectedHerdId);
        confetti({ particleCount: 80, spread: 60 });
      }, 1500);
    }
  };

  const handleClose = () => {
    setIsPairingModalOpen(false);
    setStep(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">{t('trackersTitle')}</h1>
          <p className="text-xs text-slate-300 mt-1">
            Мониторинг зарядов батарей, статусов связи и привязка IoT-устройств
          </p>
        </div>

        <button
          onClick={() => setIsPairingModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center space-x-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>{t('connectTrackerBtn')}</span>
        </button>
      </div>

      {/* Trackers List */}
      <div className="grid md:grid-cols-3 gap-4">
        {trackers.map((tracker) => (
          <div
            key={tracker.id}
            className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {tracker.code}
                </span>
                <span
                  className={`flex items-center gap-1 text-xs font-extrabold ${
                    tracker.batteryLevel > 50
                      ? 'text-emerald-400'
                      : tracker.batteryLevel > 20
                      ? 'text-amber-400'
                      : 'text-red-400'
                  }`}
                >
                  <Battery className="w-4 h-4" />
                  <span>🔋 {tracker.batteryLevel}%</span>
                </span>
              </div>

              <h3 className="text-lg font-black text-white mb-1">
                {tracker.herdName || 'Резервный трекер'}
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Статус связи: <strong className="text-emerald-400">Онлайн (GPS + LoraWAN)</strong>
              </p>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('lastPing')}</span>
                  <strong className="text-white">{tracker.lastPing}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Уровень сигнала:</span>
                  <strong className="text-emerald-400 flex items-center gap-1">
                    <Signal className="w-3.5 h-3.5" />
                    <span>Отличный</span>
                  </strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Connect Tracker 4-Step Pairing Wizard Modal */}
      {isPairingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-emerald-400" />
                <span>Подключение GPS-трекера</span>
              </h3>
              <button onClick={handleClose} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  {t('pairingStep1')}
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ID или серийный номер трекера (IMEI)
                  </label>
                  <input
                    type="text"
                    value={deviceCode}
                    onChange={(e) => setDeviceCode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <button
                  onClick={handleNextStep}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
                >
                  Далее
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  {t('pairingStep2')}
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Выберите стадо для привязки
                  </label>
                  <select
                    value={selectedHerdId}
                    onChange={(e) => setSelectedHerdId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  >
                    <option value="">-- Выберите стадо --</option>
                    {herds.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.headCount} голов)
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleNextStep}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
                >
                  Синхронизировать
                </button>
              </div>
            )}

            {/* Step 3: Connecting Loader */}
            {step === 3 && (
              <div className="text-center py-8 space-y-3">
                <Radio className="w-10 h-10 text-emerald-400 mx-auto animate-ping" />
                <p className="text-xs text-slate-300 font-bold">
                  {t('pairingStep3')}...
                </p>
              </div>
            )}

            {/* Step 4: Done */}
            {step === 4 && (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-black text-white">{t('pairingStep4')}</h4>
                <p className="text-xs text-slate-400">
                  Трекер <strong className="text-white">{deviceCode}</strong> передан на карту.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-lg"
                >
                  Закрыть
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
