import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Clock, 
  ShieldCheck, 
  User, 
  Tag, 
  Calendar,
  Download
} from 'lucide-react';
import { AdminAuditLog } from '../../types/adminBackOffice';

interface AdminAuditTabProps {
  logs: AdminAuditLog[];
}

export const AdminAuditTab: React.FC<AdminAuditTabProps> = ({ logs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string>('ALL');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.targetTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.justification && log.justification.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesModule = moduleFilter === 'ALL' || log.module === moduleFilter;

    return matchesSearch && matchesModule;
  });

  const handleExportCSV = () => {
    const headers = ['Date', 'Auteur', 'Email', 'Role', 'Module', 'Action', 'Cible', 'Justification'];
    const rows = filteredLogs.map(l => [
      l.timestamp,
      `"${l.authorName}"`,
      `"${l.authorEmail}"`,
      `"${l.authorRole}"`,
      l.module,
      `"${l.action}"`,
      `"${l.targetTitle}"`,
      `"${l.justification || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `journal_audit_yonywood_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold font-serif text-stone-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#A2482B]" />
            <span>Journal d'Audit Central & Traçabilité Réglementaire</span>
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-3xl">
            Historique inaltérable de l'ensemble des actions administratives sensibles : validations d'histoires, modifications de rôles, révisions des clés économiques, arbitrages financiers et modérations.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all cursor-pointer border border-stone-200 flex items-center gap-1.5 shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exporter CSV</span>
        </button>
      </div>

      {/* Barre de filtres */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher par action, auteur, cible ou motif..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={moduleFilter}
            onChange={e => setModuleFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:border-[#A2482B] outline-hidden cursor-pointer"
          >
            <option value="ALL">Tous les modules</option>
            <option value="HERITAGE">Héritage</option>
            <option value="SERIES">Séries</option>
            <option value="USERS">Utilisateurs & Rôles</option>
            <option value="PRODUCTEURS">Producteurs</option>
            <option value="COOPTATIONS">Cooptations</option>
            <option value="PUBLICITE">Publicité & Sponsoring</option>
            <option value="FINANCES">Finances</option>
            <option value="MODERATION">Modération</option>
            <option value="CONFIGURATION">Configuration</option>
          </select>
        </div>
      </div>

      {/* Liste des entrées d'audit */}
      <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAFAF9] text-stone-500 uppercase text-[10px] tracking-wider border-b border-stone-200">
            <tr>
              <th className="p-3.5">Horodatage & Module</th>
              <th className="p-3.5">Auteur de l'action</th>
              <th className="p-3.5">Action Exécutée</th>
              <th className="p-3.5">Cible / Dossier</th>
              <th className="p-3.5">Motif / Justification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredLogs.map(log => (
              <tr key={log.id} className="hover:bg-stone-50 transition-colors">
                {/* Horodatage & Module */}
                <td className="p-3.5">
                  <div className="font-mono text-[11px] text-stone-800 font-semibold">
                    {new Date(log.timestamp).toLocaleDateString('fr-FR')} {new Date(log.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-bold text-[9px]">
                    {log.module}
                  </span>
                </td>

                {/* Auteur */}
                <td className="p-3.5">
                  <div className="font-bold text-stone-900">{log.authorName}</div>
                  <div className="text-[10px] text-stone-500 font-mono">{log.authorEmail}</div>
                  <div className="text-[10px] text-[#A2482B] font-semibold">{log.authorRole}</div>
                </td>

                {/* Action */}
                <td className="p-3.5 font-semibold text-stone-900">
                  {log.action}
                </td>

                {/* Cible */}
                <td className="p-3.5">
                  <div className="text-stone-800 font-medium">{log.targetTitle}</div>
                  <div className="text-[10px] text-stone-400 font-mono">ID: {log.targetId}</div>
                </td>

                {/* Justification */}
                <td className="p-3.5 max-w-[280px]">
                  {log.justification ? (
                    <p className="text-[11px] text-stone-600 italic bg-stone-50 p-2 rounded-xl border border-stone-100">
                      "{log.justification}"
                    </p>
                  ) : (
                    <span className="text-stone-400 italic text-[10px]">Non spécifié</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
