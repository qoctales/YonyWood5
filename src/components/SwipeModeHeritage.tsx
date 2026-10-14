import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Compass, 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Award, 
  BookOpen, 
  Check 
} from 'lucide-react';
import { Dimension, SousCategorie, DIMENSIONS } from '../data/dimensionsData';
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
  swipeSelectedSubcategory: SousCategorie | null;
  setSwipeSelectedSubcategory: (sub: SousCategorie | null) => void;
  swipePersonIndex: number;
  setSwipePersonIndex: React.Dispatch<React.SetStateAction<number>>;
  currentSwipeDoor: Dimension;
  swipeSubcategories: SousCategorie[];
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
  handleNextSwipePerson: () => void;
  handlePrevSwipePerson: () => void;
}

export const SwipeModeHeritage: React.FC<SwipeModeHeritageProps> = ({
  swipeStep,
  setSwipeStep,
  swipeDoorIndex,
  setSwipeDoorIndex,
  swipeSelectedSubcategory,
  setSwipeSelectedSubcategory,
  swipePersonIndex,
  setSwipePersonIndex,
  currentSwipeDoor,
  swipeSubcategories,
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
  handleNextSwipePerson,
  handlePrevSwipePerson
}) => {
  // Vidéo en mode swipe
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Gestes tactiles pour swipe fluide
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  // Relance de la vidéo lors du changement de personne
  useEffect(() => {
    if (swipeStep === 3 && videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [swipePersonIndex, swipeStep]);

  const togglePlayback = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

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
    setSwipeOffset(Math.max(-60, Math.min(60, diffX)));
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setSwipeOffset(0);
    if (touchStartX === null || touchEndX === null) return;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY !== null && touchEndY !== null ? touchStartY - touchEndY : 0;

    // Détection d'un swipe horizontal franc
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        // Swipe vers la gauche -> Suivant
        if (swipeStep === 1) handleNextSwipeDoor();
        else if (swipeStep === 3) handleNextSwipePerson();
      } else {
        // Swipe vers la droite -> Précédent
        if (swipeStep === 1) handlePrevSwipeDoor();
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
      {/* ÉTAPE 1 : LES 8 PORTES D'ENTRÉE (CARTES VIDÉO 9:16)                       */}
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
              className="aspect-[9/16] w-[min(340px,calc((100dvh-200px)*9/16))] h-[min(604px,calc(100dvh-200px))] max-w-[calc(100vw-28px)] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between p-3.5 sm:p-5 relative select-none cursor-grab active:cursor-grabbing shrink-0 transition-transform duration-100"
            >
              {/* Image de fond de la Porte */}
              <img
                src={currentSwipeDoor.coverImage}
                alt={currentSwipeDoor.label}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Voile sombre pour lisibilité cinématographique */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/90 pointer-events-none" />

              {/* HAUT : Badge officiel Porte */}
              <div className="relative z-20 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-md">
                  <DimensionIcon 
                    name={currentSwipeDoor.icone} 
                    size={14} 
                    className="text-[#FFE7A3]" 
                  />
                  <span>{currentSwipeDoor.shortLabel}</span>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold text-white/90 border border-white/20">
                  {`0${swipeDoorIndex + 1} / 08`}
                </div>
              </div>

              {/* CENTRE : Icône de la Porte dans un médaillon doré céleste */}
              <div className="relative z-20 flex flex-col items-center justify-center my-auto">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-black/50 backdrop-blur-md border border-[#C89B3C]/80 shadow-[0_0_30px_rgba(200,155,60,0.35)] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 group">
                  <DimensionIcon 
                    name={currentSwipeDoor.icone} 
                    size={42} 
                    className="text-[#FFE7A3] drop-shadow-md group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <div className="mt-3 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-[11px] font-medium text-stone-200 flex items-center gap-1.5 shadow-sm">
                  <Play className="w-3 h-3 fill-white text-white translate-x-0.5" />
                  <span>Porte d'exploration</span>
                </div>
              </div>

              {/* BAS : Titre + Tagline + Bouton "Choisir cette porte" */}
              <div className="relative z-20 flex flex-col gap-2">
                <div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white drop-shadow-md leading-tight">
                    {currentSwipeDoor.label}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 mt-1 drop-shadow-sm font-light">
                    {currentSwipeDoor.tagline}
                  </p>
                </div>

                {/* Bouton d'action proéminent : Choisir cette porte */}
                <button
                  id={`btn-choose-door-${currentSwipeDoor.id}`}
                  onClick={() => {
                    setSwipeStep(2);
                    celestialAudio.playOrbSelect();
                  }}
                  className="w-full mt-1.5 py-3 px-4 rounded-xl bg-[#A2482B] hover:bg-[#8B3B20] text-white font-semibold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border border-[#C85A3B]"
                >
                  <span>Choisir cette porte</span>
                  <ChevronRight className="w-4 h-4" />
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

          {/* Indicateur de pagination (8 points) */}
          <div className="flex items-center gap-1.5 mt-3 sm:mt-4 z-20">
            {DIMENSIONS.map((d, idx) => (
              <button
                key={d.id}
                onClick={() => {
                  setSwipeDoorIndex(idx);
                  celestialAudio.playOrbSelect();
                }}
                className={`transition-all rounded-full cursor-pointer ${
                  swipeDoorIndex === idx
                    ? 'w-6 h-2 bg-[#A2482B]'
                    : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                }`}
                title={`Aller à ${d.label}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ÉTAPE 2 : CHOIX DE LA DIRECTION (8 DIRECTIONS DE LA PORTE SÉLECTIONNÉE)   */}
      {/* ========================================================================= */}
      {swipeStep === 2 && (
        <div className="flex-1 w-full max-w-2xl flex flex-col min-h-0 px-3 sm:px-6 py-2 animate-in fade-in duration-200">
          
          {/* En-tête de sélection de la direction */}
          <div className="text-center mb-3 sm:mb-4 shrink-0">
            <span className="text-[11px] sm:text-xs font-bold text-[#A2482B] uppercase tracking-wider flex items-center justify-center gap-1.5">
              <DimensionIcon name={currentSwipeDoor.icone} size={13} className="text-[#A2482B]" />
              <span>{currentSwipeDoor.label}</span>
            </span>
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#1C1917] mt-0.5">
              Choisissez une direction
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Sélectionnez une thématique pour faire défiler les voix et visages
            </p>
          </div>

          {/* Grille aérée des 8 directions */}
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pr-1 pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {swipeSubcategories.map((sub) => (
                <div
                  key={sub.id}
                  id={`swipe-direction-${sub.slug}`}
                  onClick={() => {
                    setSwipeSelectedSubcategory(sub);
                    setSwipePersonIndex(0);
                    setSwipeStep(3);
                    celestialAudio.playOrbSelect();
                  }}
                  className="group relative bg-white hover:bg-stone-50 border border-stone-200 hover:border-[#A2482B] rounded-2xl p-3 sm:p-3.5 shadow-xs hover:shadow-md cursor-pointer transition-all active:scale-98 flex items-start gap-3 select-none"
                >
                  {/* Vignette ou Icône officielle */}
                  {sub.photoUrl ? (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200 shadow-xs relative">
                      <img 
                        src={sub.photoUrl} 
                        alt={sub.label} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <DimensionIcon name={sub.icone} size={16} className="text-white drop-shadow-md" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-stone-100 group-hover:bg-[#A2482B]/10 border border-stone-200 group-hover:border-[#A2482B]/30 flex items-center justify-center shrink-0 transition-colors">
                      <DimensionIcon 
                        name={sub.icone} 
                        size={22} 
                        className="text-[#A2482B] group-hover:scale-110 transition-transform duration-200" 
                      />
                    </div>
                  )}

                  {/* Contenu textuel */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-semibold text-xs sm:text-sm text-[#1C1917] group-hover:text-[#A2482B] truncate transition-colors">
                        {sub.label}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#A2482B] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>

                    <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5 leading-relaxed">
                      {sub.question ? `« ${sub.question} »` : (sub.tagline || sub.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ÉTAPE 3 : SWIPE DÉFILANT DES PROTAGONISTES (FORMAT VIDÉO 9:16)             */}
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
              onClick={togglePlayback}
              className="group aspect-[9/16] w-[min(340px,calc((100dvh-200px)*9/16))] h-[min(604px,calc(100dvh-200px))] max-w-[calc(100vw-28px)] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between p-3.5 sm:p-4.5 relative select-none cursor-pointer shrink-0 transition-transform duration-100"
            >
              {/* Vidéo ou Poster */}
              <img
                src={currentSwipePerson.photoUrl}
                alt={currentSwipePerson.name}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <video
                ref={videoRef}
                key={`swipe-video-${currentSwipePerson.id}`}
                src={currentSwipePerson.teaserVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                poster={currentSwipePerson.photoUrl}
                playsInline
                autoPlay
                loop
                muted={isMuted}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Gradient pour contraste cinématographique */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

              {/* CENTRE : Icône de Play / Pause */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <button
                  type="button"
                  id="btn-swipe-play-pause"
                  onClick={togglePlayback}
                  className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur-xs border border-white/25 text-white flex items-center justify-center transition-all duration-200 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
                  title={isPlaying ? 'Mettre en pause' : 'Lire la vidéo'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
                  ) : (
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white translate-x-0.5 opacity-95" />
                  )}
                </button>
              </div>

              {/* HAUT : Badge Direction + Compteur + Bouton Son */}
              <div className="relative z-20 flex items-center justify-between pointer-events-auto">
                <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white font-medium shadow-md flex items-center gap-1.5 max-w-[65%]">
                  <DimensionIcon 
                    name={swipeSelectedSubcategory?.icone || '01-sagesses/_dimension'} 
                    size={13} 
                    className="text-[#FFE7A3] shrink-0" 
                  />
                  <span className="truncate">{swipeSelectedSubcategory?.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-white/80 bg-black/50 px-2 py-0.5 rounded-full border border-white/10">
                    {`${swipePersonIndex + 1} / ${swipeProtagonists.length || 16}`}
                  </span>
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-black/45 hover:bg-[#A2482B] backdrop-blur-md border border-white/20 text-white flex items-center justify-center cursor-pointer transition-colors shadow-md"
                    title={isMuted ? 'Activer le son' : 'Couper le son'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* CÔTÉ DROIT : Icônes d'action verticales YonyWood (Résonance, Question, Profil, Partage) */}
              <div 
                className="absolute right-3.5 sm:right-4.5 top-[62%] -translate-y-1/2 z-30 flex flex-col items-center gap-2.5 sm:gap-3 pointer-events-auto"
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
                    const qText = swipeSelectedSubcategory?.question || 
                      (currentSwipePerson as any).question || 
                      currentSwipePerson.teaserPitch || 
                      "Quelle vision singulière ce parcours apporte-t-il au monde ?";
                    onOpenQuestionModal(swipeSelectedSubcategory?.label || currentSwipePerson.name, qText);
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
                  title="Découvrir son univers complet"
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

              {/* BAS : Identité du protagoniste + citation */}
              <div 
                className="relative z-20 flex flex-col gap-1 pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate({ type: 'protagonist_profile', protagonistId: currentSwipePerson.id });
                }}
              >
                <div className="cursor-pointer group/title hover:opacity-95">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none drop-shadow-md group-hover/title:text-[#FFE7A3] transition-colors">
                    {currentSwipePerson.firstName || currentSwipePerson.name.split(' ')[0]}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 font-medium drop-shadow flex items-center gap-1.5">
                    <span>{currentSwipePerson.flag} {currentSwipePerson.territory || currentSwipePerson.country}</span>
                    <span>·</span>
                    <span>{currentSwipePerson.age ? `${currentSwipePerson.age} ans` : '42 ans'}</span>
                  </p>
                </div>

                <div className="text-[11px] font-semibold text-[#FFE7A3] mt-0.5 drop-shadow">
                  {currentSwipePerson.badge || currentSwipePerson.role}
                </div>

                <p className="text-xs text-stone-200 line-clamp-2 mt-1 italic font-serif leading-relaxed drop-shadow">
                  « {currentSwipePerson.teaserPitch || currentSwipePerson.invitationStory} »
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

          {/* Indicateur de position (mini carrousel de points) */}
          <div className="flex items-center gap-1 mt-3 sm:mt-4 z-20 max-w-[80vw] overflow-x-auto no-scrollbar py-1">
            {swipeProtagonists.slice(0, 16).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSwipePersonIndex(idx);
                  celestialAudio.playOrbSelect();
                }}
                className={`transition-all rounded-full cursor-pointer shrink-0 ${
                  swipePersonIndex === idx
                    ? 'w-5 h-1.5 bg-[#A2482B]'
                    : 'w-1.5 h-1.5 bg-stone-300 hover:bg-stone-400'
                }`}
                title={`Voix ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
