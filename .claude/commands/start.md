Tu recois la description d'une application : $ARGUMENTS

Commence par creer le dossier .project/ (mkdir -p .project).

L'utilisateur est debutant, son idee est peut-etre vague. Aide-le a la preciser.
Eduque : utilise les termes techniques mais explique-les simplement.
"On va utiliser une base de donnees — c'est la ou on stocke les informations de tes utilisateurs"
Prends le temps necessaire a chaque phase. Ne saute aucune etape.

=== REGLE MEMOIRE (s'applique a TOUTES les phases) ===

Apres chaque checkpoint valide par l'utilisateur, lire .project/app.md
puis y ajouter IMMEDIATEMENT les informations validees.
Ne jamais attendre la fin pour ecrire. Le fichier grandit phase apres phase.
Si la conversation est interrompue, rien n'est perdu.

=== PHASE 1 : COMPRENDRE (le probleme, les utilisateurs, le marche) ===

--- Etape 1A : Le probleme ---

1. Reformule ce que tu comprends de l'idee, demande confirmation
2. Creuse le "pourquoi" :
   - Quel probleme cette app resout ?
   - Comment c'est gere aujourd'hui sans l'app ?
   - Qu'est-ce qui est frustrant dans la situation actuelle ?
3. Formule une phrase-probleme claire :
   "Cette app existe pour [resoudre tel probleme] pour [tel type de personnes]"

--- Etape 1B : Les utilisateurs ---

4. Identifie les differents types d'utilisateurs :
   - Qui utilise l'app ? (visiteur, utilisateur inscrit, admin, moderateur...)
   - Pour chaque type : quel est son objectif principal ?
   - Quel est son niveau technique ?
5. Presente la liste des profils utilisateurs, demande confirmation :
   "Les utilisateurs de ton app seraient : [liste]. J'en oublie ?"

--- Etape 1C : Le marche ---

6. Recherche sur internet : concurrents, apps similaires, tendances du secteur
7. Montre 3 a 5 exemples pertinents
8. Pour chaque exemple, demande : "Ca te plait ? Qu'est-ce qui manque ?"
9. Identifie ce qui differencie l'app de l'utilisateur :
   "Ce qui te distingue : [differenciateurs]"

→ CHECKPOINT Phase 1 :
"Voici ce que j'ai compris :

- Le probleme : [resume]
- Les utilisateurs : [liste]
- Ce qui te distingue : [differenciateurs]
  C'est bon pour toi ?"

Si oui → CREER .project/app.md avec les sections :

# App — [Nom]

## Probleme

## Utilisateurs

## Contexte marche

--- Etape 1D : Analyse agents (automatique) ---

Une fois app.md cree avec les 3 sections ci-dessus, lancer en parallele 2 agents :

1. Agent growth-reviewer : "Voici la description d'un nouveau projet. Analyse le positionnement et le marche.

## DOCUMENT :

## {contenu actuel de .project/app.md}

Produis un rapport court et actionable :

- Opportunites de marche identifiees (max 5)
- Risques business (max 3)
- Differenciateurs a renforcer ou ajouter
- Suggestions de fonctionnalites a fort potentiel viral ou de retention
- Modeles de monetisation possibles pour ce type de produit

Sois concret et specifique au domaine du projet. Reponds en francais."

2. Agent product-owner-reviewer : "Voici la description d'un nouveau projet. Challenge le positionnement produit.

## DOCUMENT :

## {contenu actuel de .project/app.md}

Produis un rapport court et actionable :

- Le probleme est-il bien defini ? Manque-t-il un angle ?
- Types d'utilisateurs oublies ou sous-estimes
- Quel est le premier utilisateur a cibler en priorite (et pourquoi)
- Parcours critiques a ne pas oublier lors de la Phase 2
- Questions a poser absolument a l'utilisateur avant de continuer

Sois concret et specifique au domaine du projet. Reponds en francais."

Presenter a l'utilisateur un resume des retours des agents :
"Avant de continuer, j'ai fait analyser ton idee par deux experts :

Cote marche et croissance :

- [resume des points cles du growth-reviewer]

Cote produit :

- [resume des points cles du product-owner-reviewer]

[Si les agents ont identifie des questions importantes]
Quelques questions supplementaires :

- [questions issues des rapports]

On integre ces retours et on continue ?"

Si l'utilisateur valide certains points → les ajouter dans app.md avant de passer a la Phase 2.

=== PHASE 2 : CARTOGRAPHIER (les parcours et fonctionnalites) ===

C'est la phase la plus importante. Elle doit etre methodique et exhaustive.
On raisonne en "qui fait quoi" → les ecrans emergent naturellement.

--- Etape 2A : Parcours utilisateur ---

Pour CHAQUE type d'utilisateur identifie en Phase 1 :

1. "Quand [utilisateur] arrive sur l'app, que fait-il en premier ?"
2. A chaque etape, demander : "Et ensuite ?"
3. Pour chaque etape :
   - Qu'est-ce qu'il voit ? (quel ecran, quelles informations)
   - Qu'est-ce qu'il peut faire ? (quelles actions)
   - Que se passe-t-il quand il agit ? (quel resultat)
4. Continuer jusqu'a la fin du parcours

Les pages/ecrans emergent naturellement de ces parcours.

→ CHECKPOINT Etape 2A :
Presenter les parcours complets. "Les parcours de tes utilisateurs : [resume].
C'est complet ou il manque des cas ?"

Si oui → AJOUTER a .project/app.md la section :

## Parcours utilisateur

(avec chaque type d'utilisateur et ses etapes)

--- Etape 2B : Inventaire des fonctionnalites ---

Pour chaque page/ecran identifie dans les parcours :

- Quelles fonctionnalites cette page necessite ?
- Quelles interactions ? (formulaires, boutons, filtres, recherche...)
- Quelles donnees sont affichees ? D'ou viennent-elles ?
- Quelles regles s'appliquent ? (qui peut voir/modifier quoi)

Puis passer la CHECKLIST des preoccupations transverses
(les choses qu'on oublie toujours) :

□ Authentification : inscription, connexion, mot de passe oublie, profil ?
□ Roles et permissions : qui peut faire quoi ? (admin, utilisateur, moderateur)
□ Recherche : globale, filtree, triee ?
□ Notifications : email, in-app ?
□ Paiements : quel modele ? (abonnement, ponctuel, gratuit, freemium)
□ Upload : quels types de fichiers ? (images, documents)
□ Administration : que gere l'admin ? Tableau de bord ? Statistiques ?
□ Temps reel : messages, notifications live, mises a jour automatiques ?
□ Mobile : memes fonctions ou version simplifiee ?
□ Multilingue ?
□ Analytics / statistiques pour l'admin ?

Pour chaque point pertinent, creuser avec l'utilisateur.
Ne pas imposer, demander : "Tu as besoin de [X] ?"

--- Etape 2C : Priorisation ---

Classer CHAQUE fonctionnalite en 3 niveaux :

- MVP : indispensable pour la v1 (sans ca l'app ne sert a rien)
- Phase 2 : important mais peut attendre le lancement
- Nice-to-have : si on a le temps, pas critique

Presenter sous forme de liste structuree :
"Voici toutes les fonctionnalites classees par priorite : [liste].
On a tout ? Les priorites te conviennent ?"

→ CHECKPOINT Etape 2B+C :
Si valide → AJOUTER a .project/app.md la section :

## Fonctionnalites

### MVP

- [ ] F1 — [Nom] : [description 1-2 lignes] (utilisateur concerne)

### Phase 2

- [ ] F12 — [Nom] : [description]

### Nice-to-have

- [ ] F18 — [Nom] : [description]

=== PHASE 3 : STRUCTURER (les donnees et regles metier) ===

A partir des fonctionnalites inventoriees, identifier les "choses"
que l'app gere (les entites = les donnees principales).
On pense en termes de tables et relations.

1. "Quels sont les elements centraux de ton app ?"
   Exemples : Utilisateur, Projet, Tache, Reservation, Produit...
2. Pour chaque entite :
   - Quelles informations sont stockees ? (les champs)
   - Quelles relations avec les autres entites ?
     "Un [X] appartient a un [Y]", "Un [X] contient plusieurs [Y]"
3. Regles metier — les contraintes du domaine :
   - "Un utilisateur peut-il supprimer son compte ?"
   - "Que se passe-t-il si le paiement echoue ?"
   - "Combien de [X] un utilisateur peut-il avoir ?"
   - "Qui peut voir/modifier [X] ?"
4. Permissions (important pour les RLS Supabase) :
   - Pour chaque entite, definir qui peut : lire, creer, modifier, supprimer
   - "L'admin peut tout voir, l'utilisateur ne voit que ses propres donnees"

→ CHECKPOINT Phase 3 :
Presenter la carte des entites et les regles.
"Les donnees de ton app : [resume]. Les regles : [liste]. C'est juste ?"

Si valide → AJOUTER a .project/app.md les sections :

## Entites

### [Nom de l'entite]

- Champs : [liste]
- Relations : [description]
- Permissions : [qui peut lire/ecrire/modifier/supprimer]

## Regles metier

- [Liste des regles]

=== PHASE 4 : REVIEW & CLOTURE ===

--- Etape 4A : Finalisation des documents ---

1. Relire .project/app.md en entier (il est maintenant complet)
2. Generer BRIEF.md a la racine : brief formel avec toutes les decisions
3. Creer .project/index.md : resume ultra-court (~20 lignes)

--- Etape 4B : Review complete par l'equipe d'agents ---

Lancer le skill /review sur .project/app.md.
Les 4 agents (architect, lead-dev, product-owner, growth) analysent le brief complet et produisent un rapport avec scoring et actions prioritaires.

--- Etape 4C : Presentation et validation ---

Presenter a l'utilisateur :

1. Le brief finalise (resume de app.md)
2. Le rapport de review avec les points cles :
   - Corrections critiques a integrer maintenant
   - Points qui necessitent une decision de l'utilisateur
   - Ameliorations recommandees

"Voici le brief finalise et les retours de l'equipe d'experts :

[Resume du brief]

Les experts ont identifie [N] points :

Corrections integrees :

- [liste des corrections deja appliquees]

A decider ensemble :

- [questions qui necessitent l'avis de l'utilisateur]

Ameliorations suggerees (optionnel) :

- [liste]

On valide le brief avec ces ajustements ?"

Integrer les decisions de l'utilisateur dans app.md et BRIEF.md.

--- Etape 4D : Memoire feedback ---

Ecrire un fichier de memoire projet pour que les agents n'oublient jamais de tester les rounds.
Le chemin de la memoire projet est le dossier de memoire Claude Code du projet courant.

Ecrire `feedback_always_test_rounds.md` dans la memoire projet :

```markdown
---
name: Toujours tester avant de marquer un round comme done
description: Ne JAMAIS marquer un round comme termine sans avoir lance les tests. Le grep statique ne suffit pas.
type: feedback
---

Toujours tester avant de marquer un round comme termine et passer au suivant.

**Why:** Un round marque comme "done" sans tests reels (build, imports, Docker, Playwright) cause des regressions en cascade sur les rounds suivants. Le grep statique ne detecte pas les erreurs d'execution.

**How to apply:** Apres chaque round d'implementation, AVANT de cocher les taches dans roadmap.md :

1. Lancer le qa-tester avec le protocole complet (smoke + Playwright si frontend)
2. Verifier que le build passe
3. Verifier que les imports fonctionnent
4. Executer les tests specifiques du round
5. Ne passer au round suivant QUE si tous les tests passent ou max 5 iterations de fix
```

--- Etape 4E : Cloture ---

NE GENERE AUCUN CODE. Dis a l'utilisateur :
"Le brief est pret et valide par l'equipe d'experts !
Tu peux lancer /mockup pour creer le design et visualiser les interfaces,
ou /roadmap directement pour planifier les etapes de construction."

Note : les fichiers .project/decisions.md et .project/patterns.md
sont crees automatiquement plus tard, au fil des decisions prises
et des premiers composants construits (voir regles dans CLAUDE.md).
