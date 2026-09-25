import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Schémas de validation
const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Mot de passe minimum 8 caractères'),
  firstName: z.string().min(1, 'Prénom requis'),
  lastName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const preferencesSchema = z.object({
  permission: z.enum(['all', 'invitation', 'none']).optional(),
  pushNotification: z.boolean().optional(),
  preview: z.boolean().optional(),
  language: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  country: z.string().optional(),
});

// Génération du token JWT
const generateToken = (user: { id: string; email: string; role: string }) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
  );
};

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: 'Données invalides', details: validation.error.errors });
      return;
    }

    const { email, password, firstName, lastName } = validation.data;

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: 'Cet email est déjà utilisé' });
      return;
    }

    // Hasher le mot de passe
    const passwordHash = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        role: 'member',
        messagePermission: 'all',
        pushNewMessage: true,
        messagePreview: true,
      },
    });

    const token = generateToken(user);

    res.status(201).json({
      message: 'Compte créé avec succès',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        messagePermission: user.messagePermission,
        language: user.language,
      },
    });
  } catch (error) {
    console.error('[POST /auth/register]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: 'Email ou mot de passe invalide' });
      return;
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      return;
    }

    const token = generateToken(user);

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatarUrl: user.avatarUrl,
        messagePermission: user.messagePermission,
        language: user.language,
      },
    });
  } catch (error) {
    console.error('[POST /auth/login]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatarUrl: true,
        bio: true,
        country: true,
        language: true,
        messagePermission: true,
        pushNewMessage: true,
        messagePreview: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('[GET /auth/me]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// PUT /api/auth/preferences
router.put('/preferences', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const validation = preferencesSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: 'Données invalides', details: validation.error.errors });
      return;
    }

    const { permission, pushNotification, preview, language, firstName, lastName, bio, avatarUrl, country } = validation.data;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        ...(permission !== undefined && { messagePermission: permission }),
        ...(pushNotification !== undefined && { pushNewMessage: pushNotification }),
        ...(preview !== undefined && { messagePreview: preview }),
        ...(language !== undefined && { language }),
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
        ...(bio !== undefined && { bio }),
        ...(avatarUrl !== undefined && { avatarUrl }),
        ...(country !== undefined && { country }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatarUrl: true,
        bio: true,
        country: true,
        language: true,
        messagePermission: true,
        pushNewMessage: true,
        messagePreview: true,
      },
    });

    res.json({ message: 'Préférences mises à jour', user: updatedUser });
  } catch (error) {
    console.error('[PUT /auth/preferences]', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

export default router;
