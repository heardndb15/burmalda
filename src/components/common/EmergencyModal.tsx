import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, Phone, MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmergencyModal: React.FC = () => {
  const { emergencyAlert, resolveEmergencyAlert, t } = useApp();
  const navigate = useNavigate();

  if (!emergencyAlert) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border-2 border-red-500/80 rounded-2xl p-6 shadow-2xl shadow-red-950/60 relative overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/30 rounded-full blur-3xl animate-ping" />

        <button
          onClick={resolveEmergencyAlert}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-500 danger-pulse-marker shrink-0">
            <ShieldAlert className="w-7 h-7 animate-bounce" />
          </div>
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-extrabold tracking-wider uppercase mb-1 border border-red-500/30">
              🚨 ЭКСТРЕННОЕ ПРЕДУПРЕЖДЕНИЕ
            </div>
            <h3 className="text-xl font-black text-white">
              {t('emergencyTitle')}
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              {t('emergencyDesc')}
            </p>
          </div>
        </div>

        {/* Dynamic Details Box */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-red-950/40 border border-red-900/50 my-4 text-center">
          <div>
            <span className="block text-[11px] text-red-300/70 font-medium">{t('distance')}</span>
            <span className="text-lg font-black text-white">{emergencyAlert.distanceMeters} м</span>
          </div>
          <div>
            <span className="block text-[11px] text-red-300/70 font-medium">{t('speed')}</span>
            <span className="text-lg font-black text-white">{emergencyAlert.speedKmh} км/ч</span>
          </div>
          <div>
            <span className="block text-[11px] text-red-300/70 font-medium">{t('direction')}</span>
            <span className="text-xs font-bold text-red-300 truncate block mt-1">
              {emergencyAlert.direction}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300 mb-5 flex items-center justify-between">
          <span>Объект: <strong className="text-white">{emergencyAlert.herdName}</strong></span>
          <span>Пастух: <strong className="text-white">Айбек Қасымов</strong></span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              resolveEmergencyAlert();
              navigate('/map');
            }}
            className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-900/50 transition active:scale-95"
          >
            <MapPin className="w-4 h-4" />
            <span>{t('recAlertBtn')}</span>
          </button>
          <a
            href="tel:+77073338899"
            onClick={resolveEmergencyAlert}
            className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-600 transition active:scale-95 text-center"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>{t('callShepherd')}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
