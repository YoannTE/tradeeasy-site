Execute un ou plusieurs rounds de la roadmap avec implementation, tests et correction automatique.

Arguments :

- Pas d'argument : round actif (partiellement complete ou premier incomplet)
- Numero(s) : /code 5 ou /code 5 6 7 ou /code 5,6,7 (gere bis/ter : /code 12bis)
- "all" : tous les rounds incomplets restants

---

## PHASE 1 — ANALYSE ET PLANIFICATION

### Etape 1 : Parsing des arguments ($ARGUMENTS)

- Pas d'argument → round actif (partiellement complete avec des [x] et [ ], ou premier avec [ ])
- Un numero (`/code 5`) → Round 5 uniquement
- Plusieurs numeros (`/code 5 6 7` ou `/code 5,6,7`) → Rounds 5, 6, 7 sequentiellement
- `all` (`/code all`) → Tous les rounds sans `DONE` ayant au moins un `- [ ]`
- Gere les suffixes `bis` et `ter` (ex: `/code 12bis`) — 12 ≠ 12bis ≠ 12ter
- Valide que les rounds existent dans la roadmap et ne sont pas deja DONE

### Etape 2 : Collecte du contexte

- Lire `.project/roadmap.md`
- Lire `.project/app.md`, `.project/design.md`, `.project/patterns.md`
- Pour chaque round : extraire les features incompletes (`- [ ]`), la section `**Tests fin de round**`, les dependances

### Etape 3 : Classification de chaque round

- **Backend** : tests mentionnent `docker-compose build api`, `pytest`, `curl /health`
- **Frontend** : tests mentionnent `docker-compose build frontend`, `Chrome`, `localhost:3000`
- **Mixed** : les deux
- Fallback : backend par defaut

### Etape 4 : Validation globale

Presenter le resume des rounds a executer :

```
Plan d'execution — N round(s)

=== Round [id] — [Nom] ([N] taches) ===
=== Round [id2] — [Nom2] ([N] taches) ===

Ordre : Round id → Round id2 → ...
On lance?
```

Attendre la validation de l'utilisateur.

---

## PHASE 2 — EXECUTION SEQUENTIELLE

Pour chaque round dans l'ordre du plan :

### ETAPE A — Plan du round (automatique, avec review agents)

1. Construire le plan d'execution du round et l'ecrire dans `.project/.round-{id}-plan.md` :
   - Quels agents lancer, combien, quelles taches assigner a chacun
   - Quels fichiers existants chaque agent doit lire avant de coder
   - Comment repartir les taches pour maximiser le parallelisme
   - Quels tests de fin de round appliquer
   - Approche technique pour chaque tache (sans ecrire de code)

   Ce fichier sert de reference pour les reviewers et les agents d'implementation.

2. `TeamCreate(team_name="review-round-{id}", description="Review du plan Round {id}")`

3. Lancer en parallele 2 reviewers dans l'equipe :

   ```
   Agent(subagent_type="architect-reviewer", name="architect", team_name="review-round-{id}", prompt="
   Tu fais partie de l'equipe 'review-round-{id}'. Ton nom est 'architect'.
   L'autre membre est 'lead-dev'.

   Contexte projet :
   ---
   {contenu de .project/app.md — sections pertinentes}
   ---

   Plan du round :
   ---
   {plan construit ci-dessus}
   ---

   Review ce plan d'execution :
   - Ordre des taches correct ?
   - Dependances manquantes ?
   - Risques architecturaux ?
   - Approche technique adaptee ?

   Partage tes findings avec lead-dev via SendMessage(to='lead-dev', message='...').
   Lis ses findings et reagis.
   Produis ton rapport final.

   Retourne UNIQUEMENT les corrections a apporter (pas de validation positive).
   Si tout est bon, reponds 'RAS'.
   Reponds en francais, sois concis."
   )
   ```

   ```
   Agent(subagent_type="lead-dev-reviewer", name="lead-dev", team_name="review-round-{id}", prompt="
   Tu fais partie de l'equipe 'review-round-{id}'. Ton nom est 'lead-dev'.
   L'autre membre est 'architect'.

   Contexte projet :
   ---
   {contenu de .project/app.md — sections pertinentes}
   ---

   Plan du round :
   ---
   {plan construit ci-dessus}
   ---

   Review ce plan d'execution :
   - Faisabilite technique ?
   - Race conditions ou edge cases a anticiper ?
   - Repartition agents/taches optimale ?
   - Tests suffisants ?

   Partage tes findings avec architect via SendMessage(to='architect', message='...').
   Lis ses findings et reagis.
   Produis ton rapport final.

   Retourne UNIQUEMENT les corrections a apporter (pas de validation positive).
   Si tout est bon, reponds 'RAS'.
   Reponds en francais, sois concis."
   )
   ```

4. Collecter les rapports des reviewers.
   Si corrections proposees → mettre a jour `.project/.round-{id}-plan.md` avec les corrections.
   Si les deux repondent "RAS" → le plan est bon, passer a l'implementation.

5. `TeamDelete(team_name="review-round-{id}")`

Ce processus est automatique — pas de validation utilisateur.

### ETAPE B — Implementation

1. `TeamCreate(team_name="round-{id}", description="Round {id} - {Nom}")`
2. `TaskCreate` pour chaque feature incomplete du round
3. Lancer les agents d'implementation via `Agent(subagent_type="general-purpose", team_name="round-{id}")` :
   - Chaque agent recoit un prompt detaille avec :
     - **Plan du round** (contenu de `.project/.round-{id}-plan.md` mis a jour apres review)
     - Contexte projet (`.project/app.md`, `CLAUDE.md`)
     - Documentation technique pertinente (`docs/`)
     - Fichiers existants a lire avant de coder
     - Features specifiques a implementer (description complete de la roadmap)
     - Conventions et patterns
     - Mockups si references
   - Les agents travaillent en parallele au sein de l'equipe
4. Coordonner via `SendMessage` + `TaskUpdate`
5. Quand tout est termine → cocher les features dans `roadmap.md`

### ETAPE C — Test

6. Lancer **un agent de test** (`Agent(subagent_type="qa-tester", name="tester-round-{id}")`)

Le prompt de l'agent de test contient :

- La liste des features implementees
- La specification de test extraite de la roadmap (`**Tests fin de round**`)
- Protocole standard Niveau 1 (TOUJOURS) :
  a. Syntaxe Python : verifier que tous les .py parsent (ast.parse)
  b. Imports : verifier que tous les modules s'importent
  c. Limite 150 lignes : aucun fichier app/ ne depasse ~150 lignes (sauf tests)
  d. YAML valides : tous les config/\*.yml se chargent
  e. Docker build : `docker-compose build api` (+ `frontend` si frontend/mixed)
  f. Health check : lancer le container, `curl /health` → 200
  g. Tests unitaires : `pytest tests/unit/ -v` dans Docker
  h. Tests d'integration Docker : imports + instanciation classes principales
- Protocole Niveau 2 si applicable :
  i. Scoring engine : verifier les 3 exemples de la doc
  j. Config validation : `validate_all_configs()`
  k. Provider health : les providers s'instancient correctement
- Si frontend ou mixed → protocole Playwright MCP :
  - `docker-compose build frontend` + `docker-compose up frontend -d`
  - Utiliser les outils MCP Playwright pour verifier les pages (navigation, affichage, console errors, network errors)
- **Format de sortie obligatoire** :
  - Tableau succinct `| Test | Detail | Resultat |`
  - Liste des bugs : `- [fichier:ligne] — description concise`
  - Nombre total de bugs

**Important** : L'agent de test est en **lecture seule** — il ne corrige PAS les bugs, il les rapporte seulement.

### ETAPE D — Boucle de correction

7. Recevoir le rapport du testeur
8. **Si bugs trouves** :
   a. Le lead (moi) corrige les bugs directement (fixes simples) ou lance un agent correcteur (fixes complexes)
   b. Relancer l'agent de test avec la meme specification
   c. Repeter jusqu'a 0 bugs
   d. **Securite** : max 5 iterations. Si encore des bugs apres 5 tentatives → signaler a l'utilisateur et demander s'il faut continuer ou passer au round suivant
9. **Si 0 bugs** : round valide

### ETAPE E — Nettoyage

10. `TeamDelete(team_name="round-{id}")`
11. Afficher le resume du round :
    "Round [id] termine !
    - [Feature 1] : fait (description)
    - [Feature 2] : fait (description)
      Tests : X passed, 0 failed (N iterations)"

---

## PHASE 3 — BILAN FINAL

12. Resume global de tous les rounds executes :
    "Bilan — N rounds executes
    - Round [id1] : OK (N features, M iterations de test)
    - Round [id2] : OK (N features, M iterations de test)"

13. Si tous les rounds de la roadmap sont termines :
    "Tous les rounds sont termines ! Le projet est fonctionnel.
    Prochaines etapes :
    - /polish — Peaufiner avant la mise en production
    - /feature — Ajouter de nouvelles fonctionnalites"
      Sinon :
      "Rounds suivants disponibles : [liste des rounds restants]
      Lance /code [id] pour continuer."
