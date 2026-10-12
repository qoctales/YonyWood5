import React, { useState } from 'react';
import { 
  UserCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  GitBranch, 
  AlertCircle,
  X,
  Check
} from 'lucide-react';
import { CooptationItem } from '../../types/adminBackOffice';

interface AdminCooptationsTabProps {
  cooptations: CooptationItem[];
  onApproveCooptation: (cooptationId: string, justification: string) => void;
  onRejectCooptation: (cooptationId: string, rejectionReason: string, justification: string) => void;
}

export const AdminCooptationsTab: React.FC<AdminCooptationsTabProps> = ({
  cooptations,
  onApproveCooptation,
  onRejectCooptation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'EN_ATTENTE' | 'VALIDEE' | 'REFUSEE'>('ALL');

  // Modal de refus avec motif obligatoire
  const [rejectingItem, setRejectingItem] = useState<CooptationItem | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionJustification, setRejectionJustification] = useState('');

  const handleConfirmRejection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingItem) return;

    onRejectCooptation(
      rejectingItem.id,
      rejectionReason.trim(),
      rejectionJustification.trim() || `Refus de la cooptation de ${rejectingItem.recommendedPersonName}`
    );

    setRejectingItem(null);
    setRejectionReason('');
    setRejectionJustification('');
  };

  const filteredCooptations = cooptations.filter(c => {
    const matchesSearch = 
      c.recommendedPersonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.referentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.seriesTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCommissionsPaid = cooptations.reduce((acc, c) => acc + c.lineageCommissionsPaid, 0);
  const totalVolumeLineage = cooptations.reduce((acc, c) => acc + c.lineageVolumeGenerated, 0);

  return (
    <div className="space-y-6">
      {/* En-tête et Règle économique des 2% */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold font-serif text-stone-900 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#A2482B]" />
            <span>Gestion des Cooptations & Filiation Économique de Lignée</span>
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-3xl">
            Admission par parrainage. Une cooptation validée active automatiquement la <strong className="text-stone-800">commission de filiation de 2%</strong> sur les transactions admissibles générées par la descendance de la lignée.
          </p>
        </div>

        {/* Métriques globales filiation */}
        <div className="flex items-center gap-3 bg-stone-50 px-4 py-2.5 rounded-2xl border border-stone-200 text-xs shrink-0">
          <div>
            <div className="text-[10px] text-stone-400">Volume Lignées</div>
            <div className="font-bold font-mono text-stone-900">{totalVolumeLineage.toLocaleString('fr-FR')} €</div>
          </div>
          <div className="w-px h-6 bg-stone-200" />
          <div>
            <div className="text-[10px] text-emerald-700 font-semibold">Commissions 2% Versées</div>
            <div className="font-bold font-mono text-emerald-800">+{totalCommissionsPaid.toFixed(2)} €</div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher par filleul, parrain ou série..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:border-[#A2482B] outline-hidden cursor-pointer"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="EN_ATTENTE">En attente de validation</option>
            <option value="VALIDEE">Validées (filiation active)</option>
            <option value="REFUSEE">Refusées</option>
          </select>
        </div>
      </div>

      {/* Tableau des Cooptations */}
      <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAFAF9] text-stone-500 uppercase text-[10px] tracking-wider border-b border-stone-200">
            <tr>
              <th className="p-3.5">Personne Recommandée</th>
              <th className="p-3.5">Série & Parrain / Référent</th>
              <th className="p-3.5">Date & Statut</th>
              <th className="p-3.5">Filiation Éco (2%)</th>
              <th className="p-3.5">Motif / Admission</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredCooptations.map(coopt => (
              <tr key={coopt.id} className="hover:bg-stone-50 transition-colors">
                {/* Personne recommandée */}
                <td className="p-3.5">
                  <div className="font-bold text-stone-900">{coopt.recommendedPersonName}</div>
                  <div className="text-[10px] text-stone-500 font-mono">{coopt.recommendedPersonEmail}</div>
                  <div className="text-[10px] text-stone-600 mt-0.5 line-clamp-1">{coopt.recommendedPersonProfile}</div>
                </td>

                {/* Série et référent */}
                <td className="p-3.5">
                  <div className="font-semibold text-stone-900">{coopt.seriesTitle}</div>
                  <div className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <span>Parrainé par :</span>
                    <strong className="text-stone-700">{coopt.referentName}</strong>
                  </div>
                </td>

                {/* Date et statut */}
                <td className="p-3.5">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    coopt.status === 'VALIDEE'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : coopt.status === 'EN_ATTENTE'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}>
                    {coopt.status === 'VALIDEE' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    {coopt.status === 'EN_ATTENTE' && <Clock className="w-3 h-3 text-amber-600" />}
                    {coopt.status === 'REFUSEE' && <XCircle className="w-3 h-3 text-rose-600" />}
                    <span>{coopt.status}</span>
                  </span>
                  <div className="text-[10px] text-stone-400 mt-1">
                    Recommandé le {new Date(coopt.recommendedDate).toLocaleDateString('fr-FR')}
                  </div>
                </td>

                {/* Filiation 2% */}
                <td className="p-3.5">
                  <div className="font-mono font-bold text-emerald-700">
                    +{coopt.filiationPercent.toFixed(1)} %
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    Gains versés : <span className="font-bold text-stone-800 font-mono">{coopt.lineageCommissionsPaid.toFixed(2)} €</span>
                  </div>
                </td>

                {/* Détails admission ou refus */}
                <td className="p-3.5 max-w-[220px]">
                  {coopt.status === 'VALIDEE' && coopt.admissionDate && (
                    <div className="text-[10px] text-stone-600">
                      Admis le {new Date(coopt.admissionDate).toLocaleDateString('fr-FR')}
                      {coopt.reviewerName && <span className="block text-stone-400">Validé par {coopt.reviewerName}</span>}
                    </div>
                  )}

                  {coopt.status === 'REFUSEE' && coopt.rejectionReason && (
                    <div className="text-[10px] text-rose-700 bg-rose-50 p-2 rounded-xl border border-rose-100">
                      <strong>Motif :</strong> {coopt.rejectionReason}
                    </div>
                  )}

                  {coopt.status === 'EN_ATTENTE' && (
                    <span className="text-[10px] text-amber-700 font-medium italic">
                      En attente de décision administrative
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="p-3.5 text-right">
                  {coopt.status === 'EN_ATTENTE' ? (
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onApproveCooptation(coopt.id, `Validation cooptation de ${coopt.recommendedPersonName} par ${coopt.referentName}`)}
                        className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold cursor-pointer transition-colors shadow-xs flex items-center gap-1"
                        title="Valider et activer la filiation"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Valider</span>
                      </button>
                      <button
                        onClick={() => {
                          setRejectingItem(coopt);
                          setRejectionReason('');
                          setRejectionJustification('');
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1"
                        title="Refuser avec motif motivé"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Refuser</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-stone-400 text-[11px] italic">Dossier clôturé</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL REFUS AVEC MOTIF OBLIGATOIRE */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Refus motivé : {rejectingItem.recommendedPersonName}
              </h3>
              <button 
                onClick={() => setRejectingItem(null)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmRejection} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Motif formel du refus <span className="text-rose-600">*</span>
                </label>
                <textarea 
                  rows={3}
                  value={rejectionReason}
                  onChange={e => setRejectionReason(e.target.value)}
                  placeholder="Ex: Dossier incomplet, absence d'accord sur la charte déontologique..."
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Justification pour le Journal d'Audit <span className="text-[#A2482B]">*</span>
                </label>
                <input 
                  type="text"
                  value={rejectionJustification}
                  onChange={e => setRejectionJustification(e.target.value)}
                  placeholder="Ex: Décision de refus de cooptation après revue collégiale"
                  className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-hidden"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setRejectingItem(null)}
                  className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!rejectionReason.trim()}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Confirmer le refus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
