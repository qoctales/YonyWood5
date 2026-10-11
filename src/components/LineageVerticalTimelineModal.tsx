import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronUp, 
  ChevronDown, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  HeartHandshake, 
  User, 
  Play, 
  Compass, 
  ExternalLink,
  ChevronLeft,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { 
  getLineageTree, 
  LineageTree, 
  LineageMember, 
  LINEAGE_COLORS 
} from '../utils/lineageService';
import { AffiliationPerson, Protagonist, ViewScreen } from '../types';

interface LineageVerticalTimelineModalProps {
  person: string | AffiliationPerson | Protagonist;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToProtagonist?: (protagonistId: string) => void;
  onOpenVideo?: (person: LineageMember) => void;
}

export const LineageVerticalTimelineModal: React.FC<LineageVerticalTimelineModalProps> = ({
  person,
  isOpen,
  onClose,
  onNavigateToProtagonist,
  onOpenVideo
}) => {
  // Navigation active dans la lignée (permet de sauter d'un protagoniste à l'autre sans quitter la frise)
  const [activePersonId, setActivePersonId] = useState<string>(() => {
    return typeof person === 'string' ? person : person.id;
  });

  // Historique de navigation pour revenir facilement en arrière
  const [historyStack, setHistoryStack] = useState<string[]>([]);

  useEffect(() => {
    const initialId = typeof person === 'string' ? person : person.id;
    setActivePersonId(initialId);
    setHistoryStack([]);
  }, [person]);

  if (!isOpen) return null;

  const lineage: LineageTree = getLineageTree(activePersonId);
  const current = lineage.current;
  const parent = lineage.ascendants[0];
  const children = lineage.descendants;
  const availableSlotsCount = Math.max(0, lineage.maxChildren - children.length);

  const handleSelectMember = (memberId: string) => {
    setHistoryStack(prev => [...prev, activePersonId]);
    setActivePersonId(memberId);
  };

  const handleGoBack = () => {
    if (historyStack.length > 0) {
      const prevId = historyStack[historyStack.length - 1];
      setHistoryStack(historyStack.slice(0, -1));
      setActivePersonId(prevId);
    }
  };

  return (
    <div 
      id="lineage-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="lineage-modal-card"
        className="relative w-full max-w-2xl bg-[#FCFBF7] text-[#1C1917] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92dvh] my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* EN-TÊTE DE LA LIGNÉE */}
        <div className="relative px-5 py-4 sm:px-7 sm:py-5 bg-gradient-to-b from-[#F7F3E9] to-[#FCFBF7] border-b border-stone-200/80 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              {historyStack.length > 0 && (
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#A2482B] border border-stone-200 hover:border-[#A2482B] text-stone-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs mr-1"
                  title="Revenir au protagoniste précédent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              <div className="w-9 h-9 rounded-2xl bg-[#A2482B]/10 border border-[#A2482B]/30 flex items-center justify-center text-[#A2482B] shadow-xs">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#1C1917] tracking-tight">
                  Lignée & Héritage
                </h2>
                <p className="text-xs text-stone-500 font-medium">
                  Les âmes se choisissent · Alliance indéfectible
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white hover:bg-[#A2482B] border border-stone-200 hover:border-[#A2482B] text-stone-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              title="Fermer la lignée"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* LÉGENDE DES COULEURS DE LA LIGNÉE */}
          <div className="mt-3.5 pt-3 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#C89B3C] shadow-xs border border-white" />
                <span className="font-semibold text-stone-700">Miel</span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-500">Lignée ascendante (parrain)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#A2482B] shadow-xs border border-white" />
                <span className="font-semibold text-stone-700">Terre cuite</span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-500">Lignée descendante (enfants)</span>
              </div>
            </div>
            <div className="text-stone-500 font-medium">
              4 % de transmission partagée
            </div>
          </div>
        </div>

        {/* CORPS : LA FRISE VERTICALE DÉROULANTE */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 space-y-6">

          {/* 1. SECTION ASCENDANTE (HAUT) · FIL MIEL */}
          <div className="relative pl-7 sm:pl-9">
            {/* Ligne verticale Miel */}
            <div 
              className="absolute left-[13px] sm:left-[17px] top-6 bottom-0 w-[3px] rounded-full"
              style={{ backgroundColor: LINEAGE_COLORS.honey }}
            />

            {/* En-tête de section Miel */}
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs"
                style={{ backgroundColor: LINEAGE_COLORS.honey }}
              />
              <span className="text-xs uppercase tracking-wider font-bold" style={{ color: LINEAGE_COLORS.honey }}>
                Lignée ascendante · Parrain & Source
              </span>
            </div>

            {/* Carte du Parrain / Ascendant */}
            {parent ? (
              <div 
                onClick={() => handleSelectMember(parent.id)}
                className="group relative bg-white hover:bg-stone-50 rounded-2xl p-3.5 sm:p-4 border-2 transition-all cursor-pointer shadow-sm hover:shadow-md flex items-center justify-between gap-3"
                style={{ borderColor: `${LINEAGE_COLORS.honey}55` }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 border-2 border-[#C89B3C] shadow-sm">
                    <img 
                      src={parent.photoUrl} 
                      alt={parent.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-serif font-bold text-sm sm:text-base text-[#1C1917] truncate">
                        {parent.name}
                      </span>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="text-xs text-stone-500 font-medium">
                        {parent.flag} {parent.country}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                      {parent.role}
                    </p>
                    <p className="text-[11px] text-[#C89B3C] font-semibold mt-1 italic line-clamp-1">
                      {parent.acceptanceDate || 'Transmission reçue'}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectMember(parent.id);
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-[#C89B3C]/10 hover:bg-[#C89B3C] text-[#9A7426] hover:text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                    title="Remonter à sa lignée"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Remonter</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 rounded-2xl p-4 border border-dashed border-stone-300 text-xs text-stone-500">
                Pionnier fondateur · Aux racines de la première transmission.
              </div>
            )}
          </div>

          {/* 2. CENTRE : L'ÊTRE ACTUEL (LE PIVOT DE LA LIGNÉE) */}
          <div className="relative pl-7 sm:pl-9 py-2">
            {/* Jonction verticale double teinte : transition Miel -> Terre cuite */}
            <div 
              className="absolute left-[13px] sm:left-[17px] top-0 h-1/2 w-[3px]"
              style={{ backgroundColor: LINEAGE_COLORS.honey }}
            />
            <div 
              className="absolute left-[13px] sm:left-[17px] top-1/2 bottom-0 w-[3px]"
              style={{ backgroundColor: LINEAGE_COLORS.terracotta }}
            />

            {/* Puce centrale en alvéole dorée & terracotta */}
            <div 
              className="absolute left-[7px] sm:left-[11px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#1C1917] border-2 border-white shadow-md flex items-center justify-center z-10"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />
            </div>

            {/* Carte majestueuse de l'être actif */}
            <div className="relative bg-gradient-to-br from-white via-[#FAF8F2] to-[#F5EFE1] rounded-3xl p-5 sm:p-6 border-2 border-[#1C1917] shadow-xl">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
                {/* Grand Portrait */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-[#A2482B] via-[#C89B3C] to-[#E8C576] shadow-lg shrink-0">
                  <img 
                    src={current.photoUrl} 
                    alt={current.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full bg-stone-100" 
                  />
                  <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-[#1C1917] text-white text-[10px] font-bold border border-white shadow-xs">
                    Actif
                  </div>
                </div>

                {/* Métadonnées & Parole */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="font-serif font-black text-lg sm:text-xl text-[#1C1917] tracking-tight">
                      {current.name}
                    </h3>
                    <span className="text-xs text-stone-400">·</span>
                    <span className="text-xs font-semibold text-stone-600">
                      {current.flag} {current.territory}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-[#A2482B] mt-0.5">
                    {current.role}
                  </p>

                  {current.quote && (
                    <blockquote className="text-xs text-stone-700 italic mt-2.5 bg-white/70 rounded-xl p-2.5 border border-stone-200/60 leading-relaxed font-serif">
                      {current.quote}
                    </blockquote>
                  )}

                  {/* Statut d'accueil sous ses ailes */}
                  <div className="mt-3.5 pt-3 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                      <span className="w-2 h-2 rounded-full bg-[#A2482B]" />
                      <span>{children.length} / 4 êtres sous ses ailes</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {onOpenVideo && (
                        <button
                          type="button"
                          onClick={() => onOpenVideo(current)}
                          className="px-3 py-1.5 rounded-xl bg-[#1C1917] hover:bg-[#A2482B] text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Voir la vidéo</span>
                        </button>
                      )}

                      {onNavigateToProtagonist && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onNavigateToProtagonist(current.id);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                          <User className="w-3 h-3" />
                          <span>Profil complet</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. SECTION DESCENDANTE (BAS) · FIL TERRE CUITE · MAX 4 ENFANTS */}
          <div className="relative pl-7 sm:pl-9">
            {/* Ligne verticale Terre cuite */}
            <div 
              className="absolute left-[13px] sm:left-[17px] top-0 bottom-6 w-[3px] rounded-full"
              style={{ backgroundColor: LINEAGE_COLORS.terracotta }}
            />

            {/* En-tête de section Terre cuite */}
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs"
                style={{ backgroundColor: LINEAGE_COLORS.terracotta }}
              />
              <span className="text-xs uppercase tracking-wider font-bold" style={{ color: LINEAGE_COLORS.terracotta }}>
                Lignée descendante · {children.length}/4 enfants cooptés (4 % redistribués)
              </span>
            </div>

            {/* Liste des 1 à 4 enfants cooptés */}
            <div className="space-y-3">
              {children.map((child, index) => (
                <div 
                  key={child.id}
                  onClick={() => handleSelectMember(child.id)}
                  className="group relative bg-white hover:bg-stone-50 rounded-2xl p-3.5 sm:p-4 border-2 transition-all cursor-pointer shadow-sm hover:shadow-md flex items-center justify-between gap-3"
                  style={{ borderColor: `${LINEAGE_COLORS.terracotta}55` }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 border-2 border-[#A2482B] shadow-sm">
                      <img 
                        src={child.photoUrl} 
                        alt={child.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#A2482B] text-white text-[9px] font-bold flex items-center justify-center border border-white">
                        {index + 1}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-serif font-bold text-sm sm:text-base text-[#1C1917] truncate">
                          {child.name}
                        </span>
                        <span className="text-xs text-stone-400">·</span>
                        <span className="text-xs text-stone-500 font-medium">
                          {child.flag} {child.country}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                        {child.role}
                      </p>
                      <p className="text-[11px] text-[#A2482B] font-semibold mt-1 italic line-clamp-1">
                        {child.acceptanceDate || 'Cooptation validée'}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectMember(child.id);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-[#A2482B]/10 hover:bg-[#A2482B] text-[#A2482B] hover:text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                      title="Descendre vers sa lignée"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Descendre</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Emplacements d'accueil encore disponibles (jusqu'à 4 au maximum) */}
              {Array.from({ length: availableSlotsCount }).map((_, slotIdx) => (
                <div 
                  key={`available-slot-${slotIdx}`}
                  className="rounded-2xl p-3 sm:p-3.5 border-2 border-dashed border-stone-300 bg-white/40 flex items-center justify-between text-xs text-stone-500"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full border border-dashed border-stone-300 flex items-center justify-center text-stone-400">
                      <User className="w-4 h-4 opacity-50" />
                    </div>
                    <div>
                      <span className="font-medium text-stone-700">
                        Emplacement d’accueil disponible ({children.length + slotIdx + 1}/4)
                      </span>
                      <p className="text-[11px] text-stone-400">
                        L’alliance attend la rencontre mutuelle des deux âmes
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#A2482B] bg-[#A2482B]/10 px-2 py-0.5 rounded-full">
                    Ouvert
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* PIED DE PAGE : RÈGLES DE LA LIGNÉE (SÉCURITÉ & ALLIANCE) */}
        <div className="px-5 py-3.5 sm:px-7 sm:py-4 bg-[#F5EFE1]/60 border-t border-stone-200 shrink-0 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#A2482B] shrink-0" />
            <span>
              <strong>Pacte de lignée indéfectible</strong> : aucune rupture unilatérale possible. La cooptation engage mutuellement pour la vie.
            </span>
          </div>

          <div className="font-serif font-bold text-[#A2482B] shrink-0">
            4 % partagés
          </div>
        </div>
      </div>
    </div>
  );
};
