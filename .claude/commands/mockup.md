Genere les mockups des interfaces du projet avec Google Stitch.

1. Lis BRIEF.md et .project/app.md pour comprendre le projet,
   les pages, les parcours et les fonctionnalites.

=== PHASE 0 : DIRECTION DE DESIGN ===

Avant de generer les ecrans, definir le style visuel avec l'utilisateur.

Si .project/design.md existe deja → le lire et passer a la Phase 1.

Sinon, explorer la direction visuelle :

- Style general et ambiance (moderne, minimaliste, luxe, fun, artisanal...)
- Couleurs : preferences, couleur principale, palette
- Typographie : arrondie, serieuse, moderne...
- References / inspirations :
  Rechercher des exemples de boutiques similaires, montrer des captures
  "Ce genre de style te plait ? Qu'est-ce que tu changerais ?"
- Questions adaptees au e-commerce :
  - Mise en avant des produits (grandes images, grille, slider)
  - Confiance (avis, badges, garanties)
  - Appels a l'action (boutons, urgence, promotions)
  - Ton de la marque (luxe, accessible, fun, pro)

→ CHECKPOINT Design :
"Le style serait [description]. Les couleurs : [palette avec hex].
La typo : [description]. C'est bon pour toi ?"

Si oui → creer .project/design.md avec le systeme de design complet.

=== PHASE 1 : PREPARATION ===

2. Identifie les ecrans principaux a generer (5-8 ecrans max)
   en se basant sur les parcours d'achat de app.md.
   Ecrans typiques e-commerce :
   - Page d'accueil (hero, produits vedettes, categories)
   - Page catalogue (grille produits, filtres, tri)
   - Fiche produit (galerie, variantes, ajout panier)
   - Panier
   - Checkout
   - Compte client
     Commencer par la page d'accueil (elle donne le ton pour le reste).

3. Trouve ou cree le projet Stitch :
   - Si .project/stitch.json existe → utilise le projectId
   - Sinon → list_projects et cherche par nom du dossier racine
   - Sinon → create_project avec le nom du dossier racine
   - Sauvegarde dans .project/stitch.json

=== PHASE 2 : GENERATION ===

4. Pour chaque ecran :
   a. Cree un prompt Stitch optimise :
   - Type de page, style visuel, palette avec hex codes
   - Structure en sections numerotees, composants specifiques
   - Coherent avec .project/design.md
     b. Genere l'ecran : generate_screen_from_text
     c. Recupere le screenshot : fetch_screen_image
     d. Affiche et explique ce qui a ete genere
     e. Demande validation ou ajustements

5. Boucle d'iteration :
   - Si l'utilisateur veut des changements → regenere l'ecran
   - Si l'utilisateur valide → passe au suivant
   - A chaque regeneration, met a jour stitch.json

=== PHASE 3 : FINALISATION ===

6. Une fois tous les ecrans valides :
   a. Sauvegarde les screenshots dans .project/mockups/
   b. Extrait le Design DNA via extract_design_context
   → Met a jour .project/design.md avec les tokens reels
   c. Sauvegarde le HTML dans .project/mockups/html/ (optionnel)
   d. Met a jour .project/stitch.json
   e. Affiche le resume

Principes :

- Generer ecran par ecran (pas tout d'un coup)
  pour que l'utilisateur puisse reagir a chaque etape
- Expliquer ce qui a ete genere a chaque fois
  (pas juste montrer l'image)
- Utiliser le meme style visuel sur tous les ecrans (coherence)
