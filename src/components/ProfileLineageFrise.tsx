import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { getLineageTree, LineageMember } from '../utils/lineageService';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, X } from 'lucide-react';
import { getLineageTree, LineageMember } from '../utils/lineageService';

interface ProfileLineageFriseProps {
  personIdOrName: string;
  onNavigateToPerson: (personId: string) => void;
  onClose?: () => void;
}

export const ProfileLineageFrise: React.FC<ProfileLineageFriseProps> = ({
  personIdOrName,
  onNavigateToPerson
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [videoModalMember, setVideoModalMember] = useState<LineageMember | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Récupération de l'arbre de lignée (ascendants -> personne actuelle -> descendants)
  const tree = getLineageTree(personIdOrName);

  // Construction de la liste ordonnée des visages sur la frise
  const items: Array<{
    member: LineageMember;
    isCurrent: boolean;
    type: 'ascendant' | 'current' | 'descendant';
  }> = [
    ...tree.ascendants.map(m => ({ member: m, isCurrent: false, type: 'ascendant' as const })),
    { member: tree.current, isCurrent: true, type: 'current' as const },
    ...tree.descendants.map(m => ({ member: m, isCurrent: false, type: 'descendant' as const }))
  ];

  const handleMemberClick = (member: LineageMember) => {
    // 1er clic : affiche le prénom épuré
    // 2nd clic : affiche sa vidéo de présentation (permettant d'aller directement sur sa page)
    if (selectedMemberId === member.id) {
      setVideoModalMember(member);
      setIsPlaying(true);
    } else {
      setSelectedMemberId(member.id);
    }
  };

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div 
      id="profile-lineage-frise-container"
      className="relative w-full max-w-md mx-auto flex-1 flex flex-col items-center justify-center animate-in fade-in duration-200 select-none pb-28 sm:pb-32"
    >
      {/* Conteneur de la frise verticale (défilement fluide à la souris ou au touch) */}
      <div 
        ref={scrollContainerRef}
        id="profile-lineage-frise-scroll"
        className="relative flex-1 w-full max-h-[calc(100dvh-200px)] overflow-y-auto overflow-x-hidden no-scrollbar px-4 py-8 flex flex-col items-center"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Ligne verticale ultra-fine traversant toute la frise */}
        <div 
          className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-[#C89B3C]/70 via-stone-300 to-[#A2482B]/70 pointer-events-none"
        />

        {/* Liste des visages positionnés sur la ligne */}
        <div className="relative flex flex-col items-center gap-10 sm:gap-12 w-full my-auto">
          {items.map(({ member, isCurrent, type }) => {
            const isSelected = selectedMemberId === member.id;
            const firstName = member.firstName || member.name.split(' ')[0];

            return (
              <div 
                key={`frise-node-${member.id}`}
                className="relative flex flex-col items-center"
              >
                {/* Bulle prénom épurée (apparaît au 1er clic ou survol) */}
                {(isSelected || isCurrent) && (
                  <div 
                    className={`absolute -top-7 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-200 shadow-xs pointer-events-none whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 ${
                      isCurrent 
                        ? 'bg-[#1C1917] text-white border border-stone-700' 
                        : isSelected 
                          ? 'bg-[#A2482B] text-white' 
                          : 'bg-white/95 text-stone-800 border border-stone-200'
                    }`}
                  >
                    {firstName}
                  </div>
                )}

                {/* Tête de la personne (visage rond sur la ligne fine) */}
                <button
                  type="button"
                  id={`frise-avatar-${member.id}`}
                  onClick={() => handleMemberClick(member)}
                  onDoubleClick={() => {
                    setVideoModalMember(member);
                    setIsPlaying(true);
                  }}
                  className={`group relative rounded-full p-0.5 transition-all duration-200 cursor-pointer active:scale-95 ${
                    isCurrent
                      ? 'w-16 h-16 sm:w-18 sm:h-18 ring-2 ring-[#C89B3C] ring-offset-2 ring-offset-white shadow-md'
                      : isSelected
                        ? 'w-14 h-14 sm:w-16 sm:h-16 ring-2 ring-[#A2482B] ring-offset-2 ring-offset-white shadow-md'
                        : 'w-13 h-13 sm:w-15 sm:h-15 hover:ring-2 hover:ring-stone-400/80 hover:scale-105 shadow-xs'
                  }`}
                  title={`${firstName} - Cliquer pour sélectionner, recliquer pour voir la vidéo de présentation`}
                >
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-full object-cover bg-stone-100"
                  />

                  {/* Fin trait de cerclage */}
                  <span 
                    className={`absolute inset-0 rounded-full border transition-colors ${
                      type === 'ascendant'
                        ? 'border-[#C89B3C]/50 group-hover:border-[#C89B3C]'
                        : type === 'descendant'
                          ? 'border-[#A2482B]/50 group-hover:border-[#A2482B]'
                          : 'border-white/80'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODALE VIDÉO DE PRÉSENTATION AU 2ND CLIC */}
      {videoModalMember && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setVideoModalMember(null)}
        >
          <div 
            className="relative aspect-[9/16] w-[min(340px,calc((100dvh-140px)*9/16))] h-[min(600px,calc(100dvh-140px))] rounded-3xl overflow-hidden shadow-2xl bg-stone-950 border border-white/15 flex flex-col justify-between p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Vidéo de fond */}
            <video
              ref={videoRef}
              src={videoModalMember.teaserVideoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-african-potter-working-with-clay-41551-large.mp4'}
              poster={videoModalMember.photoUrl}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              onClick={togglePlayback}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            />

            {/* Gradient sombre pour lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />

            {/* Barre supérieure : Nom & Bouton Fermer */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-white/40 shadow-sm shrink-0">
                  <img 
                    src={videoModalMember.photoUrl} 
                    alt={videoModalMember.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-editorial text-sm sm:text-base font-bold text-white leading-tight truncate">
                    {videoModalMember.name}
                  </h3>
                  <p className="text-[11px] text-white/70 truncate">
                    {videoModalMember.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsMuted(prev => !prev)}
                  className="w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs border border-white/20"
                  title={isMuted ? 'Activer le son' : 'Couper le son'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setVideoModalMember(null)}
                  className="w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs border border-white/20"
                  title="Fermer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Contrôle Play/Pause au centre si en pause */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlayback}
                className="relative z-10 mx-auto w-14 h-14 rounded-full bg-white/25 hover:bg-white/35 backdrop-blur-md border border-white/40 text-white flex items-center justify-center shadow-lg cursor-pointer transition-transform active:scale-95"
              >
                <Play className="w-6 h-6 ml-0.5 fill-white text-white" />
              </button>
            )}

            {/* Barre inférieure : Citation & Bouton direct vers la page de la personne */}
            <div className="relative z-10 flex flex-col gap-3">
              {videoModalMember.quote && (
                <p className="text-xs text-white/90 italic line-clamp-2">
                  « {videoModalMember.quote} »
                </p>
              )}

              <button
                type="button"
                onClick={() => {
                  const targetId = videoModalMember.id;
                  setVideoModalMember(null);
                  onNavigateToPerson(targetId);
                }}
                className="w-full py-2.5 px-4 rounded-full bg-[#A2482B] hover:bg-[#8D3E24] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
              >
                <span>Voir le profil de {videoModalMember.firstName || videoModalMember.name.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
