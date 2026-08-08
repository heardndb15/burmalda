import React from 'react';
import { clsx } from 'clsx';

type BadgeTone = 'emerald' | 'amber' | 'red' | 'blue' | 'violet' | 'slate' | 'cyan';

const toneClasses: Record<BadgeTone, string> = {
  emerald: 'bg-emerald-950 text-emerald-300 border-emerald-500/40',
  amber: 'bg-amber-950 text-amber-300 border-amber-500/40',
  red: 'bg-red-950 text-red-300 border-red-500/40',
  blue: 'bg-blue-950 text-blue-300 border-blue-500/40',
  violet: 'bg-violet-950 text-violet-300 border-violet-500/40',
  cyan: 'bg-cyan-950 text-cyan-300 border-cyan-500/40',
  slate: 'bg-slate-800 text-slate-300 border-slate-600/60',
};

export const Badge: React.FC<{ tone?: BadgeTone; className?: string; children: React.ReactNode }> = ({
  tone = 'slate',
  className,
  children,
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border tracking-wide',
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
};
