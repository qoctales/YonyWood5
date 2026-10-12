import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  HelpCircle, 
  Video, 
  Check, 
  X, 
  EyeOff, 
  Trash2, 
  Award, 
  ShieldCheck, 
  Tag, 
  Plus, 
  Edit3, 
  Search,
  ExternalLink,
  Building2,
  Lock,
  FileCheck
} from 'lucide-react';
import { 
  HeritageThematique, 
  HeritageQuestion, 
  HeritageSubmittedStory,
  AdvertisingCampaign
} from '../../types/adminBackOffice';

interface AdminHeritageTabProps {
  thematiques: HeritageThematique[];
  questions: HeritageQuestion[];
  submittedStories: HeritageSubmittedStory[];
  campaigns: AdvertisingCampaign[];
  onUpdateThematique: (updated: HeritageThematique, justification: string) => void;
  onAddThematique: (newThem: HeritageThematique, justification: string) => void;
  onUpdateQuestion: (updated: HeritageQuestion, justification: string) => void;
  onAddQuestion: (newQ: HeritageQuestion, justification: string) => void;
  onReviewStory: (
    storyId: string, 
    status: HeritageSubmittedStory['status'], 
    circleHighlight: HeritageSubmittedStory['circleHighlight'],
    isSponsored: boolean,
    brandSponsor: string | undefined,
    notes: string,
    justification: string
  ) => void;
}

export const AdminHeritageTab: React.FC<AdminHeritageTabProps> = ({
  thematiques,
  questions,
  submittedStories,
  campaigns,
  onUpdateThematique,
  onAddThematique,
  onUpdateQuestion,
  onAddQuestion,
  onReviewStory
}) => {
  const [subTab, setSubTab] = useState<'stories' | 'thematiques' | 'questions'>('stories');
  
  // Filtres histoires
  const [storySearch, setStorySearch] = useState('');
  const [storyStatusFilter, setStoryStatusFilter] = useState<string>('ALL');
  const [storyThematiqueFilter, setStoryThematiqueFilter] = useState<string>('ALL');

  // Modal d'examen d'histoire
  const [examiningStory, setExaminingStory] = useState<HeritageSubmittedStory | null>(null);
  const [reviewStatus, setReviewStatus] = useState<HeritageSubmittedStory['status']>('VALIDEE');
  const [reviewCircle, setReviewCircle] = useState<HeritageSubmittedStory['circleHighlight']>('DECOUVERTE');
  const [reviewIsSponsored, setReviewIsSponsored] = useState(false);
  const [reviewBrandSponsor, setReviewBrandSponsor] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewJustification, setReviewJustification] = useState('');

  // Modale thématique
  const [editingThematique, setEditingThematique] = useState<HeritageThematique | null>(null);
  const [isNewThematique, setIsNewThematique] = useState(false);
  const [themTitle, setThemTitle] = useState('');
  const [themSubtitle, setThemSubtitle] = useState('');
  const [themDesc, setThemDesc] = useState('');
  const [themCover, setThemCover] = useState('');
  const [themSponsoredBrand, setThemSponsoredBrand] = useState('');
  const [themJustification, setThemJustification] = useState('');

  // Modale question
  const [editingQuestion, setEditingQuestion] = useState<HeritageQuestion | null>(null);
  const [isNewQuestion, setIsNewQuestion] = useState(false);
  const [qTitle, setQTitle] = useState('');
  const [qNumber, setQNumber] = useState('');
  const [qPrompt, setQPrompt] = useState('');
  const [qThematiqueId, setQThematiqueId] = useState('');
  const [qJustification, setQJustification] = useState('');

  const openExamineModal = (story: HeritageSubmittedStory) => {
    setExaminingStory(story);
    setReviewStatus(story.status === 'EN_ATTENTE' ? 'VALIDEE' : story.status);
    setReviewCircle(story.circleHighlight);
    setReviewIsSponsored(story.isSponsored);
    setReviewBrandSponsor(story.brandSponsor || '');
    setReviewNotes(story.reviewerNotes || '');
    setReviewJustification('');
  };

  const handleConfirmReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examiningStory) return;

    onReviewStory(
      examiningStory.id,
      reviewStatus,
      reviewCircle,
      reviewIsSponsored,
      reviewIsSponsored ? reviewBrandSponsor : undefined,
      reviewNotes,
      reviewJustification.trim() || `Décision éditoriale : ${reviewStatus}`
    );

    setExaminingStory(null);
  };

  // Filtrage histoires
  const filteredStories = submittedStories.filter(s => {
    const matchesSearch = 
      s.authorName.toLowerCase().includes(storySearch.toLowerCase()) ||
      s.questionTitle.toLowerCase().includes(storySearch.toLowerCase()) ||
      s.thematiqueTitle.toLowerCase().includes(storySearch.toLowerCase()) ||
      s.summary.toLowerCase().includes(storySearch.toLowerCase());
    
    const matchesStatus = storyStatusFilter === 'ALL' || s.status === storyStatusFilter;
    const matchesThem = storyThematiqueFilter === 'ALL' || s.thematiqueId === storyThematiqueFilter;

    return matchesSearch && matchesStatus && matchesThem;
  });

  return (
    <div className="space-y-6">
      {/* En-tête éditorial */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold font-serif text-stone-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C89B3C]" />
            <span>Gestion Éditoriale d'Héritage : Thématiques, Questions & Histoires</span>
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-3xl">
            Modération des témoignages du réel, validation des cessions de droits, sélection des cercles de mise en valeur et distinction stricte entre choix éditoriaux et partenariats de marques.
          </p>
        </div>

        {/* Sous-onglets */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-2xl shrink-0">
          <button
            onClick={() => setSubTab('stories')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'stories' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Histoires Soumises ({submittedStories.length})
          </button>
          <button
            onClick={() => setSubTab('thematiques')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'thematiques' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Thématiques ({thematiques.length})
          </button>
          <button
            onClick={() => setSubTab('questions')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'questions' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Questions ({questions.length})
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SOUS-ONGLET : HISTOIRES SOUMISES                                       */}
      {/* ========================================================================= */}
      {subTab === 'stories' && (
        <div className="space-y-4">
          {/* Filtres histoires */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <div className="relative w-full">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input 
                  type="text"
                  value={storySearch}
                  onChange={e => setStorySearch(e.target.value)}
                  placeholder="Rechercher par auteur, question, thématique ou extrait..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={storyStatusFilter}
                onChange={e => setStoryStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:border-[#A2482B] outline-hidden cursor-pointer"
              >
                <option value="ALL">Tous les statuts</option>
                <option value="EN_ATTENTE">En attente de validation</option>
                <option value="VALIDEE">Validées (publiées)</option>
                <option value="REFUSEE">Refusées</option>
                <option value="MASQUEE">Masquées</option>
                <option value="RETIREE">Retirées</option>
              </select>

              <select
                value={storyThematiqueFilter}
                onChange={e => setStoryThematiqueFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:border-[#A2482B] outline-hidden cursor-pointer"
              >
                <option value="ALL">Toutes les thématiques</option>
                {thematiques.map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grille des histoires soumises */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStories.map(story => (
              <div 
                key={story.id} 
                className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs hover:border-[#A2482B]/40 transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={story.authorAvatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'} 
                      alt={story.authorName} 
                      className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900">{story.authorName}</div>
                      <div className="text-[10px] text-stone-500">{story.authorRole} • {story.authorEmail}</div>
                      <div className="text-[10px] text-stone-400">
                        Soumis le {new Date(story.submissionDate).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>

                  {/* Badge statut */}
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    story.status === 'VALIDEE' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : story.status === 'EN_ATTENTE'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse'
                        : story.status === 'REFUSEE'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-stone-200 text-stone-700'
                  }`}>
                    {story.status}
                  </span>
                </div>

                {/* Question & Thématique */}
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-stone-500">
                    <span className="font-semibold text-[#A2482B]">{story.thematiqueTitle}</span>
                    <span className="font-mono">{story.videoDuration}</span>
                  </div>
                  <div className="text-xs font-bold text-stone-900">{story.questionTitle}</div>
                  <p className="text-[11px] text-stone-600 line-clamp-2 italic">
                    "{story.summary}"
                  </p>
                </div>

                {/* Droits & Sponsoring info */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] pt-1 border-t border-stone-100">
                  <div className="flex items-center gap-1.5 text-stone-600">
                    <ShieldCheck className={`w-3.5 h-3.5 ${story.legalConsents.rightsGranted ? 'text-emerald-600' : 'text-amber-500'}`} />
                    <span>{story.legalConsents.rightsGranted ? 'Cession signée' : 'Cession incomplète'}</span>
                    <span className="text-stone-300">•</span>
                    <Award className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>Cercle : {story.circleHighlight}</span>
                  </div>

                  {story.isSponsored ? (
                    <span className="px-2 py-0.5 rounded-lg bg-purple-50 text-purple-700 font-bold border border-purple-200 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      <span>Sponsorisé : {story.brandSponsor}</span>
                    </span>
                  ) : (
                    <span className="text-stone-400 font-medium">Sélection éditoriale</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                  <button
                    onClick={() => openExamineModal(story)}
                    className="px-4 py-2 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Examiner le dossier</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SOUS-ONGLET : THÉMATIQUES D'HÉRITAGE                                   */}
      {/* ========================================================================= */}
      {subTab === 'thematiques' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {thematiques.map(them => (
              <div 
                key={them.id} 
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:border-[#A2482B]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-32 w-full relative bg-stone-900">
                    <img 
                      src={them.coverImage} 
                      alt={them.title} 
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${them.active ? 'bg-emerald-500 text-white' : 'bg-stone-500 text-white'}`}>
                        {them.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="text-[10px] font-mono text-stone-400">Ordre #{them.displayOrder}</div>
                    <h3 className="text-sm font-bold font-serif text-stone-900">{them.title}</h3>
                    <p className="text-xs font-medium text-[#A2482B]">{them.subtitle}</p>
                    <p className="text-[11px] text-stone-600 line-clamp-2">{them.description}</p>

                    {them.sponsoredBrandName && (
                      <div className="mt-2 p-2 rounded-xl bg-purple-50 border border-purple-100 flex items-center gap-1.5 text-[10px] text-purple-800 font-bold">
                        <Building2 className="w-3 h-3 text-purple-600" />
                        <span>Campagne Marque : {them.sponsoredBrandName}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>{them.storiesCount} histoires • {them.questionsCount} questions</span>
                  <button 
                    onClick={() => {
                      setEditingThematique(them);
                      setIsNewThematique(false);
                      setThemTitle(them.title);
                      setThemSubtitle(them.subtitle);
                      setThemDesc(them.description);
                      setThemCover(them.coverImage);
                      setThemSponsoredBrand(them.sponsoredBrandName || '');
                      setThemJustification('');
                    }}
                    className="text-xs font-bold text-[#A2482B] hover:underline cursor-pointer"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SOUS-ONGLET : QUESTIONS D'HÉRITAGE                                     */}
      {/* ========================================================================= */}
      {subTab === 'questions' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Questions ouvertes d'Héritage
            </span>
            <span className="text-xs text-stone-500">{questions.length} questions au catalogue</span>
          </div>

          <div className="divide-y divide-stone-100">
            {questions.map(q => (
              <div key={q.id} className="p-4 hover:bg-stone-50 transition-colors flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-lg bg-[#A2482B]/10 text-[#A2482B] text-[10px] font-bold font-mono">
                      Q{q.number}
                    </span>
                    <span className="text-xs font-bold text-stone-900">{q.title}</span>
                    <span className="text-[10px] text-stone-400">• Thématique : {q.thematiqueTitle}</span>
                  </div>
                  <p className="text-xs text-stone-600 italic">
                    "{q.prompt}"
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold text-stone-700 font-mono">
                    {q.submissionsCount} soumissions
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL D'EXAMEN APPROFONDI D'UNE HISTOIRE */}
      {examiningStory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 my-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-serif">
                  Examen du Dossier : {examiningStory.questionTitle}
                </h3>
                <p className="text-xs text-stone-500">
                  Auteur : <strong className="text-stone-800">{examiningStory.authorName}</strong> ({examiningStory.authorEmail})
                </p>
              </div>
              <button 
                onClick={() => setExaminingStory(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmReview} className="space-y-4">
              {/* Vidéo et résumé */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Thématique : <strong>{examiningStory.thematiqueTitle}</strong></span>
                  <span className="font-mono">{examiningStory.videoDuration}</span>
                </div>
                <p className="text-xs text-stone-800 italic bg-white p-3 rounded-xl border border-stone-100">
                  "{examiningStory.summary}"
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-500">
                  <Video className="w-3.5 h-3.5 text-[#A2482B]" />
                  <span>Fichier vidéo : {examiningStory.videoUrl}</span>
                </div>
              </div>

              {/* Statut de conformité juridique */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1.5 text-xs">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Autorisations Juridiques & Droit à l'Image</span>
                </div>
                <div className="text-[11px] text-amber-800">
                  • Périmètre : {examiningStory.legalConsents.rightsScope}
                </div>
                <div className="text-[11px] text-amber-800">
                  • Pièce d'identité : {examiningStory.legalConsents.authorIdentityVerified ? 'Vérifiée avec succès' : 'En attente de justificatif'}
                </div>
              </div>

              {/* Décision éditoriale */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Décision de Statut
                  </label>
                  <select
                    value={reviewStatus}
                    onChange={e => setReviewStatus(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 font-semibold focus:border-[#A2482B] outline-hidden cursor-pointer"
                  >
                    <option value="VALIDEE">VALIDÉE (Publier dans Héritage)</option>
                    <option value="REFUSEE">REFUSÉE (Non-conforme aux règles)</option>
                    <option value="MASQUEE">MASQUÉE (Suspendre temporairement)</option>
                    <option value="RETIREE">RETIRÉE (Suppression du catalogue)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Cercle de Mise en Valeur
                  </label>
                  <select
                    value={reviewCircle}
                    onChange={e => setReviewCircle(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 font-semibold focus:border-[#A2482B] outline-hidden cursor-pointer"
                  >
                    <option value="AUCUN">Aucun (Flux standard)</option>
                    <option value="DECOUVERTE">Cercle Découverte</option>
                    <option value="MAJEUR">Cercle Majeur</option>
                    <option value="COEUR_FORET">Cœur de Forêt (Vitrine d'honneur)</option>
                  </select>
                </div>
              </div>

              {/* Sponsoring vs Choix Éditorial */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={reviewIsSponsored}
                    onChange={e => setReviewIsSponsored(e.target.checked)}
                    className="accent-[#A2482B] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-stone-900">
                    Associer à un Emplacement Sponsorisé par une Marque
                  </span>
                </label>

                {reviewIsSponsored && (
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Nom de la marque ou campagne partenaire
                    </label>
                    <input 
                      type="text"
                      value={reviewBrandSponsor}
                      onChange={e => setReviewBrandSponsor(e.target.value)}
                      placeholder="Ex: Maison Dixeat ou BioTerroirs"
                      className="w-full h-9 px-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
                      required={reviewIsSponsored}
                    />
                    <p className="text-[10px] text-purple-700 mt-1 font-medium">
                      Un badge explicite "Sponsorisé" sera affiché pour préserver la confiance du public.
                    </p>
                  </div>
                )}
              </div>

              {/* Notes et justification audit */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Justification pour le Journal d'Audit <span className="text-[#A2482B]">*</span>
                </label>
                <input 
                  type="text"
                  value={reviewJustification}
                  onChange={e => setReviewJustification(e.target.value)}
                  placeholder="Ex: Validation après vérification des droits d'auteur et attribution en Cercle Majeur"
                  className="w-full h-9 px-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:border-[#A2482B] outline-hidden"
                  required
                />
              </div>

              {/* Boutons d'action */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setExaminingStory(null)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!reviewJustification.trim()}
                  className="px-5 py-2 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] disabled:opacity-40 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
                >
                  Enregistrer la décision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
