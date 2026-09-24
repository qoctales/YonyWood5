# 🚀 YONYWOOD — SPÉCIFICATION TECHNIQUE DU BACK-END (GOOGLE ANTIGRAVITY)

> **Document destiné à l'Agent Antigravity dans l'IDE Google Antigravity.**
> Ce fichier contient l'intégralité de l'architecture, du schéma de base de données relationnelle, des contrats d'API REST / WebSocket et des scénarios d'exécution nécessaires pour construire le back-end de la plateforme Yonywood sans aucune ambiguïté.

---

## 1. VISION DU PROJET & RÔLE DU BACK-END
**Yonywood** est une plateforme documentaire et cinématographique d'auteur célébrant la transmission humaine, les territoires vivants, les savoir-faire d'exception et la coproduction citoyenne.
L'expérience utilisateur repose sur :
1. **Un flux immersif de Duos (vidéos verticales 9:16)** : deux protagonistes répondent en miroir à une question universelle.
2. **L'Astrolabe / Roue des Portes (Matrix Explorer)** : 8 portes d'entrée de 16 nœuds chacune (*Séries, Territoires, Mémoires, Expertises, Personnalités, Marques, Projets, Offres*).
3. **La Coproduction citoyenne** : acquisition de parts, simulation de valorisation dynamique d'audience.
4. **La Messagerie directe & Demandes d'échange** : dialogue ouvert par défaut à tous les utilisateurs de Yonywood, avec gestion fine de la vie privée.

---

## 2. STACK TECHNIQUE RECOMMANDÉE POUR ANTIGRAVITY
* **Runtime** : Node.js (v20+) avec TypeScript ou Python (FastAPI).
* **Framework Serveur** : Express.js ou Fastify (avec `tsx` pour l'exécution directe).
* **Base de Données** : PostgreSQL (Recommandé avec ORM **Drizzle** ou **Prisma**) ou Google Cloud SQL / Supabase.
* **Authentification** : JWT (JSON Web Tokens) avec Cookies HttpOnly ou Headers `Bearer`.
* **Temps réel / WebSocket** : Socket.IO ou `ws` natif pour les messages instantanés et les notifications de coproduction.
* **Stockage Médias (Vidéos 9:16 & Affiches)** : Google Cloud Storage (GCS) ou Bunny Stream / Cloudflare Stream avec URLs signées.

---

## 3. SCHÉMA DE DONNÉES (MODÈLE RELATIONNEL POSTGRESQL)

```sql
-- 1. UTILISATEURS
CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    role VARCHAR(32) DEFAULT 'member', -- 'member', 'creator', 'videographer', 'admin'
    avatar_url TEXT,
    bio TEXT,
    country VARCHAR(64),
    language VARCHAR(8) DEFAULT 'fr',
    -- Préférences messagerie
    message_permission VARCHAR(16) DEFAULT 'all', -- 'all', 'invitation', 'none'
    push_new_message BOOLEAN DEFAULT TRUE,
    message_preview BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. SÉRIES DOCUMENTAIRES
CREATE TABLE documentary_series (
    id VARCHAR(64) PRIMARY KEY, -- ex: 'finagnon', 'adjani', 'yamina'
    slug VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    central_question TEXT NOT NULL,
    short_synopsis TEXT,
    description TEXT,
    cover_image TEXT,
    poster_url TEXT,
    teaser_video_url TEXT,
    episode_count INT DEFAULT 16,
    protagonists_count INT DEFAULT 16,
    target_funding NUMERIC(12, 2) DEFAULT 50000.00,
    current_funding NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. PROTAGONISTES
CREATE TABLE protagonists (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(128) UNIQUE NOT NULL,
    documentary_id VARCHAR(64) REFERENCES documentary_series(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    age INT,
    role VARCHAR(128) NOT NULL,
    territory VARCHAR(128) NOT NULL,
    country VARCHAR(64) NOT NULL,
    flag VARCHAR(8),
    bio TEXT,
    photo_url TEXT NOT NULL,
    video_avatar_url TEXT,
    teaser_video_url TEXT,
    universe_tag VARCHAR(128),
    quote TEXT,
    tree_data JSONB -- Contient transmissions, opportunités, offres, projets, parcours
);

-- 4. DUOS DOCUMENTAIRES (Vidéos 9:16 en miroir)
CREATE TABLE duos (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(128) UNIQUE NOT NULL,
    documentary_id VARCHAR(64) REFERENCES documentary_series(id) ON DELETE CASCADE,
    episode_number VARCHAR(16),
    protagonist_a_id VARCHAR(64) REFERENCES protagonists(id),
    protagonist_b_id VARCHAR(64) REFERENCES protagonists(id),
    question_number VARCHAR(16),
    question_title VARCHAR(255),
    central_question TEXT NOT NULL,
    quote_a TEXT,
    quote_b TEXT,
    cover_image TEXT,
    video_url_a TEXT NOT NULL,
    video_url_b TEXT NOT NULL,
    duration_seconds INT DEFAULT 90,
    editorial_reflection TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. ASTROLABE (CATALOGUE DES 8 PORTES DE L'EXPLORER)
CREATE TABLE explorer_topics (
    id VARCHAR(64) PRIMARY KEY,
    category VARCHAR(32) NOT NULL, -- 'series', 'countries', 'questions', 'thematics' (Expertises), 'personalities', 'brands', 'projects', 'offers'
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    question TEXT,
    photo_url TEXT,
    badge VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. COPRODUCTION & PARTS CITOYENNES
CREATE TABLE coproduction_pledges (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    series_id VARCHAR(64) REFERENCES documentary_series(id) ON DELETE CASCADE,
    shares_count INT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(32) DEFAULT 'confirmed', -- 'pending', 'confirmed', 'refunded'
    payment_method VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. MESSAGERIE DIRECTE & INVITATIONS
CREATE TABLE message_threads (
    id VARCHAR(64) PRIMARY KEY,
    initiator_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    recipient_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(32) DEFAULT 'active', -- 'pending_invitation', 'active', 'blocked'
    badge VARCHAR(64),
    last_message TEXT,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id VARCHAR(64) PRIMARY KEY,
    thread_id VARCHAR(64) REFERENCES message_threads(id) ON DELETE CASCADE,
    sender_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. CONTRATS D'API REST (ENDPOINTS REQUIS)

### A. Authentification & Compte
- `POST /api/auth/register` : Création de compte (email, mot de passe, prénom).
- `POST /api/auth/login` : Authentification et retour du token JWT.
- `GET /api/auth/me` : Récupération du profil de l'utilisateur connecté.
- `PUT /api/auth/preferences` : Mise à jour des préférences (ex: `message_permission: 'all' | 'invitation' | 'none'`, push, preview, langue).

### B. Séries Documentaires & Duos (Flux Vidéo)
- `GET /api/series` : Liste des 5 séries avec statut de production et cagnotte.
- `GET /api/series/:id` : Détail complet d'une série (synopsis, épisodes, protagonistes).
- `GET /api/duos` : Flux complet des duos 9:16 (paramètres optionnels: `?series=finagnon,adjani`).
- `GET /api/duos/:id` : Récupération d'un duo spécifique et des métadonnées de lecture miroir.

### C. Astrolabe & Explorer (Matrix)
- `GET /api/explorer/categories` : Les 8 grandes portes (Séries, Territoires, Mémoires, **Expertises**, Personnalités, Marques, Projets, Offres).
- `GET /api/explorer/topics/:category` : Les 16 sujets/voix rattachés à une catégorie donnée.

### D. Coproduction Citoyenne
- `POST /api/coproduction/pledge` : Souscription de parts de coproduction pour une série.
- `GET /api/coproduction/portfolio` : Portefeuille de parts de l'utilisateur connecté.
- `GET /api/coproduction/simulation` : Calcul dynamique de valorisation d'audience.

### E. Messagerie Directe
- `GET /api/messages/threads` : Liste des conversations de l'utilisateur connecté.
- `GET /api/messages/threads/:id` : Historique des messages d'un fil.
- `POST /api/messages/threads/:id/send` : Envoi d'un message direct.
- `POST /api/messages/invitations/accept` : Validation d'une demande d'échange.
- `POST /api/messages/invitations/decline` : Rejet d'une demande d'échange.

---

## 5. DONNÉES DE SEED INITIALES
Les données de seed pour alimenter la base de données se trouvent directement dans le code source front-end :
- Séries & Duos : `src/data/mockData.ts` (Séries Finagnon, Adjani, Yamina...).
- 8 Portes de l'Astrolabe & 16 voix : `src/data/explorerTopicsData.ts`.

---

## 6. SCÉNARIOS DE TEST POUR L'AGENT ANTIGRAVITY
1. **Test Seed** : L'agent doit exécuter le script de migration et vérifier que les 5 séries et les duos sont bien insérés.
2. **Test Auth** : Créer un utilisateur `qoctales@gmail.com`, vérifier la génération du token JWT.
3. **Test Filtre de Séries** : Appeler `GET /api/duos?series=finagnon` et vérifier que seuls les duos de la série Finagnon sont renvoyés.
4. **Test Permissions Messagerie** : S'assurer que le paramètre par défaut `message_permission` vaut bien `'all'` (ouvert à tous les utilisateurs de Yonywood).
