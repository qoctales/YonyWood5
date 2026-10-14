import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Award, 
  BookOpen, 
  Check,
  ArrowRight
} from 'lucide-react';
import { Dimension, SousCategorie } from '../data/dimensionsData';
import { AffiliationPerson, ViewScreen } from '../types';
import { DimensionIcon } from './DimensionIcon';
import { ProfileSoloIcon } from './YonywoodBrandIcons';
import { ShareIcon } from './ShareIcon';
import { celestialAudio } from '../utils/celestialAudio';

interface SwipeModeHeritageProps {
  swipeStep: 1 | 2 | 3;
  setSwipeStep: (step: 1 | 2 | 3) => void;
  swipeDoorIndex: number;
  setSwipeDoorIndex: React.Dispatch<React.SetStateAction<number>>;
  swipeSubIndex: number;
  setSwipeSubIndex: React.Dispatch<React.SetStateAction<number>>;
  swipeSelectedSubcategory: SousCategorie | null;
  setSwipeSelectedSubcategory: (sub: SousCategorie | null) => void;
  swipePersonIndex: number;
  setSwipePersonIndex: React.Dispatch<React.SetStateAction<number>>;
  currentSwipeDoor: Dimension;
  swipeSubcategories: SousCategorie[];
  currentSubcategory: SousCategorie;
  swipeProtagonists: AffiliationPerson[];
  currentSwipePerson: AffiliationPerson | undefined;
  onNavigate: (screen: ViewScreen) => void;
  onOpenQuestionModal: (title: string, question: string) => void;
  onOpenResonanceModal: (person: AffiliationPerson) => void;
  personResonancePct: number | null;
  isShareCopied: boolean;
  onSharePerson: (person: AffiliationPerson) => void;
  handleNextSwipeDoor: () => void;
  handlePrevSwipeDoor: () => void;
  handleNextSwipeSub: () => void;
  handlePrevSwipeSub: () => void;
  handleNextSwipePerson: () => void;
  handlePrevSwipePerson: () => void;
}

const STOCK_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
];

export const SwipeModeHeritage: React.FC<SwipeModeHeritageProps> = ({
  swipeStep,
  setSwipeStep,
  swipeSubIndex,
  setSwipeSelectedSubcategory,
  swipePersonIndex,
  setSwipePersonIndex,
  currentSwipeDoor,
  swipeSubcategories,
  currentSubcategory,
  swipeProtagonists,
  currentSwipePerson,
  onNavigate,
  onOpenQuestionModal,
  onOpenResonanceModal,
  personResonancePct,
  isShareCopied,
  onSharePerson,
  handleNextSwipeDoor,
  handlePrevSwipeDoor,
  handleNextSwipeSub,
  handlePrevSwipeSub,
  handleNextSwipePerson,
  handlePrevSwipePerson
}) => {
  // Vidéo en mode swipe
  const [isPlayingStep1, setIsPlayingStep1] = useState<boolean>(false);
  const [isPlayingStep2, setIsPlayingStep2] = useState<boolean>(true);
  const [isPlayingStep3, setIsPlayingStep3] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Gestes tactiles pour swipe fluide
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  // Relance de la vidéo lors du changement de sous-catégorie (Étape 2) ou de personne (Étape 3)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if ((swipeStep === 2 && isPlayingStep2) || (swipeStep === 3 && isPlayingStep3)) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [swipePersonIndex, swipeSubIndex, swipeStep, isPlayingStep2, isPlayingStep3]);

  // Arrêt de la vidéo de l'étape 1 lors d'un changement de porte
  useEffect(() => {
    setIsPlayingStep1(false);
  }, [currentSwipeDoor.id]);

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Gestion des événements tactiles
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
    setTouchEndX(null);
    setTouchEndY(null);
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || touchStartX === null) return;
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    setTouchEndX(currentX);
    setTouchEndY(currentY);
    const diffX = currentX - touchStartX;
    setSwipeOffset(Math.max(-70, Math.min(70, diffX * 0.4)));
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setSwipeOffset(0);
    if (touchStartX === null || touchEndX === null) return;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY !== null && touchEndY !== null ? touchStartY - touchEndY : 0;

    // Détection d'un swipe horizontal franc
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        // Swipe gauche -> Suivant
        if (swipeStep === 1) handleNextSwipeDoor();
        else if (swipeStep === 2) handleNextSwipeSub();
        else if (swipeStep === 3) handleNextSwipePerson();
      } else {
        // Swipe droite -> Précédent
        if (swipeStep === 1) handlePrevSwipeDoor();
        else if (swipeStep === 2) handlePrevSwipeSub();
        else if (swipeStep === 3) handlePrevSwipePerson();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
    setTouchStartY(null);
    setTouchEndY(null);
  };

  return (
    <div 
      id="swipe-mode-container"
      className="relative w-full h-[calc(100dvh-55px)] sm:h-[calc(100dvh-70px)] pt-14 sm:pt-16 pb-20 sm:pb-24 flex flex-col items-center justify-center overflow-hidden z-20 select-none"
    >
      {/* ========================================================================= */}
      {/* ÉTAPE 1 : CHOISIR LA PORTE (CARTE VIDÉO 9:16 PURE, EXACTEMENT COMME STUDIO) */}
      {/* ========================================================================= */}
      {swipeStep === 1 && (
        <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0 px-3 sm:px-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="relative w-full flex-1 flex items-center justify-center min-h-0">
            {/* Flèche Porte Précédente */}
            <button
              id="swipe-prev-door-btn"
              onClick={handlePrevSwipeDoor}
              className="hidden sm:flex absolute left-4 lg:left-12 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-[#A2482B] text-stone-800 hover:text-white border border-stone-200 shadow-xl items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Porte précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* CARTE FORMAT VIDÉO VERTICAL 9:16 DE LA PORTE */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ transform: `translateX(${swipeOffset}px)` }}
              onClick={() => setIsPlayingStep1(prev => !prev)}
              className="group aspect-[9/16] w-[min(340px,calc((100dvh-200px)*9/16))] h-[min(604px,calc(100dvh-200px))] max-w-[calc(100vw-28px)] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between p-3 sm:p-4.5 relative select-none cursor-pointer shrink-0 transition-transform duration-100"
            >
              {/* Vidéo ou Image de couverture de la Porte */}
              {isPlayingStep1 ? (
                <video
                  ref={videoRef}
                  src={STOCK_VIDEOS[0]}
                  poster={currentSwipeDoor.coverImage}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              ) : (
                <img
                  src={currentSwipeDoor.coverImage}
                  alt={currentSwipeDoor.label}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}

              {/* Voile cinématographique clair (modèle Studio / Coproduction) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none" />

              {/* HAUT : Titre seul de la porte dans une pilule sobre (exactement comme la page Studio) */}
              <div className="relative z-20 flex items-center justify-between">
                <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold text-white shadow-sm tracking-wide">
                  <span>{currentSwipeDoor.label}</span>
                </div>

                {isPlayingStep1 && (
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-[#A2482B] text-white backdrop-blur-md border border-white/15 hover:border-[#A2482B] transition-colors cursor-pointer"
                    title={isMuted ? 'Activer le son' : 'Couper le son'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>

              {/* CENTRE : BOUTON PLAY/PAUSE */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlayingStep1(prev => !prev);
                  }}
                  className={`pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl backdrop-blur-md ${
                    isPlayingStep1
                      ? 'border border-white/40 ring-2 ring-white/20 bg-black/60'
                      : 'border border-white/25 hover:border-white bg-black/45 hover:bg-black/65 hover:scale-105 active:scale-95'
                  }`}
                  title={isPlayingStep1 ? 'Pause' : 'Lire la vidéo'}
                >
                  {isPlayingStep1 ? (
                    <Pause className="w-5 h-5 text-white fill-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white fill-white translate-x-0.5" />
                  )}
                </button>
              </div>

              {/* BAS : BOUTON PETIT & ÉPURÉ « Choisir cette porte » */}
              <div className="relative z-20 flex items-center justify-end pt-0.5">
                <button
                  id={`btn-choose-door-${currentSwipeDoor.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSwipeStep(2);
                    celestialAudio.playOrbSelect();
                  }}
                  className="h-7.5 sm:h-8.5 px-3.5 sm:px-4 rounded-full bg-black/60 hover:bg-[#A2482B] active:bg-[#8A3B22] text-white text-[11px] sm:text-xs font-bold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md border border-white/20 hover:border-[#A2482B] cursor-pointer active:scale-95 group/btn shrink-0"
                >
                  <span>Choisir cette porte</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/90 group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
                </button>
              </div>
            </div>

            {/* Flèche Porte Suivante */}
            <button
              id="swipe-next-door-btn"
              onClick={handleNextSwipeDoor}
              className="hidden sm:flex absolute right-4 lg:right-12 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-[#A2482B] text-stone-800 hover:text-white border border-stone-200 shadow-xl items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Porte suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ÉTAPE 2 : CHOISIR LA DIRECTION (CARTES VIDÉO 9:16 À SWIPER, EXACTEMENT COMME STUDIO) */}
      {/* ========================================================================= */}
      {swipeStep === 2 && currentSubcategory && (
        <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0 px-3 sm:px-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="relative w-full flex-1 flex items-center justify-center min-h-0">
            {/* Flèche Direction Précédente */}
            <button
              id="swipe-prev-sub-btn"
              onClick={handlePrevSwipeSub}
              className="hidden sm:flex absolute left-4 lg:left-12 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-[#A2482B] text-stone-800 hover:text-white border border-stone-200 shadow-xl items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Direction précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* CARTE FORMAT VIDÉO VERTICAL 9:16 DE LA DIRECTION */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ transform: `translateX(${swipeOffset}px)` }}
              onClick={() => setIsPlayingStep2(prev => !prev)}
              className="group aspect-[9/16] w-[min(340px,calc((100dvh-200px)*9/16))] h-[min(604px,calc(100dvh-200px))] max-w-[calc(100vw-28px)] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between p-3 sm:p-4.5 relative select-none cursor-pointer shrink-0 transition-transform duration-100"
            >
              {/* Image ou vidéo de fond de la Direction */}
              <img
                src={currentSubcategory.photoUrl || currentSwipeDoor.coverImage}
                alt={currentSubcategory.label}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              {isPlayingStep2 && (
                <video
                  ref={videoRef}
                  key={`sub-video-${currentSubcategory.slug}`}
                  src={STOCK_VIDEOS[swipeSubIndex % STOCK_VIDEOS.length]}
                  poster={currentSubcategory.photoUrl || currentSwipeDoor.coverImage}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}

              {/* Voile cinématographique */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/35 pointer-events-none" />

              {/* HAUT : Icône + Titre de la direction dans une pilule sobre */}
              <div className="relative z-20 flex items-center justify-between">
                <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold text-white shadow-sm tracking-wide flex items-center gap-1.5 max-w-[85%]">
                  <DimensionIcon 
                    name={currentSubcategory.icone} 
                    size={14} 
                    className="text-[#FFE7A3] shrink-0" 
                  />
                  <span className="truncate">{currentSubcategory.label}</span>
                </div>

                {isPlayingStep2 && (
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-[#A2482B] text-white backdrop-blur-md border border-white/15 hover:border-[#A2482B] transition-colors cursor-pointer shrink-0"
                    title={isMuted ? 'Activer le son' : 'Couper le son'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>

              {/* CENTRE : BOUTON PLAY/PAUSE */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlayingStep2(prev => !prev);
                  }}
                  className={`pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl backdrop-blur-md ${
                    isPlayingStep2
                      ? 'border border-white/40 ring-2 ring-white/20 bg-black/60'
                      : 'border border-white/25 hover:border-white bg-black/45 hover:bg-black/65 hover:scale-105 active:scale-95'
                  }`}
                  title={isPlayingStep2 ? 'Pause' : 'Lire la vidéo'}
                >
                  {isPlayingStep2 ? (
                    <Pause className="w-5 h-5 text-white fill-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white fill-white translate-x-0.5" />
                  )}
                </button>
              </div>

              {/* BAS : BOUTONS Question + « Choisir cette direction » */}
              <div className="relative z-20 flex items-center justify-between gap-1.5 pt-0.5">
                {/* Bouton Question */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenQuestionModal(
                      currentSubcategory.label,
                      currentSubcategory.question || currentSubcategory.tagline || currentSubcategory.description || "Quelle vision singulière ce parcours apporte-t-il au monde ?"
                    );
                  }}
                  className="h-7.5 sm:h-8.5 px-3.5 sm:px-4 rounded-full bg-black/60 hover:bg-[#A2482B] active:bg-[#8A3B22] text-white text-[11px] sm:text-xs font-semibold backdrop-blur-md transition-all flex items-center justify-center border border-white/20 hover:border-[#A2482B] cursor-pointer shadow-md active:scale-95 shrink-0"
                  title="Découvrir la question"
                >
                  <span>Question</span>
                </button>

                {/* Bouton Choisir cette direction */}
                <button
                  id={`btn-choose-direction-${currentSubcategory.slug}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSwipeSelectedSubcategory(currentSubcategory);
                    setSwipePersonIndex(0);
                    setSwipeStep(3);
                    celestialAudio.playOrbSelect();
                  }}
                  className="h-7.5 sm:h-8.5 px-3.5 sm:px-4 rounded-full bg-black/60 hover:bg-[#A2482B] active:bg-[#8A3B22] text-white text-[11px] sm:text-xs font-bold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md border border-white/20 hover:border-[#A2482B] cursor-pointer active:scale-95 group/btn shrink-0"
                >
                  <span>Choisir cette direction</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/90 group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
                </button>
              </div>
            </div>

            {/* Flèche Direction Suivante */}
            <button
              id="swipe-next-sub-btn"
              onClick={handleNextSwipeSub}
              className="hidden sm:flex absolute right-4 lg:right-12 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-[#A2482B] text-stone-800 hover:text-white border border-stone-200 shadow-xl items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Direction suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ÉTAPE 3 : CARTE DU PROTAGONISTE (JUSTE PRÉNOM ET ÂGE EN BAS)             */}
      {/* ========================================================================= */}
      {swipeStep === 3 && currentSwipePerson && (
        <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0 px-3 sm:px-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="relative w-full flex-1 flex items-center justify-center min-h-0">
            {/* Flèche Personne Précédente */}
            <button
              id="swipe-prev-person-btn"
              onClick={handlePrevSwipePerson}
              className="hidden sm:flex absolute left-4 lg:left-12 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-[#A2482B] text-stone-800 hover:text-white border border-stone-200 shadow-xl items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Protagoniste précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* CARTE FORMAT VIDÉO VERTICAL 9:16 DU PROTAGONISTE */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ transform: `translateX(${swipeOffset}px)` }}
              onClick={() => {
                if (!videoRef.current) return;
                if (isPlayingStep3) {
                  videoRef.current.pause();
                  setIsPlayingStep3(false);
                } else {
                  videoRef.current.play().then(() => setIsPlayingStep3(true)).catch(() => {});
                }
              }}
              className="group aspect-[9/16] w-[min(340px,calc((100dvh-200px)*9/16))] h-[min(604px,calc(100dvh-200px))] max-w-[calc(100vw-28px)] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between p-3.5 sm:p-4.5 relative select-none cursor-pointer shrink-0 transition-transform duration-100"
            >
              {/* Vidéo du protagoniste */}
              <img
                src={currentSwipePerson.photoUrl}
                alt={currentSwipePerson.name}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <video
                ref={videoRef}
                key={`swipe-video-${currentSwipePerson.id}`}
                src={currentSwipePerson.teaserVideoUrl || STOCK_VIDEOS[0]}
                poster={currentSwipePerson.photoUrl}
                playsInline
                autoPlay
                loop
                muted={isMuted}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Gradient pour contraste cinématographique */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85 pointer-events-none" />

              {/* HAUT : Badge Direction + Bouton Son */}
              <div className="relative z-20 flex items-center justify-between pointer-events-auto">
                <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white font-medium shadow-md flex items-center gap-1.5 max-w-[80%]">
                  <DimensionIcon 
                    name={currentSubcategory?.icone || '01-sagesses/_dimension'} 
                    size={13} 
                    className="text-[#FFE7A3] shrink-0" 
                  />
                  <span className="truncate">{currentSubcategory?.label}</span>
                </div>

                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-black/45 hover:bg-[#A2482B] backdrop-blur-md border border-white/20 text-white flex items-center justify-center cursor-pointer transition-colors shadow-md"
                  title={isMuted ? 'Activer le son' : 'Couper le son'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* CENTRE : BOUTON PLAY/PAUSE */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <button
                  type="button"
                  id="btn-swipe-play-pause"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!videoRef.current) return;
                    if (isPlayingStep3) {
                      videoRef.current.pause();
                      setIsPlayingStep3(false);
                    } else {
                      videoRef.current.play().then(() => setIsPlayingStep3(true)).catch(() => {});
                    }
                  }}
                  className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur-xs border border-white/25 text-white flex items-center justify-center transition-all duration-200 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
                  title={isPlayingStep3 ? 'Mettre en pause' : 'Lire la vidéo'}
                >
                  {isPlayingStep3 ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white translate-x-0.5 opacity-95" />
                  )}
                </button>
              </div>

              {/* CÔTÉ DROIT : ICÔNES D'ACTION VERTICALES (Résonance, Question, Profil, Partage) */}
              <div 
                className="absolute right-3 sm:right-4 top-[64%] -translate-y-1/2 z-30 flex flex-col items-center gap-2.5 sm:gap-3 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 1. Résonance */}
                <button
                  id={`swipe-btn-resonance-${currentSwipePerson.id}`}
                  onClick={() => onOpenResonanceModal(currentSwipePerson)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl backdrop-blur-md border flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95 ${
                    personResonancePct !== null
                      ? 'bg-[#A2482B] border-[#A2482B] text-white shadow-[0_0_14px_rgba(162,72,43,0.5)]'
                      : 'bg-black/45 hover:bg-[#A2482B] border-white/20 hover:border-[#A2482B] text-white'
                  }`}
                  title={personResonancePct !== null ? `Résonance : ${personResonancePct}%` : "Évaluer la résonance"}
                >
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                {/* 2. Question existentielle */}
                <button
                  id={`swipe-btn-question-${currentSwipePerson.id}`}
                  onClick={() => {
                    const qText = currentSubcategory?.question || 
                      (currentSwipePerson as any).question || 
                      currentSwipePerson.teaserPitch || 
                      "Quelle vision singulière ce parcours apporte-t-il au monde ?";
                    onOpenQuestionModal(currentSubcategory?.label || currentSwipePerson.name, qText);
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/45 hover:bg-[#A2482B] backdrop-blur-md border border-white/20 hover:border-[#A2482B] text-white flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  title="Découvrir la question"
                >
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                {/* 3. Découvrir son univers complet */}
                <button
                  id={`swipe-btn-universe-${currentSwipePerson.id}`}
                  onClick={() => onNavigate({ type: 'protagonist_profile', protagonistId: currentSwipePerson.id })}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/45 hover:bg-[#A2482B] backdrop-blur-md border border-white/20 hover:border-[#A2482B] text-white flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  title="Découvrir son profil complet"
                >
                  <ProfileSoloIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                {/* 4. Bouton Partager */}
                <button
                  id={`swipe-btn-share-${currentSwipePerson.id}`}
                  onClick={() => onSharePerson(currentSwipePerson)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl backdrop-blur-md border flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95 ${
                    isShareCopied 
                      ? 'bg-emerald-700/85 border-emerald-600 text-white' 
                      : 'bg-black/45 hover:bg-[#A2482B] border-white/20 hover:border-[#A2482B] text-white'
                  }`}
                  title={isShareCopied ? "Lien copié !" : "Partager"}
                >
                  {isShareCopied ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <ShareIcon className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>

              {/* BAS : JUSTE LE PRÉNOM ET L'ÂGE (STRICTEMENT COMME SUR LES AUTRES CARTES DU SITE) */}
              <div 
                className="relative z-20 flex flex-col pointer-events-auto cursor-pointer group/title"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate({ type: 'protagonist_profile', protagonistId: currentSwipePerson.id });
                }}
              >
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none drop-shadow-md group-hover/title:text-[#FFE7A3] transition-colors">
                  {currentSwipePerson.firstName || currentSwipePerson.name.split(' ')[0]}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 font-medium drop-shadow flex items-center gap-1.5">
                  <span>{currentSwipePerson.age ? `${currentSwipePerson.age} ans` : '46 ans'}</span>
                </p>
              </div>
            </div>

            {/* Flèche Personne Suivante */}
            <button
              id="swipe-next-person-btn"
              onClick={handleNextSwipePerson}
              className="hidden sm:flex absolute right-4 lg:right-12 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-[#A2482B] text-stone-800 hover:text-white border border-stone-200 shadow-xl items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Protagoniste suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
