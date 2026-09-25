import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET /api/duos — Flux complet des duos 9:16 avec filtre optionnel par série(s)
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { series } = req.query;

    let seriesFilter: string[] | undefined;
    if (series && typeof series === 'string') {
      seriesFilter = series.split(',').map((s) => s.trim()).filter(Boolean);
    }

    const duos = await prisma.duo.findMany({
      where: seriesFilter && seriesFilter.length > 0
        ? {
            OR: [
              { documentaryId: { in: seriesFilter } },
              { documentary: { slug: { in: seriesFilter } } },
            ],
          }
        : undefined,
      include: {
        protagonistA: {
          select: {
            id: true,
            slug: true,
            name: true,
            role: true,
            territory: true,
            country: true,
            flag: true,
            photoUrl: true,
            universeTag: true,
            quote: true,
            stories: true,
          },
        },
        protagonistB: {
          select: {
            id: true,
            slug: true,
            name: true,
            role: true,
            territory: true,
            country: true,
            flag: true,
            photoUrl: true,
            universeTag: true,
            quote: true,
            stories: true,
          },
        },
        documentary: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    // Mapper vers le format attendu par le front-end
    const formattedDuos = duos.map((duo) => ({
      id: duo.id,
      slug: duo.slug,
      documentaryId: duo.documentaryId,
      documentaryTitle: duo.documentaryTitle,
      episodeNumber: duo.episodeNumber,
      protagonistA: {
        ...duo.protagonistA,
        stories: duo.protagonistA.stories || [],
      },
      protagonistB: {
        ...duo.protagonistB,
        stories: duo.protagonistB.stories || [],
      },
      questionNumber: duo.questionNumber,
      questionTitle: duo.questionTitle,
      centralQuestion: duo.centralQuestion,
      quoteA: duo.quoteA,
      quoteB: duo.quoteB,
      coverImage: duo.coverImage,
      storyA: duo.storyAData,
      storyB: duo.storyBData,
      editorialReflection: duo.editorialReflection,
    }));

    res.json(formattedDuos);
  } catch (error) {
    console.error('[GET /duos]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// GET /api/duos/:id — Récupération d'un duo spécifique
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const duo = await prisma.duo.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        protagonistA: true,
        protagonistB: true,
        documentary: {
          select: {
            id: true,
            title: true,
            slug: true,
            questions: true,
          },
        },
      },
    });

    if (!duo) {
      res.status(404).json({ error: 'Duo non trouvé' });
      return;
    }

    res.json({
      id: duo.id,
      slug: duo.slug,
      documentaryId: duo.documentaryId,
      documentaryTitle: duo.documentaryTitle,
      episodeNumber: duo.episodeNumber,
      protagonistA: duo.protagonistA,
      protagonistB: duo.protagonistB,
      questionNumber: duo.questionNumber,
      questionTitle: duo.questionTitle,
      centralQuestion: duo.centralQuestion,
      quoteA: duo.quoteA,
      quoteB: duo.quoteB,
      coverImage: duo.coverImage,
      storyA: duo.storyAData,
      storyB: duo.storyBData,
      editorialReflection: duo.editorialReflection,
    });
  } catch (error) {
    console.error('[GET /duos/:id]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

export default router;
