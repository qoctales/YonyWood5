import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Sprout, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertTriangle, 
  Check, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  Send,
  HelpCircle,
  PackageCheck
} from 'lucide-react';
import { UserPurchaseOrder, UserProjectContribution, OrderStatus, ContributionStatus } from '../types';
import { transactionService } from '../utils/transactionService';

interface OrdersAndContributionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'orders' | 'contributions';
  onNavigateToSeller?: (sellerId: string) => void;
}

export const OrdersAndContributionsModal: React.FC<OrdersAndContributionsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'orders',
  onNavigateToSeller
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'contributions'>(initialTab);
  const [orders, setOrders] = useState<UserPurchaseOrder[]>(() => transactionService.getOrders());
  const [contributions, setContributions] = useState<UserProjectContribution[]>(() => transactionService.getContributions());
  
  const [selectedOrder, setSelectedOrder] = useState<UserPurchaseOrder | null>(null);
  const [selectedContribution, setSelectedContribution] = useState<UserProjectContribution | null>(null);

  // Litige / Problème modal state
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [issueDescription, setIssueDescription] = useState('');
  const [issueTarget, setIssueTarget] = useState<{ type: 'order' | 'contribution'; id: string } | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const showFeedback = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 3500);
  };

  // Lifecycle steps definitions for visual timeline
  const ORDER_LIFECYCLE_STEPS: { key: OrderStatus; label: string; icon: React.ElementType }[] = [
    { key: 'COMMANDE_PASSEE', label: 'Commande passée', icon: Clock },
    { key: 'COMMANDE_CONFIRMEE', label: 'Confirmée', icon: CheckCircle2 },
    { key: 'EN_PREPARATION', label: 'En préparation', icon: PackageCheck },
    { key: 'EXPEDIEE', label: 'Expédiée / En cours', icon: Truck },
    { key: 'RECUE', label: 'Reçue / Réalisée', icon: Check },
    { key: 'TERMINEE', label: 'Clôturée', icon: ShieldCheck },
  ];

  const getOrderStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'COMMANDE_PASSEE': return 0;
      case 'COMMANDE_CONFIRMEE': return 1;
      case 'EN_PREPARATION': return 2;
      case 'EXPEDIEE': return 3;
      case 'RECUE': return 4;
      case 'TERMINEE': return 5;
      case 'PROBLEME_SIGNALE': return -1;
      default: return 0;
    }
  };

  const getOrderStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'COMMANDE_PASSEE': return 'Commande passée';
      case 'COMMANDE_CONFIRMEE': return 'Confirmée par le créateur';
      case 'EN_PREPARATION': return 'En préparation / En cours d’exécution';
      case 'EXPEDIEE': return 'Expédiée / En cours de réalisation';
      case 'RECUE': return 'Reçue / Prestation réalisée';
      case 'TERMINEE': return 'Commande terminée';
      case 'PROBLEME_SIGNALE': return 'Problème signalé (En médiation)';
    }
  };

  const getContributionStatusLabel = (status: ContributionStatus) => {
    switch (status) {
      case 'CONTRIBUTION_EFFECTUEE': return 'Contribution validée';
      case 'CONTREPARTIE_A_VENIR': return 'Contrepartie à venir';
      case 'CONTREPARTIE_EN_COURS': return 'Contrepartie en cours de confection';
      case 'CONTREPARTIE_ATTRIBUEE': return 'Contrepartie reçue & attribuée';
      case 'CONTREPARTIE_SANS': return 'Soutien libre sans contrepartie';
      case 'PROBLEME_SIGNALE': return 'Réclamation signalée';
    }
  };

  // Handlers
  const handleConfirmOrderReception = (orderId: string) => {
    const updated = transactionService.confirmOrderReception(orderId);
    if (updated) {
      setOrders(transactionService.getOrders());
      setSelectedOrder(updated);
      showFeedback('Réception confirmée ! Le créateur a été notifié et les fonds sont débloqués.');
    }
  };

  const handleSimulateSellerShip = (orderId: string) => {
    const updated = transactionService.markOrderShipped(orderId, 'Colis pris en charge par le transporteur #BJ-99120');
    if (updated) {
      setOrders(transactionService.getOrders());
      setSelectedOrder(updated);
      showFeedback('Statut mis à jour : commande signalée expédiée.');
    }
  };

  const handleConfirmCounterpart = (contributionId: string) => {
    const updated = transactionService.confirmCounterpartReceived(contributionId);
    if (updated) {
      setContributions(transactionService.getContributions());
      setSelectedContribution(updated);
      showFeedback('Réception de votre contrepartie confirmée avec succès !');
    }
  };

  const handleOpenIssue = (type: 'order' | 'contribution', id: string) => {
    setIssueTarget({ type, id });
    setIssueDescription('');
    setIsIssueModalOpen(true);
  };

  const handleSubmitIssue = () => {
    if (!issueTarget || !issueDescription.trim()) return;

    if (issueTarget.type === 'order') {
      const updated = transactionService.reportOrderIssue(issueTarget.id, issueDescription.trim());
      if (updated) {
        setOrders(transactionService.getOrders());
        setSelectedOrder(updated);
        showFeedback('Votre signalement a été enregistré. Notre équipe et le vendeur ont été notifiés.');
      }
    } else {
      const updated = transactionService.reportContributionIssue(issueTarget.id, issueDescription.trim());
      if (updated) {
        setContributions(transactionService.getContributions());
        setSelectedContribution(updated);
        showFeedback('Réclamation enregistrée pour cette contrepartie. Le porteur du projet a été alerté.');
      }
    }

    setIsIssueModalOpen(false);
    setIssueTarget(null);
  };

  const handleResolveIssue = (type: 'order' | 'contribution', id: string) => {
    if (type === 'order') {
      const updated = transactionService.resolveOrderIssue(id, 'Accord trouvé et validé entre l’acheteur et le vendeur');
      if (updated) {
        setOrders(transactionService.getOrders());
        setSelectedOrder(updated);
        showFeedback('Litige clôturé et commande régularisée avec succès.');
      }
    } else {
      const updated = transactionService.resolveContributionIssue(id, 'Contrepartie remise et validée');
      if (updated) {
        setContributions(transactionService.getContributions());
        setSelectedContribution(updated);
        showFeedback('Engagement régularisé et contrepartie attribuée.');
      }
    }
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl border border-stone-200 shadow-2xl flex flex-col text-[#1C1917] overflow-hidden"
      >
        {/* Toast Feedback */}
        {actionSuccessMsg && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#1C1917] text-white text-xs font-semibold shadow-xl flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {/* 1. EN-TÊTE DE LA MODALE AVEC DEUX ONGLETS DISTINCTS */}
        <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-stone-100 flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A2482B] block">
                Suivi de vos engagements
              </span>
              <h2 className="font-editorial text-lg sm:text-2xl font-bold text-[#1C1917]">
                Historique des transactions
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
              title="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sélecteur d'onglets épuré */}
          <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-2xl w-fit">
            <button
              type="button"
              onClick={() => {
                setActiveTab('orders');
                setSelectedContribution(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#A2482B]" />
              <span>Achats & Commandes ({orders.length})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('contributions');
                setSelectedOrder(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'contributions'
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Sprout className="w-3.5 h-3.5 text-emerald-600" />
              <span>Contributions aux projets ({contributions.length})</span>
            </button>
          </div>
        </div>

        {/* 2. CORPS PRINCIPAL DE LA MODALE */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* ========================================================================= */}
          {/* SECTION A : ACHATS & COMMANDES (PRODUITS & SERVICES)                      */}
          {/* ========================================================================= */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="py-12 text-center text-stone-400 space-y-2">
                  <ShoppingBag className="w-10 h-10 mx-auto text-stone-300 stroke-[1.5]" />
                  <p className="text-xs">Aucune commande enregistrée pour le moment.</p>
                </div>
              ) : (
                orders.map((order) => {
                  const stepIdx = getOrderStepIndex(order.status);
                  const isProblem = order.status === 'PROBLEME_SIGNALE';
                  const isExpanded = selectedOrder?.id === order.id;

                  return (
                    <div 
                      key={order.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isProblem
                          ? 'border-amber-300 bg-amber-50/40'
                          : order.status === 'TERMINEE'
                          ? 'border-stone-200 bg-stone-50/50'
                          : 'border-stone-200 bg-white hover:border-[#A2482B]/60 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[10.5px] font-bold text-stone-400">
                              {order.id}
                            </span>
                            <span className="text-stone-300">•</span>
                            <span className="text-[11px] text-stone-500">
                              {order.orderDate}
                            </span>
                            <span className="text-stone-300">•</span>
                            <span className={`text-[11px] font-semibold ${
                              isProblem ? 'text-amber-700' : order.status === 'TERMINEE' ? 'text-emerald-700' : 'text-[#A2482B]'
                            }`}>
                              {getOrderStatusLabel(order.status)}
                            </span>
                          </div>

                          <h3 className="font-editorial text-sm sm:text-base font-bold text-[#1C1917] leading-snug">
                            {order.itemTitle}
                          </h3>

                          {order.categoryLabel && (
                            <p className="text-[11px] text-stone-500 font-light">
                              {order.categoryLabel}
                            </p>
                          )}

                          <div className="flex items-center gap-2 pt-1">
                            <span className="text-xs text-stone-600">Vendu par :</span>
                            <button
                              type="button"
                              onClick={() => onNavigateToSeller?.(order.sellerId)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1917] hover:text-[#A2482B] transition-colors cursor-pointer"
                            >
                              {order.sellerPhoto && (
                                <img 
                                  src={order.sellerPhoto} 
                                  alt={order.sellerName}
                                  className="w-4 h-4 rounded-full object-cover"
                                />
                              )}
                              <span>{order.sellerName}</span>
                              <ExternalLink className="w-3 h-3 text-stone-400" />
                            </button>
                          </div>
                        </div>

                        {/* Montant & Bouton détails */}
                        <div className="text-right shrink-0">
                          <div className="font-mono text-base sm:text-lg font-bold text-[#1C1917]">
                            {order.amount} {order.currency}
                          </div>
                          <span className="text-[10px] text-stone-400 block">
                            Qté : {order.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(isExpanded ? null : order)}
                            className="mt-2 text-xs font-semibold text-[#A2482B] hover:underline cursor-pointer"
                          >
                            {isExpanded ? 'Masquer détails' : 'Suivre la commande'}
                          </button>
                        </div>
                      </div>

                      {/* LIVRAISON / EXÉCUTION INFO */}
                      {order.deliveryInfo && (
                        <div className="mt-3 p-2.5 rounded-xl bg-stone-100/80 border border-stone-200/60 text-xs text-stone-700 flex items-center gap-2">
                          <Truck className="w-4 h-4 text-stone-500 shrink-0" />
                          <span className="font-medium">{order.deliveryInfo}</span>
                        </div>
                      )}

                      {/* DÉTAILS DÉPLIABLES & CYCLE DE VIE */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-stone-100 space-y-4 animate-in fade-in">
                          
                          {/* TIMELINE CYCLE DE VIE (COMMANDE PASSÉE -> TERMINÉE) */}
                          {!isProblem && (
                            <div className="space-y-2">
                              <span className="text-[11px] font-bold text-stone-500 block uppercase tracking-wider">
                                Cycle de traitement :
                              </span>
                              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                                {ORDER_LIFECYCLE_STEPS.map((step, idx) => {
                                  const StepIcon = step.icon;
                                  const isCurrentOrPassed = stepIdx >= idx;
                                  const isCurrent = stepIdx === idx;

                                  return (
                                    <div
                                      key={step.key}
                                      className={`p-2 rounded-xl text-center space-y-1 transition-all border ${
                                        isCurrent
                                          ? 'bg-[#A2482B] text-white border-[#A2482B] shadow-xs'
                                          : isCurrentOrPassed
                                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                          : 'bg-stone-50 text-stone-400 border-stone-200'
                                      }`}
                                    >
                                      <StepIcon className="w-3.5 h-3.5 mx-auto" />
                                      <p className="text-[10px] font-semibold leading-tight line-clamp-2">
                                        {step.label}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* HISTORIQUE HORODATÉ */}
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-bold text-stone-500 block">
                              Journal d'exécution :
                            </span>
                            <div className="space-y-1 pl-2 border-l-2 border-stone-200 text-xs text-stone-600">
                              {order.statusHistory.map((h, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <span className="font-mono text-[10px] text-stone-400 whitespace-nowrap pt-0.5">
                                    {h.date}
                                  </span>
                                  <span className="font-medium text-stone-700">
                                    {h.note || h.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* ACTIONS INTERACTIVES : CONFIRMATION RÉCEPTION / EXPÉDITION / LITIGE */}
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100">
                            <div className="flex items-center gap-2">
                              {/* Action Acheteur : Confirmer la réception */}
                              {order.status !== 'RECUE' && order.status !== 'TERMINEE' && order.status !== 'PROBLEME_SIGNALE' && (
                                <button
                                  type="button"
                                  onClick={() => handleConfirmOrderReception(order.id)}
                                  className="h-8 px-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                                  title="Confirmer la bonne réception ou la réalisation du service"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Confirmer la réception</span>
                                </button>
                              )}

                              {/* Simulation Vendeur : Marquer expédiée */}
                              {order.status === 'EN_PREPARATION' && (
                                <button
                                  type="button"
                                  onClick={() => handleSimulateSellerShip(order.id)}
                                  className="h-8 px-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-200 transition-all cursor-pointer"
                                  title="En tant que vendeur : signaler l'expédition ou le début de prestation"
                                >
                                  <Truck className="w-3.5 h-3.5" />
                                  <span>Signaler expédié (Vendeur)</span>
                                </button>
                              )}

                              {/* Résolution si litige */}
                              {isProblem && (
                                <button
                                  type="button"
                                  onClick={() => handleResolveIssue('order', order.id)}
                                  className="h-8 px-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer"
                                >
                                  Clôturer le litige (Accord trouvé)
                                </button>
                              )}
                            </div>

                            {/* Signaler un problème */}
                            {!isProblem && order.status !== 'TERMINEE' && (
                              <button
                                type="button"
                                onClick={() => handleOpenIssue('order', order.id)}
                                className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                              >
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>Signaler un problème</span>
                              </button>
                            )}
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION B : CONTRIBUTIONS AUX PROJETS & CONTREPARTIES                      */}
          {/* ========================================================================= */}
          {activeTab === 'contributions' && (
            <div className="space-y-3">
              {contributions.length === 0 ? (
                <div className="py-12 text-center text-stone-400 space-y-2">
                  <Sprout className="w-10 h-10 mx-auto text-stone-300 stroke-[1.5]" />
                  <p className="text-xs">Aucune contribution à un projet enregistrée.</p>
                </div>
              ) : (
                contributions.map((ctb) => {
                  const isProblem = ctb.status === 'PROBLEME_SIGNALE';
                  const isDelivered = ctb.status === 'CONTREPARTIE_ATTRIBUEE' || ctb.counterpart?.isDelivered;
                  const isExpanded = selectedContribution?.id === ctb.id;

                  return (
                    <div 
                      key={ctb.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isProblem
                          ? 'border-amber-300 bg-amber-50/40'
                          : isDelivered
                          ? 'border-emerald-200 bg-emerald-50/20'
                          : 'border-stone-200 bg-white hover:border-[#A2482B]/60 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[10.5px] font-bold text-stone-400">
                              {ctb.id}
                            </span>
                            <span className="text-stone-300">•</span>
                            <span className="text-[11px] text-stone-500">
                              {ctb.date}
                            </span>
                            <span className="text-stone-300">•</span>
                            <span className={`text-[11px] font-semibold ${
                              isProblem 
                                ? 'text-amber-700' 
                                : isDelivered 
                                ? 'text-emerald-700' 
                                : 'text-[#A2482B]'
                            }`}>
                              {getContributionStatusLabel(ctb.status)}
                            </span>
                          </div>

                          <h3 className="font-editorial text-sm sm:text-base font-bold text-[#1C1917] leading-snug">
                            {ctb.projectTitle}
                          </h3>

                          <p className="text-xs text-stone-600">
                            Porteur de projet : <strong className="font-semibold text-[#1C1917]">{ctb.projectOwnerName}</strong>
                          </p>

                          <p className="text-[11px] text-stone-500 font-light">
                            {ctb.nature}
                          </p>
                        </div>

                        {/* Montant soutenu */}
                        <div className="text-right shrink-0">
                          <div className="font-mono text-base sm:text-lg font-bold text-[#A2482B]">
                            {ctb.amount} €
                          </div>
                          <span className="text-[10px] text-stone-400 block">Soutien financier</span>
                          <button
                            type="button"
                            onClick={() => setSelectedContribution(isExpanded ? null : ctb)}
                            className="mt-2 text-xs font-semibold text-[#A2482B] hover:underline cursor-pointer"
                          >
                            {isExpanded ? 'Masquer détails' : 'Suivre la contrepartie'}
                          </button>
                        </div>
                      </div>

                      {/* BLOC CONTREPARTIE ENREGISTRÉE */}
                      {ctb.counterpart ? (
                        <div className="mt-3 p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 font-bold text-[#1C1917]">
                              <span className="text-[#C89B3C]">🎁</span>
                              <span>Contrepartie promise :</span>
                            </div>
                            <span className={`text-[10.5px] font-semibold ${
                              isDelivered ? 'text-emerald-700' : 'text-stone-500'
                            }`}>
                              {isDelivered ? '✓ Attribuée et reçue' : `Livraison estimée : ${ctb.counterpart.estimatedDelivery || 'À venir'}`}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-[#1C1917] pt-0.5">
                            {ctb.counterpart.title}
                          </p>
                          <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                            {ctb.counterpart.description}
                          </p>
                        </div>
                      ) : (
                        <div className="mt-2 text-xs text-stone-400 italic">
                          Contribution sans contrepartie demandée.
                        </div>
                      )}

                      {/* DÉTAILS DÉPLIABLES & ACTIONS */}
                      {isExpanded && (
                        <div className="mt-4 pt-3 border-t border-stone-100 space-y-3 animate-in fade-in">
                          {/* Historique */}
                          <div className="space-y-1">
                            <span className="text-[11px] font-bold text-stone-500 block">
                              Suivi des engagements :
                            </span>
                            <div className="space-y-1 pl-2 border-l-2 border-stone-200 text-xs text-stone-600">
                              {ctb.statusHistory.map((h, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <span className="font-mono text-[10px] text-stone-400 whitespace-nowrap pt-0.5">
                                    {h.date}
                                  </span>
                                  <span className="font-medium text-stone-700">
                                    {h.note || h.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Boutons d'action */}
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100">
                            <div>
                              {ctb.counterpart && !isDelivered && !isProblem && (
                                <button
                                  type="button"
                                  onClick={() => handleConfirmCounterpart(ctb.id)}
                                  className="h-8 px-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Confirmer la réception de la contrepartie</span>
                                </button>
                              )}

                              {isProblem && (
                                <button
                                  type="button"
                                  onClick={() => handleResolveIssue('contribution', ctb.id)}
                                  className="h-8 px-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer"
                                >
                                  Clôturer la réclamation (Résolu)
                                </button>
                              )}
                            </div>

                            {!isDelivered && !isProblem && (
                              <button
                                type="button"
                                onClick={() => handleOpenIssue('contribution', ctb.id)}
                                className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                              >
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>Signaler un engagement non respecté</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })
              )}
            </div>
          )}

        </div>

        {/* 3. MODALE DE SIGNALEMENT DE PROBLÈME / LITIGE */}
        {isIssueModalOpen && (
          <div 
            onClick={() => setIsIssueModalOpen(false)}
            className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-3xl p-5 border border-stone-200 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <div className="flex items-center gap-2 text-amber-700">
                  <AlertTriangle className="w-5 h-5" />
                  <h4 className="font-editorial text-base font-bold text-[#1C1917]">
                    Signaler un problème
                  </h4>
                </div>
                <button onClick={() => setIsIssueModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-stone-600">
                <p>
                  Décrivez précisément la difficulté rencontrée (retard important, non-conformité, absence de réponse du porteur ou du vendeur).
                </p>
                <textarea
                  rows={4}
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="Ex : Je n’ai pas reçu mon colis après la date annoncée..."
                  className="w-full p-3 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:border-[#A2482B] outline-hidden resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsIssueModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSubmitIssue}
                  disabled={!issueDescription.trim()}
                  className="px-5 py-2 rounded-full bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  Transmettre la réclamation
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
