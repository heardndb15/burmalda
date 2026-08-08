import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Crown, Zap, Check, Gift, Wallet, Banknote } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '0$',
    period: 'навсегда',
    features: ['3 резюме', '10 шаблонов (бесплатные)', 'ATS-анализ (базовый)', 'Экспорт в PDF с водяным знаком'],
    current: false,
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '9.9$',
    period: 'в месяц',
    features: ['Безлимит резюме', 'Все шаблоны, включая Pro', 'AI-генератор текстов', 'Без водяного знака', 'Продвинутая аналитика', 'Приоритетная поддержка'],
    current: true,
    highlight: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: '19$',
    period: 'в месяц',
    features: ['Всё из Pro', '5 пользователей', 'Общие шаблоны компании', 'Роли и доступы', 'Персональный менеджер'],
    current: false,
    highlight: false,
  },
];

export const BillingPage: React.FC = () => {
  const { user } = useApp();
  const [period, setPeriod] = useState<'month' | 'year'>('month');
  const [selected, setSelected] = useState<string>(user.plan);

  const effectivePrice = (p: string, planId: string) => {
    if (planId === 'free') return p;
    const base = planId === 'pro' ? 9.9 : 19;
    return period === 'year' ? `${Math.round(base * 12 * 0.8)}` : String(base);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Тарифы и оплата"
        subtitle="Выберите план — поменять можно в любой момент"
        badge={user.plan !== 'free' ? <Badge tone="amber"><Crown className="w-3 h-3" /> {user.plan === 'pro' ? 'Pro' : 'Team'} активен</Badge> : undefined}
      />

      {/* Period toggle */}
      <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
        {(['month', 'year'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              period === p ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {p === 'month' ? 'Помесячно' : 'На год (−20%)'}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const price = effectivePrice(plan.price, plan.id);
          const isCurrent = selected === plan.id;
          return (
            <div
              key={plan.id}
              className={`glass-card rounded-3xl p-6 border flex flex-col ${
                plan.highlight ? 'border-emerald-500/60 shadow-xl shadow-emerald-950/40 relative' : 'border-slate-800'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-[10px] font-black uppercase tracking-wider">
                  Популярный
                </span>
              )}
              <div className="flex items-center gap-2 mb-1">
                {plan.id === 'pro' && <Crown className="w-5 h-5 text-amber-400" />}
                {plan.id === 'team' && <Wallet className="w-5 h-5 text-blue-400" />}
                {plan.id === 'free' && <Zap className="w-5 h-5 text-slate-400" />}
                <h3 className="text-lg font-black text-white">{plan.name}</h3>
              </div>
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="text-3xl font-black text-white">{price}$</span>
                <span className="text-xs text-slate-400">/ {plan.period}</span>
              </div>
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={isCurrent ? 'secondary' : plan.highlight ? 'primary' : 'outline'}
                className="w-full"
                onClick={() => setSelected(plan.id)}
              >
                {isCurrent ? 'Текущий план' : plan.id === 'free' ? 'Перейти на Free' : 'Выбрать'}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Текущий план" subtitle="Детали подписки">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-xs text-slate-300">Тариф</span>
              <span className="text-xs font-bold text-white capitalize">{user.plan}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-xs text-slate-300">Следующее списание</span>
              <span className="text-xs font-bold text-white">12 сентября 2026</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-xs text-slate-300">Создано резюме</span>
              <span className="text-xs font-bold text-white">{user.cvsCreated} / безлимит</span>
            </div>
            <Button variant="danger" size="sm" className="w-full">Отменить подписку</Button>
          </div>
        </Card>

        <Card title="Способы оплаты" subtitle="Платёжные методы">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center font-black text-blue-300 text-xs">
                VISA
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-white">Visa •••• 4821</p>
                <p className="text-[11px] text-slate-400">Основной · до 09/27</p>
              </div>
              <Badge tone="emerald">по умолчанию</Badge>
            </div>
            <Button variant="secondary" size="sm" className="w-full">
              <Banknote className="w-4 h-4" /> Добавить карту
            </Button>
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-200 flex items-start gap-2">
              <Gift className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <span>Промокод? Примените на странице оплаты — первые 2 недели Pro бесплатно.</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
