import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronLeft,
  ChevronRight,
  LogIn,
  UserPlus
} from 'lucide-react';
import { ViewScreen } from '../types';
import { AuthModal } from './AuthModal';
import onboardingFirstLook from '../assets/images/onboarding_first_look_1790631851496.jpg';
import onboardingHowWorks from '../assets/images/onboarding_how_works_1790631863873.jpg';
import onboardingCoCreate from '../assets/images/onboarding_co_create_1790631875973.jpg';

interface LandingScreenProps {
  onNavigate: (screen: ViewScreen) => void;
}

interface OnboardingVideoItem {
  id: string;
  stepNumber: string;
  title: string;
  videoUrl: string;
  posterUrl: string;
}

const ONBOARDING_VIDEOS: OnboardingVideoItem[] = [
  {
    id: 'video-1-presentation',
    stepNumber: '01',
    title: 'Le projet YonyWood',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: onboardingFirstLook
  },
  {
    id: 'video-2-comment-ca-marche',
    stepNumber: '02',
    title: 'Comment ça marche',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    posterUrl: onboardingHowWorks
  },
  {
    id: 'video-3-creer-coproduire',
    stepNumber: '03',
    title: 'Participer & Créer',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    posterUrl: onboardingCoCreate
  }
];

export const LandingScreen: React.FC<LandingScreenProps> = ({ onNavigate }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Swipe tactile & drag souris
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchCurrentXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);

  const currentItem = ONBOARDING_VIDEOS[currentIdx];

  const handlePrev = () => {
    setIsPlaying(false);
    setSwipeOffset(0);
    setCurrentIdx((prev) => (prev - 1 + ONBOARDING_VIDEOS.length) % ONBOARDING_VIDEOS.length);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setSwipeOffset(0);
    setCurrentIdx((prev) => (prev + 1) % ONBOARDING_VIDEOS.length);
  };

  // Réinitialiser la lecture lors du changement d'écran
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [currentIdx]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  // --- Gestion du Swipe Tactile (Mobile) ---
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchCurrentXRef.current = e.targetTouches[0].clientX;
    hasDraggedRef.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    touchCurrentXRef.current = e.targetTouches[0].clientX;
    const diff = touchCurrentXRef.current - touchStartXRef.current;
    if (Math.abs(diff) > 8) {
      hasDraggedRef.current = true;
    }
    setSwipeOffset(diff);
  };

  const onTouchEnd = () => {
    if (touchStartXRef.current !== null && touchCurrentXRef.current !== null) {
      const diff = touchCurrentXRef.current - touchStartXRef.current;
      if (diff > 45) {
        handlePrev();
      } else if (diff < -45) {
        handleNext();
      }
    }
    touchStartXRef.current = null;
    touchCurrentXRef.current = null;
    setSwipeOffset(0);
  };

  // --- Gestion du Drag Souris (Desktop) ---
  const onMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    touchStartXRef.current = e.clientX;
    touchCurrentXRef.current = e.clientX;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || touchStartXRef.current === null) return;
    touchCurrentXRef.current = e.clientX;
    const diff = touchCurrentXRef.current - touchStartXRef.current;
    if (Math.abs(diff) > 8) {
      hasDraggedRef.current = true;
    }
    setSwipeOffset(diff);
  };

  const onMouseUp = () => {
    if (isDraggingRef.current && touchStartXRef.current !== null && touchCurrentXRef.current !== null) {
      const diff = touchCurrentXRef.current - touchStartXRef.current;
      if (diff > 45) {
        handlePrev();
      } else if (diff < -45) {
        handleNext();
      }
    }
    isDraggingRef.current = false;
    touchStartXRef.current = null;
    touchCurrentXRef.current = null;
    setSwipeOffset(0);
  };

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    // Redirection automatique vers la page des Duos après connexion / inscription
    onNavigate({ type: 'duo_feed' });
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] bg-white text-[#1C1917] flex flex-col justify-between select-none relative overflow-hidden">
      
      {/* Modale d'authentification */}
      <AuthModal 
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* ========================================================================= */}
      {/* 1. EN-TÊTE FIXE SUR FOND BLANC : LOGO OFFICIEL YONYWOOD                   */}
      {/* ========================================================================= */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between border-b border-stone-200 bg-white shrink-0">
        
        {/* Haut à Gauche : Logo officiel YonyWood (grand, net et affirmé) */}
        <div className="flex items-center">
          <img 
            src="/logo%20YonyWood.jpg" 
            alt="YonyWood" 
            className="h-10 sm:h-12 md:h-13 w-auto object-contain mix-blend-multiply select-none"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/logo-yonywood-clean.png';
            }}
          />
        </div>

        {/* Haut à Droite : Inscription & Connexion */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => openAuth('login')}
            className="px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold text-stone-700 hover:text-black hover:bg-stone-100 border border-stone-300 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5 text-stone-600" />
            <span>Connexion</span>
          </button>

          <button
            onClick={() => openAuth('register')}
            className="px-4 sm:px-5 py-2 rounded-full text-xs font-bold text-white bg-[#A2482B] hover:bg-[#8A3B22] shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Inscription</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CORPS : SLOGAN CENTRÉ & CARTE UNIQUE 9:16 AVEC FLÈCHES & SWIPE          */}
      {/* ========================================================================= */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-between px-2 sm:px-6 w-full min-h-0 overflow-hidden">
        
        {/* Zone supérieure : Slogan centré pile-poil entre la barre du header et le haut de la vidéo */}
        <div className="w-full flex-1 flex items-center justify-center px-4 min-h-[38px] shrink-0">
          <p className="font-editorial text-sm sm:text-base italic text-stone-600 tracking-wide select-none text-center">
            Where Stories Stick In Harmony.
          </p>
        </div>

        {/* Zone centrale : Carte vidéo 9:16 avec flèches de navigation */}
        <div className="relative w-full max-w-2xl flex items-center justify-center shrink-0">
          
          {/* Flèche Gauche (Vidéo précédente) */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-1 sm:left-4 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-[#A2482B] text-stone-800 hover:text-white border border-stone-200/90 shadow-xl flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Vidéo précédente"
            aria-label="Vidéo précédente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* CARTE FORMAT VIDÉO VERTICAL 9:16 AVEC GESTION DU SWIPE / DRAG */}
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            className="aspect-[9/16] w-[min(340px,calc((100dvh-175px)*9/16))] h-[min(604px,calc(100dvh-175px))] max-w-[calc(100vw-32px)] mx-auto transition-transform duration-150 ease-out select-none cursor-grab active:cursor-grabbing flex justify-center shrink-0"
            style={{ transform: `translateX(${swipeOffset}px)` }}
          >
            <div 
              onClick={(e) => {
                if (hasDraggedRef.current) {
                  hasDraggedRef.current = false;
                  return;
                }
                if ((e.target as HTMLElement).closest('button, a, input')) {
                  return;
                }
                togglePlay();
              }}
              className="group relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-950 text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between cursor-pointer select-none"
            >
              {/* Vidéo ou Poster cinématique officiel */}
              <video
                ref={videoRef}
                src={currentItem.videoUrl}
                poster={currentItem.posterUrl}
                playsInline
                loop
                muted={isMuted}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Voile sombre cinématographique pour garantir la lisibilité du titre sur la vidéo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

              {/* Témoin discret Play/Pause au centre */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-xl transition-all duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-90 scale-90' : 'opacity-90 scale-100'}`}>
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  )}
                </div>
              </div>

              {/* Haut de la vidéo : Commande audio */}
              <div className="relative z-20 p-4 flex items-center justify-end pointer-events-none">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 hover:text-white flex items-center justify-center cursor-pointer transition-colors pointer-events-auto"
                  title={isMuted ? 'Activer le son' : 'Couper le son'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#C89B3C]" />}
                </button>
              </div>

              {/* Bas de la vidéo : Titre principal remonté très légèrement, police plus fine et plus petite */}
              <div className="relative z-20 px-5 pb-7 sm:pb-8 pt-2 pointer-events-none">
                <h2 className="font-editorial text-base sm:text-lg font-normal tracking-wide text-white/95 leading-snug drop-shadow-sm truncate">
                  {currentItem.title}
                </h2>
              </div>

            </div>
          </div>

          {/* Flèche Droite (Vidéo suivante) */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-1 sm:right-4 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-[#A2482B] text-stone-800 hover:text-white border border-stone-200/90 shadow-xl flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Vidéo suivante"
            aria-label="Vidéo suivante"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Zone inférieure : Espace équilibré pour garantir le centrage parfait du slogan au-dessus */}
        <div className="w-full flex-1 min-h-[16px] pointer-events-none" />

      </main>

    </div>
  );
};
