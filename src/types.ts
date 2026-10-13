export interface QuestionTranslation {
  lang: string;
  label: string;
  prompt: string;
}

export interface SeriesEffigie {
  id: string;
  name: string;
  role?: string;
  photoUrl?: string;
  videoUrl?: string;
  protagonistId?: string;
  status?: 'EFFIGIE_PRINCIPALE' | 'EFFIGIE_SERIE' | 'PASSEUR';
}

export interface QuestionItem {
  number: string;
  title: string;
  prompt: string;
  posterUrl?: string;
  videoUrl?: string;
  videoAvatarUrl?: string;
  audioDuration?: string;
  audioVoiceName?: string;
  effigies?: SeriesEffigie[];
  effigieName?: string;
  effigiePhoto?: string;
  effigieVideoUrl?: string;
  effigieProtagonistId?: string;
  translations?: QuestionTranslation[];
}

export interface UniverseInfo {
  name: string;
  tagline: string;
  description: string;
  territory: string;
}

export interface StoryCredit {
  role: 'story_owner' | 'director' | 'mentor' | 'camera' | 'sound';
  label: string;
  name: string;
  profileId?: string;
}

export interface ProtagonistStory {
  id: string;
  title: string;
  questionNumber: string;
  questionTitle: string;
  duration: string;
  summary: string;
  videoCoverUrl: string;
  videoDurationSeconds: number;
  credits: StoryCredit[];
}

export interface ProtagonistPasseur {
  id: string;
  name: string;
  role: string;
  country: string;
  photo: string;
}

export interface Protagonist {
  id: string;
  slug: string;
  name: string;
  firstName?: string;
  age?: number;
  role: string;
  territory: string;
  country: string;
  flag: string;
  bio: string;
  photoUrl: string;
  photo?: string;
  videoPreviewUrl?: string;
  videoAvatarUrl?: string;
  teaserVideoUrl?: string;
  documentaryId?: string;
  universeTag: string;
  quote: string;
  centralQuestion?: string;
  details?: any;
  storiesCount?: number;
  transmissionsCount?: number;
  projectsCount?: number;
  socialLinks?: any;
  seriesRoles?: Array<{
    role: 'producteur' | 'effigie' | 'auteur' | 'scenariste' | 'realisateur' | 'distributeur';
    roleLabel: string;
    seriesId: string;
    seriesTitle: string;
  }>;
  tree?: {
    passeurs?: ProtagonistPasseur[];
    heritiers?: ProtagonistPasseur[];
    transmissions: {
      id: string;
      title: string;
      ancestorOrMentor: string;
      description: string;
      connectedProtagonistId?: string;
    }[];
    duos: {
      id: string;
      partnerName: string;
      partnerRole: string;
      partnerPhoto: string;
      duoId: string;
      question: string;
    }[];
    opportunities: {
      id: string;
      title: string;
      description: string;
      badge: string;
    }[];
    creations: {
      id: string;
      title: string;
      type: string;
      description: string;
      priceOrDetail?: string;
    }[];
    parcours?: {
      id: string;
      year: string;
      title: string;
      location: string;
      role: string;
      description: string;
      highlight?: string;
      photoUrl?: string;
    }[];
    offers?: {
      id: string;
      title: string;
      type: 'produit' | 'service' | 'atelier' | 'consultation';
      categoryLabel: string;
      pricing: string;
      description: string;
      photoUrl?: string;
      stock?: string;
      origin?: string;
    }[];
    projects: {
      id: string;
      title: string;
      stage: string;
      description: string;
    }[];
    needs: {
      id: string;
      title: string;
      urgency: string;
      description: string;
    }[];
  };
  stories: ProtagonistStory[];
}

export interface ParcoursItem {
  id: string;
  year: string;
  title: string;
  location: string;
  role: string;
  description: string;
  highlight?: string;
  photoUrl?: string;
}

export interface OfferItem {
  id: string;
  title: string;
  type: 'produit' | 'service' | 'atelier' | 'consultation';
  categoryLabel: string;
  pricing: string;
  description: string;
  photoUrl?: string;
  stock?: string;
  origin?: string;
}

export interface SeriesAuthor {
  id?: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  protagonistId?: string;
}

export interface SeriesScreenwriter {
  id?: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  protagonistId?: string;
}

export interface SeriesDirector {
  id?: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  protagonistId?: string;
}

export interface SeriesProducerUser {
  id: string;
  name: string;
  avatarUrl: string;
  roleTitle: string;
  pledgeAmount?: number;
  joinedAt: string;
  bio?: string;
  videoPresentationUrl?: string;
  protagonistId?: string;
}

export interface SeriesDistributor {
  id: string;
  name: string;
  avatarUrl?: string;
  roleOrChannel: string;
  protagonistId?: string;
}

export interface SeriesSponsor {
  id: string;
  companyName: string;
  logoUrl?: string;
  websiteUrl?: string;
  partnershipType: string;
  description?: string;
}

export interface SequenceCredits {
  casting: Array<{
    name: string;
    roleOrCharacter: string;
    avatarUrl?: string;
    protagonistId?: string;
    age?: number;
  }>;
  director: {
    name: string;
    roleTitle?: string;
    avatarUrl?: string;
    protagonistId?: string;
  };
  postProduction: Array<{
    name: string;
    role: string;
    avatarUrl?: string;
    protagonistId?: string;
  }>;
}

export interface Documentary {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  centralQuestion: string;
  description: string;
  shortSynopsis?: string;
  coverImage: string;
  posterUrl?: string;
  teaserVideoUrl?: string;
  teaserDuration?: string;
  universes: [UniverseInfo, UniverseInfo];
  questions: QuestionItem[];
  episodeCount: number;
  protagonistsCount: number;
  territories: string[];
  effigies?: SeriesEffigie[];
  author?: SeriesAuthor;
  screenwriter?: SeriesScreenwriter;
  director?: SeriesDirector;
  producers?: SeriesProducerUser[];
  distributors?: SeriesDistributor[];
  sponsors?: SeriesSponsor[];
}

export interface Duo {
  id: string;
  slug: string;
  documentaryId: string;
  documentaryTitle: string;
  episodeNumber: string;
  protagonistA: Protagonist;
  protagonistB: Protagonist;
  questionNumber: string;
  questionTitle: string;
  centralQuestion: string;
  quoteA: string;
  quoteB: string;
  coverImage: string;
  storyA: ProtagonistStory;
  storyB: ProtagonistStory;
  editorialReflection: string;
  credits?: SequenceCredits;
}

export interface Videographer {
  id: string;
  name: string;
  age?: number;
  photo?: string;
  photoUrl?: string;
  territory: string;
  country?: string;
  bio: string;
  gear?: string;
  equipment?: string;
  specialties?: string[];
  languages?: string[];
  rateInfo?: string;
  rate?: string;
  availability?: string;
  verified?: boolean;
  completedShoots?: number;
  rating?: number;
  storiesShot?: number;
}

export interface ReviewCandidate {
  id: string;
  candidateName: string;
  candidatePhoto?: string;
  territory: string;
  documentaryTitle: string;
  questionNumber: string;
  questionTitle: string;
  storyTitle: string;
  summary: string;
  duration: string;
  stage: string;
  currentReviewsCount: number;
  requiredReviewsCount: number;
  videoCoverUrl: string;
}

export interface CommunityReviewItem {
  id: string;
  candidateName: string;
  candidatePhoto: string;
  territory: string;
  documentaryTitle: string;
  questionNumber: string;
  questionTitle: string;
  pitch: string;
  videoDuration: string;
  videoThumbnail: string;
  supports: number;
  revisionRequests: number;
  userVoted?: 'SUPPORT' | 'REVISION';
}

export interface BackOfficeApplication {
  id: string;
  candidateName: string;
  candidatePhoto: string;
  territory: string;
  documentaryId: string;
  documentaryTitle: string;
  universeGroup: string;
  status: 'NOUVELLES' | 'CONTROLE_TECHNIQUE' | 'AVIS_FORET' | 'COMITE' | 'REVISIONS' | 'APPROUVEES' | 'PUBLIEES';
  submittedDate: string;
  assignedReviewer: string;
  technicalStatus: 'EN_ATTENTE' | 'VALIDE' | 'REVISION_REQUISE';
  videoDuration: string;
}

export interface AffiliationPerson {
  id: string;
  name: string;
  firstName?: string;
  age: number;
  role: string;
  territory: string;
  country: string;
  flag: string;
  universeTag: string;
  photoUrl: string;
  isPioneer?: boolean;
  badge: string;
  invitationStory: string;
  invitedById?: string;
  invitedByName?: string;
  invitedPeople?: AffiliationPerson[];
  duoPartnerName?: string;
  duoPartnerPhoto?: string;
  duoId?: string;
  episodeQuestion?: string;
  question?: string;
  protagonistIdRef?: string;
  teaserVideoUrl?: string;
  teaserPitch?: string;
  generation?: number;
}

export interface SeriesAffiliationTree {
  seriesId: string;
  seriesTitle: string;
  subtitle: string;
  description: string;
  centralQuestion: string;
  totalAffiliatedCount: number;
  generationsCount: number;
  pioneers: AffiliationPerson[];
}

export interface StoryResonanceRating {
  storyId: string;
  topicId: string;
  percentage?: number;
  ratings?: {
    authenticity: number;
    relevance: number;
    impact: number;
  };
  createdAt: string;
}

export type ExplorerCategory = 
  | 'series' 
  // Les 16 Dimensions Officielles
  | 'sagesses'
  | 'territoires'
  | 'expertises'
  | 'produits-services'
  | 'projets'
  | 'marques'
  | 'personnalites'
  | 'figures-du-quotidien'
  | 'evenements'
  | 'communautes'
  | 'institutions'
  | 'objets'
  | 'savoir-faire'
  | 'passions'
  | 'moments-de-vie'
  // Alias de rétrocompatibilité
  | 'countries' 
  | 'thematics' 
  | 'personalities' 
  | 'brands' 
  | 'projects' 
  | 'offers' 
  | 'questions';

export interface ExplorerTopicItem {
  id: string;
  title: string;
  category: ExplorerCategory;
  tagline?: string;
  flag?: string;
  photoUrl?: string;
  badge?: string;
}

export interface ExplorerStoryItem {
  id: string;
  topicId: string;
  protagonistIdRef: string;
  name: string;
  firstName?: string;
  age: number;
  role: string;
  territory: string;
  country: string;
  flag: string;
  photoUrl: string;
  teaserVideoUrl: string;
  teaserPitch: string;
  storyTitle: string;
  universeTag: string;
}

export type UserRole = 'ADMIN' | 'CREATOR' | 'USER';

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string;
  territory?: string;
  country?: string;
  sharesCount?: number;
  createdAt: string;
}

export interface ReportItem {
  id: string;
  reason: 'inappropriate' | 'copyright' | 'violence' | 'misinformation' | 'other';
  reasonLabel: string;
  details?: string;
  targetType: 'duo' | 'series' | 'episode';
  targetId: string;
  targetTitle: string;
  reportedBy: string;
  createdAt: string;
  status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
}

export interface CoproductionEarning {
  id: string;
  coproducerName: string;
  coproducerEmail: string;
  seriesId: string;
  seriesTitle: string;
  initialInvestment: number;
  sharesOwned: number;
  totalViews: number;
  audienceMilestone: string;
  dividendEarned: number;
  payoutStatus: 'PAID' | 'PENDING' | 'PROCESSING';
  payoutDate?: string;
}

export interface PlatformFinancials {
  platformFeePercentage: number;
  totalFundsRaised: number;
  totalPlatformRevenue: number;
  totalDividendsPaid: number;
  activeCoproducersCount: number;
  earnings: CoproductionEarning[];
}

export type OrderStatus =
  | 'COMMANDE_PASSEE'
  | 'COMMANDE_CONFIRMEE'
  | 'EN_PREPARATION'
  | 'EXPEDIEE'
  | 'RECUE'
  | 'TERMINEE'
  | 'PROBLEME_SIGNALE';

export interface UserPurchaseOrder {
  id: string;
  itemTitle: string;
  itemType: 'produit' | 'service';
  categoryLabel?: string;
  sellerId: string;
  sellerName: string;
  sellerPhoto?: string;
  orderDate: string;
  amount: number;
  currency: string;
  quantity: number;
  status: OrderStatus;
  statusHistory: { status: OrderStatus; date: string; note?: string }[];
  deliveryInfo?: string;
  trackingNumber?: string;
  buyerNotes?: string;
  issueReported?: {
    date: string;
    description: string;
    resolutionStatus: 'EN_ATTENTE' | 'EN_MEDIATION' | 'RESOLU';
  };
}

export type ContributionStatus =
  | 'CONTRIBUTION_EFFECTUEE'
  | 'CONTREPARTIE_A_VENIR'
  | 'CONTREPARTIE_EN_COURS'
  | 'CONTREPARTIE_ATTRIBUEE'
  | 'CONTREPARTIE_SANS'
  | 'PROBLEME_SIGNALE';

export interface UserProjectContribution {
  id: string;
  projectId: string;
  projectTitle: string;
  projectOwnerId: string;
  projectOwnerName: string;
  projectOwnerPhoto?: string;
  date: string;
  amount: number;
  nature: string;
  counterpart?: {
    id: string;
    title: string;
    description: string;
    estimatedDelivery?: string;
    isDelivered: boolean;
  };
  status: ContributionStatus;
  statusHistory: { status: ContributionStatus; date: string; note?: string }[];
  issueReported?: {
    date: string;
    description: string;
    resolutionStatus: 'EN_ATTENTE' | 'EN_MEDIATION' | 'RESOLU';
  };
}

export type ViewScreen = 
  | { type: 'landing' }
  | { type: 'home' }
  | { type: 'matrix_view' }
  | { type: 'duo_feed'; selectedDocId?: string; currentDuoIndex?: number }
  | { 
      type: 'marketplace'; 
      initialPeerOfferId?: string; 
      initialPeerIndex?: number; 
      initialTab?: 'coproduire' | 'marche';
      restoreContext?: {
        offerId: string;
        offerIndex: number;
        sellerId: string;
        sellerName: string;
        sharesCount: number;
        unitPrice: number;
        seriesTitle: string;
      };
    }
  | { type: 'documentaries' }
  | { type: 'documentary_detail'; documentaryId: string }
  | { type: 'duo_detail'; duoId: string }
  | { type: 'video_player'; story: ProtagonistStory; protagonist: Protagonist; duoId?: string; documentaryTitle: string }
  | { 
      type: 'protagonist_profile'; 
      protagonistId: string; 
      returnToDuoId?: string; 
      returnToDuoIndex?: number; 
      returnToDocId?: string; 
      returnToProtagonistId?: string; 
      initialShowLineage?: boolean;
      returnToMarketplace?: boolean;
      marketplaceContext?: {
        offerId: string;
        offerIndex: number;
        sellerId: string;
        sellerName: string;
        sharesCount: number;
        unitPrice: number;
        seriesTitle: string;
      };
    }
  | { type: 'transmission_detail'; protagonistId: string; transmissionId: string }
  | { type: 'my_forest' }
  | { 
      type: 'profile'; 
      returnToDuoId?: string; 
      returnToDuoIndex?: number; 
      returnToDocId?: string; 
      returnToProtagonistId?: string; 
      initialShowLineage?: boolean;
      initialModal?: 'orders' | 'contributions';
    }
  | { type: 'settings'; returnTo?: 'profile' | 'duo_feed' }
  | { type: 'portfolio'; returnToDuoId?: string; returnToDuoIndex?: number; returnToDocId?: string }
  | { type: 'transactions'; initialTab?: 'achats' | 'projets' | 'parts'; returnToDuoId?: string; returnToDuoIndex?: number; returnToDocId?: string }
  | { type: 'messaging' }
  | { type: 'lineage'; protagonistId?: string; returnToDuoId?: string; returnToDuoIndex?: number; returnToDocId?: string; returnToProtagonistId?: string }
  | { type: 'submit_story'; preselectedDocumentaryId?: string }
  | { type: 'request_videographer' }
  | { type: 'review_system' }
  | { type: 'forest_reviews' }
  | { type: 'site_map' }
  | { type: 'editorial_backoffice' }
  | { 
      type: 'admin_dashboard'; 
      tab?: 'overview' | 'users' | 'heritage' | 'series' | 'producers' | 'cooptations' | 'advertising' | 'finances' | 'moderation' | 'audit' | string;
      filterId?: string;
      seriesId?: string;
    };
