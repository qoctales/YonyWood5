import React, { useState } from 'react';
import { Download, Share, PlusSquare, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'pill' | 'compact' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  className = '',
  variant = 'pill' 
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed in standalone PWA mode, hide
  if (isInstalled) {
    return null;
  }

  // Android / Chromium / Desktop PWA Flow
  if (isInstallable) {
    if (variant === 'compact') {
      return (
        <button
          onClick={install}
          className={`h-9 px-3 rounded-full bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#A2482B]/25 transition-all cursor-pointer ring-1 ring-[#C89B3C]/40 active:scale-95 ${className}`}
          title="Installer l'application YonyWood"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Installer l'app</span>
        </button>
      );
    }

    return (
      <button
        onClick={install}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-semibold shadow-md shadow-[#A2482B]/20 transition-all cursor-pointer ring-1 ring-[#C89B3C]/40 active:scale-95 ${className}`}
        title="Installer YonyWood sur votre téléphone"
      >
        <Download className="w-3.5 h-3.5 text-white" />
        <span>Installer l'application</span>
      </button>
    );
  }

  // iOS Safari flow (WebKit doesn't fire beforeinstallprompt)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-[#DFCDB2] text-[#8B6845] text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95 ${className}`}
          title="Installer sur iPhone"
        >
          <Download className="w-3.5 h-3.5 text-[#A2482B]" />
          <span>Installer sur iPhone</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-stone-200 space-y-4 text-[#1C1917]">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#A2482B] text-white flex items-center justify-center font-bold text-sm">
                    YW
                  </div>
                  <div>
                    <h3 className="font-editorial text-sm font-bold text-[#1C1917]">Installer YonyWood</h3>
                    <p className="text-[11px] text-stone-500">Plein écran &amp; accès instantané</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200/60">
                  <div className="w-7 h-7 rounded-xl bg-white border border-stone-200 text-[#007AFF] flex items-center justify-center shrink-0">
                    <Share className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">1. Touchez le bouton Partager</p>
                    <p className="text-stone-500 text-[11px]">En bas dans la barre de votre navigateur Safari.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200/60">
                  <div className="w-7 h-7 rounded-xl bg-white border border-stone-200 text-[#1C1917] flex items-center justify-center shrink-0">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">2. « Sur l'écran d'accueil »</p>
                    <p className="text-stone-500 text-[11px]">Faites défiler vers le bas et appuyez sur Ajouter.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-2xl bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                C'est compris
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
