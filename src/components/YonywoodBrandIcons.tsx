import React from 'react';

interface IconProps {
  className?: string;
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

