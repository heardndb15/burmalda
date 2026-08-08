import React from 'react';
import { useApp } from '../context/AppContext';
import { AgroMap } from '../components/map/AgroMap';
import { ShieldAlert, Bell, Phone, Smartphone, MessageSquare } from 'lucide-react';

export const SafetyPage: React.FC = () => {
  const { safetyRadius, setSafetyRadius, alertChannels, setAlertChannels, t } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">{t('safetyTitle')}</h1>
        <p className="text-xs text-slate-300 mt-1">{t('safetySubtitle')}</p>
      </div>

      {/* Grid: Map & Controls */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden min-h-[460px]">
          <AgroMap height="h-full" />
        </div>

        {/* Safety Controls Panel */}
        <div className="space-y-4">
          {/* Slider Panel */}
          <div className="glass-panel p-5 rounded-2xl border border-red-500/30 space-y-4">
            <div className="flex items-center space-x-2 text-red-400">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-sm font-bold text-white">{t('warningRadius')}</h3>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-300">Дистанция срабатывания:</span>
                <span className="text-red-400 text-sm">{safetyRadius} м</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={safetyRadius}
                onChange={(e) => setSafetyRadius(Number(e.target.value))}
                className="w-full accent-red-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-semibold">
                <span>100 м (Близко)</span>
                <span>500 м (Стандарт)</span>
                <span>1000 м (Заблаговременно)</span>
              </div>
            </div>
          </div>

          {/* Emergency Alert Channels */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <span>{t('alertChannels')}</span>
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 cursor-pointer hover:bg-slate-800/80 transition">
                <div className="flex items-center space-x-2.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>{t('pushChannel')}</span>
                </div>
                <input
                  type="checkbox"
                  checked={alertChannels.push}
                  onChange={(e) => setAlertChannels({ ...alertChannels, push: e.target.checked })}
                  className="rounded bg-slate-950 text-emerald-500 border-slate-700 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 cursor-pointer hover:bg-slate-800/80 transition">
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>{t('smsChannel')} (+7 701 *** 4321)</span>
                </div>
                <input
                  type="checkbox"
                  checked={alertChannels.sms}
                  onChange={(e) => setAlertChannels({ ...alertChannels, sms: e.target.checked })}
                  className="rounded bg-slate-950 text-emerald-500 border-slate-700 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 cursor-pointer hover:bg-slate-800/80 transition">
                <div className="flex items-center space-x-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>{t('whatsappChannel')}</span>
                </div>
                <input
                  type="checkbox"
                  checked={alertChannels.whatsapp}
                  onChange={(e) => setAlertChannels({ ...alertChannels, whatsapp: e.target.checked })}
                  className="rounded bg-slate-950 text-emerald-500 border-slate-700 w-4 h-4"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
