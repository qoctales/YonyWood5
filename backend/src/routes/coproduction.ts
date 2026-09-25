import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const pledgeSchema = z.object({
  seriesId: z.string().min(1, 'ID de série requis'),
  sharesCount: z.number().int().positive('Le nombre de parts doit être positif'),
  amount: z.number().positive('Le montant doit être positif'),
  paymentMethod: z.string().optional(),
});

// POST /api/coproduction/pledge — Souscription de parts
router.post('/pledge', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const validation = pledgeSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: 'Données invalides', details: validation.error.errors });
      return;
    }

    const { seriesId, sharesCount, amount, paymentMethod } = validation.data;

    // Vérifier que la série existe
    const series = await prisma.documentarySeries.findUnique({ where: { id: seriesId } });
    if (!series) {
      res.status(404).json({ error: 'Série non trouvée' });
      return;
    }

    const pledge = await prisma.coproductionPledge.create({
      data: {
        userId: req.user!.id,
        seriesId,
        sharesCount,
        amount,
        status: 'confirmed',
        paymentMethod: paymentMethod || null,
      },
    });

    // Mettre à jour le financement courant de la série
    await prisma.documentarySeries.update({
      where: { id: seriesId },
      data: {
        currentFunding: {
          increment: amount,
        },
      },
    });

    res.status(201).json({
      message: 'Coproduction confirmée avec succès',
      pledge,
    });
  } catch (error) {
    console.error('[POST /coproduction/pledge]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// GET /api/coproduction/portfolio — Portefeuille de parts de l'utilisateur connecté
router.get('/portfolio', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pledges = await prisma.coproductionPledge.findMany({
      where: { userId: req.user!.id },
      include: {
        series: {
          select: {
            id: true,
            title: true,
            slug: true,
            coverImage: true,
            posterUrl: true,
            targetFunding: true,
            currentFunding: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalShares = pledges.reduce((sum, p) => sum + p.sharesCount, 0);
    const totalAmount = pledges.reduce((sum, p) => sum + Number(p.amount), 0);

    res.json({
      pledges,
      summary: {
        totalShares,
        totalAmount,
        seriesCount: new Set(pledges.map((p) => p.seriesId)).size,
      },
    });
  } catch (error) {
    console.error('[GET /coproduction/portfolio]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// GET /api/coproduction/simulation — Calcul dynamique de valorisation d'audience
router.get('/simulation', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { seriesId, sharesCount = '10' } = req.query;

    const shares = parseInt(sharesCount as string, 10) || 10;
    const PRICE_PER_SHARE = 10; // 10€ par part
    const investedAmount = shares * PRICE_PER_SHARE;

    // Scénarios de simulation basés sur des niveaux d'audience
    const scenarios = [
      {
        label: 'Scénario conservateur',
        viewerCount: 100000,
        revenuePerViewer: 0.05,
        projectedRevenue: 100000 * 0.05,
        yourShare: (shares / 1000) * 100000 * 0.05,
        roi: ((shares / 1000) * 100000 * 0.05 - investedAmount) / investedAmount * 100,
      },
      {
        label: 'Scénario modéré',
        viewerCount: 500000,
        revenuePerViewer: 0.08,
        projectedRevenue: 500000 * 0.08,
        yourShare: (shares / 1000) * 500000 * 0.08,
        roi: ((shares / 1000) * 500000 * 0.08 - investedAmount) / investedAmount * 100,
      },
      {
        label: 'Scénario optimiste',
        viewerCount: 2000000,
        revenuePerViewer: 0.12,
        projectedRevenue: 2000000 * 0.12,
        yourShare: (shares / 1000) * 2000000 * 0.12,
        roi: ((shares / 1000) * 2000000 * 0.12 - investedAmount) / investedAmount * 100,
      },
    ];

    let seriesData = null;
    if (seriesId && typeof seriesId === 'string') {
      seriesData = await prisma.documentarySeries.findUnique({
        where: { id: seriesId },
        select: {
          id: true,
          title: true,
          targetFunding: true,
          currentFunding: true,
        },
      });
    }

    res.json({
      sharesCount: shares,
      pricePerShare: PRICE_PER_SHARE,
      investedAmount,
      series: seriesData,
      scenarios,
    });
  } catch (error) {
    console.error('[GET /coproduction/simulation]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

export default router;
