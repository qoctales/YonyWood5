import React, { useState, useRef, useEffect } from 'react';
import { 
  Coins, 
  Play, 
  Pause, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { ViewScreen } from '../types';

interface MarketplaceScreenProps {
  onNavigate: (screen: ViewScreen) => void;
}

interface ProductionPoster {
  id: string;
  title: string;
  posterImage: string;
  videoPreviewUrl: string;
  sharePrice: number;
}

interface PeerOffer {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerPhoto: string;
  seriesTitle: string;
  posterImage: string;
  videoPreviewUrl: string;
  sharesCount: number;
  unitPrice: number;
}

const PRODUCTIONS: ProductionPoster[] = [
  {
    id: 'jesus-legba',
    title: 'Jésus < > Èṣù',
    posterImage: '/assets/posters/jesus-esu.png',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    sharePrice: 45
  },
  {
    id: 'finagnon-qosqorico',
    title: 'Finagnon < > Qosqorico',
    posterImage: '/assets/posters/finagnon-qosqorico.png',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    sharePrice: 60
  },
  {
    id: 'blacks-one-beyond-eve',
    title: 'Blacks One < > Beyond Eve',
    posterImage: '/assets/posters/blacks-one-beyond-eve.png',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    sharePrice: 50
  },
  {
    id: 'dixeat-fiat-luxe',
    title: 'Dixeat < > Fiat Luxe',
    posterImage: '/assets/posters/dixeat-fiat-luxe.png',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    sharePrice: 65
  },
  {
    id: 'investors-builders',
    title: 'Investors < > Builders',
    posterImage: '/investors-builders.png',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    sharePrice: 70
  }
];

const INITIAL_PEER_OFFERS: PeerOffer[] = [
  {
    id: 'peer-1',
    sellerId: 'koffi-tisserand',
    sellerName: 'Koffi',
    sellerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    seriesTitle: 'Jésus < > Èṣù',
    posterImage: '/assets/posters/jesus-esu.png',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    sharesCount: 3,
    unitPrice: 55
  },
  {
    id: 'peer-2',
    sellerId: 'koffi-tisserand',
    sellerName: 'Nadia',
    sellerPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    seriesTitle: 'Finagnon < > Qosqorico',
    posterImage: '/assets/posters/finagnon-qosqorico.png',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    sharesCount: 5,
    unitPrice: 52
  },
  {
    id: 'peer-3',
    sellerId: 'koffi-tisserand',
    sellerName: 'Marcel',
    sellerPhoto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    seriesTitle: 'Blacks One < > Beyond Eve',
    posterImage: '/assets/posters/blacks-one-beyond-eve.png',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    sharesCount: 2,
    unitPrice: 72
  },
  {
    id: 'peer-4',
    sellerId: 'koffi-tisserand',
    sellerName: 'Amina',
    sellerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    seriesTitle: 'Dixeat < > Fiat Luxe',
    posterImage: '/assets/posters/dixeat-fiat-luxe.png',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    sharesCount: 4,
    unitPrice: 62
  },
  {
    id: 'peer-5',
    sellerId: 'koffi-tisserand',
    sellerName: 'Benoît',
    sellerPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    seriesTitle: 'Investors < > Builders',
    posterImage: '/investors-builders.png',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    sharesCount: 3,
    unitPrice: 68
  }
];

export const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'coproduire' | 'marche'>('coproduire');

  // Indexes
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [marketIndex, setMarketIndex] = useState<number>(0);
  const [peerOffers, setPeerOffers] = useState<PeerOffer[]>(INITIAL_PEER_OFFERS);

  // Modal d'achat
  const [selectedProduction, setSelectedProduction] = useState<ProductionPoster | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState<number>(1);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Touch & Mouse horizontal gesture support (calqué exactement sur SubmitStoryScreen)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const minSwipeDistance = 45;

  const currentProd = PRODUCTIONS[currentIndex];
  const currentOffer = peerOffers[marketIndex] || peerOffers[0];

  useEffect(() => {
    setIsPlaying(false);
  }, [currentIndex, marketIndex, activeTab]);

  const handleNext = () => {
    if (activeTab === 'coproduire') {
      setCurrentIndex(prev => (prev + 1) % PRODUCTIONS.length);
    } else {
      if (peerOffers.length > 0) {
        setMarketIndex(prev => (prev + 1) % peerOffers.length);
      }
    }
  };

  const handlePrev = () => {
    if (activeTab === 'coproduire') {
      setCurrentIndex(prev => (prev - 1 + PRODUCTIONS.length) % PRODUCTIONS.length);
    } else {
      if (peerOffers.length > 0) {
        setMarketIndex(prev => (prev - 1 + peerOffers.length) % peerOffers.length);
      }
    }
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    if (touchStartX !== null) {
      const diff = e.targetTouches[0].clientX - touchStartX;
      setSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
    }
  };

  const onTouchEnd = () => {
    setSwipeOffset(0);
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  // Mouse drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, video')) return;
    setIsMouseDown(true);
    setMouseStartX(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || mouseStartX === null) return;
    const diff = e.clientX - mouseStartX;
    setSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    setIsMouseDown(false);
    setSwipeOffset(0);
    if (mouseStartX === null) return;
    const distance = mouseStartX - e.clientX;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setMouseStartX(null);
  };

  const toggleVideoPlayback = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying(prev => !prev);
  };

  const handleBuyOfficialShares = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduction) return;
    const total = purchaseQuantity * selectedProduction.sharePrice;
    setSuccessToast(`Vous avez acquis ${purchaseQuantity} part(s) pour « ${selectedProduction.title} » (${total} €).`);
    setSelectedProduction(null);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleBuyPeerOffer = (offer: PeerOffer) => {
    const total = offer.sharesCount * offer.unitPrice;
    setSuccessToast(`Achat réussi ! Vous avez racheté les ${offer.sharesCount} part(s) de ${offer.sellerName} pour « ${offer.seriesTitle} » (${total} €).`);
    setPeerOffers(prev => {
      const updated = prev.filter(item => item.id !== offer.id);
      if (marketIndex >= updated.length) {
        setMarketIndex(Math.max(0, updated.length - 1));
      }
      return updated;
    });
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-28 pt-safe pb-safe min-h-[100dvh] space-y-6 text-[#1C1917]">
      
      {/* ========================================================================= */}
      {/* HEADER DISCRET & SÉLECTEUR AU MÊME ENDROIT QUE 1 2 3 DE PROPOSER         */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
        <div>
          <h1 className="font-editorial text-xl sm:text-2xl font-bold text-[#1C1917]">
            Productions
          </h1>
        </div>

        {/* Boutons d'onglets Coproduire / Marché avec fond terre cuite signature */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('coproduire')}
            id="tab-coproduire"
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'coproduire'
                ? 'bg-[#A2482B] text-white shadow-sm shadow-[#A2482B]/30 ring-1 ring-[#C89B3C]/40'
                : 'bg-[#E7E5E4] text-[#7A756B] hover:text-[#1C1917]'
            }`}
          >
            Coproduire
          </button>

          <button
            onClick={() => setActiveTab('marche')}
            id="tab-marche"
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'marche'
                ? 'bg-[#A2482B] text-white shadow-sm shadow-[#A2482B]/30 ring-1 ring-[#C89B3C]/40'
                : 'bg-[#E7E5E4] text-[#7A756B] hover:text-[#1C1917]'
            }`}
          >
            Marché
          </button>
        </div>
      </div>

      {/* TOAST SUCCÈS LUDIQUE */}
      {successToast && (
        <div className="fixed top-14 z-50 max-w-sm mx-auto px-4 py-2.5 rounded-2xl bg-[#1C1917] text-white text-xs font-semibold flex items-center gap-2 shadow-xl animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PANNEAU UNIQUE AVEC SWIPE (EXACTEMENT COMME SUR PROPOSER UNE HISTOIRE)    */}
      {/* SANS AUCUN BOUTON NI POINT DE NAVIGATION EN DESSOUS                      */}
      {/* ========================================================================= */}
      <div className="space-y-4 animate-in fade-in duration-200">
        
        {/* Conteneur de l'écran unique avec swipe et navigation fléchée latérale */}
        <div className="relative flex items-center justify-center py-2">
          
          {/* Flèche Gauche (Navigation rapide latérale) */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-0 lg:-left-12 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-[#C89B3C] text-[#1C1917] hover:text-white border border-[#E7E5E4] shadow-lg items-center justify-center transition-all cursor-pointer transform hover:scale-105"
            title="Précédent"
            id="prev-poster-btn"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* CARTE UNIQUE FORMAT VIDÉO VERTICAL 9:16 AVEC SUPPORT DU SWIPE */}
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            className="w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] transition-transform duration-150 ease-out select-none cursor-grab active:cursor-grabbing"
            style={{ transform: `translateX(${swipeOffset}px)` }}
          >
            {/* =================================================================== */}
            {/* VUE A : COPRODUIRE                                                 */}
            {/* =================================================================== */}
            {activeTab === 'coproduire' && currentProd && (
              <div 
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('button, a, input, textarea')) {
                    return;
                  }
                  toggleVideoPlayback();
                }}
                className="group relative w-full h-full rounded-[2rem] sm:rounded-3xl overflow-hidden bg-[#1C1917] text-[#FFFFFF] shadow-2xl border border-[#E7E5E4]/50 flex flex-col justify-between p-5 sm:p-6 cursor-pointer"
                id={`card-coproduire-${currentProd.id}`}
              >
                {/* 1. Média de fond : Affiche officielle par défaut OU Vidéo si lecture activée */}
                {isPlaying ? (
                  <video
                    ref={videoRef}
                    src={currentProd.videoPreviewUrl}
                    poster={currentProd.posterImage}
                    autoPlay
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={currentProd.posterImage}
                    alt={currentProd.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 pointer-events-none"
                  />
                )}

                {/* Voile cinématographique clair pour préserver l'éclat de l'affiche */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                {/* HAUT : Badge du titre de la série à gauche */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold tracking-widest text-white shadow-sm max-w-full leading-relaxed">
                    {currentProd.title}
                  </span>
                </div>

                {/* CENTRE : Icône vidéo de lecture centrée quand la vidéo est en pause */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white/90 shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white text-white translate-x-0.5 opacity-90" />
                    </div>
                  </div>
                )}

                {/* CENTRE LIBÉRÉ : Affiche visible et sans encombrement */}
                <div className="my-auto" />

                {/* BAS : Prix de la part à gauche et bouton d'action Coproduire à droite */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  {/* Prix de la part en dessous pour libérer le haut */}
                  <div className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white/95 text-[11px] font-medium backdrop-blur-md transition-all flex items-center gap-1.5 border border-white/20 shadow-sm">
                    <Coins className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span className="font-bold text-[#C89B3C]">{currentProd.sharePrice} €</span>
                    <span className="text-[10px] text-white/70">/ part</span>
                  </div>

                  {/* Bouton Coproduire la série : gris clair au repos, marron terre cuite au survol */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduction(currentProd);
                      setPurchaseQuantity(1);
                    }}
                    id={`btn-coproduire-${currentProd.id}`}
                    className="px-4 py-2 rounded-full bg-stone-100/95 hover:bg-[#A2482B] text-stone-800 hover:text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md border border-stone-200/80 hover:border-[#A2482B] cursor-pointer shrink-0 active:scale-95 group/coprod"
                    title="Coproduire cette série"
                  >
                    <span>Coproduire</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-600 group-hover/coprod:text-white transition-colors" />
                  </button>
                </div>

              </div>
            )}

            {/* =================================================================== */}
            {/* VUE B : MARCHÉ DES PARTS ENTRE PAIRS                                */}
            {/* =================================================================== */}
            {activeTab === 'marche' && currentOffer && (
              <div 
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('button, a, input, textarea')) {
                    return;
                  }
                  toggleVideoPlayback();
                }}
                className="group relative w-full h-full rounded-[2rem] sm:rounded-3xl overflow-hidden bg-[#1C1917] text-[#FFFFFF] shadow-2xl border border-[#E7E5E4]/50 flex flex-col justify-between p-5 sm:p-6 cursor-pointer"
                id={`card-marche-${currentOffer.id}`}
              >
                {/* 1. Média de fond : Affiche officielle par défaut OU Vidéo si lecture activée */}
                {isPlaying ? (
                  <video
                    ref={videoRef}
                    src={currentOffer.videoPreviewUrl}
                    poster={currentOffer.posterImage}
                    autoPlay
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={currentOffer.posterImage}
                    alt={currentOffer.seriesTitle}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 pointer-events-none"
                  />
                )}

                {/* Voile cinématographique clair pour préserver l'éclat de l'affiche */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                {/* HAUT : Badge du titre de la série à gauche */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold tracking-widest text-white shadow-sm max-w-full leading-relaxed">
                    {currentOffer.seriesTitle}
                  </span>
                </div>

                {/* CENTRE : Icône vidéo de lecture centrée quand la vidéo est en pause */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white/90 shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white text-white translate-x-0.5 opacity-90" />
                    </div>
                  </div>
                )}

                {/* CENTRE LIBÉRÉ : Affiche visible et sans encombrement */}
                <div className="my-auto" />

                {/* BAS : À gauche (au-dessus : nb de parts et prix au même format / en dessous : vignette photo + prénom) */}
                {/* Et à droite : bouton d'action Racheter avec fond Terre Cuite */}
                <div className="relative z-10 flex items-end justify-between gap-2">
                  
                  {/* BLOC GAUCHE : parts + prix, puis vignette photo et prénom */}
                  <div className="flex flex-col gap-2">
                    
                    {/* Nombre de parts & Prix (Même format & design que coproduire) */}
                    <div className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white/95 text-[11px] font-medium backdrop-blur-md transition-all flex items-center gap-1.5 border border-white/20 shadow-sm w-fit">
                      <Coins className="w-3.5 h-3.5 text-[#C89B3C]" />
                      <span className="font-bold text-white">{currentOffer.sharesCount} part{currentOffer.sharesCount > 1 ? 's' : ''}</span>
                      <span className="text-white/40">•</span>
                      <span className="font-bold text-[#C89B3C]">{currentOffer.unitPrice} €</span>
                      <span className="text-[10px] text-white/70">/ part</span>
                    </div>

                    {/* Juste le prénom et sa vignette photo cliquable vers son univers */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate({ type: 'protagonist_profile', protagonistId: currentOffer.sellerId });
                      }}
                      className="px-2.5 py-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white text-[11px] font-medium backdrop-blur-md transition-all flex items-center gap-2 border border-white/20 cursor-pointer shadow-sm group/user text-left w-fit"
                      title={`Découvrir l’univers de ${currentOffer.sellerName}`}
                    >
                      <img 
                        src={currentOffer.sellerPhoto} 
                        alt={currentOffer.sellerName}
                        className="w-5 h-5 rounded-full object-cover ring-1 ring-[#C89B3C]"
                      />
                      <span className="font-bold text-white group-hover/user:text-[#C89B3C] transition-colors truncate max-w-[100px]">
                        {currentOffer.sellerName}
                      </span>
                    </button>

                  </div>

                  {/* Bouton Racheter ces parts : même format que coproduire (gris clair au repos, marron terre cuite au survol) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyPeerOffer(currentOffer);
                    }}
                    id={`btn-buy-peer-${currentOffer.id}`}
                    className="px-4 py-2 rounded-full bg-stone-100/95 hover:bg-[#A2482B] text-stone-800 hover:text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md border border-stone-200/80 hover:border-[#A2482B] cursor-pointer shrink-0 active:scale-95 group/racheter"
                    title="Racheter ces parts"
                  >
                    <span>Racheter</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-600 group-hover/racheter:text-white transition-colors" />
                  </button>

                </div>

              </div>
            )}

            {/* Si Marché vide */}
            {activeTab === 'marche' && peerOffers.length === 0 && (
              <div className="w-full h-full rounded-[2rem] sm:rounded-3xl overflow-hidden bg-[#1C1917] text-white/80 flex flex-col items-center justify-center p-6 text-center space-y-3 border border-[#E7E5E4]/50">
                <Coins className="w-12 h-12 text-[#C89B3C] opacity-60" />
                <h3 className="font-editorial text-lg font-bold text-white">Marché au repos</h3>
                <p className="text-xs text-white/70">Toutes les parts ont été rachetées par la communauté.</p>
              </div>
            )}

          </div>

          {/* Flèche Droite (Navigation rapide latérale) */}
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-0 lg:-right-12 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-[#C89B3C] text-[#1C1917] hover:text-white border border-[#E7E5E4] shadow-lg items-center justify-center transition-all cursor-pointer transform hover:scale-105"
            title="Suivant"
            id="next-poster-btn"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODALE D'ACHAT DE PARTS                                                   */}
      {/* ========================================================================= */}
      {selectedProduction && (
        <div 
          onClick={() => setSelectedProduction(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#FFFFFF] rounded-3xl border border-[#EAE4D5] shadow-2xl p-5 text-[#1C1917] space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6845]">
                  Coproduction
                </span>
                <h3 className="text-lg font-editorial font-bold text-[#1C1917]">
                  {selectedProduction.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedProduction(null)}
                className="text-[#7A756B] hover:text-[#1C1917] p-1 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBuyOfficialShares} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#52504B] text-center">
                  Nombre de parts à souscrire
                </label>
                <div className="flex items-center justify-center gap-4 bg-[#FAF7EF] p-2 rounded-2xl border border-[#E7E5E4]">
                  <button
                    type="button"
                    onClick={() => setPurchaseQuantity(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-xl bg-white hover:bg-[#EFE9DD] text-[#1C1917] font-bold flex items-center justify-center cursor-pointer border border-[#E7E5E4] shadow-xs"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold font-mono text-[#1C1917] w-12 text-center">
                    {purchaseQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPurchaseQuantity(prev => prev + 1)}
                    className="w-10 h-10 rounded-xl bg-white hover:bg-[#EFE9DD] text-[#1C1917] font-bold flex items-center justify-center cursor-pointer border border-[#E7E5E4] shadow-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF7EF] border border-[#E7E5E4] space-y-1 text-xs">
                <div className="flex justify-between text-[#7A756B]">
                  <span>Prix unitaire :</span>
                  <span className="font-bold text-[#1C1917]">{selectedProduction.sharePrice} €</span>
                </div>
                <div className="flex justify-between font-bold text-[#1C1917] pt-1 border-t border-[#EAE4D5]">
                  <span>Total :</span>
                  <span className="text-[#1C1917] text-sm font-mono font-bold">
                    {purchaseQuantity * selectedProduction.sharePrice} €
                  </span>
                </div>
              </div>

              <button
                type="submit"
                id="btn-confirm-buy-shares"
                className="w-full py-3 rounded-2xl bg-[#1C1917] hover:bg-stone-800 text-white font-bold text-xs transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Coins className="w-4 h-4 text-[#C89B3C]" />
                <span>Confirmer ({purchaseQuantity * selectedProduction.sharePrice} €)</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
