import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AgroMap } from '../components/map/AgroMap';
import {
  ShieldAlert, Bell, Phone, Smartphone, MessageSquare,
  AlertTriangle, CheckCircle, Siren, Radio
} from 'lucide-react';
import { herdsData } from '../data/herds';
import { dangerZonesData } from '../data/dangerZones';
import { getDistanceToPolyline } from '../services/geo/distance';

interface LiveAlert {
  herdId: string;
  herdName: string;
  animalType: string;
  distanceMeters: number;
  zoneName: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
}

export const SafetyPage: React.FC = () => {
  const { safetyRadius, setSafetyRadius, alertChannels, setAlertChannels, t } = useApp();

  const [liveAlerts, setLiveAlerts] = useState<LiveAlert[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>(() => new Date().toLocaleTimeString('ru-RU'));

  // Live anti-DTP computation (mock updated every 5 seconds)
  useEffect(() => {
    const compute = () => {
      const alerts: LiveAlert[] = [];
      const road = dangerZonesData.find((d) => d.type === 'road');
      const railway = dangerZonesData.find((d) => d.type === 'railway');

      herdsData.forEach((herd) => {
        [road, railway].forEach((zone) => {
          if (!zone) return;
          const dist = getDistanceToPolyline(
            herd.currentLocation[0],
            herd.currentLocation[1],
            zone.coordinates
          );

          if (dist < safetyRadius) {
            let severity: 'critical' | 'warning' | 'info' = 'info';
            if (dist < 300) severity = 'critical';
            else if (dist < 500) severity = 'warning';

            alerts.push({
              herdId: herd.id,
              herdName: herd.name,
              animalType: herd.animalType,
              distanceMeters: dist,
              zoneName: zone.name,
              severity,
              timestamp: new Date().toLocaleTimeString('ru-RU'),
            });
          }
        });
      });

      setLiveAlerts(alerts);
      setLastUpdated(new Date().toLocaleTimeString('ru-RU'));
    };

    compute();
    const interval = setInterval(compute, 5000);
    return () => clearInterval(interval);
  }, [safetyRadius]);

  const criticalAlerts = liveAlerts.filter((a) => a.severity === 'critical');
  const warningAlerts = liveAlerts.filter((a) => a.severity === 'warning');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">{t('safetyTitle')}</h1>
          <p className="text-xs text-slate-300 mt-1">{t('safetySubtitle')}</p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
          <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
          <span>Обновление: {lastUpdated}</span>
        </div>
      </div>

      {/* Live Alert Banner (Critical Only) */}
      {criticalAlerts.length > 0 && (
        <div className="glass-panel p-4 rounded-2xl border-2 border-red-500/50 bg-red-950/20 animate-pulse">
          <div className="flex items-center space-x-3">
            <Siren className="w-6 h-6 text-red-400 shrink-0" />
            <div className="flex-1">
              <p className="font-extrabold text-red-400 text-sm">🚨 КРИТИЧЕСКАЯ ОПАСНОСТЬ</p>
              {criticalAlerts.map((a) => (
                <p key={a.herdId + a.zoneName} className="text-xs text-red-200 mt-0.5">
                  {a.herdName} находится в <strong className="text-red-400">{a.distanceMeters} м</strong> от: {a.zoneName}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {warningAlerts.length > 0 && criticalAlerts.length === 0 && (
        <div className="glass-panel p-4 rounded-2xl border border-amber-500/40 bg-amber-950/10">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-amber-400 text-sm">⚠️ Стадо приближается к опасной зоне</p>
              {warningAlerts.map((a) => (
                <p key={a.herdId + a.zoneName} className="text-xs text-amber-200 mt-0.5">
                  {a.herdName}: <strong className="text-amber-400">{a.distanceMeters} м</strong> от {a.zoneName}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {liveAlerts.length === 0 && (
        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-sm font-semibold text-emerald-400">
            Все стада в безопасности. Опасных приближений не обнаружено.
          </p>
        </div>
      )}

      {/* Grid: Map & Controls */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden min-h-[460px]">
          <AgroMap height="h-full" showControls={false} />
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

          {/* Live Herd Statuses */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              Статус стад (Реальное время)
            </h3>
            {herdsData.map((herd) => {
              const alert = liveAlerts.find((a) => a.herdId === herd.id);
              const icon = herd.animalType === 'cattle' ? '🐄' : herd.animalType === 'horse' ? '🐎' : '🐑';
              return (
                <div
                  key={herd.id}
                  className={`flex items-center justify-between p-3 rounded-xl text-xs border transition ${
                    alert?.severity === 'critical'
                      ? 'bg-red-950/30 border-red-500/40 text-red-200'
                      : alert?.severity === 'warning'
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{icon}</span>
                    <span className="font-semibold">{herd.name}</span>
                  </div>
                  {alert ? (
                    <span className={`font-extrabold ${alert.severity === 'critical' ? 'text-red-400' : 'text-amber-400'}`}>
                      {alert.distanceMeters} м ⚠️
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-bold">✓ Безопасно</span>
                  )}
                </div>
              );
            })}
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
