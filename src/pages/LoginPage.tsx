import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Radar, ArrowRight, Lock, Phone } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setUser } = useApp();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('+7 701 555 4321');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, isAuthenticated: true }));
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#08140e] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-emerald-500/30 shadow-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Radar className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <span className="text-2xl font-black text-white">AgroRadar</span>
          </Link>
          <h2 className="text-xl font-bold text-white">Вход в AgroRadar</h2>
          <p className="text-xs text-slate-400 mt-1">Цифровой автопилот вашего хозяйства</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Номер телефона
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">Пароль</label>
              <Link to="/forgot-password" className="text-xs text-emerald-400 hover:underline">
                Забыли пароль?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950 transition flex items-center justify-center space-x-2"
          >
            <span>Войти в систему</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Ещё нет аккаунта?{' '}
          <Link to="/register" className="text-emerald-400 font-bold hover:underline">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
};
