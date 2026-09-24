import { AffiliationPerson, ExplorerCategory } from '../types';

export type ExplorerCategoryType = ExplorerCategory;

export interface ExplorerCategoryConfig {
  id: ExplorerCategoryType;
  label: string;
  shortLabel: string;
  tagline: string;
  description: string;
  badge: string;
  iconName: string;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
  coverImage: string;
}

// =========================================================================
// LES 8 GRANDES PORTES D'ENTRÉE DE L'ASTROLABE EXPLORER
// =========================================================================
export const EXPLORER_CATEGORIES: ExplorerCategoryConfig[] = [
  {
    id: 'series',
    label: 'Séries',
    shortLabel: 'Séries',
    tagline: 'Filiation & Arbres de Cooptation',
    description: 'Explorez les séries documentaires fondatrices et leurs 16 pionniers. Remontez le fil des transmissions de génération en génération où chacun coapte le suivant.',
    badge: 'Cooptation vivante',
    iconName: 'Film',
    accentColor: '#C89B3C',
    glowColor: 'rgba(200, 155, 60, 0.65)',
    bgGradient: 'from-[#D97706] via-[#92400E] to-[#451A03]',
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'countries',
    label: 'Territoires',
    shortLabel: 'Territoires',
    tagline: '16 regards humains enracinés dans leur terre',
    description: 'Explorez un terroir du monde : 16 bâtisseurs, paysans, créateurs et pêcheurs racontent leur mémoire vivante liée à leur terre et à leur matière brute.',
    badge: '16 terroirs du monde',
    iconName: 'Mountain',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.65)',
    bgGradient: 'from-[#10B981] via-[#047857] to-[#064E3B]',
    coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'questions',
    label: 'Mémoires',
    shortLabel: 'Mémoires',
    tagline: 'Récits vrais, transmission et mémoire vive',
    description: 'Les grandes mémoires et interrogations universelles, racontées à travers des moments vécus par 16 voix de tous horizons.',
    badge: '16 mémoires universelles',
    iconName: 'Atom',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.65)',
    bgGradient: 'from-[#A855F7] via-[#7E22CE] to-[#3B0764]',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'thematics',
    label: 'Expertises',
    shortLabel: 'Expertises',
    tagline: 'Maîtres d’art, savoir-faire d’exception & expertises vivantes',
    description: 'Des praticiens d’exception, artisans d’art, maîtres et créateurs détenant une haute expertise prêts à collaborer ou transmettre.',
    badge: 'Expertises & Savoir-faire',
    iconName: 'GraduationCap',
    accentColor: '#0EA5E9',
    glowColor: 'rgba(14, 165, 233, 0.65)',
    bgGradient: 'from-[#0EA5E9] via-[#0369A1] to-[#082F49]',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'personalities',
    label: 'Personnalités',
    shortLabel: 'Personnalités',
    tagline: 'Grandes figures racontées par 16 regards',
    description: 'Une grande figure racontée par 16 personnes qui ont une histoire intime, sportive, artistique ou philosophique liée à son parcours.',
    badge: '16 figures phares',
    iconName: 'Star',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.65)',
    bgGradient: 'from-[#F59E0B] via-[#B45309] to-[#78350F]',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'brands',
    label: 'Marques',
    shortLabel: 'Marques',
    tagline: 'Artisans, Bâtisseurs & Maisons d’exception',
    description: 'Découvrez une marque ou une maison par ceux qui la font ou la vivent : artisans du cuir, athlètes de rue, réparateurs de l’extrême, pionniers.',
    badge: '16 marques iconiques',
    iconName: 'Gem',
    accentColor: '#FB923C',
    glowColor: 'rgba(251, 146, 60, 0.65)',
    bgGradient: 'from-[#FB923C] via-[#C2410C] to-[#431407]',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'projects',
    label: 'Projets',
    shortLabel: 'Projets',
    tagline: 'Forêts sacrées, Écoles nomades...',
    description: 'Rencontrez 16 bâtisseurs de terrain engagés dans des causes vivantes : agroforesterie, écoles tissées, sauvegarde de semences anciennes, récifs.',
    badge: '16 chantiers vivants',
    iconName: 'Sprout',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.65)',
    bgGradient: 'from-[#EC4899] via-[#BE185D] to-[#500724]',
    coverImage: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'offers',
    label: 'Offres',
    shortLabel: 'Offres',
    tagline: 'Masterclasses, Ateliers & Transmissions concrètes',
    description: 'Accédez à des transmissions concrètes : stages de tissage royal, ateliers de respiration, compagnonnages en forge ou résidences immersives.',
    badge: '16 offres concrètes',
    iconName: 'ShoppingBag',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.65)',
    bgGradient: 'from-[#6366F1] via-[#4338CA] to-[#1E1B4B]',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80'
  }
];

// =========================================================================
// CATALOGUE DES 16 SUJETS PAR CATÉGORIE (128 SUJETS AU TOTAL)
// =========================================================================
export interface ExplorerCatalogItem {
  id: string;
  category: ExplorerCategoryType;
  title: string;
  subtitle: string;
  question?: string;
  flag?: string;
  photoUrl: string;
  accentColor?: string;
  badge?: string;
}

export const EXPLORER_CATALOG: Record<ExplorerCategoryType, ExplorerCatalogItem[]> = {
  // 1. SÉRIES DOCUMENTAIRES (Les 5 séries de la plateforme)
  series: [
    {
      id: 'jesus-legba',
      category: 'series',
      title: 'Jésus < > Èṣù',
      subtitle: 'Deux traditions. Une même question de foi.',
      question: 'Qu’est-ce qui dans votre foi la plus intime vous relie à ce qui vous dépasse et vous rapproche des autres ?',
      photoUrl: '/assets/posters/jesus-esu.png',
      badge: '16 pionniers cooptés'
    },
    {
      id: 'finagnon-qosqorico',
      category: 'series',
      title: 'Finagnon < > Qosqorico',
      subtitle: 'Bénin < > Pérou. Deux territoires. Une même réflexion sur ce qui nous relie à un lieu.',
      question: 'Quel est ce lien invisible et indestructible qui vous unit charnellement à la terre de vos ancêtres ?',
      photoUrl: '/assets/posters/finagnon-qosqorico.png',
      badge: '16 pionniers cooptés'
    },
    {
      id: 'blacks-one-beyond-eve',
      category: 'series',
      title: 'Blacks One < > Beyond Eve',
      subtitle: 'La mémoire originelle, la sororité et la diaspora.',
      question: 'Quelle blessure ou fierté héritée de vos mères portez-vous comme un flambeau dans votre existence ?',
      photoUrl: '/assets/posters/blacks-one-beyond-eve.png',
      badge: '16 pionniers cooptés'
    },
    {
      id: 'dixeat-fiat-luxe',
      category: 'series',
      title: 'Dixeat < > Fiat Luxe',
      subtitle: 'Quand la matière brute devient or, goût et lumière.',
      question: 'À quel instant précis avez-vous compris que transformer la matière brute était un acte de pure alchimie spirituelle ?',
      photoUrl: '/assets/posters/dixeat-fiat-luxe.png',
      badge: '16 pionniers cooptés'
    },
    {
      id: 'investors-builders',
      category: 'series',
      title: 'Investors < > Builders',
      subtitle: 'Bâtir pour mille ans sans détruire le vivant.',
      question: 'Que bâtissez-vous aujourd’hui qui restera debout et fécondera la vie dans mille ans ?',
      photoUrl: '/assets/posters/investors-builders.png',
      badge: '16 pionniers cooptés'
    }
  ],

  // 2. PAYS & TERRITOIRES (16 pays)
  countries: [
    {
      id: 'benin',
      category: 'countries',
      title: 'Bénin',
      subtitle: 'Berceau du Vodoun, cité lacustre & bronze royal',
      question: 'Quel esprit ancestral ou quelle sagesse issue de la terre béninoise guide encore chacun de vos choix aujourd’hui ?',
      flag: '🇧🇯',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix béninoises'
    },
    {
      id: 'perou',
      category: 'countries',
      title: 'Pérou',
      subtitle: 'Vallée Sacrée des Incas & tissages des cimes',
      question: 'Quelle prière murmurée à la Pachamama ou quel enseignement des cimes andines habite votre mémoire ?',
      flag: '🇵🇪',
      photoUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix péruviennes'
    },
    {
      id: 'japon',
      category: 'countries',
      title: 'Japon',
      subtitle: 'Maîtres du bois, temple de cyprès & thé vert',
      question: 'Comment la patience millénaire et la recherche du geste pur se manifestent-elles dans votre rapport au monde ?',
      flag: '🇯🇵',
      photoUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix japonaises'
    },
    {
      id: 'senegal',
      category: 'countries',
      title: 'Sénégal',
      subtitle: 'Teranga, estuaires de pêcheurs & parole griot',
      question: 'Comment l’hospitalité sacrée de la Teranga a-t-elle façonné votre façon d’accueillir l’inconnu ?',
      flag: '🇸🇳',
      photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix sénégalaises'
    },
    {
      id: 'france',
      category: 'countries',
      title: 'France',
      subtitle: 'Compagnons de pierre, vignobles & verriers',
      question: 'Quel héritage d’exigence artisanale ou de liberté de pensée cherchez-vous à transmettre intact ?',
      flag: '🇫🇷',
      photoUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix françaises'
    },
    {
      id: 'bresil',
      category: 'countries',
      title: 'Brésil',
      subtitle: 'Gardiens d’Amazonie, berimbau & terre rouge',
      question: 'Quelle force d’espérance et de joie indomptable puisez-vous dans la terre rouge et les rythmes sacrés ?',
      flag: '🇧🇷',
      photoUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix brésiliennes'
    },
    {
      id: 'mali',
      category: 'countries',
      title: 'Mali',
      subtitle: 'Falaises de Bandiagara, banco & cordes de kora',
      question: 'Quelle parole ancestrale reçue au pied des falaises ou des baobabs vous garde humble et digne ?',
      flag: '🇲🇱',
      photoUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix maliennes'
    },
    {
      id: 'colombie',
      category: 'countries',
      title: 'Colombie',
      subtitle: 'Sierra Nevada des Kogis & café d’altitude',
      question: 'Quel équilibre sacré appris du peuple de la montagne vous rappelle notre devoir envers la Terre Mère ?',
      flag: '🇨🇴',
      photoUrl: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix colombiennes'
    },
    {
      id: 'maroc',
      category: 'countries',
      title: 'Maroc',
      subtitle: 'Médinas d’argile, arganiers & zelliges bleus',
      question: 'Quel trésor d’hospitalité et de patience dans l’art de vivre avez-vous reçu des cours d’argile et de zellige ?',
      flag: '🇲🇦',
      photoUrl: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix marocaines'
    },
    {
      id: 'inde',
      category: 'countries',
      title: 'Inde',
      subtitle: 'Ghats de Bénarès, épices & soies tissées main',
      question: 'Quelle prise de conscience de l’éternité et de la métamorphose avez-vous éprouvée face au fleuve sacré ?',
      flag: '🇮🇳',
      photoUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix indiennes'
    },
    {
      id: 'islande',
      category: 'countries',
      title: 'Islande',
      subtitle: 'Sources chaudes, lave noire & sagas nordiques',
      question: 'Comment la solitude face au feu et à la glace a-t-elle forgé votre clarté intérieure ?',
      flag: '🇮🇸',
      photoUrl: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix islandaises'
    },
    {
      id: 'cuba',
      category: 'countries',
      title: 'Cuba',
      subtitle: 'Rumba de patio, herboristes & tabac roulé',
      question: 'Quelle ingéniosité du cœur et quelle ferveur de vivre avez-vous apprise de ceux qui partagent tout ?',
      flag: '🇨🇺',
      photoUrl: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix cubaines'
    },
    {
      id: 'canada',
      category: 'countries',
      title: 'Canada',
      subtitle: 'Forêts boréales, canoë d’écorce & Inuits',
      question: 'Quelle leçon d’humilité et de silence la grande forêt boréale vous a-t-elle murmurée ?',
      flag: '🇨🇦',
      photoUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix canadiennes'
    },
    {
      id: 'mexique',
      category: 'countries',
      title: 'Mexique',
      subtitle: 'Maïs sacré d’Oaxaca, copal & céramique noire',
      question: 'Quelle célébration intime de la mémoire de ceux qui sont partis éclaire votre présent ?',
      flag: '🇲🇽',
      photoUrl: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix mexicaines'
    },
    {
      id: 'cote-divoire',
      category: 'countries',
      title: 'Côte d’Ivoire',
      subtitle: 'Masques sacrés Dan, cacao paysan & lagunes',
      question: 'Quel pacte d’union et d’élévation collective puisez-vous dans la fraternité des terroirs ivoiriens ?',
      flag: '🇨🇮',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix ivoiriennes'
    },
    {
      id: 'portugal',
      category: 'countries',
      title: 'Portugal',
      subtitle: 'Chênes-lièges d’Alentejo, azulejos & pêcheurs',
      question: 'Quelle saudade féconde et quel regard tourné vers le grand large nourrissent votre âme ?',
      flag: '🇵🇹',
      photoUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix portugaises'
    }
  ],

  // 4. COMPÉTENCES & TALENTS (16 filières de savoir-faire, recherche d'opportunités et compagnonnage)
  thematics: [
    {
      id: 'ebenisterie-bois',
      category: 'thematics',
      title: 'Ébénisterie & Travail du Bois',
      subtitle: 'Artisans et compagnons en quête d’ateliers ou de chantiers d’exception',
      photoUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'agroecologie-sol',
      category: 'thematics',
      title: 'Agroécologie & Maraîchage Vivant',
      subtitle: 'Praticiens des sols vivants en recherche de terres ou d’exploitations partenaires',
      photoUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'tissage-couture',
      category: 'thematics',
      title: 'Tissage d’Art & Stylisme Végétal',
      subtitle: 'Créatrices textiles cherchant des résidences, ateliers ou collaborations couture',
      photoUrl: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'ferronnerie-forge',
      category: 'thematics',
      title: 'Ferronnerie & Forge Ancestrale',
      subtitle: 'Forgerons et maîtres du métal en quête de compagnonnage et grands chantiers',
      photoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'charpente-marine',
      category: 'thematics',
      title: 'Piroguerie & Pêche Durable',
      subtitle: 'Marins et charpentiers navals cherchant équipages, cales et coopératives',
      photoUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'maconnerie-terre',
      category: 'thematics',
      title: 'Éco-construction en Terre Crue',
      subtitle: 'Bâtisseurs en terre, chaux et paille cherchant projets d’habitats écologiques',
      photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'audiovisuel-image',
      category: 'thematics',
      title: 'Audiovisuel & Documentaire',
      subtitle: 'Cadreurs, monteurs et preneurs de son cherchant productions indépendantes',
      photoUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'cuisine-fermentation',
      category: 'thematics',
      title: 'Cuisine Sauvage & Fermentation',
      subtitle: 'Cuisiniers du vivant cherchant tables d’hôtes, auberges ou résidences culinaires',
      photoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'apiculture-naturelle',
      category: 'thematics',
      title: 'Apiculture Naturelle & Ruches',
      subtitle: 'Apiculteurs respectueux cherchant domaines mellifères et conservatoires',
      photoUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'herboristerie-plantes',
      category: 'thematics',
      title: 'Plantes Médicinales & Simples',
      subtitle: 'Cueilleurs et transformateurs cherchant coopératives et laboratoires d’herboristerie',
      photoUrl: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'massage-somatic',
      category: 'thematics',
      title: 'Soins du Corps & Massothérapie',
      subtitle: 'Praticiens corporels cherchant espaces de soins partagés et centres bien-être',
      photoUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'ceramique-poterie',
      category: 'thematics',
      title: 'Céramique & Tournage d’Art',
      subtitle: 'Céramistes cherchant résidences de poterie, fours collectifs et boutiques d’art',
      photoUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'musique-son',
      category: 'thematics',
      title: 'Musique Vivante & Sonothérapie',
      subtitle: 'Musiciens et concepteurs sonores en quête de collaborations et projets scéniques',
      photoUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'maroquinerie-cuir',
      category: 'thematics',
      title: 'Maroquinerie & Sellerie d’Art',
      subtitle: 'Artisans du cuir formés cherchant maisons de création et ateliers d’excellence',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'calligraphie-lettre',
      category: 'thematics',
      title: 'Calligraphie & Lettres Peintes',
      subtitle: 'Enlumineurs et peintres en lettres cherchant commandes éditoriales et fresques',
      photoUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    },
    {
      id: 'education-nature',
      category: 'thematics',
      title: 'Pédagogie de la Nature & Éducation',
      subtitle: 'Éducateurs de terrain cherchant éco-écoles, fermes pédagogiques et associations',
      photoUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80',
      badge: '16 talents en recherche'
    }
  ],

  // 4. PERSONNALITÉS (16 figures marquantes)
  personalities: [
    {
      id: 'michael-jackson',
      category: 'personalities',
      title: 'Michael Jackson',
      subtitle: 'Le Roi de la Pop, la danse universelle & la grâce',
      question: 'Quel sacrifice secret de l’enfance ou quelle quête d’amour universel résonne dans votre propre trajectoire ?',
      photoUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'michael-jordan',
      category: 'personalities',
      title: 'Michael Jordan',
      subtitle: 'Le vol suspendu, l’obsession de vaincre & le mental',
      question: 'Comment avez-vous transformé un échec cuisant ou un rejet initial en carburant inépuisable pour triompher ?',
      photoUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'kylian-mbappe',
      category: 'personalities',
      title: 'Kylian Mbappé',
      subtitle: 'L’accélération pure, Bondy & la nouvelle jeunesse',
      question: 'Quelle promesse faite à vous-même dans votre jeunesse continue de guider vos foulées et votre audace ?',
      photoUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'wangari-maathai',
      category: 'personalities',
      title: 'Wangari Maathai',
      subtitle: 'La femme qui plantait des millions d’arbres',
      question: 'Quel arbre d’espérance et de justice avez-vous planté contre vents et marées quand personne n’y croyait ?',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'miles-davis',
      category: 'personalities',
      title: 'Miles Davis',
      subtitle: 'La trompette feutrée et le refus de se répéter',
      question: 'À quel moment avez-vous eu le courage de rompre avec vos succès passés pour réinventer totalement votre son ?',
      photoUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'frida-kahlo',
      category: 'personalities',
      title: 'Frida Kahlo',
      subtitle: 'La douleur transcendée par les couleurs de la terre',
      question: 'Comment avez-vous sublimé une blessure intime pour en faire une œuvre de vie lumineuse et insoumise ?',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'nelson-mandela',
      category: 'personalities',
      title: 'Nelson Mandela',
      subtitle: '27 ans de geôle pour apprendre la réconciliation',
      question: 'Comment parvient-on à pardonner à ses geôliers pour libérer son propre cœur et réconcilier un peuple ?',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'bob-marley',
      category: 'personalities',
      title: 'Bob Marley',
      subtitle: 'One Love : la prophétie universelle du reggae',
      question: 'Quelle parole de paix et d’unité avez-vous portée au cœur de la tourmente quand tout incitait à la haine ?',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'leonard-de-vinci',
      category: 'personalities',
      title: 'Léonard de Vinci',
      subtitle: 'L’art d’observer l’eau, les oiseaux et le divin',
      question: 'Quelle curiosité insatiable pour les mystères du vivant nourrit quotidiennement votre soif d’apprendre ?',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'marie-curie',
      category: 'personalities',
      title: 'Marie Curie',
      subtitle: 'Le rayonnement dans la nuit et la rigueur scientifique',
      question: 'À quelle passion obstinée pour la vérité avez-vous dévoué votre énergie sans jamais courir après les honneurs ?',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'ayrton-senna',
      category: 'personalities',
      title: 'Ayrton Senna',
      subtitle: 'La vitesse sous la pluie et la quête mystique',
      question: 'Dans quelle zone limite ou face à quel péril avez-vous touché une dimension spirituelle qui vous dépasse ?',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'nina-simone',
      category: 'personalities',
      title: 'Nina Simone',
      subtitle: 'La voix grave qui refusa de se taire face à l’injustice',
      question: 'Quelle vérité brûlante avez-vous osé proclamer tout haut quand le silence ou le compromis était la facilité ?',
      photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'steve-jobs',
      category: 'personalities',
      title: 'Steve Jobs',
      subtitle: 'Le minimalisme zen et la typographie dans la machine',
      question: 'À quel dépouillement essentiel avez-vous consenti pour donner naissance à une création d’une pureté absolue ?',
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'serena-williams',
      category: 'personalities',
      title: 'Serena Williams',
      subtitle: 'La frappe royale et la grandeur d’une reine du court',
      question: 'Comment puise-t-on la force de rester reine et pionnière quand les regards cherchent sans cesse à vous réduire ?',
      photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'aime-cesaire',
      category: 'personalities',
      title: 'Aimé Césaire',
      subtitle: 'La parole volcanique pour réveiller la négritude',
      question: 'Quel cri de dignité et de fierté originelle avez-vous réveillé en vous face à la tentation de l’oubli ?',
      photoUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    },
    {
      id: 'hayao-miyazaki',
      category: 'personalities',
      title: 'Hayao Miyazaki',
      subtitle: 'L’âme des vents, des dieux-arbres et de l’enfance',
      question: 'Quel regard d’émerveillement et de respect pour les forces invisibles de la nature refusez-vous d’abandonner ?',
      photoUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits vécus'
    }
  ],

  // 5. MARQUES & ENTREPRISES (16 marques)
  brands: [
    {
      id: 'nike',
      category: 'brands',
      title: 'Nike',
      subtitle: 'De la semelle gaufrée aux terrains de bitume mondiaux',
      photoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits de terrain'
    },
    {
      id: 'louis-vuitton',
      category: 'brands',
      title: 'Louis Vuitton',
      subtitle: 'La malle de voyage, l’atelier d’Asnières & le geste maroquinier',
      photoUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits d’artisans'
    },
    {
      id: 'patagonia',
      category: 'brands',
      title: 'Patagonia',
      subtitle: 'Réparer au lieu de jeter : la terre est notre seule actionnaire',
      photoUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits engagés'
    },
    {
      id: 'apple',
      category: 'brands',
      title: 'Apple',
      subtitle: 'L’outil pour les rebelles, les poètes et les artisans du code',
      photoUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits créatifs'
    },
    {
      id: 'hermes',
      category: 'brands',
      title: 'Hermès',
      subtitle: 'Le point sellier à deux aiguilles et la noblesse du cuir',
      photoUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits d’orfèvres'
    },
    {
      id: 'tesla',
      category: 'brands',
      title: 'Tesla',
      subtitle: 'L’électron, la batterie géante et le rêve d’indépendance',
      photoUrl: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits pionniers'
    },
    {
      id: 'moleskine',
      category: 'brands',
      title: 'Moleskine',
      subtitle: 'Le carnet noir des écrivains, esquisseurs et vagabonds',
      photoUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits intimes'
    },
    {
      id: 'fondation-zinsou',
      category: 'brands',
      title: 'Fondation Zinsou',
      subtitle: 'L’art africain contemporain ouvert et gratuit pour tous',
      photoUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du musée vivant'
    },
    {
      id: 'veja',
      category: 'brands',
      title: 'Veja',
      subtitle: 'Le caoutchouc sauvage d’Acre et le coton biologique',
      photoUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix de la forêt'
    },
    {
      id: 'lego',
      category: 'brands',
      title: 'LEGO',
      subtitle: 'L’architecture modulaire de l’enfance qui réveille les créateurs',
      photoUrl: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix de bâtisseurs'
    },
    {
      id: 'polaroid',
      category: 'brands',
      title: 'Polaroid',
      subtitle: 'L’alchimie chimique de la photo instantanée sous les yeux',
      photoUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix de l’image'
    },
    {
      id: 'spotify',
      category: 'brands',
      title: 'Spotify',
      subtitle: 'La bibliothèque musicale planétaire au creux de l’oreille',
      photoUrl: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du son'
    },
    {
      id: 'michelin',
      category: 'brands',
      title: 'Michelin',
      subtitle: 'La carte des terroirs, la route et l’exigence de l’artisanat',
      photoUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix de la route'
    },
    {
      id: 'yamaha',
      category: 'brands',
      title: 'Yamaha',
      subtitle: 'Des trois diapasons sur les pianos aux moteurs de traverse',
      photoUrl: 'https://images.unsplash.com/photo-1520523839898-507125cd53c1?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix d’instruments'
    },
    {
      id: 'chanel',
      category: 'brands',
      title: 'Chanel',
      subtitle: 'Libérer le corps de la femme et distiller le jasmin de Grasse',
      photoUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix d’ateliers'
    },
    {
      id: 'airbnb',
      category: 'brands',
      title: 'Airbnb',
      subtitle: 'L’hospitalité partagée : ouvrir sa porte à l’inconnu du monde',
      photoUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80',
      badge: '16 récits d’hôtes'
    }
  ],

  // 6. PROJETS & CAUSES (16 causes)
  projects: [
    {
      id: 'foret-ouidah',
      category: 'projects',
      title: 'Forêt Sacrée de Ouidah',
      subtitle: 'Régénération des arbres tutélaires et sanctuaire de Kpassè',
      flag: '🇧🇯',
      photoUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80',
      badge: '16 gardiens du bois'
    },
    {
      id: 'ecoles-andes',
      category: 'projects',
      title: 'Écoles Tissées des Andes',
      subtitle: 'Sauvegarder les mathématiques du métier à tisser chez les enfants',
      flag: '🇵🇪',
      photoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80',
      badge: '16 enseignants & jeunes'
    },
    {
      id: 'sauvegarde-semences',
      category: 'projects',
      title: 'Banque de Semences Paysannes',
      subtitle: 'Conserver 800 variétés de mil, sorgho et maïs ancien',
      flag: '🇸🇳',
      photoUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=80',
      badge: '16 semenciers de terre'
    },
    {
      id: 'maisons-argile',
      category: 'projects',
      title: 'Chantiers en Terre Crue',
      subtitle: 'Construire des dispensaires écologiques en briques de banco',
      flag: '🇲🇱',
      photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
      badge: '16 bâtisseurs solidaires'
    },
    {
      id: 'recifs-vivants',
      category: 'projects',
      title: 'Récifs de Corail Vivants',
      subtitle: 'Repiquage de coraux résistants à la chaleur aux îles Salomon',
      flag: '🇸🇧',
      photoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
      badge: '16 plongeurs du récif'
    },
    {
      id: 'caravane-griots',
      category: 'projects',
      title: 'La Caravane des Griots',
      subtitle: 'Enregistrer la mémoire orale des doyens dans les villages isolés',
      flag: '🇬🇳',
      photoUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      badge: '16 passeurs de mémoire'
    },
    {
      id: 'puits-solaires',
      category: 'projects',
      title: 'Puits Solaires du Sahel',
      subtitle: 'L’eau pure pour les éleveurs nomades grâce à l’énergie photovoltaïque',
      flag: '🇳🇪',
      photoUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=400&q=80',
      badge: '16 bergers & techniciens'
    },
    {
      id: 'sanctuaire-abeilles',
      category: 'projects',
      title: 'Sanctuaire des Abeilles Noires',
      subtitle: 'Création d’un réseau de ruches de sauvegarde sans prélèvement',
      flag: '🇫🇷',
      photoUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80',
      badge: '16 protecteurs de ruches'
    },
    {
      id: 'chemins-ancestraux',
      category: 'projects',
      title: 'Sentiers des Pèlerinages Incas',
      subtitle: 'Restauration des ponts de corde en herbe Q’eswachaka',
      flag: '🇵🇪',
      photoUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=400&q=80',
      badge: '16 tisseurs de ponts'
    },
    {
      id: 'pirogues-solaires',
      category: 'projects',
      title: 'Pirogues Solaires de Ganvié',
      subtitle: 'Remplacer les moteurs polluants par des propulsions solaires douces',
      flag: '🇧🇯',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      badge: '16 pêcheurs du lac'
    },
    {
      id: 'livres-en-brousse',
      category: 'projects',
      title: 'Bibliothèques à dos d’âne',
      subtitle: 'Apporter des livres illustrés dans les campements peuls',
      flag: '🇧🇫',
      photoUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e37262?auto=format&fit=crop&w=400&q=80',
      badge: '16 bibliothécaires nomades'
    },
    {
      id: 'ceinture-agroforestiere',
      category: 'projects',
      title: 'Ceinture Verte des Villes',
      subtitle: 'Transformer les décharges périurbaines en forêts de fruits',
      flag: '🇨🇩',
      photoUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80',
      badge: '16 maraîchers d’espoir'
    },
    {
      id: 'archives-vocales',
      category: 'projects',
      title: 'Archives des Langues Mères',
      subtitle: 'Préserver la poésie des dernières langues non écrites',
      flag: '🇧🇷',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      badge: '16 linguistes du cœur'
    },
    {
      id: 'ateliers-indigo',
      category: 'projects',
      title: 'Renaissance de l’Indigo Naturel',
      subtitle: 'Former 100 jeunes femmes à la teinture sans produits chimiques',
      flag: '🇸🇳',
      photoUrl: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=400&q=80',
      badge: '16 teinturières libres'
    },
    {
      id: 'bois-en-prison',
      category: 'projects',
      title: 'Ateliers Ébénisterie en Prison',
      subtitle: 'La dignité retrouvée en apprenant à sculpter le bois noble',
      flag: '🇨🇮',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      badge: '16 compagnons restaurés'
    },
    {
      id: 'jardins-hospitaliers',
      category: 'projects',
      title: 'Jardins Médicinaux des Dispensaires',
      subtitle: 'Associer la médecine moderne et la sagesse des herboristes',
      flag: '🇲🇬',
      photoUrl: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=400&q=80',
      badge: '16 médecins & guérisseurs'
    }
  ],

  // 7. OFFRES DU MOMENT (16 ateliers & masterclasses)
  offers: [
    {
      id: 'masterclass-tissage',
      category: 'offers',
      title: 'Masterclass Tissage Royal',
      subtitle: 'Apprenez le secret des motifs héraldiques d’Abomey avec un maître',
      photoUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'respiration-holotropique',
      category: 'offers',
      title: 'Immersion Respiration & Clarté',
      subtitle: '3 jours de libération émotionnelle par le souffle conscient',
      photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'ceramique-amazonie',
      category: 'offers',
      title: 'Céramique aux Terres d’Iquitos',
      subtitle: 'Façonner sans tour électrique selon la technique Shipibo-Konibo',
      photoUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'compagnonnage-forge',
      category: 'offers',
      title: 'Compagnonnage Forge & Fer Pur',
      subtitle: 'Initiez-vous au feu, à l’enclume et à la trempe traditionnelle',
      photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'sol-vivant-foret',
      category: 'offers',
      title: 'Séjour Forêt Nourricière',
      subtitle: 'Concevoir une guilde fruitière et régénérer un hectare de terre',
      photoUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'tournoiement-soufi',
      category: 'offers',
      title: 'Retraite Écoute & Danse Soufie',
      subtitle: 'L’axe du cœur immobile au centre du mouvement giratoire',
      photoUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'herboristerie-sauvage',
      category: 'offers',
      title: 'Cueillette en Haute Altitude',
      subtitle: 'Reconnaître et préparer les élixirs des plantes d’alpage',
      photoUrl: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'charpente-sans-clou',
      category: 'offers',
      title: 'Stage Charpente Japonaise',
      subtitle: 'Tailler les tenons et mortaises complexes avec des ciseaux forgés',
      photoUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'polyphonies-anciennes',
      category: 'offers',
      title: 'Chant Polyphonique du Caucase',
      subtitle: 'Faire sonner les quintes harmoniques en chœur à voix nues',
      photoUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'cuves-indigo',
      category: 'offers',
      title: 'Alchimie des Cuves d’Indigo',
      subtitle: 'Monter et nourrir une cuve vivante sans hydrosulfite',
      photoUrl: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'ruche-biodiversite',
      category: 'offers',
      title: 'Construire sa Ruche Warré',
      subtitle: 'Accueillir les abeilles sans cadres mobiles pour leur santé',
      photoUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'pain-levain-ancien',
      category: 'offers',
      title: 'Pains au Levain & Blés de Population',
      subtitle: 'Pétrir à la main et cuire dans un four à bois d’argile',
      photoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'nuit-etoiles-mer',
      category: 'offers',
      title: 'Bivouac Marin & Constellations',
      subtitle: 'Naviguer 24h sans écran au cap des étoiles et de la lune',
      photoUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'recit-filiation',
      category: 'offers',
      title: 'Écrire l’Arbre de sa Famille',
      subtitle: 'Atelier d’écriture mémorielle avec un écrivain biographe',
      photoUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'residence-cloitre',
      category: 'offers',
      title: 'Résidence Solitaire au Monastère',
      subtitle: '10 jours de silence, herboristerie et écriture dans les cloîtres de Toffo',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    },
    {
      id: 'pinceau-encre-zen',
      category: 'offers',
      title: 'Méditation au Pinceau Sumi-e',
      subtitle: 'Un souffle, un geste, une goutte d’encre sur le papier de mûrier',
      photoUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
      badge: '16 places / transmission'
    }
  ],

  // 8. SAGESSES POPULAIRES (16 récits et sagesses du peuple)
  questions: [
    {
      id: 'pourquoi-creer',
      category: 'questions',
      title: 'Création',
      subtitle: 'Racontez un moment où créer quelque chose de vos mains a changé votre regard sur le monde.',
      question: 'Racontez un moment où créer quelque chose de vos mains a changé votre regard sur le monde.',
      photoUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'dou-vient-la-force',
      category: 'questions',
      title: 'Résilience',
      subtitle: 'Racontez un moment où tout semblait perdu et où une force inattendue vous a relevé.',
      question: 'Racontez un moment où tout semblait perdu et où une force inattendue vous a relevé.',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'que-transmet-on',
      category: 'questions',
      title: 'Transmission',
      subtitle: 'Racontez une chose précieuse et invisible qu’un aîné vous a transmise et que vous gardez toujours.',
      question: 'Racontez une chose précieuse et invisible qu’un aîné vous a transmise et que vous gardez toujours.',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'qu-est-ce-qui-relie',
      category: 'questions',
      title: 'Fraternité',
      subtitle: 'Racontez une rencontre avec un parfait inconnu où vous vous êtes senti instantanément frère ou sœur.',
      question: 'Racontez une rencontre avec un parfait inconnu où vous vous êtes senti instantanément frère ou sœur.',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'ou-est-le-sacre',
      category: 'questions',
      title: 'Sacré',
      subtitle: 'Racontez un geste tout simple du quotidien dans lequel vous ressentez une présence sacrée.',
      question: 'Racontez un geste tout simple du quotidien dans lequel vous ressentez une présence sacrée.',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'saveur-de-la-fin',
      category: 'questions',
      title: 'Finitude',
      subtitle: 'Racontez un instant où prendre conscience que la vie est courte vous a donné un élan immense.',
      question: 'Racontez un instant où prendre conscience que la vie est courte vous a donné un élan immense.',
      photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'peut-on-tout-pardonner',
      category: 'questions',
      title: 'Pardon',
      subtitle: 'Racontez un moment où vous avez réussi à pardonner ou à être pardonné, et ce que cela a libéré.',
      question: 'Racontez un moment où vous avez réussi à pardonner ou à être pardonné, et ce que cela a libéré.',
      photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'racines-ou-ailes',
      category: 'questions',
      title: 'Racines',
      subtitle: 'Racontez le souvenir de votre terre ou de votre foyer qui continue d’habiter chacun de vos pas.',
      question: 'Racontez le souvenir de votre terre ou de votre foyer qui continue d’habiter chacun de vos pas.',
      photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'temps-qui-file',
      category: 'questions',
      title: 'Temps',
      subtitle: 'Racontez un moment où vous avez arrêté de courir après le temps pour vivre pleinement l’instant présent.',
      question: 'Racontez un moment où vous avez arrêté de courir après le temps pour vivre pleinement l’instant présent.',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'silence-et-communion',
      category: 'questions',
      title: 'Silence',
      subtitle: 'Racontez un souvenir où partager le silence avec quelqu’un a été plus puissant que mille paroles.',
      question: 'Racontez un souvenir où partager le silence avec quelqu’un a été plus puissant que mille paroles.',
      photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'vocation-et-survie',
      category: 'questions',
      title: 'Vocation',
      subtitle: 'Racontez le jour où vous avez choisi de vivre de ce qui vous anime vraiment, sans vous renier.',
      question: 'Racontez le jour où vous avez choisi de vivre de ce qui vous anime vraiment, sans vous renier.',
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'beaute-sauveuse',
      category: 'questions',
      title: 'Beauté',
      subtitle: 'Racontez un moment d’émerveillement si pur qu’il vous a réconcilié avec le monde.',
      question: 'Racontez un moment d’émerveillement si pur qu’il vous a réconcilié avec le monde.',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'geste-juste',
      category: 'questions',
      title: 'Justesse',
      subtitle: 'Racontez un moment où vous avez ressenti la certitude absolue d’avoir posé le geste juste.',
      question: 'Racontez un moment où vous avez ressenti la certitude absolue d’avoir posé le geste juste.',
      photoUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'fidele-a-l-enfant',
      category: 'questions',
      title: 'Fidélité',
      subtitle: 'Racontez un moment où vous avez senti que l’enfant que vous étiez aurait été fier de vous.',
      question: 'Racontez un moment où vous avez senti que l’enfant que vous étiez aurait été fier de vous.',
      photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'don-secret',
      category: 'questions',
      title: 'Gratuité',
      subtitle: 'Racontez un moment où quelqu’un vous a offert quelque chose d’inattendu sans rien vous demander.',
      question: 'Racontez un moment où quelqu’un vous a offert quelque chose d’inattendu sans rien vous demander.',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    },
    {
      id: 'ce-qui-restera',
      category: 'questions',
      title: 'Postérité',
      subtitle: 'Racontez ce que vous aimeriez laisser de plus doux et de plus vrai dans le cœur de ceux qui restent.',
      question: 'Racontez ce que vous aimeriez laisser de plus doux et de plus vrai dans le cœur de ceux qui restent.',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      badge: '16 voix du peuple'
    }
  ]
};

// =========================================================================
// BANQUE DE VIDÉOS ET PHOTOS DE QUALITÉ ÉDITORIALE
// =========================================================================
const STOCK_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
];

const PEOPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
];

// Noms et profils humains pour génération variée et authentique
const FIRST_NAMES = [
  'Arouna', 'Clémence', 'Fousseni', 'Nadia', 'Mathieu', 'Sika', 'Carlos', 'Yannick',
  'Mariama', 'Gilles', 'Sayri', 'Amara', 'Koffi', 'Hélène', 'Malik', 'Éléonore',
  'Dah', 'Tobi', 'Fatou', 'Kenji', 'Camille', 'Inès', 'Kwame', 'Mateo',
  'Aïssata', 'Hiroshi', 'Leïla', 'Bastien', 'Chloé', 'Samba', 'Solène', 'Ramiro'
];

const LAST_NAMES = [
  'Kponton', 'Duval', 'Traoré', 'Benali', 'Roy', 'Dossou', 'Mendoza', 'Noah',
  'Sylla', 'Delorme', 'Quispe', 'Tisserande', 'Houndegla', 'Saint-Amand', 'Diop', 'Vance',
  'Zounon', 'Gomez', 'Diallo', 'Tanaka', 'Ronsard', 'Kone', 'Mensah', 'Silva',
  'Bâ', 'Sato', 'Mansour', 'Fournier', 'Gagnon', 'Camara', 'Lambert', 'Chavez'
];

// =========================================================================
// RÉCITS CONTEXTUELS SPÉCIFIQUES POUR LES SUJETS PHARES
// =========================================================================
export interface ExplorerTopicItem {
  id: string;
  category: ExplorerCategoryType;
  title: string;
  tagline: string;
  description: string;
  accentColor: string;
  storiesPool: AffiliationPerson[];
}

// 1. PAYS : BÉNIN (16 voix authentiques)
const BENIN_STORIES: AffiliationPerson[] = [
  {
    id: 'bj-01',
    name: 'Dah Zounon',
    firstName: 'Dah',
    age: 68,
    role: 'Gardien de la forêt sacrée de Kpassè',
    territory: 'Ouidah',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Tradition & Forêt',
    photoUrl: PEOPLE_PHOTOS[0],
    badge: 'Doyen',
    invitationStory: 'Transmet les pactes de respect des arbres millénaires aux jeunes générations.',
    teaserVideoUrl: STOCK_VIDEOS[0],
    teaserPitch: '« Le Bénin ne s’explique pas avec des mots de touristes : c’est une terre où la forêt entend ce que tu penses avant que tu n’aies ouvert la bouche. »',
    generation: 1
  },
  {
    id: 'bj-02',
    name: 'Sika Dossou',
    firstName: 'Sika',
    age: 34,
    role: 'Tisserande de tentures royales appliquées',
    territory: 'Abomey',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Tissage Royal',
    photoUrl: PEOPLE_PHOTOS[1],
    badge: 'Artisane d’Art',
    invitationStory: 'Héritière de la 5e génération des tisserands du palais de Béhanzin.',
    teaserVideoUrl: STOCK_VIDEOS[1],
    teaserPitch: '« Chaque motif cousu sur nos toiles est un décret royal : le poisson qui échappe à la nasse, c’est le peuple béninois qui ne plie jamais. »',
    generation: 1
  },
  {
    id: 'bj-03',
    name: 'Tobi Houndegla',
    firstName: 'Tobi',
    age: 41,
    role: 'Piroguier & guide de la cité lacustre',
    territory: 'Ganvié',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Vie sur l’Eau',
    photoUrl: PEOPLE_PHOTOS[2],
    badge: 'Habitant lacustre',
    invitationStory: 'Navigue chaque jour sur le lac Nokoué sans jamais toucher la terre ferme.',
    teaserVideoUrl: STOCK_VIDEOS[2],
    teaserPitch: '« À Ganvié, nos enfants apprennent à nager avant de courir. L’eau n’est pas un obstacle, elle est notre maison et notre paix. »',
    generation: 1
  },
  {
    id: 'bj-04',
    name: 'Chef Koffi',
    firstName: 'Koffi',
    age: 39,
    role: 'Cuisinier de rue & ambassadeur de l’Aloko',
    territory: 'Cotonou',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Saveurs de Rue',
    photoUrl: PEOPLE_PHOTOS[3],
    badge: 'Cuisinier de Terroir',
    invitationStory: 'A transformé le carrefour Sainte-Rita en temple des saveurs pimentées.',
    teaserVideoUrl: STOCK_VIDEOS[3],
    teaserPitch: '« Manger à Cotonou à 23h assis sur un tabouret en bois, c’est comprendre la générosité d’un peuple qui partage le sel même dans la nuit. »',
    generation: 1
  },
  {
    id: 'bj-05',
    name: 'Arouna Kponton',
    firstName: 'Arouna',
    age: 29,
    role: 'Percussionniste de rythme Kpanlingan',
    territory: 'Porto-Novo',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Tambours Royaux',
    photoUrl: PEOPLE_PHOTOS[4],
    badge: 'Maître tambour',
    invitationStory: 'Fait résonner les gongs jumeaux pour réveiller les ancêtres des cours royales.',
    teaserVideoUrl: STOCK_VIDEOS[4],
    teaserPitch: '« Le rythme de Porto-Novo a des syncopes qu’aucun métronome européen ne peut saisir : c’est le battement direct du cœur humain. »',
    generation: 1
  },
  {
    id: 'bj-06',
    name: 'Marie-Antoinette Adjovi',
    firstName: 'Marie-Antoinette',
    age: 52,
    role: 'Mère marchande de tissus wax & indigo',
    territory: 'Marché Dantokpa',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Marché Dantokpa',
    photoUrl: PEOPLE_PHOTOS[5],
    badge: 'Nana Benz d’honneur',
    invitationStory: 'Pilier de Dantokpa, le plus grand marché à ciel ouvert de toute l’Afrique de l’Ouest.',
    teaserVideoUrl: STOCK_VIDEOS[5],
    teaserPitch: '« Dantokpa, c’est le poumon économique du pays. Si tu veux savoir si le Bénin va bien, viens compter les pas des femmes le matin. »',
    generation: 1
  },
  {
    id: 'bj-07',
    name: 'Armel Hounkpatin',
    firstName: 'Armel',
    age: 33,
    role: 'Architecte en terre stabilisée & paille',
    territory: 'Natitingou',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Tata Somba',
    photoUrl: PEOPLE_PHOTOS[6],
    badge: 'Bâtisseur écologique',
    invitationStory: 'Réinvente la forteresse traditionnelle Tata Somba de l’Atakora en habitat bioclimatique.',
    teaserVideoUrl: STOCK_VIDEOS[0],
    teaserPitch: '« Nos ancêtres de l’Atakora construisaient des forteresses en terre qui respiraient. Le ciment nous a fait oublier comment rester au frais sans climatiseur. »',
    generation: 1
  },
  {
    id: 'bj-08',
    name: 'Félicité Gnanvi',
    firstName: 'Félicité',
    age: 45,
    role: 'Herboriste & guérisseuse des fièvres',
    territory: 'Allada',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Pharmacie Naturelle',
    photoUrl: PEOPLE_PHOTOS[7],
    badge: 'Herboriste des simples',
    invitationStory: 'Connaît le nom secret et l’usage médical de 240 racines des forêts d’Allada.',
    teaserVideoUrl: STOCK_VIDEOS[1],
    teaserPitch: '« Quand la feuille de kinkeliba tremble au lever du soleil, c’est qu’elle est prête à soigner. La terre béninoise guérit ceux qui la respectent. »',
    generation: 1
  },
  {
    id: 'bj-09',
    name: 'Romuald Hazoumè',
    firstName: 'Romuald',
    age: 62,
    role: 'Artiste plasticien & sculpteur de bidons',
    territory: 'Porto-Novo',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Art Contemporain',
    photoUrl: PEOPLE_PHOTOS[8],
    badge: 'Sculpteur engagé',
    invitationStory: 'Transforme les bidons de carburant frelaté Kpayo en masques rituels contemporains.',
    teaserVideoUrl: STOCK_VIDEOS[2],
    teaserPitch: '« Mes masques en bidon d’essence ne sont pas du recyclage : ils renvoient à l’Occident le miroir de notre survie et de notre liberté. »',
    generation: 1
  },
  {
    id: 'bj-10',
    name: 'Inès Agossa',
    firstName: 'Inès',
    age: 26,
    role: 'Slameuse & poétesse engagée',
    territory: 'Cotonou',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Parole Poétique',
    photoUrl: PEOPLE_PHOTOS[9],
    badge: 'Jeune voix',
    invitationStory: 'Anime les scènes ouvertes de slam sous les manguiers de l’Espace Mayton.',
    teaserVideoUrl: STOCK_VIDEOS[3],
    teaserPitch: '« Le français est une langue empruntée, mais quand on y met les proverbes fon et le sang béninois, elle devient un brasier incandescent. »',
    generation: 1
  },
  {
    id: 'bj-11',
    name: 'Père Matthieu',
    firstName: 'Matthieu',
    age: 58,
    role: 'Prêtre catholique en dialogue interreligieux',
    territory: 'Ouidah',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Dialogue Spirituel',
    photoUrl: PEOPLE_PHOTOS[10],
    badge: 'Pont spirituel',
    invitationStory: 'Collabore depuis 25 ans avec les dignitaires vodoun pour la concorde civile.',
    teaserVideoUrl: STOCK_VIDEOS[4],
    teaserPitch: '« À Ouidah, l’église fait face au temple des pythons. Si nous ne nous écoutons pas, c’est le visage même de Dieu que nous déchirons. »',
    generation: 1
  },
  {
    id: 'bj-12',
    name: 'Blandine Tossou',
    firstName: 'Blandine',
    age: 38,
    role: 'Agricultrice de manioc bio & productrice de gari',
    territory: 'Djidja',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Terre & Gari',
    photoUrl: PEOPLE_PHOTOS[11],
    badge: 'Femme de terre',
    invitationStory: 'Gère une coopérative de 60 femmes transformant le manioc au feu de bois.',
    teaserVideoUrl: STOCK_VIDEOS[5],
    teaserPitch: '« Le gari de Savalou et Djidja a la couleur du soleil couchant. Il nourrit l’ouvrier comme le ministre avec la même honnêteté. »',
    generation: 1
  },
  {
    id: 'bj-13',
    name: 'Lucien Dossou-Yovo',
    firstName: 'Lucien',
    age: 48,
    role: 'Bronzier d’art selon la technique de la cire perdue',
    territory: 'Abomey',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Bronze Sacré',
    photoUrl: PEOPLE_PHOTOS[12],
    badge: 'Maître fondeur',
    invitationStory: 'Fond les léopards et les statues de rois qui gardaient les palais royaux.',
    teaserVideoUrl: STOCK_VIDEOS[0],
    teaserPitch: '« Quand le métal en fusion coule dans le moule de terre d’argile, c’est l’esprit des fondeurs royaux qui guide ma main pour ne pas trembler. »',
    generation: 1
  },
  {
    id: 'bj-14',
    name: 'Chantal Vido',
    firstName: 'Chantal',
    age: 31,
    role: 'Médecin urgentiste & bénévole en dispensaire',
    territory: 'Parakou',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Soin du Peuple',
    photoUrl: PEOPLE_PHOTOS[13],
    badge: 'Médecin dévoué',
    invitationStory: 'Parcourt à moto les pistes de terre rouge pour vacciner les enfants des campements.',
    teaserVideoUrl: STOCK_VIDEOS[1],
    teaserPitch: '« Voir une mère béninoise sourire parce que son enfant respire à nouveau après le paludisme, c’est le plus grand salaire qu’un être humain puisse recevoir. »',
    generation: 1
  },
  {
    id: 'bj-15',
    name: 'Cosme Agon',
    firstName: 'Cosme',
    age: 55,
    role: 'Pêcheur d’embouchure & chanteur de pirogue',
    territory: 'Grand-Popo',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'La Mer & le Fleuve',
    photoUrl: PEOPLE_PHOTOS[14],
    badge: 'Pêcheur d’océan',
    invitationStory: 'Tire les grands filets traînants avec 30 hommes sur la plage de Grand-Popo.',
    teaserVideoUrl: STOCK_VIDEOS[2],
    teaserPitch: '« L’Atlantique est sauvage ici, mais quand les 30 gars chantent ensemble pour tirer le filet, la vague finit toujours par s’incliner. »',
    generation: 1
  },
  {
    id: 'bj-16',
    name: 'Nathalie Zinsou',
    firstName: 'Nathalie',
    age: 44,
    role: 'Médiatrice culturelle pour les enfants des écoles',
    territory: 'Ouidah',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Éveil des Enfants',
    photoUrl: PEOPLE_PHOTOS[15],
    badge: 'Passeuse d’art',
    invitationStory: 'Fait découvrir les peintures contemporaines à des milliers d’écoliers chaque année.',
    teaserVideoUrl: STOCK_VIDEOS[3],
    teaserPitch: '« Quand un enfant béninois des quartiers pauvres entre dans un musée et dit "C’est beau, je peux le faire aussi", nous avons gagné pour cent ans. »',
    generation: 1
  }
];

// =========================================================================
// FONCTION UNIVERSELLE : RÉCUPÉRER 16 HISTOIRES POUR N'IMPORTE QUEL SUJET
// =========================================================================
export function get16StoriesForTopic(topicId: string, shuffleSeed: number = 0): AffiliationPerson[] {
  // Si le sujet est le Bénin et qu'on est sur le seed initial
  if (topicId === 'benin' && shuffleSeed === 0) {
    return BENIN_STORIES.slice(0, 16);
  }

  // Chercher dans le catalogue global le sujet
  let targetItem: ExplorerCatalogItem | null = null;
  let targetCategory: ExplorerCategoryType = 'thematics';

  for (const cat of Object.keys(EXPLORER_CATALOG) as ExplorerCategoryType[]) {
    const found = EXPLORER_CATALOG[cat].find(i => i.id === topicId);
    if (found) {
      targetItem = found;
      targetCategory = cat;
      break;
    }
  }

  // 2. Génération contextuelle riche et différenciée selon chaque sujet
  const title = targetItem?.title || topicId.replace(/-/g, ' ');
  const flag = targetItem?.flag || '🌍';

  // Calcul d'une empreinte déterministe unique pour chaque sujet (topicId)
  let topicHash = 0;
  for (let c = 0; c < topicId.length; c++) {
    topicHash = ((topicHash << 5) - topicHash + topicId.charCodeAt(c)) | 0;
  }
  const positiveHash = Math.abs(topicHash);

  // Combinaison robuste de l'empreinte du sujet et de l'offset d'actualisation
  const combinedSeed = positiveHash + shuffleSeed * 13;
  const seedOffset = (combinedSeed * 7) % FIRST_NAMES.length;
  const photoOffset = (positiveHash * 3 + shuffleSeed * 11) % PEOPLE_PHOTOS.length;
  const lastOffset = (positiveHash * 5 + shuffleSeed * 7 + 2) % LAST_NAMES.length;

  const generatedStories: AffiliationPerson[] = [];

  for (let i = 0; i < 16; i++) {
    const nameIdx = (seedOffset + i * 3) % FIRST_NAMES.length;
    const lastIdx = (lastOffset + i * 5) % LAST_NAMES.length;
    const firstName = FIRST_NAMES[nameIdx];
    const lastName = LAST_NAMES[lastIdx];
    const age = 22 + ((positiveHash + i * 7 + shuffleSeed * 5) % 48);
    const photo = PEOPLE_PHOTOS[(photoOffset + i * 3) % PEOPLE_PHOTOS.length];
    const video = STOCK_VIDEOS[(positiveHash + i + shuffleSeed) % STOCK_VIDEOS.length];

    // Rôles et citations adaptés à la catégorie et au sujet précis
    const { role, story, pitch } = generateRoleAndPitch(targetCategory, title, i, shuffleSeed + (positiveHash % 17));

    const territory = targetCategory === 'countries'
      ? getTerritoryForCountryAndSeed(topicId, i + shuffleSeed)
      : getTerritoryForSeed(i + seedOffset + (positiveHash % 11));

    const country = targetCategory === 'countries'
      ? title
      : getCountryForSeed(i + seedOffset + (positiveHash % 7));

    const itemFlag = targetCategory === 'countries'
      ? flag
      : getFlagForSeed(i + seedOffset + (positiveHash % 7));

    generatedStories.push({
      id: `story-${topicId}-${shuffleSeed}-${i + 1}`,
      name: `${firstName} ${lastName}`,
      firstName,
      age,
      role,
      territory,
      country,
      flag: itemFlag,
      universeTag: title,
      photoUrl: photo,
      badge: i === 0 ? 'Témoin d’honneur' : 'Récit vivant',
      invitationStory: story,
      teaserVideoUrl: video,
      teaserPitch: pitch,
      generation: 1
    });
  }

  return generatedStories;
}

// Fonction auxiliaire de rotation de pool déterministe
function rotatePool(pool: AffiliationPerson[], shuffleSeed: number): AffiliationPerson[] {
  if (shuffleSeed === 0) return pool.slice(0, 16);
  const offset = (shuffleSeed * 5) % pool.length;
  const rotated = [...pool.slice(offset), ...pool.slice(0, offset)];
  return rotated.slice(0, 16);
}

// Générateur de rôle et de pitch spécifique au thème et à la catégorie
function generateRoleAndPitch(
  category: ExplorerCategoryType, 
  title: string, 
  index: number, 
  seed: number
): { role: string; story: string; pitch: string } {
  const batchNum = seed + 1;

  if (category === 'personalities') {
    const roles = [
      `Chorégraphe & disciple de l'énergie de ${title}`,
      `Costumier & créateur de silhouettes inspirées de ${title}`,
      `Sociologue des cultures urbaines & de l'impact de ${title}`,
      `Percussionniste influencé dès l'enfance par ${title}`,
      `Réalisatrice de documentaires sur la légende ${title}`,
      `Entraîneur de jeunes athlètes s'inspirant de ${title}`,
      `Historien de la pop culture & biographe de ${title}`,
      `Fresquiste urbain ayant peint des fresques géantes de ${title}`,
      `Disquaire vinyle indépendant collectionneur de ${title}`,
      `Musicien de scène rendant hommage à ${title}`,
      `Psychologue étudiant la résilience et le mental de ${title}`,
      `Jeune talent ayant débuté sa vocation grâce à ${title}`,
      `Journaliste sportif ayant suivi la carrière de ${title}`,
      `Photographe de tournée ayant approché ${title}`,
      `Professeur d'expression scénique inspiré par ${title}`,
      `Militant associatif portant le message d'émancipation de ${title}`
    ];
    const quotes = [
      `« Ce que ${title} m'a appris, c'est que la sueur et le travail acharné font paraître l'impossible comme un miracle spontané. »`,
      `« Dès le premier accord ou le premier pas, on ressentait que ${title} ne jouait pas : il canalisait une flamme cosmique. »`,
      `« Dans notre quartier, ${title} était le poster au mur qui nous répétait que nos rêves valaient plus que les limites de notre horizon. »`,
      `« Étudier le parcours de ${title} m'a sauvé d'un abandon certain : la persévérance finit toujours par imposer le respect. »`,
      `« Chaque soir avant d'entrer en scène, je repense à la concentration absolue de ${title} : le public mérite 100% de notre âme. »`
    ];
    return {
      role: roles[index % roles.length],
      story: `A consacré 12 ans à explorer l'héritage vivant de ${title} (vol. ${batchNum}).`,
      pitch: quotes[(index + seed) % quotes.length]
    };
  }

  if (category === 'brands') {
    const roles = [
      `Artisan maroquinier & conservateur des gestes chez ${title}`,
      `Athlète de rue soutenu dans ses débuts par ${title}`,
      `Innovateur matériaux recyclés & fibres végétales pour ${title}`,
      `Restaurateur de pièces d'archives et bagages anciens de ${title}`,
      `Directeur d'atelier de compagnons associé à ${title}`,
      `Designer de motifs et d'objets intemporels chez ${title}`,
      `Ouvrier historique ayant passé 35 ans dans les manufactures ${title}`,
      `Chercheur en ergonomie du mouvement et du confort pour ${title}`,
      `Maroquinière sellière formée aux exigences de ${title}`,
      `Photographe des coulisses des ateliers ${title}`,
      `Apprenti ayant reçu sa transmission d'or chez ${title}`,
      `Ambassadeur de la réparation durable en partenariat avec ${title}`,
      `Collectionneur privé retraçant l'évolution du logo ${title}`,
      `Modéliste textile repoussant les limites techniques de ${title}`,
      `Responsable de la filière écoresponsable chez ${title}`,
      `Compagnon d'honneur célébrant le siècle de savoir-faire de ${title}`
    ];
    const quotes = [
      `« Chez ${title}, le vrai luxe n'est pas le prix : c'est le temps inestimable que la main humaine consacre à chaque point de couture. »`,
      `« Quand une chaussure ou un sac ${title} dure 25 ans et traverse trois continents, ce n'est plus un objet, c'est un compagnon de vie. »`,
      `« La technologie ne remplacera jamais l'œil de l'artisan qui sent la tension du fil ou la souplesse de la matière d'un simple toucher. »`,
      `« Nous avons prouvé qu'une grande marque comme ${title} peut allier élégance brute et respect de la terre nourricière. »`
    ];
    return {
      role: roles[index % roles.length],
      story: `Témoigne de l'exigence du geste et de l'âme humaine derrière ${title} (regard n°${batchNum}).`,
      pitch: quotes[(index + seed) % quotes.length]
    };
  }

  if (category === 'countries') {
    const roles = [
      `Gardien des récits ancestraux & des sites sacrés de ${title}`,
      `Artisane tisserande des motifs héraldiques de ${title}`,
      `Pêcheur traditionnel des estuaires et lagunes de ${title}`,
      `Cuisinier de rue & ambassadeur des épices de ${title}`,
      `Herboriste des forêts et plateaux de ${title}`,
      `Bâtisseur en architecture de terre et bois de ${title}`,
      `Percussionniste des cérémonies sacrées de ${title}`,
      `Agricultrice de semences anciennes de ${title}`,
      `Slameuse poétesse chantant les colères et espoirs de ${title}`,
      `Prêtre ou guide spirituel de la mémoire de ${title}`,
      `Bronzier ou potier perpétuant la cire perdue de ${title}`,
      `Médiatrice culturelle initiant les écoliers de ${title}`,
      `Berger des hauts pâturages ou de la savane de ${title}`,
      `Médecin de brousse soignant par les plantes de ${title}`,
      `Piroguier guidant sur les fleuves nourriciers de ${title}`,
      `Artiste fresquiste célébrant la fierté du peuple de ${title}`
    ];
    const quotes = [
      `« Ce pays ne se visite pas en spectateur pressé : il faut s’asseoir, boire le thé ou l’eau de bienvenue, et écouter le silence des anciens. »`,
      `« Chaque pierre, chaque marché et chaque rivière de ${title} portent les chants de ceux qui ont marché avant nous. »`,
      `« Si tu veux comprendre l’âme de ${title}, regarde comment les mères partagent le repas même quand la récolte a été maigre. »`,
      `« La beauté de ${title} réside dans la chaleur des poignées de main et la force d’un sourire qui ne s’éteint jamais. »`
    ];
    return {
      role: roles[index % roles.length],
      story: `Voix vivante de ${title} partageant son lien intime avec cette terre (vol. ${batchNum}).`,
      pitch: quotes[(index + seed) % quotes.length]
    };
  }

  // Thématiques générales, offres, projets, questions
  const roles = [
    `Passeur de savoirs & chercheur sur : ${title}`,
    `Praticien chevronné appliquant quotidiennement : ${title}`,
    `Apprenti en quête de justesse autour de : ${title}`,
    `Enseignant transmettant aux nouvelles générations : ${title}`,
    `Artisan sculpteur de matières en lien avec : ${title}`,
    `Thérapeute à l'écoute des corps et de : ${title}`,
    `Philosophe de terrain interrogeant les racines de : ${title}`,
    `Témoin ayant vécu une transformation majeure grâce à : ${title}`,
    `Bâtisseur d'initiatives communautaires autour de : ${title}`,
    `Griot contemporain racontant les paradoxes de : ${title}`,
    `Explorateur des mondes invisibles guidé par : ${title}`,
    `Créateur d'œuvres inspirées par la dynamique de : ${title}`,
    `Aîné dépositaire d'un secret ancien sur : ${title}`,
    `Jeune innovateur réinventant les règles de : ${title}`,
    `Médiateur réconciliant tradition et modernité dans : ${title}`,
    `Gardien du feu veillant sur l'éthique de : ${title}`
  ];

  const quotes = [
    `« Aborder ${title}, ce n'est pas accumuler des théories : c'est oser faire l'expérience directe dans sa propre chair. »`,
    `« À l'instant où l'on cesse de vouloir dominer ${title}, c'est là que le mystère révèle sa plus éclatante clarté. »`,
    `« Ce sujet relie des personnes qui ne se sont jamais rencontrées mais dont les cœurs vibrent à la même fréquence. »`,
    `« Quand on plonge au fond de ${title}, on découvre que la question est mille fois plus féconde que la réponse toute faite. »`
  ];

  return {
    role: roles[index % roles.length],
    story: `Partage son cheminement et ses découvertes autour de ${title} (perspective n°${batchNum}).`,
    pitch: quotes[(index + seed) % quotes.length]
  };
}

function getTerritoryForCountryAndSeed(countryId: string, idx: number): string {
  const countryCities: Record<string, string[]> = {
    benin: ['Ouidah', 'Cotonou', 'Porto-Novo', 'Abomey', 'Parakou', 'Natitingou', 'Bohicon', 'Grand-Popo'],
    perou: ['Urubamba', 'Cuzco', 'Lima', 'Arequipa', 'Pisac', 'Ollantaytambo', 'Trujillo', 'Puno'],
    japon: ['Kyoto', 'Tokyo', 'Osaka', 'Nara', 'Kamakura', 'Kanazawa', 'Hakone', 'Fukuoka'],
    senegal: ['Saint-Louis', 'Dakar', 'Gorée', 'Touba', 'Ziguinchor', 'Rufisque', 'Thiès', 'Mbour'],
    france: ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse', 'Nantes', 'Lille', 'Strasbourg'],
    bresil: ['Salvador de Bahia', 'Rio de Janeiro', 'São Paulo', 'Recife', 'Manaus', 'Belo Horizonte', 'Olinda', 'Brasília'],
    mali: ['Bandiagara', 'Bamako', 'Djenné', 'Tombouctou', 'Mopti', 'Ségou', 'Kayes', 'Koulikoro'],
    colombie: ['Sierra Nevada', 'Bogota', 'Medellín', 'Carthagène', 'Santa Marta', 'Cali', 'Villa de Leyva', 'Barichara'],
    maroc: ['Fès', 'Marrakech', 'Essaouira', 'Chefchaouen', 'Tanger', 'Casablanca', 'Rabat', 'Ouarzazate'],
    inde: ['Varanasi', 'Rishikesh', 'Jaipur', 'Udaipur', 'Kerala', 'Mumbai', 'Delhi', 'Hampi'],
    islande: ['Reykjavik', 'Akureyri', 'Vik', 'Husavik', 'Seyðisfjörður', 'Isafjörður', 'Hofn', 'Selfoss'],
    cuba: ['La Havane', 'Trinidad', 'Santiago de Cuba', 'Viñales', 'Cienfuegos', 'Camagüey', 'Santa Clara', 'Baracoa'],
    canada: ['Montréal', 'Québec', 'Vancouver', 'Toronto', 'Victoria', 'Tofino', 'Halifax', 'Ottawa'],
    mexique: ['Oaxaca', 'Mexico', 'San Cristóbal', 'Mérida', 'Guadalajara', 'Tulum', 'Puebla', 'Guanajuato'],
    cotedivoire: ['Abidjan', 'Yamoussoukro', 'Grand-Bassam', 'Korhogo', 'Bouaké', 'Man', 'San Pedro', 'Assinie'],
    cote_divoire: ['Abidjan', 'Yamoussoukro', 'Grand-Bassam', 'Korhogo', 'Bouaké', 'Man', 'San Pedro', 'Assinie'],
    portugal: ['Évora', 'Lisbonne', 'Porto', 'Sintra', 'Coimbra', 'Braga', 'Faro', 'Tavira']
  };

  const normalized = countryId.toLowerCase().replace(/[^a-z]/g, '');
  const cities = countryCities[normalized] || countryCities[countryId] || [
    'Ouidah', 'Urubamba', 'Kyoto', 'Saint-Louis', 'Paris', 'Salvador de Bahia', 'Fès', 'Varanasi'
  ];
  return cities[idx % cities.length];
}

function getTerritoryForSeed(idx: number): string {
  const territories = [
    'Ouidah', 'Urubamba', 'Kyoto', 'Saint-Louis', 'Paris', 'Salvador de Bahia',
    'Bandiagara', 'Sierra Nevada', 'Fès', 'Varanasi', 'Reykjavik', 'La Havane',
    'Montréal', 'Oaxaca', 'Abidjan', 'Évora', 'Cotonou', 'Cuzco', 'Porto-Novo'
  ];
  return territories[idx % territories.length];
}

function getCountryForSeed(idx: number): string {
  const countries = [
    'Bénin', 'Pérou', 'Japon', 'Sénégal', 'France', 'Brésil',
    'Mali', 'Colombie', 'Maroc', 'Inde', 'Islande', 'Cuba',
    'Canada', 'Mexique', 'Côte d’Ivoire', 'Portugal'
  ];
  return countries[idx % countries.length];
}

function getFlagForSeed(idx: number): string {
  const flags = [
    '🇧🇯', '🇵🇪', '🇯🇵', '🇸🇳', '🇫🇷', '🇧🇷',
    '🇲🇱', '🇨🇴', '🇲🇦', '🇮🇳', '🇮🇸', '🇨🇺',
    '🇨🇦', '🇲🇽', '🇨🇮', '🇵🇹'
  ];
  return flags[idx % flags.length];
}

export function getTerritoryVisualUrl(countryId: string): string {
  const map: Record<string, string> = {
    benin: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80', // Ganvié / Cité lacustre & terre Vodoun
    perou: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=300&q=80', // Cusco / Terres sacrées des Andes
    japon: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=300&q=80', // Forêt sacrée de cyprès & bois sculpté
    senegal: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80', // Terres du Sine Saloum & baobabs
    france: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80', // Pierre de taille & vignes
    bresil: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=300&q=80', // Terre rouge & canopée
    mali: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=300&q=80', // Falaises de Bandiagara & terre cuite de banco
    colombie: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?auto=format&fit=crop&w=300&q=80', // Sierra Nevada & café des brumes
    maroc: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=300&q=80', // Argile des kasbahs & zellige
    inde: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=300&q=80', // Pierre sculptée & fleuve sacré
    islande: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=300&q=80', // Basalte noir, mousse et glaciers
    cuba: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?auto=format&fit=crop&w=300&q=80', // Terre ocre, tabac & mer des Caraïbes
    canada: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=300&q=80', // Grands cèdres & roches boréales
    mexique: 'https://images.unsplash.com/photo-1512813389649-acb9131ced20?auto=format&fit=crop&w=300&q=80', // Terre d'argile, agave & pyramides
    'cote-divoire': 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80', // Forêt dense & terres de cacao
    portugal: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=300&q=80', // Azulejos & côtes océaniques
    grece: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=300&q=80', // Marbre blanc & oliveraies
    norvege: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=300&q=80', // Fjords & bois d'épicéa
    italie: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=300&q=80', // Terres toscanes & cyprès
    'afrique-du-sud': 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=300&q=80' // Terres du Cap & savane
  };
  return map[countryId] || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80';
}

export const getCountryFlagUrl = getTerritoryVisualUrl;

