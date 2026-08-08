import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { aiService } from '../../services/aiService';
import { ManagementPlan } from '../../types';
import { Sparkles, FileCheck2, ArrowRight, Download, Send, Edit, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const GovernmentManagementPlanPage: React.FC = () => {
  const { addAuditLog } = useApp();
  const [period, setPeriod] = useState('2027–2028');
  const [territory, setTerritory] = useState('Илийский сельский округ');
  const [isGenerating, setIsGenerating] = useState(false);
  const [stepProgress, setStepProgress] = useState(0);
  const [generatedPlan, setGeneratedPlan] = useState<ManagementPlan | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const pipelineSteps = [
    'Анализ территории округа',
    'Анализ пастбищ и NDVI',
    'Анализ поголовья и нагрузки',
    'Анализ водных источников',
    'Формирование рекомендаций AI',
    'Черновик плана готов',
  ];

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    setStepProgress(0);

    for (let i = 1; i <= 5; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStepProgress(i);
    }

    const plan = await aiService.generateManagementPlan(period, territory);
    setGeneratedPlan(plan);
    setIsGenerating(false);

    addAuditLog({
      userRole: 'AKIMAT_ADMIN',
      userName: 'Аким округа',
      action: 'Генерация черновика Плана управления пастбищами',
      target: `План ${period} (${territory})`,
      ipAddress: '127.0.0.1',
    });
  };

  const handleExportPDF = () => {
    setNotificationMsg('Экспорт PDF документа «План управления пастбищами 2027–2028.pdf» начат...');
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/40">
              B2G AI Engine
            </span>
          </div>
          <h1 className="text-2xl font-black text-white">План управления пастбищами</h1>
          <p className="text-xs text-slate-300 mt-1">
            Автоматическое построение нормативно-пространственного плана использования земель округа.
          </p>
        </div>

        {!generatedPlan && !isGenerating && (
          <button
            onClick={handleGeneratePlan}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-xs flex items-center space-x-2 shadow-xl shadow-amber-950 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
            <span>Создать план AI</span>
          </button>
        )}
      </div>

      {notificationMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-in fade-in">
          ✓ {notificationMsg}
        </div>
      )}

      {/* Generator Parameters Form (if no plan generated yet) */}
      {!generatedPlan && !isGenerating && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 max-w-xl mx-auto text-left">
          <h3 className="text-base font-extrabold text-white">Параметры генерации плана</h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Плановый период:</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white font-bold p-2.5 rounded-xl"
              >
                <option value="2027–2028">2027–2028 гг. (2 года)</option>
                <option value="2027–2031">2027–2031 гг. (5 лет)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 font-bold mb-1">Территория:</label>
              <input
                type="text"
                value={territory}
                onChange={(e) => setTerritory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white font-bold p-2.5 rounded-xl"
              />
            </div>
          </div>
          <button
            onClick={handleGeneratePlan}
            className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg transition"
          >
            Запустить генератор плана
          </button>
        </div>
      )}

      {/* Section 12 Requirement: AI Plan Pipeline Visualization */}
      {isGenerating && (
        <div className="glass-panel p-8 rounded-3xl border border-amber-500/40 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto animate-pulse">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-white">Формирование плана управления AI</h3>
          
          <div className="space-y-3 max-w-md mx-auto text-left">
            {pipelineSteps.map((stepName, idx) => {
              const isDone = stepProgress > idx;
              const isCurrent = stepProgress === idx;
              return (
                <div
                  key={idx}
                  className={`flex items-center space-x-3 p-3 rounded-xl border text-xs transition ${
                    isDone
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-bold'
                      : isCurrent
                      ? 'bg-amber-950/40 border-amber-500/40 text-amber-300 font-extrabold animate-pulse'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0">
                      {idx + 1}
                    </div>
                  )}
                  <span>{stepName}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Generated Draft Result Display */}
      {generatedPlan && !isGenerating && (
        <div className="glass-panel p-8 rounded-3xl border border-amber-500/40 space-y-6 animate-in zoom-in-95 duration-200">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                ✓ Черновик плана готов
              </span>
              <h2 className="text-xl lg:text-2xl font-black text-white mt-2">
                План управления пастбищами {generatedPlan.period}
              </h2>
              <p className="text-xs text-slate-400">{generatedPlan.territoryName}</p>
            </div>

            {/* Action Buttons Required by #12 Prompt */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setGeneratedPlan(null)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center space-x-1.5 transition"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Редактировать</span>
              </button>
              <button
                onClick={handleExportPDF}
                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Экспортировать PDF</span>
              </button>
              <button
                onClick={() => {
                  setNotificationMsg('План отправлен на согласование в областное управление земельных отношений.');
                  setTimeout(() => setNotificationMsg(null), 4000);
                }}
                className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>На согласование</span>
              </button>
            </div>
          </div>

          {/* Goals */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">
              1. Стратегические цели плана
            </h3>
            <div className="space-y-2">
              {generatedPlan.goals.map((g, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 flex items-start space-x-2">
                  <span className="text-amber-400 font-black">•</span>
                  <span>{g}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pasture Rotation & Water */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <h4 className="font-extrabold text-white">2. Рекомендуемый пастбищеоборот</h4>
              <p className="text-slate-300 leading-relaxed">{generatedPlan.recommendedRotation}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <h4 className="font-extrabold text-white">3. Водная инфраструктура</h4>
              <p className="text-slate-300 leading-relaxed">{generatedPlan.waterInfrastructureNotes}</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">
              4. Конкретные управленческие рекомендации
            </h3>
            <div className="space-y-2">
              {generatedPlan.recommendations.map((r, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-100 flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">#{idx + 1}</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important AI Note */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Важно: AI создаёт <strong>черновик</strong>, а не юридически утверждённый государственный документ. Документ вступает в силу после утверждения маслихатом района.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
