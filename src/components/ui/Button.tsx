import React from 'react';
import { clsx } from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-950/50',
  secondary:
    'bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700',
  ghost: 'text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium',
  danger: 'bg-red-600 hover:bg-red-500 text-white font-bold shadow-lg shadow-red-950/40',
  outline: 'border border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40 font-semibold',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-sm rounded-xl',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
};
