import { 
  SeriesAuthor, 
  SeriesScreenwriter, 
  SeriesDirector, 
  SeriesProducerUser, 
  SeriesDistributor, 
  SeriesSponsor,
  SequenceCredits
} from '../types';

export interface SeriesTeamBundle {
  author: SeriesAuthor;
  screenwriter: SeriesScreenwriter;
  director: SeriesDirector;
  producers: SeriesProducerUser[];
  distributors: SeriesDistributor[];
  sponsors: SeriesSponsor[];
}

export const ALL_SERIES_TEAMS: Record<string, SeriesTeamBundle> = {
  'jesus-legba': {
    author: {
      name: 'Romeo Nonvide',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Fondateur & Concepteur documentaire de YonyWood',
      protagonistId: 'dah-zounon'
    },
    screenwriter: {
      name: 'Dieudonné Dossou',
      avatarUrl: '/assets/duos/pere-matthieu.jpg',
      bio: 'Chercheur en anthropologie des mémoires et traditions croisées',
      protagonistId: 'pere-matthieu'
    },
    director: {
      name: 'Alain Kpatoukpa',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'Réalisateur & Directeur de la photographie 9:16'
    },
    producers: [
      {
        id: 'prod-jean-luc',
        name: 'Jean-Luc Agbo',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Producteur délégué',
        pledgeAmount: 18500,
        joinedAt: '15 Janvier 2026',
        bio: 'Mécène culturel et entrepreneur engagé dans la préservation des récits sacrés.',
        videoPresentationUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        protagonistId: 'dah-zounon'
      },
      {
        id: 'prod-sonia',
        name: 'Sonia Dossou',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Coproductrice associée',
        pledgeAmount: 9200,
        joinedAt: '03 Février 2026',
        bio: 'Productrice audiovisuelle et spécialiste des narrations immersives d\'Afrique de l\'Ouest.',
        videoPresentationUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      },
      {
        id: 'prod-malik',
        name: 'Malik Touré',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Producteur citoyen',
        pledgeAmount: 3400,
        joinedAt: '22 Février 2026',
        bio: 'Contributeur de la diaspora finançant la coproduction citoyenne.',
        videoPresentationUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      },
      {
        id: 'prod-amina',
        name: 'Dr. Amina Diop',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Productrice citoyenne',
        pledgeAmount: 2500,
        joinedAt: '08 Mars 2026',
        bio: 'Médecin et passionnée d\'archives orales vivantes.',
        videoPresentationUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      }
    ],
    distributors: [
      {
        id: 'dist-marcelle',
        name: 'Marcelle K.',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        roleOrChannel: 'Community Manager & Diffusion Afrique de l’Ouest'
      },
      {
        id: 'dist-ousmane',
        name: 'Ousmane B.',
        avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        roleOrChannel: 'Ambassadeur Diaspora & Réseaux Documentaires'
      }
    ],
    sponsors: [
      {
        id: 'spons-memoires',
        companyName: 'Fondation Mémoires Vivantes',
        partnershipType: 'Mécénat de Conservation',
        logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=150&q=80',
        description: 'Soutien aux tournages patrimoniaux et à la numérisation des récits oraux.'
      },
      {
        id: 'spons-eco',
        companyName: 'Éco-Logistique Atlantique',
        partnershipType: 'Partenaire Mobilité Territoire',
        logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80',
        description: 'Logistique et déplacements techniques de l\'équipe de tournage.'
      }
    ]
  },

  'finagnon-qosqorico': {
    author: {
      name: 'Romeo Nonvide',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Fondateur & Concepteur documentaire de YonyWood',
      protagonistId: 'chef-aime'
    },
    screenwriter: {
      name: 'Chef Paul Tossou',
      avatarUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80',
      bio: 'Maître cuisinier des terroirs béninois et chercheur en fermentations oubliées',
      protagonistId: 'chef-aime'
    },
    director: {
      name: 'Carlos Yupanqui',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'Cinéaste andin spécialiste des cultures de montagne et de marché',
      protagonistId: 'dona-clara'
    },
    producers: [
      {
        id: 'prod-malik-2',
        name: 'Malik Touré',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Producteur délégué',
        pledgeAmount: 14000,
        joinedAt: '18 Janvier 2026',
        bio: 'Passionné de gastronomie africaine et circuits paysans courts.'
      },
      {
        id: 'prod-mariama',
        name: 'Mariama Ba',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Coproductrice associée',
        pledgeAmount: 8500,
        joinedAt: '04 Février 2026',
        bio: 'Fondatrice de marchés de semences paysannes.'
      },
      {
        id: 'prod-jean-luc-2',
        name: 'Jean-Luc Agbo',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Producteur citoyen',
        pledgeAmount: 4000,
        joinedAt: '20 Février 2026',
        bio: 'Mécène culturel soutenant les terroirs en transition.'
      }
    ],
    distributors: [
      {
        id: 'dist-ines',
        name: 'Inès Adjovi',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        roleOrChannel: 'Réseaux Gastronomie & Tables Vivantes'
      },
      {
        id: 'dist-pedro',
        name: 'Pedro Mamani',
        avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        roleOrChannel: 'Ambassadeur Pérou & Andes'
      }
    ],
    sponsors: [
      {
        id: 'spons-terroirs',
        companyName: 'Terroirs & Épices Andines',
        partnershipType: 'Partenaire Produits',
        description: 'Valorisation des filières de semences paysannes.'
      }
    ]
  },

  'blacks-one-beyond-eve': {
    author: {
      name: 'Romeo Nonvide',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Fondateur & Concepteur documentaire de YonyWood',
      protagonistId: 'dr-fatou'
    },
    screenwriter: {
      name: 'Prof. Théophile Dossou',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      bio: 'Généalogiste et historien des lignées afro-descendantes',
      protagonistId: 'dr-fatou'
    },
    director: {
      name: 'Aïcha Benali',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Réalisatrice documentaire internationale'
    },
    producers: [
      {
        id: 'prod-amina-3',
        name: 'Dr. Amina Diop',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Productrice déléguée',
        pledgeAmount: 22000,
        joinedAt: '10 Janvier 2026',
        bio: 'Chercheuse engagée pour la reconnaissance de la mémoire matricielle.'
      },
      {
        id: 'prod-jean-luc-3',
        name: 'Jean-Luc Agbo',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Producteur citoyen',
        pledgeAmount: 7000,
        joinedAt: '15 Février 2026',
        bio: 'Contributeur passionné d\'histoire et de généalogie.'
      }
    ],
    distributors: [
      {
        id: 'dist-david',
        name: 'David N\'Diaye',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        roleOrChannel: 'Diffusion Universités & Archives Mondiales'
      }
    ],
    sponsors: [
      {
        id: 'spons-racines',
        companyName: 'Institut des Racines Vivantes',
        partnershipType: 'Mécénat Scientifique',
        description: 'Soutien aux expéditions généalogiques en Afrique de l\'Est.'
      }
    ]
  },

  'dixeat-fiat-luxe': {
    author: {
      name: 'Romeo Nonvide',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Fondateur & Concepteur documentaire de YonyWood',
      protagonistId: 'maman-charlotte'
    },
    screenwriter: {
      name: 'Élodie Vignon',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Critique d\'art et scénographe d\'expériences gastronomiques',
      protagonistId: 'victoria-luxe'
    },
    director: {
      name: 'Samuel Lawson',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      bio: 'Directeur photo et cadreur mode & street culture'
    },
    producers: [
      {
        id: 'prod-sonia-4',
        name: 'Sonia Dossou',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Productrice déléguée',
        pledgeAmount: 16000,
        joinedAt: '12 Janvier 2026',
        bio: 'Productrice d\'émissions culturelles et d\'art de vivre.'
      },
      {
        id: 'prod-malik-4',
        name: 'Malik Touré',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Producteur citoyen',
        pledgeAmount: 5000,
        joinedAt: '01 Mars 2026',
        bio: 'Restaurateur et collectionneur d\'art de la table.'
      }
    ],
    distributors: [
      {
        id: 'dist-chloe',
        name: 'Chloé Mensah',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        roleOrChannel: 'Diffusion Médias & Événements Culinaires'
      }
    ],
    sponsors: [
      {
        id: 'spons-ebene',
        companyName: 'Maison Ébène Art de Table',
        partnershipType: 'Partenaire Scénographie',
        description: 'Fourniture de pièces uniques d\'orfèvrerie et céramique.'
      }
    ]
  },

  'investors-builders': {
    author: {
      name: 'Romeo Nonvide',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Fondateur & Concepteur documentaire de YonyWood',
      protagonistId: 'koffi-invest'
    },
    screenwriter: {
      name: 'Koffi Mensah',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'Économiste et artisan de l\'investissement productif en Afrique',
      protagonistId: 'koffi-invest'
    },
    director: {
      name: 'Stéphane Hounkpatin',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      bio: 'Réalisateur spécialisé dans l\'industrie et les bâtisseurs de terrain'
    },
    producers: [
      {
        id: 'prod-malik-5',
        name: 'Malik Touré',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Producteur délégué',
        pledgeAmount: 25000,
        joinedAt: '05 Janvier 2026',
        bio: 'Investisseur à impact soutenant l\'industrialisation locale.'
      },
      {
        id: 'prod-jean-luc-5',
        name: 'Jean-Luc Agbo',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Producteur citoyen',
        pledgeAmount: 8000,
        joinedAt: '12 Février 2026',
        bio: 'Bâtisseur et chef d\'entreprise dans les travaux durables.'
      }
    ],
    distributors: [
      {
        id: 'dist-brice',
        name: 'Brice Agossou',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        roleOrChannel: 'Réseaux Entrepreneurs & Business Angels'
      }
    ],
    sponsors: [
      {
        id: 'spons-fonds',
        companyName: 'Fonds Bâtisseurs d’Avenir',
        partnershipType: 'Partenaire Financement',
        description: 'Mécénat de transmission aux jeunes constructeurs.'
      }
    ]
  },

  'other-eyes-sixth-sense': {
    author: {
      name: 'Romeo Nonvide',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Fondateur & Concepteur documentaire de YonyWood'
    },
    screenwriter: {
      name: 'Dr. Nadine Kiki',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Psychologue et anthropologue des médecines traditionnelles'
    },
    director: {
      name: 'Lionel Degboe',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      bio: 'Cinéaste du sensible et du regard intérieur'
    },
    producers: [
      {
        id: 'prod-mariama-6',
        name: 'Mariama Ba',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Productrice déléguée',
        pledgeAmount: 11000,
        joinedAt: '25 Janvier 2026',
        bio: 'Porteuse de projets autour des médecines par les plantes.'
      }
    ],
    distributors: [
      {
        id: 'dist-nadege',
        name: 'Nadège Tèko',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        roleOrChannel: 'Réseaux Thérapeutes & Soins Holistiques'
      }
    ],
    sponsors: [
      {
        id: 'spons-plantes',
        companyName: 'Plantes & Baumes Béninois',
        partnershipType: 'Partenaire Botanique',
        description: 'Préservation des essences médicinales traditionnelles.'
      }
    ]
  },

  'coaching-unlimited': {
    author: {
      name: 'Romeo Nonvide',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Fondateur & Concepteur documentaire de YonyWood',
      protagonistId: 'coach-marcus'
    },
    screenwriter: {
      name: 'Marcus K.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Préparateur mental d\'athlètes olympiques et coach exécutif',
      protagonistId: 'coach-marcus'
    },
    director: {
      name: 'David Houngbo',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'Réalisateur sport & cinéma d\'action'
    },
    producers: [
      {
        id: 'prod-jean-luc-7',
        name: 'Jean-Luc Agbo',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Producteur délégué',
        pledgeAmount: 17500,
        joinedAt: '01 Février 2026',
        bio: 'Mentor d\'athlètes et entrepreneur dans l\'éducation sportive.'
      },
      {
        id: 'prod-malik-7',
        name: 'Malik Touré',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Producteur citoyen',
        pledgeAmount: 6000,
        joinedAt: '19 Février 2026',
        bio: 'Passionné de haute performance et dépassement mental.'
      }
    ],
    distributors: [
      {
        id: 'dist-yannick',
        name: 'Yannick B.',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        roleOrChannel: 'Fédérations Sportives & Académies de Jeunes'
      }
    ],
    sponsors: [
      {
        id: 'spons-perf',
        companyName: 'Performance & Esprit Club',
        partnershipType: 'Partenaire Sport & Santé',
        description: 'Équipements et bourses pour les jeunes espoirs d\'athlétisme.'
      }
    ]
  },

  'focus-phd': {
    author: {
      name: 'Romeo Nonvide',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Fondateur & Concepteur documentaire de YonyWood',
      protagonistId: 'photographer-clara'
    },
    screenwriter: {
      name: 'Dre. Éléonore Kaboré',
      avatarUrl: '/assets/duos/researcher-phd.jpg',
      bio: 'Docteure en sciences cognitives et chercheuse associée',
      protagonistId: 'researcher-eleonore'
    },
    director: {
      name: 'Clara Valmont',
      avatarUrl: '/assets/duos/photographer-focus.jpg',
      bio: 'Photographe d’auteur et documentariste de terrain',
      protagonistId: 'photographer-clara'
    },
    producers: [
      {
        id: 'prod-eleonore-8',
        name: 'Dre. Éléonore Kaboré',
        avatarUrl: '/assets/duos/researcher-phd.jpg',
        roleTitle: 'Productrice déléguée',
        pledgeAmount: 32000,
        joinedAt: '02 Janvier 2026',
        bio: 'Fondatrice de collectifs de valorisation de la recherche panafricaine.'
      },
      {
        id: 'prod-marc-8',
        name: 'Marc-Antoine Vaneck',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        roleTitle: 'Coproducteur associé',
        pledgeAmount: 15000,
        joinedAt: '14 Février 2026',
        bio: 'Mécène d’art contemporain et passionné d’iconographie documentaire.'
      }
    ],
    distributors: [
      {
        id: 'dist-focus',
        name: 'Éditions & Galeries Documentaires Associées',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        roleOrChannel: 'Festivals du Film Scientifique & Musées de la Photographie'
      }
    ],
    sponsors: [
      {
        id: 'spons-focus',
        companyName: 'Fondation pour la Recherche Fondamentale & l’Image',
        partnershipType: 'Partenaire Culture & Savoirs',
        description: 'Bourses de recherche doctorale et résidences de création photographique.'
      }
    ]
  },
  'safer-healer': {
    author: {
      name: 'Romeo Nonvide',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Fondateur & Concepteur documentaire de YonyWood',
      protagonistId: 'photographer-clara'
    },
    screenwriter: {
      name: 'Dre. Éléonore Kaboré',
      avatarUrl: '/assets/duos/researcher-phd.jpg',
      bio: 'Docteure en sciences cognitives et chercheuse associée',
      protagonistId: 'researcher-eleonore'
    },
    director: {
      name: 'Clara Valmont',
      avatarUrl: '/assets/duos/photographer-focus.jpg',
      bio: 'Photographe d’auteur et documentariste de terrain',
      protagonistId: 'photographer-clara'
    },
    producers: [
      {
        id: 'prod-eleonore-8',
        name: 'Dre. Éléonore Kaboré',
        avatarUrl: '/assets/duos/researcher-phd.jpg',
        roleTitle: 'Productrice déléguée',
        pledgeAmount: 32000,
        joinedAt: '02 Janvier 2026',
        bio: 'Fondatrice de collectifs de valorisation de la recherche panafricaine.'
      }
    ],
    distributors: [],
    sponsors: []
  }
};

export const getSeriesCredits = (seriesId: string, duoTitle?: string): SequenceCredits => {
  const team = ALL_SERIES_TEAMS[seriesId] || ALL_SERIES_TEAMS['jesus-legba'];

  return {
    casting: [
      {
        name: team.author?.name || 'Témoin clé',
        roleOrCharacter: duoTitle || 'Intervenant principal',
        avatarUrl: team.author?.avatarUrl,
        protagonistId: team.author?.protagonistId,
        age: 46
      },
      {
        name: team.screenwriter?.name || 'Grand témoin',
        roleOrCharacter: 'Témoin en regard miroir',
        avatarUrl: team.screenwriter?.avatarUrl,
        protagonistId: team.screenwriter?.protagonistId,
        age: 52
      }
    ],
    director: {
      name: team.director?.name || 'Alain Kpatoukpa',
      roleTitle: team.director?.bio || 'Réalisateur & Cadreur 9:16',
      avatarUrl: team.director?.avatarUrl,
      protagonistId: team.director?.protagonistId
    },
    postProduction: [
      {
        name: 'Sonia Dossou',
        role: 'Montage & Rythme narratif',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      {
        name: 'Mathieu Houndé',
        role: 'Mixage sonore & Étalonnage cinématographique',
        avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
      }
    ]
  };
};
