import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ShoppingBag, 
  Sprout, 
  CheckCircle2, 
  Clock, 
  Package, 
  Truck, 
  AlertCircle, 
  ExternalLink, 
  Calendar, 
  Check, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  PieChart
} from 'lucide-react';
import { ViewScreen, UserPurchaseOrder, UserProjectContribution, OrderStatus } from '../types';
import { transactionService } from '../utils/transactionService';

interface TransactionsScreenProps {
  onNavigate: (screen: ViewScreen) => void;
  initialTab?: 'achats' | 'projets' | 'parts';
  returnToDuoId?: string;
  returnToDuoIndex?: number;
  returnToDocId?: string;
}

export const TransactionsScreen: React.FC<TransactionsScreenProps> = ({
  onNavigate,
  initialTab = 'achats',
  returnToDuoId,
  returnToDuoIndex,
  returnToDocId
}) => {
  const [activeTab, setActiveTab] = useState<'achats' | 'projets' | 'parts'>(initialTab);
  const [orders, setOrders] = useState<UserPurchaseOrder[]>([]);
  const [contributions, setContributions] = useState<UserProjectContribution[]>([]);
  const [confirmToast, setConfirmToast] = useState<string | null>(null);

  // Charger les données depuis transactionService
  const loadData = () => {
    setOrders(transactionService.getOrders());
    setContributions(transactionService.getContributions());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleConfirmReceipt = (orderId: string) => {
    transactionService.updateOrderStatus(orderId, 'RECUE');
    loadData();
    setConfirmToast('Réception confirmée avec succès ! Les fonds sont libérés pour le créateur.');
    setTimeout(() => setConfirmToast(null), 4000);
  };

  const handleBack = () => {
    onNavigate({ 
      type: 'profile',
      returnToDuoId,
      returnToDuoIndex,
      returnToDocId
    });
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'COMMANDE_PASSEE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
            <Clock className="w-3 h-3 text-stone-500" /> Commande initiée
          </span>
        );
      case 'COMMANDE_CONFIRMEE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <Check className="w-3 h-3 text-amber-600" /> Confirmée par l'artisan
          </span>
        );
      case 'EN_PREPARATION':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            <Package className="w-3 h-3 text-blue-600" /> En préparation
          </span>
        );
      case 'EXPEDIEE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200">
            <Truck className="w-3 h-3 text-indigo-600" /> En cours d'acheminement
          </span>
        );
      case 'RECUE':
      case 'TERMINEE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Reçue & Validée
          </span>
        );
      case 'PROBLEME_SIGNALE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
            <AlertCircle className="w-3 h-3 text-rose-600" /> Signalement en cours
          </span>
        );
      default:
        return null;
    }
  };

  // Mock des parts acquises de coproductions
  const sharesList = [
    {
      id: 'share-1',
      seriesId: 'finagnon-qosqorico',
      seriesTitle: 'Finagnon < > Qosqorico',
      sharesCount: 10,
      sharesOnSale: 2,
      acquiredPrice: 35,
      currentValue: 42,
      lastDividend: 4.80,
      posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'share-2',
      seriesId: 'paroles-de-terre',
      seriesTitle: 'Paroles de Terre',
      sharesCount: 4,
      sharesOnSale: 0,
      acquiredPrice: 40,
      currentValue: 45,
      lastDividend: 1.90,
      posterUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-6 py-2 sm:py-4 pb-20 sm:pb-24 pt-safe pb-safe h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between text-[#1C1917]">
      
      {/* 1. EN-TÊTE HARMONISÉ IDENTIQUE À MESSAGERIE & LIGNÉE */}
      <div className="pb-3 border-b border-[#E7E5E4] mb-1 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-[#1C1917] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
            title="Retour"
            id="btn-back-from-transactions"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1917] leading-none">
            Transactions
          </h1>
        </div>
      </div>

      {/* 2. SÉLECTEUR D'ONGLETS ÉPURÉ : ACHATS / PROJETS / MES PARTS */}
      <div className="pt-2.5 pb-2 shrink-0 flex items-center justify-center">
        <div className="inline-flex p-1 rounded-full bg-[#F5F5F4] border border-[#E7E5E4] shadow-xs">
          <button
            onClick={() => setActiveTab('achats')}
            id="tab-trans-achats"
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'achats'
                ? 'bg-[#A2482B] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Achats</span>
            {orders.length > 0 && (
              <span className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'achats' ? 'bg-white/25 text-white' : 'bg-stone-200 text-stone-700'
              }`}>
                {orders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('projets')}
            id="tab-trans-projets"
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'projets'
                ? 'bg-[#A2482B] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>Projets</span>
            {contributions.length > 0 && (
              <span className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'projets' ? 'bg-white/25 text-white' : 'bg-stone-200 text-stone-700'
              }`}>
                {contributions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('parts')}
            id="tab-trans-parts"
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'parts'
                ? 'bg-[#A2482B] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>Mes parts</span>
          </button>
        </div>
      </div>

      {/* TOAST SUCCÈS CONFIRMATION */}
      {confirmToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-sm px-4 py-2.5 rounded-2xl bg-[#1C1917] text-white text-xs font-semibold flex items-center gap-2 shadow-2xl animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{confirmToast}</span>
        </div>
      )}

      {/* 3. CORPS DÉROULANT STRICTEMENT CONFINÉ AU-DESSUS DE LA BARRE DU BAS */}
      <div className="flex-1 overflow-y-auto min-h-0 pr-0.5 space-y-3.5 py-1">

        {/* ONGLETS 1 : ACHATS */}
        {activeTab === 'achats' && (
          <div className="space-y-3">
            {orders.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200">
                <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-stone-700">Aucun achat pour le moment</p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Les créations et objets d'artisans que vous commandez apparaîtront ici avec leur suivi d'acheminement.
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <div 
                  key={order.id} 
                  className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs hover:border-[#A2482B]/40 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {order.sellerPhoto ? (
                        <img 
                          src={order.sellerPhoto} 
                          alt={order.sellerName} 
                          className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0 cursor-pointer"
                          onClick={() => onNavigate({ type: 'protagonist_profile', protagonistId: order.sellerId })}
                          title={`Voir le profil de ${order.sellerName}`}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-stone-600 shrink-0">
                          {order.sellerName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-editorial text-base font-bold text-stone-900 leading-tight">
                          {order.itemTitle}
                        </h3>
                        <p className="text-xs text-stone-500">
                          Vendu par <button onClick={() => onNavigate({ type: 'protagonist_profile', protagonistId: order.sellerId })} className="font-semibold text-stone-700 hover:text-[#A2482B] underline">{order.sellerName}</button>
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-editorial text-lg font-bold text-[#A2482B]">
                        {order.amount} {order.currency || '€'}
                      </span>
                      <p className="text-[11px] text-stone-400">
                        {new Date(order.orderDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  {/* Statut & Étapes */}
                  <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-stone-500 font-medium">Statut :</span>
                      {getStatusBadge(order.status)}
                    </div>

                    {/* Actions de confirmation de réception */}
                    {order.status !== 'RECUE' && order.status !== 'TERMINEE' && (
                      <button
                        onClick={() => handleConfirmReceipt(order.id)}
                        className="h-7 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs transition-colors cursor-pointer active:scale-95"
                        title="Confirmer que vous avez bien reçu votre commande"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirmer la réception</span>
                      </button>
                    )}
                  </div>

                  {/* Suivi logistique si expédié */}
                  {order.trackingNumber && (
                    <div className="text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-stone-500" />
                        Colis : <strong>La Poste</strong> n° {order.trackingNumber}
                      </span>
                      <span className="text-stone-400">Suivi actif</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* ONGLETS 2 : PROJETS SOUTENUS */}
        {activeTab === 'projets' && (
          <div className="space-y-3">
            {contributions.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200">
                <Sprout className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-stone-700">Aucune contribution pour le moment</p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Soutenez les initiatives et projets de création de la communauté pour suivre leur avancement ici.
                </p>
              </div>
            ) : (
              contributions.map((contribution) => (
                <div 
                  key={contribution.id} 
                  className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs hover:border-[#A2482B]/40 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {contribution.projectOwnerPhoto ? (
                        <img 
                          src={contribution.projectOwnerPhoto} 
                          alt={contribution.projectOwnerName} 
                          className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0 cursor-pointer"
                          onClick={() => onNavigate({ type: 'protagonist_profile', protagonistId: contribution.projectOwnerId })}
                          title={`Voir le profil de ${contribution.projectOwnerName}`}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-stone-600 shrink-0">
                          {contribution.projectOwnerName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-editorial text-base font-bold text-stone-900 leading-tight">
                          {contribution.projectTitle}
                        </h3>
                        <p className="text-xs text-stone-500">
                          Porté par <button onClick={() => onNavigate({ type: 'protagonist_profile', protagonistId: contribution.projectOwnerId })} className="font-semibold text-stone-700 hover:text-[#A2482B] underline">{contribution.projectOwnerName}</button>
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-editorial text-lg font-bold text-[#A2482B]">
                        {contribution.amount} €
                      </span>
                      <p className="text-[11px] text-stone-400">
                        {new Date(contribution.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  {/* Contrepartie choisie */}
                  {contribution.counterpart && (
                    <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs">
                      <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C89B3C]" />
                        Contrepartie choisie : {contribution.counterpart.title}
                      </p>
                      <p className="text-stone-600 text-[11px] mt-0.5">
                        {contribution.counterpart.description}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* ONGLETS 3 : MES PARTS */}
        {activeTab === 'parts' && (
          <div className="space-y-3">
            {/* Résumé de portefeuille */}
            <div className="bg-[#1C1917] text-white p-4 rounded-2xl flex items-center justify-between shadow-lg">
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Portefeuille Coproductions</p>
                <h3 className="font-editorial text-2xl font-bold text-white mt-0.5">
                  14 parts actives
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400">Valeur totale estimée</span>
                <p className="font-editorial text-xl font-bold text-[#FFE7A3]">
                  600,00 €
                </p>
              </div>
            </div>

            {/* Liste des séries dont le membre détient des parts */}
            {sharesList.map((share) => (
              <div 
                key={share.id}
                className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex items-center justify-between gap-3 hover:border-[#A2482B]/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={share.posterUrl} 
                    alt={share.seriesTitle} 
                    className="w-12 h-14 object-cover rounded-xl border border-stone-200 shrink-0"
                  />
                  <div>
                    <h4 className="font-editorial text-base font-bold text-stone-900 leading-tight">
                      {share.seriesTitle}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      <strong>{share.sharesCount} parts</strong> détenues · Valeur {share.currentValue} € / part
                    </p>
                    <p className="text-[11px] text-emerald-700 font-medium">
                      + {share.lastDividend} € de dividende culturel reçu
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate({ type: 'marketplace' })}
                  className="h-8 px-3 rounded-full bg-stone-100 hover:bg-[#A2482B] text-stone-700 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shrink-0"
                  title="Voir sur le marché des productions"
                >
                  <span>Gérer</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}

            {/* Raccourci vers le marché */}
            <div className="pt-2 text-center">
              <button
                onClick={() => onNavigate({ type: 'marketplace' })}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-[#A2482B]" />
                <span>Explorer d'autres productions sur le marché</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
