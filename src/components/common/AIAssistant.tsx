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
  const { isAiAssistantOpen, setIsAiAssistantOpen, t } = useApp();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Сәлеметсіз бе! Я AI-ассистент Burmalda. Чем могу помочь по вашему хозяйству сегодня?',
      timestamp: 'Только что',
    },
  ]);

  if (!isAiAssistantOpen) return null;

  const quickQuestions = [
    'Куда лучше перегнать стадо?',
    'Почему пастбище №2 стало жёлтым?',
    'Покажи стада рядом с дорогой.',
    'Когда заканчивается договор Ерлана?',
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

    // Generate intelligent Burmalda response
    setTimeout(() => {
      let aiText = 'Burmalda проанализировал данные хозяйства. ';
      const lower = query.toLowerCase();

      if (lower.includes('перегнать') || lower.includes('куда')) {
        aiText =
          '🌱 **Рекомендация по перегону:** Переведите Стадо №1 на **Пастбище №3 (Шығыс)**. Кормового запаса хватит на **12 дней**. На участке есть озеро Жайлау и отличная вегетация (NDVI 0.84). Маршрут безопасен.';
      } else if (lower.includes('красным') || lower.includes('жёлтым') || lower.includes('пастбище')) {
        aiText =
          '🌾 **Анализ Пастбища №2:** Состояние участка "Среднее" (🟡), так как там выпас продолжается 20 дней без осадков и отсутствует автономная скважина. Кормовой запас: 7 дней.';
      } else if (lower.includes('дорог') || lower.includes('трасс') || lower.includes('опасн')) {
        aiText =
          '🚨 **Безопасность:** Стадо №2 (Табун лошадей) находится в **430 м от трассы A-3**. Скорость движения 1.8 км/ч. Пастух Айбек Қасымов оповещён.';
      } else if (lower.includes('договор') || lower.includes('ерлан') || lower.includes('пастух')) {
        aiText =
          '👨‍🌾 **Договор пастуха:** Контракт со старшим пастухом Ерланом Смағұловым истекает **15 августа 2026 г.** (через 7 дней). Сформируйте продление на странице "Договоры".';
      } else {
        aiText =
          '🛰️ **Burmalda Статус:** Все спутниковые показатели вегетации и GPS-трекеры функционируют штатно. Общее состояние хозяйства: 🟢 Хорошее (3 480 га).';
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
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                {t('aiAssistantTitle')}
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </h3>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Онлайн · ИИ Автопилот
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

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                <span className="block text-[10px] opacity-60 text-right mt-1.5">
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
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

        {/* Input bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('aiPromptPlaceholder')}
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
