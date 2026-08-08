import React from 'react';
import { Link } from 'react-router-dom';
import {
  FilePenLine,
  ArrowRight,
  Sparkles,
  WandSparkles,
  ShieldCheck,
  Target,
  Bot,
  Download,
  CheckCircle2,
  Star,
} from 'lucide-react';

const features = [
  {
    icon: WandSparkles,
    tone: 'text-emerald-400 bg-emerald-950 border-emerald-500/30',
    title: 'AI-генерация за минуту',
    desc: 'Заполните данные один раз — нейросеть соберёт резюме, сопроводительное письмо и подготовит ответы на вопросы.',
  },
  {
    icon: ShieldCheck,
    tone: 'text-blue-400 bg-blue-950 border-blue-500/30',
    title: 'Проход ATS-систем',
    desc: 'Встроенный ATS-анализ проверяет совместимость с 92% систем подбора и подсказывает ключевые слова.',
  },
  {
    icon: Target,
    tone: 'text-amber-400 bg-amber-950 border-amber-500/30',
    title: 'Охотитесь на вакансии',
    desc: 'Сопоставляем ваше резюме с требованиями вакансий и считаем процент соответствия до отклика.',
  },
];

const templates = [
  { name: 'Modern', grad: 'from-emerald-600 via-teal-500 to-cyan-500' },
  { name: 'Technical', grad: 'from-violet-600 via-purple-500 to-fuchsia-500' },
  { name: 'Creative', grad: 'from-amber-500 via-orange-500 to-rose-500' },
  { name: 'Executive', grad: 'from-rose-600 via-red-500 to-orange-500' },
];

const testimonials = [
  {
    name: 'Ольга Смирнова',
    role: 'Product Manager, EPAM',
    text: 'За вечер собрала резюме, которое обошло 87% конкурентов в ATS. Три интервью за первую неделю.',
    rating: 5,
  },
  {
    name: 'Дмитрий Волков',
    role: 'Fullstack Developer, iTechArt',
    text: 'AI-ассистент переписал Summary с метриками — сразу почувствовал разницу в откликах.',
    rating: 5,
  },
  {
    name: 'Анна Ким',
    role: 'UX/UI Designer, freelancer',
    text: 'Наконец-то красивые шаблоны, которые ещё и проходят ATS. Подписка окупилась с первого оффера.',
    rating: 5,
  },
];

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#08140e] text-slate-100 flex flex-col font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 glass-header px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-900/50">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <FilePenLine className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            CV<span className="text-emerald-400">Gen</span>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition">
            Войти
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-900/40 transition active:scale-95"
          >
            Начать бесплатно
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 pb-14 px-6 max-w-6xl mx-auto text-center flex flex-col items-center">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Резюме, которые проходят ATS и нравятся людям</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl">
          Создайте резюме, которое <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">принесёт оффер</span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
          CVGen генерирует резюме на основе ваших данных, анализирует вакансии и готовит к собеседованию.
          Один профиль — десятки адаптированных резюме.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black text-base shadow-xl shadow-emerald-950 hover:from-emerald-500 hover:to-teal-400 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <span>Создать резюме бесплатно</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/templates"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-base hover:bg-slate-800 transition flex items-center justify-center space-x-2"
          >
            <span>Посмотреть шаблоны</span>
          </Link>
        </div>

        <p className="mt-5 text-xs text-slate-500">
          Бесплатно: 3 резюме · ATS-анализ · экспорт в PDF. Без карты.
        </p>
      </section>

      {/* Live CV Preview */}
      <section className="px-4 lg:px-8 max-w-5xl mx-auto w-full mb-16">
        <div className="glass-panel p-3 sm:p-5 rounded-3xl border border-emerald-500/30 shadow-2xl">
          <div className="flex items-center justify-between mb-4 px-2">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Живой пример генерации
              </span>
              <h3 className="text-lg font-extrabold text-white">Из наброска — в резюме за 30 секунд</h3>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <Bot className="w-3.5 h-3.5 mr-1" /> AI-генерировано
            </span>
          </div>

          <div className="grid sm:grid-cols-[240px_1fr] gap-px rounded-2xl overflow-hidden bg-slate-800/60 border border-slate-800">
            {/* Left sidebar of CV */}
            <div className="bg-slate-900 p-5 space-y-4">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-black text-xl mb-3">
                  АП
                </div>
                <p className="text-base font-black text-white">Алексей Петров</p>
                <p className="text-[11px] text-emerald-400 font-semibold">Senior Fullstack Developer</p>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-400">
                <p>📍 Минск, Беларусь</p>
                <p>✉️ alex@cvgen.ai</p>
                <p>🔗 linkedin.com/in/alex</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">Навыки</p>
                <div className="flex flex-wrap gap-1">
                  {['React', 'TS', 'Node.js', 'GraphQL', 'Docker'].map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] border border-emerald-500/30">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">ATS-скоринг</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full w-[92%] bg-emerald-500 rounded-full" />
                  </div>
                  <span className="text-xs font-black text-emerald-400">92</span>
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="bg-slate-950/60 p-5 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1.5">Summary</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fullstack-разработчик с 9-летним опытом. Сократил время загрузки дашбордов на 74%,
                  руководил командой из 8 человек, вёл 20+ продуктов от идеи до релиза.
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1.5">Опыт</p>
                <div className="space-y-3">
                  {[
                    ['Senior Fullstack Developer · ITransition', '2022 — наст. время'],
                    ['Frontend Developer · EPAM Systems', '2019 — 2022'],
                  ].map(([pos, dates]) => (
                    <div key={pos} className="flex justify-between text-xs">
                      <span className="text-white font-semibold">{pos}</span>
                      <span className="text-slate-500">{dates}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1.5">Достижения</p>
                <ul className="space-y-1 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    −74% времени загрузки ключевых страниц
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    500+ проведённых технических интервью
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
            <span className="text-[11px] text-slate-500">
              Данные заполняются один раз — AI адаптирует резюме под каждую вакансию.
            </span>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition">
              <Download className="w-3.5 h-3.5" />
              Скачать PDF
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full border-t border-slate-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Всё, чтобы найти работу мечты</h2>
          <p className="text-sm text-slate-400 mt-2">Один инструмент на весь путь: от резюме до оффера.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="glass-card p-6 rounded-2xl border border-slate-800">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${f.tone}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Templates */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full border-t border-slate-800">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Шаблоны под вашу сферу</h2>
            <p className="text-sm text-slate-400 mt-2">Дизайн, который выглядит дорого и проходит ATS.</p>
          </div>
          <Link to="/templates" className="hidden sm:flex text-sm font-bold text-emerald-400 hover:underline items-center gap-1">
            Все шаблоны <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map((tpl) => (
            <div key={tpl.name} className="glass-card rounded-2xl border border-slate-800 p-3 group cursor-pointer">
              <div className={`h-40 rounded-xl bg-gradient-to-tr ${tpl.grad} mb-3 opacity-80 group-hover:opacity-100 transition flex items-center justify-center`}>
                <span className="text-white font-black text-lg bg-slate-950/30 px-3 py-1 rounded-lg">{tpl.name}</span>
              </div>
              <p className="text-center text-xs font-bold text-white">{tpl.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full border-t border-slate-800">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white">Им уже помогло</h2>
          <p className="text-sm text-slate-400 mt-2">Более 12 000 резюме создано с CVGen.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-card p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">«{t.text}»</p>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="text-[11px] text-slate-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-14 max-w-4xl mx-auto w-full">
        <div className="glass-panel rounded-3xl border border-emerald-500/30 p-10 text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl font-extrabold text-white">Готовы получить свой оффер?</h2>
          <p className="text-sm text-slate-300 mt-3 max-w-xl mx-auto">
            Создайте первое резюме бесплатно — без карты и ограничений по времени.
          </p>
          <Link
            to="/register"
            className="mt-7 inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black shadow-xl shadow-emerald-950 hover:from-emerald-500 transition"
          >
            Начать бесплатно <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>© 2026 CVGen. Все права защищены. Резюме, которые работают.</p>
      </footer>
    </div>
  );
};
