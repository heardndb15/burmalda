import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Palette,
  Briefcase,
  Zap,
  Upload,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FilePenLine,
  WandSparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const quickTemplates = [
  { id: 'tpl-modern', name: 'Modern', grad: 'from-emerald-600 via-teal-500 to-cyan-500' },
  { id: 'tpl-technical', name: 'Technical', grad: 'from-violet-600 via-purple-500 to-fuchsia-500' },
  { id: 'tpl-classic', name: 'Classic', grad: 'from-blue-600 via-indigo-500 to-violet-500' },
  { id: 'tpl-creative', name: 'Creative', grad: 'from-amber-500 via-orange-500 to-rose-500' },
];

export const OnboardingPage: React.FC = () => {
  const { addResume } = useApp();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [templateId, setTemplateId] = useState('tpl-modern');
  const [headline, setHeadline] = useState('Senior Fullstack Developer');
  const [summary, setSummary] = useState('');
  const [skillsInput, setSkillsInput] = useState('React, TypeScript, Node.js, GraphQL');

  const handleFinish = () => {
    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s, i) => ({ id: `sk-on-${i}`, name: s, level: 'advanced' as const, category: 'Другое', years: 3 }));

    addResume({
      name: `${headline} (черновик)`,
      title: headline,
      templateId,
      status: 'draft',
      atsScore: 60,
      compatibility: 0,
      completeness: 30,
      personalInfo: {
        fullName: 'Алексей Петров',
        headline,
        email: 'alex.petrov@cvgen.ai',
        phone: '+375 (29) 303-04-53',
        location: 'Минск, Беларусь',
        summary,
        website: '',
        linkedin: '',
        telegram: '',
        github: '',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      },
      workExperience: [],
      education: [],
      skills,
      languages: [],
      certificates: [],
      projects: [],
      references: [],
      achievements: [],
    });

    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    navigate('/resumes');
  };

  return (
    <div className="min-h-screen bg-[#08140e] text-slate-100 flex flex-col p-4">
      <div className="max-w-7xl mx-auto w-full mb-4 flex items-center justify-between glass-panel p-4 rounded-2xl">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Первоначальная настройка CVGen
          </span>
          <h2 className="text-xl font-black text-white">Настройте свой карьерный профиль</h2>
        </div>

        <button
          onClick={handleFinish}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center space-x-1.5"
        >
          <span>Завершить и открыть резюме</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto w-full flex-1 grid lg:grid-cols-3 gap-4">
        {/* Step guide */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">Шаги настройки:</h3>

            <div
              onClick={() => setActiveStep(1)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                activeStep === 1
                  ? 'bg-emerald-950 border-emerald-500/50 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2.5 mb-1">
                <Palette className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">1. Выберите шаблон</span>
              </div>
              <p className="text-[11px] text-slate-300">Дизайн резюме под вашу сферу.</p>
            </div>

            <div
              onClick={() => setActiveStep(2)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                activeStep === 2
                  ? 'bg-emerald-950 border-emerald-500/50 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2.5 mb-1">
                <WandSparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold">2. Опишите себя</span>
              </div>
              <p className="text-[11px] text-slate-300">AI сгенерирует текст разделов.</p>
            </div>

            <div
              onClick={() => setActiveStep(3)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                activeStep === 3
                  ? 'bg-emerald-950 border-emerald-500/50 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2.5 mb-1">
                <Upload className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold">3. Импорт и навыки</span>
              </div>
              <p className="text-[11px] text-slate-300">Перенесите данные из LinkedIn или загрузите старое резюме.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-2">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <span>Чем полнее профиль — тем точнее AI подберёт формулировки под вакансии.</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border border-slate-800 p-6">
          {activeStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Выберите шаблон</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quickTemplates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setTemplateId(tpl.id)}
                    className={`rounded-2xl border p-2 transition ${
                      templateId === tpl.id
                        ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className={`h-28 rounded-xl bg-gradient-to-tr ${tpl.grad} mb-2 flex items-center justify-center`}>
                      <FilePenLine className="w-6 h-6 text-white/90" />
                    </div>
                    <p className="text-center text-xs font-bold text-white">{tpl.name}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => setActiveStep(2)} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition">
                Далее: опишите себя <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Опишите себя</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Желаемая должность</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Краткое описание (Summary)</label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={4}
                  placeholder="Напишите пару предложений о себе, либо оставьте пустым — AI напишет сам..."
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 resize-none"
                />
                <button
                  onClick={() =>
                    setSummary(
                      `Fullstack-разработчик с 9-летним опытом. Строю высоконагруженные веб-продукты на React и Node.js, вёл команды до 8 человек и сокращал время релиза на 60%. Ищу роль Senior/Lead в продуктовой команде.`
                    )
                  }
                  className="mt-2 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold hover:bg-amber-500/25 transition"
                >
                  <Zap className="w-3.5 h-3.5" /> Сгенерировать AI-версию
                </button>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setActiveStep(1)} className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs">
                  Назад
                </button>
                <button onClick={() => setActiveStep(3)} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition">
                  Далее: импорт и навыки <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Импорт и навыки</h3>

              <div className="grid sm:grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 p-5 rounded-xl border border-dashed border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-300 transition text-xs font-semibold">
                  <Upload className="w-4 h-4" /> Импорт из LinkedIn (PDF)
                </button>
                <button className="flex items-center justify-center gap-2 p-5 rounded-xl border border-dashed border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-300 transition text-xs font-semibold">
                  <Upload className="w-4 h-4" /> Загрузить старое резюме
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ключевые навыки (через запятую)
                </label>
                <textarea
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setActiveStep(2)} className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs">
                  Назад
                </button>
                <button
                  onClick={handleFinish}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs transition"
                >
                  <CheckCircle2 className="w-4 h-4" /> Завершить настройку
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
