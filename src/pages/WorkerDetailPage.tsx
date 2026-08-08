import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Star, MapPin, CheckCircle2, ShieldCheck, FileText, Phone } from 'lucide-react';

export const WorkerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { workers } = useApp();
  const navigate = useNavigate();

  const worker = workers.find((w) => w.id === id) || workers[0];

  return (
    <div className="space-y-6">
      <Link
        to="/workers"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Назад к списку пастухов</span>
      </Link>

      {/* Main Profile Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <img
            src={worker.avatarUrl}
            alt={worker.fullName}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500/50 shadow-xl"
          />
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-2xl font-black text-white">{worker.fullName}</h1>
              <span title="Верифицирован Burmalda">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-amber-400 font-bold mb-1">
              <Star className="w-4 h-4 fill-current" />
              <span>{worker.rating} / 5.0</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">{worker.experienceYears} лет стажа</span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {worker.region}, {worker.district}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/contracts/create')}
          className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950 transition flex items-center justify-center space-x-2 active:scale-95"
        >
          <FileText className="w-4 h-4" />
          <span>Предложить контракт</span>
        </button>
      </div>

      {/* Reviews & Bio Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white mb-2">О себе и навыках</h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              {worker.bio}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-3">Отзывы фермеров ({worker.reviews.length})</h3>
            <div className="space-y-3">
              {worker.reviews.map((rev, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <strong className="text-white">{rev.author}</strong>
                    <span className="text-amber-400 font-bold">⭐ {rev.rating}</span>
                  </div>
                  <p className="text-slate-300">"{rev.comment}"</p>
                  <span className="block text-[10px] text-slate-500">{rev.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            Статистика специалиста
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Завершено контрактов:</span>
              <strong className="text-white">{worker.completedContractsCount}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Процент завершения:</span>
              <strong className="text-emerald-400">{worker.completionRate}%</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Доступность:</span>
              <strong className={worker.isAvailable ? 'text-emerald-400' : 'text-amber-400'}>
                {worker.isAvailable ? '🟢 Свободен' : '🟡 На контракте'}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
