import React from 'react';

interface ShareIconProps {
  className?: string;
}

/**
 * Icône de partage sur-mesure pour YonyWood :
 * Arche d'offrande incurvée et flèche d'envol ascendante,
 * élégante, fluide et aérée (tracé fin 1.75px).
 */
export const ShareIcon: React.FC<ShareIconProps> = ({ className = 'w-4 h-4' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Flèche d'envol ascendante */}
      <path d="M12 3v11" />
      <path d="m7.5 7.5 4.5-4.5 4.5 4.5" />
      {/* Arche d'offrande incurvée et douce */}
      <path d="M4 14.5c0 3 2.5 5.5 5.5 5.5h5c3 0 5.5-2.5 5.5-5.5" />
    </svg>
  );
};
