import React from 'react';
import { User } from 'lucide-react';
import { ViewScreen } from '../types';

interface TopProfileButtonProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen) => void;
}

/**
 * TopProfileButton:
 * Bouton discret et élégant positionné de manière permanente dans le coin supérieur droit
 * pour accéder à son profil, sa forêt et ses réglages.
 */
export const TopProfileButton: React.FC<TopProfileButtonProps> = ({ currentScreen, onNavigate }) => {
  // Masquer lors du lecteur vidéo plein écran
  if (currentScreen.type === 'video_player') {
    return null;
  }

  const isProfileActive = 
    currentScreen.type === 'profile' || 
    currentScreen.type === 'my_forest' || 
    currentScreen.type === 'messaging';

  return (
    <div className="fixed top-3 sm:top-4 right-3 sm:right-4 z-50 pointer-events-auto">
      <button
        id="top-nav-profile-btn"
        onClick={() => {
          if (isProfileActive) {
            onNavigate({ type: 'home' });
          } else {
            onNavigate({ type: 'profile' });
          }
        }}
        title={isProfileActive ? "Fermer le profil (retour)" : "Mon Profil & Forêt"}
        className={`group flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-xl transition-all duration-300 shadow-md cursor-pointer border ${
          isProfileActive
            ? 'bg-[#1C1917] text-white border-stone-800 shadow-stone-950/20 ring-1 ring-[#C89B3C]/50'
            : 'bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 border-stone-200/90 shadow-stone-900/10 hover:shadow-lg hover:scale-105'
        }`}
      >
        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
          isProfileActive 
            ? 'bg-[#A2482B] text-white' 
            : 'bg-stone-100 group-hover:bg-[#C89B3C]/15 text-stone-600 group-hover:text-[#8B6845]'
        }`}>
          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
        </div>
        <span className="hidden sm:inline text-xs font-semibold tracking-tight">
          {isProfileActive ? 'Fermer' : 'Profil'}
        </span>
      </button>
    </div>
  );
};
