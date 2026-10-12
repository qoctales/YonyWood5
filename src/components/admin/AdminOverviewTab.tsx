import React from 'react';
import { 
  Users, 
  Film, 
  Sparkles, 
  UserCheck, 
  Building2, 
  Megaphone, 
  TrendingUp, 
  Wallet, 
  ShieldAlert, 
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileText,
  DollarSign
} from 'lucide-react';
import { 
  AdminUserAccount, 
  HeritageSubmittedStory, 
  ProducerDossier, 
  CooptationItem, 
  AdvertisingCampaign, 
  SeriesEconomicEnvelope,
  AdminAuditLog
} from '../../types/adminBackOffice';
import { Documentary, ReportItem } from '../../types';

interface AdminOverviewTabProps {
  users: AdminUserAccount[];
  seriesList: Documentary[];
  submittedStories: HeritageSubmittedStory[];
  producers: ProducerDossier[];
  cooptations: CooptationItem[];
  campaigns: AdvertisingCampaign[];
  envelopes: SeriesEconomicEnvelope[];
  reports: ReportItem[];
  auditLogs: AdminAuditLog[];
  onNavigateTab: (tab: string, filterId?: string) => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  users,
  seriesList,
  submittedStories,
  producers,
  cooptations,
  campaigns,
  envelopes,
  reports,
  auditLogs,
  onNavigateTab
}) => {
  // Calculs statistiques temps réel
  const activeUsersCount = users.filter(u => u.accountStatus === 'ACTIF' || u.accountStatus === 'VERIFIE').length;
  const pendingStoriesCount = submittedStories.filter(s => s.status === 'EN_ATTENTE').length;
  const publishedStoriesCount = submittedStories.filter(s => s.status === 'VALIDEE').length;
  const pendingCooptationsCount = cooptations.filter(c => c.status === 'EN_ATTENTE').length;
  const activeCampaignsCount = campaigns.filter(c => c.status === 'EN_COURS').length;
  const pendingReportsCount = reports.filter(r => r.status === 'PENDING').length;
  
  const totalVolumeRaised = envelopes.reduce((acc, env) => acc + env.totalRaised, 0);
  const totalDistributable = envelopes.reduce((acc, env) => acc + env.distributableEnvelope, 0);
  const totalDistributed = envelopes.reduce((acc, env) => acc + env.distributedAmount, 0);
  const pendingPayoutsCount = producers.reduce((acc, p) => 
    acc + p.payoutHistory.filter(h => h.status === 'EN_ATTENTE').length, 0
  );

  return (
    <div className="space-y-8">
      {/* 1. BANDEAU D'ALERTES PRIORITAIRES (Renvoi direct vers les dossiers concernés) */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-3xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Alertes & Dossiers nécessitant une intervention immédiate</span>
          </div>
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
            {pendingStoriesCount + pendingCooptationsCount + pendingReportsCount + pendingPayoutsCount} action(s) requise(s)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Alerte Histoires */}
          <div 
            onClick={() => onNavigateTab('heritage')}
            className="p-3.5 bg-white/90 rounded-2xl border border-amber-200 hover:border-[#A2482B] transition-all cursor-pointer group shadow-xs hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700">Histoires Héritage</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pendingStoriesCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {pendingStoriesCount} en attente
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">
              {pendingStoriesCount > 0 ? 'Vérifier autorisations et droit à l\'image' : 'Toutes les histoires sont traitées'}
            </p>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#A2482B] mt-2 group-hover:translate-x-0.5 transition-transform">
              <span>Examiner les histoires</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Alerte Cooptations */}
          <div 
            onClick={() => onNavigateTab('cooptations')}
            className="p-3.5 bg-white/90 rounded-2xl border border-amber-200 hover:border-[#A2482B] transition-all cursor-pointer group shadow-xs hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700">Cooptations en attente</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pendingCooptationsCount > 0 ? 'bg-orange-100 text-orange-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {pendingCooptationsCount} demande(s)
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">
              {pendingCooptationsCount > 0 ? 'Activation des filiations 2% à valider' : 'Aucune cooptation en attente'}
            </p>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#A2482B] mt-2 group-hover:translate-x-0.5 transition-transform">
              <span>Traiter les cooptations</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Alerte Versements */}
          <div 
            onClick={() => onNavigateTab('producers')}
            className="p-3.5 bg-white/90 rounded-2xl border border-amber-200 hover:border-[#A2482B] transition-all cursor-pointer group shadow-xs hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700">Versements producteurs</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pendingPayoutsCount > 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {pendingPayoutsCount} virement(s)
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">
              Ordres de dividendes en attente de signature
            </p>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#A2482B] mt-2 group-hover:translate-x-0.5 transition-transform">
              <span>Voir les dossiers producteurs</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Alerte Modération */}
          <div 
            onClick={() => onNavigateTab('moderation')}
            className="p-3.5 bg-white/90 rounded-2xl border border-amber-200 hover:border-[#A2482B] transition-all cursor-pointer group shadow-xs hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700">Signalements communauté</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pendingReportsCount > 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {pendingReportsCount} incident(s)
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">
              Atteinte aux droits ou contenus sensibles
            </p>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#A2482B] mt-2 group-hover:translate-x-0.5 transition-transform">
              <span>Arbitrer les signalements</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. GRILLE DES INDICATEURS CLÉS DE PERFORMANCE (KPIs réels de l'application) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Utilisateurs */}
        <div 
          onClick={() => onNavigateTab('users')}
          className="p-5 rounded-3xl bg-white border border-stone-200 hover:border-[#A2482B] transition-all cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
            <span>Utilisateurs</span>
            <Users className="w-4 h-4 text-[#A2482B]" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">{users.length}</div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold mt-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{activeUsersCount} actifs & vérifiés</span>
          </div>
        </div>

        {/* Histoires Héritage */}
        <div 
          onClick={() => onNavigateTab('heritage')}
          className="p-5 rounded-3xl bg-white border border-stone-200 hover:border-[#A2482B] transition-all cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
            <span>Histoires Héritage</span>
            <Sparkles className="w-4 h-4 text-[#C89B3C]" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">{submittedStories.length}</div>
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-1">
            <span className="font-semibold text-emerald-700">{publishedStoriesCount} publiées</span>
            <span>• {pendingStoriesCount} attente</span>
          </div>
        </div>

        {/* Séries Documentaires */}
        <div 
          onClick={() => onNavigateTab('series')}
          className="p-5 rounded-3xl bg-white border border-stone-200 hover:border-[#A2482B] transition-all cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
            <span>Séries Actives</span>
            <Film className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">{seriesList.length}</div>
          <div className="text-[11px] text-stone-500 mt-1">
            Toutes avec double-thématique
          </div>
        </div>

        {/* Cooptations & Filiations */}
        <div 
          onClick={() => onNavigateTab('cooptations')}
          className="p-5 rounded-3xl bg-white border border-stone-200 hover:border-[#A2482B] transition-all cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
            <span>Cooptations</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">{cooptations.length}</div>
          <div className="text-[11px] text-stone-500 mt-1">
            Filiation économique 2%
          </div>
        </div>

        {/* Producteurs */}
        <div 
          onClick={() => onNavigateTab('producers')}
          className="p-5 rounded-3xl bg-white border border-stone-200 hover:border-[#A2482B] transition-all cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
            <span>Producteurs</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">{producers.length}</div>
          <div className="text-[11px] text-stone-500 mt-1">
            Dossiers financiers suivis
          </div>
        </div>

        {/* Campagnes Pub */}
        <div 
          onClick={() => onNavigateTab('advertising')}
          className="p-5 rounded-3xl bg-white border border-stone-200 hover:border-[#A2482B] transition-all cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
            <span>Campagnes Pub</span>
            <Megaphone className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">{campaigns.length}</div>
          <div className="text-[11px] text-stone-500 mt-1">
            {activeCampaignsCount} actuellement en cours
          </div>
        </div>

        {/* Volume Financier Total */}
        <div 
          onClick={() => onNavigateTab('finances')}
          className="p-5 rounded-3xl bg-white border border-stone-200 hover:border-[#A2482B] transition-all cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
            <span>Fonds Levés</span>
            <Wallet className="w-4 h-4 text-[#A2482B]" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            {totalVolumeRaised.toLocaleString('fr-FR')} €
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            Sur l'ensemble des séries
          </div>
        </div>

        {/* Enveloppes Distribuables */}
        <div 
          onClick={() => onNavigateTab('series')}
          className="p-5 rounded-3xl bg-white border border-stone-200 hover:border-[#A2482B] transition-all cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
            <span>Enveloppe Distribuable</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            {totalDistributable.toLocaleString('fr-FR')} €
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            {totalDistributed.toLocaleString('fr-FR')} € déjà versés
          </div>
        </div>

        {/* Signalements */}
        <div 
          onClick={() => onNavigateTab('moderation')}
          className="p-5 rounded-3xl bg-white border border-stone-200 hover:border-[#A2482B] transition-all cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
            <span>Modération</span>
            <ShieldAlert className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">{reports.length}</div>
          <div className="text-[11px] text-stone-500 mt-1">
            {pendingReportsCount} à instruire
          </div>
        </div>

        {/* Journal d'audit */}
        <div 
          onClick={() => onNavigateTab('audit')}
          className="p-5 rounded-3xl bg-white border border-stone-200 hover:border-[#A2482B] transition-all cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
            <span>Traçabilité & Audit</span>
            <FileText className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">{auditLogs.length}</div>
          <div className="text-[11px] text-stone-500 mt-1">
            Actions sensibles tracées
          </div>
        </div>
      </div>

      {/* 3. VUE DE SYNTHÈSE : DERNIÈRES ACTIONS ADMINISTRATIVES & RÉPARTITION PAR SÉRIE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enveloppes par Série */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold font-serif text-stone-900">Enveloppes Financières des Séries</h3>
              <p className="text-xs text-stone-500">Montants levés, distribuables et solde de réserve</p>
            </div>
            <button 
              onClick={() => onNavigateTab('series')}
              className="text-xs font-bold text-[#A2482B] hover:underline"
            >
              Gérer les séries
            </button>
          </div>

          <div className="space-y-3">
            {envelopes.slice(0, 5).map(env => (
              <div key={env.seriesId} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-900">{env.seriesTitle}</div>
                  <div className="text-[10px] text-stone-500">
                    Version éco : <span className="font-mono font-semibold text-stone-700">{env.economicVersion}</span> • Prochain versement : {new Date(env.nextPayoutDate).toLocaleDateString('fr-FR')}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-stone-900 font-mono">
                    {env.totalRaised.toLocaleString('fr-FR')} €
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    {env.distributableEnvelope.toLocaleString('fr-FR')} € distribuables
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dernières entrées du Journal d'Audit */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold font-serif text-stone-900">Journal d'Audit Récent</h3>
              <p className="text-xs text-stone-500">Traçabilité des décisions et des auteurs</p>
            </div>
            <button 
              onClick={() => onNavigateTab('audit')}
              className="text-xs font-bold text-[#A2482B] hover:underline"
            >
              Voir tout l'audit
            </button>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 5).map(log => (
              <div key={log.id} className="p-3 rounded-2xl bg-stone-50 border border-stone-100 text-xs">
                <div className="flex items-center justify-between text-stone-500 text-[10px] mb-1">
                  <span className="font-semibold text-stone-700">{log.authorName} ({log.authorRole})</span>
                  <span className="font-mono">{new Date(log.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="font-semibold text-stone-900 line-clamp-1">{log.action}</div>
                <div className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                  Cible : <span className="text-stone-700 font-medium">{log.targetTitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
