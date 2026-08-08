import React from 'react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';
import { RoleSwitcher } from './RoleSwitcher';
import {
  Radar,
  Globe,
  Bell,
  Play,
  Bot,
  AlertTriangle,
  Menu,
  Network,
  Scale,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Header: React.FC<{ onToggleMobileMenu?: () => void }> = ({ onToggleMobileMenu }) => {
  const {
    language,
    setLanguage,
    t,
    notifications,
    startDemoMode,
    isDemoMode,
    stopDemoMode,
    setIsAiAssistantOpen,
    triggerEmergencyAlert,
  } = useApp();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 glass-header px-4 lg:px-6 py-3 flex items-center justify-between">
      {/* Left section: Logo & Mobile Hamburger */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg bg-emerald-950/50 text-emerald-400 hover:bg-emerald-900/60 transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/app" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Radar className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              Agro<span className="text-emerald-400">Radar</span>
            </span>
            <span className="hidden sm:block text-[10px] text-emerald-400/80 font-medium tracking-wide uppercase">
              Kazakhstan AgTech OS
            </span>
          </div>
        </Link>

        {/* Ecosystem & Legal Links */}
        <div className="hidden xl:flex items-center space-x-2 pl-4 border-l border-slate-800">
          <Link
            to="/ecosystem"
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:bg-slate-900 transition"
          >
            <Network className="w-3.5 h-3.5 text-teal-400" />
            <span>Экосистема</span>
          </Link>
          <Link
            to="/legal/data-methodology"
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:bg-slate-900 transition"
          >
            <Scale className="w-3.5 h-3.5 text-indigo-400" />
            <span>Методология</span>
          </Link>
        </div>
      </div>

      {/* Right section: Role Switcher, Demo Mode, Emergency Sim, i18n, AI assistant, Notifications */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Role Switcher Persona Dropdown */}
        <RoleSwitcher />

        {/* Investor Demo Mode CTA */}
        {isDemoMode ? (
          <button
            onClick={stopDemoMode}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold animate-pulse hover:bg-amber-500/30 transition"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{t('demoModeActive')}</span>
          </button>
        ) : (
          <button
            onClick={() => {
              startDemoMode();
              navigate('/map');
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold shadow-md hover:from-emerald-500 hover:to-teal-500 transition active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden xs:inline">{t('demoMode')}</span>
          </button>
        )}

        {/* Quick Emergency Test Alert Trigger */}
        <button
          onClick={triggerEmergencyAlert}
          title="Симуляция тревоги (Анти-ДТП)"
          className="p-2 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-900/60 transition"
        >
          <AlertTriangle className="w-4 h-4" />
        </button>

        {/* Ask AgroRadar AI Assistant Launcher */}
        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60 transition text-xs font-medium"
        >
          <Bot className="w-4 h-4 text-emerald-400" />
          <span className="hidden md:inline">{t('askAgroRadar')}</span>
        </button>

        {/* Language Switcher */}
        <div className="relative group">
          <div className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-semibold cursor-pointer">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="uppercase">{language}</span>
          </div>
          <div className="absolute right-0 mt-1 hidden group-hover:block w-28 bg-slate-900 border border-slate-800 rounded-lg shadow-xl overflow-hidden z-50">
            {(['ru', 'kk', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`w-full text-left px-3 py-2 text-xs font-medium transition ${
                  language === lang
                    ? 'bg-emerald-900/40 text-emerald-400 font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {lang === 'ru' && '🇷🇺 Русский'}
                {lang === 'kk' && '🇰🇿 Қазақша'}
                {lang === 'en' && '🇬🇧 English'}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Bell */}
        <Link
          to="/notifications"
          className="relative p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
              {unreadCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

