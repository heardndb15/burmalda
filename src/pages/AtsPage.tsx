import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  FileText,
} from 'lucide-react';

const atsChecks = [
  { id: 1, label: 'Резюме в формате PDF (текстовом)', pass: true },
  { id: 2, label: 'Одна колонка для ATS-парсинга', pass: true },
  { id: 3, label: 'Стандартные заголовки разделов', pass: true },
  { id: 4, label: 'Ключевые слова из вакансии в начале', pass: true },
  { id: 5, label: 'Нет таблиц, графиков и картинок', pass: true },
  { id: 6, label: 'Контакты в шапке резюме', pass: true },
  { id: 7, label: 'Ключевые слова из вакансии в начале', pass: false },
  { id: 8, label: 'Актуальная дата последнего места работы', pass: false },
];

const demoKeywords = ['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Docker', 'Kubernetes', 'CI/CD', 'Redis'];

export const AtsPage: React.FC = () => {
  const { resumes, activeResume, setActiveResumeId, updateResume } = useApp();
  const [jobDescription, setJobDescription] = useState(
    'Ищем Senior Fullstack Developer: React, TypeScript, Node.js, GraphQL, PostgreSQL, Docker, Kubernetes, CI/CD, Redis. Опыт от 5 лет, менторство команды.'
  );
  const [checked, setChecked] = useState(false);

  const resume = activeResume ?? resumes[0];

  const runCheck = () => {
    if (!resume) return;
    setChecked(true);
  };

  const foundKeywords = resume
    ? demoKeywords.filter((kw) =>
        resume.skills.some((s) => s.name.toLowerCase().includes(kw.toLowerCase()))
      )
    : [];
  const missingKeywords = demoKeywords.filter((kw) => !foundKeywords.includes(kw));
  const keywordScore = resume ? Math.round((foundKeywords.length / demoKeywords.length) * 100) : 0;
  const overallScore = resume ? Math.round((resume.atsScore + keywordScore) / 2) : 0;

  const passCount = atsChecks.filter((c) => c.pass).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Проверка ATS"
        subtitle="Как ваше резюме воспримут системы подбора (ATS)"
        badge={<Badge tone="emerald"><ShieldCheck className="w-3 h-3" /> ATS-анализатор</Badge>}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <Card title="Выберите резюме и вставьте вакансию" subtitle="Ключевые слова из описания будут сопоставлены с навыками">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Резюме</label>
              <div className="flex flex-wrap gap-2">
                {resumes.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setActiveResumeId(r.id);
                      setChecked(false);
                    }}
                    className={`px-3 py-2 rounded-xl border text-[11px] font-semibold transition ${
                      resume?.id === r.id
                        ? 'bg-emerald-950 border-emerald-500/60 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Описание вакансии</label>
              <textarea
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  setChecked(false);
                }}
                rows={6}
                className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white resize-none"
              />
            </div>

            <Button onClick={runCheck} disabled={!resume} className="w-full">
              <Search className="w-4 h-4" /> Запустить ATS-анализ
            </Button>
          </div>
        </Card>

        {/* Results */}
        {checked && resume ? (
          <Card title="Результат анализа" subtitle={`Резюме: ${resume.name}`}>
            <div className="text-center mb-5">
              <p className="text-5xl font-black text-emerald-400">{overallScore}</p>
              <p className="text-xs text-slate-400 mt-1">из 100 · ATS-совместимость</p>
            </div>
            <Progress value={overallScore} color={overallScore >= 80 ? 'bg-emerald-500' : overallScore >= 60 ? 'bg-amber-500' : 'bg-red-500'} showLabel />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                <p className="text-[11px] text-emerald-300 font-bold">Найдено ключевых слов</p>
                <p className="text-xl font-black text-white">{foundKeywords.length}/{demoKeywords.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30">
                <p className="text-[11px] text-red-300 font-bold">Не хватает</p>
                <p className="text-xl font-black text-white">{missingKeywords.length}</p>
              </div>
            </div>

            {missingKeywords.length > 0 && (
              <div className="mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
                <p className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" /> Рекомендуем добавить в «Навыки»:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {missingKeywords.map((kw) => (
                    <button
                      key={kw}
                      onClick={() => {
                        updateResume(resume.id, {
                          skills: [
                            ...resume.skills,
                            { id: `ats-${Date.now()}-${kw}`, name: kw, level: 'intermediate', category: 'Из вакансии', years: 2 },
                          ],
                        });
                      }}
                      className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-200 text-[11px] font-bold hover:bg-amber-500/30 transition"
                    >
                      + {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-[11px] text-slate-400 mt-3">
              Нажмите на навык, чтобы мгновенно добавить его в резюме «{resume.name}».
            </p>
          </Card>
        ) : (
          <Card title="Результат анализа">
            <div className="flex flex-col items-center justify-center h-full py-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 mb-3">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <p className="text-xs text-slate-400">Запустите анализ, чтобы увидеть совместимость резюме с вакансией.</p>
            </div>
          </Card>
        )}
      </div>

      <Card title="Базовая ATS-проверка" subtitle={`Пройдено ${passCount} из ${atsChecks.length} пунктов`}>
        <Progress value={(passCount / atsChecks.length) * 100} color="bg-emerald-500" showLabel className="mb-4" />
        <div className="grid sm:grid-cols-2 gap-2">
          {atsChecks.map((c) => (
            <div key={c.id} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300">
              {c.pass ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              )}
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Как пройти ATS на 100%" subtitle="Советы от карьерных консультантов">
        <div className="grid sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <Sparkles className="w-4 h-4 text-amber-400 mb-2" />
            <p className="font-bold text-white mb-1">Зеркальте вакансию</p>
            <p className="text-slate-400">Используйте те же формулировки и названия должностей, что в вакансии.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <FileText className="w-4 h-4 text-blue-400 mb-2" />
            <p className="font-bold text-white mb-1">Текст, не картинка</p>
            <p className="text-slate-400">Не сохраняйте резюме изображением — ATS не читает картинки.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
