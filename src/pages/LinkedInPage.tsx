import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { StatCard } from '../components/ui/StatCard';
import { Globe, Sparkles, Users, Zap, CheckCircle2, Link2 } from 'lucide-react';

const profileSections = [
  { label: 'Фото и баннер', ok: true },
  { label: 'Заголовок (headline)', ok: true },
  { label: 'Описание About', ok: true },
  { label: 'Опыт работы (3+ мест)', ok: true },
  { label: 'Навыки (5+)', ok: true },
  { label: 'Рекомендации (2+)', ok: false },
  { label: 'Достижения и проекты', ok: true },
];

const headlineVariants = [
  'Senior Fullstack Developer | React, Node.js, TypeScript',
  'Помогаю финтех-компаниям строить быстрые продукты · −74% времени загрузки',
  'Fullstack Engineer & Tech Lead · 9 лет · Команды до 8 человек',
];

export const LinkedInPage: React.FC = () => {
  const { user } = useApp();
  const [headline, setHeadline] = useState(user.headline);
  const [activeVariant, setActiveVariant] = useState(-1);

  const okCount = profileSections.filter((s) => s.ok).length;
  const strength = Math.round((okCount / profileSections.length) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="LinkedIn-оптимизация"
        subtitle="Профиль, который находят рекрутёры"
        badge={<Badge tone="blue"><Globe className="w-3 h-3" /> Всеохватность: {strength}%</Badge>}
        actions={
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition">
            <Link2 className="w-4 h-4" /> Обновить из LinkedIn
          </button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Просмотры профиля" value="1 240" sub="за 90 дней (+18%)" tone="emerald" />
        <StatCard icon={Zap} label="Поиск в Top-10" value="86%" sub="рекрутёры находят вас" tone="amber" />
        <StatCard icon={Sparkles} label="Подписчики" value="1 850" sub="прирост 6% в месяц" tone="blue" />
        <StatCard icon={Globe} label="SSI Score" value="74/100" sub="выше 88% профилей" tone="violet" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Strength */}
        <Card title="Сила профиля" subtitle="Чек-лист для высоких позиций в поиске">
          <Progress value={strength} color={strength >= 80 ? 'bg-emerald-500' : strength >= 60 ? 'bg-amber-500' : 'bg-red-500'} showLabel className="mb-4" />
          <div className="space-y-2">
            {profileSections.map((s, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs">
                <span className={s.ok ? 'text-slate-200' : 'text-slate-500'}>{s.label}</span>
                {s.ok ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-[10px] font-bold text-amber-300 border border-amber-500/40 rounded-full px-2 py-0.5">
                    добавить
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Headline optimizer */}
        <Card title="Оптимизатор заголовка" subtitle="Headline — первое, что видят рекрутёры">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Текущий заголовок</label>
              <input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300 mb-2">AI-варианты (нажмите, чтобы выбрать):</p>
              <div className="space-y-2">
                {headlineVariants.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setHeadline(v);
                      setActiveVariant(idx);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                      activeVariant === idx
                        ? 'border-emerald-500 bg-emerald-950/50 text-emerald-200'
                        : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-emerald-500/40'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-[11px] text-blue-200">
              💡 Хороший headline: «Роль + ключевые технологии + результат». До 220 символов, используйте их.
            </div>
          </div>
        </Card>
      </div>

      <Card title="Ключевые слова для поиска" subtitle="Что вводит рекрутёр, чтобы вас найти">
        <div className="flex flex-wrap gap-2">
          {['Fullstack', 'React', 'TypeScript', 'Node.js', 'Tech Lead', 'GraphQL', 'Highload', 'Product Development'].map((kw, idx) => (
            <span key={kw} className={`px-3 py-1.5 rounded-full border text-[11px] font-bold ${
              idx < 4
                ? 'bg-emerald-950 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}>
              {idx < 4 ? '✓ ' : '+ '}{kw}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-3">
          Зелёные слова уже есть в вашем профиле. Серые — рекомендуется добавить в About и опыт.
        </p>
      </Card>
    </div>
  );
};
