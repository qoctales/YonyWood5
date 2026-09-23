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
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles,
  Columns,
  Square,
  HelpCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { DUOS, DOCUMENTARIES } from '../data/mockData';
import { ViewScreen, Duo, Protagonist } from '../types';
import { RemoteControlModal } from './RemoteControlModal';
import { ProtagonistTeaserModal } from './ProtagonistTeaserModal';
import { DuocumentairesTvIcon } from './YonywoodBrandIcons';
import { ProfileAvatarButton } from './TopProfileButton';

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
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  
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
  // Dès que l'écran devient petit (< 768px), le mode Deck est AUTOMATIQUE
  const [desktopViewMode, setDesktopViewMode] = useState<'mirror' | 'deck'>('mirror');
  const [windowWidth, setWindowWidth] = useState<number>(() => 
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowWidth < 768;
  const activeMode: 'mirror' | 'deck' = isSmallScreen ? 'deck' : desktopViewMode;

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
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-2 sm:py-3 pb-20 sm:pb-24 pt-safe pb-safe h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between text-[#1C1917] select-none">
      
      {/* ========================================================================= */}
      {/* 1. BARRE SUPÉRIEURE ÉPURÉE AVEC SÉRIES, DUO ET PROFIL ALIGNÉS             */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-2 sm:pb-2.5 shrink-0 gap-2">
        
        {/* Télécommande / Séries */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setIsRemoteOpen(true)}
            id="open-series-choice-btn"
            title="Changer de série ou voir toutes les séries"
            className="group flex items-center gap-1 sm:gap-1.5 h-7.5 sm:h-8 px-2.5 sm:px-3 rounded-full bg-white hover:bg-stone-50 border border-stone-200 hover:border-stone-400 transition-all shadow-xs cursor-pointer"
          >
            <Tv className="w-3.5 h-3.5 text-[#C89B3C] group-hover:scale-110 transition-transform shrink-0" />
            <span className="font-sans text-[10.5px] sm:text-xs font-semibold text-[#1C1917] truncate max-w-[85px] sm:max-w-none">
              {selectedDocId 
                ? (activeDoc?.title || currentDuo.documentaryTitle)
                : <><span className="sm:hidden">Séries</span><span className="hidden sm:inline">Toutes les séries</span></>
              }
            </span>
            {selectedDocId && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] animate-pulse shrink-0" title="Filtre actif" />
            )}
          </button>

          {selectedDocId && (
            <button
              onClick={() => {
                setSelectedDocId(null);
                setCurrentIndex(0);
              }}
              title="Revenir à toutes les séries (flux aléatoire)"
              className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 text-xs transition-colors cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Titre Face-à-Face centré : Pilule Terre Cuite ultra-compacte */}
        <div className="flex items-center justify-center min-w-0 flex-1 px-1">
          {(() => {
            const title = currentDuo.documentaryTitle || '';
            const parts = title.includes('< >') ? title.split('< >') : title.includes('<>') ? title.split('<>') : null;
            return parts ? (
              <div 
                key={`duo-series-${currentDuo.id}-${title}`}
                className="inline-flex items-center gap-1 sm:gap-1.5 h-6.5 sm:h-7.5 px-2 sm:px-3 rounded-full bg-[#A2482B] border border-[#8A3B22] shadow-xs text-[10px] sm:text-xs animate-in fade-in duration-200 text-white truncate max-w-[170px] sm:max-w-xs"
              >
                <span className="font-sans font-bold text-white tracking-tight truncate max-w-[65px] sm:max-w-[110px]">{parts[0].trim()}</span>
                <span 
                  className="font-mono text-[8.5px] sm:text-[10px] font-black text-white/90 px-0.5 select-none shrink-0"
                  title="Face à face"
                >
                  &lt;&gt;
                </span>
                <span className="font-sans font-bold text-white tracking-tight truncate max-w-[65px] sm:max-w-[110px]">{parts[1].trim()}</span>
              </div>
            ) : null;
          })()}
        </div>

        {/* Contrôles droits : commutateur mode desktop (masqué sur mobile) + Shuffle + Profil */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Commutateur mode : Desktop uniquement */}
          <div className="hidden md:flex items-center bg-stone-100 p-0.5 rounded-full border border-stone-200">
            <button
              onClick={() => setDesktopViewMode('mirror')}
              title="Vue Miroir (Duo Face-à-face, 2 vidéos)"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                activeMode === 'mirror'
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
                activeMode === 'deck'
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
            className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
          >
            <Shuffle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>

          {/* Avatar profil parfaitement aligné dans le header */}
          <ProfileAvatarButton onNavigate={onNavigate} />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ZONE PRINCIPALE DE SWIPE PERMANENT (WEB, TABLETTE, MOBILE)            */}
      {/* Glisser à droite = Revenir au duo précédent | Glisser à gauche = Suivant  */}
      {/* ========================================================================= */}
      <div className="relative flex-1 flex items-center justify-center min-h-0 py-0.5 sm:py-2">
        
        {/* Flèche Gauche Desktop / Tablette (Click pour revenir en arrière) */}
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-4 lg:left-8 z-30 w-12 h-12 rounded-full bg-white hover:bg-[#1C1917] text-stone-800 hover:text-white border border-stone-200 shadow-xl items-center justify-center transition-all cursor-pointer transform hover:scale-105 active:scale-95 group"
          title="Duo précédent (Glisser à droite)"
          id="prev-duo-arrow-btn"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Flèche Droite Desktop / Tablette (Click pour avancer) */}
        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-4 lg:right-8 z-30 w-12 h-12 rounded-full bg-white hover:bg-[#1C1917] text-stone-800 hover:text-white border border-stone-200 shadow-xl items-center justify-center transition-all cursor-pointer transform hover:scale-105 active:scale-95 group"
          title="Duo suivant (Glisser à gauche)"
          id="next-duo-arrow-btn"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Conteneur Draggable avec Motion (Permanent Swipe) */}
        <div className="w-full h-full flex justify-center items-center relative overflow-visible">
          
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
              className="cursor-grab active:cursor-grabbing w-full max-w-4xl relative h-full flex items-center justify-center"
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
              {/* MODE DECK (CARTE UNIQUE FORMAT 9:16 AGRANDIE AU MAXIMUM)                   */}
              {/* ========================================================================= */}
              {activeMode === 'deck' && (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="w-auto max-w-[min(calc(100vw-28px),calc((100dvh-130px)*9/16))] max-h-[calc(100dvh-130px)] sm:max-h-[min(680px,calc(100dvh-140px))] aspect-[9/16] mx-auto flex justify-center">
                    <div 
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest('button, a, input, textarea')) return;
                        if (isDraggingRef.current) return;
                        toggleMobilePlay();
                      }}
                      className="relative w-full h-full rounded-[2rem] sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 aspect-[9/16] flex flex-col justify-between cursor-pointer"
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
                  <div className="relative z-20 pt-2.5 px-3 sm:px-4">
                    <div className="grid grid-cols-2 gap-1.5 mb-2">
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

                    {/* Top Row Header inside Card: Pole Pill on left & [Switch button + Question vignette + Audio] on right */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white shadow-md shrink-0">
                        {currentTheme}
                      </span>

                      {/* Right controls: Switch A/B pill + Question Vignette + Audio toggle */}
                      <div className="flex items-center gap-1.5">
                        {/* Pill to toggle between Protagonist A and B */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveProtagonist(prev => prev === 'A' ? 'B' : 'A');
                          }}
                          className="h-7 px-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white text-[10.5px] font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95"
                          title="Basculer vers l'autre univers du duo"
                        >
                          <DuocumentairesTvIcon className="w-3 h-3 text-white" strokeWidth={1.4} />
                          <span>{activeProtagonist === 'A' ? pB.name.split(' ')[0] : pA.name.split(' ')[0]}</span>
                        </button>

                        {/* Vignette interactive pour la question en miroir */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsQuestionModalOpen(true);
                          }}
                          className="h-7 px-2 sm:px-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white text-[10.5px] font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                          title="Afficher la question centrale en miroir"
                          id="deck-question-vignette-btn"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-[#C89B3C]" />
                          <span className="hidden sm:inline">Question</span>
                        </button>

                        {/* Son activé / muet si vidéo en cours */}
                        {isMobilePlaying && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (activeProtagonist === 'A') setIsMutedA(prev => !prev);
                              else setIsMutedB(prev => !prev);
                            }}
                            className="w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                            title={isMobileMuted ? "Activer le son" : "Couper le son"}
                          >
                            {isMobileMuted ? (
                              <VolumeX className="w-3.5 h-3.5 text-stone-300" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5 text-[#C89B3C]" />
                            )}
                          </button>
                        )}

                      </div>
                    </div>
                  </div>

                  {/* Bouton de lecture / pause vidéo CENTRÉ */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white/90 shadow-xl transition-all duration-200 ${
                      isMobilePlaying ? 'opacity-0 group-hover:opacity-100 hover:scale-105' : 'opacity-100 scale-100'
                    }`}>
                      {isMobilePlaying ? (
                        <Pause className="w-5 h-5 fill-white text-white" />
                      ) : (
                        <Play className="w-5 h-5 fill-white text-white translate-x-0.5 opacity-95" />
                      )}
                    </div>
                  </div>

                  {/* Espace central */}
                  <div className="my-auto" />

                  {/* BOTTOM IDENTITY & DETAILS */}
                  <div className="relative z-20 p-3.5 sm:p-5 space-y-2 pointer-events-auto">
                    
                    {/* Protagonist name, age & territorial origin */}
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white tracking-tight leading-none drop-shadow-md">
                          {currentP.name}
                        </h3>
                        {currentP.age && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[11px] text-white/80 font-medium">
                              {currentP.age} ans
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Son univers button */}
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
                        className="w-7.5 h-7.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                        title={`Consulter le profil de ${currentP.name}`}
                        id={`open-universe-${currentP.id}`}
                      >
                        <User className="w-3.5 h-3.5" />
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
              {activeMode === 'mirror' && (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  
                  {/* Vignette Flottante au centre : Question en miroir */}
                  <div className="mb-2 sm:mb-3 z-30 pointer-events-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsQuestionModalOpen(true);
                      }}
                      className="h-7.5 sm:h-8 px-3.5 rounded-full bg-[#1C1917]/90 hover:bg-[#A2482B] text-white text-[11px] sm:text-xs font-semibold backdrop-blur-md border border-white/25 shadow-xl flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      title="Afficher la question centrale en miroir"
                      id="mirror-question-vignette-btn"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-[#C89B3C]" />
                      <span>Question en miroir</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 relative h-full max-h-[calc(100dvh-150px)]">
                    
                    {/* CARTE PROTAGONISTE A */}
                    <div 
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest('button, a, input, textarea')) return;
                        togglePlayA();
                      }}
                      className="group relative rounded-[28px] overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between aspect-[9/16] w-auto max-w-[min(360px,calc((100dvh-160px)*9/16))] max-h-[calc(100dvh-160px)] sm:max-h-[min(620px,calc(100dvh-160px))] transition-all duration-300 cursor-pointer shrink-0"
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

                      {/* Centre : Bouton Play / Pause central */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className={`w-14 h-14 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white/90 shadow-xl transition-all duration-200 ${
                          isPlayingA ? 'opacity-0 group-hover:opacity-100 hover:scale-105' : 'opacity-100 scale-100'
                        }`}>
                          {isPlayingA ? (
                            <Pause className="w-6 h-6 fill-white text-white" />
                          ) : (
                            <Play className="w-6 h-6 fill-white text-white translate-x-0.5 opacity-95" />
                          )}
                        </div>
                      </div>

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

                    {/* CARTE PROTAGONISTE B */}
                    <div 
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest('button, a, input, textarea')) return;
                        togglePlayB();
                      }}
                      className="group relative rounded-[28px] overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between aspect-[9/16] w-auto max-w-[min(360px,calc((100dvh-160px)*9/16))] max-h-[calc(100dvh-160px)] sm:max-h-[min(620px,calc(100dvh-160px))] transition-all duration-300 cursor-pointer shrink-0"
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

                      {/* Centre : Bouton Play / Pause central */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className={`w-14 h-14 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white/90 shadow-xl transition-all duration-200 ${
                          isPlayingB ? 'opacity-0 group-hover:opacity-100 hover:scale-105' : 'opacity-100 scale-100'
                        }`}>
                          {isPlayingB ? (
                            <Pause className="w-6 h-6 fill-white text-white" />
                          ) : (
                            <Play className="w-6 h-6 fill-white text-white translate-x-0.5 opacity-95" />
                          )}
                        </div>
                      </div>

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

      {/* Modale Question Centrale en Miroir (affichée au clic sur la vignette interactive) */}
      {isQuestionModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsQuestionModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 text-center animate-in zoom-in-95 duration-200 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQuestionModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
              title="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-10 h-10 rounded-full bg-[#A2482B]/10 text-[#A2482B] flex items-center justify-center mx-auto mb-3">
              <HelpCircle className="w-5 h-5" />
            </div>

            <p className="text-[11px] font-bold uppercase tracking-wider text-[#A2482B] mb-2">
              Question centrale en miroir
            </p>

            <h3 className="font-editorial text-base sm:text-lg font-bold text-[#1C1917] mb-3">
              {currentDuo.documentaryTitle}
            </h3>

            <p className="font-serif-editorial text-base sm:text-lg text-stone-800 leading-relaxed italic px-2">
              « {cleanQuotes(currentDuo.centralQuestion)} »
            </p>
          </div>
        </div>
      )}

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
