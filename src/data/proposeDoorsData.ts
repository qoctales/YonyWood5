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
import { NOMENCLATURE } from './nomenclature';

export interface ProposeSubject {
  id: string;
  title: string;
  subtitle: string;
  question?: string;
  synopsis?: string;
  videoUrl: string;
  posterUrl: string;
  actionLabel: string;
  // Métadonnées Nomenclature v1.0
  doorId?: string;
  origin?: string;
  group?: string;
  angle?: string;
  family?: string;
  covers?: string[];
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

export const PROPOSE_DOORS: ProposeDoor[] = [
  // PORTE 0 : SÉRIES FONDATRICES
  {
    id: 'series',
    label: 'Séries',
    icon: Film,
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
    subjects: [
      {
        id: 'jesus-legba',
        title: 'Èṣù < > Jésus',
        subtitle: 'Deux traditions spirituelles. Une même question de foi face aux épreuves.',
        synopsis: 'Mise en miroir des deux spiritualités chrétienne et vodun face aux tourments du destin. Deux protagonistes sur deux continents explorent la transcendance, la mort, le pardon et la rédemption au-delà des dogmes.',
        question: 'Comment votre foi ou votre rapport au sacré vous aide-t-il à traverser le deuil ou l’épreuve ?',
        videoUrl: STOCK_VIDEOS[0],
        posterUrl: '/assets/posters/Esu < > Jesus.png',
        actionLabel: 'Choisir cette série'
      },
      {
        id: 'finagnon-qosqorico',
        title: 'Finagnon < > Qosqorico',
        subtitle: 'Bénin < > Pérou. Pêcheurs toffinou et paysans quechuas reliés à la terre.',
        synopsis: 'Des cités lacustres de Ganvié aux terrasses sacrées des Andes péruviennes. Le dialogue sensible entre deux gardiens de l’eau et de la Pachamama qui protègent la mémoire vitale de leurs communautés.',
        question: 'Quel est votre lien intime avec la terre ou l’eau qui nourrit votre communauté ?',
        videoUrl: STOCK_VIDEOS[1],
        posterUrl: '/assets/posters/Finagnon < > Qosqorico.png',
        actionLabel: 'Choisir cette série'
      },
      {
        id: 'blacks-one-beyond-eve',
        title: 'Blacks One < > Beyond Eve',
        subtitle: 'Deux expériences collectives. L’identité, le hip-hop et la souveraineté intime.',
        synopsis: 'Entre banlieues parisiennes et scènes urbaines de Cotonou, deux collectifs de créateurs transforment les blessures en poésie et le hip-hop en levier de dignité et d’autonomie pour la jeunesse.',
        question: 'Quelle voix singulière et quel message d’émancipation souhaitez-vous transmettre à la jeunesse ?',
        videoUrl: STOCK_VIDEOS[2],
        posterUrl: '/assets/posters/Blacks One < > Beyond Eve.png',
        actionLabel: 'Choisir cette série'
      },
      {
        id: 'dixeat-fiat-luxe',
        title: 'E Vivi < > Fiat Luxe',
        subtitle: 'Artisans du goût et haute scénographie d’exception au service du détail.',
        synopsis: 'L’artisanat d’art et la haute gastronomie vus de l’intérieur. La rencontre de deux orfèvres du détail qui consacrent leur existence à la patience de la matière et à l’hospitalité sublime.',
        question: 'Quelle est la noblesse et le sens profond caché dans le geste de votre métier ?',
        videoUrl: STOCK_VIDEOS[3],
        posterUrl: '/assets/posters/E Vivi < > Fiat Luxe.png',
        actionLabel: 'Choisir cette série'
      },
      {
        id: 'investors-builders',
        title: 'Investors < > Builders',
        subtitle: 'Ceux qui financent le futur < > ceux qui bâtissent le réel.',
        synopsis: 'La confrontation constructive entre visionnaires du capital et bâtisseurs de terrain. Comment aligner la souveraineté économique, le courage d’entreprendre et l’impact écologique concret.',
        question: 'Comment concilier la vision économique d’avenir et l’impact réel sur le terrain ?',
        videoUrl: STOCK_VIDEOS[0],
        posterUrl: '/assets/posters/Investors < > Builders.png',
        actionLabel: 'Choisir cette série'
      },
      {
        id: 'other-eyes-sixth-sense',
        title: 'Other eyes < > Sixth sense',
        subtitle: 'L’écoute vibratoire et la clairvoyance transcendent les limites du visible.',
        synopsis: 'Le dialogue sensible entre non-voyants d’exception et médiums de Ouidah. Percevoir les énergies subtiles, les présences et les mémoires des lieux au-delà du visible.',
        question: 'Comment percevez-vous les dimensions subtiles qui échappent aux yeux ordinaires ?',
        videoUrl: STOCK_VIDEOS[1],
        posterUrl: '/assets/posters/Other eyes < > Sixth sense.png',
        actionLabel: 'Choisir cette série'
      },
      {
        id: 'coaching-unlimited',
        title: 'Coaching < > Unlimited',
        subtitle: 'L’exigence du mentor dans son bureau < > l’envol d’un athlète sur les haies.',
        synopsis: 'Dans le silence stratégique d’un bureau où s’élabore la transformation intérieure et sur la piste rouge où une athlète franchit la haie : briser les limites de l’impossible.',
        question: 'Quelle limite que vous croyiez infranchissable avez-vous réussi à briser grâce à l’exigence intérieure ?',
        videoUrl: STOCK_VIDEOS[2],
        posterUrl: '/assets/posters/Coaching < > Unlimited.png',
        actionLabel: 'Choisir cette série'
      },
      {
        id: 'safer-healer',
        title: 'Safer < > Healer',
        subtitle: 'La bravoure des sauveteurs de la cité < > le dévouement et l’art du soin des médecins.',
        synopsis: 'Entre le courage intrépide d’une pompière face aux flammes et le dévouement méthodique d’une femme médecin en hôpital : veiller sur la vie d’autrui.',
        question: 'Quel sacrifice personnel avez-vous consenti pour continuer à veiller sur des inconnus ?',
        videoUrl: STOCK_VIDEOS[3],
        posterUrl: '/assets/posters/Safer < > Healer.png',
        actionLabel: 'Choisir cette série'
      }
    ]
  },

  // PORTE 1 : SAGESSES (anciennement Mémoires - 16 sagesses universelles)
  {
    id: 'sagesses',
    label: 'Sagesses',
    icon: Atom,
    tagline: '16 thématiques de vie, universelles. Chaque témoin répond à une question face caméra.',
    videoUrl: STOCK_VIDEOS[3],
    posterUrl: '/assets/doors/door-sagesses.jpg',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Témoigner avec authenticité face caméra sur une question existentielle majeure.',
      'Partager les enseignements intimes reçus des épreuves et des victoires.',
      'Mettre en dialogue les sagesses ancestrales et les défis d’aujourd’hui.',
      'S’exprimer dans un espace respectueux, propice à l’écoute profonde.',
      'Rejoindre une bibliothèque vivante de sagesses universelles.'
    ],
    subjects: [
      {
            "id": "ego",
            "title": "Ego",
            "subtitle": "Famille : Se vaincre",
            "question": "Quand avez-vous dû vous effacer pour grandir ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Ego » (Se vaincre). Question : « Quand avez-vous dû vous effacer pour grandir ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "se-vaincre"
      },
      {
            "id": "courage",
            "title": "Courage",
            "subtitle": "Famille : Se vaincre",
            "question": "Quelle peur avez-vous traversée ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Courage » (Se vaincre). Question : « Quelle peur avez-vous traversée ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "se-vaincre"
      },
      {
            "id": "lacher-prise",
            "title": "Lâcher-prise",
            "subtitle": "Famille : Se vaincre",
            "question": "Qu'avez-vous accepté de ne pas contrôler ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Lâcher-prise » (Se vaincre). Question : « Qu'avez-vous accepté de ne pas contrôler ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "se-vaincre"
      },
      {
            "id": "recommencer",
            "title": "Recommencer",
            "subtitle": "Famille : Se vaincre",
            "question": "Comment avez-vous pu renaître après un échec ou une rupture ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Recommencer » (Se vaincre). Question : « Comment avez-vous pu renaître après un échec ou une rupture ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "se-vaincre"
      },
      {
            "id": "pardon",
            "title": "Pardon",
            "subtitle": "Famille : Se relier",
            "question": "Qui avez-vous pardonné, et qu'est-ce que cela a changé ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Pardon » (Se relier). Question : « Qui avez-vous pardonné, et qu'est-ce que cela a changé ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "se-relier"
      },
      {
            "id": "amour",
            "title": "Amour",
            "subtitle": "Famille : Se relier",
            "question": "Qu'est-ce qui reste quand tout part ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Amour » (Se relier). Question : « Qu'est-ce qui reste quand tout part ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "se-relier"
      },
      {
            "id": "fraternite",
            "title": "Fraternité",
            "subtitle": "Famille : Se relier",
            "question": "Quel inconnu est devenu un frère ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Fraternité » (Se relier). Question : « Quel inconnu est devenu un frère ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "se-relier"
      },
      {
            "id": "transmission",
            "title": "Transmission",
            "subtitle": "Famille : Se relier",
            "question": "Qu'avez-vous reçu d'un ancien qui ne s'achète pas ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Transmission » (Se relier). Question : « Qu'avez-vous reçu d'un ancien qui ne s'achète pas ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "se-relier"
      },
      {
            "id": "foi",
            "title": "Foi",
            "subtitle": "Famille : S’élever",
            "question": "Qu'est-ce qui vous a tenu quand rien d'autre ne tenait ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Foi » (S’élever). Question : « Qu'est-ce qui vous a tenu quand rien d'autre ne tenait ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "s-elever"
      },
      {
            "id": "silence",
            "title": "Silence",
            "subtitle": "Famille : S’élever",
            "question": "Où trouvez-vous le calme ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Silence » (S’élever). Question : « Où trouvez-vous le calme ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "s-elever"
      },
      {
            "id": "gratitude",
            "title": "Gratitude",
            "subtitle": "Famille : S’élever",
            "question": "De quoi êtes-vous profondément reconnaissant ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Gratitude » (S’élever). Question : « De quoi êtes-vous profondément reconnaissant ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "s-elever"
      },
      {
            "id": "joie",
            "title": "Joie",
            "subtitle": "Famille : S’élever",
            "question": "D'où vient la joie malgré le manque ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Joie » (S’élever). Question : « D'où vient la joie malgré le manque ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "s-elever"
      },
      {
            "id": "resilience",
            "title": "Résilience",
            "subtitle": "Famille : Tenir debout",
            "question": "Comment êtes-vous resté debout dans l'épreuve ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Résilience » (Tenir debout). Question : « Comment êtes-vous resté debout dans l'épreuve ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "tenir-debout"
      },
      {
            "id": "deuil",
            "title": "Deuil",
            "subtitle": "Famille : Tenir debout",
            "question": "Qu'avez-vous appris en perdant ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Deuil » (Tenir debout). Question : « Qu'avez-vous appris en perdant ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "tenir-debout"
      },
      {
            "id": "dignite",
            "title": "Dignité",
            "subtitle": "Famille : Tenir debout",
            "question": "Quand avez-vous dit non, au risque de tout perdre ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Dignité » (Tenir debout). Question : « Quand avez-vous dit non, au risque de tout perdre ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "tenir-debout"
      },
      {
            "id": "vocation",
            "title": "Vocation",
            "subtitle": "Famille : Tenir debout",
            "question": "À quel moment avez-vous su pourquoi vous étiez là ?",
            "synopsis": "Témoignage face caméra sur la sagesse « Vocation » (Tenir debout). Question : « À quel moment avez-vous su pourquoi vous étiez là ? »",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette sagesse",
            "doorId": "sagesses",
            "family": "tenir-debout"
      }
]
  },

  // PORTE 2 : TERRITOIRES (16 pays pivots)
  {
    id: 'territoires',
    label: 'Territoires',
    icon: Mountain,
    tagline: '16 pays pivots : berceaux africains, diaspora, résonances.',
    videoUrl: STOCK_VIDEOS[1],
    posterUrl: '/assets/doors/door-territoires.jpg',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Mettre en lumière les sanctuaires, terroirs et traditions de votre pays.',
      'Transmettre l’histoire locale racontée par ses propres enfants.',
      'Créer des ponts vivants avec la diaspora et les voyageurs en quête de sens.',
      'Archiver la beauté de vos paysages en format cinématographique 9:16.',
      'Valoriser l’hospitalité et la force tellurique de votre terroir.'
    ],
    subjects: [
      {
            "id": "benin",
            "title": "Bénin",
            "subtitle": "Berceau africain 🇧🇯",
            "question": "Quelle tradition ou force tellurique de Bénin a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans Bénin. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "afrique"
      },
      {
            "id": "senegal",
            "title": "Sénégal",
            "subtitle": "Berceau africain 🇸🇳",
            "question": "Quelle tradition ou force tellurique de Sénégal a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans Sénégal. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "afrique"
      },
      {
            "id": "cote-d-ivoire",
            "title": "Côte d'Ivoire",
            "subtitle": "Berceau africain 🇨🇮",
            "question": "Quelle tradition ou force tellurique de Côte d'Ivoire a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans Côte d'Ivoire. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "afrique"
      },
      {
            "id": "ghana",
            "title": "Ghana",
            "subtitle": "Berceau africain 🇬🇭",
            "question": "Quelle tradition ou force tellurique de Ghana a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans Ghana. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "afrique"
      },
      {
            "id": "nigeria",
            "title": "Nigeria",
            "subtitle": "Berceau africain 🇳🇬",
            "question": "Quelle tradition ou force tellurique de Nigeria a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans Nigeria. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "afrique"
      },
      {
            "id": "rdc",
            "title": "RDC",
            "subtitle": "Berceau africain 🇨🇩",
            "question": "Quelle tradition ou force tellurique de RDC a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans RDC. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "afrique"
      },
      {
            "id": "ethiopie",
            "title": "Éthiopie",
            "subtitle": "Berceau africain 🇪🇹",
            "question": "Quelle tradition ou force tellurique de Éthiopie a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans Éthiopie. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "afrique"
      },
      {
            "id": "afrique-du-sud",
            "title": "Afrique du Sud",
            "subtitle": "Berceau africain 🇿🇦",
            "question": "Quelle tradition ou force tellurique de Afrique du Sud a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans Afrique du Sud. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "afrique"
      },
      {
            "id": "haiti",
            "title": "Haïti",
            "subtitle": "Diaspora 🇭🇹",
            "question": "Quelle tradition ou force tellurique de Haïti a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans Haïti. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "diaspora"
      },
      {
            "id": "bresil",
            "title": "Brésil",
            "subtitle": "Diaspora 🇧🇷",
            "question": "Quelle tradition ou force tellurique de Brésil a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans Brésil. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "diaspora"
      },
      {
            "id": "cuba",
            "title": "Cuba",
            "subtitle": "Diaspora 🇨🇺",
            "question": "Quelle tradition ou force tellurique de Cuba a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans Cuba. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1500759285222-a95626b934cb?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "diaspora"
      },
      {
            "id": "etats-unis",
            "title": "États-Unis",
            "subtitle": "Diaspora 🇺🇸",
            "question": "Quelle tradition ou force tellurique de États-Unis a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans États-Unis. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "diaspora"
      },
      {
            "id": "france",
            "title": "France",
            "subtitle": "Diaspora 🇫🇷",
            "question": "Quelle tradition ou force tellurique de France a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans France. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "diaspora"
      },
      {
            "id": "perou",
            "title": "Pérou",
            "subtitle": "Résonance universelle 🇵🇪",
            "question": "Quelle tradition ou force tellurique de Pérou a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans Pérou. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "resonances"
      },
      {
            "id": "japon",
            "title": "Japon",
            "subtitle": "Résonance universelle 🇯🇵",
            "question": "Quelle tradition ou force tellurique de Japon a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans Japon. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "resonances"
      },
      {
            "id": "inde",
            "title": "Inde",
            "subtitle": "Résonance universelle 🇮🇳",
            "question": "Quelle tradition ou force tellurique de Inde a profondément forgé votre regard sur le monde ?",
            "synopsis": "Récit territorial enraciné dans Inde. Découverte des savoirs, paysages et communautés locales.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce territoire",
            "doorId": "territoires",
            "group": "resonances"
      }
]
  },

  // PORTE 3 : EXPERTISES (16 savoir-faire d'excellence)
  {
    id: 'expertises',
    label: 'Expertises',
    icon: GraduationCap,
    tagline: '16 savoir-faire. Des praticiens viennent pitcher leur métier en vidéo.',
    videoUrl: STOCK_VIDEOS[4],
    posterUrl: '/assets/doors/door-competences.jpg',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Inspirer des vocations authentiques auprès des jeunes générations.',
      'Valoriser la noblesse du geste et la technicité des métiers manuels et créatifs.',
      'Faciliter la rencontre entre talents de terrain et mentors d’expérience.',
      'Montrer la réalité d’un métier sans artifice ni filtre trompeur.',
      'Renforcer la transmission intergénérationnelle des savoir-faire d’excellence.'
    ],
    subjects: [
      {
            "id": "videastes",
            "title": "Vidéastes",
            "subtitle": "réalisation • cadrage • documentaire",
            "question": "Quel regard ou parti pris visuel singulier insufflez-vous dans chacune de vos créations documentaires ?",
            "synopsis": "Pitch vidéo du métier de praticien : Vidéastes (réalisation, cadrage, documentaire, direction photo).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "réalisation",
                  "cadrage",
                  "documentaire",
                  "direction photo"
            ]
      },
      {
            "id": "photographes",
            "title": "Photographes",
            "subtitle": "portrait • plateau • reportage",
            "question": "Comment parvenez-vous à capturer l'âme et la vérité d'un visage en un instant décisif ?",
            "synopsis": "Pitch vidéo du métier de praticien : Photographes (portrait, reportage, lumière, photo de plateau).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "portrait",
                  "reportage",
                  "lumière",
                  "photo de plateau"
            ]
      },
      {
            "id": "juristes",
            "title": "Avocats & Juristes",
            "subtitle": "droit d’auteur • contrats • propriété intellectuelle",
            "question": "Comment protégez-vous la valeur et la liberté des créateurs face aux évolutions du droit ?",
            "synopsis": "Pitch vidéo du métier de praticien : Avocats & Juristes (propriété intellectuelle, droit d'auteur, contrats, droit des affaires).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "propriété intellectuelle",
                  "droit d'auteur",
                  "contrats",
                  "droit des affaires"
            ]
      },
      {
            "id": "comptables",
            "title": "Comptables",
            "subtitle": "finance • gestion • fiscalité",
            "question": "Comment transformez-vous la rigueur des chiffres en un puissant levier de souveraineté pour les projets ?",
            "synopsis": "Pitch vidéo du métier de praticien : Comptables (finance, fiscalité, gestion de production, audit).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "finance",
                  "fiscalité",
                  "gestion de production",
                  "audit"
            ]
      },
      {
            "id": "artisans",
            "title": "Artisans d'Art",
            "subtitle": "matières nobles • façonnage • savoir-faire manuel",
            "question": "Quel geste ancestral ou secret de la matière guide vos mains lors de chaque création ?",
            "synopsis": "Pitch vidéo du métier de praticien : Artisans d'Art (ébénisterie, céramique, textile, cuir, métal).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "ébénisterie",
                  "céramique",
                  "textile",
                  "cuir",
                  "métal"
            ]
      },
      {
            "id": "developpeurs",
            "title": "Développeurs Tech",
            "subtitle": "code • plateformes • architecture logicielle",
            "question": "Comment concevez-vous des technologies qui relient véritablement les humains au lieu de les isoler ?",
            "synopsis": "Pitch vidéo du métier de praticien : Développeurs Tech (applications, plateformes web, architecture, data).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "applications",
                  "plateformes web",
                  "architecture",
                  "data"
            ]
      },
      {
            "id": "designers",
            "title": "Designers",
            "subtitle": "direction artistique • UI/UX • identité visuelle",
            "question": "À quel moment une forme visuelle devient-elle une évidence émotionnelle pour son public ?",
            "synopsis": "Pitch vidéo du métier de praticien : Designers (direction artistique, UI/UX, typographie, scénographie).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "direction artistique",
                  "UI/UX",
                  "typographie",
                  "scénographie"
            ]
      },
      {
            "id": "son-musique",
            "title": "Ingénieurs du Son",
            "subtitle": "prise de son • mixage • musique",
            "question": "Comment sculptez-vous l'espace sonore pour toucher directement le cœur de celui qui écoute ?",
            "synopsis": "Pitch vidéo du métier de praticien : Ingénieurs du Son (prise de son, mixage, sound design, musique originale).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "prise de son",
                  "mixage",
                  "sound design",
                  "musique originale"
            ]
      },
      {
            "id": "monteurs",
            "title": "Monteurs",
            "subtitle": "rythme • montage • étalonnage",
            "question": "Comment trouvez-vous le tempo invisible qui donne toute sa résonance à une histoire filmée ?",
            "synopsis": "Pitch vidéo du métier de praticien : Monteurs (montage vidéo, étalonnage, post-production, motion design).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "montage vidéo",
                  "étalonnage",
                  "post-production",
                  "motion design"
            ]
      },
      {
            "id": "producteurs",
            "title": "Producteurs",
            "subtitle": "financement • direction de projet • impact",
            "question": "Comment mobilisez-vous les énergies et les ressources pour faire éclore des œuvres audacieuses ?",
            "synopsis": "Pitch vidéo du métier de praticien : Producteurs (financement, coordination, distribution, coproduction).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "financement",
                  "coordination",
                  "distribution",
                  "coproduction"
            ]
      },
      {
            "id": "auteurs",
            "title": "Scénaristes & Plumes",
            "subtitle": "storytelling • narration • dramaturgie",
            "question": "Quel mot ou quel silence permet selon vous de faire basculer un récit vers l’universel ?",
            "synopsis": "Pitch vidéo du métier de praticien : Scénaristes & Plumes (scénario, dramaturgie, écriture documentaire, storytelling).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "scénario",
                  "dramaturgie",
                  "écriture documentaire",
                  "storytelling"
            ]
      },
      {
            "id": "communicants",
            "title": "Communicants",
            "subtitle": "relations presse • influence • médias",
            "question": "Comment portez-vous une voix authentique pour qu'elle résonne bien au-delà de sa communauté ?",
            "synopsis": "Pitch vidéo du métier de praticien : Communicants (stratégie média, relations presse, médias sociaux, brand content).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "stratégie média",
                  "relations presse",
                  "médias sociaux",
                  "brand content"
            ]
      },
      {
            "id": "architectes",
            "title": "Architectes",
            "subtitle": "espaces • éco-construction • habitat",
            "question": "Comment bâtissez-vous des lieux qui respectent la terre et élèvent l’esprit de ceux qui y vivent ?",
            "synopsis": "Pitch vidéo du métier de praticien : Architectes (éco-construction, architecture bioclimatique, aménagement, matériaux durables).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "éco-construction",
                  "architecture bioclimatique",
                  "aménagement",
                  "matériaux durables"
            ]
      },
      {
            "id": "chefs-cuisine",
            "title": "Chefs Cuisiniers",
            "subtitle": "gastronomie • terroirs • goûts d’exception",
            "question": "Quelle mémoire de saveur ou de générosité insufflez-vous dans votre assiette ?",
            "synopsis": "Pitch vidéo du métier de praticien : Chefs Cuisiniers (art culinaire, fermentations, terroirs, hospitalité).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "art culinaire",
                  "fermentations",
                  "terroirs",
                  "hospitalité"
            ]
      },
      {
            "id": "soignants",
            "title": "Soignants",
            "subtitle": "santé • thérapies • soins somatiques",
            "question": "Quel secret de présence ou d’écoute permet selon vous d’enclencher la guérison profonde ?",
            "synopsis": "Pitch vidéo du métier de praticien : Soignants (médecine, soins somatiques, ostéopathie, santé intégrative).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "médecine",
                  "soins somatiques",
                  "ostéopathie",
                  "santé intégrative"
            ]
      },
      {
            "id": "coachs",
            "title": "Coachs & Mentors",
            "subtitle": "préparation mentale • voix • accompagnement",
            "question": "Comment révélez-vous chez un individu le courage d'assumer pleinement sa singularité ?",
            "synopsis": "Pitch vidéo du métier de praticien : Coachs & Mentors (coaching de dirigeants, préparation mentale, voix, transmission).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette expertise",
            "doorId": "expertises",
            "covers": [
                  "coaching de dirigeants",
                  "préparation mentale",
                  "voix",
                  "transmission"
            ]
      }
]
  },

  // PORTE 4 : PERSONNALITÉS (16 figures noires inspirantes)
  {
    id: 'personnalites',
    label: 'Personnalités',
    icon: Star,
    tagline: '16 figures noires. Des témoins viennent raconter ce que cette figure a changé dans leur vie ou leur art.',
    videoUrl: STOCK_VIDEOS[2],
    posterUrl: '/assets/doors/door-personnalites.jpg',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Témoigner de l’impact direct d’une grande figure sur votre parcours personnel.',
      'Célébrer la grandeur de nos icônes à travers le regard de témoins vivants.',
      'Dépasser les clichés pour révéler la vulnérabilité et l’éthique de la figure.',
      'Faire dialoguer créateurs africains et voix de la diaspora mondiale.',
      'Inscrire vos réflexions dans un panthéon vivant de la culture noire universelle.'
    ],
    subjects: [
      {
            "id": "mandela",
            "title": "Nelson Mandela",
            "subtitle": "Afrique du Sud • Angle : Le pardon et la dignité",
            "question": "En quoi l'héritage de Nelson Mandela et son combat pour « Le pardon et la dignité » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Nelson Mandela (Afrique du Sud). Thématique centrale : Le pardon et la dignité.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "Afrique du Sud",
            "group": "afrique",
            "angle": "Le pardon et la dignité"
      },
      {
            "id": "sankara",
            "title": "Thomas Sankara",
            "subtitle": "Burkina Faso • Angle : L'intégrité, vivre de ce qu'on produit",
            "question": "En quoi l'héritage de Thomas Sankara et son combat pour « L'intégrité, vivre de ce qu'on produit » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Thomas Sankara (Burkina Faso). Thématique centrale : L'intégrité, vivre de ce qu'on produit.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "Burkina Faso",
            "group": "afrique",
            "angle": "L'intégrité, vivre de ce qu'on produit"
      },
      {
            "id": "sagbohan",
            "title": "Danialou Sagbohan",
            "subtitle": "Bénin • Angle : Les rythmes vodoun et la langue fon",
            "question": "En quoi l'héritage de Danialou Sagbohan et son combat pour « Les rythmes vodoun et la langue fon » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Danialou Sagbohan (Bénin). Thématique centrale : Les rythmes vodoun et la langue fon.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "Bénin",
            "group": "afrique",
            "angle": "Les rythmes vodoun et la langue fon"
      },
      {
            "id": "kidjo",
            "title": "Angélique Kidjo",
            "subtitle": "Bénin • Angle : La voix béninoise qui porte le monde",
            "question": "En quoi l'héritage de Angélique Kidjo et son combat pour « La voix béninoise qui porte le monde » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Angélique Kidjo (Bénin). Thématique centrale : La voix béninoise qui porte le monde.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "Bénin",
            "group": "afrique",
            "angle": "La voix béninoise qui porte le monde"
      },
      {
            "id": "hampate-ba",
            "title": "Amadou Hampâté Bâ",
            "subtitle": "Mali • Angle : La parole des anciens",
            "question": "En quoi l'héritage de Amadou Hampâté Bâ et son combat pour « La parole des anciens » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Amadou Hampâté Bâ (Mali). Thématique centrale : La parole des anciens.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "Mali",
            "group": "afrique",
            "angle": "La parole des anciens"
      },
      {
            "id": "fela-kuti",
            "title": "Fela Kuti",
            "subtitle": "Nigeria • Angle : La musique comme arme de libération",
            "question": "En quoi l'héritage de Fela Kuti et son combat pour « La musique comme arme de libération » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Fela Kuti (Nigeria). Thématique centrale : La musique comme arme de libération.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "Nigeria",
            "group": "afrique",
            "angle": "La musique comme arme de libération"
      },
      {
            "id": "makeba",
            "title": "Miriam Makeba",
            "subtitle": "Afrique du Sud • Angle : Chanter son peuple même en exil",
            "question": "En quoi l'héritage de Miriam Makeba et son combat pour « Chanter son peuple même en exil » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Miriam Makeba (Afrique du Sud). Thématique centrale : Chanter son peuple même en exil.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "Afrique du Sud",
            "group": "afrique",
            "angle": "Chanter son peuple même en exil"
      },
      {
            "id": "maathai",
            "title": "Wangari Maathai",
            "subtitle": "Kenya • Angle : La révolution par l'arbre",
            "question": "En quoi l'héritage de Wangari Maathai et son combat pour « La révolution par l'arbre » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Wangari Maathai (Kenya). Thématique centrale : La révolution par l'arbre.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "Kenya",
            "group": "afrique",
            "angle": "La révolution par l'arbre"
      },
      {
            "id": "marley",
            "title": "Bob Marley",
            "subtitle": "Jamaïque • Angle : La foi et l'unité",
            "question": "En quoi l'héritage de Bob Marley et son combat pour « La foi et l'unité » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Bob Marley (Jamaïque). Thématique centrale : La foi et l'unité.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "Jamaïque",
            "group": "diaspora",
            "angle": "La foi et l'unité"
      },
      {
            "id": "ali",
            "title": "Muhammad Ali",
            "subtitle": "États-Unis • Angle : Le courage et la fierté",
            "question": "En quoi l'héritage de Muhammad Ali et son combat pour « Le courage et la fierté » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Muhammad Ali (États-Unis). Thématique centrale : Le courage et la fierté.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "États-Unis",
            "group": "diaspora",
            "angle": "Le courage et la fierté"
      },
      {
            "id": "jackson",
            "title": "Michael Jackson",
            "subtitle": "États-Unis • Angle : Le dépassement par le travail et le mouvement",
            "question": "En quoi l'héritage de Michael Jackson et son combat pour « Le dépassement par le travail et le mouvement » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Michael Jackson (États-Unis). Thématique centrale : Le dépassement par le travail et le mouvement.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "États-Unis",
            "group": "diaspora",
            "angle": "Le dépassement par le travail et le mouvement"
      },
      {
            "id": "cesaire",
            "title": "Aimé Césaire",
            "subtitle": "Martinique • Angle : La fierté originelle et le verbe qui redresse",
            "question": "En quoi l'héritage de Aimé Césaire et son combat pour « La fierté originelle et le verbe qui redresse » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Aimé Césaire (Martinique). Thématique centrale : La fierté originelle et le verbe qui redresse.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "Martinique",
            "group": "diaspora",
            "angle": "La fierté originelle et le verbe qui redresse"
      },
      {
            "id": "glissant",
            "title": "Édouard Glissant",
            "subtitle": "Martinique • Angle : Le Tout-Monde et la relation",
            "question": "En quoi l'héritage de Édouard Glissant et son combat pour « Le Tout-Monde et la relation » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Édouard Glissant (Martinique). Thématique centrale : Le Tout-Monde et la relation.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "Martinique",
            "group": "diaspora",
            "angle": "Le Tout-Monde et la relation"
      },
      {
            "id": "garvey",
            "title": "Marcus Garvey",
            "subtitle": "Jamaïque • Angle : L'unité et la fierté des peuples noirs",
            "question": "En quoi l'héritage de Marcus Garvey et son combat pour « L'unité et la fierté des peuples noirs » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Marcus Garvey (Jamaïque). Thématique centrale : L'unité et la fierté des peuples noirs.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "Jamaïque",
            "group": "diaspora",
            "angle": "L'unité et la fierté des peuples noirs"
      },
      {
            "id": "tubman",
            "title": "Harriet Tubman",
            "subtitle": "États-Unis • Angle : Le courage de libérer les siens",
            "question": "En quoi l'héritage de Harriet Tubman et son combat pour « Le courage de libérer les siens » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Harriet Tubman (États-Unis). Thématique centrale : Le courage de libérer les siens.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "États-Unis",
            "group": "diaspora",
            "angle": "Le courage de libérer les siens"
      },
      {
            "id": "angelou",
            "title": "Maya Angelou",
            "subtitle": "États-Unis • Angle : La parole qui relève",
            "question": "En quoi l'héritage de Maya Angelou et son combat pour « La parole qui relève » résonnent-ils avec votre parcours personnel ou votre art ?",
            "synopsis": "Témoignage sur l'impact de Maya Angelou (États-Unis). Thématique centrale : La parole qui relève.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette personnalité",
            "doorId": "personnalites",
            "origin": "États-Unis",
            "group": "diaspora",
            "angle": "La parole qui relève"
      }
]
  },

  // PORTE 5 : PRODUITS & SERVICES (16 catégories d'offres)
  {
    id: 'produits-services',
    label: 'Produits & Services',
    icon: ShoppingBag,
    tagline: '16 catégories pour présenter des offres concrètes en capsules vidéo de 60 à 90 secondes.',
    videoUrl: STOCK_VIDEOS[3],
    posterUrl: '/assets/doors/door-offres.jpg',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Présenter vos créations concrètes en capsule vidéo percutante de 60 à 90 secondes.',
      'Expliquer l’histoire de fabrication, l’origine des matières et le prix juste.',
      'Remplacer les algorithmes de vente impersonnels par une véritable rencontre humaine.',
      'Fédérer une clientèle attachée à la qualité, l’éthique et l’artisanat.',
      'Permettre la commande directe, l’abonnement ou la collaboration sur-mesure.'
    ],
    subjects: [
      {
            "id": "mode",
            "title": "Mode",
            "subtitle": "vêtements • wax • lin • chaussures • maroquinerie",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Mode » ?",
            "synopsis": "Offre concrète dans la catégorie Mode. Domaines couverts : vêtements, wax, lin, chaussures, maroquinerie.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "vêtements",
                  "wax",
                  "lin",
                  "chaussures",
                  "maroquinerie"
            ]
      },
      {
            "id": "bijoux",
            "title": "Bijoux",
            "subtitle": "orfèvrerie • perles • pièces uniques",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Bijoux » ?",
            "synopsis": "Offre concrète dans la catégorie Bijoux. Domaines couverts : orfèvrerie, perles, pièces uniques.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "orfèvrerie",
                  "perles",
                  "pièces uniques"
            ]
      },
      {
            "id": "maison",
            "title": "Maison",
            "subtitle": "mobilier • vannerie • luminaires • décoration",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Maison » ?",
            "synopsis": "Offre concrète dans la catégorie Maison. Domaines couverts : mobilier, vannerie, luminaires, décoration.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "mobilier",
                  "vannerie",
                  "luminaires",
                  "décoration"
            ]
      },
      {
            "id": "artisanat",
            "title": "Artisanat",
            "subtitle": "ustensiles • couteaux • outils • papeterie",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Artisanat » ?",
            "synopsis": "Offre concrète dans la catégorie Artisanat. Domaines couverts : ustensiles, couteaux, outils, papeterie.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "ustensiles",
                  "couteaux",
                  "outils",
                  "papeterie"
            ]
      },
      {
            "id": "art",
            "title": "Art",
            "subtitle": "peinture • sculpture • photo • livres • musique",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Art » ?",
            "synopsis": "Offre concrète dans la catégorie Art. Domaines couverts : peinture, sculpture, photo, livres, musique.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "peinture",
                  "sculpture",
                  "photo",
                  "livres",
                  "musique"
            ]
      },
      {
            "id": "beaute",
            "title": "Beauté",
            "subtitle": "karité • huiles • savons • soins capillaires",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Beauté » ?",
            "synopsis": "Offre concrète dans la catégorie Beauté. Domaines couverts : karité, huiles, savons, soins capillaires.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "karité",
                  "huiles",
                  "savons",
                  "soins capillaires"
            ]
      },
      {
            "id": "soins-du-corps",
            "title": "Soins du corps",
            "subtitle": "massages • spas • rituels",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Soins du corps » ?",
            "synopsis": "Offre concrète dans la catégorie Soins du corps. Domaines couverts : massages, spas, rituels.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "massages",
                  "spas",
                  "rituels"
            ]
      },
      {
            "id": "plantes",
            "title": "Plantes",
            "subtitle": "tisanes • super-aliments • élixirs",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Plantes » ?",
            "synopsis": "Offre concrète dans la catégorie Plantes. Domaines couverts : tisanes, super-aliments, élixirs.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "tisanes",
                  "super-aliments",
                  "élixirs"
            ]
      },
      {
            "id": "bien-etre",
            "title": "Bien-être",
            "subtitle": "coaching • thérapies brèves • retraites",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Bien-être » ?",
            "synopsis": "Offre concrète dans la catégorie Bien-être. Domaines couverts : coaching, thérapies brèves, retraites.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "coaching",
                  "thérapies brèves",
                  "retraites"
            ]
      },
      {
            "id": "epicerie",
            "title": "Épicerie",
            "subtitle": "épices • café • miel • chocolat",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Épicerie » ?",
            "synopsis": "Offre concrète dans la catégorie Épicerie. Domaines couverts : épices, café, miel, chocolat.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "épices",
                  "café",
                  "miel",
                  "chocolat"
            ]
      },
      {
            "id": "terroir",
            "title": "Terroir",
            "subtitle": "maraîchage • élevage • pêche • circuits courts",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Terroir » ?",
            "synopsis": "Offre concrète dans la catégorie Terroir. Domaines couverts : maraîchage, élevage, pêche, circuits courts.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "maraîchage",
                  "élevage",
                  "pêche",
                  "circuits courts"
            ]
      },
      {
            "id": "cuisine",
            "title": "Cuisine",
            "subtitle": "chefs • traiteurs • tables d'hôtes • ateliers",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Cuisine » ?",
            "synopsis": "Offre concrète dans la catégorie Cuisine. Domaines couverts : chefs, traiteurs, tables d'hôtes, ateliers.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "chefs",
                  "traiteurs",
                  "tables d'hôtes",
                  "ateliers"
            ]
      },
      {
            "id": "voyage",
            "title": "Voyage",
            "subtitle": "écolodges • séjours d'immersion • guides",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Voyage » ?",
            "synopsis": "Offre concrète dans la catégorie Voyage. Domaines couverts : écolodges, séjours d'immersion, guides.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "écolodges",
                  "séjours d'immersion",
                  "guides"
            ]
      },
      {
            "id": "formation",
            "title": "Formation",
            "subtitle": "masterclasses • stages • apprentissage",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Formation » ?",
            "synopsis": "Offre concrète dans la catégorie Formation. Domaines couverts : masterclasses, stages, apprentissage.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "masterclasses",
                  "stages",
                  "apprentissage"
            ]
      },
      {
            "id": "ecologie",
            "title": "Écologie",
            "subtitle": "éco-construction • énergie solaire • réparation",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Écologie » ?",
            "synopsis": "Offre concrète dans la catégorie Écologie. Domaines couverts : éco-construction, énergie solaire, réparation.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "éco-construction",
                  "énergie solaire",
                  "réparation"
            ]
      },
      {
            "id": "medias",
            "title": "Médias",
            "subtitle": "vidéo • photo • design • digital • événementiel",
            "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Médias » ?",
            "synopsis": "Offre concrète dans la catégorie Médias. Domaines couverts : vidéo, photo, design, digital, événementiel.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette catégorie",
            "doorId": "produits-services",
            "covers": [
                  "vidéo",
                  "photo",
                  "design",
                  "digital",
                  "événementiel"
            ]
      }
]
  },

  // PORTE 6 : MARQUES (16 secteurs de sponsors)
  {
    id: 'marques',
    label: 'Marques',
    icon: Gem,
    tagline: '16 secteurs de sponsors potentiels, à contacter pour qu’ils accueillent des témoignages de leurs clients.',
    videoUrl: STOCK_VIDEOS[0],
    posterUrl: '/assets/doors/door-marques.jpg',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Connecter les marques à des témoignages authentiques et sincères de clients.',
      'Éloigner la communication d’entreprise du bruit publicitaire trompeur.',
      'Valoriser l’utilité réelle, l’éthique de production et la relation de confiance.',
      'Fédérer des partenariats vertueux entre créateurs, artisans et sponsors.',
      'Créer des capsules de sponsorisation respectueuses de l’intelligence du public.'
    ],
    subjects: [
      {
            "id": "beaute",
            "title": "Beauté",
            "subtitle": "Secteur sponsor & partenaires : Beauté",
            "question": "Comment votre entreprise du secteur « Beauté » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Beauté.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "mode",
            "title": "Mode",
            "subtitle": "Secteur sponsor & partenaires : Mode",
            "question": "Comment votre entreprise du secteur « Mode » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Mode.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "technologie",
            "title": "Technologie",
            "subtitle": "Secteur sponsor & partenaires : Technologie",
            "question": "Comment votre entreprise du secteur « Technologie » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Technologie.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "telecoms",
            "title": "Télécoms",
            "subtitle": "Secteur sponsor & partenaires : Télécoms",
            "question": "Comment votre entreprise du secteur « Télécoms » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Télécoms.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "banque",
            "title": "Banque",
            "subtitle": "Secteur sponsor & partenaires : Banque",
            "question": "Comment votre entreprise du secteur « Banque » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Banque.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "gastronomie",
            "title": "Gastronomie",
            "subtitle": "Secteur sponsor & partenaires : Gastronomie",
            "question": "Comment votre entreprise du secteur « Gastronomie » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Gastronomie.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "boissons",
            "title": "Boissons",
            "subtitle": "Secteur sponsor & partenaires : Boissons",
            "question": "Comment votre entreprise du secteur « Boissons » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Boissons.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "voyage",
            "title": "Voyage",
            "subtitle": "Secteur sponsor & partenaires : Voyage",
            "question": "Comment votre entreprise du secteur « Voyage » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Voyage.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "hotellerie",
            "title": "Hôtellerie",
            "subtitle": "Secteur sponsor & partenaires : Hôtellerie",
            "question": "Comment votre entreprise du secteur « Hôtellerie » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Hôtellerie.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "transport",
            "title": "Transport",
            "subtitle": "Secteur sponsor & partenaires : Transport",
            "question": "Comment votre entreprise du secteur « Transport » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Transport.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "sante",
            "title": "Santé",
            "subtitle": "Secteur sponsor & partenaires : Santé",
            "question": "Comment votre entreprise du secteur « Santé » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Santé.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "maison",
            "title": "Maison",
            "subtitle": "Secteur sponsor & partenaires : Maison",
            "question": "Comment votre entreprise du secteur « Maison » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Maison.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "energie",
            "title": "Énergie",
            "subtitle": "Secteur sponsor & partenaires : Énergie",
            "question": "Comment votre entreprise du secteur « Énergie » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Énergie.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "medias",
            "title": "Médias",
            "subtitle": "Secteur sponsor & partenaires : Médias",
            "question": "Comment votre entreprise du secteur « Médias » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Médias.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "education",
            "title": "Éducation",
            "subtitle": "Secteur sponsor & partenaires : Éducation",
            "question": "Comment votre entreprise du secteur « Éducation » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Éducation.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      },
      {
            "id": "sport",
            "title": "Sport",
            "subtitle": "Secteur sponsor & partenaires : Sport",
            "question": "Comment votre entreprise du secteur « Sport » soutient-elle l'authenticité et la vérité du témoignage de ses clients ?",
            "synopsis": "Sponsorisation et témoignages clients dans le secteur Sport.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir ce secteur",
            "doorId": "marques"
      }
]
  },

  // PORTE 7 : PROJETS (16 catégories de causes participatives)
  {
    id: 'projets',
    label: 'Projets',
    icon: Sprout,
    tagline: '16 catégories de causes, dans l’esprit des plateformes de financement participatif.',
    videoUrl: STOCK_VIDEOS[1],
    posterUrl: '/assets/doors/door-projets.jpg',
    actionDoorLabel: 'Choisir cette porte',
    advantages: [
      'Présenter votre cause ou projet collectif à une communauté engagée.',
      'Expliquer l’impact concret de vos actions sur le terrain avec vérité.',
      'Mobiliser du soutien citoyen, du mécénat et du financement participatif.',
      'Nouer des synergies avec d’autres bâtisseurs engagés pour le bien commun.',
      'Documenter en vidéo l’avancement et les victoires tangibles de votre cause.'
    ],
    subjects: [
      {
            "id": "ecologie",
            "title": "Écologie",
            "subtitle": "forêts sacrées • mangroves • biodiversité",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Écologie » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Écologie (forêts sacrées, mangroves, biodiversité).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets",
            "covers": [
                  "forêts sacrées",
                  "mangroves",
                  "biodiversité"
            ]
      },
      {
            "id": "enfance",
            "title": "Enfance",
            "subtitle": "Cause collective & bien commun",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Enfance » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Enfance.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets"
      },
      {
            "id": "education",
            "title": "Éducation",
            "subtitle": "écoles • bibliothèques",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Éducation » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Éducation (écoles, bibliothèques).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets",
            "covers": [
                  "écoles",
                  "bibliothèques"
            ]
      },
      {
            "id": "sante",
            "title": "Santé",
            "subtitle": "Cause collective & bien commun",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Santé » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Santé.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets"
      },
      {
            "id": "agriculture",
            "title": "Agriculture",
            "subtitle": "semences • jardins urbains",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Agriculture » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Agriculture (semences, jardins urbains).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets",
            "covers": [
                  "semences",
                  "jardins urbains"
            ]
      },
      {
            "id": "eau",
            "title": "Eau",
            "subtitle": "Cause collective & bien commun",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Eau » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Eau.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets"
      },
      {
            "id": "energie",
            "title": "Énergie",
            "subtitle": "solaire",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Énergie » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Énergie (solaire).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets",
            "covers": [
                  "solaire"
            ]
      },
      {
            "id": "habitat",
            "title": "Habitat",
            "subtitle": "construction en terre • logements",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Habitat » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Habitat (construction en terre, logements).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets",
            "covers": [
                  "construction en terre",
                  "logements"
            ]
      },
      {
            "id": "femmes",
            "title": "Femmes",
            "subtitle": "autonomie • tissage • naissance",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Femmes » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Femmes (autonomie, tissage, naissance).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets",
            "covers": [
                  "autonomie",
                  "tissage",
                  "naissance"
            ]
      },
      {
            "id": "jeunesse",
            "title": "Jeunesse",
            "subtitle": "Cause collective & bien commun",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Jeunesse » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Jeunesse.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets"
      },
      {
            "id": "culture",
            "title": "Culture",
            "subtitle": "cinéma • théâtre • livres • festivals • archives",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Culture » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Culture (cinéma, théâtre, livres, festivals, archives).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets",
            "covers": [
                  "cinéma",
                  "théâtre",
                  "livres",
                  "festivals",
                  "archives"
            ]
      },
      {
            "id": "musique",
            "title": "Musique",
            "subtitle": "centre de percussion",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Musique » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Musique (centre de percussion).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets",
            "covers": [
                  "centre de percussion"
            ]
      },
      {
            "id": "patrimoine",
            "title": "Patrimoine",
            "subtitle": "vodoun • langues • mémoire des anciens",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Patrimoine » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Patrimoine (vodoun, langues, mémoire des anciens).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets",
            "covers": [
                  "vodoun",
                  "langues",
                  "mémoire des anciens"
            ]
      },
      {
            "id": "artisanat",
            "title": "Artisanat",
            "subtitle": "Cause collective & bien commun",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Artisanat » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Artisanat.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets"
      },
      {
            "id": "entrepreneuriat",
            "title": "Entrepreneuriat",
            "subtitle": "Cause collective & bien commun",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Entrepreneuriat » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Entrepreneuriat.",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets"
      },
      {
            "id": "solidarite",
            "title": "Solidarité",
            "subtitle": "urgence • handicap • personnes âgées • réinsertion",
            "question": "Quel impact direct et transformation concrète votre projet dans la cause « Solidarité » apporte-t-il sur le terrain ?",
            "synopsis": "Projet citoyen et cause d'intérêt général : Solidarité (urgence, handicap, personnes âgées, réinsertion).",
            "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "posterUrl": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
            "actionLabel": "Choisir cette cause",
            "doorId": "projets",
            "covers": [
                  "urgence",
                  "handicap",
                  "personnes âgées",
                  "réinsertion"
            ]
      }
]
  }
];

export function getDoorById(id: string): ProposeDoor | undefined {
  return PROPOSE_DOORS.find(d => d.id === id);
}

export function getSubjectByDoorAndId(doorId: string, subjectId: string): ProposeSubject | undefined {
  const door = getDoorById(doorId);
  if (!door) return undefined;
  return door.subjects.find(s => s.id === subjectId);
}
