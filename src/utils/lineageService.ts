import { AffiliationPerson, Protagonist } from '../types';
import { PROTAGONISTS } from '../data/mockData';
import { MATRIX_SERIES_DATA } from '../data/matrixData';
import { BENIN_STORIES } from '../data/explorerTopicsData';

export interface LineageMember {
  id: string;
  name: string;
  firstName?: string;
  role: string;
  territory: string;
  country: string;
  flag: string;
  photoUrl: string;
  teaserVideoUrl?: string;
  universeTag?: string;
  quote?: string;
  invitationStory?: string;
  acceptanceDate?: string;
  isPioneer?: boolean;
  sharesCount?: number;
}

export interface LineageTree {
  current: LineageMember;
  ascendants: LineageMember[]; // Du parent direct aux racines
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
  charcoal: '#1C1917',
  sand: '#F7F5F0',
  cream: '#FCFBF7'
};

// Catalogue étendu de mentors et pionniers de référence pour les liaisons
const ANCESTOR_POOL: LineageMember[] = [
  {
    id: 'anc-dah-zounon',
    name: 'Mahougnon Zounon',
    firstName: 'Mahougnon',
    role: 'Gardien du sanctuaire d’Èṣù & Passeur d’arcanes',
    territory: 'Ouidah & Allada',
    country: 'Bénin',
    flag: '🇧🇯',
    photoUrl: '/assets/duos/dah-zounon.jpg',
    universeTag: 'Èṣù',
    quote: '« La lignée n’est pas une chaîne qui entrave, c’est une sève qui féconde les racines invisibles. »',
    invitationStory: 'A transmis les chants des carrefours et le sceau des alliances inviolables.',
    acceptanceDate: 'Alliance ancestrale scellée',
    isPioneer: true
  },
  {
    id: 'anc-pere-matthieu',
    name: 'Dieudonné Dossou',
    firstName: 'Dieudonné',
    role: 'Prêtre bâtisseur & Théologien du dialogue des mémoires',
    territory: 'Littoral & Diaspora',
    country: 'Bénin',
    flag: '🇧🇯',
    photoUrl: '/assets/duos/pere-matthieu.jpg',
    universeTag: 'Jésus',
    quote: '« Prendre quelqu’un sous ses ailes, c’est lui offrir le ciel sans jamais exiger qu’il vole comme nous. »',
    invitationStory: 'Parrain spirituel ayant ouvert le dialogue de foi et coopté la première génération.',
    acceptanceDate: 'Cooptation fondatrice',
    isPioneer: true
  },
  {
    id: 'anc-mensah-houndete',
    name: 'Mensah Houndété',
    firstName: 'Mensah',
    role: 'Grand Maître Tisserand des cours royales',
    territory: 'Porto-Novo',
    country: 'Bénin',
    flag: '🇧🇯',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    universeTag: 'Finagnon',
    quote: '« Quand deux âmes se choisissent, le fil ne rompt jamais sous le poids des années. »',
    invitationStory: 'A transmis le geste du peigne d’acajou et le respect de la parole donnée.',
    acceptanceDate: 'Filiation de savoir'
  },
  {
    id: 'anc-cheikh-amadou',
    name: 'Cheikh Amadou Kane',
    firstName: 'Amadou',
    role: 'Passeur de mémoire fluviale & Écrivain des rives',
    territory: 'Saint-Louis',
    country: 'Sénégal',
    flag: '🇸🇳',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    universeTag: 'Sagesse des Fleuves',
    quote: '« Ce que tu donnes à ton enfant grandit avec lui, ce que tu retiens s’éteint avec toi. »',
    invitationStory: 'A guidé la vocation poétique lors de la grande traversée du fleuve.',
    acceptanceDate: 'Alliance fluviale'
  }
];

// Pool de cooptés inspirants pour compléter jusqu'à 4 enfants maximum
const DESCENDANT_POOL: LineageMember[] = [
  {
    id: 'coopt-camille-desc-1',
    name: 'Sœur Blandine Dossou',
    firstName: 'Blandine',
    role: 'Religieuse bénédictine & Botaniste des simples',
    territory: 'Abomey',
    country: 'Bénin',
    flag: '🇧🇯',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    universeTag: 'Jésus',
    quote: '« Le silence de la prière et celui de la forêt ne font qu’un quand on écoute avec le cœur. »',
    invitationStory: 'Cooptée d’un commun accord lors des soins aux enfants du dispensaire de Toffo.',
    acceptanceDate: 'Printemps 2024 · Acceptation mutuelle'
  },
  {
    id: 'coopt-camille-desc-2',
    name: 'Koffi Mensah',
    firstName: 'Koffi',
    role: 'Tisserand de motifs sacrés & Conteur',
    territory: 'Porto-Novo',
    country: 'Bénin',
    flag: '🇧🇯',
    photoUrl: '/assets/protagonists/koffi-tisserand.jpg',
    universeTag: 'Finagnon',
    quote: '« Le métier à tisser répare ce que les mots d’orgueil ont déchiré. »',
    invitationStory: 'Reçu sous ses ailes après la révélation du motif à quatre étoiles.',
    acceptanceDate: 'Automne 2023 · Acceptation mutuelle'
  },
  {
    id: 'coopt-camille-desc-3',
    name: 'Aïssatou Ba',
    firstName: 'Aïssatou',
    role: 'Cinéaste du réel & Documentariste des mémoires orales',
    territory: 'Dakar',
    country: 'Sénégal',
    flag: '🇸🇳',
    photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    universeTag: 'Regard Vivant',
    quote: '« Filmer quelqu’un avec ferveur, c’est lui rendre la souveraineté de son regard. »',
    invitationStory: 'Cooptation scellée après le tournage partagé sur les femmes du Fouta.',
    acceptanceDate: 'Hiver 2024 · Acceptation mutuelle'
  },
  {
    id: 'coopt-camille-desc-4',
    name: 'Frère Jean-Baptiste',
    firstName: 'Jean-Baptiste',
    role: 'Apiculteur de cloître & Gardien d’essaims',
    territory: 'Toffo',
    country: 'Bénin',
    flag: '🇧🇯',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    universeTag: 'Jésus',
    quote: '« Les abeilles fabriquent la cire des cierges sans savoir qu’elles éclairent le divin. »',
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
    // 1. Chercher dans PROTAGONISTS
    const pFound = PROTAGONISTS.find(p => p.id === input || p.slug === input);
    if (pFound) {
      return {
        id: pFound.id,
        name: pFound.name,
        role: pFound.role,
        territory: pFound.territory,
        country: pFound.country,
        flag: pFound.flag,
        photoUrl: pFound.photoUrl,
        teaserVideoUrl: pFound.teaserVideoUrl,
        universeTag: pFound.universeTag,
        quote: pFound.quote,
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
          role: pioneer.role,
          territory: pioneer.territory,
          country: pioneer.country,
          flag: pioneer.flag,
          photoUrl: pioneer.photoUrl,
          teaserVideoUrl: pioneer.teaserVideoUrl,
          universeTag: pioneer.universeTag,
          quote: pioneer.teaserPitch,
          invitationStory: pioneer.invitationStory,
          isPioneer: pioneer.isPioneer
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
              role: rec.role,
              territory: rec.territory,
              country: rec.country,
              flag: rec.flag,
              photoUrl: rec.photoUrl,
              teaserVideoUrl: rec.teaserVideoUrl,
              universeTag: rec.universeTag,
              quote: rec.teaserPitch,
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
        role: bFound.role,
        territory: bFound.territory,
        country: bFound.country,
        flag: bFound.flag,
        photoUrl: bFound.photoUrl,
        teaserVideoUrl: bFound.teaserVideoUrl,
        universeTag: bFound.universeTag,
        quote: bFound.teaserPitch,
        invitationStory: bFound.invitationStory
      };
    }

    // 4. Cas spécial Camille ou utilisateur par défaut
    if (input.toLowerCase().includes('camille')) {
      return {
        id: 'camille-artisan',
        name: 'Camille',
        firstName: 'Camille',
        role: 'Protagoniste & Passeur de récits',
        territory: 'Bénin & France',
        country: 'Bénin',
        flag: '🇧🇯',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        universeTag: 'Alliance des Rives',
        quote: '« Nous ne transmettons pas pour retenir, mais pour que l’autre marche plus loin que nous. »',
        invitationStory: 'A pris sous ses ailes 4 bâtisseurs pour perpétuer la flamme du récit partagé.',
        acceptanceDate: 'Parrainage fondateur'
      };
    }

    // Fallback utilisateur connecté ou profil personnalisé
    return {
      id: input,
      name: input.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      role: 'Membre coopté de la Lignée',
      territory: 'Bénin',
      country: 'Bénin',
      flag: '🇧🇯',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      universeTag: 'YonyWood',
      quote: '« Chaque être lié à la lignée nourrit la sève commune. »',
      invitationStory: 'Intégré par cooptation mutuelle et réciproque.'
    };
  }

  // Si c'est déjà un objet
  return {
    id: input.id,
    name: input.name,
    firstName: (input as any).firstName,
    role: input.role,
    territory: input.territory,
    country: input.country,
    flag: input.flag,
    photoUrl: (input as any).photoUrl || (input as any).photo || '',
    teaserVideoUrl: (input as any).teaserVideoUrl,
    universeTag: (input as any).universeTag,
    quote: (input as any).quote || (input as any).teaserPitch,
    invitationStory: (input as any).invitationStory || (input as any).bio,
    isPioneer: (input as any).isPioneer
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
 * Respecte rigoureusement les règles :
 * - 4 cooptés maximum ("enfants")
 * - 1 ou 2 ascendants directs (parrains)
 * - Acceptation mutuelle dans les deux sens
 * - 4% de transmission d'abondance
 */
export function getLineageTree(personOrId: string | AffiliationPerson | Protagonist): LineageTree {
  const current = resolveLineageMember(personOrId);

  // 1. Déterminer les ascendants (Lignée ascendante · fil Miel)
  const ascendants: LineageMember[] = [];
  
  // Si c'est un pionnier fondateur de niveau 1
  if (current.isPioneer) {
    // Un aïeul spirituel ou ancêtre fondateur
    ascendants.push(ANCESTOR_POOL[0]);
  } else {
    // Chercher son parrain historique
    const parentSeed = Math.abs(hashString(current.id)) % ANCESTOR_POOL.length;
    const parent = ANCESTOR_POOL[parentSeed];
    if (parent.id !== current.id) {
      ascendants.push(parent);
    } else {
      ascendants.push(ANCESTOR_POOL[(parentSeed + 1) % ANCESTOR_POOL.length]);
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
      if (candidate.id !== current.id && !descendants.some(d => d.id === candidate.id)) {
        descendants.push({
          ...candidate,
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
