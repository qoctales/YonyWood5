import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, X, Award, BookOpen, User, Sparkles, Clapperboard } from 'lucide-react';
import { getLineageTree, LineageMember, LINEAGE_COLORS } from '../utils/lineageService';
import { ResonanceModal } from './ResonanceModal';
import { SequenceCreditsModal } from './SequenceCreditsModal';
import { getSeriesCredits } from '../data/seriesTeamData';

interface ProfileLineageFriseProps {
  personIdOrName: string;
  onNavigateToPerson: (personId: string) => void;
  onClose?: () => void;
}

export const ProfileLineageFrise: React.FC<ProfileLineageFriseProps> = ({
  personIdOrName,
  onNavigateToPerson
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);
  const [videoModalMember, setVideoModalMember] = useState<LineageMember | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isResonanceModalOpen, setIsResonanceModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [personResonancePct, setPersonResonancePct] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Récupération de l'arbre de lignée (au moins 4 ascendants -> personne actuelle -> descendants)
  const tree = getLineageTree(personIdOrName);

  // Construction de la liste ordonnée des visages sur la frise
  const items: Array<{
    member: LineageMember;
    isCurrent: boolean;
    type: 'ascendant' | 'current' | 'descendant';
  }> = [
    ...tree.ascendants.map(m => ({ member: m, isCurrent: false, type: 'ascendant' as const })),
    { member: tree.current, isCurrent: true, type: 'current' as const },
    ...tree.descendants.map(m => ({ member: m, isCurrent: false, type: 'descendant' as const }))
  ];

  // Centrage automatique doux sur la personne actuelle pour pouvoir scroller vers le haut et vers le bas
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentElem = document.getElementById(`frise-node-${tree.current.id}`);
      if (currentElem && scrollContainerRef.current) {
        currentElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [personIdOrName, tree.current.id]);

  const handleMemberClick = (member: LineageMember) => {
    // 1er clic : sélectionne et affiche uniquement le prénom épuré
    // 2nd clic : ouvre sa vidéo de présentation identique à la matrice
    if (selectedMemberId === member.id) {
      setVideoModalMember(member);
      setIsPlaying(true);
      setIsResonanceModalOpen(false);
      setIsQuestionModalOpen(false);
    } else {
      setSelectedMemberId(member.id);
    }
  };

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div 
      id="profile-lineage-frise-container"
      className="relative w-full max-w-md mx-auto flex-1 min-h-0 h-full flex flex-col items-center justify-center animate-in fade-in duration-200 select-none overflow-hidden"
    >
      {/* Conteneur de la frise verticale (strictement contenu entre le header et la barre de nav) */}
      <div 
        ref={scrollContainerRef}
        id="profile-lineage-frise-scroll"
        className="relative flex-1 w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar px-4 py-8 flex flex-col items-center scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Liste des visages positionnés sur la ligne */}
        <div className="relative flex flex-col items-center gap-12 sm:gap-14 w-full my-auto py-10 min-h-full">
          {/* Ligne verticale ininterrompue reliant tous les maillons de la lignée du premier au tout dernier */}
          <div 
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2.5px] bg-[#A2482B] pointer-events-none z-0"
            style={{
              boxShadow: '0 0 8px rgba(162, 72, 43, 0.35)'
            }}
          />

          {items.map(({ member, isCurrent, type }, idx) => {
            const isSelected = selectedMemberId === member.id;
            const isHovered = hoveredMemberId === member.id;
            const firstName = member.firstName || member.name.split(' ')[0];
            const isFounder = member.isFounder === true;

            return (
              <div 
                key={`frise-node-${member.id}-${idx}`}
                id={`frise-node-${member.id}`}
                className="relative z-10 flex flex-col items-center"
                onMouseEnter={() => setHoveredMemberId(member.id)}
                onMouseLeave={() => setHoveredMemberId(null)}
              >
                {/* Ligne verticale de liaison continue vers le maillon suivant */}
                {idx < items.length - 1 && (
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[2.5px] bg-[#A2482B] pointer-events-none -z-10"
                    style={{
                      height: 'calc(100% + 3.5rem)',
                      boxShadow: '0 0 6px rgba(162, 72, 43, 0.35)'
                    }}
                  />
                )}

                {/* Prolongement vers le haut pour le premier maillon */}
                {idx === 0 && (
                  <div 
                    className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[2.5px] h-16 bg-[#A2482B] pointer-events-none -z-10"
                    style={{
                      boxShadow: '0 0 6px rgba(162, 72, 43, 0.35)'
                    }}
                  />
                )}

                {/* Prolongement vers le bas pour le dernier maillon descendant */}
                {idx === items.length - 1 && (
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[2.5px] h-16 bg-[#A2482B] pointer-events-none -z-10"
                    style={{
                      boxShadow: '0 0 6px rgba(162, 72, 43, 0.35)'
                    }}
                  />
                )}
                {/* Bulle prénom épurée : uniquement le prénom, aucune data technique ni mention premier clic */}
                {(isSelected || isHovered || isCurrent) && (
                  <div 
                    className={`absolute -top-7 px-3 py-0.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-200 shadow-md pointer-events-none whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 z-30 ${
                      isFounder
                        ? 'bg-[#A2482B] text-white border border-[#E07A5F]/60 shadow-[0_0_12px_rgba(162,72,43,0.45)]'
                        : isCurrent 
                          ? 'bg-[#1C1917] text-white border border-stone-700' 
                          : isSelected 
                            ? 'bg-[#C89B3C] text-white border border-[#E8C576]/50' 
                            : 'bg-white/95 text-stone-800 border border-stone-200'
                    }`}
                  >
                    {firstName}
                    {isFounder && (
                      <span className="ml-1.5 text-[9px] uppercase tracking-wider text-white/80 font-normal">
                        · Premier
                      </span>
                    )}
                  </div>
                )}

                {/* Tête de la personne en alvéole hexagonale */}
                <div className="relative flex items-center justify-center">
                  {/* Halo subtil terre cuite chaud pour les membres fondateurs */}
                  {isFounder && (
                    <div 
                      className="absolute inset-[-14px] pointer-events-none transition-all duration-300 animate-pulse"
                      style={{
                        background: 'radial-gradient(circle, rgba(200, 90, 50, 0.65) 0%, rgba(162, 72, 43, 0.35) 45%, transparent 75%)',
                        filter: 'blur(8px)',
                        transform: 'scale(1.2)'
                      }}
                    />
                  )}

                  {/* Rétro-éclairage lumineux doré pour le profil courant ou sélectionné non-fondateur */}
                  {!isFounder && (isSelected || isCurrent) && (
                    <div 
                      className="absolute inset-[-14px] pointer-events-none transition-all duration-300 animate-pulse"
                      style={{
                        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.75) 0%, rgba(200, 155, 60, 0.4) 50%, transparent 75%)',
                        filter: 'blur(8px)',
                        transform: 'scale(1.2)'
                      }}
                    />
                  )}

                  {/* Bouton Alvéolaire Hexagonal */}
                  <button
                    type="button"
                    id={`frise-avatar-${member.id}`}
                    onClick={() => handleMemberClick(member)}
                    className={`group relative transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center ${
                      isCurrent
                        ? 'w-16 h-18 sm:w-18 sm:h-21'
                        : isSelected
                          ? 'w-15 h-17 sm:w-17 sm:h-20 scale-105'
                          : 'w-13 h-15 sm:w-15 sm:h-17 hover:scale-105 opacity-90 hover:opacity-100'
                    }`}
                  >
                    {/* Alvéole SVG arrière-plan & liserés */}
                    <svg 
                      viewBox="0 0 100 115" 
                      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                    >
                      {/* Forme hexagonale principale */}
                      <polygon 
                        points="50,2 96,28 96,87 50,113 4,87 4,28" 
                        fill="#FFFFFF" 
                        stroke={
                          isFounder
                            ? '#C85A32' // Double liseré terre cuite chaud pour fondateurs
                            : isSelected 
                              ? '#C89B3C' 
                              : isCurrent 
                                ? '#E5C16C' 
                                : type === 'ascendant' 
                                  ? '#C89B3C' 
                                  : type === 'descendant' 
                                    ? '#A2482B' 
                                    : '#E7E5E4'
                        }
                        strokeWidth={isFounder ? '3' : isSelected || isCurrent ? '2.5' : '1.5'}
                        strokeLinejoin="round"
                        className="transition-colors duration-200"
                      />

                      {/* Deuxième liseré intérieur spécifique pour les fondateurs (Double liseret terre cuite chaud) */}
                      {isFounder && (
                        <polygon 
                          points="50,6 92,30 92,85 50,109 8,85 8,30" 
                          fill="none" 
                          stroke="#E07A5F" 
                          strokeWidth="1.75"
                          strokeLinejoin="round"
                          opacity="0.9"
                        />
                      )}

                      {/* Liseré doré intérieur pour sélection / courant si non-fondateur */}
                      {!isFounder && (isSelected || isCurrent) && (
                        <polygon 
                          points="50,5 93,30 93,85 50,110 7,85 7,30" 
                          fill="none" 
                          stroke="#FDE68A" 
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                          opacity="0.85"
                        />
                      )}
                    </svg>

                    {/* Photo de profil découpée en alvéole hexagonale */}
                    <div 
                      className="w-[88%] h-[88%] overflow-hidden bg-stone-100 transition-transform duration-200"
                      style={{
                        clipPath: 'polygon(50% 2%, 96% 28%, 96% 72%, 50% 98%, 4% 72%, 4% 28%)'
                      }}
                    >
                      <img
                        src={member.photoUrl}
                        alt={firstName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODALE VIDÉO DE PRÉSENTATION AU RE-CLIC (IDENTIQUE À LA MATRICE) */}
      {videoModalMember && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
          onClick={() => {
            setVideoModalMember(null);
            setIsResonanceModalOpen(false);
            setIsQuestionModalOpen(false);
          }}
        >
          <div 
            className="relative aspect-[9/16] w-[min(340px,calc((100dvh-140px)*9/16))] h-[min(600px,calc(100dvh-140px))] rounded-3xl overflow-hidden shadow-2xl bg-stone-950 border border-white/15 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Vidéo de fond */}
            <video
              ref={videoRef}
              src={videoModalMember.teaserVideoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-african-potter-working-with-clay-41551-large.mp4'}
              poster={videoModalMember.photoUrl}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              onClick={togglePlayback}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            />

            {/* Gradient sombre pour lisibilité cinématographique */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none" />

            {/* HAUT : Strictement aucun titre / pays / territoire (juste le son et la fermeture) */}
            <div className="relative z-20 p-4 flex items-center justify-end pointer-events-auto">
              <div className="flex items-center gap-2">
                {/* Muet / Son */}
                <button
                  type="button"
                  onClick={() => setIsMuted(prev => !prev)}
                  className="w-9 h-9 rounded-full bg-black/50 hover:bg-[#A2482B] backdrop-blur-md border border-white/20 hover:border-[#A2482B] text-white flex items-center justify-center cursor-pointer transition-all shadow-md hover:scale-105 active:scale-95"
                  title={isMuted ? 'Activer le son' : 'Couper le son'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>

                {/* Fermer */}
                <button 
                  type="button"
                  id="btn-close-lineage-video-modal"
                  onClick={() => {
                    setVideoModalMember(null);
                    setIsPlaying(false);
                    setIsResonanceModalOpen(false);
                    setIsQuestionModalOpen(false);
                  }}
                  className="w-9 h-9 rounded-full bg-black/50 hover:bg-[#A2482B] text-white border border-white/20 hover:border-[#A2482B] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                  title="Fermer"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Contrôle Play/Pause au centre si en pause */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlayback}
                className="relative z-10 mx-auto my-auto w-14 h-14 rounded-full bg-white/25 hover:bg-white/35 backdrop-blur-md border border-white/40 text-white flex items-center justify-center shadow-lg cursor-pointer transition-transform active:scale-95"
              >
                <Play className="w-6 h-6 ml-0.5 fill-white text-white" />
              </button>
            )}

            {/* BAS : Prénom + Âge en dessous à gauche & Boutons Évaluer, Question, Profil à droite */}
            <div className="relative z-20 p-5 sm:p-6 flex items-end justify-between pointer-events-auto mt-auto">
              <div className="text-left font-sans">
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none drop-shadow-md">
                  {videoModalMember.firstName || videoModalMember.name.split(' ')[0]}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1.5 font-medium drop-shadow">
                  {videoModalMember.age ? `${videoModalMember.age} ans` : '42 ans'}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2.5 sm:gap-3 shrink-0">
                {/* 1. Bouton Générique & Crédits (Clapperboard) */}
                <button
                  type="button"
                  id={`btn-credits-${videoModalMember.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCreditsModalOpen(true);
                  }}
                  className="w-10 h-10 rounded-full bg-black/50 hover:bg-[#A2482B] backdrop-blur-md border border-white/25 hover:border-[#A2482B] text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                  title="Générique & Crédits de la séquence"
                >
                  <Clapperboard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                {/* 2. Bouton Évaluer (Award en Terre Cuite) */}
                <button
                  type="button"
                  id={`btn-eval-resonance-${videoModalMember.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsResonanceModalOpen(true);
                  }}
                  className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 ${
                    personResonancePct !== null
                      ? 'bg-[#A2482B] border-[#A2482B] text-white shadow-[0_0_14px_rgba(162,72,43,0.5)]'
                      : 'bg-black/50 hover:bg-[#A2482B] border-white/25 hover:border-[#A2482B] text-white'
                  }`}
                  title={personResonancePct !== null ? `Résonance : ${personResonancePct}%` : "Évaluer la résonance"}
                >
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                {/* 2. Bouton Question à laquelle la personne a répondu (Livre ouvert) */}
                <button
                  type="button"
                  id={`btn-question-${videoModalMember.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsQuestionModalOpen(true);
                  }}
                  className="w-10 h-10 rounded-full bg-black/50 hover:bg-[#A2482B] backdrop-blur-md border border-white/25 hover:border-[#A2482B] text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                  title="Découvrir la question"
                >
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                {/* 3. Bouton Profil qui renvoie vers son profil */}
                <button
                  type="button"
                  id={`btn-profile-${videoModalMember.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    const targetId = videoModalMember.id;
                    setVideoModalMember(null);
                    onNavigateToPerson(targetId);
                  }}
                  className="w-10 h-10 rounded-full bg-black/50 hover:bg-[#A2482B] backdrop-blur-md border border-white/25 hover:border-[#A2482B] text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  title={`Voir le profil de ${videoModalMember.firstName || videoModalMember.name.split(' ')[0]}`}
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Volet d'évaluation de résonance */}
            <ResonanceModal
              isOpen={isResonanceModalOpen}
              onClose={() => setIsResonanceModalOpen(false)}
              storyId={`lineage-${videoModalMember.id}`}
              topicId={videoModalMember.universeTag || 'exploration'}
              personName={videoModalMember.firstName || videoModalMember.name.split(' ')[0]}
              initialPercentage={personResonancePct}
              onRatingSubmitted={(pct) => {
                setPersonResonancePct(pct);
              }}
            />

            {/* Volet modal des crédits & générique de la séquence */}
            <SequenceCreditsModal
              isOpen={isCreditsModalOpen}
              onClose={() => setIsCreditsModalOpen(false)}
              title={videoModalMember.name}
              seriesTitle="Lignée & Transmission"
              credits={getSeriesCredits(videoModalMember.seriesId || 'jesus-legba', videoModalMember.name)}
              onNavigateToProfile={(protagonistId) => {
                setIsCreditsModalOpen(false);
                setVideoModalMember(null);
                onNavigateToPerson(protagonistId);
              }}
            />

            {/* Modale Question à laquelle la personne a répondu */}
            {isQuestionModalOpen && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsQuestionModalOpen(false);
                }}
              >
                <div 
                  className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 text-center animate-in zoom-in-95 duration-200 pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setIsQuestionModalOpen(false)}
                    className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="w-12 h-12 rounded-full bg-[#C89B3C]/15 text-[#C89B3C] flex items-center justify-center mx-auto mb-4 border border-[#C89B3C]/30">
                    <BookOpen className="w-6 h-6" />
                  </div>

                  <h3 className="font-editorial text-base sm:text-lg font-bold text-[#1C1917] mb-2">
                    {videoModalMember.firstName || videoModalMember.name.split(' ')[0]} a répondu :
                  </h3>

                  <p className="font-sans text-xs sm:text-sm font-semibold text-stone-600 mb-4 px-2">
                    « {videoModalMember.questionAnswered?.question || "Quelle vision singulière ce parcours apporte-t-il au monde ?"} »
                  </p>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-left">
                    <p className="font-serif-editorial text-sm sm:text-base text-stone-800 leading-relaxed italic">
                      « {videoModalMember.questionAnswered?.answer || videoModalMember.quote || "Chaque être lié à la lignée nourrit la sève commune."} »
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
