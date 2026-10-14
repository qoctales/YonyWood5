import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outputDir = path.join(process.cwd(), 'public/assets/directions');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Configuration des dimensions et de leurs palettes sacrées
const DIMENSION_THEMES = {
  sagesses: {
    bgInner: '#3B1560',
    bgMid: '#1F0A36',
    bgOuter: '#0C0318',
    accent: '#A855F7',
    glow: '#E9D5FF',
    goldLight: '#FFF4D0',
    goldMid: '#FFE082',
    goldDark: '#D97706',
    title: 'SAGESSE UNIVERSELLE'
  },
  territoires: {
    bgInner: '#0D382B',
    bgMid: '#06241B',
    bgOuter: '#02120E',
    accent: '#10B981',
    glow: '#A7F3D0',
    goldLight: '#FFFBEB',
    goldMid: '#FBBF24',
    goldDark: '#B45309',
    title: 'TERRITOIRE &amp; RACINES'
  },
  expertises: {
    bgInner: '#0C2D48',
    bgMid: '#071A2C',
    bgOuter: '#030E18',
    accent: '#0EA5E9',
    glow: '#BAE6FD',
    goldLight: '#FFF7ED',
    goldMid: '#F59E0B',
    goldDark: '#B45309',
    title: 'MAÎTRISE &amp; VOCATION'
  },
  'produits-services': {
    bgInner: '#251F5C',
    bgMid: '#151138',
    bgOuter: '#0A081D',
    accent: '#6366F1',
    glow: '#C7D2FE',
    goldLight: '#FEF3C7',
    goldMid: '#F59E0B',
    goldDark: '#92400E',
    title: 'CRÉATION &amp; UTILITÉ'
  },
  projets: {
    bgInner: '#451D0C',
    bgMid: '#291007',
    bgOuter: '#140602',
    accent: '#F97316',
    glow: '#FED7AA',
    goldLight: '#FEF9C3',
    goldMid: '#EAB308',
    goldDark: '#854D0E',
    title: 'IMPACT &amp; BÂTISSEURS'
  },
  marques: {
    bgInner: '#382A0C',
    bgMid: '#201806',
    bgOuter: '#0F0B02',
    accent: '#EAB308',
    glow: '#FEF08A',
    goldLight: '#FFFFFF',
    goldMid: '#FACC15',
    goldDark: '#A16207',
    title: 'MARQUE DE PRESTIGE'
  },
  personnalites: {
    bgInner: '#43142A',
    bgMid: '#270A18',
    bgOuter: '#12040B',
    accent: '#EC4899',
    glow: '#FBCFE8',
    goldLight: '#FFF1F2',
    goldMid: '#FB7185',
    goldDark: '#9F1239',
    title: 'DESTIN &amp; INSPIRATION'
  }
};

// Emblèmes thématiques pour chaque direction
const DIRECTION_EMBLEMS = {
  // 1. SAGESSES
  'sagesses/resilience': `
    <!-- Arbre de vie et phénix / renaissance -->
    <path d="M384 460 Q340 540 384 620 Q428 540 384 460 Z" fill="url(#goldGrad)" opacity="0.9" />
    <path d="M384 620 L384 760 M384 660 Q320 640 280 690 M384 680 Q448 650 488 700" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" fill="none" />
    <path d="M384 760 Q320 800 260 840 M384 760 Q448 800 508 840 M384 760 L384 860" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.8" />
    <circle cx="384" cy="450" r="14" fill="url(#goldGrad)" />
  `,
  'sagesses/amour': `
    <!-- Cœurs sacrés intimes entrelacés avec rayons d'amour -->
    <path d="M384 700 C340 640 270 570 270 500 C270 430 330 390 384 460 C438 390 498 430 498 500 C498 570 428 640 384 700 Z" fill="none" stroke="url(#goldGrad)" stroke-width="7" stroke-linejoin="round" />
    <path d="M384 640 C354 595 306 545 306 495 C306 445 348 418 384 466 C420 418 462 445 462 495 C462 545 414 595 384 640 Z" fill="url(#goldGrad)" opacity="0.35" />
    <circle cx="384" cy="520" r="28" fill="url(#goldGrad)" opacity="0.9" filter="url(#highGlow)" />
  `,
  'sagesses/solidarite': `
    <!-- Deux mains sacrées s'élevant pour porter une étincelle -->
    <path d="M280 680 Q320 620 370 600 L370 560 Q340 540 320 570" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" fill="none" />
    <path d="M488 680 Q448 620 398 600 L398 560 Q428 540 448 570" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" fill="none" />
    <circle cx="384" cy="520" r="32" fill="url(#goldGrad)" filter="url(#highGlow)" />
    <circle cx="384" cy="520" r="18" fill="#FFFFFF" />
  `,
  'sagesses/gratitude': `
    <!-- Lotus céleste et paumes ouvertes en révérence -->
    <path d="M384 520 Q320 600 384 670 Q448 600 384 520 Z" fill="url(#goldGrad)" opacity="0.75" />
    <path d="M384 570 Q290 610 310 680 Q370 670 384 670" fill="url(#goldGrad)" opacity="0.55" />
    <path d="M384 570 Q478 610 458 680 Q398 670 384 670" fill="url(#goldGrad)" opacity="0.55" />
    <path d="M280 720 Q384 760 488 720" stroke="url(#goldGrad)" stroke-width="5" fill="none" stroke-linecap="round" />
  `,
  'sagesses/perseverance': `
    <!-- Sommet de montagne et escalier montant vers l'étoile polaire -->
    <polygon points="384,460 260,720 508,720" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linejoin="round" />
    <polygon points="384,460 330,720 438,720" fill="url(#goldGrad)" opacity="0.3" />
    <polygon points="384,400 392,425 417,425 397,440 405,465 384,450 363,465 371,440 351,425 376,425" fill="url(#goldGrad)" filter="url(#highGlow)" />
  `,
  'sagesses/bienveillance': `
    <!-- Ailes angéliques protectrices entourant une flamme sacrée -->
    <path d="M384 640 Q310 560 260 480 Q250 560 310 650 Q360 690 384 720" fill="url(#goldGrad)" opacity="0.6" />
    <path d="M384 640 Q458 560 508 480 Q518 560 458 650 Q408 690 384 720" fill="url(#goldGrad)" opacity="0.6" />
    <circle cx="384" cy="560" r="22" fill="url(#goldGrad)" filter="url(#highGlow)" />
  `,
  'sagesses/pardon': `
    <!-- Colombe de lumière s'envolant des chaînes rompues -->
    <path d="M384 520 Q320 480 270 420 Q310 520 370 550 Q300 580 280 620 Q340 610 384 580" fill="url(#goldGrad)" opacity="0.8" />
    <path d="M384 520 Q448 480 498 420 Q458 520 398 550 Q468 580 488 620 Q428 610 384 580" fill="url(#goldGrad)" opacity="0.8" />
    <circle cx="384" cy="430" r="12" fill="#FFFFFF" filter="url(#highGlow)" />
  `,
  'sagesses/humilite': `
    <!-- Goutte d'eau céleste créant des ondes concentriques infinies -->
    <path d="M384 480 Q350 540 350 580 A34 34 0 0 0 418 580 Q418 540 384 480 Z" fill="url(#goldGrad)" filter="url(#highGlow)" />
    <ellipse cx="384" cy="670" rx="140" ry="24" fill="none" stroke="url(#goldGrad)" stroke-width="4" opacity="0.8" />
    <ellipse cx="384" cy="690" rx="90" ry="16" fill="none" stroke="url(#goldGrad)" stroke-width="3" opacity="0.5" />
  `,

  // 2. TERRITOIRES
  'territoires/patrimoine': `
    <!-- Temple ancestral et portails millénaires -->
    <rect x="294" y="520" width="180" height="18" fill="url(#goldGrad)" rx="4" />
    <line x1="324" y1="538" x2="324" y2="700" stroke="url(#goldGrad)" stroke-width="10" stroke-linecap="round" />
    <line x1="384" y1="538" x2="384" y2="700" stroke="url(#goldGrad)" stroke-width="10" stroke-linecap="round" />
    <line x1="444" y1="538" x2="444" y2="700" stroke="url(#goldGrad)" stroke-width="10" stroke-linecap="round" />
    <rect x="274" y="700" width="220" height="20" fill="url(#goldGrad)" rx="4" />
    <polygon points="384,450 284,520 484,520" fill="url(#goldGrad)" opacity="0.85" />
  `,
  'territoires/traditions': `
    <!-- Tambour sacré djembe et flamme ancestrale -->
    <path d="M320 500 L448 500 L408 610 L430 730 L338 730 L360 610 Z" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linejoin="round" />
    <path d="M320 500 Q384 520 448 500" stroke="url(#goldGrad)" stroke-width="6" fill="none" />
    <circle cx="384" cy="440" r="26" fill="url(#goldGrad)" filter="url(#highGlow)" />
  `,
  'territoires/culture': `
    <!-- Masque rituel stylisé et motifs géométriques -->
    <path d="M330 460 Q384 430 438 460 L448 640 Q384 720 320 640 Z" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linejoin="round" />
    <circle cx="356" cy="530" r="10" fill="url(#goldGrad)" />
    <circle cx="412" cy="530" r="10" fill="url(#goldGrad)" />
    <path d="M384 540 L384 610 M364 640 Q384 660 404 640" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" fill="none" />
  `,
  'territoires/histoire': `
    <!-- Sablier cosmique reliant le passé et le futur -->
    <polygon points="320,470 448,470 340,680 428,680" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linejoin="round" />
    <line x1="300" y1="470" x2="468" y2="470" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round" />
    <line x1="300" y1="680" x2="468" y2="680" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round" />
    <circle cx="384" cy="575" r="12" fill="#FFFFFF" filter="url(#highGlow)" />
  `,
  'territoires/terroirs': `
    <!-- Épis de blé dorés et terrasses de cultures -->
    <path d="M384 720 L384 460" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" />
    <path d="M384 480 Q340 450 330 500 Q360 510 384 490" fill="url(#goldGrad)" />
    <path d="M384 480 Q428 450 438 500 Q408 510 384 490" fill="url(#goldGrad)" />
    <path d="M384 540 Q330 510 320 560 Q360 570 384 550" fill="url(#goldGrad)" />
    <path d="M384 540 Q438 510 448 560 Q408 570 384 550" fill="url(#goldGrad)" />
    <path d="M260 700 Q384 660 508 700" stroke="url(#goldGrad)" stroke-width="4" fill="none" />
  `,
  'territoires/langues': `
    <!-- Corne d'éloquence et ondes vocales rayonnantes -->
    <path d="M320 530 L380 530 L450 470 L450 670 L380 610 L320 610 Z" fill="url(#goldGrad)" opacity="0.6" stroke="url(#goldGrad)" stroke-width="6" />
    <path d="M470 510 Q500 570 470 630" stroke="url(#goldGrad)" stroke-width="5" stroke-linecap="round" fill="none" />
    <path d="M500 480 Q540 570 500 660" stroke="url(#goldGrad)" stroke-width="5" stroke-linecap="round" fill="none" />
  `,
  'territoires/diaspora': `
    <!-- Boussole sacrée et routes d'exil rayonnantes -->
    <circle cx="384" cy="570" r="110" fill="none" stroke="url(#goldGrad)" stroke-width="5" stroke-dasharray="10 8" />
    <polygon points="384,450 400,560 484,570 400,580 384,690 368,580 284,570 368,560" fill="url(#goldGrad)" filter="url(#highGlow)" />
  `,
  'territoires/habitudes': `
    <!-- Foyer chaleureux et marmite sacrée sous les étoiles -->
    <ellipse cx="384" cy="530" rx="70" ry="20" fill="url(#goldGrad)" />
    <path d="M314 530 Q314 670 384 670 Q454 670 454 530" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
    <path d="M350 480 Q370 430 350 390 M384 480 Q404 420 384 380 M418 480 Q438 430 418 390" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.7" />
  `,

  // 3. EXPERTISES
  'expertises/artisanat': `
    <!-- Enclume forgée, étincelles d'or et marteau royal -->
    <polygon points="290,610 478,610 458,680 310,680" fill="url(#goldGrad)" opacity="0.7" stroke="url(#goldGrad)" stroke-width="5" />
    <polygon points="270,590 498,590 488,610 280,610" fill="url(#goldGrad)" />
    <line x1="384" y1="450" x2="444" y2="530" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round" />
    <rect x="424" y="510" width="50" height="35" rx="6" transform="rotate(35 449 527)" fill="url(#goldGrad)" />
    <circle cx="384" cy="580" r="28" fill="#FFFFFF" filter="url(#highGlow)" />
  `,
  'expertises/education': `
    <!-- Livre sacré ouvert et flambeau de la connaissance -->
    <path d="M384 570 Q320 530 260 550 L260 670 Q320 650 384 690 Q448 650 508 670 L508 550 Q448 530 384 570 Z" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linejoin="round" />
    <line x1="384" y1="570" x2="384" y2="690" stroke="url(#goldGrad)" stroke-width="6" />
    <polygon points="384,420 374,480 394,480" fill="url(#goldGrad)" filter="url(#highGlow)" />
    <circle cx="384" cy="420" r="16" fill="#FFFFFF" filter="url(#highGlow)" />
  `,
  'expertises/numerique': `
    <!-- Cube holographique quantique et matrices connectées -->
    <polygon points="384,460 484,520 484,640 384,700 284,640 284,520" fill="none" stroke="url(#goldGrad)" stroke-width="5" stroke-linejoin="round" />
    <line x1="384" y1="460" x2="384" y2="580" stroke="url(#goldGrad)" stroke-width="4" />
    <line x1="284" y1="520" x2="384" y2="580" stroke="url(#goldGrad)" stroke-width="4" />
    <line x1="484" y1="520" x2="384" y2="580" stroke="url(#goldGrad)" stroke-width="4" />
    <line x1="384" y1="580" x2="384" y2="700" stroke="url(#goldGrad)" stroke-width="4" />
    <circle cx="384" cy="580" r="20" fill="url(#goldGrad)" filter="url(#highGlow)" />
  `,
  'expertises/business': `
    <!-- Flèche ascendante souveraine et couronne de prospérité -->
    <polygon points="384,440 450,560 410,560 410,690 358,690 358,560 318,560" fill="url(#goldGrad)" filter="url(#highGlow)" />
    <circle cx="384" cy="430" r="16" fill="#FFFFFF" filter="url(#highGlow)" />
  `,
  'expertises/justice': `
    <!-- Balance cosmique d'équité et épée de vérité -->
    <line x1="384" y1="440" x2="384" y2="710" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round" />
    <line x1="280" y1="500" x2="488" y2="500" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" />
    <path d="M280 500 L250 590 L310 590 Z" fill="none" stroke="url(#goldGrad)" stroke-width="4" />
    <path d="M488 500 L458 590 L518 590 Z" fill="none" stroke="url(#goldGrad)" stroke-width="4" />
  `,
  'expertises/sante': `
    <!-- Caducée de guérison et aura thérapeutique rayonnante -->
    <line x1="384" y1="450" x2="384" y2="710" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round" />
    <circle cx="384" cy="440" r="18" fill="url(#goldGrad)" filter="url(#highGlow)" />
    <path d="M384 660 Q320 620 384 570 Q448 520 384 480" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" />
    <path d="M384 660 Q448 620 384 570 Q320 520 384 480" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" />
  `,
  'expertises/securite': `
    <!-- Bouclier divin impénétrable orné d'un blason solaire -->
    <path d="M384 440 L484 480 L484 600 Q484 700 384 740 Q284 700 284 600 L284 480 Z" fill="none" stroke="url(#goldGrad)" stroke-width="7" stroke-linejoin="round" />
    <circle cx="384" cy="580" r="38" fill="url(#goldGrad)" opacity="0.4" />
    <circle cx="384" cy="580" r="18" fill="#FFFFFF" filter="url(#highGlow)" />
  `,
  'expertises/design': `
    <!-- Spirale d'or sacrée de Fibonacci et compas d'architecte -->
    <path d="M384 580 A10 10 0 0 0 374 570 A20 20 0 0 0 354 590 A40 40 0 0 0 394 630 A80 80 0 0 0 474 550 A140 140 0 0 0 334 410" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" />
    <line x1="340" y1="450" x2="430" y2="690" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" />
    <line x1="430" y1="450" x2="340" y2="690" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" />
  `,

  // 4. PRODUITS & SERVICES
  'produits-services/beaute': `
    <!-- Flacon de parfum sacré et nénuphar d'élégance -->
    <rect x="334" y="520" width="100" height="150" rx="20" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
    <rect x="364" y="470" width="40" height="50" rx="6" fill="url(#goldGrad)" />
    <polygon points="384,410 399,445 434,445 404,465 419,500 384,480 349,500 364,465 334,445 369,445" fill="url(#goldGrad)" filter="url(#highGlow)" />
  `,
  'produits-services/restauration': `
    <!-- Cloche gastronomique royale émettant des arômes célestes -->
    <path d="M284 640 Q284 500 384 500 Q484 500 484 640 Z" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
    <rect x="260" y="640" width="248" height="18" rx="6" fill="url(#goldGrad)" />
    <circle cx="384" cy="485" r="16" fill="url(#goldGrad)" filter="url(#highGlow)" />
  `,
  'produits-services/mode': `
    <!-- Mannequin haute couture et ruban de soie en lévitation -->
    <ellipse cx="384" cy="450" rx="30" ry="40" fill="url(#goldGrad)" opacity="0.6" />
    <path d="M334 520 Q384 560 434 520 L454 710 L314 710 Z" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linejoin="round" />
    <path d="M280 500 Q384 580 488 500" stroke="url(#goldGrad)" stroke-width="5" stroke-linecap="round" fill="none" />
  `,
  'produits-services/bien-etre': `
    <!-- Silhouette en méditation et chakras célestes -->
    <circle cx="384" cy="460" r="26" fill="url(#goldGrad)" />
    <path d="M384 500 L384 630 M330 570 Q384 530 438 570 M300 680 Q384 620 468 680" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" fill="none" />
    <circle cx="384" cy="530" r="10" fill="#FFFFFF" filter="url(#highGlow)" />
    <circle cx="384" cy="580" r="10" fill="#FFFFFF" filter="url(#highGlow)" />
    <circle cx="384" cy="630" r="10" fill="#FFFFFF" filter="url(#highGlow)" />
  `,
  'produits-services/tourisme': `
    <!-- Montgolfière voyageuse s'élevant vers de nouveaux horizons -->
    <ellipse cx="384" cy="500" rx="80" ry="90" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
    <polygon points="384,590 354,640 414,640" fill="url(#goldGrad)" opacity="0.7" />
    <rect x="364" y="655" width="40" height="30" rx="4" fill="url(#goldGrad)" />
    <line x1="364" y1="640" x2="368" y2="655" stroke="url(#goldGrad)" stroke-width="3" />
    <line x1="404" y1="640" x2="400" y2="655" stroke="url(#goldGrad)" stroke-width="3" />
  `,
  'produits-services/garde-enfants': `
    <!-- Mains protectrices veillant sur un enfant sous les étoiles -->
    <path d="M280 660 Q340 580 384 600 Q428 580 488 660" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round" fill="none" />
    <circle cx="384" cy="510" r="32" fill="url(#goldGrad)" filter="url(#highGlow)" />
    <path d="M344 600 Q384 570 424 600" stroke="url(#goldGrad)" stroke-width="5" fill="none" />
  `,
  'produits-services/conciergerie': `
    <!-- Clés d'or entrecroisées de l'hospitalité prestigieuse -->
    <circle cx="330" cy="480" r="30" fill="none" stroke="url(#goldGrad)" stroke-width="7" />
    <line x1="352" y1="502" x2="444" y2="594" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round" />
    <line x1="424" y1="574" x2="444" y2="554" stroke="url(#goldGrad)" stroke-width="6" />
    <circle cx="438" cy="480" r="30" fill="none" stroke="url(#goldGrad)" stroke-width="7" />
    <line x1="416" y1="502" x2="324" y2="594" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round" />
    <line x1="344" y1="574" x2="324" y2="554" stroke="url(#goldGrad)" stroke-width="6" />
  `,
  'produits-services/immobilier': `
    <!-- Architecture majestueuse et arches lumineuses -->
    <polygon points="384,440 270,540 498,540" fill="url(#goldGrad)" opacity="0.8" />
    <rect x="300" y="540" width="168" height="150" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
    <path d="M354 690 L354 610 Q384 580 414 610 L414 690 Z" fill="url(#goldGrad)" />
  `,

  // 5. PROJETS
  'projets/jeux': `
    <!-- Dés cosmiques et échiquier géométrique céleste -->
    <rect x="314" y="490" width="140" height="140" rx="20" fill="none" stroke="url(#goldGrad)" stroke-width="6" transform="rotate(45 384 560)" />
    <circle cx="384" cy="560" r="16" fill="url(#goldGrad)" filter="url(#highGlow)" />
  `,
  'projets/ecologie': `
    <!-- Mains portant la Terre et jeune pousse végétale dorée -->
    <circle cx="384" cy="570" r="85" fill="none" stroke="url(#goldGrad)" stroke-width="5" />
    <path d="M384 570 Q350 490 384 430 Q418 490 384 570" fill="url(#goldGrad)" filter="url(#highGlow)" />
    <path d="M384 500 Q330 470 340 520 Q370 520 384 500" fill="url(#goldGrad)" />
    <path d="M384 500 Q438 470 428 520 Q398 520 384 500" fill="url(#goldGrad)" />
  `,
  'projets/culture': `
    <!-- Masques jumeaux de théâtre et bobine de film -->
    <path d="M310 510 Q350 480 390 510 L390 620 Q350 660 310 620 Z" fill="none" stroke="url(#goldGrad)" stroke-width="5" />
    <path d="M380 540 Q420 510 460 540 L460 650 Q420 690 380 650 Z" fill="url(#goldGrad)" opacity="0.4" stroke="url(#goldGrad)" stroke-width="5" />
  `,
  'projets/social': `
    <!-- Chaîne humaine solidaire formant un cercle protecteur -->
    <circle cx="384" cy="570" r="100" fill="none" stroke="url(#goldGrad)" stroke-width="5" stroke-dasharray="14 12" />
    <circle cx="384" cy="470" r="18" fill="url(#goldGrad)" />
    <circle cx="470" cy="530" r="18" fill="url(#goldGrad)" />
    <circle cx="440" cy="640" r="18" fill="url(#goldGrad)" />
    <circle cx="328" cy="640" r="18" fill="url(#goldGrad)" />
    <circle cx="298" cy="530" r="18" fill="url(#goldGrad)" />
  `,
  'projets/communautaire': `
    <!-- Alvéoles de ruche géométriques s'unissant en force -->
    <polygon points="384,480 434,510 434,570 384,600 334,570 334,510" fill="none" stroke="url(#goldGrad)" stroke-width="5" />
    <polygon points="444,580 494,610 494,670 444,700 394,670 394,610" fill="url(#goldGrad)" opacity="0.4" stroke="url(#goldGrad)" stroke-width="5" />
    <polygon points="324,580 374,610 374,670 324,700 274,670 274,610" fill="url(#goldGrad)" opacity="0.4" stroke="url(#goldGrad)" stroke-width="5" />
  `,
  'projets/innovation': `
    <!-- Ampoule à incandescence universelle abritant une galaxie -->
    <path d="M334 500 A70 70 0 1 1 434 500 Q414 550 414 590 L354 590 Q354 550 334 500 Z" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
    <rect x="364" y="600" width="40" height="20" rx="4" fill="url(#goldGrad)" />
    <circle cx="384" cy="490" r="28" fill="#FFFFFF" filter="url(#highGlow)" />
  `,
  'projets/entreprise': `
    <!-- Gratte-ciel montant droit vers l'astre polaire -->
    <polygon points="344,480 424,480 444,710 324,710" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
    <line x1="384" y1="410" x2="384" y2="480" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" />
    <circle cx="384" cy="400" r="14" fill="#FFFFFF" filter="url(#highGlow)" />
  `,
  'projets/aventure': `
    <!-- Navigateur hissant sa voile vers l'inconnu radieux -->
    <path d="M290 660 Q384 700 478 660 L458 690 L310 690 Z" fill="url(#goldGrad)" />
    <line x1="384" y1="450" x2="384" y2="660" stroke="url(#goldGrad)" stroke-width="6" />
    <path d="M384 470 Q468 530 384 620 Z" fill="url(#goldGrad)" opacity="0.6" stroke="url(#goldGrad)" stroke-width="4" />
  `,

  // 6. MARQUES
  'marques/luxe': `
    <!-- Diamant taillé parfait et lauriers impériaux -->
    <polygon points="320,530 448,530 488,570 384,680 280,570" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linejoin="round" />
    <line x1="280" y1="570" x2="488" y2="570" stroke="url(#goldGrad)" stroke-width="4" />
    <line x1="344" y1="530" x2="384" y2="680" stroke="url(#goldGrad)" stroke-width="4" />
    <line x1="424" y1="530" x2="384" y2="680" stroke="url(#goldGrad)" stroke-width="4" />
    <circle cx="384" cy="500" r="22" fill="#FFFFFF" filter="url(#highGlow)" />
  `,
  'marques/mode': `
    <!-- Couronne haute couture et monogramme emblématique -->
    <polygon points="290,580 320,490 354,540 384,470 414,540 448,490 478,580" fill="url(#goldGrad)" opacity="0.8" stroke="url(#goldGrad)" stroke-width="5" stroke-linejoin="round" />
    <rect x="290" y="590" width="188" height="20" rx="4" fill="url(#goldGrad)" />
  `,
  'marques/beaute': `
    <!-- Miroir d'or de Vénus et goutte divine de jeunesse -->
    <circle cx="384" cy="510" r="70" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
    <line x1="384" y1="580" x2="384" y2="680" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round" />
    <line x1="344" y1="630" x2="424" y2="630" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round" />
    <circle cx="384" cy="510" r="30" fill="url(#goldGrad)" opacity="0.4" filter="url(#highGlow)" />
  `,
  'marques/tech': `
    <!-- Processeur quantique doré et pistes neuronales -->
    <rect x="314" y="490" width="140" height="140" rx="16" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
    <rect x="344" y="520" width="80" height="80" rx="10" fill="url(#goldGrad)" opacity="0.4" />
    <circle cx="384" cy="560" r="18" fill="#FFFFFF" filter="url(#highGlow)" />
  `,
  'marques/alimentation': `
    <!-- Corne d'abondance déversant les trésors de la table -->
    <path d="M468 490 Q448 640 310 650 Q360 590 360 530 Q360 480 468 490 Z" fill="url(#goldGrad)" opacity="0.75" stroke="url(#goldGrad)" stroke-width="5" />
    <circle cx="310" cy="650" r="16" fill="url(#goldGrad)" />
    <circle cx="340" cy="670" r="14" fill="url(#goldGrad)" />
    <circle cx="280" cy="660" r="12" fill="url(#goldGrad)" />
  `,
  'marques/sport': `
    <!-- Flamme olympique sacrée et dynamisme athlétique -->
    <path d="M384 440 Q330 520 370 580 Q320 620 384 680 Q448 600 400 550 Q438 500 384 440 Z" fill="url(#goldGrad)" filter="url(#highGlow)" />
    <line x1="354" y1="690" x2="414" y2="690" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round" />
  `,
  'marques/finance': `
    <!-- Portail de banque souveraine et lingot d'or éternel -->
    <polygon points="384,460 290,520 478,520" fill="url(#goldGrad)" />
    <line x1="314" y1="520" x2="314" y2="650" stroke="url(#goldGrad)" stroke-width="8" />
    <line x1="384" y1="520" x2="384" y2="650" stroke="url(#goldGrad)" stroke-width="8" />
    <line x1="454" y1="520" x2="454" y2="650" stroke="url(#goldGrad)" stroke-width="8" />
    <rect x="274" y="650" width="220" height="20" fill="url(#goldGrad)" rx="4" />
  `,
  'marques/services': `
    <!-- Anneau d'alliance d'or infini et poignée de mains -->
    <circle cx="344" cy="560" r="60" fill="none" stroke="url(#goldGrad)" stroke-width="7" />
    <circle cx="424" cy="560" r="60" fill="none" stroke="url(#goldGrad)" stroke-width="7" />
    <circle cx="384" cy="560" r="16" fill="#FFFFFF" filter="url(#highGlow)" />
  `,

  // 7. PERSONNALITÉS
  'personnalites/engagement': `
    <!-- Poing d'or levé vers la liberté et la justice -->
    <rect x="354" y="550" width="60" height="140" rx="10" fill="url(#goldGrad)" stroke="url(#goldGrad)" stroke-width="5" />
    <circle cx="384" cy="520" r="42" fill="url(#goldGrad)" filter="url(#highGlow)" />
    <line x1="384" y1="410" x2="384" y2="470" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" />
  `,
  'personnalites/legendes': `
    <!-- Colosse monumental ancestral sculpté dans la roche étoilée -->
    <polygon points="384,430 460,540 430,710 338,710 308,540" fill="url(#goldGrad)" opacity="0.6" stroke="url(#goldGrad)" stroke-width="6" stroke-linejoin="round" />
    <circle cx="384" cy="490" r="26" fill="#FFFFFF" filter="url(#highGlow)" />
  `,
  'personnalites/musique': `
    <!-- Microphone d'or royal et onde sonore harmonique -->
    <rect x="360" y="480" width="48" height="90" rx="24" fill="url(#goldGrad)" stroke="url(#goldGrad)" stroke-width="5" />
    <path d="M336 540 Q336 620 384 620 Q432 620 432 540" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" />
    <line x1="384" y1="620" x2="384" y2="700" stroke="url(#goldGrad)" stroke-width="7" />
    <line x1="344" y1="700" x2="424" y2="700" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round" />
  `,
  'personnalites/arts': `
    <!-- Palette de peintre enchantée et pinceau traçant la lumière -->
    <path d="M384 460 C300 460 270 530 270 600 C270 680 340 710 400 710 C460 710 498 670 498 600 C498 560 460 550 440 520 C420 490 410 460 384 460 Z" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
    <circle cx="320" cy="550" r="12" fill="url(#goldGrad)" />
    <circle cx="350" cy="510" r="12" fill="url(#goldGrad)" />
    <circle cx="400" cy="500" r="12" fill="url(#goldGrad)" />
  `,
  'personnalites/sport': `
    <!-- Athlète vainqueur bras tendus sous la voûte céleste -->
    <circle cx="384" cy="460" r="22" fill="url(#goldGrad)" />
    <line x1="384" y1="482" x2="384" y2="620" stroke="url(#goldGrad)" stroke-width="7" />
    <path d="M300 470 L384 520 L468 470" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round" fill="none" />
    <path d="M330 710 L384 620 L438 710" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round" fill="none" />
    <circle cx="384" cy="420" r="18" fill="#FFFFFF" filter="url(#highGlow)" />
  `,
  'personnalites/influenceurs': `
    <!-- Antenne stellaire rayonnant la voix à travers le cosmos -->
    <circle cx="384" cy="560" r="24" fill="url(#goldGrad)" />
    <path d="M340 516 Q310 560 340 604" stroke="url(#goldGrad)" stroke-width="5" stroke-linecap="round" fill="none" />
    <path d="M428 516 Q458 560 428 604" stroke="url(#goldGrad)" stroke-width="5" stroke-linecap="round" fill="none" />
    <path d="M310 486 Q266 560 310 634" stroke="url(#goldGrad)" stroke-width="5" stroke-linecap="round" fill="none" />
    <path d="M458 486 Q502 560 458 634" stroke="url(#goldGrad)" stroke-width="5" stroke-linecap="round" fill="none" />
  `,
  'personnalites/foi': `
    <!-- Symbole de foi rayonnant et étoile de David / Ankh cosmique -->
    <circle cx="384" cy="470" r="28" fill="none" stroke="url(#goldGrad)" stroke-width="7" />
    <line x1="384" y1="498" x2="384" y2="700" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round" />
    <line x1="320" y1="560" x2="448" y2="560" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round" />
    <circle cx="384" cy="560" r="22" fill="#FFFFFF" filter="url(#highGlow)" />
  `
};

// Lecture de toutes les sous-catégories
const rawData = fs.readFileSync('src/data/dimensionsData.ts', 'utf8');
const subRegex = /id:\s*'([^']+)',\s+dimensionId:\s*'([^']+)',\s+slug:\s*'([^']+)',\s+ordre:\s*(\d+),\s+label:\s*'([^']+)'/g;

const subcategories = [];
let match;
while ((match = subRegex.exec(rawData)) !== null) {
  const [_, id, dimId, slug, ordre, label] = match;
  if (dimId !== 'series') {
    subcategories.push({ id, dimId, slug, ordre: Number(ordre), label });
  }
}

console.log(`Found ${subcategories.length} subcategories to generate.`);

function generateParticles() {
  let dots = '';
  // Générer des étoiles scintillantes
  const stars = [
    [120, 200, 2, 0.6], [240, 160, 3, 0.8], [620, 220, 2.5, 0.7], [680, 340, 2, 0.5],
    [90, 480, 2, 0.6], [160, 600, 3, 0.85], [600, 640, 3.5, 0.9], [690, 720, 2, 0.6],
    [140, 820, 2.5, 0.7], [220, 920, 2, 0.5], [560, 880, 3, 0.8], [640, 960, 2.5, 0.6],
    [384, 180, 3.5, 0.9], [320, 280, 2, 0.6], [450, 290, 2, 0.7], [200, 360, 2.5, 0.8],
    [540, 380, 2, 0.6], [384, 940, 3, 0.75], [290, 1040, 2, 0.5], [480, 1060, 2.5, 0.7]
  ];
  for (const [cx, cy, r, op] of stars) {
    dots += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#FFE7A3" opacity="${op}" />\n`;
  }
  // Lignes de constellation
  dots += `
    <line x1="120" y1="200" x2="240" y2="160" stroke="#FFE7A3" stroke-width="0.8" opacity="0.3" />
    <line x1="240" y1="160" x2="384" y2="180" stroke="#FFE7A3" stroke-width="0.8" opacity="0.35" />
    <line x1="384" y1="180" x2="620" y2="220" stroke="#FFE7A3" stroke-width="0.8" opacity="0.3" />
    <line x1="620" y1="220" x2="680" y2="340" stroke="#FFE7A3" stroke-width="0.8" opacity="0.25" />
    <line x1="140" y1="820" x2="220" y2="920" stroke="#FFE7A3" stroke-width="0.8" opacity="0.3" />
    <line x1="220" y1="920" x2="384" y2="940" stroke="#FFE7A3" stroke-width="0.8" opacity="0.35" />
    <line x1="384" y1="940" x2="560" y2="880" stroke="#FFE7A3" stroke-width="0.8" opacity="0.3" />
  `;
  return dots;
}

async function renderCard(sub) {
  const theme = DIMENSION_THEMES[sub.dimId] || DIMENSION_THEMES.sagesses;
  const emblem = DIRECTION_EMBLEMS[sub.id] || `
    <!-- Emblème par défaut élégant -->
    <circle cx="384" cy="570" r="70" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
    <circle cx="384" cy="570" r="28" fill="url(#goldGrad)" filter="url(#highGlow)" />
  `;

  const escapeXml = (str) => (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const safeLabel = escapeXml(sub.label);

  const svg = `
  <svg width="768" height="1376" viewBox="0 0 768 1376" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Fond dégradé radial cosmique avec teintes de la porte -->
      <radialGradient id="spaceBg" cx="50%" cy="42%" r="65%">
        <stop offset="0%" stop-color="${theme.bgInner}" />
        <stop offset="45%" stop-color="${theme.bgMid}" />
        <stop offset="85%" stop-color="${theme.bgOuter}" />
        <stop offset="100%" stop-color="#040207" />
      </radialGradient>

      <!-- Halo lumineux central -->
      <radialGradient id="centerGlow" cx="50%" cy="42%" r="40%">
        <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.45" />
        <stop offset="60%" stop-color="${theme.accent}" stop-opacity="0.1" />
        <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0" />
      </radialGradient>

      <!-- Or riche Yonywood -->
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.goldLight}" />
        <stop offset="25%" stop-color="${theme.goldMid}" />
        <stop offset="70%" stop-color="${theme.goldDark}" />
        <stop offset="100%" stop-color="#78350F" />
      </linearGradient>

      <!-- Rayonnement or étincelant -->
      <linearGradient id="rayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${theme.goldMid}" stop-opacity="0.5" />
        <stop offset="100%" stop-color="${theme.goldMid}" stop-opacity="0" />
      </linearGradient>

      <!-- Filtre lueur intense -->
      <filter id="highGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="16" result="blur1" />
        <feGaussianBlur stdDeviation="30" result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- Filtre halo subtil -->
      <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- 1. Fond abyssal cosmique -->
    <rect width="768" height="1376" fill="url(#spaceBg)" />

    <!-- 2. Halo d'énergie de la dimension -->
    <circle cx="384" cy="570" r="380" fill="url(#centerGlow)" />

    <!-- 3. Rayons de lumière sacrée (Sunburst) -->
    <g opacity="0.35" transform="translate(384, 570)">
      ${Array.from({ length: 24 }).map((_, i) => `
        <line x1="0" y1="0" x2="0" y2="-440" stroke="url(#rayGrad)" stroke-width="${i % 2 === 0 ? '2' : '1'}" transform="rotate(${i * 15})" />
      `).join('')}
    </g>

    <!-- 4. Constellations et particules stellaires -->
    ${generateParticles()}

    <!-- 5. Mandalas et anneaux sacrés concentriques -->
    <g filter="url(#softGlow)">
      <!-- Anneau extérieur avec graduations astronomiques -->
      <circle cx="384" cy="570" r="280" fill="none" stroke="url(#goldGrad)" stroke-width="2" opacity="0.45" />
      <circle cx="384" cy="570" r="260" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-dasharray="8 8" opacity="0.65" />
      <circle cx="384" cy="570" r="230" fill="none" stroke="url(#goldGrad)" stroke-width="1" opacity="0.4" />
      <circle cx="384" cy="570" r="190" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-dasharray="4 6" opacity="0.7" />
      <circle cx="384" cy="570" r="140" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" opacity="0.5" />
    </g>

    <!-- 6. Emblème thématique central majestueux -->
    <g filter="url(#highGlow)">
      ${emblem}
    </g>

    <!-- 7. Vues artistiques et géométrie sacrée de soutien -->
    <polygon points="384,270 410,290 384,310 358,290" fill="url(#goldGrad)" filter="url(#highGlow)" />
    <polygon points="384,830 410,850 384,870 358,850" fill="url(#goldGrad)" filter="url(#highGlow)" />
    <polygon points="104,570 124,596 144,570 124,544" fill="url(#goldGrad)" filter="url(#highGlow)" />
    <polygon points="664,570 644,596 624,570 644,544" fill="url(#goldGrad)" filter="url(#highGlow)" />

    <!-- 8. Titrage calligraphique & Typographie sacrée -->
    <g text-anchor="middle">
      <!-- Badge de dimension en haut -->
      <rect x="254" y="90" width="260" height="34" rx="17" fill="#000000" fill-opacity="0.65" stroke="url(#goldGrad)" stroke-width="1.2" />
      <text x="384" y="112" font-family="sans-serif" font-size="11" font-weight="700" letter-spacing="3" fill="#FFE7A3">
        ${theme.title}
      </text>

      <!-- Titre majestueux de la direction -->
      <text x="384" y="1030" font-family="serif" font-size="38" font-weight="800" letter-spacing="1" fill="#FFFFFF" filter="url(#softGlow)">
        ${safeLabel}
      </text>

      <!-- Numéro de direction 0X / 08 -->
      <text x="384" y="1075" font-family="sans-serif" font-size="12" font-weight="600" letter-spacing="4" fill="${theme.goldMid}" opacity="0.9">
        DIRECTION 0${sub.ordre} · YONYWOOD
      </text>
    </g>

    <!-- 9. Vignette sombre cinématographique cinéma 9:16 -->
    <rect width="768" height="1376" fill="none" stroke="#000000" stroke-width="8" opacity="0.8" />
  </svg>
  `;

  const fileName = `${sub.dimId}-${sub.slug}.jpg`;
  const targetPath = path.join(outputDir, fileName);

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(targetPath);

  return `/assets/directions/${fileName}`;
}

async function run() {
  console.log('Generating images for all 56 directions...');
  const mapResults = {};

  for (const sub of subcategories) {
    try {
      const url = await renderCard(sub);
      mapResults[sub.id] = url;
      console.log(`Generated: ${sub.id} -> ${url}`);
    } catch (e) {
      console.error(`Error generating ${sub.id}:`, e);
    }
  }

  fs.writeFileSync('scripts/direction-images-map.json', JSON.stringify(mapResults, null, 2));
  console.log('Finished generating all direction images successfully!');
}

run();
