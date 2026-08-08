import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Star, Award, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export const WorkersPage: React.FC = () => {
  const { workers, t } = useApp();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState<string>('all');

  const filteredWorkers = workers.filter((w) => {
    const matchesSearch =
      w.fullName.toLowerCase().includes(search.toLowerCase()) ||
      w.district.toLowerCase().includes(search.toLowerCase()) ||
      w.region.toLowerCase().includes(search.toLowerCase());
    const matchesAnimal =
      selectedAnimal === 'all' || w.animalTypes.includes(selectedAnimal as any);
    return matchesSearch && matchesAnimal;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">{t('workersTitle')}</h1>
        <p className="text-xs text-slate-300 mt-1">
          Кадровый маркетплейс пастухов и табунщиков Казахстана
        </p>
      </div>

      {/* Search & Filters */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchWorkerPlaceholder')}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedAnimal}
            onChange={(e) => setSelectedAnimal(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
          >
            <option value="all">Все животные</option>
            <option value="cattle">КРС (Коровы)</option>
            <option value="horse">Лошади</option>
            <option value="sheep">Овцы</option>
          </select>
        </div>
      </div>

      {/* Worker Cards Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start space-x-3.5 mb-4">
                <img
                  src={worker.avatarUrl}
                  alt={worker.fullName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40 shrink-0"
                />
                <div>
                  <h3 className="text-base font-black text-white">{worker.fullName}</h3>
                  <div className="flex items-center space-x-1.5 text-xs text-amber-400 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-extrabold">{worker.rating}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300 font-semibold">{worker.experienceYears} лет опыта</span>
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {worker.region}, {worker.district}
                  </p>
                </div>
              </div>

              <div className="space-y-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Специализация:</span>
                  <strong className="text-white">
                    {worker.animalTypes.map((a) => (a === 'cattle' ? 'КРС' : a === 'horse' ? 'Лошади' : 'Овцы')).join(' · ')}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Успешность контрактов:</span>
                  <strong className="text-emerald-400">{worker.completionRate}%</strong>
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 italic mb-4">
                "{worker.bio}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => navigate(`/workers/${worker.id}`)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
              >
                Профиль
              </button>

              <button
                onClick={() => navigate('/contracts/create')}
                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition"
              >
                Предложить работу
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
