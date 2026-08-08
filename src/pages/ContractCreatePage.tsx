import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { Bot, Sparkles, ArrowLeft, Download, Send, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContractCreatePage: React.FC = () => {
  const { addContract, farm, t } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Chat inputs
  const [workerName, setWorkerName] = useState('Ерлан Смағұлов');
  const [salary, setSalary] = useState('250 000');
  const [duties, setDuties] = useState('Следить за 40 головами КРС, проверять водопой и ротацию пастбищ.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [contractText, setContractText] = useState('');

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }
    if (step === 3) {
      setIsGenerating(true);
      setGenerationError(null);
      try {
        const response = await fetch('/api/generate-contract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            workerName,
            position: 'Старший пастух КРС',
            salary,
            duties,
            farmName: farm.name,
            farmOwnerName: farm.ownerName,
            startDate: '2026-08-15',
            endDate: '2026-11-15',
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Не удалось сформировать договор');
        }
        setContractText(data.contractText);
        setStep(4);
        addContract({
          workerId: 'worker-1',
          workerName,
          farmId: farm.id,
          farmName: farm.name,
          position: 'Старший пастух КРС',
          monthlySalaryKzt: Number(salary.replace(/\D/g, '')) || 250000,
          startDate: '2026-08-15',
          endDate: '2026-11-15',
          status: 'active',
          duties,
          aiGenerated: true,
        });
        confetti({ particleCount: 100, spread: 70 });
      } catch (err) {
        setGenerationError(err instanceof Error ? err.message : 'Не удалось сформировать договор');
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        to="/contracts"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Назад к договорам</span>
      </Link>

      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 shadow-2xl">
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-1.5">
              {t('aiLawyerTitle')}
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h1>
            <p className="text-xs text-slate-400">{t('aiLawyerSubtitle')}</p>
          </div>
        </div>

        {/* Step 1-3 Conversational Chat Interface */}
        {step < 4 && (
          <div className="space-y-6 max-w-xl mx-auto py-4">
            {/* Step 1 Question */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                AI
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white">
                {t('aiQuestion1')}
              </div>
            </div>

            {step >= 1 && (
              <form onSubmit={handleNextStep} className="space-y-4 pl-11">
                <input
                  type="text"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  placeholder="Ерлан Смағұлов"
                  required
                  disabled={step > 1}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500"
                />

                {step === 1 && (
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
                  >
                    Ответить
                  </button>
                )}
              </form>
            )}

            {/* Step 2 Question */}
            {step >= 2 && (
              <div className="flex items-start space-x-3 pt-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                  AI
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white">
                  {t('aiQuestion2')}
                </div>
              </div>
            )}

            {step >= 2 && (
              <form onSubmit={handleNextStep} className="space-y-4 pl-11">
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="250 000 ₸ в месяц"
                  required
                  disabled={step > 2}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500"
                />

                {step === 2 && (
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
                  >
                    Ответить
                  </button>
                )}
              </form>
            )}

            {/* Step 3 Question */}
            {step >= 3 && (
              <div className="flex items-start space-x-3 pt-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                  AI
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white">
                  {t('aiQuestion3')}
                </div>
              </div>
            )}

            {step >= 3 && (
              <form onSubmit={handleNextStep} className="space-y-4 pl-11">
                <textarea
                  value={duties}
                  onChange={(e) => setDuties(e.target.value)}
                  rows={3}
                  required
                  disabled={isGenerating}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500"
                />

                {generationError && (
                  <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/40 text-[11px] text-red-300 flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{generationError} Нажмите кнопку ещё раз, чтобы повторить попытку.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs shadow-xl transition flex items-center justify-center space-x-2 disabled:opacity-60"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>AI составляет договор…</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Сформировать юридический договор</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Step 4: Final Contract Document Preview */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
              <h3 className="text-lg font-black text-white">{t('aiContractReady')}</h3>
            </div>

            {/* Contract Document Sheet */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-4 text-slate-300 shadow-inner">
              <div className="text-center font-extrabold text-white text-sm border-b border-slate-800 pb-3 uppercase tracking-wider">
                ТРУДОВОЙ ДОГОВОР № KZ-2026/088
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Место заключения: Алматинская обл., Илийский р-н</span>
                <span>Дата: 15 августа 2026 г.</span>
              </div>

              <p>
                <strong>Работодатель:</strong> {farm.name} в лице руководителя {farm.ownerName}.<br />
                <strong>Работник:</strong> Гражданин(ка) {workerName}.
              </p>

              <div className="whitespace-pre-line leading-relaxed">{contractText}</div>

              <div className="border-t border-slate-800 pt-3 flex justify-between font-bold text-white">
                <span>Подпись Работодателя: ____________</span>
                <span>Подпись Работника: ____________</span>
              </div>
            </div>

            {/* AI Lawyer Disclaimer */}
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-[11px] text-amber-200 flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{t('aiDisclaimer')}</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center space-x-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Изменить</span>
              </button>
              <button
                onClick={() => alert('PDF контракт успешно скачан на устройство!')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>{t('downloadContract')}</span>
              </button>
              <button
                onClick={() => {
                  alert('Договор отправлен на подпись через SMS/ЭЦП!');
                  navigate('/contracts');
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg flex items-center space-x-1.5"
              >
                <Send className="w-4 h-4" />
                <span>{t('sendForSignature')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
