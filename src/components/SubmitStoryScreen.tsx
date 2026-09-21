import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  Check, 
  UploadCloud, 
  Camera,
  CheckCircle2,
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Tv,
  ChevronLeft,
  ChevronRight,
  FileText,
  Mountain,
  Atom,
  Fingerprint,
  Gem,
  Sprout,
  GraduationCap,
  Flame,
  Compass
} from 'lucide-react';
import { DOCUMENTARIES } from '../data/mockData';
import { ViewScreen, Documentary } from '../types';
import { 
  EXPLORER_CATEGORIES, 
  EXPLORER_CATALOG, 
  ExplorerCategoryType 
} from '../data/explorerTopicsData';

const EXPLORER_DOOR_ICONS: Record<string, React.FC<{ className?: string }>> = {
  series: Film,
  countries: Mountain,
  thematics: Atom,
  personalities: Fingerprint,
  brands: Gem,
  projects: Sprout,
  offers: GraduationCap,
  questions: Flame
};

const SERIES_PRESENTATIONS: Record<string, { synopsis: string; whyParticipate: string; videoUrl: string; duration: string }> = {
  'jesus-legba': {
    synopsis: "Deux univers spirituels se côtoient sans jamais s’affronter : la foi chrétienne en Jésus et le respect d’Èṣù dans la tradition ancestrale, gardien des seuils et de la mémoire. Face aux grands mystères humains — l'épreuve, le pardon, le deuil —, leurs rituels et prières dialoguent d'égal à égal.",
    whyParticipate: "Votre histoire a été marquée par une épreuve, une conversion, un doute ou une grâce inattendue ? Racontez comment votre foi vous porte au quotidien. Votre témoignage permettra de créer un pont unique et vivant entre deux traditions.",
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '1:15'
  },
  'finagnon-qosqorico': {
    synopsis: "Des cités lacustres de Ganvié sur pilotis aux terrasses andines de Cusco et Pisac à 3 400 m d'altitude. Un dialogue intime entre pêcheurs toffinou et paysans quechuas gardiens de la Pachamama sur l'attachement viscéral à une terre nourricière.",
    whyParticipate: "Vous vivez ou avez vécu un lien profond avec un territoire sacré, un fleuve ou une montagne ? Témoignez de ce que signifie habiter un lieu, partir, revenir, et transmettre l'amour de la terre.",
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '1:45'
  },
  'blacks-one-beyond-eve': {
    synopsis: "Quand la nuit tombe sur la métropole, créateurs urbains, gardiennes de mémoires et poètes s'emparent des carrefours. Entre l'effervescence de la rue et le recueillement intime, deux générations explorent ce qui fait la beauté et la survie de leur communauté.",
    whyParticipate: "Artiste, militant ou témoin des mutations urbaines, partagez le moment charnière où votre voix s'est affirmée et la trace indélébile que vous souhaitez transmettre à ceux qui viendront après vous.",
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '1:30'
  },
  'dixeat-fiat-luxe': {
    synopsis: "Le geste des bâtisseurs silencieux face à l'urgence de notre siècle. Entre ouvriers du quotidien, artisans d'art et pionniers de l'éveil écologique, une réflexion fraternelle sur la valeur du labeur et la lumière cachée dans chaque métier.",
    whyParticipate: "Vous exercez un métier de passion, de sueur ou de patience ? Racontez la dignité de votre geste, la transmission de votre savoir-faire et ce que le travail vous a appris sur les êtres humains.",
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '1:20'
  }
};

const EPISODE_PORTRAITS: Record<string, string[]> = {
  'jesus-legba': [
    '/assets/protagonists/pere-matthieu.jpg',
    '/assets/protagonists/dah-zounon.jpg',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  ],
  'finagnon-qosqorico': [
    '/assets/protagonists/koffi-tisserand.jpg',
    '/assets/protagonists/amara-tisserande.jpg',
    '/assets/protagonists/tobi-houndegla.jpg',
    '/assets/protagonists/sayri-quispe.jpg',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  ],
  'blacks-one-beyond-eve': [
    '/assets/protagonists/malik-diop.jpg',
    '/assets/protagonists/eleonore-vance.jpg',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  ],
  'dixeat-fiat-luxe': [
    '/assets/protagonists/chef-koffi.jpg',
    '/assets/protagonists/helene-saint-amand.jpg',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  ]
};

interface SubmitStoryScreenProps {
  preselectedDocumentaryId?: string;
  onNavigate: (screen: ViewScreen) => void;
}

export const SubmitStoryScreen: React.FC<SubmitStoryScreenProps> = ({
  preselectedDocumentaryId,
  onNavigate
}) => {
  // Step: 1 = Choisir la série, 2 = Choisir la question & épisode, 3 = Format vidéo
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDocId, setSelectedDocId] = useState<string>(preselectedDocumentaryId || DOCUMENTARIES[0].id);
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState<string>('01');
  const [videoOption, setVideoOption] = useState<'HAVE_VIDEO' | 'NEED_VIDEOGRAPHER' | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [videographerCity, setVideographerCity] = useState('');
  const [videographerContact, setVideographerContact] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Index de la série affichée en plein écran (étape 1 swipeable)
  const initialIndex = Math.max(0, DOCUMENTARIES.findIndex(d => d.id === (preselectedDocumentaryId || DOCUMENTARIES[0].id)));
  const [docIndex, setDocIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [isCardVideoPlaying, setIsCardVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showSeriesSynopsis, setShowSeriesSynopsis] = useState(false);

  // Index de l'épisode affiché en plein écran (étape 2 swipeable)
  const [episodeIndex, setEpisodeIndex] = useState(0);
  const [isEpisodeVideoPlaying, setIsEpisodeVideoPlaying] = useState(false);
  const [isEpisodeMuted, setIsEpisodeMuted] = useState(false);
  const [showTranscription, setShowTranscription] = useState(false);

  // Choix du canal : Séries (Face-à-Face) ou Thématiques de l'Explorer
  const [contributionMode, setContributionMode] = useState<'series' | 'explorer'>('series');
  const [explorerDoor, setExplorerDoor] = useState<ExplorerCategoryType>('countries');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('benin');
  const [explorerStoryTitle, setExplorerStoryTitle] = useState('');
  const [explorerStorySummary, setExplorerStorySummary] = useState('');
  const [explorerSpeakerName, setExplorerSpeakerName] = useState('');

  const explorerDoorsList = EXPLORER_CATEGORIES.filter(c => c.id !== 'series');
  const activeDoorTopics = EXPLORER_CATALOG[explorerDoor] || [];
  const selectedTopic = activeDoorTopics.find(t => t.id === selectedTopicId) || activeDoorTopics[0];
  const selectedDoorConfig = EXPLORER_CATEGORIES.find(c => c.id === explorerDoor);

  const handleSelectDoor = (doorId: ExplorerCategoryType) => {
    setExplorerDoor(doorId);
    const topics = EXPLORER_CATALOG[doorId] || [];
    if (topics.length > 0) {
      setSelectedTopicId(topics[0].id);
    }
  };

  // Vidéos explicatives 9:16 pour l'Étape 3
  const [isPlayingGuideHaveVideo, setIsPlayingGuideHaveVideo] = useState(false);
  const [isPlayingGuideVideographer, setIsPlayingGuideVideographer] = useState(false);
  const [isGuideMuted, setIsGuideMuted] = useState(true);

  // Gesture / Swipe state pour l'étape 1
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  // Gesture / Swipe state pour l'étape 2 (épisodes)
  const [epTouchStartX, setEpTouchStartX] = useState<number | null>(null);
  const [epTouchEndX, setEpTouchEndX] = useState<number | null>(null);
  const [epMouseStartX, setEpMouseStartX] = useState<number | null>(null);
  const [isEpMouseDown, setIsEpMouseDown] = useState(false);
  const [epSwipeOffset, setEpSwipeOffset] = useState(0);

  const currentDoc = DOCUMENTARIES[docIndex] || DOCUMENTARIES[0];
  const selectedDoc = DOCUMENTARIES.find(d => d.id === selectedDocId) || DOCUMENTARIES[0];
  const currentQuestions = selectedDoc.questions || [];
  const currentEpisode = currentQuestions[episodeIndex] || currentQuestions[0];
  const selectedQuestion = currentQuestions.find(q => q.number === selectedQuestionNumber) || currentQuestions[0];

  const goToDoc = (idx: number) => {
    const safe = (idx + DOCUMENTARIES.length) % DOCUMENTARIES.length;
    setDocIndex(safe);
    setSelectedDocId(DOCUMENTARIES[safe].id);
    setSelectedQuestionNumber(DOCUMENTARIES[safe].questions[0]?.number || '01');
    setEpisodeIndex(0);
    setIsCardVideoPlaying(false);
    setShowSeriesSynopsis(false);
  };

  const handleNextDoc = () => goToDoc(docIndex + 1);
  const handlePrevDoc = () => goToDoc(docIndex - 1);

  // Navigation entre épisodes (Étape 2)
  const goToEpisode = (idx: number) => {
    const total = currentQuestions.length;
    if (total === 0) return;
    const safe = (idx + total) % total;
    setEpisodeIndex(safe);
    setSelectedQuestionNumber(currentQuestions[safe].number);
    setIsEpisodeVideoPlaying(false);
    setShowTranscription(false);
  };

  const handleNextEpisode = () => goToEpisode(episodeIndex + 1);
  const handlePrevEpisode = () => goToEpisode(episodeIndex - 1);

  // Synchronisation de l'épisode au changement de série sélectionnée
  useEffect(() => {
    const idx = selectedDoc.questions.findIndex(q => q.number === selectedQuestionNumber);
    if (idx >= 0) {
      setEpisodeIndex(idx);
    } else {
      setEpisodeIndex(0);
      if (selectedDoc.questions[0]) {
        setSelectedQuestionNumber(selectedDoc.questions[0].number);
      }
    }
    setIsEpisodeVideoPlaying(false);
    setShowTranscription(false);
  }, [selectedDocId]);

  // Touch handlers for mobile swipe (Étape 1)
  const minSwipeDistance = 45;
  const hasDraggedRef = useRef(false);
  const epHasDraggedRef = useRef(false);

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
    if (distance > minSwipeDistance) {
      handleNextDoc();
    } else if (distance < -minSwipeDistance) {
      handlePrevDoc();
    }
  };

  // Mouse handlers for desktop swipe (Étape 1)
  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, video, .synopsis-box')) return;
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
    if (distance > minSwipeDistance) {
      handleNextDoc();
    } else if (distance < -minSwipeDistance) {
      handlePrevDoc();
    }
    setMouseStartX(null);
  };

  // Touch handlers for mobile swipe (Étape 2 - Épisodes)
  const onEpTouchStart = (e: React.TouchEvent) => {
    epHasDraggedRef.current = false;
    setEpTouchEndX(null);
    setEpTouchStartX(e.targetTouches[0].clientX);
  };

  const onEpTouchMove = (e: React.TouchEvent) => {
    setEpTouchEndX(e.targetTouches[0].clientX);
    if (epTouchStartX !== null) {
      const diff = e.targetTouches[0].clientX - epTouchStartX;
      if (Math.abs(diff) > 8) epHasDraggedRef.current = true;
      setEpSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
    }
  };

  const onEpTouchEnd = () => {
    setEpSwipeOffset(0);
    if (!epTouchStartX || !epTouchEndX) return;
    const distance = epTouchStartX - epTouchEndX;
    if (distance > minSwipeDistance) {
      handleNextEpisode();
    } else if (distance < -minSwipeDistance) {
      handlePrevEpisode();
    }
  };

  // Mouse handlers for desktop swipe (Étape 2 - Épisodes)
  const onEpMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, video, .transcription-box')) return;
    epHasDraggedRef.current = false;
    setIsEpMouseDown(true);
    setEpMouseStartX(e.clientX);
  };

  const onEpMouseMove = (e: React.MouseEvent) => {
    if (!isEpMouseDown || epMouseStartX === null) return;
    const diff = e.clientX - epMouseStartX;
    if (Math.abs(diff) > 8) epHasDraggedRef.current = true;
    setEpSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
  };

  const onEpMouseUp = (e: React.MouseEvent) => {
    if (!isEpMouseDown) return;
    setIsEpMouseDown(false);
    setEpSwipeOffset(0);
    if (epMouseStartX === null) return;
    const distance = epMouseStartX - e.clientX;
    if (distance > minSwipeDistance) {
      handleNextEpisode();
    } else if (distance < -minSwipeDistance) {
      handlePrevEpisode();
    }
    setEpMouseStartX(null);
  };

  // Keyboard navigation for step 1 and step 2
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (step === 1) {
        if (e.key === 'ArrowRight') {
          handleNextDoc();
        } else if (e.key === 'ArrowLeft') {
          handlePrevDoc();
        }
      } else if (step === 2) {
        if (e.key === 'ArrowRight') {
          handleNextEpisode();
        } else if (e.key === 'ArrowLeft') {
          handlePrevEpisode();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, docIndex, episodeIndex, currentQuestions.length]);

  // Video presentation modal state (optionnel si ouvert en grand)
  const [previewDoc, setPreviewDoc] = useState<Documentary | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);

  const handleFinishSubmission = () => {
    setSubmittedSuccess(true);
  };

  if (submittedSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#0D9488]/15 border border-[#0D9488] text-[#0D9488] mx-auto flex items-center justify-center">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h2 className="font-editorial text-3xl font-bold text-[#1C1917]">
          Votre proposition a été transmise.
        </h2>
        <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E7E5E4] text-left space-y-3 max-w-md mx-auto shadow-xs">
          {contributionMode === 'explorer' ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#0D9488] font-bold uppercase tracking-wider">
                  Porte {selectedDoorConfig?.label}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs text-[#A2482B] font-semibold">
                  {selectedTopic?.title}
                </span>
              </div>
              <p className="font-editorial text-base font-semibold text-[#1C1917]">
                {explorerStoryTitle || "Récit pour l'Explorer"}
              </p>
              {explorerStorySummary && (
                <p className="text-xs text-[#68655D] italic line-clamp-2">
                  « {explorerStorySummary} »
                </p>
              )}
              {explorerSpeakerName && (
                <p className="text-xs text-stone-500 font-medium">
                  Intervenant : <strong className="text-stone-700">{explorerSpeakerName}</strong>
                </p>
              )}
              <div className="pt-1 border-t border-stone-100">
                <p className="text-xs text-[#0D9488] font-medium">
                  Format : {videoOption === 'HAVE_VIDEO' ? 'Vidéo personnelle fournie' : 'Demande d’accompagnement par un cadreur'}
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs text-[#A2482B] font-bold uppercase tracking-wider">
                {selectedDoc.title}
              </p>
              <p className="font-editorial text-base font-semibold text-[#1C1917]">
                Épisode {selectedQuestion.number} — {selectedQuestion.title}
              </p>
              <p className="text-xs text-[#68655D] italic">
                « {selectedQuestion.prompt} »
              </p>
              <div className="pt-1 border-t border-stone-100">
                <p className="text-xs text-[#0D9488] font-medium">
                  Format : {videoOption === 'HAVE_VIDEO' ? 'Vidéo personnelle fournie' : 'Demande d’accompagnement par un cadreur'}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          {contributionMode === 'explorer' ? (
            <button
              onClick={() => onNavigate({ type: 'matrix_view' })}
              className="px-6 py-2.5 rounded-full bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Découvrir dans l'Explorer
            </button>
          ) : (
            <button
              onClick={() => onNavigate({ type: 'duo_feed' })}
              className="px-6 py-2.5 rounded-full bg-[#A2482B] hover:bg-[#8B3B20] text-[#FFFFFF] text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Retourner aux duos
            </button>
          )}
          <button
            onClick={() => {
              setSubmittedSuccess(false);
              setStep(1);
              setExplorerStoryTitle('');
              setExplorerStorySummary('');
              setExplorerSpeakerName('');
              setVideoOption(null);
            }}
            className="px-6 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer border border-stone-200"
          >
            Proposer une autre histoire
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-28 space-y-6 text-[#1C1917]">
      
      {/* Header discret & Step progress */}
      <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
        <div>
          <h1 className="font-editorial text-xl sm:text-2xl font-bold text-[#1C1917]">
            Proposer une histoire
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Partagez votre voix dans nos séries ou dans l'une des thématiques de l'Explorer.
          </p>
        </div>

        {/* Step indicator pills */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s
                  ? 'bg-[#A2482B] text-[#FFFFFF] shadow-xs'
                  : step > s
                  ? 'bg-[#0D9488] text-[#FFFFFF]'
                  : 'bg-[#E7E5E4] text-[#7A756B]'
              }`}
            >
              {step > s ? '✓' : s}
            </div>
          ))}
        </div>
      </div>

      {/* Sélecteur de canal de contribution : Séries (Face-à-Face) ou Explorer (7 Portes) */}
      <div className="flex p-1 bg-stone-100/90 rounded-2xl border border-stone-200/80 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => {
            setContributionMode('series');
            setStep(1);
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            contributionMode === 'series'
              ? 'bg-white text-[#1C1917] shadow-xs'
              : 'text-stone-600 hover:text-[#1C1917]'
          }`}
          id="tab-contrib-series"
        >
          <Film className={`w-3.5 h-3.5 ${contributionMode === 'series' ? 'text-[#A2482B]' : 'text-stone-400'}`} />
          <span>Séries (Face-à-Face)</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setContributionMode('explorer');
            setStep(1);
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            contributionMode === 'explorer'
              ? 'bg-white text-[#1C1917] shadow-xs'
              : 'text-stone-600 hover:text-[#1C1917]'
          }`}
          id="tab-contrib-explorer"
        >
          <Compass className={`w-3.5 h-3.5 ${contributionMode === 'explorer' ? 'text-[#0D9488]' : 'text-stone-400'}`} />
          <span>Explorer (7 Portes)</span>
        </button>
      </div>

      {/* PANNEAU 1 : UN SEUL ÉCRAN QUI APPARAÎT AVEC SWIPE (EXACTEMENT COMME LA CAPTURE D'ÉCRAN FOURNIE) */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {contributionMode === 'series' ? (
            /* Conteneur de l'écran unique avec swipe et navigation fléchée */
            <div className="relative flex items-center justify-center py-2">
            
            {/* Flèche Gauche (Navigation rapide) */}
            <button
              onClick={handlePrevDoc}
              className="hidden sm:flex absolute left-0 lg:-left-12 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-[#C89B3C] text-[#1C1917] hover:text-white border border-[#E7E5E4] shadow-lg items-center justify-center transition-all cursor-pointer transform hover:scale-105"
              title="Série précédente"
              id="prev-series-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* CARTE UNIQUE FORMAT VIDÉO VERTICAL 9:16 AVEC SUPPORT DU SWIPE */}
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
                  if ((e.target as HTMLElement).closest('button, a, input, textarea, .synopsis-box')) {
                    return;
                  }
                  setIsCardVideoPlaying(prev => !prev);
                }}
                className="group relative w-full h-full rounded-[2rem] sm:rounded-3xl overflow-hidden bg-[#1C1917] text-[#FFFFFF] shadow-2xl border border-[#E7E5E4]/50 flex flex-col justify-between p-5 sm:p-6 cursor-pointer"
                id={`current-series-card-${currentDoc.id}`}
              >
                {/* 1. Média de fond : Vidéo en lecture OU affiche de film */}
                {isCardVideoPlaying ? (
                  <video
                    src={SERIES_PRESENTATIONS[currentDoc.id]?.videoUrl || currentDoc.teaserVideoUrl}
                    poster={currentDoc.posterUrl || currentDoc.coverImage}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={currentDoc.posterUrl || currentDoc.coverImage} 
                    alt={currentDoc.title} 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 pointer-events-none"
                  />
                )}

                {/* Voile cinématographique clair pour préserver l'éclat de l'affiche de la série */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 pointer-events-none" />

                {/* HAUT : Badge du titre de la série à gauche & Contrôle vidéo hybride doré en face en haut à droite */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold tracking-widest text-white shadow-sm">
                    {currentDoc.title}
                  </span>

                  {/* En face en haut à droite : Option 3 Hybride interactif (triangle doré pur + anneau au survol/lecture) */}
                  <div className="flex items-center gap-2">
                    {isCardVideoPlaying && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted(!isMuted);
                        }}
                        className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                        title={isMuted ? 'Activer le son' : 'Couper le son'}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCardVideoPlaying(!isCardVideoPlaying);
                      }}
                      className={`group/btn relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 shadow-lg ${
                        isCardVideoPlaying
                          ? 'border border-[#C89B3C] ring-2 ring-[#C89B3C]/40 bg-black/60 backdrop-blur-md shadow-[0_0_16px_rgba(200,155,60,0.6)]'
                          : 'border border-transparent hover:border-[#C89B3C] hover:ring-2 hover:ring-[#C89B3C]/30 bg-black/40 hover:bg-black/60 backdrop-blur-md'
                      }`}
                      title={isCardVideoPlaying ? 'Mettre en pause' : `Visionner la bande-annonce de ${currentDoc.title}`}
                      id={`play-pause-btn-${currentDoc.id}`}
                    >
                      {isCardVideoPlaying ? (
                        <Pause className="w-5.5 h-5.5 text-[#C89B3C] fill-[#C89B3C] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-110" />
                      ) : (
                        <Play className="w-6 h-6 text-[#C89B3C] fill-[#C89B3C] translate-x-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-115" />
                      )}
                    </button>
                  </div>
                </div>

                {/* CENTRE LIBÉRÉ : Pas d'obstacle visuel, toute l'affiche est visible et cliquable */}
                <div className="my-auto" />

                {/* BAS : Transcription (Synopsis) à gauche et action Choisir cette série à droite */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSeriesSynopsis(true);
                    }}
                    className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white/95 text-[11px] font-medium backdrop-blur-md transition-all flex items-center gap-1.5 border border-white/20 cursor-pointer shadow-sm"
                    title="Afficher le synopsis de la série"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>Synopsis</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDocId(currentDoc.id);
                      setSelectedQuestionNumber(currentDoc.questions[0].number);
                      setStep(2);
                    }}
                    className="px-4 py-2 rounded-full bg-white/20 hover:bg-[#C89B3C] text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg border border-white/20 hover:border-transparent cursor-pointer shrink-0"
                    title="Choisir cette série"
                    id={`continue-pill-btn-${currentDoc.id}`}
                  >
                    <span>Choisir cette série</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* OVERLAY DU SYNOPSIS POUR LA SÉRIE */}
                {showSeriesSynopsis && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="synopsis-box absolute inset-0 bg-black/90 backdrop-blur-md z-20 flex flex-col justify-between p-6 text-[#FFFFFF] animate-in fade-in duration-200"
                  >
                    <div className="space-y-3 overflow-y-auto max-h-[82%] pr-1">
                      <div className="flex items-center justify-between pb-2 border-b border-white/15">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#C89B3C]">
                          Synopsis
                        </span>
                        <button
                          onClick={() => setShowSeriesSynopsis(false)}
                          className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                          title="Fermer le synopsis"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="font-editorial text-lg sm:text-xl font-bold text-white">
                        {currentDoc.title}
                      </h4>

                      {currentDoc.subtitle && (
                        <p className="text-xs text-[#C89B3C] font-medium tracking-wide">
                          {currentDoc.subtitle}
                        </p>
                      )}

                      <div className="pt-1">
                        <p className="font-editorial text-sm sm:text-base italic font-light text-white/95 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
                          « {currentDoc.shortSynopsis || currentDoc.description} »
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between gap-3 border-t border-white/15">
                      <button
                        onClick={() => setShowSeriesSynopsis(false)}
                        className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                      >
                        Masquer
                      </button>

                      <button
                        onClick={() => {
                          setSelectedDocId(currentDoc.id);
                          setSelectedQuestionNumber(currentDoc.questions[0].number);
                          setStep(2);
                        }}
                        className="px-5 py-2 rounded-full bg-[#C89B3C] hover:bg-[#B78A2E] text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Choisir cette série</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Flèche Droite (Navigation rapide) */}
            <button
              onClick={handleNextDoc}
              className="hidden sm:flex absolute right-0 lg:-right-12 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-[#C89B3C] text-[#1C1917] hover:text-white border border-[#E7E5E4] shadow-lg items-center justify-center transition-all cursor-pointer transform hover:scale-105"
              title="Série suivante"
              id="next-series-btn"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>
          ) : (
            /* EXPLORER : SÉLECTION DE LA PORTE ET DU SUJET */
            <div className="space-y-6 pt-1">
              {/* 1. Sélection de la porte parmi les 7 */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    1. Choisissez une porte de l'Astrolabe
                  </label>
                  <span className="text-[11px] text-[#0D9488] font-bold">
                    Porte : {selectedDoorConfig?.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {explorerDoorsList.map((door) => {
                    const DoorIcon = EXPLORER_DOOR_ICONS[door.id] || Compass;
                    const isSelected = explorerDoor === door.id;
                    return (
                      <button
                        key={door.id}
                        type="button"
                        onClick={() => handleSelectDoor(door.id)}
                        className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 active:scale-95 ${
                          isSelected
                            ? 'bg-[#0D9488]/10 border-[#0D9488] shadow-xs text-[#0D9488]'
                            : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700 hover:text-stone-900'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#0D9488] text-white' : 'bg-stone-100 text-stone-600'
                        }`}>
                          <DoorIcon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-semibold leading-tight line-clamp-1">
                          {door.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Sélection du sujet spécifique sous cette porte */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    2. Choisissez votre sujet
                  </label>
                  <span className="text-[11px] text-stone-500">
                    {activeDoorTopics.length} sujets disponibles
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {activeDoorTopics.map((topic) => {
                    const isTopicSelected = selectedTopicId === topic.id;
                    return (
                      <div
                        key={topic.id}
                        onClick={() => setSelectedTopicId(topic.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                          isTopicSelected
                            ? 'bg-white border-[#0D9488] ring-2 ring-[#0D9488]/20 shadow-xs'
                            : 'bg-white hover:bg-stone-50/80 border-stone-200/90'
                        }`}
                      >
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A2482B] bg-[#A2482B]/10 px-2 py-0.5 rounded-md">
                              {topic.badge || topic.category}
                            </span>
                            {topic.flag && (
                              <span className="text-xs">{topic.flag}</span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-[#1C1917] line-clamp-1">
                            {topic.title}
                          </h4>
                          <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                            {topic.subtitle || topic.question}
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-full shrink-0 border flex items-center justify-center transition-all mt-0.5 ${
                          isTopicSelected
                            ? 'bg-[#0D9488] border-[#0D9488] text-white'
                            : 'border-stone-300 bg-stone-50'
                        }`}>
                          {isTopicSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bouton de confirmation d'étape pour l'Explorer */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                <div className="text-xs text-stone-600">
                  Sujet sélectionné : <strong className="text-[#1C1917]">{selectedTopic?.title}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="h-10 px-5 rounded-full bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 active:scale-95"
                  id="btn-confirm-explorer-topic"
                >
                  <span>Continuer : Mon récit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* PANNEAU 2 : CHOISIR L'ÉPISODE AU FORMAT VIDÉO VERTICAL AVEC ÉCOUTE & TRANSCRIPTION */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {contributionMode === 'series' ? (
            <>
              {/* En-tête discret : Rappel de la série et changement rapide */}
          <div className="flex items-center justify-between px-1">
            <p className="text-xs text-[#68655D]">
              Série choisie : <strong className="text-[#1C1917]">{selectedDoc.title}</strong>
            </p>
            <button
              onClick={() => {
                const idx = DOCUMENTARIES.findIndex(d => d.id === selectedDocId);
                if (idx >= 0) setDocIndex(idx);
                setStep(1);
              }}
              className="text-xs text-[#8B6845] hover:text-[#1C1917] underline font-medium cursor-pointer"
            >
              Changer de série
            </button>
          </div>

          {/* CONTENEUR DU SWIPE ÉPISODE AVEC FLÈCHES LATÉRALES */}
          <div className="relative flex items-center justify-center py-2">
            
            {/* Flèche précédente (desktop & tablettes) */}
            <button
              onClick={handlePrevEpisode}
              aria-label="Épisode précédent"
              className="hidden sm:flex absolute -left-4 md:-left-8 z-20 w-11 h-11 rounded-full bg-[#FFFFFF] border border-[#E7E5E4] text-[#1C1917] hover:bg-[#C89B3C] hover:text-white hover:border-transparent items-center justify-center shadow-lg transition-all cursor-pointer transform hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* CARTE UNIQUE FORMAT VIDÉO VERTICAL AVEC SUPPORT DU SWIPE */}
            <div
              style={{
                transform: `translateX(${epSwipeOffset}px)`
              }}
              onTouchStart={onEpTouchStart}
              onTouchMove={onEpTouchMove}
              onTouchEnd={onEpTouchEnd}
              onMouseDown={onEpMouseDown}
              onMouseMove={onEpMouseMove}
              onMouseUp={onEpMouseUp}
              onClick={(e) => {
                if (epHasDraggedRef.current) {
                  epHasDraggedRef.current = false;
                  return;
                }
                if ((e.target as HTMLElement).closest('button, a, input, textarea, .transcription-box')) {
                  return;
                }
                setIsEpisodeVideoPlaying(prev => !prev);
              }}
              className="relative w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] rounded-[2rem] sm:rounded-3xl overflow-hidden bg-[#1C1917] text-[#FFFFFF] shadow-2xl border border-[#E7E5E4]/50 flex flex-col justify-between p-5 sm:p-6 transition-transform duration-150 ease-out select-none cursor-pointer"
            >
              {/* Vidéo de l'épisode ou image de portrait de l'interlocuteur */}
              {isEpisodeVideoPlaying ? (
                <video
                  src={currentEpisode.videoAvatarUrl || selectedDoc.teaserVideoUrl}
                  poster={EPISODE_PORTRAITS[selectedDoc.id]?.[episodeIndex] || selectedDoc.posterUrl || selectedDoc.coverImage}
                  autoPlay
                  loop
                  muted={isEpisodeMuted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={EPISODE_PORTRAITS[selectedDoc.id]?.[episodeIndex] || selectedDoc.posterUrl || selectedDoc.coverImage}
                  alt={currentEpisode.title}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}

              {/* Voile cinématographique clair pour préserver la clarté de l'image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 pointer-events-none" />

              {/* HAUT : Badge du numéro de l'épisode & Contrôle vidéo hybride doré en face en haut à droite */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold tracking-widest uppercase text-white/95 shadow-sm">
                  ÉPISODE {currentEpisode.number}
                </span>

                <div className="flex items-center gap-2">
                  {isEpisodeVideoPlaying && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEpisodeMuted(!isEpisodeMuted);
                      }}
                      className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                      title={isEpisodeMuted ? 'Activer le son' : 'Couper le son'}
                    >
                      {isEpisodeMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEpisodeVideoPlaying(!isEpisodeVideoPlaying);
                    }}
                    className={`group/btn relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 shadow-lg ${
                      isEpisodeVideoPlaying
                        ? 'border border-[#C89B3C] ring-2 ring-[#C89B3C]/40 bg-black/60 backdrop-blur-md shadow-[0_0_16px_rgba(200,155,60,0.6)]'
                        : 'border border-transparent hover:border-[#C89B3C] hover:ring-2 hover:ring-[#C89B3C]/30 bg-black/40 hover:bg-black/60 backdrop-blur-md'
                    }`}
                    title={isEpisodeVideoPlaying ? "Mettre en pause" : `Écouter l'épisode ${currentEpisode.number}`}
                  >
                    {isEpisodeVideoPlaying ? (
                      <Pause className="w-5.5 h-5.5 text-[#C89B3C] fill-[#C89B3C] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-110" />
                    ) : (
                      <Play className="w-6 h-6 text-[#C89B3C] fill-[#C89B3C] translate-x-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-115" />
                    )}
                  </button>
                </div>
              </div>

              {/* CENTRE LIBÉRÉ : Visuel dégagé */}
              <div className="my-auto" />

              {/* BAS : Titre de l'épisode, bouton transcription & bouton pour continuer */}
              <div className="relative z-10 space-y-3">
                
                {/* Titre de l'épisode en typographie éditoriale */}
                <div>
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md">
                    {currentEpisode.title}
                  </h3>
                </div>

                {/* Actions inférieures : Découvrir la question à gauche & Continuer à droite */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTranscription(true);
                    }}
                    className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white/95 text-[11px] font-medium backdrop-blur-md transition-all flex items-center gap-1.5 border border-white/20 cursor-pointer shadow-sm"
                    title="Afficher la question"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>Question</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQuestionNumber(currentEpisode.number);
                      setStep(3);
                    }}
                    className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-[#C89B3C] text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg border border-white/20 hover:border-transparent cursor-pointer shrink-0"
                    title="Choisir cet épisode"
                  >
                    <span>Choisir cet épisode</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* OVERLAY DE LA QUESTION (lisible et soigné sur fond flouté) */}
              {showTranscription && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="transcription-box absolute inset-0 bg-black/90 backdrop-blur-md z-20 flex flex-col justify-between p-6 text-[#FFFFFF] animate-in fade-in duration-200"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/15">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#C89B3C]">
                        Question • Épisode {currentEpisode.number}
                      </span>
                      <button
                        onClick={() => setShowTranscription(false)}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                        title="Fermer la transcription"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="font-editorial text-lg font-bold text-white">
                      {currentEpisode.title}
                    </h4>

                    <div className="pt-2">
                      <p className="font-editorial text-base sm:text-lg italic font-light text-white/95 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
                        « {currentEpisode.prompt} »
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-3 border-t border-white/15">
                    <button
                      onClick={() => setShowTranscription(false)}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                    >
                      Masquer
                    </button>

                    <button
                      onClick={() => {
                        setSelectedQuestionNumber(currentEpisode.number);
                        setStep(3);
                      }}
                      className="px-5 py-2 rounded-full bg-[#C89B3C] hover:bg-[#B78A2E] text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Choisir cet épisode</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Flèche suivante (desktop & tablettes) */}
            <button
              onClick={handleNextEpisode}
              aria-label="Épisode suivant"
              className="hidden sm:flex absolute -right-4 md:-right-8 z-20 w-11 h-11 rounded-full bg-[#FFFFFF] border border-[#E7E5E4] text-[#1C1917] hover:bg-[#C89B3C] hover:text-white hover:border-transparent items-center justify-center shadow-lg transition-all cursor-pointer transform hover:scale-105"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>
          </>
          ) : (
            /* FORMULAIRE RÉCIT EXPLORER */
            <div className="space-y-5 pt-1">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488] block">
                    Porte {selectedDoorConfig?.label}
                  </span>
                  <p className="text-xs font-bold text-[#1C1917]">
                    {selectedTopic?.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#A2482B] hover:text-[#8B3B20] font-semibold cursor-pointer underline"
                >
                  Changer de sujet
                </button>
              </div>

              <div className="space-y-4 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C1917] flex items-center justify-between">
                    <span>Titre de votre récit ou intervention *</span>
                    <span className="text-[11px] text-stone-400 font-normal">Obligatoire</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: La mémoire des masques et la transmission aux initiés"
                    value={explorerStoryTitle}
                    onChange={(e) => setExplorerStoryTitle(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#0D9488] focus:bg-white transition-all"
                    id="input-explorer-story-title"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C1917] flex items-center justify-between">
                    <span>Ce que vous transmettez (résumé / question clé)</span>
                    <span className="text-[11px] text-stone-400 font-normal">Recommandé</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Résumez en quelques lignes votre expérience, l'héritage partagé ou la question essentielle abordée..."
                    value={explorerStorySummary}
                    onChange={(e) => setExplorerStorySummary(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#0D9488] focus:bg-white transition-all resize-none"
                    id="textarea-explorer-story-summary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C1917] flex items-center justify-between">
                    <span>Votre nom ou identité publique</span>
                    <span className="text-[11px] text-stone-400 font-normal">Optionnel</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Kofi Mensah — Gardien de mémoire"
                    value={explorerSpeakerName}
                    onChange={(e) => setExplorerSpeakerName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#0D9488] focus:bg-white transition-all"
                    id="input-explorer-speaker-name"
                  />
                </div>
              </div>

              {/* Boutons d'action étape 2 */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-10 px-4 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Retour aux sujets</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!explorerStoryTitle.trim()}
                  className={`h-10 px-5 rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                    explorerStoryTitle.trim()
                      ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white cursor-pointer active:scale-95'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                  id="btn-confirm-explorer-story"
                >
                  <span>Passer au format vidéo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* PANNEAU 3 : CHOISIR LE FORMAT : J'AI MA VIDÉO OU ÊTRE FILMÉ(E) */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E7E5E4] text-xs space-y-1">
            <span className="text-[#0D9488] font-bold uppercase tracking-wider block text-[10px]">
              Votre choix de publication
            </span>
            {contributionMode === 'explorer' ? (
              <div>
                <p className="text-[#1C1917] font-bold">
                  Porte {selectedDoorConfig?.label} • {selectedTopic?.title}
                </p>
                {explorerStoryTitle && (
                  <p className="text-stone-600 italic mt-0.5">
                    « {explorerStoryTitle} »
                  </p>
                )}
              </div>
            ) : (
              <p className="text-[#1C1917] font-medium">
                {selectedDoc.title} • Épisode {selectedQuestion.number} ({selectedQuestion.title})
              </p>
            )}
          </div>

          <p className="text-xs text-[#1C1917] font-medium">
            Comment souhaitez-vous transmettre votre vidéo ?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* OPTION A : J'ai ma vidéo avec vraie capsule vidéo 9:16 interactive */}
            <div
              onClick={() => setVideoOption('HAVE_VIDEO')}
              className={`p-5 rounded-3xl border cursor-pointer transition-all space-y-4 ${
                videoOption === 'HAVE_VIDEO'
                  ? 'bg-[#FFFFFF] border-[#C89B3C] shadow-md ring-2 ring-[#C89B3C]/30'
                  : 'bg-[#FFFFFF] hover:bg-[#F9F6EE] border-[#E7E5E4]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#C89B3C]/15 text-[#8B6845]">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-base font-bold text-[#1C1917]">
                    J'ai ma vidéo
                  </h3>
                  <p className="text-[11px] text-[#8B6845]">
                    Enregistrée sur smartphone ou caméra
                  </p>
                </div>
              </div>

              {/* VRAIE CAPSULE VIDÉO EXPLICATIVE FORMAT 9:16 */}
              <div className="relative w-full max-w-[200px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden bg-stone-900 border border-stone-300 shadow-inner group">
                {isPlayingGuideHaveVideo ? (
                  <video
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                    autoPlay
                    loop
                    playsInline
                    muted={isGuideMuted}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                    alt="Guide de cadrage"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                
                {/* Repères optiques de cadrage 9:16 */}
                <div className="absolute inset-2 border border-white/40 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                  <div className="flex justify-between text-[9px] font-mono text-[#FACC15] drop-shadow">
                    <span>┌</span>
                    <span>┐</span>
                  </div>
                  <div className="self-center px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white border border-white/20">
                    Cadrage portrait 9:16
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-[#FACC15] drop-shadow">
                    <span>└</span>
                    <span>┘</span>
                  </div>
                </div>

                {/* Bouton Play/Pause interactif */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlayingGuideHaveVideo(!isPlayingGuideHaveVideo);
                  }}
                  className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-black/60 hover:bg-[#C89B3C] text-white backdrop-blur-md flex items-center justify-center shadow-lg transition-all cursor-pointer z-10 hover:scale-110 active:scale-95"
                  title={isPlayingGuideHaveVideo ? "Pause" : "Lire la capsule explicative"}
                >
                  {isPlayingGuideHaveVideo ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white translate-x-0.5" />
                  )}
                </button>

                {/* Mute toggle discret */}
                {isPlayingGuideHaveVideo && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsGuideMuted(!isGuideMuted);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors z-20 cursor-pointer"
                  >
                    {isGuideMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#FACC15]" />}
                  </button>
                )}
              </div>

              <p className="text-xs text-[#68655D] leading-relaxed text-center">
                Vérifiez que votre plan est vertical (1080×1920) avec un éclairage soigné et un son clair.
              </p>

              {videoOption === 'HAVE_VIDEO' && (
                <div className="pt-2 border-t border-[#E7E5E4]/80 space-y-2">
                  <input
                    type="file"
                    id="direct-video-input"
                    className="hidden"
                    accept="video/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadedFileName(e.target.files[0].name);
                      }
                    }}
                  />
                  <label
                    htmlFor="direct-video-input"
                    className="block w-full text-center px-4 py-2 rounded-xl bg-[#C89B3C]/15 hover:bg-[#C89B3C]/25 text-xs font-semibold text-[#8B6845] cursor-pointer transition-colors"
                  >
                    {uploadedFileName ? `✓ ${uploadedFileName}` : 'Choisir le fichier vidéo'}
                  </label>
                  <p className="text-[10px] text-[#8B6845] text-center">
                    Formats MP4, MOV, WebM acceptés
                  </p>
                </div>
              )}
            </div>

            {/* OPTION B : Être filmé(e) avec vraie capsule vidéo 9:16 interactive */}
            <div
              onClick={() => setVideoOption('NEED_VIDEOGRAPHER')}
              className={`p-5 rounded-3xl border cursor-pointer transition-all space-y-4 ${
                videoOption === 'NEED_VIDEOGRAPHER'
                  ? 'bg-[#FFFFFF] border-[#C89B3C] shadow-md ring-2 ring-[#C89B3C]/30'
                  : 'bg-[#FFFFFF] hover:bg-[#F9F6EE] border-[#E7E5E4]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#C89B3C]/15 text-[#8B6845]">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-base font-bold text-[#1C1917]">
                    Être filmé(e)
                  </h3>
                  <p className="text-[11px] text-[#8B6845]">
                    Accompagnement par notre réseau
                  </p>
                </div>
              </div>

              {/* VRAIE CAPSULE VIDÉO DE TOURNAGE EN CONDITION FORMAT 9:16 */}
              <div className="relative w-full max-w-[200px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden bg-stone-900 border border-stone-300 shadow-inner group">
                {isPlayingGuideVideographer ? (
                  <video
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
                    autoPlay
                    loop
                    playsInline
                    muted={isGuideMuted}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                    alt="Tournage documentaire"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                
                {/* Repères tournage cinéma REC */}
                <div className="absolute inset-2 border border-white/40 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                  <div className="flex items-center justify-between text-[9px] font-mono text-white drop-shadow">
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span>REC</span>
                    </span>
                    <span className="text-[#FACC15]">4K 9:16</span>
                  </div>
                  <div className="self-center px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white border border-white/20">
                    Tournage encadré
                  </div>
                  <div className="text-[8px] font-mono text-stone-300 text-right drop-shadow">
                    Réseau Artisans
                  </div>
                </div>

                {/* Bouton Play/Pause interactif */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlayingGuideVideographer(!isPlayingGuideVideographer);
                  }}
                  className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-black/60 hover:bg-[#C89B3C] text-white backdrop-blur-md flex items-center justify-center shadow-lg transition-all cursor-pointer z-10 hover:scale-110 active:scale-95"
                  title={isPlayingGuideVideographer ? "Pause" : "Voir le tournage encadré"}
                >
                  {isPlayingGuideVideographer ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white translate-x-0.5" />
                  )}
                </button>

                {/* Mute toggle discret */}
                {isPlayingGuideVideographer && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsGuideMuted(!isGuideMuted);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors z-20 cursor-pointer"
                  >
                    {isGuideMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#FACC15]" />}
                  </button>
                )}
              </div>

              <p className="text-xs text-[#68655D] leading-relaxed text-center">
                Un documentariste de notre réseau se déplace pour réaliser l'entretien dans les règles de l'art.
              </p>

              {videoOption === 'NEED_VIDEOGRAPHER' && (
                <div className="pt-2 border-t border-[#E7E5E4]/80 space-y-2">
                  <input
                    type="text"
                    placeholder="Votre ville / pays"
                    value={videographerCity}
                    onChange={(e) => setVideographerCity(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E7E5E4] text-xs bg-[#FFFFFF] text-[#1C1917] outline-none focus:border-[#C89B3C]"
                  />
                  <input
                    type="text"
                    placeholder="Téléphone ou e-mail"
                    value={videographerContact}
                    onChange={(e) => setVideographerContact(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E7E5E4] text-xs bg-[#FFFFFF] text-[#1C1917] outline-none focus:border-[#C89B3C]"
                  />
                </div>
              )}
            </div>

          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#FAFAF9] border border-[#E7E5E4] text-xs font-medium text-[#1C1917] flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </button>

            <button
              disabled={!videoOption || (videoOption === 'HAVE_VIDEO' && !uploadedFileName)}
              onClick={handleFinishSubmission}
              className={`px-7 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 shadow-sm ${
                videoOption && (videoOption === 'NEED_VIDEOGRAPHER' || uploadedFileName)
                  ? contributionMode === 'explorer'
                    ? 'bg-[#0D9488] hover:bg-[#0F766E] text-[#FFFFFF] cursor-pointer'
                    : 'bg-[#A2482B] hover:bg-[#8B3B20] text-[#FFFFFF] cursor-pointer'
                  : 'bg-[#E7E5E4] text-[#7A756B] opacity-60 cursor-not-allowed'
              }`}
              id="btn-final-submit"
            >
              <span>{videoOption === 'NEED_VIDEOGRAPHER' ? 'Confirmer ma demande' : 'Transmettre mon récit'}</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MODAL VIDÉO DE PRÉSENTATION (FORMAT VERTICAL 9:16 ÉPURÉ & LISIBLE) */}
      {previewDoc && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setPreviewDoc(null)}
        >
          <div 
            className="relative w-full max-w-[340px] sm:max-w-[380px] bg-[#151513] text-[#FFFFFF] rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
            id={`modal-video-${previewDoc.id}`}
          >
            {/* Barre d'en-tête épurée */}
            <div className="w-full px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-black/50">
              <h3 className="font-editorial text-base sm:text-lg font-bold text-white tracking-wide">
                {previewDoc.title}
              </h3>

              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white/90 hover:text-white transition-colors cursor-pointer"
                title="Fermer"
                id="close-preview-video-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lecteur Vidéo au format vertical 9:16 (identique aux duos) */}
            <div className="relative w-full aspect-[9/16] bg-black overflow-hidden flex items-center justify-center">
              <video
                src={SERIES_PRESENTATIONS[previewDoc.id]?.videoUrl || previewDoc.teaserVideoUrl}
                poster={previewDoc.posterUrl || previewDoc.coverImage}
                autoPlay
                loop
                muted={isVideoMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Voile cinématographique pour les contrôles */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Contrôles overlay sobres */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                <button
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className="p-2 rounded-full bg-black/60 hover:bg-white/25 text-white backdrop-blur-md transition-colors cursor-pointer"
                  title={isVideoMuted ? 'Activer le son' : 'Couper le son'}
                >
                  {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Contrôle central play/pause */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
                <button
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="w-14 h-14 rounded-full bg-black/60 hover:bg-[#C89B3C] text-white backdrop-blur-xs flex items-center justify-center transition-transform hover:scale-110 shadow-2xl cursor-pointer"
                  title={isVideoPlaying ? 'Pause' : 'Lecture'}
                >
                  {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
              </div>

              {/* Bouton unique pour sceller le choix directement depuis la vidéo */}
              <div className="absolute bottom-4 inset-x-4 z-10">
                <button
                  onClick={() => {
                    setSelectedDocId(previewDoc.id);
                    setSelectedQuestionNumber(previewDoc.questions[0].number);
                    setPreviewDoc(null);
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#C89B3C] hover:bg-[#B78A2E] text-white font-bold text-xs sm:text-sm tracking-wide shadow-2xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer"
                  id={`confirm-select-doc-${previewDoc.id}`}
                >
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Sceller ce choix</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
