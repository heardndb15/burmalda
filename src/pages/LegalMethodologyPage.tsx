import React from 'react';
import { Scale, ShieldAlert, CheckCircle2, FileText, Globe } from 'lucide-react';

export const LegalMethodologyPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/40 text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-black border border-indigo-500/40 inline-flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5" />
          <span>Data & Legal Transparency</span>
        </span>
        <h1 className="text-3xl font-black text-white">Методология данных и Юридические оговорки</h1>
        <p className="text-xs text-slate-300">
          Официальные правила обработки геоданных, источники и правовые границы AgroRadar.
        </p>
      </div>

      {/* Section 41 & 42 Requirements: Legal Explanations */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 text-xs text-slate-300 leading-relaxed">
        {/* 1. Data Sources */}
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold text-white uppercase text-indigo-400">
            1. Источники данных и статус интеграций
          </h3>
          <p>
            Платформа AgroRadar использует космическую телеметрию <strong>Sentinel-2 (ESA)</strong>, <strong>Landsat-9 (USGS)</strong>, векторы гидрографии и данные GPS-трекеров.
          </p>
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-amber-300 font-bold">
            ⚠️ Все государственные (ИСЖ, Кадастр) и банковские API обозначены в текущей версии платформы как <strong>«Demo integration»</strong> или <strong>«Integration-ready»</strong>. AgroRadar не заявляет о наличии действующих закрытых гос-подключений без заключённых договоров.
          </div>
        </div>

        {/* 2. Calculated vs Actual Metrics */}
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold text-white uppercase text-indigo-400">
            2. Фактические и расчётные показатели
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li><strong>Фактический источник:</strong> Спутниковый вегетационный индекс (NDVI, NDWI), координаты GPS, контуры земельных участков.</li>
            <li><strong>Расчётные показатели (Engine):</strong> Pasture Health Score, Feed Reliability, Water Security, Livestock Pressure, Spatial Risk.</li>
          </ul>
        </div>

        {/* 3. Satellite Limitations */}
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold text-white uppercase text-indigo-400">
            3. Ограничения спутниковых данных
          </h3>
          <p>
            Спутниковый мониторинг зависит от облачности (Cloud Cover &gt; 15%), сезонного снежного покрова и периодичности пролётов спутников (5-10 дней). При высокой облачности система использует интерполяцию предшествующих снимков.
          </p>
        </div>

        {/* 4. Critical Disclaimers (#42 Requirement) */}
        <div className="p-5 rounded-3xl bg-amber-950/20 border border-amber-500/40 space-y-3">
          <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Юридические дисклеймеры AgroRadar</span>
          </h3>
          <ul className="space-y-2 text-slate-200">
            <li>• <strong>Не является государственным решением:</strong> AgroRadar не выносит административных постановлений и решений об изъятии земель. Статус «Требует проверки» является основанием для выезда инспектора акимата.</li>
            <li>• <strong>Не является кредитным решением:</strong> Показатели Financial Passport не представляют собой банковское кредитное одобрение и не заменяют скоринг риск-менеджмента банка.</li>
            <li>• <strong>Отсутствие финансовых гарантий:</strong> Сформированный отчёт не гарантирует выдачу субсидий или одобрение кредита.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
