Ajoute une nouvelle fonctionnalite au projet. Description : $ARGUMENTS

=== PHASE 1 : COMPRENDRE LA DEMANDE ===

1. Lis .project/app.md, .project/roadmap.md et .project/patterns.md pour le contexte
2. Si $ARGUMENTS est vide, demander a l'utilisateur :
   "Decris ce que tu voudrais ajouter ou ameliorer."
3. Discuter et preciser la demande :
   - Comprendre le besoin fonctionnel
   - Identifier les tables, pages ou modules concernes
   - Verifier que ca n'entre pas en conflit avec l'existant
   - Definir les permissions (qui peut acceder a quoi)
4. Identifier les features necessaires pour repondre a la demande

=== PHASE 2 : ANALYSE PAR LES AGENTS ===

Une fois la demande comprise, lancer en parallele 3 agents :

1. Agent architect-reviewer : "Voici une nouvelle feature a ajouter a un projet existant.

## PROJET EXISTANT :

## {contenu de .project/app.md — sections Entites et Regles metier}

## NOUVELLE FEATURE :

## {description de la feature et des besoins identifies}

Analyse sous l'angle architecture :

- Impact sur le modele de donnees existant (nouvelles tables, modifications, relations)
- Risques de conflit ou d'incoherence avec l'existant
- Dependances techniques a prendre en compte
- Approche d'implementation recommandee (migration, triggers, RLS)
  Sois concret et specifique. Reponds en francais."

2. Agent lead-dev-reviewer : "Voici une nouvelle feature a ajouter a un projet existant.

## PROJET EXISTANT :

## {contenu de .project/app.md — sections Entites et Regles metier}

## NOUVELLE FEATURE :

## {description de la feature et des besoins identifies}

Analyse sous l'angle implementation :

- Faisabilite technique et complexite estimee
- Race conditions ou problemes de concurrence possibles
- Edge cases techniques (timeouts, echecs API, donnees invalides)
- Strategie de test recommandee
  Sois concret et specifique. Reponds en francais."

3. Agent product-owner-reviewer : "Voici une nouvelle feature a ajouter a un projet existant.

## PROJET EXISTANT :

## {contenu de .project/app.md — sections Parcours utilisateur et Fonctionnalites}

## NOUVELLE FEATURE :

## {description de la feature et des besoins identifies}

Analyse sous l'angle produit :

- Parcours utilisateur impactes ou a creer
- Edge cases et etats non definis a clarifier
- Fonctionnalites complementaires necessaires (qu'on pourrait oublier)
- Impact sur l'experience utilisateur existante
  Sois concret et specifique. Reponds en francais."

Note : si la feature touche directement les utilisateurs (nouvelle page, nouveau parcours, partage, inscription...), lancer aussi un 4e agent growth-reviewer pour analyser l'impact sur la conversion, la retention et le potentiel viral.

Presenter a l'utilisateur un resume des retours :
"J'ai fait analyser ta demande par l'equipe d'experts :

Architecture :

- [points cles de l'architect]

Implementation :

- [points cles du lead-dev]

Produit :

- [points cles du product-owner]

[Si growth-reviewer lance]
Croissance :

- [points cles du growth]

[Si des questions ou edge cases ont ete identifies]
Points a clarifier :

- [questions]

On integre ces retours ?"

Integrer les decisions de l'utilisateur.

=== PHASE 3 : PLANIFICATION ET VALIDATION ===

5. Determiner le numero du prochain round (lire roadmap.md, trouver le dernier round)
6. Preparer le nouveau round avec les retours des agents integres
7. Passer en mode plan avec EnterPlanMode
8. Presenter le plan :

   "Nouveau round propose :

   ## Round [N+1] — [Nom descriptif]
   - [ ] Feature X : description detaillee
   - [ ] Feature Y : description detaillee

   Modifications sur l'existant :
   - [tables modifiees, nouvelles entites, nouvelles regles metier]

   On valide ?"

9. Attendre la validation de l'utilisateur
10. Une fois valide, sortir du mode plan avec ExitPlanMode

=== PHASE 4 : MISE A JOUR DES DOCUMENTS ===

11. Ajouter le nouveau round dans .project/roadmap.md
12. Mettre a jour .project/app.md (nouvelles entites, regles metier, fonctionnalites)
13. Mettre a jour .project/decisions.md si des decisions ont ete prises
14. Afficher :
    "Le round [N+1] est pret avec [N] features :
    - Feature X : [description courte]
    - Feature Y : [description courte]

    Lance /code [N+1] pour l'implementer."
