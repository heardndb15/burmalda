import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FilePenLine, Menu, Search, Bell, Bot, Zap, ChevronDown } from 'lucide-react';

export const Header: React.FC<{ onToggleMobileMenu?: () => void }> = ({ onToggleMobileMenu }) => {
  const { user, notifications, setIsAiAssistantOpen } = useApp();
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate('/resumes');
  };

  return (
    <header className="sticky top-0 z-40 glass-header px-4 lg:px-6 py-3 flex items-center justify-between gap-3">
      {/* Left: burger + logo */}
      <div className="flex items-center space-x-3 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg bg-emerald-950/50 text-emerald-400 hover:bg-emerald-900/60 transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/app" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <FilePenLine className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="hidden xs:block">
            <span className="text-xl font-extrabold tracking-tight text-white">
              CV<span className="text-emerald-400">Gen</span>
            </span>
            <span className="hidden sm:block text-[10px] text-emerald-400/80 font-medium tracking-wide uppercase">
              AI-генератор резюме
            </span>
          </div>
        </Link>
      </div>

      {/* Center: search */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex flex-1 max-w-md items-center px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 focus-within:border-emerald-500 transition"
      >
        <Search className="w-4 h-4 text-slate-500 mr-2.5" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск резюме, компаний, навыков..."
          className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
        />
      </form>

      {/* Right actions */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60 transition text-xs font-medium"
        >
          <Bot className="w-4 h-4 text-emerald-400" />
          <span className="hidden md:inline">AI-ассистент</span>
        </button>

        {user.plan === 'free' ? (
          <button
            onClick={() => navigate('/billing')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold shadow-md hover:from-emerald-500 hover:to-teal-500 transition active:scale-95"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pro-доступ</span>
          </button>
        ) : (
          <span className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-wide">
            <Zap className="w-3 h-3" />
            {user.plan === 'pro' ? 'Pro' : 'Team'}
          </span>
        )}

        <Link
          to="/notifications"
          className="relative p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Link>

        <Link to="/settings" className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-800/60 transition">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-lg object-cover border border-emerald-500/40"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center">
              {user.name
                .split(' ')
                .map((p) => p[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </div>
          )}
          <ChevronDown className="hidden lg:block w-3.5 h-3.5 text-slate-500" />
        </Link>
      </div>
    </header>
  );
};
