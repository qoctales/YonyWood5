import React, { useState } from 'react';
import { UserCheck, X, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { DOCUMENTARIES } from '../data/mockData';

interface CooptationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSeriesId?: string;
  onSuccess?: () => void;
}

export const CooptationModal: React.FC<CooptationModalProps> = ({
  isOpen,
  onClose,
  defaultSeriesId,
  onSuccess
}) => {
  const [selectedSeriesId, setSelectedSeriesId] = useState(defaultSeriesId || DOCUMENTARIES[0]?.id || 'jesus-legba');
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [proposedRole, setProposedRole] = useState<'membre_coopte' | 'acteur_documentaire' | 'egerie' | 'distributeur_communautaire'>('membre_coopte');
  const [motivation, setMotivation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentSeries = DOCUMENTARIES.find(d => d.id === selectedSeriesId) || DOCUMENTARIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) return;

    // Persister dans le stockage d'administration de cooptation
    try {
      const existingCoopts = JSON.parse(localStorage.getItem('yonywood_admin_data_cooptations') || '[]');
      const newCoopt = {
        id: `coopt-${Date.now()}`,
        seriesId: selectedSeriesId,
        seriesTitle: currentSeries.title,
        referentId: 'user-current',
        referentName: 'Romeo Nonvide (Moi-même)',
        referentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        recommendedPersonName: candidateName.trim(),
        recommendedPersonEmail: candidateEmail.trim() || 'candidat@yonywood.org',
        recommendedPersonAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        recommendationDate: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'EN_ATTENTE',
        motivation: motivation.trim() || 'Recommandation basée sur la transmission et l\'authenticité du récit.',
        filiationRate: 2
      };
      localStorage.setItem('yonywood_admin_data_cooptations', JSON.stringify([newCoopt, ...existingCoopts]));
    } catch {
      // ignore
    }

    setSubmitted(true);
    if (onSuccess) onSuccess();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#181816] text-[#F5F5F0] rounded-3xl border border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête sobre */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800/80 bg-stone-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#A2482B]/20 border border-[#A2482B]/40 flex items-center justify-center text-[#A2482B]">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C89B3C]">
                Recommandation & Filiation 2%
              </span>
              <h3 className="font-editorial text-lg font-bold text-white">
                Coopter un membre pour une série
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corps */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Check className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-editorial text-xl font-bold text-white">
                  Recommandation enregistrée
                </h4>
                <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
                  Votre proposition d'intégrer <strong className="text-white">{candidateName}</strong> à la série <strong className="text-[#FACC15]">{currentSeries.title}</strong> a été transmise aux responsables éditoriaux.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800 text-left text-xs text-stone-400 space-y-1">
                <div className="flex items-center gap-1.5 text-stone-300 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>Règle de filiation économique :</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Dès validation par l'équipe YonyWood, vous bénéficierez d'une commission de filiation de 2 % sur toutes les transactions admissibles générées par ce membre dans cette série.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-semibold cursor-pointer transition-all"
                >
                  Fermer
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Sélecteur de série */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300 block">
                  Série cible de rattachement
                </label>
                <select
                  value={selectedSeriesId}
                  onChange={(e) => setSelectedSeriesId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-[#A2482B]"
                >
                  {DOCUMENTARIES.map(doc => (
                    <option key={doc.id} value={doc.id}>
                      {doc.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nom du candidat */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300 block">
                  Prénom et nom de la personne recommandée
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mireille Houndé"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-[#A2482B] placeholder:text-stone-600"
                />
              </div>

              {/* Email / Contact */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300 block">
                  Email ou numéro de contact
                </label>
                <input
                  type="text"
                  placeholder="Ex: mireille@exemple.com"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-[#A2482B] placeholder:text-stone-600"
                />
              </div>

              {/* Rôle suggéré */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300 block">
                  Rôle envisagé pour cette personne
                </label>
                <select
                  value={proposedRole}
                  onChange={(e) => setProposedRole(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-[#A2482B]"
                >
                  <option value="membre_coopte">Membre coopté (témoignage et transmission)</option>
                  <option value="acteur_documentaire">Acteur documentaire (intervenant filmé clé)</option>
                  <option value="egerie">Effigie référente de thématique</option>
                  <option value="distributeur_communautaire">Distributeur & relais communautaire</option>
                </select>
              </div>

              {/* Motif / Argumentaire */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300 block">
                  Pourquoi cette personne doit-elle rejoindre la série ?
                </label>
                <textarea
                  rows={3}
                  placeholder="Décrivez brièvement son histoire, ses savoir-faire ou sa légitimité à porter la parole..."
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs focus:outline-none focus:border-[#A2482B] placeholder:text-stone-600 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-full bg-stone-800 text-stone-300 hover:text-white text-xs font-medium cursor-pointer"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={!candidateName.trim()}
                  className="px-6 py-2 rounded-full bg-[#A2482B] hover:bg-[#8A3B22] disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <span>Soumettre la cooptation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
