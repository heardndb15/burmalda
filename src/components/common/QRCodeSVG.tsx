import React from 'react';

export const QRCodeSVG: React.FC<{ value: string; size?: number }> = ({ value, size = 120 }) => {
  // Generates a clean styled SVG QR matrix simulation for demo verification URLs
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="rounded-xl bg-white p-2 shadow-inner border border-slate-200">
      {/* Corner position squares */}
      <rect x="5" y="5" width="26" height="26" fill="#0f172a" rx="4" />
      <rect x="9" y="9" width="18" height="18" fill="#ffffff" rx="2" />
      <rect x="13" y="13" width="10" height="10" fill="#0f172a" rx="1" />

      <rect x="69" y="5" width="26" height="26" fill="#0f172a" rx="4" />
      <rect x="73" y="9" width="18" height="18" fill="#ffffff" rx="2" />
      <rect x="77" y="13" width="10" height="10" fill="#0f172a" rx="1" />

      <rect x="5" y="69" width="26" height="26" fill="#0f172a" rx="4" />
      <rect x="9" y="73" width="18" height="18" fill="#ffffff" rx="2" />
      <rect x="13" y="77" width="10" height="10" fill="#0f172a" rx="1" />

      {/* Data dots matrix pattern */}
      <rect x="38" y="10" width="8" height="8" fill="#059669" />
      <rect x="50" y="10" width="8" height="8" fill="#0f172a" />
      <rect x="38" y="22" width="8" height="8" fill="#0f172a" />
      <rect x="50" y="22" width="8" height="8" fill="#059669" />

      <rect x="10" y="38" width="8" height="8" fill="#0f172a" />
      <rect x="22" y="38" width="8" height="8" fill="#059669" />
      <rect x="38" y="38" width="8" height="8" fill="#0f172a" />
      <rect x="50" y="38" width="8" height="8" fill="#0f172a" />
      <rect x="62" y="38" width="8" height="8" fill="#059669" />
      <rect x="74" y="38" width="8" height="8" fill="#0f172a" />

      <rect x="10" y="50" width="8" height="8" fill="#059669" />
      <rect x="22" y="50" width="8" height="8" fill="#0f172a" />
      <rect x="38" y="50" width="8" height="8" fill="#059669" />
      <rect x="50" y="50" width="8" height="8" fill="#0f172a" />
      <rect x="62" y="50" width="8" height="8" fill="#0f172a" />
      <rect x="74" y="50" width="8" height="8" fill="#059669" />

      <rect x="38" y="62" width="8" height="8" fill="#0f172a" />
      <rect x="50" y="62" width="8" height="8" fill="#059669" />
      <rect x="62" y="62" width="8" height="8" fill="#0f172a" />
      <rect x="74" y="62" width="8" height="8" fill="#0f172a" />

      <rect x="38" y="74" width="8" height="8" fill="#059669" />
      <rect x="50" y="74" width="8" height="8" fill="#0f172a" />
      <rect x="62" y="74" width="8" height="8" fill="#0f172a" />
      <rect x="74" y="74" width="8" height="8" fill="#059669" />
    </svg>
  );
};
