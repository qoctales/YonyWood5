import React from 'react';

interface IconProps {
  className?: string;
  strokeWidth?: number | string;
}

/**
 * ExplorerEggIcon:
 * Symbole Explorer inspiré d'un œuf ouvert en haut et en bas,
 * formant deux parenthèses ouvertes face à face qui ne se touchent pas.
 */
export const ExplorerEggIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* Parenthèse / Coquille gauche (ouverte en haut et en bas) */}
      <path d="M 9 3.5 C 4 7, 4 17, 9 20.5" />
      {/* Parenthèse / Coquille droite (ouverte en haut et en bas) */}
      <path d="M 15 3.5 C 20 7, 20 17, 15 20.5" />
    </svg>
  );
};

/**
 * YonywoodLogoIcon:
 * Logo officiel du projet : les deux parenthèses ouvertes (l'œuf cosmique ouvert)
 * renfermant les symboles inférieur (<) et supérieur (>) qui ne se touchent pas,
 * avec les barres centrales en vis-à-vis qui ne se touchent pas.
 */
export const YonywoodLogoIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* Parenthèse / Coquille extérieure gauche */}
      <path d="M 8 3.5 C 3 7, 3 17, 8 20.5" />
      {/* Parenthèse / Coquille extérieure droite */}
      <path d="M 16 3.5 C 21 7, 21 17, 16 20.5" />
      {/* Symbole inférieur (<) tourné vers le centre, ne touche rien */}
      <path d="M 10.5 9.2 L 7.5 12 L 10.5 14.8" />
      {/* Symbole supérieur (>) tourné vers le centre, en vis-à-vis sans se toucher */}
      <path d="M 13.5 9.2 L 16.5 12 L 13.5 14.8" />
    </svg>
  );
};

/**
 * CircleDotsIcon:
 * Symbole « Cercle » : un cercle central entouré d'une couronne de petits points en cercle,
 * symbolisant l'assemblée, le groupe réuni, la communauté chorale et l'astrolabe.
 */
export const CircleDotsIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* Cercle central */}
      <circle cx="12" cy="12" r="4.2" />
      
      {/* 8 petits points disposés en couronne circulaire autour */}
      <circle cx="12" cy="3.2" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="18.2" cy="5.8" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="20.8" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="18.2" cy="18.2" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="20.8" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="5.8" cy="18.2" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="3.2" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="5.8" cy="5.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
};

/**
 * LaurelNominationsIcon:
 * Symbole « Nominations » : lauriers de sélection officielle / festival.
 * Rendu net et ultra-lisible en petite taille, formé de paires de feuilles
 * évasées en haut qui convergent gracieusement vers le bas en pointe en V.
 */
export const LaurelNominationsIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      aria-hidden="true"
    >
      {/* Paire 1 (Haut, feuilles évasées) */}
      <path 
        d="M 6.4 5.2 C 6.8 3.9 8.8 4.2 8.7 5.6 C 8.5 6.8 6.2 6.5 6.4 5.2 Z" 
        fill="currentColor" 
      />
      <path 
        d="M 17.6 5.2 C 17.2 3.9 15.2 4.2 15.3 5.6 C 15.5 6.8 17.8 6.5 17.6 5.2 Z" 
        fill="currentColor" 
      />

      {/* Paire 2 (Inclinée vers l'intérieur) */}
      <path 
        d="M 7.2 8.8 C 7.6 7.6 9.5 8.1 9.2 9.4 C 8.9 10.5 7.0 10.0 7.2 8.8 Z" 
        fill="currentColor" 
      />
      <path 
        d="M 16.8 8.8 C 16.4 7.6 14.5 8.1 14.8 9.4 C 15.1 10.5 17.0 10.0 16.8 8.8 Z" 
        fill="currentColor" 
      />

      {/* Paire 3 (Mi-hauteur, resserrée) */}
      <path 
        d="M 8.5 12.3 C 8.8 11.2 10.6 11.8 10.3 13.0 C 9.9 14.1 8.3 13.4 8.5 12.3 Z" 
        fill="currentColor" 
      />
      <path 
        d="M 15.5 12.3 C 15.2 11.2 13.4 11.8 13.7 13.0 C 14.1 14.1 15.7 13.4 15.5 12.3 Z" 
        fill="currentColor" 
      />

      {/* Paire 4 (Bas, convergence) */}
      <path 
        d="M 10.1 15.8 C 10.3 14.8 12.0 15.5 11.6 16.6 C 11.2 17.5 9.9 16.8 10.1 15.8 Z" 
        fill="currentColor" 
      />
      <path 
        d="M 13.9 15.8 C 13.7 14.8 12.0 15.5 12.4 16.6 C 12.8 17.5 14.1 16.8 13.9 15.8 Z" 
        fill="currentColor" 
      />

      {/* Paire 5 (Pointe en V terminale au centre) */}
      <path 
        d="M 11.4 18.8 C 11.4 18.0 12.5 18.4 12.1 19.6 C 11.7 20.0 11.2 19.5 11.4 18.8 Z" 
        fill="currentColor" 
      />
      <path 
        d="M 12.6 18.8 C 12.6 18.0 11.5 18.4 11.9 19.6 C 12.3 20.0 12.8 19.5 12.6 18.8 Z" 
        fill="currentColor" 
      />
    </svg>
  );
};

/**
 * CastingSearchIcon:
 * Symbole « Casting » : loupe de recherche entourant la silhouette d'un profil/personnage,
 * symbolisant la détection des talents, la sélection et le casting.
 */
export const CastingSearchIcon: React.FC<IconProps> = ({ 
  className = 'w-5 h-5',
  strokeWidth = 1.6 
}) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* Cercle généreux et harmonieux de la loupe agrandie */}
      <circle cx="10.2" cy="10.2" r="8.2" />
      {/* Tête de l'acteur / protagoniste */}
      <circle cx="10.2" cy="8.2" r="2.5" />
      {/* Buste / Épaules bien proportionnés */}
      <path d="M 6.2 15.2 C 6.8 12.8 8.3 12.0 10.2 12.0 C 12.1 12.0 13.6 12.8 14.2 15.2" />
      {/* Manche solide de la loupe à 45° */}
      <line x1="16.3" y1="16.3" x2="21.8" y2="21.8" />
    </svg>
  );
};

/**
 * CoproduireRingsIcon:
 * Symbole « Coproduire » : deux anneaux entrelacés / cercles sécants en diagonale,
 * symbolisant l'alliance, le cofinancement créatif et le partage de valeur.
 */
export const CoproduireRingsIcon: React.FC<IconProps> = ({ 
  className = 'w-5 h-5',
  strokeWidth = 1.35 
}) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* Anneau inférieur gauche */}
      <circle cx="9.5" cy="14" r="5" />
      {/* Anneau supérieur droit */}
      <circle cx="14.5" cy="9.5" r="5" />
    </svg>
  );
};

/**
 * DuocumentairesTvIcon:
 * Symbole « Duocumentaires » : écran de télévision vintage scindé en deux.
 * Un seul cadre scindé en deux au centre (les deux voix du duocumentaire),
 * avec deux petits témoins/boutons et deux pieds obliques évasés (sans traverse).
 */
export const DuocumentairesTvIcon: React.FC<IconProps> = ({ 
  className = 'w-5 h-5',
  strokeWidth = 1.35 
}) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* Cadre du téléviseur / meuble vintage arrondi */}
      <rect x="4" y="5" width="16" height="11" rx="2.5" />
      
      {/* Séparation centrale verticale (l'écran divisé en deux mondes/voix) */}
      <line x1="12" y1="5" x2="12" y2="16" />

      {/* Deux petits boutons / témoins caméra au centre de chaque moitié d'écran */}
      <circle cx="8" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10.5" r="0.8" fill="currentColor" stroke="none" />

      {/* Piétement vintage : deux pieds inclinés uniquement, sans traverse */}
      <path d="M 6.8 16 L 4.6 20.5" />
      <path d="M 17.2 16 L 19.4 20.5" />
    </svg>
  );
};

