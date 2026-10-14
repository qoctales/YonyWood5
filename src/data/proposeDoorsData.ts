import React from 'react';
import { DimensionIcon } from '../components/DimensionIcon';
import { DIMENSIONS, getSubcategoriesForDimension } from './dimensionsData';

export interface ProposeSubject {
  id: string;
  title: string;
  subtitle: string;
  question?: string;
  synopsis?: string;
  videoUrl: string;
  posterUrl: string;
  actionLabel: string;
  doorId?: string;
  iconName?: string;
  covers?: string[];
  accentColor?: string;
  glowColor?: string;
  bgGradient?: string;
  badge?: string;
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

const STOCK_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
];

// Les 8 séries documentaires fondatrices
const SERIES_SUBJECTS: ProposeSubject[] = [
  {
    id: 'jesus-legba',
    title: 'Èṣù < > Jésus',
    subtitle: 'Deux traditions spirituelles. Une même question de foi face aux épreuves.',
    synopsis: 'Mise en miroir des deux spiritualités chrétienne et vodun face aux tourments du destin. Deux protagonistes sur deux continents explorent la transcendance, la mort, le pardon et la rédemption au-delà des dogmes.',
    question: 'Comment votre foi ou votre rapport au sacré vous aide-t-il à traverser le deuil ou l’épreuve ?',
    videoUrl: STOCK_VIDEOS[0],
    posterUrl: '/assets/posters/Esu < > Jesus.png',
    actionLabel: 'Choisir cette série',
    doorId: 'series',
    iconName: '16-series/jesus-legba',
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.65)',
    bgGradient: 'from-amber-600 via-orange-700 to-stone-900'
  },
  {
    id: 'finagnon-qosqorico',
    title: 'Finagnon < > Qosqorico',
    subtitle: 'Bénin < > Pérou. Pêcheurs toffinou et paysans quechuas reliés à la terre.',
    synopsis: 'Des cités lacustres de Ganvié aux terrasses sacrées des Andes péruviennes. Le dialogue sensible entre deux gardiens de l’eau et de la Pachamama qui protègent la mémoire vitale de leurs communautés.',
    question: 'Quel est votre lien intime avec la terre ou l’eau qui nourrit votre communauté ?',
    videoUrl: STOCK_VIDEOS[1],
    posterUrl: '/assets/posters/Finagnon < > Qosqorico.png',
    actionLabel: 'Choisir cette série',
    doorId: 'series',
    iconName: '16-series/finagnon-qosqorico',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.65)',
    bgGradient: 'from-emerald-600 via-teal-700 to-stone-900'
  },
  {
    id: 'blacks-one-beyond-eve',
    title: 'Blacks One < > Beyond Eve',
    subtitle: 'Deux expériences collectives. L’identité, le hip-hop et la souveraineté intime.',
    synopsis: 'Entre banlieues parisiennes et scènes urbaines de Cotonou, deux collectifs de créateurs transforment les blessures en poésie et le hip-hop en levier de dignité et d’autonomie pour la jeunesse.',
    question: 'Quelle voix singulière et quel message d’émancipation souhaitez-vous transmettre à la jeunesse ?',
    videoUrl: STOCK_VIDEOS[2],
    posterUrl: '/assets/posters/Blacks One < > Beyond Eve.png',
    actionLabel: 'Choisir cette série',
    doorId: 'series',
    iconName: '16-series/blacks-one-beyond-eve',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.65)',
    bgGradient: 'from-pink-600 via-rose-700 to-stone-900'
  },
  {
    id: 'dixeat-fiat-luxe',
    title: 'E Vivi < > Fiat Luxe',
    subtitle: 'Artisans du goût et haute scénographie d’exception au service du détail.',
    synopsis: 'L’artisanat d’art et la haute gastronomie vus de l’intérieur. La rencontre de deux orfèvres du détail qui consacrent leur existence à la patience de la matière et à l’hospitalité sublime.',
    question: 'Quelle est la noblesse et le sens profond caché dans le geste de votre métier ?',
    videoUrl: STOCK_VIDEOS[3],
    posterUrl: '/assets/posters/E Vivi < > Fiat Luxe.png',
    actionLabel: 'Choisir cette série',
    doorId: 'series',
    iconName: '16-series/dixeat-fiat-luxe',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.65)',
    bgGradient: 'from-amber-500 via-yellow-700 to-stone-900'
  },
  {
    id: 'investors-builders',
    title: 'Investors < > Builders',
    subtitle: 'Ceux qui financent le futur < > ceux qui bâtissent le réel.',
    synopsis: 'La confrontation constructive entre visionnaires du capital et bâtisseurs de terrain. Comment aligner la souveraineté économique, le courage d’entreprendre et l’impact écologique concret.',
    question: 'Comment concilier la vision économique d’avenir et l’impact réel sur le terrain ?',
    videoUrl: STOCK_VIDEOS[0],
    posterUrl: '/assets/posters/Investors < > Builders.png',
    actionLabel: 'Choisir cette série',
    doorId: 'series',
    iconName: '16-series/investors-builders',
    accentColor: '#0284C7',
    glowColor: 'rgba(2, 132, 199, 0.65)',
    bgGradient: 'from-sky-600 via-blue-800 to-stone-900'
  },
  {
    id: 'other-eyes-sixth-sense',
    title: 'Other eyes < > Sixth sense',
    subtitle: 'L’écoute vibratoire et la clairvoyance transcendent les limites du visible.',
    synopsis: 'Le dialogue sensible entre non-voyants d’exception et médiums de Ouidah. Percevoir les énergies subtiles, les présences et les mémoires des lieux au-delà du visible.',
    question: 'Comment percevez-vous les dimensions subtiles qui échappent aux yeux ordinaires ?',
    videoUrl: STOCK_VIDEOS[1],
    posterUrl: '/assets/posters/Other eyes < > Sixth sense.png',
    actionLabel: 'Choisir cette série',
    doorId: 'series',
    iconName: '16-series/other-eyes-sixth-sense',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.65)',
    bgGradient: 'from-purple-600 via-indigo-800 to-stone-900'
  },
  {
    id: 'coaching-unlimited',
    title: 'Coaching < > Unlimited',
    subtitle: 'L’exigence du mentor dans son bureau < > l’envol d’un athlète sur les haies.',
    synopsis: 'Dans le silence stratégique d’un bureau où s’élabore la transformation intérieure et sur la piste rouge où une athlète franchit la haie : briser les limites de l’impossible.',
    question: 'Quelle limite que vous croyiez infranchissable avez-vous réussi à briser grâce à l’exigence intérieure ?',
    videoUrl: STOCK_VIDEOS[2],
    posterUrl: '/assets/posters/Coaching < > Unlimited.png',
    actionLabel: 'Choisir cette série',
    doorId: 'series',
    iconName: '16-series/coaching-unlimited',
    accentColor: '#EA580C',
    glowColor: 'rgba(234, 88, 12, 0.65)',
    bgGradient: 'from-orange-600 via-red-700 to-stone-900'
  },
  {
    id: 'focus-phd',
    title: 'Focus < >  PhD',
    subtitle: 'Le regard sensible qui capte l’instant < > la rigueur de la recherche qui sonde l’universel.',
    synopsis: 'Entre l’œil aiguisé d’une photographe traquant la vérité humaine et la quête méthodique d’une chercheuse doctorante : deux manières complémentaires d’éclairer le monde.',
    question: 'Quel a été ce moment précis où votre travail a fait surgir une vérité qui a transformé votre regard ?',
    videoUrl: STOCK_VIDEOS[3],
    posterUrl: '/assets/posters/Focus < >  PhD.jpg',
    actionLabel: 'Choisir cette série',
    doorId: 'series',
    iconName: '16-series/focus-phd',
    accentColor: '#B45309',
    glowColor: 'rgba(180, 83, 9, 0.65)',
    bgGradient: 'from-amber-600 via-orange-700 to-stone-900'
  }
];

// Helper pour créer l'icône dynamique d'une porte
function createDoorIcon(iconeName: string): React.FC<{ className?: string }> {
  const IconComponent: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => 
    React.createElement(DimensionIcon, {
      name: iconeName,
      className,
      size: 18,
      strokeWidth: 1.8
    });
  IconComponent.displayName = `DoorIcon_${iconeName}`;
  return IconComponent;
}

// Construction des 16 portes officielles
export const PROPOSE_DOORS: ProposeDoor[] = DIMENSIONS.map((dim, idx) => {
  if (dim.id === 'series') {
    return {
      id: 'series',
      label: 'Séries',
      icon: createDoorIcon('16-series/_dimension'),
      tagline: 'Racontez votre histoire face à un alter ego d’un autre continent.',
      videoUrl: STOCK_VIDEOS[0],
      posterUrl: '/assets/doors/door-series.jpg',
      actionDoorLabel: 'Choisir cette porte',
      advantages: [
        'Dialogue face-à-face avec un alter ego d’un autre continent.',
        'Raconter votre histoire intime face aux grandes épreuves humaines.',
        'Mise en miroir de traditions et de spiritualités d’égal à égal.',
        'Réalisation cinématographique 9:16 soignée par Yonywood.',
        'Diffusion pérenne au cœur des séries fondatrices de la plateforme.'
      ],
      subjects: SERIES_SUBJECTS
    };
  }

  const subcats = getSubcategoriesForDimension(dim.id);
  const subjects: ProposeSubject[] = subcats.map((sc, sIdx) => ({
    id: sc.slug,
    title: sc.label,
    subtitle: sc.tagline || `${dim.label} · ${sc.label}`,
    synopsis: sc.description || `Témoignage face caméra explorant la dimension ${dim.label} à travers le prisme de ${sc.label}.`,
    question: sc.question || `Quelle histoire singulière souhaitez-vous partager sur le thème de « ${sc.label} » ?`,
    videoUrl: STOCK_VIDEOS[sIdx % STOCK_VIDEOS.length],
    posterUrl: sc.photoUrl || dim.coverImage,
    actionLabel: `Choisir ce sujet`,
    doorId: dim.id,
    iconName: sc.icone,
    accentColor: sc.accentColor || dim.accentColor,
    glowColor: sc.glowColor || dim.glowColor,
    bgGradient: sc.bgGradient || dim.bgGradient,
    badge: sc.badge
  }));

  return {
    id: dim.id,
    label: dim.label,
    icon: createDoorIcon(dim.icone),
    tagline: dim.tagline,
    videoUrl: STOCK_VIDEOS[idx % STOCK_VIDEOS.length],
    posterUrl: dim.coverImage,
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      `Diffusion officielle dans la dimension « ${dim.label} » de l'astrolabe.`,
      `Récit court 9:16 face caméra centré sur la transmission et la vérité du vécu.`,
      `Valorisation pérenne de votre mémoire et de votre expérience vécue.`,
      `Référencement parmi les témoins clés cooptés par la communauté.`,
      `Accompagnement par les cinéastes de la communauté Yonywood.`
    ],
    subjects
  };
});

export function getDoorById(id: string): ProposeDoor | undefined {
  return PROPOSE_DOORS.find(d => d.id === id);
}

export function getSubjectByDoorAndId(doorId: string, subjectId: string): ProposeSubject | undefined {
  const door = getDoorById(doorId);
  if (!door) return undefined;
  return door.subjects.find(s => s.id === subjectId);
}
