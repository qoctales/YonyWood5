import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Film, 
  Sparkles, 
  Coins, 
  Compass, 
  CheckCircle2, 
  Layers, 
  X,
  Play
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

interface SlideData {
  id: number;
  badge: string;
  badgeIcon: React.ElementType;
  title: string;
  highlight: string;
  subtitle: string;
  description: string;
  bgImage: string;
  features: string[];
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    badge: 'CINÉMA DU VIVANT',
    badgeIcon: Film,
    title: 'Les Récits',
    highlight: 'du Réel',
    subtitle: 'Une immersion documentaire inédite',
    description: 'Explorez des récits documentaires captés au cœur des territoires, racontés par les voix de celles et ceux qui transmettent la mémoire et façonnent le monde.',
    bgImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80',
    features: [
      'Documentaires en chapitres immersifs',
      'Portraits authentiques de passeurs de savoirs',
      'Archives visuelles et mémoires vivantes'
    ]
  },
  {
    id: 2,
    badge: 'NAVIGATION INNOVANTE',
    badgeIcon: Compass,
    title: "L'Astrolabe",
    highlight: '& les Duos',
    subtitle: 'Une cartographie interactive des mémoires',
    description: "Parcourez les 8 portes thématiques de l'Astrolabe et vivez l'expérience inédite des Duos : deux regards, deux voix mises en diptyque vertical 9:16.",
    bgImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    features: [
      "Navigation intuitive à l'Astrolabe central",
      'Diptyques verticaux 9:16 face-à-face',
      'Bascule instantanée en mode Deck'
    ]
  },
  {
    id: 3,
    badge: 'ÉCONOMIE DU PARTAGE',
    badgeIcon: Coins,
    title: 'Coproduction',
    highlight: 'à Impact',
    subtitle: 'Participez à la création et gagnez avec le film',
    description: 'Devenez coproducteur des documentaires dès 10 €. Suivez les audiences, touchez des dividendes culturels et soutenez durablement les créateurs.',
    bgImage: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1400&q=80',
    features: [
      'Acquisition de parts de coproduction transparentes',
      "Paliers d'audience et retour sur investissement",
      'Suivi de portefeuille en temps réel'
    ]
  }
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onOpenAuth
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!isOpen) return null;

  const currentSlide = SLIDES[currentSlideIndex];
  const isLast = currentSlideIndex === SLIDES.length - 1;
  const isFirst = currentSlideIndex === 0;

  const handleNext = () => {
    if (isLast) {
      handleComplete();
    } else {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    try {
      localStorage.setItem('yonywood_onboarding_seen', 'true');
    } catch {
      // ignore
    }
    onClose();
  };

  const handleLoginClick = () => {
    handleComplete();
    onOpenAuth('login');
  };

  const handleRegisterClick = () => {
    handleComplete();
    onOpenAuth('register');
  };

  const BadgeIcon = currentSlide.badgeIcon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-2xl h-[92vh] max-h-[720px] rounded-3xl overflow-hidden bg-[#141210] border border-white/10 shadow-2xl flex flex-col text-white select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image de fond avec fondu cinématique */}
        <div className="absolute inset-0 z-0">
          <img 
            src={currentSlide.bgImage} 
            alt={currentSlide.title}
            className="w-full h-full object-cover transition-all duration-700 scale-105 filter brightness-[0.4] saturate-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/60 to-black/70" />
        </div>

        {/* Bouton fermer / passer en haut à droite */}
        <div className="relative z-10 flex items-center justify-between p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A2482B] inline-block animate-pulse" />
              YONYWOOD
            </span>
          </div>

          <button
            onClick={handleComplete}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-medium backdrop-blur-md transition-all cursor-pointer flex items-center gap-1"
          >
            <span>Passer</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Contenu central de la slide */}
        <div className="relative z-10 flex-1 flex flex-col justify-end px-5 sm:px-10 pb-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A2482B]/80 border border-[#A2482B] text-white text-[11px] font-bold tracking-wider uppercase mb-3 w-fit backdrop-blur-md">
            <BadgeIcon className="w-3.5 h-3.5 text-amber-200" />
            <span>{currentSlide.badge}</span>
          </div>

          {/* Titre avec mot mis en valeur */}
          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white mb-2 leading-tight">
            {currentSlide.title} <span className="text-[#E8926F] italic">{currentSlide.highlight}</span>
          </h2>

          {/* Sous-titre */}
          <p className="text-sm sm:text-base font-medium text-stone-200 mb-2">
            {currentSlide.subtitle}
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-300 line-clamp-3 mb-4 leading-relaxed max-w-xl">
            {currentSlide.description}
          </p>

          {/* Puces de fonctionnalités */}
          <div className="space-y-1.5 mb-6">
            {currentSlide.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs sm:text-[13px] text-stone-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E8926F] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Indicateurs de points (Dots) */}
          <div className="flex items-center gap-2 mb-6">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlideIndex === idx 
                    ? 'w-8 bg-[#E8926F]' 
                    : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                title={`Aller à la slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Actions : Navigation & Authentification */}
          <div className="space-y-3">
            {isLast ? (
              // Dernière slide : boutons Connexion et Inscription directs
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={handleRegisterClick}
                  className="flex-1 h-11 sm:h-12 px-5 rounded-full bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#A2482B]/30 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Créer mon compte</span>
                </button>

                <button
                  onClick={handleLoginClick}
                  className="flex-1 h-11 sm:h-12 px-5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <span>Déjà membre ? Se connecter</span>
                </button>
              </div>
            ) : (
              // Slides 1 & 2 : Bouton Suivant + Déjà un compte
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handlePrev}
                  disabled={isFirst}
                  className={`h-10 px-3.5 rounded-full border border-white/15 flex items-center justify-center text-xs font-semibold transition-all ${
                    isFirst 
                      ? 'opacity-0 pointer-events-none' 
                      : 'bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  <span>Précédent</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLoginClick}
                    className="text-xs text-stone-300 hover:text-white font-medium underline-offset-4 hover:underline px-2 py-1 cursor-pointer"
                  >
                    Se connecter
                  </button>

                  <button
                    onClick={handleNext}
                    className="h-10 sm:h-11 px-5 rounded-full bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    <span>Suivant</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
