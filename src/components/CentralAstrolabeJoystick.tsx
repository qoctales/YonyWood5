import React, { useRef, useState, useEffect } from 'react';
import { 
  RefreshCw, 
  ChevronLeft
} from 'lucide-react';
import { FilmReelIcon } from './YonywoodBrandIcons';
import { DimensionIcon } from './DimensionIcon';

interface CentralAstrolabeJoystickProps {
  onRotateDelta: (deltaDeg: number) => void;
  onSetRotationAngle: (angleDeg: number) => void;
  rotationAngle: number;
  onReset: () => void;
  onCenterClick?: () => void;
  explorerLevel?: 'dimensions' | 'stories';
  dimensionName?: string;
  topicName?: string;
  activeCategory?: string;
  activeTopicIcon?: string;
  hoveredTopicIcon?: string;
  hoveredTopicName?: string;
  activeFlagUrl?: string;
  activeCoverImage?: string;
  hoveredCoverImage?: string;
  hoveredCategory?: { id: string; label: string; coverImage?: string; accentColor?: string; iconName?: string } | null;
  onActualiser?: () => void;
  onStepBack?: () => void;
  isRefreshing?: boolean;
}

export const CentralAstrolabeJoystick: React.FC<CentralAstrolabeJoystickProps> = ({
  onRotateDelta,
  onSetRotationAngle,
  rotationAngle,
  onReset,
  onCenterClick,
  explorerLevel = 'dimensions',
  dimensionName,
  topicName,
  activeCategory,
  activeTopicIcon,
  hoveredTopicIcon,
  hoveredTopicName,
  activeFlagUrl,
  activeCoverImage,
  hoveredCoverImage,
  hoveredCategory,
  onActualiser,
  onStepBack,
  isRefreshing = false
}) => {
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [knobOffset, setKnobOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const centerRef = useRef<HTMLDivElement | null>(null);
  const startPointerAngleRef = useRef<number>(0);
  const startRotationAngleRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const knobOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Detection of simple click vs drag/rotate
  const pointerDownTimeRef = useRef<number>(0);
  const pointerStartCoordsRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedFarRef = useRef<boolean>(false);

  const MAX_KNOB_RADIUS = 20; // Rayon max de déflexion visible du curseur joystick

  useEffect(() => {
    knobOffsetRef.current = knobOffset;
  }, [knobOffset]);

  // Boucle de rotation fluide continue dès que le curseur est incliné sur le côté
  useEffect(() => {
    if (!isInteracting) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    const loop = () => {
      const { x } = knobOffsetRef.current;
      if (Math.abs(x) > 2) {
        const speed = (x / MAX_KNOB_RADIUS) * 0.85;
        onRotateDelta(speed);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isInteracting, onRotateDelta]);

  // Événements pointeur sur le curseur joystick
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsInteracting(true);
    pointerDownTimeRef.current = Date.now();
    pointerStartCoordsRef.current = { x: e.clientX, y: e.clientY };
    hasMovedFarRef.current = false;

    if (centerRef.current) {
      const rect = centerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      startPointerAngleRef.current = angle;
      startRotationAngleRef.current = rotationAngle;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const rad = Math.atan2(dy, dx);
      const clamped = Math.min(dist, MAX_KNOB_RADIUS);
      setKnobOffset({
        x: Math.cos(rad) * clamped,
        y: Math.sin(rad) * clamped
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInteracting || !centerRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const moveDist = Math.hypot(
      e.clientX - pointerStartCoordsRef.current.x,
      e.clientY - pointerStartCoordsRef.current.y
    );
    if (moveDist > 5) {
      hasMovedFarRef.current = true;
    }

    const rect = centerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    let deltaAngle = currentAngle - startPointerAngleRef.current;
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;
    onSetRotationAngle((startRotationAngleRef.current + deltaAngle * 0.6 + 360) % 360);

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const rad = Math.atan2(dy, dx);
    const clamped = Math.min(dist, MAX_KNOB_RADIUS);
    setKnobOffset({
      x: Math.cos(rad) * clamped,
      y: Math.sin(rad) * clamped
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsInteracting(false);
    setKnobOffset({ x: 0, y: 0 });

    const elapsed = Date.now() - pointerDownTimeRef.current;
    if (!hasMovedFarRef.current && elapsed < 350) {
      if (onCenterClick) {
        onCenterClick();
      }
    }
  };

  return (
    <div
      ref={centerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={onReset}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-22 h-22 sm:w-26 sm:h-26 rounded-full cursor-grab active:cursor-grabbing touch-none select-none flex items-center justify-center pointer-events-auto group"
      id="central-astrolabe-joystick"
      title={explorerLevel !== 'dimensions' ? `Cliquer pour actualiser les 16 voix de ${hoveredTopicName || topicName || 'ce sujet'}` : "Explorer ou faire tourner l'astrolabe"}
    >
      {/* Halo d'aura lumineuse Terre Cuite */}
      <div className={`absolute -inset-3 rounded-full bg-[#A2482B]/20 transition-all duration-300 pointer-events-none ${
        isRefreshing ? 'scale-125 opacity-80' : 'opacity-0 group-hover:opacity-100 animate-pulse'
      }`} />

      {/* CAS 1 : NIVEAU DOUBLE LECTURE CONCENTRIQUE (La série ou sous-catégorie choisie - ou survolée - trône au centre de la roue) */}
      {explorerLevel !== 'dimensions' ? (
        activeCategory === 'series' && (hoveredCoverImage || activeCoverImage) ? (
          /* SÉRIE CHOISIE : AFFICHE OFFICIELLE DE LA SÉRIE AU MILIEU DE LA ROUE AVEC CERCLAGE D'OR D'ASTROLABE */
          <div 
            className={`relative w-22 h-22 sm:w-26 sm:h-26 rounded-full border-2 border-[#C89B3C] shadow-[0_6px_30px_rgba(200,155,60,0.55)] transition-all duration-150 flex items-center justify-center overflow-hidden bg-[#1C1917] ${
              isRefreshing ? 'scale-90 rotate-180' : 'group-hover:scale-105'
            }`}
            style={{
              transform: `translate(${knobOffset.x}px, ${knobOffset.y}px)`
            }}
          >
            {/* Affiche officielle de la série */}
            <img 
              src={hoveredCoverImage || activeCoverImage} 
              alt={hoveredTopicName || topicName || "Série choisie"} 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-105 transition-all duration-300"
            />

            {/* Cerclage or précieux astrolabe */}
            <div className="absolute inset-0 rounded-full border-2 border-[#FFE7A3]/90 shadow-inner pointer-events-none" />
            <div className="absolute inset-1 rounded-full border border-black/40 pointer-events-none" />

            {/* Pastille de rafraîchissement au survol */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white pointer-events-none z-20">
              <RefreshCw className={`w-4 h-4 text-white mb-0.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-[8.5px] font-semibold tracking-wider uppercase text-white">
                Relancer
              </span>
            </div>
          </div>
        ) : (
          /* AUTRES CATÉGORIES : Cœur avec icône officielle */
          <div 
            className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#A2482B] border-2 border-[#8A3B20] shadow-[0_6px_25px_rgba(162,72,43,0.45)] transition-all duration-150 flex items-center justify-center overflow-hidden ${
              isRefreshing ? 'scale-90 rotate-180' : 'group-hover:scale-105'
            }`}
            style={{
              transform: `translate(${knobOffset.x}px, ${knobOffset.y}px)`
            }}
          >
            <div className="absolute inset-1 rounded-full border border-white/20 pointer-events-none" />
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shadow-inner pointer-events-none transition-all duration-200">
              <DimensionIcon 
                name={hoveredTopicIcon || activeTopicIcon || `${activeCategory}/_dimension`} 
                size={32} 
                className="text-white drop-shadow-md transition-transform duration-200 group-hover:scale-110" 
              />
            </div>

            {/* Pastille de rafraîchissement au survol */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white pointer-events-none">
              <RefreshCw className={`w-4 h-4 text-white mb-0.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-[8.5px] font-semibold tracking-wider uppercase text-white">
                Relancer
              </span>
            </div>
          </div>
        )
      ) : (
        /* CAS 2 : NIVEAU DES PORTES (Cœur Terre Cuite avec icône) */
        <div 
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#A2482B] border-2 border-[#8A3B20] shadow-[0_6px_25px_rgba(162,72,43,0.45)] transition-transform duration-150 group-hover:scale-105 flex items-center justify-center overflow-hidden"
          style={{
            transform: `translate(${knobOffset.x}px, ${knobOffset.y}px)`
          }}
        >
          {/* Filet intérieur discret */}
          <div className="absolute inset-1 rounded-full border border-white/20 pointer-events-none" />

          {hoveredCategory ? (
            /* L'icône de la porte survolée prend la place centrale */
            <div className="relative w-full h-full rounded-full flex items-center justify-center pointer-events-none z-10 animate-in zoom-in-90 duration-200">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shadow-inner">
                <DimensionIcon 
                  name={hoveredCategory.iconName || (hoveredCategory.id === 'series' ? '16-series/_dimension' : `${hoveredCategory.id}/_dimension`)} 
                  size={28} 
                  className="text-white stroke-[2] drop-shadow-md transition-transform group-hover:scale-110" 
                />
              </div>
            </div>
          ) : (
            /* Au repos : Cœur de l'astrolabe / Bobine blanche sur fond Terre Cuite */
            <div className="relative w-full h-full rounded-full flex items-center justify-center pointer-events-none">
              {/* Repères cardinaux et anneau d'astrolabe discrets */}
              <div className="absolute inset-2 rounded-full border border-dashed border-white/25" />
              <div className="absolute w-[1px] h-full bg-white/15" />
              <div className="absolute h-[1px] w-full bg-white/15" />

              {/* Médaillon central : fond terre cuite et icône bobine de film en blanc */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shadow-inner">
                <FilmReelIcon className={`w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform ${isInteracting ? 'scale-110' : ''}`} strokeWidth={1.8} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cartouche d'indication sous le centre : uniquement le nom de la porte au survol en niveau dimensions */}
      {explorerLevel === 'stories' && (hoveredTopicName || topicName) ? (
        <div className="absolute -bottom-6.5 pointer-events-none whitespace-nowrap text-[9.5px] sm:text-[10px] font-bold px-3 py-0.5 rounded-full shadow-lg animate-in fade-in duration-150 tracking-wide bg-[#A2482B]/95 text-[#FDFBF7] border border-white/30 shadow-[#A2482B]/20">
          {hoveredTopicName || topicName}
        </div>
      ) : explorerLevel === 'dimensions' && hoveredCategory ? (
        <div className="absolute -bottom-6 pointer-events-none whitespace-nowrap bg-[#A2482B]/95 text-[#FDFBF7] text-[10.5px] font-bold px-3 py-0.5 rounded-full border border-white/30 shadow-lg shadow-[#A2482B]/30 flex items-center animate-in fade-in duration-200 tracking-wide">
          <span>{hoveredCategory.label}</span>
        </div>
      ) : null}
    </div>
  );
};
