import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  FileText, 
  ShieldCheck, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Plus, 
  X, 
  Edit3, 
  Save,
  Send,
  ArrowRight
} from 'lucide-react';
import { ProducerDossier, ProducerSupportedSeries } from '../../types/adminBackOffice';

interface AdminProducersTabProps {
  producers: ProducerDossier[];
  onUpdateProducer: (updated: ProducerDossier, justification: string) => void;
  onApprovePayout: (producerId: string, payoutId: string, justification: string) => void;
  onAddPayout: (producerId: string, amount: number, seriesTitle: string, justification: string) => void;
}

export const AdminProducersTab: React.FC<AdminProducersTabProps> = ({
  producers,
  onUpdateProducer,
  onApprovePayout,
  onAddPayout
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducerId, setSelectedProducerId] = useState<string>(producers[0]?.id || '');

  // Modale nouveau versement
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState<number>(1000);
  const [payoutSeries, setPayoutSeries] = useState<string>('Investors < > Builders');
  const [payoutJustification, setPayoutJustification] = useState('');

  const selectedProducer = producers.find(p => p.id === selectedProducerId) || producers[0];

  const handleCreatePayout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProducer) return;

    onAddPayout(
      selectedProducer.id,
      payoutAmount,
      payoutSeries,
      payoutJustification.trim() || `Ordre de versement de ${payoutAmount} € pour ${selectedProducer.producerName}`
    );

    setIsPayoutModalOpen(false);
    setPayoutJustification('');
  };

  const filteredProducers = producers.filter(p => 
    p.producerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.legalEntity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* En-tête explicatif & doctrine légale */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold font-serif text-stone-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#A2482B]" />
            <span>Dossiers Producteurs & Financements Participatifs</span>
          </h2>
          <span className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-full font-bold">
            {producers.length} producteurs suivis
          </span>
        </div>
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Principe juridique et économique :</strong> Une contribution financière ne vaut pas titre de propriété ni droit illimité sur les recettes. Les montants sont systématiquement segmentés en : <span className="font-bold underline">Montant proposé</span>, <span className="font-bold underline">Montant engagé</span>, <span className="font-bold underline">Montant reçu</span> et <span className="font-bold underline">Montant distribuable</span>.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche : Liste des producteurs */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher producteur..."
              className="w-full pl-9 pr-3 py-2 rounded-2xl bg-white border border-stone-200 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden shadow-xs"
            />
          </div>

          <div className="space-y-2">
            {filteredProducers.map(p => {
              const isSelected = p.id === selectedProducer?.id;
              return (
                <div 
                  key={p.id}
                  onClick={() => setSelectedProducerId(p.id)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-white border-[#A2482B] shadow-md shadow-[#A2482B]/10' 
                      : 'bg-white/80 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-900">{p.producerName}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      p.complianceStatus === 'CONFORME' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {p.complianceStatus}
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono truncate">{p.legalEntity}</div>
                  <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-stone-100">
                    <span className="text-stone-400 text-[10px]">{p.country}</span>
                    <span className="font-bold font-mono text-stone-900">
                      {p.totalReceived.toLocaleString('fr-FR')} € reçus
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Colonne droite : Fiche dossier détaillée */}
        {selectedProducer && (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
              {/* Header dossier */}
              <div className="flex items-start justify-between pb-4 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold font-serif text-stone-900">
                      {selectedProducer.producerName}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                      {selectedProducer.complianceStatus}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5 font-mono">{selectedProducer.legalEntity}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Contact : {selectedProducer.email} • {selectedProducer.phone || 'Non renseigné'} • {selectedProducer.country}
                  </p>
                </div>

                <button
                  onClick={() => setIsPayoutModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Émettre un versement</span>
                </button>
              </div>

              {/* 4 Piliers financiers distincts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Montant Proposé</div>
                  <div className="text-base font-bold font-mono text-stone-700 mt-1">
                    {selectedProducer.totalProposed.toLocaleString('fr-FR')} €
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Offre initiale</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Montant Engagé</div>
                  <div className="text-base font-bold font-mono text-stone-900 mt-1">
                    {selectedProducer.totalCommitted.toLocaleString('fr-FR')} €
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Sous contrat signé</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200">
                  <div className="text-[10px] text-blue-800 uppercase font-semibold">Montant Reçu</div>
                  <div className="text-base font-bold font-mono text-blue-900 mt-1">
                    {selectedProducer.totalReceived.toLocaleString('fr-FR')} €
                  </div>
                  <div className="text-[10px] text-blue-600 mt-0.5">Encaissé banque</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="text-[10px] text-emerald-800 uppercase font-semibold">Distribuable</div>
                  <div className="text-base font-bold font-mono text-emerald-900 mt-1">
                    {selectedProducer.totalDistributable.toLocaleString('fr-FR')} €
                  </div>
                  <div className="text-[10px] text-emerald-600 mt-0.5">Éligible retour</div>
                </div>
              </div>

              {/* Participations aux séries documentaires */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Participations aux Séries & Conventions
                </h4>

                <div className="space-y-2.5">
                  {selectedProducer.supportedSeries.map((ser, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">{ser.seriesTitle}</span>
                        <span className="font-mono text-[10px] font-semibold text-stone-500">
                          Réf: {ser.contractRef} (Signé le {new Date(ser.contractSignDate).toLocaleDateString('fr-FR')})
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                        <div>
                          <span className="text-[10px] text-stone-400 block font-sans">Proposé</span>
                          <span className="text-stone-700">{ser.proposedAmount} €</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 block font-sans">Engagé</span>
                          <span className="text-stone-900 font-bold">{ser.committedAmount} €</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 block font-sans">Reçu</span>
                          <span className="text-blue-700 font-bold">{ser.receivedAmount} €</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 block font-sans">Distribuable</span>
                          <span className="text-emerald-700 font-bold">{ser.distributableShareAmount} €</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 pt-1 border-t border-stone-200/60 font-sans">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Clause légale approuvée : Ne constitue pas un titre financier illimité sur les recettes.</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historique des versements effectués & en attente */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Historique des Versements & Retours Financiers
                </h4>

                <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAFAF9] text-stone-500 uppercase text-[10px] tracking-wider border-b border-stone-200">
                      <tr>
                        <th className="p-3">Date</th>
                        <th className="p-3">Série</th>
                        <th className="p-3">Montant</th>
                        <th className="p-3">Réf Bancaire</th>
                        <th className="p-3 text-right">Statut / Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {selectedProducer.payoutHistory.map(payout => (
                        <tr key={payout.id} className="hover:bg-stone-50">
                          <td className="p-3 font-mono text-[11px] text-stone-600">
                            {new Date(payout.date).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="p-3 font-semibold text-stone-900">{payout.seriesTitle}</td>
                          <td className="p-3 font-mono font-bold text-emerald-700 text-sm">
                            +{payout.amount.toLocaleString('fr-FR')} €
                          </td>
                          <td className="p-3 font-mono text-[10px] text-stone-500">{payout.bankRef}</td>
                          <td className="p-3 text-right">
                            {payout.status === 'PAYE' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Payé
                              </span>
                            ) : (
                              <button
                                onClick={() => onApprovePayout(selectedProducer.id, payout.id, `Validation versement ${payout.amount} € pour ${selectedProducer.producerName}`)}
                                className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold cursor-pointer transition-colors shadow-xs"
                              >
                                Valider le versement
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL ÉMISSION D'UN VERSEMENT */}
      {isPayoutModalOpen && selectedProducer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Émettre un versement : {selectedProducer.producerName}
              </h3>
              <button 
                onClick={() => setIsPayoutModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePayout} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Montant à verser (€)
                </label>
                <input 
                  type="number"
                  min="50"
                  step="10"
                  value={payoutAmount}
                  onChange={e => setPayoutAmount(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-xl bg-stone-50 border border-stone-300 font-mono font-bold text-sm text-stone-900 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Série rattachée
                </label>
                <select
                  value={payoutSeries}
                  onChange={e => setPayoutSeries(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-hidden cursor-pointer"
                >
                  {selectedProducer.supportedSeries.map((s, i) => (
                    <option key={i} value={s.seriesTitle}>{s.seriesTitle}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Justification pour l'Audit <span className="text-[#A2482B]">*</span>
                </label>
                <input 
                  type="text"
                  value={payoutJustification}
                  onChange={e => setPayoutJustification(e.target.value)}
                  placeholder="Ex: Liquidation trimestrielle des dividendes d'audience"
                  className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-hidden"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Créer l'ordre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
