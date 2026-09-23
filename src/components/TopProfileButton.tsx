import React from 'react';
import { User, X } from 'lucide-react';
import { ViewScreen } from '../types';

export const DEFAULT_USER_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';

export interface ProfileAvatarButtonProps {
  onNavigate: (screen: ViewScreen) => void;
  className?: string;
  size?: 'sm' | 'md';
}

/**
 * ProfileAvatarButton:
 * Composant Avatar autonome à intégrer directement DANS le header de chaque vue.
 * Permet un alignement millimétré, sans conflit avec les bordures horizontales (border-b)
 * ni décalage de coordonnées fixed.
 */
export const ProfileAvatarButton: React.FC<ProfileAvatarButtonProps> = ({ 
  onNavigate, 
  className = '',
  size = 'md'
}) => {
  const sizeClasses = size === 'sm' 
    ? 'w-7.5 h-7.5 sm:w-8 sm:h-8' 
    : 'w-8 h-8 sm:w-8.5 sm:h-8.5';

  return (
    <button
      id="header-profile-avatar-btn"
      onClick={(e) => {
        e.stopPropagation();
        onNavigate({ type: 'profile' });
      }}
      title="Mon Profil & Forêt"
      className={`group relative flex items-center justify-center ${sizeClasses} rounded-full bg-white/95 hover:bg-white text-stone-700 shadow-xs hover:shadow-md backdrop-blur-xl border border-stone-200/90 transition-all duration-200 cursor-pointer active:scale-90 hover:scale-105 ring-1 ring-black/5 overflow-hidden shrink-0 ${className}`}
    >
      <img
        src={DEFAULT_USER_AVATAR}
        alt="Profil"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 pointer-events-none"
        onError={(e) => {
          (e.target as HTMLElement).style.display = 'none';
        }}
      />
      <User className="w-3.5 h-3.5 text-stone-600 hidden group-[.has-error]:block" />
    </button>
  );
};

interface TopProfileButtonProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen) => void;
}

/**
 * TopProfileButton:
 * Pastille flottante de repli pour les écrans sans header personnalisé.
 * Masquée sur les écrans qui intègrent déjà ProfileAvatarButton dans leur en-tête.
 */
export const TopProfileButton: React.FC<TopProfileButtonProps> = ({ currentScreen, onNavigate }) => {
  // Masquer sur le lecteur vidéo et sur tous les écrans qui possèdent déjà l'avatar dans leur header
  const screensWithIntegratedAvatar: ViewScreen['type'][] = [
    'home',
    'duo_feed',
    'duo_detail',
    'submit_story',
    'marketplace',
    'video_player'
  ];

  if (screensWithIntegratedAvatar.includes(currentScreen.type)) {
    return null;
  }

  const isProfileActive = 
    currentScreen.type === 'profile' || 
    currentScreen.type === 'protagonist_profile' ||
    currentScreen.type === 'my_forest' || 
    currentScreen.type === 'messaging';

  return (
    <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 pointer-events-auto">
      {isProfileActive ? (
        <button
          id="top-nav-profile-close-btn"
          onClick={() => {
            // Revenir à l'écran d'où l'on vient ou à l'accueil
            if ('returnToDuoId' in currentScreen && currentScreen.returnToDuoId) {
              onNavigate({
                type: 'duo_feed',
                currentDuoIndex: currentScreen.returnToDuoIndex ?? 0,
                selectedDocId: currentScreen.returnToDocId
              });
            } else {
              onNavigate({ type: 'home' });
            }
          }}
          title="Fermer le profil (retour)"
          className="group flex items-center justify-center w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 rounded-full bg-[#1C1917]/90 hover:bg-[#1C1917] text-white shadow-lg shadow-black/25 backdrop-blur-xl border border-white/20 transition-all duration-200 cursor-pointer active:scale-90 hover:scale-105"
        >
          <X className="w-4 h-4 stroke-[2.2] text-white group-hover:rotate-90 transition-transform duration-200" />
        </button>
      ) : (
        <ProfileAvatarButton onNavigate={onNavigate} />
      )}
    </div>
  );
};
