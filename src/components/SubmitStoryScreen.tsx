import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  UploadCloud, 
  Camera, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { ViewScreen } from '../types';
import { PROPOSE_DOORS, ProposeDoor, ProposeSubject } from '../data/proposeDoorsData';

interface SubmitStoryScreenProps {
  preselectedDocumentaryId?: string;
  onNavigate: (screen: ViewScreen) => void;
}

export const SubmitStoryScreen: React.FC<SubmitStoryScreenProps> = ({
  preselectedDocumentaryId,
  onNavigate
}) => {
  // Step: 1 = Choisir la Porte, 2 = Choisir le Sujet, 3 = Format vidéo (Swipe entre les 2 options)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Door selection (Étape 1)
  const initialDoorIndex = preselectedDocumentaryId ? 0 : 0;
  const [doorIndex, setDoorIndex] = useState(initialDoorIndex);
  const [isDoorVideoPlaying, setIsDoorVideoPlaying] = useState(false);
  const [isDoorMuted, setIsDoorMuted] = useState(true);
  const [showDoorAdvantages, setShowDoorAdvantages] = useState(false);

  // Subject selection (Étape 2)
  const [subjectIndex, setSubjectIndex] = useState(0);
  const [isSubjectVideoPlaying, setIsSubjectVideoPlaying] = useState(false);
  const [isSubjectMuted, setIsSubjectMuted] = useState(true);
  const [showSubjectQuestion, setShowSubjectQuestion] = useState(false);

  // Form submission (Étape 3)
  // formatCardIndex: 0 = "J'ai ma vidéo", 1 = "Être filmé"
  const [formatCardIndex, setFormatCardIndex] = useState<0 | 1>(0);
  const [isFormatVideoPlaying, setIsFormatVideoPlaying] = useState(false);
  const [isFormatMuted, setIsFormatMuted] = useState(true);
  const [chosenFlow, setChosenFlow] = useState<'UPLOAD_DIRECT' | 'REQUEST_CREW' | null>(null);

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [videographerName, setVideographerName] = useState('');
  const [videographerCity, setVideographerCity] = useState('');
  const [videographerContact, setVideographerContact] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Données courantes
  const currentDoor: ProposeDoor = PROPOSE_DOORS[doorIndex] || PROPOSE_DOORS[0];
  const currentSubject: ProposeSubject = currentDoor.subjects[subjectIndex] || currentDoor.subjects[0];
  const isSeries = currentDoor.id === 'series';

  // Gestures pour l'Étape 3 (Swipe Format : J'ai ma vidéo vs Être filmé)
  const [fmtTouchStartX, setFmtTouchStartX] = useState<number | null>(null);
  const [fmtTouchEndX, setFmtTouchEndX] = useState<number | null>(null);
  const [fmtMouseStartX, setFmtMouseStartX] = useState<number | null>(null);
  const [isFmtMouseDown, setIsFmtMouseDown] = useState(false);
  const [fmtSwipeOffset, setFmtSwipeOffset] = useState(0);
  const fmtHasDraggedRef = useRef(false);

  const minSwipeDistance = 45;
  const hasDraggedRef = useRef(false);

  // Gestures pour l'Étape 1 (Swipe Portes)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  // Gestures pour l'Étape 2 (Swipe Sujets)
  const [subTouchStartX, setSubTouchStartX] = useState<number | null>(null);
  const [subTouchEndX, setSubTouchEndX] = useState<number | null>(null);
  const [subMouseStartX, setSubMouseStartX] = useState<number | null>(null);
  const [isSubMouseDown, setIsSubMouseDown] = useState(false);
  const [subSwipeOffset, setSubSwipeOffset] = useState(0);
  const subHasDraggedRef = useRef(false);

  // Navigation entre Portes (Étape 1)
  const goToDoor = (idx: number) => {
    const total = PROPOSE_DOORS.length;
    const safe = (idx + total) % total;
    setDoorIndex(safe);
    setSubjectIndex(0);
    setIsDoorVideoPlaying(false);
    setShowDoorAdvantages(false);
  };
  const handleNextDoor = () => goToDoor(doorIndex + 1);
  const handlePrevDoor = () => goToDoor(doorIndex - 1);

  // Navigation entre Sujets (Étape 2)
  const goToSubject = (idx: number) => {
    const total = currentDoor.subjects.length;
    if (total === 0) return;
    const safe = (idx + total) % total;
    setSubjectIndex(safe);
    setIsSubjectVideoPlaying(false);
    setShowSubjectQuestion(false);
  };
  const handleNextSubject = () => goToSubject(subjectIndex + 1);
  const handlePrevSubject = () => goToSubject(subjectIndex - 1);

  // Navigation entre les 2 formats de l'Étape 3
  const handleToggleFormat = () => {
    setFormatCardIndex(prev => (prev === 0 ? 1 : 0));
    setIsFormatVideoPlaying(false);
  };

  // Swipe Étape 3 (Formats)
  const onFmtTouchStart = (e: React.TouchEvent) => {
    fmtHasDraggedRef.current = false;
    setFmtTouchEndX(null);
    setFmtTouchStartX(e.targetTouches[0].clientX);
  };
  const onFmtTouchMove = (e: React.TouchEvent) => {
    setFmtTouchEndX(e.targetTouches[0].clientX);
    if (fmtTouchStartX !== null) {
      const diff = e.targetTouches[0].clientX - fmtTouchStartX;
      if (Math.abs(diff) > 8) fmtHasDraggedRef.current = true;
      setFmtSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
    }
  };
  const onFmtTouchEnd = () => {
    setFmtSwipeOffset(0);
    if (!fmtTouchStartX || !fmtTouchEndX) return;
    const distance = fmtTouchStartX - fmtTouchEndX;
    if (Math.abs(distance) > minSwipeDistance) handleToggleFormat();
  };

  const onFmtMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, video, input, label')) return;
    fmtHasDraggedRef.current = false;
    setIsFmtMouseDown(true);
    setFmtMouseStartX(e.clientX);
  };
  const onFmtMouseMove = (e: React.MouseEvent) => {
    if (!isFmtMouseDown || fmtMouseStartX === null) return;
    const diff = e.clientX - fmtMouseStartX;
    if (Math.abs(diff) > 8) fmtHasDraggedRef.current = true;
    setFmtSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
  };
  const onFmtMouseUp = (e: React.MouseEvent) => {
    if (!isFmtMouseDown) return;
    setIsFmtMouseDown(false);
    setFmtSwipeOffset(0);
    if (fmtMouseStartX === null) return;
    const distance = fmtMouseStartX - e.clientX;
    if (Math.abs(distance) > minSwipeDistance) handleToggleFormat();
    setFmtMouseStartX(null);
  };

  // Clavier (Flèches gauche/droite)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (step === 1) {
        if (e.key === 'ArrowRight') handleNextDoor();
        else if (e.key === 'ArrowLeft') handlePrevDoor();
      } else if (step === 2) {
        if (e.key === 'ArrowRight') handleNextSubject();
        else if (e.key === 'ArrowLeft') handlePrevSubject();
      } else if (step === 3 && !chosenFlow) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') handleToggleFormat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, doorIndex, subjectIndex, currentDoor, chosenFlow]);

  // Swipe Étape 1
  const onTouchStart = (e: React.TouchEvent) => {
    hasDraggedRef.current = false;
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    if (touchStartX !== null) {
      const diff = e.targetTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 8) hasDraggedRef.current = true;
      setSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
    }
  };
  const onTouchEnd = () => {
    setSwipeOffset(0);
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) handleNextDoor();
    else if (distance < -minSwipeDistance) handlePrevDoor();
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, video, .details-overlay')) return;
    hasDraggedRef.current = false;
    setIsMouseDown(true);
    setMouseStartX(e.clientX);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || mouseStartX === null) return;
    const diff = e.clientX - mouseStartX;
    if (Math.abs(diff) > 8) hasDraggedRef.current = true;
    setSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
  };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    setIsMouseDown(false);
    setSwipeOffset(0);
    if (mouseStartX === null) return;
    const distance = mouseStartX - e.clientX;
    if (distance > minSwipeDistance) handleNextDoor();
    else if (distance < -minSwipeDistance) handlePrevDoor();
    setMouseStartX(null);
  };

  // Swipe Étape 2 (Sujets)
  const onSubTouchStart = (e: React.TouchEvent) => {
    subHasDraggedRef.current = false;
    setSubTouchEndX(null);
    setSubTouchStartX(e.targetTouches[0].clientX);
  };
  const onSubTouchMove = (e: React.TouchEvent) => {
    setSubTouchEndX(e.targetTouches[0].clientX);
    if (subTouchStartX !== null) {
      const diff = e.targetTouches[0].clientX - subTouchStartX;
      if (Math.abs(diff) > 8) subHasDraggedRef.current = true;
      setSubSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
    }
  };
  const onSubTouchEnd = () => {
    setSubSwipeOffset(0);
    if (!subTouchStartX || !subTouchEndX) return;
    const distance = subTouchStartX - subTouchEndX;
    if (distance > minSwipeDistance) handleNextSubject();
    else if (distance < -minSwipeDistance) handlePrevSubject();
  };

  const onSubMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, video, .details-overlay')) return;
    subHasDraggedRef.current = false;
    setIsSubMouseDown(true);
    setSubMouseStartX(e.clientX);
  };
  const onSubMouseMove = (e: React.MouseEvent) => {
    if (!isSubMouseDown || subMouseStartX === null) return;
    const diff = e.clientX - subMouseStartX;
    if (Math.abs(diff) > 8) subHasDraggedRef.current = true;
    setSubSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
  };
  const onSubMouseUp = (e: React.MouseEvent) => {
    if (!isSubMouseDown) return;
    setIsSubMouseDown(false);
    setSubSwipeOffset(0);
    if (subMouseStartX === null) return;
    const distance = subMouseStartX - e.clientX;
    if (distance > minSwipeDistance) handleNextSubject();
    else if (distance < -minSwipeDistance) handlePrevSubject();
    setSubMouseStartX(null);
  };

  const CurrentDoorIcon = currentDoor.icon;

  if (submittedSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#A2482B]/15 border border-[#A2482B] text-[#A2482B] mx-auto flex items-center justify-center">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h2 className="font-editorial text-3xl font-bold text-[#1C1917]">
          Votre proposition a été transmise.
        </h2>
        <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E7E5E4] text-left space-y-3 max-w-md mx-auto shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#A2482B] font-bold uppercase tracking-wider">
              {currentDoor.label}
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs text-[#1C1917] font-semibold">
              {currentSubject.title}
            </span>
          </div>
          <p className="text-xs text-[#68655D] italic">
            {isSeries ? (currentSubject.synopsis || currentSubject.subtitle) : `« ${currentSubject.question} »`}
          </p>
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-500">Format retenu :</span>
            <span className="font-medium text-[#A2482B]">
              {chosenFlow === 'UPLOAD_DIRECT' ? `Vidéo transmise (${uploadedFileName})` : `Tournage par cadreur (${videographerCity || 'Sur site'})`}
            </span>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onNavigate({ type: 'matrix_view' })}
            className="px-6 py-2.5 rounded-full bg-[#A2482B] hover:bg-[#8B3B20] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Explorer l'Astrolabe
          </button>
          <button
            onClick={() => onNavigate({ type: 'duo_feed' })}
            className="px-6 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer border border-stone-200"
          >
            Retourner aux duos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-28 space-y-6 text-[#1C1917]">
      
      {/* En-tête de la page & Indicateur d'étapes */}
      <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3.5 pr-14 sm:pr-24">
        <div>
          <h1 className="font-editorial text-xl sm:text-2xl font-bold text-[#1C1917]">
            Tournage d'un récit
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            {step === 1 && "Étape 1 sur 3 • Choisissez la Porte de votre tournage"}
            {step === 2 && `Étape 2 sur 3 • Choisissez votre sujet dans la Porte ${currentDoor.label}`}
            {step === 3 && "Étape 3 sur 3 • Format de votre vidéo et transmission"}
          </p>
        </div>

        {/* Pastilles d'étapes */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s
                  ? 'bg-[#A2482B] text-white shadow-xs ring-2 ring-[#A2482B]/30'
                  : step > s
                  ? 'bg-[#A2482B] text-white'
                  : 'bg-stone-200 text-stone-500'
              }`}
            >
              {step > s ? '✓' : s}
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ÉTAPE 1 : CHOISIR PARMI LES 8 PORTES D'ENTRÉE                             */}
      {/* ========================================================================= */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* Conteneur de l'écran 9:16 avec swipe et flèches (sans menu supérieur) */}
          <div className="relative flex items-center justify-center py-2">
            
            {/* Flèche Gauche */}
            <button
              onClick={handlePrevDoor}
              className="hidden sm:flex absolute left-0 lg:-left-12 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-[#8B4513] text-[#1C1917] hover:text-white border border-[#E7E5E4] shadow-lg items-center justify-center transition-all cursor-pointer transform hover:scale-105"
              title="Porte précédente"
              id="prev-door-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* CARTE UNIQUE FORMAT VIDÉO VERTICAL 9:16 */}
            <div
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              className="w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] transition-transform duration-150 ease-out select-none cursor-grab active:cursor-grabbing"
              style={{ transform: `translateX(${swipeOffset}px)` }}
            >
              <div 
                onClick={(e) => {
                  if (hasDraggedRef.current) {
                    hasDraggedRef.current = false;
                    return;
                  }
                  if ((e.target as HTMLElement).closest('button, a, input, textarea, .details-overlay')) {
                    return;
                  }
                  setIsDoorVideoPlaying(prev => !prev);
                }}
                className="group relative w-full h-full rounded-[2rem] sm:rounded-3xl overflow-hidden bg-[#1C1917] text-[#FFFFFF] shadow-2xl border border-stone-700/50 flex flex-col justify-between p-5 sm:p-6 cursor-pointer"
                id={`current-door-card-${currentDoor.id}`}
              >
                {/* 1. Média de fond : Vidéo OU Poster officiel */}
                {isDoorVideoPlaying ? (
                  <video
                    src={currentDoor.videoUrl}
                    poster={currentDoor.posterUrl}
                    autoPlay
                    loop
                    muted={isDoorMuted}
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={currentDoor.posterUrl} 
                    alt={currentDoor.label} 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                )}

                {/* Voile cinématographique */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50 pointer-events-none" />

                {/* HAUT : Cartouche sobre avec l'icône et le nom de la catégorie */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-sm">
                    <CurrentDoorIcon className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>{currentDoor.label}</span>
                  </div>

                  {/* Contrôle son discret en haut à droite uniquement quand la vidéo tourne */}
                  {isDoorVideoPlaying && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDoorMuted(!isDoorMuted);
                      }}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                      title={isDoorMuted ? 'Activer le son' : 'Couper le son'}
                    >
                      {isDoorMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                {/* CENTRE : BOUTON PLAY/PAUSE CENTRALISÉ SUR TOUTES LES VIDÉOS */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDoorVideoPlaying(!isDoorVideoPlaying);
                    }}
                    className={`pointer-events-auto group/btn relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl backdrop-blur-md ${
                      isDoorVideoPlaying
                        ? 'border border-[#C89B3C] ring-2 ring-[#C89B3C]/40 bg-black/60 shadow-[0_0_20px_rgba(200,155,60,0.6)]'
                        : 'border border-white/25 hover:border-[#C89B3C] hover:ring-2 hover:ring-[#C89B3C]/40 bg-black/45 hover:bg-black/65'
                    }`}
                    title={isDoorVideoPlaying ? 'Pause' : `Visionner la présentation ${currentDoor.label}`}
                    id={`play-door-btn-${currentDoor.id}`}
                  >
                    {isDoorVideoPlaying ? (
                      <Pause className="w-6 h-6 text-[#C89B3C] fill-[#C89B3C] transition-transform group-hover/btn:scale-110" />
                    ) : (
                      <Play className="w-6 h-6 text-[#C89B3C] fill-[#C89B3C] translate-x-0.5 transition-transform group-hover/btn:scale-115" />
                    )}
                  </button>
                </div>

                {/* BAS : UNIQUEMENT LES DEUX BOUTONS (SANS TEXTE SUPERFLU AU-DESSUS) */}
                <div className="relative z-10 flex items-center justify-between gap-2 pt-1">
                  {/* Bouton Avantages pour toutes les 8 portes : fond gris translucide -> marron au survol */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDoorAdvantages(true);
                    }}
                    className="px-4 py-2 rounded-full bg-white/20 hover:bg-[#8B4513] text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 border border-white/25 hover:border-transparent cursor-pointer shadow-md"
                    title="Découvrir les 5 avantages"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>Avantages</span>
                  </button>

                  {/* Bouton Choisir cette porte : fond gris translucide -> marron au survol */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSubjectIndex(0);
                      setStep(2);
                    }}
                    className="px-4 py-2 rounded-full bg-white/20 hover:bg-[#8B4513] text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md border border-white/25 hover:border-transparent cursor-pointer shrink-0"
                    title={currentDoor.actionDoorLabel}
                    id={`choose-door-btn-${currentDoor.id}`}
                  >
                    <span>{currentDoor.actionDoorLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* OVERLAY DES 5 AVANTAGES ESSENTIELS */}
                {showDoorAdvantages && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="details-overlay absolute inset-0 bg-black/92 backdrop-blur-md z-20 flex flex-col justify-between p-6 text-white animate-in fade-in duration-200"
                  >
                    <div className="space-y-4 overflow-y-auto max-h-[82%] pr-1">
                      <div className="flex items-center justify-between pb-2 border-b border-white/15">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#C89B3C]">
                          5 Avantages essentiels
                        </span>
                        <button
                          onClick={() => setShowDoorAdvantages(false)}
                          className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                          title="Fermer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="font-editorial text-lg font-bold text-white flex items-center gap-2">
                        <CurrentDoorIcon className="w-4 h-4 text-[#C89B3C]" />
                        <span>{currentDoor.label}</span>
                      </h4>

                      {/* 5 Avantages ultra-courts (1 ligne chacun) */}
                      <div className="space-y-2.5 pt-1">
                        {currentDoor.advantages.map((adv, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2.5 text-xs text-white/95">
                            <span className="w-4 h-4 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {aIdx + 1}
                            </span>
                            <p className="leading-snug">{adv}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setShowDoorAdvantages(false)}
                        className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                      >
                        Fermer
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowDoorAdvantages(false);
                          setSubjectIndex(0);
                          setStep(2);
                        }}
                        className="px-4 py-2 rounded-full bg-white/20 hover:bg-[#8B4513] text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 border border-white/25 hover:border-transparent"
                      >
                        <span>{currentDoor.actionDoorLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Flèche Droite */}
            <button
              onClick={handleNextDoor}
              className="hidden sm:flex absolute right-0 lg:-right-12 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-[#8B4513] text-[#1C1917] hover:text-white border border-[#E7E5E4] shadow-lg items-center justify-center transition-all cursor-pointer transform hover:scale-105"
              title="Porte suivante"
              id="next-door-btn"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* ÉTAPE 2 : CHOISIR LE SUJET / SOUS-CATÉGORIE DANS LA PORTE SÉLECTIONNÉE     */}
      {/* ========================================================================= */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* Rappel sobre de la Porte choisie & action changer de porte (sans menu de sous-catégories) */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">Porte choisie :</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#A2482B]/10 text-[#A2482B] text-xs font-bold border border-[#A2482B]/20">
                <CurrentDoorIcon className="w-3 h-3" />
                {currentDoor.label}
              </span>
            </div>
            <button
              onClick={() => {
                setStep(1);
                setIsSubjectVideoPlaying(false);
                setShowSubjectQuestion(false);
              }}
              className="text-xs text-[#A2482B] hover:text-[#8B3B20] font-semibold cursor-pointer underline"
            >
              Changer de porte
            </button>
          </div>

          {/* CONTENEUR DU SWIPE SUJET AVEC FLÈCHES LATÉRALES (sans chips/menu) */}
          <div className="relative flex items-center justify-center py-2">
            
            {/* Flèche précédente */}
            <button
              onClick={handlePrevSubject}
              aria-label="Sujet précédent"
              className="hidden sm:flex absolute left-0 lg:-left-12 z-20 w-11 h-11 rounded-full bg-white/95 border border-[#E7E5E4] text-[#1C1917] hover:bg-[#8B4513] hover:text-white items-center justify-center shadow-lg transition-all cursor-pointer transform hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* CARTE UNIQUE FORMAT VIDÉO VERTICAL AVEC SUPPORT DU SWIPE */}
            <div
              style={{ transform: `translateX(${subSwipeOffset}px)` }}
              onTouchStart={onSubTouchStart}
              onTouchMove={onSubTouchMove}
              onTouchEnd={onSubTouchEnd}
              onMouseDown={onSubMouseDown}
              onMouseMove={onSubMouseMove}
              onMouseUp={onSubMouseUp}
              className="relative w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] rounded-[2rem] sm:rounded-3xl overflow-hidden bg-[#1C1917] text-white shadow-2xl border border-stone-700/50 flex flex-col justify-between p-5 sm:p-6 transition-transform duration-150 ease-out select-none cursor-pointer"
              id={`current-subject-card-${currentSubject.id}`}
            >
              {/* Vidéo ou affiche officielle de fond */}
              {isSubjectVideoPlaying ? (
                <video
                  src={currentSubject.videoUrl}
                  poster={currentSubject.posterUrl}
                  autoPlay
                  loop
                  muted={isSubjectMuted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={currentSubject.posterUrl}
                  alt={currentSubject.title}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}

              {/* Voile cinématographique */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50 pointer-events-none" />

              {/* HAUT : Cartouche sobre du sujet & Son discret */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-sm">
                  <CurrentDoorIcon className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>{currentSubject.title}</span>
                </div>

                {isSubjectVideoPlaying && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSubjectMuted(!isSubjectMuted);
                    }}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                    title={isSubjectMuted ? 'Activer le son' : 'Couper le son'}
                  >
                    {isSubjectMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                )}
              </div>

              {/* CENTRE : BOUTON PLAY/PAUSE CENTRALISÉ */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSubjectVideoPlaying(!isSubjectVideoPlaying);
                  }}
                  className={`pointer-events-auto group/btn relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl backdrop-blur-md ${
                    isSubjectVideoPlaying
                      ? 'border border-[#C89B3C] ring-2 ring-[#C89B3C]/40 bg-black/60 shadow-[0_0_20px_rgba(200,155,60,0.6)]'
                      : 'border border-white/25 hover:border-[#C89B3C] hover:ring-2 hover:ring-[#C89B3C]/40 bg-black/45 hover:bg-black/65'
                  }`}
                  title={isSubjectVideoPlaying ? 'Pause' : `Visionner ${currentSubject.title}`}
                  id={`play-subject-btn-${currentSubject.id}`}
                >
                  {isSubjectVideoPlaying ? (
                    <Pause className="w-6 h-6 text-[#C89B3C] fill-[#C89B3C] transition-transform group-hover/btn:scale-110" />
                  ) : (
                    <Play className="w-6 h-6 text-[#C89B3C] fill-[#C89B3C] translate-x-0.5 transition-transform group-hover/btn:scale-115" />
                  )}
                </button>
              </div>

              {/* BAS : UNIQUEMENT LES DEUX BOUTONS (SYNOPSIS OU QUESTION + CHOISIR CE SUJET) SANS TEXTE FLOTTANT */}
              <div className="relative z-10 flex items-center justify-between gap-2 pt-1">
                {/* Cartouche SYNOPSIS (pour les Séries) ou QUESTION (pour les autres portes) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSubjectQuestion(true);
                  }}
                  className="px-4 py-2 rounded-full bg-white/20 hover:bg-[#8B4513] text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 border border-white/25 hover:border-transparent cursor-pointer shadow-md"
                  title={isSeries ? "Découvrir le synopsis de la série" : "Découvrir la question à laquelle répondre"}
                >
                  {isSeries ? (
                    <FileText className="w-3.5 h-3.5 text-[#C89B3C]" />
                  ) : (
                    <HelpCircle className="w-3.5 h-3.5 text-[#C89B3C]" />
                  )}
                  <span>{isSeries ? 'Synopsis' : 'Question'}</span>
                </button>

                {/* Bouton de choix contextualisé à fond gris translucide -> marron au survol */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setStep(3);
                  }}
                  className="px-4 py-2 rounded-full bg-white/20 hover:bg-[#8B4513] text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md border border-white/25 hover:border-transparent cursor-pointer shrink-0"
                  title={currentSubject.actionLabel}
                  id={`choose-subject-btn-${currentSubject.id}`}
                >
                  <span>{currentSubject.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* OVERLAY DU SYNOPSIS DE LA SÉRIE OU DE LA QUESTION DU SUJET */}
              {showSubjectQuestion && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="details-overlay absolute inset-0 bg-black/92 backdrop-blur-md z-20 flex flex-col justify-between p-6 text-white animate-in fade-in duration-200"
                >
                  <div className="space-y-4 overflow-y-auto max-h-[82%] pr-1">
                    <div className="flex items-center justify-between pb-2 border-b border-white/15">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#C89B3C]">
                        {isSeries ? 'Synopsis' : 'Question de témoignage'}
                      </span>
                      <button
                        onClick={() => setShowSubjectQuestion(false)}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                        title="Fermer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2 pt-1">
                      <span className="text-xs text-stone-400 font-medium">
                        {isSeries 
                          ? `Synopsis de ${currentSubject.title} :`
                          : `Pour votre contribution sur ${currentSubject.title} :`}
                      </span>
                      <p className={`font-editorial text-white leading-relaxed pt-1 ${
                        isSeries 
                          ? 'text-sm sm:text-base font-normal text-stone-200 not-italic' 
                          : 'text-lg font-medium italic'
                      }`}>
                        {isSeries 
                          ? (currentSubject.synopsis || currentSubject.subtitle) 
                          : `« ${currentSubject.question} »`}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSubjectQuestion(false)}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                    >
                      Fermer
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSubjectQuestion(false);
                        setStep(3);
                      }}
                      className="px-4 py-2 rounded-full bg-white/20 hover:bg-[#8B4513] text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 border border-white/25 hover:border-transparent"
                    >
                      <span>{currentSubject.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Flèche suivante */}
            <button
              onClick={handleNextSubject}
              aria-label="Sujet suivant"
              className="hidden sm:flex absolute right-0 lg:-right-12 z-20 w-11 h-11 rounded-full bg-white/95 border border-[#E7E5E4] text-[#1C1917] hover:bg-[#8B4513] hover:text-white items-center justify-center shadow-lg transition-all cursor-pointer transform hover:scale-105"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* ÉTAPE 3 : CHOISIR LE FORMAT VIDÉO PAR SWIPE & FORMULAIRE ÉPURÉ DÉDIÉ     */}
      {/* ========================================================================= */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* Récapitulatif discret du choix de la Porte et du Sujet */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E7E5E4] flex items-center justify-between gap-3 shadow-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#A2482B] uppercase tracking-wider">
                  {currentDoor.label}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs font-bold text-[#1C1917]">
                  {currentSubject.title}
                </span>
              </div>
              <p className="text-xs text-stone-500 italic line-clamp-1">
                {isSeries ? (currentSubject.synopsis || currentSubject.subtitle) : `« ${currentSubject.question} »`}
              </p>
            </div>
            <button
              onClick={() => {
                setChosenFlow(null);
                setStep(2);
              }}
              className="text-xs text-[#A2482B] hover:text-[#8B3B20] font-semibold underline cursor-pointer shrink-0"
            >
              Modifier
            </button>
          </div>

          {/* SOUS-ÉCRAN 1 : LE SWIPE VIDÉO ENTRE "J'AI MA VIDÉO" ET "ÊTRE FILMÉ" */}
          {!chosenFlow && (
            <div className="space-y-4">
              {/* Pagination discrète (1/2 J'ai ma vidéo • 2/2 Être filmé) */}
              <div className="flex items-center justify-between px-1">
                <span className="text-xs text-stone-500 font-medium">
                  {formatCardIndex === 0 ? "1/2 • Dépôt autonome de votre film" : "2/2 • Accompagnement par un cadreur"}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-1.5 rounded-full transition-all ${formatCardIndex === 0 ? 'bg-[#A2482B] w-6' : 'bg-stone-300'}`} />
                  <span className={`w-2.5 h-1.5 rounded-full transition-all ${formatCardIndex === 1 ? 'bg-[#A2482B] w-6' : 'bg-stone-300'}`} />
                </div>
              </div>

              {/* CONTENEUR DU SWIPE FORMAT AVEC FLÈCHES LATÉRALES */}
              <div className="relative flex items-center justify-center py-1">
                
                {/* Flèche précédente */}
                <button
                  onClick={handleToggleFormat}
                  aria-label="Format précédent"
                  className="hidden sm:flex absolute left-0 lg:-left-12 z-20 w-11 h-11 rounded-full bg-white/95 border border-[#E7E5E4] text-[#1C1917] hover:bg-[#8B4513] hover:text-white items-center justify-center shadow-lg transition-all cursor-pointer transform hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* CARTE UNIQUE FORMAT VIDÉO VERTICAL AVEC SUPPORT DU SWIPE */}
                <div
                  style={{ transform: `translateX(${fmtSwipeOffset}px)` }}
                  onTouchStart={onFmtTouchStart}
                  onTouchMove={onFmtTouchMove}
                  onTouchEnd={onFmtTouchEnd}
                  onMouseDown={onFmtMouseDown}
                  onMouseMove={onFmtMouseMove}
                  onMouseUp={onFmtMouseUp}
                  className="relative w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] rounded-[2rem] sm:rounded-3xl overflow-hidden bg-[#1C1917] text-white shadow-2xl border border-stone-700/50 flex flex-col justify-between p-5 sm:p-6 transition-transform duration-150 ease-out select-none cursor-pointer"
                  id={`current-format-card-${formatCardIndex}`}
                >
                  {/* Vidéo ou affiche officielle de fond selon le format */}
                  {isFormatVideoPlaying ? (
                    <video
                      src={formatCardIndex === 0 
                        ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" 
                        : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"}
                      poster={formatCardIndex === 0 
                        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                        : "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"}
                      autoPlay
                      loop
                      muted={isFormatMuted}
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={formatCardIndex === 0 
                        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                        : "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"}
                      alt={formatCardIndex === 0 ? "J'ai ma vidéo" : "Être filmé"}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                  )}

                  {/* Voile cinématographique */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/50 pointer-events-none" />

                  {/* Repères optiques de cadrage 9:16 subtils */}
                  <div className="absolute inset-3 border border-white/20 rounded-2xl pointer-events-none flex flex-col justify-between p-2">
                    <div className="flex justify-between text-[9px] font-mono text-[#C89B3C]/80">
                      <span>┌</span>
                      <span>┐</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-[#C89B3C]/80">
                      <span>└</span>
                      <span>┘</span>
                    </div>
                  </div>

                  {/* HAUT : Badge du format & Bouton Son */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-sm">
                      {formatCardIndex === 0 ? (
                        <>
                          <UploadCloud className="w-3.5 h-3.5 text-[#C89B3C]" />
                          <span>J'ai ma vidéo</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-3.5 h-3.5 text-[#C89B3C]" />
                          <span>Être filmé</span>
                        </>
                      )}
                    </div>

                    {isFormatVideoPlaying && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsFormatMuted(!isFormatMuted);
                        }}
                        className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                        title={isFormatMuted ? 'Activer le son' : 'Couper le son'}
                      >
                        {isFormatMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    )}
                  </div>

                  {/* CENTRE : BOUTON PLAY/PAUSE CENTRALISÉ */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFormatVideoPlaying(!isFormatVideoPlaying);
                      }}
                      className={`pointer-events-auto group/btn relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl backdrop-blur-md ${
                        isFormatVideoPlaying
                          ? 'border border-[#C89B3C] ring-2 ring-[#C89B3C]/40 bg-black/60 shadow-[0_0_20px_rgba(200,155,60,0.6)]'
                          : 'border border-white/25 hover:border-[#C89B3C] hover:ring-2 hover:ring-[#C89B3C]/40 bg-black/45 hover:bg-black/65'
                      }`}
                      title={isFormatVideoPlaying ? 'Pause' : 'Lire la vidéo explicative'}
                      id={`play-format-video-${formatCardIndex}`}
                    >
                      {isFormatVideoPlaying ? (
                        <Pause className="w-6 h-6 text-[#C89B3C] fill-[#C89B3C] transition-transform group-hover/btn:scale-110" />
                      ) : (
                        <Play className="w-6 h-6 text-[#C89B3C] fill-[#C89B3C] translate-x-0.5 transition-transform group-hover/btn:scale-115" />
                      )}
                    </button>
                  </div>

                  {/* BAS : BOUTON D'ACTION IMMÉDIAT (J'AI MA VIDÉO ou ÊTRE FILMÉ) */}
                  <div className="relative z-10 pt-2 flex flex-col gap-2">
                    <div className="text-center px-1">
                      <p className="text-[11px] text-stone-300/90 leading-snug">
                        {formatCardIndex === 0 
                          ? "Votre vidéo 9:16 déjà enregistrée, prête à être transmise."
                          : "Un cadreur partenaire se déplace pour enregistrer votre récit."}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (formatCardIndex === 0) {
                          setChosenFlow('UPLOAD_DIRECT');
                        } else {
                          setChosenFlow('REQUEST_CREW');
                        }
                      }}
                      className="w-full py-3 px-5 rounded-2xl bg-[#A2482B] hover:bg-[#8B3B20] text-white font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-black/40 border border-white/20 transition-all transform hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
                      id={`btn-select-format-${formatCardIndex}`}
                    >
                      <span>{formatCardIndex === 0 ? "J'ai ma vidéo" : "Être filmé"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* Flèche suivante */}
                <button
                  onClick={handleToggleFormat}
                  aria-label="Format suivant"
                  className="hidden sm:flex absolute right-0 lg:-right-12 z-20 w-11 h-11 rounded-full bg-white/95 border border-[#E7E5E4] text-[#1C1917] hover:bg-[#8B4513] hover:text-white items-center justify-center shadow-lg transition-all cursor-pointer transform hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

              </div>

              {/* Bouton de retour vers l'étape 2 (Choix du sujet) */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-xs font-medium text-[#1C1917] flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour aux sujets</span>
                </button>

                <button
                  onClick={handleToggleFormat}
                  className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                >
                  {formatCardIndex === 0 ? "Voir l'option « Être filmé »" : "Voir l'option « J'ai ma vidéo »"}
                </button>
              </div>
            </div>
          )}

          {/* SOUS-ÉCRAN 2A : J'AI MA VIDÉO -> TÉLÉCHARGER LA VIDÉO ET TRANSMETTRE (SIMPLE ET DIRECT) */}
          {chosenFlow === 'UPLOAD_DIRECT' && (
            <div className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#A2482B]/10 text-[#A2482B]">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-lg font-bold text-[#1C1917]">
                      Téléverser votre vidéo
                    </h3>
                    <p className="text-xs text-stone-500">
                      Format vertical 9:16 recommandé
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setChosenFlow(null)}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
                  title="Changer de choix"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Zone Drag & Drop ou Clic */}
              <div className="border-2 border-dashed border-stone-300 hover:border-[#A2482B] rounded-2xl p-8 text-center transition-all bg-stone-50/50 hover:bg-stone-50 group">
                <input
                  type="file"
                  id="direct-video-upload"
                  className="hidden"
                  accept="video/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadedFileName(e.target.files[0].name);
                    }
                  }}
                />
                <label htmlFor="direct-video-upload" className="cursor-pointer block space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#A2482B]/10 text-[#A2482B] group-hover:scale-110 flex items-center justify-center transition-transform">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#1C1917] block">
                      {uploadedFileName ? uploadedFileName : "Glissez-déposez votre vidéo ici, ou parcourez vos fichiers"}
                    </span>
                    <span className="text-xs text-stone-500 block mt-1">
                      MP4, MOV ou WebM jusqu'à 2 Go
                    </span>
                  </div>
                  {uploadedFileName && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      <span>Fichier prêt à être transmis</span>
                    </div>
                  )}
                </label>
              </div>

              {/* Actions : Retour / Transmettre */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setChosenFlow(null)}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-xs font-medium text-[#1C1917] flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>

                <button
                  disabled={!uploadedFileName}
                  onClick={() => setSubmittedSuccess(true)}
                  className={`px-7 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 shadow-sm ${
                    uploadedFileName
                      ? 'bg-[#A2482B] hover:bg-[#8B3B20] text-white cursor-pointer transform hover:scale-105'
                      : 'bg-stone-200 text-stone-400 opacity-60 cursor-not-allowed'
                  }`}
                  id="btn-upload-direct-submit"
                >
                  <span>Transmettre</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* SOUS-ÉCRAN 2B : ÊTRE FILMÉ -> FORMULAIRE SIMPLE POUR COORDONNÉES */}
          {chosenFlow === 'REQUEST_CREW' && (
            <div className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#A2482B]/10 text-[#A2482B]">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-lg font-bold text-[#1C1917]">
                      Être filmé(e) par un cadreur
                    </h3>
                    <p className="text-xs text-stone-500">
                      Nous vous mettons en relation avec un cinéaste partenaire
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setChosenFlow(null)}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
                  title="Changer de choix"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Formulaire simple de mise en relation */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Votre prénom & nom :
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Aïcha Diop"
                    value={videographerName}
                    onChange={(e) => setVideographerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs bg-white text-[#1C1917] outline-none focus:border-[#A2482B] focus:ring-1 focus:ring-[#A2482B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Ville ou région où vous êtes basé(e) :
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cotonou, Dakar, Abidjan, Bamako, Paris..."
                    value={videographerCity}
                    onChange={(e) => setVideographerCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs bg-white text-[#1C1917] outline-none focus:border-[#A2482B] focus:ring-1 focus:ring-[#A2482B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Téléphone (WhatsApp) ou adresse e-mail :
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: +221 77 000 00 00 ou contact@exemple.org"
                    value={videographerContact}
                    onChange={(e) => setVideographerContact(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs bg-white text-[#1C1917] outline-none focus:border-[#A2482B] focus:ring-1 focus:ring-[#A2482B]"
                  />
                </div>
              </div>

              {/* Actions : Retour / Valider la demande */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setChosenFlow(null)}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-xs font-medium text-[#1C1917] flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>

                <button
                  disabled={!videographerName.trim() || !videographerCity.trim() || !videographerContact.trim()}
                  onClick={() => setSubmittedSuccess(true)}
                  className={`px-7 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 shadow-sm ${
                    videographerName.trim() && videographerCity.trim() && videographerContact.trim()
                      ? 'bg-[#A2482B] hover:bg-[#8B3B20] text-white cursor-pointer transform hover:scale-105'
                      : 'bg-stone-200 text-stone-400 opacity-60 cursor-not-allowed'
                  }`}
                  id="btn-request-crew-submit"
                >
                  <span>Demander un tournage</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
