import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Play, 
  Pause, 
  Film, 
  HelpCircle, 
  Clock, 
  Star, 
  Volume2, 
  VolumeX, 
  Video, 
  Users, 
  Search, 
  UserCheck, 
  Building2, 
  ShieldCheck, 
  X,
  ExternalLink
} from 'lucide-react';
import { DOCUMENTARIES, getCustomDocumentaries } from '../data/mockData';
import { ViewScreen, Documentary, SeriesProducerUser } from '../types';
import { CooptationModal } from './CooptationModal';

interface DocumentaryDetailScreenProps {
  documentaryId: string;
  onNavigate: (screen: ViewScreen) => void;
}

export const DocumentaryDetailScreen: React.FC<DocumentaryDetailScreenProps> = ({ 
  documentaryId, 
  onNavigate 
}) => {
  const [docList, setDocList] = useState<Documentary[]>(() => getCustomDocumentaries());
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Recherche des producteurs
  const [producerSearchQuery, setProducerSearchQuery] = useState('');
  
  // Modale de cooptation
  const [isCooptationModalOpen, setIsCooptationModalOpen] = useState(false);

  // Modale vidéo de présentation d'un producteur (double-clic)
  const [activeProducerVideo, setActiveProducerVideo] = useState<SeriesProducerUser | null>(null);
  const [isProducerVideoMuted, setIsProducerVideoMuted] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setDocList(getCustomDocumentaries());
    };
    window.addEventListener('yonywood_series_updated', handleUpdate);
    return () => window.removeEventListener('yonywood_series_updated', handleUpdate);
  }, []);

  const doc = docList.find(d => d.id === documentaryId) || docList[0] || DOCUMENTARIES[0];

  const producers = doc.producers || [];
  const filteredProducers = producers.filter(p => 
    p.name.toLowerCase().includes(producerSearchQuery.toLowerCase()) ||
    (p.roleTitle && p.roleTitle.toLowerCase().includes(producerSearchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-between py-6 px-4 sm:px-6 max-w-5xl mx-auto text-[#1C1917] font-sans">
      
      {/* 1. TOP BAR: Navigation & Sélecteur de séries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
          <button
            onClick={() => onNavigate({ type: 'documentaries' })}
            className="text-xs font-semibold text-[#8B6845] hover:text-[#1C1917] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Toutes les séries</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCooptationModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Recommander un membre pour cette série"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#A2482B]" />
              <span>Coopter un membre</span>
            </button>

            <button
              onClick={() => onNavigate({ type: 'duo_feed', selectedDocId: doc.id })}
              className="text-xs font-semibold text-[#A2482B] hover:text-[#8A3B22] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Explorer les duos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sélecteur de séries sobre */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1">
          {docList.map((item) => {
            const isSelected = item.id === doc.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setPlayingVideoIndex(null);
                  onNavigate({ type: 'documentary_detail', documentaryId: item.id });
                }}
                className={`px-3.5 py-1 rounded-full text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C1917] text-[#FFFFFF] font-semibold shadow-xs'
                    : 'text-[#68655D] hover:text-[#1C1917] hover:bg-[#E7E5E4]/50 border border-transparent'
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. EN-TÊTE PRINCIPAL AVEC AFFICHE OFFICIELLE EN FORMAT VERTICAL 9/16 */}
      <div className="py-8 sm:py-12 text-center space-y-6 max-w-3xl mx-auto flex flex-col items-center">
        
        {/* AFFICHE OFFICIELLE 9/16 */}
        <div className="relative w-44 sm:w-56 aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200 bg-stone-900 group">
          <img 
            src={doc.posterUrl || doc.coverImage} 
            alt={doc.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/posters/Esu < > Jesus.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
          
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#A2482B] text-white text-[9px] font-mono font-bold tracking-widest uppercase">
            9:16
          </span>

          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest text-white uppercase whitespace-nowrap">
            AFFICHE OFFICIELLE
          </span>
        </div>

        {/* Thématique / Focus */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#A2482B]/10 border border-[#A2482B]/20 text-[#A2482B] text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#A2482B]" />
          <span>Thématique • {doc.centralQuestion}</span>
        </div>

        {/* Titre officiel de la série */}
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1917]">
          {doc.title}
        </h1>

        {/* Slogan */}
        <p className="font-editorial italic text-lg sm:text-xl text-[#8B6845] max-w-xl mx-auto leading-relaxed">
          « {doc.subtitle} »
        </p>

        {/* Effigies référentes de la série */}
        {doc.effigies && doc.effigies.length > 0 && (
          <div className="flex items-center justify-center gap-3 flex-wrap pt-1">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-[#C89B3C] fill-[#C89B3C]" />
              <span>Effigies :</span>
            </span>
            {doc.effigies.map(eff => (
              <div 
                key={eff.id}
                onClick={() => {
                  if (eff.id) {
                    onNavigate({ 
                      type: 'protagonist_profile', 
                      protagonistId: eff.id,
                      returnToDocId: doc.id
                    });
                  }
                }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs text-stone-800 transition-colors cursor-pointer"
                title={`Voir le profil d'effigie de ${eff.name}`}
              >
                <img 
                  src={eff.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'} 
                  alt={eff.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="font-semibold">{eff.name}</span>
                {eff.status === 'EFFIGIE_PRINCIPALE' && (
                  <span className="text-[9px] bg-[#C89B3C] text-white px-1.5 py-0.2 rounded-full font-bold">
                    1ère Vidéo
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Synopsis détaillé */}
        <p className="text-sm sm:text-base text-[#68655D] leading-relaxed max-w-2xl mx-auto font-light">
          {doc.description}
        </p>

        {/* Actions principales : Accéder aux duos & Coopter un membre */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate({ type: 'duo_feed', selectedDocId: doc.id })}
            className="px-6 py-2.5 rounded-2xl bg-[#A2482B] hover:bg-[#8A3B22] text-[#FFFFFF] text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-[#A2482B]/20 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Accéder aux duos de cette série</span>
          </button>

          <button
            onClick={() => setIsCooptationModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#A2482B]" />
            <span>Coopter un membre (Filiation 2%)</span>
          </button>
        </div>
      </div>

      {/* 3. CRÉATEURS, AUTEURS & RÉALISATION */}
      {(doc.author || doc.screenwriter || doc.director) && (
        <div className="py-8 border-t border-stone-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-editorial font-bold text-[#1C1917] flex items-center gap-2">
              <Film className="w-4 h-4 text-[#A2482B]" />
              <span>Conception & Réalisation</span>
            </h2>
            <span className="text-xs text-stone-400">Équipe fondatrice de la série</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Auteur */}
            {doc.author && (
              <div 
                onClick={() => {
                  if (doc.author?.protagonistId) {
                    onNavigate({ 
                      type: 'protagonist_profile', 
                      protagonistId: doc.author.protagonistId,
                      returnToDocId: doc.id
                    });
                  }
                }}
                className={`p-4 rounded-2xl border transition-all ${
                  doc.author.protagonistId 
                    ? 'bg-stone-50 hover:bg-stone-100/80 border-stone-200 cursor-pointer group' 
                    : 'bg-stone-50/60 border-stone-200/70'
                }`}
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A2482B] block mb-2">
                  Auteur du concept
                </span>
                <div className="flex items-center gap-3">
                  <img
                    src={doc.author.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                    alt={doc.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-stone-300"
                  />
                  <div>
                    <h3 className={`text-sm font-semibold transition-colors ${
                      doc.author.protagonistId ? 'group-hover:text-[#A2482B]' : ''
                    }`}>
                      {doc.author.name}
                    </h3>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      {doc.author.bio || 'Concepteur documentaire'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Scénariste */}
            {doc.screenwriter && (
              <div 
                onClick={() => {
                  if (doc.screenwriter?.protagonistId) {
                    onNavigate({ 
                      type: 'protagonist_profile', 
                      protagonistId: doc.screenwriter.protagonistId,
                      returnToDocId: doc.id
                    });
                  }
                }}
                className={`p-4 rounded-2xl border transition-all ${
                  doc.screenwriter.protagonistId 
                    ? 'bg-stone-50 hover:bg-stone-100/80 border-stone-200 cursor-pointer group' 
                    : 'bg-stone-50/60 border-stone-200/70'
                }`}
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C89B3C] block mb-2">
                  Scénariste & Questions
                </span>
                <div className="flex items-center gap-3">
                  <img
                    src={doc.screenwriter.avatarUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80'}
                    alt={doc.screenwriter.name}
                    className="w-10 h-10 rounded-full object-cover border border-stone-300"
                  />
                  <div>
                    <h3 className={`text-sm font-semibold transition-colors ${
                      doc.screenwriter.protagonistId ? 'group-hover:text-[#A2482B]' : ''
                    }`}>
                      {doc.screenwriter.name}
                    </h3>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      {doc.screenwriter.bio || 'Structure narrative'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Réalisateur */}
            {doc.director && (
              <div 
                onClick={() => {
                  if (doc.director?.protagonistId) {
                    onNavigate({ 
                      type: 'protagonist_profile', 
                      protagonistId: doc.director.protagonistId,
                      returnToDocId: doc.id
                    });
                  }
                }}
                className={`p-4 rounded-2xl border transition-all ${
                  doc.director.protagonistId 
                    ? 'bg-stone-50 hover:bg-stone-100/80 border-stone-200 cursor-pointer group' 
                    : 'bg-stone-50/60 border-stone-200/70'
                }`}
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block mb-2">
                  Réalisateur & Image
                </span>
                <div className="flex items-center gap-3">
                  <img
                    src={doc.director.avatarUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'}
                    alt={doc.director.name}
                    className="w-10 h-10 rounded-full object-cover border border-stone-300"
                  />
                  <div>
                    <h3 className={`text-sm font-semibold transition-colors ${
                      doc.director.protagonistId ? 'group-hover:text-[#A2482B]' : ''
                    }`}>
                      {doc.director.name}
                    </h3>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      {doc.director.bio || 'Prises de vue & 9:16'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. PRODUCTEURS DE LA SÉRIE (UTILISATEURS RÉELS PRÉSENTÉS LES UNS EN DESSOUS DES AUTRES) */}
      <div className="py-8 border-t border-stone-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-editorial font-bold text-[#1C1917] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#A2482B]" />
              <span>Collège des Producteurs ({producers.length})</span>
            </h2>
            <p className="text-xs text-[#68655D] mt-0.5">
              Utilisateurs et coproducteurs citoyens soutenant la production. Double-cliquez pour voir leur vidéo ou cliquez pour visiter leur profil.
            </p>
          </div>

          {/* Recherche rapide par nom */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Rechercher un producteur..."
              value={producerSearchQuery}
              onChange={(e) => setProducerSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-150 focus:bg-white border border-stone-200 focus:border-[#A2482B] text-xs text-stone-800 focus:outline-none transition-all placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* Liste verticale aérée des producteurs, les uns en dessous des autres */}
        <div className="space-y-2.5 pt-1">
          {filteredProducers.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-400 bg-stone-50 rounded-2xl border border-stone-150">
              Aucun producteur ne correspond à « {producerSearchQuery} ».
            </div>
          ) : (
            filteredProducers.map((producer) => (
              <div
                key={producer.id}
                onClick={() => {
                  // Clic simple : naviguer vers le profil
                  if (producer.protagonistId) {
                    onNavigate({ 
                      type: 'protagonist_profile', 
                      protagonistId: producer.protagonistId,
                      returnToDocId: doc.id
                    });
                  }
                }}
                onDoubleClick={(e) => {
                  // Double-clic : ouvrir la vidéo de présentation
                  e.stopPropagation();
                  setActiveProducerVideo(producer);
                }}
                className="group p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 hover:border-[#A2482B]/60 transition-all shadow-xs hover:shadow-md flex items-center justify-between gap-4 cursor-pointer"
                title="1 clic : Profil · Double-clic : Vidéo de présentation"
              >
                {/* Avatar + Nom + Rôle */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={producer.avatarUrl}
                      alt={producer.name}
                      className="w-12 h-12 rounded-full object-cover border border-stone-200 group-hover:scale-105 transition-transform"
                    />
                    {producer.videoPresentationUrl && (
                      <span className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#A2482B] text-white flex items-center justify-center text-[9px] shadow-sm">
                        <Play className="w-2.5 h-2.5 fill-white" />
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-sm text-[#1C1917] group-hover:text-[#A2482B] transition-colors truncate">
                        {producer.name}
                      </h3>
                      <span className="text-[10px] font-medium text-[#C89B3C] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80">
                        {producer.roleTitle}
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 line-clamp-1 mt-0.5 font-light">
                      {producer.bio || `Membre producteur depuis le ${producer.joinedAt}`}
                    </p>
                  </div>
                </div>

                {/* Métadonnées & Actions discrètes */}
                <div className="flex items-center gap-4 shrink-0 text-right">
                  <div className="hidden sm:block text-right">
                    {producer.pledgeAmount && (
                      <span className="text-xs font-semibold text-stone-900 block font-mono">
                        {producer.pledgeAmount.toLocaleString('fr-FR')} €
                      </span>
                    )}
                    <span className="text-[10px] text-stone-400">
                      Entrée : {producer.joinedAt}
                    </span>
                  </div>

                  {producer.videoPresentationUrl && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProducerVideo(producer);
                      }}
                      className="p-2 rounded-full bg-stone-100 hover:bg-[#A2482B] text-stone-700 hover:text-white transition-colors cursor-pointer"
                      title="Regarder la vidéo de présentation"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                  )}

                  <span className="text-stone-300 group-hover:text-[#A2482B] transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 5. DISTRIBUTEURS & SPONSORS PARTENAIRES */}
      {((doc.distributors && doc.distributors.length > 0) || (doc.sponsors && doc.sponsors.length > 0)) && (
        <div className="py-8 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Distributeurs */}
          {doc.distributors && doc.distributors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C89B3C]" />
                <h3 className="font-editorial text-base font-bold text-[#1C1917]">
                  Distributeurs & Relais d'audience
                </h3>
              </div>
              <p className="text-xs text-stone-500">
                Community managers et relais communautaires assurant la visibilité de la série.
              </p>

              <div className="space-y-2 pt-1">
                {doc.distributors.map(dist => (
                  <div 
                    key={dist.id}
                    className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-3"
                  >
                    <img 
                      src={dist.avatarUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'}
                      alt={dist.name}
                      className="w-9 h-9 rounded-full object-cover border border-stone-300"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-stone-900">{dist.name}</h4>
                      <p className="text-[11px] text-stone-500">{dist.roleOrChannel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sponsors */}
          {doc.sponsors && doc.sponsors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#A2482B]" />
                <h3 className="font-editorial text-base font-bold text-[#1C1917]">
                  Sponsors & Mécénat Éthique
                </h3>
              </div>
              <p className="text-xs text-stone-500">
                Partenaires soutenant financièrement la série selon la clé 84% Série / 16% YonyWood.
              </p>

              <div className="space-y-2 pt-1">
                {doc.sponsors.map(sponsor => (
                  <div 
                    key={sponsor.id}
                    className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-stone-900">{sponsor.companyName}</h4>
                        <span className="text-[9px] font-mono text-[#A2482B] uppercase">Sponsor officiel</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">{sponsor.partnershipType}</p>
                      {sponsor.description && (
                        <p className="text-[10px] text-stone-400 italic mt-0.5">{sponsor.description}</p>
                      )}
                    </div>
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. GALERIE DES ÉPISODES & MINI-VIDÉOS EN FORMAT VERTICAL 9/16 */}
      <div className="py-8 border-t border-stone-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-editorial font-bold text-[#1C1917] flex items-center gap-2">
              <Film className="w-5 h-5 text-[#A2482B]" />
              <span>Épisodes & Mini-Vidéos de Présentation (Format 9/16)</span>
            </h2>
            <p className="text-xs text-[#68655D] mt-0.5">
              Chaque question directrice est présentée en format vertical 9/16 par l'effigie ou le passeur de la série.
            </p>
          </div>

          <span className="text-xs text-[#A2482B] font-bold">
            {doc.episodeCount || doc.questions?.length || 5} chapitres 9/16
          </span>
        </div>

        {/* Grille des épisodes au format 9/16 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doc.questions?.map((q, idx) => {
            const isPlaying = playingVideoIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl border border-stone-200 hover:border-[#A2482B] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
              >
                {/* AFFICHE OU LECTEUR MINI-VIDÉO VERTICALE 9/16 */}
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-stone-950">
                  {isPlaying && q.videoUrl ? (
                    <video
                      src={q.videoUrl}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={q.posterUrl || doc.coverImage} 
                      alt={q.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = doc.coverImage;
                      }}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
                  
                  {/* Badge numéro d'épisode */}
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#A2482B] text-white text-[10px] font-mono font-bold tracking-wider shadow-sm">
                    ÉPISODE {q.number || String(idx + 1).padStart(2, '0')}
                  </div>

                  {q.audioDuration && (
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono text-white flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{q.audioDuration}</span>
                    </div>
                  )}

                  {/* Bouton pour lancer la mini-vidéo 9/16 de la question */}
                  {q.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setPlayingVideoIndex(isPlaying ? null : idx)}
                        className="w-12 h-12 rounded-full bg-[#A2482B]/90 hover:bg-[#A2482B] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer border border-white/30"
                        title={isPlaying ? "Arrêter la vidéo" : "Lancer la mini-vidéo de la question"}
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 fill-white" />
                        ) : (
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Bouton de contrôle du son */}
                  {isPlaying && (
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="absolute bottom-16 right-3 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                    <h3 className="font-bold text-base tracking-tight drop-shadow-md line-clamp-1">
                      {q.title}
                    </h3>
                    {q.effigieName && (
                      <p className="text-[11px] text-amber-200 flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 fill-amber-200" />
                        <span>Présenté par {q.effigieName}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Question posée dans l'épisode */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#A2482B] uppercase tracking-wider">
                      <HelpCircle className="w-3 h-3" />
                      <span>Question posée :</span>
                    </div>
                    <p className="text-xs text-[#57534E] leading-relaxed italic line-clamp-3">
                      « {q.prompt} »
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate({ type: 'duo_feed', selectedDocId: doc.id })}
                      className="text-xs font-semibold text-[#A2482B] hover:text-[#8A3B22] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Voir les récits</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    {q.videoUrl && (
                      <span className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
                        <Video className="w-3 h-3 text-[#A2482B]" />
                        <span>Vidéo 9/16</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. MODALE VIDÉO DU PRODUCTEUR (DÉCLENCHÉE AU DOUBLE-CLIC) */}
      {activeProducerVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveProducerVideo(null)}
        >
          <div 
            className="relative w-full max-w-sm aspect-[9/16] bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Vidéo 9:16 */}
            <video
              src={activeProducerVideo.videoPresentationUrl}
              autoPlay
              loop
              muted={isProducerVideoMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Haut */}
            <div className="relative z-10 p-4 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#A2482B] text-white text-[10px] font-mono uppercase font-bold tracking-wider">
                Vidéo Producteur
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsProducerVideoMuted(!isProducerVideoMuted)}
                  className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer"
                >
                  {isProducerVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => setActiveProducerVideo(null)}
                  className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bas */}
            <div className="relative z-10 p-5 space-y-3">
              <div>
                <h3 className="text-xl font-editorial font-bold text-white">
                  {activeProducerVideo.name}
                </h3>
                <p className="text-xs text-[#C89B3C] font-medium">
                  {activeProducerVideo.roleTitle} · {doc.title}
                </p>
                {activeProducerVideo.bio && (
                  <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                    {activeProducerVideo.bio}
                  </p>
                )}
              </div>

              {activeProducerVideo.protagonistId && (
                <button
                  onClick={() => {
                    const protagId = activeProducerVideo.protagonistId;
                    setActiveProducerVideo(null);
                    if (protagId) {
                      onNavigate({ 
                        type: 'protagonist_profile', 
                        protagonistId: protagId,
                        returnToDocId: doc.id
                      });
                    }
                  }}
                  className="w-full py-2.5 rounded-full bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <span>Visiter son profil complet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 8. MODALE DE COOPTATION */}
      <CooptationModal
        isOpen={isCooptationModalOpen}
        onClose={() => setIsCooptationModalOpen(false)}
        defaultSeriesId={doc.id}
      />

      {/* 9. FOOTER SOBRE */}
      <div className="text-center text-[11px] text-[#8B6845]/70 pt-6 pb-2">
        YONYWOOD • Récits d'humanité et de transmission
      </div>

    </div>
  );
};
