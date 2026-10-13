import { spawn } from 'child_process';

if (process.env.__TSX_BOOTSTRAP !== '1' && !process.execArgv.some((a) => a.includes('tsx'))) {
  const child = spawn(process.execPath, ['--import', 'tsx', ...process.argv.slice(1)], {
    stdio: 'inherit',
    env: { ...process.env, __TSX_BOOTSTRAP: '1' },
  });
  child.on('exit', (code) => process.exit(code ?? 0));
  await new Promise(() => {});
}

import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

let DOCUMENTARIES: any[] = [];
let DUOS: any[] = [];
let PROTAGONISTS: any[] = [];
let EXPLORER_CATEGORIES: any[] = [];
let EXPLORER_CATALOG: any = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

// In-memory data store for live collaboration and state
const inMemoryPledges: any[] = [];
const inMemoryMessages: any[] = [];
const inMemoryThreads: any[] = [];
const inMemoryUsers: Map<string, any> = new Map([
  ['qoctales@gmail.com', {
    id: 'usr-admin-romeo',
    email: 'qoctales@gmail.com',
    name: 'Romeo Nonvide',
    firstName: 'Romeo',
    lastName: 'Nonvide',
    role: 'ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Fondateur & Directeur éditorial de YonyWood.',
    territory: 'Cotonou & Paris',
    country: 'Bénin',
    messagePermission: 'all',
    pushNewMessage: true,
    messagePreview: true,
    language: 'fr',
    sharesCount: 125,
    createdAt: '2026-01-15'
  }]
]);

// Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const connectedUsers = new Map<string, string>();

io.on('connection', (socket) => {
  socket.on('authenticate', (token: string) => {
    connectedUsers.set(token, socket.id);
    socket.emit('authenticated', { token });
  });

  socket.on('join_thread', (threadId: string) => {
    socket.join(`thread:${threadId}`);
  });

  socket.on('leave_thread', (threadId: string) => {
    socket.leave(`thread:${threadId}`);
  });

  socket.on('typing', (data: { threadId: string; isTyping: boolean; userId?: string }) => {
    socket.to(`thread:${data.threadId}`).emit('user_typing', data);
  });

  socket.on('message', (msg: any) => {
    if (msg?.threadId) {
      socket.to(`thread:${msg.threadId}`).emit('message', msg);
    }
  });

  socket.on('disconnect', () => {
    for (const [userId, sId] of connectedUsers.entries()) {
      if (sId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
  });
});

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// =============================================
// API ROUTES
// =============================================

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Yonywood API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Series
app.get('/api/series', (_req: Request, res: Response) => {
  res.json(DOCUMENTARIES);
});

app.get('/api/series/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const doc = DOCUMENTARIES.find((d) => d.id === id || d.slug === id);
  if (!doc) {
    res.status(404).json({ error: 'Série non trouvée' });
    return;
  }
  const seriesProtagonists = PROTAGONISTS.filter((p) => p.documentaryId === doc.id);
  const seriesDuos = DUOS.filter((d) => d.documentaryId === doc.id);
  res.json({
    ...doc,
    protagonists: seriesProtagonists,
    duos: seriesDuos,
  });
});

// Duos
app.get('/api/duos', (req: Request, res: Response) => {
  const { series } = req.query;
  let result = DUOS;
  if (series && typeof series === 'string') {
    const filter = series.split(',').map((s) => s.trim()).filter(Boolean);
    if (filter.length > 0) {
      result = DUOS.filter((d) => filter.includes(d.documentaryId));
    }
  }
  res.json(result);
});

app.get('/api/duos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const duo = DUOS.find((d) => d.id === id || d.slug === id);
  if (!duo) {
    res.status(404).json({ error: 'Duo non trouvé' });
    return;
  }
  res.json(duo);
});

// Explorer (Astrolabe)
app.get('/api/explorer/categories', (_req: Request, res: Response) => {
  res.json(EXPLORER_CATEGORIES);
});

// Redirection de l'ancienne route /memoires vers /sagesses
app.get('/memoires', (_req: Request, res: Response) => {
  res.redirect(301, '/sagesses');
});

app.get('/api/explorer/topics/:category', (req: Request, res: Response) => {
  let { category } = req.params;
  if (category === 'memoires') {
    category = 'sagesses';
  }
  const topics = (EXPLORER_CATALOG as Record<string, any>)[category] || [];
  res.json(topics);
});

// Coproduction
app.post('/api/coproduction/pledge', (req: Request, res: Response) => {
  const { seriesId, sharesCount, amount } = req.body;
  const pledge = {
    id: `pledge-${Date.now()}`,
    seriesId,
    sharesCount: Number(sharesCount) || 1,
    amount: Number(amount) || 10,
    createdAt: new Date().toISOString(),
    status: 'confirmed',
  };
  inMemoryPledges.push(pledge);
  res.status(201).json({ message: 'Coproduction confirmée avec succès', pledge });
});

app.get('/api/coproduction/portfolio', (_req: Request, res: Response) => {
  const totalShares = inMemoryPledges.reduce((sum, p) => sum + p.sharesCount, 0);
  const totalAmount = inMemoryPledges.reduce((sum, p) => sum + p.amount, 0);
  res.json({
    pledges: inMemoryPledges,
    summary: {
      totalShares,
      totalAmount,
      seriesCount: new Set(inMemoryPledges.map((p) => p.seriesId)).size,
    },
  });
});

app.get('/api/coproduction/simulation', (req: Request, res: Response) => {
  const { seriesId, sharesCount = '10' } = req.query;
  const shares = parseInt(sharesCount as string, 10) || 10;
  const PRICE_PER_SHARE = 10;
  const investedAmount = shares * PRICE_PER_SHARE;

  const scenarios = [
    {
      label: 'Scénario conservateur',
      viewerCount: 100000,
      revenuePerViewer: 0.05,
      projectedRevenue: 5000,
      yourShare: (shares / 1000) * 5000,
      roi: (((shares / 1000) * 5000 - investedAmount) / investedAmount) * 100,
    },
    {
      label: 'Scénario modéré',
      viewerCount: 500000,
      revenuePerViewer: 0.08,
      projectedRevenue: 40000,
      yourShare: (shares / 1000) * 40000,
      roi: (((shares / 1000) * 40000 - investedAmount) / investedAmount) * 100,
    },
    {
      label: 'Scénario optimiste',
      viewerCount: 2000000,
      revenuePerViewer: 0.12,
      projectedRevenue: 240000,
      yourShare: (shares / 1000) * 240000,
      roi: (((shares / 1000) * 240000 - investedAmount) / investedAmount) * 100,
    },
  ];

  const series = DOCUMENTARIES.find((d) => d.id === seriesId);

  res.json({
    sharesCount: shares,
    pricePerShare: PRICE_PER_SHARE,
    investedAmount,
    series: series ? { id: series.id, title: series.title } : null,
    scenarios,
  });
});

// Messaging (and alias /api/messages)
const handleGetThreads = (_req: Request, res: Response) => {
  res.json(inMemoryThreads);
};
const handleGetInvitations = (_req: Request, res: Response) => {
  res.json([]);
};
const handlePostMessage = (req: Request, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;
  const message = {
    id: `msg-${Date.now()}`,
    threadId: id,
    content: text,
    createdAt: new Date().toISOString(),
  };
  inMemoryMessages.push(message);
  io.to(`thread:${id}`).emit('message', message);
  res.status(201).json(message);
};

app.get('/api/messaging/threads', handleGetThreads);
app.get('/api/messages/threads', handleGetThreads);

app.get('/api/messaging/invitations', handleGetInvitations);
app.get('/api/messages/invitations', handleGetInvitations);

app.post('/api/messaging/threads/:id/messages', handlePostMessage);
app.post('/api/messages/threads/:id/messages', handlePostMessage);

app.post('/api/messaging/invitations/:id/accept', (req: Request, res: Response) => {
  res.json({ success: true, invitationId: req.params.id, status: 'accepted' });
});
app.post('/api/messages/invitations/:id/accept', (req: Request, res: Response) => {
  res.json({ success: true, invitationId: req.params.id, status: 'accepted' });
});

app.post('/api/messaging/invitations/:id/decline', (req: Request, res: Response) => {
  res.json({ success: true, invitationId: req.params.id, status: 'declined' });
});
app.post('/api/messages/invitations/:id/decline', (req: Request, res: Response) => {
  res.json({ success: true, invitationId: req.params.id, status: 'declined' });
});

// Authentication & User preferences
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { email, firstName, lastName } = req.body || {};
  if (!email) {
    res.status(400).json({ error: 'Email requis' });
    return;
  }
  const cleanEmail = email.trim().toLowerCase();
  const existing = inMemoryUsers.get(cleanEmail);
  if (existing) {
    res.json({
      message: 'Compte existant',
      token: `demo-token-${existing.id}`,
      user: existing,
    });
    return;
  }
  const newUser = {
    id: `usr-${Date.now()}`,
    email: cleanEmail,
    name: `${firstName || ''} ${lastName || ''}`.trim() || cleanEmail.split('@')[0],
    firstName: firstName || cleanEmail.split('@')[0],
    lastName: lastName || '',
    role: cleanEmail === 'qoctales@gmail.com' ? 'ADMIN' : 'USER',
    sharesCount: 10,
    messagePermission: 'all',
    pushNewMessage: true,
    messagePreview: true,
    language: 'fr',
    createdAt: new Date().toISOString().split('T')[0],
  };
  inMemoryUsers.set(cleanEmail, newUser);
  res.status(201).json({
    message: 'Compte créé avec succès',
    token: `demo-token-${newUser.id}`,
    user: newUser,
  });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email } = req.body || {};
  if (!email) {
    res.status(400).json({ error: 'Email requis' });
    return;
  }
  const cleanEmail = email.trim().toLowerCase();
  let user = inMemoryUsers.get(cleanEmail);
  if (!user) {
    user = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      name: cleanEmail.split('@')[0],
      firstName: cleanEmail.split('@')[0],
      role: cleanEmail === 'qoctales@gmail.com' ? 'ADMIN' : 'USER',
      sharesCount: 10,
      createdAt: new Date().toISOString().split('T')[0],
    };
    inMemoryUsers.set(cleanEmail, user);
  }
  res.json({
    message: 'Connexion réussie',
    token: `demo-token-${user.id}`,
    user,
  });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Default to admin or guest
    res.json(inMemoryUsers.get('qoctales@gmail.com') || null);
    return;
  }
  // Try to find user from token
  for (const user of inMemoryUsers.values()) {
    if (authHeader.includes(user.id)) {
      res.json(user);
      return;
    }
  }
  res.json(inMemoryUsers.get('qoctales@gmail.com') || null);
});

app.put('/api/auth/preferences', (req: Request, res: Response) => {
  res.json({ success: true, preferences: req.body });
});

// Start server helper
async function startServer() {
  try {
    const [mockModule, topicsModule] = await Promise.all([
      import('./src/data/mockData'),
      import('./src/data/explorerTopicsData'),
    ]);
    DOCUMENTARIES = mockModule.DOCUMENTARIES || [];
    DUOS = mockModule.DUOS || [];
    PROTAGONISTS = mockModule.PROTAGONISTS || [];
    EXPLORER_CATEGORIES = topicsModule.EXPLORER_CATEGORIES || [];
    EXPLORER_CATALOG = topicsModule.EXPLORER_CATALOG || {};
  } catch (err) {
    console.warn('[server] Warning loading data modules:', err);
  }

  if (!isProd) {
    try {
      const clientMjs = path.resolve(__dirname, 'node_modules/vite/dist/client/client.mjs');
      if (fs.existsSync(clientMjs)) {
        let content = fs.readFileSync(clientMjs, 'utf-8');
        const errStr = 'reject(new Error("WebSocket closed without opened."));';
        const connStr = 'async connect({ onMessage, onDisconnection }) {\n      const socket = options.createConnection();';
        let changed = false;
        if (content.includes(errStr)) {
          content = content.replace(errStr, 'resolve();');
          changed = true;
        }
        if (content.includes(connStr)) {
          content = content.replace(connStr, 'async connect({ onMessage, onDisconnection }) {\n      return;\n      const socket = options.createConnection();');
          changed = true;
        }
        if (changed) fs.writeFileSync(clientMjs, content, 'utf-8');
      }
    } catch {
      // ignore
    }

    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use('*', async (req: Request, res: Response, next) => {
      if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/socket.io')) {
        return next();
      }
      try {
        const url = req.originalUrl;
        const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        const html = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 YonyWood server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
