import React, { useState, useEffect } from 'react';
import { Gem, X, Check } from 'lucide-react';
import { StoryResonanceRating } from '../types';

interface ResonanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyId: string;
  topicId?: string;
  personName?: string;
  initialPercentage?: number | null;
  onRatingSubmitted?: (percentage: number) => void;
}

export const ResonanceModal: React.FC<ResonanceModalProps> = ({
  isOpen,
  onClose,
  storyId,
  topicId = 'exploration',
  initialPercentage,
  onRatingSubmitted
}) => {
  // Les 3 évaluations avec curseur de 0 à 100%, par défaut à 50%
  const [authenticity, setAuthenticity] = useState<number>(50);
  const [relevance, setRelevance] = useState<number>(50);
  const [impact, setImpact] = useState<number>(50);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Score global calculé à partir des 3 critères (moyenne centrée)
  const overallPercentage = Math.round((authenticity + relevance + impact) / 3);

  // Charger les notes existantes si disponibles
  useEffect(() => {
    if (!isOpen) return;

    try {
      const storedObj = localStorage.getItem(`yonywood_resonance_detail_${storyId}`);
      if (storedObj) {
        const parsed = JSON.parse(storedObj);
        if (typeof parsed.authenticity === 'number') setAuthenticity(parsed.authenticity);
        if (typeof parsed.relevance === 'number') setRelevance(parsed.relevance);
        if (typeof parsed.impact === 'number') setImpact(parsed.impact);
        return;
      }

      const storedScore = localStorage.getItem(`yonywood_resonance_${storyId}`);
      if (storedScore) {
        const val = parseInt(storedScore, 10);
        if (!isNaN(val)) {
          setAuthenticity(val);
          setRelevance(val);
          setImpact(val);
          return;
        }
      }

      if (typeof initialPercentage === 'number') {
        setAuthenticity(initialPercentage);
        setRelevance(initialPercentage);
        setImpact(initialPercentage);
        return;
      }
    } catch {
      // noop
    }

    // Par défaut : 50%
    setAuthenticity(50);
    setRelevance(50);
    setImpact(50);
  }, [isOpen, storyId, initialPercentage]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const ratingObj: StoryResonanceRating = {
      storyId,
      topicId,
      percentage: overallPercentage,
      ratings: {
        authenticity: Math.round(authenticity / 20) || 1,
        relevance: Math.round(relevance / 20) || 1,
        impact: Math.round(impact / 20) || 1
      },
      createdAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(`yonywood_resonance_${storyId}`, overallPercentage.toString());
      localStorage.setItem(
        `yonywood_resonance_detail_${storyId}`,
        JSON.stringify({ authenticity, relevance, impact })
      );
      const stored = localStorage.getItem('yonywood_story_ratings') || '[]';
      const arr: StoryResonanceRating[] = JSON.parse(stored);
      arr.push(ratingObj);
      localStorage.setItem('yonywood_story_ratings', JSON.stringify(arr));
    } catch {
      // noop
    }

    setIsSubmitted(true);
    if (onRatingSubmitted) {
      onRatingSubmitted(overallPercentage);
    }

    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 750);
  };

  return (
    <div 
      className="absolute inset-0 z-40 bg-black/40 flex flex-col justify-end pointer-events-auto transition-opacity duration-300"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      {/* Volet inférieur coulissant (Bottom Sheet fluide sur fond clair) */}
      <div 
        className="w-full bg-[#FAF8F5] border-t border-[#E7E2D6] rounded-t-3xl p-4 sm:p-5 shadow-2xl space-y-3.5 max-h-[82%] overflow-y-auto text-[#1C1917] transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tirette / indicateur de glissement */}
        <div className="w-10 h-1 bg-[#D8D2C4] rounded-full mx-auto -mt-1 mb-2" />

        {/* En-tête simplifié avec l'icône Diamant */}
        <div className="flex items-center justify-between pb-1 border-b border-[#ECE7DC]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 flex items-center justify-center text-[#9A7024]">
              <Gem className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
              Évaluation
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
            title="Fermer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* État après validation */}
        {isSubmitted ? (
          <div className="py-6 text-center space-y-1.5 animate-in zoom-in duration-150">
            <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 mx-auto flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-[#1C1917]">Résonance enregistrée</p>
            <p className="text-xs text-[#9A7024] font-mono font-bold">{overallPercentage}%</p>
          </div>
        ) : (
          <>
            {/* Moyenne centrée, claire et épurée */}
            <div className="text-center py-2 px-3 bg-white rounded-xl border border-[#E7E2D6] shadow-2xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#9A7024] font-mono tracking-tight flex items-baseline justify-center gap-0.5">
                <span>{overallPercentage}</span>
                <span className="text-lg text-[#C89B3C] font-sans font-bold">%</span>
              </div>
            </div>

            {/* Les 3 évaluations : Authenticité, Pertinence, Impact (curseurs 0 à 100%, par défaut à 50%) */}
            <div className="space-y-2.5 py-0.5">
              
              {/* 1. Authenticité */}
              <div className="space-y-1 bg-white p-2.5 rounded-xl border border-[#EAE6DE] shadow-2xs">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#1C1917] text-[11px]">Authenticité</span>
                  <span className="font-mono text-[#8B6845] font-bold bg-[#F5F2EB] border border-[#E7E2D6] px-1.5 py-0.5 rounded text-[10px]">
                    {authenticity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={authenticity}
                  onChange={(e) => setAuthenticity(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E7E2D6] rounded-lg appearance-none cursor-pointer accent-[#C89B3C]"
                />
                <div className="flex justify-between text-[9px] text-stone-400 font-mono">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* 2. Pertinence */}
              <div className="space-y-1 bg-white p-2.5 rounded-xl border border-[#EAE6DE] shadow-2xs">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#1C1917] text-[11px]">Pertinence</span>
                  <span className="font-mono text-[#8B6845] font-bold bg-[#F5F2EB] border border-[#E7E2D6] px-1.5 py-0.5 rounded text-[10px]">
                    {relevance}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={relevance}
                  onChange={(e) => setRelevance(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E7E2D6] rounded-lg appearance-none cursor-pointer accent-[#C89B3C]"
                />
                <div className="flex justify-between text-[9px] text-stone-400 font-mono">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* 3. Impact émotionnel */}
              <div className="space-y-1 bg-white p-2.5 rounded-xl border border-[#EAE6DE] shadow-2xs">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#1C1917] text-[11px]">Impact</span>
                  <span className="font-mono text-[#8B6845] font-bold bg-[#F5F2EB] border border-[#E7E2D6] px-1.5 py-0.5 rounded text-[10px]">
                    {impact}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={impact}
                  onChange={(e) => setImpact(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E7E2D6] rounded-lg appearance-none cursor-pointer accent-[#C89B3C]"
                />
                <div className="flex justify-between text-[9px] text-stone-400 font-mono">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

            </div>

            {/* Bouton de validation simple et proportionné */}
            <div className="pt-1 flex justify-center">
              <button
                onClick={handleSubmit}
                className="w-full max-w-xs h-9 px-4 rounded-xl bg-gradient-to-r from-[#C89B3C] to-[#E5C16C] hover:brightness-105 text-[#1C1917] text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center cursor-pointer active:scale-[0.98]"
              >
                Valider
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
