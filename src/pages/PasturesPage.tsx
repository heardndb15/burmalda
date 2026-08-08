import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Pasture } from '../types';
import { Trees, Plus, Eye, Droplets, Calendar, Sparkles, X } from 'lucide-react';

export const PasturesPage: React.FC = () => {
  const { pastures, addPasture, t, setSelectedPasture } = useApp();
  const navigate = useNavigate();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [areaHectares, setAreaHectares] = useState(950);
  const [hasWater, setHasWater] = useState(true);
  const [notes, setNotes] = useState('');

  const handleCreatePasture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addPasture({
      farmId: 'farm-001',
      name,
      areaHectares,
      health: 'good',
      ndviScore: 0.86,
      feedDaysRemaining: 18,
      hasWater,
      waterSources: hasWater ? ['Скважина №4'] : [],
      coordinates: [
        [43.680, 77.170],
        [43.695, 77.190],
        [43.682, 77.210],
        [43.668, 77.185],
      ],
      center: [43.681, 77.189],
      history: [
        { month: 'Август', health: 'good', ndvi: 0.86, feedDays: 18 },
      ],
      notes,
    });

    setIsAddModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">{t('pasturesTitle')}</h1>
          <p className="text-xs text-slate-300 mt-1">
            Спутниковый мониторинг биомассы NDVI и кормового запаса
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center space-x-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addPastureBtn')}</span>
        </button>
      </div>

      {/* Pastures Grid Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {pastures.map((pasture) => {
          const isGood = pasture.health === 'good';
          const isMedium = pasture.health === 'medium';

          return (
            <div
              key={pasture.id}
              className={`glass-card p-5 rounded-2xl border transition flex flex-col justify-between ${
                isGood
                  ? 'border-emerald-500/30 hover:border-emerald-500/60'
                  : isMedium
                  ? 'border-amber-500/30 hover:border-amber-500/60'
                  : 'border-red-500/40 hover:border-red-500/70 bg-red-950/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase border ${
                      isGood
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : isMedium
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse'
                    }`}
                  >
                    {isGood ? '🟢 Хорошее' : isMedium ? '🟡 Среднее' : '🔴 Истощается'}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    NDVI {pasture.ndviScore}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white mb-1">{pasture.name}</h3>
                <p className="text-xs text-slate-400 mb-4">Площадь: {pasture.areaHectares} га</p>

                <div className="space-y-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Кормовой запас:</span>
                    <strong className="text-white">{pasture.feedDaysRemaining} дней</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Наличие воды:</span>
                    <strong className="text-white">
                      {pasture.hasWater ? `💧 ${pasture.waterSources.join(', ')}` : 'Нет'}
                    </strong>
                  </div>
                </div>

                {pasture.notes && (
                  <p className="text-[11px] text-slate-400 italic mt-3 line-clamp-2">
                    "{pasture.notes}"
                  </p>
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => navigate(`/pastures/${pasture.id}`)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Детали NDVI</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedPasture(pasture);
                    navigate('/map');
                  }}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center space-x-1"
                >
                  <Trees className="w-3.5 h-3.5" />
                  <span>На карте</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Pasture Drawer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Trees className="w-5 h-5 text-emerald-400" />
                <span>Добавление нового пастбища</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePasture} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Название участка
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Пастбище №4 (Батыс)"
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Площадь (в гектарах)
                </label>
                <input
                  type="number"
                  value={areaHectares}
                  onChange={(e) => setAreaHectares(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="waterCheck"
                  checked={hasWater}
                  onChange={(e) => setHasWater(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-emerald-500"
                />
                <label htmlFor="waterCheck" className="text-xs text-slate-300 cursor-pointer">
                  На участке есть источник воды 💧
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Заметки</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Особенности рельефа, качество травы..."
                  rows={2}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
              >
                Сохранить пастбище
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
