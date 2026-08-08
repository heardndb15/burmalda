import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Footprints, Plus, Eye, UserCheck, ShieldAlert, Radio, X } from 'lucide-react';

export const HerdPage: React.FC = () => {
  const { herds, addHerd, setSelectedHerd, t } = useApp();
  const navigate = useNavigate();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [headCount, setHeadCount] = useState(50);
  const [animalType, setAnimalType] = useState<'cattle' | 'horse' | 'sheep'>('cattle');

  const handleCreateHerd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addHerd({
      farmId: 'farm-001',
      name,
      animalType,
      headCount,
      shepherdId: 'worker-2',
      shepherdName: 'Айбек Қасымов',
      currentPastureId: 'pasture-3',
      currentPastureName: 'Пастбище №3 (Шығыс)',
      trackerId: 'tr-003',
      status: 'safe',
      currentLocation: [43.630, 77.200],
      routeHistory: [
        [43.620, 77.190],
        [43.630, 77.200],
      ],
      speedKmh: 0.5,
      headingDirection: 'Восток',
      distanceToRoadMeters: 1800,
      nearestWaterName: 'Озеро Жайлау',
      nearestWaterDistanceMeters: 350,
      isLiveTracking: true,
    });

    setIsAddModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">{t('herdTitle')}</h1>
          <p className="text-xs text-slate-300 mt-1">
            Учёт поголовья, закреплённые пастухи и GPS-мониторинг
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addHerdBtn')}</span>
          </button>
        </div>
      </div>

      {/* Herds Stack */}
      <div className="grid md:grid-cols-2 gap-4">
        {herds.map((herd) => {
          const isSafe = herd.status === 'safe';

          return (
            <div
              key={herd.id}
              className={`glass-card p-5 rounded-2xl border transition flex flex-col justify-between ${
                isSafe
                  ? 'border-emerald-500/30 hover:border-emerald-500/60'
                  : 'border-amber-500/40 hover:border-amber-500/70 bg-amber-950/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">
                    {herd.animalType === 'cattle' ? '🐄' : herd.animalType === 'horse' ? '🐎' : '🐑'}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase border ${
                      isSafe
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse'
                    }`}
                  >
                    {isSafe ? t('statusSafe') : '🚨 Вблизи автодороги'}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white mb-1">{herd.name}</h3>
                <p className="text-xs text-emerald-400 font-bold mb-4">
                  {herd.headCount} {t('animalsCount')}
                </p>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs mb-4">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-medium">{t('shepherd')}</span>
                    <strong className="text-white">{herd.shepherdName}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-medium">{t('location')}</span>
                    <strong className="text-white">{herd.currentPastureName}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-medium">GPS-Трекер</span>
                    <strong className="text-emerald-400">{herd.trackerId} (82%)</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-medium">До дороги</span>
                    <strong className={herd.distanceToRoadMeters < 500 ? 'text-red-400' : 'text-white'}>
                      {herd.distanceToRoadMeters} м
                    </strong>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800">
                <button
                  onClick={() => navigate(`/herd/${herd.id}`)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Детали & Маршрут</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedHerd(herd);
                    navigate('/map');
                  }}
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center space-x-1"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>{t('mapTrackingMode')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Herd Drawer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Footprints className="w-5 h-5 text-emerald-400" />
                <span>Регистрация нового стада</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateHerd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Название стада
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Стадо №3 (Овцы)"
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Тип животных
                  </label>
                  <select
                    value={animalType}
                    onChange={(e) => setAnimalType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  >
                    <option value="cattle">КРС (Коровы)</option>
                    <option value="horse">Лошади</option>
                    <option value="sheep">Овцы</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Поголовье (количество)
                  </label>
                  <input
                    type="number"
                    value={headCount}
                    onChange={(e) => setHeadCount(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
              >
                Создать стадо
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
