import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Tv, 
  Shuffle, 
  User, 
  Link2,
  EyeOff,
  RotateCcw,
  Sparkles,
  Columns,
  Square
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { DUOS, DOCUMENTARIES } from '../data/mockData';
import { ViewScreen, Duo } from '../types';
import { RemoteControlModal } from './RemoteControlModal';

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

  // Compute starting duo index if initialDuoId is provided
  const startingIndex = initialDuoId
    ? Math.max(0, DUOS.findIndex(d => d.id === initialDuoId))
    : initialDuoIndex;

  const [currentIndex, setCurrentIndex] = useState(startingIndex);
  const [isQuestionRevealed, setIsQuestionRevealed] = useState(false);
  
  // Mobile active protagonist: 'A' or 'B' (tap story toggle like Bumble)
  const [activeProtagonist, setActiveProtagonist] = useState<'A' | 'B'>('A');

  // Desktop view mode: 'mirror' (face-to-face 2 cards) | 'deck' (Bumble solo card deck)
  const [desktopViewMode, setDesktopViewMode] = useState<'mirror' | 'deck'>('mirror');

  // Swipe direction animation track: 'next' | 'prev' | null
  const [swipeDirection, setSwipeDirection] = useState<'next' | 'prev' | null>(null);

  // Motion values for permanent drag / swipe physics
  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-300, 0, 300], [-8, 0, 8]);
  const dragScale = useTransform(dragX, [-300, 0, 300], [0.97, 1, 0.97]);

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

  // Handlers for next / prev with direction tracking
  const handleNext = () => {
    setSwipeDirection('next');
    setIsQuestionRevealed(false);
    setActiveProtagonist('A');
    setCurrentIndex(prev => (prev + 1) % filteredDuos.length);
  };

  const handlePrev = () => {
    setSwipeDirection('prev');
    setIsQuestionRevealed(false);
    setActiveProtagonist('A');
    setCurrentIndex(prev => (prev - 1 + filteredDuos.length) % filteredDuos.length);
  };

  const handleShuffle = () => {
    if (filteredDuos.length <= 1) return;
    setSwipeDirection('next');
    setIsQuestionRevealed(false);
    setActiveProtagonist('A');
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

  // Derive the 2 thematic terms for this duo
  const themeA = pA.universeTag || (activeDoc ? activeDoc.universes[0]?.name : 'PÔLE A');
  const themeB = pB.universeTag || (activeDoc ? activeDoc.universes[1]?.name : 'PÔLE B');
  const currentTheme = activeProtagonist === 'A' ? themeA : themeB;

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-28 pt-2 px-3 sm:px-6 max-w-6xl mx-auto flex flex-col justify-between select-none">
      
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

        {/* Titre Face-à-Face centré */}
        <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center pointer-events-none z-10">
          {(() => {
            const title = currentDuo.documentaryTitle || '';
            const parts = title.includes('< >') ? title.split('< >') : title.includes('<>') ? title.split('<>') : null;
            return parts ? (
              <div 
                key={`duo-series-${currentDuo.id}-${title}`}
                className="pointer-events-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200 shadow-xs text-xs sm:text-sm animate-in fade-in zoom-in-95 duration-200"
              >
                <span className="font-sans font-bold text-[#1C1917] tracking-tight">{parts[0].trim()}</span>
                <span 
                  className="inline-flex items-center gap-0.5 font-mono text-xs font-black text-[#C89B3C] px-1 select-none tracking-wider"
                  title="Symbole face à face"
                >
                  &lt; &gt;
                </span>
                <span className="font-sans font-bold text-[#1C1917] tracking-tight">{parts[1].trim()}</span>
              </div>
            ) : null;
          })()}
        </div>

        {/* Contrôles droits : commutateur mode desktop (Miroir / Deck) + Shuffle */}
        <div className="flex items-center gap-2 z-10">
          
          {/* Commutateur mode sur tablette et desktop */}
          <div className="hidden md:flex items-center bg-stone-100 p-0.5 rounded-full border border-stone-200">
            <button
              onClick={() => setDesktopViewMode('mirror')}
              title="Vue Miroir (Duo Face-à-face)"
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
              title="Vue Deck Bumble (Carte immersive)"
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
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`duo-${currentDuo.id}-${safeIndex}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.75}
              style={{ x: dragX, rotate: dragRotate, scale: dragScale }}
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
              }}
              initial={{ 
                opacity: 0, 
                scale: 0.95,
                x: swipeDirection === 'prev' ? -80 : swipeDirection === 'next' ? 80 : 0 
              }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 0.92,
                x: swipeDirection === 'prev' ? 120 : -120 
              }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
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
              {/* AFFICHAGE FORMAT MOBILE (< 768px) OU MODE DECK BUMBLE SOLO               */}
              {/* Format carte unique 9:16 avec barres de stories & tap A/B intuitif        */}
              {/* ========================================================================= */}
              <div className={`${desktopViewMode === 'mirror' ? 'block md:hidden' : 'block'} w-full max-w-sm sm:max-w-md mx-auto`}>
                
                <div className="relative rounded-[32px] overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/60 aspect-[9/16] sm:aspect-[9/15] flex flex-col justify-between">
                  
                  {/* Background Image of the active protagonist */}
                  <img
                    src={currentP.photoUrl}
                    alt={currentP.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                  />
                  
                  {/* Cinematic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none" />

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

                    {/* Top Row Header inside Card: Pole Pill + Switch Button */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-bold tracking-wider text-amber-300 uppercase shadow-md">
                        {currentTheme}
                      </span>

                      {/* Pill to toggle between Protagonist A and B */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProtagonist(prev => prev === 'A' ? 'B' : 'A');
                        }}
                        className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                        title="Basculer vers l'autre univers du duo"
                      >
                        <Link2 className="w-3 h-3 text-[#C89B3C]" />
                        <span>{activeProtagonist === 'A' ? pB.name.split(' ')[0] : pA.name.split(' ')[0]}</span>
                      </button>
                    </div>
                  </div>

                  {/* INVISIBLE TAP ZONES: Tap Left = Univers A, Tap Right = Univers B */}
                  <div className="absolute inset-0 z-10 grid grid-cols-2 pointer-events-auto">
                    <div 
                      onClick={() => setActiveProtagonist('A')}
                      className="cursor-pointer"
                      title="Toucher pour voir l'univers A"
                    />
                    <div 
                      onClick={() => setActiveProtagonist('B')}
                      className="cursor-pointer"
                      title="Toucher pour voir l'univers B"
                    />
                  </div>

                  {/* CENTER PLAY BUTTON */}
                  <div className="relative z-20 flex items-center justify-center my-auto pointer-events-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate({
                          type: 'video_player',
                          story: currentStory,
                          protagonist: currentP,
                          duoId: currentDuo.id,
                          documentaryTitle: currentDuo.documentaryTitle
                        });
                      }}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-black/70 hover:bg-[#C89B3C] text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-2xl cursor-pointer group"
                      id={`play-mobile-story-${currentP.id}`}
                      title={`Écouter ${currentP.name}`}
                    >
                      <Play className="w-8 h-8 fill-current ml-1 text-white group-hover:text-black transition-colors" />
                    </button>
                  </div>

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

                      {/* Son univers button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate({ type: 'protagonist_profile', protagonistId: currentP.id });
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                        title="Explorer son univers"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>Univers</span>
                      </button>
                    </div>

                    {/* Question teaser bar inside card */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsQuestionRevealed(!isQuestionRevealed);
                      }}
                      className="w-full py-2 px-3 rounded-2xl bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/10 text-left transition-all cursor-pointer flex items-center justify-between text-xs"
                    >
                      <span className="text-stone-300 font-medium line-clamp-1">
                        {isQuestionRevealed ? `« ${currentDuo.centralQuestion} »` : 'Question en miroir : toucher pour révéler'}
                      </span>
                      <span className="text-amber-400 font-bold ml-2 shrink-0">
                        {isQuestionRevealed ? 'Masquer' : 'Voir'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Mobile Bumble-style Bottom Action Buttons (Rewind, Play, Next) */}
                <div className="flex items-center justify-center gap-4 mt-4 px-2">
                  
                  {/* Rewind / Précédent */}
                  <button
                    onClick={handlePrev}
                    id="mobile-btn-rewind"
                    title="Revenir au duo précédent"
                    className="w-12 h-12 rounded-full bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-lg flex items-center justify-center transition-all transform active:scale-90 cursor-pointer"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>

                  {/* Basculer Univers A / B */}
                  <button
                    onClick={() => setActiveProtagonist(prev => prev === 'A' ? 'B' : 'A')}
                    id="mobile-btn-toggle-protagonist"
                    title="Basculer vers l'autre protagoniste"
                    className="w-11 h-11 rounded-full bg-white hover:bg-stone-100 text-[#C89B3C] border border-stone-200 shadow-md flex items-center justify-center transition-all transform active:scale-90 cursor-pointer"
                  >
                    <Link2 className="w-4 h-4" />
                  </button>

                  {/* Suivant */}
                  <button
                    onClick={handleNext}
                    id="mobile-btn-next"
                    title="Duo suivant"
                    className="w-12 h-12 rounded-full bg-[#1C1917] hover:bg-stone-800 text-white shadow-lg flex items-center justify-center transition-all transform active:scale-90 cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>


              {/* ========================================================================= */}
              {/* AFFICHAGE FORMAT TABLETTE & DESKTOP (MODE MIROIR FACE-À-FACE)             */}
              {/* Les 2 protagonistes côte-à-côte avec le lien miroir au centre             */}
              {/* ========================================================================= */}
              {desktopViewMode === 'mirror' && (
                <div className="hidden md:block w-full">
                  <div className="grid grid-cols-2 gap-6 lg:gap-10 relative max-w-3xl mx-auto items-center">
                    
                    {/* CARTE PROTAGONISTE A */}
                    <div className="group relative rounded-[28px] overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-end aspect-[9/15] transition-all duration-300">
                      <img 
                        src={pA.photoUrl} 
                        alt={pA.name} 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                      {/* Top Left Pole Tag */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-bold tracking-wider text-amber-300 uppercase shadow-md">
                          {themeA}
                        </span>
                      </div>

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate({
                              type: 'video_player',
                              story: currentDuo.storyA,
                              protagonist: pA,
                              duoId: currentDuo.id,
                              documentaryTitle: currentDuo.documentaryTitle
                            });
                          }}
                          className="w-16 h-16 rounded-full bg-black/70 hover:bg-[#C89B3C] text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 active:scale-95 shadow-2xl cursor-pointer"
                          id={`play-story-${pA.id}`}
                          title={`Écouter ${pA.name}`}
                        >
                          <Play className="w-7 h-7 fill-current ml-1" />
                        </button>
                      </div>

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
                            onNavigate({ type: 'protagonist_profile', protagonistId: pA.id });
                          }}
                          className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium backdrop-blur-md transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                          title="Son univers"
                          id={`open-universe-${pA.id}`}
                        >
                          <User className="w-3.5 h-3.5" />
                          <span>Univers</span>
                        </button>
                      </div>
                    </div>

                    {/* LIEN CENTRAL MIROIR ÉPURÉ */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-[#1C1917] text-white border-2 border-white shadow-2xl flex items-center justify-center pointer-events-auto transition-transform hover:scale-110">
                        <Link2 className="w-5 h-5 text-[#C89B3C]" />
                      </div>
                    </div>

                    {/* CARTE PROTAGONISTE B */}
                    <div className="group relative rounded-[28px] overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-end aspect-[9/15] transition-all duration-300">
                      <img 
                        src={pB.photoUrl} 
                        alt={pB.name} 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                      {/* Top Left Pole Tag */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-bold tracking-wider text-amber-300 uppercase shadow-md">
                          {themeB}
                        </span>
                      </div>

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate({
                              type: 'video_player',
                              story: currentDuo.storyB,
                              protagonist: pB,
                              duoId: currentDuo.id,
                              documentaryTitle: currentDuo.documentaryTitle
                            });
                          }}
                          className="w-16 h-16 rounded-full bg-black/70 hover:bg-[#C89B3C] text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 active:scale-95 shadow-2xl cursor-pointer"
                          id={`play-story-${pB.id}`}
                          title={`Écouter ${pB.name}`}
                        >
                          <Play className="w-7 h-7 fill-current ml-1" />
                        </button>
                      </div>

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
                            onNavigate({ type: 'protagonist_profile', protagonistId: pB.id });
                          }}
                          className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium backdrop-blur-md transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                          title="Son univers"
                          id={`open-universe-${pB.id}`}
                        >
                          <User className="w-3.5 h-3.5" />
                          <span>Univers</span>
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
            className="px-5 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-300 hover:border-stone-400 text-stone-700 text-xs font-semibold transition-all shadow-xs cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Révéler la question en miroir</span>
          </button>
        ) : (
          <div className="w-full p-4 rounded-2xl bg-white border border-stone-200 shadow-md text-center relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsQuestionRevealed(false)}
              className="absolute top-2.5 right-2.5 p-1 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              title="Masquer la question"
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>
            <p className="font-editorial text-sm sm:text-base font-medium text-[#1C1917] leading-relaxed px-6">
              « {currentDuo.centralQuestion} »
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
    </div>
  );
};
