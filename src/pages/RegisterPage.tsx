import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Radar, ArrowRight, CheckCircle2, User, Phone, Mail, Lock, Building, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RegisterPage: React.FC = () => {
  const { setUser, setFarm } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [name, setName] = useState('Ерлан Смағұлов');
  const [phone, setPhone] = useState('+7 701 555 4321');
  const [email, setEmail] = useState('yerlan.farm@agroradar.kz');
  const [password, setPassword] = useState('password123');

  const [farmName, setFarmName] = useState('Агро-Шаруашылық "Өтеген батыр"');
  const [region, setRegion] = useState('Алматинская область');
  const [district, setDistrict] = useState('Илийский район');
  const [areaHectares, setAreaHectares] = useState(3480);

  const [cattleCount, setCattleCount] = useState(140);
  const [horseCount, setHorseCount] = useState(45);
  const [sheepCount, setSheepCount] = useState(320);
  const [goatCount, setGoatCount] = useState(50);
  const [camelCount, setCamelCount] = useState(0);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) {
      // Complete Registration
      setFarm((prev) => ({
        ...prev,
        name: farmName,
        region,
        district,
        areaHectares,
        cattleCount,
        horseCount,
        sheepCount,
        goatCount,
        camelCount,
        totalAnimals: cattleCount + horseCount + sheepCount + goatCount + camelCount,
      }));
      setUser({
        name,
        phone,
        email,
        farmName,
        region,
        district,
        isAuthenticated: true,
      });
      setStep(4);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="min-h-screen bg-[#08140e] flex items-center justify-center p-4">
      <div className="w-full max-w-xl glass-panel p-8 rounded-3xl border border-emerald-500/30 shadow-2xl">
        {/* Registration Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Radar className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <span className="text-xl font-black text-white">AgroRadar</span>
          </Link>
          <h2 className="text-lg font-bold text-white">Регистрация хозяйства</h2>
        </div>

        {/* Wizard Steps Bar */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  step === s
                    ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20'
                    : step > s
                    ? 'bg-emerald-900 text-emerald-300'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              <span className="text-[10px] text-slate-400 mt-1">
                {s === 1 ? 'Шаг 1' : s === 2 ? 'Шаг 2' : s === 3 ? 'Шаг 3' : 'Готово'}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Шаг 1: Личные данные
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">ФИО Фермера</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Телефон</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Пароль</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-1.5 mt-6"
            >
              <span>Продолжить к Шагу 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Farm Information */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Шаг 2: Данные о хозяйстве
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Название хозяйства</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Регион / Область</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  <option value="Алматинская область">Алматинская область</option>
                  <option value="Жамбылская область">Жамбылская область</option>
                  <option value="Карагандинская область">Карагандинская область</option>
                  <option value="Акмолинская область">Акмолинская область</option>
                  <option value="Туркестанская область">Туркестанская область</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Район</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Площадь земель (гектары)</label>
              <input
                type="number"
                value={areaHectares}
                onChange={(e) => setAreaHectares(Number(e.target.value))}
                required
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Назад
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-1.5"
              >
                <span>К Шагу 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Livestock Specifications */}
        {step === 3 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Шаг 3: Поголовье скота
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">🐄 КРС (Коровы)</label>
                <input
                  type="number"
                  value={cattleCount}
                  onChange={(e) => setCattleCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">🐎 Лошади</label>
                <input
                  type="number"
                  value={horseCount}
                  onChange={(e) => setHorseCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">🐑 Овцы</label>
                <input
                  type="number"
                  value={sheepCount}
                  onChange={(e) => setSheepCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">🐐 Козы</label>
                <input
                  type="number"
                  value={goatCount}
                  onChange={(e) => setGoatCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">🐪 Верблюды</label>
              <input
                type="number"
                value={camelCount}
                onChange={(e) => setCamelCount(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Назад
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center space-x-1.5"
              >
                <span>Завершить регистрацию</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Complete Ready! */}
        {step === 4 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-white">Готово!</h3>
            <p className="text-sm text-emerald-300 font-semibold">
              Ваше хозяйство "{farmName}" готово к работе.
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Пройдите короткий 1-минутный интерактивный Onboarding для нанесения границ пастбищ на карту.
            </p>
            <button
              onClick={() => navigate('/onboarding')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-sm shadow-xl hover:from-emerald-500 transition inline-flex items-center space-x-2"
            >
              <span>Начать интерактивную настройку</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
