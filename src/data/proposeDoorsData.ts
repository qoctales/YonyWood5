import React from 'react';
import { 
  Film, 
  Mountain, 
  Atom, 
  GraduationCap, 
  Star, 
  Gem, 
  Sprout, 
  ShoppingBag 
} from 'lucide-react';
import { ExplorerCategoryType } from './explorerTopicsData';

export interface ProposeSubject {
  id: string;
  title: string;
  subtitle: string;
  question?: string;
  synopsis?: string;
  videoUrl: string;
  posterUrl: string;
  actionLabel: string;
}

export interface ProposeDoor {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
  tagline: string;
  videoUrl: string;
  posterUrl: string;
  advantages: string[];
  actionDoorLabel: string;
  subjects: ProposeSubject[];
}

export const PROPOSE_DOORS: ProposeDoor[] = [
  {
    id: 'series',
    label: 'Séries',
    icon: Film,
    tagline: 'Racontez votre histoire face à un alter ego d’un autre continent.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: '/assets/posters/jesus-esu.png',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Dialogue face-à-face avec un alter ego d’un autre continent.',
      'Raconter votre histoire intime face aux grandes épreuves humaines.',
      'Mise en miroir de traditions et de spiritualités d’égal à égal.',
      'Réalisation cinématographique 9:16 soignée par Yonywood.',
      'Diffusion pérenne au cœur des séries fondatrices de la plateforme.'
    ],
    subjects: [
      {
        id: 'jesus-legba',
        title: 'Jésus < > Èṣù',
        subtitle: 'Deux traditions spirituelles. Une même question de foi face aux épreuves.',
        synopsis: 'Mise en miroir des deux spiritualités chrétienne et vodun face aux tourments du destin. Deux protagonistes sur deux continents explorent la transcendance, la mort, le pardon et la rédemption au-delà des dogmes.',
        question: 'Comment votre foi ou votre rapport au sacré vous aide-t-il à traverser le deuil ou l’épreuve ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        posterUrl: '/assets/posters/jesus-esu.png',
        actionLabel: 'Choisir cette série'
      },
      {
        id: 'finagnon-qosqorico',
        title: 'Finagnon < > Qosqorico',
        subtitle: 'Bénin < > Pérou. Pêcheurs toffinou et paysans quechuas reliés à la terre.',
        synopsis: 'Des cités lacustres de Ganvié aux terrasses sacrées des Andes péruviennes. Le dialogue sensible entre deux gardiens de l’eau et de la Pachamama qui protègent la mémoire vitale de leurs communautés.',
        question: 'Quel est votre lien intime avec la terre ou l’eau qui nourrit votre communauté ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        posterUrl: '/assets/posters/finagnon-qosqorico.png',
        actionLabel: 'Choisir cette série'
      },
      {
        id: 'blacks-one-beyond-eve',
        title: 'Blacks One < > Beyond Eve',
        subtitle: 'Deux expériences collectives. L’identité, le hip-hop et la souveraineté intime.',
        synopsis: 'Entre banlieues parisiennes et scènes urbaines de Cotonou, deux collectifs de créateurs transforment les blessures en poésie et le hip-hop en levier de dignité et d’autonomie pour la jeunesse.',
        question: 'Quelle voix singulière et quel message d’émancipation souhaitez-vous transmettre à la jeunesse ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        posterUrl: '/assets/posters/blacks-one-beyond-eve.png',
        actionLabel: 'Choisir cette série'
      },
      {
        id: 'dixeat-fiat-luxe',
        title: 'Dixeat < > Fiat Luxe',
        subtitle: 'Artisans du goût et haute scénographie d’exception au service du détail.',
        synopsis: 'L’artisanat d’art et la haute gastronomie vus de l’intérieur. La rencontre de deux orfèvres du détail qui consacrent leur existence à la patience de la matière et à l’hospitalité sublime.',
        question: 'Quelle est la noblesse et le sens profond caché dans le geste de votre métier ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        posterUrl: '/assets/posters/dixeat-fiat-luxe.png',
        actionLabel: 'Choisir cette série'
      },
      {
        id: 'investors-builders',
        title: 'Investors < > Builders',
        subtitle: 'Ceux qui financent le futur < > ceux qui bâtissent le réel.',
        synopsis: 'La confrontation constructive entre visionnaires du capital et bâtisseurs de terrain. Comment aligner la souveraineté économique, le courage d’entreprendre et l’impact écologique concret.',
        question: 'Comment concilier la vision économique d’avenir et l’impact réel sur le terrain ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        posterUrl: '/investors-builders.png',
        actionLabel: 'Choisir cette série'
      }
    ]
  },
  {
    id: 'territoires',
    label: 'Territoires',
    icon: Mountain,
    tagline: 'Faites rayonner l’âme, les savoirs et la géographie sacrée de votre terre.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Mettre en lumière les sanctuaires et mémoires méconnues de votre pays.',
      'Transmettre l’histoire locale racontée par ses propres enfants.',
      'Créer des ponts vivants avec la diaspora et les voyageurs en quête de sens.',
      'Archiver la beauté de vos paysages en format cinématographique 9:16.',
      'Valoriser l’hospitalité et la sagesse territoriale de votre terroir.'
    ],
    subjects: [
      {
        id: 'benin',
        title: 'Bénin',
        subtitle: 'Berceau du Vodun, royaumes historiques d’Abomey et cité lacustre de Ganvié.',
        question: 'Quelle tradition ou mémoire du Bénin a profondément forgé votre regard sur le monde ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir ce territoire'
      },
      {
        id: 'senegal',
        title: 'Sénégal',
        subtitle: 'Terre de la Teranga, mémoire de Gorée et poésie des nuits de Saint-Louis.',
        question: 'Comment vivez-vous l’esprit de la Teranga et l’hospitalité dans vos actes quotidiens ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir ce territoire'
      },
      {
        id: 'cote-divoire',
        title: 'Côte d’Ivoire',
        subtitle: 'Richesse des lagunes, ferveur des masques sacrés et énergie créative d’Abidjan.',
        question: 'Quel rituel ou lieu emblématique ivoirien incarne le mieux votre sentiment d’appartenance ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir ce territoire'
      },
      {
        id: 'nigeria',
        title: 'Nigéria',
        subtitle: 'Gigantisme culturel, héritage yoruba et effervescence contemporaine.',
        question: 'Quelle énergie créative ou héritage rituel puisez-vous dans la terre nigériane ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir ce territoire'
      },
      {
        id: 'cameroun',
        title: 'Cameroun',
        subtitle: 'Afrique en miniature, hautes terres de l’Ouest et mémoires des chefferies.',
        question: 'Quelle force tirez-vous des chefferies ou des récits des aînés de votre terroir ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir ce territoire'
      }
    ]
  },
  {
    id: 'sagesses',
    label: 'Mémoires',
    icon: Atom,
    tagline: 'Partagez une mémoire vive, un enseignement ancestral ou une parole éclairante.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Préserver les mémoires orales menacées d’oubli face à la modernité.',
      'Offrir une boussole humaine et de transmission aux générations futures.',
      'Mettre en dialogue les cosmogonies ancestrales et les défis d’aujourd’hui.',
      'S’exprimer dans un espace respectueux, propice à l’écoute profonde.',
      'Rejoindre une bibliothèque vivante de mémoires universelles.'
    ],
    subjects: [
      {
        id: 'le-fa',
        title: 'Le Fa & Géomancie',
        subtitle: 'Science oraculaire brito-béninoise, lecture des signes et harmonie cosmique.',
        question: 'Quel enseignement ou signe du Fa vous guide dans les carrefours décisifs de votre existence ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette mémoire'
      },
      {
        id: 'le-pardon',
        title: 'Le Devoir de Réconciliation',
        subtitle: 'Guérir les lignées, dépasser les fractures et retrouver la paix intérieure.',
        question: 'Quel chemin intérieur avez-vous emprunté pour pardonner ou apaiser une blessure ancienne ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette mémoire'
      },
      {
        id: 'pachamama',
        title: 'L’Alliance avec la Terre',
        subtitle: 'Respect sacré de la nature, écoute du vivant et humilité de l’humain.',
        question: 'Comment cultivez-vous une relation de respect sacré avec la nature qui vous entoure ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette mémoire'
      },
      {
        id: 'la-teranga',
        title: 'L’Hospitalité du Cœur',
        subtitle: 'Accueillir l’étranger comme un parent, partager le bol et la bénédiction.',
        question: 'En quoi l’accueil inconditionnel de l’autre change-t-il la vie de votre communauté ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette mémoire'
      },
      {
        id: 'le-silence',
        title: 'L’Écoute et le Silence',
        subtitle: 'La parole mesurée des anciens, la puissance du recueillement intérieur.',
        question: 'Que découvrez-vous en vous-même lorsque vous vous accordez un temps de silence ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette mémoire'
      }
    ]
  },
  {
    id: 'emplois',
    label: 'Emplois',
    icon: GraduationCap,
    tagline: 'Transmettez la passion de votre métier, vos gestes d’artisan et vos opportunités.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Inspirer des vocations authentiques auprès des jeunes générations.',
      'Valoriser la dignité et la technicité des métiers manuels et créatifs.',
      'Faciliter la rencontre entre talents de terrain et mentors d’expérience.',
      'Montrer la réalité d’un métier sans artifice ni filtre trompeur.',
      'Renforcer la transmission intergénérationnelle des savoir-faire d’excellence.'
    ],
    subjects: [
      {
        id: 'cinema',
        title: 'Cinéma & Image',
        subtitle: 'Réalisateurs, cadreurs 9:16, preneurs de son et monteurs du continent.',
        question: 'Quelle histoire humaine essentielle souhaitez-vous capter et révéler par l’image ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette filière'
      },
      {
        id: 'artisanat',
        title: 'Artisanat d’Art',
        subtitle: 'Tisserands traditionnels, potières, sculpteurs sur bois et ferronniers.',
        question: 'Quel geste de la main ou matière noble avez-vous mis des années à apprivoiser ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette filière'
      },
      {
        id: 'agroecologie',
        title: 'Agroécologie & Terroir',
        subtitle: 'Pépiniéristes, maraîchers bio, régénérateurs de sols et transformateurs.',
        question: 'Comment votre travail de la terre nourrit-il à la fois les corps et l’écosystème ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette filière'
      },
      {
        id: 'education',
        title: 'Éducation & Transmission',
        subtitle: 'Enseignants, éducateurs communautaires et bâtisseurs d’écoles vivantes.',
        question: 'Quelle étincelle fondamentale cherchez-vous à allumer chez vos élèves ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette filière'
      },
      {
        id: 'communication',
        title: 'Récits & Médias Numériques',
        subtitle: 'Journalistes indépendants, podcasteurs et conteurs contemporains.',
        question: 'Comment racontez-vous les récits qui méritent d’être entendus avec vérité et éthique ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette filière'
      }
    ]
  },
  {
    id: 'stars',
    label: 'Personnalités',
    icon: Star,
    tagline: 'Célébrez les grandes voix, artistes et figures inspirantes qui ouvrent la voie.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Témoigner de l’impact direct d’une grande figure sur votre parcours personnel.',
      'Célébrer la grandeur de nos icônes à travers le regard de leurs pairs.',
      'Dépasser les clichés pour révéler la vulnérabilité et l’éthique des artistes.',
      'Faire dialoguer créateurs africains et voix de la diaspora mondiale.',
      'Inscrire vos réflexions dans un panthéon vivant de la culture panafricaine.'
    ],
    subjects: [
      {
        id: 'angelique-kidjo',
        title: 'Angélique Kidjo',
        subtitle: 'Voix universelle du Bénin, quintuple lauréate des Grammy Awards et militante.',
        question: 'En quoi la voix, la liberté et les combats d’Angélique Kidjo résonnent-ils avec votre parcours ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette personnalité'
      },
      {
        id: 'fela-kuti',
        title: 'Fela Kuti',
        subtitle: 'Pionnier de l’Afrobeat, insurgé politique et icône immortelle de Lagos.',
        question: 'Comment l’esprit d’insoumission et la musique de Fela inspirent-ils vos actes de création ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette personnalité'
      },
      {
        id: 'miriam-makeba',
        title: 'Miriam Makeba (Mama Africa)',
        subtitle: 'Légende sud-africaine, hymne à la liberté contre l’Apartheid et voix de Pata Pata.',
        question: 'Quel combat pour la dignité et contre l’injustice portez-vous avec force aujourd’hui ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette personnalité'
      },
      {
        id: 'janelle-monae',
        title: 'Janelle Monáe',
        subtitle: 'Créatrice afrofuturiste américaine, compositrice visionnaire et actrice.',
        question: 'Quelle vision afrofuturiste ou émancipation audacieuse nourrit vos projets d’avenir ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette personnalité'
      },
      {
        id: 'dah-zounon',
        title: 'Dah Zounon',
        subtitle: 'Grand dignitaire traditionnel béninois, mémoire des rites et gardien des pactes sacrés.',
        question: 'Quelle sagesse rituelle ou lien avec les ancêtres guide vos décisions les plus importantes ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette personnalité'
      }
    ]
  },
  {
    id: 'marques',
    label: 'Marques',
    icon: Gem,
    tagline: 'Révélez l’authenticité de votre entreprise, son utilité réelle et ses racines.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Éloigner votre communication du bruit publicitaire pour bâtir une confiance intime.',
      'Donner un visage humain et des valeurs tangibles à votre marque.',
      'Prouver votre ancrage territorial et votre engagement envers les communautés.',
      'Valoriser la transparence de vos chaînes d’approvisionnement et ateliers.',
      'Rencontrer des consommateurs éclairés qui recherchent du sens avant le produit.'
    ],
    subjects: [
      {
        id: 'celtis',
        title: 'Celtis Bénin',
        subtitle: 'Opérateur télécom national béninois, symbole de souveraineté numérique.',
        question: 'Comment la souveraineté technologique peut-elle servir directement l’autonomie du peuple ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette marque'
      },
      {
        id: 'mtn',
        title: 'MTN Bénin',
        subtitle: 'Acteur majeur de la connectivité mobile et de l’inclusion digitale en Afrique.',
        question: 'Comment votre projet utilise-t-il la connectivité pour créer du lien humain durable ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette marque'
      },
      {
        id: 'moov-africa',
        title: 'Moov Africa',
        subtitle: 'Réseau panafricain de télécommunications et services financiers de proximité.',
        question: 'Comment les services de proximité transforment-ils le quotidien des familles modestes ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette marque'
      },
      {
        id: 'ateliers-cuir',
        title: 'Maroquinerie du Sahel',
        subtitle: 'Artisanat du cuir végétal, teinture naturelle et finitions d’exception.',
        question: 'Quelle est la valeur du temps long et de la matière noble dans vos créations ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette marque'
      },
      {
        id: 'cosmetiques-bio',
        title: 'Karité & Essences Tropicales',
        subtitle: 'Coopératives de femmes productrices de beurre de karité pur et huiles sacrées.',
        question: 'Comment vos produits de terroir honorent-ils la santé naturelle et la dignité des productrices ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1608248597359-33513476d05f?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette marque'
      }
    ]
  },
  {
    id: 'projets',
    label: 'Projets',
    icon: Sprout,
    tagline: 'Portez un projet collectif, une initiative citoyenne ou une vision d’intérêt général.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Présenter votre initiative à une communauté engagée prête à se mobiliser.',
      'Expliquer l’impact concret de vos actions sur le terrain avec authenticité.',
      'Nouer des partenariats éthiques avec des porteurs de projets complémentaires.',
      'Lever des soutiens et des adhésions sans intermédiaire déformant.',
      'Prouver par l’exemple qu’un changement durable est déjà à l’œuvre.'
    ],
    subjects: [
      {
        id: 'forets-sacrees',
        title: 'Sanctuarisation des Forêts Sacrées',
        subtitle: 'Protection des îlots de biodiversité et sanctuaires rituels menacés.',
        question: 'Comment protégez-vous les sanctuaires naturels face aux pressions modernes d’exploitation ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir ce projet'
      },
      {
        id: 'ecoles-nomades',
        title: 'Bibliothèques & Écoles Nomades',
        subtitle: 'Apporter le livre et la culture orale aux enfants des campements pastoraux.',
        question: 'Comment faire voyager les livres et le savoir là où ils manquent le plus ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir ce projet'
      },
      {
        id: 'semences-paysannes',
        title: 'Banque de Semences Paysannes',
        subtitle: 'Conservation des variétés anciennes de mil, sorgho et maïs face aux OGM.',
        question: 'Pourquoi la sauvegarde des semences traditionnelles est-elle vitale pour la souveraineté alimentaire ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir ce projet'
      },
      {
        id: 'ateliers-tissage',
        title: 'Coopérative de Tissage Kanvô',
        subtitle: 'Préservation du pagne tissé béninois et émancipation économique des artisanes.',
        question: 'Comment l’artisanat traditionnel renforce-t-il l’autonomie économique des femmes ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir ce projet'
      },
      {
        id: 'plantes-medicinales',
        title: 'Conservatoire des Plantes Médicinales',
        subtitle: 'Documentation des remèdes traditionnels de nos forêts et validation scientifique.',
        question: 'Quelle plante ou remède ancestral a prouvé sa sagesse et son efficacité auprès des vôtres ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir ce projet'
      }
    ]
  },
  {
    id: 'offres',
    label: 'Offres',
    icon: ShoppingBag,
    tagline: 'Proposez des créations uniques, des séjours immersifs ou des services d’exception.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Vendre vos créations en expliquant directement l’histoire de leur fabrication.',
      'S’adresser à un public qui valorise le travail bien fait et le prix juste.',
      'Remplacer les algorithmes de vente agressifs par une rencontre humaine.',
      'Créer une communauté de clients fidèles et attachés à votre savoir-faire.',
      'Permettre le troc, la commande sur-mesure et l’échange direct.'
    ],
    subjects: [
      {
        id: 'masterclasses',
        title: 'Masterclass Écriture & Scénario 9:16',
        subtitle: 'Formation pratique dispensée par les scénaristes et réalisateurs Yonywood.',
        question: 'Quel secret d’écriture ou geste d’excellence souhaitez-vous transmettre en atelier ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette offre'
      },
      {
        id: 'pieces-tissees',
        title: 'Pièces Uniques de Pagne Tissé',
        subtitle: 'Étoffes en coton pur filé main par les maîtres tisserands de Bohicon.',
        question: 'Quelle histoire sacrée ou symbolique est tissée dans les motifs de vos étoffes ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette offre'
      },
      {
        id: 'residences',
        title: 'Résidence d’Artistes à Ganvié',
        subtitle: 'Immersion sur pilotis pour musiciens, peintres et écrivains du monde entier.',
        question: 'Quelle transformation créative proposez-vous à ceux qui viennent séjourner dans votre lieu ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette offre'
      },
      {
        id: 'ateliers-tournage',
        title: 'Atelier de Tournage & Cadrage Téléphone',
        subtitle: 'Maîtriser la lumière naturelle et le son direct pour filmer des récits vivants.',
        question: 'Comment apprenez-vous aux créateurs débutants à filmer avec le cœur et sans artifice ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette offre'
      },
      {
        id: 'forge-fer',
        title: 'Objets Rituels en Fer Forgé',
        subtitle: 'Créations inspirées du culte d’Ogoun par les forgerons de Ouidah.',
        question: 'Que vous a enseigné l’épreuve du feu et du fer sur la maîtrise de vos émotions ?',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
        actionLabel: 'Choisir cette offre'
      }
    ]
  }
];
