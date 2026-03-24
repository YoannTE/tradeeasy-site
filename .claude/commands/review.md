Lance une revue multi-perspective par une equipe de 4 reviewers specialises.

Arguments : $ARGUMENTS

---

## Phase 1 — Identifier le document

1. Si `$ARGUMENTS` contient un chemin de fichier → lire ce fichier avec `Read`
2. Si `$ARGUMENTS` contient "plan" ou "roadmap" → lire `project/features/active/[feature]/roadmap.md`
3. Si `$ARGUMENTS` contient "brief" → lire `project/features/active/[feature]/brief.md`
4. Si `$ARGUMENTS` est vide → demander : "Quel document veux-tu faire reviewer ?"
5. Si `$ARGUMENTS` est une description → chercher le fichier avec `Glob` / `Grep`

Lire le contenu integral du document. Identifier son type :

- **Plan / Roadmap** → insister sur architecture et faisabilite
- **Brief / PRD** → insister sur completude business et technique
- **Document technique** → insister sur coherence et maintenabilite

Lire aussi `project/TECH.md` pour le contexte technique.

## Phase 2 — Creer l'equipe

```
TeamCreate(team_name="review-team", description="Equipe de review multi-perspective")
```

Creer 4 taches :

```
TaskCreate(title="Revue Architecture")
TaskCreate(title="Revue Implementation")
TaskCreate(title="Revue Produit")
TaskCreate(title="Revue Growth")
```

## Phase 3 — Lancer les 4 reviewers en parallele

**CRITIQUE** : Les 4 appels `Agent` DOIVENT etre dans le **meme message** pour s'executer en parallele.

Injecter le contenu integral du document dans le prompt de chaque agent.

### Agent 1 — Architect Reviewer

```
Agent(
  subagent_type="architect-reviewer",
  name="architect",
  team_name="review-team",
  description="Architecture review",
  prompt="Tu fais partie de l'equipe 'review-team'. Ton nom est 'architect'.
Les autres membres sont : lead-dev, product-owner, growth.

CONTEXTE TECHNIQUE :
---
{contenu de project/TECH.md}
---

DOCUMENT A REVIEWER :
---
{contenu du document}
---

## Ta mission

### Etape 1 — Analyse individuelle
Produis ta revue Architecture selon ton format standard.

### Etape 2 — Partager tes findings
Envoie tes findings aux 3 autres :
- SendMessage(to='lead-dev', message='Findings architecture : ...')
- SendMessage(to='product-owner', message='Findings architecture : ...')
- SendMessage(to='growth', message='Findings architecture : ...')

### Etape 3 — Cross-review
Lis les findings des autres. Pour chaque finding recu :
- Confirme si tu es d'accord
- Challenge si tu vois un probleme
- Enrichis avec tes propres observations

Envoie tes reactions via SendMessage.

### Etape 4 — Rapport final
Produis ton rapport final en integrant les retours des autres.
Sois specifique : reference les sections exactes du document.
Chaque critique inclut une recommandation concrete.
Reponds en francais."
)
```

### Agent 2 — Lead Dev Reviewer

```
Agent(
  subagent_type="lead-dev-reviewer",
  name="lead-dev",
  team_name="review-team",
  description="Lead dev review",
  prompt="Tu fais partie de l'equipe 'review-team'. Ton nom est 'lead-dev'.
Les autres membres sont : architect, product-owner, growth.

CONTEXTE TECHNIQUE :
---
{contenu de project/TECH.md}
---

DOCUMENT A REVIEWER :
---
{contenu du document}
---

## Ta mission

### Etape 1 — Analyse individuelle
Produis ta revue Lead Developer selon ton format standard.
Focus : faisabilite, edge cases, race conditions, testing strategy.

### Etape 2 — Partager tes findings
Envoie tes findings aux 3 autres :
- SendMessage(to='architect', message='Findings implementation : ...')
- SendMessage(to='product-owner', message='Findings implementation : ...')
- SendMessage(to='growth', message='Findings implementation : ...')

### Etape 3 — Cross-review
Lis les findings des autres. Reagis :
- Confirme les risques architecture qui impactent l'implementation
- Challenge les priorites produit si l'effort est sous-estime
- Signale les implications techniques des suggestions growth

Envoie tes reactions via SendMessage.

### Etape 4 — Rapport final
Integre les retours et produis ton rapport final.
Reponds en francais."
)
```

### Agent 3 — Product Owner Reviewer

```
Agent(
  subagent_type="product-owner-reviewer",
  name="product-owner",
  team_name="review-team",
  description="Product owner review",
  prompt="Tu fais partie de l'equipe 'review-team'. Ton nom est 'product-owner'.
Les autres membres sont : architect, lead-dev, growth.

DOCUMENT A REVIEWER :
---
{contenu du document}
---

## Ta mission

### Etape 1 — Analyse individuelle
Produis ta revue Product Owner selon ton format standard.
Focus : valeur business, user stories manquantes, parcours utilisateur, priorites.

### Etape 2 — Partager tes findings
Envoie tes findings aux 3 autres :
- SendMessage(to='architect', message='Findings produit : ...')
- SendMessage(to='lead-dev', message='Findings produit : ...')
- SendMessage(to='growth', message='Findings produit : ...')

### Etape 3 — Cross-review
Lis les findings des autres. Reagis :
- Repriorise si le lead-dev signale un effort eleve
- Valide les risques architecture qui impactent l'UX
- Aligne les recommandations growth avec la roadmap produit

Envoie tes reactions via SendMessage.

### Etape 4 — Rapport final
Integre les retours et produis ton rapport final.
Reponds en francais."
)
```

### Agent 4 — Growth Reviewer

```
Agent(
  subagent_type="growth-reviewer",
  name="growth",
  team_name="review-team",
  description="Growth review",
  prompt="Tu fais partie de l'equipe 'review-team'. Ton nom est 'growth'.
Les autres membres sont : architect, lead-dev, product-owner.

DOCUMENT A REVIEWER :
---
{contenu du document}
---

## Ta mission

### Etape 1 — Analyse individuelle
Produis ta revue Growth selon ton format standard.
Focus : conversion, monetisation, onboarding, metriques, go-to-market.

### Etape 2 — Partager tes findings
Envoie tes findings aux 3 autres :
- SendMessage(to='architect', message='Findings growth : ...')
- SendMessage(to='lead-dev', message='Findings growth : ...')
- SendMessage(to='product-owner', message='Findings growth : ...')

### Etape 3 — Cross-review
Lis les findings des autres. Reagis :
- Confirme les risques qui impactent la croissance
- Challenge les choix produit qui freinent l'acquisition
- Enrichis les recommandations architecture avec des metriques

Envoie tes reactions via SendMessage.

### Etape 4 — Rapport final
Integre les retours et produis ton rapport final.
Quantifie quand possible. Reponds en francais."
)
```

## Phase 4 — Synthese

Attendre que les 4 agents aient termine. Collecter leurs rapports finaux.

### 4.1 Cross-reference

Identifier les **convergences** : findings mentionnes par 2+ reviewers = issues les plus critiques.

### 4.2 Scoring

| Dimension                  | /25                                       |
| -------------------------- | ----------------------------------------- |
| Architecture technique     | Score base sur les findings architect     |
| Faisabilite implementation | Score base sur les findings lead-dev      |
| Valeur produit & business  | Score base sur les findings product-owner |
| Potentiel growth           | Score base sur les findings growth        |

### 4.3 Rapport final

```
# Rapport de Revue — [Titre du Document]

## Score Global: [X/100]

| Dimension | Score | Verdict |
|-----------|-------|---------|
| Architecture technique | /25 | OK / ATTENTION / CRITIQUE |
| Faisabilite implementation | /25 | OK / ATTENTION / CRITIQUE |
| Valeur produit & business | /25 | OK / ATTENTION / CRITIQUE |
| Potentiel growth | /25 | OK / ATTENTION / CRITIQUE |

## Corrections Critiques (bloquantes)
[Issues convergentes entre reviewers en priorite]

## Optimisations Recommandees
[Ameliorations a fort impact]

## Ameliorations Suggerees
[Nice-to-have]

## Points de Consensus Inter-Reviewers
[Items ou 2+ reviewers convergent]

## Top 5 Actions Prioritaires
1. [Action la plus impactante]
2. ...
3. ...
4. ...
5. ...

## Rapports Detailles

### Architecture (architect)
[Rapport final]

### Implementation (lead-dev)
[Rapport final]

### Produit (product-owner)
[Rapport final]

### Growth (growth)
[Rapport final]
```

## Phase 5 — Nettoyage

```
TeamDelete(team_name="review-team")
```

## Regles

1. **TeamCreate obligatoire** — toujours creer l'equipe avant de lancer les agents
2. **SendMessage obligatoire** — les agents DOIVENT echanger entre eux
3. **4 agents en parallele** — lances dans le meme message
4. **Constructif** — chaque critique inclut une recommandation concrete
5. **Specifique** — referencer les sections exactes du document
6. **Cross-reference** — la synthese identifie les convergences entre reviewers
7. **Langue** — rapport en francais
8. **TeamDelete** — toujours nettoyer l'equipe a la fin

## Exemples

```
/rb:review brief            # review le brief de la feature active
/rb:review plan             # review la roadmap de la feature active
/rb:review project/TECH.md  # review un fichier specifique
/rb:review                  # demande quel document reviewer
```
