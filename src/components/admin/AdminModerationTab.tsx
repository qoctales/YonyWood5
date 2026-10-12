import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  EyeOff, 
  Trash2, 
  Check, 
  X,
  FileText
} from 'lucide-react';
import { ReportItem } from '../../types';

interface AdminModerationTabProps {
  reports: ReportItem[];
  onResolveReport: (reportId: string, action: 'RESOLVED' | 'DISMISSED' | 'MASKED', justification: string) => void;
}

export const AdminModerationTab: React.FC<AdminModerationTabProps> = ({
  reports,
  onResolveReport
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'RESOLVED' | 'DISMISSED'>('ALL');

  // Modal d'intervention
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [actionType, setActionType] = useState<'RESOLVED' | 'DISMISSED' | 'MASKED'>('RESOLVED');
  const [justification, setJustification] = useState('');

  const openActionModal = (report: ReportItem, action: 'RESOLVED' | 'DISMISSED' | 'MASKED') => {
    setSelectedReport(report);
    setActionType(action);
    setJustification('');
  };

  const handleConfirmAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;

    onResolveReport(
      selectedReport.id,
      actionType,
      justification.trim() || `Action modérateur ${actionType} sur le signalement ${selectedReport.id}`
    );

    setSelectedReport(null);
  };

  const filteredReports = reports.filter(r => {
    const matchesSearch = 
      r.targetTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reasonLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold font-serif text-stone-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#A2482B]" />
            <span>Modération des Signalements & Sécurité Communautaire</span>
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-3xl">
            Examen des atteintes aux droits d'auteur, des signalements de contenus inappropriés ou des litiges d'attribution. Chaque décision entraîne une mesure conservatoire ou une clôture motivée.
          </p>
        </div>

        <div className="text-xs bg-stone-100 text-stone-700 px-3.5 py-1.5 rounded-full font-bold shrink-0">
          {reports.filter(r => r.status === 'PENDING').length} incident(s) à traiter
        </div>
      </div>

      {/* Grille des signalements */}
      <div className="space-y-3">
        {filteredReports.map(rep => (
          <div 
            key={rep.id}
            className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3 hover:border-stone-300 transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                  rep.reason === 'copyright' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {rep.reasonLabel}
                </span>

                <span className="text-xs font-bold text-stone-900">{rep.targetTitle}</span>
                <span className="text-[10px] font-mono text-stone-400">({rep.targetType})</span>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                rep.status === 'PENDING'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : rep.status === 'RESOLVED'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-stone-200 text-stone-600'
              }`}>
                {rep.status === 'PENDING' ? 'En attente' : rep.status === 'RESOLVED' ? 'Résolu' : 'Rejeté'}
              </span>
            </div>

            <p className="text-xs text-stone-700 bg-stone-50 p-3 rounded-2xl border border-stone-100">
              {rep.details}
            </p>

            <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-100">
              <div>
                Signalé par : <strong className="text-stone-600 font-mono">{rep.reportedBy}</strong> le {new Date(rep.createdAt).toLocaleDateString('fr-FR')}
              </div>

              {rep.status === 'PENDING' ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openActionModal(rep, 'RESOLVED')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Conforme / Résolu</span>
                  </button>
                  <button
                    onClick={() => openActionModal(rep, 'MASKED')}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs flex items-center gap-1"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Masquer le contenu</span>
                  </button>
                  <button
                    onClick={() => openActionModal(rep, 'DISMISSED')}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Classer sans suite</span>
                  </button>
                </div>
              ) : (
                <span className="text-stone-400 italic">Intervention archivée</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL ACTION MODÉRATEUR */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Décision de modération : {selectedReport.targetTitle}
              </h3>
              <button 
                onClick={() => setSelectedReport(null)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmAction} className="space-y-4">
              <div className="text-xs text-stone-600 bg-stone-50 p-3 rounded-2xl border border-stone-100">
                Action choisie : <strong className="text-stone-900">
                  {actionType === 'RESOLVED' ? 'Marquer comme conforme & résolu' : actionType === 'MASKED' ? 'Masquer temporairement de la diffusion' : 'Classer sans suite (signalement non fondé)'}
                </strong>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Justification pour le Journal d'Audit <span className="text-[#A2482B]">*</span>
                </label>
                <input 
                  type="text"
                  value={justification}
                  onChange={e => setJustification(e.target.value)}
                  placeholder="Ex: Examen des licences musicales : morceau libre de droits validé"
                  className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-hidden"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Appliquer la décision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
