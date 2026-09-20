import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Tv, 
  Compass, 
  Sparkles, 
  ShoppingBag, 
  HeartHandshake, 
  Award,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Play,
  RotateCcw,
  X
} from 'lucide-react';
import { 
  ExplorerCategoryType, 
  EXPLORER_TOPICS_DATA, 
  ExplorerTopicItem 
} from '../data/explorerTopicsData';
import { MATRIX_SERIES_DATA } from '../data/matrixData';
import { celestialAudio } from '../utils/celestialAudio';

export interface InSituAstrolabeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: ExplorerCategoryType;
  activeTopicId: string;
  activeSeriesId: string;
  onSelectSeries: (seriesId: string) => void;
  onSelectTopic: (category: ExplorerCategoryType, topicId: string) => void;
}

interface ProposalItem {
  id: string;
  category: ExplorerCategoryType;
  photoUrl: string;
  title: string; // Utilisé pour le titre lors du focus si besoin
  isSeries?: boolean;
}

export const InSituAstrolabeSelector: React.FC<InSituAstrolabeSelectorProps> = ({
  isOpen,
  onClose,
  activeCategory,
  activeTopicId,
  activeSeriesId,
  onSelectSeries,
  onSelectTopic
}) => {
  // Étape du sélecteur : 'categories' (les 6 orbes d'icônes) ou 'subchoices' (le barillet de photos)
  const [selectorStep, setSelectorStep] = useState<'categories' | 'subchoices'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<ExplorerCategoryType>(activeCategory);
  
  // Angle de rotation du barillet (Option A : tactile / drag / swipe)
  const [barilletAngle, setBarilletAngle] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);

  // Proposition activement sélectionnée pour la photo de présentation
  const [focusedProposal, setFocusedProposal] = useState<ProposalItem | null>(null);
  
  // Animation de diffusion vers l'extérieur
  const [isDiffusing, setIsDiffusing] = useState<boolean>(false);

  // Références d'interaction pour le glisser-tourner (Swipe / Barillet rotatif)
  const barilletRef = useRef<HTMLDivElement>(null);
  const isDraggingBarilletRef = useRef<boolean>(false);
  const startAngleRef = useRef<number>(0);
  const currentAngleRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);

  // 6 catégories principales avec leurs icônes pures et couleurs
  const CATEGORIES = useMemo(() => [
    {
      id: 'series' as ExplorerCategoryType,
      icon: <Tv className="w-6 h-6 sm:w-7 sm:h-7 text-amber-100" />,
      glowColor: 'rgba(245, 158, 11, 0.6)',
      borderColor: 'border-amber-400/80',
      bgGradient: 'from-[#F59E0B] via-[#B45309] to-[#451A03]',
      pitch: 440
    },
    {
      id: 'thematics' as ExplorerCategoryType,
      icon: <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-100" />,
      glowColor: 'rgba(16, 185, 129, 0.6)',
      borderColor: 'border-emerald-400/80',
      bgGradient: 'from-[#10B981] via-[#047857] to-[#064E3B]',
      pitch: 520
    },
    {
      id: 'topics' as ExplorerCategoryType,
      icon: <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-100" />,
      glowColor: 'rgba(250, 204, 21, 0.6)',
      borderColor: 'border-yellow-300/90',
      bgGradient: 'from-[#FACC15] via-[#CA8A04] to-[#713F12]',
      pitch: 600
    },
    {
      id: 'offers' as ExplorerCategoryType,
      icon: <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-100" />,
      glowColor: 'rgba(99, 102, 241, 0.6)',
      borderColor: 'border-indigo-400/80',
      bgGradient: 'from-[#6366F1] via-[#4338CA] to-[#1E1B4B]',
      pitch: 580
    },
    {
      id: 'opportunities' as ExplorerCategoryType,
      icon: <HeartHandshake className="w-6 h-6 sm:w-7 sm:h-7 text-rose-100" />,
      glowColor: 'rgba(244, 63, 94, 0.6)',
      borderColor: 'border-rose-400/80',
      bgGradient: 'from-[#F43F5E] via-[#BE123C] to-[#4C0519]',
      pitch: 660
    },
    {
      id: 'brands' as ExplorerCategoryType,
      icon: <Award className="w-6 h-6 sm:w-7 sm:h-7 text-orange-100" />,
      glowColor: 'rgba(251, 146, 60, 0.6)',
      borderColor: 'border-orange-400/80',
      bgGradient: 'from-[#FB923C] via-[#C2410C] to-[#431407]',
      pitch: 740
    }
  ], []);

  // Construction des 8 propositions visuelles (photos miniatures) pour la catégorie active
  const proposalsForCategory = useMemo<ProposalItem[]>(() => {
    if (selectedCategory === 'series') {
      const items: ProposalItem[] = [
        {
          id: 'ALL',
          category: 'series',
          photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
          title: 'Tous les pionniers',
          isSeries: true
        }
      ];

      MATRIX_SERIES_DATA.forEach((s) => {
        const photo = s.pioneers[0]?.photoUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';
        items.push({
          id: s.seriesId,
          category: 'series',
          photoUrl: photo,
          title: s.seriesTitle,
          isSeries: true
        });
      });

      // Compléter pour avoir au moins 8 propositions
      const additionalSeriesPhotos = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
      ];
      while (items.length < 8) {
        const idx = items.length;
        items.push({
          id: `series-extra-${idx}`,
          category: 'series',
          photoUrl: additionalSeriesPhotos[idx % additionalSeriesPhotos.length],
          title: `Série ${idx + 1}`,
          isSeries: true
        });
      }

      return items;
    }

    // Pour Thématiques, Sujets, Offres, Opportunités, Marques
    const rawTopics = EXPLORER_TOPICS_DATA.filter(t => t.category === selectedCategory);
    const items: ProposalItem[] = rawTopics.map(t => ({
      id: t.id,
      category: t.category,
      photoUrl: t.storiesPool[0]?.photoUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      title: t.title
    }));

    // Photos de secours pour toujours proposer 8 pastilles visuelles
    const fallbackPhotos: Record<ExplorerCategoryType, string[]> = {
      series: [],
      thematics: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80'
      ],
      topics: [
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80'
      ],
      offers: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80'
      ],
      opportunities: [
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80'
      ],
      brands: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=400&q=80'
      ]
    };

    const fallbacks = fallbackPhotos[selectedCategory] || fallbackPhotos.thematics;
    while (items.length < 8) {
      const idx = items.length;
      items.push({
        id: `${selectedCategory}-${idx + 1}`,
        category: selectedCategory,
        photoUrl: fallbacks[idx % fallbacks.length],
        title: `Proposition ${idx + 1}`
      });
    }

    return items;
  }, [selectedCategory]);

  // Les 8 propositions affichées sur l'anneau actuel (selon pageIndex)
  const currentBatch = useMemo(() => {
    const start = (pageIndex * 8) % proposalsForCategory.length;
    const batch = [...proposalsForCategory.slice(start, start + 8)];
    while (batch.length < 8) {
      batch.push(proposalsForCategory[batch.length % proposalsForCategory.length]);
    }
    return batch;
  }, [pageIndex, proposalsForCategory]);

  // Réinitialiser au démontage / ouverture
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(activeCategory);
      setSelectorStep('categories');
      setFocusedProposal(null);
      setBarilletAngle(0);
      setIsDiffusing(false);
    }
  }, [isOpen, activeCategory]);

  if (!isOpen) return null;

  // Clic sur l'un des 6 orbes d'icônes principales
  const handleSelectCategoryOrb = (cat: ExplorerCategoryType, pitch: number) => {
    celestialAudio.playOrbHover(pitch);
    setSelectedCategory(cat);
    setSelectorStep('subchoices');
    setBarilletAngle(0);
    setFocusedProposal(null);
  };

  // Clic sur une photo miniature du barillet -> Affiche la photo de présentation
  const handleSelectProposalMiniature = (proposal: ProposalItem) => {
    celestialAudio.playOrbHover(550);
    setFocusedProposal(proposal);
  };

  // Validation finale & diffusion vers la matrice
  const handleConfirmDiffusion = () => {
    if (!focusedProposal) return;
    celestialAudio.playOrbSelect();
    setIsDiffusing(true);

    setTimeout(() => {
      if (focusedProposal.category === 'series') {
        onSelectSeries(focusedProposal.id);
      } else {
        onSelectTopic(focusedProposal.category, focusedProposal.id);
      }
      setIsDiffusing(false);
      onClose();
    }, 450);
  };

  // Gestion du glisser tactile sur le barillet (Option A : barillet rotatif)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!barilletRef.current) return;
    const rect = barilletRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    
    isDraggingBarilletRef.current = true;
    startAngleRef.current = Math.atan2(dy, dx) * (180 / Math.PI);
    currentAngleRef.current = barilletAngle;
    hasMovedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingBarilletRef.current || !barilletRef.current) return;
    const rect = barilletRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const delta = angle - startAngleRef.current;
    if (Math.abs(delta) > 3) {
      hasMovedRef.current = true;
    }
    setBarilletAngle(currentAngleRef.current + delta);
  };

  const handlePointerUp = () => {
    isDraggingBarilletRef.current = false;
  };

  return (
    <div 
      id="insitu-astrolabe-overlay"
      className="absolute inset-0 z-40 flex items-center justify-center pointer-events-auto select-none"
      onClick={onClose}
    >
      {/* Voile sombre et doré semi-transparent (laisse deviner la matrice autour) */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px] transition-opacity duration-300" />

      {/* Onde de diffusion rayonnante lors de la validation */}
      {isDiffusing && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[1200px] h-[1200px] rounded-full bg-radial from-[#F59E0B]/40 via-[#F59E0B]/10 to-transparent animate-ping duration-500" />
        </div>
      )}

      {/* ZONE D'INTERACTION CIRCULAIRE CENTRALE IN-SITU */}
      <div 
        id="insitu-circular-stage"
        className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center rounded-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Anneaux d'astrolabe dorés lumineux intégrés */}
        <div className="absolute inset-0 rounded-full border-2 border-[#C89B3C]/40 animate-[spin_120s_linear_infinite] pointer-events-none" />
        <div className="absolute inset-5 sm:inset-7 rounded-full border border-dashed border-[#F5D88C]/35 animate-[spin_80s_linear_infinite_reverse] pointer-events-none" />
        <div className="absolute inset-16 sm:inset-20 rounded-full border border-[#C89B3C]/50 pointer-events-none" />

        {/* ================================================================= */}
        {/* ÉTAPE 1 : LES 6 ORBES D'ICÔNES PURES AUTOUR DU CENTRE             */}
        {/* ================================================================= */}
        {selectorStep === 'categories' && (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* JOYSTICK CENTRAL D'ACCUEIL */}
            <div 
              onClick={onClose}
              className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#FFFFFF] via-[#EFE7D8] to-[#DFD3BE] border-2 border-[#C89B3C] shadow-[0_0_25px_rgba(200,155,60,0.5)] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 z-20 group"
              title="Fermer l'exploration"
            >
              <X className="w-6 h-6 text-stone-700 group-hover:text-black transition-colors" />
            </div>

            {/* LES 6 ORBES D'ICÔNES DÉPLOYÉS EN COURONNE (RAYON ~120px) */}
            {CATEGORIES.map((cat, idx) => {
              const count = CATEGORIES.length;
              const angleDeg = -90 + idx * (360 / count);
              const angleRad = (angleDeg * Math.PI) / 180;
              const radius = 125; // Rayon orbital

              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;

              const isCurrent = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  id={`insitu-cat-orb-${cat.id}`}
                  onClick={() => handleSelectCategoryOrb(cat.id, cat.pitch)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-115 active:scale-95 z-30 group"
                >
                  {/* Halo d'énergie externe */}
                  <div 
                    className={`absolute -inset-2 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity ${
                      isCurrent ? 'opacity-100 scale-110' : ''
                    }`}
                    style={{ backgroundColor: cat.glowColor }}
                  />

                  {/* Sphère 3D avec reflet vitré */}
                  <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${cat.bgGradient} border-2 ${cat.borderColor} shadow-xl flex items-center justify-center overflow-hidden`}>
                    <div className="absolute top-1 left-2 w-8 h-4 rounded-full bg-gradient-to-b from-white/45 to-transparent transform -rotate-25 pointer-events-none" />
                    <div className="transition-transform group-hover:scale-110">
                      {cat.icon}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ================================================================= */}
        {/* ÉTAPE 2 : BARILLET ROTATIF DE PHOTOS MINIATURES (OPTION A)        */}
        {/* ================================================================= */}
        {selectorStep === 'subchoices' && (
          <div 
            ref={barilletRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full h-full flex items-center justify-center touch-none"
          >
            {/* CENTRE DU BARILLET : Soit la photo de présentation, soit l'icône de retour */}
            {!focusedProposal ? (
              <div 
                onClick={() => setSelectorStep('categories')}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#261E17] to-[#120E0B] border-2 border-[#C89B3C] shadow-[0_0_25px_rgba(200,155,60,0.5)] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 z-20 group"
                title="Retour aux catégories"
              >
                {/* Icône de la catégorie active */}
                {CATEGORIES.find(c => c.id === selectedCategory)?.icon}
                <RotateCcw className="w-3.5 h-3.5 text-stone-400 mt-1 group-hover:text-[#F5D88C] transition-colors" />
              </div>
            ) : (
              /* PHOTO DE PRÉSENTATION AU CENTRE AVEC LE BOUTON POUR DIFFUSER SUR LA MATRICE */
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-br from-[#C89B3C] via-[#F5D88C] to-[#8B6845] shadow-[0_0_35px_rgba(200,155,60,0.7)] z-30 flex items-center justify-center animate-in zoom-in-95 duration-200">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-black">
                  {/* Photo de présentation plein cadre */}
                  <img 
                    src={focusedProposal.photoUrl} 
                    alt={focusedProposal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                  {/* BOUTON D'ACTION PRINCIPAL : DIFFUSER SUR LA MATRICE (LANCER) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                    <button
                      id="btn-diffuse-to-matrix"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConfirmDiffusion();
                      }}
                      className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-gradient-to-r from-[#C89B3C] to-[#E5C16C] hover:brightness-110 text-stone-900 flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                      title="Diffuser sur la matrice"
                    >
                      <Play className="w-6 h-6 fill-stone-900 translate-x-0.5" />
                    </button>
                  </div>

                  {/* Bouton fermeture / retour barillet */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFocusedProposal(null);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
                    title="Retour au barillet"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* LES 8 PHOTOS MINIATURES DU BARILLET ROTATIF (OPTION A) */}
            {currentBatch.map((proposal, idx) => {
              const count = currentBatch.length;
              // Angle de chaque proposition + angle de rotation fluide du barillet
              const baseAngle = idx * (360 / count);
              const totalAngle = baseAngle + barilletAngle;
              const angleRad = (totalAngle * Math.PI) / 180;
              const radius = 135; // Rayon orbital du barillet

              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;

              const isFocused = focusedProposal?.id === proposal.id;

              return (
                <button
                  key={`${proposal.id}-${idx}`}
                  id={`miniature-proposal-${idx}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!hasMovedRef.current) {
                      handleSelectProposalMiniature(proposal);
                    }
                  }}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  className={`absolute w-13 h-13 sm:w-15 sm:h-15 rounded-full overflow-hidden border-2 shadow-xl cursor-pointer transition-transform duration-150 hover:scale-120 active:scale-95 z-20 group ${
                    isFocused 
                      ? 'border-[#F5D88C] ring-4 ring-[#C89B3C]/60 scale-110' 
                      : 'border-white/60 hover:border-white'
                  }`}
                >
                  <img 
                    src={proposal.photoUrl} 
                    alt={proposal.title}
                    className="w-full h-full object-cover pointer-events-none group-hover:brightness-110 transition-all"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
                </button>
              );
            })}

            {/* CONTRÔLES TACTILES DU BARILLET : FLÈCHES ORBITALES GAUCHE & DROITE */}
            <button
              id="btn-barillet-prev"
              onClick={(e) => {
                e.stopPropagation();
                setBarilletAngle(prev => prev - 45);
                celestialAudio.playOrbHover(480);
              }}
              className="absolute left-1 sm:left-2 w-8 h-8 rounded-full bg-black/70 border border-white/30 text-[#F5D88C] hover:text-white flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-md z-30"
              title="Tourner le barillet"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              id="btn-barillet-next"
              onClick={(e) => {
                e.stopPropagation();
                setBarilletAngle(prev => prev + 45);
                celestialAudio.playOrbHover(520);
              }}
              className="absolute right-1 sm:right-2 w-8 h-8 rounded-full bg-black/70 border border-white/30 text-[#F5D88C] hover:text-white flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-md z-30"
              title="Tourner le barillet"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* BOUTON INFÉRIEUR : DÉCOUVRIR 8 AUTRES PROPOSITIONS */}
            <div className="absolute -bottom-10 sm:-bottom-12 z-30">
              <button
                id="btn-barillet-cycle-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setPageIndex(prev => prev + 1);
                  setBarilletAngle(0);
                  setFocusedProposal(null);
                  celestialAudio.playOrbHover(600);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black border border-[#C89B3C]/60 hover:border-[#C89B3C] text-[#F5D88C] text-xs font-semibold shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95"
                title="Découvrir 8 autres propositions"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>8 autres propositions</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
