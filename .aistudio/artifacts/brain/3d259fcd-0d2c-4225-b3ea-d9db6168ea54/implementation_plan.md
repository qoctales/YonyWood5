# Plan d'Implémentation Adapté : Intégration Minimaliste des Rôles, Crédits & Séries

Ce plan s'inscrit rigoureusement dans la continuité de l'expérience existante de YonyWood : **zéro refonte superflue**, respect absolu du minimalisme chaleureux (terre cuite, papier chaud, noir profond) et préservation intégrale de la pureté des pages Duos et Héritage.

---

## 1. Principes Directeurs de Design & Non-Régression
- **Préservation intégrale** : Les pages Duos et Héritage demeurent inchangées dans leur flux principal.
- **Raffinement discret** : Tout ajout visuel se fait par des micro-interactions soignées (icônes fines, volets translucides sobres, typographie unboxed sans capsules criardes).
- **Navigation fluide avec mémorisation du contexte** : Pouvoir consulter le profil d'un intervenant depuis une vidéo et revenir exactement au duo ou au récit en cours d'un simple clic retour.

---

## 2. Accès à la Page de la Série depuis le Studio (Porte Séries)

### Emplacement & Interaction (`SubmitStoryScreen.tsx`)
- Sur la page Studio, lorsque l'utilisateur sélectionne la porte **Séries** et consulte la vidéo teaser / synopsis d'une série :
  - Ajout d'une commande discrète en bas de la vidéo de présentation : un bouton épuré **« Découvrir la série »** (icône *Film* ou *ArrowUpRight* discrète, fond sombre translucide).
  - Ce bouton ouvre directement la page dédiée de la série sans perturber le parcours de soumission.

---

## 3. Page Dédiée de la Série : Équipe, Producteurs & Partenaires

### Structure Épurée (`DocumentaryDetailScreen.tsx`)
1. **En-tête de Série** : Titre officiel, les deux thématiques en miroir, question directrice et affiche 9:16 sobre.
2. **Concepteurs & Réalisation** :
   - Fiche concise de l'**Auteur** du concept et du **Scénariste** (nom cliquable vers profil, courte mention).
   - Réalisateur référent de la série.
3. **Registre des Producteurs (Membres & Utilisateurs)** :
   - Présentation verticale aérée, les uns en dessous des autres (style annuaire éditorial épuré).
   - Barre de recherche textuelle instantanée par prénom / nom.
   - Pour chaque producteur : photo de profil, prénom, date d'entrée, et au survol/clic, possibilité d'ouvrir sa vidéo de présentation en double-clic ou d'accéder directement à son profil.
4. **Distributeurs & Sponsors Partenaires** :
   - Section discrète en bas de page listant les community managers / distributeurs ainsi que les sociétés mécènes / sponsors associées.

---

## 4. Bouton Crédits / Générique sur les Vidéos (Duos & Héritage)

### Interaction & Icône Dédiée
- Sur le lecteur vidéo vertical (dans le flux des Duos et dans la modale vidéo d'Héritage au 2ᵉ clic) :
  - **4ᵉ bouton d'action** aligné aux côtés des boutons existants (*Évaluer*, *Question*, *Profil*) :
    - Icône de tournage / générique fine : **Clapperboard** (ou **Film**).
    - Style identique aux autres boutons (discret, fond translucide sombre, liseré subtil).

### Volet Modal des Crédits de la Séquence
- Au clic sur l'icône générique, ouverture d'un volet épuré (bottom-sheet ou modale feutrée) détaillant :
  - **Casting** : personne(s) à l'écran, témoin principal.
  - **Réalisation** : cadreur / réalisateur de la séquence.
  - **Post-production** : montage, étalonnage, mixage sonore.
- **Interactivité complète** : Chaque prénom / nom est cliquable et renvoie vers le profil utilisateur de la personne.
- **Bouton Retour intelligent** : Sur le profil de la personne, un bouton « Revenir au duo » permet de reprendre immédiatement le visionnage là où il s'était arrêté.

---

## 5. Badges de Rôle Discrets sur les Profils Utilisateurs

### Affichage sur la Page Profil (`ProfileSettingsScreen.tsx` / `MemberProfileModal`)
- Intégration sous le nom du profil d'une ligne de mentions fines et typographiques :
  - Exemple : *Producteur · Èṣù < > Jésus* ou *Effigie · Finagnon* ou *Réalisation · Blacks One*.
  - Pas d'étiquette pill épaisse : typographie sobre avec séparateur médian discret (`·`) et teinte terre cuite douce.
- Liste des séries associées à l'utilisateur avec accès rapide à chacune.

---

## 6. Ordre d'Implémentation & Vérifications

1. **Modèle de données & Référentiel rôles** : Enrichir les métadonnées de séries et de duos avec les crédits précis (casting, réal, post-prod) et les producteurs utilisateurs.
2. **Page Série & Annuaire des producteurs** : Structurer la page détaillée avec recherche textuelle et affichage vertical épuré.
3. **Lien depuis le Studio** : Intégrer le bouton d'accès à la série sur le lecteur vidéo de la porte Séries.
4. **Bouton Générique & Volet Crédits** : Déployer le 4ᵉ bouton sur les Duos et Héritage avec navigation profil et retour au lecteur.
5. **Badges de profil** : Afficher les rôles et séries sur les profils des membres.
6. **Contrôle esthétique** : Vérifier la cohérence visuelle, le respect des contrastes et la fluidité des transitions sans aucun encombrement visuel.
