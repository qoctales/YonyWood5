# Plan de Déploiement : Frise de Lignée Enrichie & Intégration des 8 Séries

## 1. Frise de Lignée du Profil (`ProfileLineageFrise`)

### Nettoyage de l'interaction et suppression des textes superflus
- Supprimer les infobulles et libellés techniques au survol (`title` avec « 1er clic », statistiques ou datas).
- Conserver uniquement une pastille épurée avec le **prénom seul** (`firstName`) au survol et au 1er clic.
- Éclairage scénique doux en halo au 1er clic pour matérialiser la sélection.

### Profondeur généalogique & Défilement des ascendants
- Enrichir le générateur de lignée (`lineageService.ts`) pour générer et chaîner une profondeur d'au moins **4 ascendants successifs** (parents, grands-parents, arrière-grands-parents, etc.) en remontant vers la source.
- Défilement vertical fluide et infini dans le conteneur de la frise pour naviguer le long de l'axe temporel (ascendants en haut, personne courante au centre, descendants en bas).
- Marquage visuel distinctif pour les membres fondateurs (**premiers** sans ascendant) : **double liseré terre cuite chaud** (`#A2482B` / `#C85A32`) avec halo subtil ambré.

### Vidéo de présentation au 2ᵉ clic (identique à la matrice d'Héritage)
- Au second clic sur un profil sélectionné, affichage de la vidéo de présentation 9:16 plein écran :
  - **Haut épuré** : Absence de titre de série, pays ou territoire (vidéo de présentation pure). Contrôle son/muet et bouton fermer uniquement.
  - **Bas gauche** : Prénom en grand caractère éditorial + Âge en dessous (ex: *46 ans*).
  - **Bas droite (3 boutons d'action alignés)** :
    1. **Bouton Évaluer** (icône *Award*, terre cuite `#A2482B`) ouvrant le volet de résonance communautaire.
    2. **Bouton Question** (icône *BookOpen*) révélant la question précise à laquelle la personne a répondu.
    3. **Bouton Profil** (icône *User*) permettant de naviguer directement vers le profil complet de la personne (avec retour fluide vers la lignée).

---

## 2. Intégration Complète des 8 Séries & Nouvelles Affiches

### Les 8 séries officielles avec leurs affiches
1. **Èṣù < > Jésus** : `/assets/posters/Esu < > Jesus.png`
2. **Finagnon < > Qosqorico** : `/assets/posters/Finagnon < > Qosqorico.png`
3. **Blacks One < > Beyond Eve** : `/assets/posters/Blacks One < > Beyond Eve.png`
4. **E Vivi < > Fiat Luxe** : `/assets/posters/E Vivi < > Fiat Luxe.png`
5. **Investors < > Builders** : `/assets/posters/Investors < > Builders.png`
6. **Other Eyes < > Sixth Sense** : `/assets/posters/Other eyes < > Sixth sense.png` *(nouvelle affiche mise à jour)*
7. **Coaching < > Unlimited** : `/assets/posters/Coaching < > Unlimited.png` *(nouvelle série)*
8. **Safer < > Healer** : `/assets/posters/Safer < > healer.png` *(nouvelle série)*

### Création des personnages & Duos correspondants
- **Série Coaching < > Unlimited** :
  - Protagoniste A : **Marcus** — Coach mental & stratège de haute performance dans son bureau avec carnets et tableau d'objectifs.
  - Protagoniste B : **Yannick** — Athlète en pleine envolée franchissant une haie sur piste d'athlétisme avec détermination.
  - Question centrale : *« Quel obstacle intérieur avez-vous dû surmonter pour franchir votre plus haute limite ? »*
- **Série Safer < > Healer** :
  - Protagoniste A : **Idriss** — Agent de sécurité / pompier en tenue d'intervention veillant sur la communauté.
  - Protagoniste B : **Dr Amina** — Médecin urgentiste et chirurgienne hospitalière dédiée au soin vital.
  - Question centrale : *« Quel geste précis ou quel réflexe a sauvé une vie quand tout semblait basculer ? »*

### Déploiement transversal dans l'application
- **Page Séries (`DocumentariesListScreen`)** : Affiche les 8 séries avec affiches haute fidélité et synopses éditoriaux.
- **Page Duos (`DuoFeedScreen`)** : Les 8 épisodes et leurs duos en miroir 9:16 avec citations, questions et teasers.
- **Page Marché (`MarketplaceScreen`)** : Les 8 affiches disponibles pour la coproduction officielle de parts.
- **Page Studio (`SubmitStoryScreen` & `proposeDoorsData.ts`)** : Dans la porte des Séries, les 8 séries sont sélectionnables avec leur synopsis et question dédiée.

---

## 3. Plan de Vérification & Tests

1. **Compilation & Intégrité TypeScript** : Exécution de `compile_applet` pour garantir l'absence d'erreurs ou de clés dupliquées.
2. **Test Frise de Lignée** :
   - Vérifier le survol sans données techniques (prénom seul).
   - Vérifier le défilement vertical et l'apparition d'au moins 4 ascendants.
   - Vérifier le double liseré terre cuite sur les fondateurs premiers.
   - Vérifier l'ouverture de la modale vidéo au 2ᵉ clic avec ses 3 boutons (Évaluer, Question, Profil).
3. **Test des 8 Séries** :
   - Vérifier le bon affichage des 8 séries dans le catalogue des séries.
   - Vérifier le défilement des 8 séries dans le Marché de coproduction.
   - Vérifier la présence des 8 séries dans le Studio (porte Séries).
   - Vérifier le rendu des duos et protagonistes de Coaching < > Unlimited et Safer < > Healer dans la page Duo.
