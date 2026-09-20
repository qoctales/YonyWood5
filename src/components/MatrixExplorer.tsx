import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { 
  Tv, 
  X, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Compass, 
  Sparkles,
  ArrowRight,
  UserCheck,
  Award,
  User,
  Gem
} from 'lucide-react';
import { MATRIX_SERIES_DATA, MatrixSeriesConfig } from '../data/matrixData';
import { AffiliationPerson, ViewScreen, Protagonist } from '../types';
import { CentralAstrolabeJoystick } from './CentralAstrolabeJoystick';
import { VerticalZoomSlider } from './VerticalZoomSlider';
import { ProtagonistTeaserModal } from './ProtagonistTeaserModal';
import { PROTAGONISTS } from '../data/mockData';
import { ResonanceModal } from './ResonanceModal';

interface MatrixExplorerProps {
  onNavigate: (screen: ViewScreen | any) => void;
  onSelectDocumentary?: (docId: string) => void;
}

// Fonction récursive de calcul des personnes cooptées dans la descendance
function countDescendants(person: AffiliationPerson): number {
  if (!person.invitedPeople || person.invitedPeople.length === 0) {
    return 0;
  }
  return person.invitedPeople.reduce((total, child) => {
    return total + 1 + countDescendants(child);
  }, 0);
}

// Rayons des orbites concentriques (Ring 1 à 5)
const ORBIT_RADII = [165, 275, 385, 495, 605];

export const MatrixExplorer: React.FC<MatrixExplorerProps> = ({ 
  onNavigate,
  onSelectDocumentary 
}) => {
  // 1. Filtrage par série : 'ALL' ou ID de la série
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);
  const [teaserProtagonist, setTeaserProtagonist] = useState<Protagonist | null>(null);

  // 2. Navigation spatiale : rotation, zoom et translation (pan)
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Références d'interaction pour la rotation fluide par glisser-déposer sur la roue ou sur chaque personne
  const containerRef = useRef<HTMLDivElement>(null);
  const isRotatingRef = useRef<boolean>(false);
  const pointerStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastPointerAngleRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  // 3. Chemin de sélection généalogique [idGen1, idGen2, idGen3, idGen4, idGen5]
  // Démarre vide pour que le premier clic déploie les liens du pionnier et le second ouvre la modale
  const [selectedPath, setSelectedPath] = useState<string[]>([]);

  // 4. Modale de présentation détaillée (format 9:16 vidéo avec commandes immersives)
  const [modalPerson, setModalPerson] = useState<AffiliationPerson | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isResonanceModalOpen, setIsResonanceModalOpen] = useState<boolean>(false);
  const [personResonancePct, setPersonResonancePct] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Synchronisation de la note de résonance lorsque la personne affichée change
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
      setIsResonanceModalOpen(false);
    } else {
      setIsResonanceModalOpen(false);
    }
  }, [modalPerson]);

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
    setModalPerson(null);
    setIsPlaying(false);
    // On transmet l'identifiant unique exact de la personne pour garantir
    // d'atterrir sur sa page profil avec sa photo, son nom et sa vidéo.
    onNavigate({ 
      type: 'protagonist_profile', 
      protagonistId: person.id 
    });
  };

  // Récupération de la série active ou de la collection complète
  const activeSeries = useMemo<MatrixSeriesConfig>(() => {
    if (selectedFilter === 'ALL') {
      return MATRIX_SERIES_DATA[0];
    }
    return MATRIX_SERIES_DATA.find(s => s.seriesId === selectedFilter) || MATRIX_SERIES_DATA[0];
  }, [selectedFilter]);

  // Réinitialiser la sélection lors du changement de série
  const handleSelectFilter = (filterId: string) => {
    setSelectedFilter(filterId);
    setIsFilterDropdownOpen(false);
    setSelectedPath([]);
  };

  // 16 Pionniers fondateurs (Génération 1)
  const pioneers = useMemo<AffiliationPerson[]>(() => {
    return activeSeries.pioneers.slice(0, 16);
  }, [activeSeries]);

  // Calcul dynamique des nœuds et des liens pour chaque orbite déployée
  const { nodesByGeneration, connectingLinks } = useMemo(() => {
    interface NodeItem {
      person: AffiliationPerson;
      gen: number; // 1-indexed
      x: number;
      y: number;
      angle: number;
      parentId?: string;
      descendantCount: number;
      isSelected: boolean;
      isInLineage: boolean;
    }

    interface LinkItem {
      id: string;
      from: { x: number; y: number };
      to: { x: number; y: number };
      isActive: boolean;
    }

    const genNodes: NodeItem[][] = [];
    const links: LinkItem[] = [];

    // --- GÉNÉRATION 1 : 16 Pionniers sur l'orbite 1 (rayon R1) ---
    const gen1Nodes: NodeItem[] = pioneers.map((p, idx) => {
      const angle = -90 + idx * (360 / 16);
      const rad = (angle * Math.PI) / 180;
      const r = ORBIT_RADII[0];
      const isSel = selectedPath[0] === p.id;
      return {
        person: p,
        gen: 1,
        x: Math.cos(rad) * r,
        y: Math.sin(rad) * r,
        angle,
        descendantCount: countDescendants(p),
        isSelected: isSel,
        isInLineage: isSel
      };
    });
    genNodes.push(gen1Nodes);

    // --- GÉNÉRATIONS SUCCESSIVES 2 À 5 : DÉPLOIEMENT CONCENTRIQUE ---
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
      const r = ORBIT_RADII[childGen - 1];

      // Éventail angulaire centré sur l'angle du parent
      const span = childCount === 1 
        ? 0 
        : Math.min(85, Math.max(38, (childCount - 1) * 32));

      const childNodes: NodeItem[] = children.map((child, cIdx) => {
        let childAngle = parentNode.angle;
        if (childCount > 1) {
          childAngle = parentNode.angle - span / 2 + cIdx * (span / (childCount - 1));
        }
        const childRad = (childAngle * Math.PI) / 180;
        const x = Math.cos(childRad) * r;
        const y = Math.sin(childRad) * r;
        const isSel = selectedPath[childGen - 1] === child.id;

        // Liaison parent -> enfant
        const isLinkActive = selectedPath[currentParentGen - 1] === parentNode.person.id &&
                             selectedPath[childGen - 1] === child.id;
        links.push({
          id: `${parentNode.person.id}->${child.id}`,
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
          parentId: parentNode.person.id,
          descendantCount: countDescendants(child),
          isSelected: isSel,
          isInLineage: isSel
        };
      });

      genNodes.push(childNodes);
      currentParentGen++;
    }

    return { nodesByGeneration: genNodes, connectingLinks: links };
  }, [pioneers, selectedPath]);

  // Calcul de l'angle du curseur par rapport au centre de l'astrolabe
  const getAngleFromCenter = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 + pan.x;
    const centerY = rect.top + rect.height / 2 + pan.y;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }, [pan]);

  // Début de la rotation (déclenchable sur la toile, la roue ou sur chaque personne)
  const handlePointerDown = (e: React.PointerEvent) => {
    // Ne pas intercepter si le clic cible des contrôles d'interface fixes
    if ((e.target as HTMLElement).closest('#series-filter-pill-button, #vertical-zoom-slider, #person-detail-modal, button')) {
      return;
    }
    isRotatingRef.current = true;
    hasDraggedRef.current = false;
    pointerStartPosRef.current = { x: e.clientX, y: e.clientY };
    lastPointerAngleRef.current = getAngleFromCenter(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isRotatingRef.current) return;
    
    // Détection de mouvement significatif pour distinguer le clic du glisser
    const dist = Math.hypot(e.clientX - pointerStartPosRef.current.x, e.clientY - pointerStartPosRef.current.y);
    if (dist > 6) {
      hasDraggedRef.current = true;
    }

    const currentAngle = getAngleFromCenter(e.clientX, e.clientY);
    let delta = currentAngle - lastPointerAngleRef.current;
    
    // Normalisation du passage de frontière -180° / +180°
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    // VITESSE ADOUCIE : rotation plus calme, fluide et progressive
    const ROTATION_SPEED_FACTOR = 0.35;
    setRotationAngle(prev => (prev + delta * ROTATION_SPEED_FACTOR + 360) % 360);
    lastPointerAngleRef.current = currentAngle;
  };

  const handlePointerUp = () => {
    isRotatingRef.current = false;
  };

  // Clic sur une personne :
  // Déploie immédiatement sa lignée ET ouvre directement sa vidéo de présentation
  const handleNodeClick = (person: AffiliationPerson, gen: number) => {
    setSelectedPath(prev => {
      const next = prev.slice(0, gen - 1);
      next.push(person.id);
      return next;
    });
    setModalPerson(person);
    setIsPlaying(true);
  };

  // Zoom à la molette de souris
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setZoomLevel(prev => Math.min(1.5, Math.max(0.5, prev + delta)));
  };

  // Réinitialisation complète de la vue
  const handleResetView = () => {
    setRotationAngle(0);
    setZoomLevel(1.0);
    setPan({ x: 0, y: 0 });
  };

  // Écoute des touches et du relâchement global de la souris/toucher
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalPerson) {
        setModalPerson(null);
      }
    };
    const handleGlobalPointerUp = () => {
      isRotatingRef.current = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerup', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, [modalPerson]);

  return (
    <div 
      id="astrolabe-explorer-screen"
      ref={containerRef}
      className="relative w-full h-[calc(100vh-3.5rem)] bg-[#FFFFFF] overflow-hidden select-none font-sans"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      style={{ cursor: isRotatingRef.current ? 'grabbing' : 'grab' }}
    >

      {/* 1. SÉLECTEUR DE SÉRIE SUPÉRIEUR GAUCHE (PILULE "TOUS" / SÉRIES) */}
      <div className="absolute top-6 left-6 z-40">
        <div className="relative">
          <button
            id="series-filter-pill-button"
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 border border-[#E7E5E4] shadow-sm hover:border-[#C89B3C]/70 transition-all text-[#1C1917] font-medium text-xs sm:text-sm"
          >
            <Tv className="w-4 h-4 text-[#C89B3C]" />
            <span className="font-semibold">
              {selectedFilter === 'ALL' 
                ? 'Tous' 
                : MATRIX_SERIES_DATA.find(s => s.seriesId === selectedFilter)?.seriesTitle || 'Tous'}
            </span>
            <X 
              className="w-3.5 h-3.5 text-stone-400 hover:text-[#1C1917] transition-colors ml-0.5" 
              onClick={(e) => {
                e.stopPropagation();
                handleSelectFilter('ALL');
              }}
            />
          </button>

          {/* Menu déroulant de sélection */}
          {isFilterDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border border-[#E7E5E4] shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => handleSelectFilter('ALL')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors ${
                  selectedFilter === 'ALL'
                    ? 'bg-[#C89B3C]/10 text-[#8B6845]'
                    : 'text-[#1C1917] hover:bg-stone-50'
                }`}
              >
                <span>Tous les pionniers</span>
                {selectedFilter === 'ALL' && <div className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />}
              </button>

              <div className="my-1 border-t border-stone-100" />

              {MATRIX_SERIES_DATA.map((s) => (
                <button
                  key={s.seriesId}
                  onClick={() => handleSelectFilter(s.seriesId)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors ${
                    selectedFilter === s.seriesId
                      ? 'bg-[#C89B3C]/10 text-[#8B6845] font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span className="truncate">{s.seriesTitle}</span>
                  {selectedFilter === s.seriesId && <div className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. SLIDER VERTICAL DE ZOOM FLOTTANT À DROITE */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-40">
        <VerticalZoomSlider 
          zoomLevel={zoomLevel} 
          onZoomChange={setZoomLevel}
          minZoom={0.5}
          maxZoom={1.5}
        />
      </div>

      {/* 3. SCÈNE CENTRALE : PLANÉTAIRE & CONSTELLATIONS CONCENTRIQUES */}
      <div 
        className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`
        }}
      >
        {/* Rotation générale appliquée à l'astrolabe */}
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

              {/* ClipPaths circulaires pour chaque protagoniste affiché */}
              {nodesByGeneration.flatMap(nodes => nodes).map(node => (
                <clipPath key={`clip-${node.person.id}`} id={`clip-${node.person.id}`}>
                  <circle cx={node.x} cy={node.y} r={node.gen === 1 ? 21 : 19} />
                </clipPath>
              ))}
            </defs>

            {/* A. CERCLES ORBITAUX CONCENTRIQUES (RINGS 1 À 5) */}
            {ORBIT_RADII.map((radius, idx) => {
              const ringGen = idx + 1;
              const isDeployed = ringGen === 1 || ringGen <= nodesByGeneration.length;
              return (
                <g key={`orbit-${idx}`}>
                  {/* Guide astronomique pointillé permanent */}
                  <circle 
                    cx="0" 
                    cy="0" 
                    r={radius} 
                    fill="none" 
                    stroke="#C89B3C" 
                    strokeWidth="1" 
                    strokeDasharray="3 4" 
                    opacity="0.25" 
                  />

                  {/* Anneau doré mis en valeur lors du déploiement orbital */}
                  {isDeployed && (
                    <circle 
                      cx="0" 
                      cy="0" 
                      r={radius} 
                      fill="none" 
                      stroke="#C89B3C" 
                      strokeWidth={ringGen === 1 ? '1.5' : '1.8'} 
                      opacity={ringGen === 1 ? '0.7' : '0.9'} 
                    />
                  )}
                </g>
              );
            })}

            {/* B. RAYONS POINTILLÉS CENTRAUX (CENTRE -> 16 PIONNIERS) */}
            {nodesByGeneration[0]?.map((pioneerNode) => (
              <line 
                key={`central-ray-${pioneerNode.person.id}`}
                x1="0" 
                y1="0" 
                x2={pioneerNode.x} 
                y2={pioneerNode.y} 
                stroke="#C89B3C" 
                strokeWidth="1.2" 
                strokeDasharray="3 4" 
                opacity="0.35" 
              />
            ))}

            {/* C. LIENS DE FILIATION ENTRE GÉNÉRATIONS (PARENT -> ENFANTS) */}
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

            {/* D. RENDU DES NŒUDS AVATAR AVEC CONTRE-ROTATION (TÊTE TOUJOURS EN HAUT) */}
            {nodesByGeneration.flatMap((nodes) => 
              nodes.map((node) => {
                const radius = node.gen === 1 ? 21 : 19;
                const isSelected = selectedPath.includes(node.person.id);

                return (
                  <g 
                    key={`node-${node.person.id}`}
                    id={`node-${node.person.id}`}
                    className="group cursor-pointer"
                    style={{ pointerEvents: 'auto' }}
                    // CONTRE-ROTATION CRUCIALE : annule la rotation de l'astrolabe autour du centre du nœud
                    // afin que la tête de la personne et le chiffre restent toujours orientés vers le haut
                    transform={`rotate(${-rotationAngle}, ${node.x}, ${node.y})`}
                    onPointerDown={(e) => {
                      // Permet de tourner la roue même en commençant le glisser sur une vignette
                      pointerStartPosRef.current = { x: e.clientX, y: e.clientY };
                      hasDraggedRef.current = false;
                      isRotatingRef.current = true;
                      lastPointerAngleRef.current = getAngleFromCenter(e.clientX, e.clientY);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (hasDraggedRef.current) return;
                      handleNodeClick(node.person, node.gen);
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setModalPerson(node.person);
                      setIsPlaying(true);
                    }}
                  >
                    {/* Zone de détection tactile & souris stable : évite tout décrochage ou vibration au bord */}
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={radius + 7} 
                      fill="transparent" 
                      pointerEvents="all"
                    />

                    {/* HALO LUMINEUX DORÉ POUR LE NŒUD ACTIF */}
                    {isSelected && (
                      <circle 
                        cx={node.x} 
                        cy={node.y} 
                        r={radius + 24} 
                        fill="url(#nodeActiveGlow)" 
                        pointerEvents="none"
                      />
                    )}

                    {/* Anneau délicat doré au survol (transition d'opacité douce et parfaitement stable) */}
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={radius + 3.5} 
                      fill="none" 
                      stroke="#C89B3C" 
                      strokeWidth="2" 
                      strokeDasharray="3 3"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      pointerEvents="none"
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
                      pointerEvents="none"
                    />

                    {/* Photo de profil du protagoniste (toujours la tête en haut grâce à la contre-rotation) */}
                    <image 
                      href={node.person.photoUrl} 
                      x={node.x - radius} 
                      y={node.y - radius} 
                      width={radius * 2} 
                      height={radius * 2} 
                      clipPath={`url(#clip-${node.person.id})`}
                      preserveAspectRatio="xMidYMid slice"
                      pointerEvents="none"
                    />

                    {/* Cerclage de finition */}
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={radius} 
                      fill="none" 
                      stroke={isSelected ? '#C89B3C' : '#FFFFFF'} 
                      strokeWidth={isSelected ? '2' : '1.5'} 
                      pointerEvents="none"
                    />

                    {/* PASTILLE DE COMPTEUR : uniquement les personnes cooptées dans sa descendance */}
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
          </svg>

          {/* JOYSTICK CENTRAL FLUIDE DE L'ASTROLABE */}
          <CentralAstrolabeJoystick 
            rotationAngle={rotationAngle}
            onRotateDelta={(delta) => setRotationAngle(prev => (prev + delta + 360) % 360)}
            onSetRotationAngle={setRotationAngle}
            onReset={handleResetView}
          />
        </div>
      </div>

      {/* 4. CARTE VIDÉO 9:16 DU PROTAGONISTE (AVEC PRÉNOM, ÂGE, PETIT BONHOMME & ICÔNE VIDÉO DORÉE) */}
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
            {/* 1. Média de présentation : Affiche poster & Vidéo fluide en boucle */}
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
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isPlaying ? 'opacity-100' : 'opacity-40'
              }`}
            />

            {/* Voile lumineux équilibré pour sublimer la vidéo sans l'assombrir */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

            {/* HAUT : [Bouton Son + Icône Vidéo Dorée + Bouton Fermer] en haut à droite */}
            <div className="relative z-20 p-4 flex items-center justify-end pointer-events-auto">
              <div className="flex items-center gap-2">
                {/* Bouton Muet / Son */}
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

                {/* Icône vidéo hybride dorée */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVideoPlayback();
                  }}
                  className={`group/btn relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 shadow-lg ${
                    isPlaying
                      ? 'border border-[#C89B3C] ring-2 ring-[#C89B3C]/40 bg-black/60 backdrop-blur-md shadow-[0_0_16px_rgba(200,155,60,0.6)]'
                      : 'border border-transparent hover:border-[#C89B3C] hover:ring-2 hover:ring-[#C89B3C]/30 bg-black/40 hover:bg-black/60 backdrop-blur-md'
                  }`}
                  title={isPlaying ? 'Mettre en pause' : 'Lire la vidéo'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-[#C89B3C] fill-[#C89B3C] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-110" />
                  ) : (
                    <Play className="w-5 h-5 text-[#C89B3C] fill-[#C89B3C] translate-x-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-115" />
                  )}
                </button>

                {/* Bouton Fermer */}
                <button 
                  id="btn-close-modal"
                  onClick={() => {
                    setModalPerson(null);
                    setIsPlaying(false);
                  }}
                  className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-stone-200 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                  title="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modale d'évaluation de la résonance (au clic sur le diamant) */}
            <ResonanceModal
              isOpen={isResonanceModalOpen}
              onClose={() => setIsResonanceModalOpen(false)}
              storyId={`story-${modalPerson.id}`}
              topicId={modalPerson.universeTag || 'exploration'}
              personName={modalPerson.firstName || modalPerson.name.split(' ')[0]}
              initialPercentage={personResonancePct}
              onRatingSubmitted={(pct) => {
                setPersonResonancePct(pct);
              }}
            />

            {/* BAS : Fiche sobre (prénom + âge) et colonne latérale droite (diamant au-dessus du bonhomme) */}
            <div className="relative z-20 p-5 sm:p-6 flex items-end justify-between pointer-events-auto bg-gradient-to-t from-black/85 via-black/45 to-transparent">
              <div className="text-left font-sans">
                {/* Le prénom uniquement (sans nom de famille coupé) */}
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none drop-shadow-md">
                  {modalPerson.firstName || modalPerson.name.split(' ')[0]}
                </h3>
                {/* L'âge en dessous */}
                <p className="text-xs sm:text-sm text-stone-200 mt-1.5 font-medium drop-shadow">
                  {modalPerson.age ? `${modalPerson.age} ans` : '46 ans'}
                </p>
              </div>

              {/* Colonne latérale droite : Diamant (évaluation) relevé pour laisser plus d'air, Bonhomme (univers) en dessous */}
              <div className="flex flex-col items-center gap-3.5 shrink-0">
                {/* Icône diamant pour évaluer la résonance (légèrement relevée pour laisser de l'air) */}
                <button
                  id={`btn-eval-resonance-${modalPerson.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsResonanceModalOpen(true);
                  }}
                  className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 mb-1 ${
                    personResonancePct !== null
                      ? 'bg-black/60 border-[#C89B3C]/80 text-[#E5C16C] shadow-[0_0_12px_rgba(200,155,60,0.4)]'
                      : 'bg-white/20 hover:bg-white/30 border-white/25 text-white'
                  }`}
                  title={personResonancePct !== null ? `Résonance : ${personResonancePct}%` : "Évaluer la résonance"}
                >
                  <Gem className="w-5 h-5" />
                </button>

                {/* Bonhomme discret pour découvrir son univers */}
                <button
                  id={`modal-btn-universe-${modalPerson.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenUniverse(modalPerson);
                  }}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  title="Découvrir son univers"
                >
                  <User className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modale Teaser Présentation Vidéo avant d'entrer dans l'univers */}
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

