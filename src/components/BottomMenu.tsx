import React from 'react';
import { 
  Compass, 
  Clapperboard, 
  Coins, 
  User
} from 'lucide-react';
import { ViewScreen } from '../types';

interface BottomMenuProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen) => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ currentScreen, onNavigate }) => {
  // Determine active item
  const isExplorerActive = currentScreen.type === 'home' || currentScreen.type === 'documentaries' || currentScreen.type === 'documentary_detail';
  const isProposeActive = currentScreen.type === 'submit_story' || currentScreen.type === 'request_videographer';
  const isDuosActive = currentScreen.type === 'duo_feed' || currentScreen.type === 'duo_detail';
  const isMarketActive = currentScreen.type === 'marketplace';
  const isProfileActive = currentScreen.type === 'profile' || currentScreen.type === 'my_forest' || currentScreen.type === 'messaging';

  // Do not show menu during fullscreen video player
  if (currentScreen.type === 'video_player') {
    return null;
  }

  const menuItems = [
    {
      id: 'explorer',
      label: 'Explorer',
      icon: Compass,
      isActive: isExplorerActive,
      onClick: () => onNavigate({ type: 'home' }),
      screenId: 'menu-item-explorer'
    },
    {
      id: 'proposer',
      label: 'Proposer',
      icon: Clapperboard,
      isActive: isProposeActive,
      onClick: () => onNavigate({ type: 'submit_story' }),
      screenId: 'menu-item-propose'
    },
    {
      id: 'duos',
      label: 'Duos',
      icon: null,
      isActive: isDuosActive,
      onClick: () => onNavigate({ type: 'duo_feed' }),
      screenId: 'menu-item-duos'
    },
    {
      id: 'productions',
      label: 'Productions',
      icon: Coins,
      isActive: isMarketActive,
      onClick: () => onNavigate({ type: 'marketplace' }),
      screenId: 'menu-item-productions'
    },
    {
      id: 'profil',
      label: 'Profil',
      icon: User,
      isActive: isProfileActive,
      onClick: () => onNavigate({ type: 'profile' }),
      screenId: 'menu-item-profile'
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-3 sm:pb-5 px-3 sm:px-6">
      <nav 
        id="yonywood-main-menu"
        aria-label="Navigation principale"
        className="pointer-events-auto max-w-md mx-auto bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-full shadow-2xl shadow-stone-900/10 px-3 py-1.5 flex items-center justify-around"
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              id={item.screenId}
              title={item.label}
              className={`relative flex flex-col items-center justify-center px-3 py-1 rounded-full transition-all duration-300 group cursor-pointer ${
                item.isActive
                  ? '-translate-y-0.5 text-[#1C1917]'
                  : 'translate-y-0 text-stone-400 hover:text-stone-800'
              }`}
            >
              {/* Active illuminated pill background with pure white icon for crisp contrast */}
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  item.isActive 
                    ? 'bg-[#A2482B] text-white shadow-md shadow-[#A2482B]/30 ring-1.5 ring-[#C89B3C]/50 scale-105' 
                    : 'bg-transparent text-current group-hover:bg-stone-100/80'
                }`}
              >
                {item.id === 'duos' ? (
                  <span className={`font-mono font-black text-[13px] tracking-wider select-none leading-none transition-transform duration-200 ${
                    item.isActive ? 'text-white scale-105' : 'text-stone-600 group-hover:scale-105'
                  }`}>
                    &lt; &gt;
                  </span>
                ) : Icon ? (
                  <Icon className={`w-5 h-5 transition-transform duration-200 ${item.isActive ? 'stroke-[2.2] text-white' : 'stroke-[1.8] text-stone-600 group-hover:scale-105'}`} />
                ) : null}
              </div>

              {/* Label */}
              <span className={`text-[10px] tracking-tight mt-0.5 transition-all duration-200 ${
                item.isActive 
                  ? 'font-bold text-[#1C1917]' 
                  : 'font-medium text-stone-500'
              }`}>
                {item.label}
              </span>

              {/* Small subtle active dot indicator */}
              {item.isActive && (
                <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#A2482B]" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
