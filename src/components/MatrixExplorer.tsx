import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Tv, 
  Globe,
  Compass, 
  Sparkles,
  Award,
  Crown,
  HeartHandshake,
  Trees,
  ShoppingBag,
  GraduationCap,
  HelpCircle,
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
  Shuffle,
  Film,
  Mountain,
  Atom,
  Fingerprint,
  Sprout
} from 'lucide-react';
import { MATRIX_SERIES_DATA, MatrixSeriesConfig } from '../data/matrixData';
import { AffiliationPerson, ViewScreen, Protagonist } from '../types';
import { CentralAstrolabeJoystick } from './CentralAstrolabeJoystick';
import { VerticalZoomSlider } from './VerticalZoomSlider';
import { ProtagonistTeaserModal } from './ProtagonistTeaserModal';
import { ResonanceModal } from './ResonanceModal';
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
const R_OUTER = 280; // Anneau 2 : 16 Voix / Histoires humaines associées
const ORBIT_RADII = [145, 280, 385, 490, 595];

// Map d'icônes adaptées et lisibles par catégorie
const CATEGORY_ICONS: Record<ExplorerCategoryType, React.FC<{ className?: string }>> = {
  series: Film,
  countries: Mountain,
  thematics: Atom,
  personalities: Fingerprint,
  brands: Gem,
  projects: Sprout,
  offers: GraduationCap,
  questions: Flame
};

export const MatrixExplorer: React.FC<MatrixExplorerProps> = ({ 
  onNavigate,
  onSelectDocumentary 
}) => {
  // 1. NIVEAU DE NAVIGATION DANS LA ROUE :
  // 'dimensions' (les 8 Portes d'entrée au centre)
  // 'stories' (navigation concentrique double lecture : Anneau 1 Sujets + Anneau 2 16 Voix)
  const [explorerLevel, setExplorerLevel] = useState<'dimensions' | 'topics' | 'stories'>('stories');
  const [activeCategory, setActiveCategory] = useState<ExplorerCategoryType>('countries');
  const [activeTopicId, setActiveTopicId] = useState<string>('benin');
  const [shuffleSeed, setShuffleSeed] = useState<number>(0);
  const [topicsShuffleSeed, setTopicsShuffleSeed] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [hoveredTopic, setHoveredTopic] = useState<ExplorerCatalogItem | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<ExplorerCategoryConfig | null>(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState<boolean>(false);
  const [showQuestionInVideo, setShowQuestionInVideo] = useState<boolean>(false);

  // Filtrage par série (si mode séries)
  const [selectedSeriesId, setSelectedSeriesId] = useState<string>('jesus-legba');
  const [teaserProtagonist, setTeaserProtagonist] = useState<Protagonist | null>(null);

  // 2. Navigation spatiale : rotation, zoom et pan
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Références d'interaction pour la rotation fluide par glisser-déposer
  const containerRef = useRef<HTMLDivElement>(null);
  const isRotatingRef = useRef<boolean>(false);
  const pointerStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastPointerAngleRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  // 3. Chemin de cooptation généalogique [idGen1, idGen2, ...] en mode Séries
  const [selectedPath, setSelectedPath] = useState<string[]>([]);

  // 4. Modale vidéo 9:16 pour la personne sélectionnée
  const [modalPerson, setModalPerson] = useState<AffiliationPerson | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isResonanceModalOpen, setIsResonanceModalOpen] = useState<boolean>(false);
  const [personResonancePct, setPersonResonancePct] = useState<number | null>(null);
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

  // Série active (si mode Séries)
  const activeSeries = useMemo<MatrixSeriesConfig>(() => {
    return MATRIX_SERIES_DATA.find(s => s.seriesId === selectedSeriesId) || MATRIX_SERIES_DATA[0];
  }, [selectedSeriesId]);

  // 16 Voix / Histoires humaines affichées sur la roue en niveau 'stories'
  const storiesList = useMemo<AffiliationPerson[]>(() => {
    if (activeCategory === 'series') {
      return activeSeries.pioneers.slice(0, 16);
    }
    return get16StoriesForTopic(activeTopicId, shuffleSeed);
  }, [activeCategory, activeSeries, activeTopicId, shuffleSeed]);

  // Synchronisation de la résonance
  useEffect(() => {
    if (modalPerson) {
      try {
        const stored = localStorage.getItem(`yonywood_resonance_story-${modalPerson.id}`);
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
  }, [modalPerson]);

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

  // Action Aléatoire (Shuffle orbital) : brasse les 16 propositions du premier cercle
  const handleShuffleOrbital = () => {
    setIsShuffling(true);
    celestialAudio.playOrbSelect();
    if (explorerLevel === 'dimensions') {
      const randomCat = EXPLORER_CATEGORIES[Math.floor(Math.random() * EXPLORER_CATEGORIES.length)];
      setRotationAngle(prev => (prev + 180 + Math.floor(Math.random() * 90)) % 360);
      setHoveredCategory(randomCat);
    } else {
      // Brasse les 16 propositions du premier cercle et renouvelle les voix
      setTopicsShuffleSeed(prev => prev + 1);
      setShuffleSeed(prev => prev + 1);
      setRotationAngle(prev => (prev + 90 + Math.floor(Math.random() * 60)) % 360);
    }
    setTimeout(() => {
      setIsShuffling(false);
    }, 600);
  };

  // Clic au centre de l'astrolabe :
  // Si on est sur un sujet (ex: Bénin), recliquer sur le drapeau central renouvelle immédiatement les 16 voix
  const handleCenterHubClick = () => {
    celestialAudio.playOrbSelect();
    if (explorerLevel === 'dimensions') {
      handleSelectDimension('countries');
    } else {
      handleActualiser();
    }
  };

  // Sélection d'une des 8 grandes Portes d'entrée
  const handleSelectDimension = (catId: ExplorerCategoryType) => {
    celestialAudio.playOrbSelect();
    setActiveCategory(catId);
    // Sélectionner automatiquement le premier sujet de cette Porte
    const firstTopic = EXPLORER_CATALOG[catId]?.[0];
    if (firstTopic) {
      setActiveTopicId(firstTopic.id);
      if (catId === 'series') {
        setSelectedSeriesId(firstTopic.id);
      }
    }
    setShuffleSeed(0);
    setSelectedPath([]);
    setIsQuestionModalOpen(false);
    // Entrer directement en mode concentrique double lecture
    setExplorerLevel('stories');
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 300);
  };

  // Sélection d'un sujet sur l'anneau intérieur (change instantanément les 16 voix sur l'anneau extérieur)
  const handleSelectTopic = (topicId: string) => {
    celestialAudio.playOrbSelect();
    setActiveTopicId(topicId);
    if (activeCategory === 'series') {
      setSelectedSeriesId(topicId);
    }
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

  // Clic sur un nœud personne en mode 'stories'
  const handleNodeClick = (person: AffiliationPerson, gen: number) => {
    celestialAudio.playOrbHover(580);
    if (activeCategory === 'series') {
      const hasChildren = person.invitedPeople && person.invitedPeople.length > 0;
      const isAlreadySelected = selectedPath[gen - 1] === person.id;

      if (!hasChildren || isAlreadySelected) {
        // Ouvre la carte vidéo 9:16
        setModalPerson(person);
        setIsPlaying(true);
      } else {
        // Déploie ses branches de cooptation sur l'orbite suivante
        const newPath = selectedPath.slice(0, gen - 1);
        newPath.push(person.id);
        setSelectedPath(newPath);
      }
    } else {
      // En mode Sujet / Thématique / Pays : ouvre immédiatement la carte 9:16 avec son récit
      setModalPerson(person);
      setIsPlaying(true);
    }
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
    }

    interface LinkItem {
      id: string;
      from: { x: number; y: number };
      to: { x: number; y: number };
      isActive: boolean;
    }

    const genNodes: NodeItem[][] = [];
    const links: LinkItem[] = [];

    if (explorerLevel === 'stories') {
      // --- ANNEAU 2 (EXTÉRIEUR) : 16 VOIX / PIONNIERS SUR L'ORBITE R_OUTER (280) ---
      const r1 = R_OUTER;
      const gen1Nodes: NodeItem[] = storiesList.map((p, idx) => {
        const angle = -90 + idx * (360 / 16);
        const rad = (angle * Math.PI) / 180;
        const isSel = selectedPath[0] === p.id;
        return {
          person: p,
          gen: 1,
          x: Math.cos(rad) * r1,
          y: Math.sin(rad) * r1,
          angle,
          descendantCount: activeCategory === 'series' ? countDescendants(p) : 0,
          isSelected: isSel
        };
      });
      genNodes.push(gen1Nodes);

      // Déploiement concentrique des générations de cooptation 2..5 (mode Séries uniquement)
      if (activeCategory === 'series') {
        let currentParentGen = 1;
        while (currentParentGen < selectedPath.length + 1 && currentParentGen < 5) {
          const parentId = selectedPath[currentParentGen - 1];
          const parentNode = genNodes[currentParentGen - 1]?.find(n => n.person.id === parentId);
          if (!parentNode || !parentNode.person.invitedPeople || parentNode.person.invitedPeople.length === 0) {
            break;
          }

          const children = parentNode.person.invitedPeople;
          const childCount = children.length;
          const childGen = currentParentGen + 1;
          const r = ORBIT_RADII[childGen];

          const span = childCount === 1 ? 0 : Math.min(85, Math.max(38, (childCount - 1) * 32));

          const childNodes: NodeItem[] = children.map((child, cIdx) => {
            let childAngle = parentNode.angle;
            if (childCount > 1) {
              childAngle = parentNode.angle - span / 2 + cIdx * (span / (childCount - 1));
            }
            const childRad = (childAngle * Math.PI) / 180;
            const x = Math.cos(childRad) * r;
            const y = Math.sin(childRad) * r;
            const isSel = selectedPath[childGen - 1] === child.id;

            const isLinkActive = selectedPath[currentParentGen - 1] === parentNode.person.id &&
                                 selectedPath[childGen - 1] === child.id;

            links.push({
              id: `link-${parentNode.person.id}-${child.id}`,
              from: { x: parentNode.x, y: parentNode.y },
              to: { x, y },
              isActive: isLinkActive
            });

            return {
              person: child,
              gen: childGen,
              x,
              y,
              angle: childAngle,
              descendantCount: countDescendants(child),
              isSelected: isSel
            };
          });

          genNodes.push(childNodes);
          currentParentGen++;
        }
      }
    }

    return { nodesByGeneration: genNodes, connectingLinks: links };
  }, [explorerLevel, storiesList, selectedPath, activeCategory]);

  return (
    <div 
      ref={containerRef}
      id="matrix-explorer-container"
      className="relative w-full h-full min-h-[100dvh] bg-white text-[#1C1917] overflow-hidden select-none touch-none pt-safe pb-safe"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Texture subtile de fond céleste & géométrie sacrée discrète */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #A2482B 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 1. BARRE SUPÉRIEURE : FIL D'ARIANE ÉPURÉ TERRE CUITE */}
      <header className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-40 flex items-center justify-between pointer-events-none">
        
        {/* FIL D'ARIANE INTERACTIF : [Porte] > [Catégorie] > [Sujet actif] */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 shadow-sm pointer-events-auto max-w-full overflow-x-auto no-scrollbar">
          {/* Niveau 0 : Porte */}
          <button
            id="breadcrumb-dimensions-btn"
            onClick={() => {
              celestialAudio.playOrbSelect();
              setExplorerLevel('dimensions');
              setIsQuestionModalOpen(false);
            }}
            className={`text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              explorerLevel === 'dimensions'
                ? 'bg-[#A2482B] text-white shadow-xs'
                : 'text-stone-700 hover:text-[#A2482B] hover:bg-[#A2482B]/10'
            }`}
            title="Revenir au choix de la Porte"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Porte</span>
          </button>

          {explorerLevel !== 'dimensions' && (
            <>
              <span className="text-stone-300 text-xs shrink-0">/</span>

              {/* Catégorie active (Séries, Territoires, Thématiques, etc.) */}
              <button
                id="breadcrumb-category-btn"
                onClick={() => {
                  celestialAudio.playOrbSelect();
                  setExplorerLevel('dimensions');
                  setIsQuestionModalOpen(false);
                }}
                className="text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-full text-[#A2482B] hover:text-[#8A3B22] bg-[#A2482B]/10 hover:bg-[#A2482B]/20 border border-[#A2482B]/25 transition-all cursor-pointer flex items-center gap-1 shadow-xs shrink-0"
                title={`${activeCategoryConfig.label} (cliquer pour changer de Porte)`}
              >
                <span>{activeCategoryConfig.label}</span>
              </button>

              <span className="text-stone-300 text-xs shrink-0">/</span>

              {/* Sujet actif sélectionné */}
              <div className="flex items-center gap-1.5 pl-2.5 pr-1 py-0.5 rounded-full bg-[#A2482B]/10 border border-[#A2482B]/20 shrink-0">
                <button
                  id="breadcrumb-topic-title-btn"
                  onClick={() => {
                    if (activeCategory === 'questions' && (activeTopicItem?.question || activeTopicItem?.subtitle)) {
                      setIsQuestionModalOpen(prev => !prev);
                    }
                  }}
                  className={`text-xs sm:text-sm font-semibold text-[#A2482B] flex items-center gap-1.5 transition-colors ${
                    activeCategory === 'questions' ? 'cursor-pointer hover:text-[#8A3B22]' : 'cursor-default'
                  }`}
                  title={activeCategory === 'questions' ? "Cliquer pour afficher la question associée" : activeTopicItem?.title}
                >
                  <span className="truncate max-w-[120px] sm:max-w-[180px]">{activeTopicItem?.title}</span>
                  {activeCategory === 'questions' && (activeTopicItem?.question || activeTopicItem?.subtitle) && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#A2482B]/20 text-[#A2482B] font-medium">
                      Question
                    </span>
                  )}
                </button>

                {/* Symbole discret pour actualiser les 16 voix */}
                <button
                  id="btn-symbol-16-autres-voix"
                  onClick={handleActualiser}
                  className="w-6 h-6 rounded-full bg-white hover:bg-[#A2482B] text-[#A2482B] hover:text-white border border-[#A2482B]/30 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-90 group ml-0.5"
                  title="Actualiser : 16 autres voix"
                >
                  <RefreshCw className={`w-3 h-3 transition-transform ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 duration-500'}`} />
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* POP-OVER AÉRÉ DE LA QUESTION (S'affiche uniquement au clic sur la Question pour la catégorie Sagesses) */}
      {isQuestionModalOpen && activeCategory === 'questions' && (activeTopicItem?.question || activeTopicItem?.subtitle) && (
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

      {/* 2. SLIDER DE ZOOM VERTICAL LATÉRAL */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
        <VerticalZoomSlider 
          zoom={zoomLevel}
          onZoomChange={setZoomLevel}
          minZoom={0.5}
          maxZoom={1.5}
        />
      </div>

      {/* 3. SCÈNE CENTRALE : ROUE PLANÉTAIRE & CONSTELLATIONS */}
      <div 
        className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`
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
            width="1400"
            height="1400"
            viewBox="-700 -700 1400 1400"
          >
            <defs>
              {/* Halos dorés d'aura lumineuse pour les profils actifs */}
              <radialGradient id="nodeActiveGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C89B3C" stopOpacity="0.6" />
                <stop offset="45%" stopColor="#C89B3C" stopOpacity="0.25" />
                <stop offset="75%" stopColor="#C89B3C" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#C89B3C" stopOpacity="0" />
              </radialGradient>

              {/* ClipPaths circulaires pour les personnes sur l'anneau extérieur */}
              {nodesByGeneration.flatMap(nodes => nodes).map(node => (
                <clipPath key={`clip-${node.person.id}`} id={`clip-${node.person.id}`}>
                  <circle cx={node.x} cy={node.y} r={node.gen === 1 ? 22 : 19} />
                </clipPath>
              ))}

              {/* ClipPaths pour les sujets sur l'anneau intérieur (affiches verticales 44x64 pour séries, disques r=20 pour autres) */}
              {topicsForCategory.map((topic, idx) => {
                const angle = -90 + idx * (360 / topicsForCategory.length);
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * R_INNER;
                const y = Math.sin(rad) * R_INNER;
                if (activeCategory === 'series') {
                  return (
                    <clipPath key={`clip-poster-${topic.id}`} id={`clip-poster-${topic.id}`}>
                      <rect x={x - 22} y={y - 32} width="44" height="64" rx="6" />
                    </clipPath>
                  );
                }
                return (
                  <clipPath key={`clip-inner-circle-${topic.id}`} id={`clip-inner-circle-${topic.id}`}>
                    <circle cx={x} cy={y} r={20} />
                  </clipPath>
                );
              })}

              {/* ClipPaths circulaires pour les 8 Hublots photographiques (Piste 1) */}
              {EXPLORER_CATEGORIES.map((cat, idx) => {
                const angle = -90 + idx * (360 / 8);
                const rad = (angle * Math.PI) / 180;
                const r = 215;
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                return (
                  <clipPath key={`clip-hublot-${cat.id}`} id={`clip-hublot-${cat.id}`}>
                    <circle cx={x} cy={y} r="30" />
                  </clipPath>
                );
              })}
            </defs>

            {/* A. CERCLES ORBITAUX PERMANENTS */}
            {ORBIT_RADII.map((radius, idx) => {
              const ringGen = idx + 1;
              const isHighlighted = (explorerLevel === 'stories' && (idx === 0 || idx === 1 || ringGen <= nodesByGeneration.length))
                || (explorerLevel === 'dimensions' && idx === 0);

              return (
                <g key={`orbit-${idx}`}>
                  <circle 
                    cx="0" 
                    cy="0" 
                    r={radius} 
                    fill="none" 
                    stroke="#C89B3C" 
                    strokeWidth={isHighlighted ? '1.5' : '1'} 
                    strokeDasharray={isHighlighted ? 'none' : '3 4'} 
                    opacity={isHighlighted ? '0.6' : '0.2'} 
                  />
                </g>
              );
            })}

            {/* ========================================================================= */}
            {/* NIVEAU 0 : LES 8 PORTES D'OR ET LEURS HUBLOTS PHOTOGRAPHIQUES (PISTE 1)   */}
            {/* ========================================================================= */}
            {explorerLevel === 'dimensions' && (
              <g id="wheel-level-dimensions">
                {/* Rayons célestes dorés d'astrolabe */}
                {EXPLORER_CATEGORIES.map((cat, idx) => {
                  const angle = -90 + idx * (360 / 8);
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
                        strokeWidth={isHovered ? "1.8" : "1"} 
                        strokeDasharray={isHovered ? "none" : "2 3"} 
                        opacity={isHovered ? "0.85" : "0.35"} 
                      />
                      <circle 
                        cx={x * 0.52} 
                        cy={y * 0.52} 
                        r={isHovered ? "2.5" : "1.8"} 
                        fill="#C89B3C" 
                        opacity={isHovered ? "0.9" : "0.5"} 
                      />
                    </g>
                  );
                })}

                {/* Les 8 Hublots Photographiques immersifs */}
                {EXPLORER_CATEGORIES.map((cat, idx) => {
                  const angle = -90 + idx * (360 / 8);
                  const rad = (angle * Math.PI) / 180;
                  const r = 215;
                  const x = Math.cos(rad) * r;
                  const y = Math.sin(rad) * r;
                  const isCurrent = activeCategory === cat.id;
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
                        celestialAudio.playOrbHover(480 + idx * 35);
                      }}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      {/* Zone tactile généreuse */}
                      <circle cx={x} cy={y} r="42" fill="transparent" />

                      {/* Halo lumineux d'ambre et d'or au survol */}
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={isHovered ? "40" : "33"} 
                        fill={cat.accentColor} 
                        opacity={isHovered ? "0.45" : "0.15"} 
                        className="transition-all duration-300 pointer-events-none" 
                        filter="drop-shadow(0 0 16px rgba(162, 72, 43, 0.35))"
                      />

                      {/* Vignette circulaire de la Porte (Pas de photo, fond noble et bague dorée) */}
                      <circle 
                        cx={x} 
                        cy={y} 
                        r="32" 
                        fill={isHovered ? "#292524" : "#1C1917"} 
                        stroke={isHovered ? "#FFE7A3" : "#C89B3C"} 
                        strokeWidth={isHovered ? "2.5" : "1.8"} 
                        filter="drop-shadow(0 4px 14px rgba(0,0,0,0.32))" 
                        className="transition-all duration-300"
                      />

                      {/* Filet intérieur discret d'orfèvrerie */}
                      <circle 
                        cx={x} 
                        cy={y} 
                        r="27" 
                        fill="none" 
                        stroke={isHovered ? "rgba(255,231,163,0.4)" : "rgba(200,155,60,0.22)"} 
                        strokeWidth="1" 
                        className="pointer-events-none transition-colors duration-300"
                      />

                      {/* Grande Icône innovante & dédiée occupant toute la vignette */}
                      <foreignObject x={x - 20} y={y - 20} width="40" height="40" className="pointer-events-none">
                        <div className={`w-full h-full flex items-center justify-center transition-transform duration-300 ${
                          isHovered ? 'scale-110 text-[#FFE7A3]' : 'scale-100 text-[#FCE7A6]'
                        }`}>
                          {React.createElement(CATEGORY_ICONS[cat.id] || Sparkles, {
                            className: 'w-7 h-7 stroke-[1.8] drop-shadow-sm'
                          })}
                        </div>
                      </foreignObject>

                      {/* Cartouche nominal de la Porte : Fond Terre Cuite signature, texte blanc ultra-lisible */}
                      <g 
                        transform={`translate(${x}, ${y + 46})`} 
                        className={`transition-all duration-300 pointer-events-none ${
                          isHovered ? 'scale-110' : 'scale-100'
                        }`}
                        style={{ transformOrigin: `${x}px ${y + 46}px` }}
                      >
                        {/* Fond du cartouche pilule en Terre Cuite (#A2482B) */}
                        <rect 
                          x="-52" 
                          y="-13" 
                          width="104" 
                          height="26" 
                          rx="13" 
                          fill={isHovered ? "#8A3B22" : "#A2482B"} 
                          stroke={isHovered ? "#FFE7A3" : "rgba(255,255,255,0.45)"}
                          strokeWidth={isHovered ? "1.8" : "1.2"}
                          filter="drop-shadow(0 4px 12px rgba(162,72,43,0.38))"
                          className="transition-colors duration-200"
                        />
                        {/* Libellé unique en blanc éclatant */}
                        <text 
                          x="0" 
                          y="4" 
                          textAnchor="middle" 
                          fill="#FFFFFF" 
                          fontSize="11.5" 
                          fontWeight="700"
                          letterSpacing="0.03em"
                          className="select-none transition-colors duration-200"
                        >
                          {cat.label}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>
            )}

            {/* ========================================================================= */}
            {/* NAVIGATION CONCENTRIQUE DOUBLE LECTURE : ANNEAU 1 (SUJETS) + ANNEAU 2 (16 VOIX) */}
            {/* ========================================================================= */}
            {explorerLevel !== 'dimensions' && (
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
                    strokeWidth="1.2" 
                    strokeDasharray="3 4" 
                    opacity="0.35" 
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
                        {/* A. FORMAT AFFICHE VERTICALE POUR LES SÉRIES (5 séries de la plateforme) */}
                        {activeCategory === 'series' ? (
                          <g>
                            {/* Halo doré si sélectionné */}
                            {isSelected && (
                              <rect 
                                x={x - 24} 
                                y={y - 34} 
                                width="48" 
                                height="68" 
                                rx="8" 
                                fill="none" 
                                stroke="#C89B3C" 
                                strokeWidth="2.5" 
                                filter="drop-shadow(0 0 10px rgba(200,155,60,0.5))"
                              />
                            )}

                            {/* Affiche rectangulaire avec image */}
                            <rect 
                              x={x - 22} 
                              y={y - 32} 
                              width="44" 
                              height="64" 
                              rx="6" 
                              fill="#1C1917" 
                              stroke={isSelected ? '#C89B3C' : '#78716C'} 
                              strokeWidth={isSelected ? '2' : '1'} 
                              filter="drop-shadow(0 3px 8px rgba(0,0,0,0.25))"
                            />
                            <image 
                              href={topic.photoUrl} 
                              x={x - 22} 
                              y={y - 32} 
                              width="44" 
                              height="64" 
                              clipPath={`url(#clip-poster-${topic.id})`}
                              preserveAspectRatio="xMidYMid slice" 
                            />
                            <rect 
                              x={x - 22} 
                              y={y - 32} 
                              width="44" 
                              height="64" 
                              rx="6" 
                              fill="none" 
                              stroke={isSelected ? '#C89B3C' : '#FFFFFF'} 
                              strokeWidth="1.2" 
                            />

                            {/* Titre de la série sous l'affiche (uniquement au survol des non-sélectionnés, pas de doublon si déjà sélectionné au centre) */}
                            <g 
                              transform={`translate(${x}, ${y + 40})`} 
                              className={`transition-opacity duration-200 pointer-events-none ${isSelected ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}
                            >
                              <rect 
                                x="-42" 
                                y="-8" 
                                width="84" 
                                height="17" 
                                rx="8.5" 
                                fill="#1C1917" 
                                stroke={isSelected ? '#C89B3C' : '#78716C'}
                                strokeWidth="1"
                                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.4))"
                              />
                              <text 
                                x="0" 
                                y="3.5" 
                                textAnchor="middle" 
                                fill="#FDFBF7" 
                                fontSize="8.5" 
                                fontWeight="600"
                                fontFamily="sans-serif"
                              >
                                {topic.title.length > 15 ? `${topic.title.slice(0, 14)}…` : topic.title}
                              </text>
                            </g>
                          </g>
                        ) : activeCategory === 'countries' ? (
                          /* B. FORMAT DRAPEAUX PURS POUR LES PAYS (Affichage du nom au survol/sélection) */
                          <g>
                            {/* Halo au survol ou sélection */}
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
                              r="20" 
                              fill="#1C1917" 
                              stroke={isSelected ? '#C89B3C' : '#8B6845'} 
                              strokeWidth={isSelected ? '2.5' : '1.2'} 
                              filter="drop-shadow(0 3px 8px rgba(0,0,0,0.25))" 
                            />

                            {/* Drapeau plein circulaire prenant 100% de la vignette sans marge */}
                            <image 
                              href={getCountryFlagUrl(topic.id)} 
                              x={x - 20} 
                              y={y - 20} 
                              width="40" 
                              height="40" 
                              clipPath={`url(#clip-inner-circle-${topic.id})`}
                              preserveAspectRatio="xMidYMid slice" 
                              className="pointer-events-none"
                            />

                            {/* Anneau de sertissage en or précieux */}
                            <circle 
                              cx={x} 
                              cy={y} 
                              r="20" 
                              fill="none" 
                              stroke={isSelected ? '#FFE7A3' : 'rgba(200, 155, 60, 0.45)'} 
                              strokeWidth={isSelected ? '2.5' : '1.2'} 
                              className="pointer-events-none"
                            />

                            {/* Nom du pays révélé uniquement au survol si non sélectionné (évite le doublon avec le centre) */}
                            <g 
                              transform={`translate(${x}, ${y + 29})`} 
                              className={`transition-opacity duration-200 pointer-events-none ${isSelected ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}
                            >
                              <rect 
                                x="-36" 
                                y="-8" 
                                width="72" 
                                height="17" 
                                rx="8.5" 
                                fill="#1C1917" 
                                stroke={isSelected ? '#C89B3C' : '#78716C'}
                                strokeWidth="1"
                                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.4))"
                              />
                              <text 
                                x="0" 
                                y="3.5" 
                                textAnchor="middle" 
                                fill="#FDFBF7" 
                                fontSize="9" 
                                fontWeight="600"
                                fontFamily="sans-serif"
                              >
                                {topic.title}
                              </text>
                            </g>
                          </g>
                        ) : activeCategory === 'questions' ? (
                          /* C. FORMAT MÉDAILLON POUR LES SAGESSES POPULAIRES */
                          <g>
                            <circle 
                              cx={x} 
                              cy={y} 
                              r="25" 
                              fill="none" 
                              stroke="#C89B3C" 
                              strokeWidth={isSelected ? '2' : '1'} 
                              strokeDasharray={isSelected ? 'none' : '2 3'}
                              className={isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-200'}
                            />
                            <circle 
                              cx={x} 
                              cy={y} 
                              r="20" 
                              fill="#1C1917" 
                              stroke={isSelected ? '#C89B3C' : '#78716C'} 
                              strokeWidth={isSelected ? '2' : '1'} 
                              filter="drop-shadow(0 2px 6px rgba(0,0,0,0.3))" 
                            />
                            <text 
                              x={x} 
                              y={y + 3} 
                              textAnchor="middle" 
                              fill="#F5D88C" 
                              fontSize="7.5" 
                              fontWeight="600"
                              fontFamily="sans-serif"
                            >
                              {topic.title.length > 9 ? `${topic.title.slice(0, 8)}…` : topic.title}
                            </text>
                          </g>
                        ) : (
                          /* D. FORMAT BADGE CIRCULAIRE POUR LES AUTRES CATÉGORIES (Marques, etc.) */
                          <g>
                            <circle 
                              cx={x} 
                              cy={y} 
                              r="25" 
                              fill="none" 
                              stroke="#C89B3C" 
                              strokeWidth={isSelected ? '2' : '1'} 
                              strokeDasharray={isSelected ? 'none' : '3 3'}
                              className={isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-200'}
                            />
                            <circle 
                              cx={x} 
                              cy={y} 
                              r="20" 
                              fill="#FFFFFF" 
                              stroke={isSelected ? '#C89B3C' : '#E7E5E4'} 
                              strokeWidth={isSelected ? '2' : '1.2'} 
                              filter="drop-shadow(0 2px 6px rgba(0,0,0,0.12))" 
                            />
                            <image 
                              href={topic.photoUrl} 
                              x={x - 20} 
                              y={y - 20} 
                              width="40" 
                              height="40" 
                              clipPath={`url(#clip-inner-circle-${topic.id})`}
                              preserveAspectRatio="xMidYMid slice" 
                            />
                            <circle 
                              cx={x} 
                              cy={y} 
                              r="20" 
                              fill="none" 
                              stroke={isSelected ? '#C89B3C' : '#FFFFFF'} 
                              strokeWidth="1.2" 
                            />
                            {/* Nom du sujet au survol si non sélectionné (évite le doublon avec le centre) */}
                            <g 
                              transform={`translate(${x}, ${y + 28})`} 
                              className={`transition-opacity duration-200 pointer-events-none ${isSelected ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}
                            >
                              <rect 
                                x="-36" 
                                y="-8" 
                                width="72" 
                                height="17" 
                                rx="8.5" 
                                fill="#1C1917" 
                                stroke={isSelected ? '#C89B3C' : '#78716C'}
                                strokeWidth="1"
                                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.4))"
                              />
                              <text 
                                x="0" 
                                y="3.5" 
                                textAnchor="middle" 
                                fill="#FDFBF7" 
                                fontSize="8.5" 
                                fontWeight="600"
                                fontFamily="sans-serif"
                              >
                                {topic.title.length > 13 ? `${topic.title.slice(0, 12)}…` : topic.title}
                              </text>
                            </g>
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
                    strokeWidth="1.2" 
                    strokeDasharray="3 4" 
                    opacity="0.35" 
                  />
                ))}

                {/* Liens de cooptation entre générations (mode Séries) */}
                {connectingLinks.map((link) => (
                  <line 
                    key={link.id}
                    x1={link.from.x} 
                    y1={link.from.y} 
                    x2={link.to.x} 
                    y2={link.to.y} 
                    stroke="#C89B3C" 
                    strokeWidth={link.isActive ? '1.8' : '1.2'} 
                    strokeDasharray={link.isActive ? 'none' : '3 3'} 
                    opacity={link.isActive ? '0.95' : '0.6'} 
                  />
                ))}

                {/* Nœuds des 16 personnes */}
                {nodesByGeneration.flatMap((nodes) => 
                  nodes.map((node) => {
                    const radius = node.gen === 1 ? 22 : 19;
                    const isSelected = selectedPath.includes(node.person.id);

                    return (
                      <g 
                        key={`node-${node.person.id}`}
                        id={`node-${node.person.id}`}
                        className="group cursor-pointer"
                        style={{ pointerEvents: 'auto' }}
                        transform={`rotate(${-rotationAngle}, ${node.x}, ${node.y})`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (hasDraggedRef.current) return;
                          handleNodeClick(node.person, node.gen);
                        }}
                        onMouseEnter={() => celestialAudio.playOrbHover(540)}
                      >
                        {/* Zone tactile */}
                        <circle cx={node.x} cy={node.y} r={radius + 8} fill="transparent" />

                        {/* Halo lumineux doré pour le nœud actif */}
                        {isSelected && (
                          <circle 
                            cx={node.x} 
                            cy={node.y} 
                            r={radius + 24} 
                            fill="url(#nodeActiveGlow)" 
                          />
                        )}

                        {/* Anneau délicat au survol */}
                        <circle 
                          cx={node.x} 
                          cy={node.y} 
                          r={radius + 3.5} 
                          fill="none" 
                          stroke="#C89B3C" 
                          strokeWidth="2" 
                          strokeDasharray="3 3"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                        />

                        {/* Disque blanc de fond */}
                        <circle 
                          cx={node.x} 
                          cy={node.y} 
                          r={radius + 1.5} 
                          fill="#FFFFFF" 
                          stroke={isSelected ? '#C89B3C' : '#E7E5E4'} 
                          strokeWidth={isSelected ? '2.5' : '1.5'} 
                          filter="drop-shadow(0 2px 5px rgba(0,0,0,0.15))" 
                        />

                        {/* Photo de profil (toujours orientée vers le haut grâce à la contre-rotation) */}
                        <image 
                          href={node.person.photoUrl} 
                          x={node.x - radius} 
                          y={node.y - radius} 
                          width={radius * 2} 
                          height={radius * 2} 
                          clipPath={`url(#clip-${node.person.id})`}
                          preserveAspectRatio="xMidYMid slice" 
                        />

                        {/* Cerclage de finition */}
                        <circle 
                          cx={node.x} 
                          cy={node.y} 
                          r={radius} 
                          fill="none" 
                          stroke={isSelected ? '#C89B3C' : '#FFFFFF'} 
                          strokeWidth={isSelected ? '2' : '1.5'} 
                        />

                        {/* Prénom et Âge sous l'avatar au survol (strictement prénom et âge) */}
                        <g 
                          transform={`translate(${node.x}, ${node.y + radius + 12})`} 
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
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

                        {/* Pastille compteur de cooptation (mode Séries) */}
                        {node.descendantCount > 0 && (
                          <g transform={`translate(${node.x + radius * 0.65}, ${node.y + radius * 0.65})`} pointerEvents="none">
                            <circle 
                              cx="0" 
                              cy="0" 
                              r="8" 
                              fill={isSelected ? '#C89B3C' : '#1C1917'} 
                              stroke="#FFFFFF" 
                              strokeWidth="1.2" 
                            />
                            <text 
                              x="0" 
                              y="3" 
                              textAnchor="middle" 
                              fill="#FFFFFF" 
                              fontSize="9" 
                              fontWeight="bold"
                              fontFamily="sans-serif"
                            >
                              {node.descendantCount}
                            </text>
                          </g>
                        )}
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
          topicName={activeTopicItem?.title}
          activeCategory={activeCategory}
          activeFlagUrl={activeCategory === 'countries' ? getCountryFlagUrl(activeTopicId) : undefined}
          activeCoverImage={activeCategory !== 'countries' ? activeTopicItem?.photoUrl : undefined}
          hoveredCategory={hoveredCategory}
          onActualiser={handleActualiser}
          onStepBack={() => setExplorerLevel('dimensions')}
          isRefreshing={isRefreshing}
        />
      </div>

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
            className="group relative rounded-3xl overflow-hidden bg-stone-900 text-white shadow-2xl border border-stone-700/60 flex flex-col justify-between w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] animate-in zoom-in-95 duration-200 select-none cursor-pointer"
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

            {/* HAUT : Titre du sujet + Commandes */}
            <div className="relative z-20 p-4 flex items-center justify-between pointer-events-auto">
              <div 
                className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-[#F5D88C] font-medium shadow-md tracking-wide max-w-[65%] sm:max-w-[75%] flex items-center gap-1.5"
              >
                <span className="truncate block font-semibold">
                  {activeTopicItem?.title || modalPerson.universeTag}
                </span>
                {activeCategory === 'questions' && (activeTopicItem?.question || activeTopicItem?.subtitle) && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#C89B3C]/25 text-[#F5D88C] font-normal shrink-0">
                    Question
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Muet / Son */}
                <button
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all shadow-md hover:scale-105 active:scale-95"
                  title={isMuted ? 'Activer le son' : 'Couper le son'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white/80" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#C89B3C]" />
                  )}
                </button>

                {/* Pause / Play */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVideoPlayback();
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                    isPlaying
                      ? 'border border-[#C89B3C] ring-2 ring-[#C89B3C]/40 bg-black/60 backdrop-blur-md shadow-[0_0_16px_rgba(200,155,60,0.6)]'
                      : 'border border-transparent bg-black/40 hover:bg-black/60 backdrop-blur-md'
                  }`}
                  title={isPlaying ? 'Mettre en pause' : 'Lire la vidéo'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-[#C89B3C] fill-[#C89B3C]" />
                  ) : (
                    <Play className="w-4 h-4 text-[#C89B3C] fill-[#C89B3C] translate-x-0.5" />
                  )}
                </button>

                {/* Fermer */}
                <button 
                  id="btn-close-modal"
                  onClick={() => {
                    setModalPerson(null);
                    setIsPlaying(false);
                    setIsResonanceModalOpen(false);
                  }}
                  className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-stone-200 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                  title="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* BAS : Prénom + Âge en dessous uniquement + Bouton Diamant & Bonhomme */}
            <div className="relative z-20 p-5 sm:p-6 flex items-end justify-between pointer-events-auto mt-auto">
              <div className="text-left font-sans">
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none drop-shadow-md">
                  {modalPerson.firstName || modalPerson.name.split(' ')[0]}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 font-medium drop-shadow">
                  {modalPerson.age ? `${modalPerson.age} ans` : '46 ans'}
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 shrink-0">
                {/* Évaluation résonance (diamant) */}
                <button
                  id={`btn-eval-resonance-${modalPerson.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsResonanceModalOpen(true);
                  }}
                  className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 ${
                    personResonancePct !== null
                      ? 'bg-black/70 border-[#C89B3C] text-[#E5C16C] shadow-[0_0_14px_rgba(200,155,60,0.5)]'
                      : 'bg-white/20 hover:bg-white/30 border-white/25 text-white'
                  }`}
                  title={personResonancePct !== null ? `Résonance : ${personResonancePct}%` : "Évaluer la résonance"}
                >
                  <Gem className="w-5 h-5" />
                </button>

                {/* Accès à son univers complet (bonhomme) */}
                <button
                  id={`modal-btn-universe-${modalPerson.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenUniverse(modalPerson);
                  }}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  title="Découvrir son univers complet"
                >
                  <User className="w-5 h-5" />
                </button>
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
