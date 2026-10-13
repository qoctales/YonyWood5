export interface Dimension {
  id: string; // 'sagesses', 'territoires', etc.
  ordre: number; // 1 à 16
  label: string;
  shortLabel: string;
  folder: string; // '01-sagesses', etc.
  icone: string; // '01-sagesses/_dimension'
  tagline: string;
  description: string;
  badge: string;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
  coverImage: string;
}

export interface SousCategorie {
  id: string; // composite 'dimension/slug', ex: 'sagesses/epreuves', 'passions/sport'
  dimensionId: string; // 'sagesses', etc.
  slug: string; // 'epreuves', etc.
  ordre: number; // 1 à 8
  label: string;
  icone: string; // '01-sagesses/epreuves'
  question?: string;
  tagline?: string;
  description?: string;
  badge?: string;
  photoUrl?: string;
}

// =========================================================================
// SOURCE UNIQUE DE VÉRITÉ : LES 16 DIMENSIONS OFFICIELLES
// =========================================================================
export const DIMENSIONS: Dimension[] = [
  {
    id: 'sagesses',
    ordre: 1,
    folder: '01-sagesses',
    label: 'Sagesses',
    shortLabel: 'Sagesses',
    icone: '01-sagesses/_dimension',
    tagline: '8 thématiques de vie universelles',
    description: 'Face aux grands tournants de l’existence, les témoins partagent les enseignements reçus et forgés à travers les épreuves.',
    badge: '8 sagesses universelles',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.65)',
    bgGradient: 'from-[#A855F7] via-[#7E22CE] to-[#3B0764]',
    coverImage: '/assets/doors/door-sagesses.jpg'
  },
  {
    id: 'territoires',
    ordre: 2,
    folder: '02-territoires',
    label: 'Territoires',
    shortLabel: 'Territoires',
    icone: '02-territoires/_dimension',
    tagline: 'Lieux d’ancrage, racines et chemins d’exil',
    description: 'Des villages de terre rouge aux métropoles vibrantes, la géographie intime qui façonne notre regard sur le monde.',
    badge: '8 horizons de vie',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.65)',
    bgGradient: 'from-[#10B981] via-[#047857] to-[#064E3B]',
    coverImage: '/assets/doors/door-territoires.jpg'
  },
  {
    id: 'expertises',
    ordre: 3,
    folder: '03-expertises',
    label: 'Expertises',
    shortLabel: 'Expertises',
    icone: '03-expertises/_dimension',
    tagline: 'Métiers, compétences et vocations',
    description: 'De l’artisanat d’art aux technologies de pointe, l’intelligence de la main, de l’esprit et du cœur.',
    badge: '8 domaines de maîtrise',
    accentColor: '#0EA5E9',
    glowColor: 'rgba(14, 165, 233, 0.65)',
    bgGradient: 'from-[#0EA5E9] via-[#0369A1] to-[#082F49]',
    coverImage: '/assets/doors/door-competences.jpg'
  },
  {
    id: 'produits-services',
    ordre: 4,
    folder: '04-produits-services',
    label: 'Produits et services',
    shortLabel: 'Produits & Serv.',
    icone: '04-produits-services/_dimension',
    tagline: 'Créations, soins, offres et utilité concrète',
    description: 'Ce que nous concevons pour nourrir, vêtir, soigner et embellir le quotidien des nôtres.',
    badge: '8 filières créatives',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.65)',
    bgGradient: 'from-[#6366F1] via-[#4338CA] to-[#1E1B4B]',
    coverImage: '/assets/doors/door-offres.jpg'
  },
  {
    id: 'projets',
    ordre: 5,
    folder: '05-projets',
    label: 'Projets',
    shortLabel: 'Projets',
    icone: '05-projets/_dimension',
    tagline: 'Initiatives citoyennes, entreprises et élans de vie',
    description: 'Les aventures collectives et individuelles qui transforment notre communauté et construisent demain.',
    badge: '8 dynamiques d’action',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.65)',
    bgGradient: 'from-[#EC4899] via-[#BE185D] to-[#500724]',
    coverImage: '/assets/doors/door-projets.jpg'
  },
  {
    id: 'marques',
    ordre: 6,
    folder: '06-marques',
    label: 'Marques',
    shortLabel: 'Marques',
    icone: '06-marques/_dimension',
    tagline: 'Maisons emblématiques, confiance et histoire',
    description: 'Les enseignes, manufactures et labels qui portent une signature, une exigence et une fidélité intergénérationnelle.',
    badge: '8 univers de marques',
    accentColor: '#FB923C',
    glowColor: 'rgba(251, 146, 60, 0.65)',
    bgGradient: 'from-[#FB923C] via-[#C2410C] to-[#431407]',
    coverImage: '/assets/doors/door-marques.jpg'
  },
  {
    id: 'personnalites',
    ordre: 7,
    folder: '07-personnalites',
    label: 'Personnalités',
    shortLabel: 'Personnalités',
    icone: '07-personnalites/_dimension',
    tagline: 'Figures de proue, créateurs et voix marquantes',
    description: 'Celles et ceux dont la parole, le geste ou le destin ont ouvert une brèche et guidé les esprits.',
    badge: '8 horizons d’influence',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.65)',
    bgGradient: 'from-[#F59E0B] via-[#B45309] to-[#78350F]',
    coverImage: '/assets/doors/door-personnalites.jpg'
  },
  {
    id: 'figures-du-quotidien',
    ordre: 8,
    folder: '08-figures-du-quotidien',
    label: 'Figures du quotidien',
    shortLabel: 'Figures',
    icone: '08-figures-du-quotidien/_dimension',
    tagline: 'Parents, voisins, maîtres et héros discrets',
    description: 'Les repères de nos vies ordinaires, ceux qui nous ont tendu la main sans bruit mais avec amour.',
    badge: '8 présences essentielles',
    accentColor: '#14B8A6',
    glowColor: 'rgba(20, 184, 166, 0.65)',
    bgGradient: 'from-[#14B8A6] via-[#0F766E] to-[#134E4A]',
    coverImage: '/assets/doors/door-personnalites.jpg'
  },
  {
    id: 'evenements',
    ordre: 9,
    folder: '09-evenements',
    label: 'Événements',
    shortLabel: 'Événements',
    icone: '09-evenements/_dimension',
    tagline: 'Rituels de passage, commémorations et bascules',
    description: 'Ces jours précis où le temps s’arrête : fêtes, naissances, mariages ou tourments historiques qui ont forgé notre mémoire.',
    badge: '8 moments clés',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.65)',
    bgGradient: 'from-[#8B5CF6] via-[#6D28D9] to-[#4C1D95]',
    coverImage: '/assets/doors/door-memoires.jpg'
  },
  {
    id: 'communautes',
    ordre: 10,
    folder: '10-communautes',
    label: 'Communautés',
    shortLabel: 'Communautés',
    icone: '10-communautes/_dimension',
    tagline: 'Collectifs, quartiers, diasporas et familles',
    description: 'La force du groupe, le cercle solidaire où la solitude se dissout et où le mot « ensemble » reprend tout son sens.',
    badge: '8 cercles humains',
    accentColor: '#E11D48',
    glowColor: 'rgba(225, 29, 72, 0.65)',
    bgGradient: 'from-[#E11D48] via-[#BE123C] to-[#881337]',
    coverImage: '/assets/doors/door-projets.jpg'
  },
  {
    id: 'institutions',
    ordre: 11,
    folder: '11-institutions',
    label: 'Institutions',
    shortLabel: 'Institutions',
    icone: '11-institutions/_dimension',
    tagline: 'Écoles, hôpitaux, justice et biens communs',
    description: 'Les piliers de la vie publique qui structurent l’éducation, la santé, le droit et la protection citoyenne.',
    badge: '8 piliers civiques',
    accentColor: '#0284C7',
    glowColor: 'rgba(2, 132, 199, 0.65)',
    bgGradient: 'from-[#0284C7] via-[#0369A1] to-[#0C4A6E]',
    coverImage: '/assets/doors/door-competences.jpg'
  },
  {
    id: 'objets',
    ordre: 12,
    folder: '12-objets',
    label: 'Objets',
    shortLabel: 'Objets',
    icone: '12-objets/_dimension',
    tagline: 'Reliques, bijoux, livres et témoins silencieux',
    description: 'La matière chargée d’âme : un vêtement cousu, une bague passée d’aïeul en petit-enfant, une lettre jaunie.',
    badge: '8 trésors matériels',
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.65)',
    bgGradient: 'from-[#D97706] via-[#B45309] to-[#78350F]',
    coverImage: '/assets/doors/door-marques.jpg'
  },
  {
    id: 'savoir-faire',
    ordre: 13,
    folder: '13-savoir-faire',
    label: 'Savoir-faire',
    shortLabel: 'Savoir-faire',
    icone: '13-savoir-faire/_dimension',
    tagline: 'Recettes, chants, remèdes et gestes ancestraux',
    description: 'Le secret de la pâte, les herbes qui guérissent, la danse des cérémonies, la langue qui relie aux racines.',
    badge: '8 transmissions vivantes',
    accentColor: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.65)',
    bgGradient: 'from-[#059669] via-[#047857] to-[#064E3B]',
    coverImage: '/assets/doors/door-sagesses.jpg'
  },
  {
    id: 'passions',
    ordre: 14,
    folder: '14-passions',
    label: 'Passions',
    shortLabel: 'Passions',
    icone: '14-passions/_dimension',
    tagline: 'Ce qui fait battre le cœur et vibrer les sens',
    description: 'Musique, sport, cuisine, voyage : ce feu sacré qui nous anime et nous pousse à nous dépasser.',
    badge: '8 flammes créatives',
    accentColor: '#EA580C',
    glowColor: 'rgba(234, 88, 12, 0.65)',
    bgGradient: 'from-[#EA580C] via-[#C2410C] to-[#7C2D12]',
    coverImage: '/assets/doors/door-offres.jpg'
  },
  {
    id: 'moments-de-vie',
    ordre: 15,
    folder: '15-moments-de-vie',
    label: 'Moments de vie',
    shortLabel: 'Moments de vie',
    icone: '15-moments-de-vie/_dimension',
    tagline: 'De l’enfance aux grands âges, la roue du temps',
    description: 'Chaque âge a sa lumière, son vertige et ses apprentissages. La fresque continue de notre évolution humaine.',
    badge: '8 âges de la vie',
    accentColor: '#7C3AED',
    glowColor: 'rgba(124, 58, 237, 0.65)',
    bgGradient: 'from-[#7C3AED] via-[#6D28D9] to-[#4C1D95]',
    coverImage: '/assets/doors/door-memoires.jpg'
  },
  {
    id: 'series',
    ordre: 16,
    folder: '16-series',
    label: 'Séries',
    shortLabel: 'Séries',
    icone: '16-series/_dimension',
    tagline: 'Filiation & Arbres de Cooptation',
    description: 'Explorez les séries documentaires fondatrices et leurs 16 pionniers. Remontez le fil des transmissions de génération en génération où chacun coapte le suivant.',
    badge: 'Cooptation vivante',
    accentColor: '#C89B3C',
    glowColor: 'rgba(200, 155, 60, 0.65)',
    bgGradient: 'from-[#D97706] via-[#92400E] to-[#451A03]',
    coverImage: '/assets/doors/door-series.jpg'
  }
];

// =========================================================================
// SOURCE UNIQUE DE VÉRITÉ : LES SOUS-CATÉGORIES OFFICIELLES (8 PAR DIMENSION)
// =========================================================================
export const SOUS_CATEGORIES: SousCategorie[] = [
  // 01. SAGESSES
  {
    id: 'sagesses/epreuves',
    dimensionId: 'sagesses',
    slug: 'epreuves',
    ordre: 1,
    label: 'Épreuves',
    icone: '01-sagesses/epreuves',
    question: 'Quelle épreuve majeure a brisé vos certitudes pour reconstruire votre force ?',
    tagline: 'La traversée de l’adversité et la résilience intime'
  },
  {
    id: 'sagesses/amour-couple',
    dimensionId: 'sagesses',
    slug: 'amour-couple',
    ordre: 2,
    label: 'Amour et couple',
    icone: '01-sagesses/amour-couple',
    question: 'Comment cultivez-vous l’harmonie et la durée dans l’amour face aux tempêtes ?',
    tagline: 'Le compagnonnage, le pardon et la tendresse partagée'
  },
  {
    id: 'sagesses/famille',
    dimensionId: 'sagesses',
    slug: 'famille',
    ordre: 3,
    label: 'Famille',
    icone: '01-sagesses/famille',
    question: 'Quel est l’héritage invisible que vous choisissez de transmettre à vos enfants ?',
    tagline: 'Les liens du sang, les silences et les fidélités'
  },
  {
    id: 'sagesses/travail',
    dimensionId: 'sagesses',
    slug: 'travail',
    ordre: 4,
    label: 'Travail',
    icone: '01-sagesses/travail',
    question: 'Comment votre labeur quotidien nourrit-il votre dignité et votre communauté ?',
    tagline: 'Le sens du geste, la patience et l’effort juste'
  },
  {
    id: 'sagesses/argent',
    dimensionId: 'sagesses',
    slug: 'argent',
    ordre: 5,
    label: 'Argent',
    icone: '01-sagesses/argent',
    question: 'Quel est votre rapport intime à la richesse matérielle et au partage ?',
    tagline: 'La circulation des ressources, l’abondance et la mesure'
  },
  {
    id: 'sagesses/spiritualite',
    dimensionId: 'sagesses',
    slug: 'spiritualite',
    ordre: 6,
    label: 'Spiritualité',
    icone: '01-sagesses/spiritualite',
    question: 'Face au mystère de la vie, quelle est la source invisible qui apaise votre esprit ?',
    tagline: 'La transcendance, la prière et la paix intérieure'
  },
  {
    id: 'sagesses/exil',
    dimensionId: 'sagesses',
    slug: 'exil',
    ordre: 7,
    label: 'Exil',
    icone: '01-sagesses/exil',
    question: 'Qu’avez-vous laissé derrière vous et que portez-vous toujours en terre étrangère ?',
    tagline: 'L’éloignement, le déracinement et la patrie intérieure'
  },
  {
    id: 'sagesses/reinvention',
    dimensionId: 'sagesses',
    slug: 'reinvention',
    ordre: 8,
    label: 'Réinvention',
    icone: '01-sagesses/reinvention',
    question: 'À quel moment avez-vous eu le courage de tout recommencer à zéro ?',
    tagline: 'La métamorphose, l’audace et la renaissance personnelle'
  },

  // 02. TERRITOIRES
  {
    id: 'territoires/villages',
    dimensionId: 'territoires',
    slug: 'villages',
    ordre: 1,
    label: 'Villages',
    icone: '02-territoires/villages',
    question: 'Quelle sagesse ou quelle leçon de terre votre village d’origine vous a-t-il insufflée ?',
    tagline: 'Le calme des terroirs, la terre rouge et la mémoire paysanne'
  },
  {
    id: 'territoires/villes',
    dimensionId: 'territoires',
    slug: 'villes',
    ordre: 2,
    label: 'Villes',
    icone: '02-territoires/villes',
    question: 'Comment la ville où vous vivez nourrit-elle votre énergie et vos combats quotidiens ?',
    tagline: 'Le bouillonnement urbain, les carrefours et les horizons d’acier'
  },
  {
    id: 'territoires/pays-origine',
    dimensionId: 'territoires',
    slug: 'pays-origine',
    ordre: 3,
    label: "Pays d'origine",
    icone: '02-territoires/pays-origine',
    question: 'Quel lien indéfectible continue de vous lier à la terre qui vous a vu naître ?',
    tagline: 'Les berceaux, les hymnes secrets et la fierté des origines'
  },
  {
    id: 'territoires/vie-etranger',
    dimensionId: 'territoires',
    slug: 'vie-etranger',
    ordre: 4,
    label: "Vie à l'étranger",
    icone: '02-territoires/vie-etranger',
    question: 'Comment avez-vous créé votre chez-vous loin de vos repères d’enfance ?',
    tagline: 'Les ponts entre cultures, l’adaptation et le double ancrage'
  },
  {
    id: 'territoires/nature',
    dimensionId: 'territoires',
    slug: 'nature',
    ordre: 5,
    label: 'Nature',
    icone: '02-territoires/nature',
    question: 'Quel paysage sauvage ou quel élément naturel régénère votre âme ?',
    tagline: 'Les fleuves, les forêts, les collines et les vents puissants'
  },
  {
    id: 'territoires/patrimoine',
    dimensionId: 'territoires',
    slug: 'patrimoine',
    ordre: 6,
    label: 'Patrimoine',
    icone: '02-territoires/patrimoine',
    question: 'Quel lieu historique ou monument sacré incarne la grandeur de votre peuple ?',
    tagline: 'Les pierres séculaires, les palais royaux et les sanctuaires'
  },
  {
    id: 'territoires/traditions',
    dimensionId: 'territoires',
    slug: 'traditions',
    ordre: 7,
    label: 'Traditions',
    icone: '02-territoires/traditions',
    question: 'Quelle fête coutumière ou grand rassemblement réveille votre sentiment d’appartenance ?',
    tagline: 'Les cérémonies, les tambours et la communion festive'
  },
  {
    id: 'territoires/terroirs',
    dimensionId: 'territoires',
    slug: 'terroirs',
    ordre: 8,
    label: 'Terroirs',
    icone: '02-territoires/terroirs',
    question: 'Quel goût, quel parfum ou quelle récolte résume la richesse de votre terroir ?',
    tagline: 'La saveur des saisons, les cultures vivrières et la générosité de la terre'
  },

  // 03. EXPERTISES
  {
    id: 'expertises/artisanat',
    dimensionId: 'expertises',
    slug: 'artisanat',
    ordre: 1,
    label: 'Artisanat',
    icone: '03-expertises/artisanat',
    question: 'Quel geste d’orfèvre ou de tissage perpétuez-vous pour honorer la matière ?',
    tagline: 'La noblesse du façonnage manuel, la forge, le cuir et le bois'
  },
  {
    id: 'expertises/droit-finance',
    dimensionId: 'expertises',
    slug: 'droit-finance',
    ordre: 2,
    label: 'Droit et finance',
    icone: '03-expertises/droit-finance',
    question: 'Comment mettez-vous la rigueur juridique ou financière au service de l’équité ?',
    tagline: 'La justice, la protection des actifs et la régulation éthique'
  },
  {
    id: 'expertises/sante',
    dimensionId: 'expertises',
    slug: 'sante',
    ordre: 3,
    label: 'Santé',
    icone: '03-expertises/sante',
    question: 'Quelle éthique guide votre pratique du soin pour soulager la souffrance ?',
    tagline: 'La médecine, les thérapies, le secours et l’écoute empathique'
  },
  {
    id: 'expertises/education',
    dimensionId: 'expertises',
    slug: 'education',
    ordre: 4,
    label: 'Éducation',
    icone: '03-expertises/education',
    question: 'Comment éveillez-vous l’esprit critique et l’autonomie de ceux que vous formez ?',
    tagline: 'La pédagogie, la transmission du savoir et la transmission des repères'
  },
  {
    id: 'expertises/technologie',
    dimensionId: 'expertises',
    slug: 'technologie',
    ordre: 5,
    label: 'Technologie',
    icone: '03-expertises/technologie',
    question: 'Quelle innovation technique développez-vous pour répondre à un besoin réel ?',
    tagline: 'Le code, les infrastructures numériques et la conception de solutions'
  },
  {
    id: 'expertises/commerce',
    dimensionId: 'expertises',
    slug: 'commerce',
    ordre: 6,
    label: 'Commerce',
    icone: '03-expertises/commerce',
    question: 'Quel est votre secret pour instaurer une confiance durable avec vos clients ?',
    tagline: 'L’art de la négociation, la distribution et le service irréprochable'
  },
  {
    id: 'expertises/agriculture',
    dimensionId: 'expertises',
    slug: 'agriculture',
    ordre: 7,
    label: 'Agriculture',
    icone: '03-expertises/agriculture',
    question: 'Comment conjuguez-vous rendement agricole et respect des équilibres vivants ?',
    tagline: 'L’agronomie, l’élevage raisonné et la souveraineté alimentaire'
  },
  {
    id: 'expertises/arts-medias',
    dimensionId: 'expertises',
    slug: 'arts-medias',
    ordre: 8,
    label: 'Arts et médias',
    icone: '03-expertises/arts-medias',
    question: 'Quelle vérité singulière cherchez-vous à faire entendre à travers votre création ?',
    tagline: 'L’écriture, la réalisation, le design graphique et le journalisme'
  },

  // 04. PRODUITS ET SERVICES
  {
    id: 'produits-services/beaute',
    dimensionId: 'produits-services',
    slug: 'beaute',
    ordre: 1,
    label: 'Beauté',
    icone: '04-produits-services/beaute',
    question: 'Quelle vision bienveillante et naturelle de la beauté portez-vous à travers vos soins ?',
    tagline: 'Cosmétique naturelle, coiffure et mise en valeur des peaux'
  },
  {
    id: 'produits-services/alimentation',
    dimensionId: 'produits-services',
    slug: 'alimentation',
    ordre: 2,
    label: 'Alimentation',
    icone: '04-produits-services/alimentation',
    question: 'Quels ingrédients authentiques sélectionnez-vous pour nourrir le corps et l’âme ?',
    tagline: 'Mets traditionnels, épices d’exception et alimentation saine'
  },
  {
    id: 'produits-services/mode',
    dimensionId: 'produits-services',
    slug: 'mode',
    ordre: 3,
    label: 'Mode',
    icone: '04-produits-services/mode',
    question: 'Comment vos vêtements permettent-ils à chacun d’affirmer son identité avec panache ?',
    tagline: 'Textile éthique, coupes contemporaines et tissus emblématiques'
  },
  {
    id: 'produits-services/maison',
    dimensionId: 'produits-services',
    slug: 'maison',
    ordre: 4,
    label: 'Maison',
    icone: '04-produits-services/maison',
    question: 'Comment aménagez-vous les espaces intérieurs pour y instaurer chaleur et sérénité ?',
    tagline: 'Mobilier durable, décoration artisanale et art de vivre'
  },
  {
    id: 'produits-services/bien-etre',
    dimensionId: 'produits-services',
    slug: 'bien-etre',
    ordre: 5,
    label: 'Bien-être',
    icone: '04-produits-services/bien-etre',
    question: 'Quelle routine de ressourcement proposez-vous pour apaiser le rythme effréné moderne ?',
    tagline: 'Massages, phytothérapie et équilibre holistique'
  },
  {
    id: 'produits-services/numerique',
    dimensionId: 'produits-services',
    slug: 'numerique',
    ordre: 6,
    label: 'Numérique',
    icone: '04-produits-services/numerique',
    question: 'Quel outil digital concevez-vous pour simplifier la vie de milliers d’usagers ?',
    tagline: 'Plateformes ergonomiques, applications mobiles et services connectés'
  },
  {
    id: 'produits-services/services-personne',
    dimensionId: 'produits-services',
    slug: 'services-personne',
    ordre: 7,
    label: 'Services à la personne',
    icone: '04-produits-services/services-personne',
    question: 'Quelle attention discrète et dévouée apportez-vous aux familles au quotidien ?',
    tagline: 'Assistance à domicile, garde d’enfants et soutien aux aînés'
  },
  {
    id: 'produits-services/transport-loisirs',
    dimensionId: 'produits-services',
    slug: 'transport-loisirs',
    ordre: 8,
    label: 'Transport et loisirs',
    icone: '04-produits-services/transport-loisirs',
    question: 'Comment facilitez-vous la mobilité et l’évasion responsable des voyageurs ?',
    tagline: 'Mobilité douce, logistique et expériences de découverte'
  },

  // 05. PROJETS
  {
    id: 'projets/entreprises',
    dimensionId: 'projets',
    slug: 'entreprises',
    ordre: 1,
    label: 'Entreprises',
    icone: '05-projets/entreprises',
    question: 'Quelle valeur ajoutée durable et quel modèle économique bâtissez-vous ?',
    tagline: 'Entrepreneuriat à impact, start-ups et PME créatrices d’emplois'
  },
  {
    id: 'projets/humanitaire',
    dimensionId: 'projets',
    slug: 'humanitaire',
    ordre: 2,
    label: 'Humanitaire',
    icone: '05-projets/humanitaire',
    question: 'Quelle urgence humaine ou quelle fragilité secourez-vous sur le terrain ?',
    tagline: 'Aide d’urgence, soutien aux déplacés et solidarité sans frontières'
  },
  {
    id: 'projets/communautaire',
    dimensionId: 'projets',
    slug: 'communautaire',
    ordre: 3,
    label: 'Communautaire',
    icone: '05-projets/communautaire',
    question: 'Comment rassemblez-vous les habitants autour d’un destin et d’une fierté partagée ?',
    tagline: 'Actions de quartier, comités locaux et mutuelles citoyennes'
  },
  {
    id: 'projets/culture',
    dimensionId: 'projets',
    slug: 'culture',
    ordre: 4,
    label: 'Culture',
    icone: '05-projets/culture',
    question: 'Quel projet artistique ou mémoriel portez-vous pour éclairer les consciences ?',
    tagline: 'Festivals, musées vivants, éditions et scènes théâtrales'
  },
  {
    id: 'projets/innovation',
    dimensionId: 'projets',
    slug: 'innovation',
    ordre: 5,
    label: 'Innovation',
    icone: '05-projets/innovation',
    question: 'Quelle rupture audacieuse préparez-vous pour changer les règles du jeu ?',
    tagline: 'Recherche appliquée, technologies frugales et nouveaux paradigmes'
  },
  {
    id: 'projets/projets-de-vie',
    dimensionId: 'projets',
    slug: 'projets-de-vie',
    ordre: 6,
    label: 'Projets de vie',
    icone: '05-projets/projets-de-vie',
    question: 'Quelle grande décision intime a réorienté le cap de toute votre existence ?',
    tagline: 'Installation à la campagne, retour au pays et reconversions radicales'
  },
  {
    id: 'projets/environnement',
    dimensionId: 'projets',
    slug: 'environnement',
    ordre: 7,
    label: 'Environnement',
    icone: '05-projets/environnement',
    question: 'Quelle action concrète menez-vous pour soigner la terre et protéger la biodiversité ?',
    tagline: 'Reforestation, gestion des déchets et énergies renouvelables'
  },
  {
    id: 'projets/education-sport',
    dimensionId: 'projets',
    slug: 'education-sport',
    ordre: 8,
    label: 'Éducation et sport',
    icone: '05-projets/education-sport',
    question: 'Comment utilisez-vous le sport ou l’école pour propulser la nouvelle génération ?',
    tagline: 'Académies sportives, mentorat de jeunes et bourses d’études'
  },

  // 06. MARQUES
  {
    id: 'marques/familiales',
    dimensionId: 'marques',
    slug: 'familiales',
    ordre: 1,
    label: 'Marques familiales',
    icone: '06-marques/familiales',
    question: 'Comment préservez-vous l’esprit des fondateurs à travers les générations successives ?',
    tagline: 'Dynasties d’artisans, entreprises transmises de père en fille'
  },
  {
    id: 'marques/alimentation-boissons',
    dimensionId: 'marques',
    slug: 'alimentation-boissons',
    ordre: 2,
    label: 'Alimentation et boissons',
    icone: '06-marques/alimentation-boissons',
    question: 'Quelle recette secrète ou quel gage de pureté fait la renommée de votre table ?',
    tagline: 'Boissons emblématiques, confiseries et maisons de tradition culinaire'
  },
  {
    id: 'marques/mode-luxe',
    dimensionId: 'marques',
    slug: 'mode-luxe',
    ordre: 3,
    label: 'Mode et luxe',
    icone: '06-marques/mode-luxe',
    question: 'Comment mariez-vous l’exigence du luxe et le respect des matières nobles ?',
    tagline: 'Haute maroquinerie, joaillerie de prestige et étoffes rares'
  },
  {
    id: 'marques/tech-medias',
    dimensionId: 'marques',
    slug: 'tech-medias',
    ordre: 4,
    label: 'Tech et médias',
    icone: '06-marques/tech-medias',
    question: 'Quelle éthique de l’information ou de la donnée défendez-vous fermement ?',
    tagline: 'Groupes d’information, plateformes de divertissement et marques numériques'
  },
  {
    id: 'marques/banque-assurance',
    dimensionId: 'marques',
    slug: 'banque-assurance',
    ordre: 5,
    label: 'Banque et assurance',
    icone: '06-marques/banque-assurance',
    question: 'Comment bâtissez-vous la confiance financière indispensable aux grands projets ?',
    tagline: 'Institutions mutualistes, microfinance et protection des investissements'
  },
  {
    id: 'marques/industrie',
    dimensionId: 'marques',
    slug: 'industrie',
    ordre: 6,
    label: 'Industrie',
    icone: '06-marques/industrie',
    question: 'Quelle prouesse industrielle locale permet de réduire la dépendance extérieure ?',
    tagline: 'Transformation locale, matériaux de construction et mécanique lourde'
  },
  {
    id: 'marques/sante',
    dimensionId: 'marques',
    slug: 'sante',
    ordre: 7,
    label: 'Santé',
    icone: '06-marques/sante',
    question: 'Quel remède ou équipement de santé a gagné la confiance indéfectible des soignants ?',
    tagline: 'Laboratoires pharmaceutiques, dispositifs médicaux et santé publique'
  },
  {
    id: 'marques/emblematiques',
    dimensionId: 'marques',
    slug: 'emblematiques',
    ordre: 8,
    label: 'Marques emblématiques',
    icone: '06-marques/emblematiques',
    question: 'Quel symbole indélébile votre maison a-t-elle gravé dans l’imaginaire collectif ?',
    tagline: 'Noms légendaires, logos iconiques et rayonnement international'
  },

  // 07. PERSONNALITÉS
  {
    id: 'personnalites/politique',
    dimensionId: 'personnalites',
    slug: 'politique',
    ordre: 1,
    label: 'Politique',
    icone: '07-personnalites/politique',
    question: 'Quelle figure politique a incarné le courage de défendre son peuple au péril de tout ?',
    tagline: 'Grands orateurs, défenseurs des libertés et bâtisseurs de nations'
  },
  {
    id: 'personnalites/musique',
    dimensionId: 'personnalites',
    slug: 'musique',
    ordre: 2,
    label: 'Musique',
    icone: '07-personnalites/musique',
    question: 'Quel artiste musicien a composé la bande-son de vos révoltes et de vos joies ?',
    tagline: 'Légendes du rythme, voix d’or et virtuoses des instruments'
  },
  {
    id: 'personnalites/cinema-spectacle',
    dimensionId: 'personnalites',
    slug: 'cinema-spectacle',
    ordre: 3,
    label: 'Cinéma et spectacle',
    icone: '07-personnalites/cinema-spectacle',
    question: 'Quel comédien ou réalisateur a su révéler la beauté cachée de nos quotidiens ?',
    tagline: 'Acteurs charismatiques, metteurs en scène et maîtres de l’écran'
  },
  {
    id: 'personnalites/sport',
    dimensionId: 'personnalites',
    slug: 'sport',
    ordre: 4,
    label: 'Sport',
    icone: '07-personnalites/sport',
    question: 'Quel champion incarne à vos yeux la discipline d’acier et l’humilité dans la victoire ?',
    tagline: 'Athlètes olympiques, pugilistes et icônes des stades mondiaux'
  },
  {
    id: 'personnalites/art-litterature',
    dimensionId: 'personnalites',
    slug: 'art-litterature',
    ordre: 5,
    label: 'Art et littérature',
    icone: '07-personnalites/art-litterature',
    question: 'Quel écrivain ou peintre a su poser les mots justes sur les vertiges de notre âme ?',
    tagline: 'Romanciers incontournables, poètes lyriques et plasticiens visionnaires'
  },
  {
    id: 'personnalites/foi',
    dimensionId: 'personnalites',
    slug: 'foi',
    ordre: 6,
    label: 'Foi',
    icone: '07-personnalites/foi',
    question: 'Quel guide spirituel a éclairé votre route par sa parole de vérité et d’amour ?',
    tagline: 'Sages vénérables, guides de confréries et théologiens engagés'
  },
  {
    id: 'personnalites/economie',
    dimensionId: 'personnalites',
    slug: 'economie',
    ordre: 7,
    label: 'Économie',
    icone: '07-personnalites/economie',
    question: 'Quel capitaine d’industrie a prouvé qu’on pouvait créer de la richesse en restant intègre ?',
    tagline: 'Visionnaires économiques, mécènes et pionniers du commerce équitable'
  },
  {
    id: 'personnalites/science',
    dimensionId: 'personnalites',
    slug: 'science',
    ordre: 8,
    label: 'Science',
    icone: '07-personnalites/science',
    question: 'Quel chercheur ou savant a repoussé les frontières de l’inconnu pour l’humanité ?',
    tagline: 'Médecins inventeurs, mathématiciens et astrophysiciens émérites'
  },

  // 08. FIGURES DU QUOTIDIEN
  {
    id: 'figures-du-quotidien/parents',
    dimensionId: 'figures-du-quotidien',
    slug: 'parents',
    ordre: 1,
    label: 'Parents',
    icone: '08-figures-du-quotidien/parents',
    question: 'Quel sacrifice silencieux de vos parents vous a permis d’être debout aujourd’hui ?',
    tagline: 'Mères courage, pères protecteurs et dévouement absolu'
  },
  {
    id: 'figures-du-quotidien/grands-parents',
    dimensionId: 'figures-du-quotidien',
    slug: 'grands-parents',
    ordre: 2,
    label: 'Grands-parents',
    icone: '08-figures-du-quotidien/grands-parents',
    question: 'Quelle histoire contée au crépuscule par vos aïeux reste votre boussole morale ?',
    tagline: 'La douceur des anciens, la mémoire longue et les contes au coin du feu'
  },
  {
    id: 'figures-du-quotidien/enseignants',
    dimensionId: 'figures-du-quotidien',
    slug: 'enseignants',
    ordre: 3,
    label: 'Enseignants',
    icone: '08-figures-du-quotidien/enseignants',
    question: 'Quel maître d’école a cru en votre potentiel alors que personne n’y croyait ?',
    tagline: 'Les instituteurs dévoués, la craie blanche et les déclics décisifs'
  },
  {
    id: 'figures-du-quotidien/mentors',
    dimensionId: 'figures-du-quotidien',
    slug: 'mentors',
    ordre: 4,
    label: 'Mentors',
    icone: '08-figures-du-quotidien/mentors',
    question: 'Quel conseil tranchant d’un aîné vous a évité de commettre une erreur fatale ?',
    tagline: 'Les guides bienveillants, l’exigence fraternelle et l’accompagnement'
  },
  {
    id: 'figures-du-quotidien/voisins',
    dimensionId: 'figures-du-quotidien',
    slug: 'voisins',
    ordre: 5,
    label: 'Voisins',
    icone: '08-figures-du-quotidien/voisins',
    question: 'Quelle voisine ou quel voisin de cour commune a été votre providentiel secours ?',
    tagline: 'L’entraide de palier, le plat partagé et la surveillance bienveillante'
  },
  {
    id: 'figures-du-quotidien/amis',
    dimensionId: 'figures-du-quotidien',
    slug: 'amis',
    ordre: 6,
    label: 'Amis',
    icone: '08-figures-du-quotidien/amis',
    question: 'Quelle amitié inaltérable traverse les décennies sans jamais faiblir ?',
    tagline: 'Les confidents de jeunesse, les fous rires et la fidélité sans faille'
  },
  {
    id: 'figures-du-quotidien/collegues',
    dimensionId: 'figures-du-quotidien',
    slug: 'collegues',
    ordre: 7,
    label: 'Collègues',
    icone: '08-figures-du-quotidien/collegues',
    question: 'Avec quel camarade d’atelier ou de bureau avez-vous soulevé des montagnes ?',
    tagline: 'La solidarité au travail, l’humour dans l’urgence et les victoires d’équipe'
  },
  {
    id: 'figures-du-quotidien/inconnus-marquants',
    dimensionId: 'figures-du-quotidien',
    slug: 'inconnus-marquants',
    ordre: 8,
    label: 'Inconnus marquants',
    icone: '08-figures-du-quotidien/inconnus-marquants',
    question: 'Quel étranger croisé dans un train ou au marché a changé votre vision du monde ?',
    tagline: 'Un regard, une parole fortuite sur le chemin, une grâce inattendue'
  },

  // 09. ÉVÉNEMENTS
  {
    id: 'evenements/mariages',
    dimensionId: 'evenements',
    slug: 'mariages',
    ordre: 1,
    label: 'Mariages',
    icone: '09-evenements/mariages',
    question: 'Quel serment prononcé le jour de vos noces continue de guider vos pas ?',
    tagline: 'L’union sacrée, l’alliance des familles et la fête inoubliable'
  },
  {
    id: 'evenements/naissances',
    dimensionId: 'evenements',
    slug: 'naissances',
    ordre: 2,
    label: 'Naissances',
    icone: '09-evenements/naissances',
    question: 'Quel vertige avez-vous ressenti en posant pour la première fois les yeux sur votre enfant ?',
    tagline: 'Le premier souffle, la promesse de protection et le renouveau de la lignée'
  },
  {
    id: 'evenements/deuils',
    dimensionId: 'evenements',
    slug: 'deuils',
    ordre: 3,
    label: 'Deuils',
    icone: '09-evenements/deuils',
    question: 'Comment avez-vous appris à faire vivre en vous la mémoire de l’être disparu ?',
    tagline: 'Le déchirement du départ, la présence invisible et la paix retrouvée'
  },
  {
    id: 'evenements/voyages',
    dimensionId: 'evenements',
    slug: 'voyages',
    ordre: 4,
    label: 'Voyages',
    icone: '09-evenements/voyages',
    question: 'Quel grand périple a bouleversé votre compréhension des autres civilisations ?',
    tagline: 'Le départ vers l’inconnu, la découverte de l’altérité et l’émerveillement'
  },
  {
    id: 'evenements/fetes',
    dimensionId: 'evenements',
    slug: 'fetes',
    ordre: 5,
    label: 'Fêtes',
    icone: '09-evenements/fetes',
    question: 'Quelle célébration collective reste gravée comme le sommet de la joie partagée ?',
    tagline: 'Les carnavals, les réveillons mémorables et les chants d’allégresse'
  },
  {
    id: 'evenements/catastrophes',
    dimensionId: 'evenements',
    slug: 'catastrophes',
    ordre: 6,
    label: 'Catastrophes',
    icone: '09-evenements/catastrophes',
    question: 'Comment la communauté a-t-elle fait corps face à l’inondation ou au drame ?',
    tagline: 'Les tempêtes soudaines, les crises majeures et la solidarité héroïque'
  },
  {
    id: 'evenements/moments-historiques',
    dimensionId: 'evenements',
    slug: 'moments-historiques',
    ordre: 7,
    label: 'Moments historiques',
    icone: '09-evenements/moments-historiques',
    question: 'Où étiez-vous lors de cette date charnière qui a fait basculer le pays ?',
    tagline: 'Les proclamations d’indépendance, les chutes de murs et les grandes victoires'
  },
  {
    id: 'evenements/premieres-fois',
    dimensionId: 'evenements',
    slug: 'premieres-fois',
    ordre: 8,
    label: 'Premières fois',
    icone: '09-evenements/premieres-fois',
    question: 'Quel battement de cœur gardez-vous de votre première audace décisive ?',
    tagline: 'Le premier voyage seul, le premier diplôme, la première scène'
  },

  // 10. COMMUNAUTÉS
  {
    id: 'communautes/familles',
    dimensionId: 'communautes',
    slug: 'familles',
    ordre: 1,
    label: 'Familles',
    icone: '10-communautes/familles',
    question: 'Comment votre grande famille élargie maintient-elle son unité malgré la dispersion ?',
    tagline: 'Les clans, les cousins germains et la force du nom'
  },
  {
    id: 'communautes/associations',
    dimensionId: 'communautes',
    slug: 'associations',
    ordre: 2,
    label: 'Associations',
    icone: '10-communautes/associations',
    question: 'Quelle cause noble mobilise le dévouement bénévole de votre association ?',
    tagline: 'L’engagement désintéressé, les cotisations solidaires et les projets collectifs'
  },
  {
    id: 'communautes/lieux-de-culte',
    dimensionId: 'communautes',
    slug: 'lieux-de-culte',
    ordre: 3,
    label: 'Lieux de culte',
    icone: '10-communautes/lieux-de-culte',
    question: 'Comment votre communauté spirituelle prend-elle soin des plus démunis du quartier ?',
    tagline: 'Paroisses, mosquées, temples et assemblées de fidèles'
  },
  {
    id: 'communautes/clubs-sportifs',
    dimensionId: 'communautes',
    slug: 'clubs-sportifs',
    ordre: 4,
    label: 'Clubs sportifs',
    icone: '10-communautes/clubs-sportifs',
    question: 'Quel esprit d’équipe et quel sens du respect forgez-vous sur les terrains d’entraînement ?',
    tagline: 'Les clubs de foot, de basket, de boxe et la passion des couleurs'
  },
  {
    id: 'communautes/quartiers',
    dimensionId: 'communautes',
    slug: 'quartiers',
    ordre: 5,
    label: 'Quartiers',
    icone: '10-communautes/quartiers',
    question: 'Qu’est-ce qui rend votre quartier unique et irremplaçable à vos yeux ?',
    tagline: 'La chaleur des rues familières, les commerces de proximité et l’identité locale'
  },
  {
    id: 'communautes/diasporas',
    dimensionId: 'communautes',
    slug: 'diasporas',
    ordre: 6,
    label: 'Diasporas',
    icone: '10-communautes/diasporas',
    question: 'Comment gardez-vous le fil rouge avec le pays natal tout en bâtissant ici ?',
    tagline: 'Les réseaux d’expatriés, les tontines internationales et la double culture'
  },
  {
    id: 'communautes/groupes-amis',
    dimensionId: 'communautes',
    slug: 'groupes-amis',
    ordre: 7,
    label: 'Groupes d’amis',
    icone: '10-communautes/groupes-amis',
    question: 'Quel pacte tacite scelle la fidélité de votre bande d’amis de toujours ?',
    tagline: 'Les retrouvailles complices, les voyages en tribu et la confiance totale'
  },
  {
    id: 'communautes/communautes-en-ligne',
    dimensionId: 'communautes',
    slug: 'communautes-en-ligne',
    ordre: 8,
    label: 'Communautés en ligne',
    icone: '10-communautes/communautes-en-ligne',
    question: 'Comment les réseaux numériques vous ont-ils permis de trouver vos semblables ?',
    tagline: 'Les cercles de passionnés, les collectifs de créateurs et l’entraide virtuelle'
  },

  // 11. INSTITUTIONS
  {
    id: 'institutions/ecoles',
    dimensionId: 'institutions',
    slug: 'ecoles',
    ordre: 1,
    label: 'Écoles',
    icone: '11-institutions/ecoles',
    question: 'Comment l’école républicaine ou communautaire garantit-elle l’égalité des chances ?',
    tagline: 'Les bancs d’école, l’alphabétisation et l’ouverture sur le monde'
  },
  {
    id: 'institutions/universites',
    dimensionId: 'institutions',
    slug: 'universites',
    ordre: 2,
    label: 'Universités',
    icone: '11-institutions/universites',
    question: 'Quelle recherche fondamentale menez-vous pour éclairer les défis de demain ?',
    tagline: 'Les amphithéâtres, les laboratoires et la rigueur académique'
  },
  {
    id: 'institutions/hopitaux',
    dimensionId: 'institutions',
    slug: 'hopitaux',
    ordre: 3,
    label: 'Hôpitaux',
    icone: '11-institutions/hopitaux',
    question: 'Comment les soignants maintiennent-ils l’humanité au cœur des protocoles d’urgence ?',
    tagline: 'Les maternités, les blocs opératoires et le don de soi'
  },
  {
    id: 'institutions/entreprises',
    dimensionId: 'institutions',
    slug: 'entreprises',
    ordre: 4,
    label: 'Entreprises',
    icone: '11-institutions/entreprises',
    question: 'Comment votre institution concilie-t-elle responsabilité sociale et performance ?',
    tagline: 'La gouvernance, la culture d’entreprise et la création de valeur partagée'
  },
  {
    id: 'institutions/administrations',
    dimensionId: 'institutions',
    slug: 'administrations',
    ordre: 5,
    label: 'Administrations',
    icone: '11-institutions/administrations',
    question: 'Comment le service public se modernise-t-il pour rester au plus près des citoyens ?',
    tagline: 'L’état civil, les démarches simplifiées et la continuité du service républicain'
  },
  {
    id: 'institutions/armee-police',
    dimensionId: 'institutions',
    slug: 'armee-police',
    ordre: 6,
    label: 'Armée et police',
    icone: '11-institutions/armee-police',
    question: 'Quelle est la vocation profonde de protéger la paix civile et l’intégrité du territoire ?',
    tagline: 'Le devoir, la protection des populations et l’honneur sous le drapeau'
  },
  {
    id: 'institutions/justice',
    dimensionId: 'institutions',
    slug: 'justice',
    ordre: 7,
    label: 'Justice',
    icone: '11-institutions/justice',
    question: 'Comment le tribunal arbitre-t-il les conflits pour rétablir la concorde ?',
    tagline: 'La balance équitable, le respect du droit et la réconciliation'
  },
  {
    id: 'institutions/medias',
    dimensionId: 'institutions',
    slug: 'medias',
    ordre: 8,
    label: 'Médias',
    icone: '11-institutions/medias',
    question: 'Comment garantissez-vous l’indépendance et la vérification des faits ?',
    tagline: 'La liberté de la presse, le décryptage et la voix des sans-voix'
  },

  // 12. OBJETS
  {
    id: 'objets/souvenirs-famille',
    dimensionId: 'objets',
    slug: 'souvenirs-famille',
    ordre: 1,
    label: 'Souvenirs de famille',
    icone: '12-objets/souvenirs-famille',
    question: 'Quel objet modeste gardez-vous précieusement en hommage à un être cher ?',
    tagline: 'Les reliques intimes, les coffrets anciens et les trésors d’armoire'
  },
  {
    id: 'objets/bijoux',
    dimensionId: 'objets',
    slug: 'bijoux',
    ordre: 2,
    label: 'Bijoux',
    icone: '12-objets/bijoux',
    question: 'Quelle bague ou quelle parure en or porte l’histoire scellée de votre lignée ?',
    tagline: 'L’or martelé, l’argent massif et les symboles ancestraux portés au cou'
  },
  {
    id: 'objets/vetements',
    dimensionId: 'objets',
    slug: 'vetements',
    ordre: 3,
    label: 'Vêtements',
    icone: '12-objets/vetements',
    question: 'Quel habit de cérémonie revêt pour vous une dimension quasi sacrée ?',
    tagline: 'Le pagne tissé de fête, la robe de grand jour et le drapé traditionnel'
  },
  {
    id: 'objets/outils',
    dimensionId: 'objets',
    slug: 'outils',
    ordre: 4,
    label: 'Outils',
    icone: '12-objets/outils',
    question: 'Quel instrument de travail a poli vos mains et forgé votre indépendance ?',
    tagline: 'Le rabot de menuisier, la houe du cultivateur et la plume du scribe'
  },
  {
    id: 'objets/livres',
    dimensionId: 'objets',
    slug: 'livres',
    ordre: 5,
    label: 'Livres',
    icone: '12-objets/livres',
    question: 'Quel ouvrage corné a bouleversé votre pensée et ouvert votre destin ?',
    tagline: 'Les reliures précieuses, les dictionnaires usés et les recueils de poésie'
  },
  {
    id: 'objets/photos-lettres',
    dimensionId: 'objets',
    slug: 'photos-lettres',
    ordre: 6,
    label: 'Photos et lettres',
    icone: '12-objets/photos-lettres',
    question: 'Quelle lettre manuscrite jaunie vous tire des larmes chaque fois que vous la relisez ?',
    tagline: 'Les clichés sépia, l’encre des correspondances et les missives de guerre'
  },
  {
    id: 'objets/vehicules',
    dimensionId: 'objets',
    slug: 'vehicules',
    ordre: 7,
    label: 'Véhicules',
    icone: '12-objets/vehicules',
    question: 'Quel vélo fidèle ou vieille auto a accompagné vos premières grandes escapades ?',
    tagline: 'Les deux-roues vaillants, les pirogues sur l’eau et les voyages sur la piste'
  },
  {
    id: 'objets/cadeaux',
    dimensionId: 'objets',
    slug: 'cadeaux',
    ordre: 8,
    label: 'Cadeaux',
    icone: '12-objets/cadeaux',
    question: 'Quel présent inattendu a témoigné de l’amour le plus pur à votre égard ?',
    tagline: 'Les marques d’affection, les surprises d’anniversaire et les offrandes'
  },

  // 13. SAVOIR-FAIRE
  {
    id: 'savoir-faire/recettes',
    dimensionId: 'savoir-faire',
    slug: 'recettes',
    ordre: 1,
    label: 'Recettes',
    icone: '13-savoir-faire/recettes',
    question: 'Quel plat secret transmis par vos aïeux réunit toute la maisonnée ?',
    tagline: 'Le mijoté de fête, les dosages à l’œil et la mémoire des papilles'
  },
  {
    id: 'savoir-faire/gestes-artisan',
    dimensionId: 'savoir-faire',
    slug: 'gestes-artisan',
    ordre: 2,
    label: 'Gestes d’artisan',
    icone: '13-savoir-faire/gestes-artisan',
    question: 'Quel mouvement précis de vos doigts a nécessité des années d’apprentissage ?',
    tagline: 'Le tour de potier, la ciselure du cuivre et le filage du coton'
  },
  {
    id: 'savoir-faire/remedes-traditionnels',
    dimensionId: 'savoir-faire',
    slug: 'remedes-traditionnels',
    ordre: 3,
    label: 'Remèdes traditionnels',
    icone: '13-savoir-faire/remedes-traditionnels',
    question: 'Quelle infusion de plantes ou quel cataplasme ancien soulage les maux de l’hiver ?',
    tagline: 'Les racines souveraines, la tisane bienfaitrice et l’herboristerie familiale'
  },
  {
    id: 'savoir-faire/musique-danse',
    dimensionId: 'savoir-faire',
    slug: 'musique-danse',
    ordre: 4,
    label: 'Musique et danse',
    icone: '13-savoir-faire/musique-danse',
    question: 'Quel pas de danse ou quel couplet traditionnel libère la joie de votre communauté ?',
    tagline: 'La cadence du pas, les mélodies polyphoniques et la grâce corporelle'
  },
  {
    id: 'savoir-faire/rituels',
    dimensionId: 'savoir-faire',
    slug: 'rituels',
    ordre: 5,
    label: 'Rituels',
    icone: '13-savoir-faire/rituels',
    question: 'Quel rite de passage ou cérémonie sacrée structure les grandes étapes de votre communauté ?',
    tagline: 'Les cérémonies initiatiques, les bénédictions et les hommages aux ancêtres'
  },
  {
    id: 'savoir-faire/techniques-agricoles',
    dimensionId: 'savoir-faire',
    slug: 'techniques-agricoles',
    ordre: 6,
    label: 'Techniques agricoles',
    icone: '13-savoir-faire/techniques-agricoles',
    question: 'Comment déterminez-vous le jour exact des semailles en observant la terre et le ciel ?',
    tagline: 'Le calendrier lunaire, le séchage du grain et la protection des sols'
  },
  {
    id: 'savoir-faire/langues-dialectes',
    dimensionId: 'savoir-faire',
    slug: 'langues-dialectes',
    ordre: 7,
    label: 'Langues et dialectes',
    icone: '13-savoir-faire/langues-dialectes',
    question: 'Comment préservez-vous votre langue maternelle pour qu’elle ne s’éteigne jamais ?',
    tagline: 'Les intonations du terroir, les nuances intraduisibles et la fierté vocale'
  },
  {
    id: 'savoir-faire/contes-recits',
    dimensionId: 'savoir-faire',
    slug: 'contes-recits',
    ordre: 8,
    label: 'Contes et récits',
    icone: '13-savoir-faire/contes-recits',
    question: 'Quel conte ou quelle légende des anciens résonne encore avec force aujourd’hui ?',
    tagline: 'La parole imagée des anciens, les fables animales et les récits fondateurs'
  },

  // 14. PASSIONS
  {
    id: 'passions/sport',
    dimensionId: 'passions',
    slug: 'sport',
    ordre: 1,
    label: 'Sport',
    icone: '14-passions/sport',
    question: 'Quel entraînement exigeant vous permet de repousser sans cesse vos limites physiques ?',
    tagline: 'L’endurance, le dépassement de soi et l’amour de l’effort pur'
  },
  {
    id: 'passions/musique',
    dimensionId: 'passions',
    slug: 'musique',
    ordre: 2,
    label: 'Musique',
    icone: '14-passions/musique',
    question: 'Comment la pratique de votre instrument exprime-t-elle ce que les mots ne peuvent dire ?',
    tagline: 'L’improvisation, les harmonies nocturnes et la vibration des cordes'
  },
  {
    id: 'passions/lecture',
    dimensionId: 'passions',
    slug: 'lecture',
    ordre: 3,
    label: 'Lecture',
    icone: '14-passions/lecture',
    question: 'Dans quel univers imaginaire ou philosophique aimez-vous vous réfugier des heures durant ?',
    tagline: 'Le voyage immobile, les nuits de lecture blanche et la soif d’apprendre'
  },
  {
    id: 'passions/cuisine',
    dimensionId: 'passions',
    slug: 'cuisine',
    ordre: 4,
    label: 'Cuisine',
    icone: '14-passions/cuisine',
    question: 'Quel plaisir gourmand prenez-vous à régaler vos convives autour d’une table généreuse ?',
    tagline: 'L’expérimentation des saveurs, le dressage raffiné et l’amour du partage'
  },
  {
    id: 'passions/voyage',
    dimensionId: 'passions',
    slug: 'voyage',
    ordre: 5,
    label: 'Voyage',
    icone: '14-passions/voyage',
    question: 'Quelle soif de découverte vous pousse à sac au dos vers les terres inconnues ?',
    tagline: 'Les bivouacs sous les étoiles, les routes oubliées et les rencontres du hasard'
  },
  {
    id: 'passions/jeux',
    dimensionId: 'passions',
    slug: 'jeux',
    ordre: 6,
    label: 'Jeux',
    icone: '14-passions/jeux',
    question: 'Quelle stratégie déployez-vous pour disputer des parties épiques entre initiés ?',
    tagline: 'Les échecs, les jeux traditionnels, les jeux de rôle et la vivacité d’esprit'
  },
  {
    id: 'passions/collections',
    dimensionId: 'passions',
    slug: 'collections',
    ordre: 7,
    label: 'Collections',
    icone: '14-passions/collections',
    question: 'Quelle pièce rare est la fierté absolue de votre quête de collectionneur ?',
    tagline: 'Les vinyles introuvables, les timbres anciens, les monnaies et les affiches d’époque'
  },
  {
    id: 'passions/animaux',
    dimensionId: 'passions',
    slug: 'animaux',
    ordre: 8,
    label: 'Animaux',
    icone: '14-passions/animaux',
    question: 'Quelle complicité silencieuse et touchante lie votre vie à celle de vos compagnons à quatre pattes ?',
    tagline: 'Le respect du monde animal, l’élevage attentionné et la fidélité sans mots'
  },

  // 15. MOMENTS DE VIE
  {
    id: 'moments-de-vie/enfance',
    dimensionId: 'moments-de-vie',
    slug: 'enfance',
    ordre: 1,
    label: 'Enfance',
    icone: '15-moments-de-vie/enfance',
    question: 'Quel souvenir doré de jeu dans la cour reste le phare d’innocence de votre vie ?',
    tagline: 'Les genoux écorchés, les rires insouciants et l’imagination sans borne'
  },
  {
    id: 'moments-de-vie/adolescence',
    dimensionId: 'moments-de-vie',
    slug: 'adolescence',
    ordre: 2,
    label: 'Adolescence',
    icone: '15-moments-de-vie/adolescence',
    question: 'Quelle rébellion salutaire vous a permis de trouver votre propre voix ?',
    tagline: 'Les passions enflammées, les doutes profonds et la quête d’identité'
  },
  {
    id: 'moments-de-vie/jeunesse',
    dimensionId: 'moments-de-vie',
    slug: 'jeunesse',
    ordre: 3,
    label: 'Jeunesse',
    icone: '15-moments-de-vie/jeunesse',
    question: 'Avec quelle foi inébranlable en l’avenir avez-vous conquis votre première indépendance ?',
    tagline: 'Les idéaux flamboyants, le premier toit et les grandes découvertes'
  },
  {
    id: 'moments-de-vie/age-adulte',
    dimensionId: 'moments-de-vie',
    slug: 'age-adulte',
    ordre: 4,
    label: 'Âge adulte',
    icone: '15-moments-de-vie/age-adulte',
    question: 'Quelle responsabilité majeure ou prise d’indépendance a scellé votre entrée dans l’âge adulte ?',
    tagline: 'L’autonomie, le sens du devoir et la construction de sa propre voie'
  },
  {
    id: 'moments-de-vie/retraite',
    dimensionId: 'moments-de-vie',
    slug: 'retraite',
    ordre: 5,
    label: 'Retraite',
    icone: '15-moments-de-vie/retraite',
    question: 'Comment avez-vous réinventé votre quotidien et trouvé un nouveau souffle après le travail ?',
    tagline: 'Le temps retrouvé, la sérénité des journées libres et la transmission'
  },
  {
    id: 'moments-de-vie/grands-tournants',
    dimensionId: 'moments-de-vie',
    slug: 'grands-tournants',
    ordre: 6,
    label: 'Grands tournants',
    icone: '15-moments-de-vie/grands-tournants',
    question: 'Quel choix audacieux ou rupture imprévue a fait bifurquer définitivement votre trajectoire ?',
    tagline: 'Les bifurcations du destin, les coups de théâtre et les départs à zéro'
  },
  {
    id: 'moments-de-vie/secrets-gardes',
    dimensionId: 'moments-de-vie',
    slug: 'secrets-gardes',
    ordre: 7,
    label: 'Secrets gardés',
    icone: '15-moments-de-vie/secrets-gardes',
    question: 'Quel mystère ou vérité intime avez-vous longtemps protégé comme un sanctuaire intérieur ?',
    tagline: 'Les confessions du cœur, les silences pudiques et les révélations'
  },
  {
    id: 'moments-de-vie/regrets-fiertes',
    dimensionId: 'moments-de-vie',
    slug: 'regrets-fiertes',
    ordre: 8,
    label: 'Regrets et fiertés',
    icone: '15-moments-de-vie/regrets-fiertes',
    question: 'Avec le recul de l’expérience, quelle est votre plus haute fierté et quel enseignement tirez-vous de vos doutes ?',
    tagline: 'La lucidité sur le chemin parcouru, les victoires silencieuses et la paix avec soi-même'
  },

  // 16. SÉRIES DOCUMENTAIRES FONDATRICES (Sous-catégories = 8 Séries)
  {
    id: 'series/jesus-legba',
    dimensionId: 'series',
    slug: 'jesus-legba',
    ordre: 1,
    label: 'Èṣù < > Jésus',
    icone: '16-series/_dimension',
    question: 'Comment votre foi ou votre rapport au sacré vous aide-t-il à traverser le deuil ou l’épreuve ?',
    tagline: 'Deux traditions spirituelles face aux épreuves de la foi'
  },
  {
    id: 'series/finagnon-qosqorico',
    dimensionId: 'series',
    slug: 'finagnon-qosqorico',
    ordre: 2,
    label: 'Finagnon < > Qosqorico',
    icone: '16-series/_dimension',
    question: 'Quel est votre lien intime avec la terre ou l’eau qui nourrit votre communauté ?',
    tagline: 'Pêcheurs toffinou et paysans quechuas reliés à la terre'
  },
  {
    id: 'series/blacks-one-beyond-eve',
    dimensionId: 'series',
    slug: 'blacks-one-beyond-eve',
    ordre: 3,
    label: 'Blacks One < > Beyond Eve',
    icone: '16-series/_dimension',
    question: 'Quelle voix singulière et quel message d’émancipation souhaitez-vous transmettre à la jeunesse ?',
    tagline: 'L’identité, le hip-hop et la souveraineté intime'
  },
  {
    id: 'series/dixeat-fiat-luxe',
    dimensionId: 'series',
    slug: 'dixeat-fiat-luxe',
    ordre: 4,
    label: 'Dixeat < > Fiat Luxe',
    icone: '16-series/_dimension',
    question: 'Comment la transmission culinaire ou le goût d’exception sublime-t-il votre histoire ?',
    tagline: 'La table, le raffinement et l’amour du goût partagé'
  },
  {
    id: 'series/investors-builders',
    dimensionId: 'series',
    slug: 'investors-builders',
    ordre: 5,
    label: 'Investors < > Builders',
    icone: '16-series/_dimension',
    question: 'Comment bâtir des entreprises qui créent de la dignité et pas seulement du profit ?',
    tagline: 'Bâtisseurs et investisseurs pour l’autonomie économique'
  },
  {
    id: 'series/other-eyes-sixth-sense',
    dimensionId: 'series',
    slug: 'other-eyes-sixth-sense',
    ordre: 6,
    label: 'Other Eyes < > Sixth Sense',
    icone: '16-series/_dimension',
    question: 'Comment un sens différent ou une perception invisible enrichit-il votre vision du monde ?',
    tagline: 'Perception intuitive, arts divinatoires et clairvoyance'
  },
  {
    id: 'series/coaching-unlimited',
    dimensionId: 'series',
    slug: 'coaching-unlimited',
    ordre: 7,
    label: 'Coaching < > Unlimited',
    icone: '16-series/_dimension',
    question: 'Comment transformer l’obstacle en tremplin de dépassement de soi ?',
    tagline: 'Discipline athlétique, mental d’acier et résilience'
  },
  {
    id: 'series/safer-healer',
    dimensionId: 'series',
    slug: 'safer-healer',
    ordre: 8,
    label: 'Safer < > Healer',
    icone: '16-series/_dimension',
    question: 'Comment porter secours tout en préservant sa propre humanité ?',
    tagline: 'Secouristes et guérisseurs face à la fragilité humaine'
  }
];

// Dictionnaire rapide pour lookup par ID composite ('dimensionId/slug')
export const SOUS_CATEGORIES_BY_ID: Record<string, SousCategorie> = Object.fromEntries(
  SOUS_CATEGORIES.map(sc => [sc.id, sc])
);

// Dictionnaire rapide des dimensions
export const DIMENSIONS_BY_ID: Record<string, Dimension> = Object.fromEntries(
  DIMENSIONS.map(d => [d.id, d])
);

// Table de correspondance rétrocompatible pour les anciens alias
export const LEGACY_CATEGORY_MAP: Record<string, string> = {
  countries: 'territoires',
  thematics: 'expertises',
  questions: 'sagesses',
  brands: 'marques',
  projects: 'projets',
  offers: 'produits-services',
  personalities: 'personnalites',
};

export function normalizeDimensionId(idOrAlias: string): string {
  return LEGACY_CATEGORY_MAP[idOrAlias] || idOrAlias;
}

export function getDimension(idOrAlias: string): Dimension | undefined {
  const norm = normalizeDimensionId(idOrAlias);
  return DIMENSIONS_BY_ID[norm];
}

export function getSubcategoriesForDimension(dimIdOrAlias: string): SousCategorie[] {
  const norm = normalizeDimensionId(dimIdOrAlias);
  return SOUS_CATEGORIES.filter(sc => sc.dimensionId === norm);
}

export function getSubcategory(compositeIdOrSlug: string, fallbackDimId?: string): SousCategorie | undefined {
  if (SOUS_CATEGORIES_BY_ID[compositeIdOrSlug]) {
    return SOUS_CATEGORIES_BY_ID[compositeIdOrSlug];
  }
  // If only a slug was provided without dimension prefix
  if (fallbackDimId) {
    const normDim = normalizeDimensionId(fallbackDimId);
    const candidate = `${normDim}/${compositeIdOrSlug}`;
    if (SOUS_CATEGORIES_BY_ID[candidate]) return SOUS_CATEGORIES_BY_ID[candidate];
  }
  // Search by slug alone across all
  return SOUS_CATEGORIES.find(sc => sc.slug === compositeIdOrSlug || sc.id.endsWith(`/${compositeIdOrSlug}`));
}
