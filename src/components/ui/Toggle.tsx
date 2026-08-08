import React from 'react';
import { clsx } from 'clsx';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, description }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between gap-4 w-full text-left"
    >
      {(label || description) && (
        <div>
          {label && <p className="text-xs font-semibold text-white">{label}</p>}
          {description && <p className="text-[11px] text-slate-400">{description}</p>}
        </div>
      )}
      <div
        className={clsx(
          'w-11 h-6 rounded-full p-0.5 transition shrink-0',
          checked ? 'bg-emerald-500' : 'bg-slate-700'
        )}
      >
        <div
          className={clsx(
            'w-5 h-5 rounded-full bg-white transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </div>
    </button>
  );
};
