export interface Dimension {
  id: string; // 'series', 'sagesses', etc.
  ordre: number; // 1 à 8
  label: string;
  shortLabel: string;
  folder: string; // '16-series', '01-sagesses', etc.
  icone: string; // '16-series/_dimension', etc.
  tagline: string;
  description: string;
  badge: string;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
  coverImage: string;
}

export interface SousCategorie {
  id: string; // composite 'dimension/slug', ex: 'sagesses/epreuves'
  dimensionId: string; // 'series', 'sagesses', etc.
  slug: string; // 'epreuves', etc.
  ordre: number; // 1 à 8
  label: string;
  icone: string; // '01-sagesses/epreuves'
  question?: string;
  tagline?: string;
  description?: string;
  badge?: string;
  photoUrl?: string;
  accentColor?: string;
  glowColor?: string;
  bgGradient?: string;
}

// =========================================================================
// SOURCE UNIQUE DE VÉRITÉ : LES 8 GRANDES PORTES OFFICIELLES YONYWOOD
// 1. Séries
// 2. Sagesses
// 3. Territoires
// 4. Expertises
// 5. Produits et services
// 6. Projets
// 7. Marques
// 8. Personnalités
// =========================================================================
export const DIMENSIONS: Dimension[] = [
  {
    id: 'series',
    ordre: 1,
    folder: '16-series',
    label: 'Séries',
    shortLabel: 'Séries',
    icone: '16-series/_dimension',
    tagline: '8 séries documentaires fondatrices et leurs pionniers',
    description: 'Explorez les séries documentaires fondatrices et leurs protagonistes en miroir. Remontez le fil des transmissions de génération en génération.',
    badge: '8 séries fondatrices',
    accentColor: '#C89B3C',
    glowColor: 'rgba(200, 155, 60, 0.65)',
    bgGradient: 'from-[#D97706] via-[#92400E] to-[#451A03]',
    coverImage: '/assets/doors/door-series.jpg'
  },
  {
    id: 'sagesses',
    ordre: 2,
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
    ordre: 3,
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
    ordre: 4,
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
    ordre: 5,
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
    ordre: 6,
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
    ordre: 7,
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
    ordre: 8,
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
  }
];

// =========================================================================
// SOURCE UNIQUE DE VÉRITÉ : LES 8 SOUS-CATÉGORIES DE CHAQUE PORTE
// Chaque catégorie dispose d'un visuel vibrant, d'un registre de couleurs
// distinctif et d'une question d'amorce puissante.
// =========================================================================
export const SOUS_CATEGORIES: SousCategorie[] = [
  // -----------------------------------------------------------------------
  // 01. SÉRIES (LES 8 SÉRIES FONDATRICES)
  // -----------------------------------------------------------------------
  {
    id: 'series/jesus-legba',
    dimensionId: 'series',
    slug: 'jesus-legba',
    ordre: 1,
    label: 'Èṣù < > Jésus',
    icone: '16-series/jesus-legba',
    question: 'Comment votre foi ou votre rapport au sacré vous aide-t-il à traverser le deuil ou l’épreuve ?',
    tagline: 'Deux traditions spirituelles face aux épreuves de la foi',
    description: 'Mise en miroir des spiritualités chrétienne et vodun face aux tourments du destin. Deux protagonistes explorent la transcendance et la paix.',
    badge: 'Série spirituelle',
    photoUrl: '/assets/posters/Esu < > Jesus.png',
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.6)',
    bgGradient: 'from-amber-600 via-orange-700 to-stone-900'
  },
  {
    id: 'series/finagnon-qosqorico',
    dimensionId: 'series',
    slug: 'finagnon-qosqorico',
    ordre: 2,
    label: 'Finagnon < > Qosqorico',
    icone: '16-series/finagnon-qosqorico',
    question: 'Quel est votre lien intime avec la terre ou l’eau qui nourrit votre communauté ?',
    tagline: 'Pêcheurs toffinou et paysans quechuas reliés à la terre',
    description: 'Des cités lacustres de Ganvié aux terrasses sacrées des Andes péruviennes. Le dialogue de deux gardiens des mémoires vivantes.',
    badge: 'Série terroirs & eau',
    photoUrl: '/assets/posters/Finagnon < > Qosqorico.png',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    bgGradient: 'from-emerald-600 via-teal-700 to-stone-900'
  },
  {
    id: 'series/blacks-one-beyond-eve',
    dimensionId: 'series',
    slug: 'blacks-one-beyond-eve',
    ordre: 3,
    label: 'Blacks One < > Beyond Eve',
    icone: '16-series/blacks-one-beyond-eve',
    question: 'Quelle voix singulière et quel message d’émancipation souhaitez-vous transmettre à la jeunesse ?',
    tagline: 'L’identité, le hip-hop et la souveraineté intime',
    description: 'Entre banlieues parisiennes et scènes de Cotonou, deux collectifs transforment les blessures en poésie et le hip-hop en dignité.',
    badge: 'Série culture urbaine',
    photoUrl: '/assets/posters/Blacks One < > Beyond Eve.png',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.6)',
    bgGradient: 'from-pink-600 via-rose-700 to-stone-900'
  },
  {
    id: 'series/dixeat-fiat-luxe',
    dimensionId: 'series',
    slug: 'dixeat-fiat-luxe',
    ordre: 4,
    label: 'E Vivi < > Fiat Luxe',
    icone: '16-series/dixeat-fiat-luxe',
    question: 'Comment la transmission culinaire ou le geste d’exception sublime-t-il votre histoire ?',
    tagline: 'Artisans du goût et haute scénographie d’exception',
    description: 'L’artisanat d’art et la haute gastronomie vus de l’intérieur : la rencontre de deux orfèvres du détail et de l’hospitalité.',
    badge: 'Série goût & luxe',
    photoUrl: '/assets/posters/E Vivi < > Fiat Luxe.png',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    bgGradient: 'from-amber-500 via-yellow-700 to-stone-900'
  },
  {
    id: 'series/investors-builders',
    dimensionId: 'series',
    slug: 'investors-builders',
    ordre: 5,
    label: 'Investors < > Builders',
    icone: '16-series/investors-builders',
    question: 'Comment bâtir des entreprises qui créent de la dignité et pas seulement du profit ?',
    tagline: 'Bâtisseurs et investisseurs pour l’autonomie économique',
    description: 'La confrontation constructive entre capital visionnaire et bâtisseurs de terrain pour un impact écologique et souverain.',
    badge: 'Série entrepreneuriat',
    photoUrl: '/assets/posters/Investors < > Builders.png',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.6)',
    bgGradient: 'from-blue-600 via-indigo-700 to-stone-900'
  },
  {
    id: 'series/other-eyes-sixth-sense',
    dimensionId: 'series',
    slug: 'other-eyes-sixth-sense',
    ordre: 6,
    label: 'Other eyes < > Sixth sense',
    icone: '16-series/other-eyes-sixth-sense',
    question: 'Comment un sens différent ou une perception invisible enrichit-il votre vision du monde ?',
    tagline: 'Perception intuitive, arts divinatoires et clairvoyance',
    description: 'Le dialogue sensible entre non-voyants d’exception et médiums : écouter l’invisible et les mémoires subtiles des lieux.',
    badge: 'Série intuition & sens',
    photoUrl: '/assets/posters/Other eyes < > Sixth sense.png',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.6)',
    bgGradient: 'from-purple-600 via-indigo-800 to-stone-900'
  },
  {
    id: 'series/coaching-unlimited',
    dimensionId: 'series',
    slug: 'coaching-unlimited',
    ordre: 7,
    label: 'Coaching < > Unlimited',
    icone: '16-series/coaching-unlimited',
    question: 'Comment transformer l’obstacle en tremplin de dépassement de soi ?',
    tagline: 'L’exigence du mentor et l’envol de l’athlète',
    description: 'Du bureau de coaching où se forge le mental à la piste d’athlétisme où se brisent les limites : dépasser l’impossible.',
    badge: 'Série dépassement',
    photoUrl: '/assets/posters/Coaching < > Unlimited.png',
    accentColor: '#EA580C',
    glowColor: 'rgba(234, 88, 12, 0.6)',
    bgGradient: 'from-orange-600 via-red-700 to-stone-900'
  },
  {
    id: 'series/safer-healer',
    dimensionId: 'series',
    slug: 'safer-healer',
    ordre: 8,
    label: 'Safer < > Healer',
    icone: '16-series/safer-healer',
    question: 'Quel sacrifice personnel avez-vous consenti pour continuer à veiller sur des inconnus ?',
    tagline: 'Bravoure des sauveteurs et dévouement des soignants',
    description: 'Entre le courage intrépide face aux flammes et la précision méthodique en salle d’opération : protéger la vie humaine.',
    badge: 'Série secours & soin',
    photoUrl: '/assets/posters/Safer < > Healer.png',
    accentColor: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.6)',
    bgGradient: 'from-red-600 via-rose-700 to-stone-900'
  },

  // -----------------------------------------------------------------------
  // 02. SAGESSES (8 SOUS-CATÉGORIES)
  // -----------------------------------------------------------------------
  {
    id: 'sagesses/epreuves',
    dimensionId: 'sagesses',
    slug: 'epreuves',
    ordre: 1,
    label: 'Épreuves',
    icone: '01-sagesses/epreuves',
    question: 'Quelle épreuve majeure a brisé vos certitudes pour reconstruire votre force ?',
    tagline: 'La traversée de l’adversité et la résilience intime',
    badge: 'Résilience',
    photoUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    bgGradient: 'from-amber-500 via-orange-600 to-stone-950'
  },
  {
    id: 'sagesses/amour-couple',
    dimensionId: 'sagesses',
    slug: 'amour-couple',
    ordre: 2,
    label: 'Amour et couple',
    icone: '01-sagesses/amour-couple',
    question: 'Comment cultivez-vous l’harmonie et la durée dans l’amour face aux tempêtes ?',
    tagline: 'Le compagnonnage, le pardon et la tendresse partagée',
    badge: 'Harmonie',
    photoUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.6)',
    bgGradient: 'from-pink-500 via-rose-600 to-stone-950'
  },
  {
    id: 'sagesses/famille',
    dimensionId: 'sagesses',
    slug: 'famille',
    ordre: 3,
    label: 'Famille',
    icone: '01-sagesses/famille',
    question: 'Quel est l’héritage invisible que vous choisissez de transmettre à vos enfants ?',
    tagline: 'Les liens du sang, les silences et les fidélités',
    badge: 'Transmission',
    photoUrl: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=800&q=80',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.6)',
    bgGradient: 'from-orange-500 via-amber-700 to-stone-950'
  },
  {
    id: 'sagesses/travail',
    dimensionId: 'sagesses',
    slug: 'travail',
    ordre: 4,
    label: 'Travail',
    icone: '01-sagesses/travail',
    question: 'Comment votre labeur quotidien nourrit-il votre dignité et votre communauté ?',
    tagline: 'Le sens du geste, la patience et l’effort juste',
    badge: 'Vocation',
    photoUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.6)',
    bgGradient: 'from-amber-600 via-yellow-800 to-stone-950'
  },
  {
    id: 'sagesses/argent',
    dimensionId: 'sagesses',
    slug: 'argent',
    ordre: 5,
    label: 'Argent',
    icone: '01-sagesses/argent',
    question: 'Quel est votre rapport intime à la richesse matérielle et au partage ?',
    tagline: 'La circulation des ressources, l’abondance et la mesure',
    badge: 'Équilibre',
    photoUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    bgGradient: 'from-emerald-500 via-teal-700 to-stone-950'
  },
  {
    id: 'sagesses/spiritualite',
    dimensionId: 'sagesses',
    slug: 'spiritualite',
    ordre: 6,
    label: 'Spiritualité',
    icone: '01-sagesses/spiritualite',
    question: 'Face au mystère de la vie, quelle est la source invisible qui apaise votre esprit ?',
    tagline: 'La transcendance, la prière et la paix intérieure',
    badge: 'Transcendance',
    photoUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.6)',
    bgGradient: 'from-purple-500 via-indigo-700 to-stone-950'
  },
  {
    id: 'sagesses/exil',
    dimensionId: 'sagesses',
    slug: 'exil',
    ordre: 7,
    label: 'Exil',
    icone: '01-sagesses/exil',
    question: 'Qu’avez-vous laissé derrière vous et que portez-vous toujours en terre étrangère ?',
    tagline: 'L’éloignement, le déracinement et la patrie intérieure',
    badge: 'Mémoire',
    photoUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.6)',
    bgGradient: 'from-cyan-500 via-sky-700 to-stone-950'
  },
  {
    id: 'sagesses/reinvention',
    dimensionId: 'sagesses',
    slug: 'reinvention',
    ordre: 8,
    label: 'Réinvention',
    icone: '01-sagesses/reinvention',
    question: 'À quel moment avez-vous eu le courage de tout recommencer à zéro ?',
    tagline: 'La métamorphose, l’audace et la renaissance personnelle',
    badge: 'Renaissance',
    photoUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80',
    accentColor: '#EAB308',
    glowColor: 'rgba(234, 179, 8, 0.6)',
    bgGradient: 'from-yellow-500 via-amber-600 to-stone-950'
  },

  // -----------------------------------------------------------------------
  // 03. TERRITOIRES (8 SOUS-CATÉGORIES - 'CULTURE' REMPLACE 'TERROIRS')
  // -----------------------------------------------------------------------
  {
    id: 'territoires/villages',
    dimensionId: 'territoires',
    slug: 'villages',
    ordre: 1,
    label: 'Villages',
    icone: '02-territoires/villages',
    question: 'Quelle sagesse ou quelle leçon de terre votre village d’origine vous a-t-il insufflée ?',
    tagline: 'Le calme des terroirs, la terre rouge et la mémoire paysanne',
    badge: 'Terre rouge',
    photoUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
    accentColor: '#EA580C',
    glowColor: 'rgba(234, 88, 12, 0.6)',
    bgGradient: 'from-orange-600 via-amber-800 to-stone-950'
  },
  {
    id: 'territoires/villes',
    dimensionId: 'territoires',
    slug: 'villes',
    ordre: 2,
    label: 'Villes',
    icone: '02-territoires/villes',
    question: 'Comment la ville où vous vivez nourrit-elle votre énergie et vos combats quotidiens ?',
    tagline: 'Le bouillonnement urbain, les carrefours et les horizons d’acier',
    badge: 'Bouillonnement',
    photoUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.6)',
    bgGradient: 'from-indigo-500 via-blue-700 to-stone-950'
  },
  {
    id: 'territoires/pays-origine',
    dimensionId: 'territoires',
    slug: 'pays-origine',
    ordre: 3,
    label: "Pays d'origine",
    icone: '02-territoires/pays-origine',
    question: 'Quel lien indéfectible continue de vous lier à la terre qui vous a vu naître ?',
    tagline: 'Les berceaux, les hymnes secrets et la fierté des origines',
    badge: 'Racines',
    photoUrl: 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?auto=format&fit=crop&w=800&q=80',
    accentColor: '#14B8A6',
    glowColor: 'rgba(20, 184, 166, 0.6)',
    bgGradient: 'from-teal-500 via-emerald-700 to-stone-950'
  },
  {
    id: 'territoires/vie-etranger',
    dimensionId: 'territoires',
    slug: 'vie-etranger',
    ordre: 4,
    label: "Vie à l'étranger",
    icone: '02-territoires/vie-etranger',
    question: 'Comment avez-vous créé votre chez-vous loin de vos repères d’enfance ?',
    tagline: 'Les ponts entre cultures, l’adaptation et le double ancrage',
    badge: 'Diaspora',
    photoUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    accentColor: '#0EA5E9',
    glowColor: 'rgba(14, 165, 233, 0.6)',
    bgGradient: 'from-sky-500 via-cyan-700 to-stone-950'
  },
  {
    id: 'territoires/nature',
    dimensionId: 'territoires',
    slug: 'nature',
    ordre: 5,
    label: 'Nature',
    icone: '02-territoires/nature',
    question: 'Quel paysage sauvage ou quel élément naturel régénère votre âme ?',
    tagline: 'Les fleuves, les forêts, les collines et les vents puissants',
    badge: 'Élévation',
    photoUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    accentColor: '#22C55E',
    glowColor: 'rgba(34, 197, 94, 0.6)',
    bgGradient: 'from-green-500 via-emerald-700 to-stone-950'
  },
  {
    id: 'territoires/patrimoine',
    dimensionId: 'territoires',
    slug: 'patrimoine',
    ordre: 6,
    label: 'Patrimoine',
    icone: '02-territoires/patrimoine',
    question: 'Quel lieu historique ou monument sacré incarne la grandeur de votre peuple ?',
    tagline: 'Les pierres séculaires, les palais royaux et les sanctuaires',
    badge: 'Pierres sacrées',
    photoUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.6)',
    bgGradient: 'from-amber-600 via-yellow-800 to-stone-950'
  },
  {
    id: 'territoires/traditions',
    dimensionId: 'territoires',
    slug: 'traditions',
    ordre: 7,
    label: 'Traditions',
    icone: '02-territoires/traditions',
    question: 'Quelle fête coutumière ou grand rassemblement réveille votre sentiment d’appartenance ?',
    tagline: 'Les cérémonies, les tambours et la communion festive',
    badge: 'Cérémonies',
    photoUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    accentColor: '#E11D48',
    glowColor: 'rgba(225, 29, 72, 0.6)',
    bgGradient: 'from-rose-500 via-red-700 to-stone-950'
  },
  {
    id: 'territoires/culture',
    dimensionId: 'territoires',
    slug: 'culture',
    ordre: 8,
    label: 'Culture',
    icone: '02-territoires/terroirs',
    question: 'Quelle expression culturelle ou artistique incarne le cœur battant de votre région ?',
    tagline: 'L’art vivant, les récits partagés et la vivacité populaire',
    badge: 'Créativité vivante',
    photoUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.6)',
    bgGradient: 'from-purple-500 via-violet-700 to-stone-950'
  },

  // -----------------------------------------------------------------------
  // 04. EXPERTISES (8 SOUS-CATÉGORIES - 'TERROIR' REMPLACE 'SANTÉ')
  // -----------------------------------------------------------------------
  {
    id: 'expertises/artisanat',
    dimensionId: 'expertises',
    slug: 'artisanat',
    ordre: 1,
    label: 'Artisanat',
    icone: '03-expertises/artisanat',
    question: 'Quel geste d’orfèvre ou de façonnage perpétuez-vous pour honorer la matière ?',
    tagline: 'La noblesse du façonnage manuel, la forge, le cuir et le bois',
    badge: 'Main d’or',
    photoUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.6)',
    bgGradient: 'from-amber-600 via-yellow-800 to-stone-950'
  },
  {
    id: 'expertises/droit-finance',
    dimensionId: 'expertises',
    slug: 'droit-finance',
    ordre: 2,
    label: 'Droit et finance',
    icone: '03-expertises/droit-finance',
    question: 'Comment mettez-vous la rigueur juridique ou financière au service de l’équité ?',
    tagline: 'La justice, la protection des actifs et la régulation éthique',
    badge: 'Justice & Clarté',
    photoUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    accentColor: '#0284C7',
    glowColor: 'rgba(2, 132, 199, 0.6)',
    bgGradient: 'from-sky-600 via-blue-800 to-stone-950'
  },
  {
    id: 'expertises/terroir',
    dimensionId: 'expertises',
    slug: 'terroir',
    ordre: 3,
    label: 'Terroir',
    icone: '03-expertises/agriculture',
    question: 'Quel savoir-faire ancestral de la terre et de la transformation sublime vos récoltes ?',
    tagline: 'La valorisation paysanne, les produits d’exception et le respect des sols',
    badge: 'Fruits de la terre',
    photoUrl: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&w=800&q=80',
    accentColor: '#84CC16',
    glowColor: 'rgba(132, 204, 22, 0.6)',
    bgGradient: 'from-lime-500 via-green-700 to-stone-950'
  },
  {
    id: 'expertises/education',
    dimensionId: 'expertises',
    slug: 'education',
    ordre: 4,
    label: 'Éducation',
    icone: '03-expertises/education',
    question: 'Comment éveillez-vous l’esprit critique et l’autonomie de ceux que vous formez ?',
    tagline: 'La pédagogie, la transmission du savoir et les repères durables',
    badge: 'Pédagogie',
    photoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.6)',
    bgGradient: 'from-blue-500 via-indigo-700 to-stone-950'
  },
  {
    id: 'expertises/technologie',
    dimensionId: 'expertises',
    slug: 'technologie',
    ordre: 5,
    label: 'Technologie',
    icone: '03-expertises/technologie',
    question: 'Quelle innovation technique développez-vous pour répondre à un besoin réel ?',
    tagline: 'Le code, les infrastructures numériques et les solutions de pointe',
    badge: 'Innovation',
    photoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.6)',
    bgGradient: 'from-cyan-500 via-teal-700 to-stone-950'
  },
  {
    id: 'expertises/commerce',
    dimensionId: 'expertises',
    slug: 'commerce',
    ordre: 6,
    label: 'Commerce',
    icone: '03-expertises/commerce',
    question: 'Quel est votre secret pour instaurer une confiance durable avec vos clients ?',
    tagline: 'L’art de la négociation, la distribution et le service irréprochable',
    badge: 'Confiance',
    photoUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.6)',
    bgGradient: 'from-orange-500 via-amber-700 to-stone-950'
  },
  {
    id: 'expertises/agriculture',
    dimensionId: 'expertises',
    slug: 'agriculture',
    ordre: 7,
    label: 'Agriculture',
    icone: '03-expertises/agriculture',
    question: 'Comment conjuguez-vous rendement agricole et respect des équilibres vivants ?',
    tagline: 'L’agronomie, l’élevage raisonné et la souveraineté alimentaire',
    badge: 'Souveraineté',
    photoUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    accentColor: '#EAB308',
    glowColor: 'rgba(234, 179, 8, 0.6)',
    bgGradient: 'from-yellow-500 via-lime-700 to-stone-950'
  },
  {
    id: 'expertises/arts-medias',
    dimensionId: 'expertises',
    slug: 'arts-medias',
    ordre: 8,
    label: 'Arts et médias',
    icone: '03-expertises/arts-medias',
    question: 'Quelle vérité singulière cherchez-vous à faire entendre à travers votre création ?',
    tagline: 'L’écriture, la réalisation, le design graphique et le journalisme',
    badge: 'Création',
    photoUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.6)',
    bgGradient: 'from-pink-500 via-purple-700 to-stone-950'
  },

  // -----------------------------------------------------------------------
  // 05. PRODUITS ET SERVICES (8 SOUS-CATÉGORIES)
  // -----------------------------------------------------------------------
  {
    id: 'produits-services/beaute',
    dimensionId: 'produits-services',
    slug: 'beaute',
    ordre: 1,
    label: 'Beauté',
    icone: '04-produits-services/beaute',
    question: 'Quelle vision bienveillante et naturelle de la beauté portez-vous à travers vos soins ?',
    tagline: 'Cosmétique naturelle, coiffure et mise en valeur des peaux',
    badge: 'Éclat naturel',
    photoUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    accentColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.6)',
    bgGradient: 'from-rose-500 via-pink-700 to-stone-950'
  },
  {
    id: 'produits-services/alimentation',
    dimensionId: 'produits-services',
    slug: 'alimentation',
    ordre: 2,
    label: 'Alimentation',
    icone: '04-produits-services/alimentation',
    question: 'Quels ingrédients authentiques sélectionnez-vous pour nourrir le corps et l’âme ?',
    tagline: 'Mets traditionnels, épices d’exception et alimentation saine',
    badge: 'Saveurs pures',
    photoUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.6)',
    bgGradient: 'from-orange-500 via-red-700 to-stone-950'
  },
  {
    id: 'produits-services/mode',
    dimensionId: 'produits-services',
    slug: 'mode',
    icone: '04-produits-services/mode',
    ordre: 3,
    label: 'Mode',
    question: 'Comment vos vêtements permettent-ils à chacun d’affirmer son identité avec panache ?',
    tagline: 'Textile éthique, coupes contemporaines et tissus emblématiques',
    badge: 'Allure & Panache',
    photoUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.6)',
    bgGradient: 'from-purple-500 via-violet-700 to-stone-950'
  },
  {
    id: 'produits-services/maison',
    dimensionId: 'produits-services',
    slug: 'maison',
    ordre: 4,
    label: 'Maison',
    icone: '04-produits-services/maison',
    question: 'Comment aménagez-vous les espaces intérieurs pour y instaurer chaleur et sérénité ?',
    tagline: 'Mobilier durable, décoration artisanale et art de vivre',
    badge: 'Art d’habiter',
    photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.6)',
    bgGradient: 'from-amber-500 via-stone-700 to-stone-950'
  },
  {
    id: 'produits-services/bien-etre',
    dimensionId: 'produits-services',
    slug: 'bien-etre',
    ordre: 5,
    label: 'Bien-être',
    icone: '04-produits-services/bien-etre',
    question: 'Quelle routine de ressourcement proposez-vous pour apaiser le rythme effréné moderne ?',
    tagline: 'Massages, phytothérapie et équilibre holistique',
    badge: 'Ressourcement',
    photoUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    accentColor: '#14B8A6',
    glowColor: 'rgba(20, 184, 166, 0.6)',
    bgGradient: 'from-teal-500 via-emerald-700 to-stone-950'
  },
  {
    id: 'produits-services/numerique',
    dimensionId: 'produits-services',
    slug: 'numerique',
    ordre: 6,
    label: 'Numérique',
    icone: '04-produits-services/numerique',
    question: 'Quel outil digital concevez-vous pour simplifier la vie de milliers d’usagers ?',
    tagline: 'Plateformes ergonomiques, applications mobiles et services connectés',
    badge: 'Utilité digitale',
    photoUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.6)',
    bgGradient: 'from-indigo-500 via-blue-700 to-stone-950'
  },
  {
    id: 'produits-services/services-personne',
    dimensionId: 'produits-services',
    slug: 'services-personne',
    ordre: 7,
    label: 'Services à la personne',
    icone: '04-produits-services/services-personne',
    question: 'Quelle attention discrète et dévouée apportez-vous aux familles au quotidien ?',
    tagline: 'Assistance à domicile, garde d’enfants et soutien aux aînés',
    badge: 'Dévouement',
    photoUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    bgGradient: 'from-emerald-500 via-teal-700 to-stone-950'
  },
  {
    id: 'produits-services/transport-loisirs',
    dimensionId: 'produits-services',
    slug: 'transport-loisirs',
    ordre: 8,
    label: 'Transport et loisirs',
    icone: '04-produits-services/transport-loisirs',
    question: 'Comment facilitez-vous la mobilité et l’évasion responsable des voyageurs ?',
    tagline: 'Mobilité douce, logistique et expériences de découverte',
    badge: 'Évasion douce',
    photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    accentColor: '#0284C7',
    glowColor: 'rgba(2, 132, 199, 0.6)',
    bgGradient: 'from-sky-500 via-blue-700 to-stone-950'
  },

  // -----------------------------------------------------------------------
  // 06. PROJETS (8 SOUS-CATÉGORIES)
  // -----------------------------------------------------------------------
  {
    id: 'projets/entreprises',
    dimensionId: 'projets',
    slug: 'entreprises',
    ordre: 1,
    label: 'Entreprises',
    icone: '05-projets/entreprises',
    question: 'Quelle valeur ajoutée durable et quel modèle économique bâtissez-vous ?',
    tagline: 'Entrepreneuriat à impact, start-ups et PME créatrices d’emplois',
    badge: 'Impact pérenne',
    photoUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.6)',
    bgGradient: 'from-blue-500 via-indigo-700 to-stone-950'
  },
  {
    id: 'projets/humanitaire',
    dimensionId: 'projets',
    slug: 'humanitaire',
    ordre: 2,
    label: 'Humanitaire',
    icone: '05-projets/humanitaire',
    question: 'Quelle urgence humaine ou quelle fragilité secourez-vous sur le terrain ?',
    tagline: 'Aide d’urgence, soutien aux déplacés et solidarité sans frontières',
    badge: 'Urgence humaine',
    photoUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    accentColor: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.6)',
    bgGradient: 'from-red-500 via-rose-700 to-stone-950'
  },
  {
    id: 'projets/communautaire',
    dimensionId: 'projets',
    slug: 'communautaire',
    ordre: 3,
    label: 'Communautaire',
    icone: '05-projets/communautaire',
    question: 'Comment rassemblez-vous les habitants autour d’un destin et d’une fierté partagée ?',
    tagline: 'Actions de quartier, comités locaux et mutuelles citoyennes',
    badge: 'Force collective',
    photoUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    bgGradient: 'from-amber-500 via-orange-700 to-stone-950'
  },
  {
    id: 'projets/culture',
    dimensionId: 'projets',
    slug: 'culture',
    ordre: 4,
    label: 'Culture',
    icone: '05-projets/culture',
    question: 'Quel projet artistique ou mémoriel portez-vous pour éclairer les consciences ?',
    tagline: 'Festivals, musées vivants, éditions et scènes théâtrales',
    badge: 'Éveil artistique',
    photoUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.6)',
    bgGradient: 'from-purple-500 via-violet-700 to-stone-950'
  },
  {
    id: 'projets/innovation',
    dimensionId: 'projets',
    slug: 'innovation',
    ordre: 5,
    label: 'Innovation',
    icone: '05-projets/innovation',
    question: 'Quelle rupture audacieuse préparez-vous pour changer les règles du jeu ?',
    tagline: 'Recherche appliquée, technologies frugales et nouveaux paradigmes',
    badge: 'Audace de rupture',
    photoUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.6)',
    bgGradient: 'from-cyan-500 via-sky-700 to-stone-950'
  },
  {
    id: 'projets/projets-de-vie',
    dimensionId: 'projets',
    slug: 'projets-de-vie',
    ordre: 6,
    label: 'Projets de vie',
    icone: '05-projets/projets-de-vie',
    question: 'Quelle grande décision intime a réorienté le cap de toute votre existence ?',
    tagline: 'Installation à la campagne, retour au pays et reconversions radicales',
    badge: 'Cap nouveau',
    photoUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    bgGradient: 'from-emerald-500 via-teal-700 to-stone-950'
  },
  {
    id: 'projets/environnement',
    dimensionId: 'projets',
    slug: 'environnement',
    ordre: 7,
    label: 'Environnement',
    icone: '05-projets/environnement',
    question: 'Quelle action concrète menez-vous pour soigner la terre et protéger la biodiversité ?',
    tagline: 'Reforestation, gestion des déchets et énergies renouvelables',
    badge: 'Soin du vivant',
    photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    accentColor: '#22C55E',
    glowColor: 'rgba(34, 197, 94, 0.6)',
    bgGradient: 'from-green-500 via-emerald-700 to-stone-950'
  },
  {
    id: 'projets/education-sport',
    dimensionId: 'projets',
    slug: 'education-sport',
    ordre: 8,
    label: 'Éducation et sport',
    icone: '05-projets/education-sport',
    question: 'Comment utilisez-vous le sport ou l’école pour propulser la nouvelle génération ?',
    tagline: 'Académies sportives, mentorat de jeunes et bourses d’études',
    badge: 'Envol des jeunes',
    photoUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    accentColor: '#EA580C',
    glowColor: 'rgba(234, 88, 12, 0.6)',
    bgGradient: 'from-orange-500 via-amber-700 to-stone-950'
  },

  // -----------------------------------------------------------------------
  // 07. MARQUES (8 SOUS-CATÉGORIES - 'LUXE' & 'MODE ET BEAUTÉ')
  // -----------------------------------------------------------------------
  {
    id: 'marques/familiales',
    dimensionId: 'marques',
    slug: 'familiales',
    ordre: 1,
    label: 'Marques familiales',
    icone: '06-marques/familiales',
    question: 'Comment préservez-vous l’esprit des fondateurs à travers les générations successives ?',
    tagline: 'Dynasties d’artisans, entreprises transmises de père en fille',
    badge: 'Lignée de fondateurs',
    photoUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.6)',
    bgGradient: 'from-amber-600 via-yellow-800 to-stone-950'
  },
  {
    id: 'marques/alimentation-boissons',
    dimensionId: 'marques',
    slug: 'alimentation-boissons',
    ordre: 2,
    label: 'Alimentation et boissons',
    icone: '06-marques/alimentation-boissons',
    question: 'Quelle recette secrète ou quel gage de pureté fait la renommée de votre table ?',
    tagline: 'Boissons emblématiques, confiseries et maisons de tradition culinaire',
    badge: 'Grandes tables',
    photoUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.6)',
    bgGradient: 'from-orange-500 via-amber-700 to-stone-950'
  },
  {
    id: 'marques/luxe',
    dimensionId: 'marques',
    slug: 'luxe',
    ordre: 3,
    label: 'Luxe',
    icone: '06-marques/mode-luxe',
    question: 'Comment mariez-vous l’exigence du luxe et le respect des matières d’exception ?',
    tagline: 'Haute maroquinerie, joaillerie de prestige et orfèvrerie rare',
    badge: 'Haute exception',
    photoUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    accentColor: '#C89B3C',
    glowColor: 'rgba(200, 155, 60, 0.6)',
    bgGradient: 'from-amber-500 via-yellow-700 to-stone-950'
  },
  {
    id: 'marques/tech-medias',
    dimensionId: 'marques',
    slug: 'tech-medias',
    ordre: 4,
    label: 'Tech et médias',
    icone: '06-marques/tech-medias',
    question: 'Quelle éthique de l’information ou de la donnée défendez-vous fermement ?',
    tagline: 'Groupes d’information, plateformes de divertissement et marques numériques',
    badge: 'Voix & Écrans',
    photoUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.6)',
    bgGradient: 'from-purple-500 via-indigo-700 to-stone-950'
  },
  {
    id: 'marques/banque-assurance',
    dimensionId: 'marques',
    slug: 'banque-assurance',
    ordre: 5,
    label: 'Banque et assurance',
    icone: '06-marques/banque-assurance',
    question: 'Comment bâtissez-vous la confiance financière indispensable aux grands projets ?',
    tagline: 'Institutions mutualistes, microfinance et protection des investissements',
    badge: 'Solidité & Confiance',
    photoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    accentColor: '#0284C7',
    glowColor: 'rgba(2, 132, 199, 0.6)',
    bgGradient: 'from-sky-500 via-blue-700 to-stone-950'
  },
  {
    id: 'marques/industrie',
    dimensionId: 'marques',
    slug: 'industrie',
    ordre: 6,
    label: 'Industrie',
    icone: '06-marques/industrie',
    question: 'Quelle prouesse industrielle locale permet de réduire la dépendance extérieure ?',
    tagline: 'Transformation locale, matériaux de construction et mécanique lourde',
    badge: 'Puissance locale',
    photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    accentColor: '#64748B',
    glowColor: 'rgba(100, 116, 139, 0.6)',
    bgGradient: 'from-slate-500 via-zinc-700 to-stone-950'
  },
  {
    id: 'marques/sante',
    dimensionId: 'marques',
    slug: 'sante',
    ordre: 7,
    label: 'Santé',
    icone: '06-marques/sante',
    question: 'Quel remède ou équipement de santé a gagné la confiance indéfectible des soignants ?',
    tagline: 'Laboratoires pharmaceutiques, dispositifs médicaux et santé publique',
    badge: 'Confiance médicale',
    photoUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.6)',
    bgGradient: 'from-cyan-500 via-teal-700 to-stone-950'
  },
  {
    id: 'marques/mode-beaute',
    dimensionId: 'marques',
    slug: 'mode-beaute',
    ordre: 8,
    label: 'Mode et beauté',
    icone: '06-marques/emblematiques',
    question: 'Comment faites-vous rayonner l’élégance, la parure et le soin de soi avec singularité ?',
    tagline: 'Maisons de cosmétiques, haute couture et parures intemporelles',
    badge: 'Parure & Éclat',
    photoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.6)',
    bgGradient: 'from-pink-500 via-rose-700 to-stone-950'
  },

  // -----------------------------------------------------------------------
  // 08. PERSONNALITÉS (8 SOUS-CATÉGORIES - 'FIGURES DU QUOTIDIEN' REMPLACE 'ÉCONOMIE')
  // -----------------------------------------------------------------------
  {
    id: 'personnalites/politique',
    dimensionId: 'personnalites',
    slug: 'politique',
    ordre: 1,
    label: 'Politique',
    icone: '07-personnalites/politique',
    question: 'Quelle figure politique a incarné le courage de défendre son peuple au péril de tout ?',
    tagline: 'Grands orateurs, défenseurs des libertés et bâtisseurs de nations',
    badge: 'Courage d’État',
    photoUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    accentColor: '#0284C7',
    glowColor: 'rgba(2, 132, 199, 0.6)',
    bgGradient: 'from-sky-500 via-blue-700 to-stone-950'
  },
  {
    id: 'personnalites/musique',
    dimensionId: 'personnalites',
    slug: 'musique',
    ordre: 2,
    label: 'Musique',
    icone: '07-personnalites/musique',
    question: 'Quel artiste musicien a composé la bande-son de vos révoltes et de vos joies ?',
    tagline: 'Légendes du rythme, voix d’or et virtuoses des instruments',
    badge: 'Voix d’or',
    photoUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.6)',
    bgGradient: 'from-purple-500 via-violet-700 to-stone-950'
  },
  {
    id: 'personnalites/cinema-spectacle',
    dimensionId: 'personnalites',
    slug: 'cinema-spectacle',
    ordre: 3,
    label: 'Cinéma et spectacle',
    icone: '07-personnalites/cinema-spectacle',
    question: 'Quel comédien ou réalisateur a su révéler la beauté cachée de nos quotidiens ?',
    tagline: 'Acteurs charismatiques, metteurs en scène et maîtres de l’écran',
    badge: 'Lumière d’écran',
    photoUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    accentColor: '#E11D48',
    glowColor: 'rgba(225, 29, 72, 0.6)',
    bgGradient: 'from-rose-500 via-red-700 to-stone-950'
  },
  {
    id: 'personnalites/sport',
    dimensionId: 'personnalites',
    slug: 'sport',
    ordre: 4,
    label: 'Sport',
    icone: '07-personnalites/sport',
    question: 'Quel champion incarne à vos yeux la discipline d’acier et l’humilité dans la victoire ?',
    tagline: 'Athlètes olympiques, pugilistes et icônes des stades mondiaux',
    badge: 'Discipline d’acier',
    photoUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    accentColor: '#EA580C',
    glowColor: 'rgba(234, 88, 12, 0.6)',
    bgGradient: 'from-orange-500 via-amber-700 to-stone-950'
  },
  {
    id: 'personnalites/art-litterature',
    dimensionId: 'personnalites',
    slug: 'art-litterature',
    ordre: 5,
    label: 'Art et littérature',
    icone: '07-personnalites/art-litterature',
    question: 'Quel écrivain ou peintre a su poser les mots justes sur les vertiges de notre âme ?',
    tagline: 'Romanciers incontournables, poètes lyriques et plasticiens visionnaires',
    badge: 'Plume & Toile',
    photoUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.6)',
    bgGradient: 'from-amber-600 via-yellow-800 to-stone-950'
  },
  {
    id: 'personnalites/foi',
    dimensionId: 'personnalites',
    slug: 'foi',
    ordre: 6,
    label: 'Foi',
    icone: '07-personnalites/foi',
    question: 'Quel guide spirituel a éclairé votre route par sa parole de vérité et d’amour ?',
    tagline: 'Sages vénérables, guides de confréries et théologiens engagés',
    badge: 'Sagesse vivante',
    photoUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.6)',
    bgGradient: 'from-purple-500 via-indigo-700 to-stone-950'
  },
  {
    id: 'personnalites/figures-du-quotidien',
    dimensionId: 'personnalites',
    slug: 'figures-du-quotidien',
    ordre: 7,
    label: 'Figures du quotidien',
    icone: '08-figures-du-quotidien/_dimension',
    question: 'Quel héros discret, parent ou instituteur de l’ombre a transformé votre vie par son exemple ?',
    tagline: 'Héros ordinaires, repères bienveillants et piliers dévoués de nos vies',
    badge: 'Héros de l’ombre',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    bgGradient: 'from-emerald-500 via-teal-700 to-stone-950'
  },
  {
    id: 'personnalites/science',
    dimensionId: 'personnalites',
    slug: 'science',
    ordre: 8,
    label: 'Science',
    icone: '07-personnalites/science',
    question: 'Quel chercheur ou savant a repoussé les frontières de l’inconnu pour l’humanité ?',
    tagline: 'Médecins inventeurs, mathématiciens et astrophysiciens émérites',
    badge: 'Clarté du savoir',
    photoUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.6)',
    bgGradient: 'from-cyan-500 via-teal-700 to-stone-950'
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
  'figures-du-quotidien': 'personnalites',
  evenements: 'sagesses',
  communautes: 'projets',
  institutions: 'expertises',
  objets: 'marques',
  'savoir-faire': 'expertises',
  passions: 'sagesses',
  'moments-de-vie': 'sagesses'
};

// Correspondances d'anciennes sous-catégories
export const LEGACY_SUBCATEGORY_SLUG_MAP: Record<string, string> = {
  'territoires/terroirs': 'territoires/culture',
  'expertises/sante': 'expertises/terroir',
  'marques/mode-luxe': 'marques/luxe',
  'marques/emblematiques': 'marques/mode-beaute',
  'personnalites/economie': 'personnalites/figures-du-quotidien'
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
  const mapped = LEGACY_SUBCATEGORY_SLUG_MAP[compositeIdOrSlug] || compositeIdOrSlug;
  if (SOUS_CATEGORIES_BY_ID[mapped]) {
    return SOUS_CATEGORIES_BY_ID[mapped];
  }
  // Si un slug seul a été passé sans préfixe
  if (fallbackDimId) {
    const normDim = normalizeDimensionId(fallbackDimId);
    const candidate = `${normDim}/${compositeIdOrSlug}`;
    const mappedCand = LEGACY_SUBCATEGORY_SLUG_MAP[candidate] || candidate;
    if (SOUS_CATEGORIES_BY_ID[mappedCand]) return SOUS_CATEGORIES_BY_ID[mappedCand];
  }
  // Recherche par slug seul
  return SOUS_CATEGORIES.find(sc => sc.slug === compositeIdOrSlug || sc.id.endsWith(`/${compositeIdOrSlug}`));
}
