import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Building2, Landmark, UserCheck, ShieldAlert, Sparkles, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const RoleSwitcher: React.FC = () => {
  const { userRole, setUserRole, addAuditLog, setIsDemoTourOpen } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const roleConfigs: Record<
    UserRole,
    { label: string; sub: string; icon: React.ComponentType<{ className?: string }>; color: string; defaultRoute: string }
  > = {
    FARMER: {
      label: 'Фермер КХ',
      sub: 'Управление хозяйством',
      icon: UserCheck,
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      defaultRoute: '/app',
    },
    AKIMAT_ADMIN: {
      label: 'Акимат (B2G)',
      sub: 'Цифровой сельский округ',
      icon: Building2,
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      defaultRoute: '/government',
    },
    BANK_ANALYST: {
      label: 'Банк / МФО (B2B)',
      sub: 'Financial Risk Intelligence',
      icon: Landmark,
      color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      defaultRoute: '/bank',
    },
    SUPER_ADMIN: {
      label: 'Супер Администратор',
      sub: 'Полный доступ платформы',
      icon: ShieldAlert,
      color: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      defaultRoute: '/app',
    },
    WORKER: {
      label: 'Пастух / Работник',
      sub: 'Мобильный трекинг',
      icon: UserCheck,
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      defaultRoute: '/herd',
    },
  };

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    addAuditLog({
      userRole: role,
      userName: role === 'AKIMAT_ADMIN' ? 'Аким округа' : role === 'BANK_ANALYST' ? 'Банковский аналитик' : 'Фермер КХ',
      action: 'Переключение роли интерфейса',
      target: roleConfigs[role].label,
      ipAddress: '127.0.0.1',
    });

    // Navigate to respective role portal if currently on a different role route
    const currentPath = location.pathname;
    if (role === 'AKIMAT_ADMIN' && !currentPath.startsWith('/government')) {
      navigate('/government');
    } else if (role === 'BANK_ANALYST' && !currentPath.startsWith('/bank')) {
      navigate('/bank');
    } else if (role === 'FARMER' && (currentPath.startsWith('/government') || currentPath.startsWith('/bank'))) {
      navigate('/app');
    }
  };

  const current = roleConfigs[userRole] || roleConfigs.FARMER;
  const CurrentIcon = current.icon;

  return (
    <div className="flex items-center space-x-2">
      {/* Interactive Role Selector Dropdown */}
      <div className="relative group">
        <button className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm ${current.color}`}>
          <CurrentIcon className="w-4 h-4" />
          <div className="text-left hidden sm:block">
            <span className="block leading-tight">{current.label}</span>
            <span className="block text-[9px] opacity-75 font-normal">{current.sub}</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
        </button>

        <div className="absolute right-0 mt-1 hidden group-hover:block w-56 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5">
          <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
            Выбор роли интерфейса
          </div>
          {(['FARMER', 'AKIMAT_ADMIN', 'BANK_ANALYST', 'SUPER_ADMIN'] as UserRole[]).map((r) => {
            const item = roleConfigs[r];
            const Icon = item.icon;
            const isSelected = userRole === r;
            return (
              <button
                key={r}
                onClick={() => handleRoleSelect(r)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left transition my-0.5 ${
                  isSelected ? 'bg-emerald-950/80 text-emerald-400 font-bold border border-emerald-500/30' : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <div className={`p-1.5 rounded-lg border ${item.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] text-slate-400">{item.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Platform 3-in-1 Demo Flow Launcher Button */}
      <button
        onClick={() => setIsDemoTourOpen(true)}
        className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:from-amber-500/30 hover:to-orange-500/30 transition"
        title="Запустить пошаговый тур (1 набор данных -> 3 решения)"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span className="hidden md:inline">Burmalda Demo Tour</span>
      </button>
    </div>
  );
};
