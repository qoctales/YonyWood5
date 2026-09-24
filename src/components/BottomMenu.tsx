import React from 'react';
import { 
  Clapperboard,
  User
} from 'lucide-react';
import { ViewScreen } from '../types';
import { 
  CastingSearchIcon,
  DuocumentairesTvIcon,
  CoproduireRingsIcon 
} from './YonywoodBrandIcons';

interface BottomMenuProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen) => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ currentScreen, onNavigate }) => {
  // Déterminer l'élément actif selon l'écran en cours
  const isStudioActive = currentScreen.type === 'submit_story' || currentScreen.type === 'request_videographer';
  const isCastingActive = currentScreen.type === 'home' || currentScreen.type === 'documentaries' || currentScreen.type === 'documentary_detail';
  const isDuocumentairesActive = currentScreen.type === 'duo_feed' || currentScreen.type === 'duo_detail';
  const isCoproductionActive = currentScreen.type === 'marketplace';
  const isProfilActive = 
    currentScreen.type === 'profile' || 
    currentScreen.type === 'portfolio' || 
    currentScreen.type === 'protagonist_profile' || 
    currentScreen.type === 'my_forest' || 
    currentScreen.type === 'messaging';

  // Ne pas afficher le menu pendant le lecteur vidéo plein écran
  if (currentScreen.type === 'video_player') {
    return null;
  }

  const menuItems = [
    {
      id: 'studio',
      label: 'Studio',
      icon: Clapperboard,
      isActive: isStudioActive,
      onClick: () => onNavigate({ type: 'submit_story' }),
      screenId: 'menu-item-studio'
    },
    {
      id: 'casting',
      label: 'Casting',
      icon: CastingSearchIcon,
      isActive: isCastingActive,
      onClick: () => onNavigate({ type: 'home' }),
      screenId: 'menu-item-casting'
    },
    {
      id: 'duocumentaires',
      label: 'Duocumentaires',
      icon: DuocumentairesTvIcon,
      isActive: isDuocumentairesActive,
      onClick: () => onNavigate({ type: 'duo_feed' }),
      screenId: 'menu-item-duocumentaires'
    },
    {
      id: 'coproduction',
      label: 'Coproduction',
      icon: CoproduireRingsIcon,
      isActive: isCoproductionActive,
      onClick: () => onNavigate({ type: 'marketplace' }),
      screenId: 'menu-item-coproduction'
    },
    {
      id: 'profil',
      label: 'Profil',
      icon: User,
      isActive: isProfilActive,
      onClick: () => onNavigate({ type: 'profile' }),
      screenId: 'menu-item-profil'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-3 sm:pb-5 px-3 sm:px-6">
      <nav 
        id="yonywood-main-menu"
        aria-label="Navigation principale"
        className="pointer-events-auto max-w-md sm:max-w-lg mx-auto bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-full shadow-2xl shadow-stone-900/10 px-2 sm:px-4 py-1.5 flex items-center justify-between gap-1 sm:gap-2"
      >
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              id={item.screenId}
              title={item.label}
              className={`relative flex-1 flex flex-col items-center justify-center px-1 sm:px-2 py-1 rounded-full transition-colors duration-200 group cursor-pointer ${
                item.isActive
                  ? 'text-stone-900'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {/* Capsule changeante uniquement sur l'icône en Terre Cuite signature (#A2482B) */}
              <div 
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  item.isActive 
                    ? 'bg-[#A2482B] text-white shadow-sm' 
                    : 'bg-transparent text-stone-600 group-hover:bg-stone-100/80'
                }`}
              >
                <Icon 
                  className={`${
                    item.id === 'casting' 
                      ? 'w-[21.5px] h-[21.5px]' 
                      : item.id === 'profil'
                      ? 'w-[19px] h-[19px]'
                      : 'w-5 h-5'
                  } transition-transform duration-200`} 
                  strokeWidth={item.id === 'casting' ? 1.6 : item.id === 'profil' ? 1.7 : 1.35} 
                />
              </div>

              {/* Libellé textuel en noms communs uniformes, taille optimisée sur mobile pour éviter toute coupure */}
              <span className={`text-[9px] sm:text-[10.5px] leading-tight tracking-tight mt-0.5 sm:mt-1 transition-colors duration-200 font-normal truncate max-w-full text-center ${
                item.isActive 
                  ? 'text-[#A2482B] font-semibold' 
                  : 'text-stone-500'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

