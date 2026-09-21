import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft, 
  ChevronRight, 
  Tv, 
  Shuffle, 
  User, 
  EyeOff,
  RotateCcw,
  Sparkles,
  Columns,
  Square
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { DUOS, DOCUMENTARIES } from '../data/mockData';
import { ViewScreen, Duo, Protagonist } from '../types';
import { RemoteControlModal } from './RemoteControlModal';
import { ProtagonistTeaserModal } from './ProtagonistTeaserModal';

interface DuoFeedScreenProps {
  onNavigate: (screen: ViewScreen) => void;
  initialDocId?: string;
  initialDuoId?: string;
  initialDuoIndex?: number;
  allowedSeriesIds?: string[];
}

export const DuoFeedScreen: React.FC<DuoFeedScreenProps> = ({
  onNavigate,
  initialDocId,
  initialDuoId,
  initialDuoIndex = 0,
  allowedSeriesIds
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string | null>(initialDocId || null);
  const [isRemoteOpen, setIsRemoteOpen] = useState(false);
  const [teaserProtagonist, setTeaserProtagonist] = useState<Protagonist | null>(null);

  // Compute starting duo index if initialDuoId is provided
  const startingIndex = initialDuoId
    ? Math.max(0, DUOS.findIndex(d => d.id === initialDuoId))
    : initialDuoIndex;

  const [currentIndex, setCurrentIndex] = useState(startingIndex);
  const [isQuestionRevealed, setIsQuestionRevealed] = useState(false);
  
  // Mobile active protagonist: 'A' or 'B' (tap story toggle like Bumble)
  const [activeProtagonist, setActiveProtagonist] = useState<'A' | 'B'>('A');

  // Inline video playback states: videos stay vertical side-by-side without entering fullscreen immersion
  const [isPlayingA, setIsPlayingA] = useState(false);
  const [isPlayingB, setIsPlayingB] = useState(false);
  const [isMutedA, setIsMutedA] = useState(false);
  const [isMutedB, setIsMutedB] = useState(false);

  const videoRefA = useRef<HTMLVideoElement | null>(null);
  const videoRefB = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

  // Desktop view mode: 'mirror' (face-to-face 2 cards) | 'deck' (Bumble solo card deck)
  const [desktopViewMode, setDesktopViewMode] = useState<'mirror' | 'deck'>('mirror');

  // Swipe direction animation track: 'next' | 'prev' | null
  const [swipeDirection, setSwipeDirection] = useState<'next' | 'prev' | null>(null);

  // Motion values for permanent drag / swipe physics
  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-300, 0, 300], [-8, 0, 8]);
  const dragScale = useTransform(dragX, [-300, 0, 300], [0.97, 1, 0.97]);
  const isDraggingRef = useRef(false);

  // Dynamic feedback stamps
  // Dragging right (dragX > 0) -> "REVENIR / PRÉCÉDENT"
  const stampPrevOpacity = useTransform(dragX, [20, 90], [0, 1]);
  // Dragging left (dragX < 0) -> "SUIVANT"
  const stampNextOpacity = useTransform(dragX, [-20, -90], [0, 1]);

  // Filter duos based on user's profile series filter AND active series selector
  const baseFilteredDuos = allowedSeriesIds && allowedSeriesIds.length > 0
    ? DUOS.filter(d => allowedSeriesIds.includes(d.documentaryId))
    : DUOS;

  const filteredDuos = selectedDocId
    ? baseFilteredDuos.filter(d => d.documentaryId === selectedDocId)
    : baseFilteredDuos;

  const safeIndex = filteredDuos.length > 0 ? (currentIndex % filteredDuos.length) : 0;
  const currentDuo: Duo | undefined = filteredDuos[safeIndex];

  const activeDoc = selectedDocId 
    ? DOCUMENTARIES.find(d => d.id === selectedDocId) 
    : (currentDuo ? DOCUMENTARIES.find(d => d.id === currentDuo.documentaryId) : undefined);

  // Reset playback on duo change or series switch
  useEffect(() => {
    setIsPlayingA(false);
    setIsPlayingB(false);
  }, [currentIndex, selectedDocId]);

  const togglePlayA = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlayingA(prev => {
      const next = !prev;
      if (next) setIsPlayingB(false);
      return next;
    });
  };

  const togglePlayB = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlayingB(prev => {
      const next = !prev;
      if (next) setIsPlayingA(false);
      return next;
    });
  };

  const toggleMobilePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeProtagonist === 'A') {
      togglePlayA();
    } else {
      togglePlayB();
    }
  };

  // Handlers for next / prev with direction tracking
  const handleNext = () => {
    dragX.set(0);
    setSwipeDirection('next');
    setIsQuestionRevealed(false);
    setActiveProtagonist('A');
    setIsPlayingA(false);
    setIsPlayingB(false);
    setCurrentIndex(prev => (prev + 1) % filteredDuos.length);
  };

  const handlePrev = () => {
    dragX.set(0);
    setSwipeDirection('prev');
    setIsQuestionRevealed(false);
    setActiveProtagonist('A');
    setIsPlayingA(false);
    setIsPlayingB(false);
    setCurrentIndex(prev => (prev - 1 + filteredDuos.length) % filteredDuos.length);
  };

  const handleShuffle = () => {
    if (filteredDuos.length <= 1) return;
    dragX.set(0);
    setSwipeDirection('next');
    setIsQuestionRevealed(false);
    setActiveProtagonist('A');
    setIsPlayingA(false);
    setIsPlayingB(false);
    let nextIdx = Math.floor(Math.random() * filteredDuos.length);
    if (nextIdx === safeIndex) {
      nextIdx = (nextIdx + 1) % filteredDuos.length;
    }
    setCurrentIndex(nextIdx);
  };

  // Keyboard navigation for desktop / laptop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        // Toggle protagonist
        setActiveProtagonist(prev => prev === 'A' ? 'B' : 'A');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredDuos.length]);

  if (!currentDuo) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white text-[#1C1917]">
        <p className="font-editorial text-2xl font-bold">Aucun duo dans cette sélection.</p>
        <button 
          onClick={() => setSelectedDocId(null)}
          className="mt-4 px-6 py-2.5 rounded-full bg-[#1C1917] text-white font-medium text-xs shadow-md hover:bg-stone-800 transition-colors"
        >
          Afficher tous les duos
        </button>
      </div>
    );
  }

  const pA = currentDuo.protagonistA;
  const pB = currentDuo.protagonistB;

  // Active protagonist for Bumble solo card mode
  const currentP = activeProtagonist === 'A' ? pA : pB;
  const currentStory = activeProtagonist === 'A' ? currentDuo.storyA : currentDuo.storyB;

  // Format title part to capitalize only the first letter (e.g. "Jésus", "Èṣù", "Finagnon", "Qosqorico")
  const formatTitlePart = (raw?: string) => {
    if (!raw) return '';
    const trimmed = raw.trim();
    if (!trimmed) return '';
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  // Derive the 2 thematic terms for this duo
  const themeA = formatTitlePart(pA.universeTag || (activeDoc ? activeDoc.universes[0]?.name : 'Pôle A'));
  const themeB = formatTitlePart(pB.universeTag || (activeDoc ? activeDoc.universes[1]?.name : 'Pôle B'));
  const currentTheme = activeProtagonist === 'A' ? themeA : themeB;

  // Clean quotes helper: strips leading and trailing quotes (« », ", ') and extra spaces
  const cleanQuotes = (str?: string) => {
    if (!str) return '';
    return str
      .replace(/^[«"'\s]+|[»"'\s]+$/g, '')
      .trim();
  };

  // Video URLs for inline playback (keeping the 2 cards vertical side-by-side)
  const videoUrlA = pA.videoAvatarUrl 
    || DOCUMENTARIES.find(d => d.id === currentDuo.documentaryId)?.teaserVideoUrl 
    || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  const videoUrlB = pB.videoAvatarUrl 
    || DOCUMENTARIES.find(d => d.id === currentDuo.documentaryId)?.teaserVideoUrl 
    || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';

  const currentVideoUrl = activeProtagonist === 'A' ? videoUrlA : videoUrlB;
  const isMobilePlaying = activeProtagonist === 'A' ? isPlayingA : isPlayingB;
  const isMobileMuted = activeProtagonist === 'A' ? isMutedA : isMutedB;

  return (
    <div className="min-h-[100dvh] pb-28 pt-2 pt-safe pb-safe px-3 sm:px-6 max-w-6xl mx-auto flex flex-col justify-between select-none">
      
      {/* ========================================================================= */}
      {/* 1. BARRE SUPÉRIEURE ÉPURÉE (SÉLECTEUR TÉLÉCOMMANDE + TITRE SÉRIE + SHUFFLE) */}
      {/* ========================================================================= */}
      <div className="relative flex items-center justify-between py-2 border-b border-stone-200/80 mb-3">
        
        {/* Télécommande / Séries */}
        <div className="flex items-center gap-1.5 z-10">
          <button
            onClick={() => setIsRemoteOpen(true)}
            id="open-series-choice-btn"
            title="Changer de série ou voir toutes les séries"
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 hover:border-stone-400 transition-all shadow-xs cursor-pointer"
          >
            <Tv className="w-3.5 h-3.5 text-[#C89B3C] group-hover:scale-110 transition-transform" />
            <span className="font-sans text-xs sm:text-sm font-semibold text-[#1C1917]">
              {selectedDocId 
                ? (activeDoc?.title || currentDuo.documentaryTitle)
                : 'Toutes les séries'
              }
            </span>
            {selectedDocId && (
              <span className="w-2 h-2 rounded-full bg-[#C89B3C] animate-pulse" title="Filtre actif" />
            )}
          </button>

          {selectedDocId && (
            <button
              onClick={() => {
                setSelectedDocId(null);
                setCurrentIndex(0);
              }}
              title="Revenir à toutes les séries (flux aléatoire)"
              className="p-1 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 text-xs transition-colors cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Titre Face-à-Face centré : Pilule Terre Cuite avec typographie et symboles blancs */}
        <div className="flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center pointer-events-none z-10 max-w-[55%] sm:max-w-none">
          {(() => {
            const title = currentDuo.documentaryTitle || '';
            const parts = title.includes('< >') ? title.split('< >') : title.includes('<>') ? title.split('<>') : null;
            return parts ? (
              <div 
                key={`duo-series-${currentDuo.id}-${title}`}
                className="pointer-events-auto inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#A2482B] border border-[#8A3B22] shadow-sm shadow-[#A2482B]/25 text-xs sm:text-sm animate-in fade-in zoom-in-95 duration-200 text-white truncate"
              >
                <span className="font-sans font-bold text-white tracking-tight truncate">{parts[0].trim()}</span>
                <span 
                  className="inline-flex items-center gap-0.5 font-mono text-xs font-black text-white px-0.5 sm:px-1 select-none tracking-wider shrink-0"
                  title="Symbole face à face"
                >
                  &lt; &gt;
                </span>
                <span className="font-sans font-bold text-white tracking-tight truncate">{parts[1].trim()}</span>
              </div>
            ) : null;
          })()}
        </div>

        {/* Contrôles droits : commutateur mode desktop (Miroir / Deck) + Shuffle */}
        <div className="flex items-center gap-2 z-10">
          
          {/* Commutateur mode : Miroir (les 2 vidéos face-à-face) / Deck (Carte immersive) */}
          <div className="flex items-center bg-stone-100 p-0.5 rounded-full border border-stone-200">
            <button
              onClick={() => setDesktopViewMode('mirror')}
              title="Vue Miroir (Duo Face-à-face, 2 vidéos)"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                desktopViewMode === 'mirror'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDesktopViewMode('deck')}
              title="Vue Deck (Carte unique)"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                desktopViewMode === 'deck'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Shuffle */}
          <button
            onClick={handleShuffle}
            title="Duo aléatoire"
            className="p-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 hover:text-stone-900 transition-colors shadow-xs cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ZONE PRINCIPALE DE SWIPE PERMANENT (WEB, TABLETTE, MOBILE)            */}
      {/* Glisser à droite = Revenir au duo précédent | Glisser à gauche = Suivant  */}
      {/* ========================================================================= */}
      <div className="relative my-auto flex items-center justify-center py-2 sm:py-4">
        
        {/* Flèche Gauche Desktop / Tablette (Click pour revenir en arrière) */}
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute -left-4 lg:-left-12 z-30 w-12 h-12 rounded-full bg-white hover:bg-[#1C1917] text-stone-800 hover:text-white border border-stone-200 shadow-xl items-center justify-center transition-all cursor-pointer transform hover:scale-110 active:scale-95 group"
          title="Duo précédent (Glisser à droite)"
          id="prev-duo-arrow-btn"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Flèche Droite Desktop / Tablette (Click pour avancer) */}
        <button
          onClick={handleNext}
          className="hidden md:flex absolute -right-4 lg:-right-12 z-30 w-12 h-12 rounded-full bg-white hover:bg-[#1C1917] text-stone-800 hover:text-white border border-stone-200 shadow-xl items-center justify-center transition-all cursor-pointer transform hover:scale-110 active:scale-95 group"
          title="Duo suivant (Glisser à gauche)"
          id="next-duo-arrow-btn"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Conteneur Draggable avec Motion (Permanent Swipe) */}
        <div className="w-full flex justify-center items-center relative overflow-visible">
          
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`duo-${currentDuo.id}-${safeIndex}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.75}
              style={{ x: dragX, rotate: dragRotate, scale: dragScale }}
              onDragStart={() => {
                isDraggingRef.current = true;
              }}
              onDragEnd={(e, info) => {
                const swipeThreshold = 60;
                const velocityThreshold = 400;

                // Glisser à droite (x positif) -> Revenir au précédent
                if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                  handlePrev();
                } 
                // Glisser à gauche (x négatif) -> Avancer au suivant
                else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                  handleNext();
                }
                setTimeout(() => {
                  isDraggingRef.current = false;
                }, 80);
              }}
              initial={{ 
                opacity: 0,
              }}
              animate={{ 
                opacity: 1,
              }}
              exit={{ 
                opacity: 0,
              }}
              transition={{ duration: 0.32, ease: 'easeInOut' }}
              className="cursor-grab active:cursor-grabbing w-full max-w-4xl relative"
            >
              
              {/* Dynamic Swipe Stamps (Bumble Feedback) */}
              {/* Tampon Gauche : glissé vers la droite -> REVENIR */}
              <motion.div
                style={{ opacity: stampPrevOpacity }}
                className="absolute top-6 left-6 z-40 pointer-events-none transform -rotate-12 bg-emerald-600/90 text-white font-sans font-black text-xs sm:text-sm px-4 py-1.5 rounded-xl border-2 border-white shadow-2xl tracking-wider uppercase backdrop-blur-md"
              >
                ← Revenir
              </motion.div>

              {/* Tampon Droit : glissé vers la gauche -> SUIVANT */}
              <motion.div
                style={{ opacity: stampNextOpacity }}
                className="absolute top-6 right-6 z-40 pointer-events-none transform rotate-12 bg-[#C89B3C]/95 text-white font-sans font-black text-xs sm:text-sm px-4 py-1.5 rounded-xl border-2 border-white shadow-2xl tracking-wider uppercase backdrop-blur-md"
              >
                Suivant →
              </motion.div>


              {/* ========================================================================= */}
              {/* MODE DECK (CARTE UNIQUE FORMAT 9:16 RIGISIEUSEMENT IDENTIQUE AU MIROIR)  */}
              {/* ========================================================================= */}
              {desktopViewMode === 'deck' && (
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-[364px] flex justify-center">
                    <div 
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest('button, a, input, textarea')) return;
                        if (isDraggingRef.current) return;
                        toggleMobilePlay();
                      }}
                      className="relative w-full rounded-[28px] overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 aspect-[9/16] flex flex-col justify-between cursor-pointer"
                    >
                      
                      {/* Background Video (when playing) or Poster Image */}
                      {isMobilePlaying ? (
                        <video
                          ref={mobileVideoRef}
                          key={`mobile-video-${activeProtagonist}-${currentDuo.id}`}
                          src={currentVideoUrl}
                          autoPlay
                          loop
                          playsInline
                          muted={isMobileMuted}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={currentP.photoUrl}
                          alt={currentP.name}
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none"
                        />
                      )}
                  
                  {/* Cinematic gradient overlay - plus clair et lumineux */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />

                  {/* TOP: Bumble-style segmented story bars (Univers A vs Univers B) */}
                  <div className="relative z-20 pt-3 px-3 sm:px-4">
                    <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProtagonist('A');
                        }}
                        className="h-1.5 rounded-full overflow-hidden bg-white/30 cursor-pointer"
                        title={`Voir ${pA.name} (${themeA})`}
                      >
                        <div 
                          className={`h-full transition-all duration-300 ${
                            activeProtagonist === 'A' ? 'bg-[#C89B3C]' : 'bg-transparent'
                          }`}
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProtagonist('B');
                        }}
                        className="h-1.5 rounded-full overflow-hidden bg-white/30 cursor-pointer"
                        title={`Voir ${pB.name} (${themeB})`}
                      >
                        <div 
                          className={`h-full transition-all duration-300 ${
                            activeProtagonist === 'B' ? 'bg-[#C89B3C]' : 'bg-transparent'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Top Row Header inside Card: Pole Pill on left & [Switch button + Golden play/pause button] on right */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-md shrink-0">
                        {currentTheme}
                      </span>

                      {/* Right controls: Switch A/B pill + Audio toggle + Hybrid Golden Play/Pause button */}
                      <div className="flex items-center gap-2">
                        {/* Pill to toggle between Protagonist A and B */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveProtagonist(prev => prev === 'A' ? 'B' : 'A');
                          }}
                          className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                          title="Basculer vers l'autre univers du duo"
                        >
                          <span className="font-mono font-black text-[10px] text-white tracking-wider select-none">&lt; &gt;</span>
                          <span>{activeProtagonist === 'A' ? pB.name.split(' ')[0] : pA.name.split(' ')[0]}</span>
                        </button>

                        {/* Son activé / muet si vidéo en cours */}
                        {isMobilePlaying && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (activeProtagonist === 'A') setIsMutedA(prev => !prev);
                              else setIsMutedB(prev => !prev);
                            }}
                            className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                            title={isMobileMuted ? "Activer le son" : "Couper le son"}
                          >
                            {isMobileMuted ? (
                              <VolumeX className="w-4 h-4 text-stone-300" />
                            ) : (
                              <Volume2 className="w-4 h-4 text-[#C89B3C]" />
                            )}
                          </button>
                        )}

                      </div>
                    </div>
                  </div>

                  {/* Bouton de lecture vidéo CENTRÉ : visible au centre quand la vidéo est en pause */}
                  {!isMobilePlaying && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white/90 shadow-xl group-hover:scale-105 transition-transform">
                        <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white translate-x-0.5 opacity-95" />
                      </div>
                    </div>
                  )}

                  {/* Espace central */}
                  <div className="my-auto" />

                  {/* BOTTOM IDENTITY & DETAILS */}
                  <div className="relative z-20 p-5 sm:p-6 space-y-3 pointer-events-auto">
                    
                    {/* Protagonist name, age & territorial origin */}
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none drop-shadow-md">
                          {currentP.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {currentP.age && (
                            <span className="text-xs text-white/80 font-medium">
                              {currentP.age} ans
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Son univers button (icône bonhomme -> Aller directement sur son profil avec retour au Duo) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate({
                            type: 'protagonist_profile',
                            protagonistId: currentP.id,
                            returnToDuoId: currentDuo.id,
                            returnToDuoIndex: safeIndex,
                            returnToDocId: selectedDocId || currentDuo.documentaryId
                          });
                        }}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                        title={`Consulter le profil de ${currentP.name}`}
                        id={`open-universe-${currentP.id}`}
                      >
                        <User className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


              {/* ========================================================================= */}
              {/* AFFICHAGE FORMAT TABLETTE & DESKTOP (MODE MIROIR FACE-À-FACE)             */}
              {/* Les 2 protagonistes côte-à-côte avec le lien miroir au centre             */}
              {/* ========================================================================= */}
              {desktopViewMode === 'mirror' && (
                <div className="w-full">
                  <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-10 relative max-w-xs sm:max-w-xl md:max-w-3xl mx-auto items-center">
                    
                    {/* CARTE PROTAGONISTE A */}
                    <div 
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest('button, a, input, textarea')) return;
                        togglePlayA();
                      }}
                      className="group relative rounded-[28px] overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between aspect-[9/16] transition-all duration-300 cursor-pointer"
                    >
                      {/* Background Media: Video when isPlayingA, otherwise Poster Photo */}
                      {isPlayingA ? (
                        <video
                          ref={videoRefA}
                          key={`desktop-video-a-${currentDuo.id}`}
                          src={videoUrlA}
                          autoPlay
                          loop
                          playsInline
                          muted={isMutedA}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <img 
                          src={pA.photoUrl} 
                          alt={pA.name} 
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 pointer-events-none"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />

                      {/* Top Header: Pole Tag on left & [Mute toggle + Hybrid Golden Play/Pause Button] on right */}
                      <div className="relative z-10 p-4 flex items-center justify-between">
                        <span className="w-fit max-w-[150px] truncate px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-md shrink-0">
                          {themeA}
                        </span>

                        <div className="flex items-center gap-2">
                          {/* Audio toggle when playing */}
                          {isPlayingA && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMutedA(prev => !prev);
                              }}
                              className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                              title={isMutedA ? "Activer le son" : "Couper le son"}
                            >
                              {isMutedA ? (
                                <VolumeX className="w-4 h-4 text-stone-300" />
                              ) : (
                                <Volume2 className="w-4 h-4 text-[#C89B3C]" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Centre : Bouton Play central quand en pause */}
                      {!isPlayingA && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                          <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white/90 shadow-xl group-hover:scale-105 transition-transform">
                            <Play className="w-6 h-6 fill-white text-white translate-x-0.5 opacity-95" />
                          </div>
                        </div>
                      )}

                      {/* Centre libéré */}
                      <div className="my-auto" />

                      {/* Bottom Info */}
                      <div className="relative z-10 p-5 flex items-center justify-between">
                        <div className="text-left font-sans">
                          <h3 className="text-lg lg:text-xl font-bold text-white tracking-tight">
                            {pA.name.split(' ')[0]}
                          </h3>
                          {pA.age && (
                            <p className="text-xs text-stone-300 mt-0.5">
                              {pA.age} ans
                            </p>
                          )}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate({
                              type: 'protagonist_profile',
                              protagonistId: pA.id,
                              returnToDuoId: currentDuo.id,
                              returnToDuoIndex: safeIndex,
                              returnToDocId: selectedDocId || currentDuo.documentaryId
                            });
                          }}
                          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all flex items-center justify-center shadow-sm cursor-pointer border border-white/20 hover:scale-105 active:scale-95"
                          title={`Consulter le profil de ${pA.name}`}
                          id={`open-universe-${pA.id}`}
                        >
                          <User className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* SYMBOLE CENTRAL DUO FACE-À-FACE : < > avec fond Terre Cuite signature */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none">
                      <div 
                        className="w-12 h-12 rounded-full bg-[#A2482B] text-white border-2 border-white shadow-2xl shadow-[#A2482B]/40 ring-1 ring-[#C89B3C]/50 flex items-center justify-center pointer-events-auto transition-transform hover:scale-110 select-none font-mono font-black text-sm tracking-wider"
                        title="Duo face-à-face < >"
                      >
                        &lt; &gt;
                      </div>
                    </div>

                    {/* CARTE PROTAGONISTE B */}
                    <div 
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest('button, a, input, textarea')) return;
                        togglePlayB();
                      }}
                      className="group relative rounded-[28px] overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between aspect-[9/16] transition-all duration-300 cursor-pointer"
                    >
                      {/* Background Media: Video when isPlayingB, otherwise Poster Photo */}
                      {isPlayingB ? (
                        <video
                          ref={videoRefB}
                          key={`desktop-video-b-${currentDuo.id}`}
                          src={videoUrlB}
                          autoPlay
                          loop
                          playsInline
                          muted={isMutedB}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <img 
                          src={pB.photoUrl} 
                          alt={pB.name} 
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 pointer-events-none"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />

                      {/* Top Header: Pole Tag on left & [Mute toggle + Hybrid Golden Play/Pause Button] on right */}
                      <div className="relative z-10 p-4 flex items-center justify-between">
                        <span className="w-fit max-w-[150px] truncate px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-md shrink-0">
                          {themeB}
                        </span>

                        <div className="flex items-center gap-2">
                          {/* Audio toggle when playing */}
                          {isPlayingB && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMutedB(prev => !prev);
                              }}
                              className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                              title={isMutedB ? "Activer le son" : "Couper le son"}
                            >
                              {isMutedB ? (
                                <VolumeX className="w-4 h-4 text-stone-300" />
                              ) : (
                                <Volume2 className="w-4 h-4 text-[#C89B3C]" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Centre : Bouton Play central quand en pause */}
                      {!isPlayingB && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                          <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white/90 shadow-xl group-hover:scale-105 transition-transform">
                            <Play className="w-6 h-6 fill-white text-white translate-x-0.5 opacity-95" />
                          </div>
                        </div>
                      )}

                      {/* Centre libéré */}
                      <div className="my-auto" />

                      {/* Bottom Info */}
                      <div className="relative z-10 p-5 flex items-center justify-between">
                        <div className="text-left font-sans">
                          <h3 className="text-lg lg:text-xl font-bold text-white tracking-tight">
                            {pB.name.split(' ')[0]}
                          </h3>
                          {pB.age && (
                            <p className="text-xs text-stone-300 mt-0.5">
                              {pB.age} ans
                            </p>
                          )}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate({
                              type: 'protagonist_profile',
                              protagonistId: pB.id,
                              returnToDuoId: currentDuo.id,
                              returnToDuoIndex: safeIndex,
                              returnToDocId: selectedDocId || currentDuo.documentaryId
                            });
                          }}
                          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all flex items-center justify-center shadow-sm cursor-pointer border border-white/20 hover:scale-105 active:scale-95"
                          title={`Consulter le profil de ${pB.name}`}
                          id={`open-universe-${pB.id}`}
                        >
                          <User className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. LA QUESTION CENTRALE : RÉVÉLÉE SUR CLIC DU BOUTON (SUR FOND BLANC)     */}
      {/* ========================================================================= */}
      <div className="mt-2 sm:mt-4 flex flex-col items-center max-w-xl mx-auto w-full">
        {!isQuestionRevealed ? (
          <button
            onClick={() => setIsQuestionRevealed(true)}
            id="reveal-question-btn"
            className="px-5 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-300 hover:border-stone-400 text-stone-700 text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <span>Révéler la question en miroir</span>
          </button>
        ) : (
          <div className="w-full p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-md text-center relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsQuestionRevealed(false)}
              className="absolute top-2.5 right-2.5 p-1 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              title="Masquer la question"
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>
            <p className="font-serif-editorial text-base sm:text-lg font-normal text-[#1C1917] leading-relaxed px-6 italic">
              {cleanQuotes(currentDuo.centralQuestion)}
            </p>
          </div>
        )}

      </div>

      {/* Télécommande des Séries (Modal) */}
      <RemoteControlModal
        isOpen={isRemoteOpen}
        onClose={() => setIsRemoteOpen(false)}
        selectedDocId={selectedDocId}
        onSelectDoc={(docId) => {
          setSelectedDocId(docId);
          setCurrentIndex(0);
        }}
      />

      {/* Modale Teaser Présentation Vidéo avant d'entrer dans l'univers */}
      <ProtagonistTeaserModal
        protagonist={teaserProtagonist}
        onClose={() => setTeaserProtagonist(null)}
        onEnterUniverse={(id) => {
          setTeaserProtagonist(null);
          onNavigate({ type: 'protagonist_profile', protagonistId: id });
        }}
      />
    </div>
  );
};
