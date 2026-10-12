export type BusinessRole = 
  | 'egerie' 
  | 'membre_coopte' 
  | 'acteur_documentaire' 
  | 'auteur' 
  | 'scenariste' 
  | 'producteur' 
  | 'distributeur_communautaire' 
  | 'referent_cooptation';

export type AdminRole = 
  | 'superadministrateur' 
  | 'responsable_editorial' 
  | 'responsable_production' 
  | 'responsable_commercial' 
  | 'responsable_financier' 
  | 'moderateur' 
  | 'analyste';

export interface AdminUserAccount {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  territory?: string;
  country?: string;
  accountStatus: 'ACTIF' | 'EN_ATTENTE_VERIFICATION' | 'SUSPENDU' | 'VERIFIE';
  businessRoles: BusinessRole[];
  adminRoles: AdminRole[];
  verificationDocuments?: {
    idDocumentProvided: boolean;
    contractSigned: boolean;
    submittedAt: string;
    verifiedAt?: string;
    notes?: string;
  };
  sharesCount?: number;
  createdAt: string;
  lastActiveAt: string;
}

export interface HeritageThematique {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  active: boolean;
  displayOrder: number;
  sponsoredByBrandId?: string;
  sponsoredBrandName?: string;
  storiesCount: number;
  questionsCount: number;
}

export interface HeritageQuestion {
  id: string;
  thematiqueId: string;
  thematiqueTitle: string;
  number: string;
  title: string;
  prompt: string;
  audioPromptUrl?: string;
  videoAvatarUrl?: string;
  status: 'ACTIVE' | 'ARCHIVEE' | 'BROUILLON';
  submissionsCount: number;
}

export interface HeritageSubmittedStory {
  id: string;
  thematiqueId: string;
  thematiqueTitle: string;
  questionId: string;
  questionTitle: string;
  authorName: string;
  authorEmail: string;
  authorRole: string;
  authorAvatarUrl?: string;
  summary: string;
  videoUrl: string;
  videoDuration: string;
  submissionDate: string;
  status: 'EN_ATTENTE' | 'VALIDEE' | 'REFUSEE' | 'MASQUEE' | 'RETIREE';
  legalConsents: {
    rightsGranted: boolean;
    authorIdentityVerified: boolean;
    contractSignedDate?: string;
    rightsScope: string;
  };
  circleHighlight: 'AUCUN' | 'DECOUVERTE' | 'MAJEUR' | 'COEUR_FORET';
  isSponsored: boolean;
  brandSponsor?: string;
  reviewerNotes?: string;
  reviewDate?: string;
  reviewedBy?: string;
}

export interface SeriesEconomicConfig {
  version: string;
  platformFeePercent: number; // ex: 12%
  filiationPoolPercent: number; // ex: 2%
  coproducersPoolPercent: number; // ex: 60%
  creatorsPoolPercent: number; // ex: 26%
  effectiveDate: string;
  updatedBy: string;
  changeNotes: string;
}

export interface SeriesEconomicEnvelope {
  seriesId: string;
  seriesTitle: string;
  coverImage?: string;
  totalRaised: number;
  distributableEnvelope: number;
  distributedAmount: number;
  reserveBalance: number;
  nextPayoutDate: string;
  economicVersion: string;
  currentConfig: SeriesEconomicConfig;
  configHistory: SeriesEconomicConfig[];
}

export interface ProducerSupportedSeries {
  seriesId: string;
  seriesTitle: string;
  proposedAmount: number;
  committedAmount: number;
  receivedAmount: number;
  distributableShareAmount: number;
  contractRef: string;
  contractSignDate: string;
  rightsClauseAcknowledged: boolean; // "Ne constitue pas un droit de propriété ou un titre illimité"
}

export interface ProducerDossier {
  id: string;
  producerName: string;
  legalEntity: string;
  email: string;
  country: string;
  phone?: string;
  supportedSeries: ProducerSupportedSeries[];
  totalProposed: number;
  totalCommitted: number;
  totalReceived: number;
  totalDistributable: number;
  payoutHistory: {
    id: string;
    date: string;
    amount: number;
    seriesTitle: string;
    status: 'PAYE' | 'EN_ATTENTE' | 'EN_COURS';
    bankRef: string;
  }[];
  complianceStatus: 'CONFORME' | 'EN_REVISION' | 'INCOMPLET';
  createdAt: string;
}

export interface CooptationItem {
  id: string;
  seriesId: string;
  seriesTitle: string;
  referentId: string;
  referentName: string;
  referentRole: string;
  recommendedPersonName: string;
  recommendedPersonEmail: string;
  recommendedPersonProfile: string;
  recommendedDate: string;
  status: 'EN_ATTENTE' | 'VALIDEE' | 'REFUSEE';
  rejectionReason?: string;
  admissionDate?: string;
  filiationPercent: number; // 2%
  lineageVolumeGenerated: number;
  lineageCommissionsPaid: number;
  reviewerName?: string;
}

export interface AdvertisingCampaign {
  id: string;
  title: string;
  brandName: string;
  brandLogo?: string;
  targetSeriesId?: string;
  targetSeriesTitle?: string;
  targetThematiqueId?: string;
  targetThematiqueTitle?: string;
  format: 'HABILLAGE_THEME' | 'BANNIERE_DISCRETE' | 'MENTION_OUVERTURE' | 'SPOT_PRE_ROLL';
  budgetCommitted: number;
  budgetConsumed: number;
  startDate: string;
  endDate: string;
  status: 'BROUILLON' | 'VALIDEE' | 'EN_COURS' | 'SUSPENDUE' | 'TERMINEE';
  impressionsCount: number;
  clicksCount: number;
  labelSponsorDisplay: string;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  authorName: string;
  authorEmail: string;
  authorRole: string;
  module: 
    | 'HERITAGE' 
    | 'SERIES' 
    | 'USERS' 
    | 'PRODUCTEURS' 
    | 'COOPTATIONS' 
    | 'PUBLICITE' 
    | 'FINANCES' 
    | 'MODERATION'
    | 'CONFIGURATION';
  action: string;
  targetId: string;
  targetTitle: string;
  justification?: string;
}
