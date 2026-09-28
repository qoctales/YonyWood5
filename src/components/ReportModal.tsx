import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  FileWarning, 
  HelpCircle, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { ReportItem } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'duo' | 'series' | 'episode';
  targetId: string;
  targetTitle: string;
  onReportSubmitted?: (report: ReportItem) => void;
}

const REPORT_REASONS = [
  {
    id: 'inappropriate',
    label: 'Contenu inapproprié ou offensant',
    description: 'Nudité non artistique, propos haineux ou atteinte aux mœurs.',
    icon: ShieldAlert
  },
  {
    id: 'copyright',
    label: "Atteinte aux droits d'auteur",
    description: 'Utilisation non autorisée d’images, musiques ou créations tierces.',
    icon: FileWarning
  },
  {
    id: 'violence',
    label: 'Violence ou mise en danger',
    description: 'Actes dangereux, incitation à la violence ou cruauté.',
    icon: AlertTriangle
  },
  {
    id: 'misinformation',
    label: 'Désinformation ou tromperie',
    description: 'Contenu manifestement trompeur, arnaque ou faux témoignage.',
    icon: HelpCircle
  },
  {
    id: 'other',
    label: 'Autre motif',
    description: 'Problème technique grave ou autre préoccupation éthique.',
    icon: HelpCircle
  }
] as const;

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetTitle,
  onReportSubmitted
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('inappropriate');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reasonObj = REPORT_REASONS.find(r => r.id === selectedReason);
    const newReport: ReportItem = {
      id: `rep-${Date.now()}`,
      reason: selectedReason as any,
      reasonLabel: reasonObj?.label || 'Autre motif',
      details: details.trim() || undefined,
      targetType,
      targetId,
      targetTitle,
      reportedBy: 'Utilisateur connecté',
      createdAt: new Date().toISOString(),
      status: 'PENDING'
    };

    // Sauvegarde persistante dans localStorage pour le dashboard admin
    try {
      const existing = localStorage.getItem('yonywood_reports');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newReport);
      localStorage.setItem('yonywood_reports', JSON.stringify(list));
    } catch {
      // ignore
    }

    onReportSubmitted?.(newReport);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#1C1917] border border-stone-800 rounded-3xl shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {isSubmitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-in zoom-in">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-white">Signalement transmis</h3>
            <p className="text-xs text-stone-300 max-w-xs">
              Merci pour votre vigilance. Notre équipe de modération éditoriale va examiner ce contenu dans les plus brefs délais.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-6 pt-6 pb-3 border-b border-stone-800 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-amber-500 text-xs font-mono font-bold uppercase mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Modération & Sécurité</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white tracking-tight">
                  Signaler ce contenu
                </h3>
                <p className="text-xs text-stone-400 mt-0.5 line-clamp-1">
                  Vidéo : <span className="text-white font-medium">{targetTitle}</span>
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-stone-300">
                  Motif principal du signalement
                </label>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {REPORT_REASONS.map((r) => {
                    const Icon = r.icon;
                    const isSelected = selectedReason === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSelectedReason(r.id)}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#A2482B]/20 border-[#A2482B] text-white shadow-xs'
                            : 'bg-stone-900/60 border-stone-800/80 text-stone-300 hover:bg-stone-900 hover:border-stone-700'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#E8926F]' : 'text-stone-400'}`} />
                        <div>
                          <div className="text-xs font-semibold">{r.label}</div>
                          <div className="text-[11px] text-stone-400 leading-tight mt-0.5">{r.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Précisions complémentaires (facultatif)
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Décrivez brièvement le passage ou le motif précis..."
                  rows={2}
                  className="w-full p-3 rounded-xl bg-stone-900 border border-stone-800 focus:border-[#A2482B] text-white text-xs placeholder:text-stone-500 outline-hidden resize-none transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium cursor-pointer transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-bold shadow-md shadow-[#A2482B]/20 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer le signalement</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
