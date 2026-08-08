import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Palette,
  User,
  Briefcase,
  Zap,
  FilePenLine,
} from 'lucide-react';

const steps = [
  { id: 1, label: 'Шаблон', icon: Palette },
  { id: 2, label: 'Данные', icon: User },
  { id: 3, label: 'Опыт', icon: Briefcase },
  { id: 4, label: 'Навыки', icon: Zap },
];

export const ResumeCreatePage: React.FC = () => {
  const { templates, addResume } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? 'tpl-modern');
  const [name, setName] = useState('Моё новое резюме');
  const [fullName, setFullName] = useState('');
  const [headline, setHeadline] = useState('');
  const [summary, setSummary] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [years, setYears] = useState('1-3 года');
  const [skillsInput, setSkillsInput] = useState('');

  const canNext =
    (step === 2 && (fullName || headline || summary || email)) ||
    (step === 3 && (company || position)) ||
    step === 1 ||
    step === 4;

  const handleFinish = () => {
    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s, i) => ({ id: `sk-new-${i}`, name: s, level: 'intermediate' as const, category: 'Другое', years: 3 }));

    const created = addResume({
      name: name || 'Моё новое резюме',
      title: headline || position || 'Специалист',
      templateId,
      status: 'in_progress',
      atsScore: Math.round(55 + Math.random() * 15),
      compatibility: 0,
      completeness: 40,
      personalInfo: {
        fullName: fullName || 'Ваше имя',
        headline: headline || position || '',
        email,
        phone,
        location: '',
        summary,
        website: '',
        linkedin: '',
        telegram: '',
        github: '',
        photoUrl: '',
      },
      workExperience:
        company || position
          ? [
              {
                id: `exp-new-${Date.now()}`,
                company,
                position,
                location: '',
                startDate: '',
                endDate: 'Настоящее время',
                current: true,
                description: '',
                achievements: [],
                techStack: [],
              },
            ]
          : [],
      education: [],
      skills,
      languages: [],
      certificates: [],
      projects: [],
      references: [],
      achievements: [],
    });

    navigate(`/resumes/${created.id}`);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Конструктор резюме"
        subtitle="Заполняйте по шагам — AI подскажет формулировки"
        actions={
          <Button variant="ghost" onClick={() => navigate('/resumes')}>
            <ArrowLeft className="w-4 h-4" /> К списку
          </Button>
        }
      />

      {/* Stepper */}
      <div className="grid grid-cols-4 gap-2">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isDone = step > s.id;
          return (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-bold transition ${
                isActive
                  ? 'bg-emerald-950 border-emerald-500/60 text-emerald-300'
                  : isDone
                  ? 'bg-emerald-900/40 border-emerald-800/40 text-emerald-400'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Название резюме</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Шаблон</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setTemplateId(tpl.id)}
                  className={`rounded-2xl border p-2.5 transition text-left ${
                    templateId === tpl.id
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className={`h-24 rounded-xl bg-gradient-to-tr ${tpl.previewGradient} mb-2 flex items-center justify-center`}>
                    <FilePenLine className="w-5 h-5 text-white/90" />
                  </div>
                  <p className="text-xs font-bold text-white">
                    {tpl.name}
                    {tpl.isPremium && (
                      <span className="ml-1 px-1 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">PRO</span>
                    )}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Данные о вас</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">ФИО</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Желаемая должность</label>
                <input value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Телефон</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">Кратко о себе (Summary)</label>
                <button
                  onClick={() =>
                    setSummary(
                      `${fullName || 'Специалист'}: ${headline || 'профессионал'} с опытом ${years}. Строю продукты, которые приносят измеримый результат. Открыт к интересным предложениям.`
                    )
                  }
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold hover:bg-amber-500/25 transition"
                >
                  <Sparkles className="w-3 h-3" /> AI-версия
                </button>
              </div>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={4}
                className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white resize-none"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Последнее место работы</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Компания</label>
                <input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Должность</label>
                <input value={position} onChange={(e) => setPosition(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Общий опыт</label>
              <div className="flex flex-wrap gap-2">
                {['0-1 год', '1-3 года', '3-5 лет', '5-9 лет', '10+ лет'].map((y) => (
                  <button
                    key={y}
                    onClick={() => setYears(y)}
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                      years === y
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Больше мест работы и достижений можно добавить после создания на странице «Опыт работы».
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Навыки</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Ключевые навыки (через запятую)</label>
              <textarea
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                rows={3}
                placeholder="Например: React, TypeScript, PostgreSQL, Figma, Английский C1"
                className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white resize-none"
              />
            </div>
            <button
              onClick={() => setSkillsInput('React, TypeScript, JavaScript, Node.js, SQL, Git, Английский B2, Командная работа')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold hover:bg-amber-500/25 transition"
            >
              <Sparkles className="w-3.5 h-3.5" /> Заполнить типовым набором
            </button>
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
          <Button variant="secondary" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
            <ArrowLeft className="w-4 h-4" /> Назад
          </Button>

          {step < 4 ? (
            <Button onClick={() => setStep((s) => Math.min(4, s + 1))} disabled={!canNext}>
              Далее <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleFinish}>
              <CheckCircle2 className="w-4 h-4" /> Создать резюме
            </Button>
          )}
        </div>
      </div>

      <Badge tone="slate">
        AI подскажет формулировки в каждом разделе после создания резюме.
      </Badge>
    </div>
  );
};
