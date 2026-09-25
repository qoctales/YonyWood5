import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const sendMessageSchema = z.object({
  content: z.string().min(1, 'Le message ne peut pas être vide').max(5000),
});

const invitationSchema = z.object({
  recipientId: z.string().min(1, 'ID du destinataire requis'),
  message: z.string().min(1).max(2000).optional(),
});

// GET /api/messages/threads — Liste des conversations de l'utilisateur connecté
router.get('/threads', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const threads = await prisma.messageThread.findMany({
      where: {
        OR: [
          { initiatorId: req.user!.id },
          { recipientId: req.user!.id },
        ],
      },
      include: {
        initiator: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true },
        },
        recipient: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            content: true,
            createdAt: true,
            senderId: true,
          },
        },
      },
      orderBy: { lastActivity: 'desc' },
    });

    // Calculer les messages non lus pour chaque thread
    const threadsWithUnread = await Promise.all(
      threads.map(async (thread) => {
        const unreadCount = await prisma.message.count({
          where: {
            threadId: thread.id,
            senderId: { not: req.user!.id },
            readAt: null,
          },
        });
        return { ...thread, unreadCount };
      })
    );

    res.json(threadsWithUnread);
  } catch (error) {
    console.error('[GET /messages/threads]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// GET /api/messages/threads/:id — Historique des messages d'un fil
router.get('/threads/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const thread = await prisma.messageThread.findFirst({
      where: {
        id,
        OR: [
          { initiatorId: req.user!.id },
          { recipientId: req.user!.id },
        ],
      },
      include: {
        initiator: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true },
        },
        recipient: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true },
        },
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            sender: {
              select: { id: true, firstName: true, lastName: true, avatarUrl: true },
            },
          },
        },
      },
    });

    if (!thread) {
      res.status(404).json({ error: 'Conversation non trouvée' });
      return;
    }

    // Marquer les messages comme lus
    await prisma.message.updateMany({
      where: {
        threadId: id,
        senderId: { not: req.user!.id },
        readAt: null,
      },
      data: { readAt: new Date() },
    });

    res.json(thread);
  } catch (error) {
    console.error('[GET /messages/threads/:id]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// POST /api/messages/threads/:id/send — Envoi d'un message direct
router.post('/threads/:id/send', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const validation = sendMessageSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({ error: 'Données invalides', details: validation.error.errors });
      return;
    }

    const thread = await prisma.messageThread.findFirst({
      where: {
        id,
        status: { not: 'blocked' },
        OR: [
          { initiatorId: req.user!.id },
          { recipientId: req.user!.id },
        ],
      },
    });

    if (!thread) {
      res.status(404).json({ error: 'Conversation non trouvée ou accès refusé' });
      return;
    }

    const message = await prisma.message.create({
      data: {
        id: uuidv4(),
        threadId: id,
        senderId: req.user!.id,
        content: validation.data.content,
      },
      include: {
        sender: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true },
        },
      },
    });

    // Mettre à jour la dernière activité du thread
    await prisma.messageThread.update({
      where: { id },
      data: {
        lastMessage: validation.data.content.slice(0, 255),
        lastActivity: new Date(),
      },
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('[POST /messages/threads/:id/send]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// POST /api/messages/invitations/send — Créer une nouvelle invitation (nouveau fil)
router.post('/invitations/send', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const validation = invitationSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: 'Données invalides', details: validation.error.errors });
      return;
    }

    const { recipientId, message } = validation.data;

    if (recipientId === req.user!.id) {
      res.status(400).json({ error: 'Vous ne pouvez pas vous envoyer un message à vous-même' });
      return;
    }

    // Vérifier que le destinataire existe et accepte les invitations
    const recipient = await prisma.user.findUnique({
      where: { id: recipientId },
      select: { id: true, messagePermission: true, firstName: true },
    });

    if (!recipient) {
      res.status(404).json({ error: 'Destinataire non trouvé' });
      return;
    }

    if (recipient.messagePermission === 'none') {
      res.status(403).json({ error: 'Ce membre ne souhaite pas recevoir de messages' });
      return;
    }

    // Vérifier si un fil existe déjà entre les deux utilisateurs
    const existingThread = await prisma.messageThread.findFirst({
      where: {
        OR: [
          { initiatorId: req.user!.id, recipientId },
          { initiatorId: recipientId, recipientId: req.user!.id },
        ],
      },
    });

    if (existingThread) {
      res.status(409).json({
        error: 'Une conversation existe déjà avec cet utilisateur',
        threadId: existingThread.id,
      });
      return;
    }

    const threadStatus = recipient.messagePermission === 'invitation' ? 'pending_invitation' : 'active';

    // Créer le thread
    const thread = await prisma.messageThread.create({
      data: {
        id: uuidv4(),
        initiatorId: req.user!.id,
        recipientId,
        status: threadStatus,
        lastMessage: message || null,
      },
    });

    // Envoyer le premier message si fourni
    if (message) {
      await prisma.message.create({
        data: {
          id: uuidv4(),
          threadId: thread.id,
          senderId: req.user!.id,
          content: message,
        },
      });
    }

    res.status(201).json({
      message: 'Invitation envoyée avec succès',
      thread,
      status: threadStatus,
    });
  } catch (error) {
    console.error('[POST /messages/invitations/send]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// POST /api/messages/invitations/accept — Validation d'une demande d'échange
router.post('/invitations/accept', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { threadId } = req.body;

    if (!threadId) {
      res.status(400).json({ error: 'ID du fil requis' });
      return;
    }

    const thread = await prisma.messageThread.findFirst({
      where: {
        id: threadId,
        recipientId: req.user!.id,
        status: 'pending_invitation',
      },
    });

    if (!thread) {
      res.status(404).json({ error: 'Invitation non trouvée' });
      return;
    }

    const updatedThread = await prisma.messageThread.update({
      where: { id: threadId },
      data: { status: 'active' },
    });

    res.json({ message: 'Invitation acceptée', thread: updatedThread });
  } catch (error) {
    console.error('[POST /messages/invitations/accept]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// POST /api/messages/invitations/decline — Rejet d'une demande d'échange
router.post('/invitations/decline', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { threadId } = req.body;

    if (!threadId) {
      res.status(400).json({ error: 'ID du fil requis' });
      return;
    }

    const thread = await prisma.messageThread.findFirst({
      where: {
        id: threadId,
        recipientId: req.user!.id,
        status: 'pending_invitation',
      },
    });

    if (!thread) {
      res.status(404).json({ error: 'Invitation non trouvée' });
      return;
    }

    // Supprimer le thread et ses messages
    await prisma.messageThread.delete({ where: { id: threadId } });

    res.json({ message: 'Invitation déclinée' });
  } catch (error) {
    console.error('[POST /messages/invitations/decline]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

export default router;
