# Remplacement Série « Focus < > PhD » & Double Mode Héritages (Cercle / Swipe)

Ce plan détaille le remplacement complet de la série documentaire *Safer < > Healer* par la nouvelle série officielle *Focus < >  PhD*, la création du nouveau duo Photographe & Chercheuse, ainsi que l'introduction des deux modes d'exploration sur la page Héritages (mode Cercle astrolabe actuel et nouveau mode Swipe immersif par cartes vidéo).

---

## 1. Vue d'Ensemble & Périmètre Fonctionnel

```
┌────────────────────────────────────────────────────────────────────────┐
│                        YONYWOOD ÉCOSYSTÈME                             │
├──────────────────────────────────┬─────────────────────────────────────┤
│   1. SÉRIE FOCUS < >  PHD        │   2. PAGE HÉRITAGES BI-MODE         │
│   • Remplacement Safer < > Healer│   • Sélecteur [ Cercle | Swipe ]    │
│   • Photographe (Clara Valmont)  │   • Mode Cercle : Astrolabe actuel  │
│   • Chercheuse (Dre. Éléonore)   │   • Mode Swipe :                    │
│   • Affiche officielle réelle    │     ├─ Étape 1 : 8 Portes (vidéos)  │
│   • Sync Studio/Marché/Admin     │     ├─ Étape 2 : Choix Direction    │
│                                  │     └─ Étape 3 : Swipe Protagonistes│
└──────────────────────────────────┴─────────────────────────────────────┘
```

### A. Intégration de la Série « Focus < >  PhD »
- **Titre & Identité** : Remplacement de *Safer < > Healer* par *Focus < >  PhD* (avec l'affiche réelle `public/assets/posters/Focus < >  PhD.jpg`).
- **Nouveau Duo Officiel** :
  - **Côté Focus** : Une photographe documentaire et portraitiste passionnée (Clara Valmont), équipée de son boîtier argentique/numérique, observant le monde sous la lumière dorée de son atelier.
  - **Côté PhD** : Une chercheuse et docteure en sciences (Dre. Éléonore Kaboré), entourée de ses manuscrits, microscopes et équations sur tableau noir.
- **Propagation complète** :
  - **Page Duos (`DuoFeedScreen` / `DuoScreen`)** : Intégration du duo dans le flux vertical 9:16 avec citations, questions centrales, crédits de séquence complets et bascule Deck/Duo.
  - **Page Studio (`SubmitStoryScreen`)** : Proposition de la porte de série *Focus < >  PhD* avec pitch, synopsis et questions directrices.
  - **Page Productions / Marché (`MarketplaceScreen`, `DocumentariesListScreen`, `DocumentaryDetailScreen`)** : Fiche détaillée de la série avec parts de coproduction, affiches réelles et simulateur d'investissement.
  - **Gouvernance & Back-Office (`adminBackOfficeData`, `seriesTeamData`)** : Équipe créative, productrice déléguée, contrats et répartition financière.

### B. Double Mode sur la page Héritages (`Cercle` vs `Swipe`)
- **Bouton de bascule en haut de l'écran Héritages** :
  - Deux onglets inspirés de la page des Duos (`Duo` / `Deck`) : `Cercle` (roue d'astrolabe / anneaux) et `Swipe` (parcours séquentiel par cartes).
- **Parcours du Mode Swipe (inspiré du Studio)** :
  1. **Écran 1 (Choix de la Porte)** : Défilement/swipe vertical ou horizontal des 8 Portes (Sagesses, Territoires, Savoir-faire, etc.), présentées sous forme de cartes vidéo avec l'icône de dimension, le titre, le résumé et un bouton clair « Choisir cette porte ».
  2. **Écran 2 (Choix de la Direction)** : Une fois la porte choisie, affichage des directions / sous-catégories avec leurs icônes officielles, leurs titres et leurs questions existentielles.
  3. **Écran 3 (Swipe des Protagonistes)** : Dès qu'une direction est sélectionnée, affichage des vidéos des protagonistes de cette direction qui défilent de manière fluide (swipe vertical d'une personne à l'autre, avec sa vidéo, son pitch, son badge et son lien vers son profil).
  4. **Navigation retour fluide** : Bouton retour pour revenir à la sélection des directions ou au choix des portes à tout moment sans recharger.

---

## 2. Expérience Utilisateur & Design Visuel

### Design du Sélecteur Bi-Mode
- **Emplacement** : Fixé en sous-en-tête de la page Héritages, avec un style pill discret en verre dépoli (`bg-stone-100/90 dark:bg-stone-800/90 backdrop-blur-md rounded-full p-1 border border-stone-200/60`).
- **Options** :
  - `Cercle` (icône boussole / astrolabe circulaire) : Vue cartographique et concentrique.
  - `Swipe` (icône cartes superposées / swipe) : Vue linéaire étape par étape tactile.

### Étape 1 : Les 8 Portes en Cartes Vidéo
- Cartes verticales immersives présentant la couverture vidéo de la porte, l'icône vectorielle de dimension en terracotta (#A2482B), le nom de la porte et le nombre de récits disponibles.
- Bouton tactile d'action : `« Choisir cette porte »` ouvrant immédiatement la grille des directions.

### Étape 2 : Le Choix de la Direction
- Grille aérée de médaillons circulaires et cartes avec l'icône officielle de chaque direction, son titre évocateur et la question centrale.
- Micro-interactions haptiques et animations fluides (`motion/react`) lors de la sélection.

### Étape 3 : Le Carrousel / Swipe des Protagonistes
- Expérience plein écran ou carte centrale avec défilement fluide des 16 protagonistes affiliés à la direction sélectionnée.
- Chaque protagoniste affiche sa vidéo, son nom, son territoire/drapeau, sa citation marquante et les boutons d'action rapide (`Profil`, `Résonner`, `Coproduire`).

---

## 3. Architecture Technique & Modifications de Données

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ARCHITECTURE DE DONNÉES                         │
├────────────────────────────────────────────────────────────────────────┤
│ src/data/mockData.ts                                                  │
│   ├── DOCUMENTARIES -> Remplace 'safer-healer' par 'focus-phd'        │
│   │   ├── Title: "Focus < >  PhD"                                      │
│   │   └── Poster: "/assets/posters/Focus < >  PhD.jpg"                 │
│   ├── PROTAGONISTS -> 'photographer-clara' & 'researcher-eleonore'    │
│   └── DUOS -> 'duo-focus-phd-01' (Focus vs PhD)                       │
├────────────────────────────────────────────────────────────────────────┤
│ src/data/matrixData.ts & dimensionsData.ts                             │
│   ├── Matrix series config 'focus-phd'                                │
│   └── Heritage subcategory 'series/focus-phd'                          │
├────────────────────────────────────────────────────────────────────────┤
│ src/components/MatrixExplorer.tsx / HeritageScreen                     │
│   ├── State: heritageMode: 'circle' | 'swipe'                          │
│   ├── CircleMode: Astrolabe / Roue actuelle                            │
│   └── SwipeMode: Multi-step (Portes -> Directions -> Protagonistes)    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Plan de Déploiement par Étapes

1. **Étape 1 : Données de la série & du duo Focus < >  PhD**
   - Mise à jour de `src/data/mockData.ts` : fiche série `focus-phd` avec l'affiche `public/assets/posters/Focus < >  PhD.jpg`, les deux protagonistes et le duo complet de l'Épisode 01.
   - Mise à jour de `src/data/matrixData.ts`, `src/data/seriesTeamData.ts`, `src/data/proposeDoorsData.ts`, `src/data/adminBackOfficeData.ts`, `src/components/MarketplaceScreen.tsx`.

2. **Étape 2 : Composant de Mode Swipe pour Héritages**
   - Implémentation du sélecteur de mode `[ Cercle | Swipe ]` dans `MatrixExplorer.tsx` / `HomeScreen.tsx`.
   - Développement de la vue Swipe étape 1 (cartes des 8 portes), étape 2 (choix des directions avec icônes) et étape 3 (swipe vertical/horizontal des protagonistes avec vidéo et bio).

3. **Étape 3 : Contrôles & Vérification Build**
   - Tests de compilation (`compile_applet`) et de validation TypeScript (`lint_applet`).
   - Vérification de la fluidité des transitions et de la persistance de l'état.
