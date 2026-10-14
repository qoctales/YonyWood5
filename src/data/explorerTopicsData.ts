import { AffiliationPerson, ExplorerCategory } from '../types';
import { NOMENCLATURE } from './nomenclature';
import { DIMENSIONS, SOUS_CATEGORIES, getSubcategoriesForDimension } from './dimensionsData';

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
// LES 16 GRANDES PORTES D'ENTRÉE DE L'ASTROLABE EXPLORER
// =========================================================================
export const EXPLORER_CATEGORIES: ExplorerCategoryConfig[] = DIMENSIONS.map(dim => ({
  id: dim.id as ExplorerCategoryType,
  label: dim.label,
  shortLabel: dim.shortLabel,
  tagline: dim.tagline,
  description: dim.description,
  badge: dim.badge,
  iconName: dim.icone,
  accentColor: dim.accentColor,
  glowColor: dim.glowColor,
  bgGradient: dim.bgGradient,
  coverImage: dim.coverImage
}));

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
  pioneers?: AffiliationPerson[];
  doorId?: string;
  origin?: string;
  group?: string;
  angle?: string;
  family?: string;
  covers?: string[];
  iconName?: string;
}

// 1. SÉRIES DOCUMENTAIRES
const seriesList: ExplorerCatalogItem[] = [
  {
    "id": "jesus-legba",
    "category": "series",
    "title": "Èṣù < > Jésus",
    "subtitle": "Deux traditions. Une même question de foi.",
    "question": "Qu’est-ce qui dans votre foi la plus intime vous relie à ce qui vous dépasse et vous rapproche des autres ?",
    "photoUrl": "/assets/posters/jesus-esu.png",
    "badge": "16 pionniers cooptés",
    "accentColor": "#D97706",
    "iconName": "16-series/jesus-legba"
  },
  {
    "id": "finagnon-qosqorico",
    "category": "series",
    "title": "Finagnon < > Qosqorico",
    "subtitle": "Bénin < > Pérou. Deux territoires. Une même réflexion sur ce qui nous relie à un lieu.",
    "question": "Quel est ce lien invisible et indestructible qui vous unit charnellement à la terre de vos ancêtres ?",
    "photoUrl": "/assets/posters/finagnon-qosqorico.png",
    "badge": "16 pionniers cooptés",
    "accentColor": "#10B981",
    "iconName": "16-series/finagnon-qosqorico"
  },
  {
    "id": "blacks-one-beyond-eve",
    "category": "series",
    "title": "Blacks One < > Beyond Eve",
    "subtitle": "La mémoire originelle, la sororité et la diaspora.",
    "question": "Quelle blessure ou fierté héritée de vos mères portez-vous comme un flambeau dans votre existence ?",
    "photoUrl": "/assets/posters/blacks-one-beyond-eve.png",
    "badge": "16 pionniers cooptés",
    "accentColor": "#EC4899",
    "iconName": "16-series/blacks-one-beyond-eve"
  },
  {
    "id": "dixeat-fiat-luxe",
    "category": "series",
    "title": "E Vivi < > Fiat Luxe",
    "subtitle": "Quand la matière brute devient or, goût et lumière.",
    "question": "À quel instant précis avez-vous compris que transformer la matière brute était un acte de pure alchimie spirituelle ?",
    "photoUrl": "/assets/posters/dixeat-fiat-luxe.png",
    "badge": "16 pionniers cooptés",
    "accentColor": "#F59E0B",
    "iconName": "16-series/dixeat-fiat-luxe"
  },
  {
    "id": "investors-builders",
    "category": "series",
    "title": "Investors < > Builders",
    "subtitle": "Le capital visionnaire face aux bâtisseurs de terrain.",
    "question": "Comment conciliez-vous la souveraineté économique, la rentabilité et l’impact écologique durable ?",
    "photoUrl": "/assets/posters/investors-builders.png",
    "badge": "16 pionniers cooptés",
    "accentColor": "#0284C7",
    "iconName": "16-series/investors-builders"
  },
  {
    "id": "other-eyes-sixth-sense",
    "category": "series",
    "title": "Other Eyes < > Sixth Sense",
    "subtitle": "La perception intuitive et les mémoires subtiles du vivant.",
    "question": "Comment développez-vous l’écoute intérieure et la sensibilité aux énergies invisibles ?",
    "photoUrl": "/assets/posters/other-eyes-sixth-sense.png",
    "badge": "16 pionniers cooptés",
    "accentColor": "#8B5CF6",
    "iconName": "16-series/other-eyes-sixth-sense"
  },
  {
    "id": "coaching-unlimited",
    "category": "series",
    "title": "Coaching < > Unlimited",
    "subtitle": "L’exigence du mentor dans son bureau < > l’envol d’un athlète sur les haies.",
    "question": "Racontez-nous un moment où vous avez cru que l’obstacle devant vous était trop haut pour être franchi. Qu’avez-vous trouvé en vous ?",
    "photoUrl": "/assets/posters/coaching-unlimited.png",
    "badge": "16 pionniers cooptés",
    "accentColor": "#EA580C",
    "iconName": "16-series/coaching-unlimited"
  },
  {
    "id": "focus-phd",
    "category": "series",
    "title": "Focus < >  PhD",
    "subtitle": "Le regard sensible qui capte l’instant < > la rigueur de la recherche qui sonde l’universel.",
    "question": "Quel a été ce moment précis où votre travail a fait surgir une vérité qui a transformé votre regard ?",
    "photoUrl": "/assets/posters/Focus < >  PhD.jpg",
    "badge": "16 pionniers cooptés",
    "accentColor": "#B45309",
    "iconName": "16-series/focus-phd"
  }
];

// 2. SAGESSES (16 entrées issues de nomenclature.json)
const sagessesList: ExplorerCatalogItem[] = [
  {
    "id": "ego",
    "category": "sagesses",
    "title": "Ego",
    "subtitle": "Famille : Se vaincre",
    "question": "Quand avez-vous dû vous effacer pour grandir ?",
    "photoUrl": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "se-vaincre",
    "doorId": "sagesses"
  },
  {
    "id": "courage",
    "category": "sagesses",
    "title": "Courage",
    "subtitle": "Famille : Se vaincre",
    "question": "Quelle peur avez-vous traversée ?",
    "photoUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "se-vaincre",
    "doorId": "sagesses"
  },
  {
    "id": "lacher-prise",
    "category": "sagesses",
    "title": "Lâcher-prise",
    "subtitle": "Famille : Se vaincre",
    "question": "Qu'avez-vous accepté de ne pas contrôler ?",
    "photoUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "se-vaincre",
    "doorId": "sagesses"
  },
  {
    "id": "recommencer",
    "category": "sagesses",
    "title": "Recommencer",
    "subtitle": "Famille : Se vaincre",
    "question": "Comment avez-vous pu renaître après un échec ou une rupture ?",
    "photoUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "se-vaincre",
    "doorId": "sagesses"
  },
  {
    "id": "pardon",
    "category": "sagesses",
    "title": "Pardon",
    "subtitle": "Famille : Se relier",
    "question": "Qui avez-vous pardonné, et qu'est-ce que cela a changé ?",
    "photoUrl": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "se-relier",
    "doorId": "sagesses"
  },
  {
    "id": "amour",
    "category": "sagesses",
    "title": "Amour",
    "subtitle": "Famille : Se relier",
    "question": "Qu'est-ce qui reste quand tout part ?",
    "photoUrl": "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "se-relier",
    "doorId": "sagesses"
  },
  {
    "id": "fraternite",
    "category": "sagesses",
    "title": "Fraternité",
    "subtitle": "Famille : Se relier",
    "question": "Quel inconnu est devenu un frère ?",
    "photoUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "se-relier",
    "doorId": "sagesses"
  },
  {
    "id": "transmission",
    "category": "sagesses",
    "title": "Transmission",
    "subtitle": "Famille : Se relier",
    "question": "Qu'avez-vous reçu d'un ancien qui ne s'achète pas ?",
    "photoUrl": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "se-relier",
    "doorId": "sagesses"
  },
  {
    "id": "foi",
    "category": "sagesses",
    "title": "Foi",
    "subtitle": "Famille : S’élever",
    "question": "Qu'est-ce qui vous a tenu quand rien d'autre ne tenait ?",
    "photoUrl": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "s-elever",
    "doorId": "sagesses"
  },
  {
    "id": "silence",
    "category": "sagesses",
    "title": "Silence",
    "subtitle": "Famille : S’élever",
    "question": "Où trouvez-vous le calme ?",
    "photoUrl": "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "s-elever",
    "doorId": "sagesses"
  },
  {
    "id": "gratitude",
    "category": "sagesses",
    "title": "Gratitude",
    "subtitle": "Famille : S’élever",
    "question": "De quoi êtes-vous profondément reconnaissant ?",
    "photoUrl": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "s-elever",
    "doorId": "sagesses"
  },
  {
    "id": "joie",
    "category": "sagesses",
    "title": "Joie",
    "subtitle": "Famille : S’élever",
    "question": "D'où vient la joie malgré le manque ?",
    "photoUrl": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "s-elever",
    "doorId": "sagesses"
  },
  {
    "id": "resilience",
    "category": "sagesses",
    "title": "Résilience",
    "subtitle": "Famille : Tenir debout",
    "question": "Comment êtes-vous resté debout dans l'épreuve ?",
    "photoUrl": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "tenir-debout",
    "doorId": "sagesses"
  },
  {
    "id": "deuil",
    "category": "sagesses",
    "title": "Deuil",
    "subtitle": "Famille : Tenir debout",
    "question": "Qu'avez-vous appris en perdant ?",
    "photoUrl": "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "tenir-debout",
    "doorId": "sagesses"
  },
  {
    "id": "dignite",
    "category": "sagesses",
    "title": "Dignité",
    "subtitle": "Famille : Tenir debout",
    "question": "Quand avez-vous dit non, au risque de tout perdre ?",
    "photoUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "tenir-debout",
    "doorId": "sagesses"
  },
  {
    "id": "vocation",
    "category": "sagesses",
    "title": "Vocation",
    "subtitle": "Famille : Tenir debout",
    "question": "À quel moment avez-vous su pourquoi vous étiez là ?",
    "photoUrl": "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=800&q=80",
    "badge": "16 voix face caméra",
    "family": "tenir-debout",
    "doorId": "sagesses"
  }
];

// 3. TERRITOIRES (16 entrées issues de nomenclature.json)
const territoiresList: ExplorerCatalogItem[] = [
  {
    "id": "benin",
    "category": "territoires",
    "title": "Bénin",
    "subtitle": "Berceau africain",
    "question": "Quelle sagesse ou force tellurique de Bénin a profondément forgé votre regard sur le monde ?",
    "flag": "🇧🇯",
    "photoUrl": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "afrique",
    "doorId": "territoires"
  },
  {
    "id": "senegal",
    "category": "territoires",
    "title": "Sénégal",
    "subtitle": "Berceau africain",
    "question": "Quelle sagesse ou force tellurique de Sénégal a profondément forgé votre regard sur le monde ?",
    "flag": "🇸🇳",
    "photoUrl": "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "afrique",
    "doorId": "territoires"
  },
  {
    "id": "cote-d-ivoire",
    "category": "territoires",
    "title": "Côte d'Ivoire",
    "subtitle": "Berceau africain",
    "question": "Quelle sagesse ou force tellurique de Côte d'Ivoire a profondément forgé votre regard sur le monde ?",
    "flag": "🇨🇮",
    "photoUrl": "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "afrique",
    "doorId": "territoires"
  },
  {
    "id": "ghana",
    "category": "territoires",
    "title": "Ghana",
    "subtitle": "Berceau africain",
    "question": "Quelle sagesse ou force tellurique de Ghana a profondément forgé votre regard sur le monde ?",
    "flag": "🇬🇭",
    "photoUrl": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "afrique",
    "doorId": "territoires"
  },
  {
    "id": "nigeria",
    "category": "territoires",
    "title": "Nigeria",
    "subtitle": "Berceau africain",
    "question": "Quelle sagesse ou force tellurique de Nigeria a profondément forgé votre regard sur le monde ?",
    "flag": "🇳🇬",
    "photoUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "afrique",
    "doorId": "territoires"
  },
  {
    "id": "rdc",
    "category": "territoires",
    "title": "RDC",
    "subtitle": "Berceau africain",
    "question": "Quelle sagesse ou force tellurique de RDC a profondément forgé votre regard sur le monde ?",
    "flag": "🇨🇩",
    "photoUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "afrique",
    "doorId": "territoires"
  },
  {
    "id": "ethiopie",
    "category": "territoires",
    "title": "Éthiopie",
    "subtitle": "Berceau africain",
    "question": "Quelle sagesse ou force tellurique de Éthiopie a profondément forgé votre regard sur le monde ?",
    "flag": "🇪🇹",
    "photoUrl": "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "afrique",
    "doorId": "territoires"
  },
  {
    "id": "afrique-du-sud",
    "category": "territoires",
    "title": "Afrique du Sud",
    "subtitle": "Berceau africain",
    "question": "Quelle sagesse ou force tellurique de Afrique du Sud a profondément forgé votre regard sur le monde ?",
    "flag": "🇿🇦",
    "photoUrl": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "afrique",
    "doorId": "territoires"
  },
  {
    "id": "haiti",
    "category": "territoires",
    "title": "Haïti",
    "subtitle": "Diaspora",
    "question": "Quelle sagesse ou force tellurique de Haïti a profondément forgé votre regard sur le monde ?",
    "flag": "🇭🇹",
    "photoUrl": "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "diaspora",
    "doorId": "territoires"
  },
  {
    "id": "bresil",
    "category": "territoires",
    "title": "Brésil",
    "subtitle": "Diaspora",
    "question": "Quelle sagesse ou force tellurique de Brésil a profondément forgé votre regard sur le monde ?",
    "flag": "🇧🇷",
    "photoUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "diaspora",
    "doorId": "territoires"
  },
  {
    "id": "cuba",
    "category": "territoires",
    "title": "Cuba",
    "subtitle": "Diaspora",
    "question": "Quelle sagesse ou force tellurique de Cuba a profondément forgé votre regard sur le monde ?",
    "flag": "🇨🇺",
    "photoUrl": "https://images.unsplash.com/photo-1500759285222-a95626b934cb?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "diaspora",
    "doorId": "territoires"
  },
  {
    "id": "etats-unis",
    "category": "territoires",
    "title": "États-Unis",
    "subtitle": "Diaspora",
    "question": "Quelle sagesse ou force tellurique de États-Unis a profondément forgé votre regard sur le monde ?",
    "flag": "🇺🇸",
    "photoUrl": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "diaspora",
    "doorId": "territoires"
  },
  {
    "id": "france",
    "category": "territoires",
    "title": "France",
    "subtitle": "Diaspora",
    "question": "Quelle sagesse ou force tellurique de France a profondément forgé votre regard sur le monde ?",
    "flag": "🇫🇷",
    "photoUrl": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "diaspora",
    "doorId": "territoires"
  },
  {
    "id": "perou",
    "category": "territoires",
    "title": "Pérou",
    "subtitle": "Résonance universelle",
    "question": "Quelle sagesse ou force tellurique de Pérou a profondément forgé votre regard sur le monde ?",
    "flag": "🇵🇪",
    "photoUrl": "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "resonances",
    "doorId": "territoires"
  },
  {
    "id": "japon",
    "category": "territoires",
    "title": "Japon",
    "subtitle": "Résonance universelle",
    "question": "Quelle sagesse ou force tellurique de Japon a profondément forgé votre regard sur le monde ?",
    "flag": "🇯🇵",
    "photoUrl": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "resonances",
    "doorId": "territoires"
  },
  {
    "id": "inde",
    "category": "territoires",
    "title": "Inde",
    "subtitle": "Résonance universelle",
    "question": "Quelle sagesse ou force tellurique de Inde a profondément forgé votre regard sur le monde ?",
    "flag": "🇮🇳",
    "photoUrl": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
    "badge": "16 récits de terroir",
    "group": "resonances",
    "doorId": "territoires"
  }
];

// 4. EXPERTISES (16 entrées de métiers & savoir-faire concrets de l'écosystème)
const expertisesList: ExplorerCatalogItem[] = [
  {
    "id": "videastes",
    "category": "expertises",
    "title": "Vidéastes",
    "subtitle": "réalisation • cadrage • documentaire",
    "question": "Quel regard ou parti pris visuel singulier insufflez-vous dans chacune de vos créations documentaires ?",
    "photoUrl": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["réalisation", "cadrage", "documentaire", "direction photo"],
    "doorId": "expertises"
  },
  {
    "id": "photographes",
    "category": "expertises",
    "title": "Photographes",
    "subtitle": "portrait • plateau • reportage",
    "question": "Comment parvenez-vous à capturer l'âme et la vérité d'un visage en un instant décisif ?",
    "photoUrl": "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["portrait", "reportage", "lumière", "photo de plateau"],
    "doorId": "expertises"
  },
  {
    "id": "juristes",
    "category": "expertises",
    "title": "Avocats & Juristes",
    "subtitle": "droit d’auteur • contrats • propriété intellectuelle",
    "question": "Comment protégez-vous la valeur et la liberté des créateurs face aux évolutions du droit ?",
    "photoUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["propriété intellectuelle", "droit d'auteur", "contrats", "droit des affaires"],
    "doorId": "expertises"
  },
  {
    "id": "comptables",
    "category": "expertises",
    "title": "Comptables",
    "subtitle": "finance • gestion • fiscalité",
    "question": "Comment transformez-vous la rigueur des chiffres en un puissant levier de souveraineté pour les projets ?",
    "photoUrl": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["finance", "fiscalité", "gestion de production", "audit"],
    "doorId": "expertises"
  },
  {
    "id": "artisans",
    "category": "expertises",
    "title": "Artisans d'Art",
    "subtitle": "matières nobles • façonnage • savoir-faire manuel",
    "question": "Quel geste ancestral ou secret de la matière guide vos mains lors de chaque création ?",
    "photoUrl": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["ébénisterie", "céramique", "textile", "cuir", "métal"],
    "doorId": "expertises"
  },
  {
    "id": "developpeurs",
    "category": "expertises",
    "title": "Développeurs Tech",
    "subtitle": "code • plateformes • architecture logicielle",
    "question": "Comment concevez-vous des technologies qui relient véritablement les humains au lieu de les isoler ?",
    "photoUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["applications", "plateformes web", "architecture", "data"],
    "doorId": "expertises"
  },
  {
    "id": "designers",
    "category": "expertises",
    "title": "Designers",
    "subtitle": "direction artistique • UI/UX • identité visuelle",
    "question": "À quel moment une forme visuelle devient-elle une évidence émotionnelle pour son public ?",
    "photoUrl": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["direction artistique", "UI/UX", "typographie", "scénographie"],
    "doorId": "expertises"
  },
  {
    "id": "son-musique",
    "category": "expertises",
    "title": "Ingénieurs du Son",
    "subtitle": "prise de son • mixage • musique",
    "question": "Comment sculptez-vous l'espace sonore pour toucher directement le cœur de celui qui écoute ?",
    "photoUrl": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["prise de son", "mixage", "sound design", "musique originale"],
    "doorId": "expertises"
  },
  {
    "id": "monteurs",
    "category": "expertises",
    "title": "Monteurs",
    "subtitle": "rythme • montage • étalonnage",
    "question": "Comment trouvez-vous le tempo invisible qui donne toute sa résonance à une histoire filmée ?",
    "photoUrl": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["montage vidéo", "étalonnage", "post-production", "motion design"],
    "doorId": "expertises"
  },
  {
    "id": "producteurs",
    "category": "expertises",
    "title": "Producteurs",
    "subtitle": "financement • direction de projet • impact",
    "question": "Comment mobilisez-vous les énergies et les ressources pour faire éclore des œuvres audacieuses ?",
    "photoUrl": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["financement", "coordination", "distribution", "coproduction"],
    "doorId": "expertises"
  },
  {
    "id": "auteurs",
    "category": "expertises",
    "title": "Scénaristes & Plumes",
    "subtitle": "storytelling • narration • dramaturgie",
    "question": "Quel mot ou quel silence permet selon vous de faire basculer un récit vers l’universel ?",
    "photoUrl": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["scénario", "dramaturgie", "écriture documentaire", "storytelling"],
    "doorId": "expertises"
  },
  {
    "id": "communicants",
    "category": "expertises",
    "title": "Communicants",
    "subtitle": "relations presse • influence • médias",
    "question": "Comment portez-vous une voix authentique pour qu'elle résonne bien au-delà de sa communauté ?",
    "photoUrl": "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["stratégie média", "relations presse", "médias sociaux", "brand content"],
    "doorId": "expertises"
  },
  {
    "id": "architectes",
    "category": "expertises",
    "title": "Architectes",
    "subtitle": "espaces • éco-construction • habitat",
    "question": "Comment bâtissez-vous des lieux qui respectent la terre et élèvent l’esprit de ceux qui y vivent ?",
    "photoUrl": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["éco-construction", "architecture bioclimatique", "aménagement", "matériaux durables"],
    "doorId": "expertises"
  },
  {
    "id": "chefs-cuisine",
    "category": "expertises",
    "title": "Chefs Cuisiniers",
    "subtitle": "gastronomie • terroirs • goûts d’exception",
    "question": "Quelle mémoire de saveur ou de générosité insufflez-vous dans votre assiette ?",
    "photoUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["art culinaire", "fermentations", "terroirs", "hospitalité"],
    "doorId": "expertises"
  },
  {
    "id": "soignants",
    "category": "expertises",
    "title": "Soignants",
    "subtitle": "santé • thérapies • soins somatiques",
    "question": "Quel secret de présence ou d’écoute permet selon vous d’enclencher la guérison profonde ?",
    "photoUrl": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["médecine", "soins somatiques", "ostéopathie", "santé intégrative"],
    "doorId": "expertises"
  },
  {
    "id": "coachs",
    "category": "expertises",
    "title": "Coachs & Mentors",
    "subtitle": "préparation mentale • voix • accompagnement",
    "question": "Comment révélez-vous chez un individu le courage d'assumer pleinement sa singularité ?",
    "photoUrl": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    "badge": "16 praticiens",
    "covers": ["coaching de dirigeants", "préparation mentale", "voix", "transmission"],
    "doorId": "expertises"
  }
];

// 5. PERSONNALITÉS (16 entrées issues de nomenclature.json)
const personnalitesList: ExplorerCatalogItem[] = [
  {
    "id": "mandela",
    "category": "personnalites",
    "title": "Nelson Mandela",
    "subtitle": "Afrique du Sud • Le pardon et la dignité",
    "question": "En quoi l'héritage de Nelson Mandela et son combat pour « Le pardon et la dignité » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Afrique",
    "origin": "Afrique du Sud",
    "group": "afrique",
    "angle": "Le pardon et la dignité",
    "doorId": "personnalites"
  },
  {
    "id": "sankara",
    "category": "personnalites",
    "title": "Thomas Sankara",
    "subtitle": "Burkina Faso • L'intégrité, vivre de ce qu'on produit",
    "question": "En quoi l'héritage de Thomas Sankara et son combat pour « L'intégrité, vivre de ce qu'on produit » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Afrique",
    "origin": "Burkina Faso",
    "group": "afrique",
    "angle": "L'intégrité, vivre de ce qu'on produit",
    "doorId": "personnalites"
  },
  {
    "id": "sagbohan",
    "category": "personnalites",
    "title": "Danialou Sagbohan",
    "subtitle": "Bénin • Les rythmes vodoun et la langue fon",
    "question": "En quoi l'héritage de Danialou Sagbohan et son combat pour « Les rythmes vodoun et la langue fon » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Afrique",
    "origin": "Bénin",
    "group": "afrique",
    "angle": "Les rythmes vodoun et la langue fon",
    "doorId": "personnalites"
  },
  {
    "id": "kidjo",
    "category": "personnalites",
    "title": "Angélique Kidjo",
    "subtitle": "Bénin • La voix béninoise qui porte le monde",
    "question": "En quoi l'héritage de Angélique Kidjo et son combat pour « La voix béninoise qui porte le monde » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Afrique",
    "origin": "Bénin",
    "group": "afrique",
    "angle": "La voix béninoise qui porte le monde",
    "doorId": "personnalites"
  },
  {
    "id": "hampate-ba",
    "category": "personnalites",
    "title": "Amadou Hampâté Bâ",
    "subtitle": "Mali • La parole des anciens",
    "question": "En quoi l'héritage de Amadou Hampâté Bâ et son combat pour « La parole des anciens » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Afrique",
    "origin": "Mali",
    "group": "afrique",
    "angle": "La parole des anciens",
    "doorId": "personnalites"
  },
  {
    "id": "fela-kuti",
    "category": "personnalites",
    "title": "Fela Kuti",
    "subtitle": "Nigeria • La musique comme arme de libération",
    "question": "En quoi l'héritage de Fela Kuti et son combat pour « La musique comme arme de libération » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Afrique",
    "origin": "Nigeria",
    "group": "afrique",
    "angle": "La musique comme arme de libération",
    "doorId": "personnalites"
  },
  {
    "id": "makeba",
    "category": "personnalites",
    "title": "Miriam Makeba",
    "subtitle": "Afrique du Sud • Chanter son peuple même en exil",
    "question": "En quoi l'héritage de Miriam Makeba et son combat pour « Chanter son peuple même en exil » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Afrique",
    "origin": "Afrique du Sud",
    "group": "afrique",
    "angle": "Chanter son peuple même en exil",
    "doorId": "personnalites"
  },
  {
    "id": "maathai",
    "category": "personnalites",
    "title": "Wangari Maathai",
    "subtitle": "Kenya • La révolution par l'arbre",
    "question": "En quoi l'héritage de Wangari Maathai et son combat pour « La révolution par l'arbre » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Afrique",
    "origin": "Kenya",
    "group": "afrique",
    "angle": "La révolution par l'arbre",
    "doorId": "personnalites"
  },
  {
    "id": "marley",
    "category": "personnalites",
    "title": "Bob Marley",
    "subtitle": "Jamaïque • La foi et l'unité",
    "question": "En quoi l'héritage de Bob Marley et son combat pour « La foi et l'unité » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Diaspora",
    "origin": "Jamaïque",
    "group": "diaspora",
    "angle": "La foi et l'unité",
    "doorId": "personnalites"
  },
  {
    "id": "ali",
    "category": "personnalites",
    "title": "Muhammad Ali",
    "subtitle": "États-Unis • Le courage et la fierté",
    "question": "En quoi l'héritage de Muhammad Ali et son combat pour « Le courage et la fierté » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Diaspora",
    "origin": "États-Unis",
    "group": "diaspora",
    "angle": "Le courage et la fierté",
    "doorId": "personnalites"
  },
  {
    "id": "jackson",
    "category": "personnalites",
    "title": "Michael Jackson",
    "subtitle": "États-Unis • Le dépassement par le travail et le mouvement",
    "question": "En quoi l'héritage de Michael Jackson et son combat pour « Le dépassement par le travail et le mouvement » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Diaspora",
    "origin": "États-Unis",
    "group": "diaspora",
    "angle": "Le dépassement par le travail et le mouvement",
    "doorId": "personnalites"
  },
  {
    "id": "cesaire",
    "category": "personnalites",
    "title": "Aimé Césaire",
    "subtitle": "Martinique • La fierté originelle et le verbe qui redresse",
    "question": "En quoi l'héritage de Aimé Césaire et son combat pour « La fierté originelle et le verbe qui redresse » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Diaspora",
    "origin": "Martinique",
    "group": "diaspora",
    "angle": "La fierté originelle et le verbe qui redresse",
    "doorId": "personnalites"
  },
  {
    "id": "glissant",
    "category": "personnalites",
    "title": "Édouard Glissant",
    "subtitle": "Martinique • Le Tout-Monde et la relation",
    "question": "En quoi l'héritage de Édouard Glissant et son combat pour « Le Tout-Monde et la relation » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Diaspora",
    "origin": "Martinique",
    "group": "diaspora",
    "angle": "Le Tout-Monde et la relation",
    "doorId": "personnalites"
  },
  {
    "id": "garvey",
    "category": "personnalites",
    "title": "Marcus Garvey",
    "subtitle": "Jamaïque • L'unité et la fierté des peuples noirs",
    "question": "En quoi l'héritage de Marcus Garvey et son combat pour « L'unité et la fierté des peuples noirs » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Diaspora",
    "origin": "Jamaïque",
    "group": "diaspora",
    "angle": "L'unité et la fierté des peuples noirs",
    "doorId": "personnalites"
  },
  {
    "id": "tubman",
    "category": "personnalites",
    "title": "Harriet Tubman",
    "subtitle": "États-Unis • Le courage de libérer les siens",
    "question": "En quoi l'héritage de Harriet Tubman et son combat pour « Le courage de libérer les siens » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Diaspora",
    "origin": "États-Unis",
    "group": "diaspora",
    "angle": "Le courage de libérer les siens",
    "doorId": "personnalites"
  },
  {
    "id": "angelou",
    "category": "personnalites",
    "title": "Maya Angelou",
    "subtitle": "États-Unis • La parole qui relève",
    "question": "En quoi l'héritage de Maya Angelou et son combat pour « La parole qui relève » ont-ils transformé votre vie ou votre art ?",
    "photoUrl": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    "badge": "Figure Diaspora",
    "origin": "États-Unis",
    "group": "diaspora",
    "angle": "La parole qui relève",
    "doorId": "personnalites"
  }
];

// 6. PRODUITS & SERVICES (16 entrées issues de nomenclature.json)
const produitsServicesList: ExplorerCatalogItem[] = [
  {
    "id": "mode",
    "category": "produits-services",
    "title": "Mode",
    "subtitle": "vêtements • wax • lin • chaussures • maroquinerie",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Mode » ?",
    "photoUrl": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "vêtements",
      "wax",
      "lin",
      "chaussures",
      "maroquinerie"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "bijoux",
    "category": "produits-services",
    "title": "Bijoux",
    "subtitle": "orfèvrerie • perles • pièces uniques",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Bijoux » ?",
    "photoUrl": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "orfèvrerie",
      "perles",
      "pièces uniques"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "maison",
    "category": "produits-services",
    "title": "Maison",
    "subtitle": "mobilier • vannerie • luminaires • décoration",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Maison » ?",
    "photoUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "mobilier",
      "vannerie",
      "luminaires",
      "décoration"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "artisanat",
    "category": "produits-services",
    "title": "Artisanat",
    "subtitle": "ustensiles • couteaux • outils • papeterie",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Artisanat » ?",
    "photoUrl": "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "ustensiles",
      "couteaux",
      "outils",
      "papeterie"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "art",
    "category": "produits-services",
    "title": "Art",
    "subtitle": "peinture • sculpture • photo • livres • musique",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Art » ?",
    "photoUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "peinture",
      "sculpture",
      "photo",
      "livres",
      "musique"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "beaute",
    "category": "produits-services",
    "title": "Beauté",
    "subtitle": "karité • huiles • savons • soins capillaires",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Beauté » ?",
    "photoUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "karité",
      "huiles",
      "savons",
      "soins capillaires"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "soins-du-corps",
    "category": "produits-services",
    "title": "Soins du corps",
    "subtitle": "massages • spas • rituels",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Soins du corps » ?",
    "photoUrl": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "massages",
      "spas",
      "rituels"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "plantes",
    "category": "produits-services",
    "title": "Plantes",
    "subtitle": "tisanes • super-aliments • élixirs",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Plantes » ?",
    "photoUrl": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "tisanes",
      "super-aliments",
      "élixirs"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "bien-etre",
    "category": "produits-services",
    "title": "Bien-être",
    "subtitle": "coaching • thérapies brèves • retraites",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Bien-être » ?",
    "photoUrl": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "coaching",
      "thérapies brèves",
      "retraites"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "epicerie",
    "category": "produits-services",
    "title": "Épicerie",
    "subtitle": "épices • café • miel • chocolat",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Épicerie » ?",
    "photoUrl": "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "épices",
      "café",
      "miel",
      "chocolat"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "terroir",
    "category": "produits-services",
    "title": "Terroir",
    "subtitle": "maraîchage • élevage • pêche • circuits courts",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Terroir » ?",
    "photoUrl": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "maraîchage",
      "élevage",
      "pêche",
      "circuits courts"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "cuisine",
    "category": "produits-services",
    "title": "Cuisine",
    "subtitle": "chefs • traiteurs • tables d'hôtes • ateliers",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Cuisine » ?",
    "photoUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "chefs",
      "traiteurs",
      "tables d'hôtes",
      "ateliers"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "voyage",
    "category": "produits-services",
    "title": "Voyage",
    "subtitle": "écolodges • séjours d'immersion • guides",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Voyage » ?",
    "photoUrl": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "écolodges",
      "séjours d'immersion",
      "guides"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "formation",
    "category": "produits-services",
    "title": "Formation",
    "subtitle": "masterclasses • stages • apprentissage",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Formation » ?",
    "photoUrl": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "masterclasses",
      "stages",
      "apprentissage"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "ecologie",
    "category": "produits-services",
    "title": "Écologie",
    "subtitle": "éco-construction • énergie solaire • réparation",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Écologie » ?",
    "photoUrl": "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "éco-construction",
      "énergie solaire",
      "réparation"
    ],
    "doorId": "produits-services"
  },
  {
    "id": "medias",
    "category": "produits-services",
    "title": "Médias",
    "subtitle": "vidéo • photo • design • digital • événementiel",
    "question": "Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « Médias » ?",
    "photoUrl": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    "badge": "Capsule vidéo 60-90s",
    "covers": [
      "vidéo",
      "photo",
      "design",
      "digital",
      "événementiel"
    ],
    "doorId": "produits-services"
  }
];

// 7. MARQUES (16 entrées issues de nomenclature.json)
const marquesList: ExplorerCatalogItem[] = [
  {
    "id": "beaute",
    "category": "marques",
    "title": "Beauté",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Beauté » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "mode",
    "category": "marques",
    "title": "Mode",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Mode » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "technologie",
    "category": "marques",
    "title": "Technologie",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Technologie » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "telecoms",
    "category": "marques",
    "title": "Télécoms",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Télécoms » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "banque",
    "category": "marques",
    "title": "Banque",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Banque » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "gastronomie",
    "category": "marques",
    "title": "Gastronomie",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Gastronomie » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "boissons",
    "category": "marques",
    "title": "Boissons",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Boissons » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "voyage",
    "category": "marques",
    "title": "Voyage",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Voyage » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "hotellerie",
    "category": "marques",
    "title": "Hôtellerie",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Hôtellerie » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "transport",
    "category": "marques",
    "title": "Transport",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Transport » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "sante",
    "category": "marques",
    "title": "Santé",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Santé » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "maison",
    "category": "marques",
    "title": "Maison",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Maison » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "energie",
    "category": "marques",
    "title": "Énergie",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Énergie » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "medias",
    "category": "marques",
    "title": "Médias",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Médias » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "education",
    "category": "marques",
    "title": "Éducation",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Éducation » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  },
  {
    "id": "sport",
    "category": "marques",
    "title": "Sport",
    "subtitle": "Secteur sponsor & partenaires d’impact",
    "question": "Comment votre entreprise du secteur « Sport » soutient-elle le témoignage authentique de ses clients et artisans ?",
    "photoUrl": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    "badge": "16 secteurs de sponsors",
    "doorId": "marques"
  }
];

// 8. PROJETS (16 entrées issues de nomenclature.json)
const projetsList: ExplorerCatalogItem[] = [
  {
    "id": "ecologie",
    "category": "projets",
    "title": "Écologie",
    "subtitle": "forêts sacrées • mangroves • biodiversité",
    "question": "Quel impact direct et transformation concrète votre cause « Écologie » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [
      "forêts sacrées",
      "mangroves",
      "biodiversité"
    ],
    "doorId": "projets"
  },
  {
    "id": "enfance",
    "category": "projets",
    "title": "Enfance",
    "subtitle": "Cause collective & bien commun",
    "question": "Quel impact direct et transformation concrète votre cause « Enfance » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [],
    "doorId": "projets"
  },
  {
    "id": "education",
    "category": "projets",
    "title": "Éducation",
    "subtitle": "écoles • bibliothèques",
    "question": "Quel impact direct et transformation concrète votre cause « Éducation » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [
      "écoles",
      "bibliothèques"
    ],
    "doorId": "projets"
  },
  {
    "id": "sante",
    "category": "projets",
    "title": "Santé",
    "subtitle": "Cause collective & bien commun",
    "question": "Quel impact direct et transformation concrète votre cause « Santé » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [],
    "doorId": "projets"
  },
  {
    "id": "agriculture",
    "category": "projets",
    "title": "Agriculture",
    "subtitle": "semences • jardins urbains",
    "question": "Quel impact direct et transformation concrète votre cause « Agriculture » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [
      "semences",
      "jardins urbains"
    ],
    "doorId": "projets"
  },
  {
    "id": "eau",
    "category": "projets",
    "title": "Eau",
    "subtitle": "Cause collective & bien commun",
    "question": "Quel impact direct et transformation concrète votre cause « Eau » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [],
    "doorId": "projets"
  },
  {
    "id": "energie",
    "category": "projets",
    "title": "Énergie",
    "subtitle": "solaire",
    "question": "Quel impact direct et transformation concrète votre cause « Énergie » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [
      "solaire"
    ],
    "doorId": "projets"
  },
  {
    "id": "habitat",
    "category": "projets",
    "title": "Habitat",
    "subtitle": "construction en terre • logements",
    "question": "Quel impact direct et transformation concrète votre cause « Habitat » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [
      "construction en terre",
      "logements"
    ],
    "doorId": "projets"
  },
  {
    "id": "femmes",
    "category": "projets",
    "title": "Femmes",
    "subtitle": "autonomie • tissage • naissance",
    "question": "Quel impact direct et transformation concrète votre cause « Femmes » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [
      "autonomie",
      "tissage",
      "naissance"
    ],
    "doorId": "projets"
  },
  {
    "id": "jeunesse",
    "category": "projets",
    "title": "Jeunesse",
    "subtitle": "Cause collective & bien commun",
    "question": "Quel impact direct et transformation concrète votre cause « Jeunesse » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [],
    "doorId": "projets"
  },
  {
    "id": "culture",
    "category": "projets",
    "title": "Culture",
    "subtitle": "cinéma • théâtre • livres • festivals • archives",
    "question": "Quel impact direct et transformation concrète votre cause « Culture » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [
      "cinéma",
      "théâtre",
      "livres",
      "festivals",
      "archives"
    ],
    "doorId": "projets"
  },
  {
    "id": "musique",
    "category": "projets",
    "title": "Musique",
    "subtitle": "centre de percussion",
    "question": "Quel impact direct et transformation concrète votre cause « Musique » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [
      "centre de percussion"
    ],
    "doorId": "projets"
  },
  {
    "id": "patrimoine",
    "category": "projets",
    "title": "Patrimoine",
    "subtitle": "vodoun • langues • mémoire des anciens",
    "question": "Quel impact direct et transformation concrète votre cause « Patrimoine » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [
      "vodoun",
      "langues",
      "mémoire des anciens"
    ],
    "doorId": "projets"
  },
  {
    "id": "artisanat",
    "category": "projets",
    "title": "Artisanat",
    "subtitle": "Cause collective & bien commun",
    "question": "Quel impact direct et transformation concrète votre cause « Artisanat » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [],
    "doorId": "projets"
  },
  {
    "id": "entrepreneuriat",
    "category": "projets",
    "title": "Entrepreneuriat",
    "subtitle": "Cause collective & bien commun",
    "question": "Quel impact direct et transformation concrète votre cause « Entrepreneuriat » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [],
    "doorId": "projets"
  },
  {
    "id": "solidarite",
    "category": "projets",
    "title": "Solidarité",
    "subtitle": "urgence • handicap • personnes âgées • réinsertion",
    "question": "Quel impact direct et transformation concrète votre cause « Solidarité » apporte-t-elle sur le terrain ?",
    "photoUrl": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
    "badge": "16 causes citoyennes",
    "covers": [
      "urgence",
      "handicap",
      "personnes âgées",
      "réinsertion"
    ],
    "doorId": "projets"
  }
];

function buildCatalogForDimension(dimId: string): ExplorerCatalogItem[] {
  const dim = DIMENSIONS.find(d => d.id === dimId);
  return getSubcategoriesForDimension(dimId).map(sc => ({
    id: sc.slug,
    category: dimId as ExplorerCategoryType,
    title: sc.label,
    subtitle: sc.tagline || dim?.tagline || '',
    question: sc.question,
    photoUrl: sc.photoUrl || dim?.coverImage || '/assets/doors/door-sagesses.jpg',
    accentColor: sc.accentColor || dim?.accentColor,
    badge: sc.badge || `Porte ${dim?.label || ''}`,
    doorId: dimId,
    covers: [sc.slug],
    iconName: sc.icone,
  } as ExplorerCatalogItem));
}

export const EXPLORER_CATALOG: Record<string, ExplorerCatalogItem[]> = {
  series: seriesList,
  sagesses: buildCatalogForDimension('sagesses'),
  territoires: buildCatalogForDimension('territoires'),
  expertises: buildCatalogForDimension('expertises'),
  'produits-services': buildCatalogForDimension('produits-services'),
  projets: buildCatalogForDimension('projets'),
  marques: buildCatalogForDimension('marques'),
  personnalites: buildCatalogForDimension('personnalites'),
  'figures-du-quotidien': buildCatalogForDimension('figures-du-quotidien'),
  evenements: buildCatalogForDimension('evenements'),
  communautes: buildCatalogForDimension('communautes'),
  institutions: buildCatalogForDimension('institutions'),
  objets: buildCatalogForDimension('objets'),
  'savoir-faire': buildCatalogForDimension('savoir-faire'),
  passions: buildCatalogForDimension('passions'),
  'moments-de-vie': buildCatalogForDimension('moments-de-vie'),

  // ALIAS DE RÉTROCOMPATIBILITÉ (Permet de ne rien casser dans les composants existants)
  questions: buildCatalogForDimension('sagesses'),
  countries: buildCatalogForDimension('territoires'),
  thematics: buildCatalogForDimension('expertises'),
  personalities: buildCatalogForDimension('personnalites'),
  offers: buildCatalogForDimension('produits-services'),
  brands: buildCatalogForDimension('marques'),
  projects: buildCatalogForDimension('projets')
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
  'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80'
];

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

export const BENIN_STORIES: AffiliationPerson[] = [
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
    teaserPitch: '« Quand un enfant béninois des quartiers pauvres entre dans un musée et dit \"C’est beau, je peux le faire aussi\", nous avons gagné pour cent ans. »',
    generation: 1
  }
];

// =========================================================================
// FONCTION UNIVERSELLE : RÉCUPÉRER 16 HISTOIRES POUR N'IMPORTE QUEL SUJET
// =========================================================================
export function get16StoriesForTopic(topicId: string, shuffleSeed: number = 0): AffiliationPerson[] {
  if (topicId === 'benin' && shuffleSeed === 0) {
    return BENIN_STORIES.slice(0, 16);
  }

  let targetItem: ExplorerCatalogItem | null = null;
  let targetCategory: string = 'expertises';

  for (const cat of Object.keys(EXPLORER_CATALOG)) {
    const found = EXPLORER_CATALOG[cat].find(i => i.id === topicId);
    if (found) {
      targetItem = found;
      targetCategory = cat;
      break;
    }
  }

  const title = targetItem?.title || topicId.replace(/-/g, ' ');
  const flag = targetItem?.flag || '🌍';

  let topicHash = 0;
  for (let c = 0; c < topicId.length; c++) {
    topicHash = ((topicHash << 5) - topicHash + topicId.charCodeAt(c)) | 0;
  }
  const positiveHash = Math.abs(topicHash);

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

    const { role, story, pitch } = generateRoleAndPitch(targetCategory, title, i, shuffleSeed + (positiveHash % 17), targetItem);

    const territory = (targetCategory === 'territoires' || targetCategory === 'countries')
      ? getTerritoryForCountryAndSeed(topicId, i + shuffleSeed)
      : getTerritoryForSeed(i + seedOffset + (positiveHash % 11));

    const country = (targetCategory === 'territoires' || targetCategory === 'countries')
      ? title
      : getCountryForSeed(i + seedOffset + (positiveHash % 7));

    const itemFlag = (targetCategory === 'territoires' || targetCategory === 'countries')
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

function generateRoleAndPitch(
  category: string, 
  title: string, 
  index: number, 
  seed: number,
  targetItem?: ExplorerCatalogItem | null
): { role: string; story: string; pitch: string } {
  const batchNum = seed + 1;

  if (category === 'personnalites' || category === 'personalities') {
    const angle = targetItem?.angle || 'le combat pour la dignité';
    const roles = [
      `Témoin direct & héritier de l'esprit de ${title}`,
      `Créateur inspiré par ${title} et ${angle}`,
      `Sociologue des cultures panafricaines & biographe de ${title}`,
      `Artiste de scène portant le message de ${title}`,
      `Éducateur transmettant la philosophie de ${title}`,
      `Militant de terrain pour ${angle} dans le sillage de ${title}`
    ];
    const quotes = [
      `« Ce que ${title} a changé en moi, c'est la certitude que ${angle} n'est pas une option, c'est un devoir d'existence. »`,
      `« Raconter l'héritage de ${title}, c'est redonner à notre jeunesse le miroir de sa propre souveraineté. »`,
      `« Dans les moments où tout vacille, la mémoire de ${title} me rappelle d'où je viens et pourquoi je reste debout. »`
    ];
    return {
      role: roles[index % roles.length],
      story: `Témoigne de ce que ${title} a transformé dans son art et son engagement (vol. ${batchNum}).`,
      pitch: quotes[(index + seed) % quotes.length]
    };
  }

  if (category === 'sagesses' || category === 'questions') {
    const question = targetItem?.question || 'Quelle épreuve vous a transformé ?';
    const roles = [
      `Témoin face caméra • Sagesse : ${title}`,
      `Passeur d'expérience vécue sur ${title}`,
      `Aîné partageant son cheminement sur ${title}`,
      `Jeune voix témoignant de sa traversée de ${title}`
    ];
    return {
      role: roles[index % roles.length],
      story: `Répond face caméra à la question : « ${question} »`,
      pitch: `« Quand on traverse l'épreuve de ${title.toLowerCase()}, on découvre une vérité en soi qu'aucun livre ne peut enseigner. »`
    };
  }

  if (category === 'expertises' || category === 'thematics') {
    const coversStr = targetItem?.covers?.join(', ') || 'savoir-faire d’exception';
    const roles = [
      `Maître artisan & praticien en ${title}`,
      `Compagnon transmetteur (${coversStr})`,
      `Créateur d'atelier spécialisé en ${title}`,
      `Jeune apprenti formé aux exigences de ${title}`
    ];
    return {
      role: roles[index % roles.length],
      story: `Pitch vidéo de son métier et de ses gestes d'excellence en ${title} (vol. ${batchNum}).`,
      pitch: `« Le geste de notre métier en ${title.toLowerCase()} demande patience et rigueur : la matière ne ment jamais. »`
    };
  }

  if (category === 'produits-services' || category === 'offers') {
    const coversStr = targetItem?.covers?.join(', ') || 'créations artisanales';
    const roles = [
      `Créateur d'offre éthique en ${title}`,
      `Artisan d'atelier (${coversStr})`,
      `Fondateur d'atelier & capsule vidéo 60-90s`,
      `Praticien indépendant du secteur ${title}`
    ];
    return {
      role: roles[index % roles.length],
      story: `Présente en capsule vidéo de 60-90s ses offres et créations en ${title}.`,
      pitch: `« Notre offre en ${title.toLowerCase()} privilégie la matière noble, le circuit court et le prix juste. »`
    };
  }

  if (category === 'marques' || category === 'brands') {
    const roles = [
      `Partenaire sponsor & artisan engagé du secteur ${title}`,
      `Client témoin de la relation de confiance en ${title}`,
      `Responsable d'atelier de production éthique en ${title}`,
      `Pionnier des circuits responsables dans le domaine ${title}`
    ];
    return {
      role: roles[index % roles.length],
      story: `Témoigne de l'authenticité et de l'éthique de la marque dans le secteur ${title}.`,
      pitch: `« Dans le secteur ${title.toLowerCase()}, la confiance se gagne par la preuve des actes et la transparence. »`
    };
  }

  if (category === 'projets' || category === 'projects') {
    const coversStr = targetItem?.covers?.join(', ') || 'initiative d’impact';
    const roles = [
      `Bâtisseur de terrain pour la cause ${title}`,
      `Coordinateur de projet citoyen (${coversStr})`,
      `Porteur d'initiative en financement participatif`,
      `Bénévole engagé au cœur de la cause ${title}`
    ];
    return {
      role: roles[index % roles.length],
      story: `Mobilise pour la cause ${title} (${coversStr}) et rend compte des victoires tangibles.`,
      pitch: `« Notre cause pour ${title.toLowerCase()} prouve par l'exemple qu'une action collective sur le terrain transforme des vies. »`
    };
  }

  if (targetItem?.question) {
    const question = targetItem.question;
    const roles = [
      `Témoin face caméra • ${title}`,
      `Passeur d'expérience sur ${title}`,
      `Aîné partageant son cheminement sur ${title}`,
      `Jeune voix témoignant de ${title}`
    ];
    return {
      role: roles[index % roles.length],
      story: `Répond face caméra à la question : « ${question} »`,
      pitch: `« Transmettre autour de ${title.toLowerCase()}, c'est offrir aux autres une clé précieuse d'élévation et de dignité. »`
    };
  }

  // Territoires et univers par défaut
  return {
    role: `Gardien du terroir & témoin de ${title}`,
    story: `Partage la mémoire vivante et les savoirs de son terroir (${title}).`,
    pitch: `« Notre terroir de ${title} porte en lui des trésors de sagesse que nous transmettons de génération en génération. »`
  };
}

function getTerritoryForCountryAndSeed(country: string, seed: number): string {
  const regions: Record<string, string[]> = {
    'benin': ['Ouidah', 'Porto-Novo', 'Abomey', 'Ganvié', 'Natitingou', 'Grand-Popo'],
    'senegal': ['Dakar', 'Saint-Louis', 'Casamance', 'Touba', 'Gorée', 'Sine Saloum'],
    'cote-d-ivoire': ['Abidjan', 'Grand-Bassam', 'Yamoussoukro', 'Korhogo', 'Man'],
    'ghana': ['Accra', 'Kumasi', 'Cape Coast', 'Tamale'],
    'nigeria': ['Lagos', 'Ibadan', 'Abuja', 'Calabar', 'Benin City'],
    'rdc': ['Kinshasa', 'Lubumbashi', 'Goma', 'Kisangani'],
    'ethiopie': ['Addis-Abeba', 'Lalibela', 'Gondar', 'Harar'],
    'afrique-du-sud': ['Johannesburg', 'Le Cap', 'Durban', 'Soweto'],
    'haiti': ['Port-au-Prince', 'Jacmel', 'Cap-Haïtien'],
    'bresil': ['Salvador de Bahia', 'Rio de Janeiro', 'Recife', 'São Paulo'],
    'cuba': ['La Havane', 'Santiago de Cuba', 'Trinidad'],
    'etats-unis': ['La Nouvelle-Orléans', 'New York', 'Atlanta', 'Chicago'],
    'france': ['Paris', 'Marseille', 'Lyon', 'Bordeaux'],
    'perou': ['Cusco', 'Lima', 'Vallée Sacrée', 'Arequipa'],
    'japon': ['Kyoto', 'Tokyo', 'Nara', 'Okinawa'],
    'inde': ['Varanasi', 'Kerala', 'Jaipur', 'Mumbai']
  };
  const list = regions[country.toLowerCase()] || ['Capitale', 'Terroir', 'Vallée'];
  return list[seed % list.length];
}

function getTerritoryForSeed(seed: number): string {
  const places = ['Ouidah', 'Dakar', 'Abidjan', 'Kumasi', 'Lagos', 'Salvador', 'Cusco', 'Paris', 'Harar'];
  return places[seed % places.length];
}

function getCountryForSeed(seed: number): string {
  const countries = ['Bénin', 'Sénégal', 'Côte d’Ivoire', 'Ghana', 'Nigeria', 'Brésil', 'Pérou', 'France', 'Éthiopie'];
  return countries[seed % countries.length];
}

function getFlagForSeed(seed: number): string {
  const flags = ['🇧🇯', '🇸🇳', '🇨🇮', '🇬🇭', '🇳🇬', '🇧🇷', '🇵🇪', '🇫🇷', '🇪🇹'];
  return flags[seed % flags.length];
}

const COUNTRY_CODES: Record<string, string> = {
  'benin': 'bj',
  'senegal': 'sn',
  'cote-d-ivoire': 'ci',
  'ghana': 'gh',
  'nigeria': 'ng',
  'rdc': 'cd',
  'ethiopie': 'et',
  'afrique-du-sud': 'za',
  'haiti': 'ht',
  'bresil': 'br',
  'cuba': 'cu',
  'etats-unis': 'us',
  'france': 'fr',
  'perou': 'pe',
  'japon': 'jp',
  'inde': 'in'
};

export function getCountryFlagUrl(countryId: string): string {
  const code = COUNTRY_CODES[countryId.toLowerCase()] || 'bj';
  return `https://flagcdn.com/w80/${code}.png`;
}
