import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  DollarSign, 
  Sliders, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  RotateCcw, 
  Search,
  Filter,
  Check,
  X
} from 'lucide-react';
import { CoproductionEarning } from '../../types';
import { SeriesEconomicEnvelope } from '../../types/adminBackOffice';

interface AdminFinancesTabProps {
  earningsList: CoproductionEarning[];
  platformFee: number;
  envelopes: SeriesEconomicEnvelope[];
  onUpdatePlatformFee: (newFee: number, justification: string) => void;
  onUpdatePayoutStatus: (earningId: string, newStatus: CoproductionEarning['payoutStatus'], justification: string) => void;
}

export const AdminFinancesTab: React.FC<AdminFinancesTabProps> = ({
  earningsList,
  platformFee,
  envelopes,
  onUpdatePlatformFee,
  onUpdatePayoutStatus
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [tempPlatformFee, setTempPlatformFee] = useState(platformFee);
  const [justification, setJustification] = useState('');

  // Total levé
  const totalRaised = envelopes.reduce((acc, env) => acc + env.totalRaised, 0);
  const totalPlatformRevenue = (totalRaised * platformFee) / 100;
  const totalDividendsDistributed = earningsList
    .filter(e => e.payoutStatus === 'PAID')
    .reduce((acc, e) => acc + e.dividendEarned, 0);
  const totalPendingPayouts = earningsList
    .filter(e => e.payoutStatus !== 'PAID')
    .reduce((acc, e) => acc + e.dividendEarned, 0);

  const handleSaveFee = () => {
    onUpdatePlatformFee(
      tempPlatformFee,
      justification.trim() || `Modification du taux de commission plateforme à ${tempPlatformFee}%`
    );
    setJustification('');
  };

  const filteredEarnings = earningsList.filter(e => {
    const matchesSearch = 
      e.coproducerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.coproducerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.seriesTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || e.payoutStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* 3 Cartes KPIs financiers */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Volume Total Collecté</span>
            <Wallet className="w-4 h-4 text-[#A2482B]" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            {totalRaised.toLocaleString('fr-FR')} €
          </div>
          <p className="text-[10px] text-stone-400 mt-1">Fonds de coproduction levés</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#A2482B]/30 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Commission Retenue ({platformFee}%)</span>
            <TrendingUp className="w-4 h-4 text-[#C89B3C]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#A2482B]">
            {totalPlatformRevenue.toLocaleString('fr-FR')} €
          </div>
          <p className="text-[10px] text-stone-400 mt-1">Revenus nets plateforme</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Dividendes Versés</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-emerald-700">
            {totalDividendsDistributed.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-[10px] text-stone-400 mt-1">Retours distribués aux coproducteurs</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Versements en Attente</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-amber-800">
            {totalPendingPayouts.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
          </div>
          <p className="text-[10px] text-stone-400 mt-1">À virer après confirmation d'audience</p>
        </div>
      </div>

      {/* Réglage du taux de commission plateforme */}
      <div className="p-5 rounded-3xl bg-white border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#A2482B]" />
            <h3 className="text-sm font-bold text-stone-900">Structure Financière : Taux de Commission Plateforme</h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Pourcentage prélevé automatiquement sur chaque acquisition de part documentaire.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="range"
            min="5"
            max="25"
            step="1"
            value={tempPlatformFee}
            onChange={(e) => setTempPlatformFee(Number(e.target.value))}
            className="w-36 accent-[#A2482B] cursor-pointer"
          />
          <span className="px-3 py-1 rounded-xl bg-[#A2482B] text-white font-mono font-bold text-sm shrink-0">
            {tempPlatformFee} %
          </span>

          {tempPlatformFee !== platformFee && (
            <button
              onClick={handleSaveFee}
              className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              Appliquer & Tracer
            </button>
          )}
        </div>
      </div>

      {/* Tableau "Qui a gagné quoi" */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C89B3C]" />
            <span>Tableau Exhaustif des Gains ("Qui a gagné quoi")</span>
          </h3>
          <span className="text-xs text-stone-500">{filteredEarnings.length} transactions enregistrées</span>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAF9] text-stone-500 uppercase text-[10px] tracking-wider border-b border-stone-200">
              <tr>
                <th className="p-3.5">Coproducteur</th>
                <th className="p-3.5">Série Documentaire</th>
                <th className="p-3.5">Investissement Initial</th>
                <th className="p-3.5">Audience & Paliers</th>
                <th className="p-3.5">Plus-Value / Gain</th>
                <th className="p-3.5 text-right">Statut & Clôture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredEarnings.map((earning) => (
                <tr key={earning.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-3.5">
                    <div className="font-semibold text-stone-900">{earning.coproducerName}</div>
                    <div className="text-[10px] text-stone-500 font-mono">{earning.coproducerEmail}</div>
                  </td>

                  <td className="p-3.5 text-stone-700 font-medium">
                    {earning.seriesTitle}
                  </td>

                  <td className="p-3.5">
                    <div className="font-semibold text-stone-900">{earning.initialInvestment} €</div>
                    <div className="text-[10px] text-stone-500">{earning.sharesOwned} parts</div>
                  </td>

                  <td className="p-3.5">
                    <div className="text-stone-700 font-mono">{earning.totalViews.toLocaleString('fr-FR')} vues</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">{earning.audienceMilestone}</div>
                  </td>

                  <td className="p-3.5 font-bold text-emerald-700 text-sm">
                    +{earning.dividendEarned.toFixed(2)} €
                  </td>

                  <td className="p-3.5 text-right">
                    {earning.payoutStatus === 'PAID' ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Payé ({earning.payoutDate ? new Date(earning.payoutDate).toLocaleDateString('fr-FR') : 'Confirmé'})
                      </span>
                    ) : earning.payoutStatus === 'PROCESSING' ? (
                      <div className="inline-flex items-center gap-1">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Virement en cours
                        </span>
                        <button
                          onClick={() => onUpdatePayoutStatus(earning.id, 'PAID', `Clôture et confirmation virement ${earning.dividendEarned} € à ${earning.coproducerName}`)}
                          className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold hover:bg-emerald-700 cursor-pointer"
                          title="Confirmer la réception bancaire"
                        >
                          Valider
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onUpdatePayoutStatus(earning.id, 'PROCESSING', `Mise en paiement virement ${earning.dividendEarned} € à ${earning.coproducerName}`)}
                        className="px-2.5 py-1 rounded-xl bg-stone-900 text-white text-[10px] font-bold hover:bg-stone-800 cursor-pointer shadow-xs"
                      >
                        Lancer le virement
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
  );
};
