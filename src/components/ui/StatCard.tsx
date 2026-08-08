import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  tone?: 'emerald' | 'amber' | 'red' | 'blue' | 'violet' | 'cyan';
  iconBg?: string;
}

const toneMap: Record<string, string> = {
  emerald: 'bg-emerald-950 border-emerald-500/40 text-emerald-400',
  amber: 'bg-amber-950 border-amber-500/40 text-amber-400',
  red: 'bg-red-950 border-red-500/40 text-red-400',
  blue: 'bg-blue-950 border-blue-500/40 text-blue-400',
  violet: 'bg-violet-950 border-violet-500/40 text-violet-400',
  cyan: 'bg-cyan-950 border-cyan-500/40 text-cyan-400',
};

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  sub,
  tone = 'emerald',
  iconBg,
}) => {
  return (
    <div className="glass-panel p-4 rounded-2xl">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
            iconBg ?? toneMap[tone]
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-slate-400 truncate">{label}</p>
          <p className="text-xl font-black text-white leading-tight">{value}</p>
          {sub && <p className="text-[10px] text-slate-400 truncate">{sub}</p>}
        </div>
      </div>
    </div>
  );
};
