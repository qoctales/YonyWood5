import { AffiliationPerson, Protagonist } from '../types';
import { PROTAGONISTS } from '../data/mockData';
import { MATRIX_SERIES_DATA } from '../data/matrixData';
import { BENIN_STORIES } from '../data/explorerTopicsData';

export interface LineageMember {
  id: string;
  name: string;
  firstName?: string;
  age?: number;
  role: string;
  territory: string;
  country: string;
  flag: string;
  photoUrl: string;
  teaserVideoUrl?: string;
  universeTag?: string;
  quote?: string;
  questionAnswered?: {
    question: string;
    answer: string;
  };
  invitationStory?: string;
  acceptanceDate?: string;
  isPioneer?: boolean;
  isFounder?: boolean;
  sharesCount?: number;
}

export interface LineageTree {
  current: LineageMember;
  ascendants: LineageMember[]; // Au moins 4 ascendants quand disponible, jusqu'au fondateur
  descendants: LineageMember[]; // 0 à 4 enfants cooptés maximum
  maxChildren: number;
  sharePercentage: number; // 4%
  ruleSummary: string;
}

// Couleurs canoniques de la Lignée définies avec le créateur
export const LINEAGE_COLORS = {
  honey: '#C89B3C',      // Lignée ascendante (Miel doré chaud : parrain, transmission reçue)
  honeyLight: '#E8C576',
  terracotta: '#A2482B', // Lignée descendante (Terre cuite : enfants cooptés, transmission donnée)
  terracottaLight: '#C46A4D',
  terracottaBorder: '#C85A32', // Double liseré terre cuite chaud pour membres fondateurs
  charcoal: '#1C1917',
  sand: '#F7F5F0',
  cream: '#FCFBF7'
};

// Catalogue étendu d'ancêtres remontant jusqu'aux fondateurs racines
export const ANCESTOR_POOL: LineageMember[] = [
  {
    id: 'anc-dah-zounon',
    name: 'Mahougnon Zounon',
    firstName: 'Mahougnon',
    age: 78,
    role: 'Gardien du sanctuaire d’Èṣù & Passeur d’arcanes',
    territory: 'Ouidah & Allada',
    country: 'Bénin',
    flag: '🇧🇯',
    photoUrl: '/assets/duos/dah-zounon.jpg',
    universeTag: 'Èṣù',
    quote: '« La lignée n’est pas une chaîne qui entrave, c’est une sève qui féconde les racines invisibles. »',
    questionAnswered: {
      question: 'Comment ouvrir les voies quand toutes les portes semblent closes ?',
      answer: 'En honorant les seuils et en n’exigeant jamais que le carrefour s’adapte à notre impatience.'
    },
    invitationStory: 'A transmis les chants des carrefours et le sceau des alliances inviolables.',
    acceptanceDate: 'Alliance ancestrale scellée',
    isPioneer: true,
    isFounder: true
  },
  {
    id: 'anc-kpodan-yeyinou',
    name: 'Yéyinou Kpodan',
    firstName: 'Yéyinou',
    age: 71,
    role: 'Aïeule potière des terres sacrées & Gardienne du feu',
    territory: 'Sé & Mono',
    country: 'Bénin',
    flag: '🇧🇯',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    universeTag: 'Terre & Argile',
    quote: '« L’argile ne ment jamais : elle garde l’empreinte de l’amour comme celle de la hâte. »',
    questionAnswered: {
      question: 'Quel est le secret de ce qui traverse le temps sans se briser ?',
      answer: 'Laisser sécher l’esprit avant de l’exposer au grand feu du monde.'
    },
    invitationStory: 'A initié le geste du modelage sans tour et le respect des terres d’argile.',
    acceptanceDate: 'Filiation millénaire',
    isPioneer: true,
    isFounder: true
  },
  {
    id: 'anc-mensah-houndete',
    name: 'Mensah Houndété',
    firstName: 'Mensah',
    age: 64,
    role: 'Grand Maître Tisserand des cours royales',
    territory: 'Porto-Novo',
    country: 'Bénin',
    flag: '🇧🇯',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    universeTag: 'Finagnon',
    quote: '« Quand deux âmes se choisissent, le fil ne rompt jamais sous le poids des années. »',
    questionAnswered: {
      question: 'Comment tissez-vous le lien entre générations disparates ?',
      answer: 'En croisant un fil de mémoire solide avec un fil d’espérance libre.'
    },
    invitationStory: 'A transmis le geste du peigne d’acajou et le respect de la parole donnée.',
    acceptanceDate: 'Filiation de savoir'
  },
  {
    id: 'anc-cheikh-amadou',
    name: 'Cheikh Amadou Kane',
    firstName: 'Amadou',
    age: 58,
    role: 'Passeur de mémoire fluviale & Écrivain des rives',
    territory: 'Saint-Louis',
    country: 'Sénégal',
    flag: '🇸🇳',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    universeTag: 'Sagesse des Fleuves',
    quote: '« Ce que tu donnes à ton enfant grandit avec lui, ce que tu retiens s’éteint avec toi. »',
    questionAnswered: {
      question: 'Que vous ont appris les courants du fleuve sur l’oubli ?',
      answer: 'Que l’eau emporte l’écume mais dépose toujours le limon nourricier au rivage.'
    },
    invitationStory: 'A guidé la vocation poétique lors de la grande traversée du fleuve.',
    acceptanceDate: 'Alliance fluviale'
  },
  {
    id: 'anc-pere-matthieu',
    name: 'Dieudonné Dossou',
    firstName: 'Dieudonné',
    age: 52,
    role: 'Prêtre bâtisseur & Théologien du dialogue des mémoires',
    territory: 'Littoral & Diaspora',
    country: 'Bénin',
    flag: '🇧🇯',
    photoUrl: '/assets/duos/pere-matthieu.jpg',
    universeTag: 'Jésus',
    quote: '« Prendre quelqu’un sous ses ailes, c’est lui offrir le ciel sans jamais exiger qu’il vole comme nous. »',
    questionAnswered: {
      question: 'Quelle prière murmurez-vous pour celui que vous accueillez ?',
      answer: 'Qu’il trouve le courage de devenir exactement qui il est promis d’être.'
    },
    invitationStory: 'Parrain spirituel ayant ouvert le dialogue de foi et coopté la première génération.',
    acceptanceDate: 'Cooptation fondatrice',
    isPioneer: true
  },
  {
    id: 'anc-sossou-anani',
    name: 'Anani Sossou',
    firstName: 'Anani',
    age: 49,
    role: 'Forgeron alchimiste des seuils & Ciseleur de cloches',
    territory: 'Ouidah',
    country: 'Bénin',
    flag: '🇧🇯',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    universeTag: 'Gou & Métal',
    quote: '« Le fer rouge accepte la frappe qui lui donne forme ; il rejette celle qui cherche à l’humilier. »',
    questionAnswered: {
      question: 'Que chante l’enclume à l’aube ?',
      answer: 'Elle réveille les volontés endormies et soude les engagements fidèles.'
    },
    invitationStory: 'A transmis le marteau de forge et le rituel d’apaisement des métaux.',
    acceptanceDate: 'Pacte du soufflet'
  }
];

// Pool de cooptés inspirants pour compléter jusqu'à 4 enfants maximum
const DESCENDANT_POOL: LineageMember[] = [
  {
    id: 'coopt-camille-desc-1',
    name: 'Sœur Blandine Dossou',
    firstName: 'Blandine',
    age: 36,
    role: 'Religieuse bénédictine & Botaniste des simples',
    territory: 'Abomey',
    country: 'Bénin',
    flag: '🇧🇯',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    universeTag: 'Jésus',
    quote: '« Le silence de la prière et celui de la forêt ne font qu’un quand on écoute avec le cœur. »',
    questionAnswered: {
      question: 'Quelle plante guérit l’inquiétude de l’avenir ?',
      answer: 'La verveine sauvage cueillie à la rosée avec une intention de paix.'
    },
    invitationStory: 'Cooptée d’un commun accord lors des soins aux enfants du dispensaire de Toffo.',
    acceptanceDate: 'Printemps 2024 · Acceptation mutuelle'
  },
  {
    id: 'coopt-camille-desc-2',
    name: 'Koffi Mensah',
    firstName: 'Koffi',
    age: 29,
    role: 'Tisserand de motifs sacrés & Conteur',
    territory: 'Porto-Novo',
    country: 'Bénin',
    flag: '🇧🇯',
    photoUrl: '/assets/protagonists/koffi-tisserand.jpg',
    universeTag: 'Finagnon',
    quote: '« Le métier à tisser répare ce que les mots d’orgueil ont déchiré. »',
    questionAnswered: {
      question: 'Que raconte le motif à quatre étoiles ?',
      answer: 'Les quatre points cardinaux d’une fidélité qui ne dévie jamais.'
    },
    invitationStory: 'Reçu sous ses ailes après la révélation du motif à quatre étoiles.',
    acceptanceDate: 'Automne 2023 · Acceptation mutuelle'
  },
  {
    id: 'coopt-camille-desc-3',
    name: 'Aïssatou Ba',
    firstName: 'Aïssatou',
    age: 32,
    role: 'Cinéaste du réel & Documentariste des mémoires orales',
    territory: 'Dakar',
    country: 'Sénégal',
    flag: '🇸🇳',
    photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    universeTag: 'Regard Vivant',
    quote: '« Filmer quelqu’un avec ferveur, c’est lui rendre la souveraineté de son regard. »',
    questionAnswered: {
      question: 'Quand la caméra devient-elle invisible ?',
      answer: 'Quand elle écoute plus fort qu’elle ne regarde.'
    },
    invitationStory: 'Cooptation scellée après le tournage partagé sur les femmes du Fouta.',
    acceptanceDate: 'Hiver 2024 · Acceptation mutuelle'
  },
  {
    id: 'coopt-camille-desc-4',
    name: 'Frère Jean-Baptiste',
    firstName: 'Jean-Baptiste',
    age: 41,
    role: 'Apiculteur de cloître & Gardien d’essaims',
    territory: 'Toffo',
    country: 'Bénin',
    flag: '🇧🇯',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    universeTag: 'Jésus',
    quote: '« Les abeilles fabriquent la cire des cierges sans savoir qu’elles éclairent le divin. »',
    questionAnswered: {
      question: 'Que murmurent les abeilles au crépuscule ?',
      answer: 'Que la patience collective fabrique le miel le plus doux de la terre.'
    },
    invitationStory: 'Quatrième âme accueillie sous ses ailes pour perpétuer le miel des carrefours.',
    acceptanceDate: 'Été 2024 · Acceptation mutuelle'
  }
];

/**
 * Normalise n'importe quelle entrée (string ID, Protagonist, AffiliationPerson)
 * en un LineageMember complet.
 */
export function resolveLineageMember(input: string | AffiliationPerson | Protagonist): LineageMember {
  if (typeof input === 'string') {
    // 0. Chercher d'abord dans ANCESTOR_POOL
    const ancFound = ANCESTOR_POOL.find(a => a.id === input);
    if (ancFound) return { ...ancFound };

    // 0b. Chercher dans DESCENDANT_POOL
    const descFound = DESCENDANT_POOL.find(d => d.id === input || input.startsWith(d.id));
    if (descFound) return { ...descFound };

    // 1. Chercher dans PROTAGONISTS
    const pFound = PROTAGONISTS.find(p => p.id === input || p.slug === input);
    if (pFound) {
      return {
        id: pFound.id,
        name: pFound.name,
        firstName: pFound.firstName || pFound.name.split(' ')[0],
        age: (pFound as any).age || 38,
        role: pFound.role,
        territory: pFound.territory,
        country: pFound.country,
        flag: pFound.flag,
        photoUrl: pFound.photoUrl,
        teaserVideoUrl: pFound.teaserVideoUrl,
        universeTag: pFound.universeTag,
        quote: pFound.quote,
        questionAnswered: {
          question: (pFound as any).question || 'Quelle vision singulière ce parcours apporte-t-il au monde ?',
          answer: pFound.quote || 'Transmettre la sève du récit partagé au-delà des frontières.'
        },
        invitationStory: pFound.bio
      };
    }

    // 2. Chercher dans MATRIX_SERIES_DATA
    for (const series of MATRIX_SERIES_DATA) {
      const pioneer = series.pioneers.find(pi => pi.id === input);
      if (pioneer) {
        return {
          id: pioneer.id,
          name: pioneer.name,
          firstName: pioneer.firstName,
          age: pioneer.age || 46,
          role: pioneer.role,
          territory: pioneer.territory,
          country: pioneer.country,
          flag: pioneer.flag,
          photoUrl: pioneer.photoUrl,
          teaserVideoUrl: pioneer.teaserVideoUrl,
          universeTag: pioneer.universeTag,
          quote: pioneer.teaserPitch,
          questionAnswered: {
            question: pioneer.question || 'Quelle est la clé de votre persévérance face à l’inconnu ?',
            answer: pioneer.teaserPitch || 'L’enracinement dans la mémoire et l’élan vers l’autre.'
          },
          invitationStory: pioneer.invitationStory,
          isPioneer: pioneer.isPioneer,
          isFounder: pioneer.isPioneer
        };
      }
      // Chercher récursivement dans les enfants de MATRIX_SERIES_DATA
      for (const pi of series.pioneers) {
        if (pi.invitedPeople) {
          const rec = findInDescendants(pi.invitedPeople, input);
          if (rec) {
            return {
              id: rec.id,
              name: rec.name,
              firstName: rec.firstName,
              age: rec.age || 34,
              role: rec.role,
              territory: rec.territory,
              country: rec.country,
              flag: rec.flag,
              photoUrl: rec.photoUrl,
              teaserVideoUrl: rec.teaserVideoUrl,
              universeTag: rec.universeTag,
              quote: rec.teaserPitch,
              questionAnswered: {
                question: rec.question || 'Comment faire fleurir l’alliance au quotidien ?',
                answer: rec.teaserPitch || 'Par l’écoute attentive et le respect scellé du geste.'
              },
              invitationStory: rec.invitationStory
            };
          }
        }
      }
    }

    // 3. Chercher dans BENIN_STORIES
    const bFound = BENIN_STORIES.find(b => b.id === input);
    if (bFound) {
      return {
        id: bFound.id,
        name: bFound.name,
        firstName: bFound.firstName,
        age: bFound.age || 40,
        role: bFound.role,
        territory: bFound.territory,
        country: bFound.country,
        flag: bFound.flag,
        photoUrl: bFound.photoUrl,
        teaserVideoUrl: bFound.teaserVideoUrl,
        universeTag: bFound.universeTag,
        quote: bFound.teaserPitch,
        questionAnswered: {
          question: (bFound as any).question || 'Quelle histoire transmettez-vous en premier ?',
          answer: bFound.teaserPitch || 'Celle qui redonne à chacun la dignité de son propre nom.'
        },
        invitationStory: bFound.invitationStory
      };
    }

    // 4. Cas spécial Camille ou utilisateur par défaut
    if (input.toLowerCase().includes('camille')) {
      return {
        id: 'camille-artisan',
        name: 'Camille',
        firstName: 'Camille',
        age: 34,
        role: 'Protagoniste & Passeur de récits',
        territory: 'Bénin & France',
        country: 'Bénin',
        flag: '🇧🇯',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        universeTag: 'Alliance des Rives',
        quote: '« Nous ne transmettons pas pour retenir, mais pour que l’autre marche plus loin que nous. »',
        questionAnswered: {
          question: 'Pourquoi transmettre sans retenir ?',
          answer: 'Parce que la liberté donnée à l’autre est la seule mesure de la sincérité d’une filiation.'
        },
        invitationStory: 'A pris sous ses ailes 4 bâtisseurs pour perpétuer la flamme du récit partagé.',
        acceptanceDate: 'Parrainage fondateur'
      };
    }

    // Fallback utilisateur connecté ou profil personnalisé
    const nameClean = input.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return {
      id: input,
      name: nameClean,
      firstName: nameClean.split(' ')[0],
      age: 35,
      role: 'Membre coopté de la Lignée',
      territory: 'Bénin',
      country: 'Bénin',
      flag: '🇧🇯',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      universeTag: 'YonyWood',
      quote: '« Chaque être lié à la lignée nourrit la sève commune. »',
      questionAnswered: {
        question: 'Quelle promesse faites-vous à la communauté ?',
        answer: 'Prendre soin du lien et transmettre ce que j’ai reçu avec ferveur.'
      },
      invitationStory: 'Intégré par cooptation mutuelle et réciproque.'
    };
  }

  // Si c'est déjà un objet
  return {
    id: input.id,
    name: input.name,
    firstName: (input as any).firstName || input.name.split(' ')[0],
    age: (input as any).age || 38,
    role: input.role,
    territory: input.territory,
    country: input.country,
    flag: input.flag,
    photoUrl: (input as any).photoUrl || (input as any).photo || '',
    teaserVideoUrl: (input as any).teaserVideoUrl,
    universeTag: (input as any).universeTag,
    quote: (input as any).quote || (input as any).teaserPitch,
    questionAnswered: (input as any).questionAnswered || {
      question: (input as any).question || 'Quelle est votre aspiration profonde pour la lignée ?',
      answer: (input as any).quote || (input as any).teaserPitch || 'Marcher ensemble dans la confiance.'
    },
    invitationStory: (input as any).invitationStory || (input as any).bio,
    isPioneer: (input as any).isPioneer,
    isFounder: (input as any).isFounder || (input as any).isPioneer
  };
}

function findInDescendants(list: AffiliationPerson[], targetId: string): AffiliationPerson | null {
  for (const item of list) {
    if (item.id === targetId) return item;
    if (item.invitedPeople && item.invitedPeople.length > 0) {
      const sub = findInDescendants(item.invitedPeople, targetId);
      if (sub) return sub;
    }
  }
  return null;
}

/**
 * Construit l'arbre complet de lignée pour n'importe quel individu.
 * Règles :
 * - Si le membre fait partie des premiers (fondateur/isFounder), il n'a aucun ascendant au-dessus.
 * - Tout autre membre a au moins 4 ascendants au-dessus de lui, remontant jusqu'au fondateur racine.
 * - Défilement vertical fluide le long de la frise.
 * - Double liseré terre cuite chaud pour distinguer les membres fondateurs.
 * - Jusqu'à 4 enfants cooptés maximum en dessous.
 */
export function getLineageTree(personOrId: string | AffiliationPerson | Protagonist): LineageTree {
  const current = resolveLineageMember(personOrId);

  // 1. Déterminer les ascendants
  const ascendants: LineageMember[] = [];

  // Si c'est un membre fondateur racine (les "premiers de la lignée")
  const isDirectFounder = current.isFounder === true || 
    current.id === 'anc-dah-zounon' || 
    current.id === 'anc-kpodan-yeyinou';

  if (isDirectFounder) {
    // Les premiers n'ont aucun ascendant au-dessus d'eux !
    current.isFounder = true;
  } else {
    // Il doit avoir au moins 4 ascendants au-dessus, remontant jusqu'à un fondateur racine
    // On génère une chaîne ascendante cohérente de 4 générations :
    // [Fondateur Racine (ex: Mahougnon Zounon)] -> [Arrière-Grand-Parent] -> [Grand-Parent] -> [Parent Direct]
    const hash = Math.abs(hashString(current.id));
    
    // Le fondateur racine au sommet
    const rootFounder = { ...ANCESTOR_POOL[0], isFounder: true };
    
    // Sélection déterministe de 3 aïeux intermédiaires
    const intermediate1 = ANCESTOR_POOL[1 + (hash % 2)]; // Yéyinou ou Mensah
    const intermediate2 = ANCESTOR_POOL[3 + (hash % 2)]; // Cheikh Amadou ou Dieudonné
    const directSponsor = ANCESTOR_POOL[4 + (hash % 2)]; // Dieudonné ou Anani

    const chainCandidates = [rootFounder, intermediate1, intermediate2, directSponsor];
    
    // Filtrer pour éviter les doublons avec current
    for (const candidate of chainCandidates) {
      if (candidate.id !== current.id && !ascendants.some(a => a.id === candidate.id)) {
        ascendants.push(candidate);
      }
    }

    // S'assurer d'avoir au moins 4 ascendants en complétant si besoin
    if (ascendants.length < 4) {
      for (const poolItem of ANCESTOR_POOL) {
        if (poolItem.id !== current.id && !ascendants.some(a => a.id === poolItem.id)) {
          ascendants.unshift(poolItem);
          if (ascendants.length >= 4) break;
        }
      }
    }
  }

  // 2. Déterminer les descendants (Lignée descendante · fil Terre cuite · MAXIMUM 4)
  const descendants: LineageMember[] = [];

  // Si c'est une personne de MATRIX_SERIES_DATA avec invitedPeople réels
  const rawMatrixPerson = findPersonInMatrix(current.id);
  if (rawMatrixPerson && rawMatrixPerson.invitedPeople && rawMatrixPerson.invitedPeople.length > 0) {
    for (const child of rawMatrixPerson.invitedPeople.slice(0, 4)) {
      descendants.push(resolveLineageMember(child));
    }
  }

  // Si c'est un PROTAGONIST avec des héritiers
  const rawProtagonist = PROTAGONISTS.find(p => p.id === current.id);
  if (rawProtagonist && rawProtagonist.tree?.heritiers && rawProtagonist.tree.heritiers.length > 0) {
    for (const h of rawProtagonist.tree.heritiers.slice(0, 4)) {
      if (!descendants.some(d => d.id === h.id)) {
        descendants.push({
          id: h.id,
          name: h.name,
          role: h.role,
          territory: h.country,
          country: h.country,
          flag: '🌍',
          photoUrl: h.photo,
          quote: '« Disciple coopté par transmission directe du maître. »',
          invitationStory: `Accueilli par ${current.name} pour perpétuer son atelier et son savoir.`,
          acceptanceDate: 'Alliance validée bilatéralement'
        });
      }
    }
  }

  // Compléter de manière déterministe pour toujours avoir entre 2 et 4 personnes
  // ou un échantillon vivant fidèle à l'esprit "Camille et ses 4 enfants"
  if (descendants.length < 4) {
    const hash = Math.abs(hashString(current.id));
    const countTarget = Math.min(4, Math.max(2, (hash % 3) + 2)); // 2, 3 ou 4
    
    let poolIndex = hash % DESCENDANT_POOL.length;
    while (descendants.length < countTarget) {
      const candidate = DESCENDANT_POOL[poolIndex % DESCENDANT_POOL.length];
      const uniqueChildId = `${candidate.id}-${Math.abs(hashString(`${current.id}-${poolIndex}`)).toString(36).slice(0, 5)}`;
      if (candidate.id !== current.id && !descendants.some(d => d.id === candidate.id || d.id === uniqueChildId)) {
        descendants.push({
          ...candidate,
          id: uniqueChildId,
          invitationStory: `Pris(e) sous ses ailes par ${current.name} suite à une résonance de cœur.`,
          acceptanceDate: 'Acceptation mutuelle des deux âmes'
        });
      }
      poolIndex++;
    }
  }

  return {
    current,
    ascendants,
    descendants: descendants.slice(0, 4), // GARANTIE STRICTE : MAXIMUM 4
    maxChildren: 4,
    sharePercentage: 4,
    ruleSummary: "Alliance mutuelle indéfectible · Jusqu'à 4 êtres cooptés sous ses ailes · 4 % de transmission d'abondance"
  };
}

function findPersonInMatrix(id: string): AffiliationPerson | null {
  for (const series of MATRIX_SERIES_DATA) {
    const p = series.pioneers.find(item => item.id === id);
    if (p) return p;
    for (const pioneer of series.pioneers) {
      if (pioneer.invitedPeople) {
        const found = findInDescendants(pioneer.invitedPeople, id);
        if (found) return found;
      }
    }
  }
  return null;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return hash;
}
