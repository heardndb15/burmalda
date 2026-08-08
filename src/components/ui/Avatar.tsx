import React from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
};

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md' }) => {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return src ? (
    <img src={src} alt={name} className={`${sizes[size]} rounded-xl object-cover border border-emerald-500/40`} />
  ) : (
    <div
      className={`${sizes[size]} rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center`}
    >
      {initials}
    </div>
  );
};
