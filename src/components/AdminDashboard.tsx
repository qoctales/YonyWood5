import React, { useState, useRef } from 'react';
import { 
  Crown, 
  Film, 
  ShieldAlert, 
  Users, 
  DollarSign, 
  ChevronLeft, 
  Edit3, 
  Trash2, 
  Plus, 
  Check, 
  X, 
  Sliders, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Search,
  Wallet,
  Save,
  RotateCcw,
  Upload,
  ArrowUp,
  ArrowDown,
  Layers,
  Clapperboard,
  Play,
  Pause,
  Video,
  UserCheck,
  Star,
  Eye,
  Volume2,
  VolumeX,
  LayoutDashboard,
  Building2,
  Megaphone,
  FileText
} from 'lucide-react';
import { ViewScreen, Documentary, QuestionItem, SeriesEffigie, ReportItem, CoproductionEarning } from '../types';
import { DOCUMENTARIES, PROTAGONISTS, getCustomDocumentaries, saveCustomDocumentaries } from '../data/mockData';
import { useAuth } from '../services/authContext';
import {
  AdminUserAccount,
  HeritageThematique,
  HeritageQuestion,
  HeritageSubmittedStory,
  SeriesEconomicEnvelope,
  SeriesEconomicConfig,
  ProducerDossier,
  CooptationItem,
  AdvertisingCampaign,
  AdminAuditLog
} from '../types/adminBackOffice';
import {
  INITIAL_ADMIN_USERS,
  INITIAL_HERITAGE_THEMATIQUES,
  INITIAL_HERITAGE_QUESTIONS,
  INITIAL_SUBMITTED_STORIES,
  INITIAL_SERIES_ENVELOPES,
  INITIAL_PRODUCER_DOSSIERS,
  INITIAL_COOPTATIONS,
  INITIAL_ADVERTISING_CAMPAIGNS,
  INITIAL_AUDIT_LOGS,
  getAdminStorage,
  setAdminStorage
} from '../data/adminBackOfficeData';

import { AdminOverviewTab } from './admin/AdminOverviewTab';
import { AdminUsersTab } from './admin/AdminUsersTab';
import { AdminHeritageTab } from './admin/AdminHeritageTab';
import { AdminSeriesTab } from './admin/AdminSeriesTab';
import { AdminProducersTab } from './admin/AdminProducersTab';
import { AdminCooptationsTab } from './admin/AdminCooptationsTab';
import { AdminAdvertisingTab } from './admin/AdminAdvertisingTab';
import { AdminFinancesTab } from './admin/AdminFinancesTab';
import { AdminModerationTab } from './admin/AdminModerationTab';
import { AdminAuditTab } from './admin/AdminAuditTab';

interface AdminDashboardProps {
  onNavigate: (screen: ViewScreen) => void;
  initialTab?: 
    | 'overview' 
    | 'users' 
    | 'heritage' 
    | 'series' 
    | 'producers' 
    | 'cooptations' 
    | 'advertising' 
    | 'finances' 
    | 'moderation' 
    | 'audit' 
    | string;
}

const DEFAULT_EARNINGS: CoproductionEarning[] = [
  {
    id: 'earn-1',
    coproducerName: 'Romeo Nonvide',
    coproducerEmail: 'qoctales@gmail.com',
    seriesId: 'investors-builders',
    seriesTitle: 'Investors < > Builders',
    initialInvestment: 1500,
    sharesOwned: 150,
    totalViews: 92400,
    audienceMilestone: 'Palier 90k vues dépassé',
    dividendEarned: 435.00,
    payoutStatus: 'PAID',
    payoutDate: '2026-03-22'
  },
  {
    id: 'earn-2',
    coproducerName: 'Romeo Nonvide',
    coproducerEmail: 'qoctales@gmail.com',
    seriesId: 'jesus-legba',
    seriesTitle: 'Èṣù < > Jésus',
    initialInvestment: 1250,
    sharesOwned: 125,
    totalViews: 84200,
    audienceMilestone: 'Palier 75k vues dépassé',
    dividendEarned: 345.50,
    payoutStatus: 'PAID',
    payoutDate: '2026-03-15'
  },
  {
    id: 'earn-3',
    coproducerName: 'Clara Dupont',
    coproducerEmail: 'clara.dupont@gmail.com',
    seriesId: 'finagnon-qosqorico',
    seriesTitle: 'Finagnon < > Qosqorico',
    initialInvestment: 500,
    sharesOwned: 50,
    totalViews: 46100,
    audienceMilestone: 'Palier 40k vues atteint',
    dividendEarned: 115.00,
    payoutStatus: 'PAID',
    payoutDate: '2026-03-20'
  },
  {
    id: 'earn-4',
    coproducerName: 'Tarek Benani',
    coproducerEmail: 'tarek.benani@outlook.com',
    seriesId: 'blacks-one-beyond-eve',
    seriesTitle: 'Blacks One < > Beyond Eve',
    initialInvestment: 800,
    sharesOwned: 80,
    totalViews: 128000,
    audienceMilestone: 'Palier 100k vues pulvérisé (+30%)',
    dividendEarned: 412.80,
    payoutStatus: 'PENDING'
  },
  {
    id: 'earn-5',
    coproducerName: 'Sophie Morel',
    coproducerEmail: 'sophie.morel@culture-invest.fr',
    seriesId: 'dixeat-fiat-luxe',
    seriesTitle: 'E Vivi < > Fiat Luxe',
    initialInvestment: 1500,
    sharesOwned: 150,
    totalViews: 62400,
    audienceMilestone: 'Palier 50k vues atteint',
    dividendEarned: 285.00,
    payoutStatus: 'PROCESSING'
  }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
  initialTab = 'overview'
}) => {
  const { currentUser } = useAuth();

  // Onglet actif
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (initialTab && initialTab !== 'default') return initialTab;
    return 'overview';
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. UTILISATEURS & DOUBLES RÔLES
  const [adminUsers, setAdminUsers] = useState<AdminUserAccount[]>(() => {
    return getAdminStorage('users', INITIAL_ADMIN_USERS);
  });

  // 2. HÉRITAGE
  const [thematiques, setThematiques] = useState<HeritageThematique[]>(() => {
    return getAdminStorage('thematiques', INITIAL_HERITAGE_THEMATIQUES);
  });

  const [questions, setQuestions] = useState<HeritageQuestion[]>(() => {
    return getAdminStorage('questions', INITIAL_HERITAGE_QUESTIONS);
  });

  const [submittedStories, setSubmittedStories] = useState<HeritageSubmittedStory[]>(() => {
    return getAdminStorage('submitted_stories', INITIAL_SUBMITTED_STORIES);
  });

  // 3. SÉRIES & ENVELOPPES
  const [seriesList, setSeriesList] = useState<Documentary[]>(() => {
    return getCustomDocumentaries();
  });

  const [envelopes, setEnvelopes] = useState<SeriesEconomicEnvelope[]>(() => {
    return getAdminStorage('series_envelopes', INITIAL_SERIES_ENVELOPES);
  });

  // 4. PRODUCTEURS
  const [producers, setProducers] = useState<ProducerDossier[]>(() => {
    return getAdminStorage('producers', INITIAL_PRODUCER_DOSSIERS);
  });

  // 5. COOPTATIONS
  const [cooptations, setCooptations] = useState<CooptationItem[]>(() => {
    return getAdminStorage('cooptations', INITIAL_COOPTATIONS);
  });

  // 6. PUBLICITÉ & SPONSORING
  const [campaigns, setCampaigns] = useState<AdvertisingCampaign[]>(() => {
    return getAdminStorage('campaigns', INITIAL_ADVERTISING_CAMPAIGNS);
  });

  // 7. FINANCES & GAINS
  const [platformFee, setPlatformFee] = useState<number>(() => {
    return getAdminStorage('platform_fee', 12);
  });

  const [earningsList, setEarningsList] = useState<CoproductionEarning[]>(() => {
    return getAdminStorage('earnings', DEFAULT_EARNINGS);
  });

  // 8. MODÉRATION
  const [reports, setReports] = useState<ReportItem[]>(() => {
    return getAdminStorage('reports', [
      {
        id: 'rep-demo-1',
        reason: 'copyright',
        reasonLabel: "Atteinte aux droits d'auteur",
        details: 'Musique de fond semblant correspondre à un morceau protégé sans mention au générique.',
        targetType: 'duo',
        targetId: 'duo-1',
        targetTitle: 'Koffi Mensah <> Amara Diop (Duo 1)',
        reportedBy: 'utilisateur_veille@yonywood.com',
        createdAt: '2026-03-24T14:22:00Z',
        status: 'PENDING'
      },
      {
        id: 'rep-demo-2',
        reason: 'inappropriate',
        reasonLabel: 'Contenu inapproprié ou offensant',
        details: 'Passage avec langage très familier à la minute 01:20.',
        targetType: 'duo',
        targetId: 'duo-3',
        targetTitle: 'Yamina Vargas <> Carlos Mendoza (Duo 3)',
        reportedBy: 'spectateur_42@gmail.com',
        createdAt: '2026-03-25T09:10:00Z',
        status: 'PENDING'
      }
    ]);
  });

  // 9. JOURNAL D'AUDIT
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(() => {
    return getAdminStorage('audit_logs', INITIAL_AUDIT_LOGS);
  });

  // Fonction centrale pour tracer chaque action sensible
  const addAuditLog = (
    module: AdminAuditLog['module'],
    action: string,
    targetId: string,
    targetTitle: string,
    justification?: string
  ) => {
    const newLog: AdminAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      authorName: currentUser?.name || 'Romeo Nonvide',
      authorEmail: currentUser?.email || 'qoctales@gmail.com',
      authorRole: 'Superadministrateur',
      module,
      action,
      targetId,
      targetTitle,
      justification
    };

    setAuditLogs(prev => {
      const updated = [newLog, ...prev];
      setAdminStorage('audit_logs', updated);
      return updated;
    });
  };

  // HANDLERS UTILISATEURS
  const handleUpdateUser = (updated: AdminUserAccount, justification: string) => {
    setAdminUsers(prev => {
      const list = prev.map(u => u.id === updated.id ? updated : u);
      setAdminStorage('users', list);
      return list;
    });
    addAuditLog('USERS', `Modification rôles et statut de compte (${updated.accountStatus})`, updated.id, updated.name, justification);
    showToast(`Profil et rôles de ${updated.name} mis à jour.`);
  };

  const handleDeleteUser = (userId: string, justification: string) => {
    const target = adminUsers.find(u => u.id === userId);
    if (!target) return;
    setAdminUsers(prev => {
      const list = prev.filter(u => u.id !== userId);
      setAdminStorage('users', list);
      return list;
    });
    addAuditLog('USERS', `Suppression du compte utilisateur`, userId, target.name, justification);
    showToast(`Utilisateur ${target.name} supprimé.`);
  };

  // HANDLERS HÉRITAGE
  const handleUpdateThematique = (updated: HeritageThematique, justification: string) => {
    setThematiques(prev => {
      const list = prev.map(t => t.id === updated.id ? updated : t);
      setAdminStorage('thematiques', list);
      return list;
    });
    addAuditLog('HERITAGE', `Mise à jour thématique Héritage`, updated.id, updated.title, justification);
    showToast(`Thématique "${updated.title}" mise à jour.`);
  };

  const handleAddThematique = (newThem: HeritageThematique, justification: string) => {
    setThematiques(prev => {
      const list = [...prev, newThem];
      setAdminStorage('thematiques', list);
      return list;
    });
    addAuditLog('HERITAGE', `Création nouvelle thématique Héritage`, newThem.id, newThem.title, justification);
    showToast(`Nouvelle thématique "${newThem.title}" ajoutée.`);
  };

  const handleUpdateQuestion = (updated: HeritageQuestion, justification: string) => {
    setQuestions(prev => {
      const list = prev.map(q => q.id === updated.id ? updated : q);
      setAdminStorage('questions', list);
      return list;
    });
    addAuditLog('HERITAGE', `Mise à jour question d'Héritage`, updated.id, updated.title, justification);
    showToast(`Question "${updated.title}" mise à jour.`);
  };

  const handleAddQuestion = (newQ: HeritageQuestion, justification: string) => {
    setQuestions(prev => {
      const list = [...prev, newQ];
      setAdminStorage('questions', list);
      return list;
    });
    addAuditLog('HERITAGE', `Création nouvelle question d'Héritage`, newQ.id, newQ.title, justification);
    showToast(`Question Q${newQ.number} créée.`);
  };

  const handleReviewStory = (
    storyId: string, 
    status: HeritageSubmittedStory['status'], 
    circleHighlight: HeritageSubmittedStory['circleHighlight'],
    isSponsored: boolean,
    brandSponsor: string | undefined,
    notes: string,
    justification: string
  ) => {
    const story = submittedStories.find(s => s.id === storyId);
    if (!story) return;

    const updatedStory: HeritageSubmittedStory = {
      ...story,
      status,
      circleHighlight,
      isSponsored,
      brandSponsor,
      reviewerNotes: notes,
      reviewDate: new Date().toISOString(),
      reviewedBy: currentUser?.name || 'Romeo Nonvide'
    };

    setSubmittedStories(prev => {
      const list = prev.map(s => s.id === storyId ? updatedStory : s);
      setAdminStorage('submitted_stories', list);
      return list;
    });

    addAuditLog('HERITAGE', `Décision éditoriale : ${status} (Cercle: ${circleHighlight})`, storyId, story.questionTitle, justification);
    showToast(`Histoire de ${story.authorName} : ${status}.`);
  };

  // HANDLERS SÉRIES
  const handleUpdateSeriesData = (updatedDoc: Documentary, justification: string) => {
    setSeriesList(prev => {
      const list = prev.map(s => s.id === updatedDoc.id ? updatedDoc : s);
      saveCustomDocumentaries(list);
      return list;
    });
    addAuditLog('SERIES', `Mise à jour identité & thématiques`, updatedDoc.id, updatedDoc.title, justification);
    showToast(`Série "${updatedDoc.title}" enregistrée.`);
  };

  const handleUpdateEconomicConfig = (seriesId: string, newConfig: SeriesEconomicConfig, justification: string) => {
    const envelope = envelopes.find(e => e.seriesId === seriesId);
    if (!envelope) return;

    const updatedEnv: SeriesEconomicEnvelope = {
      ...envelope,
      economicVersion: newConfig.version,
      currentConfig: newConfig,
      configHistory: [envelope.currentConfig, ...envelope.configHistory]
    };

    setEnvelopes(prev => {
      const list = prev.map(e => e.seriesId === seriesId ? updatedEnv : e);
      setAdminStorage('series_envelopes', list);
      return list;
    });

    addAuditLog('SERIES', `Publication nouvelle clé économique version ${newConfig.version}`, seriesId, envelope.seriesTitle, justification);
    showToast(`Version économique ${newConfig.version} enregistrée pour ${envelope.seriesTitle}.`);
  };

  // HANDLERS PRODUCTEURS
  const handleUpdateProducer = (updated: ProducerDossier, justification: string) => {
    setProducers(prev => {
      const list = prev.map(p => p.id === updated.id ? updated : p);
      setAdminStorage('producers', list);
      return list;
    });
    addAuditLog('PRODUCTEURS', `Mise à jour dossier producteur`, updated.id, updated.producerName, justification);
    showToast(`Dossier producteur mis à jour.`);
  };

  const handleApproveProducerPayout = (producerId: string, payoutId: string, justification: string) => {
    const prod = producers.find(p => p.id === producerId);
    if (!prod) return;

    const updatedPayoutHistory = prod.payoutHistory.map(h => 
      h.id === payoutId ? { ...h, status: 'PAYE' as const, bankRef: `VIR-SEPA-YW-${Date.now().toString().slice(-6)}` } : h
    );

    const updatedProd: ProducerDossier = {
      ...prod,
      payoutHistory: updatedPayoutHistory
    };

    setProducers(prev => {
      const list = prev.map(p => p.id === producerId ? updatedProd : p);
      setAdminStorage('producers', list);
      return list;
    });

    addAuditLog('PRODUCTEURS', `Validation versement dividendes producteur`, payoutId, prod.producerName, justification);
    showToast(`Versement validé et ordre SEPA généré pour ${prod.producerName}.`);
  };

  const handleAddProducerPayout = (producerId: string, amount: number, seriesTitle: string, justification: string) => {
    const prod = producers.find(p => p.id === producerId);
    if (!prod) return;

    const newPayout = {
      id: `payout-${Date.now()}`,
      date: new Date().toISOString(),
      amount,
      seriesTitle,
      status: 'EN_ATTENTE' as const,
      bankRef: 'EN_ATTENTE_ORDRE'
    };

    const updatedProd: ProducerDossier = {
      ...prod,
      payoutHistory: [newPayout, ...prod.payoutHistory]
    };

    setProducers(prev => {
      const list = prev.map(p => p.id === producerId ? updatedProd : p);
      setAdminStorage('producers', list);
      return list;
    });

    addAuditLog('PRODUCTEURS', `Émission d'un nouvel ordre de versement de ${amount} €`, newPayout.id, prod.producerName, justification);
    showToast(`Ordre de versement de ${amount} € créé.`);
  };

  // HANDLERS COOPTATIONS
  const handleApproveCooptation = (cooptationId: string, justification: string) => {
    const coopt = cooptations.find(c => c.id === cooptationId);
    if (!coopt) return;

    const updated: CooptationItem = {
      ...coopt,
      status: 'VALIDEE',
      admissionDate: new Date().toISOString(),
      reviewerName: currentUser?.name || 'Romeo Nonvide'
    };

    setCooptations(prev => {
      const list = prev.map(c => c.id === cooptationId ? updated : c);
      setAdminStorage('cooptations', list);
      return list;
    });

    addAuditLog('COOPTATIONS', `Approbation cooptation & activation filiation 2%`, cooptationId, `${coopt.recommendedPersonName} (Parrain: ${coopt.referentName})`, justification);
    showToast(`Cooptation validée : filiation 2% active pour ${coopt.recommendedPersonName}.`);
  };

  const handleRejectCooptation = (cooptationId: string, rejectionReason: string, justification: string) => {
    const coopt = cooptations.find(c => c.id === cooptationId);
    if (!coopt) return;

    const updated: CooptationItem = {
      ...coopt,
      status: 'REFUSEE',
      rejectionReason,
      reviewerName: currentUser?.name || 'Romeo Nonvide'
    };

    setCooptations(prev => {
      const list = prev.map(c => c.id === cooptationId ? updated : c);
      setAdminStorage('cooptations', list);
      return list;
    });

    addAuditLog('COOPTATIONS', `Refus motivé de cooptation`, cooptationId, coopt.recommendedPersonName, `${justification} — Motif: ${rejectionReason}`);
    showToast(`Cooptation de ${coopt.recommendedPersonName} refusée avec motif consigné.`);
  };

  // HANDLERS PUBLICITÉ
  const handleUpdateCampaign = (updated: AdvertisingCampaign, justification: string) => {
    setCampaigns(prev => {
      const list = prev.map(c => c.id === updated.id ? updated : c);
      setAdminStorage('campaigns', list);
      return list;
    });
    addAuditLog('PUBLICITE', `Modification campagne sponsor`, updated.id, updated.title, justification);
    showToast(`Campagne "${updated.title}" mise à jour.`);
  };

  const handleAddCampaign = (newCamp: AdvertisingCampaign, justification: string) => {
    setCampaigns(prev => {
      const list = [...prev, newCamp];
      setAdminStorage('campaigns', list);
      return list;
    });
    addAuditLog('PUBLICITE', `Création nouvelle campagne sponsor`, newCamp.id, newCamp.title, justification);
    showToast(`Campagne "${newCamp.title}" créée.`);
  };

  // HANDLERS FINANCES
  const handleUpdatePlatformFee = (newFee: number, justification: string) => {
    setPlatformFee(newFee);
    setAdminStorage('platform_fee', newFee);
    addAuditLog('FINANCES', `Ajustement taux de commission plateforme à ${newFee}%`, 'fee-config', 'Structure Financière Globale', justification);
    showToast(`Commission plateforme ajustée à ${newFee}%.`);
  };

  const handleUpdatePayoutStatus = (earningId: string, newStatus: CoproductionEarning['payoutStatus'], justification: string) => {
    const item = earningsList.find(e => e.id === earningId);
    if (!item) return;

    const updated: CoproductionEarning = {
      ...item,
      payoutStatus: newStatus,
      payoutDate: newStatus === 'PAID' ? new Date().toISOString() : item.payoutDate
    };

    setEarningsList(prev => {
      const list = prev.map(e => e.id === earningId ? updated : e);
      setAdminStorage('earnings', list);
      return list;
    });

    addAuditLog('FINANCES', `Mise à jour versement coproducteur : ${newStatus}`, earningId, `${item.coproducerName} (${item.seriesTitle})`, justification);
    showToast(`Versement mis à jour : ${newStatus}.`);
  };

  // HANDLERS MODÉRATION
  const handleResolveReport = (reportId: string, action: 'RESOLVED' | 'DISMISSED' | 'MASKED', justification: string) => {
    const rep = reports.find(r => r.id === reportId);
    if (!rep) return;

    const newStatus: ReportItem['status'] = action === 'DISMISSED' ? 'DISMISSED' : 'RESOLVED';
    const updated: ReportItem = {
      ...rep,
      status: newStatus
    };

    setReports(prev => {
      const list = prev.map(r => r.id === reportId ? updated : r);
      setAdminStorage('reports', list);
      return list;
    });

    addAuditLog('MODERATION', `Intervention modération (${action})`, reportId, rep.targetTitle, justification);
    showToast(`Signalement ${rep.id} traité (${action}).`);
  };

  // Réinitialisation d'urgence
  const handleResetCatalog = () => {
    if (window.confirm('Voulez-vous réinitialiser toutes les données de test du back-office ?')) {
      localStorage.removeItem('yonywood_custom_documentaries');
      localStorage.removeItem('yonywood_admin_users');
      localStorage.removeItem('yonywood_admin_thematiques');
      localStorage.removeItem('yonywood_admin_questions');
      localStorage.removeItem('yonywood_admin_submitted_stories');
      localStorage.removeItem('yonywood_admin_series_envelopes');
      localStorage.removeItem('yonywood_admin_producers');
      localStorage.removeItem('yonywood_admin_cooptations');
      localStorage.removeItem('yonywood_admin_campaigns');
      localStorage.removeItem('yonywood_admin_reports');
      localStorage.removeItem('yonywood_admin_platform_fee');
      localStorage.removeItem('yonywood_admin_earnings');
      window.location.reload();
    }
  };

  const navTabs = [
    { id: 'overview', label: 'Supervision', icon: LayoutDashboard },
    { id: 'users', label: 'Utilisateurs & Rôles', icon: Users, badge: adminUsers.length },
    { id: 'heritage', label: 'Héritage', icon: Sparkles, badge: submittedStories.filter(s => s.status === 'EN_ATTENTE').length },
    { id: 'series', label: 'Séries', icon: Film },
    { id: 'producers', label: 'Producteurs', icon: Building2 },
    { id: 'cooptations', label: 'Cooptations (2%)', icon: UserCheck, badge: cooptations.filter(c => c.status === 'EN_ATTENTE').length },
    { id: 'advertising', label: 'Publicité & Marques', icon: Megaphone },
    { id: 'finances', label: 'Finances', icon: DollarSign },
    { id: 'moderation', label: 'Modération', icon: ShieldAlert, badge: reports.filter(r => r.status === 'PENDING').length },
    { id: 'audit', label: 'Journal d\'Audit', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-stone-800 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Barre de navigation supérieure */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate({ type: 'profile' })}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#A2482B] text-stone-700 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-stone-200"
            title="Revenir au Profil"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#A2482B] to-[#C89B3C] text-white flex items-center justify-center shadow-md shadow-[#A2482B]/20">
              <Crown className="w-4 h-4 font-black" />
            </div>
            <div>
              <span className="text-sm font-serif font-black text-stone-900 tracking-tight block">
                YonyWood • Back-Office Central & Administration
              </span>
              <p className="text-[10px] text-stone-500">
                Connecté : <span className="text-stone-800 font-semibold">{currentUser?.name || 'Romeo Nonvide'}</span> (Superadministrateur)
              </p>
            </div>
          </div>
        </div>

        {/* Boutons d'action droite */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetCatalog}
            title="Réinitialiser toutes les données d'origine"
            className="hidden sm:flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-800 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Réinitialiser</span>
          </button>

          <button
            onClick={() => onNavigate({ type: 'home' })}
            className="px-3.5 py-1.5 rounded-full bg-[#A2482B] hover:bg-[#8A3B22] text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <span>Voir le site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Barre de navigation des 10 modules du Back-Office */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-5">
        <div className="flex items-center gap-1.5 p-1.5 bg-white border border-stone-200 rounded-2xl overflow-x-auto scrollbar-none shadow-xs">
          {navTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#A2482B] text-white shadow-md shadow-[#A2482B]/20'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
                {tab.badge && tab.badge > 0 ? (
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                    isActive ? 'bg-white text-[#A2482B]' : 'bg-[#A2482B] text-white'
                  }`}>
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu principal selon l'onglet actif */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        {/* 1. TABLEAU DE BORD / SUPERVISION */}
        {activeTab === 'overview' && (
          <AdminOverviewTab
            users={adminUsers}
            seriesList={seriesList}
            submittedStories={submittedStories}
            producers={producers}
            cooptations={cooptations}
            campaigns={campaigns}
            envelopes={envelopes}
            reports={reports}
            auditLogs={auditLogs}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* 2. UTILISATEURS & DOUBLES RÔLES */}
        {activeTab === 'users' && (
          <AdminUsersTab
            users={adminUsers}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
          />
        )}

        {/* 3. HÉRITAGE */}
        {activeTab === 'heritage' && (
          <AdminHeritageTab
            thematiques={thematiques}
            questions={questions}
            submittedStories={submittedStories}
            campaigns={campaigns}
            onUpdateThematique={handleUpdateThematique}
            onAddThematique={handleAddThematique}
            onUpdateQuestion={handleUpdateQuestion}
            onAddQuestion={handleAddQuestion}
            onReviewStory={handleReviewStory}
          />
        )}

        {/* 4. SÉRIES & ENVELOPPES */}
        {activeTab === 'series' && (
          <AdminSeriesTab
            seriesList={seriesList}
            envelopes={envelopes}
            onUpdateSeriesData={handleUpdateSeriesData}
            onUpdateEconomicConfig={handleUpdateEconomicConfig}
          />
        )}

        {/* 5. PRODUCTEURS */}
        {activeTab === 'producers' && (
          <AdminProducersTab
            producers={producers}
            onUpdateProducer={handleUpdateProducer}
            onApprovePayout={handleApproveProducerPayout}
            onAddPayout={handleAddProducerPayout}
          />
        )}

        {/* 6. COOPTATIONS & FILIATION 2% */}
        {activeTab === 'cooptations' && (
          <AdminCooptationsTab
            cooptations={cooptations}
            onApproveCooptation={handleApproveCooptation}
            onRejectCooptation={handleRejectCooptation}
          />
        )}

        {/* 7. PUBLICITÉ & MARQUES */}
        {activeTab === 'advertising' && (
          <AdminAdvertisingTab
            campaigns={campaigns}
            seriesList={seriesList}
            onUpdateCampaign={handleUpdateCampaign}
            onAddCampaign={handleAddCampaign}
          />
        )}

        {/* 8. FINANCES */}
        {activeTab === 'finances' && (
          <AdminFinancesTab
            earningsList={earningsList}
            platformFee={platformFee}
            envelopes={envelopes}
            onUpdatePlatformFee={handleUpdatePlatformFee}
            onUpdatePayoutStatus={handleUpdatePayoutStatus}
          />
        )}

        {/* 9. MODÉRATION */}
        {activeTab === 'moderation' && (
          <AdminModerationTab
            reports={reports}
            onResolveReport={handleResolveReport}
          />
        )}

        {/* 10. JOURNAL D'AUDIT */}
        {activeTab === 'audit' && (
          <AdminAuditTab
            logs={auditLogs}
          />
        )}
      </main>
    </div>
  );
};
