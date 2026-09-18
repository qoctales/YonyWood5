import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, X, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { Protagonist } from '../types';

interface ProtagonistTeaserModalProps {
  protagonist: Protagonist | null;
  onClose: () => void;
  onEnterUniverse: (protagonistId: string) => void;
}

export const ProtagonistTeaserModal: React.FC<ProtagonistTeaserModalProps> = ({
  protagonist,
  onClose,
  onEnterUniverse,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
      {/* Container vertical 9:16 */}
      <div 
        className="relative w-full max-w-[340px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border border-white/25 bg-black flex flex-col justify-between p-5 text-white animate-in zoom-in-95 duration-200"
        onClick={(e) => {
          e.stopPropagation();
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

        {/* HAUT : Badge Présentation & Contrôles */}
        <div className="relative z-10 flex items-center justify-between gap-2 w-full">
          <div className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-medium text-white/95 flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span className="font-editorial font-bold">Récit de vie</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Bouton Muet / Son */}
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all shadow-md"
              title={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-white/80" /> : <Volume2 className="w-4 h-4 text-[#C89B3C]" />}
            </button>

            {/* Bouton Play/Pause doré */}
            <button
              onClick={togglePlay}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                isPlaying 
                  ? 'border border-[#C89B3C] ring-2 ring-[#C89B3C]/40 bg-black/70 backdrop-blur-md' 
                  : 'border border-transparent bg-black/50 hover:bg-black/70'
              }`}
              title={isPlaying ? 'Pause' : 'Lecture'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-[#C89B3C] fill-[#C89B3C]" />
              ) : (
                <Play className="w-4 h-4 text-[#C89B3C] fill-[#C89B3C] translate-x-0.5" />
              )}
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

            {protagonist.quote && (
              <p className="text-xs text-white/85 italic leading-relaxed pt-1 line-clamp-2">
                {protagonist.quote}
              </p>
            )}
          </div>

          {/* Bouton d'action doré principal : Entrer dans son univers */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEnterUniverse(protagonist.id);
            }}
            id={`enter-universe-btn-${protagonist.id}`}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#C89B3C] to-[#E5C16C] hover:brightness-105 text-[#1C1917] font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(200,155,60,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-[1.02] active:scale-95 border border-white/30"
          >
            <span>Entrer dans son univers</span>
            <ArrowRight className="w-4 h-4 text-[#1C1917]" />
          </button>
        </div>
      </div>
    </div>
  );
};
