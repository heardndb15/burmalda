import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const ContractsPage: React.FC = () => {
  const { contracts, t } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'completed'>('active');

  const filteredContracts = contracts.filter((c) => c.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">{t('contractsTitle')}</h1>
          <p className="text-xs text-slate-300 mt-1">
            Управление юридическими договорами с пастухами
          </p>
        </div>

        <button
          onClick={() => navigate('/contracts/create')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center space-x-1.5 self-start"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{t('createContractBtn')}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'active'
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t('activeContracts')} ({contracts.filter((c) => c.status === 'active').length})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'pending'
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t('pendingContracts')} ({contracts.filter((c) => c.status === 'pending').length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'completed'
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t('completedContractsTab')} ({contracts.filter((c) => c.status === 'completed').length})
        </button>
      </div>

      {/* Contract Cards Stack */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredContracts.length === 0 ? (
          <div className="md:col-span-2 glass-panel p-8 text-center text-xs text-slate-400 rounded-2xl">
            Договоры в данном разделе отсутствуют.
          </div>
        ) : (
          filteredContracts.map((contract) => (
            <div
              key={contract.id}
              className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    {contract.position}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    🟢 Активен
                  </span>
                </div>

                <h3 className="text-lg font-black text-white mb-1">{contract.workerName}</h3>
                <p className="text-base font-extrabold text-amber-400 mb-3">
                  {contract.monthlySalaryKzt.toLocaleString()} ₸ / месяц
                </p>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5 mb-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Начало:</span>
                    <strong className="text-white">{contract.startDate}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Окончание:</span>
                    <strong className="text-white">{contract.endDate}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Обязанности:</span>
                    <strong className="text-slate-200 line-clamp-1">{contract.duties}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Сформирован AI-Юристом
                </span>
                <button className="text-emerald-400 font-bold hover:underline">
                  Скачать PDF
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
