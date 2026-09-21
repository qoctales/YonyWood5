import React, { useRef, useState, useEffect } from 'react';
import { Compass, RefreshCw, ChevronLeft } from 'lucide-react';

interface CentralAstrolabeJoystickProps {
  onRotateDelta: (deltaDeg: number) => void;
  onSetRotationAngle: (angleDeg: number) => void;
  rotationAngle: number;
  onReset: () => void;
  onCenterClick?: () => void;
  explorerLevel?: 'dimensions' | 'topics' | 'stories';
  dimensionName?: string;
  topicName?: string;
  activeCategory?: string;
  activeFlagUrl?: string;
  activeCoverImage?: string;
  hoveredCategory?: { label: string; coverImage: string; accentColor: string } | null;
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
  activeFlagUrl,
  activeCoverImage,
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

  const MAX_KNOB_RADIUS = 18; // Maximum deflection radius of the central stick

  useEffect(() => {
    knobOffsetRef.current = knobOffset;
  }, [knobOffset]);

  // Continuous subtle spin loop when stick is pulled sideways
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
      if (Math.abs(x) > 3) {
        const speed = (x / MAX_KNOB_RADIUS) * 0.7;
        onRotateDelta(speed);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isInteracting, onRotateDelta]);

  // Pointer events on the central astrolabe
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
    if (moveDist > 6) {
      hasMovedFarRef.current = true;
    }

    const rect = centerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    let deltaAngle = currentAngle - startPointerAngleRef.current;
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;
    onSetRotationAngle((startRotationAngleRef.current + deltaAngle * 0.5 + 360) % 360);

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
      // Pure click on the center hub
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
      title={explorerLevel !== 'dimensions' ? `Cliquer pour actualiser les 16 voix de ${topicName || 'ce sujet'}` : "Explorer ou faire tourner l'astrolabe"}
    >
      {/* Halo d'aura lumineuse dorée */}
      <div className={`absolute -inset-3 rounded-full bg-[#C89B3C]/25 transition-all duration-300 pointer-events-none ${
        isRefreshing ? 'scale-125 opacity-80' : 'opacity-0 group-hover:opacity-100 animate-pulse'
      }`} />

      {/* CAS 1 : NIVEAU DOUBLE LECTURE CONCENTRIQUE (Affichage du drapeau plein ou image du sujet central) */}
      {explorerLevel !== 'dimensions' && (activeFlagUrl || activeCoverImage) ? (
        <div 
          className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#C89B3C] shadow-[0_6px_25px_rgba(200,155,60,0.45)] transition-all duration-300 ${
            isRefreshing ? 'scale-90 rotate-180' : 'group-hover:scale-105'
          }`}
          style={{
            transform: `translate(${knobOffset.x}px, ${knobOffset.y}px)`
          }}
        >
          {/* Drapeau circulaire plein prenant 100% de la vignette sans bordure blanche */}
          <img 
            src={activeFlagUrl || activeCoverImage} 
            alt={topicName || 'Sujet'} 
            className="w-full h-full object-cover object-center rounded-full select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />

          {/* Anneau de sertissage or précieux */}
          <div className="absolute inset-0 rounded-full border border-[#FFE7A3]/60 pointer-events-none shadow-inner" />

          {/* Pastille de rafraîchissement au survol */}
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white pointer-events-none">
            <RefreshCw className={`w-4 h-4 text-[#FCE7A6] mb-0.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="text-[8.5px] font-semibold tracking-wider uppercase text-[#FCE7A6]">
              Relancer
            </span>
          </div>
        </div>
      ) : (
        /* CAS 2 : NIVEAU DES 8 PORTES (Reflet de la porte survolée ou Cœur d'or de l'Astrolabe) */
        <div 
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FFFFFF] via-[#F4EFE6] to-[#DFCDB2] border-2 border-[#C89B3C] shadow-[0_6px_25px_rgba(139,104,69,0.35)] transition-transform group-hover:scale-105 flex items-center justify-center overflow-hidden"
          style={{
            transform: `translate(${knobOffset.x}px, ${knobOffset.y}px)`
          }}
        >
          {hoveredCategory ? (
            /* Reflet immersif de la porte survolée dans le miroir optique central */
            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
              <img 
                src={hoveredCategory.coverImage} 
                alt={hoveredCategory.label}
                className="w-full h-full object-cover select-none pointer-events-none scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-[0.5px]" />
              <div className="absolute inset-0 rounded-full border border-[#FCE7A6]/70 pointer-events-none" />
              <div className="relative text-center px-1 pointer-events-none z-10">
                <span className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider block drop-shadow">
                  {hoveredCategory.label}
                </span>
                <span className="text-[7.5px] text-[#FCE7A6] font-medium block">
                  Entrer
                </span>
              </div>
            </div>
          ) : (
            /* Cœur de l'astrolabe / Boussole précieuse */
            <div className="relative w-full h-full rounded-full flex items-center justify-center">
              {/* Anneau gradué gravé */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-[#8B6845]/35 pointer-events-none" />
              
              {/* Repères cardinaux discrets */}
              <div className="absolute w-[1px] h-full bg-[#8B6845]/20 pointer-events-none" />
              <div className="absolute h-[1px] w-full bg-[#8B6845]/20 pointer-events-none" />

              {/* Pommeau orné */}
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-[#FCE7A6] via-[#C89B3C] to-[#8B6845] border-2 border-white shadow-[0_3px_12px_rgba(139,104,69,0.5)] flex items-center justify-center pointer-events-none">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#78593A] border border-[#F5D88C]/80 flex items-center justify-center shadow-inner">
                  <Compass className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FCE7A6] transition-transform ${isInteracting ? 'animate-spin' : ''}`} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cartouche d'indication sous le centre en mode concentrique */}
      {explorerLevel !== 'dimensions' && topicName && (
        <div className="absolute -bottom-6 pointer-events-none whitespace-nowrap bg-stone-900/90 text-[#FDFBF7] text-[9.5px] font-semibold px-2.5 py-0.5 rounded-full border border-[#C89B3C]/60 shadow-lg">
          {topicName}
        </div>
      )}
    </div>
  );
};
