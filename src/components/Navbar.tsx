import React, { useState } from 'react';
import { 
  Film, 
  PlusCircle, 
  Menu,
  X
} from 'lucide-react';
import { ViewScreen } from '../types';
import { YonywoodLogoIcon } from './YonywoodBrandIcons';

interface NavbarProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (currentScreen.type === 'video_player') {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => { onNavigate({ type: 'home' }); setMobileMenuOpen(false); }}
          className="flex items-center cursor-pointer group select-none py-1"
          id="nav-logo"
        >
          <img 
            src="/logo%20YonyWood.png?v=4" 
            alt="YonyWood" 
            className="h-7 sm:h-8 w-auto object-contain mix-blend-multiply select-none group-hover:opacity-90 transition-opacity"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/logo-yonywood-clean.png?v=4';
            }}
          />
        </div>

        {/* Essential Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => onNavigate({ type: 'duo_feed' })}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentScreen.type === 'duo_feed'
                ? 'bg-[#1C1917] text-white font-semibold'
                : 'text-stone-600 hover:text-[#1C1917] hover:bg-stone-100'
            }`}
            id="nav-link-duos-feed"
          >
            <span className={`font-mono font-black text-[11px] tracking-wider select-none ${
              currentScreen.type === 'duo_feed' ? 'text-[#C89B3C]' : 'text-stone-700'
            }`}>
              &lt; &gt;
            </span>
            <span>Duos</span>
          </button>

          <button
            onClick={() => onNavigate({ type: 'documentaries' })}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentScreen.type === 'documentaries' || currentScreen.type === 'documentary_detail'
                ? 'bg-[#1C1917] text-white font-semibold'
                : 'text-stone-600 hover:text-[#1C1917] hover:bg-stone-100'
            }`}
            id="nav-link-documentaries"
          >
            <Film className={`w-3.5 h-3.5 ${
              currentScreen.type === 'documentaries' || currentScreen.type === 'documentary_detail'
                ? 'text-[#C89B3C]'
                : 'text-stone-500'
            }`} />
            <span>Séries</span>
          </button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate({ type: 'submit_story' })}
            className="px-3.5 py-1.5 rounded-xl bg-[#A2482B] hover:bg-[#8B3B20] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            id="nav-proposer-btn"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Proposer</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-xl text-stone-600 md:hidden hover:bg-stone-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 py-3 space-y-1">
          <button
            onClick={() => { onNavigate({ type: 'duo_feed' }); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#1C1917] bg-stone-100 flex items-center gap-2"
          >
            <span className="font-mono font-black text-[11px] tracking-wider select-none text-[#C89B3C]">&lt; &gt;</span>
            Duos
          </button>
          <button
            onClick={() => { onNavigate({ type: 'documentaries' }); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#1C1917] hover:bg-stone-50 flex items-center gap-2"
          >
            <Film className="w-3.5 h-3.5" />
            Séries
          </button>
        </div>
      )}
    </header>
  );
};
