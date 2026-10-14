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
  BookOpen,
  Film,
  GalleryVerticalEnd,
  ScrollText,
  HandCoins,
  Building2,
  MessageSquare,
  Star,
  MapPin,
  Send,
  User,
  Calendar,
  ShieldCheck,
  Briefcase,
  Handshake
} from 'lucide-react';
import { ViewScreen, Videographer } from '../types';
import { PROPOSE_DOORS, ProposeDoor, ProposeSubject } from '../data/proposeDoorsData';
import { DOCUMENTARIES, VIDEOGRAPHERS } from '../data/mockData';
import { ALL_SERIES_TEAMS } from '../data/seriesTeamData';
import { EXPERTISE_ICONS } from './MatrixExplorer';
import { DimensionIcon } from './DimensionIcon';

// Illustrations d'accroche 9:16 créées par IA pour les deux choix en face-à-face
import uploadVideoGuideImg from '../assets/images/upload_video_guide_1791825848813.jpg';
import recruitVideographerImg from '../assets/images/recruit_videographer_1791825865262.jpg';

// Questions de présentation répondues par chaque cinéaste dans sa vidéo
const VIDEOGRAPHER_QUESTIONS: Record<string, { question: string; answer: string }> = {
  'vid-1': {
    question: "Comment votre regard capte-t-il la vérité et la lumière naturelle des récits de mémoire vivante ?",
    answer: "Je privilégie les plans fixes, le silence partagé et la lumière du matin pour laisser la parole se déployer sans filtre ni artifice."
  },
  'vid-2': {
    question: "Comment faites-vous résonner les cosmologies et savoirs ancestraux à travers l’image ?",
    answer: "Par une présence discrète et contemplative qui honore le rythme de la terre, des anciens et des gestes agricoles millénaires."
  },
  'vid-3': {
    question: "Quelle est votre approche pour immortaliser la spontanéité et la puissance des voix féminines ?",
    answer: "Une caméra portée vivante, au plus près du souffle et de l’énergie collective, qui célèbre la dignité et l’émotion pure."
  },
  'vid-4': {
    question: "Quel est votre secret pour filmer les matières et le geste d'artisanat d'exception ?",
    answer: "La recherche du clair-obscur naturel et le respect absolu de la texture, du geste de la main et de la matière vivante."
  }
};

// Visuels dédiés pour la présentation vidéo des sponsors & partenaires officiels
const SPONSOR_POSTERS: Record<string, string> = {
  'jesus-legba': 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
  'finagnon-qosqorico': 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=800&q=80',
  'blacks-one-beyond-eve': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  'dixeat-fiat-luxe': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  'investors-builders': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
};

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
  const initialDoorIndex = preselectedDocumentaryId 
    ? Math.max(0, PROPOSE_DOORS.findIndex(d => d.id === 'series')) 
    : 0;
  const [doorIndex, setDoorIndex] = useState(initialDoorIndex);
  const [isDoorVideoPlaying, setIsDoorVideoPlaying] = useState(false);
  const [isDoorMuted, setIsDoorMuted] = useState(true);
  const [showDoorAdvantages, setShowDoorAdvantages] = useState(false);

  // Subject selection (Étape 2)
  const [subjectIndex, setSubjectIndex] = useState(0);
  const [isSubjectVideoPlaying, setIsSubjectVideoPlaying] = useState(false);
  const [isSubjectMuted, setIsSubjectMuted] = useState(true);
  const [showSubjectQuestion, setShowSubjectQuestion] = useState(false);
  const [activeSeriesOverlay, setActiveSeriesOverlay] = useState<'episodes' | 'synopsis' | 'generique' | 'sponsors' | null>(null);
  const [activeEpisodeIndex, setActiveEpisodeIndex] = useState(0);
  const [isEpisodeVideoPlaying, setIsEpisodeVideoPlaying] = useState(false);
  const [isEpisodeMuted, setIsEpisodeMuted] = useState(false);
  const [isCreditsRolling, setIsCreditsRolling] = useState(true);
  const [activeTooltipCat, setActiveTooltipCat] = useState<string | null>(null);
  const creditsScrollRef = useRef<HTMLDivElement>(null);

  // Form submission (Étape 3)
  // Étape 3 : Choix du mode en face-à-face ("J'ai ma vidéo" vs "Recruter un vidéaste")
  const [chosenFlow, setChosenFlow] = useState<'UPLOAD_DIRECT' | 'BROWSE_VIDEOGRAPHERS' | null>(null);
  const [isChoiceAVideoPlaying, setIsChoiceAVideoPlaying] = useState(false);
  const [isChoiceBVideoPlaying, setIsChoiceBVideoPlaying] = useState(false);
  const [isChoiceAMuted, setIsChoiceAMuted] = useState(true);
  const [isChoiceBMuted, setIsChoiceBMuted] = useState(true);
  const [showDetailsA, setShowDetailsA] = useState(false);
  const [showDetailsB, setShowDetailsB] = useState(false);

  // Vidéastes (Parcours swipe et contact direct)
  const [activeVideographerIndex, setActiveVideographerIndex] = useState(0);
  const [isVideographerVideoPlaying, setIsVideographerVideoPlaying] = useState(false);
  const [isVideographerMuted, setIsVideographerMuted] = useState(true);
  const [contactingVideographer, setContactingVideographer] = useState<Videographer | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [contactDate, setContactDate] = useState('');
  const [contactLocation, setContactLocation] = useState('');
  const [contactUserPhone, setContactUserPhone] = useState('');
  const [contactUserName, setContactUserName] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [showingVideographerProfile, setShowingVideographerProfile] = useState<Videographer | null>(null);
  const [showingVideographerQuestion, setShowingVideographerQuestion] = useState<Videographer | null>(null);
  const [prestationType, setPrestationType] = useState<string>('recit');

  // Formulaire dépôt direct de vidéo
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [storySubmissionTitle, setStorySubmissionTitle] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Crédits de la séquence (Casting, Réalisation, Post-production)
  const [creditsCasting, setCreditsCasting] = useState('Moi-même (Témoin principal)');
  const [creditsDirector, setCreditsDirector] = useState('Alain Kpatoukpa');
  const [creditsPostProd, setCreditsPostProd] = useState('Sonia Dossou (Montage), Mathieu H. (Mixage son)');

  // Données courantes
  const currentDoor: ProposeDoor = PROPOSE_DOORS[doorIndex] || PROPOSE_DOORS[0];
  const currentSubject: ProposeSubject = currentDoor.subjects[subjectIndex] || currentDoor.subjects[0];
  const isSeries = currentDoor.id === 'series';
  const currentDoc = DOCUMENTARIES.find(d => d.id === currentSubject.id) || DOCUMENTARIES[0];
  const currentTeam = ALL_SERIES_TEAMS[currentSubject.id] || ALL_SERIES_TEAMS[currentSubject.id.replace('e-vivi', 'dixeat')] || ALL_SERIES_TEAMS['jesus-legba'];
  const docQuestions = currentDoc.questions || [];
  const totalEpisodes = docQuestions.length;
  const safeEpisodeIndex = Math.min(Math.max(0, activeEpisodeIndex), Math.max(0, Math.max(0, totalEpisodes - 1)));
  const currentEpisode = docQuestions[safeEpisodeIndex] || docQuestions[0];

  // Gestures pour l'Étape 3 (Swipe Vidéastes)
  const [vidTouchStartX, setVidTouchStartX] = useState<number | null>(null);
  const [vidTouchEndX, setVidTouchEndX] = useState<number | null>(null);
  const [vidMouseStartX, setVidMouseStartX] = useState<number | null>(null);
  const [isVidMouseDown, setIsVidMouseDown] = useState(false);
  const [vidSwipeOffset, setVidSwipeOffset] = useState(0);
  const vidHasDraggedRef = useRef(false);

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
    setActiveSeriesOverlay(null);
    setActiveEpisodeIndex(0);
    setIsEpisodeVideoPlaying(false);
    setIsCreditsRolling(true);
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
    setActiveSeriesOverlay(null);
    setActiveEpisodeIndex(0);
    setIsEpisodeVideoPlaying(false);
    setIsCreditsRolling(true);
  };
  const handleNextSubject = () => goToSubject(subjectIndex + 1);
  const handlePrevSubject = () => goToSubject(subjectIndex - 1);

  // Défilement automatique du générique simulé
  useEffect(() => {
    if (activeSeriesOverlay !== 'generique' || !isCreditsRolling) return;
    const interval = setInterval(() => {
      if (creditsScrollRef.current) {
        const el = creditsScrollRef.current;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
          el.scrollTop = 0;
        } else {
          el.scrollTop += 1;
        }
      }
    }, 35);
    return () => clearInterval(interval);
  }, [activeSeriesOverlay, isCreditsRolling]);

  // Swipe Vidéastes (Étape 3)
  const handleNextVideographer = () => {
    setActiveVideographerIndex(prev => (prev + 1) % VIDEOGRAPHERS.length);
    setIsVideographerVideoPlaying(false);
  };
  const handlePrevVideographer = () => {
    setActiveVideographerIndex(prev => (prev - 1 + VIDEOGRAPHERS.length) % VIDEOGRAPHERS.length);
    setIsVideographerVideoPlaying(false);
  };

  const onVidTouchStart = (e: React.TouchEvent) => {
    vidHasDraggedRef.current = false;
    setVidTouchEndX(null);
    setVidTouchStartX(e.targetTouches[0].clientX);
  };
  const onVidTouchMove = (e: React.TouchEvent) => {
    setVidTouchEndX(e.targetTouches[0].clientX);
    if (vidTouchStartX !== null) {
      const diff = e.targetTouches[0].clientX - vidTouchStartX;
      if (Math.abs(diff) > 8) vidHasDraggedRef.current = true;
      setVidSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
    }
  };
  const onVidTouchEnd = () => {
    setVidSwipeOffset(0);
    if (!vidTouchStartX || !vidTouchEndX) return;
    const distance = vidTouchStartX - vidTouchEndX;
    if (distance > minSwipeDistance) handleNextVideographer();
    else if (distance < -minSwipeDistance) handlePrevVideographer();
  };

  const onVidMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, video, input, label')) return;
    vidHasDraggedRef.current = false;
    setIsVidMouseDown(true);
    setVidMouseStartX(e.clientX);
  };
  const onVidMouseMove = (e: React.MouseEvent) => {
    if (!isVidMouseDown || vidMouseStartX === null) return;
    const diff = e.clientX - vidMouseStartX;
    if (Math.abs(diff) > 8) vidHasDraggedRef.current = true;
    setVidSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
  };
  const onVidMouseUp = (e: React.MouseEvent) => {
    if (!isVidMouseDown) return;
    setIsVidMouseDown(false);
    setVidSwipeOffset(0);
    if (vidMouseStartX === null) return;
    const distance = vidMouseStartX - e.clientX;
    if (distance > minSwipeDistance) handleNextVideographer();
    else if (distance < -minSwipeDistance) handlePrevVideographer();
    setVidMouseStartX(null);
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
      } else if (step === 3 && chosenFlow === 'BROWSE_VIDEOGRAPHERS') {
        if (e.key === 'ArrowRight') handleNextVideographer();
        else if (e.key === 'ArrowLeft') handlePrevVideographer();
        else if (e.key === 'Escape') {
          setChosenFlow(null);
          setIsVideographerVideoPlaying(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, doorIndex, subjectIndex, currentDoor, chosenFlow, activeVideographerIndex]);

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
              {chosenFlow === 'UPLOAD_DIRECT' ? `Vidéo transmise (${uploadedFileName})` : `Mise en relation cinéaste (${VIDEOGRAPHERS[activeVideographerIndex]?.name || 'Sur site'})`}
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
    <div className={`max-w-3xl mx-auto px-3 sm:px-6 py-2 sm:py-4 pb-20 sm:pb-24 pt-safe pb-safe overflow-x-hidden ${step === 3 && chosenFlow === 'UPLOAD_DIRECT' ? 'min-h-[100dvh] flex flex-col' : 'h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between'} text-[#1C1917]`}>
      
      {/* En-tête dynamique du Studio : Choix progressifs validés (Porte, Sujet, Format) avec bouton Modifier */}
      <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-2 sm:pb-2.5 shrink-0 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-1">
          {step === 1 ? (
            /* Étape 1 : En-tête épuré et sobre - Juste Studio strictement calibré sur Coproduction */
            <div className="flex items-center gap-2">
              <h1 className="font-editorial text-lg sm:text-2xl font-bold text-[#1C1917] tracking-tight">
                Studio
              </h1>
            </div>
          ) : step === 2 ? (
            /* Étape 2 : La porte choisie apparaît ici dans le header avec son bouton Modifier */
            <div className="flex items-center gap-2 min-w-0 flex-wrap">
              <div className="inline-flex items-center h-7 px-3 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/60 text-white shadow-xs text-[10.5px] sm:text-xs font-semibold shrink-0">
                <span className="truncate max-w-[140px] sm:max-w-[220px]">{currentDoor.label}</span>
              </div>
              <button
                onClick={() => {
                  setStep(1);
                  setIsSubjectVideoPlaying(false);
                  setShowSubjectQuestion(false);
                  setActiveSeriesOverlay(null);
                }}
                id="header-edit-door-btn"
                className="h-6.5 px-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-[#A2482B] hover:text-[#8B3B20] text-[10.5px] sm:text-xs font-semibold border border-stone-200/90 transition-colors cursor-pointer shrink-0"
                title="Modifier la porte choisie"
              >
                Modifier
              </button>
            </div>
          ) : step === 3 && !chosenFlow ? (
            /* Étape 3 (diptyque) : La porte et le sujet choisi apparaissent dans le header avec bouton Modifier */
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-wrap">
              <div className="inline-flex items-center h-7 px-3 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/60 text-white shadow-xs text-[10.5px] sm:text-xs font-semibold shrink-0">
                <span className="truncate max-w-[110px] sm:max-w-[170px]">{currentDoor.label}</span>
              </div>
              <span className="text-stone-300 shrink-0">•</span>
              <span className="font-sans text-[11px] sm:text-xs font-bold text-[#1C1917] truncate max-w-[120px] sm:max-w-[200px]">
                {currentSubject.title}
              </span>
              <button
                onClick={() => {
                  setStep(2);
                  setIsChoiceAVideoPlaying(false);
                  setIsChoiceBVideoPlaying(false);
                  setIsVideographerVideoPlaying(false);
                }}
                id="header-edit-subject-btn"
                className="h-6.5 px-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-[#A2482B] hover:text-[#8B3B20] text-[10.5px] sm:text-xs font-semibold border border-stone-200/90 transition-colors cursor-pointer shrink-0"
                title="Modifier la série choisie"
              >
                Modifier
              </button>
            </div>
          ) : (
            /* Étape 3 (choix validé : J'ai ma vidéo ou Recruter un vidéaste) avec son bouton Modifier à côté */
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-wrap">
              <div className="inline-flex items-center h-7 px-3 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/60 text-white shadow-xs text-[10.5px] sm:text-xs font-semibold shrink-0">
                <span className="truncate max-w-[90px] sm:max-w-[140px]">{currentDoor.label}</span>
              </div>
              <span className="text-stone-300 shrink-0">•</span>
              <button
                onClick={() => {
                  setChosenFlow(null);
                  setIsChoiceAVideoPlaying(false);
                  setIsChoiceBVideoPlaying(false);
                  setIsVideographerVideoPlaying(false);
                  setStep(2);
                }}
                className="font-sans text-[11px] sm:text-xs font-bold text-[#1C1917] hover:text-[#A2482B] transition-colors truncate max-w-[110px] sm:max-w-[180px] cursor-pointer"
                title="Revenir au choix de la série"
              >
                {currentSubject.title}
              </button>
              <span className="text-stone-300 shrink-0">•</span>
              <span className="font-sans text-[11px] sm:text-xs font-bold text-[#1C1917] truncate max-w-[140px] sm:max-w-[200px]">
                {chosenFlow === 'UPLOAD_DIRECT' ? "J'ai ma vidéo" : "Recruter un vidéaste"}
              </span>
              <button
                onClick={() => {
                  setChosenFlow(null);
                  setIsVideographerVideoPlaying(false);
                  setIsChoiceAVideoPlaying(false);
                  setIsChoiceBVideoPlaying(false);
                }}
                id="header-edit-choice-btn"
                className="h-6.5 px-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-[#A2482B] hover:text-[#8B3B20] text-[10.5px] sm:text-xs font-semibold border border-stone-200/90 transition-colors cursor-pointer shrink-0"
                title="Modifier le choix et revenir à la sélection"
              >
                Modifier
              </button>
            </div>
          )}
        </div>

        {/* Côté droit épuré : Raccourci retour si applicable */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {preselectedDocumentaryId && (
            <button
              onClick={() => onNavigate({ type: 'duo_feed' })}
              className="text-[11px] sm:text-xs text-stone-500 hover:text-stone-900 font-medium underline cursor-pointer shrink-0"
              title="Revenir aux duos"
            >
              Quitter
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ÉTAPE 1 : CHOISIR PARMI LES 8 PORTES D'ENTRÉE (SWIPE VERTICAL PUR 9:16)     */}
      {/* ========================================================================= */}
      {step === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center py-1 sm:py-2 min-h-0 overflow-visible px-2 sm:px-6 md:px-10 animate-in fade-in duration-200">
          
          {/* Conteneur de l'écran 9:16 avec swipe et flèches */}
          <div className="relative w-full flex-1 flex items-center justify-center min-h-0">
            
            {/* Flèche Gauche */}
            <button
              onClick={handlePrevDoor}
              className="hidden sm:flex absolute left-2 sm:left-4 lg:left-6 z-20 w-11 h-11 rounded-full shrink-0 bg-white/95 hover:bg-[#A2482B] text-[#1C1917] hover:text-white border border-[#E7E5E4] hover:border-[#A2482B] shadow-xl items-center justify-center transition-all cursor-pointer transform hover:scale-105 active:scale-95"
              title="Porte précédente"
              id="prev-door-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* CARTE UNIQUE FORMAT VIDÉO VERTICAL 9:16 STRICTEMENT IDENTIQUE À LA PAGE DUOS */}
            <div
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              className="aspect-[9/16] w-[min(340px,calc((100dvh-200px)*9/16))] h-[min(604px,calc(100dvh-200px))] max-w-[calc(100vw-28px)] mx-auto transition-transform duration-150 ease-out select-none cursor-grab active:cursor-grabbing flex justify-center shrink-0"
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
                className="group relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-[#FFFFFF] shadow-2xl border border-stone-200/80 flex flex-col justify-between p-2.5 sm:p-4.5 cursor-pointer select-none"
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
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-200"
                  />
                )}

                {/* Voile cinématographique harmonisé (modèle Coproduction : plus lumineux et clair) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />

                {/* HAUT : Cartouche sobre avec le nom de la porte (sans icône, sans couleur) */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold text-white shadow-sm tracking-wide">
                    <span>{currentDoor.label}</span>
                  </div>

                  {/* Contrôle son discret en haut à droite uniquement quand la vidéo tourne */}
                  {isDoorVideoPlaying && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDoorMuted(!isDoorMuted);
                      }}
                      className="p-1.5 rounded-full bg-black/60 hover:bg-[#A2482B] text-white backdrop-blur-md border border-white/15 hover:border-[#A2482B] transition-colors cursor-pointer"
                      title={isDoorMuted ? 'Activer le son' : 'Couper le son'}
                    >
                      {isDoorMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
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
                    className={`pointer-events-auto group/btn relative w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl backdrop-blur-md ${
                      isDoorVideoPlaying
                        ? 'border border-white/40 ring-2 ring-white/20 bg-black/60 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                        : 'border border-white/25 hover:border-white hover:ring-2 hover:ring-white/30 bg-black/45 hover:bg-black/65'
                    }`}
                    title={isDoorVideoPlaying ? 'Pause' : `Visionner la présentation ${currentDoor.label}`}
                    id={`play-door-btn-${currentDoor.id}`}
                  >
                    {isDoorVideoPlaying ? (
                      <Pause className="w-5 h-5 text-white fill-white transition-transform group-hover/btn:scale-110" />
                    ) : (
                      <Play className="w-5 h-5 text-white fill-white translate-x-0.5 transition-transform group-hover/btn:scale-115" />
                    )}
                  </button>
                </div>

                {/* BAS : BOUTONS ADAPTÉS SANS DÉBORDEMENT (STYLE HARMONISÉ AVEC OPACITÉ BASSE ET TEXTE BLANC) */}
                <div className="relative z-10 flex items-center justify-between gap-1.5 pt-0.5">
                  {/* Bouton Avantages */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDoorAdvantages(true);
                    }}
                    className="h-7.5 sm:h-8.5 px-3.5 sm:px-4 rounded-full bg-black/60 hover:bg-[#A2482B] active:bg-[#8A3B22] text-white text-[11px] sm:text-xs font-semibold backdrop-blur-md transition-all flex items-center justify-center border border-white/20 hover:border-[#A2482B] cursor-pointer shadow-md active:scale-95 shrink-0"
                    title="Découvrir les 5 avantages"
                  >
                    <span>Avantages</span>
                  </button>

                  {/* Bouton Choisir cette porte : même fond que le titre, terre cuite au survol et validation */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSubjectIndex(0);
                      setStep(2);
                    }}
                    className="h-7.5 sm:h-8.5 px-3.5 sm:px-4 rounded-full bg-black/60 hover:bg-[#A2482B] active:bg-[#8A3B22] text-white text-[11px] sm:text-xs font-bold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md border border-white/20 hover:border-[#A2482B] cursor-pointer active:scale-95 group/btn shrink-0"
                    title={currentDoor.actionDoorLabel}
                    id={`choose-door-btn-${currentDoor.id}`}
                  >
                    <span>{currentDoor.actionDoorLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/90 group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
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
                        className="px-4 py-2 rounded-full bg-white/20 hover:bg-[#A2482B] text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 border border-white/25 hover:border-transparent"
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
              className="hidden sm:flex absolute right-2 sm:right-4 lg:right-6 z-20 w-11 h-11 rounded-full shrink-0 bg-white/95 hover:bg-[#A2482B] text-[#1C1917] hover:text-white border border-[#E7E5E4] hover:border-[#A2482B] shadow-xl items-center justify-center transition-all cursor-pointer transform hover:scale-105 active:scale-95"
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
        <div className="flex-1 flex flex-col items-center justify-center py-1 sm:py-2 min-h-0 overflow-visible px-2 sm:px-6 md:px-10 animate-in fade-in duration-200">
          
          {/* CONTENEUR DU SWIPE SUJET AVEC FLÈCHES LATÉRALES */}
          <div className="relative w-full flex-1 flex items-center justify-center min-h-0">
            
            {/* Flèche précédente */}
            <button
              onClick={handlePrevSubject}
              aria-label="Sujet précédent"
              className="hidden sm:flex absolute left-2 sm:left-4 lg:left-6 z-20 w-11 h-11 rounded-full bg-white/95 border border-[#E7E5E4] hover:border-[#A2482B] text-[#1C1917] hover:bg-[#A2482B] hover:text-white items-center justify-center shadow-xl transition-all cursor-pointer transform hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* CARTE UNIQUE FORMAT VIDÉO VERTICAL : STYLE COLORÉ DÉDIÉ À LA CATÉGORIE */}
            <div
              style={{ 
                transform: `translateX(${subSwipeOffset}px)`
              }}
              onTouchStart={onSubTouchStart}
              onTouchMove={onSubTouchMove}
              onTouchEnd={onSubTouchEnd}
              onMouseDown={onSubMouseDown}
              onMouseMove={onSubMouseMove}
              onMouseUp={onSubMouseUp}
              className="aspect-[9/16] w-[min(340px,calc((100dvh-200px)*9/16))] h-[min(604px,calc(100dvh-200px))] max-w-[calc(100vw-28px)] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-[#121110] text-white shadow-2xl flex flex-col justify-between p-2.5 sm:p-4.5 transition-transform duration-150 ease-out select-none cursor-pointer shrink-0 relative"
              id={`current-subject-card-${currentSubject.id}`}
            >
              {/* Bordure discrète et neutre */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl border border-white/10" />

              {/* Vidéo ou affiche officielle de fond selon le mode actif */}
              {isSubjectVideoPlaying ? (
                <video
                  src={
                    isSeries && activeSeriesOverlay === 'episodes'
                      ? (currentEpisode?.videoAvatarUrl || currentEpisode?.videoUrl || currentSubject.videoUrl)
                      : isSeries && activeSeriesOverlay === 'sponsors'
                      ? (currentTeam.producers?.[0]?.videoPresentationUrl || currentSubject.videoUrl)
                      : currentSubject.videoUrl
                  }
                  poster={
                    isSeries && activeSeriesOverlay === 'episodes'
                      ? (currentEpisode?.posterUrl || currentSubject.posterUrl)
                      : isSeries && activeSeriesOverlay === 'sponsors'
                      ? (SPONSOR_POSTERS[currentSubject.id] || SPONSOR_POSTERS['jesus-legba'])
                      : currentSubject.posterUrl
                  }
                  autoPlay
                  loop
                  muted={isSubjectMuted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={
                    isSeries && activeSeriesOverlay === 'episodes'
                      ? (currentEpisode?.posterUrl || currentSubject.posterUrl)
                      : isSeries && activeSeriesOverlay === 'sponsors'
                      ? (SPONSOR_POSTERS[currentSubject.id] || SPONSOR_POSTERS['jesus-legba'])
                      : currentSubject.posterUrl
                  }
                  alt={currentSubject.title}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}

              {/* Voile cinématographique */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/35 pointer-events-none" />

              {/* HAUT : Titre épuré de la série ou du sujet (modèle fond noir translucide, texte blanc pur) */}
              <div className="relative z-10 flex items-center justify-between gap-1.5">
                {activeSeriesOverlay !== 'sponsors' ? (
                  <div className="flex items-center gap-1.5">
                    <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold text-white shadow-md tracking-wide">
                      <span>{currentSubject.title}</span>
                    </div>
                  </div>
                ) : (
                  <div />
                )}

                {isSubjectVideoPlaying && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSubjectMuted(!isSubjectMuted);
                    }}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-[#A2482B] text-white backdrop-blur-md border border-white/15 hover:border-[#A2482B] transition-colors cursor-pointer shrink-0"
                    title={isSubjectMuted ? 'Activer le son' : 'Couper le son'}
                  >
                    {isSubjectMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
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
                  className={`pointer-events-auto group/btn relative w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl backdrop-blur-md ${
                    isSubjectVideoPlaying
                      ? 'border border-white/40 ring-2 ring-white/20 bg-black/60 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                      : 'border border-white/25 hover:border-white hover:ring-2 hover:ring-white/30 bg-black/45 hover:bg-black/65'
                  }`}
                  title={isSubjectVideoPlaying ? 'Pause' : `Visionner la vidéo`}
                  id={`play-subject-btn-${currentSubject.id}`}
                >
                  {isSubjectVideoPlaying ? (
                    <Pause className="w-5 h-5 text-white fill-white transition-transform group-hover/btn:scale-110" />
                  ) : (
                    <Play className="w-5 h-5 text-white fill-white translate-x-0.5 transition-transform group-hover/btn:scale-115" />
                  )}
                </button>
              </div>

              {/* ================================================================= */}
              {/* 3 BOUTONS SUR LE CÔTÉ DROIT DE LA VIDÉO (STYLE PROFIL)            */}
              {/* 1. Épisodes (GalleryVerticalEnd)                                  */}
              {/* 2. Générique (ScrollText)                                         */}
              {/* 3. Sponsors (HandCoins)                                           */}
              {/* ================================================================= */}
              {isSeries && (
                <div 
                  className={`absolute right-3 sm:right-4 top-[64%] -translate-y-1/2 z-30 flex flex-col items-center gap-2.5 sm:gap-3 transition-all duration-300 pointer-events-auto ${
                    isSubjectVideoPlaying ? 'opacity-75 hover:opacity-100' : 'opacity-100'
                  }`}
                >
                  {/* 1. Épisodes */}
                  <div className="relative group/sb flex items-center">
                    <div 
                      className={`absolute right-11 top-1/2 -translate-y-1/2 z-40 pointer-events-none transition-all duration-200 ${
                        activeTooltipCat === 'episodes' 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-1 group-hover/sb:opacity-100 group-hover/sb:translate-x-0'
                      }`}
                    >
                      <div className="px-2.5 py-1 rounded-lg bg-black/90 text-white text-[10.5px] font-semibold whitespace-nowrap shadow-xl border border-white/15">
                        Épisodes
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activeSeriesOverlay === 'episodes') {
                          setActiveSeriesOverlay(null);
                        } else {
                          setActiveSeriesOverlay('episodes');
                          setIsSubjectVideoPlaying(true);
                        }
                        setActiveTooltipCat(prev => prev === 'episodes' ? null : 'episodes');
                      }}
                      onMouseEnter={() => setActiveTooltipCat('episodes')}
                      onMouseLeave={() => setActiveTooltipCat(null)}
                      id={`btn-series-episodes-${currentSubject.id}`}
                      title="Découvrir les épisodes"
                      className={`w-9 h-9 rounded-xl backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md active:scale-90 ${
                        activeSeriesOverlay === 'episodes'
                          ? 'bg-[#A2482B] border border-[#A2482B] text-white scale-105 shadow-[0_2px_12px_rgba(162,72,43,0.45)]'
                          : 'bg-black/55 hover:bg-[#A2482B] border border-white/20 hover:border-[#A2482B] text-white'
                      }`}
                    >
                      <GalleryVerticalEnd className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>

                  {/* 2. Générique */}
                  <div className="relative group/sb flex items-center">
                    <div 
                      className={`absolute right-11 top-1/2 -translate-y-1/2 z-40 pointer-events-none transition-all duration-200 ${
                        activeTooltipCat === 'generique' 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-1 group-hover/sb:opacity-100 group-hover/sb:translate-x-0'
                      }`}
                    >
                      <div className="px-2.5 py-1 rounded-lg bg-black/90 text-white text-[10.5px] font-semibold whitespace-nowrap shadow-xl border border-white/15">
                        Générique
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSubjectVideoPlaying(false);
                        setActiveSeriesOverlay(prev => prev === 'generique' ? null : 'generique');
                        setActiveTooltipCat(prev => prev === 'generique' ? null : 'generique');
                      }}
                      onMouseEnter={() => setActiveTooltipCat('generique')}
                      onMouseLeave={() => setActiveTooltipCat(null)}
                      id={`btn-series-generique-${currentSubject.id}`}
                      title="Générique officiel"
                      className={`w-9 h-9 rounded-xl backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md active:scale-90 ${
                        activeSeriesOverlay === 'generique'
                          ? 'bg-[#A2482B] border border-[#A2482B] text-white scale-105 shadow-[0_2px_12px_rgba(162,72,43,0.45)]'
                          : 'bg-black/55 hover:bg-[#A2482B] border border-white/20 hover:border-[#A2482B] text-white'
                      }`}
                    >
                      <ScrollText className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>

                  {/* 3. Sponsors */}
                  <div className="relative group/sb flex items-center">
                    <div 
                      className={`absolute right-11 top-1/2 -translate-y-1/2 z-40 pointer-events-none transition-all duration-200 ${
                        activeTooltipCat === 'sponsors' 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-1 group-hover/sb:opacity-100 group-hover/sb:translate-x-0'
                      }`}
                    >
                      <div className="px-2.5 py-1 rounded-lg bg-black/90 text-white text-[10.5px] font-semibold whitespace-nowrap shadow-xl border border-white/15">
                        Sponsors
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activeSeriesOverlay === 'sponsors') {
                          setActiveSeriesOverlay(null);
                        } else {
                          setActiveSeriesOverlay('sponsors');
                          setIsSubjectVideoPlaying(true);
                        }
                        setActiveTooltipCat(prev => prev === 'sponsors' ? null : 'sponsors');
                      }}
                      onMouseEnter={() => setActiveTooltipCat('sponsors')}
                      onMouseLeave={() => setActiveTooltipCat(null)}
                      id={`btn-series-sponsors-${currentSubject.id}`}
                      title="Sponsors & Partenaires"
                      className={`w-9 h-9 rounded-xl backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md active:scale-90 ${
                        activeSeriesOverlay === 'sponsors'
                          ? 'bg-[#A2482B] border border-[#A2482B] text-white scale-105 shadow-[0_2px_12px_rgba(162,72,43,0.45)]'
                          : 'bg-black/55 hover:bg-[#A2482B] border border-white/20 hover:border-[#A2482B] text-white'
                      }`}
                    >
                      <HandCoins className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>
                </div>
              )}

              {/* BAS : BOUTONS ÉPURÉS HARMONISÉS (MÊME FOND NOIR TRANSLUCIDE QUE LE TITRE, TERRE CUITE AU SURVOL ET À LA VALIDATION) */}
              {isSeries ? (
                <div className="relative z-10 flex items-center justify-end gap-1.5 pt-0.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStep(3);
                      setChosenFlow(null);
                    }}
                    className="h-7.5 sm:h-8.5 px-3.5 sm:px-4 rounded-full bg-black/60 hover:bg-[#A2482B] active:bg-[#8A3B22] text-white text-[11px] sm:text-xs font-bold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md border border-white/20 hover:border-[#A2482B] cursor-pointer active:scale-95 group/btn shrink-0"
                    title="Choisir cette série"
                    id={`choose-subject-btn-${currentSubject.id}`}
                  >
                    <span>Choisir cette série</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/90 group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
                  </button>
                </div>
              ) : (
                <div className="relative z-10 flex items-center justify-between gap-1.5 pt-0.5">
                  {/* Bouton Question : Même fond noir translucide que le titre, terre cuite au survol */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSubjectQuestion(true);
                    }}
                    className="h-7.5 sm:h-8.5 px-3.5 sm:px-4 rounded-full bg-black/60 hover:bg-[#A2482B] active:bg-[#8A3B22] text-white text-[11px] sm:text-xs font-semibold backdrop-blur-md transition-all flex items-center justify-center border border-white/20 hover:border-[#A2482B] cursor-pointer shadow-md active:scale-95 shrink-0"
                    title="Découvrir la question"
                  >
                    <span>Question</span>
                  </button>

                  {/* Bouton Choisir ce sujet : Même fond noir translucide que le titre, terre cuite au survol et validation */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStep(3);
                      setChosenFlow(null);
                    }}
                    className="h-7.5 sm:h-8.5 px-3.5 sm:px-4 rounded-full bg-black/60 hover:bg-[#A2482B] active:bg-[#8A3B22] text-white text-[11px] sm:text-xs font-bold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md border border-white/20 hover:border-[#A2482B] cursor-pointer active:scale-95 group/btn shrink-0"
                    title={currentSubject.actionLabel}
                    id={`choose-subject-btn-${currentSubject.id}`}
                  >
                    <span>{currentSubject.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/90 group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
                  </button>
                </div>
              )}

              {/* OVERLAY : GÉNÉRIQUE OFFICIEL CINÉMATOGRAPHIQUE (CONSERVÉ COMME VALIDÉ PAR L'UTILISATEUR) */}
              {activeSeriesOverlay === 'generique' && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="details-overlay absolute inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col justify-between p-3.5 sm:p-5 text-white animate-in fade-in duration-200"
                >
                  {/* Fond vidéo discret simulé en boucle */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                    <video
                      src={currentSubject.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover scale-105 filter blur-xs"
                    />
                    <div className="absolute inset-0 bg-black/70" />
                  </div>

                  {/* En-tête */}
                  <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/15 shrink-0">
                    <div className="flex items-center gap-2">
                      <ScrollText className="w-4 h-4 text-[#C89B3C]" />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#C89B3C]">
                        Générique officiel
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setIsCreditsRolling(!isCreditsRolling)}
                        className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[10px] text-stone-300 font-medium cursor-pointer transition-colors"
                        title={isCreditsRolling ? 'Mettre en pause le défilement' : 'Relancer le défilement'}
                      >
                        {isCreditsRolling ? 'Pause' : 'Défiler'}
                      </button>
                      <button
                        onClick={() => setActiveSeriesOverlay(null)}
                        className="p-1 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                        title="Fermer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* DÉFILEMENT DU GÉNÉRIQUE SIMULÉ */}
                  <div
                    ref={creditsScrollRef}
                    className="relative z-10 flex-1 my-3 overflow-y-auto pr-1 space-y-6 text-center select-none scroll-smooth py-4"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    <div className="space-y-1 pt-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400">
                        YONYWOOD PRÉSENTE
                      </span>
                      <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white tracking-wide">
                        {currentSubject.title}
                      </h3>
                      <p className="text-xs text-stone-300 italic max-w-xs mx-auto">
                        {currentSubject.subtitle}
                      </p>
                    </div>

                    <div className="w-12 h-px bg-white/20 mx-auto" />

                    {/* Conception & Auteur */}
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase tracking-widest text-[#C89B3C] font-semibold">
                        Conception & Idée Originale
                      </div>
                      <div className="font-editorial text-base sm:text-lg font-bold text-white">
                        {currentTeam.author?.name || 'Romeo Nonvide'}
                      </div>
                      {currentTeam.author?.bio && (
                        <div className="text-[11px] text-stone-400 italic max-w-xs mx-auto">
                          {currentTeam.author.bio}
                        </div>
                      )}
                    </div>

                    {/* Scénario & Recherche */}
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase tracking-widest text-[#C89B3C] font-semibold">
                        Scénario & Anthropologie
                      </div>
                      <div className="font-editorial text-base sm:text-lg font-bold text-white">
                        {currentTeam.screenwriter?.name || 'Dieudonné Dossou'}
                      </div>
                      {currentTeam.screenwriter?.bio && (
                        <div className="text-[11px] text-stone-400 italic max-w-xs mx-auto">
                          {currentTeam.screenwriter.bio}
                        </div>
                      )}
                    </div>

                    {/* Réalisation */}
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase tracking-widest text-[#C89B3C] font-semibold">
                        Réalisation & Cadre 9:16
                      </div>
                      <div className="font-editorial text-base sm:text-lg font-bold text-white">
                        {currentTeam.director?.name || 'Alain Kpatoukpa'}
                      </div>
                      {currentTeam.director?.bio && (
                        <div className="text-[11px] text-stone-400 italic max-w-xs mx-auto">
                          {currentTeam.director.bio}
                        </div>
                      )}
                    </div>

                    <div className="w-12 h-px bg-white/20 mx-auto" />

                    {/* Collège des Producteurs - NOMS SEULEMENT (AUCUN MONTANT D'INVESTISSEMENT) */}
                    <div className="space-y-2">
                      <div className="text-[10px] uppercase tracking-widest text-[#C89B3C] font-semibold">
                        Collège des Producteurs Citoyens
                      </div>
                      <div className="space-y-1.5">
                        {currentTeam.producers && currentTeam.producers.length > 0 ? (
                          currentTeam.producers.map((prod) => (
                            <div key={prod.id} className="text-xs sm:text-sm font-medium text-white/95">
                              <span>{prod.name}</span>
                              {prod.roleTitle && (
                                <span className="text-[11px] text-stone-400 font-normal"> — {prod.roleTitle}</span>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-stone-400">Collectif des producteurs YonyWood</div>
                        )}
                      </div>
                    </div>

                    {/* Diffusion & Ambassadeurs */}
                    {currentTeam.distributors && currentTeam.distributors.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-[10px] uppercase tracking-widest text-[#C89B3C] font-semibold">
                          Diffusion & Réseaux
                        </div>
                        {currentTeam.distributors.map((dist) => (
                          <div key={dist.id} className="text-xs text-stone-300">
                            <span className="font-medium text-white">{dist.name}</span>
                            {dist.roleOrChannel && <span className="text-stone-400"> ({dist.roleOrChannel})</span>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Partenaires & Sponsors */}
                    {currentTeam.sponsors && currentTeam.sponsors.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-[10px] uppercase tracking-widest text-[#C89B3C] font-semibold">
                          Partenaires & Soutiens
                        </div>
                        {currentTeam.sponsors.map((spons) => (
                          <div key={spons.id} className="text-xs text-stone-300">
                            <span className="font-medium text-white">{spons.companyName}</span>
                            {spons.partnershipType && <span className="text-stone-400"> ({spons.partnershipType})</span>}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-4 pb-2 text-[10px] tracking-wider text-stone-400 uppercase">
                      Une coproduction citoyenne YonyWood © 2026
                    </div>
                  </div>

                  {/* Bas */}
                  <div className="relative z-10 pt-2 border-t border-white/15 flex justify-center shrink-0">
                    <button
                      onClick={() => setActiveSeriesOverlay(null)}
                      className="px-5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-medium cursor-pointer transition-colors"
                    >
                      Fermer le générique
                    </button>
                  </div>
                </div>
              )}

              {/* OVERLAY DE QUESTION POUR LES AUTRES PORTES (NON-SÉRIES) */}
              {!isSeries && showSubjectQuestion && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="details-overlay absolute inset-0 bg-black/92 backdrop-blur-md z-20 flex flex-col justify-between p-6 text-white animate-in fade-in duration-200"
                >
                  <div className="space-y-4 overflow-y-auto max-h-[82%] pr-1">
                    <div className="flex items-center justify-between pb-2 border-b border-white/15">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-white/90">
                          {currentSubject.title}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowSubjectQuestion(false)}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                        title="Fermer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2 pt-1">
                      <span className="text-xs text-stone-300 font-medium">
                        Pour votre contribution sur {currentSubject.title} :
                      </span>
                      <p className="font-editorial text-white leading-relaxed pt-1 text-lg font-medium italic">
                        « {currentSubject.question} »
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
                      className="px-4 py-2 rounded-full bg-[#A2482B] hover:bg-[#8B3B20] text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 border border-transparent shadow-md active:scale-95"
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
              className="hidden sm:flex absolute right-2 sm:right-4 lg:right-6 z-20 w-11 h-11 rounded-full bg-white/95 border border-[#E7E5E4] hover:border-[#A2482B] text-[#1C1917] hover:bg-[#A2482B] hover:text-white items-center justify-center shadow-xl transition-all cursor-pointer transform hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* ÉTAPE 3 : DEUX VIDÉOS EN FACE-À-FACE (COMME DANS LES DUOS) & PARCOURS DÉDIÉS */}
      {/* ========================================================================= */}
      {step === 3 && (
        <>
          {/* 1. VUE FACE-À-FACE : DIPTYQUE "J'AI MA VIDÉO" VS "RECRUTER UN VIDÉASTE" */}
          {!chosenFlow && (
            <div className="flex-1 flex items-center justify-center py-1 sm:py-2 min-h-0 overflow-visible px-2 sm:px-6 md:px-10 animate-in fade-in duration-200">
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                
                {/* LES DEUX VIDÉOS EN FACE-À-FACE (DIPTYQUE COMME DANS LA PARTIE DUO) */}
                <div className="flex items-center justify-center gap-2 sm:gap-5 md:gap-8 relative w-full px-1">
                  
                  {/* CARTE 1 : J'AI MA VIDÉO (Dépôt autonome) */}
                  <div 
                    onClick={() => {
                      setIsChoiceBVideoPlaying(false);
                      setIsChoiceAVideoPlaying(prev => !prev);
                    }}
                    className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between aspect-[9/16] w-[calc((100vw-28px)/2)] max-w-[195px] sm:max-w-none sm:w-[min(340px,calc((100dvh-200px)*9/16))] sm:h-[min(604px,calc(100dvh-200px))] shrink-0 transition-all duration-300 cursor-pointer select-none p-2.5 sm:p-4.5"
                    id="card-choice-upload-direct"
                  >
                    {/* Média : Vidéo animée ou illustration IA 9:16 */}
                    {isChoiceAVideoPlaying ? (
                      <video
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                        poster={uploadVideoGuideImg}
                        autoPlay
                        loop
                        playsInline
                        muted={isChoiceAMuted}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={uploadVideoGuideImg}
                        alt="J'ai ma vidéo"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/35 pointer-events-none" />

                    {/* HAUT : Badge & Contrôle Son */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-bold text-white shadow-sm">
                        <UploadCloud className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#C89B3C]" />
                        <span className="truncate">J'ai ma vidéo</span>
                      </div>

                      {isChoiceAVideoPlaying && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsChoiceAMuted(!isChoiceAMuted);
                          }}
                          className="p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-[#A2482B] text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                          title={isChoiceAMuted ? 'Activer le son' : 'Couper le son'}
                        >
                          {isChoiceAMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>

                    {/* CENTRE : BOUTON PLAY/PAUSE */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChoiceBVideoPlaying(false);
                          setIsChoiceAVideoPlaying(!isChoiceAVideoPlaying);
                        }}
                        className={`pointer-events-auto group/btn relative w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl backdrop-blur-md ${
                          isChoiceAVideoPlaying
                            ? 'border border-white/40 ring-2 ring-white/20 bg-black/60 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                            : 'border border-white/25 hover:border-white hover:ring-2 hover:ring-white/30 bg-black/45 hover:bg-black/65'
                        }`}
                        title={isChoiceAVideoPlaying ? 'Pause' : 'Lire la vidéo'}
                      >
                        {isChoiceAVideoPlaying ? (
                          <Pause className="w-5 sm:w-6 h-5 sm:h-6 text-white fill-white transition-transform group-hover/btn:scale-110" />
                        ) : (
                          <Play className="w-5 sm:w-6 h-5 sm:h-6 text-white fill-white translate-x-0.5 transition-transform group-hover/btn:scale-115" />
                        )}
                      </button>
                    </div>

                    {/* BAS : BOUTON DÉTAILS ET BOUTON CHOIX */}
                    <div className="relative z-10 flex items-center justify-between gap-1 sm:gap-2 pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDetailsA(true);
                        }}
                        className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white/20 hover:bg-[#A2482B] text-white text-[10px] sm:text-xs font-semibold backdrop-blur-md transition-all flex items-center justify-center border border-white/25 hover:border-transparent cursor-pointer shadow-md"
                        title="Détails"
                      >
                        <span>Détails</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChoiceAVideoPlaying(false);
                          setIsChoiceBVideoPlaying(false);
                          setChosenFlow('UPLOAD_DIRECT');
                        }}
                        className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 hover:bg-[#A2482B] text-white text-[10px] sm:text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1 sm:gap-1.5 shadow-md border border-white/25 hover:border-transparent cursor-pointer shrink-0"
                        title="Télécharger"
                        id="btn-choose-direct-upload"
                      >
                        <span className="truncate">Télécharger</span>
                        <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
                      </button>
                    </div>

                    {/* OVERLAY DÉTAILS OPTION A */}
                    {showDetailsA && (
                      <div 
                        onClick={(e) => e.stopPropagation()}
                        className="absolute inset-0 bg-black/92 backdrop-blur-md z-20 flex flex-col justify-between p-4 sm:p-5 text-white animate-in fade-in duration-200"
                      >
                        <div className="space-y-3 overflow-y-auto max-h-[82%] pr-1">
                          <div className="flex items-center justify-between pb-2 border-b border-white/15">
                            <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                              <UploadCloud className="w-4 h-4 text-[#C89B3C]" />
                              <span>J'ai ma vidéo</span>
                            </span>
                            <button
                              onClick={() => setShowDetailsA(false)}
                              className="p-1 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="space-y-2.5 pt-1 text-[11px] sm:text-xs text-white/90">
                            <div className="flex items-start gap-2">
                              <span className="w-3.5 h-3.5 rounded-full bg-[#A2482B] text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                              <p className="font-semibold text-white">Dépôt autonome</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="w-3.5 h-3.5 rounded-full bg-white/20 text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                              <p>Vidéo déjà tournée au smartphone ou à la caméra</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="w-3.5 h-3.5 rounded-full bg-white/20 text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                              <p>Format vertical 9:16 privilégié</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="w-3.5 h-3.5 rounded-full bg-white/20 text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                              <p>Fichiers acceptés : MP4, MOV, WebM</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/15 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => setShowDetailsA(false)}
                            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[10px] sm:text-xs text-white cursor-pointer"
                          >
                            Fermer
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowDetailsA(false);
                              setIsChoiceAVideoPlaying(false);
                              setIsChoiceBVideoPlaying(false);
                              setChosenFlow('UPLOAD_DIRECT');
                            }}
                            className="px-3 sm:px-4 py-1.5 rounded-full bg-white/20 hover:bg-[#A2482B] text-white text-[10px] sm:text-xs font-semibold backdrop-blur-md flex items-center gap-1 cursor-pointer"
                          >
                            <span>Télécharger</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CARTE 2 : RECRUTER UN VIDÉASTE */}
                  <div 
                    onClick={() => {
                      setIsChoiceAVideoPlaying(false);
                      setIsChoiceBVideoPlaying(prev => !prev);
                    }}
                    className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between aspect-[9/16] w-[calc((100vw-28px)/2)] max-w-[195px] sm:max-w-none sm:w-[min(340px,calc((100dvh-200px)*9/16))] sm:h-[min(604px,calc(100dvh-200px))] shrink-0 transition-all duration-300 cursor-pointer select-none p-2.5 sm:p-4.5"
                    id="card-choice-recruit-videographer"
                  >
                    {/* Média : Vidéo animée ou illustration IA 9:16 */}
                    {isChoiceBVideoPlaying ? (
                      <video
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
                        poster={recruitVideographerImg}
                        autoPlay
                        loop
                        playsInline
                        muted={isChoiceBMuted}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={recruitVideographerImg}
                        alt="Recruter un vidéaste"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/35 pointer-events-none" />

                    {/* HAUT : Badge & Contrôle Son */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-bold text-white shadow-sm">
                        <Camera className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#C89B3C]" />
                        <span className="truncate">Recruter un vidéaste</span>
                      </div>

                      {isChoiceBVideoPlaying && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsChoiceBMuted(!isChoiceBMuted);
                          }}
                          className="p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-[#A2482B] text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                          title={isChoiceBMuted ? 'Activer le son' : 'Couper le son'}
                        >
                          {isChoiceBMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>

                    {/* CENTRE : BOUTON PLAY/PAUSE */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChoiceAVideoPlaying(false);
                          setIsChoiceBVideoPlaying(!isChoiceBVideoPlaying);
                        }}
                        className={`pointer-events-auto group/btn relative w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl backdrop-blur-md ${
                          isChoiceBVideoPlaying
                            ? 'border border-white/40 ring-2 ring-white/20 bg-black/60 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                            : 'border border-white/25 hover:border-white hover:ring-2 hover:ring-white/30 bg-black/45 hover:bg-black/65'
                        }`}
                        title={isChoiceBVideoPlaying ? 'Pause' : 'Lire la vidéo'}
                      >
                        {isChoiceBVideoPlaying ? (
                          <Pause className="w-5 sm:w-6 h-5 sm:h-6 text-white fill-white transition-transform group-hover/btn:scale-110" />
                        ) : (
                          <Play className="w-5 sm:w-6 h-5 sm:h-6 text-white fill-white translate-x-0.5 transition-transform group-hover/btn:scale-115" />
                        )}
                      </button>
                    </div>

                    {/* BAS : BOUTON DÉTAILS ET BOUTON CHOIX */}
                    <div className="relative z-10 flex items-center justify-between gap-1 sm:gap-2 pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDetailsB(true);
                        }}
                        className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white/20 hover:bg-[#A2482B] text-white text-[10px] sm:text-xs font-semibold backdrop-blur-md transition-all flex items-center justify-center border border-white/25 hover:border-transparent cursor-pointer shadow-md"
                        title="Détails"
                      >
                        <span>Détails</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChoiceAVideoPlaying(false);
                          setIsChoiceBVideoPlaying(false);
                          setChosenFlow('BROWSE_VIDEOGRAPHERS');
                        }}
                        className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 hover:bg-[#A2482B] text-white text-[10px] sm:text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1 sm:gap-1.5 shadow-md border border-white/25 hover:border-transparent cursor-pointer shrink-0"
                        title="Recruter un vidéaste"
                        id="btn-choose-recruit-videographer"
                      >
                        <span className="truncate">Recruter un vidéaste</span>
                        <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
                      </button>
                    </div>

                    {/* OVERLAY DÉTAILS OPTION B */}
                    {showDetailsB && (
                      <div 
                        onClick={(e) => e.stopPropagation()}
                        className="absolute inset-0 bg-black/92 backdrop-blur-md z-20 flex flex-col justify-between p-4 sm:p-5 text-white animate-in fade-in duration-200"
                      >
                        <div className="space-y-3 overflow-y-auto max-h-[82%] pr-1">
                          <div className="flex items-center justify-between pb-2 border-b border-white/15">
                            <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                              <Camera className="w-4 h-4 text-[#C89B3C]" />
                              <span>Recruter un vidéaste</span>
                            </span>
                            <button
                              onClick={() => setShowDetailsB(false)}
                              className="p-1 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="space-y-2.5 pt-1 text-[11px] sm:text-xs text-white/90">
                            <div className="flex items-start gap-2">
                              <span className="w-3.5 h-3.5 rounded-full bg-white/20 text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                              <p>Mise en relation avec un cadreur ou documentariste local certifié</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="w-3.5 h-3.5 rounded-full bg-white/20 text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                              <p>Tournage sur votre lieu de vie ou de transmission</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="w-3.5 h-3.5 rounded-full bg-white/20 text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                              <p>Caméras cinéma 4K & prise de son binaurale en lumière naturelle</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/15 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => setShowDetailsB(false)}
                            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[10px] sm:text-xs text-white cursor-pointer"
                          >
                            Fermer
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowDetailsB(false);
                              setIsChoiceAVideoPlaying(false);
                              setIsChoiceBVideoPlaying(false);
                              setChosenFlow('BROWSE_VIDEOGRAPHERS');
                            }}
                            className="px-3 sm:px-4 py-1.5 rounded-full bg-white/20 hover:bg-[#A2482B] text-white text-[10px] sm:text-xs font-semibold backdrop-blur-md flex items-center gap-1 cursor-pointer"
                          >
                            <span>Recruter un vidéaste</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* 2. VUE SWIPE VIDÉASTES : PROFILES EN VIDÉO 9:16 AVEC CONTACT DIRECT ET MESSAGERIE */}
          {chosenFlow === 'BROWSE_VIDEOGRAPHERS' && (
            <div className="flex-1 flex items-center justify-center py-1 sm:py-2 min-h-0 overflow-visible px-2 sm:px-6 md:px-10 animate-in fade-in duration-200">
              <div className="relative w-full h-full flex flex-col items-center justify-center">

                {/* CONTENEUR DU SWIPE VIDÉASTE AVEC FLÈCHES LATÉRALES */}
                <div className="relative w-full flex items-center justify-center">
                  
                  {/* Flèche gauche */}
                  <button
                    type="button"
                    onClick={handlePrevVideographer}
                    aria-label="Vidéaste précédent"
                    className="hidden sm:flex absolute left-2 sm:left-4 lg:left-8 z-30 w-11 h-11 rounded-full bg-white/95 border border-[#E7E5E4] hover:border-[#A2482B] text-[#1C1917] hover:bg-[#A2482B] hover:text-white items-center justify-center shadow-lg transition-all cursor-pointer transform hover:scale-105 active:scale-95"
                    title="Vidéaste précédent"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* CARTE 9:16 UNIQUE VIDÉASTE (DESIGN IDENTIQUE AUX VIDÉOS DE PRÉSENTATION D'HÉRITAGE) */}
                  {(() => {
                    const v = VIDEOGRAPHERS[activeVideographerIndex] || VIDEOGRAPHERS[0];
                    const sampleVideos = [
                      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4"
                    ];
                    const vidUrl = sampleVideos[activeVideographerIndex % sampleVideos.length];

                    return (
                      <div
                        style={{ transform: `translateX(${vidSwipeOffset}px)` }}
                        onTouchStart={onVidTouchStart}
                        onTouchMove={onVidTouchMove}
                        onTouchEnd={onVidTouchEnd}
                        onMouseDown={onVidMouseDown}
                        onMouseMove={onVidMouseMove}
                        onMouseUp={onVidMouseUp}
                        onClick={() => {
                          if (!vidHasDraggedRef.current) {
                            setIsVideographerVideoPlaying(prev => !prev);
                          }
                        }}
                        className="aspect-[9/16] w-[min(340px,calc((100dvh-200px)*9/16))] h-[min(604px,calc(100dvh-200px))] max-w-[calc(100vw-28px)] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between p-4 sm:p-5 transition-transform duration-150 ease-out select-none cursor-pointer shrink-0 relative"
                        id={`videographer-card-${v.id}`}
                      >
                        {/* Vidéo ou Affiche de présentation */}
                        {isVideographerVideoPlaying ? (
                          <video
                            src={vidUrl}
                            poster={v.photoUrl || v.photo}
                            autoPlay
                            loop
                            playsInline
                            muted={isVideographerMuted}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={v.photoUrl || v.photo}
                            alt={v.name}
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                          />
                        )}

                        {/* Voile d'ambiance cinématographique */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

                        {/* CENTRE : BOUTON PLAY/PAUSE AU CENTRE EXACT */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsVideographerVideoPlaying(!isVideographerVideoPlaying);
                            }}
                            className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur-xs border border-white/25 text-white flex items-center justify-center transition-all duration-200 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
                            title={isVideographerVideoPlaying ? 'Pause' : 'Lire la vidéo'}
                          >
                            {isVideographerVideoPlaying ? (
                              <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
                            ) : (
                              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white translate-x-0.5 opacity-95" />
                            )}
                          </button>
                        </div>

                        {/* HAUT : Titre épuré "Video Maker" & Commande Son */}
                        <div className="relative z-20 flex items-center justify-between pointer-events-auto">
                          <span className="font-editorial text-sm sm:text-base font-bold text-white tracking-wide drop-shadow-md">
                            Video Maker
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsVideographerMuted(!isVideographerMuted);
                            }}
                            className="w-9 h-9 rounded-full bg-black/50 hover:bg-[#A2482B] backdrop-blur-md border border-white/20 hover:border-[#A2482B] text-white flex items-center justify-center cursor-pointer transition-all shadow-md hover:scale-105 active:scale-95"
                            title={isVideographerMuted ? 'Activer le son' : 'Couper le son'}
                          >
                            {isVideographerMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                          </button>
                        </div>

                        {/* BAS : Prénom et Âge en bas (exactement comme les vidéos d'Héritage) & Colonne des 3 boutons */}
                        <div className="relative z-20 flex items-end justify-between pointer-events-auto mt-auto">
                          <div className="text-left font-sans pr-2">
                            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none drop-shadow-md">
                              {v.name.split(' ')[0]}
                            </h3>
                            {v.age && (
                              <p className="text-xs sm:text-sm text-stone-300 mt-1 font-medium drop-shadow">
                                {v.age} ans
                              </p>
                            )}
                          </div>

                          {/* Pile verticale des 3 boutons d'action (Contacter avec caméra, Question, Profil) */}
                          <div className="flex flex-col items-center gap-2.5 sm:gap-3 shrink-0">
                            {/* 1. Bouton Contacter pour une prestation (Mains qui se serrent / accord - style neutre non actif par défaut) */}
                            <button
                              id={`btn-contact-videographer-${v.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setContactingVideographer(v);
                                setContactLocation(v.country ? `${v.country}` : '');
                                setContactSuccess(false);
                              }}
                              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-[#A2482B] backdrop-blur-md border border-white/25 hover:border-[#A2482B] text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                              title="Demande de prestation"
                            >
                              <Handshake className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </button>

                            {/* 2. Bouton Question (Livre ouvert) */}
                            <button
                              id={`btn-question-videographer-${v.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowingVideographerQuestion(v);
                              }}
                              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-[#A2482B] backdrop-blur-md border border-white/25 hover:border-[#A2482B] text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                              title="Voir la question"
                            >
                              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </button>

                            {/* 3. Bouton Profil complet (User) */}
                            <button
                              id={`btn-profile-videographer-${v.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowingVideographerProfile(v);
                              }}
                              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-[#A2482B] backdrop-blur-md border border-white/25 hover:border-[#A2482B] text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                              title="Découvrir son profil complet"
                            >
                              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })()}

                  {/* Flèche droite */}
                  <button
                    type="button"
                    onClick={handleNextVideographer}
                    aria-label="Vidéaste suivant"
                    className="hidden sm:flex absolute right-2 sm:right-4 lg:right-8 z-30 w-11 h-11 rounded-full bg-white/95 border border-[#E7E5E4] hover:border-[#A2482B] text-[#1C1917] hover:bg-[#A2482B] hover:text-white items-center justify-center shadow-lg transition-all cursor-pointer transform hover:scale-105 active:scale-95"
                    title="Vidéaste suivant"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                </div>

              </div>
            </div>
          )}

          {/* 3. VUE J'AI MA VIDÉO : TÉLÉCHARGER LA VIDÉO ET ATTRIBUER LES CRÉDITS */}
          {chosenFlow === 'UPLOAD_DIRECT' && (
            <div className="max-w-xl mx-auto space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm animate-in fade-in zoom-in-95 duration-200">
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
                      Format vertical 9:16 recommandé pour la série {currentSubject.title}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setChosenFlow(null)}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                  title="Changer de choix"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Zone Drag & Drop ou Clic */}
              <div className="border-2 border-dashed border-stone-300 hover:border-[#A2482B] rounded-2xl p-7 text-center transition-all bg-stone-50/50 hover:bg-stone-50 group">
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
                  <div className="w-13 h-13 mx-auto rounded-full bg-[#A2482B]/10 text-[#A2482B] group-hover:scale-110 flex items-center justify-center transition-transform">
                    <UploadCloud className="w-6 h-6" />
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
                      <span>Fichier prêt : {uploadedFileName}</span>
                    </div>
                  )}
                </label>
              </div>

              {/* Titre optionnel */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 block">
                  Titre de votre proposition (optionnel) :
                </label>
                <input
                  type="text"
                  placeholder={`Ex: Mon témoignage pour ${currentSubject.title}`}
                  value={storySubmissionTitle}
                  onChange={(e) => setStorySubmissionTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#A2482B] shadow-xs"
                />
              </div>

              {/* GÉNÉRIQUE & CRÉDITS DE LA SÉQUENCE */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3.5 text-left">
                <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A2482B]">
                    <Film className="w-4 h-4" />
                    <span>Générique & Attribution des rôles</span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">Filiation & Droits</span>
                </div>
                
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  Précisez les intervenants pour attribuer automatiquement les droits, les mentions et la traçabilité économique sur YonyWood.
                </p>

                <div className="space-y-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-800 block">
                      Casting / Témoins à l'écran
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Mireille Houndé (Témoin principal), Koffi Mensah"
                      value={creditsCasting}
                      onChange={(e) => setCreditsCasting(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#A2482B] shadow-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-800 block">
                      Réalisation / Prise de vue
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Alain Kpatoukpa"
                      value={creditsDirector}
                      onChange={(e) => setCreditsDirector(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#A2482B] shadow-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-800 block">
                      Post-Production (Montage, Son, Étalonnage)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Sonia Dossou (Montage), Mathieu H. (Mixage sonore)"
                      value={creditsPostProd}
                      onChange={(e) => setCreditsPostProd(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#A2482B] shadow-xs"
                    />
                  </div>
                </div>
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
                  <span>Transmettre mon récit</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* MODAL : CONTACTER CE VIDÉASTE (DEMANDE DE PRESTATION RAPIDE ET ÉPURÉE) */}
          {contactingVideographer && (
            <div 
              onClick={() => setContactingVideographer(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl border border-stone-200 text-left"
              >
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl overflow-hidden border border-stone-200 shadow-xs shrink-0">
                      <img 
                        src={contactingVideographer.photoUrl || contactingVideographer.photo} 
                        alt={contactingVideographer.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-editorial text-base sm:text-lg font-bold text-[#1C1917]">
                        Demande de prestation
                      </h3>
                      <p className="text-xs text-stone-500 font-medium">
                        Pour {contactingVideographer.name.split(' ')[0]}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setContactingVideographer(null)}
                    className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {contactSuccess ? (
                  <div className="py-5 text-center space-y-3 animate-in fade-in">
                    <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-editorial text-base font-bold text-stone-900">
                        Demande envoyée !
                      </h4>
                      <p className="text-xs text-stone-600 max-w-xs mx-auto">
                        Votre demande a été transmise directement dans la boîte de {contactingVideographer.name.split(' ')[0]} pour la série « {currentSubject.title} ».
                      </p>
                    </div>
                    <div className="pt-2 flex justify-center">
                      <button
                        onClick={() => setContactingVideographer(null)}
                        className="px-5 py-2 rounded-full bg-[#A2482B] hover:bg-[#8B3B20] text-white text-xs font-semibold cursor-pointer shadow-sm"
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 pt-1">
                    {/* Rappel sobre de la série */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700 block">
                        Série concernée
                      </label>
                      <div className="px-3.5 py-2 rounded-xl bg-stone-100 border border-stone-200 text-xs font-medium text-stone-800 flex items-center justify-between">
                        <span className="truncate">{currentSubject.title}</span>
                        <span className="text-[10px] uppercase font-bold text-[#A2482B] tracking-wider shrink-0 ml-2">Sélectionnée</span>
                      </div>
                    </div>

                    {/* Ville / Territoire de tournage */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700 block">
                        Ville / Territoire de tournage
                      </label>
                      <input
                        type="text"
                        placeholder="Ex : Ouidah, Bénin"
                        value={contactLocation}
                        onChange={(e) => setContactLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#A2482B] focus:bg-white transition-all shadow-xs"
                        autoFocus
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => setContactingVideographer(null)}
                        className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium cursor-pointer"
                      >
                        Annuler
                      </button>

                      <button
                        type="button"
                        onClick={() => setContactSuccess(true)}
                        className="px-5 py-2.5 rounded-full bg-[#A2482B] hover:bg-[#8B3B20] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                      >
                        <Handshake className="w-3.5 h-3.5" />
                        <span>Envoyer la demande</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MODAL : PROFIL COMPLET DU VIDÉASTE */}
          {showingVideographerProfile && (
            <div 
              onClick={() => setShowingVideographerProfile(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-5 shadow-2xl border border-stone-200 text-left max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-start justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-stone-200 shadow-sm shrink-0">
                      <img 
                        src={showingVideographerProfile.photoUrl || showingVideographerProfile.photo} 
                        alt={showingVideographerProfile.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-editorial text-lg font-bold text-[#1C1917]">
                          {showingVideographerProfile.name}
                        </h3>
                        <ShieldCheck className="w-4 h-4 text-[#C89B3C]" />
                      </div>
                      <p className="text-xs text-stone-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#A2482B]" />
                        <span>{showingVideographerProfile.territory}</span>
                      </p>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#FACC15] mt-0.5">
                        <Star className="w-3 h-3 fill-[#FACC15]" />
                        <span className="text-stone-700">{showingVideographerProfile.rating || 4.9}</span>
                        <span className="text-stone-400 font-normal ml-1">({showingVideographerProfile.completedShoots || 12} tournages certifiés)</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowingVideographerProfile(null)}
                    className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 text-xs text-stone-700">
                  <div className="space-y-1">
                    <h5 className="font-bold text-stone-900 uppercase tracking-wider text-[10.5px]">
                      Biographie & Démarche
                    </h5>
                    <p className="leading-relaxed text-stone-600">
                      {showingVideographerProfile.bio}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h5 className="font-bold text-stone-900 uppercase tracking-wider text-[10.5px]">
                      Équipement & Prise de son
                    </h5>
                    <p className="leading-relaxed text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      {showingVideographerProfile.gear || showingVideographerProfile.equipment || "Caméra cinéma 4K, micros cravates HF, stabilisateur et lumière naturelle."}
                    </p>
                  </div>

                  {showingVideographerProfile.specialties && (
                    <div className="space-y-1.5">
                      <h5 className="font-bold text-stone-900 uppercase tracking-wider text-[10.5px]">
                        Spécialités
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {showingVideographerProfile.specialties.map((s, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-[11px] font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {showingVideographerProfile.languages && (
                    <div className="space-y-1">
                      <h5 className="font-bold text-stone-900 uppercase tracking-wider text-[10.5px]">
                        Langues parlées
                      </h5>
                      <p className="text-stone-600">
                        {showingVideographerProfile.languages.join(', ')}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      const v = showingVideographerProfile;
                      setShowingVideographerProfile(null);
                      setContactingVideographer(v);
                      setContactLocation(v.country ? `${v.country}` : '');
                      setContactMessage(`Bonjour ${v.name}, je prépare un récit pour la série « ${currentSubject.title} ». Seriez-vous disponible pour une prestation de tournage documentaire ?`);
                      setContactSuccess(false);
                    }}
                    className="px-4.5 py-2.5 rounded-full bg-[#A2482B] hover:bg-[#8B3B20] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  >
                    <Handshake className="w-3.5 h-3.5" />
                    <span>Demande de prestation</span>
                  </button>

                  <button
                    onClick={() => setShowingVideographerProfile(null)}
                    className="px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium cursor-pointer"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL : QUESTION DE PRÉSENTATION DU VIDÉASTE (STYLE ÉLÉGANT ET ÉPURÉ IDENTIQUE À HÉRITAGE) */}
          {showingVideographerQuestion && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
              onClick={() => setShowingVideographerQuestion(null)}
            >
              <div 
                className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 text-center animate-in zoom-in-95 duration-200 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowingVideographerQuestion(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-12 h-12 rounded-full bg-[#A2482B]/15 text-[#A2482B] flex items-center justify-center mx-auto mb-4 border border-[#A2482B]/30">
                  <BookOpen className="w-6 h-6" />
                </div>

                <h3 className="font-editorial text-base sm:text-lg font-bold text-[#1C1917] mb-3">
                  Question posée à {showingVideographerQuestion.name.split(' ')[0]}
                </h3>

                <p className="font-serif-editorial text-base sm:text-lg text-stone-800 leading-relaxed italic px-2">
                  « {VIDEOGRAPHER_QUESTIONS[showingVideographerQuestion.id]?.question || "Comment votre regard capte-t-il la vérité et la lumière naturelle des récits de mémoire vivante ?"} »
                </p>
              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
};
