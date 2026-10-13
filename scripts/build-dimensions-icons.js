import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const apercuHtmlPath = path.resolve(rootDir, 'public/apercu-icones.html');
const html = fs.readFileSync(apercuHtmlPath, 'utf-8');

// Mapping of dimensions and their subcategory slugs in order
const DIMENSION_CONFIGS = [
  {
    folder: '01-sagesses',
    id: 'sagesses',
    order: 1,
    label: 'Sagesses',
    subcategories: [
      { slug: 'epreuves', label: 'Épreuves' },
      { slug: 'amour-couple', label: 'Amour et couple' },
      { slug: 'famille', label: 'Famille' },
      { slug: 'travail', label: 'Travail' },
      { slug: 'argent', label: 'Argent' },
      { slug: 'spiritualite', label: 'Spiritualité' },
      { slug: 'exil', label: 'Exil' },
      { slug: 'reinvention', label: 'Réinvention' }
    ]
  },
  {
    folder: '02-territoires',
    id: 'territoires',
    order: 2,
    label: 'Territoires',
    subcategories: [
      { slug: 'villages', label: 'Villages' },
      { slug: 'villes', label: 'Villes' },
      { slug: 'pays-origine', label: "Pays d'origine" },
      { slug: 'vie-etranger', label: "Vie à l'étranger" },
      { slug: 'nature', label: 'Nature' },
      { slug: 'patrimoine', label: 'Patrimoine' },
      { slug: 'traditions', label: 'Traditions' },
      { slug: 'terroirs', label: 'Terroirs' }
    ]
  },
  {
    folder: '03-expertises',
    id: 'expertises',
    order: 3,
    label: 'Expertises',
    subcategories: [
      { slug: 'artisanat', label: 'Artisanat' },
      { slug: 'droit-finance', label: 'Droit et finance' },
      { slug: 'sante', label: 'Santé' },
      { slug: 'education', label: 'Éducation' },
      { slug: 'technologie', label: 'Technologie' },
      { slug: 'commerce', label: 'Commerce' },
      { slug: 'agriculture', label: 'Agriculture' },
      { slug: 'arts-medias', label: 'Arts et médias' }
    ]
  },
  {
    folder: '04-produits-services',
    id: 'produits-services',
    order: 4,
    label: 'Produits et services',
    subcategories: [
      { slug: 'beaute', label: 'Beauté' },
      { slug: 'alimentation', label: 'Alimentation' },
      { slug: 'mode', label: 'Mode' },
      { slug: 'maison', label: 'Maison' },
      { slug: 'bien-etre', label: 'Bien-être' },
      { slug: 'numerique', label: 'Numérique' },
      { slug: 'services-personne', label: 'Services à la personne' },
      { slug: 'transport-loisirs', label: 'Transport et loisirs' }
    ]
  },
  {
    folder: '05-projets',
    id: 'projets',
    order: 5,
    label: 'Projets',
    subcategories: [
      { slug: 'entreprises', label: 'Entreprises' },
      { slug: 'humanitaire', label: 'Humanitaire' },
      { slug: 'communautaire', label: 'Communautaire' },
      { slug: 'culture', label: 'Culture' },
      { slug: 'innovation', label: 'Innovation' },
      { slug: 'projets-de-vie', label: 'Projets de vie' },
      { slug: 'environnement', label: 'Environnement' },
      { slug: 'education-sport', label: 'Éducation et sport' }
    ]
  },
  {
    folder: '06-marques',
    id: 'marques',
    order: 6,
    label: 'Marques',
    subcategories: [
      { slug: 'familiales', label: 'Marques familiales' },
      { slug: 'alimentation-boissons', label: 'Alimentation et boissons' },
      { slug: 'mode-luxe', label: 'Mode et luxe' },
      { slug: 'tech-medias', label: 'Tech et médias' },
      { slug: 'banque-assurance', label: 'Banque et assurance' },
      { slug: 'industrie', label: 'Industrie' },
      { slug: 'sante', label: 'Santé' },
      { slug: 'emblematiques', label: 'Marques emblématiques' }
    ]
  },
  {
    folder: '07-personnalites',
    id: 'personnalites',
    order: 7,
    label: 'Personnalités',
    subcategories: [
      { slug: 'politique', label: 'Politique' },
      { slug: 'musique', label: 'Musique' },
      { slug: 'cinema-spectacle', label: 'Cinéma et spectacle' },
      { slug: 'sport', label: 'Sport' },
      { slug: 'art-litterature', label: 'Art et littérature' },
      { slug: 'foi', label: 'Foi' },
      { slug: 'economie', label: 'Économie' },
      { slug: 'science', label: 'Science' }
    ]
  },
  {
    folder: '08-figures-du-quotidien',
    id: 'figures-du-quotidien',
    order: 8,
    label: 'Figures du quotidien',
    subcategories: [
      { slug: 'parents', label: 'Parents' },
      { slug: 'grands-parents', label: 'Grands-parents' },
      { slug: 'enseignants', label: 'Enseignants' },
      { slug: 'mentors', label: 'Mentors' },
      { slug: 'voisins', label: 'Voisins' },
      { slug: 'amis', label: 'Amis' },
      { slug: 'collegues', label: 'Collègues' },
      { slug: 'inconnus-marquants', label: 'Inconnus marquants' }
    ]
  },
  {
    folder: '09-evenements',
    id: 'evenements',
    order: 9,
    label: 'Événements',
    subcategories: [
      { slug: 'mariages', label: 'Mariages' },
      { slug: 'naissances', label: 'Naissances' },
      { slug: 'deuils', label: 'Deuils' },
      { slug: 'voyages', label: 'Voyages' },
      { slug: 'fetes', label: 'Fêtes' },
      { slug: 'catastrophes', label: 'Catastrophes' },
      { slug: 'moments-historiques', label: 'Moments historiques' },
      { slug: 'premieres-fois', label: 'Premières fois' }
    ]
  },
  {
    folder: '10-communautes',
    id: 'communautes',
    order: 10,
    label: 'Communautés',
    subcategories: [
      { slug: 'familles', label: 'Familles' },
      { slug: 'associations', label: 'Associations' },
      { slug: 'lieux-de-culte', label: 'Lieux de culte' },
      { slug: 'clubs-sportifs', label: 'Clubs sportifs' },
      { slug: 'quartiers', label: 'Quartiers' },
      { slug: 'diasporas', label: 'Diasporas' },
      { slug: 'groupes-amis', label: "Groupes d'amis" },
      { slug: 'communautes-en-ligne', label: 'Communautés en ligne' }
    ]
  },
  {
    folder: '11-institutions',
    id: 'institutions',
    order: 11,
    label: 'Institutions',
    subcategories: [
      { slug: 'ecoles', label: 'Écoles' },
      { slug: 'universites', label: 'Universités' },
      { slug: 'hopitaux', label: 'Hôpitaux' },
      { slug: 'entreprises', label: 'Entreprises' },
      { slug: 'administrations', label: 'Administrations' },
      { slug: 'armee-police', label: 'Armée et police' },
      { slug: 'justice', label: 'Justice' },
      { slug: 'medias', label: 'Médias' }
    ]
  },
  {
    folder: '12-objets',
    id: 'objets',
    order: 12,
    label: 'Objets',
    subcategories: [
      { slug: 'souvenirs-famille', label: 'Souvenirs de famille' },
      { slug: 'bijoux', label: 'Bijoux' },
      { slug: 'vetements', label: 'Vêtements' },
      { slug: 'outils', label: 'Outils' },
      { slug: 'livres', label: 'Livres' },
      { slug: 'photos-lettres', label: 'Photos et lettres' },
      { slug: 'vehicules', label: 'Véhicules' },
      { slug: 'cadeaux', label: 'Cadeaux' }
    ]
  },
  {
    folder: '13-savoir-faire',
    id: 'savoir-faire',
    order: 13,
    label: 'Savoir-faire',
    subcategories: [
      { slug: 'recettes', label: 'Recettes' },
      { slug: 'gestes-artisan', label: "Gestes d'artisan" },
      { slug: 'remedes', label: 'Remèdes traditionnels' },
      { slug: 'cultures-recoltes', label: 'Cultures et récoltes' },
      { slug: 'chants-danses', label: 'Chants et danses' },
      { slug: 'contes-proverbes', label: 'Contes et proverbes' },
      { slug: 'langues', label: 'Langues' },
      { slug: 'astuces', label: 'Astuces' }
    ]
  },
  {
    folder: '14-passions',
    id: 'passions',
    order: 14,
    label: 'Passions',
    subcategories: [
      { slug: 'sport', label: 'Sport' },
      { slug: 'musique', label: 'Musique' },
      { slug: 'lecture', label: 'Lecture' },
      { slug: 'cuisine', label: 'Cuisine' },
      { slug: 'voyage', label: 'Voyage' },
      { slug: 'jeux', label: 'Jeux' },
      { slug: 'collections', label: 'Collections' },
      { slug: 'animaux', label: 'Animaux' }
    ]
  },
  {
    folder: '15-moments-de-vie',
    id: 'moments-de-vie',
    order: 15,
    label: 'Moments de vie',
    subcategories: [
      { slug: 'enfance', label: 'Enfance' },
      { slug: 'adolescence', label: 'Adolescence' },
      { slug: 'jeunesse', label: 'Jeunesse' },
      { slug: 'etudes', label: 'Études' },
      { slug: 'premier-emploi', label: 'Premier emploi' },
      { slug: 'vie-de-couple', label: 'Vie de couple' },
      { slug: 'parentalite', label: 'Parentalité' },
      { slug: 'vieillesse', label: 'Vieillesse' }
    ]
  },
  {
    folder: '16-series',
    id: 'series',
    order: 16,
    label: 'Séries',
    subcategories: [] // Séries uses the 8 documentary series
  }
];

// Extract SVGs by section from apercu.html
// Split sections by <h2>
const sections = html.split(/<h2>/i).slice(1);

const iconMap = {}; // key: "folder/slug" -> svg string
const cleanSvgMap = {}; // key: "folder/slug" -> inner svg elements string

sections.forEach((sec, sIdx) => {
  const headerMatch = sec.match(/^(\d+)\.\s*([^<]+)<\/h2>/i);
  if (!headerMatch) return;
  const numStr = headerMatch[1]; // e.g. "01"
  const secName = headerMatch[2].trim(); // e.g. "Sagesses"
  
  const dimConf = DIMENSION_CONFIGS.find(d => d.folder.startsWith(numStr));
  if (!dimConf) {
    console.warn('No dimConf found for section', numStr, secName);
    return;
  }

  // Find all cards: <div class="c d">... or <div class="c">...
  // In each card, find <svg ...</svg>
  const cardRegex = /<div class="c(?:\s+d)?">(<svg[\s\S]*?<\/svg>)(?:<b>)?([^<]+)/g;
  let match;
  let cardIdx = 0;

  while ((match = cardRegex.exec(sec)) !== null) {
    let svgContent = match[1].trim();
    // Fix any stray issues if any, e.g. backtick
    svgContent = svgContent.replace(/`+/g, '');
    const label = match[2].replace(/<\/?[^>]+(>|$)/g, '').trim();

    let slug = '_dimension';
    if (cardIdx > 0) {
      const subConf = dimConf.subcategories[cardIdx - 1];
      if (subConf) {
        slug = subConf.slug;
      } else {
        slug = `sub-${cardIdx}`;
      }
    }

    const key = `${dimConf.folder}/${slug}`;
    const idKey = `${dimConf.id}/${slug}`;
    iconMap[key] = svgContent;
    iconMap[idKey] = svgContent;

    // Extract inner content of svg
    const innerMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    if (innerMatch) {
      cleanSvgMap[key] = innerMatch[1].trim();
      cleanSvgMap[idKey] = innerMatch[1].trim();
    }

    // Write file to assets/icons/<folder>/<slug>.svg
    const outDir = path.resolve(rootDir, 'public/assets/icons', dimConf.folder);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    const filePath = path.resolve(outDir, `${slug}.svg`);
    fs.writeFileSync(filePath, svgContent, 'utf-8');

    // Also write alias to public/assets/icons/<id>/<slug>.svg for ease of access
    const aliasDir = path.resolve(rootDir, 'public/assets/icons', dimConf.id);
    if (!fs.existsSync(aliasDir)) {
      fs.mkdirSync(aliasDir, { recursive: true });
    }
    fs.writeFileSync(path.resolve(aliasDir, `${slug}.svg`), svgContent, 'utf-8');

    cardIdx++;
  }
});

console.log(`Generated SVG files for ${Object.keys(cleanSvgMap).length / 2} icons.`);

// Write DimensionIcon.tsx
const iconEntries = Object.entries(cleanSvgMap)
  .filter(([k]) => k.includes('-') || k.startsWith('series/'))
  .map(([k, inner]) => `  ${JSON.stringify(k)}: ${JSON.stringify(inner)},`)
  .join('\n');

const iconComponentTsx = `import React from 'react';

// Fallback neutre (étincelle / boussole)
const FALLBACK_INNER = \`<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />\`;

export const SVG_ICONS_INNER: Record<string, string> = {
${iconEntries}
};

interface DimensionIconProps {
  /** Nom de l'icône : 'dimension/slug', 'dimension/_dimension', ou '01-sagesses/epreuves', etc. */
  name: string;
  className?: string;
  size?: number | string;
  strokeWidth?: number | string;
  'aria-hidden'?: boolean | 'true' | 'false';
  'aria-label'?: string;
}

export const DimensionIcon: React.FC<DimensionIconProps> = ({
  name,
  className = 'w-6 h-6',
  size,
  strokeWidth,
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel,
}) => {
  // Normalize key lookup
  let inner = SVG_ICONS_INNER[name];
  if (!inner) {
    // Try normalized alias: if name has no folder prefix, check if it matches
    for (const [key, val] of Object.entries(SVG_ICONS_INNER)) {
      if (key.endsWith(\`/\${name}\`) || key === name) {
        inner = val;
        break;
      }
    }
  }

  // Graceful fallback
  if (!inner) {
    inner = FALLBACK_INNER;
  }

  const style: React.CSSProperties = {};
  if (size) {
    style.width = typeof size === 'number' ? \`\${size}px\` : size;
    style.height = typeof size === 'number' ? \`\${size}px\` : size;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? 'var(--icon-stroke-width, 1.75)'}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden={ariaLabel ? undefined : (ariaHidden ? 'true' : undefined)}
      aria-label={ariaLabel}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
};

export default DimensionIcon;
`;

fs.writeFileSync(path.resolve(rootDir, 'src/components/DimensionIcon.tsx'), iconComponentTsx, 'utf-8');
console.log('Saved src/components/DimensionIcon.tsx');
