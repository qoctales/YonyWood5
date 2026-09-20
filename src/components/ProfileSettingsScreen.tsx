import React, { useState, useRef, useEffect } from 'react';
import { 
  Sliders,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Edit3,
  ShoppingBag,
  Coins,
  HeartHandshake,
  X,
  Share2,
  Camera,
  MapPin,
  MessageSquare,
  Play,
  Pause,
  Film,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Lock,
  Mail,
  Key,
  Upload,
  UploadCloud,
  Image as ImageIcon,
  Video,
  LogOut,
  Check,
  BookOpen,
  Megaphone,
  ArrowLeft,
  DollarSign,
  Send,
  Sparkles,
  Info,
  Copy,
  Users
} from 'lucide-react';
import { ViewScreen, AffiliationPerson, Protagonist } from '../types';
import { PROTAGONISTS, DOCUMENTARIES } from '../data/mockData';
import { MATRIX_SERIES_DATA } from '../data/matrixData';

export type DimensionTab = 'recit' | 'episodes' | 'productions' | 'creations' | 'initiatives' | 'appels';

export interface ProfileSettingsScreenProps {
  onNavigate: (screen: ViewScreen) => void;
  selectedDocFilter?: string[];
  onUpdateDocFilter?: (docIds: string[]) => void;
  language?: string;
  onUpdateLanguage?: (lang: string) => void;
  hideQuestionByDefault?: boolean;
  onToggleHideQuestion?: (val: boolean) => void;
  protagonistId?: string; // Si fourni = mode Visiteur
  initialTab?: DimensionTab;
}

// 1. Récit : Vidéo personnelle / histoire personnelle
export interface UserRecitItem {
  id: string;
  title: string;
  chapter?: string;
  subtitle?: string;
  description: string;
  duration: string;
  viewsCount?: number;
  videoUrl: string;
  posterUrl: string;
  year?: string;
  quote?: string;
}

// 2. Épisodes : Vidéos dans les séries documentaires
export interface UserEpisodeVideo {
  id: string;
  title: string;
  seriesId: string;
  seriesTitle: string;
  status?: string;
  submissionDate?: string;
  viewsCount: number;
  duration: string;
  videoUrl: string;
  posterUrl: string;
}

// 3. Productions : Parts de coproduction
export interface UserProductionShare {
  id: string;
  seriesId: string;
  seriesTitle: string;
  sharesCount: number; // Total parts
  sharesOnSale: number; // Mises en vente
  startPrice?: number; // Prix de départ unitaire par part
  salePrice: number; // Prix actuel unitaire
  purchasePrice: number;
  recommendedPrice: number;
  rsiPercent?: number; // Retour sur investissement en %
  returnForecastPercent: number;
  returnForecastAmount: number;
  videoUrl: string;
  posterUrl: string;
  status: string;
}

// 4. Créations : Artisanat, pièces & ateliers
export interface UserCreationItem {
  id: string;
  title: string;
  seriesTitle?: string;
  categoryLabel: string;
  type: 'produit' | 'service' | 'atelier' | 'consultation' | 'artisanat';
  price: string;
  priceNumeric: number;
  stock?: string;
  description: string;
  specs?: string;
  videoUrl: string;
  posterUrl: string;
}

// 5. Initiatives : Financement participatif
export interface UserInitiativeItem {
  id: string;
  title: string;
  seriesTitle?: string;
  category: string;
  collectedAmount: number;
  targetAmount: number;
  backersCount: number;
  daysRemaining: number;
  description: string;
  videoUrl: string;
  posterUrl: string;
}

// 6. Appels : Besoins & collaborations
export interface UserAppelItem {
  id: string;
  title: string;
  category: string;
  urgency: string;
  description: string;
  impact?: string;
  videoUrl: string;
  posterUrl: string;
}

// Presets multimédias pour l'ajout rapide
const MEDIA_POSTER_PRESETS = [
  { name: 'Lagune & Ciel', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80' },
  { name: 'Forêt & Végétal', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Indigo & Tissage', url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80' },
  { name: 'Terre & Poterie', url: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80' },
];

const MEDIA_VIDEO_PRESETS = [
  { name: 'Extrait Lagune', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
  { name: 'Bande-annonce Cinéma', url: 'https://media.w3.org/2010/05/sintel/trailer.mp4' },
  { name: 'Court Documentaire', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
];

export const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({
  onNavigate,
  selectedDocFilter = [],
  onUpdateDocFilter = (_docIds: string[]) => {},
  language = 'fr',
  onUpdateLanguage = (_lang: string) => {},
  hideQuestionByDefault = false,
  onToggleHideQuestion = (_val: boolean) => {},
  protagonistId,
  initialTab = 'recit'
}) => {
  // Déterminer le mode : Propriétaire ou Visiteur
  const isOwner = !protagonistId || protagonistId === 'me';

  // Résolution du protagoniste cible (depuis MATRIX_SERIES_DATA ou PROTAGONISTS)
  const targetProtagonist = React.useMemo<Protagonist | null>(() => {
    if (isOwner) return null;

    // 1. Chercher d'abord dans MATRIX_SERIES_DATA par l'identifiant exact cliqué dans l'explorateur
    for (const series of MATRIX_SERIES_DATA) {
      const search = (list: AffiliationPerson[]): AffiliationPerson | null => {
        for (const p of list) {
          if (p.id === protagonistId) return p;
          if (p.invitedPeople && p.invitedPeople.length > 0) {
            const res = search(p.invitedPeople);
            if (res) return res;
          }
        }
        return null;
      };
      const foundInMatrix = search(series.pioneers);
      if (foundInMatrix) {
        return {
          id: foundInMatrix.id,
          slug: foundInMatrix.id,
          name: foundInMatrix.name,
          role: foundInMatrix.role,
          age: foundInMatrix.age,
          territory: foundInMatrix.territory || 'Ganvié',
          country: foundInMatrix.country || 'Bénin',
          flag: foundInMatrix.flag || '🇧🇯',
          photoUrl: foundInMatrix.photoUrl,
          teaserVideoUrl: foundInMatrix.teaserVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          quote: foundInMatrix.teaserPitch,
          bio: foundInMatrix.teaserPitch ? foundInMatrix.teaserPitch.replace(/«|»/g, '').trim() : `Passeur de savoirs et créateur dans la transmission ${foundInMatrix.universeTag || series.seriesTitle}.`,
          universeTag: foundInMatrix.universeTag,
          documentaryId: series.seriesId,
          stories: []
        } as unknown as Protagonist;
      }
    }

    // 2. Si non trouvé dans MATRIX_SERIES_DATA, chercher dans les protagonistes globaux PROTAGONISTS
    const found = PROTAGONISTS.find(p => p.id === protagonistId || p.slug === protagonistId);
    if (found) return found;

    // 3. Fallback de secours
    return {
      id: protagonistId,
      slug: protagonistId,
      name: 'Artisan Passeur',
      role: 'Passeur de savoirs traditionnels',
      territory: 'Ganvié',
      country: 'Bénin',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Artisan et passeur de savoirs dans la transmission des savoirs ancestraux.',
      teaserVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      stories: []
    } as unknown as Protagonist;
  }, [protagonistId, isOwner]);

  // Onglet actif parmi les 6 dimensions poétiques (Proposition B)
  const [activeTab, setActiveTab] = useState<DimensionTab>(initialTab);

  // État d'ouverture de la modale Paramètres (accessible uniquement par l'icône dans l'en-tête)
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Identité du profil affiché
  const [userName, setUserName] = useState<string>(
    targetProtagonist ? targetProtagonist.name : 'Amina'
  );
  const [userFullName, setUserFullName] = useState<string>(
    targetProtagonist ? targetProtagonist.name : 'Amina Traoré'
  );
  const [userRole, setUserRole] = useState<string>(
    targetProtagonist ? targetProtagonist.role : 'Passeuse de mémoires sonores & artisane'
  );
  const [userTerritory, setUserTerritory] = useState<string>(
    targetProtagonist ? `${targetProtagonist.territory}, ${targetProtagonist.country}` : 'Ganvié & Cotonou, Bénin'
  );
  const [userBio, setUserBio] = useState<string>(
    targetProtagonist ? targetProtagonist.bio : 'Passeuse de mémoires sonores et artisane du tissage traditionnel. Entre la lagune de Ganvié et la terre rouge d’Allada, je recueille les chants du fleuve et les gestes millénaires.'
  );
  const [userPhoto, setUserPhoto] = useState<string>(
    targetProtagonist ? targetProtagonist.photoUrl : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  );

  useEffect(() => {
    if (targetProtagonist) {
      setUserName(targetProtagonist.name);
      setUserFullName(targetProtagonist.name);
      setUserRole(targetProtagonist.role);
      setUserTerritory(`${targetProtagonist.territory || 'Ganvié'}, ${targetProtagonist.country || 'Bénin'}`);
      setUserBio(targetProtagonist.bio);
      setUserPhoto(targetProtagonist.photoUrl);

      const vUrl = targetProtagonist.teaserVideoUrl || (targetProtagonist.stories && targetProtagonist.stories[0]?.videoUrl) || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
      const pUrl = targetProtagonist.photoUrl || '/assets/protagonists/amara-tisserande.jpg';

      setRecits([
        {
          id: `recit-${targetProtagonist.id}-1`,
          title: `Mon chemin - ${targetProtagonist.name}`,
          chapter: 'Chapitre 1',
          subtitle: 'L’éveil du regard & la transmission',
          description: `Dans ce récit personnel, ${targetProtagonist.name} raconte ses premières années, l'héritage reçu et ce qui l'a mené à sa vocation.`,
          quote: targetProtagonist.quote || '« Le tissu n’est pas fait par les yeux, mais par la pulsation du corps. »',
          duration: '06:15',
          viewsCount: 1420,
          videoUrl: vUrl,
          posterUrl: pUrl
        },
        {
          id: `recit-${targetProtagonist.id}-2`,
          title: 'L’apprentissage',
          chapter: 'Chapitre 2',
          subtitle: 'Le temps de l’apprentissage',
          description: 'Récit intime sur les années de formation, les doutes traversés et le secret de la persévérance.',
          quote: '« Pour comprendre la matière, il faut accepter de ralentir et d’écouter. »',
          duration: '08:40',
          viewsCount: 890,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
          posterUrl: pUrl
        }
      ]);
      setRecitIndex(0);
      setIsPlaying(false);
    }
  }, [targetProtagonist]);

  // Édition de profil (propriétaire)
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Indices de navigation par piste (chariot)
  const [recitIndex, setRecitIndex] = useState<number>(0);
  const [episodeIndex, setEpisodeIndex] = useState<number>(0);
  const [shareIndex, setShareIndex] = useState<number>(0);
  const [creationIndex, setCreationIndex] = useState<number>(0);
  const [initiativeIndex, setInitiativeIndex] = useState<number>(0);
  const [appelIndex, setAppelIndex] = useState<number>(0);

  // Swiping state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  // Video playback
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // =========================================================================
  // 1. DATA DIMENSION 1 : RÉCIT (Histoires personnelles de vie, études, etc.)
  // =========================================================================
  const [recits, setRecits] = useState<UserRecitItem[]>(() => {
    if (targetProtagonist) {
      const vUrl = targetProtagonist.teaserVideoUrl || (targetProtagonist.stories && targetProtagonist.stories[0]?.videoUrl) || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
      const pUrl = targetProtagonist.photoUrl || '/assets/protagonists/amara-tisserande.jpg';
      return [
        {
          id: `recit-${targetProtagonist.id}-1`,
          title: `Mon chemin - ${targetProtagonist.name}`,
          chapter: 'Chapitre 1',
          subtitle: 'L’éveil du regard & la transmission',
          description: `Dans ce récit personnel, ${targetProtagonist.name} raconte ses premières années, l'héritage reçu et ce qui l'a mené à sa vocation.`,
          quote: targetProtagonist.quote || '« Le tissu n’est pas fait par les yeux, mais par la pulsation du corps. »',
          duration: '06:15',
          viewsCount: 1420,
          videoUrl: vUrl,
          posterUrl: pUrl
        },
        {
          id: `recit-${targetProtagonist.id}-2`,
          title: 'L’apprentissage',
          chapter: 'Chapitre 2',
          subtitle: 'Le temps de l’apprentissage',
          description: 'Récit intime sur les années de formation, les doutes traversés et le secret de la persévérance.',
          quote: '« Pour comprendre la matière, il faut accepter de ralentir et d’écouter. »',
          duration: '08:40',
          viewsCount: 890,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
          posterUrl: pUrl
        }
      ];
    }
    return [
      {
        id: 'recit-1',
        title: 'Le chant de la lagune',
        chapter: 'Récit personnel',
        subtitle: 'Origines & Mémoire',
        description: 'Je raconte mon enfance sur l’eau, mes premières années d’études et la façon dont ma grand-mère m’a transmis la voix des femmes piroguières.',
        quote: '« L’eau retient tout ce que les hommes oublient de nommer. »',
        duration: '05:30',
        viewsCount: 1840,
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        posterUrl: '/assets/protagonists/amara-tisserande.jpg'
      },
      {
        id: 'recit-2',
        title: 'Les métiers du fil',
        chapter: 'Parcours de formation',
        subtitle: 'Transmission & Métier',
        description: 'Après ma formation en sociologie, j’ai choisi de réapprendre le geste du tissage auprès des aînées d’Allada pour en faire un pont entre générations.',
        quote: '« Savoir d’où l’on vient donne à la navette son équilibre parfait. »',
        duration: '07:15',
        viewsCount: 920,
        videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        posterUrl: '/assets/protagonists/koffi-tisserand.jpg'
      }
    ];
  });

  // =========================================================================
  // 2. DATA DIMENSION 2 : ÉPISODES (Vidéos dans les séries documentaires)
  // =========================================================================
  const [episodes, setEpisodes] = useState<UserEpisodeVideo[]>(() => {
    if (targetProtagonist && targetProtagonist.stories && targetProtagonist.stories.length > 0) {
      return targetProtagonist.stories.map((st, idx) => ({
        id: st.id,
        title: st.title,
        seriesId: targetProtagonist.documentaryId || 'finagnon-qosqorico',
        seriesTitle: 'Finagnon < > Qosqorico',
        status: 'Validée',
        submissionDate: '15 Fév 2026',
        viewsCount: 1200 + idx * 300,
        duration: st.duration || '07:30',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        posterUrl: st.videoCoverUrl || '/assets/posters/finagnon-qosqorico.png'
      }));
    }
    return [
      {
        id: 'ep-1',
        title: 'Le chant des piroguiers sous la brume de Ganvié',
        seriesId: 'finagnon-qosqorico',
        seriesTitle: 'Finagnon < > Qosqorico',
        status: 'Validée',
        submissionDate: '12 Fév 2026',
        viewsCount: 1420,
        duration: '4:18',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        posterUrl: '/assets/posters/finagnon-qosqorico.png'
      },
      {
        id: 'ep-2',
        title: 'Ce que murmurent les feuilles de karité avant l’aurore',
        seriesId: 'jesus-legba',
        seriesTitle: 'Jésus < > Èṣù',
        status: 'Tournage planifié',
        submissionDate: '28 Fév 2026',
        viewsCount: 680,
        duration: '3:45',
        videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        posterUrl: '/assets/posters/jesus-esu.png'
      },
      {
        id: 'ep-3',
        title: 'Le verbe et l’écho des carrefours à la nuit tombée',
        seriesId: 'blacks-one-beyond-eve',
        seriesTitle: 'Blacks One < > Beyond Eve',
        status: 'En cours de montage',
        submissionDate: '05 Mar 2026',
        viewsCount: 230,
        duration: '5:10',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        posterUrl: '/assets/posters/blacks-one-beyond-eve.png'
      }
    ];
  });

  // =========================================================================
  // 3. DATA DIMENSION 3 : PRODUCTIONS (Parts de coproduction avec Prix départ & RSI)
  // =========================================================================
  const [productions, setProductions] = useState<UserProductionShare[]>([
    {
      id: 'prod-1',
      seriesId: 'finagnon-qosqorico',
      seriesTitle: 'Finagnon < > Qosqorico',
      sharesCount: 10,
      sharesOnSale: isOwner ? 2 : 2, // Pour visiteur : parts disponibles à l'achat
      startPrice: 35,
      salePrice: 55,
      purchasePrice: 350,
      recommendedPrice: 55,
      rsiPercent: 57.1,
      returnForecastPercent: 18.5,
      returnForecastAmount: 64.75,
      status: 'Diffusion internationale',
      videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      posterUrl: '/assets/posters/finagnon-qosqorico.png'
    },
    {
      id: 'prod-2',
      seriesId: 'jesus-legba',
      seriesTitle: 'Jésus < > Èṣù',
      sharesCount: 5,
      sharesOnSale: 2,
      startPrice: 40,
      salePrice: 50,
      purchasePrice: 200,
      recommendedPrice: 48,
      rsiPercent: 25.0,
      returnForecastPercent: 12.0,
      returnForecastAmount: 24.00,
      status: 'Post-production active',
      videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      posterUrl: '/assets/posters/jesus-esu.png'
    },
    {
      id: 'prod-3',
      seriesId: 'blacks-one-beyond-eve',
      seriesTitle: 'Blacks One < > Beyond Eve',
      sharesCount: 8,
      sharesOnSale: 1,
      startPrice: 42,
      salePrice: 52,
      purchasePrice: 380,
      recommendedPrice: 50,
      rsiPercent: 23.8,
      returnForecastPercent: 15.0,
      returnForecastAmount: 41.60,
      status: 'En diffusion',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      posterUrl: '/assets/posters/blacks-one-beyond-eve.png'
    }
  ]);

  // =========================================================================
  // 4. DATA DIMENSION 4 : CRÉATIONS (Artisanat, Pièces, Ateliers)
  // =========================================================================
  const [creations, setCreations] = useState<UserCreationItem[]>(() => {
    if (targetProtagonist) {
      return [
        {
          id: `cr-${targetProtagonist.id}-1`,
          title: 'Étoffe rituelle tissée au fil de coton',
          seriesTitle: 'Finagnon < > Qosqorico',
          categoryLabel: 'Artisanat d’art traditionnel',
          type: 'artisanat',
          price: '120 €',
          priceNumeric: 120,
          stock: '3 pièces numérotées',
          description: 'Pièce tissée sur métier traditionnel en fil de coton biologique cultivé localement et teinté à l’indigo naturel.',
          specs: '180 x 60 cm • 100% Coton brut biologique',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
          posterUrl: '/assets/protagonists/amara-tisserande.jpg'
        },
        {
          id: `cr-${targetProtagonist.id}-2`,
          title: 'Atelier d’écoute et d’initiation aux savoirs',
          seriesTitle: 'Finagnon < > Qosqorico',
          categoryLabel: 'Atelier immersif',
          type: 'atelier',
          price: '45 € / pers.',
          priceNumeric: 45,
          stock: '6 places disponibles',
          description: 'Une marche de 3 heures pour déceler les polyrythmies du vivant et la mémoire des gestes.',
          specs: 'Durée : 3h00 • Matériel fourni',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          posterUrl: '/assets/protagonists/koffi-tisserand.jpg'
        }
      ];
    }
    return [
      {
        id: 'cr-1',
        title: 'Étoffe rituelle tissée au fil de coton',
        seriesTitle: 'Finagnon < > Qosqorico',
        categoryLabel: 'Artisanat d’art traditionnel',
        type: 'artisanat',
        price: '120 €',
        priceNumeric: 120,
        stock: '3 pièces numérotées',
        description: 'Pièce tissée sur métier traditionnel en fil de coton biologique cultivé localement et teinté à l’indigo naturel.',
        specs: '180 x 60 cm • 100% Coton brut biologique',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        posterUrl: '/assets/protagonists/amara-tisserande.jpg'
      },
      {
        id: 'cr-2',
        title: 'Atelier d’écoute des chants de la lagune',
        seriesTitle: 'Finagnon < > Qosqorico',
        categoryLabel: 'Transmission orale & Ateliers',
        type: 'atelier',
        price: '45 € / pers.',
        priceNumeric: 45,
        stock: '8 places par session',
        description: 'Session de 2h30 en pirogue à Ganvié pour apprendre à enregistrer et capter les sons sacrés de l’eau.',
        specs: 'Durée : 2h30 • Pirogue incluse • Casque audio fourni',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        posterUrl: '/assets/protagonists/koffi-tisserand.jpg'
      },
      {
        id: 'cr-3',
        title: 'Navette sculptée en bois d’iroko patiné',
        seriesTitle: 'Jésus < > Èṣù',
        categoryLabel: 'Objet de collection & Outils',
        type: 'produit',
        price: '65 €',
        priceNumeric: 65,
        stock: '2 exemplaires disponibles',
        description: 'Navette sculptée à la main par les menuisiers de Porto-Novo dans des chutes de charpentes centenaires.',
        specs: 'Longueur : 28 cm • Bois d’iroko poli à la cire d’abeille',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        posterUrl: '/assets/protagonists/chef-koffi.jpg'
      }
    ];
  });

  // =========================================================================
  // 5. DATA DIMENSION 5 : INITIATIVES (Projets participatifs)
  // =========================================================================
  const [initiatives, setInitiatives] = useState<UserInitiativeItem[]>([
    {
      id: 'init-1',
      title: 'L’Atelier solidaire des voix',
      seriesTitle: 'Finagnon < > Qosqorico',
      category: 'Préservation du Patrimoine Vivant',
      collectedAmount: 3450,
      targetAmount: 5000,
      backersCount: 42,
      daysRemaining: 18,
      description: 'Financement d’un studio d’enregistrement flottant à Ganvié pour sauvegarder les oraisons et contes aquatiques.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      posterUrl: '/assets/posters/finagnon-qosqorico.png'
    },
    {
      id: 'init-2',
      title: 'Le Métier à tisser d’Allada',
      seriesTitle: 'Finagnon < > Qosqorico',
      category: 'Équipement d’Atelier Collectif',
      collectedAmount: 1820,
      targetAmount: 2800,
      backersCount: 29,
      daysRemaining: 34,
      description: 'Reconstruction d’un métier à tisser en bois d’iroko pour former 8 jeunes apprenties.',
      videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      posterUrl: '/assets/posters/jesus-esu.png'
    }
  ]);

  // =========================================================================
  // 6. DATA DIMENSION 6 : APPELS (Besoins, Collaborations, Compétences)
  // =========================================================================
  const [appels, setAppels] = useState<UserAppelItem[]>([
    {
      id: 'app-1',
      title: 'Fil de coton biologique',
      category: 'Matières premières & Éco-filière',
      urgency: 'Prioritaire',
      description: 'Recherche de coopératives agricoles féminines produisant 50 kg de fil écru sans intrants chimiques pour notre atelier de formation.',
      impact: 'Garantit 6 mois d’apprentissage continu pour 12 apprentis sans recours aux matières synthétiques.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      posterUrl: '/assets/protagonists/amara-tisserande.jpg'
    },
    {
      id: 'app-2',
      title: 'Enregistreur audio portable',
      category: 'Matériel technique & Enregistrement',
      urgency: 'D’ici fin avril',
      description: 'Pour capturer les voix des anciens sur les berges sans distorsion avec microphone stéréo XY.',
      impact: 'Permettra d’archiver 25 entretiens avant la saison des pluies.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      posterUrl: '/assets/posters/blacks-one-beyond-eve.png'
    }
  ]);

  // Modales d'actions pour le Propriétaire
  const [isSellingShares, setIsSellingShares] = useState<boolean>(false);
  const [sellPriceInput, setSellPriceInput] = useState<number>(55);
  const [sellCountInput, setSellCountInput] = useState<number>(1);

  // Modification Récit
  const [editingRecit, setEditingRecit] = useState<UserRecitItem | null>(null);
  const [recitFormTitle, setRecitFormTitle] = useState<string>('');
  const [recitFormSubtitle, setRecitFormSubtitle] = useState<string>('');
  const [isDeletingRecit, setIsDeletingRecit] = useState<boolean>(false);

  // Modification Épisode
  const [editingEpisode, setEditingEpisode] = useState<UserEpisodeVideo | null>(null);
  const [episodeFormDuration, setEpisodeFormDuration] = useState<string>('');
  const [episodeFormViews, setEpisodeFormViews] = useState<number>(0);
  const [isDeletingEpisode, setIsDeletingEpisode] = useState<boolean>(false);

  // Modification Production
  const [editingProduction, setEditingProduction] = useState<UserProductionShare | null>(null);
  const [prodFormStartPrice, setProdFormStartPrice] = useState<number>(35);
  const [prodFormSalePrice, setProdFormSalePrice] = useState<number>(55);
  const [prodFormRsi, setProdFormRsi] = useState<number>(57.1);
  const [prodFormSharesCount, setProdFormSharesCount] = useState<number>(10);
  const [prodFormSharesOnSale, setProdFormSharesOnSale] = useState<number>(2);

  // Modification Création
  const [editingCreation, setEditingCreation] = useState<UserCreationItem | null>(null);
  const [creationFormTitle, setCreationFormTitle] = useState<string>('');
  const [creationFormPrice, setCreationFormPrice] = useState<string>('');
  const [creationFormCategory, setCreationFormCategory] = useState<string>('');
  const [creationFormDescription, setCreationFormDescription] = useState<string>('');
  const [creationFormPoster, setCreationFormPoster] = useState<string>('');
  const [creationFormVideo, setCreationFormVideo] = useState<string>('');
  const [isDeletingCreation, setIsDeletingCreation] = useState<boolean>(false);

  // Modification Initiative
  const [editingInitiative, setEditingInitiative] = useState<UserInitiativeItem | null>(null);
  const [initiativeFormTitle, setInitiativeFormTitle] = useState<string>('');
  const [initiativeFormTarget, setInitiativeFormTarget] = useState<number>(5000);
  const [initiativeFormDescription, setInitiativeFormDescription] = useState<string>('');
  const [initiativeFormPoster, setInitiativeFormPoster] = useState<string>('');
  const [initiativeFormVideo, setInitiativeFormVideo] = useState<string>('');
  const [isDeletingInitiative, setIsDeletingInitiative] = useState<boolean>(false);

  // Modification Appel
  const [editingAppel, setEditingAppel] = useState<UserAppelItem | null>(null);
  const [appelFormTitle, setAppelFormTitle] = useState<string>('');
  const [appelFormUrgency, setAppelFormUrgency] = useState<string>('');
  const [appelFormDescription, setAppelFormDescription] = useState<string>('');
  const [appelFormImpact, setAppelFormImpact] = useState<string>('');
  const [isDeletingAppel, setIsDeletingAppel] = useState<boolean>(false);

  // Modale de Partage Réseaux Sociaux
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  // Modales d'actions interactives pour le Visiteur
  const [isBuyingSharesModalOpen, setIsBuyingSharesModalOpen] = useState<boolean>(false);
  const [buySharesCount, setBuySharesCount] = useState<number>(1);

  const [isOrderingCreationModalOpen, setIsOrderingCreationModalOpen] = useState<boolean>(false);
  const [orderActionType, setOrderActionType] = useState<'commander' | 'reserver' | 'acheter'>('commander');
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [orderContact, setOrderContact] = useState<string>('');

  const [isContributingModalOpen, setIsContributingModalOpen] = useState<boolean>(false);
  const [initiativeActionType, setInitiativeActionType] = useState<'contribuer' | 'participer'>('contribuer');
  const [contributionAmount, setContributionAmount] = useState<number>(50);
  const [volunteerMessage, setVolunteerMessage] = useState<string>('');

  const [isOfferingHelpModalOpen, setIsOfferingHelpModalOpen] = useState<boolean>(false);
  const [helpMessage, setHelpMessage] = useState<string>('');
  const [helpContact, setHelpContact] = useState<string>('');

  // Paramètres & Sécurité du compte (modal paramètres)
  const [userEmail, setUserEmail] = useState<string>('amina.traore@yonywood.org');
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [tempEmail, setTempEmail] = useState<string>('amina.traore@yonywood.org');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Synchroniser la vidéo lors du changement de slide
  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [activeTab, recitIndex, episodeIndex, shareIndex, creationIndex, initiativeIndex, appelIndex]);

  // Gérer la lecture vidéo
  const toggleVideoPlayback = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Navigation Swipes & Chariot
  const handlePrev = () => {
    if (activeTab === 'recit') {
      setRecitIndex(prev => (prev > 0 ? prev - 1 : recits.length - 1));
    } else if (activeTab === 'episodes') {
      setEpisodeIndex(prev => (prev > 0 ? prev - 1 : episodes.length - 1));
    } else if (activeTab === 'productions') {
      setShareIndex(prev => (prev > 0 ? prev - 1 : productions.length - 1));
    } else if (activeTab === 'creations') {
      setCreationIndex(prev => (prev > 0 ? prev - 1 : creations.length - 1));
    } else if (activeTab === 'initiatives') {
      setInitiativeIndex(prev => (prev > 0 ? prev - 1 : initiatives.length - 1));
    } else if (activeTab === 'appels') {
      setAppelIndex(prev => (prev > 0 ? prev - 1 : appels.length - 1));
    }
  };

  const handleNext = () => {
    if (activeTab === 'recit') {
      setRecitIndex(prev => (prev < recits.length - 1 ? prev + 1 : 0));
    } else if (activeTab === 'episodes') {
      setEpisodeIndex(prev => (prev < episodes.length - 1 ? prev + 1 : 0));
    } else if (activeTab === 'productions') {
      setShareIndex(prev => (prev < productions.length - 1 ? prev + 1 : 0));
    } else if (activeTab === 'creations') {
      setCreationIndex(prev => (prev < creations.length - 1 ? prev + 1 : 0));
    } else if (activeTab === 'initiatives') {
      setInitiativeIndex(prev => (prev < initiatives.length - 1 ? prev + 1 : 0));
    } else if (activeTab === 'appels') {
      setAppelIndex(prev => (prev < appels.length - 1 ? prev + 1 : 0));
    }
  };

  // Touch Swipe Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setSwipeOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX;
    if (Math.abs(diff) < 120) {
      setSwipeOffset(diff);
    }
  };

  const onTouchEnd = () => {
    if (swipeOffset < -40) {
      handleNext();
    } else if (swipeOffset > 40) {
      handlePrev();
    }
    setTouchStartX(null);
    setSwipeOffset(0);
  };

  // Mouse Drag Handlers
  const onMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setTouchStartX(e.clientX);
    setSwipeOffset(0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || touchStartX === null) return;
    const diff = e.clientX - touchStartX;
    if (Math.abs(diff) < 120) {
      setSwipeOffset(diff);
    }
  };

  const onMouseUp = () => {
    if (!isMouseDown) return;
    if (swipeOffset < -40) {
      handleNext();
    } else if (swipeOffset > 40) {
      handlePrev();
    }
    setIsMouseDown(false);
    setTouchStartX(null);
    setSwipeOffset(0);
  };

  // Nom complet affiché pour garantir une stricte cohérence avec l'explorateur
  const profileDisplayName = targetProtagonist 
    ? targetProtagonist.name 
    : (userFullName || userName || 'Amina Traoré');

  // Partager le profil (ouvre la modale des réseaux sociaux + copie de lien)
  const handleShareProfile = () => {
    setIsShareModalOpen(true);
  };

  // Items actifs
  const currentRecit = recits[recitIndex] || recits[0];
  const currentEpisode = episodes[episodeIndex] || episodes[0];
  const currentProduction = productions[shareIndex] || productions[0];
  const currentCreation = creations[creationIndex] || creations[0];
  const currentInitiative = initiatives[initiativeIndex] || initiatives[0];
  const currentAppel = appels[appelIndex] || appels[0];

  // Helper titre série avec mise en valeur du symbole < >
  const currentSeriesTitle = 
    activeTab === 'recit' ? (userName || 'Récit personnel') :
    activeTab === 'episodes' ? currentEpisode?.seriesTitle :
    activeTab === 'productions' ? currentProduction?.seriesTitle :
    activeTab === 'creations' ? (currentCreation?.seriesTitle || 'Créations d’atelier') :
    activeTab === 'initiatives' ? (currentInitiative?.seriesTitle || 'Initiative') :
    (currentAppel?.category || 'Appel');

  const parseSeriesTitle = (title?: string) => {
    if (!title) return { partA: '', partB: '', hasSeparator: false };
    if (title.includes('< >')) {
      const parts = title.split('< >');
      return { partA: parts[0].trim(), partB: parts.slice(1).join('< >').trim(), hasSeparator: true };
    }
    if (title.includes('<>')) {
      const parts = title.split('<>');
      return { partA: parts[0].trim(), partB: parts.slice(1).join('<>').trim(), hasSeparator: true };
    }
    return { partA: title.trim(), partB: '', hasSeparator: false };
  };

  const parsedSeries = parseSeriesTitle(currentSeriesTitle);

  // Helper pour raccourcir le titre tout en haut afin qu'il tienne parfaitement dans la capsule
  const getShortTitle = (title?: string) => {
    if (!title) return '';
    const clean = title.split(/[:–—]/)[0].trim();
    return clean;
  };

  // Configuration des 6 onglets poétiques (Proposition B)
  const DIMENSIONS_CONFIG: { key: DimensionTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'recit', label: 'Récits', icon: BookOpen },
    { key: 'episodes', label: 'Épisodes', icon: Film },
    { key: 'productions', label: 'Productions', icon: Coins },
    { key: 'creations', label: 'Créations', icon: ShoppingBag },
    { key: 'initiatives', label: 'Initiatives', icon: HeartHandshake },
    { key: 'appels', label: 'Appels', icon: Megaphone },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-36 space-y-6 text-[#1C1917]">
      
      {/* ========================================================================= */}
      {/* 1. EN-TÊTE D'IDENTITÉ UNIFIÉ : MODE PROPRIÉTAIRE & VISITEUR               */}
      {/* ========================================================================= */}
      <div className="space-y-4 border-b border-stone-200 pb-4">
        
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            {/* Bouton retour si visiteur */}
            {!isOwner && (
              <button
                onClick={() => onNavigate({ type: 'home' })}
                className="p-2 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 transition-colors shadow-xs cursor-pointer mr-1"
                title="Retour à l'explorateur"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <div className="relative">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full p-0.5 border-2 border-[#C89B3C] shadow-sm overflow-hidden bg-white">
                <img
                  src={userPhoto}
                  alt={userFullName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {isOwner && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1C1917] text-white flex items-center justify-center text-[10px] shadow-xs cursor-pointer hover:bg-stone-800"
                  title="Modifier mon profil"
                  id="btn-edit-profile-avatar"
                >
                  <Camera className="w-3 h-3" />
                </button>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-lg sm:text-xl font-bold text-[#1C1917] leading-tight">
                  {profileDisplayName}
                </h1>
                {targetProtagonist?.flag && <span className="text-sm">{targetProtagonist.flag}</span>}
              </div>
              <p className="text-xs text-[#8B6845] font-medium mt-0.5 line-clamp-1">{userRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isOwner ? (
              <>
                {/* Propriétaire : Bouton Messagerie */}
                <button
                  onClick={() => onNavigate({ type: 'messaging' })}
                  id="btn-profile-messages"
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-xs font-medium text-[#1C1917] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer relative"
                  title="Ouvrir la messagerie"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-stone-700" />
                  <span>Messages</span>
                  <span className="w-4 h-4 rounded-full bg-[#C89B3C] text-white text-[9px] font-bold flex items-center justify-center">
                    2
                  </span>
                </button>

                {/* Propriétaire : Bouton Partager */}
                <button
                  onClick={handleShareProfile}
                  id="btn-share-profile"
                  className="p-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 hover:text-[#1C1917] transition-colors cursor-pointer shadow-xs"
                  title="Partager mon profil"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Propriétaire : Icône discrète PARAMÈTRES dans l'en-tête */}
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  id="btn-profile-settings-gear"
                  className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 transition-colors cursor-pointer shadow-xs"
                  title="Paramètres du compte"
                >
                  <Sliders className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                {/* Visiteur : Bouton Envoyer un message */}
                <button
                  onClick={() => onNavigate({ type: 'messaging' })}
                  id="btn-visitor-message"
                  className="px-3.5 py-1.5 rounded-full bg-[#1C1917] hover:bg-stone-800 text-xs font-medium text-white flex items-center gap-1.5 transition-all shadow-xs cursor-pointer whitespace-nowrap"
                  title={`Envoyer un message à ${userName}`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>Envoyer un message</span>
                </button>

                {/* Visiteur : Bouton Partager */}
                <button
                  onClick={handleShareProfile}
                  id="btn-share-visitor-profile"
                  className="p-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 hover:text-[#1C1917] transition-colors cursor-pointer shadow-xs"
                  title={`Partager le profil de ${userName}`}
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BARRE DES 6 DIMENSIONS (PROPOSITION B : PLUS CINÉMATOGRAPHIQUE & POÉTIQUE)  */}
        {/* 1. Récit | 2. Épisodes | 3. Productions | 4. Créations | 5. Initiatives | 6. Appels */}
        {/* Note : Paramètres a été déplacé dans l'icône d'en-tête                        */}
        {/* ========================================================================= */}
        <div className="bg-stone-100/90 p-1.5 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {DIMENSIONS_CONFIG.map(({ key, label, icon: IconComponent }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  id={`tab-profile-${key}`}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 outline-none whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-sm border border-stone-200/60 font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                  }`}
                >
                  <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-[#C89B3C]' : 'text-stone-400'}`} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* TOAST SUCCÈS */}
      {shareToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full px-4 py-2.5 rounded-2xl bg-[#1C1917] text-white text-xs font-semibold flex items-center gap-2 shadow-xl animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{shareToast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VISIONNEUSE VERTICALE 9:16 (AVEC NAVIGATION PAR FLÈCHES ET GESTES)     */}
      {/* ========================================================================= */}
      <div className="space-y-4 animate-in fade-in duration-200">

        {/* Conteneur principal avec flèches latérales */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-6 py-2">
          
          {/* Flèche Gauche */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex p-3.5 rounded-full bg-white hover:bg-[#FAFAF9] border border-[#E7E5E4] text-[#8B6845] hover:text-[#1C1917] transition-all shadow-sm cursor-pointer hover:scale-105 outline-none focus:outline-none ring-0"
            title="Précédent"
            id="prev-studio-card-btn"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* CARTE FORMAT 9:16 VERTICAL SANS CADRE NI REPERES */}
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('button, a, input, textarea, select')) return;
              toggleVideoPlayback();
            }}
            className="w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] transition-transform duration-150 ease-out select-none cursor-pointer relative rounded-3xl overflow-hidden shadow-xl border border-[#E7E5E4] bg-stone-900 outline-none focus:outline-none ring-0"
            style={{ transform: `translateX(${swipeOffset}px)` }}
          >
            {/* ================================================================= */}
            {/* DIMENSION 1 : RÉCIT (Vidéos personnelles / histoire de vie)       */}
            {/* ================================================================= */}
            {activeTab === 'recit' && currentRecit && (
              <div 
                className="group relative w-full h-full flex flex-col justify-between p-5 text-white"
                id={`card-recit-${currentRecit.id}`}
              >
                <img
                  src={currentRecit.posterUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <video
                  ref={videoRef}
                  src={currentRecit.videoUrl}
                  loop
                  muted
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                    isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {/* Filtre plus clair et lumineux sur l'image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25 pointer-events-none" />

                {/* HAUT : Titre court qui s'adapte à la capsule à gauche, Icône vidéo dorée à droite */}
                <div className="relative z-10 flex items-center justify-between gap-3 w-full">
                  <div 
                    className="w-fit max-w-[calc(100%-3.5rem)] px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-md flex items-center shrink-0" 
                    title={currentRecit.title}
                  >
                    <span className="truncate">{getShortTitle(currentRecit.title)}</span>
                  </div>

                  {/* Icône vidéo hybride dorée en haut à droite */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoPlayback(e);
                    }}
                    className={`group/btn relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 shadow-lg ${
                      isPlaying
                        ? 'border border-[#C89B3C] ring-2 ring-[#C89B3C]/40 bg-black/60 backdrop-blur-md shadow-[0_0_16px_rgba(200,155,60,0.6)]'
                        : 'border border-transparent hover:border-[#C89B3C] hover:ring-2 hover:ring-[#C89B3C]/30 bg-black/40 hover:bg-black/60 backdrop-blur-md'
                    }`}
                    title={isPlaying ? 'Mettre en pause' : `Visionner le récit`}
                  >
                    {isPlaying ? (
                      <Pause className="w-5.5 h-5.5 text-[#C89B3C] fill-[#C89B3C] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-110" />
                    ) : (
                      <Play className="w-6 h-6 text-[#C89B3C] fill-[#C89B3C] translate-x-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-115" />
                    )}
                  </button>
                </div>

                {/* MILIEU : Vue épurée sans texte */}
                <div className="my-auto" />

                {/* BAS : Juste un petit titre en bas & actions */}
                <div className="relative z-10 space-y-2.5">
                  <div>
                    <p className="font-editorial text-sm sm:text-base font-bold text-white leading-snug">
                      {currentRecit.subtitle || currentRecit.chapter}
                    </p>
                  </div>

                  {/* Actions propriétaire vs visiteur */}
                  {isOwner ? (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingRecit(currentRecit);
                          setRecitFormTitle(currentRecit.title);
                          setRecitFormSubtitle(currentRecit.subtitle || '');
                        }}
                        className="py-2 px-3 rounded-xl bg-white hover:bg-stone-100 text-[#1C1917] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#1C1917]" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDeletingRecit(true);
                        }}
                        className="py-2 px-3 rounded-xl bg-black/60 hover:bg-red-600/80 border border-white/20 hover:border-red-500 text-white/90 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        <span>Retirer</span>
                      </button>
                    </div>
                  ) : (
                    <div className="pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVideoPlayback(e);
                        }}
                        className="w-full h-11 px-4 rounded-xl bg-gradient-to-r from-[#C89B3C] to-[#E5C16C] hover:brightness-105 text-[#1C1917] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" />
                            <span>Mettre en pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" />
                            <span>Écouter le récit</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* DIMENSION 2 : ÉPISODES (Vidéos dans les séries documentaires)     */}
            {/* ================================================================= */}
            {activeTab === 'episodes' && currentEpisode && (
              <div 
                className="group relative w-full h-full flex flex-col justify-between p-5 text-white"
                id={`card-episode-${currentEpisode.id}`}
              >
                <img
                  src={currentEpisode.posterUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <video
                  ref={videoRef}
                  src={currentEpisode.videoUrl}
                  loop
                  muted
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                    isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {/* Filtre plus clair et lumineux sur l'image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25 pointer-events-none" />

                {/* HAUT : Titre de la série à gauche dans capsule adaptable, Icône vidéo dorée à droite */}
                <div className="relative z-10 flex items-center justify-between gap-3 w-full">
                  <div className="w-fit max-w-[calc(100%-3.5rem)] px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-xs font-semibold text-white tracking-wide shadow-md flex items-center shrink-0">
                    {parsedSeries.hasSeparator ? (
                      <span className="flex items-center gap-1.5 font-semibold text-white tracking-wide truncate">
                        <span>{parsedSeries.partA}</span>
                        <span className="text-white/70 font-mono text-[11px]">&lt; &gt;</span>
                        <span>{parsedSeries.partB}</span>
                      </span>
                    ) : (
                      <span className="tracking-wide text-white truncate">{currentEpisode.seriesTitle}</span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoPlayback(e);
                    }}
                    className={`group/btn relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 shadow-lg ${
                      isPlaying
                        ? 'border border-[#C89B3C] ring-2 ring-[#C89B3C]/40 bg-black/60 backdrop-blur-md shadow-[0_0_16px_rgba(200,155,60,0.6)]'
                        : 'border border-transparent hover:border-[#C89B3C] hover:ring-2 hover:ring-[#C89B3C]/30 bg-black/40 hover:bg-black/60 backdrop-blur-md'
                    }`}
                    title={isPlaying ? 'Mettre en pause' : `Visionner l'épisode`}
                  >
                    {isPlaying ? (
                      <Pause className="w-5.5 h-5.5 text-[#C89B3C] fill-[#C89B3C] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-110" />
                    ) : (
                      <Play className="w-6 h-6 text-[#C89B3C] fill-[#C89B3C] translate-x-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-115" />
                    )}
                  </button>
                </div>

                <div className="my-auto" />

                {/* BAS : Pas de titre ! Durée et nombre de vues dans une police avec taille plus basse harmonisée */}
                <div className="relative z-10 space-y-2.5">
                  <div className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 inline-block">
                    <p className="text-[11px] font-medium text-white/90 tracking-normal">
                      {currentEpisode.duration} • {currentEpisode.viewsCount.toLocaleString()} vues
                    </p>
                  </div>

                  {isOwner ? (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingEpisode(currentEpisode);
                          setEpisodeFormDuration(currentEpisode.duration);
                          setEpisodeFormViews(currentEpisode.viewsCount);
                        }}
                        className="py-2 px-3 rounded-xl bg-white hover:bg-stone-100 text-[#1C1917] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#1C1917]" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDeletingEpisode(true);
                        }}
                        className="py-2 px-3 rounded-xl bg-black/60 hover:bg-red-600/80 border border-white/20 hover:border-red-500 text-white/90 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        <span>Retirer</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVideoPlayback(e);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#C89B3C] hover:bg-[#D4A94E] text-[#1C1917] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isPlaying ? 'Mettre en pause' : 'Visionner l’épisode'}</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* DIMENSION 3 : PRODUCTIONS (Parts de coproduction)                 */}
            {/* ================================================================= */}
            {activeTab === 'productions' && currentProduction && (
              <div 
                className="group relative w-full h-full flex flex-col justify-between p-5 text-white"
                id={`card-production-${currentProduction.id}`}
              >
                <img
                  src={currentProduction.posterUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <video
                  ref={videoRef}
                  src={currentProduction.videoUrl}
                  loop
                  muted
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                    isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {/* Filtre plus clair et lumineux sur l'image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25 pointer-events-none" />

                {/* HAUT : Titre de la série à gauche en blanc dans capsule adaptable, Icône vidéo dorée à droite */}
                <div className="relative z-10 flex items-center justify-between gap-3 w-full">
                  <div className="w-fit max-w-[calc(100%-3.5rem)] px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-xs font-semibold text-white tracking-wide shadow-md flex items-center shrink-0">
                    {parsedSeries.hasSeparator ? (
                      <span className="flex items-center gap-1.5 font-semibold text-white tracking-wide truncate">
                        <span>{parsedSeries.partA}</span>
                        <span className="text-white/70 font-mono text-[11px]">&lt; &gt;</span>
                        <span>{parsedSeries.partB}</span>
                      </span>
                    ) : (
                      <span className="tracking-wide text-white truncate">{currentProduction.seriesTitle}</span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoPlayback(e);
                    }}
                    className={`group/btn relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 shadow-lg ${
                      isPlaying
                        ? 'border border-[#C89B3C] ring-2 ring-[#C89B3C]/40 bg-black/60 backdrop-blur-md shadow-[0_0_16px_rgba(200,155,60,0.6)]'
                        : 'border border-transparent hover:border-[#C89B3C] hover:ring-2 hover:ring-[#C89B3C]/30 bg-black/40 hover:bg-black/60 backdrop-blur-md'
                    }`}
                    title={isPlaying ? 'Mettre en pause' : `Teaser de coproduction`}
                  >
                    {isPlaying ? (
                      <Pause className="w-5.5 h-5.5 text-[#C89B3C] fill-[#C89B3C] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-110" />
                    ) : (
                      <Play className="w-6 h-6 text-[#C89B3C] fill-[#C89B3C] translate-x-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-115" />
                    )}
                  </button>
                </div>

                <div className="my-auto" />

                {/* BAS : Détail des parts - Propriétaire vs Visiteur */}
                <div className="relative z-10 space-y-2.5">
                  <div className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20">
                    <div className="flex items-center justify-between text-xs">
                      {isOwner ? (
                        <>
                          <div>
                            <span className="text-white/60 block text-[10px] tracking-wide">Prix de départ</span>
                            <span className="font-mono font-bold text-white text-base">{currentProduction.startPrice || 35} €</span>
                          </div>
                          <div className="text-right">
                            <span className="text-white/60 block text-[10px] tracking-wide">Parts détenues</span>
                            <span className="font-mono font-bold text-white text-base">{currentProduction.sharesCount} parts</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <span className="text-white/60 block text-[10px] tracking-wide">Prix de la part</span>
                            <span className="font-mono font-bold text-[#C89B3C] text-base">{currentProduction.salePrice || currentProduction.startPrice || 55} €</span>
                          </div>
                          <div className="text-right">
                            <span className="text-white/60 block text-[10px] tracking-wide">Parts en vente</span>
                            <span className="font-mono font-bold text-white text-base">{currentProduction.sharesOnSale || 2} disponibles</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions Propriétaire vs Visiteur - Pas de mise en vente pour le visiteur */}
                  {isOwner ? (
                    <div className="pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSellCountInput(currentProduction.sharesOnSale || 1);
                          setSellPriceInput(currentProduction.salePrice || currentProduction.recommendedPrice);
                          setIsSellingShares(true);
                        }}
                        className="w-full h-11 px-4 rounded-xl bg-[#C89B3C] hover:bg-[#D4A94E] text-[#1C1917] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                      >
                        <Coins className="w-4 h-4 text-[#1C1917]" />
                        <span>Mettre en vente</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsBuyingSharesModalOpen(true);
                      }}
                      className="w-full h-11 px-4 rounded-xl bg-gradient-to-r from-[#C89B3C] to-[#E5C16C] hover:brightness-105 text-[#1C1917] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <Coins className="w-4 h-4 text-[#1C1917]" />
                      <span>Acheter ses parts</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* DIMENSION 4 : CRÉATIONS (Artisanat, Pièces, Ateliers)             */}
            {/* ================================================================= */}
            {activeTab === 'creations' && currentCreation && (
              <div 
                className="group relative w-full h-full flex flex-col justify-between p-5 text-white"
                id={`card-creation-${currentCreation.id}`}
              >
                <img
                  src={currentCreation.posterUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <video
                  ref={videoRef}
                  src={currentCreation.videoUrl}
                  loop
                  muted
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                    isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {/* Filtre plus clair et lumineux sur l'image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25 pointer-events-none" />

                {/* HAUT : Titre court de série/atelier à gauche dans capsule adaptable, Icône vidéo dorée à droite */}
                <div className="relative z-10 flex items-center justify-between gap-3 w-full">
                  <div 
                    className="w-fit max-w-[calc(100%-3.5rem)] px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-xs font-semibold text-white tracking-wide shadow-md flex items-center shrink-0" 
                    title={currentCreation.seriesTitle || 'Créations d’atelier'}
                  >
                    <span className="truncate">{getShortTitle(currentCreation.seriesTitle) || 'Créations d’atelier'}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoPlayback(e);
                    }}
                    className={`group/btn relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 shadow-lg ${
                      isPlaying
                        ? 'border border-[#C89B3C] ring-2 ring-[#C89B3C]/40 bg-black/60 backdrop-blur-md shadow-[0_0_16px_rgba(200,155,60,0.6)]'
                        : 'border border-transparent hover:border-[#C89B3C] hover:ring-2 hover:ring-[#C89B3C]/30 bg-black/40 hover:bg-black/60 backdrop-blur-md'
                    }`}
                    title={isPlaying ? 'Mettre en pause' : `Découvrir la création`}
                  >
                    {isPlaying ? (
                      <Pause className="w-5.5 h-5.5 text-[#C89B3C] fill-[#C89B3C] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-110" />
                    ) : (
                      <Play className="w-6 h-6 text-[#C89B3C] fill-[#C89B3C] translate-x-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-115" />
                    )}
                  </button>
                </div>

                <div className="my-auto" />

                {/* BAS : Titre court sur 1 ligne, catégorie juste en dessous, prix doré en dessous */}
                <div className="relative z-10 space-y-2.5">
                  <div>
                    {/* Titre court sur 1 ligne */}
                    <h3 className="font-editorial text-base sm:text-lg font-bold text-white leading-snug truncate" title={currentCreation.title}>
                      {currentCreation.title}
                    </h3>
                    {/* Catégorie juste en dessous */}
                    <p className="text-xs text-white/80 font-medium pt-0.5 truncate">
                      {currentCreation.categoryLabel}
                    </p>
                    {/* Prix juste en dessous en doré */}
                    <p className="font-mono text-base font-bold text-[#C89B3C] pt-1">
                      {currentCreation.price}
                    </p>
                  </div>

                  {/* Actions Propriétaire vs Visiteur */}
                  {isOwner ? (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCreation(currentCreation);
                          setCreationFormTitle(currentCreation.title);
                          setCreationFormPrice(currentCreation.price);
                          setCreationFormCategory(currentCreation.categoryLabel);
                          setCreationFormDescription(currentCreation.description);
                          setCreationFormPoster(currentCreation.posterUrl);
                          setCreationFormVideo(currentCreation.videoUrl);
                        }}
                        className="h-11 px-3 rounded-xl bg-[#C89B3C] hover:bg-[#D4A94E] text-[#1C1917] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                      >
                        <Edit3 className="w-4 h-4 text-[#1C1917]" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDeletingCreation(true);
                        }}
                        className="h-11 px-3 rounded-xl bg-black/60 hover:bg-red-600/80 border border-white/20 hover:border-red-500 text-white/90 hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOrderActionType('commander');
                        setIsOrderingCreationModalOpen(true);
                      }}
                      className="w-full h-11 px-4 rounded-xl bg-gradient-to-r from-[#C89B3C] to-[#E5C16C] hover:brightness-105 text-[#1C1917] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#1C1917]" />
                      <span>Commander</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* DIMENSION 5 : INITIATIVES (Financement participatif / Projets)     */}
            {/* ================================================================= */}
            {activeTab === 'initiatives' && currentInitiative && (
              <div 
                className="group relative w-full h-full flex flex-col justify-between p-5 text-white"
                id={`card-initiative-${currentInitiative.id}`}
              >
                <img
                  src={currentInitiative.posterUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <video
                  ref={videoRef}
                  src={currentInitiative.videoUrl}
                  loop
                  muted
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                    isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {/* Filtre plus clair et lumineux sur l'image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25 pointer-events-none" />

                {/* HAUT : % et jours restants en haut à gauche dans capsule adaptable, Icône vidéo dorée en haut à droite */}
                <div className="relative z-10 flex items-center justify-between gap-3 w-full">
                  <div className="w-fit max-w-[calc(100%-3.5rem)] px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-md flex items-center gap-1.5 shrink-0">
                    <span className="text-white font-mono font-bold">
                      {Math.round((currentInitiative.collectedAmount / currentInitiative.targetAmount) * 100)}%
                    </span>
                    <span className="text-white/40">•</span>
                    <span>{currentInitiative.daysRemaining} j restants</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoPlayback(e);
                    }}
                    className={`group/btn relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 shadow-lg ${
                      isPlaying
                        ? 'border border-[#C89B3C] ring-2 ring-[#C89B3C]/40 bg-black/60 backdrop-blur-md shadow-[0_0_16px_rgba(200,155,60,0.6)]'
                        : 'border border-transparent hover:border-[#C89B3C] hover:ring-2 hover:ring-[#C89B3C]/30 bg-black/40 hover:bg-black/60 backdrop-blur-md'
                    }`}
                    title={isPlaying ? 'Mettre en pause' : `Pitch de l’initiative`}
                  >
                    {isPlaying ? (
                      <Pause className="w-5.5 h-5.5 text-[#C89B3C] fill-[#C89B3C] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-110" />
                    ) : (
                      <Play className="w-6 h-6 text-[#C89B3C] fill-[#C89B3C] translate-x-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-115" />
                    )}
                  </button>
                </div>

                <div className="my-auto" />

                {/* BAS : Titre court sur 1 ligne, Jauge & Nombre de contributeurs */}
                <div className="relative z-10 space-y-3">
                  <div>
                    <h3 className="font-editorial text-sm sm:text-base font-bold text-white leading-snug break-words" title={currentInitiative.title}>
                      {currentInitiative.title}
                    </h3>
                  </div>

                  <div className="space-y-2 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/80 font-medium">Objectif : {currentInitiative.targetAmount.toLocaleString()} €</span>
                      <span className="font-mono text-[#C89B3C] font-bold">{currentInitiative.collectedAmount.toLocaleString()} € récoltés</span>
                    </div>
                    
                    <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#C89B3C] to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (currentInitiative.collectedAmount / currentInitiative.targetAmount) * 100)}%` }}
                      />
                    </div>

                    {/* Nombre de contributeurs écrit en gros */}
                    <div className="pt-1 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white font-mono leading-none tracking-tight">
                          {currentInitiative.backersCount}
                        </span>
                        <span className="text-xs font-bold text-[#C89B3C] uppercase tracking-wider">
                          contributeurs
                        </span>
                      </div>
                      <span className="text-[11px] text-white/70">
                        Campagne active
                      </span>
                    </div>
                  </div>

                  {isOwner ? (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingInitiative(currentInitiative);
                          setInitiativeFormTitle(currentInitiative.title);
                          setInitiativeFormTarget(currentInitiative.targetAmount);
                          setInitiativeFormDescription(currentInitiative.description);
                          setInitiativeFormPoster(currentInitiative.posterUrl);
                          setInitiativeFormVideo(currentInitiative.videoUrl);
                        }}
                        className="h-11 px-3 rounded-xl bg-[#C89B3C] hover:bg-[#D4A94E] text-[#1C1917] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                      >
                        <Edit3 className="w-4 h-4 text-[#1C1917]" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDeletingInitiative(true);
                        }}
                        className="h-11 px-3 rounded-xl bg-black/60 hover:bg-red-600/80 border border-white/20 hover:border-red-500 text-white/90 hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInitiativeActionType('contribuer');
                        setIsContributingModalOpen(true);
                      }}
                      className="w-full h-11 px-4 rounded-xl bg-gradient-to-r from-[#C89B3C] to-[#E5C16C] hover:brightness-105 text-[#1C1917] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <Users className="w-4 h-4 text-[#1C1917]" />
                      <span>Contribuer</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* DIMENSION 6 : APPELS (Besoins, Collaborations, Compétences)       */}
            {/* ================================================================= */}
            {activeTab === 'appels' && currentAppel && (
              <div 
                className="group relative w-full h-full flex flex-col justify-between p-5 text-white"
                id={`card-appel-${currentAppel.id}`}
              >
                <img
                  src={currentAppel.posterUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <video
                  ref={videoRef}
                  src={currentAppel.videoUrl}
                  loop
                  muted
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                    isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {/* Filtre plus clair et lumineux sur l'image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25 pointer-events-none" />

                {/* HAUT : Urgence/Catégorie à gauche écrit en blanc dans capsule adaptable, Icône vidéo dorée à droite */}
                <div className="relative z-10 flex items-center justify-between gap-3 w-full">
                  <div className="w-fit max-w-[calc(100%-3.5rem)] px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-md shrink-0">
                    <span className="truncate">{currentAppel.urgency}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoPlayback(e);
                    }}
                    className={`group/btn relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 shadow-lg ${
                      isPlaying
                        ? 'border border-[#C89B3C] ring-2 ring-[#C89B3C]/40 bg-black/60 backdrop-blur-md shadow-[0_0_16px_rgba(200,155,60,0.6)]'
                        : 'border border-transparent hover:border-[#C89B3C] hover:ring-2 hover:ring-[#C89B3C]/30 bg-black/40 hover:bg-black/60 backdrop-blur-md'
                    }`}
                    title={isPlaying ? 'Mettre en pause' : `Pitch du besoin`}
                  >
                    {isPlaying ? (
                      <Pause className="w-5.5 h-5.5 text-[#C89B3C] fill-[#C89B3C] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-110" />
                    ) : (
                      <Play className="w-6 h-6 text-[#C89B3C] fill-[#C89B3C] translate-x-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(200,155,60,0.7)] transition-transform group-hover/btn:scale-115" />
                    )}
                  </button>
                </div>

                <div className="my-auto" />

                {/* BAS : Titre court sur 1 ou 2 lignes qui tient bien sans coupure & actions */}
                <div className="relative z-10 space-y-2.5">
                  <div>
                    <h3 className="font-editorial text-sm sm:text-base font-bold text-white leading-snug line-clamp-2" title={currentAppel.title}>
                      {currentAppel.title}
                    </h3>
                  </div>

                  {isOwner ? (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingAppel(currentAppel);
                          setAppelFormTitle(currentAppel.title);
                          setAppelFormUrgency(currentAppel.urgency);
                          setAppelFormDescription(currentAppel.description);
                          setAppelFormImpact(currentAppel.impact || '');
                        }}
                        className="py-2 px-3 rounded-xl bg-white hover:bg-stone-100 text-[#1C1917] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#1C1917]" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDeletingAppel(true);
                        }}
                        className="py-2 px-3 rounded-xl bg-black/60 hover:bg-red-600/80 border border-white/20 hover:border-red-500 text-white/90 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOfferingHelpModalOpen(true);
                      }}
                      className="w-full h-11 px-4 rounded-xl bg-gradient-to-r from-[#C89B3C] to-[#E5C16C] hover:brightness-105 text-[#1C1917] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <Send className="w-4 h-4 text-[#1C1917]" />
                      <span>Répondre à cet appel</span>
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Flèche Droite */}
          <button
            onClick={handleNext}
            className="hidden sm:flex p-3.5 rounded-full bg-white hover:bg-[#FAFAF9] border border-[#E7E5E4] text-[#8B6845] hover:text-[#1C1917] transition-all shadow-sm cursor-pointer hover:scale-105 outline-none focus:outline-none ring-0"
            title="Suivant"
            id="next-studio-card-btn"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. MODALE DES PARAMÈTRES DU COMPTE (Accessible par l'icône dans l'en-tête)  */}
      {/* ========================================================================= */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-stone-100 text-[#1C1917] flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-bold text-[#1C1917]">
                    Paramètres du compte
                  </h3>
                  <p className="text-xs text-[#8B6845]">
                    Sécurité, préférences de lecture et identifiants.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Email de connexion */}
            <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <label className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#8B6845]" />
                <span>Adresse email</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl"
                />
                <button
                  onClick={() => {
                    setShareToast("Adresse email enregistrée.");
                    setTimeout(() => setShareToast(null), 2500);
                  }}
                  className="px-3 py-2 bg-[#1C1917] text-white text-xs font-semibold rounded-xl"
                >
                  Valider
                </button>
              </div>
            </div>

            {/* Mot de passe */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setShareToast("Mot de passe mis à jour !");
                setTimeout(() => setShareToast(null), 2500);
              }} 
              className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200"
            >
              <label className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#8B6845]" />
                <span>Modifier le mot de passe</span>
              </label>
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl"
              />
              <button
                type="submit"
                className="w-full py-2 bg-stone-200 hover:bg-stone-300 text-[#1C1917] text-xs font-bold rounded-xl"
              >
                Mettre à jour le mot de passe
              </button>
            </form>

            {/* Préférences */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                Préférences de l'application
              </h4>

              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                <div>
                  <p className="text-xs font-semibold text-[#1C1917]">Langue des sous-titres</p>
                  <p className="text-[11px] text-stone-500">Français, Fon, Quechua...</p>
                </div>
                <select
                  value={language}
                  onChange={(e) => onUpdateLanguage(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-xs font-medium"
                >
                  <option value="fr">Français</option>
                  <option value="fon">Fongbe</option>
                  <option value="quz">Quechua</option>
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                <div>
                  <p className="text-xs font-semibold text-[#1C1917]">Masquer la question par défaut</p>
                  <p className="text-[11px] text-stone-500">Privilégie une immersion totale</p>
                </div>
                <input
                  type="checkbox"
                  checked={hideQuestionByDefault}
                  onChange={(e) => onToggleHideQuestion(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C89B3C] accent-[#C89B3C]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsSettingsOpen(false);
                  onNavigate({ type: 'duo_feed' });
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Se déconnecter</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODALES D'ACTIONS POUR LE VISITEUR                                      */}
      {/* ========================================================================= */}

      {/* A. Modale Acheter des parts */}
      {isBuyingSharesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#C89B3C]" />
                <h3 className="font-editorial text-base font-bold text-[#1C1917]">Acquérir des parts</h3>
              </div>
              <button onClick={() => setIsBuyingSharesModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-stone-600">
                Vous investissez dans la série <span className="font-bold text-[#1C1917]">{currentProduction.seriesTitle}</span> auprès de {userName}.
              </p>
              
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 font-medium">Prix unitaire de la part :</span>
                  <span className="font-mono font-bold text-[#C89B3C] text-sm">{currentProduction.salePrice || currentProduction.startPrice || 55} €</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-stone-200/60">
                  <span className="font-semibold text-stone-700">Nombre de parts :</span>
                  <div className="flex items-center gap-2.5">
                    <button 
                      onClick={() => setBuySharesCount(Math.max(1, buySharesCount - 1))}
                      className="w-7 h-7 rounded-full bg-white border border-stone-300 flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-stone-100"
                    >-</button>
                    <span className="font-mono font-bold text-sm">{buySharesCount}</span>
                    <button 
                      onClick={() => setBuySharesCount(Math.min(currentProduction.sharesOnSale || 5, buySharesCount + 1))}
                      className="w-7 h-7 rounded-full bg-white border border-stone-300 flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-stone-100"
                    >+</button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#C89B3C]/10 border border-[#C89B3C]/30 text-[#8B6845]">
                <span className="font-semibold">Montant total à régler :</span>
                <span className="font-mono font-black text-base text-[#1C1917]">
                  {buySharesCount * (currentProduction.salePrice || currentProduction.startPrice || 55)} €
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsBuyingSharesModalOpen(false);
                setShareToast(`Félicitations ! Vous avez acquis vos parts de coproduction auprès de ${userName}.`);
                setTimeout(() => setShareToast(null), 3500);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#C89B3C] hover:bg-[#D4A94E] text-[#1C1917] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Confirmer l’achat des parts
            </button>
          </div>
        </div>
      )}

      {/* B. Modale Commander / Réserver / Acheter une création */}
      {isOrderingCreationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C89B3C]" />
                <h3 className="font-editorial text-base font-bold text-[#1C1917]">
                  {orderActionType === 'reserver' 
                    ? 'Réserver' 
                    : orderActionType === 'acheter' 
                    ? 'Acheter' 
                    : 'Commander'}
                </h3>
              </div>
              <button onClick={() => setIsOrderingCreationModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Onglets d'action rapide */}
            <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setOrderActionType('commander')}
                className={`py-1.5 px-2 rounded-lg transition-all ${orderActionType === 'commander' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                Commander
              </button>
              <button
                type="button"
                onClick={() => setOrderActionType('reserver')}
                className={`py-1.5 px-2 rounded-lg transition-all ${orderActionType === 'reserver' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                Réserver
              </button>
              <button
                type="button"
                onClick={() => setOrderActionType('acheter')}
                className={`py-1.5 px-2 rounded-lg transition-all ${orderActionType === 'acheter' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                Acheter
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <p className="font-bold text-[#1C1917]">{currentCreation.title}</p>
                <p className="text-stone-500">{currentCreation.categoryLabel}</p>
                <p className="font-mono text-[#C89B3C] font-bold text-sm pt-0.5">{currentCreation.price}</p>
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-semibold block">Vos coordonnées (email ou téléphone) :</label>
                <input
                  type="text"
                  placeholder="contact@exemple.com"
                  value={orderContact}
                  onChange={(e) => setOrderContact(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setIsOrderingCreationModalOpen(false);
                const actionLabel = orderActionType === 'reserver' 
                  ? 'réservation' 
                  : orderActionType === 'acheter' 
                  ? 'achat' 
                  : 'commande';
                setShareToast(`Votre demande de ${actionLabel} a été transmise à ${userName}.`);
                setTimeout(() => setShareToast(null), 3500);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#C89B3C] hover:bg-[#D4A94E] text-[#1C1917] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              {orderActionType === 'reserver' 
                ? 'Confirmer la réservation' 
                : orderActionType === 'acheter' 
                ? 'Confirmer l’achat' 
                : 'Confirmer la commande'}
            </button>
          </div>
        </div>
      )}

      {/* C. Modale Contribuer / Participer à l'initiative */}
      {isContributingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#C89B3C]" />
                <h3 className="font-editorial text-base font-bold text-[#1C1917]">
                  {initiativeActionType === 'contribuer' ? 'Soutenir l’initiative' : 'Participer au projet'}
                </h3>
              </div>
              <button onClick={() => setIsContributingModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Onglets Contribuer vs Participer */}
            <div className="grid grid-cols-2 gap-1 bg-stone-100 p-1 rounded-xl text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setInitiativeActionType('contribuer')}
                className={`py-1.5 px-2 rounded-lg transition-all ${initiativeActionType === 'contribuer' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                Contribuer (€)
              </button>
              <button
                type="button"
                onClick={() => setInitiativeActionType('participer')}
                className={`py-1.5 px-2 rounded-lg transition-all ${initiativeActionType === 'participer' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                Participer (Aide / Bénévolat)
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="font-bold text-[#1C1917]">{currentInitiative.title}</p>
              
              {initiativeActionType === 'contribuer' ? (
                <>
                  <p className="text-stone-600">Choisissez votre montant de contribution :</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[20, 50, 100].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setContributionAmount(amt)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                          contributionAmount === amt 
                            ? 'bg-[#1C1917] text-white border-[#1C1917]' 
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                        }`}
                      >
                        {amt} €
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <p className="text-stone-600">Comment souhaitez-vous vous impliquer ?</p>
                  <textarea
                    rows={3}
                    value={volunteerMessage}
                    onChange={(e) => setVolunteerMessage(e.target.value)}
                    placeholder="Compétences, aide sur le terrain, mise en relation..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 resize-none"
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setIsContributingModalOpen(false);
                if (initiativeActionType === 'contribuer') {
                  setShareToast(`Merci pour votre contribution de ${contributionAmount} € !`);
                } else {
                  setShareToast(`Merci ! Votre proposition de participation a été envoyée à ${userName}.`);
                }
                setTimeout(() => setShareToast(null), 3500);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#C89B3C] hover:bg-[#D4A94E] text-[#1C1917] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              {initiativeActionType === 'contribuer' ? 'Valider mon soutien' : 'Rejoindre le projet'}
            </button>
          </div>
        </div>
      )}

      {/* D. Modale Répondre à l'appel (Formulaire ou Messagerie privée) */}
      {isOfferingHelpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-[#C89B3C]" />
                <h3 className="font-editorial text-base font-bold text-[#1C1917]">Répondre à l’appel</h3>
              </div>
              <button onClick={() => setIsOfferingHelpModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-[#C89B3C] tracking-wider block mb-0.5">
                  {currentAppel.urgency}
                </span>
                <p className="font-bold text-[#1C1917] leading-tight">{currentAppel.title}</p>
              </div>

              {/* Formulaire de réponse directe */}
              <div className="space-y-2">
                <label className="text-stone-700 font-semibold block">Votre proposition de solution / aide :</label>
                <textarea
                  rows={3}
                  value={helpMessage}
                  onChange={(e) => setHelpMessage(e.target.value)}
                  placeholder="Je dispose de matériel / de compétences et je peux vous aider..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-semibold block">Vos coordonnées :</label>
                <input
                  type="text"
                  placeholder="Email ou téléphone"
                  value={helpContact}
                  onChange={(e) => setHelpContact(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50"
                />
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setIsOfferingHelpModalOpen(false);
                  setShareToast(`Votre réponse a été transmise à ${userName} !`);
                  setTimeout(() => setShareToast(null), 3500);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#1C1917] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>Envoyer ma réponse</span>
              </button>

              {/* Alternative : Messagerie privée directe */}
              <div className="pt-2 border-t border-stone-200 text-center">
                <p className="text-[11px] text-stone-500 mb-1.5">Ou échanger directement :</p>
                <button
                  type="button"
                  onClick={() => {
                    setIsOfferingHelpModalOpen(false);
                    onNavigate({ type: 'messaging' });
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#1C1917] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>Contacter en messagerie privée</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODALES DE GESTION DU PROPRIÉTAIRE (Mise en vente, Suppression, etc.)    */}
      {/* ========================================================================= */}

      {/* Gérer la mise en vente de parts */}
      {isOwner && isSellingShares && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-editorial text-base font-bold text-[#1C1917]">Mise en vente de parts</h3>
              <button onClick={() => setIsSellingShares(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-700 font-semibold block">Nombre de parts à mettre en vente :</label>
                <input
                  type="number"
                  min={1}
                  max={currentProduction.sharesCount}
                  value={sellCountInput}
                  onChange={(e) => setSellCountInput(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>

              <div>
                <label className="text-stone-700 font-semibold block">Prix de vente unitaire (€) :</label>
                <input
                  type="number"
                  value={sellPriceInput}
                  onChange={(e) => setSellPriceInput(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
                <span className="text-[11px] text-stone-500 pt-0.5 block">Prix conseillé : {currentProduction.recommendedPrice} €</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setProductions(prev => prev.map((p, idx) => idx === shareIndex ? { ...p, sharesOnSale: sellCountInput, salePrice: sellPriceInput } : p));
                  setIsSellingShares(false);
                  setShareToast(`${sellCountInput} part(s) mises en vente sur le Marché.`);
                  setTimeout(() => setShareToast(null), 3000);
                }}
                className="flex-1 py-2.5 bg-[#1C1917] text-white font-bold text-xs rounded-xl"
              >
                Mettre en vente
              </button>
              <button
                onClick={() => {
                  setProductions(prev => prev.map((p, idx) => idx === shareIndex ? { ...p, sharesOnSale: 0 } : p));
                  setIsSellingShares(false);
                  setShareToast("Parts remises en réserve.");
                  setTimeout(() => setShareToast(null), 3000);
                }}
                className="px-3 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl"
              >
                Retirer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation suppression récit */}
      {isOwner && isDeletingRecit && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="font-editorial text-base font-bold text-[#1C1917]">Retirer ce récit ?</h3>
            <p className="text-xs text-stone-600">Cette vidéo de récit personnel ne sera plus visible sur votre profil.</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setRecits(prev => prev.filter((_, idx) => idx !== recitIndex));
                  setRecitIndex(0);
                  setIsDeletingRecit(false);
                  setShareToast("Récit retiré.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl"
              >
                Confirmer
              </button>
              <button onClick={() => setIsDeletingRecit(false)} className="flex-1 py-2.5 bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation suppression épisode */}
      {isOwner && isDeletingEpisode && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="font-editorial text-base font-bold text-[#1C1917]">Retirer cet épisode ?</h3>
            <p className="text-xs text-stone-600">Cet épisode ne sera plus mis en avant sur votre profil.</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEpisodes(prev => prev.filter((_, idx) => idx !== episodeIndex));
                  setEpisodeIndex(0);
                  setIsDeletingEpisode(false);
                  setShareToast("Épisode retiré.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl"
              >
                Confirmer
              </button>
              <button onClick={() => setIsDeletingEpisode(false)} className="flex-1 py-2.5 bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation suppression création */}
      {isOwner && isDeletingCreation && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="font-editorial text-base font-bold text-[#1C1917]">Supprimer cette création ?</h3>
            <p className="text-xs text-stone-600">L'article ou l'atelier sera retiré de vos créations.</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setCreations(prev => prev.filter((_, idx) => idx !== creationIndex));
                  setCreationIndex(0);
                  setIsDeletingCreation(false);
                  setShareToast("Création supprimée.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl"
              >
                Supprimer
              </button>
              <button onClick={() => setIsDeletingCreation(false)} className="flex-1 py-2.5 bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation suppression initiative */}
      {isOwner && isDeletingInitiative && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="font-editorial text-base font-bold text-[#1C1917]">Supprimer cette initiative ?</h3>
            <p className="text-xs text-stone-600">La campagne ne sera plus visible sur votre profil.</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setInitiatives(prev => prev.filter((_, idx) => idx !== initiativeIndex));
                  setInitiativeIndex(0);
                  setIsDeletingInitiative(false);
                  setShareToast("Initiative supprimée.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl"
              >
                Supprimer
              </button>
              <button onClick={() => setIsDeletingInitiative(false)} className="flex-1 py-2.5 bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation suppression appel */}
      {isOwner && isDeletingAppel && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="font-editorial text-base font-bold text-[#1C1917]">Supprimer cet appel ?</h3>
            <p className="text-xs text-stone-600">L'appel à compétences ou matériel sera retiré.</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setAppels(prev => prev.filter((_, idx) => idx !== appelIndex));
                  setAppelIndex(0);
                  setIsDeletingAppel(false);
                  setShareToast("Appel supprimé.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl"
              >
                Supprimer
              </button>
              <button onClick={() => setIsDeletingAppel(false)} className="flex-1 py-2.5 bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODALES D'ÉDITION POUR LE PROPRIÉTAIRE                                 */}
      {/* ========================================================================= */}

      {/* Modifier Récit */}
      {isOwner && editingRecit && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#C89B3C]" />
                <h3 className="font-editorial text-base font-bold text-[#1C1917]">Modifier le récit</h3>
              </div>
              <button onClick={() => setEditingRecit(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-700 font-semibold block">Titre (en haut à gauche) :</label>
                <input
                  type="text"
                  value={recitFormTitle}
                  onChange={(e) => setRecitFormTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>

              <div>
                <label className="text-stone-700 font-semibold block">Sous-titre (en bas) :</label>
                <input
                  type="text"
                  value={recitFormSubtitle}
                  onChange={(e) => setRecitFormSubtitle(e.target.value)}
                  placeholder="Ex: Parcours & transmission"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setRecits(prev => prev.map((r, idx) => idx === recitIndex ? { ...r, title: recitFormTitle, subtitle: recitFormSubtitle } : r));
                  setEditingRecit(null);
                  setShareToast("Récit mis à jour.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 py-2.5 bg-[#1C1917] text-white font-bold text-xs rounded-xl hover:bg-stone-800"
              >
                Enregistrer
              </button>
              <button onClick={() => setEditingRecit(null)} className="flex-1 py-2.5 bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modifier Épisode */}
      {isOwner && editingEpisode && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#C89B3C]" />
                <h3 className="font-editorial text-base font-bold text-[#1C1917]">Modifier l'épisode</h3>
              </div>
              <button onClick={() => setEditingEpisode(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-700 font-semibold block">Durée affichée :</label>
                <input
                  type="text"
                  value={episodeFormDuration}
                  onChange={(e) => setEpisodeFormDuration(e.target.value)}
                  placeholder="Ex: 8 min"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>

              <div>
                <label className="text-stone-700 font-semibold block">Nombre de vues :</label>
                <input
                  type="number"
                  value={episodeFormViews}
                  onChange={(e) => setEpisodeFormViews(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setEpisodes(prev => prev.map((ep, idx) => idx === episodeIndex ? { ...ep, duration: episodeFormDuration, viewsCount: episodeFormViews } : ep));
                  setEditingEpisode(null);
                  setShareToast("Épisode mis à jour.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 py-2.5 bg-[#1C1917] text-white font-bold text-xs rounded-xl hover:bg-stone-800"
              >
                Enregistrer
              </button>
              <button onClick={() => setEditingEpisode(null)} className="flex-1 py-2.5 bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modifier Production (Coproduction / Parts) */}
      {isOwner && editingProduction && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#C89B3C]" />
                <h3 className="font-editorial text-base font-bold text-[#1C1917]">Modifier les parts de production</h3>
              </div>
              <button onClick={() => setEditingProduction(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-stone-700 font-semibold block">Prix de départ (€) :</label>
                  <input
                    type="number"
                    value={prodFormStartPrice}
                    onChange={(e) => setProdFormStartPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                  />
                </div>
                <div>
                  <label className="text-stone-700 font-semibold block">Prix de vente (€) :</label>
                  <input
                    type="number"
                    value={prodFormSalePrice}
                    onChange={(e) => setProdFormSalePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-700 font-semibold block">Indicateur RSI (%) :</label>
                <input
                  type="number"
                  step="0.1"
                  value={prodFormRsi}
                  onChange={(e) => setProdFormRsi(Number(e.target.value))}
                  placeholder="Ex: 57.1"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-stone-700 font-semibold block">Total parts :</label>
                  <input
                    type="number"
                    min={1}
                    value={prodFormSharesCount}
                    onChange={(e) => setProdFormSharesCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                  />
                </div>
                <div>
                  <label className="text-stone-700 font-semibold block">En vente :</label>
                  <input
                    type="number"
                    min={0}
                    max={prodFormSharesCount}
                    value={prodFormSharesOnSale}
                    onChange={(e) => setProdFormSharesOnSale(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setProductions(prev => prev.map((prod, idx) => idx === shareIndex ? { 
                    ...prod, 
                    startPrice: prodFormStartPrice,
                    salePrice: prodFormSalePrice,
                    rsiPercent: prodFormRsi,
                    sharesCount: prodFormSharesCount,
                    sharesOnSale: prodFormSharesOnSale
                  } : prod));
                  setEditingProduction(null);
                  setShareToast("Parts de production mises à jour.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 py-2.5 bg-[#1C1917] text-white font-bold text-xs rounded-xl hover:bg-stone-800"
              >
                Enregistrer
              </button>
              <button onClick={() => setEditingProduction(null)} className="flex-1 py-2.5 bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modifier Création */}
      {isOwner && editingCreation && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#C89B3C]" />
                <h3 className="font-editorial text-base font-bold text-[#1C1917]">Modifier la création</h3>
              </div>
              <button onClick={() => setEditingCreation(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-700 font-semibold block">Titre :</label>
                <input
                  type="text"
                  value={creationFormTitle}
                  onChange={(e) => setCreationFormTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-stone-700 font-semibold block">Prix :</label>
                  <input
                    type="text"
                    value={creationFormPrice}
                    onChange={(e) => setCreationFormPrice(e.target.value)}
                    placeholder="Ex: 85 €"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                  />
                </div>
                <div>
                  <label className="text-stone-700 font-semibold block">Catégorie / Type :</label>
                  <input
                    type="text"
                    value={creationFormCategory}
                    onChange={(e) => setCreationFormCategory(e.target.value)}
                    placeholder="Ex: Tissage d'Art"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-700 font-semibold block">Description :</label>
                <textarea
                  rows={3}
                  value={creationFormDescription}
                  onChange={(e) => setCreationFormDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setCreations(prev => prev.map((cr, idx) => idx === creationIndex ? {
                    ...cr,
                    title: creationFormTitle,
                    price: creationFormPrice,
                    categoryLabel: creationFormCategory,
                    description: creationFormDescription
                  } : cr));
                  setEditingCreation(null);
                  setShareToast("Création mise à jour.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 py-2.5 bg-[#1C1917] text-white font-bold text-xs rounded-xl hover:bg-stone-800"
              >
                Enregistrer
              </button>
              <button onClick={() => setEditingCreation(null)} className="flex-1 py-2.5 bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modifier Initiative */}
      {isOwner && editingInitiative && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#C89B3C]" />
                <h3 className="font-editorial text-base font-bold text-[#1C1917]">Modifier l'initiative</h3>
              </div>
              <button onClick={() => setEditingInitiative(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-700 font-semibold block">Titre de l'initiative :</label>
                <input
                  type="text"
                  value={initiativeFormTitle}
                  onChange={(e) => setInitiativeFormTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>

              <div>
                <label className="text-stone-700 font-semibold block">Objectif (€) :</label>
                <input
                  type="number"
                  value={initiativeFormTarget}
                  onChange={(e) => setInitiativeFormTarget(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>

              <div>
                <label className="text-stone-700 font-semibold block">Description :</label>
                <textarea
                  rows={3}
                  value={initiativeFormDescription}
                  onChange={(e) => setInitiativeFormDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setInitiatives(prev => prev.map((init, idx) => idx === initiativeIndex ? {
                    ...init,
                    title: initiativeFormTitle,
                    targetAmount: initiativeFormTarget,
                    description: initiativeFormDescription
                  } : init));
                  setEditingInitiative(null);
                  setShareToast("Initiative mise à jour.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 py-2.5 bg-[#1C1917] text-white font-bold text-xs rounded-xl hover:bg-stone-800"
              >
                Enregistrer
              </button>
              <button onClick={() => setEditingInitiative(null)} className="flex-1 py-2.5 bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modifier Appel */}
      {isOwner && editingAppel && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#C89B3C]" />
                <h3 className="font-editorial text-base font-bold text-[#1C1917]">Modifier l'appel</h3>
              </div>
              <button onClick={() => setEditingAppel(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-700 font-semibold block">Titre de l'appel :</label>
                <input
                  type="text"
                  value={appelFormTitle}
                  onChange={(e) => setAppelFormTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>

              <div>
                <label className="text-stone-700 font-semibold block">Degré d'urgence :</label>
                <input
                  type="text"
                  value={appelFormUrgency}
                  onChange={(e) => setAppelFormUrgency(e.target.value)}
                  placeholder="Ex: Urgent, Prioritaire"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>

              <div>
                <label className="text-stone-700 font-semibold block">Description :</label>
                <textarea
                  rows={3}
                  value={appelFormDescription}
                  onChange={(e) => setAppelFormDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1 resize-none"
                />
              </div>

              <div>
                <label className="text-stone-700 font-semibold block">Impact visé :</label>
                <input
                  type="text"
                  value={appelFormImpact}
                  onChange={(e) => setAppelFormImpact(e.target.value)}
                  placeholder="Ex: Archiver 25 entretiens"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setAppels(prev => prev.map((app, idx) => idx === appelIndex ? {
                    ...app,
                    title: appelFormTitle,
                    urgency: appelFormUrgency,
                    description: appelFormDescription,
                    impact: appelFormImpact
                  } : app));
                  setEditingAppel(null);
                  setShareToast("Appel mis à jour.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 py-2.5 bg-[#1C1917] text-white font-bold text-xs rounded-xl hover:bg-stone-800"
              >
                Enregistrer
              </button>
              <button onClick={() => setEditingAppel(null)} className="flex-1 py-2.5 bg-stone-100 text-stone-700 font-semibold text-xs rounded-xl">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MODALE DE PARTAGE RÉSEAUX SOCIAUX                                      */}
      {/* ========================================================================= */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#C89B3C]" />
                <h3 className="font-editorial text-base font-bold text-[#1C1917]">Partager le profil</h3>
              </div>
              <button onClick={() => setIsShareModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Faites rayonner le profil de <span className="font-bold text-[#1C1917]">{profileDisplayName}</span> sur vos réseaux :
            </p>

            {/* Réseaux sociaux */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Découvrez le profil de ${profileDisplayName} sur Racines & Horizons : ${window.location.href}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold transition-all"
              >
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">W</span>
                <span>WhatsApp</span>
              </a>

              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Découvrez le profil de ${profileDisplayName} sur Racines & Horizons`)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-900 text-xs font-bold transition-all"
              >
                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">𝕏</span>
                <span>Twitter / X</span>
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold transition-all"
              >
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">f</span>
                <span>Facebook</span>
              </a>

              {/* Telegram */}
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Découvrez le profil de ${profileDisplayName}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold transition-all"
              >
                <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-black">✈</span>
                <span>Telegram</span>
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 flex items-center justify-center gap-2.5 p-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 text-xs font-bold transition-all"
              >
                <span className="w-6 h-6 rounded-full bg-indigo-700 text-white flex items-center justify-center text-xs font-black">in</span>
                <span>Partager sur LinkedIn</span>
              </a>
            </div>

            {/* Bouton Copier le lien */}
            <div className="pt-1">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  setIsShareModalOpen(false);
                  setShareToast("Lien du profil copié dans le presse-papiers !");
                  setTimeout(() => setShareToast(null), 3000);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#1C1917] hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Copy className="w-4 h-4 text-[#C89B3C]" />
                <span>Copier le lien direct</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
