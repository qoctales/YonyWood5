import React, { useState, useRef, useEffect, useMemo } from 'react';
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
  Share,
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
  Users,
  User
} from 'lucide-react';
import { ViewScreen, AffiliationPerson, Protagonist } from '../types';
import { PROTAGONISTS, DOCUMENTARIES } from '../data/mockData';
import { MATRIX_SERIES_DATA } from '../data/matrixData';

export type ProfileCategory = 'recit' | 'production' | 'offre' | 'appel';
export type DimensionTab = ProfileCategory | 'episodes' | 'productions' | 'creations' | 'initiatives' | 'appels';

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

// Sous-composant : En-tête épuré haut de vidéo (Titre à gauche, bouton Partager à droite - Image 2)
interface VideoTopHeaderProps {
  title: string;
  author: string;
  onShare: () => void;
}

const VideoTopHeader: React.FC<VideoTopHeaderProps> = ({ title, author, onShare }) => (
  <div className="relative z-10 flex items-center justify-between gap-3 w-full pr-14">
    <div className="flex items-center min-w-0 pr-1">
      <p className="font-editorial text-xs sm:text-sm font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] truncate tracking-wide">
        {title} <span className="opacity-75 font-normal">— {author}</span>
      </p>
    </div>

    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onShare();
      }}
      id="btn-video-top-share"
      className="w-8.5 h-8.5 rounded-xl bg-white/20 hover:bg-white/35 active:scale-95 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-md transition-all cursor-pointer shrink-0"
      title="Partager"
    >
      <Share className="w-4 h-4 text-white drop-shadow-sm" />
    </button>
  </div>
);

// Sous-composant : Lecteur Timeline moderne (Timestamps + Scrubber corail + Bouton Soundwave - Image 2)
interface VideoModernPlayerBarProps {
  videoCurrentTime: number;
  activeDuration: number;
  progressPercent: number;
  isPlaying: boolean;
  onTogglePlayback: (e: React.MouseEvent) => void;
  onSeek: (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
  formatTime: (sec: number) => string;
}

const VideoModernPlayerBar: React.FC<VideoModernPlayerBarProps> = ({
  videoCurrentTime,
  activeDuration,
  progressPercent,
  isPlaying,
  onTogglePlayback,
  onSeek,
  formatTime,
}) => (
  <div className="pt-1.5 space-y-1.5">
    {/* Timestamps */}
    <div className="flex items-center justify-between text-[11px] font-mono font-medium text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] px-0.5">
      <span>{formatTime(videoCurrentTime)}</span>
      <span>{formatTime(activeDuration)}</span>
    </div>

    {/* Timeline Scrubber cliquable & déplaçable (Style Image 2) */}
    <div 
      onClick={onSeek}
      className="relative w-full h-3 py-1 flex items-center cursor-pointer group"
      title="Avancer / reculer dans la lecture"
    >
      <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-xs">
        <div 
          className="h-full bg-[#E5855E] rounded-full transition-all duration-100"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div 
        className="absolute w-2.5 h-2.5 bg-[#E5855E] border-2 border-white rounded-full shadow-md -translate-x-1/2 transition-transform group-hover:scale-150"
        style={{ left: `${progressPercent}%` }}
      />
    </div>

    {/* Bouton Waveform Audio/Vidéo centré (Style Image 2) */}
    <div className="flex items-center justify-center pt-0.5">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onTogglePlayback(e);
        }}
        id="btn-player-soundwave"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#E5855E] hover:bg-[#DC724B] text-[#1C1917] flex items-center justify-center shadow-[0_6px_20px_rgba(229,133,94,0.55)] cursor-pointer transition-all hover:scale-105 active:scale-95 z-20 shrink-0 border border-white/20"
        title={isPlaying ? 'Mettre en pause' : 'Lancer la lecture'}
      >
        <div className="flex items-center justify-center gap-1">
          <span className={`w-1 bg-[#1C1917] rounded-full transition-all duration-300 ${isPlaying ? 'h-5 animate-[pulse_0.6s_ease-in-out_infinite]' : 'h-3'}`} />
          <span className={`w-1 bg-[#1C1917] rounded-full transition-all duration-300 ${isPlaying ? 'h-7 animate-[pulse_0.8s_ease-in-out_infinite_0.2s]' : 'h-6'}`} />
          <span className={`w-1 bg-[#1C1917] rounded-full transition-all duration-300 ${isPlaying ? 'h-4 animate-[pulse_0.5s_ease-in-out_infinite_0.4s]' : 'h-4'}`} />
          <span className={`w-1 bg-[#1C1917] rounded-full transition-all duration-300 ${isPlaying ? 'h-6 animate-[pulse_0.7s_ease-in-out_infinite_0.1s]' : 'h-5'}`} />
          <span className={`w-1 bg-[#1C1917] rounded-full transition-all duration-300 ${isPlaying ? 'h-3 animate-[pulse_0.6s_ease-in-out_infinite_0.3s]' : 'h-2'}`} />
        </div>
      </button>
    </div>
  </div>
);

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

  const mapInitialCategory = (tab?: string): ProfileCategory => {
    if (!tab) return 'recit';
    if (tab === 'episodes' || tab === 'recit') return 'recit';
    if (tab === 'productions' || tab === 'production') return 'production';
    if (tab === 'creations' || tab === 'offre') return 'offre';
    if (tab === 'initiatives' || tab === 'appels' || tab === 'appel') return 'appel';
    return 'recit';
  };

  // 4 catégories : Récit (récits + épisodes), Production, Offre, Appel (initiatives + appels)
  const [activeCategory, setActiveCategory] = useState<ProfileCategory>(() => mapInitialCategory(initialTab));
  const activeTab = activeCategory;
  const setActiveTab = (tab: DimensionTab) => setActiveCategory(mapInitialCategory(tab));

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
      setProfileEditName(targetProtagonist.name);
      setProfileEditRole(targetProtagonist.role);
      setProfileEditTerritory(`${targetProtagonist.territory || 'Ganvié'}, ${targetProtagonist.country || 'Bénin'}`);
      setProfileEditBio(targetProtagonist.bio);
      setProfileEditPhoto(targetProtagonist.photoUrl);

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
  const [profileEditName, setProfileEditName] = useState<string>(userFullName);
  const [profileEditRole, setProfileEditRole] = useState<string>(userRole);
  const [profileEditTerritory, setProfileEditTerritory] = useState<string>(userTerritory);
  const [profileEditBio, setProfileEditBio] = useState<string>(userBio);
  const [profileEditPhoto, setProfileEditPhoto] = useState<string>(userPhoto);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Indices de navigation par catégorie (chariot horizontal)
  const [categoryIndices, setCategoryIndices] = useState<Record<ProfileCategory, number>>({
    recit: 0,
    production: 0,
    offre: 0,
    appel: 0,
  });
  const [recitIndex, setRecitIndex] = useState<number>(0);
  const [episodeIndex, setEpisodeIndex] = useState<number>(0);
  const [shareIndex, setShareIndex] = useState<number>(0);
  const [creationIndex, setCreationIndex] = useState<number>(0);
  const [initiativeIndex, setInitiativeIndex] = useState<number>(0);
  const [appelIndex, setAppelIndex] = useState<number>(0);

  // 2D Swiping state (Vertical = changer catégorie, Horizontal = changer vidéo)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [swipeOffsetX, setSwipeOffsetX] = useState<number>(0);
  const [swipeOffsetY, setSwipeOffsetY] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const lastWheelTime = useRef<number>(0);

  // Video playback & scrubber (Style Image 2)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
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

  // ---------------------------------------------------------------------------
  // 4 CATÉGORIES DEMANDÉES :
  // 1. Récit : réunit récits personnels et épisodes documentaires
  // 2. Production : parts de coproduction
  // 3. Offre : artisanat, pièces et ateliers
  // 4. Appel : réunit initiatives et appels
  // ---------------------------------------------------------------------------
  type RecitItemUnion = 
    | { kind: 'recit'; item: UserRecitItem }
    | { kind: 'episode'; item: UserEpisodeVideo };

  const recitUnifiedItems: RecitItemUnion[] = React.useMemo(() => {
    const list: RecitItemUnion[] = [];
    recits.forEach((r) => list.push({ kind: 'recit', item: r }));
    episodes.forEach((ep) => list.push({ kind: 'episode', item: ep }));
    return list;
  }, [recits, episodes]);

  const productionItems = productions;
  const offreItems = creations;

  type AppelItemUnion = 
    | { kind: 'initiative'; item: UserInitiativeItem }
    | { kind: 'appel'; item: UserAppelItem };

  const appelUnifiedItems: AppelItemUnion[] = React.useMemo(() => {
    const list: AppelItemUnion[] = [];
    initiatives.forEach((init) => list.push({ kind: 'initiative', item: init }));
    appels.forEach((app) => list.push({ kind: 'appel', item: app }));
    return list;
  }, [initiatives, appels]);

  const CATEGORY_KEYS: ProfileCategory[] = ['recit', 'production', 'offre', 'appel'];

  const CATEGORIES: { key: ProfileCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'recit', label: 'Récits & Épisodes', icon: BookOpen },
    { key: 'production', label: 'Productions', icon: Coins },
    { key: 'offre', label: 'Offre', icon: ShoppingBag },
    { key: 'appel', label: 'Appels & Initiatives', icon: Megaphone },
  ];

  // Calcul du nombre de vidéos de la catégorie active
  const totalItemsInActiveCategory = 
    activeCategory === 'recit' ? recitUnifiedItems.length :
    activeCategory === 'production' ? productionItems.length :
    activeCategory === 'offre' ? offreItems.length :
    appelUnifiedItems.length;

  const currentCategoryRawIndex = categoryIndices[activeCategory] || 0;
  const currentCategorySafeIndex = totalItemsInActiveCategory > 0
    ? ((currentCategoryRawIndex % totalItemsInActiveCategory) + totalItemsInActiveCategory) % totalItemsInActiveCategory
    : 0;

  // Synchroniser la vidéo lors du changement de catégorie ou d'index vidéo
  useEffect(() => {
    setIsPlaying(false);
    setVideoCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [activeCategory, categoryIndices]);

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

  // SWIPE VERTICAL : Passer d'une catégorie à l'autre
  const handleNextCategory = () => {
    setActiveCategory((prev) => {
      const idx = CATEGORY_KEYS.indexOf(prev);
      const nextIdx = (idx + 1) % CATEGORY_KEYS.length;
      return CATEGORY_KEYS[nextIdx];
    });
  };

  const handlePrevCategory = () => {
    setActiveCategory((prev) => {
      const idx = CATEGORY_KEYS.indexOf(prev);
      const prevIdx = (idx - 1 + CATEGORY_KEYS.length) % CATEGORY_KEYS.length;
      return CATEGORY_KEYS[prevIdx];
    });
  };

  const switchCategory = (cat: ProfileCategory) => {
    setActiveCategory(cat);
  };

  // SWIPE HORIZONTAL : Passer de vidéo en vidéo selon la catégorie
  const handleNextVideo = () => {
    if (totalItemsInActiveCategory <= 1) return;
    setCategoryIndices((prev) => ({
      ...prev,
      [activeCategory]: ((prev[activeCategory] || 0) + 1) % totalItemsInActiveCategory,
    }));
  };

  const handlePrevVideo = () => {
    if (totalItemsInActiveCategory <= 1) return;
    setCategoryIndices((prev) => ({
      ...prev,
      [activeCategory]: ((prev[activeCategory] || 0) - 1 + totalItemsInActiveCategory) % totalItemsInActiveCategory,
    }));
  };

  const handlePrev = handlePrevVideo;
  const handleNext = handleNextVideo;

  // Touch Swipe Handlers (2D : Vertical = catégorie, Horizontal = vidéo)
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setSwipeOffsetX(0);
    setSwipeOffsetY(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX;
    const diffY = currentY - touchStartY;

    if (Math.abs(diffY) > Math.abs(diffX)) {
      if (Math.abs(diffY) < 120) {
        setSwipeOffsetY(diffY);
        setSwipeOffsetX(0);
      }
    } else {
      if (Math.abs(diffX) < 120) {
        setSwipeOffsetX(diffX);
        setSwipeOffsetY(0);
      }
    }
  };

  const onTouchEnd = () => {
    const threshold = 35;
    if (Math.abs(swipeOffsetY) > Math.abs(swipeOffsetX) && Math.abs(swipeOffsetY) > threshold) {
      if (swipeOffsetY < -threshold) {
        handleNextCategory();
      } else if (swipeOffsetY > threshold) {
        handlePrevCategory();
      }
    } else if (Math.abs(swipeOffsetX) > threshold) {
      if (swipeOffsetX < -threshold) {
        handleNextVideo();
      } else if (swipeOffsetX > threshold) {
        handlePrevVideo();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
    setSwipeOffsetX(0);
    setSwipeOffsetY(0);
  };

  // Mouse Drag Handlers (2D)
  const onMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setTouchStartX(e.clientX);
    setTouchStartY(e.clientY);
    setSwipeOffsetX(0);
    setSwipeOffsetY(0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || touchStartX === null || touchStartY === null) return;
    const diffX = e.clientX - touchStartX;
    const diffY = e.clientY - touchStartY;

    if (Math.abs(diffY) > Math.abs(diffX)) {
      if (Math.abs(diffY) < 120) {
        setSwipeOffsetY(diffY);
        setSwipeOffsetX(0);
      }
    } else {
      if (Math.abs(diffX) < 120) {
        setSwipeOffsetX(diffX);
        setSwipeOffsetY(0);
      }
    }
  };

  const onMouseUp = () => {
    if (!isMouseDown) return;
    const threshold = 35;
    if (Math.abs(swipeOffsetY) > Math.abs(swipeOffsetX) && Math.abs(swipeOffsetY) > threshold) {
      if (swipeOffsetY < -threshold) {
        handleNextCategory();
      } else if (swipeOffsetY > threshold) {
        handlePrevCategory();
      }
    } else if (Math.abs(swipeOffsetX) > threshold) {
      if (swipeOffsetX < -threshold) {
        handleNextVideo();
      } else if (swipeOffsetX > threshold) {
        handlePrevVideo();
      }
    }
    setIsMouseDown(false);
    setTouchStartX(null);
    setTouchStartY(null);
    setSwipeOffsetX(0);
    setSwipeOffsetY(0);
  };

  // Molette souris : navigation verticale entre catégories
  const onWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 450) return;
    if (Math.abs(e.deltaY) > 30) {
      lastWheelTime.current = now;
      if (e.deltaY > 0) {
        handleNextCategory();
      } else {
        handlePrevCategory();
      }
    }
  };

  // Nom complet affiché pour garantir une stricte cohérence avec l'explorateur
  const profileDisplayName = targetProtagonist 
    ? targetProtagonist.name 
    : (userFullName || userName || 'Amina Traoré');

  // Partager le profil (ouvre la modale des réseaux sociaux + copie de lien)
  const handleShareProfile = () => {
    setIsShareModalOpen(true);
  };

  // Items actifs dans les 4 catégories
  const currentRecitUnified = recitUnifiedItems[currentCategorySafeIndex] || recitUnifiedItems[0];
  const currentProduction = productionItems[currentCategorySafeIndex] || productionItems[0];
  const currentCreation = offreItems[currentCategorySafeIndex] || offreItems[0];
  const currentAppelUnified = appelUnifiedItems[currentCategorySafeIndex] || appelUnifiedItems[0];

  const currentRecit = recits[recitIndex] || recits[0];
  const currentEpisode = episodes[episodeIndex] || episodes[0];
  const currentInitiative = initiatives[initiativeIndex] || initiatives[0];
  const currentAppel = appels[appelIndex] || appels[0];

  // Helper pour raccourcir le titre tout en haut
  const getShortTitle = (title?: string) => {
    if (!title) return '';
    const clean = title.split(/[:–—]/)[0].trim();
    return clean;
  };

  // Résolution du média actif pour le lecteur moderne style Image 2
  const currentMedia = useMemo(() => {
    if (activeCategory === 'recit') {
      const item = currentRecitUnified?.item;
      const title = currentRecitUnified?.kind === 'recit' 
        ? (item?.title || 'Mon chemin')
        : ((item as any)?.seriesTitle || 'Épisode');
      return {
        posterUrl: item?.posterUrl || '/assets/protagonists/amara-tisserande.jpg',
        videoUrl: item?.videoUrl || '',
        title: title,
        durationStr: item?.duration || '03:45',
      };
    }
    if (activeCategory === 'production') {
      return {
        posterUrl: currentProduction?.posterUrl || '/assets/protagonists/koffi-tisserand.jpg',
        videoUrl: currentProduction?.videoUrl || '',
        title: currentProduction?.seriesTitle || 'Production',
        durationStr: currentProduction?.duration || '04:12',
      };
    }
    if (activeCategory === 'offre') {
      return {
        posterUrl: currentCreation?.posterUrl || '/assets/protagonists/fatou-restauratrice.jpg',
        videoUrl: currentCreation?.videoUrl || '',
        title: currentCreation?.title || 'Création',
        durationStr: '02:50',
      };
    }
    const item = currentAppelUnified?.item;
    return {
      posterUrl: item?.posterUrl || '/assets/protagonists/amadou-pecheur.jpg',
      videoUrl: item?.videoUrl || '',
      title: item?.title || 'Appel',
      durationStr: '03:45',
    };
  }, [activeCategory, currentRecitUnified, currentProduction, currentCreation, currentAppelUnified]);

  const parseDurationSeconds = (dur?: string): number => {
    if (!dur) return 225; // 03:45 (comme sur Image 2)
    const parts = dur.split(':').map(p => parseInt(p.trim(), 10));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return parts[0] * 60 + parts[1];
    }
    return 225;
  };

  const activeDuration = (videoDuration && videoDuration > 0) 
    ? videoDuration 
    : parseDurationSeconds(currentMedia.durationStr);

  const progressPercent = activeDuration > 0 
    ? Math.min(100, Math.max(0, (videoCurrentTime / activeDuration) * 100))
    : 0;

  const formatVideoTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTimelineSeek = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clickX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * activeDuration;
    setVideoCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

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
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1C1917] hover:bg-[#C89B3C] text-white flex items-center justify-center shadow-md cursor-pointer transition-colors border-2 border-white"
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
                  className="h-9 px-3.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-xs font-semibold text-[#1C1917] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer relative"
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
                  className="w-9 h-9 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 hover:text-[#1C1917] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                  title="Partager mon profil"
                >
                  <Share2 className="w-4 h-4 text-[#C89B3C]" />
                </button>

                {/* Propriétaire : Icône discrète PARAMÈTRES dans l'en-tête */}
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  id="btn-profile-settings-gear"
                  className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 hover:text-[#1C1917] flex items-center justify-center transition-all shadow-xs cursor-pointer"
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
                  className="h-9 px-4 rounded-full bg-[#1C1917] hover:bg-stone-800 text-xs font-semibold text-white flex items-center gap-2 transition-all shadow-xs cursor-pointer whitespace-nowrap"
                  title={`Envoyer un message à ${userName}`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>Envoyer un message</span>
                </button>

                {/* Visiteur : Bouton Partager */}
                <button
                  onClick={handleShareProfile}
                  id="btn-share-visitor-profile"
                  className="w-9 h-9 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 hover:text-[#1C1917] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                  title={`Partager le profil de ${userName}`}
                >
                  <Share2 className="w-4 h-4 text-[#C89B3C]" />
                </button>
              </>
            )}
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

          {/* CARTE FORMAT 9:16 VERTICAL AVEC GESTION DU SWIPE 2D */}
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onWheel={onWheel}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('button, a, input, textarea, select')) return;
              toggleVideoPlayback();
            }}
            className="w-full max-w-[320px] sm:max-w-[360px] aspect-[9/16] transition-transform duration-150 ease-out select-none cursor-pointer relative rounded-3xl overflow-hidden shadow-2xl border border-stone-800 bg-stone-950 outline-none focus:outline-none ring-0"
            style={{ transform: `translate(${swipeOffsetX}px, ${swipeOffsetY}px)` }}
          >
            {/* ================================================================= */}
            {/* 4 ICÔNES FLOTTANTES SUR LE CÔTÉ DROIT DE LA VIDÉO (STYLE IMAGE 1) */}
            {/* Sans capsule ni barre de fond noire, flottant directement sur     */}
            {/* l'image avec ombre portée. Active en jaune avec repère vertical.  */}
            {/* ================================================================= */}
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-5 pointer-events-auto">
              {CATEGORIES.map(({ key, label, icon: IconComponent }) => {
                const isActive = activeCategory === key;
                return (
                  <div key={key} className="relative flex items-center justify-center">
                    <button
                      key={key}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        switchCategory(key);
                      }}
                      id={`btn-profile-cat-${key}`}
                      title={label}
                      className="p-1 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 group"
                    >
                      <IconComponent
                        className={`w-6 h-6 transition-all duration-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] ${
                          isActive
                            ? 'text-[#FACC15] scale-110 stroke-[2.3]'
                            : 'text-white/80 hover:text-white hover:scale-110 stroke-[1.8]'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Indication visuelle discrète au centre quand la vidéo est en pause */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white/90 shadow-xl">
                  <Play className="w-6 h-6 fill-white text-white translate-x-0.5 opacity-90" />
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* CATÉGORIE 1 : RÉCIT (Récits personnels & Épisodes réunis)         */}
            {/* ================================================================= */}
            {activeCategory === 'recit' && currentRecitUnified && (
              <div 
                className="group relative w-full h-full flex flex-col justify-between p-5 text-white"
                id={`card-recit-${currentRecitUnified.item.id}`}
              >
                <img
                  src={currentRecitUnified.item.posterUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <video
                  ref={videoRef}
                  src={currentRecitUnified.item.videoUrl}
                  loop
                  muted
                  playsInline
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    if (!isScrubbing) {
                      setVideoCurrentTime(v.currentTime);
                    }
                  }}
                  onLoadedMetadata={(e) => {
                    const v = e.currentTarget;
                    if (v.duration && !isNaN(v.duration) && isFinite(v.duration)) {
                      setVideoDuration(v.duration);
                    }
                  }}
                  onEnded={() => setIsPlaying(false)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                    isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

                {/* HAUT : Titre à gauche (sans capsule) & Bouton Partager à droite (Style Image 2) */}
                <VideoTopHeader 
                  title={getShortTitle(currentRecitUnified.kind === 'recit' ? currentRecitUnified.item.title : currentRecitUnified.item.seriesTitle) || 'Récit personnel'}
                  author={profileDisplayName}
                  onShare={handleShareProfile}
                />

                <div className="my-auto" />

                {/* BAS : Titre, durée/vues, actions & lecteur moderne (Style Image 2) */}
                <div className="relative z-10 space-y-2.5 pr-14">
                  <div>
                    <h3 className="font-editorial text-sm sm:text-base font-bold text-white leading-snug line-clamp-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                      {currentRecitUnified.kind === 'recit'
                        ? (currentRecitUnified.item.subtitle || currentRecitUnified.item.chapter || currentRecitUnified.item.title)
                        : currentRecitUnified.item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-white/80 mt-1 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      <span>{currentRecitUnified.item.duration}</span>
                      <span>•</span>
                      <span>{currentRecitUnified.item.viewsCount?.toLocaleString()} vues</span>
                    </div>
                  </div>

                  {isOwner && (
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentRecitUnified.kind === 'recit') {
                            setEditingRecit(currentRecitUnified.item);
                            setRecitFormTitle(currentRecitUnified.item.title);
                            setRecitFormSubtitle(currentRecitUnified.item.subtitle || '');
                          } else {
                            setEditingEpisode(currentRecitUnified.item);
                            setEpisodeFormDuration(currentRecitUnified.item.duration);
                            setEpisodeFormViews(currentRecitUnified.item.viewsCount);
                          }
                        }}
                        className="h-8.5 px-3 rounded-xl bg-white hover:bg-stone-100 text-[#1C1917] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] border border-stone-200/50"
                        id="btn-edit-recit-unified"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#C89B3C]" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentRecitUnified.kind === 'recit') {
                            setEditingRecit(currentRecitUnified.item);
                            setIsDeletingRecit(true);
                          } else {
                            setEditingEpisode(currentRecitUnified.item);
                            setIsDeletingEpisode(true);
                          }
                        }}
                        className="h-8.5 px-3 rounded-xl bg-black/65 hover:bg-red-600/90 border border-white/20 hover:border-red-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] backdrop-blur-sm"
                        id="btn-delete-recit-unified"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        <span>Retirer</span>
                      </button>
                    </div>
                  )}

                  {/* Lecteur moderne Image 2 */}
                  <VideoModernPlayerBar 
                    videoCurrentTime={videoCurrentTime}
                    activeDuration={activeDuration}
                    progressPercent={progressPercent}
                    isPlaying={isPlaying}
                    onTogglePlayback={toggleVideoPlayback}
                    onSeek={handleTimelineSeek}
                    formatTime={formatVideoTime}
                  />
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* CATÉGORIE 2 : PRODUCTION (Parts de coproduction)                  */}
            {/* ================================================================= */}
            {activeCategory === 'production' && currentProduction && (
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
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    if (!isScrubbing) {
                      setVideoCurrentTime(v.currentTime);
                    }
                  }}
                  onLoadedMetadata={(e) => {
                    const v = e.currentTarget;
                    if (v.duration && !isNaN(v.duration) && isFinite(v.duration)) {
                      setVideoDuration(v.duration);
                    }
                  }}
                  onEnded={() => setIsPlaying(false)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                    isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

                {/* HAUT : Titre à gauche & Bouton Partager à droite (Style Image 2) */}
                <VideoTopHeader 
                  title={currentProduction.seriesTitle}
                  author={profileDisplayName}
                  onShare={handleShareProfile}
                />

                <div className="my-auto" />

                {/* BAS : Détails coproduction, actions & lecteur moderne (Style Image 2) */}
                <div className="relative z-10 space-y-2.5 pr-14">
                  <div>
                    <h3 className="font-editorial text-sm sm:text-base font-bold text-white leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                      {currentProduction.seriesTitle}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-white/90 mt-1 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      <span>{currentProduction.sharesCount} parts</span>
                      <span>•</span>
                      <span>Valeur : {currentProduction.currentValue}</span>
                    </div>
                  </div>

                  {isOwner ? (
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProduction(currentProduction);
                          setProdFormStartPrice(currentProduction.startPrice);
                          setProdFormSalePrice(currentProduction.salePrice || currentProduction.startPrice);
                          setProdFormRsi(currentProduction.rsiPercent);
                          setProdFormSharesCount(currentProduction.sharesCount);
                          setProdFormSharesOnSale(currentProduction.sharesOnSale);
                        }}
                        className="h-8.5 px-3 rounded-xl bg-white hover:bg-stone-100 text-[#1C1917] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] border border-stone-200/50"
                        id="btn-edit-production"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#C89B3C]" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSellCountInput(currentProduction.sharesOnSale || 1);
                          setSellPriceInput(currentProduction.salePrice || currentProduction.recommendedPrice);
                          setIsSellingShares(true);
                        }}
                        className="h-8.5 px-3 rounded-xl bg-black/65 hover:bg-stone-800 border border-white/20 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] backdrop-blur-sm"
                        id="btn-sell-production"
                      >
                        <Coins className="w-3.5 h-3.5 text-[#FACC15]" />
                        <span>Vendre</span>
                      </button>
                    </div>
                  ) : (
                    <div className="pt-0.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsBuyingSharesModalOpen(true);
                        }}
                        className="w-full h-9 px-4 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#1C1917] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                        id="btn-buy-shares"
                      >
                        <Coins className="w-4 h-4 text-[#1C1917]" />
                        <span>Acheter des parts</span>
                      </button>
                    </div>
                  )}

                  {/* Lecteur moderne Image 2 */}
                  <VideoModernPlayerBar 
                    videoCurrentTime={videoCurrentTime}
                    activeDuration={activeDuration}
                    progressPercent={progressPercent}
                    isPlaying={isPlaying}
                    onTogglePlayback={toggleVideoPlayback}
                    onSeek={handleTimelineSeek}
                    formatTime={formatVideoTime}
                  />
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* CATÉGORIE 3 : OFFRE (Artisanat, Pièces, Ateliers)                 */}
            {/* ================================================================= */}
            {activeCategory === 'offre' && currentCreation && (
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
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    if (!isScrubbing) {
                      setVideoCurrentTime(v.currentTime);
                    }
                  }}
                  onLoadedMetadata={(e) => {
                    const v = e.currentTarget;
                    if (v.duration && !isNaN(v.duration) && isFinite(v.duration)) {
                      setVideoDuration(v.duration);
                    }
                  }}
                  onEnded={() => setIsPlaying(false)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                    isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

                {/* HAUT : Titre à gauche & Bouton Partager à droite (Style Image 2) */}
                <VideoTopHeader 
                  title={currentCreation.title}
                  author={profileDisplayName}
                  onShare={handleShareProfile}
                />

                <div className="my-auto" />

                {/* BAS : Titre court, catégorie, prix, actions & lecteur moderne (Style Image 2) */}
                <div className="relative z-10 space-y-2.5 pr-14">
                  <div>
                    <div className="text-[11px] font-medium text-[#FACC15] uppercase tracking-wider drop-shadow-sm">
                      {currentCreation.categoryLabel || 'Offre & Savoir-faire'}
                    </div>
                    <h3 className="font-editorial text-sm sm:text-base font-bold text-white leading-snug line-clamp-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mt-0.5" title={currentCreation.title}>
                      {currentCreation.title}
                    </h3>
                    <p className="font-mono text-base font-bold text-[#FACC15] pt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      {currentCreation.price}
                    </p>
                  </div>

                  {isOwner ? (
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
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
                        className="h-8.5 px-3 rounded-xl bg-white hover:bg-stone-100 text-[#1C1917] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] border border-stone-200/50"
                        id="btn-edit-creation"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#C89B3C]" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDeletingCreation(true);
                        }}
                        className="h-8.5 px-3 rounded-xl bg-black/65 hover:bg-red-600/90 border border-white/20 hover:border-red-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] backdrop-blur-sm"
                        id="btn-delete-creation"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  ) : (
                    <div className="pt-0.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOrderActionType('commander');
                          setIsOrderingCreationModalOpen(true);
                        }}
                        className="w-full h-9 px-4 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#1C1917] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                        id="btn-order-creation"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#1C1917]" />
                        <span>Commander</span>
                      </button>
                    </div>
                  )}

                  {/* Lecteur moderne Image 2 */}
                  <VideoModernPlayerBar 
                    videoCurrentTime={videoCurrentTime}
                    activeDuration={activeDuration}
                    progressPercent={progressPercent}
                    isPlaying={isPlaying}
                    onTogglePlayback={toggleVideoPlayback}
                    onSeek={handleTimelineSeek}
                    formatTime={formatVideoTime}
                  />
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* CATÉGORIE 4 : APPEL (Initiatives & Appels réunis)                 */}
            {/* ================================================================= */}
            {activeCategory === 'appel' && currentAppelUnified && (
              <div 
                className="group relative w-full h-full flex flex-col justify-between p-5 text-white"
                id={`card-appel-${currentAppelUnified.item.id}`}
              >
                <img
                  src={currentAppelUnified.item.posterUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <video
                  ref={videoRef}
                  src={currentAppelUnified.item.videoUrl}
                  loop
                  muted
                  playsInline
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    if (!isScrubbing) {
                      setVideoCurrentTime(v.currentTime);
                    }
                  }}
                  onLoadedMetadata={(e) => {
                    const v = e.currentTarget;
                    if (v.duration && !isNaN(v.duration) && isFinite(v.duration)) {
                      setVideoDuration(v.duration);
                    }
                  }}
                  onEnded={() => setIsPlaying(false)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                    isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

                {/* HAUT : Badge & Titre à gauche, bouton Partager à droite (Style Image 2) */}
                <div className="relative z-10 flex items-center justify-between gap-3 w-full pr-14">
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <p className="font-editorial text-xs sm:text-sm font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] truncate tracking-wide">
                      {currentAppelUnified.kind === 'initiative' ? 'Initiative' : 'Appel'} <span className="opacity-75 font-normal">— {profileDisplayName}</span>
                    </p>
                    <span className="px-2 py-0.5 rounded-md bg-[#FACC15]/20 border border-[#FACC15]/40 text-[#FACC15] font-mono text-[10px] font-bold shrink-0">
                      {currentAppelUnified.kind === 'initiative' 
                        ? `${Math.round((currentAppelUnified.item.collectedAmount / currentAppelUnified.item.targetAmount) * 100)}%`
                        : (currentAppelUnified.item.urgency || 'Urgent')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareProfile();
                    }}
                    id="btn-video-top-share"
                    className="w-8.5 h-8.5 rounded-xl bg-white/20 hover:bg-white/35 active:scale-95 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-md transition-all cursor-pointer shrink-0"
                    title="Partager"
                  >
                    <Share className="w-4 h-4 text-white drop-shadow-sm" />
                  </button>
                </div>

                <div className="my-auto" />

                {/* BAS : Détails & Actions selon Initiative ou Appel */}
                <div className="relative z-10 space-y-2.5 pr-14">
                  {currentAppelUnified.kind === 'initiative' ? (
                    <>
                      <div>
                        <h3 className="font-editorial text-sm sm:text-base font-bold text-white leading-snug line-clamp-2" title={currentAppelUnified.item.title}>
                          {currentAppelUnified.item.title}
                        </h3>
                      </div>

                      <div className="space-y-1.5 p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-white/80">Obj : {currentAppelUnified.item.targetAmount.toLocaleString()} €</span>
                          <span className="font-mono text-[#FACC15] font-bold">{currentAppelUnified.item.collectedAmount.toLocaleString()} € récoltés</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#FACC15] to-emerald-400 rounded-full"
                            style={{ width: `${Math.min(100, (currentAppelUnified.item.collectedAmount / currentAppelUnified.item.targetAmount) * 100)}%` }}
                          />
                        </div>
                      </div>

                      {isOwner ? (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingInitiative(currentAppelUnified.item);
                              setInitiativeFormTitle(currentAppelUnified.item.title);
                              setInitiativeFormTarget(currentAppelUnified.item.targetAmount);
                              setInitiativeFormDescription(currentAppelUnified.item.description);
                              setInitiativeFormPoster(currentAppelUnified.item.posterUrl);
                              setInitiativeFormVideo(currentAppelUnified.item.videoUrl);
                            }}
                            className="h-9 px-3 rounded-xl bg-white hover:bg-stone-100 text-[#1C1917] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] border border-stone-200/50"
                            id="btn-edit-initiative"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#C89B3C]" />
                            <span>Modifier</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingInitiative(currentAppelUnified.item);
                              setIsDeletingInitiative(true);
                            }}
                            className="h-9 px-3 rounded-xl bg-black/65 hover:bg-red-600/90 border border-white/20 hover:border-red-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] backdrop-blur-sm"
                            id="btn-delete-initiative"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      ) : (
                        <div className="pt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setInitiativeActionType('contribuer');
                              setIsContributingModalOpen(true);
                            }}
                            className="w-full h-10 px-4 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#1C1917] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                            id="btn-contribute-initiative"
                          >
                            <Users className="w-4 h-4 text-[#1C1917]" />
                            <span>Contribuer</span>
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div>
                        <h3 className="font-editorial text-sm sm:text-base font-bold text-white leading-snug line-clamp-2" title={currentAppelUnified.item.title}>
                          {currentAppelUnified.item.title}
                        </h3>
                      </div>

                      {isOwner ? (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingAppel(currentAppelUnified.item);
                              setAppelFormTitle(currentAppelUnified.item.title);
                              setAppelFormUrgency(currentAppelUnified.item.urgency);
                              setAppelFormDescription(currentAppelUnified.item.description);
                              setAppelFormImpact(currentAppelUnified.item.impact || '');
                            }}
                            className="h-9 px-3 rounded-xl bg-white hover:bg-stone-100 text-[#1C1917] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] border border-stone-200/50"
                            id="btn-edit-appel"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#C89B3C]" />
                            <span>Modifier</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingAppel(currentAppelUnified.item);
                              setIsDeletingAppel(true);
                            }}
                            className="h-9 px-3 rounded-xl bg-black/65 hover:bg-red-600/90 border border-white/20 hover:border-red-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] backdrop-blur-sm"
                            id="btn-delete-appel"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      ) : (
                        <div className="pt-0.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsOfferingHelpModalOpen(true);
                            }}
                            className="w-full h-9 px-4 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#1C1917] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                            id="btn-reply-appel"
                          >
                            <Megaphone className="w-4 h-4 text-[#1C1917]" />
                            <span>Répondre à cet appel</span>
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Lecteur moderne Image 2 */}
                  <VideoModernPlayerBar 
                    videoCurrentTime={videoCurrentTime}
                    activeDuration={activeDuration}
                    progressPercent={progressPercent}
                    isPlaying={isPlaying}
                    onTogglePlayback={toggleVideoPlayback}
                    onSeek={handleTimelineSeek}
                    formatTime={formatVideoTime}
                  />
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

        {/* Navigation Indicator (Points pour la catégorie active) & Boutons de navigation sous la vidéo */}
        <div className="flex items-center justify-between max-w-[340px] mx-auto pt-2 pb-1 px-2">
          <div className="flex items-center gap-1.5">
            {totalItemsInActiveCategory > 1 && Array.from({ length: totalItemsInActiveCategory }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setCategoryIndices(prev => ({ ...prev, [activeCategory]: i }));
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentCategorySafeIndex
                    ? 'w-6 bg-[#E5855E]'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                title={`Aller à la vidéo ${i + 1}`}
              />
            ))}
            <span className="text-[11px] font-bold text-stone-500 ml-2 font-mono">
              {currentCategorySafeIndex + 1} / {totalItemsInActiveCategory}
            </span>
          </div>

          {/* Boutons Précédent / Suivant sous la vidéo (conservés et accessibles) */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrevVideo}
              disabled={totalItemsInActiveCategory <= 1}
              className="h-7 px-2.5 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title="Vidéo précédente"
              id="btn-nav-prev-under-video"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Préc.</span>
            </button>
            <button
              type="button"
              onClick={handleNextVideo}
              disabled={totalItemsInActiveCategory <= 1}
              className="h-7 px-2.5 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title="Vidéo suivante"
              id="btn-nav-next-under-video"
            >
              <span>Suiv.</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Aide visuelle intuitive */}
        <div className="flex items-center justify-center text-center px-4 pt-1">
          <p className="text-[11px] text-stone-500 font-medium">
            <span className="text-[#C89B3C] font-semibold">↕ Swipe vertical</span> : changer de catégorie •{' '}
            <span className="text-[#C89B3C] font-semibold">↔ Swipe horizontal</span> : changer de vidéo
          </p>
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
                  className="flex-1 px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#C89B3C]"
                />
                <button
                  onClick={() => {
                    setShareToast("Adresse email enregistrée.");
                    setTimeout(() => setShareToast(null), 2500);
                  }}
                  className="h-10 px-4 bg-[#1C1917] hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer active:scale-[0.98]"
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
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#C89B3C]"
              />
              <button
                type="submit"
                className="w-full h-10 bg-white hover:bg-stone-100 text-[#1C1917] border border-stone-300 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer active:scale-[0.98]"
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
                className="w-full h-11 px-4 rounded-xl border border-red-200 bg-red-50/50 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
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
              className="w-full h-11 px-4 rounded-xl bg-[#C89B3C] hover:bg-[#B78A2E] text-[#1C1917] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer active:scale-[0.98]"
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
              className="w-full h-11 px-4 rounded-xl bg-[#C89B3C] hover:bg-[#B78A2E] text-[#1C1917] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer active:scale-[0.98]"
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
              className="w-full h-11 px-4 rounded-xl bg-[#C89B3C] hover:bg-[#B78A2E] text-[#1C1917] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer active:scale-[0.98]"
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
                className="w-full h-11 px-4 rounded-xl bg-[#1C1917] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
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
                  className="w-full h-10 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#1C1917] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] border border-stone-200/60"
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

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setProductions(prev => prev.map((p, idx) => idx === shareIndex ? { ...p, sharesOnSale: sellCountInput, salePrice: sellPriceInput } : p));
                  setIsSellingShares(false);
                  setShareToast(`${sellCountInput} part(s) mises en vente sur le Marché.`);
                  setTimeout(() => setShareToast(null), 3000);
                }}
                className="flex-1 h-11 bg-[#1C1917] hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center"
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
                className="px-4 h-11 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200/60 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
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
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setRecits(prev => prev.filter((_, idx) => idx !== recitIndex));
                  setRecitIndex(0);
                  setIsDeletingRecit(false);
                  setShareToast("Récit retiré.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                Confirmer
              </button>
              <button 
                onClick={() => setIsDeletingRecit(false)} 
                className="flex-1 h-11 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200/60 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
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
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setEpisodes(prev => prev.filter((_, idx) => idx !== episodeIndex));
                  setEpisodeIndex(0);
                  setIsDeletingEpisode(false);
                  setShareToast("Épisode retiré.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                Confirmer
              </button>
              <button 
                onClick={() => setIsDeletingEpisode(false)} 
                className="flex-1 h-11 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200/60 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
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
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setCreations(prev => prev.filter((_, idx) => idx !== creationIndex));
                  setCreationIndex(0);
                  setIsDeletingCreation(false);
                  setShareToast("Création supprimée.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                Supprimer
              </button>
              <button 
                onClick={() => setIsDeletingCreation(false)} 
                className="flex-1 h-11 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200/60 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
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
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setInitiatives(prev => prev.filter((_, idx) => idx !== initiativeIndex));
                  setInitiativeIndex(0);
                  setIsDeletingInitiative(false);
                  setShareToast("Initiative supprimée.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                Supprimer
              </button>
              <button 
                onClick={() => setIsDeletingInitiative(false)} 
                className="flex-1 h-11 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200/60 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
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
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setAppels(prev => prev.filter((_, idx) => idx !== appelIndex));
                  setAppelIndex(0);
                  setIsDeletingAppel(false);
                  setShareToast("Appel supprimé.");
                  setTimeout(() => setShareToast(null), 2500);
                }}
                className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                Supprimer
              </button>
              <button 
                onClick={() => setIsDeletingAppel(false)} 
                className="flex-1 h-11 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200/60 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
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
                className="flex-1 h-11 bg-[#1C1917] hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                Enregistrer
              </button>
              <button 
                onClick={() => setEditingRecit(null)} 
                className="flex-1 h-11 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200/60 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
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
                className="flex-1 h-11 bg-[#1C1917] hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                Enregistrer
              </button>
              <button 
                onClick={() => setEditingEpisode(null)} 
                className="flex-1 h-11 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200/60 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
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
                className="flex-1 h-11 bg-[#1C1917] hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                Enregistrer
              </button>
              <button 
                onClick={() => setEditingProduction(null)} 
                className="flex-1 h-11 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200/60 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
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
                className="flex-1 h-11 bg-[#1C1917] hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                Enregistrer
              </button>
              <button 
                onClick={() => setEditingCreation(null)} 
                className="flex-1 h-11 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200/60 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
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
                className="flex-1 h-11 bg-[#1C1917] hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                Enregistrer
              </button>
              <button 
                onClick={() => setEditingInitiative(null)} 
                className="flex-1 h-11 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200/60 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
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
                className="flex-1 h-11 bg-[#1C1917] hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                Enregistrer
              </button>
              <button 
                onClick={() => setEditingAppel(null)} 
                className="flex-1 h-11 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200/60 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
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
                className="w-full h-11 px-4 rounded-xl bg-[#1C1917] hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-[0.98]"
              >
                <Copy className="w-4 h-4 text-[#C89B3C]" />
                <span>Copier le lien direct</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. MODALE D'ÉDITION DU PROFIL (Identité & Présentation)                   */}
      {/* ========================================================================= */}
      {isOwner && isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#C89B3C]" />
                <h3 className="font-editorial text-base font-bold text-[#1C1917]">Modifier mon profil</h3>
              </div>
              <button 
                onClick={() => setIsEditingProfile(false)} 
                className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-700 font-semibold block">Nom affiché :</label>
                <input
                  type="text"
                  value={profileEditName}
                  onChange={(e) => setProfileEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>

              <div>
                <label className="text-stone-700 font-semibold block">Titre / Rôle :</label>
                <input
                  type="text"
                  value={profileEditRole}
                  onChange={(e) => setProfileEditRole(e.target.value)}
                  placeholder="Ex: Tisserande & Passeuse de mémoires"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>

              <div>
                <label className="text-stone-700 font-semibold block">Territoire / Ville, Pays :</label>
                <input
                  type="text"
                  value={profileEditTerritory}
                  onChange={(e) => setProfileEditTerritory(e.target.value)}
                  placeholder="Ex: Ganvié, Bénin"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1"
                />
              </div>

              <div>
                <label className="text-stone-700 font-semibold block">Biographie / Présentation :</label>
                <textarea
                  rows={3}
                  value={profileEditBio}
                  onChange={(e) => setProfileEditBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 mt-1 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setUserName(profileEditName);
                  setUserFullName(profileEditName);
                  setUserRole(profileEditRole);
                  setUserTerritory(profileEditTerritory);
                  setUserBio(profileEditBio);
                  setIsEditingProfile(false);
                  setShareToast("Profil mis à jour avec succès.");
                  setTimeout(() => setShareToast(null), 3000);
                }}
                className="flex-1 h-11 bg-[#1C1917] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                Enregistrer
              </button>
              <button 
                onClick={() => setIsEditingProfile(false)} 
                className="flex-1 h-11 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl border border-stone-200/60 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
