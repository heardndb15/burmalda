import React from 'react';
import { Layers, HelpCircle } from 'lucide-react';

interface MapControlsProps {
  layers: {
    pastures: boolean;
    herds: boolean;
    waterSources: boolean;
    dangerZones: boolean;
    showNDVI: boolean;
  };
  setLayers: React.Dispatch<
    React.SetStateAction<{
      pastures: boolean;
      herds: boolean;
      waterSources: boolean;
      dangerZones: boolean;
      showNDVI: boolean;
    }>
  >;
}

export const MapControls: React.FC<MapControlsProps> = ({ layers, setLayers }) => {
  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const layerItems = [
    { key: 'pastures' as const, label: 'Пастбища', color: 'text-emerald-400' },
    { key: 'herds' as const, label: 'Стада', color: 'text-blue-400' },
    { key: 'waterSources' as const, label: 'Источники воды', color: 'text-cyan-400' },
    { key: 'dangerZones' as const, label: 'Опасные зоны', color: 'text-red-400' },
    { key: 'showNDVI' as const, label: 'NDVI Вегетация', color: 'text-amber-400 font-extrabold' },
  ];

  return (
    <div className="glass-panel p-3.5 rounded-2xl border border-slate-800 space-y-2.5 max-w-[200px]">
      <div className="flex items-center space-x-1.5 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
        <Layers className="w-3.5 h-3.5 text-emerald-400" />
        <span>Слои карты</span>
      </div>

      <div className="space-y-1.5 text-xs">
        {layerItems.map((item) => (
          <label
            key={item.key}
            className="flex items-center space-x-2.5 cursor-pointer text-slate-300 hover:text-white select-none transition"
          >
            <input
              type="checkbox"
              checked={layers[item.key]}
              onChange={() => toggleLayer(item.key)}
              className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-600 focus:ring-offset-slate-950 w-4 h-4 cursor-pointer"
            />
            <span className={item.color}>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
