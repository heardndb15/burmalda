import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import {
  ArrowLeft,
  Copy,
  Download,
  Share2,
  Trash2,
  FilePenLine,
  Mail,
  Phone,
  MapPin,
  Globe,
  Link2,
  Eye,
  Sparkles,
} from 'lucide-react';

export const ResumeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getResume, getTemplate, deleteResume, duplicateResume, resumes, setActiveResumeId } = useApp();
  const navigate = useNavigate();

  const resume = id ? getResume(id) : undefined;

  if (!resume) {
    return (
      <EmptyState
        icon={FilePenLine}
        title="Резюме не найдено"
        description="Возможно, оно было удалено. Вернитесь к списку резюме."
        action={<Button onClick={() => navigate('/resumes')}>К списку резюме</Button>}
      />
    );
  }

  const template = getTemplate(resume.templateId);

  const handleDelete = () => {
    deleteResume(resume.id);
    navigate('/resumes');
  };

  const handleDuplicate = () => {
    duplicateResume(resume.id);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={resume.name}
        subtitle={`${resume.title} · шаблон ${template?.name ?? '—'}`}
        badge={
          <Badge tone={resume.status === 'optimized' ? 'emerald' : resume.status === 'completed' ? 'blue' : resume.status === 'in_progress' ? 'amber' : 'slate'}>
            {resume.status === 'optimized'
              ? 'Оптимизировано'
              : resume.status === 'completed'
              ? 'Готово'
              : resume.status === 'in_progress'
              ? 'В работе'
              : 'Черновик'}
          </Badge>
        }
        actions={
          <>
            <Button variant="ghost" onClick={() => navigate('/resumes')}>
              <ArrowLeft className="w-4 h-4" /> Назад
            </Button>
            <Button variant="secondary" onClick={handleDuplicate}>
              <Copy className="w-4 h-4" /> Дублировать
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <Trash2 className="w-4 h-4" /> Удалить
            </Button>
          </>
        }
      />

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Просмотры">
          <p className="text-2xl font-black text-white">{resume.stats.views.toLocaleString('ru-RU')}</p>
          <p className="text-[10px] text-slate-400">последний: {resume.stats.lastViewed}</p>
        </Card>
        <Card title="Скачивания">
          <p className="text-2xl font-black text-white">{resume.stats.downloads}</p>
          <p className="text-[10px] text-slate-400">PDF-версий</p>
        </Card>
        <Card title="Отклики">
          <p className="text-2xl font-black text-white">{resume.stats.applications}</p>
          <p className="text-[10px] text-slate-400">из них интервью: {resume.stats.interviews}</p>
        </Card>
        <Card title="ATS-скоринг">
          <p className="text-2xl font-black text-emerald-400">{resume.atsScore}/100</p>
          <Progress value={resume.atsScore} color="bg-emerald-500" className="mt-1.5" />
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* CV Preview */}
        <div className="lg:col-span-2">
          <Card
            title="Предпросмотр"
            subtitle={`шаблон ${template?.name ?? '—'}`}
            action={
              <Button size="sm" variant="secondary">
                <Download className="w-3.5 h-3.5" /> PDF
              </Button>
            }
          >
            <div className={`grid sm:grid-cols-[200px_1fr] gap-px rounded-xl overflow-hidden bg-slate-800/60 border border-slate-800`}>
              <div className="bg-slate-900 p-4 space-y-4">
                {resume.personalInfo.photoUrl ? (
                  <img
                    src={resume.personalInfo.photoUrl}
                    alt={resume.personalInfo.fullName}
                    className="w-16 h-16 rounded-2xl object-cover border border-emerald-500/40 mb-2"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-white font-black text-xl mb-2">
                    {resume.personalInfo.fullName
                      .split(' ')
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </div>
                )}
                <p className="text-base font-black text-white leading-tight">{resume.personalInfo.fullName}</p>
                <p className="text-[11px] text-emerald-400 font-semibold">{resume.personalInfo.headline}</p>

                <div className="space-y-1.5 text-[11px] text-slate-400">
                  {resume.personalInfo.location && (
                    <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {resume.personalInfo.location}</p>
                  )}
                  {resume.personalInfo.email && (
                    <p className="flex items-center gap-1.5 break-all"><Mail className="w-3 h-3 shrink-0" /> {resume.personalInfo.email}</p>
                  )}
                  {resume.personalInfo.phone && (
                    <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {resume.personalInfo.phone}</p>
                  )}
                  {resume.personalInfo.linkedin && (
                    <p className="flex items-center gap-1.5 truncate"><Link2 className="w-3 h-3 shrink-0" /> {resume.personalInfo.linkedin}</p>
                  )}
                  {resume.personalInfo.website && (
                    <p className="flex items-center gap-1.5 truncate"><Globe className="w-3 h-3 shrink-0" /> {resume.personalInfo.website}</p>
                  )}
                </div>

                {resume.skills.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">Навыки</p>
                    <div className="flex flex-wrap gap-1">
                      {resume.skills.slice(0, 12).map((s) => (
                        <span key={s.id} className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] border border-emerald-500/30">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {resume.languages.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">Языки</p>
                    <div className="space-y-1 text-[11px] text-slate-300">
                      {resume.languages.map((l) => (
                        <div key={l.id} className="flex justify-between">
                          <span>{l.name}</span>
                          <span className="text-slate-500">{l.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-950/60 p-5 space-y-5">
                {resume.personalInfo.summary && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1.5">О себе</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{resume.personalInfo.summary}</p>
                  </div>
                )}

                {resume.workExperience.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">Опыт работы</p>
                    <div className="space-y-4">
                      {resume.workExperience.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex flex-wrap justify-between gap-1">
                            <p className="text-xs font-bold text-white">{exp.position}</p>
                            <span className="text-[10px] text-slate-500">{exp.startDate} — {exp.endDate}</span>
                          </div>
                          <p className="text-[11px] text-slate-400">{exp.company}</p>
                          {exp.achievements.length > 0 && (
                            <ul className="mt-1.5 space-y-1">
                              {exp.achievements.slice(0, 3).map((a, i) => (
                                <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                                  <span className="text-emerald-400 mt-0.5">•</span> {a}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {resume.education.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">Образование</p>
                    <div className="space-y-2">
                      {resume.education.map((ed) => (
                        <div key={ed.id}>
                          <p className="text-xs font-bold text-white">{ed.institution}</p>
                          <p className="text-[11px] text-slate-400">{ed.degree}, {ed.field}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {resume.projects.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">Проекты</p>
                    <div className="space-y-2">
                      {resume.projects.map((p) => (
                        <div key={p.id}>
                          <p className="text-xs font-bold text-white">{p.name}</p>
                          <p className="text-[11px] text-slate-400">{p.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {resume.certificates.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">Сертификаты</p>
                    <div className="space-y-1 text-[11px] text-slate-300">
                      {resume.certificates.map((c) => (
                        <p key={c.id}>{c.name} — {c.issuer}</p>
                      ))}
                    </div>
                  </div>
                )}

                {resume.achievements.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">Достижения</p>
                    <ul className="space-y-1">
                      {resume.achievements.map((a) => (
                        <li key={a.id} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <span className="text-amber-400 mt-0.5">★</span> {a.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {resume.completeness < 100 && (
                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[11px] text-amber-200">
                    Незаполнено: {100 - resume.completeness}% разделов. Откройте разделы «Контент», чтобы улучшить резюме.
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Side actions */}
        <div className="space-y-6">
          <Card title="Полнота резюме" subtitle={`${resume.completeness}% заполнено`}>
            <Progress value={resume.completeness} color="bg-emerald-500" showLabel className="mb-4" />
            <div className="space-y-2 text-xs text-slate-300">
              {[
                { label: 'Контакты', ok: !!resume.personalInfo.email },
                { label: 'Опыт работы', ok: resume.workExperience.length > 0 },
                { label: 'Навыки', ok: resume.skills.length > 0 },
                { label: 'Образование', ok: resume.education.length > 0 },
                { label: 'Проекты', ok: resume.projects.length > 0 },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className={item.ok ? 'text-slate-200' : 'text-slate-500'}>{item.label}</span>
                  <span className={item.ok ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {item.ok ? 'заполнено' : 'пусто'}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="AI-рекомендации" subtitle="на основе вакансий вашей ниши">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-200 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                <span>Добавьте метрики в описание опыта — конверсия в отклики растёт на 38%.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
                <Eye className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-400" />
                <span>Запустите ATS-анализ, чтобы проверить совместимость с конкретной вакансией.</span>
              </div>
              <Button size="sm" className="w-full" onClick={() => navigate('/ats')}>
                <Sparkles className="w-3.5 h-3.5" /> Проверить ATS
              </Button>
              <Button size="sm" variant="outline" className="w-full" onClick={() => navigate('/export')}>
                <Share2 className="w-3.5 h-3.5" /> Публичная ссылка
              </Button>
            </div>
          </Card>

          <Card title="Связанные резюме" subtitle="чтобы не потерять">
            <div className="space-y-2">
              {resumes
                .filter((r) => r.id !== resume.id)
                .slice(0, 3)
                .map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setActiveResumeId(r.id);
                      navigate(`/resumes/${r.id}`);
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition text-xs text-slate-300"
                  >
                    {r.name}
                  </button>
                ))}
              {resumes.length <= 1 && <p className="text-xs text-slate-500">Других резюме пока нет.</p>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
