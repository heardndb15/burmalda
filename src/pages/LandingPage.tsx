import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Radar,
  ArrowRight,
  ShieldCheck,
  Map,
  Radio,
  FileCheck,
  Play,
  Globe,
  Sparkles,
} from 'lucide-react';
import { AgroMap } from '../components/map/AgroMap';

export const LandingPage: React.FC = () => {
  const { t, language, setLanguage, startDemoMode } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#08140e] text-slate-100 flex flex-col font-sans">
      {/* Landing Navbar */}
      <header className="sticky top-0 z-50 glass-header px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-900/50">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Radar className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
              Agro<span className="text-emerald-400">Radar</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <button
              onClick={() => setLanguage('ru')}
              className={`px-1.5 py-0.5 rounded ${language === 'ru' ? 'bg-emerald-900 text-emerald-300 font-bold' : 'text-slate-400'}`}
            >
              RU
            </button>
            <button
              onClick={() => setLanguage('kk')}
              className={`px-1.5 py-0.5 rounded ${language === 'kk' ? 'bg-emerald-900 text-emerald-300 font-bold' : 'text-slate-400'}`}
            >
              KK
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded ${language === 'en' ? 'bg-emerald-900 text-emerald-300 font-bold' : 'text-slate-400'}`}
            >
              EN
            </button>
          </div>

          <Link
            to="/login"
            className="text-sm font-semibold text-slate-300 hover:text-white transition"
          >
            Войти
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-900/40 transition active:scale-95"
          >
            {t('startFree')}
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-6 max-w-6xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t('slogan')}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl">
          {t('heroTitle')}
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
          {t('heroSubtitle')}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black text-base shadow-xl shadow-emerald-950 hover:from-emerald-500 hover:to-teal-400 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <span>{t('startFree')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <button
            onClick={() => {
              startDemoMode();
              navigate('/map');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-base hover:bg-slate-800 transition flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 fill-current text-amber-400" />
            <span>{t('seeHowItWorks')}</span>
          </button>
        </div>
      </section>

      {/* Interactive Map Live Demonstration */}
      <section className="px-4 lg:px-8 max-w-7xl mx-auto w-full mb-16">
        <div className="glass-panel p-3 sm:p-5 rounded-3xl border border-emerald-500/30 shadow-2xl">
          <div className="flex items-center justify-between mb-4 px-2">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Интерактивный автопилот
              </span>
              <h3 className="text-lg font-extrabold text-white">
                Мониторинг пастбищ и GPS-трекинг стада в реальном времени
              </h3>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              🟢 Live Demo Data
            </span>
          </div>

          <div className="h-[420px] rounded-2xl overflow-hidden">
            <AgroMap height="h-full" showControls={true} />
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full border-t border-slate-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">
            Фермер не изучает данные — AgroRadar говорит, что делать
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Smart Pastures</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Спутниковый анализ вегетации NDVI. AgroRadar отслеживает уровень истощения пастбищ и сам рассчитывает оптимальный день перегона скота.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-red-950 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">GPS Анти-ДТП</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Мгновенные экстренные оповещения, если скот приближается к трассам или ж/д путям ближе настроенного радиуса безопасности.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Agro-HR & AI-Юрист</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Поиск проверенных пастухов по району и автоматическое формирование законных трудовых договоров за 1 минуту.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>© 2026 AgroRadar Kazakhstan. Все права защищены. Цифровой автопилот животноводства.</p>
      </footer>
    </div>
  );
};
