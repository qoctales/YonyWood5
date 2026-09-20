import { ExplorerTopicItem, ExplorerStoryItem } from '../types';

export const EXPLORER_TOPICS: ExplorerTopicItem[] = [
  // Thématiques
  {
    id: 'theme-transmission',
    title: 'Transmission',
    category: 'thematics',
    tagline: '16 voix et passeurs de savoirs ancestraux'
  },
  {
    id: 'theme-racines',
    title: 'Racines & Mémoires',
    category: 'thematics',
    tagline: '16 récits sur l’ancrage et la fidélité aux origines'
  },
  {
    id: 'theme-metamorphose',
    title: 'Métamorphose',
    category: 'thematics',
    tagline: '16 traversées de renaissance et d’épreuves transformées'
  },

  // Mots-clés / Sujets
  {
    id: 'topic-michael-jackson',
    title: 'Michael Jackson',
    category: 'topics',
    tagline: '16 récits personnels sur l’éveil artistique et l’influence'
  },
  {
    id: 'topic-jazz-spiritualite',
    title: 'Jazz & Transe',
    category: 'topics',
    tagline: '16 improvisations et correspondances mystiques'
  },
  {
    id: 'topic-architecture-terre',
    title: 'Architecture de terre',
    category: 'topics',
    tagline: '16 bâtisseurs du vivant et matières vernaculaires'
  },

  // Offres
  {
    id: 'offer-massage-ancestral',
    title: 'Massage ancestral',
    category: 'offers',
    tagline: '16 praticiens et histoires autour du soin du corps'
  },
  {
    id: 'offer-tissage-artisanal',
    title: 'Tissage d’art',
    category: 'offers',
    tagline: '16 maîtres artisans et fibres vivantes'
  },
  {
    id: 'offer-ceramique-rituelle',
    title: 'Céramique sacrée',
    category: 'offers',
    tagline: '16 potières et sculpteurs du feu'
  },

  // Opportunités
  {
    id: 'opp-mentorat-transmission',
    title: 'Mentorat & Apprentissage',
    category: 'opportunities',
    tagline: '16 opportunités d’immersion auprès d’anciens'
  },
  {
    id: 'opp-financement-solidaire',
    title: 'Financement solidaire',
    category: 'opportunities',
    tagline: '16 initiatives collectives en quête de soutiens'
  },
  {
    id: 'opp-residence-creation',
    title: 'Résidence de création',
    category: 'opportunities',
    tagline: '16 ateliers ouverts aux artistes et chercheurs'
  },

  // Entreprises & Marques
  {
    id: 'brand-nike',
    title: 'Nike',
    category: 'brands',
    tagline: '16 regards singuliers sur le mouvement et la culture urbaine'
  },
  {
    id: 'brand-maisons-artisanat',
    title: 'Maisons de Terroir',
    category: 'brands',
    tagline: '16 récits d’ateliers et d’alliances d’exception'
  }
];

const TEASER_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
];

// Pool de 32 histoires pour Michael Jackson (permettant d'actualiser avec 16 autres histoires)
const MJ_NAMES = [
  { name: 'Marcus Sterling', first: 'Marcus', age: 38, role: 'Chorégraphe & Danseur urbain', territory: 'Harlem', country: 'États-Unis', flag: '🇺🇸', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', pitch: '« Quand j’ai vu le pas de recul pour la première fois sur une cassette VHS, mon rapport à la gravité a changé pour toujours. »' },
  { name: 'Sora Tanaka', first: 'Sora', age: 29, role: 'Ingénieur du son analogique', territory: 'Tokyo', country: 'Japon', flag: '🇯🇵', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', pitch: '« La précision du mixage rythmique de Quincy Jones et Michael reste la Bible absolue de mon studio. »' },
  { name: 'Amina Diop', first: 'Amina', age: 34, role: 'Danseuse de sabar traditionnel', territory: 'Dakar', country: 'Sénégal', flag: '🇸🇳', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', pitch: '« Dans nos cercles de danse à Dakar, nous mêlions les cassures de Michael aux polyrythmies des tambours. »' },
  { name: 'Thiago Silva', first: 'Thiago', age: 41, role: 'Percussionniste d’Olodum', territory: 'Salvador de Bahia', country: 'Brésil', flag: '🇧🇷', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80', pitch: '« J’avais 12 ans sur le Pelourinho quand il est venu tourner le clip avec nos tambours. Cette journée a scellé ma vocation. »' },
  { name: 'Éléonore Vasseur', first: 'Éléonore', age: 44, role: 'Costumière de haute voltige', territory: 'Paris', country: 'France', flag: '🇫🇷', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', pitch: '« Le gant unique orné de strass : comment un simple détail vestimentaire devient le symbole planétaire d’une posture. »' },
  { name: 'Kwame Mensah', first: 'Kwame', age: 52, role: 'Historien des musiques populaires', territory: 'Accra', country: 'Ghana', flag: '🇬🇭', pitch: '« Sa visite en Afrique de l’Ouest en 1992 était une reconnexion spirituelle avec le berceau de la pulsation noire. »', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80' },
  { name: 'Elena Rostova', first: 'Elena', age: 31, role: 'Soliste classique & compositrice', territory: 'Saint-Pétersbourg', country: 'Russie', flag: '🇷🇺', pitch: '« Les orchestrations cordes de ses ballades rivalisent avec les plus grands mouvements romantiques du XIXe siècle. »', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80' },
  { name: 'Babacar Traoré', first: 'Babacar', age: 49, role: 'Luthier & guitariste', territory: 'Bamako', country: 'Mali', flag: '🇲🇱', pitch: '« J’ai appris à accorder ma kora sur les lignes de basse syncopées de Billie Jean. »', photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80' },
  { name: 'Maya Lin', first: 'Maya', age: 27, role: 'Réalisatrice de clips vidéo', territory: 'Hong Kong', country: 'Chine', flag: '🇭🇰', pitch: '« Thriller a inventé le court-métrage musical comme forme cinématographique à part entière. »', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' },
  { name: 'Diego Morales', first: 'Diego', age: 36, role: 'Danseur de tango contemporain', territory: 'Buenos Aires', country: 'Argentine', flag: '🇦🇷', pitch: '« La tension du buste et l’arrêt net : nous avons incorporé ses isolations corporelles dans la milonga moderne. »', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80' },
  { name: 'Fatouma Zahra', first: 'Fatouma', age: 40, role: 'Sociologue des icônes mondiales', territory: 'Casablanca', country: 'Maroc', flag: '🇲🇦', pitch: '« Il a été le premier visage noir à franchir toutes les barrières télévisuelles sans renier sa virtuosité. »', photo: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80' },
  { name: 'Liam O’Connor', first: 'Liam', age: 45, role: 'Technicien lumière de concert', territory: 'Dublin', country: 'Irlande', flag: '🇮🇪', pitch: '« Le halo blanc zénithal sur fond obscur : une révolution scénographique qui a redéfini les tournées en stade. »', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80' },
  { name: 'Zandile Ndlovu', first: 'Zandile', age: 33, role: 'Chanteuse a cappella', territory: 'Soweto', country: 'Afrique du Sud', flag: '🇿🇦', pitch: '« Les harmonies vocales empilées dans Man in the Mirror nous ont accompagnés durant les veillées de prière. »', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
  { name: 'Kenji Sato', first: 'Kenji', age: 42, role: 'Collectionneur d’archives sonores', territory: 'Kyoto', country: 'Japon', flag: '🇯🇵', pitch: '« J’ai passé vingt ans à retrouver les prises vocales brutes non éditées : la respiration pure d’un instrument vivant. »', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Clara Benitez', first: 'Clara', age: 35, role: 'Professeure d’expression scénique', territory: 'Madrid', country: 'Espagne', flag: '🇪🇸', pitch: '« Le silence entre deux notes : c’est là où Michael créait l’attente la plus intense du public. »', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80' },
  { name: 'Jonas Lindqvist', first: 'Jonas', age: 48, role: 'Producteur pop scandinave', territory: 'Stockholm', country: 'Suède', flag: '🇸🇪', pitch: '« Chaque refrain de son répertoire est pensé comme un diamant taillé au millimètre pour traverser les décennies. »', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
  // Lot 2 (actualisation)
  { name: 'Gilles Dossou', first: 'Gilles', age: 39, role: 'Danseur acrobatique & mime', territory: 'Cotonou', country: 'Bénin', flag: '🇧🇯', pitch: '« Nous reproduisions ses pas sur le sable chaud de Fidjrossè jusqu’à ce que le mouvement devienne fluide. »', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Chloé Fontaine', first: 'Chloé', age: 28, role: 'Illustratrice & biographe', territory: 'Montréal', country: 'Canada', flag: '🇨🇦', pitch: '« Dessiner ses mains et sa silhouette, c’est étudier une calligraphie vivante de l’énergie scénique. »', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
  { name: 'Mateo Rossi', first: 'Mateo', age: 46, role: 'Directeur de festival de danse', territory: 'Rome', country: 'Italie', flag: '🇮🇹', pitch: '« Il a réuni Fred Astaire et les rues du Bronx dans une synthèse que personne n’a encore égalée. »', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80' },
  { name: 'Nadia El-Fassi', first: 'Nadia', age: 37, role: 'Musicothérapeute', territory: 'Tunis', country: 'Tunisie', flag: '🇹🇳', pitch: '« La candeur de ses premières chansons d’enfance répare souvent des nœuds émotionnels chez mes patients. »', photo: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80' },
  { name: 'Tenzin Norbu', first: 'Tenzin', age: 50, role: 'Moine & calligraphe du son', territory: 'Dharamsala', country: 'Inde', flag: '🇮🇳', pitch: '« La recherche de la vibration pure et la dévotion totale à son art touchent à une forme de méditation en mouvement. »', photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80' },
  { name: 'Abeba Tesfaye', first: 'Abeba', age: 32, role: 'Violoniste de jazz éthiopien', territory: 'Addis-Abeba', country: 'Éthiopie', flag: '🇪🇹', pitch: '« Reprendre ses thèmes en gammes pentatoniques éthiopiennes révèle l’universalité de ses mélodies. »', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
  { name: 'Sergei Volkov', first: 'Sergei', age: 43, role: 'Ingénieur d’effets visuels', territory: 'Berlin', country: 'Allemagne', flag: '🇩🇪', pitch: '« Le clip de Black or White a introduit le morphing numérique dans la conscience collective mondiale. »', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80' },
  { name: 'Priya Sharma', first: 'Priya', age: 30, role: 'Chorégraphe de cinéma', territory: 'Mumbai', country: 'Inde', flag: '🇮🇳', pitch: '« L’industrie de Bollywood tout entière a été irriguée par ses mouvements de hanches et son énergie collective. »', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' },
  { name: 'Kofi Mensah', first: 'Kofi', age: 55, role: 'Maître batteur traditionnel', territory: 'Kumasi', country: 'Ghana', flag: '🇬🇭', pitch: '« Le beatbox qu’il faisait au micro avant d’enregistrer était d’une polyrythmie africaine stupéfiante. »', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80' },
  { name: 'Helena Santos', first: 'Helena', age: 41, role: 'Sociologue de la culture pop', territory: 'Lisbonne', country: 'Portugal', flag: '🇵🇹', pitch: '« Il a incarné la première utopie d’une fraternité globale réunie devant un même écran. »', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80' },
  { name: 'Damian Brooks', first: 'Damian', age: 36, role: 'Danseur de popping', territory: 'Chicago', country: 'États-Unis', flag: '🇺🇸', pitch: '« Les pionniers du popping lui ont transmis les clés, et il en a fait un langage universel pour la jeunesse. »', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Camille Roche', first: 'Camille', age: 33, role: 'Compositrice de musiques de films', territory: 'Bruxelles', country: 'Belgique', flag: '🇧🇪', pitch: '« La structure harmonique de ses ponts musicaux est d’une complexité raffinée sous une apparente simplicité. »', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
  { name: 'Ibrahim Diallo', first: 'Ibrahim', age: 47, role: 'Animateur radio & archiviste', territory: 'Conakry', country: 'Guinée', flag: '🇬🇳', pitch: '« Diffuser ses morceaux en pleine nuit provoquait toujours des appels d’auditeurs émus aux quatre coins du pays. »', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Léa Martinez', first: 'Léa', age: 26, role: 'Danseuse contemporaine', territory: 'Lyon', country: 'France', flag: '🇫🇷', pitch: '« Dans nos pièces contemporaines les plus abstraites, son sens de la rupture rythmique continue de vivre. »', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
  { name: 'Ousmane Bamba', first: 'Ousmane', age: 51, role: 'Sculpteur sur bronze', territory: 'Bobo-Dioulasso', country: 'Burkina Faso', flag: '🇧🇫', pitch: '« J’ai sculpté une silhouette suspendue en plein vol : l’instant où le corps semble échapper à la terre. »', photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80' },
  { name: 'Yuki Takahashi', first: 'Yuki', age: 35, role: 'DJ & producteur électronique', territory: 'Osaka', country: 'Japon', flag: '🇯🇵', pitch: '« Ses ad-libs et ses respirations rythmiques sont la base des rythmiques funk les plus organiques. »', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' }
];

// Générateur d'histoires Explorer
export function generateExplorerStoriesForTopic(topicId: string): ExplorerStoryItem[] {
  if (topicId === 'topic-michael-jackson') {
    return MJ_NAMES.map((person, index) => ({
      id: `mj-story-${index + 1}`,
      topicId: 'topic-michael-jackson',
      protagonistIdRef: `mj-protagonist-${index + 1}`,
      name: person.name,
      firstName: person.first,
      age: person.age,
      role: person.role,
      territory: person.territory,
      country: person.country,
      flag: person.flag,
      photoUrl: person.photo,
      teaserVideoUrl: TEASER_VIDEOS[index % TEASER_VIDEOS.length],
      teaserPitch: person.pitch,
      storyTitle: `Récit de ${person.first} sur Michael Jackson`,
      universeTag: 'Michael Jackson'
    }));
  }

  // Base universelle pour les autres sujets (16 à 32 personnes thématiques)
  const defaultPrefix = topicId.replace(/^(theme|topic|offer|opp|brand)-/, '');
  const humanSubjects = [
    { name: 'Séfako Gbaguidi', first: 'Séfako', age: 58, role: 'Passeur de lignée & Maître de chant', territory: 'Abomey', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' },
    { name: 'Mariama Traoré', first: 'Mariama', age: 43, role: 'Praticienne herboriste & tisseuse', territory: 'Segou', country: 'Mali', flag: '🇲🇱', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
    { name: 'Joaquim Da Silva', first: 'Joaquim', age: 62, role: 'Gardien des carrefours & forgeron', territory: 'Ouidah', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80' },
    { name: 'Yolande Koudjo', first: 'Yolande', age: 39, role: 'Potière rituelle & créatrice de formes', territory: 'Ganvié', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Dah Zounon', first: 'Dah', age: 68, role: 'Sage & Gardien de sanctuaire', territory: 'Allada', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' },
    { name: 'Sœur Blandine', first: 'Blandine', age: 46, role: 'Religieuse & botaniste médicinale', territory: 'Bembèrèkè', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Awa Cissé', first: 'Awa', age: 32, role: 'Médiatrice culturelle & conteuse', territory: 'Saint-Louis', country: 'Sénégal', flag: '🇸🇳', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' },
    { name: 'Hervé Houndété', first: 'Hervé', age: 47, role: 'Architecte en terre stabilisée', territory: 'Porto-Novo', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
    { name: 'Nafissatou Diallo', first: 'Nafissatou', age: 36, role: 'Maître teinturière à l’indigo', territory: 'Kindia', country: 'Guinée', flag: '🇬🇳', photo: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80' },
    { name: 'Koffi Mensah', first: 'Koffi', age: 53, role: 'Sculpteur de pirogues sacrées', territory: 'Grand-Popo', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80' },
    { name: 'Béatrice Dossou', first: 'Béatrice', age: 41, role: 'Praticienne en massages traditionnels', territory: 'Cotonou', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
    { name: 'Tidiane Ba', first: 'Tidiane', age: 60, role: 'Griot & historien oral', territory: 'Matam', country: 'Sénégal', flag: '🇸🇳', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80' },
    { name: 'Clémence Hounkpatin', first: 'Clémence', age: 34, role: 'Designer de perles & parures royales', territory: 'Ouidah', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Félix Agbanglanon', first: 'Félix', age: 50, role: 'Apiculteur traditionnel de mangrove', territory: 'Agatogbo', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
    { name: 'Fatoumata Keita', first: 'Fatoumata', age: 29, role: 'Agricultrice en semences paysannes', territory: 'Sikasso', country: 'Mali', flag: '🇲🇱', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Gaston Gnanhoui', first: 'Gaston', age: 66, role: 'Maître tambour & fabricant d’instruments', territory: 'Dassa-Zoumè', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80' },
    // 16 de plus pour l'actualisation
    { name: 'Aimé Lokossou', first: 'Aimé', age: 42, role: 'Vannier & tresseur de nattes d’eau', territory: 'Ganvié', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' },
    { name: 'Chantal Houinato', first: 'Chantal', age: 37, role: 'Conservatrice de contes & légendes', territory: 'Natitingou', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
    { name: 'Salif Sanogo', first: 'Salif', age: 48, role: 'Maître forgeron des houes rituelles', territory: 'Koutiala', country: 'Mali', flag: '🇲🇱', photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80' },
    { name: 'Inès Agossa', first: 'Inès', age: 31, role: 'Styliste & valorisatrice de pagne tissé', territory: 'Cotonou', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' },
    { name: 'Michel Todjinou', first: 'Michel', age: 54, role: 'Pêcheur gardien des frayères', territory: 'Lac Nokoué', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
    { name: 'Solange Kpado', first: 'Solange', age: 45, role: 'Herboriste & distillatrice de plantes', territory: 'Djougou', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80' },
    { name: 'Mamadou Touré', first: 'Mamadou', age: 38, role: 'Cordonnier & travailleur de cuir tanné', territory: 'Niamey', country: 'Niger', flag: '🇳🇪', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80' },
    { name: 'Victoire Dossou-Yovo', first: 'Victoire', age: 35, role: 'Chanteuse des rituels de naissance', territory: 'Abomey-Calavi', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Émile Houndégla', first: 'Émile', age: 63, role: 'Maître charpentier de toitures traditionnelles', territory: 'Kétou', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
    { name: 'Fatou Sow', first: 'Fatou', age: 40, role: 'Médiatrice de conflits communautaires', territory: 'Ziguinchor', country: 'Sénégal', flag: '🇸🇳', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Blaise Agbo', first: 'Blaise', age: 51, role: 'Producteur de café biologique & forestier', territory: 'Kloto', country: 'Togo', flag: '🇹🇬', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80' },
    { name: 'Nathalie Mensah', first: 'Nathalie', age: 28, role: 'Restauratrice d’artisanat ancien', territory: 'Lomé', country: 'Togo', flag: '🇹🇬', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
    { name: 'Lambert Zinsou', first: 'Lambert', age: 59, role: 'Fabricant de flûtes rituelles en bambou', territory: 'Savalou', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' },
    { name: 'Régine Adanho', first: 'Régine', age: 49, role: 'Prêtresse des eaux et protectrice de sources', territory: 'Lac Ahémé', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Seydou Coulibaly', first: 'Seydou', age: 33, role: 'Sculpteur de masques et passeur d’histoires', territory: 'San', country: 'Mali', flag: '🇲🇱', photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80' },
    { name: 'Esther Gnacadja', first: 'Esther', age: 36, role: 'Archiviste des mémoires villageoises', territory: 'Bohicon', country: 'Bénin', flag: '🇧🇯', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' }
  ];

  return humanSubjects.map((person, index) => ({
    id: `${defaultPrefix}-story-${index + 1}`,
    topicId,
    protagonistIdRef: `${defaultPrefix}-protagonist-${index + 1}`,
    name: person.name,
    firstName: person.first,
    age: person.age,
    role: person.role,
    territory: person.territory,
    country: person.country,
    flag: person.flag,
    photoUrl: person.photo,
    teaserVideoUrl: TEASER_VIDEOS[index % TEASER_VIDEOS.length],
    teaserPitch: `« Témoignage et regard singulier de ${person.first} sur ${defaultPrefix.replace(/-/g, ' ')}. »`,
    storyTitle: `L'histoire de ${person.first}`,
    universeTag: defaultPrefix.replace(/-/g, ' ')
  }));
}
