import React from 'react';

// Fallback neutre (étincelle / boussole)
const FALLBACK_INNER = `<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />`;

export const SVG_ICONS_INNER: Record<string, string> = {
  // =========================================================================
  // NOUVELLES ICÔNES OFFICIELLES V2 FOURNIES PAR L'UTILISATEUR
  // =========================================================================

  // 01. Sagesses
  "01-sagesses/_dimension": "<path d=\"M12 14.500v6.500M12 18l-3 2M12 18l3 2\"/><circle cx=\"12\" cy=\"8.5\" r=\"5.5\"/><circle cx=\"12\" cy=\"8.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "sagesses/_dimension": "<path d=\"M12 14.500v6.500M12 18l-3 2M12 18l3 2\"/><circle cx=\"12\" cy=\"8.5\" r=\"5.5\"/><circle cx=\"12\" cy=\"8.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "01-sagesses/resilience": "<path d=\"M3 20l6-10 4 6 2-3 6 7z\"/><circle cx=\"17\" cy=\"6\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "sagesses/resilience": "<path d=\"M3 20l6-10 4 6 2-3 6 7z\"/><circle cx=\"17\" cy=\"6\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "01-sagesses/amour": "<path d=\"M9 19s-6-3.500-6-8a3.200 3.200 0 016-1.500A3.200 3.200 0 0115 11c0 4.500-6 8-6 8z\"/><path d=\"M15.500 14.500c2.500-1 5.500-3 5.500-6a3 3 0 00-5.500-1.500\"/>",
  "sagesses/amour": "<path d=\"M9 19s-6-3.500-6-8a3.200 3.200 0 016-1.500A3.200 3.200 0 0115 11c0 4.500-6 8-6 8z\"/><path d=\"M15.500 14.500c2.500-1 5.500-3 5.500-6a3 3 0 00-5.500-1.500\"/>",
  "01-sagesses/solidarite": "<circle cx=\"7\" cy=\"6\" r=\"2.5\"/><circle cx=\"17\" cy=\"6\" r=\"2.5\"/><path d=\"M3 20v-4a4 4 0 014-4h2M21 20v-4a4 4 0 00-4-4h-2M9 14h6\"/><circle cx=\"12\" cy=\"14\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "sagesses/solidarite": "<circle cx=\"7\" cy=\"6\" r=\"2.5\"/><circle cx=\"17\" cy=\"6\" r=\"2.5\"/><path d=\"M3 20v-4a4 4 0 014-4h2M21 20v-4a4 4 0 00-4-4h-2M9 14h6\"/><circle cx=\"12\" cy=\"14\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "01-sagesses/gratitude": "<path d=\"M3 12h18c0 4-4 7-9 7s-9-3-9-7z\"/><circle cx=\"12\" cy=\"6.5\" r=\"1.6\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M12 2v1.500M8 4l1 1M16 4l-1 1\"/>",
  "sagesses/gratitude": "<path d=\"M3 12h18c0 4-4 7-9 7s-9-3-9-7z\"/><circle cx=\"12\" cy=\"6.5\" r=\"1.6\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M12 2v1.500M8 4l1 1M16 4l-1 1\"/>",
  "01-sagesses/perseverance": "<path d=\"M3 20h4v-4h4v-4h4V8h4V5\"/><circle cx=\"20\" cy=\"3.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "sagesses/perseverance": "<path d=\"M3 20h4v-4h4v-4h4V8h4V5\"/><circle cx=\"20\" cy=\"3.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "01-sagesses/bienveillance": "<path d=\"M12 15s-3.500-2.200-3.500-4.600A2 2 0 0112 9.300a2 2 0 013.500 1.100C15.500 12.800 12 15 12 15z\"/><path d=\"M4 12a8 8 0 008 8M20 12a8 8 0 00-8-8\"/>",
  "sagesses/bienveillance": "<path d=\"M12 15s-3.500-2.200-3.500-4.600A2 2 0 0112 9.300a2 2 0 013.500 1.100C15.500 12.800 12 15 12 15z\"/><path d=\"M4 12a8 8 0 008 8M20 12a8 8 0 00-8-8\"/>",
  "01-sagesses/pardon": "<path d=\"M10 13a5 5 0 007.540.540l3-3a5 5 0 00-7.070-7.070l-1.720 1.710M14 11a5 5 0 00-7.540-.540l-3 3a5 5 0 007.070 7.070l1.710-1.710\"/>",
  "sagesses/pardon": "<path d=\"M10 13a5 5 0 007.540.540l3-3a5 5 0 00-7.070-7.070l-1.720 1.710M14 11a5 5 0 00-7.540-.540l-3 3a5 5 0 007.070 7.070l1.710-1.710\"/>",
  "01-sagesses/humilite": "<path d=\"M3 20h18M12 20v-8M12 12c0-3-2-5-5-5 0 3 2 5 5 5zM12 14c0-2 2-4 5-4 0 3-2 4-5 4z\"/><circle cx=\"7.5\" cy=\"17\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "sagesses/humilite": "<path d=\"M3 20h18M12 20v-8M12 12c0-3-2-5-5-5 0 3 2 5 5 5zM12 14c0-2 2-4 5-4 0 3-2 4-5 4z\"/><circle cx=\"7.5\" cy=\"17\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",

  // 02. Territoires
  "02-territoires/_dimension": "<path d=\"M12 21s-6-5.500-6-10a6 6 0 0112 0c0 4.500-6 10-6 10z\"/><circle cx=\"12\" cy=\"11\" r=\"2\" fill=\"currentColor\" stroke=\"none\"/>",
  "territoires/_dimension": "<path d=\"M12 21s-6-5.500-6-10a6 6 0 0112 0c0 4.500-6 10-6 10z\"/><circle cx=\"12\" cy=\"11\" r=\"2\" fill=\"currentColor\" stroke=\"none\"/>",
  "02-territoires/patrimoine": "<path d=\"M5 20V10a7 7 0 0114 0v10M3 20h18M9 20v-6a3 3 0 016 0v6\"/><circle cx=\"12\" cy=\"5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "territoires/patrimoine": "<path d=\"M5 20V10a7 7 0 0114 0v10M3 20h18M9 20v-6a3 3 0 016 0v6\"/><circle cx=\"12\" cy=\"5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "02-territoires/traditions": "<ellipse cx=\"12\" cy=\"8\" rx=\"8\" ry=\"3\"/><path d=\"M4 8v8c0 1.700 3.600 3 8 3s8-1.300 8-3V8M8 11l2 7M16 11l-2 7\"/>",
  "territoires/traditions": "<ellipse cx=\"12\" cy=\"8\" rx=\"8\" ry=\"3\"/><path d=\"M4 8v8c0 1.700 3.600 3 8 3s8-1.300 8-3V8M8 11l2 7M16 11l-2 7\"/>",
  "02-territoires/culture": "<path d=\"M4 5h9v6a4.500 4.500 0 01-9 0zM11 12h9v5a4.500 4.500 0 01-9 0z\"/><circle cx=\"7\" cy=\"8\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"10\" cy=\"8\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "territoires/culture": "<path d=\"M4 5h9v6a4.500 4.500 0 01-9 0zM11 12h9v5a4.500 4.500 0 01-9 0z\"/><circle cx=\"7\" cy=\"8\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"10\" cy=\"8\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "02-territoires/histoire": "<path d=\"M6 4h12v14a2 2 0 002 2H8a2 2 0 01-2-2zM6 4a2 2 0 00-2 2v2h2M10 9h5M10 13h5\"/>",
  "territoires/histoire": "<path d=\"M6 4h12v14a2 2 0 002 2H8a2 2 0 01-2-2zM6 4a2 2 0 00-2 2v2h2M10 9h5M10 13h5\"/>",
  "02-territoires/terroirs": "<path d=\"M4 11h16l-2 9H6zM8 11l3-6M16 11l-3-6\"/><circle cx=\"12\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "territoires/terroirs": "<path d=\"M4 11h16l-2 9H6zM8 11l3-6M16 11l-3-6\"/><circle cx=\"12\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "02-territoires/langues": "<path d=\"M3 5h10M8 3v2M5 5c1 4 3 6 6 8M11 5c-1 4-4 7-8 9M13 21l4-10 4 10M14.500 18h5\"/>",
  "territoires/langues": "<path d=\"M3 5h10M8 3v2M5 5c1 4 3 6 6 8M11 5c-1 4-4 7-8 9M13 21l4-10 4 10M14.500 18h5\"/>",
  "02-territoires/diaspora": "<path d=\"M4 8h14l-3-3M20 16H6l3 3\"/>",
  "territoires/diaspora": "<path d=\"M4 8h14l-3-3M20 16H6l3 3\"/>",
  "02-territoires/habitudes": "<path d=\"M5 11h12v5a5 5 0 01-5 5h-2a5 5 0 01-5-5zM17 12h1.500a2.500 2.500 0 010 5H17M9 3c-1 1.500 1 2.500 0 4M13 3c-1 1.500 1 2.500 0 4\"/><circle cx=\"11\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "territoires/habitudes": "<path d=\"M5 11h12v5a5 5 0 01-5 5h-2a5 5 0 01-5-5zM17 12h1.500a2.500 2.500 0 010 5H17M9 3c-1 1.500 1 2.500 0 4M13 3c-1 1.500 1 2.500 0 4\"/><circle cx=\"11\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",

  // 03. Expertises
  "03-expertises/_dimension": "<path d=\"M4 20l8-8\"/><path d=\"M10 6l4-3 6 6-3 4z\"/>",
  "expertises/_dimension": "<path d=\"M4 20l8-8\"/><path d=\"M10 6l4-3 6 6-3 4z\"/>",
  "03-expertises/artisanat": "<path d=\"M4 20l8-8M10 6l4-3 6 6-3 4z\"/><circle cx=\"6.5\" cy=\"17.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "expertises/artisanat": "<path d=\"M4 20l8-8M10 6l4-3 6 6-3 4z\"/><circle cx=\"6.5\" cy=\"17.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "03-expertises/education": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"12\" rx=\"2\"/><path d=\"M8 20l2-4M16 20l-2-4M11 10h6\"/><circle cx=\"8\" cy=\"10\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "expertises/education": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"12\" rx=\"2\"/><path d=\"M8 20l2-4M16 20l-2-4M11 10h6\"/><circle cx=\"8\" cy=\"10\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "03-expertises/numerique": "<path d=\"M8 7l-5 5 5 5M16 7l5 5-5 5M13 6l-2 12\"/>",
  "expertises/numerique": "<path d=\"M8 7l-5 5 5 5M16 7l5 5-5 5M13 6l-2 12\"/>",
  "03-expertises/business": "<rect x=\"3\" y=\"8\" width=\"18\" height=\"12\" rx=\"2\"/><path d=\"M9 8V6a1 1 0 011-1h4a1 1 0 011 1v2M3 13h6M15 13h6\"/><circle cx=\"12\" cy=\"13\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "expertises/business": "<rect x=\"3\" y=\"8\" width=\"18\" height=\"12\" rx=\"2\"/><path d=\"M9 8V6a1 1 0 011-1h4a1 1 0 011 1v2M3 13h6M15 13h6\"/><circle cx=\"12\" cy=\"13\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "03-expertises/justice": "<path d=\"M12 4v16M7 20h10M5 7h14M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z\"/><circle cx=\"12\" cy=\"4\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "expertises/justice": "<path d=\"M12 4v16M7 20h10M5 7h14M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z\"/><circle cx=\"12\" cy=\"4\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "03-expertises/sante": "<path d=\"M6 3v6a4 4 0 008 0V3M10 13v2a5 5 0 0010 0v-1\"/><circle cx=\"19\" cy=\"12\" r=\"2\"/>",
  "expertises/sante": "<path d=\"M6 3v6a4 4 0 008 0V3M10 13v2a5 5 0 0010 0v-1\"/><circle cx=\"19\" cy=\"12\" r=\"2\"/>",
  "03-expertises/securite": "<path d=\"M12 3l8 3v5c0 5-3.500 8-8 10-4.500-2-8-5-8-10V6z\"/><circle cx=\"12\" cy=\"11\" r=\"1.8\" fill=\"currentColor\" stroke=\"none\"/>",
  "expertises/securite": "<path d=\"M12 3l8 3v5c0 5-3.500 8-8 10-4.500-2-8-5-8-10V6z\"/><circle cx=\"12\" cy=\"11\" r=\"1.8\" fill=\"currentColor\" stroke=\"none\"/>",
  "03-expertises/design": "<path d=\"M4 20l1-4L16 5l3 3L8 19zM14 7l3 3\"/><circle cx=\"6.5\" cy=\"17.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "expertises/design": "<path d=\"M4 20l1-4L16 5l3 3L8 19zM14 7l3 3\"/><circle cx=\"6.5\" cy=\"17.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",

  // 04. Produits et services
  "04-produits-services/_dimension": "<path d=\"M5 8h14l-1 12H6zM9 8V6a3 3 0 016 0v2\"/><circle cx=\"9.5\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "produits-services/_dimension": "<path d=\"M5 8h14l-1 12H6zM9 8V6a3 3 0 016 0v2\"/><circle cx=\"9.5\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "04-produits-services/beaute": "<circle cx=\"12\" cy=\"9\" r=\"6\"/><path d=\"M12 15v6M9 21h6\"/><circle cx=\"10\" cy=\"7\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "produits-services/beaute": "<circle cx=\"12\" cy=\"9\" r=\"6\"/><path d=\"M12 15v6M9 21h6\"/><circle cx=\"10\" cy=\"7\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "04-produits-services/restauration": "<path d=\"M4 17a8 8 0 0116 0zM2 20h20M12 9V6\"/><circle cx=\"12\" cy=\"4.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "produits-services/restauration": "<path d=\"M4 17a8 8 0 0116 0zM2 20h20M12 9V6\"/><circle cx=\"12\" cy=\"4.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "04-produits-services/mode": "<path d=\"M12 8a2.500 2.500 0 10-2.500-2.500M12 8v2l9 6a1.500 1.500 0 01-1 2.500H4a1.500 1.500 0 01-1-2.500l9-6\"/>",
  "produits-services/mode": "<path d=\"M12 8a2.500 2.500 0 10-2.500-2.500M12 8v2l9 6a1.500 1.500 0 01-1 2.500H4a1.500 1.500 0 01-1-2.500l9-6\"/>",
  "04-produits-services/bien-etre": "<path d=\"M5 19c0-8 5-14 15-14 0 10-6 15-15 14zM5 19l8-8\"/><circle cx=\"15\" cy=\"9\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "produits-services/bien-etre": "<path d=\"M5 19c0-8 5-14 15-14 0 10-6 15-15 14zM5 19l8-8\"/><circle cx=\"15\" cy=\"9\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "04-produits-services/tourisme": "<rect x=\"4\" y=\"8\" width=\"16\" height=\"12\" rx=\"2\"/><path d=\"M9 8V5h6v3M8 8v12M16 8v12\"/><circle cx=\"12\" cy=\"14\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "produits-services/tourisme": "<rect x=\"4\" y=\"8\" width=\"16\" height=\"12\" rx=\"2\"/><path d=\"M9 8V5h6v3M8 8v12M16 8v12\"/><circle cx=\"12\" cy=\"14\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "04-produits-services/garde-enfants": "<circle cx=\"10\" cy=\"9\" r=\"5\"/><path d=\"M13.500 12.500L19 18\"/><circle cx=\"20.5\" cy=\"19.5\" r=\"1.8\"/><circle cx=\"10\" cy=\"9\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "produits-services/garde-enfants": "<circle cx=\"10\" cy=\"9\" r=\"5\"/><path d=\"M13.500 12.500L19 18\"/><circle cx=\"20.5\" cy=\"19.5\" r=\"1.8\"/><circle cx=\"10\" cy=\"9\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "04-produits-services/conciergerie": "<circle cx=\"8\" cy=\"15\" r=\"4\"/><path d=\"M11 12l9-9M16 7l3 3M14 9l2 2\"/><circle cx=\"8\" cy=\"15\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/>",
  "produits-services/conciergerie": "<circle cx=\"8\" cy=\"15\" r=\"4\"/><path d=\"M11 12l9-9M16 7l3 3M14 9l2 2\"/><circle cx=\"8\" cy=\"15\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/>",
  "04-produits-services/immobilier": "<path d=\"M3 11l9-8 9 8M5 10v10h14V10M10 20v-5h4v5\"/><circle cx=\"12\" cy=\"8.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "produits-services/immobilier": "<path d=\"M3 11l9-8 9 8M5 10v10h14V10M10 20v-5h4v5\"/><circle cx=\"12\" cy=\"8.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",

  // 05. Projets
  "05-projets/_dimension": "<path d=\"M6 21V4M6 5h11l-2 3.500 2 3.500H6\"/><circle cx=\"9.5\" cy=\"8.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "projets/_dimension": "<path d=\"M6 21V4M6 5h11l-2 3.500 2 3.500H6\"/><circle cx=\"9.5\" cy=\"8.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "05-projets/jeux": "<path d=\"M6 8h12a4 4 0 014 4v2a3 3 0 01-5 2l-2-2H9l-2 2a3 3 0 01-5-2v-2a4 4 0 014-4zM7 12h4M9 10v4\"/><circle cx=\"15.5\" cy=\"11\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"17.5\" cy=\"13\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "projets/jeux": "<path d=\"M6 8h12a4 4 0 014 4v2a3 3 0 01-5 2l-2-2H9l-2 2a3 3 0 01-5-2v-2a4 4 0 014-4zM7 12h4M9 10v4\"/><circle cx=\"15.5\" cy=\"11\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"17.5\" cy=\"13\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "05-projets/ecologie": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M7 14c0-4 3-6 8-6 0 4-3 6-8 6zM7 14l4-4\"/>",
  "projets/ecologie": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M7 14c0-4 3-6 8-6 0 4-3 6-8 6zM7 14l4-4\"/>",
  "05-projets/culture": "<path d=\"M4 5h9v6a4.500 4.500 0 01-9 0zM11 12h9v5a4.500 4.500 0 01-9 0z\"/><circle cx=\"7\" cy=\"8\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"10\" cy=\"8\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "projets/culture": "<path d=\"M4 5h9v6a4.500 4.500 0 01-9 0zM11 12h9v5a4.500 4.500 0 01-9 0z\"/><circle cx=\"7\" cy=\"8\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"10\" cy=\"8\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "05-projets/social": "<path d=\"M12 16s-4-2.500-4-5a2 2 0 014-.5 2 2 0 014 .5c0 2.500-4 5-4 5zM3 12c0 4 3 8 9 9M21 12c0 4-3 8-9 9\"/>",
  "projets/social": "<path d=\"M12 16s-4-2.500-4-5a2 2 0 014-.5 2 2 0 014 .5c0 2.500-4 5-4 5zM3 12c0 4 3 8 9 9M21 12c0 4-3 8-9 9\"/>",
  "05-projets/communautaire": "<path d=\"M2 20v-6l3-3 3 3v6M8 20v-9l4-4 4 4v9M16 20v-6l3-3 3 3v6M2 20h20\"/><circle cx=\"12\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "projets/communautaire": "<path d=\"M2 20v-6l3-3 3 3v6M8 20v-9l4-4 4 4v9M16 20v-6l3-3 3 3v6M2 20h20\"/><circle cx=\"12\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "05-projets/innovation": "<path d=\"M12 3c4 2 6 6 5 12H7c-1-6 1-10 5-12zM7 15l-3 3 3 1M17 15l3 3-3 1M10 19l2 3 2-3\"/><circle cx=\"12\" cy=\"9\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "projets/innovation": "<path d=\"M12 3c4 2 6 6 5 12H7c-1-6 1-10 5-12zM7 15l-3 3 3 1M17 15l3 3-3 1M10 19l2 3 2-3\"/><circle cx=\"12\" cy=\"9\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "05-projets/entreprise": "<path d=\"M12 14V9M12 9c0-3 2-4 5-4 0 3-2 4-5 4zM12 11c0-2-1.500-3-4-3 0 2 1.500 3 4 3zM6 14h12l-1.500 7h-9z\"/>",
  "projets/entreprise": "<path d=\"M12 14V9M12 9c0-3 2-4 5-4 0 3-2 4-5 4zM12 11c0-2-1.500-3-4-3 0 2 1.500 3 4 3zM6 14h12l-1.500 7h-9z\"/>",
  "05-projets/aventure": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M15.500 8.500l-2 5-5 2 2-5z\"/><circle cx=\"12\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "projets/aventure": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M15.500 8.500l-2 5-5 2 2-5z\"/><circle cx=\"12\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",

  // 06. Marques
  "06-marques/_dimension": "<path d=\"M5 4h14v10a7 7 0 01-14 0z\"/><circle cx=\"12\" cy=\"11\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "marques/_dimension": "<path d=\"M5 4h14v10a7 7 0 01-14 0z\"/><circle cx=\"12\" cy=\"11\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "06-marques/luxe": "<path d=\"M6 4h12l4 5-10 12L2 9zM2 9h20M9 4l-2 5 5 12 5-12-2-5\"/>",
  "marques/luxe": "<path d=\"M6 4h12l4 5-10 12L2 9zM2 9h20M9 4l-2 5 5 12 5-12-2-5\"/>",
  "06-marques/mode": "<path d=\"M3 17v-6l4 1 3-4 3 4 3 1c3 0 5 2 5 4v1a1 1 0 01-1 1H4a1 1 0 01-1-1z\"/><circle cx=\"10\" cy=\"14\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "marques/mode": "<path d=\"M3 17v-6l4 1 3-4 3 4 3 1c3 0 5 2 5 4v1a1 1 0 01-1 1H4a1 1 0 01-1-1z\"/><circle cx=\"10\" cy=\"14\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "06-marques/beaute": "<rect x=\"6\" y=\"9\" width=\"12\" height=\"12\" rx=\"3\"/><path d=\"M10 9V6h4v3M9 4h6\"/><circle cx=\"12\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "marques/beaute": "<rect x=\"6\" y=\"9\" width=\"12\" height=\"12\" rx=\"3\"/><path d=\"M10 9V6h4v3M9 4h6\"/><circle cx=\"12\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "06-marques/tech": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"12\" rx=\"2\"/><path d=\"M9 20h6M12 16v4M10 8l5 3-5 3z\"/>",
  "marques/tech": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"12\" rx=\"2\"/><path d=\"M9 20h6M12 16v4M10 8l5 3-5 3z\"/>",
  "06-marques/alimentation": "<path d=\"M10 3h4v4l2 3v11H8V10l2-3zM8 14h8\"/><circle cx=\"12\" cy=\"17.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "marques/alimentation": "<path d=\"M10 3h4v4l2 3v11H8V10l2-3zM8 14h8\"/><circle cx=\"12\" cy=\"17.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "06-marques/sport": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18M12 3v18M6 5c3 3 3 11 0 14M18 5c-3 3-3 11 0 14\"/>",
  "marques/sport": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18M12 3v18M6 5c3 3 3 11 0 14M18 5c-3 3-3 11 0 14\"/>",
  "06-marques/finance": "<circle cx=\"8\" cy=\"8\" r=\"6\"/><path d=\"M18.09 10.37A6 6 0 1 1 10.34 18\"/><path d=\"M7 6h1v4\"/><path d=\"m16.71 13.88.7.71-2.82 2.82\"/>",
  "marques/finance": "<circle cx=\"8\" cy=\"8\" r=\"6\"/><path d=\"M18.09 10.37A6 6 0 1 1 10.34 18\"/><path d=\"M7 6h1v4\"/><path d=\"m16.71 13.88.7.71-2.82 2.82\"/>",
  "06-marques/services": "<path d=\"M12 3l8 3v5c0 5-3.500 8-8 10-4.500-2-8-5-8-10V6z\"/><circle cx=\"12\" cy=\"11\" r=\"3\"/><circle cx=\"12\" cy=\"11\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "marques/services": "<path d=\"M12 3l8 3v5c0 5-3.500 8-8 10-4.500-2-8-5-8-10V6z\"/><circle cx=\"12\" cy=\"11\" r=\"3\"/><circle cx=\"12\" cy=\"11\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",

  // 07. Personnalités
  "07-personnalites/_dimension": "<path d=\"M12 3.500l2.600 5.400 5.900.8-4.300 4.100 1 5.900L12 17l-5.200 2.700 1-5.900L3.500 9.700l5.900-.8z\"/>",
  "personnalites/_dimension": "<path d=\"M12 3.500l2.600 5.400 5.900.8-4.300 4.100 1 5.900L12 17l-5.200 2.700 1-5.900L3.500 9.700l5.900-.8z\"/>",
  "07-personnalites/engagement": "<path d=\"M3 10v4h4l8 5V5l-8 5zM18 9a4 4 0 010 6\"/><circle cx=\"7\" cy=\"17.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "personnalites/engagement": "<path d=\"M3 10v4h4l8 5V5l-8 5zM18 9a4 4 0 010 6\"/><circle cx=\"7\" cy=\"17.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "07-personnalites/legendes": "<path d=\"M3 8l4 4 5-7 5 7 4-4-2 11H5z\"/><circle cx=\"12\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "personnalites/legendes": "<path d=\"M3 8l4 4 5-7 5 7 4-4-2 11H5z\"/><circle cx=\"12\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "07-personnalites/musique": "<path d=\"M9 18V5l11-2v13\"/><circle cx=\"6.5\" cy=\"18\" r=\"2.5\"/><circle cx=\"17.5\" cy=\"16\" r=\"2.5\"/>",
  "personnalites/musique": "<path d=\"M9 18V5l11-2v13\"/><circle cx=\"6.5\" cy=\"18\" r=\"2.5\"/><circle cx=\"17.5\" cy=\"16\" r=\"2.5\"/>",
  "07-personnalites/cinema": "<rect x=\"3\" y=\"10\" width=\"18\" height=\"11\" rx=\"2\"/><path d=\"M3 10l2-5 14-2 1 4M8 6l2 3M13 5l2 3\"/><circle cx=\"12\" cy=\"16\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "personnalites/cinema": "<rect x=\"3\" y=\"10\" width=\"18\" height=\"11\" rx=\"2\"/><path d=\"M3 10l2-5 14-2 1 4M8 6l2 3M13 5l2 3\"/><circle cx=\"12\" cy=\"16\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "07-personnalites/arts": "<path d=\"M20 4c-8 0-14 4-14 12l-2 4M20 4c0 8-4 12-11 12M9 16l7-7\"/>",
  "personnalites/arts": "<path d=\"M20 4c-8 0-14 4-14 12l-2 4M20 4c0 8-4 12-11 12M9 16l7-7\"/>",
  "07-personnalites/sport": "<path d=\"M8 4h8v6a4 4 0 01-8 0zM8 6H4v1a4 4 0 004 4M16 6h4v1a4 4 0 01-4 4M12 14v4M8 21h8M10 18h4\"/>",
  "personnalites/sport": "<path d=\"M8 4h8v6a4 4 0 01-8 0zM8 6H4v1a4 4 0 004 4M16 6h4v1a4 4 0 01-4 4M12 14v4M8 21h8M10 18h4\"/>",
  "07-personnalites/influenceurs": "<rect x=\"7\" y=\"3\" width=\"10\" height=\"18\" rx=\"3\"/><path d=\"M12 15s-2.500-1.500-2.500-3.200a1.400 1.400 0 012.500-.8 1.400 1.400 0 012.500.8C14.500 13.500 12 15 12 15z\"/>",
  "personnalites/influenceurs": "<rect x=\"7\" y=\"3\" width=\"10\" height=\"18\" rx=\"3\"/><path d=\"M12 15s-2.500-1.500-2.500-3.200a1.400 1.400 0 012.500-.8 1.400 1.400 0 012.500.8C14.500 13.500 12 15 12 15z\"/>",
  "07-personnalites/foi": "<path d=\"M12 3c1 4 5 6 5 11a5 5 0 01-10 0c0-2 1-3.500 2-5 .5 1 1 1.500 2 2 0-3-1-5 1-8z\"/><circle cx=\"12\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "personnalites/foi": "<path d=\"M12 3c1 4 5 6 5 11a5 5 0 01-10 0c0-2 1-3.500 2-5 .5 1 1 1.500 2 2 0-3-1-5 1-8z\"/><circle cx=\"12\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",

  // 08. Séries
  "08-series/_dimension": "<rect x=\"5\" y=\"9\" width=\"14\" height=\"11\" rx=\"2\"/><path d=\"M7 6h10M9 3h6\"/><circle cx=\"12\" cy=\"14.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "16-series/_dimension": "<rect x=\"5\" y=\"9\" width=\"14\" height=\"11\" rx=\"2\"/><path d=\"M7 6h10M9 3h6\"/><circle cx=\"12\" cy=\"14.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "series/_dimension": "<rect x=\"5\" y=\"9\" width=\"14\" height=\"11\" rx=\"2\"/><path d=\"M7 6h10M9 3h6\"/><circle cx=\"12\" cy=\"14.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",

  // --- ANCIENNES ENTRÉES POUR RÉTROCOMPATIBILITÉ ET ALIAS ---
  "03-expertises/droit-finance": "<path d=\"M12 4v16M7 20h10M5 7h14M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z\"/><circle cx=\"12\" cy=\"4\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "expertises/droit-finance": "<path d=\"M12 4v16M7 20h10M5 7h14M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z\"/><circle cx=\"12\" cy=\"4\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "03-expertises/technologie": "<path d=\"M8 7l-5 5 5 5M16 7l5 5-5 5M13 6l-2 12\"/>",
  "03-expertises/commerce": "<path d=\"M4 9l1-5h14l1 5a3 3 0 01-6 0 3 3 0 01-4 0 3 3 0 01-6 0zM5 12v8h14v-8M10 20v-4h4v4\"/>",
  "03-expertises/agriculture": "<path d=\"M12 21V8M12 8c-3 0-4-2-4-4 3 0 4 2 4 4zM12 8c3 0 4-2 4-4-3 0-4 2-4 4zM12 14c-3 0-4-2-4-4 3 0 4 2 4 4zM12 14c3 0 4-2 4-4-3 0-4 2-4 4z\"/>",
  "03-expertises/arts-medias": "<rect x=\"9\" y=\"3\" width=\"6\" height=\"11\" rx=\"3\"/><path d=\"M5 11a7 7 0 0014 0M12 18v3\"/><circle cx=\"12\" cy=\"7\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "expertises/arts-medias": "<rect x=\"9\" y=\"3\" width=\"6\" height=\"11\" rx=\"3\"/><path d=\"M5 11a7 7 0 0014 0M12 18v3\"/><circle cx=\"12\" cy=\"7\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "04-produits-services/alimentation": "<path d=\"M7 3v7a2 2 0 004 0V3M9 10v11M17 21V3c-3 1-4 5-4 8h4\"/>",
  "produits-services/alimentation": "<path d=\"M7 3v7a2 2 0 004 0V3M9 10v11M17 21V3c-3 1-4 5-4 8h4\"/>",
  "04-produits-services/maison": "<path d=\"M5 12V9a3 3 0 013-3h8a3 3 0 013 3v3M3 13a2 2 0 014 0v2h10v-2a2 2 0 014 0v5H3zM6 18v2M18 18v2\"/>",
  "produits-services/maison": "<path d=\"M5 12V9a3 3 0 013-3h8a3 3 0 013 3v3M3 13a2 2 0 014 0v2h10v-2a2 2 0 014 0v5H3zM6 18v2M18 18v2\"/>",
  "04-produits-services/numerique": "<rect x=\"7\" y=\"3\" width=\"10\" height=\"18\" rx=\"3\"/><circle cx=\"12\" cy=\"18\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "produits-services/numerique": "<rect x=\"7\" y=\"3\" width=\"10\" height=\"18\" rx=\"3\"/><circle cx=\"12\" cy=\"18\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "04-produits-services/services-personne": "<path d=\"M12 11s-4-2.500-4-5.200A2.200 2.200 0 0112 5a2.200 2.200 0 014 .8C16 8.500 12 11 12 11z\"/><path d=\"M3 15c3 0 4 1 6 1h5a1.500 1.500 0 010 3H8M14 18l5-2.500a1.500 1.500 0 011.500 2.500L14 21H8\"/>",
  "produits-services/services-personne": "<path d=\"M12 11s-4-2.500-4-5.200A2.200 2.200 0 0112 5a2.200 2.200 0 014 .8C16 8.500 12 11 12 11z\"/><path d=\"M3 15c3 0 4 1 6 1h5a1.500 1.500 0 010 3H8M14 18l5-2.500a1.500 1.500 0 011.500 2.500L14 21H8\"/>",
  "04-produits-services/transport-loisirs": "<path d=\"M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4zM14 6v2M14 16v2\"/><circle cx=\"8\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "produits-services/transport-loisirs": "<path d=\"M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4zM14 6v2M14 16v2\"/><circle cx=\"8\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "05-projets/entreprises": "<path d=\"M12 14V9M12 9c0-3 2-4 5-4 0 3-2 4-5 4zM12 11c0-2-1.500-3-4-3 0 2 1.500 3 4 3zM6 14h12l-1.500 7h-9z\"/>",
  "05-projets/humanitaire": "<path d=\"M12 16s-4-2.500-4-5a2 2 0 014-.5 2 2 0 014 .5c0 2.500-4 5-4 5zM3 12c0 4 3 8 9 9M21 12c0 4-3 8-9 9\"/>",
  "05-projets/projets-de-vie": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M15.500 8.500l-2 5-5 2 2-5z\"/><circle cx=\"12\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "projets/projets-de-vie": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M15.500 8.500l-2 5-5 2 2-5z\"/><circle cx=\"12\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "05-projets/environnement": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M7 14c0-4 3-6 8-6 0 4-3 6-8 6zM7 14l4-4\"/>",
  "05-projets/education-sport": "<circle cx=\"12\" cy=\"15\" r=\"5\"/><path d=\"M8.500 11L6 3h4l2 4 2-4h4l-2.500 8\"/><circle cx=\"12\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "projets/education-sport": "<circle cx=\"12\" cy=\"15\" r=\"5\"/><path d=\"M8.500 11L6 3h4l2 4 2-4h4l-2.500 8\"/><circle cx=\"12\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "06-marques/familiales": "<path d=\"M5 4h14v10a7 7 0 01-14 0zM9.500 13v-2l2.500-2 2.500 2v2z\"/>",
  "06-marques/alimentation-boissons": "<path d=\"M10 3h4v4l2 3v11H8V10l2-3zM8 14h8\"/><circle cx=\"12\" cy=\"17.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "marques/alimentation-boissons": "<path d=\"M10 3h4v4l2 3v11H8V10l2-3zM8 14h8\"/><circle cx=\"12\" cy=\"17.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "06-marques/mode-luxe": "<path d=\"M6 4h12l4 5-10 12L2 9zM2 9h20M9 4l-2 5 5 12 5-12-2-5\"/>",
  "marques/mode-luxe": "<path d=\"M6 4h12l4 5-10 12L2 9zM2 9h20M9 4l-2 5 5 12 5-12-2-5\"/>",
  "06-marques/tech-medias": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"12\" rx=\"2\"/><path d=\"M9 20h6M12 16v4M10 8l5 3-5 3z\"/>",
  "marques/tech-medias": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"12\" rx=\"2\"/><path d=\"M9 20h6M12 16v4M10 8l5 3-5 3z\"/>",
  "06-marques/banque-assurance": "<path d=\"M12 3l8 3v5c0 5-3.500 8-8 10-4.500-2-8-5-8-10V6z\"/><circle cx=\"12\" cy=\"11\" r=\"3\"/><circle cx=\"12\" cy=\"11\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "marques/banque-assurance": "<path d=\"M12 3l8 3v5c0 5-3.500 8-8 10-4.500-2-8-5-8-10V6z\"/><circle cx=\"12\" cy=\"11\" r=\"3\"/><circle cx=\"12\" cy=\"11\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "06-marques/industrie": "<path d=\"M3 21V10l6 4v-4l6 4V5h4v16z\"/><circle cx=\"8\" cy=\"18\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "06-marques/sante": "<path d=\"M12 3l8 3v5c0 5-3.500 8-8 10-4.500-2-8-5-8-10V6zM12 8v6M9 11h6\"/>",
  "06-marques/emblematiques": "<path d=\"M12 3l-5 18M12 3l5 18M9 13h6M8 18h8\"/>",
  "07-personnalites/politique": "<path d=\"M5 9h14l-2 12H7zM12 9V6\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/>",
  "07-personnalites/cinema-spectacle": "<rect x=\"3\" y=\"10\" width=\"18\" height=\"11\" rx=\"2\"/><path d=\"M3 10l2-5 14-2 1 4M8 6l2 3M13 5l2 3\"/><circle cx=\"12\" cy=\"16\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "personnalites/cinema-spectacle": "<rect x=\"3\" y=\"10\" width=\"18\" height=\"11\" rx=\"2\"/><path d=\"M3 10l2-5 14-2 1 4M8 6l2 3M13 5l2 3\"/><circle cx=\"12\" cy=\"16\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "07-personnalites/art-litterature": "<path d=\"M20 4c-8 0-14 4-14 12l-2 4M20 4c0 8-4 12-11 12M9 16l7-7\"/>",
  "personnalites/art-litterature": "<path d=\"M20 4c-8 0-14 4-14 12l-2 4M20 4c0 8-4 12-11 12M9 16l7-7\"/>",
  "07-personnalites/economie": "<path d=\"M3 20h18M4 16l5-5 4 3 7-8M15 6h5v5\"/>",
  "07-personnalites/science": "<path d=\"M9 3h6M10 3v6l-5 10a1.500 1.500 0 001.400 2h11.200a1.500 1.500 0 001.400-2l-5-10V3M7.500 15h9\"/><circle cx=\"12\" cy=\"18\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  // Pièce d'argent (coin) pour finance et argent
  "01-sagesses/argent": "<circle cx=\"8\" cy=\"8\" r=\"6\"/><path d=\"M18.09 10.37A6 6 0 1 1 10.34 18\"/><path d=\"M7 6h1v4\"/><path d=\"m16.71 13.88.7.71-2.82 2.82\"/>",
  "sagesses/argent": "<circle cx=\"8\" cy=\"8\" r=\"6\"/><path d=\"M18.09 10.37A6 6 0 1 1 10.34 18\"/><path d=\"M7 6h1v4\"/><path d=\"m16.71 13.88.7.71-2.82 2.82\"/>",
  "argent": "<circle cx=\"8\" cy=\"8\" r=\"6\"/><path d=\"M18.09 10.37A6 6 0 1 1 10.34 18\"/><path d=\"M7 6h1v4\"/><path d=\"m16.71 13.88.7.71-2.82 2.82\"/>",
  "finance": "<circle cx=\"8\" cy=\"8\" r=\"6\"/><path d=\"M18.09 10.37A6 6 0 1 1 10.34 18\"/><path d=\"M7 6h1v4\"/><path d=\"m16.71 13.88.7.71-2.82 2.82\"/>",
  "08-figures-du-quotidien/_dimension": "<circle cx=\"9\" cy=\"8\" r=\"3\"/><path d=\"M3.500 20c0-3.500 2.500-6 5.500-6s5.500 2.500 5.500 6\"/><circle cx=\"17\" cy=\"9\" r=\"2.3\"/><path d=\"M16 14.200c3 0 5 2 5 5\"/>",
  "figures-du-quotidien/_dimension": "<circle cx=\"9\" cy=\"8\" r=\"3\"/><path d=\"M3.500 20c0-3.500 2.500-6 5.500-6s5.500 2.500 5.500 6\"/><circle cx=\"17\" cy=\"9\" r=\"2.3\"/><path d=\"M16 14.200c3 0 5 2 5 5\"/>",
  "08-figures-du-quotidien/parents": "<circle cx=\"8\" cy=\"6\" r=\"2.5\"/><path d=\"M4 20v-5a4 4 0 018 0v5\"/><circle cx=\"17\" cy=\"11\" r=\"2\"/><path d=\"M14 20v-3a3 3 0 016 0v3\"/>",
  "figures-du-quotidien/parents": "<circle cx=\"8\" cy=\"6\" r=\"2.5\"/><path d=\"M4 20v-5a4 4 0 018 0v5\"/><circle cx=\"17\" cy=\"11\" r=\"2\"/><path d=\"M14 20v-3a3 3 0 016 0v3\"/>",
  "08-figures-du-quotidien/grands-parents": "<circle cx=\"7\" cy=\"14\" r=\"4\"/><circle cx=\"17\" cy=\"14\" r=\"4\"/><path d=\"M11 14h2M3 14l2-7M21 14l-2-7\"/>",
  "figures-du-quotidien/grands-parents": "<circle cx=\"7\" cy=\"14\" r=\"4\"/><circle cx=\"17\" cy=\"14\" r=\"4\"/><path d=\"M11 14h2M3 14l2-7M21 14l-2-7\"/>",
  "08-figures-du-quotidien/enseignants": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"10\" rx=\"2\"/><circle cx=\"12\" cy=\"16\" r=\"2\"/><path d=\"M8 22v-1.500a4 4 0 018 0V22\"/>",
  "figures-du-quotidien/enseignants": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"10\" rx=\"2\"/><circle cx=\"12\" cy=\"16\" r=\"2\"/><path d=\"M8 22v-1.500a4 4 0 018 0V22\"/>",
  "08-figures-du-quotidien/mentors": "<path d=\"M9 21l1.500-13h3L15 21zM9.500 12h5M8 8h8l-1-3H9zM12 5V3M3 6l4 1.500M21 6l-4 1.500\"/>",
  "figures-du-quotidien/mentors": "<path d=\"M9 21l1.500-13h3L15 21zM9.500 12h5M8 8h8l-1-3H9zM12 5V3M3 6l4 1.500M21 6l-4 1.500\"/>",
  "08-figures-du-quotidien/voisins": "<path d=\"M2 20v-8l5-4 5 4v8zM12 20v-6l5-4 5 4v6z\"/><circle cx=\"7\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"17\" cy=\"16\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "figures-du-quotidien/voisins": "<path d=\"M2 20v-8l5-4 5 4v8zM12 20v-6l5-4 5 4v6z\"/><circle cx=\"7\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"17\" cy=\"16\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "08-figures-du-quotidien/amis": "<circle cx=\"8\" cy=\"7\" r=\"3\"/><circle cx=\"16\" cy=\"7\" r=\"3\"/><path d=\"M2 21v-3a5 5 0 015-5h2M22 21v-3a5 5 0 00-5-5h-2\"/>",
  "figures-du-quotidien/amis": "<circle cx=\"8\" cy=\"7\" r=\"3\"/><circle cx=\"16\" cy=\"7\" r=\"3\"/><path d=\"M2 21v-3a5 5 0 015-5h2M22 21v-3a5 5 0 00-5-5h-2\"/>",
  "08-figures-du-quotidien/collegues": "<circle cx=\"6\" cy=\"8\" r=\"2\"/><circle cx=\"18\" cy=\"8\" r=\"2\"/><rect x=\"2\" y=\"12\" width=\"8\" height=\"3\" rx=\"1\"/><rect x=\"14\" y=\"12\" width=\"8\" height=\"3\" rx=\"1\"/><path d=\"M4 15v5M8 15v5M16 15v5M20 15v5\"/>",
  "figures-du-quotidien/collegues": "<circle cx=\"6\" cy=\"8\" r=\"2\"/><circle cx=\"18\" cy=\"8\" r=\"2\"/><rect x=\"2\" y=\"12\" width=\"8\" height=\"3\" rx=\"1\"/><rect x=\"14\" y=\"12\" width=\"8\" height=\"3\" rx=\"1\"/><path d=\"M4 15v5M8 15v5M16 15v5M20 15v5\"/>",
  "08-figures-du-quotidien/inconnus-marquants": "<circle cx=\"9\" cy=\"9\" r=\"3\"/><path d=\"M3 21v-3a6 6 0 0112 0v3M16 4a2 2 0 013 1c0 1.500-2 1.500-2 3\"/><circle cx=\"17\" cy=\"11\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "figures-du-quotidien/inconnus-marquants": "<circle cx=\"9\" cy=\"9\" r=\"3\"/><path d=\"M3 21v-3a6 6 0 0112 0v3M16 4a2 2 0 013 1c0 1.500-2 1.500-2 3\"/><circle cx=\"17\" cy=\"11\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "09-evenements/_dimension": "<rect x=\"4\" y=\"5\" width=\"16\" height=\"15\" rx=\"3\"/><path d=\"M4 10h16M8 3v4M16 3v4\"/><circle cx=\"12\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "09-evenements/mariages": "<circle cx=\"9\" cy=\"14\" r=\"5\"/><circle cx=\"15\" cy=\"14\" r=\"5\"/><circle cx=\"12\" cy=\"5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "09-evenements/naissances": "<path d=\"M4 10h16v4a5 5 0 01-5 5H9a5 5 0 01-5-5zM4 10c0-3 3-5 8-5s8 2 8 5M6 21h12\"/><circle cx=\"12\" cy=\"14\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "09-evenements/deuils": "<path d=\"M9 21V11h6v10zM12 7c1.500-1.500 1.500-3 0-4-1.500 1-1.500 2.500 0 4zM7 21h10\"/>",
  "09-evenements/voyages": "<rect x=\"4\" y=\"8\" width=\"16\" height=\"12\" rx=\"2\"/><path d=\"M9 8V5h6v3M8 8v12M16 8v12\"/><circle cx=\"12\" cy=\"14\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "09-evenements/fetes": "<path d=\"M4 20l4-12 8 8z\"/><circle cx=\"14\" cy=\"5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"19\" cy=\"9\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"19\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"11\" cy=\"4\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "09-evenements/catastrophes": "<path d=\"M13 3L5 14h6l-1 7 8-11h-6z\"/>",
  "09-evenements/moments-historiques": "<path d=\"M6 4h12v14a2 2 0 002 2H8a2 2 0 01-2-2zM6 4a2 2 0 00-2 2v2h2M10 9h5M10 13h5\"/>",
  "evenements/moments-historiques": "<path d=\"M6 4h12v14a2 2 0 002 2H8a2 2 0 01-2-2zM6 4a2 2 0 00-2 2v2h2M10 9h5M10 13h5\"/>",
  "09-evenements/premieres-fois": "<circle cx=\"12\" cy=\"10\" r=\"6\"/><path d=\"M9 15l-2 6 5-2 5 2-2-6M11 8l1-1v6\"/>",
  "evenements/premieres-fois": "<circle cx=\"12\" cy=\"10\" r=\"6\"/><path d=\"M9 15l-2 6 5-2 5 2-2-6M11 8l1-1v6\"/>",
  "10-communautes/_dimension": "<circle cx=\"9\" cy=\"10\" r=\"5\"/><circle cx=\"15\" cy=\"10\" r=\"5\"/><circle cx=\"12\" cy=\"15\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "10-communautes/familles": "<path d=\"M12 3v6M12 9H6v4M12 9h6v4\"/><circle cx=\"6\" cy=\"16\" r=\"3\"/><circle cx=\"18\" cy=\"16\" r=\"3\"/><circle cx=\"12\" cy=\"3\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "10-communautes/associations": "<circle cx=\"12\" cy=\"12\" r=\"8\"/><circle cx=\"12\" cy=\"4\" r=\"1.8\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"20\" cy=\"12\" r=\"1.8\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"12\" cy=\"20\" r=\"1.8\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"4\" cy=\"12\" r=\"1.8\" fill=\"currentColor\" stroke=\"none\"/>",
  "10-communautes/lieux-de-culte": "<path d=\"M5 21v-8a7 7 0 0114 0v8M3 21h18M12 3v3M10 21v-4a2 2 0 014 0v4\"/>",
  "communautes/lieux-de-culte": "<path d=\"M5 21v-8a7 7 0 0114 0v8M3 21h18M12 3v3M10 21v-4a2 2 0 014 0v4\"/>",
  "10-communautes/clubs-sportifs": "<path d=\"M8 3L3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 01-8 0z\"/><circle cx=\"12\" cy=\"14\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "communautes/clubs-sportifs": "<path d=\"M8 3L3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 01-8 0z\"/><circle cx=\"12\" cy=\"14\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "10-communautes/quartiers": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"3\"/><path d=\"M3 9h18M3 15h18M9 3v18M15 3v18\"/>",
  "10-communautes/diasporas": "<path d=\"M4 8h14l-3-3M20 16H6l3 3\"/>",
  "10-communautes/groupes-amis": "<path d=\"M3 5h10v7H8l-3 3v-3H3zM15 9h6v7h-2v3l-3-3h-1z\"/>",
  "communautes/groupes-amis": "<path d=\"M3 5h10v7H8l-3 3v-3H3zM15 9h6v7h-2v3l-3-3h-1z\"/>",
  "10-communautes/communautes-en-ligne": "<circle cx=\"5\" cy=\"6\" r=\"2\"/><circle cx=\"19\" cy=\"6\" r=\"2\"/><circle cx=\"12\" cy=\"18\" r=\"2\"/><path d=\"M7 6h10M6 8l5 8M18 8l-5 8\"/>",
  "communautes/communautes-en-ligne": "<circle cx=\"5\" cy=\"6\" r=\"2\"/><circle cx=\"19\" cy=\"6\" r=\"2\"/><circle cx=\"12\" cy=\"18\" r=\"2\"/><path d=\"M7 6h10M6 8l5 8M18 8l-5 8\"/>",
  "11-institutions/_dimension": "<path d=\"M3 9l9-5 9 5zM6 11v6M10 11v6M14 11v6M18 11v6M4 20h16\"/><circle cx=\"12\" cy=\"7.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "11-institutions/ecoles": "<path d=\"M4 21V10l8-5 8 5v11zM12 5V2l3 1.500-3 1.500M10 21v-5h4v5\"/>",
  "11-institutions/universites": "<path d=\"M2 9l10-5 10 5-10 5zM6 11v5c0 2 3 3 6 3s6-1 6-3v-5M22 9v6\"/>",
  "11-institutions/hopitaux": "<path d=\"M4 21V5a1 1 0 011-1h14a1 1 0 011 1v16M2 21h20M12 8v6M9 11h6\"/>",
  "11-institutions/entreprises": "<rect x=\"6\" y=\"3\" width=\"12\" height=\"18\" rx=\"1.5\"/><path d=\"M10 21v-4h4v4\"/><circle cx=\"10\" cy=\"8\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"14\" cy=\"8\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"10\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"14\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "11-institutions/administrations": "<circle cx=\"12\" cy=\"6\" r=\"3\"/><path d=\"M10 9l-1 6h6l-1-6M5 15h14v3H5zM4 21h16\"/>",
  "11-institutions/armee-police": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7l1.500 3.200 3.500.4-2.600 2.400.7 3.500L12 14.700 8.900 16.500l.7-3.500L7 10.600l3.500-.4z\"/>",
  "institutions/armee-police": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7l1.500 3.200 3.500.4-2.600 2.400.7 3.500L12 14.700 8.900 16.500l.7-3.500L7 10.600l3.500-.4z\"/>",
  "11-institutions/justice": "<path d=\"M14 4l6 6-3 3-6-6zM10 10l-7 7 4 4 7-7M12 21h9\"/>",
  "11-institutions/medias": "<path d=\"M5 4h12v16H6a2 2 0 01-2-2V5zM17 8h3v10a2 2 0 01-2 2M8 8h6M8 12h6M8 16h3\"/>",
  "12-objets/_dimension": "<rect x=\"4\" y=\"9\" width=\"16\" height=\"11\" rx=\"2\"/><path d=\"M4 13h16M6 9l1-4h10l1 4\"/><circle cx=\"12\" cy=\"13\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "12-objets/souvenirs-famille": "<ellipse cx=\"12\" cy=\"12\" rx=\"7\" ry=\"9\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\"/><path d=\"M8 18c1-3 3-4 4-4s3 1 4 4\"/>",
  "objets/souvenirs-famille": "<ellipse cx=\"12\" cy=\"12\" rx=\"7\" ry=\"9\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\"/><path d=\"M8 18c1-3 3-4 4-4s3 1 4 4\"/>",
  "12-objets/bijoux": "<circle cx=\"12\" cy=\"15\" r=\"6\"/><path d=\"M9 6l1.500-3h3L15 6l-3 3z\"/>",
  "12-objets/vetements": "<path d=\"M9 3h6l-1 7 5 11H5l5-11z\"/><circle cx=\"12\" cy=\"6\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "12-objets/outils": "<path d=\"M15 3a5 5 0 00-4.500 7L3 17.500 6.500 21l7.500-7.500A5 5 0 0021 9l-3 3-3-1-1-3z\"/>",
  "12-objets/livres": "<path d=\"M5 3h12v14H7a2 2 0 00-2 2zM5 19a2 2 0 002 2h12V17M9 7h5\"/>",
  "12-objets/photos-lettres": "<rect x=\"3\" y=\"7\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M3 9l9 6 9-6M7 7l1-3h8l1 3\"/>",
  "objets/photos-lettres": "<rect x=\"3\" y=\"7\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M3 9l9 6 9-6M7 7l1-3h8l1 3\"/>",
  "12-objets/vehicules": "<path d=\"M3 16v-3l2-5h14l2 5v3zM3 16v2h3v-2M18 16v2h3v-2M5 13h14\"/><circle cx=\"7.5\" cy=\"14.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"16.5\" cy=\"14.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "12-objets/cadeaux": "<rect x=\"3\" y=\"9\" width=\"18\" height=\"5\" rx=\"1\"/><path d=\"M5 14v7h14v-7M12 9v12M12 9c-3 0-5-1-5-3s3-2 5 3c2-5 5-5 5-3s-2 3-5 3\"/>",
  "13-savoir-faire/_dimension": "<path d=\"M7 12V6.500a1.500 1.500 0 013 0V11M10 11V5a1.500 1.500 0 013 0v6M13 11V6a1.500 1.500 0 013 0v6M16 12V9a1.500 1.500 0 013 0v5c0 4-3 7-7 7-3 0-5-1.500-6.500-4L4 13.500a1.500 1.500 0 012.500-1.500L7 13\"/>",
  "savoir-faire/_dimension": "<path d=\"M7 12V6.500a1.500 1.500 0 013 0V11M10 11V5a1.500 1.500 0 013 0v6M13 11V6a1.500 1.500 0 013 0v6M16 12V9a1.500 1.500 0 013 0v5c0 4-3 7-7 7-3 0-5-1.500-6.500-4L4 13.500a1.500 1.500 0 012.500-1.500L7 13\"/>",
  "13-savoir-faire/recettes": "<ellipse cx=\"8\" cy=\"8\" rx=\"3\" ry=\"5\" transform=\"rotate(-45 8 8)\"/><path d=\"M10 10l10 10\"/>",
  "savoir-faire/recettes": "<ellipse cx=\"8\" cy=\"8\" rx=\"3\" ry=\"5\" transform=\"rotate(-45 8 8)\"/><path d=\"M10 10l10 10\"/>",
  "13-savoir-faire/gestes-artisan": "<path d=\"M19 3L6 16M6 16c-3 3-1 6 3 4s3-6 8-4\"/><circle cx=\"19\" cy=\"3\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "savoir-faire/gestes-artisan": "<path d=\"M19 3L6 16M6 16c-3 3-1 6 3 4s3-6 8-4\"/><circle cx=\"19\" cy=\"3\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "13-savoir-faire/remedes": "<path d=\"M4 11h16a8 8 0 01-16 0zM14 11l5-7M8 21h8\"/><circle cx=\"9\" cy=\"14\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "savoir-faire/remedes": "<path d=\"M4 11h16a8 8 0 01-16 0zM14 11l5-7M8 21h8\"/><circle cx=\"9\" cy=\"14\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "13-savoir-faire/cultures-recoltes": "<path d=\"M12 3v9M9 3h6M8 12h8l-1 8H9z\"/>",
  "savoir-faire/cultures-recoltes": "<path d=\"M12 3v9M9 3h6M8 12h8l-1 8H9z\"/>",
  "13-savoir-faire/chants-danses": "<circle cx=\"7\" cy=\"5\" r=\"2\"/><path d=\"M7 8v6l-3 6M7 14l4 6M4 11l3-2 3 2M15 17V7l5-1v8\"/><circle cx=\"13.5\" cy=\"17\" r=\"1.5\"/><circle cx=\"18.5\" cy=\"15\" r=\"1.5\"/>",
  "savoir-faire/chants-danses": "<circle cx=\"7\" cy=\"5\" r=\"2\"/><path d=\"M7 8v6l-3 6M7 14l4 6M4 11l3-2 3 2M15 17V7l5-1v8\"/><circle cx=\"13.5\" cy=\"17\" r=\"1.5\"/><circle cx=\"18.5\" cy=\"15\" r=\"1.5\"/>",
  "13-savoir-faire/contes-proverbes": "<path d=\"M4 5h16v11H11l-4 4v-4H4z\"/><circle cx=\"8\" cy=\"10.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"12\" cy=\"10.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"16\" cy=\"10.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "savoir-faire/contes-proverbes": "<path d=\"M4 5h16v11H11l-4 4v-4H4z\"/><circle cx=\"8\" cy=\"10.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"12\" cy=\"10.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"16\" cy=\"10.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "13-savoir-faire/langues": "<path d=\"M3 5h10M8 3v2M5 5c1 4 3 6 6 8M11 5c-1 4-4 7-8 9M13 21l4-10 4 10M14.500 18h5\"/>",
  "savoir-faire/langues": "<path d=\"M3 5h10M8 3v2M5 5c1 4 3 6 6 8M11 5c-1 4-4 7-8 9M13 21l4-10 4 10M14.500 18h5\"/>",
  "13-savoir-faire/astuces": "<path d=\"M9 18h6M10 21h4M12 3a6 6 0 00-3.500 11c.7.600 1 1.500 1 2.500h5c0-1 .3-1.900 1-2.500A6 6 0 0012 3z\"/>",
  "savoir-faire/astuces": "<path d=\"M9 18h6M10 21h4M12 3a6 6 0 00-3.500 11c.7.600 1 1.500 1 2.500h5c0-1 .3-1.900 1-2.500A6 6 0 0012 3z\"/>",
  "14-passions/_dimension": "<path d=\"M12 20s-7-4.200-7-9.500A3.800 3.800 0 0112 8.800a3.800 3.800 0 017 1.700C19 15.800 12 20 12 20z\"/><circle cx=\"12\" cy=\"13\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "14-passions/sport": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18M12 3v18M6 5c3 3 3 11 0 14M18 5c-3 3-3 11 0 14\"/>",
  "14-passions/musique": "<path d=\"M4 15v-3a8 8 0 0116 0v3\"/><rect x=\"3\" y=\"14\" width=\"4\" height=\"7\" rx=\"2\"/><rect x=\"17\" y=\"14\" width=\"4\" height=\"7\" rx=\"2\"/>",
  "14-passions/lecture": "<path d=\"M3 6c3-1 6-1 9 1 3-2 6-2 9-1v13c-3-1-6-1-9 1-3-2-6-2-9-1zM12 7v13\"/>",
  "14-passions/cuisine": "<path d=\"M4 11h16v6a3 3 0 01-3 3H7a3 3 0 01-3-3zM2 11h2M20 11h2M9 3c-1 1 1 2 0 4M14 3c-1 1 1 2 0 4\"/>",
  "14-passions/voyage": "<path d=\"M3 8h4l2-3h6l2 3h4v12H3z\"/><circle cx=\"12\" cy=\"13\" r=\"3.5\"/><circle cx=\"18\" cy=\"11\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "14-passions/jeux": "<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"3\"/><circle cx=\"9\" cy=\"9\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"15\" cy=\"9\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"12\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"9\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"15\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "14-passions/collections": "<path d=\"M4 21V3M20 21V3M4 11h16M4 21h16\"/><circle cx=\"8\" cy=\"8\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"12\" cy=\"8\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"16\" cy=\"8\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"9\" cy=\"17\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"15\" cy=\"17\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "14-passions/animaux": "<ellipse cx=\"12\" cy=\"16\" rx=\"5\" ry=\"4\"/><circle cx=\"5.5\" cy=\"11\" r=\"1.7\"/><circle cx=\"9.5\" cy=\"6.5\" r=\"1.7\"/><circle cx=\"14.5\" cy=\"6.5\" r=\"1.7\"/><circle cx=\"18.5\" cy=\"11\" r=\"1.7\"/>",
  "15-moments-de-vie/_dimension": "<path d=\"M2.500 12H4M8 12h2M14 12h2M20 12h1.500\"/><circle cx=\"6\" cy=\"12\" r=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><circle cx=\"18\" cy=\"12\" r=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"0.8\" fill=\"currentColor\" stroke=\"none\"/>",
  "moments-de-vie/_dimension": "<path d=\"M2.500 12H4M8 12h2M14 12h2M20 12h1.500\"/><circle cx=\"6\" cy=\"12\" r=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><circle cx=\"18\" cy=\"12\" r=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"0.8\" fill=\"currentColor\" stroke=\"none\"/>",
  "15-moments-de-vie/enfance": "<path d=\"M12 2l6 7-6 8-6-8zM12 2v15M6 9h12M12 17c-2 2 2 3 0 5\"/>",
  "moments-de-vie/enfance": "<path d=\"M12 2l6 7-6 8-6-8zM12 2v15M6 9h12M12 17c-2 2 2 3 0 5\"/>",
  "15-moments-de-vie/adolescence": "<rect x=\"3\" y=\"10\" width=\"18\" height=\"3\" rx=\"1.5\"/><circle cx=\"7\" cy=\"17\" r=\"2\"/><circle cx=\"17\" cy=\"17\" r=\"2\"/>",
  "moments-de-vie/adolescence": "<rect x=\"3\" y=\"10\" width=\"18\" height=\"3\" rx=\"1.5\"/><circle cx=\"7\" cy=\"17\" r=\"2\"/><circle cx=\"17\" cy=\"17\" r=\"2\"/>",
  "15-moments-de-vie/jeunesse": "<rect x=\"5\" y=\"7\" width=\"14\" height=\"14\" rx=\"4\"/><path d=\"M9 7V5a3 3 0 016 0v2M9 14h6\"/>",
  "moments-de-vie/jeunesse": "<rect x=\"5\" y=\"7\" width=\"14\" height=\"14\" rx=\"4\"/><path d=\"M9 7V5a3 3 0 016 0v2M9 14h6\"/>",
  "15-moments-de-vie/etudes": "<rect x=\"5\" y=\"3\" width=\"14\" height=\"18\" rx=\"2\"/><path d=\"M9 3v18M12 8h4M12 12h4\"/>",
  "moments-de-vie/etudes": "<rect x=\"5\" y=\"3\" width=\"14\" height=\"18\" rx=\"2\"/><path d=\"M9 3v18M12 8h4M12 12h4\"/>",
  "15-moments-de-vie/premier-emploi": "<path d=\"M9 3l3 5 3-5\"/><rect x=\"7\" y=\"8\" width=\"10\" height=\"13\" rx=\"2\"/><path d=\"M10 17h4\"/><circle cx=\"12\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "moments-de-vie/premier-emploi": "<path d=\"M9 3l3 5 3-5\"/><rect x=\"7\" y=\"8\" width=\"10\" height=\"13\" rx=\"2\"/><path d=\"M10 17h4\"/><circle cx=\"12\" cy=\"12\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "15-moments-de-vie/vie-de-couple": "<path d=\"M3 9h8v5a4 4 0 01-4 4 4 4 0 01-4-4zM13 9h8v5a4 4 0 01-4 4 4 4 0 01-4-4z\"/><circle cx=\"7\" cy=\"5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"17\" cy=\"5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "moments-de-vie/vie-de-couple": "<path d=\"M3 9h8v5a4 4 0 01-4 4 4 4 0 01-4-4zM13 9h8v5a4 4 0 01-4 4 4 4 0 01-4-4z\"/><circle cx=\"7\" cy=\"5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"17\" cy=\"5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>",
  "15-moments-de-vie/parentalite": "<path d=\"M3 4h3l2 11h10M7 8h12a7 7 0 01-7 7\"/><circle cx=\"9\" cy=\"19\" r=\"1.5\"/><circle cx=\"17\" cy=\"19\" r=\"1.5\"/>",
  "moments-de-vie/parentalite": "<path d=\"M3 4h3l2 11h10M7 8h12a7 7 0 01-7 7\"/><circle cx=\"9\" cy=\"19\" r=\"1.5\"/><circle cx=\"17\" cy=\"19\" r=\"1.5\"/>",
  "15-moments-de-vie/vieillesse": "<path d=\"M8 3l1 11h9M18 14v-4M9 14V8M4 19c4 3 12 3 16 0\"/>",
  "moments-de-vie/vieillesse": "<path d=\"M8 3l1 11h9M18 14v-4M9 14V8M4 19c4 3 12 3 16 0\"/>",
};

// Aliases pour 13. Savoir-faire
SVG_ICONS_INNER["13-savoir-faire/remedes-traditionnels"] = SVG_ICONS_INNER["13-savoir-faire/remedes"];
SVG_ICONS_INNER["savoir-faire/remedes-traditionnels"] = SVG_ICONS_INNER["13-savoir-faire/remedes"];
SVG_ICONS_INNER["13-savoir-faire/musique-danse"] = SVG_ICONS_INNER["13-savoir-faire/chants-danses"];
SVG_ICONS_INNER["savoir-faire/musique-danse"] = SVG_ICONS_INNER["13-savoir-faire/chants-danses"];
SVG_ICONS_INNER["13-savoir-faire/rituels"] = SVG_ICONS_INNER["13-savoir-faire/gestes-artisan"];
SVG_ICONS_INNER["savoir-faire/rituels"] = SVG_ICONS_INNER["13-savoir-faire/gestes-artisan"];
SVG_ICONS_INNER["13-savoir-faire/techniques-agricoles"] = SVG_ICONS_INNER["13-savoir-faire/cultures-recoltes"];
SVG_ICONS_INNER["savoir-faire/techniques-agricoles"] = SVG_ICONS_INNER["13-savoir-faire/cultures-recoltes"];
SVG_ICONS_INNER["13-savoir-faire/langues-dialectes"] = SVG_ICONS_INNER["13-savoir-faire/langues"];
SVG_ICONS_INNER["savoir-faire/langues-dialectes"] = SVG_ICONS_INNER["13-savoir-faire/langues"];
SVG_ICONS_INNER["13-savoir-faire/contes-recits"] = SVG_ICONS_INNER["13-savoir-faire/contes-proverbes"];
SVG_ICONS_INNER["savoir-faire/contes-recits"] = SVG_ICONS_INNER["13-savoir-faire/contes-proverbes"];

// Aliases pour 15. Moments de vie
SVG_ICONS_INNER["15-moments-de-vie/age-adulte"] = SVG_ICONS_INNER["15-moments-de-vie/premier-emploi"];
SVG_ICONS_INNER["moments-de-vie/age-adulte"] = SVG_ICONS_INNER["15-moments-de-vie/premier-emploi"];
SVG_ICONS_INNER["15-moments-de-vie/retraite"] = SVG_ICONS_INNER["15-moments-de-vie/vieillesse"];
SVG_ICONS_INNER["moments-de-vie/retraite"] = SVG_ICONS_INNER["15-moments-de-vie/vieillesse"];
SVG_ICONS_INNER["15-moments-de-vie/grands-tournants"] = SVG_ICONS_INNER["15-moments-de-vie/etudes"];
SVG_ICONS_INNER["moments-de-vie/grands-tournants"] = SVG_ICONS_INNER["15-moments-de-vie/etudes"];
SVG_ICONS_INNER["15-moments-de-vie/secrets-gardes"] = SVG_ICONS_INNER["15-moments-de-vie/vie-de-couple"];
SVG_ICONS_INNER["moments-de-vie/secrets-gardes"] = SVG_ICONS_INNER["15-moments-de-vie/vie-de-couple"];
SVG_ICONS_INNER["15-moments-de-vie/regrets-fiertes"] = SVG_ICONS_INNER["15-moments-de-vie/parentalite"];
SVG_ICONS_INNER["moments-de-vie/regrets-fiertes"] = SVG_ICONS_INNER["15-moments-de-vie/parentalite"];

// Nouvelles correspondances officielles Yonywood
SVG_ICONS_INNER["personnalites/figures-du-quotidien"] = SVG_ICONS_INNER["08-figures-du-quotidien/_dimension"];
SVG_ICONS_INNER["07-personnalites/figures-du-quotidien"] = SVG_ICONS_INNER["08-figures-du-quotidien/_dimension"];
SVG_ICONS_INNER["territoires/culture"] = SVG_ICONS_INNER["02-territoires/terroirs"];
SVG_ICONS_INNER["02-territoires/culture"] = SVG_ICONS_INNER["02-territoires/terroirs"];
SVG_ICONS_INNER["expertises/terroir"] = SVG_ICONS_INNER["03-expertises/agriculture"];
SVG_ICONS_INNER["03-expertises/terroir"] = SVG_ICONS_INNER["03-expertises/agriculture"];
SVG_ICONS_INNER["marques/luxe"] = SVG_ICONS_INNER["06-marques/mode-luxe"];
SVG_ICONS_INNER["06-marques/luxe"] = SVG_ICONS_INNER["06-marques/mode-luxe"];
SVG_ICONS_INNER["marques/mode-beaute"] = SVG_ICONS_INNER["06-marques/emblematiques"];
SVG_ICONS_INNER["06-marques/mode-beaute"] = SVG_ICONS_INNER["06-marques/emblematiques"];

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
      if (key.endsWith(`/${name}`) || key === name) {
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
    style.width = typeof size === 'number' ? `${size}px` : size;
    style.height = typeof size === 'number' ? `${size}px` : size;
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
