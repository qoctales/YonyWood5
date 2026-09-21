import React from 'react';
import { ExplorerCategoryType } from '../data/explorerTopicsData';

export interface InSituAstrolabeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: ExplorerCategoryType;
  activeTopicId: string;
  activeSeriesId: string;
  onSelectSeries: (seriesId: string) => void;
  onSelectTopic: (category: ExplorerCategoryType, topicId: string) => void;
}

/**
 * Note : La sélection in-situ est désormais directement intégrée au cœur du planétaire SVG
 * de MatrixExplorer (Niveau 0: 8 Univers, Niveau 1: 16 Sujets, Niveau 2: 16 Voix)
 * conformément au cahier des charges d'exploration concentrique sur la roue.
 */
export const InSituAstrolabeSelector: React.FC<InSituAstrolabeSelectorProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;
  return null;
};
