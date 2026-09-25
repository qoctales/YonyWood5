import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET /api/series — Liste de toutes les séries avec statut de production et cagnotte
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const series = await prisma.documentarySeries.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        slug: true,
        title: true,
        subtitle: true,
        centralQuestion: true,
        shortSynopsis: true,
        coverImage: true,
        posterUrl: true,
        teaserVideoUrl: true,
        teaserDuration: true,
        episodeCount: true,
        protagonistsCount: true,
        targetFunding: true,
        currentFunding: true,
        territories: true,
        universes: true,
        questions: true,
        createdAt: true,
      },
    });

    res.json(series);
  } catch (error) {
    console.error('[GET /series]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// GET /api/series/:id — Détail complet d'une série
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const series = await prisma.documentarySeries.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        protagonists: {
          select: {
            id: true,
            slug: true,
            name: true,
            age: true,
            role: true,
            territory: true,
            country: true,
            flag: true,
            bio: true,
            photoUrl: true,
            universeTag: true,
            quote: true,
            treeData: true,
            stories: true,
          },
        },
        duos: {
          select: {
            id: true,
            slug: true,
            episodeNumber: true,
            questionNumber: true,
            questionTitle: true,
            centralQuestion: true,
            coverImage: true,
            editorialReflection: true,
          },
        },
      },
    });

    if (!series) {
      res.status(404).json({ error: 'Série non trouvée' });
      return;
    }

    res.json(series);
  } catch (error) {
    console.error('[GET /series/:id]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

export default router;
