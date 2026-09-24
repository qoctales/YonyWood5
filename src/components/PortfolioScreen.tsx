import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Coins, 
  TrendingUp, 
  Eye, 
  Plus, 
  Minus, 
  Check, 
  CheckCircle2, 
  Calendar,
  X
} from 'lucide-react';
import { ViewScreen } from '../types';
import { UserProductionShare } from './ProfileSettingsScreen';

export interface PortfolioTransactionItem {
  id: string;
  seriesId: string;
  seriesTitle: string;
  sharesSold: number;
  boughtPriceUnit: number;
  soldPriceUnit: number;
  totalBought: number;
  totalSold: number;
  netGain: number;
  date: string;
  buyerName: string;
  buyerPhoto: string;
  buyerProtagonistId?: string;
  buyerRole?: string;
  posterUrl: string;
}

interface PortfolioScreenProps {
  onNavigate: (screen: ViewScreen) => void;
  returnToDuoId?: string;
  returnToDuoIndex?: number;
  returnToDocId?: string;
}

export const PortfolioScreen: React.FC<PortfolioScreenProps> = ({
  onNavigate,
  returnToDuoId,
  returnToDuoIndex,
  returnToDocId
}) => {
  // Onglet courant : 'shares' (Mes parts) ou 'history' (Historique)
  const [currentTab, setCurrentTab] = useState<'shares' | 'history'>('shares');

  // Liste des séries coproduites
  const [productions, setProductions] = useState<UserProductionShare[]>([
    {
      id: 'prod-1',
      seriesId: 'finagnon-qosqorico',
      seriesTitle: 'Finagnon < > Qosqorico',
      sharesCount: 10,
      sharesOnSale: 2,
      startPrice: 35,
      salePrice: 55,
      purchasePrice: 350,
      recommendedPrice: 55,
      rsiPercent: 57.1,
      returnForecastPercent: 18.5,
      returnForecastAmount: 64.75,
      viewsCount: 38400,
      growthRatePercent: 24.5,
      liquidityScore: 'Élevée',
      status: 'En diffusion',
      videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      posterUrl: '/assets/posters/finagnon-qosqorico.png'
    },
    {
      id: 'prod-2',
      seriesId: 'jesus-legba',
      seriesTitle: 'Jésus < > Èṣù',
      sharesCount: 5,
      sharesOnSale: 0,
      startPrice: 40,
      salePrice: 50,
      purchasePrice: 200,
      recommendedPrice: 48,
      rsiPercent: 25.0,
      returnForecastPercent: 12.0,
      returnForecastAmount: 24.00,
      viewsCount: 19200,
      growthRatePercent: 15.2,
      liquidityScore: 'Moyenne',
      status: 'En post-production',
      videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      posterUrl: '/assets/posters/jesus-esu.png'
    },
    {
      id: 'prod-3',
      seriesId: 'blacks-one-beyond-eve',
      seriesTitle: 'Blacks One < > Beyond Eve',
      sharesCount: 8,
      sharesOnSale: 1,
      startPrice: 42,
      salePrice: 52,
      purchasePrice: 380,
      recommendedPrice: 50,
      rsiPercent: 23.8,
      returnForecastPercent: 15.0,
      returnForecastAmount: 41.60,
      viewsCount: 28100,
      growthRatePercent: 18.0,
      liquidityScore: 'Élevée',
      status: 'En diffusion',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      posterUrl: '/assets/posters/blacks-one-beyond-eve.png'
    },
    {
      id: 'prod-4',
      seriesId: 'dixeat-fiat-luxe',
      seriesTitle: 'Dixeat < > Fiat Luxe',
      sharesCount: 6,
      sharesOnSale: 2,
      startPrice: 45,
      salePrice: 58,
      purchasePrice: 270,
      recommendedPrice: 56,
      rsiPercent: 28.8,
      returnForecastPercent: 14.0,
      returnForecastAmount: 38.00,
      viewsCount: 14500,
      growthRatePercent: 11.8,
      liquidityScore: 'Moyenne',
      status: 'En tournage',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      posterUrl: '/assets/posters/dixeat-fiat-luxe.png'
    },
    {
      id: 'prod-5',
      seriesId: 'investors-builders',
      seriesTitle: 'Investors Builders',
      sharesCount: 12,
      sharesOnSale: 4,
      startPrice: 50,
      salePrice: 65,
      purchasePrice: 600,
      recommendedPrice: 62,
      rsiPercent: 30.0,
      returnForecastPercent: 16.5,
      returnForecastAmount: 97.50,
      viewsCount: 42700,
      growthRatePercent: 29.0,
      liquidityScore: 'Élevée',
      status: 'En production',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      posterUrl: '/assets/posters/investors-builders.png'
    }
  ]);

  // Historique des cessions / ventes passées avec posters et acheteurs cliquables
  const [transactions] = useState<PortfolioTransactionItem[]>([
    {
      id: 'tx-1',
      seriesId: 'finagnon-qosqorico',
      seriesTitle: 'Finagnon < > Qosqorico',
      sharesSold: 2,
      boughtPriceUnit: 35,
      soldPriceUnit: 52,
      totalBought: 70,
      totalSold: 104,
      netGain: 34,
      date: '18 févr. 2026',
      buyerName: 'Sayri Quispe',
      buyerPhoto: '/assets/protagonists/sayri-quispe.jpg',
      buyerProtagonistId: 'sayri-quispe',
      buyerRole: 'Cultivateur & tisseur andin (Cusco)',
      posterUrl: '/assets/posters/finagnon-qosqorico.png'
    },
    {
      id: 'tx-2',
      seriesId: 'jesus-legba',
      seriesTitle: 'Jésus < > Èṣù',
      sharesSold: 1,
      boughtPriceUnit: 40,
      soldPriceUnit: 48,
      totalBought: 40,
      totalSold: 48,
      netGain: 8,
      date: '02 mars 2026',
      buyerName: 'Dah Zounon Gbegnon',
      buyerPhoto: '/assets/protagonists/dah-zounon.jpg',
      buyerProtagonistId: 'dah-zounon',
      buyerRole: 'Dignitaire du culte Èṣù (Porto-Novo)',
      posterUrl: '/assets/posters/jesus-esu.png'
    },
    {
      id: 'tx-3',
      seriesId: 'investors-builders',
      seriesTitle: 'Investors Builders',
      sharesSold: 3,
      boughtPriceUnit: 50,
      soldPriceUnit: 64,
      totalBought: 150,
      totalSold: 192,
      netGain: 42,
      date: '10 mars 2026',
      buyerName: 'Koffi',
      buyerPhoto: '/assets/protagonists/koffi-tisserand.jpg',
      buyerProtagonistId: 'koffi-tisserand',
      buyerRole: 'Tisserand traditionnel (Porto-Novo)',
      posterUrl: '/assets/posters/investors-builders.png'
    }
  ]);

  // Index de la série active affichée en plein écran dans "Mes parts"
  const [activeIndex, setActiveIndex] = useState(0);

  // Index de la vente active dans "Historique"
  const [historyActiveIndex, setHistoryActiveIndex] = useState(0);

  // Toast temporaire d'action
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modale rapide pour vendre des parts
  const [isQuickSellOpen, setIsQuickSellOpen] = useState(false);
  const [sellSharesCount, setSellSharesCount] = useState(1);
  const [customSalePrice, setCustomSalePrice] = useState(55);

  const currentProd = productions[activeIndex];

  // Gestion du swipe tactile horizontal
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (currentTab === 'history') {
      if (isLeftSwipe && historyActiveIndex < transactions.length - 1) {
        setHistoryActiveIndex(prev => prev + 1);
      }
      if (isRightSwipe && historyActiveIndex > 0) {
        setHistoryActiveIndex(prev => prev - 1);
      }
    } else {
      if (isLeftSwipe && activeIndex < productions.length - 1) {
        setActiveIndex(prev => prev + 1);
      }
      if (isRightSwipe && activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Synchroniser le prix et le nombre quand on change de série
  useEffect(() => {
    if (currentProd) {
      setSellSharesCount(currentProd.sharesOnSale > 0 ? currentProd.sharesOnSale : 1);
      setCustomSalePrice(currentProd.salePrice || currentProd.recommendedPrice || 50);
    }
  }, [activeIndex]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Valider la mise en vente personnalisée
  const handleSaveSellConfig = () => {
    if (!currentProd) return;
    setProductions(prev => prev.map((p, idx) => idx === activeIndex ? {
      ...p,
      sharesOnSale: sellSharesCount,
      salePrice: customSalePrice
    } : p));
    setIsQuickSellOpen(false);
    showToast(`${sellSharesCount} part(s) proposée(s) à la vente à ${customSalePrice} €.`);
  };

  // Métriques de la série courante
  const startUnitPrice = currentProd?.startPrice || 35;
  const currentUnitPrice = currentProd?.salePrice || startUnitPrice;
  const gainPerShare = currentUnitPrice - startUnitPrice;
  const gainPercent = Math.round((gainPerShare / startUnitPrice) * 100);
  const isHighDemand = (currentProd?.growthRatePercent || 0) >= 18;

  // Transaction active pour la page d'historique
  const activeTx = transactions[historyActiveIndex] || transactions[0];
  const txGainPercent = activeTx ? Math.round(((activeTx.soldPriceUnit - activeTx.boughtPriceUnit) / activeTx.boughtPriceUnit) * 100) : 0;

  const handleReturnToProfile = () => {
    onNavigate({ 
      type: 'profile', 
      returnToDuoId, 
      returnToDuoIndex, 
      returnToDocId 
    });
  };

  const handleBuyerClick = (buyerProtagonistId?: string) => {
    if (buyerProtagonistId) {
      onNavigate({
        type: 'protagonist_profile',
        protagonistId: buyerProtagonistId,
        returnToDuoId,
        returnToDuoIndex,
        returnToDocId
      });
    }
  };

  return (
    <div 
      className="relative w-full h-[100dvh] bg-white text-[#1C1917] flex flex-col overflow-hidden select-none font-sans"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Toast de confirmation */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#1C1917] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. EN-TÊTE ÉPURÉ COMME MESSAGERIE (Flèche retour + Options Parts & Historique) */}
      {/* ========================================================================= */}
      <header className="relative z-30 flex items-center justify-between px-3 sm:px-6 py-2.5 bg-white border-b border-[#E7E5E4] shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReturnToProfile}
            className="p-2 rounded-full bg-white hover:bg-[#FAFAF9] border border-[#E7E5E4] text-[#8B6845] hover:text-[#1C1917] transition-colors cursor-pointer shadow-xs active:scale-95"
            title="Retour au profil"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <h1 className="font-editorial text-xl sm:text-2xl font-bold text-[#1C1917] leading-none">
            {currentTab === 'shares' ? 'Parts' : 'Historique'}
          </h1>
        </div>

        {/* Côté droit : Navigation entre Parts et Historique dans la même police et même taille */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setCurrentTab('shares')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'shares'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            Parts
          </button>
          <button
            type="button"
            onClick={() => setCurrentTab('history')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              currentTab === 'history'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            Historique
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CONTENU PRINCIPAL                                                      */}
      {/* ========================================================================= */}
      {currentTab === 'shares' ? (
        /* ======================================================================= */
        /* VUE : MES PARTS                                                         */
        /* ======================================================================= */
        <main className="relative flex-1 w-full h-full flex flex-col justify-between overflow-hidden bg-stone-900 pb-24 sm:pb-28">
          {/* Affiche de fond cinéma plein écran */}
          <div className="absolute inset-0 z-0">
            <img
              src={currentProd?.posterUrl}
              alt={currentProd?.seriesTitle}
              className="w-full h-full object-cover select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/60 pointer-events-none" />
          </div>

          {/* Flèches de navigation gauche / droite */}
          {activeIndex > 0 && (
            <button
              type="button"
              onClick={() => setActiveIndex(prev => prev - 1)}
              className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer active:scale-90 shadow-lg"
              title="Série précédente"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {activeIndex < productions.length - 1 && (
            <button
              type="button"
              onClick={() => setActiveIndex(prev => prev + 1)}
              className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer active:scale-90 shadow-lg"
              title="Série suivante"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* HAUT DU VISUEL : Titre de la série + Audience */}
          <div className="relative z-10 px-4 sm:px-8 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 max-w-3xl mx-auto">
              <div>
                <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {currentProd?.seriesTitle}
                </h2>
              </div>

              {/* Signal d'Audience & Croissance (sans icône devant le pourcentage) */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-2xl shrink-0 self-start sm:self-auto">
                <Eye className="w-4 h-4 text-white" />
                <div className="text-left">
                  <span className="text-[10px] text-white/70 block uppercase leading-none">Audience</span>
                  <span className="font-mono font-bold text-white text-xs sm:text-sm">
                    {currentProd?.viewsCount ? (currentProd.viewsCount / 1000).toFixed(1) + ' k spectateurs' : '30 k'}
                  </span>
                </div>
                <div className="ml-2 pl-2 border-l border-white/20">
                  <span className="text-xs font-bold text-emerald-400">
                    +{currentProd?.growthRatePercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CENTRE : Les 3 blocs clés + LIGNE HARMONIEUSE (Parts détenues, parts en vente, bouton Vendre) */}
          <div className="relative z-10 px-4 sm:px-8 py-2 my-auto">
            <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3.5">
                {/* 1. Acheté à l'origine */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between shadow-lg">
                  <div className="space-y-0.5">
                    <span className="text-[10px] sm:text-[10.5px] text-white/70 uppercase tracking-wider block font-semibold">
                      Acheté à l'origine
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-xl sm:text-2xl font-bold text-white">
                        {startUnitPrice} €
                      </span>
                      <span className="text-[10px] text-white/60">/ part</span>
                    </div>
                    <span className="text-[10px] text-white/50 block">
                      Total : {currentProd?.sharesCount * startUnitPrice} €
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white/80">
                    <Coins className="w-4 h-4 text-stone-300" />
                  </div>
                </div>

                {/* 2. Valeur aujourd'hui */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-white/20 flex items-center justify-between shadow-xl">
                  <div className="space-y-0.5 text-white">
                    <span className="text-[10px] sm:text-[10.5px] text-white/80 uppercase tracking-wider block font-semibold">
                      Valeur aujourd'hui
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-xl sm:text-2xl font-black text-white">
                        {currentUnitPrice} €
                      </span>
                      <span className="text-[10px] text-white/80">/ part</span>
                    </div>
                    <span className="text-[10.5px] font-bold text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{gainPerShare} € (+{gainPercent}%)
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>

                {/* 3. Tendance */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between shadow-lg">
                  <div className="space-y-0.5">
                    <span className="text-[10px] sm:text-[10.5px] text-white/70 uppercase tracking-wider block font-semibold">
                      Tendance
                    </span>
                    <span className="text-xs sm:text-sm font-bold block text-emerald-400">
                      {isHighDemand ? 'Forte demande' : 'Série en croissance'}
                    </span>
                    <span className="text-[10px] text-white/60 block">
                      Prix conseillé : <span className="font-mono font-bold text-white">{currentProd?.recommendedPrice} €</span>
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-stone-300">
                    <Coins className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* LIGNE HARMONIEUSE : Nombre de parts détenues, en vente, et bouton Vendre des parts sur la même ligne */}
              <div className="pt-2">
                <div className="bg-black/75 backdrop-blur-md border border-white/20 p-2 sm:p-2.5 rounded-2xl flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-4 pl-2 text-xs text-white">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm sm:text-base font-mono">{currentProd?.sharesCount}</span>
                      <span className="text-white/70">parts détenues</span>
                    </div>

                    {(currentProd?.sharesOnSale || 0) > 0 && (
                      <>
                        <span className="text-white/30">•</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm sm:text-base font-mono text-emerald-400">{currentProd?.sharesOnSale}</span>
                          <span className="text-emerald-300">en vente</span>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsQuickSellOpen(true)}
                    className="h-10 sm:h-11 px-4 sm:px-5 rounded-xl bg-white hover:bg-stone-100 text-[#1C1917] font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer shadow-md active:scale-95 flex items-center justify-center gap-2 shrink-0"
                  >
                    <span>Vendre des parts</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </main>
      ) : (
        /* ======================================================================= */
        /* VUE : HISTORIQUE PLEIN ÉCRAN CINÉMA                                     */
        /* ======================================================================= */
        <main className="relative flex-1 w-full h-full flex flex-col justify-between overflow-hidden bg-black text-white pb-24 sm:pb-28">
          {/* Affiche de fond cinéma de la vente sélectionnée */}
          <div className="absolute inset-0 z-0">
            <img
              src={activeTx.posterUrl}
              alt={activeTx.seriesTitle}
              className="w-full h-full object-cover opacity-85 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/75 pointer-events-none" />
          </div>

          {/* Flèches de navigation gauche / droite dans l'historique */}
          {historyActiveIndex > 0 && (
            <button
              type="button"
              onClick={() => setHistoryActiveIndex(prev => prev - 1)}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center backdrop-blur-md cursor-pointer transition-all active:scale-90 shadow-lg"
              title="Vente précédente"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {historyActiveIndex < transactions.length - 1 && (
            <button
              type="button"
              onClick={() => setHistoryActiveIndex(prev => prev + 1)}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center backdrop-blur-md cursor-pointer transition-all active:scale-90 shadow-lg"
              title="Vente suivante"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Contenu central de la vente */}
          <div className="relative z-20 px-4 sm:px-8 py-3 my-auto max-w-2xl mx-auto w-full space-y-4 text-center">
            
            {/* Titre et Date */}
            <div className="space-y-1">
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {activeTx.seriesTitle}
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-xs text-white/80 font-medium">
                <Calendar className="w-3.5 h-3.5 text-stone-300" />
                <span>{activeTx.date}</span>
              </div>
            </div>

            {/* Vignette cliquable de la personne qui a acquis les parts */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => handleBuyerClick(activeTx.buyerProtagonistId)}
                className="group flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 transition-all cursor-pointer active:scale-95 shadow-xl text-left"
                title={`Voir le profil de ${activeTx.buyerName}`}
              >
                <img
                  src={activeTx.buyerPhoto}
                  alt={activeTx.buyerName}
                  className="w-10 h-10 rounded-full object-cover border border-white/30 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div>
                  <span className="text-[10px] text-white/60 block uppercase font-medium">Acquis par</span>
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors block">
                    {activeTx.buyerName}
                  </span>
                  {activeTx.buyerRole && (
                    <span className="text-[10px] text-white/70 block truncate max-w-[220px]">
                      {activeTx.buyerRole}
                    </span>
                  )}
                </div>
              </button>
            </div>

            {/* Gros Macaron du Gain Net Encaissé */}
            <div className="p-5 sm:p-6 rounded-3xl bg-black/75 backdrop-blur-md border border-white/20 shadow-2xl space-y-3">
              <span className="text-xs sm:text-sm text-white/70 uppercase tracking-widest font-bold block">
                Gain net encaissé dans votre coffre
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-4xl sm:text-6xl font-black text-emerald-400 drop-shadow-md">
                  +{activeTx.netGain} €
                </span>
                <span className="text-sm font-bold text-emerald-300">
                  (+{txGainPercent}%)
                </span>
              </div>

              {/* Comparaison Acheté vs Vendu */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/15 text-left">
                <div className="p-3 rounded-2xl bg-white/10 border border-white/10 space-y-0.5">
                  <span className="text-[10px] text-white/60 uppercase font-semibold block">Ce que vous aviez payé</span>
                  <span className="font-mono text-lg sm:text-xl font-bold text-white block">
                    {activeTx.totalBought} €
                  </span>
                  <span className="text-[10px] text-white/50 block">
                    {activeTx.sharesSold} part(s) à {activeTx.boughtPriceUnit} €
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/10 border border-white/20 space-y-0.5">
                  <span className="text-[10px] text-white/80 uppercase font-bold block">Ce que vous avez perçu</span>
                  <span className="font-mono text-lg sm:text-xl font-black text-white block">
                    {activeTx.totalSold} €
                  </span>
                  <span className="text-[10px] text-white/70 block">
                    {activeTx.sharesSold} part(s) vendue(s) à {activeTx.soldPriceUnit} €
                  </span>
                </div>
              </div>
            </div>

          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 3. MODALE DE VENTE (« Proposer des parts à l’achat »)                      */}
      {/* ========================================================================= */}
      {isQuickSellOpen && currentProd && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white max-w-md w-full rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-stone-200 space-y-4 animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-editorial text-base sm:text-lg font-bold text-[#1C1917]">
                Proposer des parts à l’achat
              </h3>
              <button 
                onClick={() => setIsQuickSellOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Choisissez combien de parts de <span className="font-bold text-[#1C1917]">{currentProd.seriesTitle}</span> vous souhaitez proposer à la vente.
            </p>

            {/* Sélecteur de quantité */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="text-stone-700 font-bold text-xs block">Nombre de parts à proposer :</span>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSellSharesCount(Math.max(1, sellSharesCount - 1))}
                  className="w-11 h-11 rounded-xl bg-white border border-stone-300 text-[#1C1917] flex items-center justify-center font-bold text-xl active:scale-90 transition-transform cursor-pointer shadow-xs"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="text-center">
                  <span className="font-mono text-2xl font-black text-[#1C1917]">{sellSharesCount}</span>
                  <span className="text-[10px] text-stone-400 block">sur {currentProd.sharesCount} détenues</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSellSharesCount(Math.min(currentProd.sharesCount, sellSharesCount + 1))}
                  className="w-11 h-11 rounded-xl bg-white border border-stone-300 text-[#1C1917] flex items-center justify-center font-bold text-xl active:scale-90 transition-transform cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Prix de vente unitaire */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-stone-700 font-bold text-xs">Prix par part :</span>
                <span className="text-[11px] text-stone-500">Conseillé : {currentProd.recommendedPrice} €</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={customSalePrice}
                  onChange={(e) => setCustomSalePrice(Number(e.target.value))}
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-sm font-mono font-bold bg-white text-[#1C1917]"
                />
                <span className="font-bold text-sm text-stone-600">€</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <span>Total si vendu :</span>
                <span className="font-mono font-bold text-[#1C1917] text-sm">
                  {sellSharesCount * customSalePrice} €
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleSaveSellConfig}
                className="flex-1 h-12 rounded-xl bg-[#1C1917] hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Confirmer</span>
              </button>
              <button
                type="button"
                onClick={() => setIsQuickSellOpen(false)}
                className="px-4 h-12 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
