import React from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { StatCard } from '../components/ui/StatCard';
import {
  Sparkles,
  Globe,
  Link2,
  PenLine,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

const brandChecks = [
  { label: 'Одинаковые ФИО и фото везде', pass: true },
  { label: 'Одна специализация в заголовках', pass: true },
  { label: 'Ссылка на резюме в описании профилей', pass: true },
  { label: 'Активность: публикация раз в 2 недели', pass: false },
  { label: 'Есть личный сайт / портфолио', pass: true },
];

const socials = [
  { name: 'LinkedIn', handle: 'linkedin.com/in/alexpetrov', connected: true, tone: 'text-blue-400' },
  { name: 'GitHub', handle: 'github.com/alexpetrov', connected: true, tone: 'text-slate-300' },
  { name: 'X / Twitter', handle: '@alexpetrov_dev', connected: true, tone: 'text-cyan-400' },
  { name: 'Telegram', handle: '@alexpetrov', connected: true, tone: 'text-sky-400' },
  { name: 'Instagram', handle: '—', connected: false, tone: 'text-pink-400' },
  { name: 'YouTube', handle: '—', connected: false, tone: 'text-red-400' },
];

const passCount = brandChecks.filter((c) => c.pass).length;

export const BrandPage: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Персональный бренд"
        subtitle="Как вас видят рекрутёры и компании в сети"
        badge={<Badge tone="violet"><Sparkles className="w-3 h-3" /> Сила бренда: {Math.round((passCount / brandChecks.length) * 100)}%</Badge>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Globe} label="Охват за месяц" value="4 200" sub="уникальных посетителей" tone="emerald" />
        <StatCard icon={PenLine} label="Публикации" value="12" sub="за последний год" tone="amber" />
        <StatCard icon={Link2} label="Внешние ссылки" value="8" sub="на ваши профили" tone="blue" />
        <StatCard icon={Sparkles} label="Приглашения от HR" value="17" sub="за 90 дней" tone="violet" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Socials */}
        <Card title="Профили и ссылки" subtitle="Единая система аккаунтов">
          <div className="space-y-2.5">
            {socials.map((s) => (
              <div key={s.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <Link2 className={`w-4 h-4 shrink-0 ${s.tone}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white">{s.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{s.handle}</p>
                </div>
                {s.connected ? (
                  <Badge tone="emerald"><CheckCircle2 className="w-3 h-3" /> подключено</Badge>
                ) : (
                  <Badge tone="slate">не подключено</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Consistency checks */}
        <Card title="Проверка консистентности" subtitle={`${passCount} из ${brandChecks.length} пунктов`}>
          <Progress value={(passCount / brandChecks.length) * 100} color="bg-emerald-500" showLabel className="mb-4" />
          <div className="space-y-2">
            {brandChecks.map((c, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300">
                {c.pass ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <span>{c.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-violet-950/40 border border-violet-500/20 text-xs text-violet-200">
            💜 Совет: публикуйтесь раз в 2 недели о работе и обучении — стабильная активность поднимает вас в поиске кандидатов.
          </div>
        </Card>
      </div>

      <Card title="О вашем профиле" subtitle="Как вас описывает AI">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center overflow-hidden shrink-0">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <Sparkles className="w-6 h-6 text-emerald-400" />
            )}
          </div>
          <div>
            <p className="text-base font-bold text-white">{user.name}</p>
            <p className="text-xs text-emerald-400 font-semibold">{user.headline}</p>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Эксперт в fullstack-разработке с сильными лидерскими навыками. Заметен на GitHub
              и LinkedIn, активно пишет технические статьи. Рекомендуется усиливать частоту публикаций.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
