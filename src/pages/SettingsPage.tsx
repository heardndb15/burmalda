import React from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Globe, Shield, CreditCard, Building2, Bell, Smartphone } from 'lucide-react';
import { Language } from '../types';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage, user, t } = useApp();

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">{t('settingsTitle')}</h1>
        <p className="text-xs text-slate-300 mt-1">
          Конфигурация учетной записи, языков и сервисных интеграций
        </p>
      </div>

      {/* Language Section */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>{t('langSelector')}</span>
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {(['ru', 'kk', 'en'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`p-3.5 rounded-xl border text-center font-bold text-xs transition ${
                language === lang
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'ru' && '🇷🇺 Русский'}
              {lang === 'kk' && '🇰🇿 Қазақша'}
              {lang === 'en' && '🇬🇧 English'}
            </button>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Профиль пользователя</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">ФИО</label>
            <input
              type="text"
              readOnly
              value={user.name}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Телефон</label>
            <input
              type="text"
              readOnly
              value={user.phone}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
            />
          </div>
        </div>
      </div>

      {/* Future Integrations Section */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>{t('integrations')}</span>
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-bold border border-blue-800">
            Roadmap 2026-2027
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 opacity-80">
            <CreditCard className="w-5 h-5 text-emerald-400 mb-2" />
            <h4 className="text-xs font-bold text-white mb-1">{t('bankIntegration')}</h4>
            <p className="text-[11px] text-slate-400">
              Автоматический скоринг по NDVI данным пастбищ для одобрения льготных кредитов Halyk/Baiterek.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 opacity-80">
            <Shield className="w-5 h-5 text-amber-400 mb-2" />
            <h4 className="text-xs font-bold text-white mb-1">{t('insuranceIntegration')}</h4>
            <p className="text-[11px] text-slate-400">
              Смарт-страхование падежа скота и засухи на основе спутникового мониторинга.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 opacity-80">
            <Building2 className="w-5 h-5 text-purple-400 mb-2" />
            <h4 className="text-xs font-bold text-white mb-1">{t('b2gIntegration')}</h4>
            <p className="text-[11px] text-slate-400">
              Бесшовная выгрузка отчетов о целевом использовании пастбищных земель в Акиматы.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
