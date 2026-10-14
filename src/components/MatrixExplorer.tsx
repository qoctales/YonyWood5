import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Tv, 
  Globe,
  Compass, 
  Sparkles,
  Star,
  Award,
  Crown,
  HeartHandshake,
  Trees,
  ShoppingBag,
  GraduationCap,
  Flame,
  Users,
  X, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  User,
  Gem,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Layers,
  ChevronDown,
  Film,
  Mountain,
  Atom,
  Fingerprint,
  Sprout,
  BookOpen,
  Video,
  Camera,
  Scale,
  Calculator,
  Hammer,
  Code,
  Palette,
  Mic,
  Scissors,
  Briefcase,
  PenTool,
  Megaphone,
  Utensils,
  HeartPulse,
  Check
} from 'lucide-react';
import { MATRIX_SERIES_DATA, MatrixSeriesConfig, get16ProtagonistsForSeries } from '../data/matrixData';
import { AffiliationPerson, ViewScreen, Protagonist } from '../types';
import { CentralAstrolabeJoystick } from './CentralAstrolabeJoystick';
import { VerticalZoomSlider } from './VerticalZoomSlider';
import { ProtagonistTeaserModal } from './ProtagonistTeaserModal';
import { ResonanceModal } from './ResonanceModal';
import { ProfileSoloIcon } from './YonywoodBrandIcons';
import { ShareIcon } from './ShareIcon';
import { 
  ExplorerCategoryType, 
  EXPLORER_CATEGORIES, 
  EXPLORER_CATALOG, 
  get16StoriesForTopic,
  ExplorerCategoryConfig,
  ExplorerCatalogItem,
  getCountryFlagUrl
} from '../data/explorerTopicsData';
import { celestialAudio } from '../utils/celestialAudio';
import { DimensionIcon } from './DimensionIcon';
import { 
  DIMENSIONS, 
  getSubcategoriesForDimension, 
  SousCategorie 
} from '../data/dimensionsData';
import { SwipeModeHeritage } from './SwipeModeHeritage';

import { getLineageTree, LINEAGE_COLORS } from '../utils/lineageService';

interface MatrixExplorerProps {
  onNavigate: (screen: ViewScreen | any) => void;
  onSelectDocumentary?: (docId: string) => void;
}

// Fonction récursive de calcul des personnes cooptées dans la descendance (mode Séries)
function countDescendants(person: AffiliationPerson): number {
  if (!person.invitedPeople || person.invitedPeople.length === 0) {
    return 0;
  }
  return person.invitedPeople.reduce((total, child) => {
    return total + 1 + countDescendants(child);
  }, 0);
}

// Rayons des orbites concentriques
const R_INNER = 145; // Anneau 1 : Sujets de la Porte active (5 séries, 16 drapeaux, etc.)
const R_OUTER = 280; // Anneau 2 : 16 Voix / Protagonistes
const ORBIT_RADII = [145, 280, 375, 465, 555, 645, 735, 825, 915];



const CATEGORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  series: Film,
  sagesses: Atom,
  territoires: Mountain,
  expertises: GraduationCap,
  personnalites: Star,
  'produits-services': ShoppingBag,
  marques: Gem,
  projets: Sprout,
  // Alias de rétrocompatibilité
  countries: Mountain,
  questions: Atom,
  thematics: GraduationCap,
  personalities: Star,
  brands: Gem,
  projects: Sprout,
  offers: ShoppingBag
};

export const EXPERTISE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  videastes: Video,
  photographes: Camera,
  juristes: Scale,
  comptables: Calculator,
  artisans: Hammer,
  developpeurs: Code,
  designers: Palette,
  'son-musique': Mic,
  monteurs: Scissors,
  producteurs: Briefcase,
  auteurs: PenTool,
  communicants: Megaphone,
  architectes: Compass,
  'chefs-cuisine': Utensils,
  soignants: HeartPulse,
  coachs: Flame,
};

export const MatrixExplorer: React.FC<MatrixExplorerProps> = ({ 
  onNavigate,
  onSelectDocumentary 
}) => {
  // 1. NIVEAU DE NAVIGATION DANS LA ROUE :
  // 'dimensions' (les 8 Portes d'entrée au centre - PAR DÉFAUT LORSQU'ON ARRIVE SUR AGORA)
  // 'stories' (navigation concentrique directe : Anneau 1 8 Sous-catégories avec choix au centre + Anneau 2 16 Voix)
  const [explorerLevel, setExplorerLevel] = useState<'dimensions' | 'stories'>('dimensions');
  const [activeCategory, setActiveCategory] = useState<ExplorerCategoryType>('sagesses');
  const [activeTopicId, setActiveTopicId] = useState<string>('resilience');
  const [shuffleSeed, setShuffleSeed] = useState<number>(0);
  const [topicsShuffleSeed, setTopicsShuffleSeed] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [hoveredTopic, setHoveredTopic] = useState<ExplorerCatalogItem | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<ExplorerCategoryConfig | null>(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState<boolean>(false);
  const [isPersonQuestionModalOpen, setIsPersonQuestionModalOpen] = useState<boolean>(false);
  const [showQuestionInVideo, setShowQuestionInVideo] = useState<boolean>(false);

  // 1b. DOUBLE MODE HÉRITAGES : 'circle' (Astrolabe circulaire) | 'swipe' (Parcours tactile par cartes vidéo)
  const [heritageMode, setHeritageMode] = useState<'circle' | 'swipe'>('circle');
  const [swipeStep, setSwipeStep] = useState<1 | 2 | 3>(1); // 1 = 8 Portes, 2 = Directions, 3 = Protagonistes
  const [swipeDoorIndex, setSwipeDoorIndex] = useState<number>(0);
  const [swipeSubIndex, setSwipeSubIndex] = useState<number>(0);
  const [swipeSelectedSubcategory, setSwipeSelectedSubcategory] = useState<SousCategorie | null>(null);
  const [swipePersonIndex, setSwipePersonIndex] = useState<number>(0);
  const [isSwipeVideoPlaying, setIsSwipeVideoPlaying] = useState<boolean>(true);
  const [isSwipeVideoMuted, setIsSwipeVideoMuted] = useState<boolean>(true);
  const swipeVideoRef = useRef<HTMLVideoElement | null>(null);
  const [swipeTouchStartX, setSwipeTouchStartX] = useState<number | null>(null);
  const [swipeTouchEndX, setSwipeTouchEndX] = useState<number | null>(null);
  const [swipeQuestionModalData, setSwipeQuestionModalData] = useState<{ title: string; question: string } | null>(null);

  // Filtrage par série (si mode séries)
  const [selectedSeriesId, setSelectedSeriesId] = useState<string>('jesus-legba');
  const [teaserProtagonist, setTeaserProtagonist] = useState<Protagonist | null>(null);

  // 2. Navigation spatiale : rotation, zoom et pan
  // Calibrage automatique du zoom initial pour adapter parfaitement le cercle des 16 visages à l'écran mobile
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w < 640) {
        // Cercle diamètre complet ~620px -> adaptation automatique et aérée pour dégager la barre de navigation
        const availableW = w - 40;
        const availableH = h - 220; // 220px pour l'en-tête (60px) + la barre de navigation basse (90px) + marges d'aération
        return Math.min(0.48, Math.max(0.36, Math.min(availableW / 640, availableH / 640)));
      }
      if (w < 1024) return 0.72;
    }
    return 0.88;
  });
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Écoute du redimensionnement pour maintenir le cercle calibré sur smartphone
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w < 640) {
        setZoomLevel(prev => {
          // Si l'utilisateur n'a pas déjà manuellement dézoomé/zoomé loin
          if (prev >= 0.6) {
            const availableW = w - 40;
            const availableH = h - 220;
            return Math.min(0.48, Math.max(0.36, Math.min(availableW / 640, availableH / 640)));
          }
          return prev;
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Références d'interaction pour la rotation fluide par glisser-déposer
  const containerRef = useRef<HTMLDivElement>(null);
  const isRotatingRef = useRef<boolean>(false);
  const pointerStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastPointerAngleRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  // 3. Chemin de cooptation généalogique [idGen1, idGen2, ...] en mode Séries & Lignée
  const [selectedPath, setSelectedPath] = useState<string[]>([]);

  // 4. Modale vidéo 9:16 pour la personne sélectionnée
  const [modalPerson, setModalPerson] = useState<AffiliationPerson | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isResonanceModalOpen, setIsResonanceModalOpen] = useState<boolean>(false);
  const [personResonancePct, setPersonResonancePct] = useState<number | null>(null);
  const [isShareCopied, setIsShareCopied] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Configuration de la catégorie active
  const activeCategoryConfig = useMemo<ExplorerCategoryConfig>(() => {
    return EXPLORER_CATEGORIES.find(c => c.id === activeCategory) || EXPLORER_CATEGORIES[0];
  }, [activeCategory]);

  // Liste des 16 sujets pour la catégorie active (renouvelable via le bouton Shuffle)
  const topicsForCategory = useMemo<ExplorerCatalogItem[]>(() => {
    const raw = EXPLORER_CATALOG[activeCategory] || EXPLORER_CATALOG['countries'];
    if (topicsShuffleSeed === 0 || raw.length <= 1) return raw;
    const offset = (topicsShuffleSeed * 5) % raw.length;
    return [...raw.slice(offset), ...raw.slice(0, offset)];
  }, [activeCategory, topicsShuffleSeed]);

  // Sujet actif sélectionné
  const activeTopicItem = useMemo<ExplorerCatalogItem | undefined>(() => {
    return topicsForCategory.find(t => t.id === activeTopicId) || topicsForCategory[0];
  }, [topicsForCategory, activeTopicId]);

  // Icône officielle du sujet actif sélectionné (ex: "14-passions/musique", avec le casque)
  const activeTopicIcon = useMemo<string | undefined>(() => {
    if (!activeTopicItem) return undefined;
    if (activeCategory === 'series') return '16-series/_dimension';
    return (activeTopicItem as any).iconName || `${activeCategory}/${activeTopicItem.id}`;
  }, [activeTopicItem, activeCategory]);

  // Icône du sujet survolé sur l'anneau intérieur (pour prévisualisation dynamique au centre)
  const hoveredTopicIcon = useMemo<string | undefined>(() => {
    if (!hoveredTopic) return undefined;
    if (activeCategory === 'series') return '16-series/_dimension';
    return (hoveredTopic as any).iconName || `${activeCategory}/${hoveredTopic.id}`;
  }, [hoveredTopic, activeCategory]);

  // Série active (si mode Séries)
  const activeSeries = useMemo<MatrixSeriesConfig>(() => {
    return MATRIX_SERIES_DATA.find(s => s.seriesId === selectedSeriesId) || MATRIX_SERIES_DATA[0];
  }, [selectedSeriesId]);

  // 16 Voix / Histoires humaines affichées sur la roue en niveau 'stories' (garantit 16 protagonistes pour chaque série)
  const storiesList = useMemo<AffiliationPerson[]>(() => {
    if (activeCategory === 'series') {
      return get16ProtagonistsForSeries(activeSeries, activeTopicId, shuffleSeed);
    }
    return get16StoriesForTopic(activeTopicId, shuffleSeed);
  }, [activeCategory, activeSeries, activeTopicId, shuffleSeed]);

  // --- DONNÉES DU MODE SWIPE HÉRITAGES ---
  const currentSwipeDoor = DIMENSIONS[swipeDoorIndex] || DIMENSIONS[0];
  const swipeSubcategories = useMemo<SousCategorie[]>(() => {
    return getSubcategoriesForDimension(currentSwipeDoor.id);
  }, [currentSwipeDoor]);

  const currentSubcategory = swipeSubcategories[swipeSubIndex] || swipeSubcategories[0];

  const swipeProtagonists = useMemo<AffiliationPerson[]>(() => {
    const sub = swipeSelectedSubcategory || currentSubcategory;
    if (!sub) return [];
    if (sub.dimensionId === 'series') {
      const seriesConfig = MATRIX_SERIES_DATA.find(s => s.seriesId === sub.slug) || MATRIX_SERIES_DATA[0];
      return get16ProtagonistsForSeries(seriesConfig, sub.slug, shuffleSeed);
    }
    return get16StoriesForTopic(sub.slug, shuffleSeed);
  }, [swipeSelectedSubcategory, currentSubcategory, shuffleSeed]);

  const currentSwipePerson = swipeProtagonists[swipePersonIndex] || swipeProtagonists[0];

  const handleNextSwipeDoor = () => {
    setSwipeDoorIndex(prev => (prev + 1) % DIMENSIONS.length);
    setSwipeSubIndex(0);
    celestialAudio.playOrbSelect();
  };
  const handlePrevSwipeDoor = () => {
    setSwipeDoorIndex(prev => (prev - 1 + DIMENSIONS.length) % DIMENSIONS.length);
    setSwipeSubIndex(0);
    celestialAudio.playOrbSelect();
  };

  const handleNextSwipeSub = () => {
    if (swipeSubcategories.length === 0) return;
    setSwipeSubIndex(prev => (prev + 1) % swipeSubcategories.length);
    celestialAudio.playOrbSelect();
  };
  const handlePrevSwipeSub = () => {
    if (swipeSubcategories.length === 0) return;
    setSwipeSubIndex(prev => (prev - 1 + swipeSubcategories.length) % swipeSubcategories.length);
    celestialAudio.playOrbSelect();
  };

  const handleNextSwipePerson = () => {
    if (swipeProtagonists.length === 0) return;
    setSwipePersonIndex(prev => (prev + 1) % swipeProtagonists.length);
  };
  const handlePrevSwipePerson = () => {
    if (swipeProtagonists.length === 0) return;
    setSwipePersonIndex(prev => (prev - 1 + swipeProtagonists.length) % swipeProtagonists.length);
  };

  const onSwipeTouchStartHandler = (e: React.TouchEvent) => {
    setSwipeTouchEndX(null);
    setSwipeTouchStartX(e.targetTouches[0].clientX);
  };
  const onSwipeTouchMoveHandler = (e: React.TouchEvent) => {
    setSwipeTouchEndX(e.targetTouches[0].clientX);
  };
  const onSwipeTouchEndHandler = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
    if (swipeTouchStartX === null || swipeTouchEndX === null) return;
    const distance = swipeTouchStartX - swipeTouchEndX;
    if (distance > 40) onSwipeLeft();
    else if (distance < -40) onSwipeRight();
    setSwipeTouchStartX(null);
    setSwipeTouchEndX(null);
  };

  // Synchronisation de la résonance
  const currentPersonForResonance = modalPerson || (heritageMode === 'swipe' ? currentSwipePerson : null);
  useEffect(() => {
    if (currentPersonForResonance) {
      try {
        const stored = localStorage.getItem(`yonywood_resonance_story-${currentPersonForResonance.id}`);
        if (stored) {
          const val = parseInt(stored, 10);
          setPersonResonancePct(isNaN(val) ? null : val);
        } else {
          setPersonResonancePct(null);
        }
      } catch {
        setPersonResonancePct(null);
      }
    }
  }, [currentPersonForResonance]);

  // Commande vidéo 9:16
  const toggleVideoPlayback = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleOpenUniverse = (person: AffiliationPerson) => {
    celestialAudio.playRevealDeep();
    try {
      localStorage.setItem(`yonywood_person_${person.id}`, JSON.stringify(person));
    } catch {
      // noop
    }
    setModalPerson(null);
    setIsPlaying(false);
    setIsResonanceModalOpen(false);
    onNavigate({ 
      type: 'protagonist_profile', 
      protagonistId: person.id 
    });
  };

  const handleShareModalPerson = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!modalPerson) return;
    const shareUrl = `${window.location.origin}?protagonist=${modalPerson.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setIsShareCopied(true);
        setTimeout(() => setIsShareCopied(false), 2000);
      }).catch(() => {
        setIsShareCopied(true);
        setTimeout(() => setIsShareCopied(false), 2000);
      });
    } else {
      setIsShareCopied(true);
      setTimeout(() => setIsShareCopied(false), 2000);
    }
  };

  // Action Actualiser : découverte de 16 autres voix avec feedback haptique / visuel
  const handleActualiser = () => {
    setIsRefreshing(true);
    setShuffleSeed(prev => prev + 1);
    setSelectedPath([]);
    celestialAudio.playOrbSelect();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 450);
  };

  // Clic au centre de l'astrolabe :
  // Au niveau des portes : entre directement dans la porte choisie (avec la sous-catégorie par défaut au centre)
  // Au niveau direct (8 sous-catégories & 16 voix) : renouvelle immédiatement les 16 voix
  const handleCenterHubClick = () => {
    celestialAudio.playOrbSelect();
    if (explorerLevel === 'dimensions') {
      if (hoveredCategory) {
        handleSelectDimension(hoveredCategory.id);
      } else {
        handleSelectDimension(activeCategory || 'sagesses');
      }
    } else {
      handleActualiser();
    }
  };

  // Sélection d'une des 8 grandes Portes d'entrée -> arrive DIRECTEMENT sur les 8 options et l'apparition des protagonistes
  const handleSelectDimension = (catId: ExplorerCategoryType) => {
    celestialAudio.playOrbSelect();
    setActiveCategory(catId);
    // Sélectionner automatiquement la sous-catégorie par défaut de cette Porte qui trônera au centre
    const firstTopic = EXPLORER_CATALOG[catId]?.[0];
    if (firstTopic) {
      setActiveTopicId(firstTopic.id);
      if (catId === 'series') {
        setSelectedSeriesId(firstTopic.id);
      }
    }
    setHoveredTopic(null);
    setShuffleSeed(0);
    setSelectedPath([]);
    setIsQuestionModalOpen(false);
    // SAUT DE L'ÉTAPE INTERMÉDIAIRE : Arrivée directe sur les 8 options et les 16 protagonistes
    setExplorerLevel('stories');
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 300);
  };

  // Revenir aux 8 Portes d'entrée : réinitialise tout état transitoire ou survolé
  const handleBackToDimensions = () => {
    celestialAudio.playOrbSelect();
    setExplorerLevel('dimensions');
    setHoveredTopic(null);
    setHoveredCategory(null);
    setIsQuestionModalOpen(false);
  };

  // Sélection d'une des 8 options sur l'anneau intérieur -> l'option choisie apparaît au centre et actualise les 16 voix
  const handleSelectTopic = (topicId: string) => {
    celestialAudio.playOrbSelect();
    setActiveTopicId(topicId);
    if (activeCategory === 'series') {
      setSelectedSeriesId(topicId);
    }
    setHoveredTopic(null);
    setShuffleSeed(0);
    setSelectedPath([]);
    setIsQuestionModalOpen(false);
    setExplorerLevel('stories');
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 300);
  };

  // Coordonnées du sujet actif sur l'anneau intérieur (pour relier aux 16 voix de l'anneau extérieur)
  const activeTopicCoords = useMemo<{ x: number; y: number }>(() => {
    const topicIdx = topicsForCategory.findIndex(t => t.id === activeTopicId);
    const validIdx = topicIdx >= 0 ? topicIdx : 0;
    const angle = -90 + validIdx * (360 / topicsForCategory.length);
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * R_INNER,
      y: Math.sin(rad) * R_INNER
    };
  }, [topicsForCategory, activeTopicId]);

  // Reset spatial
  const handleResetView = () => {
    setRotationAngle(0);
    setZoomLevel(1.0);
    setPan({ x: 0, y: 0 });
  };

  // Interaction tactile et souris sur le canevas
  const getAngleFromCenter = (clientX: number, clientY: number): number => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button, input, [role="button"]')) return;
    pointerStartPosRef.current = { x: e.clientX, y: e.clientY };
    hasDraggedRef.current = false;
    isRotatingRef.current = true;
    lastPointerAngleRef.current = getAngleFromCenter(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isRotatingRef.current) return;
    const moveDist = Math.hypot(
      e.clientX - pointerStartPosRef.current.x,
      e.clientY - pointerStartPosRef.current.y
    );
    if (moveDist > 6) {
      hasDraggedRef.current = true;
    }

    const currentAngle = getAngleFromCenter(e.clientX, e.clientY);
    let delta = currentAngle - lastPointerAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    setRotationAngle(prev => (prev + delta + 360) % 360);
    lastPointerAngleRef.current = currentAngle;
  };

  const handlePointerUp = () => {
    isRotatingRef.current = false;
  };

  // Clic sur un nœud personne en mode 'stories' :
  // - 1er clic sur une personne : la sélectionne et déploie immédiatement sa Lignée
  //   (trait fin Miel pour l'ascendance, traits fins Terre cuite pour sa descendance de 1 à 4 enfants)
  // - Reclic sur cette même personne : ouvre directement sa vidéo de présentation 9:16
  // - Clic sur n'importe quelle personne liée (ascendant ou descendant) : pivote sur elle et déploie sa lignée à l'infini
  const handleNodeClick = (person: AffiliationPerson) => {
    celestialAudio.playOrbHover(580);
    const isAlreadySelected = selectedPath.length > 0 && selectedPath[selectedPath.length - 1] === person.id;

    if (isAlreadySelected) {
      // Reclic sur la personne active : ouvre directement la carte vidéo 9:16
      setModalPerson(person);
      setIsPlaying(true);
      return;
    }

    // Déploiement multi-niveaux sans perte de contexte (jusqu'à 8 degrés) :
    // - Si la personne est déjà dans la chaîne, on tronque jusqu'à elle
    // - Si la personne est un nouveau niveau, on l'ajoute à la suite (N+1)
    setSelectedPath(prev => {
      const idx = prev.indexOf(person.id);
      if (idx !== -1) {
        return prev.slice(0, idx + 1);
      }
      if (prev.length >= 8) {
        return [...prev.slice(0, 7), person.id];
      }
      return [...prev, person.id];
    });
  };

  // Calcul des nœuds et des liens pour chaque niveau d'affichage de la roue
  const { nodesByGeneration, connectingLinks } = useMemo(() => {
    interface NodeItem {
      person: AffiliationPerson;
      gen: number;
      x: number;
      y: number;
      angle: number;
      descendantCount: number;
      isSelected: boolean;
      roleInLineage?: 'selected' | 'ascendant' | 'descendant';
      nodeKey: string;
      clipId: string;
    }

    interface LinkItem {
      id: string;
      from: { x: number; y: number };
      to: { x: number; y: number };
      isActive: boolean;
      strokeColor: string; // Miel (#C89B3C) pour ascendance, Terre cuite (#A2482B) pour descendance
      type: 'ascendant' | 'descendant';
    }

    const genNodes: NodeItem[][] = [];
    const links: LinkItem[] = [];

    if (explorerLevel === 'stories') {
      // --- NIVEAU 1 : 16 VOIX / PIONNIERS SUR L'ORBITE R_OUTER (280) ---
      const r1 = R_OUTER;
      const activeId = selectedPath.length > 0 ? selectedPath[selectedPath.length - 1] : null;

      const gen1Nodes: NodeItem[] = storiesList.map((p, idx) => {
        const angle = -90 + idx * (360 / 16);
        const rad = (angle * Math.PI) / 180;
        const isSel = selectedPath.includes(p.id);
        const isActive = activeId === p.id;
        return {
          person: p,
          gen: 1,
          x: Math.cos(rad) * r1,
          y: Math.sin(rad) * r1,
          angle,
          descendantCount: activeCategory === 'series' ? countDescendants(p) : 0,
          isSelected: isSel,
          roleInLineage: isActive ? 'selected' : undefined,
          nodeKey: `node-g1-${p.id}`,
          clipId: `clip-g1-${p.id}`
        };
      });
      genNodes.push(gen1Nodes);

      // Pas de nœuds ascendants sur la matrice : les liens et cercles ascendants ne sont pas affichés ici
      // afin de préserver l'élégance et la clarté du design (la lignée ascendante s'affiche sur la page de profil)

      // --- DÉPLOIEMENT EN CASCADE MULTI-NIVEAUX SANS PERTE DE CONTEXTE (JUSQU'À 8 DEGRÉS) ---
      const allPositionedNodes = new Map<string, NodeItem>();
      genNodes.flat().forEach(n => allPositionedNodes.set(n.person.id, n));

      const ringRadii = [280, 375, 465, 555, 645, 735, 825, 915];

      for (let d = 0; d < Math.min(selectedPath.length, 7); d++) {
        const parentId = selectedPath[d];
        const parentNode = allPositionedNodes.get(parentId);
        if (!parentNode) continue;

        const nextGen = d + 2; // Niveau 2 à 8
        const r = ringRadii[d + 1] || (280 + (d + 1) * 90);

        const parentLineage = getLineageTree(parentNode.person || parentId);
        const rawChildren: AffiliationPerson[] = ((parentNode.person.invitedPeople && parentNode.person.invitedPeople.length > 0)
          ? parentNode.person.invitedPeople.slice(0, 4)
          : parentLineage.descendants.slice(0, 4)
        ).map((c, cIdx) => {
          const uniqueChildId = `${c.id}-g${nextGen}-${parentId.slice(-6)}-${cIdx}`;
          return {
            id: uniqueChildId,
            name: c.name,
            firstName: c.firstName,
            age: Math.max(20, 34 - d * 2),
            role: c.role,
            territory: c.territory,
            country: c.country,
            flag: c.flag,
            universeTag: c.universeTag || parentNode.person.universeTag,
            photoUrl: c.photoUrl,
            badge: `Degré ${d + 2}`,
            invitationStory: c.invitationStory || `Alliance de cooptation mutuelle au degré ${d + 2}.`,
            teaserVideoUrl: c.teaserVideoUrl,
            teaserPitch: c.quote,
            generation: nextGen
          };
        });

        const childCount = rawChildren.length;
        if (childCount > 0) {
          const span = childCount === 1 ? 0 : Math.min(75, Math.max(28, (childCount - 1) * 20));
          const childNodes: NodeItem[] = [];

          rawChildren.forEach((child, cIdx) => {
            let childAngle = parentNode.angle;
            if (childCount > 1) {
              childAngle = parentNode.angle - span / 2 + cIdx * (span / (childCount - 1));
            }
            const childRad = (childAngle * Math.PI) / 180;
            const x = Math.cos(childRad) * r;
            const y = Math.sin(childRad) * r;
            const isSel = selectedPath.includes(child.id);
            const isNextInPath = selectedPath[d + 1] === child.id;

            links.push({
              id: `link-cascade-${nextGen}-${parentId}-${child.id}-${cIdx}`,
              from: { x: parentNode.x, y: parentNode.y },
              to: { x, y },
              isActive: isSel || isNextInPath,
              strokeColor: LINEAGE_COLORS.terracotta,
              type: 'descendant'
            });

            const nodeItem: NodeItem = {
              person: child,
              gen: nextGen,
              x,
              y,
              angle: childAngle,
              descendantCount: 0,
              isSelected: isSel,
              roleInLineage: isSel ? 'selected' : 'descendant',
              nodeKey: `node-g${nextGen}-${parentId}-${child.id}-${cIdx}`,
              clipId: `clip-g${nextGen}-${parentId}-${child.id}-${cIdx}`
            };

            childNodes.push(nodeItem);
            allPositionedNodes.set(child.id, nodeItem);
          });

          genNodes.push(childNodes);
        }
      }
    }

    return { nodesByGeneration: genNodes, connectingLinks: links };
  }, [explorerLevel, storiesList, selectedPath, activeCategory, activeTopicCoords]);

  // Personne actuellement sélectionnée
  const selectedPerson = useMemo<AffiliationPerson | null>(() => {
    if (selectedPath.length === 0) return null;
    const targetId = selectedPath[selectedPath.length - 1];
    return nodesByGeneration.flatMap(nodes => nodes).find(n => n.person.id === targetId)?.person || null;
  }, [selectedPath, nodesByGeneration]);

  // Auto-mise à l'échelle (zoom dynamique) selon la profondeur de cascade (jusqu'à 8 degrés) :
  // À mesure qu'on explore en profondeur, la roue ajuste fluidement son échelle globale
  // pour que tous les anneaux et liens restent parfaitement visibles et cliquables.
  const depth = selectedPath.length;
  const depthScaleFactor = useMemo(() => {
    if (depth <= 1) return 1;
    return Math.max(0.35, 1 / (1 + (depth - 1) * 0.14));
  }, [depth]);

  const effectiveZoom = zoomLevel * depthScaleFactor;

  return (
    <div 
      ref={containerRef}
      id="matrix-explorer-container"
      className={`relative w-full h-full min-h-[100dvh] bg-white text-[#1C1917] overflow-hidden select-none ${heritageMode === 'circle' ? 'touch-none' : 'touch-pan-y'} pt-safe pb-safe`}
      onPointerDown={heritageMode === 'circle' ? handlePointerDown : undefined}
      onPointerMove={heritageMode === 'circle' ? handlePointerMove : undefined}
      onPointerUp={heritageMode === 'circle' ? handlePointerUp : undefined}
      onPointerCancel={heritageMode === 'circle' ? handlePointerUp : undefined}
    >
      {/* Texture subtile de fond céleste & géométrie sacrée discrète */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #A2482B 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 1. BARRE SUPÉRIEURE : EN-TÊTE HARMONISÉ EXACTEMENT AU MÊME ENDROIT QUE STUDIO ET PRODUCTIONS */}
      <div className="absolute top-0 left-0 right-0 z-40 w-full pointer-events-none">
        <div className="w-full max-w-3xl mx-auto px-3 sm:px-6 py-2 sm:py-4">
          <header className="flex items-center justify-between border-b border-[#E7E5E4] pb-2 sm:pb-2.5 shrink-0 gap-2 pointer-events-auto">
            {/* Titre Héritages */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <h1 className="font-editorial text-lg sm:text-2xl font-bold text-[#1C1917] tracking-tight">
                Héritages
              </h1>
            </div>

            {heritageMode === 'swipe' ? (
              <div className="flex items-center gap-1.5 shrink-0 min-w-0">
                {swipeStep === 1 && (
                  <div className="flex items-center gap-1.5 h-7.5 sm:h-8.5 px-3 rounded-full bg-[#A2482B] text-white shadow-xs border border-[#8A3B22] text-[11px] sm:text-xs font-semibold shrink-0">
                    <Layers className="w-3.5 h-3.5" />
                    <span>8 Portes</span>
                  </div>
                )}
                {swipeStep === 2 && (
                  <>
                    <button
                      id="btn-swipe-back-to-doors"
                      onClick={() => {
                        setSwipeStep(1);
                        celestialAudio.playOrbSelect();
                      }}
                      className="h-7.5 sm:h-8.5 px-2.5 sm:px-3 rounded-full bg-white hover:bg-stone-50 text-stone-900 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 border border-[#A2482B] shadow-xs cursor-pointer transition-all active:scale-95 shrink-0"
                      title="Revenir aux 8 Portes"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-[#A2482B]" />
                      <span>Portes</span>
                    </button>
                    <div className="h-7.5 sm:h-8.5 px-2.5 rounded-full bg-stone-100 border border-stone-300 text-stone-800 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 shrink-0">
                      <DimensionIcon 
                        name={currentSwipeDoor.icone} 
                        size={14} 
                        className="text-[#A2482B]" 
                      />
                      <span className="truncate max-w-[120px]">{currentSwipeDoor.shortLabel}</span>
                    </div>
                  </>
                )}
                {swipeStep === 3 && (
                  <>
                    <button
                      id="btn-swipe-back-to-directions"
                      onClick={() => {
                        setSwipeStep(2);
                        celestialAudio.playOrbSelect();
                      }}
                      className="h-7.5 sm:h-8.5 px-2.5 sm:px-3 rounded-full bg-white hover:bg-stone-50 text-stone-900 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 border border-[#A2482B] shadow-xs cursor-pointer transition-all active:scale-95 shrink-0"
                      title="Revenir aux Directions"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-[#A2482B]" />
                      <span>Directions</span>
                    </button>
                    <div className="h-7.5 sm:h-8.5 pl-2 sm:pl-2.5 pr-2.5 rounded-full bg-[#A2482B] text-white shadow-xs border border-[#8A3B22] flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold shrink-0 max-w-[150px] sm:max-w-[210px]">
                      <DimensionIcon 
                        name={swipeSelectedSubcategory?.icone || currentSwipeDoor.icone} 
                        size={13} 
                        className="text-white shrink-0 drop-shadow-xs" 
                      />
                      <span className="truncate">{swipeSelectedSubcategory?.label}</span>
                    </div>
                  </>
                )}
              </div>
            ) : explorerLevel === 'dimensions' ? (
              /* Niveau 0 : Les 8 Portes d'entrée */
              <div className="flex items-center gap-1.5 h-7.5 sm:h-8.5 px-3 rounded-full bg-[#A2482B] text-white shadow-xs border border-[#8A3B22] text-[11px] sm:text-xs font-semibold shrink-0">
                <Layers className="w-3.5 h-3.5" />
                <span>8 Portes</span>
              </div>
            ) : (
              /* Niveau direct : 8 sous-catégories avec choix au centre + 16 voix */
              <div className="flex items-center gap-1.5 shrink-0 min-w-0">
                {/* Bouton retour aux Portes */}
                <button
                  id="breadcrumb-dimensions-btn"
                  onClick={handleBackToDimensions}
                  className="h-7.5 sm:h-8.5 px-2.5 sm:px-3 rounded-full bg-white hover:bg-stone-50 text-stone-900 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 border border-[#A2482B] shadow-xs cursor-pointer transition-all active:scale-95 shrink-0"
                  title="Revenir aux 8 Portes"
                >
                  <Layers className="w-3.5 h-3.5 text-[#A2482B]" />
                  <span>Portes</span>
                </button>

                {/* Porte active */}
                <div className="h-7.5 sm:h-8.5 px-2.5 rounded-full bg-stone-100 border border-stone-300 text-stone-800 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 shrink-0">
                  <DimensionIcon 
                    name={activeCategory === 'series' ? '16-series/_dimension' : `${activeCategory}/_dimension`} 
                    size={14} 
                    className="text-[#A2482B]" 
                  />
                  <span className="truncate max-w-[85px] sm:max-w-[130px]">{activeCategoryConfig.shortLabel}</span>
                </div>

                {/* Sujet actif sélectionné (au centre) & Bouton Actualiser */}
                <div className="h-7.5 sm:h-8.5 pl-2 sm:pl-2.5 pr-1 rounded-full bg-[#A2482B] text-white shadow-xs border border-[#8A3B22] flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold shrink-0 max-w-[190px] sm:max-w-[300px]">
                  {activeCategory === 'series' && activeTopicItem?.photoUrl ? (
                    <img 
                      src={activeTopicItem.photoUrl} 
                      alt="" 
                      className="w-4 h-4 rounded-full object-cover border border-[#FFE7A3]/80 shrink-0" 
                    />
                  ) : activeTopicIcon ? (
                    <DimensionIcon 
                      name={activeTopicIcon} 
                      size={13} 
                      className="text-white shrink-0 drop-shadow-xs" 
                    />
                  ) : null}
                  <button
                    id="breadcrumb-topic-title-btn"
                    onClick={() => {
                      if (activeTopicItem?.question || activeTopicItem?.subtitle) {
                        setIsQuestionModalOpen(prev => !prev);
                      }
                    }}
                    className={`truncate text-white transition-colors ${
                      (activeTopicItem?.question || activeTopicItem?.subtitle) ? 'cursor-pointer hover:text-[#FFE7A3]' : 'cursor-default'
                    }`}
                    title={activeTopicItem?.question ? "Cliquer pour afficher la question associée" : activeTopicItem?.title}
                  >
                    <span className="truncate">{activeTopicItem?.title}</span>
                  </button>

                  {/* Symbole discret pour actualiser les 16 voix */}
                  <button
                    id="btn-symbol-16-autres-voix"
                    onClick={handleActualiser}
                    className="w-5.5 h-5.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#A2482B] border border-white/30 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-90 group shrink-0"
                    title="Actualiser : 16 autres voix"
                  >
                    <RefreshCw className={`w-2.5 h-2.5 transition-transform ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 duration-500'}`} />
                  </button>
                </div>
              </div>
            )}

            {/* Bascule Vue Cercle / Vue Swipe (Identique au bouton Deck/Duo des duos) */}
            <button
              id="btn-toggle-heritage-mode"
              onClick={() => {
                setHeritageMode(prev => prev === 'circle' ? 'swipe' : 'circle');
                celestialAudio.playOrbSelect();
              }}
              className="flex items-center gap-1 h-7.5 sm:h-8.5 px-2.5 sm:px-3 rounded-full bg-white hover:bg-[#A2482B] border border-stone-200 hover:border-[#A2482B] text-[#1C1917] hover:text-white text-[11px] sm:text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95 group/modetoggle shrink-0"
              title={heritageMode === 'circle' ? 'Passer en vue Swipe (Cartes)' : 'Passer en vue Cercle (Exploration céleste)'}
            >
              {heritageMode === 'circle' ? (
                <>
                  <Layers className="w-3.5 h-3.5 text-[#A2482B] group-hover/modetoggle:text-white transition-colors" />
                  <span className="hidden sm:inline">Swipe</span>
                </>
              ) : (
                <>
                  <Compass className="w-3.5 h-3.5 text-[#A2482B] group-hover/modetoggle:text-white transition-colors" />
                  <span className="hidden sm:inline">Cercle</span>
                </>
              )}
            </button>
          </header>
        </div>
      </div>

      {/* POP-OVER AÉRÉ DE LA QUESTION (S'affiche au clic sur le Sujet pour toute sous-catégorie) */}
      {isQuestionModalOpen && (activeTopicItem?.question || activeTopicItem?.subtitle) && (
        <div 
          id="topic-question-popover"
          className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-40 max-w-[92vw] sm:max-w-xl p-4 sm:p-5 rounded-2xl bg-stone-900/95 backdrop-blur-md border border-[#C89B3C]/70 shadow-2xl text-center pointer-events-auto animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="text-xs uppercase tracking-wider text-[#F5D88C] font-semibold">
              {activeCategoryConfig.shortLabel} · {activeTopicItem?.title}
            </span>
            <button
              onClick={() => setIsQuestionModalOpen(false)}
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 flex items-center justify-center cursor-pointer transition-colors text-xs"
              title="Fermer"
            >
              ✕
            </button>
          </div>
          <p className="text-sm sm:text-base italic font-serif text-stone-100 leading-relaxed">
            « {activeTopicItem?.question || activeTopicItem?.subtitle} »
          </p>
        </div>
      )}

      {heritageMode === 'circle' ? (
        <>
          {/* 2. SLIDER DE ZOOM VERTICAL LATÉRAL (DESKTOP) & CONTRÔLE DISCRET (MOBILE) */}
          <div className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
        <VerticalZoomSlider 
          zoomLevel={zoomLevel}
          onZoomChange={setZoomLevel}
          minZoom={0.5}
          maxZoom={1.5}
        />
      </div>

      {/* Sur smartphone : mini boutons zoom flottants en bas à droite au-dessus du menu pour dégager 100% de la roue */}
      <div className="sm:hidden absolute right-3 bottom-24 z-30 pointer-events-auto flex flex-col gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-full border border-stone-200/90 shadow-md">
        <button
          onClick={() => setZoomLevel(prev => Math.min(1.5, Number((prev + 0.08).toFixed(2))))}
          className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center text-sm font-bold active:scale-90 cursor-pointer"
          title="Zoomer"
        >
          +
        </button>
        <button
          onClick={() => setZoomLevel(prev => Math.max(0.35, Number((prev - 0.08).toFixed(2))))}
          className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center text-sm font-bold active:scale-90 cursor-pointer"
          title="Dézoomer"
        >
          −
        </button>
      </div>

      {/* 3. SCÈNE CENTRALE : ROUE PLANÉTAIRE & CONSTELLATIONS (Parfaitement centrée dans l'espace utile entre l'en-tête et le menu inférieur) */}
      <div 
        className="absolute top-[46%] sm:top-[48%] left-1/2 w-0 h-0 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${effectiveZoom})`
        }}
      >
        {/* Rotation générale de l'astrolabe */}
        <div 
          className="relative w-0 h-0 transition-transform duration-75 ease-out"
          style={{
            transform: `rotate(${rotationAngle}deg)`
          }}
        >
          <svg 
            className="overflow-visible absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            width="2400"
            height="2400"
            viewBox="-1200 -1200 2400 2400"
          >
            <defs>
              {/* Halos dorés d'aura lumineuse pour les profils actifs */}
              <radialGradient id="nodeActiveGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C89B3C" stopOpacity="0.6" />
                <stop offset="45%" stopColor="#C89B3C" stopOpacity="0.25" />
                <stop offset="75%" stopColor="#C89B3C" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#C89B3C" stopOpacity="0" />
              </radialGradient>

              {/* Rétro-éclairage scénique ambré diffus pour cellule alvéolaire */}
              <filter id="amberScenicBacklight" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* ClipPaths circulaires pour les personnes sur tous les anneaux */}
              {nodesByGeneration.flatMap(nodes => nodes).map((node, nodeIdx) => {
                const radius = node.gen === 1 ? 23 : Math.max(16, 21 - Math.min(node.gen, 8) * 0.6);
                return (
                  <clipPath key={`clip-defs-${node.clipId}-${nodeIdx}`} id={node.clipId}>
                    <circle cx={node.x} cy={node.y} r={radius} />
                  </clipPath>
                );
              })}

              {/* ClipPaths circulaires pour tous les sujets sur l'anneau intérieur (y compris les 8 séries) */}
              {topicsForCategory.map((topic, idx) => {
                const angle = -90 + idx * (360 / topicsForCategory.length);
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * R_INNER;
                const y = Math.sin(rad) * R_INNER;
                return (
                  <clipPath key={`clip-inner-circle-${topic.id}`} id={`clip-inner-circle-${topic.id}`}>
                    <circle cx={x} cy={y} r="21" />
                  </clipPath>
                );
              })}

              {/* ClipPaths circulaires pour les 16 Portes (Piste 1) */}
              {EXPLORER_CATEGORIES.map((cat, idx) => {
                const angle = -90 + idx * (360 / EXPLORER_CATEGORIES.length);
                const rad = (angle * Math.PI) / 180;
                const r = 215;
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                return (
                  <clipPath key={`clip-hublot-${cat.id}`} id={`clip-hublot-${cat.id}`}>
                    <circle cx={x} cy={y} r="26" />
                  </clipPath>
                );
              })}
            </defs>

            {/* A. CERCLES ORBITAUX : UNIQUEMENT LE 1ER CERCLE (16 CHOIX), LE 2ÈME (PROTAGONISTES), ET CEUX QUI VIENNENT APRÈS */}
            {(() => {
              // En niveau dimensions (8 portes) ou topics (8 propositions) : seul l'anneau des 8 médaillons (215) est tracé
              if (explorerLevel === 'dimensions' || explorerLevel === 'topics') {
                return (
                  <circle 
                    cx="0" 
                    cy="0" 
                    r="215" 
                    fill="none" 
                    stroke="#C89B3C" 
                    strokeWidth="1.2" 
                    strokeDasharray="none" 
                    opacity="0.5" 
                  />
                );
              }

              // En niveau stories :
              // 1. Premier cercle : les 16 choix (R_INNER = 145)
              // 2. Deuxième cercle : les protagonistes (R_OUTER = 280)
              // 3. Cercles de ceux qui viennent après (descendants déployés) uniquement quand des nœuds y sont présents
              const ringsToDraw: Array<{ radius: number; isHighlighted: boolean; isDashed: boolean; opacity: number }> = [
                { radius: R_INNER, isHighlighted: false, isDashed: true, opacity: 0.35 },
                { radius: R_OUTER, isHighlighted: true, isDashed: false, opacity: 0.6 }
              ];

              // Cercles supplémentaires pour les générations suivantes (descendants successifs)
              nodesByGeneration.slice(1).forEach((genNodesList) => {
                if (genNodesList.length > 0) {
                  const ringRadius = Math.round(Math.hypot(genNodesList[0].x, genNodesList[0].y));
                  if (!ringsToDraw.some(r => Math.abs(r.radius - ringRadius) < 15)) {
                    ringsToDraw.push({
                      radius: ringRadius,
                      isHighlighted: false,
                      isDashed: true,
                      opacity: 0.4
                    });
                  }
                }
              });

              return ringsToDraw.map((ring, idx) => (
                <g key={`orbit-ring-${ring.radius}-${idx}`}>
                  <circle 
                    cx="0" 
                    cy="0" 
                    r={ring.radius} 
                    fill="none" 
                    stroke="#C89B3C" 
                    strokeWidth={ring.isHighlighted ? '1.5' : '0.9'} 
                    strokeDasharray={ring.isDashed ? '3 4' : 'none'} 
                    opacity={ring.opacity} 
                  />
                </g>
              ));
            })()}

            {/* ========================================================================= */}
            {/* NIVEAU 0 : LES 16 PORTES ET LEURS MÉDAILLONS AVEC ICÔNES OFFICIELLES      */}
            {/* ========================================================================= */}
            {explorerLevel === 'dimensions' && (
              <g id="wheel-level-dimensions">
                {/* Rayons célestes dorés d'astrolabe */}
                {EXPLORER_CATEGORIES.map((cat, idx) => {
                  const angle = -90 + idx * (360 / EXPLORER_CATEGORIES.length);
                  const rad = (angle * Math.PI) / 180;
                  const r = 215;
                  const x = Math.cos(rad) * r;
                  const y = Math.sin(rad) * r;
                  const isHovered = hoveredCategory?.id === cat.id;

                  return (
                    <g key={`ray-group-${cat.id}`}>
                      <line 
                        x1="0" 
                        y1="0" 
                        x2={x} 
                        y2={y} 
                        stroke="#C89B3C" 
                        strokeWidth={isHovered ? "1.2" : "0.75"} 
                        strokeDasharray={isHovered ? "2 2" : "1.5 3"} 
                        opacity={isHovered ? "0.45" : "0.12"} 
                      />
                    </g>
                  );
                })}

                {/* Les 8 Hublots / Portes de l'Astrolabe */}
                {EXPLORER_CATEGORIES.map((cat, idx) => {
                  const angle = -90 + idx * (360 / EXPLORER_CATEGORIES.length);
                  const rad = (angle * Math.PI) / 180;
                  const r = 215;
                  const x = Math.cos(rad) * r;
                  const y = Math.sin(rad) * r;
                  const isHovered = hoveredCategory?.id === cat.id;

                  return (
                    <g
                      key={`dimension-hublot-${cat.id}`}
                      id={`dimension-hublot-${cat.id}`}
                      className="group cursor-pointer"
                      style={{ pointerEvents: 'auto' }}
                      transform={`rotate(${-rotationAngle}, ${x}, ${y})`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (hasDraggedRef.current) return;
                        handleSelectDimension(cat.id);
                      }}
                      onMouseEnter={() => {
                        setHoveredCategory(cat);
                        celestialAudio.playOrbHover(480 + idx * 20);
                      }}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      {/* Zone tactile généreuse */}
                      <circle cx={x} cy={y} r="32" fill="transparent" />

                      {/* Halo d'or subtil au survol */}
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={isHovered ? "30" : "26"} 
                        fill="#C89B3C" 
                        opacity={isHovered ? "0.3" : "0.08"} 
                        className="transition-all duration-300 pointer-events-none" 
                        filter="drop-shadow(0 0 10px rgba(200, 155, 60, 0.4))"
                      />

                      {/* Pastille circulaire :
                          État au survol : terracotta (#A2482B)
                          État au repos : fond blanc pur (#FFFFFF) et bordure dorée (#C89B3C) */}
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={isHovered ? "26" : "23"} 
                        fill={isHovered ? "#A2482B" : "#FFFFFF"} 
                        stroke={isHovered ? "#8A3B22" : "#C89B3C"} 
                        strokeWidth={isHovered ? "2.4" : "1.75"} 
                        filter="drop-shadow(0 3px 10px rgba(0,0,0,0.16))" 
                        className="transition-all duration-300"
                      />

                      {/* Filet intérieur discret */}
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={isHovered ? "21" : "19"} 
                        fill="none" 
                        stroke={isHovered ? "rgba(255,255,255,0.3)" : "rgba(200,155,60,0.22)"} 
                        strokeWidth="0.8" 
                        className="pointer-events-none transition-all duration-300"
                      />

                      {/* Icône de la Porte :
                          État au survol : blanc
                          État au repos : gris-brun foncé (#4A3F38) */}
                      <foreignObject x={x - 14} y={y - 14} width="28" height="28" className="pointer-events-none">
                        <div className={`w-full h-full flex items-center justify-center transition-transform duration-300 ${
                          isHovered ? 'scale-115 text-white' : 'scale-100 text-[#4A3F38]'
                        }`}>
                          <DimensionIcon 
                            name={cat.iconName || (cat.id === 'series' ? '16-series/_dimension' : `${cat.id}/_dimension`)} 
                            size={22} 
                            strokeWidth={1.75}
                            className={isHovered ? 'text-white drop-shadow-xs' : 'text-[#4A3F38]'} 
                          />
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
              </g>
            )}

            {/* ========================================================================= */}
            {/* NIVEAU 1 : LES 8 PROPOSITIONS DE LA PORTE CHOISIE                         */}
            {/* ========================================================================= */}
            {explorerLevel === 'topics' && (
              <g id="wheel-level-topics">
                {/* Rayons célestes dorés d'astrolabe */}
                {topicsForCategory.map((topic, idx) => {
                  const angle = -90 + idx * (360 / topicsForCategory.length);
                  const rad = (angle * Math.PI) / 180;
                  const r = 215;
                  const x = Math.cos(rad) * r;
                  const y = Math.sin(rad) * r;
                  const isHovered = hoveredTopic?.id === topic.id;

                  return (
                    <g key={`ray-topic-group-${topic.id}`}>
                      <line 
                        x1="0" 
                        y1="0" 
                        x2={x} 
                        y2={y} 
                        stroke="#C89B3C" 
                        strokeWidth={isHovered ? "1.2" : "0.75"} 
                        strokeDasharray={isHovered ? "2 2" : "1.5 3"} 
                        opacity={isHovered ? "0.45" : "0.15"} 
                      />
                      <circle 
                        cx={x * 0.52} 
                        cy={y * 0.52} 
                        r={isHovered ? "2" : "1.2"} 
                        fill="#C89B3C" 
                        opacity={isHovered ? "0.6" : "0.2"} 
                      />
                    </g>
                  );
                })}

              </g>
            )}

            {/* ========================================================================= */}
            {/* NAVIGATION CONCENTRIQUE DIRECTE : 8 SOUS-CATÉGORIES AU CENTRE + 16 VOIX     */}
            {/* ========================================================================= */}
            {explorerLevel === 'stories' && (
              <g id="wheel-concentric-double-reading">
                {/* 1. FAISCEAUX DE LUMIÈRE DORÉE : Relient le sujet sélectionné (Anneau 1) aux 16 voix (Anneau 2) */}
                {nodesByGeneration[0]?.map((pNode) => (
                  <line 
                    key={`beam-active-topic-${pNode.person.id}`}
                    x1={activeTopicCoords.x} 
                    y1={activeTopicCoords.y} 
                    x2={pNode.x} 
                    y2={pNode.y} 
                    stroke="#C89B3C" 
                    strokeWidth="0.8" 
                    strokeDasharray="2 4" 
                    opacity="0.15" 
                  />
                ))}

                {/* 2. ANNEAU INTÉRIEUR (R = 145) : SUJETS DE LA PORTE ACTIVE */}
                <g id="inner-orbit-subjects">
                  {topicsForCategory.map((topic, idx) => {
                    const angle = -90 + idx * (360 / topicsForCategory.length);
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * R_INNER;
                    const y = Math.sin(rad) * R_INNER;
                    const isSelected = activeTopicId === topic.id;

                    return (
                      <g
                        key={`inner-topic-${topic.id}`}
                        id={`inner-topic-${topic.id}`}
                        className="group cursor-pointer"
                        style={{ pointerEvents: 'auto' }}
                        transform={`rotate(${-rotationAngle}, ${x}, ${y})`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (hasDraggedRef.current) return;
                          handleSelectTopic(topic.id);
                        }}
                        onMouseEnter={() => {
                          celestialAudio.playOrbHover(510 + idx * 15);
                          setHoveredTopic(topic);
                        }}
                        onMouseLeave={() => setHoveredTopic(null)}
                      >
                        {/* A. FORMAT MÉDAILLON CIRCULAIRE POUR LES SÉRIES (8 séries de la plateforme) */}
                        {activeCategory === 'series' ? (
                          <g>
                            {/* Halo doré si sélectionné ou au survol */}
                            <circle 
                              cx={x} 
                              cy={y} 
                              r="26" 
                              fill="none" 
                              stroke="#C89B3C" 
                              strokeWidth={isSelected ? '2.5' : '1.5'} 
                              strokeDasharray={isSelected ? 'none' : '3 3'}
                              className={isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-200'}
                            />

                            {/* Disque d'arrière-plan en bronze sombre */}
                            <circle 
                              cx={x} 
                              cy={y} 
                              r="21" 
                              fill="#1C1917" 
                              stroke={isSelected ? '#FFE7A3' : '#8B6845'} 
                              strokeWidth={isSelected ? '2.5' : '1.2'} 
                              filter="drop-shadow(0 3px 8px rgba(0,0,0,0.25))" 
                            />

                            {/* Affiche circulaire de la série */}
                            <image 
                              href={topic.photoUrl} 
                              x={x - 21} 
                              y={y - 21} 
                              width="42" 
                              height="42" 
                              clipPath={`url(#clip-inner-circle-${topic.id})`}
                              preserveAspectRatio="xMidYMid slice" 
                              className="pointer-events-none"
                            />

                            {/* Anneau de sertissage en or précieux */}
                            <circle 
                              cx={x} 
                              cy={y} 
                              r="21" 
                              fill="none" 
                              stroke={isSelected ? '#FFE7A3' : 'rgba(200, 155, 60, 0.45)'} 
                              strokeWidth={isSelected ? '2.5' : '1.2'} 
                              className="pointer-events-none"
                            />
                          </g>
                        ) : (
                          /* B. LES 8 SOUS-CATÉGORIES DES 15 AUTRES DIMENSIONS AVEC LEURS ICÔNES SVG OFFICIELLES */
                          <g>
                            {/* Halo doré si sélectionné ou au survol */}
                            <circle 
                              cx={x} 
                              cy={y} 
                              r="26" 
                              fill="none" 
                              stroke="#C89B3C" 
                              strokeWidth={isSelected ? '2.5' : '1.5'} 
                              strokeDasharray={isSelected ? 'none' : '3 3'}
                              className={isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-200'}
                            />

                            {/* Pastille ronde :
                                Fond blanc pur (#FFFFFF) permanent avec bordure fine et halo doré */}
                            <circle 
                              cx={x} 
                              cy={y} 
                              r="21" 
                              fill="#FFFFFF" 
                              stroke={isSelected ? '#C89B3C' : '#E7E5E4'} 
                              strokeWidth={isSelected ? '2.2' : '1.2'} 
                              filter="drop-shadow(0 3px 8px rgba(0,0,0,0.12))" 
                              className="transition-colors duration-200"
                            />

                            {/* Filet intérieur discret */}
                            <circle 
                              cx={x} 
                              cy={y} 
                              r="17" 
                              fill="none" 
                              stroke="rgba(200, 155, 60, 0.3)" 
                              strokeWidth="0.8" 
                              className="pointer-events-none"
                            />

                            {/* Icône SVG officielle en noir permanent (#1C1917) */}
                            <foreignObject x={x - 14} y={y - 14} width="28" height="28" className="pointer-events-none">
                              <div className={`w-full h-full flex items-center justify-center transition-transform duration-200 ${
                                isSelected ? 'scale-110' : 'scale-100'
                              }`}>
                                <DimensionIcon 
                                  name={(topic as any).iconName || `${activeCategory}/${topic.id}`} 
                                  size={20} 
                                  strokeWidth={1.8}
                                  className="text-[#1C1917]" 
                                />
                              </div>
                            </foreignObject>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>
              </g>
            )}

            {/* ========================================================================= */}
            {/* NIVEAU 2 : AFFICHAGE DES 16 VOIX / HISTOIRES SUR LA ROUE                 */}
            {/* ========================================================================= */}
            {explorerLevel === 'stories' && (
              <g id="wheel-level-stories" key={`wheel-level-stories-${activeCategory}-${activeTopicId}-${shuffleSeed}`}>
                {/* Rayons vers les 16 personnes */}
                {nodesByGeneration[0]?.map((pNode) => (
                  <line 
                    key={`ray-story-${pNode.person.id}`}
                    x1="0" 
                    y1="0" 
                    x2={pNode.x} 
                    y2={pNode.y} 
                    stroke="#C89B3C" 
                    strokeWidth="0.5" 
                    strokeDasharray="2 4" 
                    opacity="0.10" 
                  />
                ))}

                {/* Liens de filiation & cooptation de la Lignée (Miel = ascendance, Terre cuite = descendance, traits ultra-fins) */}
                {connectingLinks.map((link) => (
                  <line 
                    key={link.id}
                    x1={link.from.x} 
                    y1={link.from.y} 
                    x2={link.to.x} 
                    y2={link.to.y} 
                    stroke={link.strokeColor || (link.type === 'descendant' ? '#A2482B' : '#C89B3C')} 
                    strokeWidth={link.isActive ? '0.85' : '0.55'} 
                    strokeDasharray={link.type === 'ascendant' ? '3 3' : 'none'} 
                    opacity={link.isActive ? '0.85' : '0.45'} 
                  />
                ))}

                {/* Nœuds des 16 personnes */}
                {nodesByGeneration.flatMap((nodes) => 
                  nodes.map((node, nodeIdx) => {
                    const radius = node.gen === 1 ? 22 : 19;
                    const isSelected = selectedPath.includes(node.person.id);

                    return (
                      <g 
                        key={`wheel-node-${node.nodeKey}-${nodeIdx}`}
                        id={node.nodeKey}
                        className="group cursor-pointer"
                        style={{ pointerEvents: 'auto' }}
                        transform={`rotate(${-rotationAngle}, ${node.x}, ${node.y})`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (hasDraggedRef.current) return;
                          handleNodeClick(node.person);
                        }}
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          setModalPerson(node.person);
                          setIsPlaying(true);
                        }}
                        onMouseEnter={() => celestialAudio.playOrbHover(540)}
                      >
                        {/* Zone tactile circulaire */}
                        <circle 
                          cx={node.x} 
                          cy={node.y} 
                          r={radius + 8} 
                          fill="transparent" 
                        />

                        {/* Rétro-éclairage lumineux Circulaire (drop-glow ambré scénique par l'arrière) */}
                        {isSelected && (
                          <g className="scenic-backlight pointer-events-none">
                            <circle 
                              cx={node.x} 
                              cy={node.y} 
                              r={radius + 12} 
                              fill="#D97706" 
                              opacity="0.38" 
                              filter="url(#amberScenicBacklight)" 
                            />
                            <circle 
                              cx={node.x} 
                              cy={node.y} 
                              r={radius + 6} 
                              fill="#F59E0B" 
                              opacity="0.75" 
                              filter="url(#amberScenicBacklight)" 
                            />
                            <circle 
                              cx={node.x} 
                              cy={node.y} 
                              r={radius + 2} 
                              fill="#FDE68A" 
                              opacity="0.9" 
                            />
                          </g>
                        )}

                        {/* Anneau délicat circulaire au survol */}
                        <circle 
                          cx={node.x} 
                          cy={node.y} 
                          r={radius + 3} 
                          fill="none" 
                          stroke="#C89B3C" 
                          strokeWidth="1.2" 
                          strokeDasharray="3 3"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                        />

                        {/* Médaillon blanc de fond */}
                        <circle 
                          cx={node.x} 
                          cy={node.y} 
                          r={radius + 1} 
                          fill="#FFFFFF" 
                          stroke={isSelected ? '#C89B3C' : '#E7E5E4'} 
                          strokeWidth={isSelected ? '2' : '1'} 
                          filter="drop-shadow(0 2px 5px rgba(0,0,0,0.12))" 
                        />

                        {/* Photo de profil découpée en médaillon circulaire */}
                        <image 
                          href={node.person.photoUrl} 
                          x={node.x - radius} 
                          y={node.y - radius} 
                          width={radius * 2} 
                          height={radius * 2} 
                          clipPath={`url(#${node.clipId})`}
                          preserveAspectRatio="xMidYMid slice" 
                        />

                        {/* Liseré fin doré ou terre cuite qui épouse le médaillon circulaire */}
                        <circle 
                          cx={node.x} 
                          cy={node.y} 
                          r={radius} 
                          fill="none" 
                          stroke={isSelected ? '#C89B3C' : (node.roleInLineage === 'descendant' ? '#A2482B' : '#E7E5E4')} 
                          strokeWidth={isSelected ? '2' : '1.2'} 
                        />
                        {isSelected && (
                          <circle 
                            cx={node.x} 
                            cy={node.y} 
                            r={radius - 1.5} 
                            fill="none" 
                            stroke="#FDE68A" 
                            strokeWidth="0.8" 
                            opacity="0.85" 
                          />
                        )}

                        {/* Prénom et Âge sous l'avatar au survol ou sélection */}
                        <g 
                          transform={`translate(${node.x}, ${node.y + radius + 12})`} 
                          className={`transition-opacity duration-200 pointer-events-none ${
                            isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          <rect 
                            x="-36" 
                            y="-9" 
                            width="72" 
                            height="22" 
                            rx="6" 
                            fill="#1C1917" 
                            stroke="#C89B3C"
                            strokeWidth="1"
                            filter="drop-shadow(0 2px 8px rgba(0,0,0,0.35))"
                          />
                          <text 
                            x="0" 
                            y="0" 
                            textAnchor="middle" 
                            fill="#FDFBF7" 
                            fontSize="9" 
                            fontWeight="600"
                            fontFamily="sans-serif"
                          >
                            {node.person.firstName || node.person.name.split(' ')[0]}
                          </text>
                          <text 
                            x="0" 
                            y="9.5" 
                            textAnchor="middle" 
                            fill="#D6D3D1" 
                            fontSize="7.5" 
                            fontFamily="sans-serif"
                          >
                            {node.person.age ? `${node.person.age} ans` : '42 ans'}
                          </text>
                        </g>
                      </g>
                    );
                  })
                )}
              </g>
            )}
          </svg>
        </div>

        {/* JOYSTICK CENTRAL FLUIDE DE L'ASTROLABE (TOUJOURS DROIT & STATIONNAIRE) */}
        <CentralAstrolabeJoystick 
          rotationAngle={rotationAngle}
          onRotateDelta={(delta) => setRotationAngle(prev => (prev + delta + 360) % 360)}
          onSetRotationAngle={setRotationAngle}
          onReset={handleResetView}
          onCenterClick={handleCenterHubClick}
          explorerLevel={explorerLevel}
          dimensionName={activeCategoryConfig.shortLabel}
          topicName={activeCategory === 'series' ? (activeTopicItem?.title || activeSeries?.seriesTitle) : activeTopicItem?.title}
          activeCategory={activeCategory}
          activeTopicIcon={activeTopicIcon}
          hoveredTopicIcon={hoveredTopicIcon}
          hoveredTopicName={hoveredTopic?.title}
          activeFlagUrl={activeCategory === 'countries' ? getCountryFlagUrl(activeTopicId) : undefined}
          activeCoverImage={
            activeCategory === 'series'
              ? (activeTopicItem?.photoUrl || `/assets/posters/${selectedSeriesId}.png`)
              : (activeCategory !== 'countries' ? activeTopicItem?.photoUrl : undefined)
          }
          hoveredCoverImage={hoveredTopic?.photoUrl}
          hoveredCategory={hoveredCategory}
          onActualiser={handleActualiser}
          onStepBack={handleBackToDimensions}
          isRefreshing={isRefreshing}
        />
      </div>
    </>
  ) : (
    <SwipeModeHeritage
      swipeStep={swipeStep}
      setSwipeStep={setSwipeStep}
      swipeDoorIndex={swipeDoorIndex}
      setSwipeDoorIndex={setSwipeDoorIndex}
      swipeSelectedSubcategory={swipeSelectedSubcategory}
      setSwipeSelectedSubcategory={setSwipeSelectedSubcategory}
      swipePersonIndex={swipePersonIndex}
      setSwipePersonIndex={setSwipePersonIndex}
      currentSwipeDoor={currentSwipeDoor}
      swipeSubcategories={swipeSubcategories}
      swipeProtagonists={swipeProtagonists}
      currentSwipePerson={currentSwipePerson}
      onNavigate={onNavigate}
      onOpenQuestionModal={(title, question) => {
        setSwipeQuestionModalData({ title, question });
      }}
      onOpenResonanceModal={(person) => {
        setModalPerson(person as any);
        setIsResonanceModalOpen(true);
      }}
      personResonancePct={personResonancePct}
      isShareCopied={isShareCopied}
      onSharePerson={async (person) => {
        try {
          const shareUrl = `${window.location.origin}?screen=matrix_view&person=${person.id}`;
          if (navigator.share) {
            await navigator.share({
              title: `YonyWood — ${person.name}`,
              text: person.teaserPitch || person.invitationStory,
              url: shareUrl
            });
          } else {
            await navigator.clipboard.writeText(shareUrl);
            setIsShareCopied(true);
            setTimeout(() => setIsShareCopied(false), 2000);
          }
        } catch {
          // fallback
        }
      }}
      handleNextSwipeDoor={handleNextSwipeDoor}
      handlePrevSwipeDoor={handlePrevSwipeDoor}
      handleNextSwipePerson={handleNextSwipePerson}
      handlePrevSwipePerson={handlePrevSwipePerson}
    />
  )}

      {/* 4. MODALE CARTE VIDÉO 9:16 DÉTAILLÉE DU PROTAGONISTE */}
      {modalPerson && (
        <div 
          id="person-detail-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
          onClick={() => {
            setModalPerson(null);
            setIsPlaying(false);
          }}
        >
          <div 
            id="person-detail-modal"
            className="group relative aspect-[9/16] w-[min(340px,calc((100dvh-200px)*9/16))] h-[min(604px,calc(100dvh-200px))] max-w-[calc(100vw-28px)] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-[#151513] text-white shadow-2xl border border-stone-200/80 flex flex-col justify-between animate-in zoom-in-95 duration-200 select-none cursor-pointer shrink-0"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('button, a, input, textarea, select')) return;
              toggleVideoPlayback();
            }}
          >
            {/* Poster de fond & Vidéo fluide */}
            <img 
              src={modalPerson.photoUrl} 
              alt={modalPerson.name} 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <video 
              ref={videoRef}
              key={`modal-video-${modalPerson.id}`}
              src={modalPerson.teaserVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'} 
              poster={modalPerson.photoUrl}
              playsInline
              autoPlay
              loop
              muted={isMuted}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* Gradient pour lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

            {/* CENTRE : Icône vidéo Play / Pause au centre exact de l'image */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <button
                type="button"
                id="btn-center-play-pause-modal"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVideoPlayback();
                }}
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

            {/* HAUT : Titre du sujet + Commandes */}
            <div className="relative z-20 p-4 flex items-center justify-between pointer-events-auto">
              <div 
                className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white font-medium shadow-md tracking-wide max-w-[65%] sm:max-w-[75%] flex items-center gap-1.5"
              >
                <span className="truncate block font-semibold text-white">
                  {activeTopicItem?.title || modalPerson.universeTag}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Muet / Son */}
                <button
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-xl bg-black/45 hover:bg-[#A2482B] backdrop-blur-md border border-white/20 hover:border-[#A2482B] text-white flex items-center justify-center cursor-pointer transition-all shadow-md hover:scale-105 active:scale-95"
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
                  id="btn-close-modal"
                  onClick={() => {
                    setModalPerson(null);
                    setIsPlaying(false);
                    setIsResonanceModalOpen(false);
                    setIsPersonQuestionModalOpen(false);
                  }}
                  className="w-9 h-9 rounded-xl bg-black/45 hover:bg-[#A2482B] text-white border border-white/20 hover:border-[#A2482B] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                  title="Fermer"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* ICÔNES D'ACTION SUR LE CÔTÉ DROIT DE LA VIDÉO (DESCENDUES AUX 2/3 POUR DÉGAGER LE VISAGE DU PROTAGONISTE) */}
            <div 
              className="absolute right-4 sm:right-5 top-[64%] -translate-y-1/2 z-30 flex flex-col items-center gap-2.5 sm:gap-3 pointer-events-auto"
            >
              {/* 1. Évaluation résonance (Award en Terre Cuite) */}
              <div className="relative group/modalbtn flex items-center">
                <div className="absolute right-12 top-1/2 -translate-y-1/2 z-40 pointer-events-none opacity-0 group-hover/modalbtn:opacity-100 transition-opacity duration-200 whitespace-nowrap bg-black/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/15 shadow-xl">
                  {personResonancePct !== null ? `Résonance : ${personResonancePct}%` : "Évaluer la résonance"}
                </div>
                <button
                  id={`btn-eval-resonance-${modalPerson.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsResonanceModalOpen(true);
                  }}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl backdrop-blur-md border flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95 ${
                    personResonancePct !== null
                      ? 'bg-[#A2482B] border-[#A2482B] text-white shadow-[0_0_14px_rgba(162,72,43,0.5)]'
                      : 'bg-black/45 hover:bg-[#A2482B] border-white/20 hover:border-[#A2482B] text-white'
                  }`}
                  title={personResonancePct !== null ? `Résonance : ${personResonancePct}%` : "Évaluer la résonance"}
                >
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>

              {/* 2. Question (icône livre ouvert) */}
              <div className="relative group/modalbtn flex items-center">
                <div className="absolute right-12 top-1/2 -translate-y-1/2 z-40 pointer-events-none opacity-0 group-hover/modalbtn:opacity-100 transition-opacity duration-200 whitespace-nowrap bg-black/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/15 shadow-xl">
                  Découvrir la question
                </div>
                <button
                  id={`modal-btn-question-${modalPerson.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPersonQuestionModalOpen(true);
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/45 hover:bg-[#A2482B] backdrop-blur-md border border-white/20 hover:border-[#A2482B] text-white flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95 shrink-0"
                  title="Découvrir la question"
                >
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>

              {/* 3. Découvrir son univers complet (icône profil de la barre de navigation) */}
              <div className="relative group/modalbtn flex items-center">
                <div className="absolute right-12 top-1/2 -translate-y-1/2 z-40 pointer-events-none opacity-0 group-hover/modalbtn:opacity-100 transition-opacity duration-200 whitespace-nowrap bg-black/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/15 shadow-xl">
                  Découvrir son univers complet
                </div>
                <button
                  id={`modal-btn-universe-${modalPerson.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenUniverse(modalPerson);
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/45 hover:bg-[#A2482B] backdrop-blur-md border border-white/20 hover:border-[#A2482B] text-white flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  title="Découvrir son univers complet"
                >
                  <ProfileSoloIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>

              {/* 4. Bouton Partager (en dessous de l'icône découvrir son univers complet) */}
              <div className="relative group/modalbtn flex items-center">
                <div className="absolute right-12 top-1/2 -translate-y-1/2 z-40 pointer-events-none opacity-0 group-hover/modalbtn:opacity-100 transition-opacity duration-200 whitespace-nowrap bg-black/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/15 shadow-xl">
                  {isShareCopied ? "Lien copié !" : "Partager"}
                </div>
                <button
                  id={`modal-btn-share-${modalPerson.id}`}
                  onClick={handleShareModalPerson}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl backdrop-blur-md border flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95 ${
                    isShareCopied 
                      ? 'bg-emerald-700/85 border-emerald-600 text-white' 
                      : 'bg-black/45 hover:bg-[#A2482B] border-white/20 hover:border-[#A2482B] text-white'
                  }`}
                  title={isShareCopied ? "Lien copié !" : "Partager"}
                >
                  {isShareCopied ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <ShareIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* BAS : Prénom + Âge en dessous uniquement */}
            <div className="relative z-20 p-5 sm:p-6 flex items-end justify-between pointer-events-auto mt-auto">
              <div 
                className="text-left font-sans cursor-pointer group/profile hover:opacity-95 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenUniverse(modalPerson);
                }}
                title="Découvrir son univers complet"
              >
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none drop-shadow-md group-hover/profile:text-[#FFE7A3] transition-colors">
                  {modalPerson.firstName || modalPerson.name.split(' ')[0]}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 font-medium drop-shadow flex items-center gap-1.5">
                  <span>{modalPerson.age ? `${modalPerson.age} ans` : '46 ans'}</span>
                </p>
              </div>
            </div>

            {/* Volet coulissant d'évaluation de la résonance sur la vidéo */}
            <ResonanceModal
              isOpen={isResonanceModalOpen}
              onClose={() => setIsResonanceModalOpen(false)}
              storyId={`story-${modalPerson.id}`}
              topicId={activeTopicItem?.title || modalPerson.universeTag || 'exploration'}
              personName={modalPerson.firstName || modalPerson.name.split(' ')[0]}
              initialPercentage={personResonancePct}
              onRatingSubmitted={(pct) => {
                setPersonResonancePct(pct);
              }}
            />

            {/* Modale Question (au clic sur l'icône question) */}
            {isPersonQuestionModalOpen && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPersonQuestionModalOpen(false);
                }}
              >
                <div 
                  className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 text-center animate-in zoom-in-95 duration-200 pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsPersonQuestionModalOpen(false)}
                    className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="w-12 h-12 rounded-full bg-[#C89B3C]/15 text-[#C89B3C] flex items-center justify-center mx-auto mb-4 border border-[#C89B3C]/30">
                    <BookOpen className="w-6 h-6" />
                  </div>

                  <h3 className="font-editorial text-base sm:text-lg font-bold text-[#1C1917] mb-3">
                    {activeTopicItem?.title || modalPerson.universeTag || modalPerson.name}
                  </h3>

                  <p className="font-serif-editorial text-base sm:text-lg text-stone-800 leading-relaxed italic px-2">
                    « {(activeTopicItem?.question || (modalPerson as any).question || "Quelle vision singulière ce parcours apporte-t-il au monde ?").replace(/^[«"'\s]+|[»"'\s]+$/g, '')} »
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modale Question en Mode Swipe */}
      {swipeQuestionModalData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSwipeQuestionModalData(null)}
        >
          <div 
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 text-center animate-in zoom-in-95 duration-200 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSwipeQuestionModalData(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#C89B3C]/15 text-[#C89B3C] flex items-center justify-center mx-auto mb-4 border border-[#C89B3C]/30">
              <BookOpen className="w-6 h-6" />
            </div>

            <h3 className="font-editorial text-base sm:text-lg font-bold text-[#1C1917] mb-3">
              {swipeQuestionModalData.title}
            </h3>

            <p className="font-serif-editorial text-base sm:text-lg text-stone-800 leading-relaxed italic px-2">
              « {swipeQuestionModalData.question.replace(/^[«"'\s]+|[»"'\s]+$/g, '')} »
            </p>
          </div>
        </div>
      )}

      {/* Modale Teaser Présentation Vidéo */}
      <ProtagonistTeaserModal
        protagonist={teaserProtagonist}
        onClose={() => setTeaserProtagonist(null)}
        onEnterUniverse={(id) => {
          setTeaserProtagonist(null);
          onNavigate({ 
            type: 'protagonist_profile', 
            protagonistId: id 
          });
        }}
      />
    </div>
  );
};
