import React, { useState, useRef } from 'react';
import { 
  Film, 
  Search, 
  Edit3, 
  Sliders, 
  History, 
  Save, 
  CheckCircle2, 
  DollarSign, 
  Users, 
  Plus, 
  ChevronRight, 
  X, 
  Building2, 
  ShieldCheck, 
  FileText,
  Clock,
  Play,
  Pause,
  Upload,
  ArrowUp,
  ArrowDown,
  Trash2
} from 'lucide-react';
import { Documentary, QuestionItem, SeriesEffigie } from '../../types';
import { SeriesEconomicEnvelope, SeriesEconomicConfig } from '../../types/adminBackOffice';

interface AdminSeriesTabProps {
  seriesList: Documentary[];
  envelopes: SeriesEconomicEnvelope[];
  onUpdateSeriesData: (updatedDoc: Documentary, justification: string) => void;
  onUpdateEconomicConfig: (seriesId: string, newConfig: SeriesEconomicConfig, justification: string) => void;
}

export const AdminSeriesTab: React.FC<AdminSeriesTabProps> = ({
  seriesList,
  envelopes,
  onUpdateSeriesData,
  onUpdateEconomicConfig
}) => {
  const [selectedSeriesId, setSelectedSeriesId] = useState<string>(seriesList[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  // Série active
  const currentSeries = seriesList.find(s => s.id === selectedSeriesId) || seriesList[0];
  const currentEnvelope = envelopes.find(e => e.seriesId === selectedSeriesId) || envelopes[0];

  // État d'édition identité & thématiques
  const [editTitle, setEditTitle] = useState(currentSeries?.title || '');
  const [editTagline, setEditTagline] = useState(currentSeries?.subtitle || '');
  const [editCentralQuestion, setEditCentralQuestion] = useState(currentSeries?.centralQuestion || '');
  const [editSynopsis, setEditSynopsis] = useState(currentSeries?.description || '');
  const [themeA, setThemeA] = useState('Sagesse & Récits Vivants');
  const [themeB, setThemeB] = useState('Modernité & Transmission');

  // État d'édition des paramètres économiques versionnés
  const [isEconomicModalOpen, setIsEconomicModalOpen] = useState(false);
  const [platformFee, setPlatformFee] = useState(currentEnvelope?.currentConfig.platformFeePercent || 12);
  const [filiationPool, setFiliationPool] = useState(currentEnvelope?.currentConfig.filiationPoolPercent || 2);
  const [coproducersPool, setCoproducersPool] = useState(currentEnvelope?.currentConfig.coproducersPoolPercent || 60);
  const [creatorsPool, setCreatorsPool] = useState(currentEnvelope?.currentConfig.creatorsPoolPercent || 26);
  const [versionLabel, setVersionLabel] = useState(`v${(parseFloat((currentEnvelope?.currentConfig.version || 'v2.0').replace('v', '')) + 0.1).toFixed(1)}`);
  const [economicNotes, setEconomicNotes] = useState('');

  // Synchroniser quand la série change
  const handleSelectSeries = (id: string) => {
    setSelectedSeriesId(id);
    const doc = seriesList.find(s => s.id === id);
    const env = envelopes.find(e => e.seriesId === id);
    if (doc) {
      setEditTitle(doc.title);
      setEditTagline(doc.subtitle || '');
      setEditCentralQuestion(doc.centralQuestion || '');
      setEditSynopsis(doc.description || '');
    }
    if (env) {
      setPlatformFee(env.currentConfig.platformFeePercent);
      setFiliationPool(env.currentConfig.filiationPoolPercent);
      setCoproducersPool(env.currentConfig.coproducersPoolPercent);
      setCreatorsPool(env.currentConfig.creatorsPoolPercent);
      setVersionLabel(`v${(parseFloat((env.currentConfig.version || 'v2.0').replace('v', '')) + 0.1).toFixed(1)}`);
    }
  };

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSeries) return;

    const updated: Documentary = {
      ...currentSeries,
      title: editTitle.trim(),
      subtitle: editTagline.trim(),
      centralQuestion: editCentralQuestion.trim(),
      description: editSynopsis.trim()
    };

    onUpdateSeriesData(updated, `Mise à jour identité et thématiques de ${updated.title}`);
  };

  const handleSaveNewEconomicVersion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEnvelope) return;

    const total = platformFee + filiationPool + coproducersPool + creatorsPool;
    if (total !== 100) {
      alert(`La somme des pourcentages doit être égale à 100% (Actuellement: ${total}%)`);
      return;
    }

    const newConfig: SeriesEconomicConfig = {
      version: versionLabel.trim() || 'v2.1',
      platformFeePercent: platformFee,
      filiationPoolPercent: filiationPool,
      coproducersPoolPercent: coproducersPool,
      creatorsPoolPercent: creatorsPool,
      effectiveDate: new Date().toISOString(),
      updatedBy: 'Romeo Nonvide',
      changeNotes: economicNotes.trim() || 'Nouvelle version des paramètres de répartition'
    };

    onUpdateEconomicConfig(currentEnvelope.seriesId, newConfig, `Création version économique ${newConfig.version} pour ${currentSeries?.title}`);
    setIsEconomicModalOpen(false);
  };

  const filteredSeries = seriesList.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Sélecteur de série en haut */}
      <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {filteredSeries.map(s => {
            const isSelected = s.id === selectedSeriesId;
            return (
              <button
                key={s.id}
                onClick={() => handleSelectSeries(s.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected 
                    ? 'bg-[#A2482B] text-white shadow-md shadow-[#A2482B]/20' 
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-stone-500 font-mono">
          {seriesList.length} séries documentaires
        </div>
      </div>

      {currentSeries && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche : Identité & Double-Thématique */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h3 className="text-sm font-bold font-serif text-stone-900">
                    Identité & Double-Thématique de la Série
                  </h3>
                  <p className="text-xs text-stone-500">
                    Définition des deux polarités éditoriales et du synopsis central
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-mono font-bold">
                  ID : {currentSeries.id}
                </span>
              </div>

              <form onSubmit={handleSaveIdentity} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Titre officiel de la Série
                  </label>
                  <input 
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 font-bold focus:border-[#A2482B] outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                      Thématique A (Polarité 1)
                    </label>
                    <input 
                      type="text"
                      value={themeA}
                      onChange={e => setThemeA(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                      Thématique B (Polarité 2)
                    </label>
                    <input 
                      type="text"
                      value={themeB}
                      onChange={e => setThemeB(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Question Centrale du Documentaire
                  </label>
                  <textarea 
                    rows={2}
                    value={editCentralQuestion}
                    onChange={e => setEditCentralQuestion(e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Synopsis Narratif & Enjeux
                  </label>
                  <textarea 
                    rows={3}
                    value={editSynopsis}
                    onChange={e => setEditSynopsis(e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Sauvegarder l'identité</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Égéries et Collectif */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold font-serif text-stone-900">
                    Égéries & Collectif Documentaire
                  </h3>
                  <p className="text-xs text-stone-500">
                    Figures d'incarnation et passeurs rattachés à cette série
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentSeries.effigies?.map((eff, idx) => (
                  <div key={eff.id || idx} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-3">
                    <img 
                      src={eff.photoUrl || currentSeries.coverImage} 
                      alt={eff.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-stone-300 shrink-0"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900">{eff.name}</div>
                      <div className="text-[10px] text-stone-500">{eff.role || 'Égérie de la Série'}</div>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-[#A2482B]/10 text-[#A2482B] text-[9px] font-bold">
                        {eff.status || 'EFFIGIE_SERIE'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite : Paramètres Économiques Versionnés & Enveloppes */}
          <div className="space-y-6">
            {/* Boîte Enveloppe Financière */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="text-sm font-bold font-serif text-stone-900 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Enveloppe Financière</span>
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold font-mono">
                  {currentEnvelope?.economicVersion || 'v2.1'}
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="text-[10px] text-stone-500">Total levé par coproduction</div>
                  <div className="text-xl font-bold font-mono text-stone-900">
                    {currentEnvelope?.totalRaised.toLocaleString('fr-FR')} €
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                    <div className="text-[10px] text-emerald-800">Distribuable</div>
                    <div className="text-sm font-bold font-mono text-emerald-900">
                      {currentEnvelope?.distributableEnvelope.toLocaleString('fr-FR')} €
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200">
                    <div className="text-[10px] text-stone-600">Réserve risques</div>
                    <div className="text-sm font-bold font-mono text-stone-800">
                      {currentEnvelope?.reserveBalance.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100">
                  <div className="text-[10px] text-blue-800">Déjà versé aux ayants droit</div>
                  <div className="text-sm font-bold font-mono text-blue-900">
                    {currentEnvelope?.distributedAmount.toLocaleString('fr-FR')} €
                  </div>
                </div>
              </div>

              {/* Versioning économique */}
              <div className="pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-800">Clé de Répartition</span>
                  <button
                    onClick={() => setIsEconomicModalOpen(true)}
                    className="text-xs font-bold text-[#A2482B] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Nouvelle version</span>
                  </button>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Part Coproducteurs :</span>
                    <strong className="text-stone-900 font-mono">{currentEnvelope?.currentConfig.coproducersPoolPercent}%</strong>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Part Créateurs / Protagonistes :</span>
                    <strong className="text-stone-900 font-mono">{currentEnvelope?.currentConfig.creatorsPoolPercent}%</strong>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Commission Plateforme :</span>
                    <strong className="text-stone-900 font-mono">{currentEnvelope?.currentConfig.platformFeePercent}%</strong>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Filiation Économique (2%) :</span>
                    <strong className="text-emerald-700 font-mono">{currentEnvelope?.currentConfig.filiationPoolPercent}%</strong>
                  </div>
                </div>

                <p className="text-[10px] text-stone-400 mt-3 italic">
                  Note d'intégrité : Les modifications futures sont versionnées et n'altèrent jamais rétroactivement les dividendes déjà liquidés.
                </p>
              </div>
            </div>

            {/* Contrats et Autorisations déposés */}
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                <FileText className="w-4 h-4 text-[#A2482B]" />
                <span>Contrats Juridiques Déposés</span>
              </div>
              <div className="space-y-2 text-xs text-stone-600">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <span>Cession droits d'auteur (CNC/SACD)</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Déposé</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <span>Autorisations d'exploitation 9/16</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Conforme</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CRÉATION NOUVELLE VERSION ÉCONOMIQUE */}
      {isEconomicModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 my-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#A2482B]" />
                <h3 className="text-base font-bold text-stone-900 font-serif">
                  Nouvelle Version Économique : {currentSeries?.title}
                </h3>
              </div>
              <button 
                onClick={() => setIsEconomicModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNewEconomicVersion} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Numéro de Version
                </label>
                <input 
                  type="text"
                  value={versionLabel}
                  onChange={e => setVersionLabel(e.target.value)}
                  placeholder="Ex: v2.2"
                  className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono font-bold text-stone-900 outline-hidden"
                  required
                />
              </div>

              <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Part Coproducteurs</span>
                    <span className="font-mono">{coproducersPool}%</span>
                  </div>
                  <input 
                    type="range" min="30" max="80" step="1"
                    value={coproducersPool}
                    onChange={e => setCoproducersPool(Number(e.target.value))}
                    className="w-full accent-[#A2482B]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Part Créateurs / Protagonistes</span>
                    <span className="font-mono">{creatorsPool}%</span>
                  </div>
                  <input 
                    type="range" min="10" max="50" step="1"
                    value={creatorsPool}
                    onChange={e => setCreatorsPool(Number(e.target.value))}
                    className="w-full accent-[#A2482B]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Commission Plateforme</span>
                    <span className="font-mono">{platformFee}%</span>
                  </div>
                  <input 
                    type="range" min="5" max="25" step="1"
                    value={platformFee}
                    onChange={e => setPlatformFee(Number(e.target.value))}
                    className="w-full accent-[#A2482B]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1 text-emerald-800">
                    <span>Filiation Lignée (Fixé conventionnellement)</span>
                    <span className="font-mono">{filiationPool}%</span>
                  </div>
                  <input 
                    type="range" min="2" max="5" step="1"
                    value={filiationPool}
                    onChange={e => setFiliationPool(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div className={`text-xs font-bold text-right pt-2 border-t border-stone-200 ${
                  coproducersPool + creatorsPool + platformFee + filiationPool === 100 
                    ? 'text-emerald-700' 
                    : 'text-rose-600'
                }`}>
                  Total : {coproducersPool + creatorsPool + platformFee + filiationPool}% / 100%
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Motif du changement & Date d'effet <span className="text-[#A2482B]">*</span>
                </label>
                <input 
                  type="text"
                  value={economicNotes}
                  onChange={e => setEconomicNotes(e.target.value)}
                  placeholder="Ex: Réévaluation des parts suite à l'entrée d'un nouveau distributeur"
                  className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-hidden"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsEconomicModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
                >
                  Publier la version
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
