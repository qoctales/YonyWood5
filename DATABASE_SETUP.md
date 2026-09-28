# 🗄️ Guide de Démarrage Rapide Base de Données - YonyWood

Ce guide vous permet d'activer la persistance PostgreSQL pour l'application en quelques secondes.

---

### Option 1 : En local avec Docker (Recommandé en local)

1. **Démarrer le conteneur PostgreSQL :**
   ```bash
   docker compose up -d
   ```
2. **Configurer l'URL dans `backend/.env` :**
   ```env
   DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5432/yonywood_db?schema=public"
   ```
3. **Pousser le schéma Prisma et initialiser les données :**
   ```bash
   cd backend
   npx prisma db push
   npx tsx src/seed.ts
   ```

---

### Option 2 : Dans le Cloud (Neon / Supabase - Gratuit & instantané)

1. Créez un projet gratuit sur [Neon.tech](https://neon.tech) ou [Supabase](https://supabase.com).
2. Récupérez votre chaîne de connexion PostgreSQL et collez-la dans `backend/.env` :
   ```env
   DATABASE_URL="postgresql://[user]:[password]@[host]/[dbname]?sslmode=require"
   ```
3. Initialisez la base :
   ```bash
   cd backend
   npx prisma db push
   npx tsx src/seed.ts
   ```

---

### 👑 Compte Administrateur Initial
* **Email** : `qoctales@gmail.com`
* **Mot de passe** : `yonywood2026!`
* **Rôle** : `ADMIN` (donne accès direct au Dashboard Administrateur via l'icône 👑 Couronne dans Profil)
