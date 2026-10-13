# Refonte des Icônes de Navigation et Harmonisation Circulaire de la Page Héritages

Plan de conception et d'implémentation pour moderniser la barre de navigation principale et unifier l'identité graphique de la page Héritages avec des formes circulaires pures inspirées du cinéma et de la transmission.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Tous les choix artistiques et sémantiques sont directement issus des souhaits et maquettes fournis :
> 1. **Studio** : Remplacement de l'icône actuelle par le **Fauteuil de réalisateur** (structure épurée avec assise, dossier, accoudoirs et piétement en X).
> 2. **Héritages** : Remplacement des alvéoles par la **Bobine de film** (disque délicat, moyeu central, 4 ou 5 perforations circulaires et amorce de pellicule fluide).
> 3. **Productions** : Remplacement du jeton par le **Clap de cinéma** (partie supérieure entrouverte avec bandes biseautées et ardoise inférieure).
> 4. **Duocumentaires & Profil** : Conservation stricte de leurs icônes respectives (Écran TV vintage scindé & Profil utilisateur).
> 5. **Page Héritages (Astrolabe)** : Remplacement complet de la géométrie hexagonale (alvéoles/nid d'abeille) par des **médaillons et anneaux circulaires**, en harmonie absolue avec la bobine de film et les rouages de l'astrolabe.

---

## 1. Overview & Core Concept

* **Objectif** : Donner à la barre de navigation une unité narrative cinématographique forte tout en simplifiant la lecture visuelle de la page Héritages.
* **Le Studio** incarne désormais le lieu de mise en scène et de création avec le **siège de réalisateur**.
* **Héritages** incarne la mémoire, le temps et la pellicule des récits avec la **bobine de film**.
* **Productions** incarne l'action concrète du tournage, de la coproduction et du plateau avec le **clap de cinéma**.
* **La page Héritages** abandonne la métaphore des alvéoles pour adopter des **cercles concentriques et médaillons ronds**, plus organiques, doux et cohérents avec les perforations de la bobine.

---

## 2. User Experience & Visual Design

### Traitement Stylistique des Icônes (`YonywoodBrandIcons.tsx`)
Pour garantir une cohérence visuelle parfaite entre toutes les icônes de la barre de navigation :
* **Épaisseur de trait** : Trait vectoriel fin (`strokeWidth = 1.5`), terminaisons arrondies (`strokeLinecap="round"`, `strokeLinejoin="round"`), pas d'aplats massifs superflus.
* **Proportions & Aération** : Vue dans un `viewBox="0 0 24 24"`, alignée avec la grille optique 24px de Lucide React pour une échelle uniforme à 20px / 24px dans la barre.
* **Comportement actif** : Teinte en blanc sur pastille de sélection en Terre Cuite signature (`#A2482B`), et en gris pierre (`#78716C`) à l'état inactif.

### Métamorphose de la Page Héritages (`MatrixExplorer.tsx` & `CentralAstrolabeJoystick.tsx`)
* **Centre du joystick** : L'icône centrale alvéolaire est remplacée par la **Bobine de film** (`FilmReelIcon`), marquant immédiatement la filiation avec l'onglet Héritages.
* **Sujets et protagonistes sur les orbites** : Les découpes et bordures en polygones hexagonaux (`<polygon points={getHexagonPoints(...)} />`) deviennent des médaillons circulaires parfaits (`<circle cx={...} cy={...} r={...} />` et `clipPath` circulaire).
* **Résultat visuel** : Moins d'angles durs, une sensation de lentilles optiques, d'anneaux planétaires et de perforations de bobine vivante.

---

## 3. Key Product Decisions & Trade-Offs

| Élement | Approche Choisie | Justification |
| :--- | :--- | :--- |
| **Icône Studio** | `DirectorChairIcon` | Évoque instantanément la posture de réalisateur/créateur qui pilote son projet, fidèle au visuel partagé. |
| **Icône Héritages** | `FilmReelIcon` | La bobine circulaire avec amorce de pellicule déroulée fait le pont entre le patrimoine documentaire et la roue de l'astrolabe. |
| **Icône Productions** | `ClapCinemaIcon` | Le clap symbolise le passage à l'acte, la fabrication du film et le financement du tournage. |
| **Géométrie de l'Astrolabe** | Médaillons circulaires | Les cercles suppriment la complexité visuelle des hexagones et s'accordent idéalement avec les orbites rotatives. |

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          BARRE DE NAVIGATION                           │
│                           (BottomMenu.tsx)                             │
├──────────────┬──────────────┬──────────────┬────────────┬──────────────┤
│    Studio    │  Héritages   │Duocumentaires│Productions │    Profil    │
│  [Fauteuil]  │   [Bobine]   │  [Double TV] │   [Clap]   │ [Silhouette] │
└──────┬──────────────┬──────────────┬─────────────┬──────────────┬──────┘
       │              │              │             │              │
       ▼              ▼              ▼             ▼              ▼
  Écran Studio   Astrolabe       Flux Duos       Marché      Profil &
  & Dépôt Récit  Circulaire      & Miroirs       & Parts      Lignée
              (MatrixExplorer)
                     │
                     ▼
          ┌─────────────────────┐
          │  Médaillons ronds   │
          │  Anneaux & Cercles  │
          │  Bobine au centre   │
          └─────────────────────┘
```

### Plan d'exécution par composants :
1. **`src/components/YonywoodBrandIcons.tsx`** :
   - Création de `DirectorChairIcon` (fauteuil de réalisateur avec assise en tissu souple, accoudoirs et piétement croisé).
   - Création de `FilmReelIcon` (bobine de pellicule avec 4-5 ouvertures circulaires et bande délicate à la base).
   - Création de `ClapCinemaIcon` (clap de cinéma avec charnière supérieure inclinée).
2. **`src/components/BottomMenu.tsx`** :
   - Remplacement de `Clapperboard` par `DirectorChairIcon` sur l'onglet Studio.
   - Remplacement de `AgoraAlveolesIcon` par `FilmReelIcon` sur l'onglet Héritages.
   - Remplacement de `ProductionTokenIcon` par `ClapCinemaIcon` sur l'onglet Productions.
3. **`src/components/CentralAstrolabeJoystick.tsx`** :
   - Remplacement de `AgoraAlveolesIcon` par `FilmReelIcon` au centre du joystick de l'astrolabe.
4. **`src/components/MatrixExplorer.tsx`** :
   - Remplacement des fonctions de calcul d'hexagones (`getHexagonPoints`, `getHexagonPosterPoints`) par des formes circulaires `<circle>` et des `clipPath` ronds, offrant un rendu doux et moderne.
5. **Vérification** : Validation du build (`compile_applet`) et du typage (`lint_applet`).
