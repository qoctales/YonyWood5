import React, { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';
import { StoryResonanceRating } from '../types';

interface ResonanceRaterProps {
  storyId: string;
  topicId: string;
  onRatingSubmitted?: (rating: StoryResonanceRating) => void;
}

export const ResonanceRater: React.FC<ResonanceRaterProps> = ({
  storyId,
  topicId,
  onRatingSubmitted
}) => {
  const [authenticity, setAuthenticity] = useState<number>(3);
  const [relevance, setRelevance] = useState<number>(3);
  const [impact, setImpact] = useState<number>(3);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    const ratingObj: StoryResonanceRating = {
      storyId,
      topicId,
      ratings: {
        authenticity,
        relevance,
        impact
      },
      createdAt: new Date().toISOString()
    };

    // Sauvegarde locale légère
    try {
      const stored = localStorage.getItem('yonywood_story_ratings') || '[]';
      const arr: StoryResonanceRating[] = JSON.parse(stored);
      arr.push(ratingObj);
      localStorage.setItem('yonywood_story_ratings', JSON.stringify(arr));
    } catch {
      // noop
    }

    setIsSubmitted(true);
    if (onRatingSubmitted) {
      onRatingSubmitted(ratingObj);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-2.5 px-4 rounded-xl bg-black/60 backdrop-blur-md border border-[#C89B3C]/40 text-center animate-in fade-in duration-200">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#E5C16C]">
          <Check className="w-3.5 h-3.5 text-[#C89B3C]" />
          <span>Résonance enregistrée</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="p-3.5 rounded-2xl bg-black/65 backdrop-blur-md border border-white/15 text-white/90 shadow-xl space-y-3"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C89B3C]">
          <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
          <span>Résonance</span>
        </div>
        <span className="text-[10px] text-stone-400 font-mono">1 à 5</span>
      </div>

      <div className="space-y-2.5">
        {/* Authenticité */}
        <div>
          <div className="flex justify-between text-xs font-medium text-stone-200 mb-1">
            <span>Authenticité</span>
            <span className="font-mono text-stone-300">{authenticity}</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={authenticity}
            onChange={(e) => setAuthenticity(Number(e.target.value))}
            className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#C89B3C]"
          />
        </div>

        {/* Pertinence */}
        <div>
          <div className="flex justify-between text-xs font-medium text-stone-200 mb-1">
            <span>Pertinence</span>
            <span className="font-mono text-stone-300">{relevance}</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={relevance}
            onChange={(e) => setRelevance(Number(e.target.value))}
            className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#C89B3C]"
          />
        </div>

        {/* Impact */}
        <div>
          <div className="flex justify-between text-xs font-medium text-stone-200 mb-1">
            <span>Impact</span>
            <span className="font-mono text-stone-300">{impact}</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={impact}
            onChange={(e) => setImpact(Number(e.target.value))}
            className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#C89B3C]"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full h-11 px-4 rounded-xl bg-gradient-to-r from-[#C89B3C] to-[#E5C16C] hover:brightness-105 text-[#1C1917] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
      >
        <Sparkles className="w-4 h-4 text-[#1C1917]" />
        <span>Valider la résonance</span>
      </button>
    </div>
  );
};
