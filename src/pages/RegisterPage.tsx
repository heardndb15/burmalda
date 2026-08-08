import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  FilePenLine,
  ArrowRight,
  CheckCircle2,
  User,
  Mail,
  Lock,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const roles = [
  'Разработчик / IT',
  'Дизайнер',
  'Маркетолог',
  'Менеджер / HR',
  'Финансы / Бухгалтерия',
  'Продажи',
  'Другое',
];

export const RegisterPage: React.FC = () => {
  const { setUser } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [name, setName] = useState('Алексей Петров');
  const [email, setEmail] = useState('alex.petrov@cvgen.ai');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('Разработчик / IT');
  const [targetRole, setTargetRole] = useState('Senior Fullstack Developer');
  const [experience, setExperience] = useState('5-9 лет');

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) {
      setUser({
        name,
        email,
        phone: '+375 (29) 000-00-00',
        location: 'Минск, Беларусь',
        headline: targetRole,
        targetRole,
        experienceYears: 6,
        plan: 'free',
        isAuthenticated: true,
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        cvsCreated: 0,
        linkedinConnected: false,
        githubConnected: false,
      });
      setStep(4);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="min-h-screen bg-[#08140e] flex items-center justify-center p-4">
      <div className="w-full max-w-xl glass-panel p-8 rounded-3xl border border-emerald-500/30 shadow-2xl">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <FilePenLine className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <span className="text-xl font-black text-white">
              CV<span className="text-emerald-400">Gen</span>
            </span>
          </Link>
          <h2 className="text-lg font-bold text-white">Создание аккаунта</h2>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  step === s
                    ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20'
                    : step > s
                    ? 'bg-emerald-900 text-emerald-300'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              <span className="text-[10px] text-slate-400 mt-1">
                {s === 1 ? 'Аккаунт' : s === 2 ? 'Профессия' : s === 3 ? 'Цель' : 'Готово'}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Шаг 1: Данные аккаунта
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Ваше имя</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Пароль</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-1.5 mt-6"
            >
              <span>Продолжить к Шагу 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Шаг 2: Ваша сфера
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Текущая сфера</label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition ${
                      role === r
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Назад
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-1.5"
              >
                <span>К Шагу 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Шаг 3: Карьерная цель
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Желаемая должность</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Опыт работы</label>
              <div className="grid grid-cols-2 gap-2">
                {['0-1 год', '1-3 года', '3-5 лет', '5-9 лет', '10+ лет'].map((exp) => (
                  <button
                    type="button"
                    key={exp}
                    onClick={() => setExperience(exp)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition ${
                      experience === exp
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-2">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <span>AI сразу подготовит шаблон резюме под вашу должность — останется только дополнить.</span>
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Назад
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-1.5"
              >
                <span>Создать аккаунт</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-white">Добро пожаловать, {name.split(' ')[0]}!</h3>
            <p className="text-sm text-emerald-300 font-semibold">Ваш аккаунт готов.</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Пройдите короткую настройку карьеры — AI соберёт черновик вашего первого резюме.
            </p>
            <button
              onClick={() => navigate('/onboarding')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-sm shadow-xl hover:from-emerald-500 transition inline-flex items-center space-x-2"
            >
              <span>Настроить профиль</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
