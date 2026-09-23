import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, ArrowRight, Sparkles, MapPin, Award } from 'lucide-react';
import { Protagonist } from '../types';
import { ResonanceModal } from './ResonanceModal';

interface ProtagonistTeaserModalProps {
  protagonist: Protagonist | null;
  storyId?: string;
  topicId?: string;
  onClose: () => void;
  onEnterUniverse: (protagonistId: string) => void;
}

export const ProtagonistTeaserModal: React.FC<ProtagonistTeaserModalProps> = ({
  protagonist,
  storyId,
  topicId,
  onClose,
  onEnterUniverse,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isResonanceModalOpen, setIsResonanceModalOpen] = useState<boolean>(false);
  const [resonancePct, setResonancePct] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (protagonist) {
      const activeStoryId = storyId || protagonist.stories?.[0]?.id || `story-${protagonist.id}`;
      try {
        const stored = localStorage.getItem(`yonywood_resonance_${activeStoryId}`);
        if (stored) {
          const val = parseInt(stored, 10);
          setResonancePct(isNaN(val) ? null : val);
        } else {
          setResonancePct(null);
        }
      } catch {
        setResonancePct(null);
      }
      setIsResonanceModalOpen(false);
    }
  }, [protagonist, storyId]);

  if (!protagonist) return null;

  const togglePlay = (e?: React.MouseEvent) => {
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

  // Video Teaser URL (prioritize story video or standard teaser)
  const teaserVideo = protagonist.stories?.[0]?.videoCoverUrl && protagonist.stories[0].videoCoverUrl.endsWith('.mp4')
    ? protagonist.stories[0].videoCoverUrl
    : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  const posterImg = protagonist.photoUrl || '/assets/protagonists/koffi-tisserand.jpg';

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Container vertical 9:16 adapté à l'écran mobile */}
      <div 
        className="relative aspect-[9/16] w-[min(340px,calc((100dvh-200px)*9/16))] h-[min(604px,calc(100dvh-200px))] max-w-[calc(100vw-28px)] mx-auto rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200/80 bg-black flex flex-col justify-between p-4 sm:p-5 text-white animate-in zoom-in-95 duration-200 group/modal select-none cursor-pointer shrink-0"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('button, a, input, textarea, select')) return;
          togglePlay();
        }}
      >
        {/* Fond vidéo ou poster */}
        <img
          src={posterImg}
          alt={protagonist.name}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <video
          ref={videoRef}
          src={teaserVideo}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isPlaying ? 'opacity-100' : 'opacity-40'
          }`}
        />

        {/* Voile d'ambiance cinématographique */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/50 pointer-events-none" />

        {/* CENTRE : Icône vidéo Play / Pause au centre exact de l'image */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <button
            type="button"
            id="btn-center-play-pause-teaser"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur-xs border border-white/25 text-white flex items-center justify-center transition-all duration-200 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
            title={isPlaying ? 'Pause' : 'Lecture'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
            ) : (
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white translate-x-0.5 opacity-95" />
            )}
          </button>
        </div>

        {/* HAUT : Bouton Évaluer (Award en Terre Cuite) & Contrôles */}
        <div className="relative z-10 flex items-center justify-between gap-2 w-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsResonanceModalOpen(true);
            }}
            className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95 ${
              resonancePct !== null
                ? 'bg-[#A2482B] border-[#A2482B] text-white shadow-[0_0_12px_rgba(162,72,43,0.45)]'
                : 'bg-black/60 hover:bg-[#A2482B]/80 border-white/20 hover:border-[#A2482B] text-white'
            }`}
            title={resonancePct !== null ? `Résonance : ${resonancePct}%` : "Évaluer la résonance"}
          >
            <Award className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {/* Bouton Muet / Son */}
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all shadow-md"
              title={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-white/80" /> : <Volume2 className="w-4 h-4 text-[#C89B3C]" />}
            </button>

            {/* Bouton Fermer */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all shadow-md ml-1"
              title="Fermer l'aperçu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modale d'évaluation de la résonance (au clic sur l'icône) */}
        <ResonanceModal
          isOpen={isResonanceModalOpen}
          onClose={() => setIsResonanceModalOpen(false)}
          storyId={storyId || protagonist.stories?.[0]?.id || `story-${protagonist.id}`}
          topicId={topicId || protagonist.documentaryId || 'exploration-generale'}
          personName={protagonist.name}
          initialPercentage={resonancePct}
          onRatingSubmitted={(pct) => {
            setResonancePct(pct);
          }}
        />

        {/* BAS : Identité & Bouton Entrer dans son univers */}
        <div className="relative z-10 space-y-3.5 pt-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white tracking-tight">
                {protagonist.name}
              </h3>
              {protagonist.flag && <span className="text-base">{protagonist.flag}</span>}
            </div>

            <p className="text-xs text-[#C89B3C] font-medium flex items-center gap-1.5">
              <span>{protagonist.role}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/80 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-white/60" />
                {protagonist.territory}
              </span>
            </p>
          </div>

          {/* Action : Entrer dans son univers */}
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEnterUniverse(protagonist.id);
              }}
              id={`enter-universe-btn-${protagonist.id}`}
              className="w-full h-11 px-4 rounded-xl bg-gradient-to-r from-[#C89B3C] to-[#E5C16C] hover:brightness-105 text-[#1C1917] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
            >
              <span>Entrer dans son univers</span>
              <ArrowRight className="w-4 h-4 text-[#1C1917]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
