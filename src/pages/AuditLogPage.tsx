import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, History, UserCheck, Landmark, Building2 } from 'lucide-react';

export const AuditLogPage: React.FC = () => {
  const { auditLogs } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-extrabold uppercase border border-slate-700">
            Security & Audit
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Журнал аудита действий (Audit Log)</h1>
          <p className="text-xs text-slate-300 mt-1">
            Прозрачный журнал фиксации всех просмотров финансовой и нормативной информации в B2G и B2B.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
          Записей: {auditLogs.length}
        </div>
      </div>

      {/* Log Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3">Кто (Пользователь)</th>
                <th className="p-3">Роль</th>
                <th className="p-3">Что (Действие)</th>
                <th className="p-3">Цель / Объект</th>
                <th className="p-3">Когда (Время)</th>
                <th className="p-3">IP-адрес</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/50 transition">
                  <td className="p-3 font-bold text-white flex items-center space-x-2">
                    {log.userRole === 'BANK_ANALYST' ? (
                      <Landmark className="w-4 h-4 text-cyan-400" />
                    ) : log.userRole === 'AKIMAT_ADMIN' ? (
                      <Building2 className="w-4 h-4 text-amber-400" />
                    ) : (
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                    )}
                    <span>{log.userName}</span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                        log.userRole === 'BANK_ANALYST'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : log.userRole === 'AKIMAT_ADMIN'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}
                    >
                      {log.userRole}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-200">{log.action}</td>
                  <td className="p-3 font-mono text-slate-300">{log.target}</td>
                  <td className="p-3 text-slate-400 font-mono">{log.timestamp}</td>
                  <td className="p-3 text-slate-500 font-mono">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
