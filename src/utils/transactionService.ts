import { UserPurchaseOrder, UserProjectContribution, OrderStatus, ContributionStatus } from '../types';

const ORDERS_STORAGE_KEY = 'yonywood_user_orders';
const CONTRIBUTIONS_STORAGE_KEY = 'yonywood_user_contributions';

export const INITIAL_MOCK_ORDERS: UserPurchaseOrder[] = [
  {
    id: 'cmd-2026-001',
    itemTitle: 'Étoffe traditionnelle tissée au métier artisanal (Kanvô)',
    itemType: 'produit',
    categoryLabel: 'Artisanat & Textile béninois',
    sellerId: 'koffi-tisserand',
    sellerName: 'Koffi Mensah',
    sellerPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    orderDate: '2026-03-28',
    amount: 140,
    currency: '€',
    quantity: 1,
    status: 'EXPEDIEE',
    statusHistory: [
      { status: 'COMMANDE_PASSEE', date: '2026-03-28 10:14', note: 'Commande passée et paiement sécurisé consigné en séquestre' },
      { status: 'COMMANDE_CONFIRMEE', date: '2026-03-28 14:30', note: 'Commande acceptée par le maître artisan Koffi' },
      { status: 'EN_PREPARATION', date: '2026-03-29 09:00', note: 'Tissage et finition des lisières en cours à l’atelier de Cotonou' },
      { status: 'EXPEDIEE', date: '2026-04-02 11:20', note: 'Colis expédié via transport express certifié' }
    ],
    deliveryInfo: 'Colis suivi #BJ-TX-849201 en cours d’acheminement (délai estimé : 3 jours)',
    trackingNumber: 'BJ-TX-849201',
    buyerNotes: 'Livraison en relais ou à domicile'
  },
  {
    id: 'cmd-2026-002',
    itemTitle: 'Masterclass privée : L’Art de la forge sacrée et transmission du fer',
    itemType: 'service',
    categoryLabel: 'Savoir-faire & Pédagogie initiatique',
    sellerId: 'koffi-mensah-forgeron',
    sellerName: 'Koffi Mensah',
    sellerPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    orderDate: '2026-04-05',
    amount: 95,
    currency: '€',
    quantity: 1,
    status: 'EN_PREPARATION',
    statusHistory: [
      { status: 'COMMANDE_PASSEE', date: '2026-04-05 16:45', note: 'Réservation de la session en ligne' },
      { status: 'COMMANDE_CONFIRMEE', date: '2026-04-06 08:30', note: 'Créneau validé par le formateur' },
      { status: 'EN_PREPARATION', date: '2026-04-08 10:00', note: 'Supports vidéo et livret pédagogique en cours de préparation' }
    ],
    deliveryInfo: 'Session en direct le 24 Avril 2026 à 18h CET (Lien d’accès sécurisé envoyé par email)',
    buyerNotes: 'Session interactive 2h avec support numérique'
  },
  {
    id: 'cmd-2026-003',
    itemTitle: 'Panier de saveurs et condiments sacrés de Ganvié',
    itemType: 'produit',
    categoryLabel: 'Gastronomie & Épicerie du vivant',
    sellerId: 'amina-cook',
    sellerName: 'Amina Traoré',
    sellerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    orderDate: '2026-02-14',
    amount: 65,
    currency: '€',
    quantity: 2,
    status: 'TERMINEE',
    statusHistory: [
      { status: 'COMMANDE_PASSEE', date: '2026-02-14 11:00', note: 'Commande validée' },
      { status: 'COMMANDE_CONFIRMEE', date: '2026-02-14 15:00', note: 'Préparation des produits frais' },
      { status: 'EXPEDIEE', date: '2026-02-16 09:30', note: 'Expédition soignée' },
      { status: 'RECUE', date: '2026-02-19 14:20', note: 'Réception confirmée par l’acheteur' },
      { status: 'TERMINEE', date: '2026-02-19 14:22', note: 'Fonds libérés avec succès à la créatrice' }
    ],
    deliveryInfo: 'Colis livré et vérifié conforme',
    trackingNumber: 'BJ-GV-110294'
  }
];

export const INITIAL_MOCK_CONTRIBUTIONS: UserProjectContribution[] = [
  {
    id: 'ctb-2026-001',
    projectId: 'init-forge-solaire',
    projectTitle: 'Forge Solaire et Éco-Fonderie d’Allada',
    projectOwnerId: 'koffi-mensah',
    projectOwnerName: 'Koffi Mensah',
    projectOwnerPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    date: '2026-03-10',
    amount: 150,
    nature: 'Contribution financière participative au prototype de concentrateur solaire',
    counterpart: {
      id: 'cp-01',
      title: 'Plaque nominative au mémorial des bâtisseurs + Couteau de cérémonie forgé au soleil',
      description: 'Votre nom gravé sur le socle de la forge solaire et un couteau d’artisan numéroté forgé lors de l’inauguration.',
      estimatedDelivery: 'Juin 2026',
      isDelivered: false
    },
    status: 'CONTREPARTIE_EN_COURS',
    statusHistory: [
      { status: 'CONTRIBUTION_EFFECTUEE', date: '2026-03-10 18:20', note: 'Contribution de 150 € enregistrée pour le projet' },
      { status: 'CONTREPARTIE_A_VENIR', date: '2026-03-15 10:00', note: 'Objectif de financement atteint (114%)' },
      { status: 'CONTREPARTIE_EN_COURS', date: '2026-04-01 14:00', note: 'Gravure de la plaque et forge des 50 couteaux numérotés en cours' }
    ]
  },
  {
    id: 'ctb-2026-002',
    projectId: 'init-tissage-indigo',
    projectTitle: 'Sauvegarde de la Teinture Indigo Naturelle à Ouidah',
    projectOwnerId: 'amina-traore',
    projectOwnerName: 'Amina Traoré',
    projectOwnerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    date: '2026-02-18',
    amount: 50,
    nature: 'Don de soutien participatif à la réhabilitation des cuves d’indigo',
    counterpart: {
      id: 'cp-02',
      title: 'Foulard de soie indigo personnalisé + Accès exclusif au journal de bord vidéo',
      description: 'Un foulard teint selon la formule végétale ancestrale et accès aux 4 épisodes coulisses du projet.',
      estimatedDelivery: 'Mars 2026',
      isDelivered: true
    },
    status: 'CONTREPARTIE_ATTRIBUEE',
    statusHistory: [
      { status: 'CONTRIBUTION_EFFECTUEE', date: '2026-02-18 09:15', note: 'Contribution de 50 €' },
      { status: 'CONTREPARTIE_EN_COURS', date: '2026-03-01 11:30', note: 'Teinture et confection des foulards' },
      { status: 'CONTREPARTIE_ATTRIBUEE', date: '2026-03-22 16:45', note: 'Foulard remis en main propre & accès vidéo débloqué' }
    ]
  },
  {
    id: 'ctb-2026-003',
    projectId: 'init-pirogues-solaires',
    projectTitle: 'Pirogues solaires silencieuses pour la cité lacustre de Ganvié',
    projectOwnerId: 'tobi-ganvie',
    projectOwnerName: 'Tobi Houndégla',
    projectOwnerPhoto: '/assets/duos/tobi-ganvie.jpg',
    date: '2026-04-02',
    amount: 30,
    nature: 'Soutien direct aux pêcheurs et aux enfants des écoles sur l’eau',
    counterpart: {
      id: 'cp-03',
      title: 'Remerciement au générique + Photo dédicacée de la première traversée',
      description: 'Mention de votre nom dans les crédits officiels du documentaire et tirage photo numéroté.',
      estimatedDelivery: 'Mai 2026',
      isDelivered: false
    },
    status: 'CONTREPARTIE_A_VENIR',
    statusHistory: [
      { status: 'CONTRIBUTION_EFFECTUEE', date: '2026-04-02 20:10', note: 'Contribution enregistrée' },
      { status: 'CONTREPARTIE_A_VENIR', date: '2026-04-04 12:00', note: 'Installation des premiers moteurs électriques en cours' }
    ]
  }
];

class TransactionService {
  // ==========================================
  // ACHATS (PRODUITS & SERVICES)
  // ==========================================

  getOrders(): UserPurchaseOrder[] {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_MOCK_ORDERS;
  }

  saveOrders(orders: UserPurchaseOrder[]): void {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // fallback
    }
  }

  addOrder(order: Omit<UserPurchaseOrder, 'id' | 'statusHistory'>): UserPurchaseOrder {
    const fullOrder: UserPurchaseOrder = {
      ...order,
      id: `cmd-${Date.now().toString().slice(-6)}`,
      statusHistory: [
        {
          status: order.status,
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          note: 'Commande enregistrée sur YonyWood'
        }
      ]
    };
    const current = this.getOrders();
    const updated = [fullOrder, ...current];
    this.saveOrders(updated);
    return fullOrder;
  }

  updateOrderStatus(orderId: string, newStatus: OrderStatus, note?: string): UserPurchaseOrder | null {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) return null;

    const existing = orders[index];
    const updatedHistory = [
      ...existing.statusHistory,
      {
        status: newStatus,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        note: note || `Statut mis à jour : ${newStatus}`
      }
    ];

    const updatedOrder: UserPurchaseOrder = {
      ...existing,
      status: newStatus,
      statusHistory: updatedHistory
    };

    orders[index] = updatedOrder;
    this.saveOrders(orders);
    return updatedOrder;
  }

  confirmOrderReception(orderId: string): UserPurchaseOrder | null {
    return this.updateOrderStatus(orderId, 'RECUE', 'Réception du produit / réalisation du service confirmée par l’acheteur');
  }

  completeOrder(orderId: string): UserPurchaseOrder | null {
    return this.updateOrderStatus(orderId, 'TERMINEE', 'Commande finalisée et transaction clôturée');
  }

  markOrderShipped(orderId: string, deliveryInfo?: string): UserPurchaseOrder | null {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) return null;

    const existing = orders[index];
    const updatedOrder: UserPurchaseOrder = {
      ...existing,
      status: 'EXPEDIEE',
      deliveryInfo: deliveryInfo || existing.deliveryInfo || 'Commande expédiée ou prestation démarrée',
      statusHistory: [
        ...existing.statusHistory,
        {
          status: 'EXPEDIEE',
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          note: deliveryInfo || 'Signalé expédié / en cours d’exécution par le vendeur'
        }
      ]
    };

    orders[index] = updatedOrder;
    this.saveOrders(orders);
    return updatedOrder;
  }

  reportOrderIssue(orderId: string, description: string): UserPurchaseOrder | null {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) return null;

    const existing = orders[index];
    const updatedOrder: UserPurchaseOrder = {
      ...existing,
      status: 'PROBLEME_SIGNALE',
      issueReported: {
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        description,
        resolutionStatus: 'EN_ATTENTE'
      },
      statusHistory: [
        ...existing.statusHistory,
        {
          status: 'PROBLEME_SIGNALE',
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          note: `Problème signalé : ${description}`
        }
      ]
    };

    orders[index] = updatedOrder;
    this.saveOrders(orders);
    return updatedOrder;
  }

  resolveOrderIssue(orderId: string, resolutionNote: string): UserPurchaseOrder | null {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) return null;

    const existing = orders[index];
    const updatedOrder: UserPurchaseOrder = {
      ...existing,
      status: 'TERMINEE',
      issueReported: existing.issueReported ? {
        ...existing.issueReported,
        resolutionStatus: 'RESOLU'
      } : undefined,
      statusHistory: [
        ...existing.statusHistory,
        {
          status: 'TERMINEE',
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          note: `Litige résolu : ${resolutionNote}`
        }
      ]
    };

    orders[index] = updatedOrder;
    this.saveOrders(orders);
    return updatedOrder;
  }

  // ==========================================
  // CONTRIBUTIONS AUX PROJETS & CONTREPARTIES
  // ==========================================

  getContributions(): UserProjectContribution[] {
    try {
      const saved = localStorage.getItem(CONTRIBUTIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_MOCK_CONTRIBUTIONS;
  }

  saveContributions(contributions: UserProjectContribution[]): void {
    try {
      localStorage.setItem(CONTRIBUTIONS_STORAGE_KEY, JSON.stringify(contributions));
    } catch {
      // fallback
    }
  }

  addContribution(contribution: Omit<UserProjectContribution, 'id' | 'statusHistory'>): UserProjectContribution {
    const fullContribution: UserProjectContribution = {
      ...contribution,
      id: `ctb-${Date.now().toString().slice(-6)}`,
      statusHistory: [
        {
          status: contribution.status,
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          note: `Contribution de ${contribution.amount} € enregistrée pour « ${contribution.projectTitle} »`
        }
      ]
    };
    const current = this.getContributions();
    const updated = [fullContribution, ...current];
    this.saveContributions(updated);
    return fullContribution;
  }

  updateContributionStatus(contributionId: string, newStatus: ContributionStatus, note?: string): UserProjectContribution | null {
    const contributions = this.getContributions();
    const index = contributions.findIndex(c => c.id === contributionId);
    if (index === -1) return null;

    const existing = contributions[index];
    const updatedHistory = [
      ...existing.statusHistory,
      {
        status: newStatus,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        note: note || `Statut mis à jour : ${newStatus}`
      }
    ];

    const updatedContribution: UserProjectContribution = {
      ...existing,
      status: newStatus,
      counterpart: existing.counterpart ? {
        ...existing.counterpart,
        isDelivered: newStatus === 'CONTREPARTIE_ATTRIBUEE'
      } : undefined,
      statusHistory: updatedHistory
    };

    contributions[index] = updatedContribution;
    this.saveContributions(contributions);
    return updatedContribution;
  }

  confirmCounterpartReceived(contributionId: string): UserProjectContribution | null {
    return this.updateContributionStatus(
      contributionId, 
      'CONTREPARTIE_ATTRIBUEE', 
      'Réception de la contrepartie confirmée par le contributeur'
    );
  }

  reportContributionIssue(contributionId: string, description: string): UserProjectContribution | null {
    const contributions = this.getContributions();
    const index = contributions.findIndex(c => c.id === contributionId);
    if (index === -1) return null;

    const existing = contributions[index];
    const updatedContribution: UserProjectContribution = {
      ...existing,
      status: 'PROBLEME_SIGNALE',
      issueReported: {
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        description,
        resolutionStatus: 'EN_ATTENTE'
      },
      statusHistory: [
        ...existing.statusHistory,
        {
          status: 'PROBLEME_SIGNALE',
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          note: `Problème signalé : ${description}`
        }
      ]
    };

    contributions[index] = updatedContribution;
    this.saveContributions(contributions);
    return updatedContribution;
  }

  resolveContributionIssue(contributionId: string, resolutionNote: string): UserProjectContribution | null {
    const contributions = this.getContributions();
    const index = contributions.findIndex(c => c.id === contributionId);
    if (index === -1) return null;

    const existing = contributions[index];
    const updatedContribution: UserProjectContribution = {
      ...existing,
      status: 'CONTREPARTIE_ATTRIBUEE',
      issueReported: existing.issueReported ? {
        ...existing.issueReported,
        resolutionStatus: 'RESOLU'
      } : undefined,
      statusHistory: [
        ...existing.statusHistory,
        {
          status: 'CONTREPARTIE_ATTRIBUEE',
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          note: `Résolution du litige : ${resolutionNote}`
        }
      ]
    };

    contributions[index] = updatedContribution;
    this.saveContributions(contributions);
    return updatedContribution;
  }
}

export const transactionService = new TransactionService();
