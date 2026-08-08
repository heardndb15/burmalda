import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Send, X, Sparkles, HelpCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAssistant: React.FC = () => {
  const { isAiAssistantOpen, setIsAiAssistantOpen } = useApp();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Привет! Я AI-ассистент CVGen. Могу улучшить резюме, написать сопроводительное письмо или подготовить к собеседованию. Чем помочь?',
      timestamp: 'Только что',
    },
  ]);

  if (!isAiAssistantOpen) return null;

  const quickQuestions = [
    'Улучши мой Summary',
    'Какие навыки добавить?',
    'Напиши cover letter',
    'Проверь ATS-совместимость',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      let aiText = 'CVGen проанализировал ваше резюме. ';
      const lower = query.toLowerCase();

      if (lower.includes('summary') || lower.includes('резюме в целом') || lower.includes('улучш')) {
        aiText =
          '✨ **Рекомендация по Summary:** Начните с сильного результата: «Fullstack-разработчик с 9-летним опытом; сократил время загрузки дашбордов на 74% и вёл команду из 8 человек». Добавьте 2–3 цифры — конверсия в интервью растёт на 38% при упоминании метрик.';
      } else if (lower.includes('навык') || lower.includes('скилл')) {
        aiText =
          '⚡ **Навыки для добавления:** по вашим вакансиям не хватает: **Redis**, **Kafka**, **Next.js App Router**. Совместимость с ATS вырастет примерно на 6%. Обновите раздел «Навыки».';
      } else if (lower.includes('cover') || lower.includes('письм') || lower.includes('сопроводи')) {
        aiText =
          '📄 **Сопроводительное письмо готово** (черновик): «Здравствуйте! Меня зовут Алексей Петров. За 9 лет я построил 20+ продуктов и сокращал время релиза в среднем на 60%...» Откройте раздел «Письма», чтобы отредактировать и отправить.';
      } else if (lower.includes('ats') || lower.includes('совмест') || lower.includes('провер')) {
        aiText =
          '🛡️ **ATS-анализ «Fullstack Developer 2026»:** оценка **92/100**. Рекомендации: замените «профессиональный» на «Senior», добавьте раздел «Сертификаты» в начало, избегайте таблиц и графики — ATS их не читает.';
      } else {
        aiText =
          '📊 **Статус карьеры:** у вас 3 резюме, активный поиск, 23 отклика и 9 интервью за последние 6 месяцев. Конверсия в интервью **39%** — это выше среднего по нише (27%). Продолжайте откликаться на 3–5 вакансий в неделю.';
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end p-2 sm:p-4">
      <div className="w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-2xl flex flex-col h-full max-h-[680px] shadow-2xl overflow-hidden">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                CVGen AI
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </h3>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Онлайн · Карьерный коуч
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsAiAssistantOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                  }}
                />
                <span className="block text-[10px] opacity-60 text-right mt-1.5">{m.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800 overflow-x-auto whitespace-nowrap">
          <div className="flex items-center space-x-2 text-[11px]">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-emerald-950 hover:text-emerald-300 transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Спросите AI-коуча..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
