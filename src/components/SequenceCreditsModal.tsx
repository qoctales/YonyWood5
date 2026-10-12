import React from 'react';
import { Clapperboard, X, Film, Video, Scissors, ArrowRight, User } from 'lucide-react';
import { SequenceCredits } from '../types';

interface SequenceCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  seriesTitle?: string;
  credits?: SequenceCredits;
  onNavigateToProfile: (protagonistId: string) => void;
}

export const SequenceCreditsModal: React.FC<SequenceCreditsModalProps> = ({
  isOpen,
  onClose,
  title,
  seriesTitle,
  credits,
  onNavigateToProfile
}) => {
  if (!isOpen) return null;

  // Default fallback credits if none specifically passed
  const activeCredits: SequenceCredits = credits || {
    casting: [
      {
        name: 'Témoin intervenant',
        roleOrCharacter: 'Témoignage en miroir 9:16',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      }
    ],
    director: {
      name: 'Alain Kpatoukpa',
      roleTitle: 'Réalisateur & Directeur de la photographie',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    postProduction: [
      {
        name: 'Sonia Dossou',
        role: 'Montage & Rythme narratif',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      {
        name: 'Mathieu Houndé',
        role: 'Mixage sonore & Étalonnage cinématographique',
        avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
      }
    ]
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#181816] text-[#F5F5F0] rounded-3xl border border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête sobre et cinématographique */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800/80 bg-stone-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#A2482B]/20 border border-[#A2482B]/40 flex items-center justify-center text-[#A2482B]">
              <Clapperboard className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
                Générique & Crédits de la séquence
              </span>
              <h3 className="font-editorial text-lg font-bold text-white line-clamp-1">
                {title}
              </h3>
              {seriesTitle && (
                <p className="text-xs text-[#C89B3C] font-medium">
                  {seriesTitle}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Fermer le générique"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corps des crédits */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          {/* 1. CASTING */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A2482B]">
              <User className="w-3.5 h-3.5" />
              <span>Casting & Témoins à l'écran</span>
            </div>

            <div className="space-y-2">
              {activeCredits.casting.map((member, idx) => {
                const isClickable = !!member.protagonistId;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (member.protagonistId) {
                        onClose();
                        onNavigateToProfile(member.protagonistId);
                      }
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all ${
                      isClickable
                        ? 'bg-stone-900/80 hover:bg-stone-850 border-stone-800/80 hover:border-[#A2482B]/60 cursor-pointer group'
                        : 'bg-stone-900/50 border-stone-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border border-stone-700"
                      />
                      <div>
                        <h4 className={`text-sm font-semibold transition-colors ${
                          isClickable ? 'text-white group-hover:text-[#FACC15]' : 'text-white'
                        }`}>
                          {member.name}
                        </h4>
                        <p className="text-xs text-stone-400">
                          {member.roleOrCharacter}
                          {member.age ? ` · ${member.age} ans` : ''}
                        </p>
                      </div>
                    </div>

                    {isClickable && (
                      <span className="text-xs text-stone-400 group-hover:text-white flex items-center gap-1">
                        <span className="text-[11px] hidden sm:inline">Voir profil</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. RÉALISATION */}
          <div className="space-y-3 pt-2 border-t border-stone-800/60">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C89B3C]">
              <Film className="w-3.5 h-3.5" />
              <span>Réalisation & Prise de vue</span>
            </div>

            <div
              onClick={() => {
                if (activeCredits.director.protagonistId) {
                  onClose();
                  onNavigateToProfile(activeCredits.director.protagonistId);
                }
              }}
              className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all ${
                activeCredits.director.protagonistId
                  ? 'bg-stone-900/80 hover:bg-stone-850 border-stone-800/80 hover:border-[#C89B3C]/60 cursor-pointer group'
                  : 'bg-stone-900/50 border-stone-800/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={activeCredits.director.avatarUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'}
                  alt={activeCredits.director.name}
                  className="w-10 h-10 rounded-full object-cover border border-stone-700"
                />
                <div>
                  <h4 className={`text-sm font-semibold transition-colors ${
                    activeCredits.director.protagonistId ? 'text-white group-hover:text-[#FACC15]' : 'text-white'
                  }`}>
                    {activeCredits.director.name}
                  </h4>
                  <p className="text-xs text-stone-400">
                    {activeCredits.director.roleTitle || 'Réalisateur & Cadreur documentaire'}
                  </p>
                </div>
              </div>

              {activeCredits.director.protagonistId && (
                <span className="text-xs text-stone-400 group-hover:text-white flex items-center gap-1">
                  <span className="text-[11px] hidden sm:inline">Voir profil</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
          </div>

          {/* 3. POST-PRODUCTION */}
          <div className="space-y-3 pt-2 border-t border-stone-800/60">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
              <Scissors className="w-3.5 h-3.5" />
              <span>Post-Production & Traitement sonore</span>
            </div>

            <div className="space-y-2">
              {activeCredits.postProduction.map((item, idx) => {
                const isClickable = !!item.protagonistId;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (item.protagonistId) {
                        onClose();
                        onNavigateToProfile(item.protagonistId);
                      }
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all ${
                      isClickable
                        ? 'bg-stone-900/80 hover:bg-stone-850 border-stone-800/80 hover:border-stone-600 cursor-pointer group'
                        : 'bg-stone-900/50 border-stone-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatarUrl || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border border-stone-700"
                      />
                      <div>
                        <h4 className={`text-sm font-semibold transition-colors ${
                          isClickable ? 'text-white group-hover:text-[#FACC15]' : 'text-white'
                        }`}>
                          {item.name}
                        </h4>
                        <p className="text-xs text-stone-400">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    {isClickable && (
                      <span className="text-xs text-stone-400 group-hover:text-white flex items-center gap-1">
                        <span className="text-[11px] hidden sm:inline">Voir profil</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pied de modale sobre */}
        <div className="p-4 border-t border-stone-800 bg-stone-900/40 flex items-center justify-between text-xs text-stone-400">
          <span>YONYWOOD • Droits & filiation certifiés</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-white font-medium transition-colors cursor-pointer"
          >
            Reprendre le visionnage
          </button>
        </div>
      </div>
    </div>
  );
};
