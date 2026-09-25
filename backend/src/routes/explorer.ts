import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET /api/explorer/categories — Les 8 grandes portes de l'Astrolabe
router.get('/categories', async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.explorerCategory.findMany({
      orderBy: { id: 'asc' },
    });

    res.json(categories);
  } catch (error) {
    console.error('[GET /explorer/categories]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// GET /api/explorer/topics/:category — Les sujets/voix rattachés à une catégorie
router.get('/topics/:category', async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.params.category as string;

    const validCategories = [
      'series', 'countries', 'questions', 'thematics',
      'personalities', 'brands', 'projects', 'offers'
    ];

    if (!validCategories.includes(category)) {
      res.status(400).json({
        error: `Catégorie invalide. Catégories valides: ${validCategories.join(', ')}`,
      });
      return;
    }

    const topics = await prisma.explorerTopic.findMany({
      where: { category },
      orderBy: { id: 'asc' },
    });

    res.json(topics);
  } catch (error) {
    console.error('[GET /explorer/topics/:category]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

export default router;
