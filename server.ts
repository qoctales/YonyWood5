import 'dotenv/config';
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { DOCUMENTARIES, DUOS, PROTAGONISTS } from './src/data/mockData';
import { EXPLORER_CATEGORIES, EXPLORER_CATALOG } from './src/data/explorerTopicsData';

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

app.get('/api/explorer/topics/:category', (req: Request, res: Response) => {
  const { category } = req.params;
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

// Messaging
app.get('/api/messaging/threads', (_req: Request, res: Response) => {
  res.json(inMemoryThreads);
});

app.get('/api/messaging/invitations', (_req: Request, res: Response) => {
  res.json([]);
});

app.post('/api/messaging/threads/:id/messages', (req: Request, res: Response) => {
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
});

// Start server helper
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true' ? { server: httpServer } : false,
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
