import {
  AdminUserAccount,
  HeritageThematique,
  HeritageQuestion,
  HeritageSubmittedStory,
  SeriesEconomicEnvelope,
  ProducerDossier,
  CooptationItem,
  AdvertisingCampaign,
  AdminAuditLog
} from '../types/adminBackOffice';

export const INITIAL_ADMIN_USERS: AdminUserAccount[] = [
  {
    id: 'usr-admin-romeo',
    email: 'qoctales@gmail.com',
    name: 'Romeo Nonvide',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Fondateur & Directeur éditorial de YonyWood.',
    territory: 'Cotonou & Paris',
    country: 'Bénin',
    accountStatus: 'VERIFIE',
    businessRoles: ['auteur', 'referent_cooptation', 'producteur'],
    adminRoles: ['superadministrateur', 'responsable_editorial'],
    verificationDocuments: {
      idDocumentProvided: true,
      contractSigned: true,
      submittedAt: '2026-01-10',
      verifiedAt: '2026-01-12',
      notes: 'Fondateur vérifié, pièce nationale et statuts validés.'
    },
    sharesCount: 150,
    createdAt: '2026-01-15',
    lastActiveAt: '2026-10-12T12:00:00Z'
  },
  {
    id: 'usr-creator-amina',
    email: 'amina.traore@yonywood.com',
    name: 'Amina Traoré',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Passeuse de mémoires sonores et artisane du tissage traditionnel.',
    territory: 'Ganvié',
    country: 'Bénin',
    accountStatus: 'VERIFIE',
    businessRoles: ['egerie', 'acteur_documentaire', 'auteur'],
    adminRoles: ['responsable_editorial'],
    verificationDocuments: {
      idDocumentProvided: true,
      contractSigned: true,
      submittedAt: '2026-02-01',
      verifiedAt: '2026-02-03',
      notes: 'Contrat d\'égérie et cession de droits signés.'
    },
    sharesCount: 45,
    createdAt: '2026-02-01',
    lastActiveAt: '2026-10-11T16:30:00Z'
  },
  {
    id: 'usr-creator-koffi',
    email: 'koffi.mensah@yonywood.com',
    name: 'Koffi Mensah',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    bio: 'Maître forgeron et gardien du feu sacré à Ouidah.',
    territory: 'Ouidah',
    country: 'Bénin',
    accountStatus: 'VERIFIE',
    businessRoles: ['egerie', 'acteur_documentaire'],
    adminRoles: [],
    verificationDocuments: {
      idDocumentProvided: true,
      contractSigned: true,
      submittedAt: '2026-02-10',
      verifiedAt: '2026-02-12',
      notes: 'Autorisations de tournage et cession audiovisuelle en règle.'
    },
    sharesCount: 30,
    createdAt: '2026-02-10',
    lastActiveAt: '2026-10-10T11:20:00Z'
  },
  {
    id: 'usr-coopt-malik',
    email: 'malik.diop@yonywood.com',
    name: 'Malik Diop',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    bio: 'Architecte en terre crue et transmetteur bioclimatique.',
    territory: 'Saint-Louis',
    country: 'Sénégal',
    accountStatus: 'ACTIF',
    businessRoles: ['membre_coopte', 'acteur_documentaire'],
    adminRoles: [],
    verificationDocuments: {
      idDocumentProvided: true,
      contractSigned: false,
      submittedAt: '2026-03-05',
      notes: 'En attente du retour de convention signée.'
    },
    sharesCount: 20,
    createdAt: '2026-03-05',
    lastActiveAt: '2026-10-09T09:15:00Z'
  },
  {
    id: 'usr-prod-sophie',
    email: 'sophie.morel@culture-invest.fr',
    name: 'Sophie Morel',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Directrice des investissements chez Culture Invest Paris.',
    territory: 'Paris',
    country: 'France',
    accountStatus: 'VERIFIE',
    businessRoles: ['producteur'],
    adminRoles: ['responsable_financier'],
    verificationDocuments: {
      idDocumentProvided: true,
      contractSigned: true,
      submittedAt: '2026-02-18',
      verifiedAt: '2026-02-20',
      notes: 'Dossier société Kbis et procuration signée validés.'
    },
    sharesCount: 150,
    createdAt: '2026-02-18',
    lastActiveAt: '2026-10-12T08:00:00Z'
  },
  {
    id: 'usr-coopt-fatou',
    email: 'fatou.diallo@terroir.sn',
    name: 'Fatou Diallo',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    bio: 'Experte en agroforesterie et valorisation des semences anciennes.',
    territory: 'Thiès',
    country: 'Sénégal',
    accountStatus: 'EN_ATTENTE_VERIFICATION',
    businessRoles: ['membre_coopte', 'referent_cooptation'],
    adminRoles: [],
    verificationDocuments: {
      idDocumentProvided: true,
      contractSigned: false,
      submittedAt: '2026-04-01',
      notes: 'Pièce d\'identité reçue, en cours d\'examen.'
    },
    sharesCount: 15,
    createdAt: '2026-04-01',
    lastActiveAt: '2026-10-08T18:40:00Z'
  },
  {
    id: 'usr-mod-carine',
    email: 'carine.kouassi@yonywood.com',
    name: 'Carine Kouassi',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    bio: 'Spécialiste de la conformité audiovisuelle et modératrice communautaire.',
    territory: 'Abidjan',
    country: 'Côte d\'Ivoire',
    accountStatus: 'VERIFIE',
    businessRoles: ['distributeur_communautaire'],
    adminRoles: ['moderateur'],
    verificationDocuments: {
      idDocumentProvided: true,
      contractSigned: true,
      submittedAt: '2026-02-25',
      verifiedAt: '2026-02-27',
      notes: 'Charte déontologique et accord de modération validés.'
    },
    sharesCount: 10,
    createdAt: '2026-02-25',
    lastActiveAt: '2026-10-12T10:45:00Z'
  }
];

export const INITIAL_HERITAGE_THEMATIQUES: HeritageThematique[] = [
  {
    id: 'th-sagesses',
    slug: 'sagesses',
    title: 'Sagesses & Spiritualités',
    subtitle: 'Rites vivants, cosmologies et transmissions de la foi',
    description: 'Exploration des traditions initiatiques, du dialogue entre croyances ancestrales et modernité.',
    coverImage: '/assets/doors/door-sagesses.jpg',
    active: true,
    displayOrder: 1,
    sponsoredByBrandId: 'brand-fondation-afrique',
    sponsoredBrandName: 'Fondation Racines Vivantes',
    storiesCount: 28,
    questionsCount: 5
  },
  {
    id: 'th-memoires',
    slug: 'memoires',
    title: 'Mémoires & Résistances',
    subtitle: 'Lignées de courage, récits de dignité et émancipation',
    description: 'Les voix qui ont forgé la dignité des peuples et traversé les silences de l\'histoire.',
    coverImage: '/assets/doors/door-memoires.jpg',
    active: true,
    displayOrder: 2,
    storiesCount: 34,
    questionsCount: 6
  },
  {
    id: 'th-territoires',
    slug: 'territoires',
    title: 'Territoires & Écologies',
    subtitle: 'Savoirs de l\'eau, de la terre et des écosystèmes',
    description: 'La relation symbiotique des communautés avec leurs fleuves, leurs forêts et leurs sols vivants.',
    coverImage: '/assets/doors/door-territoires.jpg',
    active: true,
    displayOrder: 3,
    storiesCount: 19,
    questionsCount: 4
  },
  {
    id: 'th-competences',
    slug: 'competences',
    title: 'Compétences & Métiers d\'Art',
    subtitle: 'La main qui façonne, l\'alchimie des matières',
    description: 'Forge, tissage, sculpture, architecture de terre : la transmission du geste créateur.',
    coverImage: '/assets/doors/door-competences.jpg',
    active: true,
    displayOrder: 4,
    sponsoredByBrandId: 'brand-luxe-artisanat',
    sponsoredBrandName: 'Maison Dixeat & Compagnons',
    storiesCount: 42,
    questionsCount: 7
  },
  {
    id: 'th-projets',
    slug: 'projets',
    title: 'Bâtisseurs du Futur',
    subtitle: 'Audace entrepreneuriale et souveraineté solidaire',
    description: 'Ceux qui financent, bâtissent et relient les talents pour transformer durablement leur terroir.',
    coverImage: '/assets/doors/door-projets.jpg',
    active: true,
    displayOrder: 5,
    storiesCount: 15,
    questionsCount: 4
  }
];

export const INITIAL_HERITAGE_QUESTIONS: HeritageQuestion[] = [
  {
    id: 'hq-1',
    thematiqueId: 'th-sagesses',
    thematiqueTitle: 'Sagesses & Spiritualités',
    number: '01',
    title: 'L\'Éveil Initiatique',
    prompt: 'Racontez un moment de votre existence où votre foi ou une sagesse ancienne s\'est imposée à vous comme une évidence.',
    audioPromptUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    status: 'ACTIVE',
    submissionsCount: 14
  },
  {
    id: 'hq-2',
    thematiqueId: 'th-sagesses',
    thematiqueTitle: 'Sagesses & Spiritualités',
    number: '02',
    title: 'L\'Épreuve Traversée',
    prompt: 'Quelle épreuve personnelle avez-vous surmontée en puisant dans la force de vos ancêtres ou de votre croyance ?',
    audioPromptUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    status: 'ACTIVE',
    submissionsCount: 9
  },
  {
    id: 'hq-3',
    thematiqueId: 'th-memoires',
    thematiqueTitle: 'Mémoires & Résistances',
    number: '01',
    title: 'Le Pacte de Dignité',
    prompt: 'Quelle parole reçue d\'un aîné a façonné votre refus irrévocable de la résignation ?',
    audioPromptUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    status: 'ACTIVE',
    submissionsCount: 18
  },
  {
    id: 'hq-4',
    thematiqueId: 'th-competences',
    thematiqueTitle: 'Compétences & Métiers d\'Art',
    number: '01',
    title: 'Le Geste Parfait',
    prompt: 'Quel secret technique ou quel tour de main vous a été confié, et comment veillez-vous à ce qu\'il ne s\'éteigne pas ?',
    audioPromptUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    status: 'ACTIVE',
    submissionsCount: 22
  }
];

export const INITIAL_SUBMITTED_STORIES: HeritageSubmittedStory[] = [
  {
    id: 'story-sub-1',
    thematiqueId: 'th-sagesses',
    thematiqueTitle: 'Sagesses & Spiritualités',
    questionId: 'hq-1',
    questionTitle: 'L\'Éveil Initiatique',
    authorName: 'Mawuna Houngbo',
    authorEmail: 'mawuna.h@heritage-vox.org',
    authorRole: 'Chantre et herboriste',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    summary: 'Récit d\'une nuit de veille au sanctuaire d\'Allada où les chants des anciens ont guéri une blessure d\'enfance.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videoDuration: '02:45',
    submissionDate: '2026-10-10T14:30:00Z',
    status: 'EN_ATTENTE',
    legalConsents: {
      rightsGranted: true,
      authorIdentityVerified: true,
      contractSignedDate: '2026-10-10',
      rightsScope: 'Diffusion non-exclusive mondiale YonyWood & conservation patrimoniale'
    },
    circleHighlight: 'DECOUVERTE',
    isSponsored: false,
    reviewerNotes: 'Qualité sonore et ferveur remarquables. Nécessite simple vérification du cadrage.'
  },
  {
    id: 'story-sub-2',
    thematiqueId: 'th-competences',
    thematiqueTitle: 'Compétences & Métiers d\'Art',
    questionId: 'hq-4',
    questionTitle: 'Le Geste Parfait',
    authorName: 'Kodjo Agossou',
    authorEmail: 'kodjo.bronze@ouidah-forge.bj',
    authorRole: 'Maître fondeur à la cire perdue',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    summary: 'La coulée du bronze sacré au lever du soleil : transmission de 5 générations d\'artisans fondeurs.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    videoDuration: '03:12',
    submissionDate: '2026-10-09T09:15:00Z',
    status: 'VALIDEE',
    legalConsents: {
      rightsGranted: true,
      authorIdentityVerified: true,
      contractSignedDate: '2026-10-09',
      rightsScope: 'Autorisation complète d\'exploitation et archivage musée numérique'
    },
    circleHighlight: 'COEUR_FORET',
    isSponsored: true,
    brandSponsor: 'Maison Dixeat & Compagnons',
    reviewerNotes: 'Contenu magistral, éligible à la vitrine officielle d\'Héritage.',
    reviewDate: '2026-10-10T10:00:00Z',
    reviewedBy: 'Romeo Nonvide'
  },
  {
    id: 'story-sub-3',
    thematiqueId: 'th-memoires',
    thematiqueTitle: 'Mémoires & Résistances',
    questionId: 'hq-3',
    questionTitle: 'Le Pacte de Dignité',
    authorName: 'Assane Sène',
    authorEmail: 'assane.sene@resistance-terroir.org',
    authorRole: 'Conteur de la vallée du fleuve',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    summary: 'Témoignage sur la révolte pacifique des paysans de Podor contre l\'accaparement des berges.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    videoDuration: '04:10',
    submissionDate: '2026-10-08T17:50:00Z',
    status: 'EN_ATTENTE',
    legalConsents: {
      rightsGranted: true,
      authorIdentityVerified: false,
      rightsScope: 'En attente de transmission de pièce justificative'
    },
    circleHighlight: 'AUCUN',
    isSponsored: false,
    reviewerNotes: 'Récit poignant, mais pièce d\'identité manquante pour valider la cession juridique.'
  },
  {
    id: 'story-sub-4',
    thematiqueId: 'th-sagesses',
    thematiqueTitle: 'Sagesses & Spiritualités',
    questionId: 'hq-2',
    questionTitle: 'L\'Épreuve Traversée',
    authorName: 'Éléonore Vance',
    authorEmail: 'eleonore.vance@luxevivi.com',
    authorRole: 'Parfumeuse de fleurs sacrées',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    summary: 'Quand une tempête en mer a sauvé son atelier et éveillé sa vocation pour les essences thérapeutiques.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    videoDuration: '02:50',
    submissionDate: '2026-10-05T11:00:00Z',
    status: 'VALIDEE',
    legalConsents: {
      rightsGranted: true,
      authorIdentityVerified: true,
      contractSignedDate: '2026-10-06',
      rightsScope: 'Cession complète et diffusion tous supports'
    },
    circleHighlight: 'MAJEUR',
    isSponsored: false,
    reviewerNotes: 'Validée par le comité éditorial.',
    reviewDate: '2026-10-06T15:20:00Z',
    reviewedBy: 'Amina Traoré'
  }
];

export const INITIAL_SERIES_ENVELOPES: SeriesEconomicEnvelope[] = [
  {
    seriesId: 'jesus-legba',
    seriesTitle: 'Èṣù < > Jésus',
    coverImage: '/assets/posters/jesus-esu.webp',
    totalRaised: 18500,
    distributableEnvelope: 11100,
    distributedAmount: 3840,
    reserveBalance: 7260,
    nextPayoutDate: '2026-11-15',
    economicVersion: 'v2.1',
    currentConfig: {
      version: 'v2.1',
      platformFeePercent: 12,
      filiationPoolPercent: 2,
      coproducersPoolPercent: 60,
      creatorsPoolPercent: 26,
      effectiveDate: '2026-03-01',
      updatedBy: 'Romeo Nonvide',
      changeNotes: 'Ajustement de la réserve pour renforcement de la distribution physique et festivals.'
    },
    configHistory: [
      {
        version: 'v1.0',
        platformFeePercent: 10,
        filiationPoolPercent: 2,
        coproducersPoolPercent: 65,
        creatorsPoolPercent: 23,
        effectiveDate: '2026-01-01',
        updatedBy: 'Romeo Nonvide',
        changeNotes: 'Configuration initiale de lancement.'
      }
    ]
  },
  {
    seriesId: 'investors-builders',
    seriesTitle: 'Investors < > Builders',
    coverImage: '/assets/posters/investors-builders.webp',
    totalRaised: 24000,
    distributableEnvelope: 14400,
    distributedAmount: 5200,
    reserveBalance: 9200,
    nextPayoutDate: '2026-11-01',
    economicVersion: 'v2.0',
    currentConfig: {
      version: 'v2.0',
      platformFeePercent: 12,
      filiationPoolPercent: 2,
      coproducersPoolPercent: 60,
      creatorsPoolPercent: 26,
      effectiveDate: '2026-02-15',
      updatedBy: 'Sophie Morel',
      changeNotes: 'Standardisation de la commission plateforme à 12% et filiation à 2%.'
    },
    configHistory: []
  },
  {
    seriesId: 'finagnon-qosqorico',
    seriesTitle: 'Finagnon < > Qosqorico',
    coverImage: '/assets/posters/finagnon-qosqorico.webp',
    totalRaised: 14200,
    distributableEnvelope: 8520,
    distributedAmount: 2650,
    reserveBalance: 5870,
    nextPayoutDate: '2026-11-20',
    economicVersion: 'v1.2',
    currentConfig: {
      version: 'v1.2',
      platformFeePercent: 12,
      filiationPoolPercent: 2,
      coproducersPoolPercent: 60,
      creatorsPoolPercent: 26,
      effectiveDate: '2026-02-01',
      updatedBy: 'Romeo Nonvide',
      changeNotes: 'Prise en compte des partenariats agricoles transatlantiques.'
    },
    configHistory: []
  },
  {
    seriesId: 'blacks-one-beyond-eve',
    seriesTitle: 'Blacks One < > Beyond Eve',
    coverImage: '/assets/posters/blacks-one-beyond-eve.webp',
    totalRaised: 29500,
    distributableEnvelope: 17700,
    distributedAmount: 6420,
    reserveBalance: 11280,
    nextPayoutDate: '2026-10-30',
    economicVersion: 'v2.2',
    currentConfig: {
      version: 'v2.2',
      platformFeePercent: 12,
      filiationPoolPercent: 2,
      coproducersPoolPercent: 60,
      creatorsPoolPercent: 26,
      effectiveDate: '2026-03-10',
      updatedBy: 'Sophie Morel',
      changeNotes: 'Reconnaissance des records d\'audience (+30% au palier 100k).'
    },
    configHistory: []
  },
  {
    seriesId: 'dixeat-fiat-luxe',
    seriesTitle: 'E Vivi < > Fiat Luxe',
    coverImage: '/assets/posters/e-vivi-fiat-luxe.webp',
    totalRaised: 16800,
    distributableEnvelope: 10080,
    distributedAmount: 3100,
    reserveBalance: 6980,
    nextPayoutDate: '2026-11-10',
    economicVersion: 'v1.5',
    currentConfig: {
      version: 'v1.5',
      platformFeePercent: 12,
      filiationPoolPercent: 2,
      coproducersPoolPercent: 60,
      creatorsPoolPercent: 26,
      effectiveDate: '2026-02-28',
      updatedBy: 'Romeo Nonvide',
      changeNotes: 'Harmonisation avec les galeries partenaires du Bénin et de Suisse.'
    },
    configHistory: []
  },
  {
    seriesId: 'other-eyes-sixth-sense',
    seriesTitle: 'Other eyes < > Sixth sense',
    coverImage: '/assets/posters/Other eyes < > Sixth sense.png',
    totalRaised: 12200,
    distributableEnvelope: 7320,
    distributedAmount: 1800,
    reserveBalance: 5520,
    nextPayoutDate: '2026-11-28',
    economicVersion: 'v1.0',
    currentConfig: {
      version: 'v1.0',
      platformFeePercent: 12,
      filiationPoolPercent: 2,
      coproducersPoolPercent: 60,
      creatorsPoolPercent: 26,
      effectiveDate: '2026-03-15',
      updatedBy: 'Romeo Nonvide',
      changeNotes: 'Configuration initiale pour la série Perception et Invisible.'
    },
    configHistory: []
  },
  {
    seriesId: 'coaching-unlimited',
    seriesTitle: 'Coaching < > Unlimited',
    coverImage: '/assets/posters/coaching-unlimited.webp',
    totalRaised: 11500,
    distributableEnvelope: 6900,
    distributedAmount: 1450,
    reserveBalance: 5450,
    nextPayoutDate: '2026-12-05',
    economicVersion: 'v1.0',
    currentConfig: {
      version: 'v1.0',
      platformFeePercent: 12,
      filiationPoolPercent: 2,
      coproducersPoolPercent: 60,
      creatorsPoolPercent: 26,
      effectiveDate: '2026-04-01',
      updatedBy: 'Romeo Nonvide',
      changeNotes: 'Initialisation de la série Performance et Dépassement.'
    },
    configHistory: []
  },
  {
    seriesId: 'focus-phd',
    seriesTitle: 'Focus < >  PhD',
    coverImage: '/assets/posters/Focus < >  PhD.jpg',
    totalRaised: 13800,
    distributableEnvelope: 8280,
    distributedAmount: 1980,
    reserveBalance: 6300,
    nextPayoutDate: '2026-12-10',
    economicVersion: 'v1.0',
    currentConfig: {
      version: 'v1.0',
      platformFeePercent: 12,
      filiationPoolPercent: 2,
      coproducersPoolPercent: 60,
      creatorsPoolPercent: 26,
      effectiveDate: '2026-04-01',
      updatedBy: 'Romeo Nonvide',
      changeNotes: 'Initialisation de la série Science, Photographie et Recherche.'
    },
    configHistory: []
  }
];

export const INITIAL_PRODUCER_DOSSIERS: ProducerDossier[] = [
  {
    id: 'prod-culture-invest',
    producerName: 'Sophie Morel (Culture Invest SAS)',
    legalEntity: 'Culture Invest SAS, RCS Paris 842 192 334',
    email: 'sophie.morel@culture-invest.fr',
    country: 'France',
    phone: '+33 1 42 68 00 12',
    totalProposed: 25000,
    totalCommitted: 20000,
    totalReceived: 18000,
    totalDistributable: 4250,
    complianceStatus: 'CONFORME',
    createdAt: '2026-02-18',
    supportedSeries: [
      {
        seriesId: 'investors-builders',
        seriesTitle: 'Investors < > Builders',
        proposedAmount: 12000,
        committedAmount: 10000,
        receivedAmount: 10000,
        distributableShareAmount: 2450,
        contractRef: 'CTR-YW-2026-INV-001',
        contractSignDate: '2026-02-25',
        rightsClauseAcknowledged: true
      },
      {
        seriesId: 'dixeat-fiat-luxe',
        seriesTitle: 'E Vivi < > Fiat Luxe',
        proposedAmount: 13000,
        committedAmount: 10000,
        receivedAmount: 8000,
        distributableShareAmount: 1800,
        contractRef: 'CTR-YW-2026-LUX-004',
        contractSignDate: '2026-03-05',
        rightsClauseAcknowledged: true
      }
    ],
    payoutHistory: [
      {
        id: 'payout-1',
        date: '2026-03-22',
        amount: 1450,
        seriesTitle: 'Investors < > Builders',
        status: 'PAYE',
        bankRef: 'VIR-SEPA-YW-882194'
      },
      {
        id: 'payout-2',
        date: '2026-03-25',
        amount: 800,
        seriesTitle: 'E Vivi < > Fiat Luxe',
        status: 'PAYE',
        bankRef: 'VIR-SEPA-YW-882201'
      },
      {
        id: 'payout-3',
        date: '2026-10-15',
        amount: 2000,
        seriesTitle: 'Investors < > Builders',
        status: 'EN_ATTENTE',
        bankRef: 'EN_ATTENTE_ORDRE'
      }
    ]
  },
  {
    id: 'prod-fondation-racines',
    producerName: 'Fondation Racines & Mémoires',
    legalEntity: 'Fondation Reconnue d\'Utilité Publique, Bruxelles',
    email: 'mariatou.kone@racines-memoires.org',
    country: 'Belgique',
    phone: '+32 2 514 88 90',
    totalProposed: 15000,
    totalCommitted: 15000,
    totalReceived: 15000,
    totalDistributable: 3100,
    complianceStatus: 'CONFORME',
    createdAt: '2026-01-28',
    supportedSeries: [
      {
        seriesId: 'jesus-legba',
        seriesTitle: 'Èṣù < > Jésus',
        proposedAmount: 8000,
        committedAmount: 8000,
        receivedAmount: 8000,
        distributableShareAmount: 1650,
        contractRef: 'CTR-YW-2026-LEG-002',
        contractSignDate: '2026-02-02',
        rightsClauseAcknowledged: true
      },
      {
        seriesId: 'blacks-one-beyond-eve',
        seriesTitle: 'Blacks One < > Beyond Eve',
        proposedAmount: 7000,
        committedAmount: 7000,
        receivedAmount: 7000,
        distributableShareAmount: 1450,
        contractRef: 'CTR-YW-2026-BO-003',
        contractSignDate: '2026-02-15',
        rightsClauseAcknowledged: true
      }
    ],
    payoutHistory: [
      {
        id: 'payout-4',
        date: '2026-03-15',
        amount: 1250,
        seriesTitle: 'Èṣù < > Jésus',
        status: 'PAYE',
        bankRef: 'VIR-SEPA-YW-881903'
      }
    ]
  },
  {
    id: 'prod-agri-terroir',
    producerName: 'Consortium Terroirs du Sud',
    legalEntity: 'GIE Terroirs & Développements, Cotonou',
    email: 'direction@terroirs-sud.bj',
    country: 'Bénin',
    phone: '+229 21 30 45 88',
    totalProposed: 10000,
    totalCommitted: 7500,
    totalReceived: 5000,
    totalDistributable: 950,
    complianceStatus: 'EN_REVISION',
    createdAt: '2026-03-12',
    supportedSeries: [
      {
        seriesId: 'finagnon-qosqorico',
        seriesTitle: 'Finagnon < > Qosqorico',
        proposedAmount: 10000,
        committedAmount: 7500,
        receivedAmount: 5000,
        distributableShareAmount: 950,
        contractRef: 'CTR-YW-2026-FIN-005',
        contractSignDate: '2026-03-18',
        rightsClauseAcknowledged: true
      }
    ],
    payoutHistory: []
  }
];

export const INITIAL_COOPTATIONS: CooptationItem[] = [
  {
    id: 'coopt-1',
    seriesId: 'jesus-legba',
    seriesTitle: 'Èṣù < > Jésus',
    referentId: 'usr-admin-romeo',
    referentName: 'Romeo Nonvide',
    referentRole: 'Directeur éditorial & Référent',
    recommendedPersonName: 'Père Matthieu Gbado',
    recommendedPersonEmail: 'pere.matthieu@archidiocese-cotonou.bj',
    recommendedPersonProfile: 'Prêtre et anthropologue des cultes vodun et chrétiens',
    recommendedDate: '2026-02-10',
    status: 'VALIDEE',
    admissionDate: '2026-02-15',
    filiationPercent: 2.0,
    lineageVolumeGenerated: 6800,
    lineageCommissionsPaid: 136.00,
    reviewerName: 'Sophie Morel'
  },
  {
    id: 'coopt-2',
    seriesId: 'finagnon-qosqorico',
    seriesTitle: 'Finagnon < > Qosqorico',
    referentId: 'usr-creator-amina',
    referentName: 'Amina Traoré',
    referentRole: 'Égérie Référente',
    recommendedPersonName: 'Sayri Quispe',
    recommendedPersonEmail: 'sayri.quispe@cusco-semences.pe',
    recommendedPersonProfile: 'Gardien des semences de maïs pourpre dans la Vallée Sacrée de Cusco',
    recommendedDate: '2026-03-01',
    status: 'VALIDEE',
    admissionDate: '2026-03-06',
    filiationPercent: 2.0,
    lineageVolumeGenerated: 4200,
    lineageCommissionsPaid: 84.00,
    reviewerName: 'Romeo Nonvide'
  },
  {
    id: 'coopt-3',
    seriesId: 'blacks-one-beyond-eve',
    seriesTitle: 'Blacks One < > Beyond Eve',
    referentId: 'usr-creator-koffi',
    referentName: 'Koffi Mensah',
    referentRole: 'Égérie Forgeron',
    recommendedPersonName: 'Aïssatou Ndiaye',
    recommendedPersonEmail: 'aissatou.ndiaye@dakar-cinema.sn',
    recommendedPersonProfile: 'Réalisatrice indépendante et documentariste de mémoire féminine',
    recommendedDate: '2026-10-02',
    status: 'EN_ATTENTE',
    filiationPercent: 2.0,
    lineageVolumeGenerated: 0,
    lineageCommissionsPaid: 0,
    reviewerName: undefined
  },
  {
    id: 'coopt-4',
    seriesId: 'investors-builders',
    seriesTitle: 'Investors < > Builders',
    referentId: 'usr-coopt-malik',
    referentName: 'Malik Diop',
    referentRole: 'Membre Coopté Saint-Louis',
    recommendedPersonName: 'Jean-Marc D\'Almeida',
    recommendedPersonEmail: 'jm.dalmeida@capital-risk-lom.tg',
    recommendedPersonProfile: 'Investisseur privé en infrastructures portuaires',
    recommendedDate: '2026-09-20',
    status: 'REFUSEE',
    rejectionReason: 'Dossier incomplet : charte éthique non signée et conflit d\'intérêt non clarifié sur un projet concurrent.',
    filiationPercent: 2.0,
    lineageVolumeGenerated: 0,
    lineageCommissionsPaid: 0,
    reviewerName: 'Sophie Morel'
  },
  {
    id: 'coopt-5',
    seriesId: 'coaching-unlimited',
    seriesTitle: 'Coaching < > Unlimited',
    referentId: 'usr-admin-romeo',
    referentName: 'Romeo Nonvide',
    referentRole: 'Référent de Cooptation',
    recommendedPersonName: 'Yannick Agbé',
    recommendedPersonEmail: 'yannick.agbe@athletic-bj.org',
    recommendedPersonProfile: 'Athlète olympique haies et préparateur mental des jeunes espoirs',
    recommendedDate: '2026-10-08',
    status: 'EN_ATTENTE',
    filiationPercent: 2.0,
    lineageVolumeGenerated: 0,
    lineageCommissionsPaid: 0
  }
];

export const INITIAL_ADVERTISING_CAMPAIGNS: AdvertisingCampaign[] = [
  {
    id: 'camp-1',
    title: 'Sponsoring Majeur — Transmission Vivante',
    brandName: 'Maison Dixeat & Artisans',
    brandLogo: '/assets/logo-yonywood.svg',
    targetThematiqueId: 'th-competences',
    targetThematiqueTitle: 'Compétences & Métiers d\'Art',
    targetSeriesId: 'dixeat-fiat-luxe',
    targetSeriesTitle: 'E Vivi < > Fiat Luxe',
    format: 'HABILLAGE_THEME',
    budgetCommitted: 12500,
    budgetConsumed: 7800,
    startDate: '2026-02-01',
    endDate: '2026-12-31',
    status: 'EN_COURS',
    impressionsCount: 84300,
    clicksCount: 2940,
    labelSponsorDisplay: 'Parrainé avec le soutien de Maison Dixeat (Emplacement Partenaire)'
  },
  {
    id: 'camp-2',
    title: 'Partenariat Patrimoine Ancestral',
    brandName: 'Fondation Racines Vivantes',
    targetThematiqueId: 'th-sagesses',
    targetThematiqueTitle: 'Sagesses & Spiritualités',
    format: 'MENTION_OUVERTURE',
    budgetCommitted: 8000,
    budgetConsumed: 5400,
    startDate: '2026-01-15',
    endDate: '2026-11-30',
    status: 'EN_COURS',
    impressionsCount: 62100,
    clicksCount: 1820,
    labelSponsorDisplay: 'Programme soutenu par la Fondation Racines Vivantes'
  },
  {
    id: 'camp-3',
    title: 'Campagne Agroécologie Transatlantique',
    brandName: 'BioTerroirs International',
    targetSeriesId: 'finagnon-qosqorico',
    targetSeriesTitle: 'Finagnon < > Qosqorico',
    format: 'SPOT_PRE_ROLL',
    budgetCommitted: 6000,
    budgetConsumed: 1200,
    startDate: '2026-09-01',
    endDate: '2026-10-31',
    status: 'EN_COURS',
    impressionsCount: 22400,
    clicksCount: 890,
    labelSponsorDisplay: 'Spot partenaire respectueux (6s sans interruption)'
  },
  {
    id: 'camp-4',
    title: 'Bannière Découverte Nouveaux Talents',
    brandName: 'Tech Afrique Solidaire',
    targetThematiqueId: 'th-projets',
    targetThematiqueTitle: 'Bâtisseurs du Futur',
    format: 'BANNIERE_DISCRETE',
    budgetCommitted: 4500,
    budgetConsumed: 0,
    startDate: '2026-11-01',
    endDate: '2026-12-31',
    status: 'VALIDEE',
    impressionsCount: 0,
    clicksCount: 0,
    labelSponsorDisplay: 'Bannière partenaire non-intrusive'
  }
];

export const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-12T09:45:12Z',
    authorName: 'Romeo Nonvide',
    authorEmail: 'qoctales@gmail.com',
    authorRole: 'Superadministrateur',
    module: 'CONFIGURATION',
    action: 'Audit de démarrage de session administrative',
    targetId: 'sys-core',
    targetTitle: 'Plateforme YonyWood',
    justification: 'Vérification de l\'intégrité des données et des flux financiers.'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-10T10:00:22Z',
    authorName: 'Romeo Nonvide',
    authorEmail: 'qoctales@gmail.com',
    authorRole: 'Responsable éditorial',
    module: 'HERITAGE',
    action: 'Validation d\'histoire soumise et attribution cercle',
    targetId: 'story-sub-2',
    targetTitle: 'Le Geste Parfait — Kodjo Agossou',
    justification: 'Conformité juridique vérifiée, pièce d\'identité et contrat en règle. Classé en Coeur de Forêt.'
  },
  {
    id: 'log-3',
    timestamp: '2026-10-06T15:20:10Z',
    authorName: 'Amina Traoré',
    authorEmail: 'amina.traore@yonywood.com',
    authorRole: 'Responsable éditoriale',
    module: 'HERITAGE',
    action: 'Validation d\'histoire soumise',
    targetId: 'story-sub-4',
    targetTitle: 'L\'Épreuve Traversée — Éléonore Vance',
    justification: 'Contrat signé et autorisation de droit à l\'image confirmée.'
  },
  {
    id: 'log-4',
    timestamp: '2026-03-22T14:15:00Z',
    authorName: 'Sophie Morel',
    authorEmail: 'sophie.morel@culture-invest.fr',
    authorRole: 'Responsable financier',
    module: 'FINANCES',
    action: 'Validation de versement de dividendes',
    targetId: 'payout-1',
    targetTitle: 'Versement 1 450 € — Culture Invest',
    justification: 'Palier d\'audience 90k dépassé sur Investors < > Builders, ordre de virement SEPA émis.'
  },
  {
    id: 'log-5',
    timestamp: '2026-03-06T11:30:00Z',
    authorName: 'Romeo Nonvide',
    authorEmail: 'qoctales@gmail.com',
    authorRole: 'Superadministrateur',
    module: 'COOPTATIONS',
    action: 'Approbation de cooptation et activation de filiation',
    targetId: 'coopt-2',
    targetTitle: 'Sayri Quispe (Parrainé par Amina Traoré)',
    justification: 'Filiation 2% activée sur la série Finagnon < > Qosqorico après contrôle d\'identité.'
  }
];

// Helper pour stockage local et persistance fluide
export const getAdminStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(`yonywood_admin_${key}`);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.warn(`Erreur de lecture de yonywood_admin_${key}`, err);
  }
  return defaultValue;
};

export const setAdminStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(`yonywood_admin_${key}`, JSON.stringify(value));
  } catch (err) {
    console.warn(`Erreur d'écriture de yonywood_admin_${key}`, err);
  }
};
