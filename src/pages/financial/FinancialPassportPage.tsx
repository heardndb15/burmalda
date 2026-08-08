import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScoreEngine } from '../../services/scoreEngine';
import { QRCodeSVG } from '../../components/common/QRCodeSVG';
import { FinancialPassport } from '../../types';
import {
  ShieldCheck,
  Sparkles,
  Download,
  Share2,
  Lock,
  CheckCircle2,
  FileText,
  Droplets,
  Trees,
  Footprints,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FinancialPassportPage: React.FC = () => {
  const { farm, pastures, financialPassports, addFinancialPassport, addAuditLog } = useApp();
  const navigate = useNavigate();

  const [selectedFarmId, setSelectedFarmId] = useState(farm.id);
  const [selectedPlotId, setSelectedPlotId] = useState(pastures[0]?.id || 'pasture-3');
  const [periodYears, setPeriodYears] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [activePassport, setActivePassport] = useState<FinancialPassport | null>(
    financialPassports[0] || null
  );

  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [bankConsentGranted, setBankConsentGranted] = useState(true);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const progressStepsList = [
    'Получение геоданных Sentinel-2',
    'Анализ пастбищ и биомассы',
    'Анализ 3-летней динамики NDVI',
    'Анализ гидрографии и водопоя',
    'Расчёт Burmalda Risk Scores',
    'Формирование отчёта завершено',
  ];

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setProgressStep(0);

    for (let i = 1; i <= 5; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProgressStep(i);
    }

    const newPassport = ScoreEngine.generateFinancialPassport(
      farm.id,
      farm.name,
      '940812300412',
      '19-280-045-124',
      periodYears
    );

    addFinancialPassport(newPassport);
    setActivePassport(newPassport);
    setIsGenerating(false);

    addAuditLog({
      userRole: 'FARMER',
      userName: farm.ownerName,
      action: 'Сформирован Финансовый паспорт КХ',
      target: newPassport.id,
      ipAddress: '127.0.0.1',
    });
  };

  const handleDownloadPDF = () => {
    setNotificationMsg(`Загрузка официального PDF: ${activePassport?.id}.pdf`);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  const handleGrantBankConsent = () => {
    setBankConsentGranted(true);
    setIsConsentModalOpen(false);
    addAuditLog({
      userRole: 'FARMER',
      userName: farm.ownerName,
      action: 'Предоставлен доступ банку Halyk Bank',
      target: activePassport?.id || 'AR-2026-000124',
      ipAddress: '127.0.0.1',
    });
    setNotificationMsg('Доступ для проверки банку Halyk Bank успешно открыт.');
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-extrabold uppercase border border-cyan-500/40">
            B2B Financial Passport
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Финансовый паспорт хозяйства</h1>
          <p className="text-xs text-slate-300 mt-1">
            Сводный отчёт о состоянии кормовой базы, инфраструктуре и пространственных рисках хозяйства.
          </p>
        </div>

        <button
          onClick={handleStartGeneration}
          disabled={isGenerating}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs flex items-center space-x-2 shadow-xl shadow-cyan-950 transition active:scale-95 shrink-0 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
          <span>Сформировать паспорт</span>
        </button>
      </div>

      {notificationMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-in fade-in">
          ✓ {notificationMsg}
        </div>
      )}

      {/* Generation Wizard Progress Screen (#18 Prompt) */}
      {isGenerating && (
        <div className="glass-panel p-8 rounded-3xl border border-cyan-500/40 text-center space-y-6 max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-3xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto animate-pulse">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-white">Расчёт показателей Финансового паспорта</h3>

          <div className="space-y-2 max-w-md mx-auto text-left">
            {progressStepsList.map((stepTitle, idx) => {
              const isDone = progressStep > idx;
              const isCurrent = progressStep === idx;
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs transition ${
                    isDone
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-bold'
                      : isCurrent
                      ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 font-extrabold animate-pulse'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500'
                  }`}
                >
                  <span>{stepTitle}</span>
                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step Wizard Selection Form (If no active passport yet) */}
      {!activePassport && !isGenerating && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 max-w-2xl mx-auto">
          <h3 className="text-base font-extrabold text-white">Параметры формирования паспорта</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">1. Хозяйство:</label>
              <select
                value={selectedFarmId}
                onChange={(e) => setSelectedFarmId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white font-bold p-2.5 rounded-xl"
              >
                <option value={farm.id}>{farm.name}</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 font-bold mb-1">2. Основной участок:</label>
              <select
                value={selectedPlotId}
                onChange={(e) => setSelectedPlotId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white font-bold p-2.5 rounded-xl"
              >
                {pastures.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.areaHectares} га)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-400 font-bold mb-1">3. Исторический период:</label>
              <select
                value={periodYears}
                onChange={(e) => setPeriodYears(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 text-white font-bold p-2.5 rounded-xl"
              >
                <option value={1}>1 год</option>
                <option value={3}>3 года (Рекомендовано)</option>
                <option value={5}>5 лет</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleStartGeneration}
            className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition"
          >
            Сформировать Financial Passport
          </button>
        </div>
      )}

      {/* Render Document: Section 19 Prompt Requirement */}
      {activePassport && !isGenerating && (
        <div className="glass-panel p-8 rounded-3xl border border-cyan-500/40 space-y-8 animate-in zoom-in-95 duration-200 bg-slate-950/80">
          {/* Document Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black border border-cyan-500/40">
                  FINANCIAL PASSPORT
                </span>
                <span className="text-xs font-mono text-slate-400">ID: {activePassport.id}</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">{activePassport.farmName}</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                БИН: {activePassport.bin} · Кадастр: {activePassport.cadastralNumber} · Дата: {activePassport.createdAt}
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => setIsConsentModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center space-x-1.5 border border-cyan-500/30 transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Доступ банкам</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-cyan-950 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Скачать PDF</span>
              </button>
            </div>
          </div>

          {/* Core Score Banner (#19 Requirement) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Score Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/40 text-center space-y-2 flex flex-col justify-center">
              <span className="text-xs font-extrabold uppercase text-cyan-400 tracking-wider">
                Pasture Health Score
              </span>
              <div className="text-5xl font-black text-white tracking-tight">
                {activePassport.pastureHealthScore} <span className="text-2xl text-slate-400 font-normal">/ 100</span>
              </div>
              <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 inline-block mx-auto">
                Категория: {activePassport.category}
              </div>
            </div>

            {/* Feed Capacity Specs */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-xs">
                <Trees className="w-4 h-4" />
                <span>Кормовая база</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Площадь:</span>
                  <strong className="text-white">{activePassport.feedCapacityAreaHa} га</strong>
                </div>
                <div className="flex justify-between">
                  <span>Ёмкость корма:</span>
                  <strong className="text-white">{activePassport.feedCapacityUgs} УГС</strong>
                </div>
                <div className="flex justify-between">
                  <span>Текущее поголовье:</span>
                  <strong className="text-white">{activePassport.currentHerdUgs} УГС</strong>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1.5">
                  <span>Соотношение нагрузки:</span>
                  <strong className="text-emerald-400 font-bold">{activePassport.feedCapacityRatioPct}% (Оптимально)</strong>
                </div>
              </div>
            </div>

            {/* Water & Spatial Risks */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-cyan-400 font-extrabold text-xs">
                <Droplets className="w-4 h-4" />
                <span>Вода & Spatial Risk</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Источники (в 3 км):</span>
                  <strong className="text-emerald-400 font-bold">🟢 {activePassport.waterSourcesWithin3km} источника</strong>
                </div>
                <div className="flex justify-between">
                  <span>Засуха:</span>
                  <strong className="text-amber-400">Средний риск</strong>
                </div>
                <div className="flex justify-between">
                  <span>Пожары / Эрозия:</span>
                  <strong className="text-emerald-400">Низкий риск</strong>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1.5">
                  <span>Опасные зоны (трассы):</span>
                  <strong className="text-amber-400 font-bold">{activePassport.spatialRisk.roadDangerZones} зона</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Section 20 Requirement: Score Engine Breakdown */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider text-cyan-400">
              Burmalda Indicator Metrics Breakdown
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block">Feed Reliability</span>
                <span className="text-2xl font-black text-white">{activePassport.feedReliabilityScore}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block">Water Security</span>
                <span className="text-2xl font-black text-cyan-400">{activePassport.waterSecurityScore}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block">Pasture Stability</span>
                <span className="text-2xl font-black text-white">{activePassport.pastureStabilityScore}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block">Spatial Risk Score</span>
                <span className="text-2xl font-black text-emerald-400">{activePassport.spatialRiskScore}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic text-center">
              * Это информационные показатели Burmalda, а не официальный банковский кредитный скоринг.
            </p>
          </div>

          {/* QR Verification & Public Link */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-slate-900 border border-cyan-500/30">
            <div className="flex items-center space-x-4">
              <QRCodeSVG value={activePassport.qrCodeUrl} size={90} />
              <div>
                <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider">
                  Публичная верификация
                </span>
                <h4 className="text-base font-extrabold text-white">QR Verification Link</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Сканируйте QR-код для мгновенной проверки истинности документа.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(activePassport.qrCodeUrl)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center space-x-1.5 border border-cyan-500/30 transition shrink-0"
            >
              <span>Страница верификации</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mock Consent Modal for Farmer (#36 Privacy Requirement) */}
      {isConsentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3 text-cyan-400 font-extrabold text-base">
              <Lock className="w-5 h-5" />
              <span>Запрос доступа финансовой организации</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Разрешить банку <strong>«Halyk Bank (Demo)»</strong> получить доступ к вашему Финансовому паспорту <strong>{activePassport?.id}</strong> для рассмотрения заявки на субсидии / кредитование?
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setIsConsentModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs hover:bg-slate-700 transition"
              >
                Отмена
              </button>
              <button
                onClick={handleGrantBankConsent}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-lg transition"
              >
                Разрешить доступ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
