Lis BRIEF.md et .project/app.md pour comprendre le projet.
La source de verite pour les features est .project/app.md — c'est la liste
complete des fonctionnalites a realiser. Ne pas inventer de features :
utilise celles qui sont documentees dans app.md.

Lis .project/design.md pour le contexte visuel.

1. Reprends TOUTES les features listees dans app.md
2. Organise-les en rounds progressifs orientes e-commerce :
   - Round 1 : Fondations (setup Medusa, seed catalogue, backend + storefront)
   - Round 2 : Storefront vitrine (page d'accueil, catalogue, fiches produit)
   - Round 3 : Panier et tunnel d'achat (panier, checkout, confirmation)
   - Round 4 : Compte client (inscription, connexion, historique, adresses)
   - Rounds suivants : fonctionnalites complementaires (avis, wishlist, blog, etc.)
   - Dernier round : finitions (SEO, pages legales, optimisation, deploiement)
3. Dans chaque round, les features doivent etre independantes entre elles
   (pour pouvoir etre codees en parallele par des agents)
4. Chaque feature a un titre court et une description de 1-2 lignes
5. Si .project/mockups/ existe et qu'un mockup correspond a une feature,
   ajoute une reference en fin de ligne. Mais les mockups ne sont jamais
   exhaustifs — ne pas se baser dessus pour construire la roadmap.
   Des features sans mockup sont normales.

Genere .project/roadmap.md avec cette structure :

# Roadmap — [Nom de la boutique]

## Round 1 — Fondations

- [ ] Setup Medusa backend + storefront
- [ ] Seed du catalogue (produits, categories, collections)
- [ ] Configuration regions et devises

## Round 2 — Storefront vitrine

- [ ] Page d'accueil (hero, produits vedettes, categories)
- [ ] Catalogue avec filtres et tri
- [ ] Fiches produit (galerie, variantes, ajout panier)

## Round 3 — Tunnel d'achat

- [ ] Panier (resume, quantites, code promo)
- [ ] Checkout (adresse, livraison, paiement Stripe)
- [ ] Page confirmation commande

## Round 4 — Compte client

...

## Verification exhaustive (OBLIGATOIRE)

Apres avoir genere la roadmap, tu DOIS verifier que CHAQUE feature de app.md
est presente dans la roadmap. Rien ne doit etre oublie.

Procedure de verification en boucle :

1. Lance un agent (Task tool, subagent_type=Explore) qui :
   - Relit app.md et extrait la liste complete des features
   - Relit roadmap.md et extrait la liste des features planifiees
   - Compare les deux listes
   - Retourne les features manquantes (s'il y en a)

2. Si l'agent trouve des features manquantes :
   - Ajoute-les dans le round approprie de roadmap.md
   - Relance un agent de verification (meme procedure)
   - Repete jusqu'a ce que l'agent confirme 0 feature manquante

3. L'agent de verification finale doit retourner explicitement :
   "VERIFICATION OK — X features dans app.md, X features dans roadmap.md, 0 manquante"

Ne JAMAIS presenter la roadmap a l'utilisateur avant d'avoir obtenu ce message.

---

Affiche le plan visuellement et demande validation.
L'utilisateur peut ajuster (ajouter, supprimer, deplacer des features entre rounds).

Note : les autres fichiers .project/ (app.md, design.md, index.md) ont deja
ete crees par /start et /mockup. Cette commande ne cree que roadmap.md.
