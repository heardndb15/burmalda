import React from 'react';
import { clsx } from 'clsx';

interface ProgressProps {
  value: number;
  max?: number;
  color?: string;
  className?: string;
  showLabel?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  color = 'bg-emerald-500',
  className,
  showLabel = false,
}) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={clsx('h-full rounded-full transition-all', color)}
          style={{ width: `${percent}%` }}
        />
      </div>
      {showLabel && <span className="text-[11px] font-bold text-slate-300">{percent}%</span>}
    </div>
  );
};
