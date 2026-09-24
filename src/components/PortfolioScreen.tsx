import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
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
import { CoproduireRingsIcon } from './YonywoodBrandIcons';

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

  // Liste des séries coproduites avec affiches officielles vérifiées
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
      posterUrl: '/assets/posters/dixeat-fiat-luxe.png'
    },
    {
      id: 'prod-5',
      seriesId: 'investors-builders',
      seriesTitle: 'Investors < > Builders',
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
      posterUrl: '/investors-builders.png'
    }
  ]);

  // Historique des cessions / ventes passées avec affiches officielles
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
      seriesTitle: 'Investors < > Builders',
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
      posterUrl: '/investors-builders.png'
    }
  ]);

  // Index de la série active
  const [activeIndex, setActiveIndex] = useState(0);

  // Index de la transaction active dans "Historique"
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
      className="relative min-h-screen bg-white text-[#1C1917] flex flex-col font-sans select-none pb-28 sm:pb-32"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Toast de confirmation */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#1C1917] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. EN-TÊTE ÉPURÉ (Chevron unifié + Onglets avec Terre Cuite au survol & actif) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6 py-3 bg-white/95 backdrop-blur-md border-b border-[#E7E5E4] shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReturnToProfile}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-[#1C1917] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
            title="Retour au profil"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>

          <h1 className="font-editorial text-xl sm:text-2xl font-bold text-[#1C1917] leading-none">
            {currentTab === 'shares' ? 'Mes parts' : 'Historique'}
          </h1>
        </div>

        {/* Côté droit : Navigation entre Parts et Historique */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setCurrentTab('shares')}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
              currentTab === 'shares'
                ? 'bg-[#A2482B] text-white border-[#A2482B] shadow-xs'
                : 'bg-white text-[#1C1917] border-stone-200 hover:bg-[#A2482B] hover:text-white hover:border-[#A2482B]'
            }`}
          >
            Parts
          </button>
          <button
            type="button"
            onClick={() => setCurrentTab('history')}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
              currentTab === 'history'
                ? 'bg-[#A2482B] text-white border-[#A2482B] shadow-xs'
                : 'bg-white text-[#1C1917] border-stone-200 hover:bg-[#A2482B] hover:text-white hover:border-[#A2482B]'
            }`}
          >
            Historique
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CONTENU PRINCIPAL (Au-dessus de la barre de navigation, aéré et clair)   */}
      {/* ========================================================================= */}
      {currentTab === 'shares' ? (
        /* ======================================================================= */
        /* VUE : MES PARTS EN SPLIT-SCREEN (Affiche à gauche, Données à droite)    */
        /* ======================================================================= */
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
            
            {/* ------------------------------------------------------------------- */}
            {/* CÔTÉ GAUCHE : AFFICHE OFFICIELLE VERTICALE (Avec chevrons & swipe)  */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[9/13.5] rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100 group select-none">
                
                {/* Affiche officielle de la série */}
                <img
                  src={currentProd?.posterUrl}
                  alt={currentProd?.seriesTitle}
                  className="w-full h-full object-cover"
                />

                {/* Voile dégradé subtil pour la lisibilité du titre */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/55 pointer-events-none" />

                {/* Titre de la série en haut à gauche */}
                <div className="absolute top-3.5 left-3.5 z-20 max-w-[85%]">
                  <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white font-editorial text-xs sm:text-sm font-bold border border-white/20 shadow-md truncate">
                    {currentProd?.seriesTitle}
                  </div>
                </div>

                {/* Badge d'état en haut à droite */}
                <div className="absolute top-3.5 right-3.5 z-20">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
                    {currentProd?.status}
                  </span>
                </div>

                {/* Flèche navigation gauche sur l'affiche */}
                {activeIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(prev => prev - 1)}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/25 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer active:scale-90 shadow-lg"
                    title="Série précédente"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
                  </button>
                )}

                {/* Flèche navigation droite sur l'affiche */}
                {activeIndex < productions.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(prev => prev + 1)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/25 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer active:scale-90 shadow-lg"
                    title="Série suivante"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.2]" />
                  </button>
                )}

              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* CÔTÉ DROIT : FICHE CLAIRE, ÉPURÉE ET DÉTAILLÉE                       */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-3.5 sm:space-y-4">
              
              {/* Titre & Statut */}
              <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-stone-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A2482B] block">
                    Coproduction active
                  </span>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                    {currentProd?.seriesTitle}
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  {currentProd?.status}
                </span>
              </div>

              {/* 1. AUDIENCE */}
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 shadow-2xs">
                    <Eye className="w-4 h-4 text-[#A2482B]" />
                  </div>
                  <div>
                    <span className="text-[10.5px] uppercase font-bold tracking-wider text-stone-500 block">
                      Audience cumulée
                    </span>
                    <span className="font-mono text-base sm:text-lg font-bold text-stone-900">
                      {currentProd?.viewsCount ? (currentProd.viewsCount / 1000).toFixed(1) + ' k spectateurs' : '30 k'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs sm:text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 font-mono">
                    +{currentProd?.growthRatePercent}%
                  </span>
                </div>
              </div>

              {/* 2. PRIX D'ACHAT & 3. VALEUR AUJOURD'HUI (Grille côte à côte) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Prix d'achat à l'origine */}
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1">
                  <span className="text-[10.5px] uppercase font-bold tracking-wider text-stone-500 block">
                    Prix d'achat à l'origine
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-stone-900">
                      {startUnitPrice} €
                    </span>
                    <span className="text-[11px] text-stone-400">/ part</span>
                  </div>
                  <span className="text-[11px] text-stone-500 block">
                    Total investi : <strong className="text-stone-700 font-mono">{currentProd?.sharesCount * startUnitPrice} €</strong>
                  </span>
                </div>

                {/* Valeur aujourd'hui */}
                <div className="p-3 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-1">
                  <span className="text-[10.5px] uppercase font-bold tracking-wider text-amber-900/80 block">
                    Valeur aujourd'hui
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-stone-900">
                      {currentUnitPrice} €
                    </span>
                    <span className="text-[11px] text-stone-400">/ part</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 font-mono">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +{gainPerShare} € (+{gainPercent}%)
                  </span>
                </div>
              </div>

              {/* 4. TENDANCE & PRIX CONSEILLÉ */}
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 flex items-center justify-between">
                <div>
                  <span className="text-[10.5px] uppercase font-bold tracking-wider text-stone-500 block">
                    Tendance du marché
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-stone-800 block mt-0.5">
                    Progression régulière
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block">Prix conseillé</span>
                  <span className="font-mono font-bold text-sm text-[#A2482B]">
                    {currentProd?.recommendedPrice} €
                  </span>
                </div>
              </div>

              {/* 5. NOMBRE DE PARTS DÉTENUES */}
              <div className="p-3 rounded-2xl bg-stone-100/70 border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[10.5px] uppercase font-bold tracking-wider text-stone-500 block">
                    Votre portefeuille
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-xl sm:text-2xl font-black text-stone-900">
                      {currentProd?.sharesCount}
                    </span>
                    <span className="text-xs font-semibold text-stone-700">parts détenues</span>
                  </div>
                </div>

                {(currentProd?.sharesOnSale || 0) > 0 ? (
                  <div className="text-right px-3 py-1 rounded-xl bg-amber-100/60 border border-amber-300/50">
                    <span className="text-[10px] text-amber-800 font-bold block uppercase">En vente</span>
                    <span className="font-mono font-bold text-xs text-amber-900">
                      {currentProd?.sharesOnSale} part(s) à {currentProd?.salePrice} €
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-stone-400 italic">Aucune part en vente</span>
                )}
              </div>

              {/* 6. BOUTON D'ACTION AVEC L'ICÔNE OFFICIELLE DE COPRODUCTION (Anneaux Yonywood) */}
              <div className="pt-1.5">
                <button
                  type="button"
                  onClick={() => setIsQuickSellOpen(true)}
                  className="w-full h-11 sm:h-12 rounded-2xl bg-[#A2482B] hover:bg-[#8B3A20] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <CoproduireRingsIcon className="w-5 h-5 text-white" />
                  <span>Vendre des parts</span>
                </button>
              </div>

            </div>

          </div>
        </main>
      ) : (
        /* ======================================================================= */
        /* VUE : HISTORIQUE DES TRANSACTIONS (Affiche à gauche, Données à droite)  */
        /* ======================================================================= */
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
            
            {/* CÔTÉ GAUCHE : AFFICHE VERTICALE DE LA SÉRIE CÉDÉE */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[9/13.5] rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100 group select-none">
                <img
                  src={activeTx.posterUrl}
                  alt={activeTx.seriesTitle}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/55 pointer-events-none" />

                <div className="absolute top-3.5 left-3.5 z-20 max-w-[85%]">
                  <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white font-editorial text-xs sm:text-sm font-bold border border-white/20 shadow-md truncate">
                    {activeTx.seriesTitle}
                  </div>
                </div>

                {/* Flèche transaction précédente */}
                {historyActiveIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => setHistoryActiveIndex(prev => prev - 1)}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/25 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer active:scale-90 shadow-lg"
                    title="Cession précédente"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
                  </button>
                )}

                {/* Flèche transaction suivante */}
                {historyActiveIndex < transactions.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setHistoryActiveIndex(prev => prev + 1)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/25 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer active:scale-90 shadow-lg"
                    title="Cession suivante"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.2]" />
                  </button>
                )}
              </div>
            </div>

            {/* CÔTÉ DROIT : INFORMATIONS & ACQUÉREUR */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4 sm:space-y-5">
              
              {/* Titre et Date avec espace aéré */}
              <div className="pb-3 border-b border-stone-100">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                  {activeTx.seriesTitle}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-2 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>Cédé le {activeTx.date}</span>
                </div>
              </div>

              {/* 1. ACQUÉREUR DES PARTS (Remonté tout en haut) */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2.5">
                <span className="text-[10.5px] uppercase font-bold tracking-wider text-stone-500 block">
                  Acquéreur des parts
                </span>

                <button
                  type="button"
                  onClick={() => handleBuyerClick(activeTx.buyerProtagonistId)}
                  className="w-full flex items-center gap-3.5 p-3 rounded-2xl bg-white hover:bg-stone-100 border border-stone-200 transition-all cursor-pointer text-left shadow-2xs group"
                >
                  <img
                    src={activeTx.buyerPhoto}
                    alt={activeTx.buyerName}
                    className="w-12 h-12 rounded-full object-cover border border-stone-300 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#A2482B] transition-colors block truncate">
                      {activeTx.buyerName}
                    </span>
                    {activeTx.buyerRole && (
                      <span className="text-[11px] text-stone-500 block truncate">
                        {activeTx.buyerRole}
                      </span>
                    )}
                    <span className="text-[10px] text-[#A2482B] font-semibold block mt-0.5">
                      Voir le profil →
                    </span>
                  </div>
                </button>

                <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1">
                  <span>Volume cédé :</span>
                  <span className="font-mono font-bold text-stone-800">{activeTx.sharesSold} part(s)</span>
                </div>
              </div>

              {/* 2. BILAN FINANCIER & GAIN NET */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-3">
                <span className="text-[10.5px] uppercase font-bold tracking-wider text-emerald-800 block">
                  Gain net encaissé
                </span>

                <div className="text-center py-1">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="font-mono text-3xl sm:text-4xl font-black text-emerald-700">
                      +{activeTx.netGain} €
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-600 font-mono">
                      (+{txGainPercent}%)
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700/80 block mt-1">
                    Directement reversé dans votre coffre
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200/50 text-xs">
                  <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-[10px] text-stone-500 block">Prix d'achat :</span>
                    <span className="font-mono font-bold text-stone-800">{activeTx.totalBought} €</span>
                    <span className="text-[9.5px] text-stone-400 block font-mono">{activeTx.boughtPriceUnit} € / part</span>
                  </div>

                  <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-[10px] text-stone-500 block">Prix de cession :</span>
                    <span className="font-mono font-bold text-emerald-700">{activeTx.totalSold} €</span>
                    <span className="text-[9.5px] text-stone-400 block font-mono">{activeTx.soldPriceUnit} € / part</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 3. MODALE DE VENTE CLAIRE (« Proposer des parts à la vente »)              */}
      {/* ========================================================================= */}
      {isQuickSellOpen && currentProd && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white max-w-md w-full rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-stone-200 space-y-4 animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div>
                <h3 className="font-editorial text-base sm:text-lg font-bold text-stone-900">
                  Proposer des parts à la vente
                </h3>
                <p className="text-[11px] text-stone-500">
                  {currentProd.seriesTitle}
                </p>
              </div>
              <button 
                onClick={() => setIsQuickSellOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Fixez le nombre de parts et le prix unitaire auquel vous souhaitez les céder sur la bourse des coproductions.
            </p>

            {/* Sélecteur de quantité */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="text-stone-700 font-bold text-xs block">Nombre de parts à proposer :</span>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSellSharesCount(Math.max(1, sellSharesCount - 1))}
                  className="w-11 h-11 rounded-xl bg-white border border-stone-300 text-stone-800 flex items-center justify-center font-bold text-xl active:scale-90 transition-transform cursor-pointer shadow-xs"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="text-center">
                  <span className="font-mono text-2xl font-black text-stone-900">{sellSharesCount}</span>
                  <span className="text-[10px] text-stone-400 block">sur {currentProd.sharesCount} détenues</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSellSharesCount(Math.min(currentProd.sharesCount, sellSharesCount + 1))}
                  className="w-11 h-11 rounded-xl bg-white border border-stone-300 text-stone-800 flex items-center justify-center font-bold text-xl active:scale-90 transition-transform cursor-pointer shadow-xs"
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
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-sm font-mono font-bold bg-white text-stone-900 focus:outline-none focus:border-[#A2482B]"
                />
                <span className="font-bold text-sm text-stone-600">€</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <span>Total si vendu :</span>
                <span className="font-mono font-bold text-stone-900 text-sm">
                  {sellSharesCount * customSalePrice} €
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleSaveSellConfig}
                className="flex-1 h-12 rounded-xl bg-[#A2482B] hover:bg-[#8B3A20] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Confirmer la mise en vente</span>
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
