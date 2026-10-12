import React, { useState } from 'react';
import { 
  Megaphone, 
  Search, 
  Building2, 
  Plus, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Eye, 
  MousePointer, 
  X, 
  Save, 
  Sliders, 
  Tag
} from 'lucide-react';
import { AdvertisingCampaign } from '../../types/adminBackOffice';
import { Documentary } from '../../types';

interface AdminAdvertisingTabProps {
  campaigns: AdvertisingCampaign[];
  seriesList: Documentary[];
  onUpdateCampaign: (updated: AdvertisingCampaign, justification: string) => void;
  onAddCampaign: (newCamp: AdvertisingCampaign, justification: string) => void;
}

const CAMPAIGN_FORMATS: { id: AdvertisingCampaign['format']; label: string; desc: string }[] = [
  { id: 'HABILLAGE_THEME', label: 'Habillage de Thématique', desc: 'Fond discret et logo partenaire sur les portes d\'Héritage' },
  { id: 'BANNIERE_DISCRETE', label: 'Bannière Discrète', desc: 'Encart informatif en bas d\'écran dans le flux' },
  { id: 'MENTION_OUVERTURE', label: 'Mention d\'Ouverture', desc: 'Texte d\'amorce "Avec le soutien bienveillant de [Marque]" (3s)' },
  { id: 'SPOT_PRE_ROLL', label: 'Spot Pré-roll Court', desc: 'Micro-vidéo 6s non-intrusive avant le duo documentaire' }
];

export const AdminAdvertisingTab: React.FC<AdminAdvertisingTabProps> = ({
  campaigns,
  seriesList,
  onUpdateCampaign,
  onAddCampaign
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modale création/édition de campagne
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<AdvertisingCampaign | null>(null);

  const [title, setTitle] = useState('');
  const [brandName, setBrandName] = useState('');
  const [format, setFormat] = useState<AdvertisingCampaign['format']>('HABILLAGE_THEME');
  const [budgetCommitted, setBudgetCommitted] = useState<number>(5000);
  const [targetSeriesId, setTargetSeriesId] = useState<string>('');
  const [startDate, setStartDate] = useState('2026-04-01');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [status, setStatus] = useState<AdvertisingCampaign['status']>('EN_COURS');
  const [labelSponsorDisplay, setLabelSponsorDisplay] = useState('Programme soutenu par nos partenaires');
  const [justification, setJustification] = useState('');

  const openCreateModal = () => {
    setEditingCampaign(null);
    setTitle('');
    setBrandName('');
    setFormat('HABILLAGE_THEME');
    setBudgetCommitted(5000);
    setTargetSeriesId(seriesList[0]?.id || '');
    setStartDate('2026-04-01');
    setEndDate('2026-12-31');
    setStatus('EN_COURS');
    setLabelSponsorDisplay('Parrainé avec le soutien de la marque partenaire');
    setJustification('');
    setIsModalOpen(true);
  };

  const openEditModal = (camp: AdvertisingCampaign) => {
    setEditingCampaign(camp);
    setTitle(camp.title);
    setBrandName(camp.brandName);
    setFormat(camp.format);
    setBudgetCommitted(camp.budgetCommitted);
    setTargetSeriesId(camp.targetSeriesId || '');
    setStartDate(camp.startDate);
    setEndDate(camp.endDate);
    setStatus(camp.status);
    setLabelSponsorDisplay(camp.labelSponsorDisplay);
    setJustification('');
    setIsModalOpen(true);
  };

  const handleSaveCampaign = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedDoc = seriesList.find(s => s.id === targetSeriesId);

    if (editingCampaign) {
      const updated: AdvertisingCampaign = {
        ...editingCampaign,
        title: title.trim(),
        brandName: brandName.trim(),
        format,
        budgetCommitted,
        targetSeriesId: targetSeriesId || undefined,
        targetSeriesTitle: selectedDoc?.title || undefined,
        startDate,
        endDate,
        status,
        labelSponsorDisplay: labelSponsorDisplay.trim()
      };
      onUpdateCampaign(updated, justification.trim() || `Mise à jour de la campagne ${updated.title}`);
    } else {
      const newCamp: AdvertisingCampaign = {
        id: `camp-${Date.now()}`,
        title: title.trim(),
        brandName: brandName.trim(),
        format,
        budgetCommitted,
        budgetConsumed: 0,
        targetSeriesId: targetSeriesId || undefined,
        targetSeriesTitle: selectedDoc?.title || undefined,
        startDate,
        endDate,
        status,
        impressionsCount: 0,
        clicksCount: 0,
        labelSponsorDisplay: labelSponsorDisplay.trim()
      };
      onAddCampaign(newCamp, justification.trim() || `Création de la campagne ${newCamp.title}`);
    }

    setIsModalOpen(false);
  };

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.brandName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCommitted = campaigns.reduce((acc, c) => acc + c.budgetCommitted, 0);
  const totalConsumed = campaigns.reduce((acc, c) => acc + c.budgetConsumed, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold font-serif text-stone-900 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[#A2482B]" />
            <span>Gestion de la Publicité & des Campagnes de Sponsoring</span>
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-3xl">
            Supervision des marques mécènes, contrôle des formats éthiques et non-intrusifs, et garantie de la distinction légale entre <strong className="text-stone-800">sélection éditoriale</strong> et <strong className="text-stone-800">emplacement sponsorisé</strong>.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-2xl bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Campagne</span>
        </button>
      </div>

      {/* Métriques pub */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <div className="text-xs text-stone-500">Budgets Sponsoring Engagés</div>
          <div className="text-xl font-bold font-serif font-mono text-stone-900 mt-1">
            {totalCommitted.toLocaleString('fr-FR')} €
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">Sur toutes les campagnes</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <div className="text-xs text-stone-500">Budgets Consommés / Reçus</div>
          <div className="text-xl font-bold font-serif font-mono text-emerald-700 mt-1">
            {totalConsumed.toLocaleString('fr-FR')} €
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">Facturés aux marques</div>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-stone-200 shadow-xs">
          <div className="text-xs text-stone-500">Campagnes Actives</div>
          <div className="text-xl font-bold font-serif text-[#A2482B] mt-1">
            {campaigns.filter(c => c.status === 'EN_COURS').length} en cours
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">Formats respectueux du récit</div>
        </div>
      </div>

      {/* Grille des campagnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCampaigns.map(camp => (
          <div 
            key={camp.id}
            className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4 hover:border-[#A2482B]/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">
                    Format : {camp.format}
                  </span>
                  <h3 className="text-sm font-bold text-stone-900">{camp.title}</h3>
                  <div className="text-xs font-semibold text-[#A2482B] flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{camp.brandName}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  camp.status === 'EN_COURS'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : camp.status === 'VALIDEE'
                      ? 'bg-blue-100 text-blue-800'
                      : camp.status === 'BROUILLON'
                        ? 'bg-stone-200 text-stone-700'
                        : 'bg-amber-100 text-amber-800'
                }`}>
                  {camp.status}
                </span>
              </div>

              {/* Rattaché à */}
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 text-xs text-stone-600 space-y-1">
                {camp.targetSeriesTitle && (
                  <div>Série ciblée : <strong className="text-stone-800">{camp.targetSeriesTitle}</strong></div>
                )}
                {camp.targetThematiqueTitle && (
                  <div>Thématique Héritage : <strong className="text-stone-800">{camp.targetThematiqueTitle}</strong></div>
                )}
                <div className="text-[10px] text-purple-700 italic pt-1 border-t border-stone-200/60 font-medium">
                  "{camp.labelSponsorDisplay}"
                </div>
              </div>

              {/* Budget & Métriques */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="text-[10px] text-stone-400">Budget Consommé / Engagé</div>
                  <div className="font-bold font-mono text-stone-900 mt-0.5">
                    {camp.budgetConsumed.toLocaleString('fr-FR')} € / {camp.budgetCommitted.toLocaleString('fr-FR')} €
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="text-[10px] text-stone-400">Vues & Clics</div>
                  <div className="font-bold font-mono text-stone-900 mt-0.5 flex items-center gap-2">
                    <span>{camp.impressionsCount.toLocaleString('fr-FR')} vues</span>
                    <span className="text-[10px] text-stone-400 font-normal">({camp.clicksCount} clics)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-[11px] text-stone-400">
              <span>Du {new Date(camp.startDate).toLocaleDateString('fr-FR')} au {new Date(camp.endDate).toLocaleDateString('fr-FR')}</span>
              <button
                onClick={() => openEditModal(camp)}
                className="font-bold text-[#A2482B] hover:underline cursor-pointer"
              >
                Paramétrer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL CAMPAGNE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900 font-serif">
                {editingCampaign ? 'Modifier la Campagne' : 'Nouvelle Campagne Publicitaire'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCampaign} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Nom de la Campagne
                </label>
                <input 
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ex: Partenariat Transmission Vivante 2026"
                  className="w-full h-10 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-hidden font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Marque Partenaire
                  </label>
                  <input 
                    type="text"
                    value={brandName}
                    onChange={e => setBrandName(e.target.value)}
                    placeholder="Ex: Maison Dixeat"
                    className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Format d'affichage
                  </label>
                  <select
                    value={format}
                    onChange={e => setFormat(e.target.value as any)}
                    className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-hidden cursor-pointer"
                  >
                    {CAMPAIGN_FORMATS.map(f => (
                      <option key={f.id} value={f.id}>{f.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Budget Engagé (€)
                  </label>
                  <input 
                    type="number"
                    min="500"
                    step="100"
                    value={budgetCommitted}
                    onChange={e => setBudgetCommitted(Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono font-bold text-stone-900 outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Statut de diffusion
                  </label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-hidden cursor-pointer"
                  >
                    <option value="EN_COURS">EN COURS (Diffusé)</option>
                    <option value="VALIDEE">VALIDÉE (Programmé)</option>
                    <option value="BROUILLON">BROUILLON (En préparation)</option>
                    <option value="SUSPENDUE">SUSPENDUE</option>
                    <option value="TERMINEE">TERMINÉE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Série Ciblée (Optionnel)
                </label>
                <select
                  value={targetSeriesId}
                  onChange={e => setTargetSeriesId(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-hidden cursor-pointer"
                >
                  <option value="">Aucune (Diffusion thématique globale)</option>
                  {seriesList.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Mention Légale / Label de Sponsoring
                </label>
                <input 
                  type="text"
                  value={labelSponsorDisplay}
                  onChange={e => setLabelSponsorDisplay(e.target.value)}
                  placeholder="Ex: Parrainé avec le soutien bienveillant de..."
                  className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Justification pour l'Audit <span className="text-[#A2482B]">*</span>
                </label>
                <input 
                  type="text"
                  value={justification}
                  onChange={e => setJustification(e.target.value)}
                  placeholder="Ex: Validation de la convention commerciale avec la marque"
                  className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-hidden"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
