import React from 'react';
import { Sparkles, Sliders, Check, RotateCcw, X, Tv } from 'lucide-react';
import { DOCUMENTARIES } from '../data/mockData';

interface RemoteControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDocId: string | null; // null means "all series (random feed)"
  onSelectDoc: (docId: string | null) => void;
}

export const RemoteControlModal: React.FC<RemoteControlModalProps> = ({
  isOpen,
  onClose,
  selectedDocId,
  onSelectDoc,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden text-[#1C1917]"
        id="remote-control-panel"
      >
        {/* Header styling evoking an artisanal optical selector / remote */}
        <div className="p-6 bg-stone-50 border-b border-stone-200 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
            title="Fermer la télécommande"
            id="close-remote-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1C1917] flex items-center justify-center text-white shadow-sm">
              <Tv className="w-5 h-5 text-[#C89B3C]" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#1C1917]">
                Télécommande des Séries
              </h3>
            </div>
          </div>
          <p className="mt-2 text-xs text-stone-500 leading-relaxed">
            Zappez entre les univers ou laissez le hasard relier les protagonistes à votre écoute.
          </p>
        </div>

        {/* Series channels options */}
        <div className="p-5 space-y-2.5 max-h-[60vh] overflow-y-auto">
          {/* Channel 0: All Series / Random mode */}
          <button
            onClick={() => {
              onSelectDoc(null);
              onClose();
            }}
            id="remote-channel-all"
            className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
              selectedDocId === null
                ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                : 'bg-white hover:bg-stone-50 border-stone-200'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                selectedDocId === null ? 'bg-[#C89B3C] text-white' : 'bg-stone-100 text-stone-600'
              }`}>
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <p className={`font-editorial text-base font-semibold ${selectedDocId === null ? 'text-white' : 'text-[#1C1917]'}`}>
                  Tous
                </p>
              </div>
            </div>
            {selectedDocId === null && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C89B3C] bg-white/10 px-2.5 py-1 rounded-full">
                <Check className="w-3.5 h-3.5" /> Actif
              </span>
            )}
          </button>

          {/* Series channels */}
          {DOCUMENTARIES.map((doc, idx) => {
            const isSelected = selectedDocId === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => {
                  onSelectDoc(doc.id);
                  onClose();
                }}
                id={`remote-channel-${doc.id}`}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                    : 'bg-white hover:bg-stone-50 border-stone-200'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative w-11 h-14 rounded-lg overflow-hidden shrink-0 border border-stone-200/50 shadow-xs bg-stone-900">
                    <img 
                      src={doc.posterUrl || doc.coverImage} 
                      alt={doc.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-1 left-1 px-1 rounded text-[9px] font-mono font-bold ${
                      isSelected ? 'bg-[#C89B3C] text-white' : 'bg-black/70 text-white/90'
                    }`}>
                      0{idx + 1}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className={`font-editorial text-base font-semibold ${isSelected ? 'text-white' : 'text-[#1C1917]'}`}>
                        {doc.title}
                      </p>
                    </div>
                    <p className={`text-xs ${isSelected ? 'text-[#C89B3C]' : 'text-stone-500'}`}>
                      Focus : {doc.centralQuestion}
                    </p>
                  </div>
                </div>
                {isSelected ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C89B3C] bg-white/10 px-2.5 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5" /> Actif
                  </span>
                ) : (
                  <span className="text-xs text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Zapper →
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end text-xs text-stone-500">
          <button 
            onClick={onClose}
            className="text-stone-700 hover:text-[#1C1917] font-semibold underline underline-offset-2 cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
