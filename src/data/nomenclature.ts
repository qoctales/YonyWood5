import rawNomenclature from './nomenclature.json';

export interface NomenclaturePersonalityEntry {
  id: string;
  label: string;
  origin: string;
  group: 'afrique' | 'diaspora';
  angle: string;
}

export interface NomenclatureSagesseEntry {
  id: string;
  label: string;
  family: 'se-vaincre' | 'se-relier' | 's-elever' | 'tenir-debout';
  question: string;
}

export interface NomenclatureTerritoireEntry {
  id: string;
  label: string;
  group: 'afrique' | 'diaspora' | 'resonances';
}

export interface NomenclatureExpertiseEntry {
  id: string;
  label: string;
  covers: string[];
}

export interface NomenclatureProduitServiceEntry {
  id: string;
  label: string;
  covers: string[];
}

export interface NomenclatureMarqueEntry {
  id: string;
  label: string;
}

export interface NomenclatureProjetEntry {
  id: string;
  label: string;
  covers?: string[];
}

export type NomenclatureEntry =
  | NomenclaturePersonalityEntry
  | NomenclatureSagesseEntry
  | NomenclatureTerritoireEntry
  | NomenclatureExpertiseEntry
  | NomenclatureProduitServiceEntry
  | NomenclatureMarqueEntry
  | NomenclatureProjetEntry;

export interface NomenclatureDoor {
  id: 'personnalites' | 'sagesses' | 'territoires' | 'expertises' | 'produits-services' | 'marques' | 'projets';
  label: string;
  description: string;
  entries: NomenclatureEntry[];
  reserve_vague_2?: string[];
}

export interface NomenclatureData {
  version: string;
  platform: string;
  note: string;
  doors: NomenclatureDoor[];
}

export const NOMENCLATURE: NomenclatureData = rawNomenclature as unknown as NomenclatureData;

/**
 * Accès direct aux 7 portes officielles
 */
export const NOMENCLATURE_DOORS = NOMENCLATURE.doors;

/**
 * Récupère une porte par son identifiant unique
 */
export function getNomenclatureDoor(doorId: string): NomenclatureDoor | undefined {
  return NOMENCLATURE_DOORS.find(d => d.id === doorId);
}

/**
 * Récupère une entrée par le couple unique (doorId, entryId)
 */
export function getNomenclatureEntry(doorId: string, entryId: string): NomenclatureEntry | undefined {
  const door = getNomenclatureDoor(doorId);
  if (!door) return undefined;
  return door.entries.find(e => e.id === entryId);
}

/**
 * Table de correspondance historique (ancienne nomenclature -> nouvelle nomenclature)
 * Permet de migrer sans perdre de références orphelines
 */
export const NOMENCLATURE_LEGACY_MIGRATION: Record<string, { doorId: string; newId: string }> = {
  // Anciennes personnalités non retenues -> Correspondance vers la figure la plus proche
  'miles-davis': { doorId: 'personnalites', newId: 'fela-kuti' },
  'frida-kahlo': { doorId: 'personnalites', newId: 'cesaire' },
  'leonard-de-vinci': { doorId: 'personnalites', newId: 'hampate-ba' },
  'serena-williams': { doorId: 'personnalites', newId: 'ali' },
  'michael-jordan': { doorId: 'personnalites', newId: 'ali' },
  'kylian-mbappe': { doorId: 'personnalites', newId: 'jackson' },
  'steve-jobs': { doorId: 'personnalites', newId: 'sankara' },
  'marie-curie': { doorId: 'personnalites', newId: 'maathai' },
  'ayrton-senna': { doorId: 'personnalites', newId: 'ali' },
  'hayao-miyazaki': { doorId: 'personnalites', newId: 'glissant' },
  'nina-simone': { doorId: 'personnalites', newId: 'makeba' },
  'bob-marley': { doorId: 'personnalites', newId: 'marley' },
  'michael-jackson': { doorId: 'personnalites', newId: 'jackson' },
  'nelson-mandela': { doorId: 'personnalites', newId: 'mandela' },
  'wangari-maathai': { doorId: 'personnalites', newId: 'maathai' },
  'aime-cesaire': { doorId: 'personnalites', newId: 'cesaire' },
  'angelique-kidjo': { doorId: 'personnalites', newId: 'kidjo' },

  // Anciennes marques (commerciales) -> Nouvelles catégories de marques (secteurs)
  'nike': { doorId: 'marques', newId: 'mode' },
  'louis-vuitton': { doorId: 'marques', newId: 'mode' },
  'patagonia': { doorId: 'marques', newId: 'energie' },
  'apple': { doorId: 'marques', newId: 'technologie' },
  'hermes': { doorId: 'marques', newId: 'mode' },
  'tesla': { doorId: 'marques', newId: 'technologie' },
  'moleskine': { doorId: 'marques', newId: 'medias' },
  'fondation-zinsou': { doorId: 'marques', newId: 'education' },
  'veja': { doorId: 'marques', newId: 'mode' },
  'celtis': { doorId: 'marques', newId: 'telecoms' },
  'mtn': { doorId: 'marques', newId: 'telecoms' },
  'moov-africa': { doorId: 'marques', newId: 'telecoms' },
  'ateliers-cuir': { doorId: 'marques', newId: 'mode' },
  'cosmetiques-bio': { doorId: 'marques', newId: 'beaute' },

  // Anciens projets (chantiers précis) -> Nouvelles catégories de causes
  'forets-sacrees': { doorId: 'projets', newId: 'ecologie' },
  'ecoles-nomades': { doorId: 'projets', newId: 'education' },
  'semences-paysannes': { doorId: 'projets', newId: 'agriculture' },
  'ateliers-tissage': { doorId: 'projets', newId: 'femmes' },
  'plantes-medicinales': { doorId: 'projets', newId: 'sante' },
  'mangrove-saloum': { doorId: 'projets', newId: 'ecologie' },

  // Mémoires -> Sagesses
  'le-fa': { doorId: 'sagesses', newId: 'transmission' },
  'le-pardon': { doorId: 'sagesses', newId: 'pardon' },
  'pachamama': { doorId: 'sagesses', newId: 'foi' },
  'la-teranga': { doorId: 'sagesses', newId: 'fraternite' },
  'le-silence': { doorId: 'sagesses', newId: 'silence' },
  'la-filiation': { doorId: 'sagesses', newId: 'transmission' },
  'le-deuil': { doorId: 'sagesses', newId: 'deuil' },
  'la-joie': { doorId: 'sagesses', newId: 'joie' }
};
