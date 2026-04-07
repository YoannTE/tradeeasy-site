# App — SimplifyPro

## Probleme

Les traders particuliers (retail traders) perdent du temps et de l'argent parce que
l'analyse technique est complexe, demande des annees d'experience, et les indicateurs
classiques (RSI, MACD, etc.) ne donnent pas de signaux clairs d'entree et de sortie.

Ils doivent gerer simultanement l'analyse technique ET la psychologie du trading,
ce qui rend la rentabilite tres difficile pour les debutants et intermediaires.

SimplifyPro existe pour simplifier la prise de decision en trading en fournissant
des signaux visuels clairs (fleches vertes = achat, fleches rouges = vente)
directement sur le graphique TradingView, permettant aux traders de se concentrer
uniquement sur la psychologie et le money management.

## Utilisateurs

### Visiteur (non-client)

- **Objectif** : decouvrir SimplifyPro, voir des preuves que ca marche, decider de s'abonner
- **Niveau technique** : variable (debutant a intermediaire en trading)
- **Acces** : pages publiques du site, videos/tutos en acces libre, screenshots de trades

### Utilisateur en essai (trial)

- **Objectif** : tester l'indicateur pendant 7 jours avant de s'engager
- **Niveau technique** : intermediaire, connait deja TradingView
- **Acces** : meme acces qu'un abonne pendant 7 jours (espace perso + indicateur TradingView)
- **Inscription** : carte bancaire collectee via Stripe Setup Intent (0$ preleve pendant 7 jours)
- **Debut essai** : demarre quand l'admin accorde l'acces TradingView (pas a l'inscription)
- **Transition** : a J+7, paiement automatique (49$/mois ou 349$/an). Si annulation avant → aucun prelevement

### Abonne (client payant)

- **Objectif** : utiliser l'indicateur SimplifyPro V6.0 sur TradingView pour trader
- **Niveau technique** : sait utiliser TradingView (ou apprend via les tutos du site)
- **Acces** : espace personnel (details abonnement + donnees bancaires),
  indicateur en invite-only sur TradingView (acces donne manuellement par l'admin,
  delai garanti : 12h maximum apres paiement), Discord communautaire
- **Abonnements** : 49$/mois ou 349$/an
- **Essai gratuit** : 7 jours, CB collectee a l'inscription, paiement auto a J+7

### Ancien abonne (churned)

- **Objectif** : potentiellement revenir apres une pause
- **Acces** : peut se reabonner facilement, historique conserve

### Abonne en echec de paiement

- **Transition** : grace period a definir, puis retrait de l'acces TradingView

### Admin (proprietaire)

- **Objectif** : gerer les abonnements, donner/retirer les acces TradingView (delai 12h max),
  publier du contenu (videos, screenshots de trades), animer le Discord
- **Niveau technique** : createur de l'indicateur, expert trading
- **Acces** : panneau d'administration complet

## Contexte marche

### Concurrents principaux

1. **Lux Algo** (luxalgo.com) — Leader du marche. Suite d'indicateurs TradingView
   avec signaux, alertes automatiques, communaute Discord. ~50$/mois ou ~300$/an.
   Marketing tres fort sur YouTube. Produit complexe avec plusieurs outils.

2. **TrendSpider** (trendspider.com) — Plateforme d'analyse technique automatisee.
   Detection de tendances, backtesting sans code. ~39 a 197$/mois.
   Plateforme propre, pas uniquement TradingView.

3. **Indicator Vault** (indicatorvault.com) — Collection d'indicateurs TradingView
   specialises "Smart Money Concepts". ~29-99$ en achat unique ou ~49$/mois.
   Prix d'entree bas, cible crypto et forex.

4. **Black Box Stocks** (blackboxstocks.com) — Alertes temps reel + indicateur
   proprietaire + communaute live. ~100$/mois. Haut de gamme, tout-en-un.

5. **Marketplace TradingView** — Scripts gratuits et payants en invite-only.
   Prix variables (10-100$/mois). Concurrence directe sur la plateforme.

### Tendances du marche

- Prix moyen du secteur : 50-80$/mois pour un service complet
- Reduction annuelle standard : 30-40%
- Discord communautaire quasi systematique
- Contenu educatif YouTube comme canal principal d'acquisition
- Design "fintech" : fond sombre, couleurs neon
- Disclaimer legal obligatoire ("pas un conseil financier")
- Essai gratuit ou garantie satisfait ou rembourse tres repandus

### Differenciateurs SimplifyPro

- **Simplicite** : un seul indicateur clair ("suivez les fleches") vs suites complexes
- **Prix competitif** : 49$/mois, pile dans la moyenne du marche
- **Transparence** : Trading Live sur YouTube, pas juste des screenshots
- **Universalite** : fonctionne sur tous les actifs et toutes les unites de temps
- **Accessibilite** : tutos en acces libre, pas besoin d'etre expert pour commencer

## Decisions validees

### Decisions initiales

- **Essai gratuit 7 jours** avec carte bancaire collectee a l'inscription (0$ preleve, paiement auto a J+7)
- **Delai d'acces TradingView garanti : 12h maximum** apres inscription essai
- **L'essai demarre a l'activation TradingView** (pas a l'inscription) pour ne pas penaliser le delai d'attente
- **Discord communautaire** lance des le debut (3 salons : annonces, discussion, support)
- **Cible prioritaire** : trader intermediaire (25-40 ans), connait deja TradingView,
  a deja teste des indicateurs gratuits sans succes. Marches : Indices, Forex, Crypto
- **Disclaimer legal obligatoire** : "ceci n'est pas un conseil financier" visible sur chaque page
- **Site en anglais uniquement** au MVP. Traduction francaise via navigateur en attendant
- **Temoignages** : ajoutes manuellement par l'admin (pas de soumission par les clients)
- **Strategie promotionnelle** : prix de base 49$/mois, promos regulieres a 24,90$/mois
  (fetes de fin d'annee, Paques, Halloween, etc.) pour creer de l'urgence sans devaluer le produit

### Decisions issues de la review d'experts (4 reviewers)

- **CB obligatoire a l'inscription** : conversion trial→paid x10 (consensus unanime)
- **Tracking acces TradingView** : champ `tradingviewAccessStatus` (pending/granted/revoked)
  dans User + vue admin "Acces en attente" + email automatique quand l'acces est accorde
- **PromoCode refonde** : remise (% ou montant fixe) au lieu de prix absolu,
  compatible mensuel et annuel, aligne sur Stripe Coupons
- **Stripe Customer Portal** pour l'espace de gestion bancaire (au lieu de le coder)
- **4 emails MVP** : bienvenue, acces accorde, rappel fin essai J+5, echec paiement
- **Analytics PostHog** des le jour 1 (gratuit, 30 min d'integration)
- **Localisation Payload native** au lieu de champs FR/EN manuels (extensible)
- **Champs referral prepares** : `referralCode` + `referredBy` dans User (pour Phase 2)
- **Prix annuel** : 349$/an (~29$/mois, reduction 40%)
- **A prevoir plus tard** : screenshots de trades partageables avec branding SimplifyPro,
  programme de parrainage, tier premium a 99$/mois, blog SEO

## Parcours utilisateur

### Parcours visiteur → essai → abonne

1. Arrive sur le site (YouTube, Google, bouche-a-oreille)
2. **Page d'accueil** : accroche forte, video demo de l'indicateur, preuves (screenshots,
   resultats), temoignages, prix, CTA "Essai gratuit 7 jours"
3. Explore les videos/tutos en acces libre
4. Convaincu → clique "Essai gratuit 7 jours"
5. **Inscription** : email, mot de passe, pseudo TradingView + carte bancaire via Stripe (0$ preleve)
6. **Page d'attente engageante** : "Acces TradingView sous 12h max. En attendant :" + video tuto + checklist preparation + lien Discord
7. Admin donne l'acces invite-only sur TradingView (sous 12h)
8. Notification email : "Ton acces est actif !"
9. Utilise l'indicateur pendant 7 jours
10. J+5 : email de rappel "Ton essai se termine dans 2 jours"
11. J+7 : paiement automatique Stripe (49$/mois ou 349$/an, CB deja enregistree)
12. Si paiement OK → abonne actif, renouvellement automatique
13. Si annulation avant J+7 → aucun prelevement, acces retire

### Parcours abonne au quotidien

1. Trade avec l'indicateur sur TradingView
2. Revient sur le site pour : videos, espace perso, Discord
3. Espace perso : statut abonnement, date renouvellement, gestion infos bancaires
4. Peut se desabonner depuis son espace (acces maintenu jusqu'a fin de periode payee)
5. Peut changer de formule (mensuel ↔ annuel)

### Parcours echec de paiement

1. Paiement echoue → email automatique au client
2. Grace period 7 jours (acces maintenu)
3. J+3 : relance email
4. J+7 : derniere relance + retrait acces TradingView
5. Email de confirmation desactivation + lien pour se reabonner

### Parcours admin

1. Recoit notification quand un nouvel inscrit (essai ou abonne) s'inscrit
2. Donne l'acces TradingView invite-only (sous 12h)
3. Dashboard : liste abonnes, statuts, pseudos TradingView, dates
4. Gere le contenu : ajouter videos, temoignages, screenshots de trades
5. Gere les promos : creer/activer/desactiver des codes promo
6. Retire les acces TradingView quand necessaire (desabonnement, echec paiement)

## Fonctionnalites

### MVP

- [ ] F1 — Page d'accueil : accroche, video demo, preuves, temoignages, prix, CTA essai gratuit
- [ ] F2 — Page Pricing : 2 formules (mensuel 49$/annuel 349$), essai 7 jours, FAQ, promos
- [ ] F3 — Page Videos/Tutos : videos YouTube integrees, accessibles a tous
- [ ] F4 — Inscription/Connexion : email + mot de passe + pseudo TradingView + CB via Stripe
- [ ] F5 — Mot de passe oublie : reinitialisation par email
- [ ] F6 — Espace personnel abonne : statut, date renouvellement, Stripe Customer Portal, desabonnement
- [ ] F7 — Paiement Stripe : Setup Intent + trial 7j, checkout mensuel/annuel, renouvellement auto, webhooks
- [ ] F8 — Systeme de promos : codes promo (remise % ou montant), aligne sur Stripe Coupons
- [ ] F9 — Emails automatiques : bienvenue, acces accorde, rappel fin essai, echec paiement
- [ ] F10 — Dashboard admin : liste abonnes, statuts, pseudos TradingView, vue "acces en attente", notifications, MRR
- [ ] F11 — Gestion contenu admin : ajouter/modifier videos, temoignages, screenshots
- [ ] F12 — Tracking acces TradingView : statut pending/granted/revoked, bouton admin, emails auto
- [ ] F13 — Pages legales : mentions legales, CGV, confidentialite, disclaimer trading
- [ ] F14 — Page Contact : formulaire email
- [ ] F15 — Design fintech : theme sombre, couleurs neon, responsive mobile-first

### Phase 2

- [ ] F16 — Bilingue FR/EN : localisation Payload native + next-intl pour les strings UI
- [ ] F17 — Page "L'indicateur" : explication detaillee, fonctionnement, marches, captures
- [ ] F18 — Programme de parrainage : 1 mois gratuit parrain + filleul (champs prepares au MVP)
- [ ] F19 — Emails de nurturing : sequences auto post-inscription (J+1, J+3, J+5)
- [ ] F20 — Blog SEO : articles optimises ("meilleur indicateur TradingView", etc.)
- [ ] F21 — Analytics admin avancees : cohortes, LTV, churn par source
- [ ] F22 — Invitation Discord automatique via webhook

### Nice-to-have

- [ ] F23 — Screenshots partageables : captures de trades avec branding SimplifyPro
- [ ] F24 — Tier premium 99$/mois : alertes temps reel, coaching mensuel
- [ ] F25 — Chatbot/FAQ interactive : reponses automatiques
- [ ] F26 — Temoignages video : integration de videos clients
- [ ] F27 — Webapp proprietaire (signaux hors TradingView, diversification)

## Entites

### User (Utilisateur)

- **Champs** : email (unique), mot de passe (chiffre), nom, prenom,
  pseudo TradingView (unique), role (admin/client), date d'inscription,
  tradingviewAccessStatus (pending/granted/revoked), tradingviewAccessGrantedAt (nullable),
  stripeCustomerId, referralCode (unique, auto-genere), referredBy (relation User, nullable),
  lastLoginAt
- **Relations** : possede des Subscriptions (collection separee pour historique)
- **Permissions** : l'utilisateur voit/modifie ses propres infos. Admin voit tous les users.
- **Contraintes** : UNIQUE sur email, UNIQUE sur pseudo TradingView

### Subscription (Abonnement) — collection separee (historique conserve)

- **Champs** : type (mensuel/annuel), statut (essai/actif/echec_paiement/annule/expire),
  date debut, trialActivatedAt (demarre a l'activation TradingView), date fin essai,
  date prochain renouvellement, stripeSubscriptionId, stripeEventId (idempotence), code promo utilise
- **Relations** : appartient a un User, peut utiliser un PromoCode
- **Permissions** : l'utilisateur voit son propre abonnement. Admin voit tous.
  Stripe cree/modifie via webhooks.
- **Contraintes** : un seul abonnement avec statut actif/essai/echec_paiement par User

### PromoCode (Code promotionnel) — aligne sur Stripe Coupons

- **Champs** : code (ex: "NOEL2026"), discountType (percentage/fixed_amount),
  discountValue (ex: 50 pour 50%, ou 2410 pour -24,10$), appliesTo (monthly/annual/both),
  duration (once/repeating/forever), date debut validite, date fin validite,
  actif oui/non, nombre utilisations max, nombre utilisations actuelles
- **Relations** : utilise par des Subscriptions
- **Permissions** : acces restreint (pas de lecture publique). Validation via API route dediee.
- **Contraintes** : operation atomique pour incrementer le compteur d'utilisations

### Video (Video/Tuto)

- **Champs** : titre (FR + EN), description (FR + EN), URL YouTube,
  categorie (installation/utilisation/strategie/trading_live), ordre affichage, date publication
- **Relations** : aucune
- **Permissions** : lecture publique. Creation/modification admin uniquement.

### Testimonial (Temoignage)

- **Champs** : nom du client, role/profil, contenu (FR + EN), note (sur 5),
  image/avatar, date
- **Relations** : image → Media
- **Permissions** : lecture publique. Creation/modification admin uniquement.

### TradeScreenshot (Capture de trade)

- **Champs** : image, titre/description (FR + EN), actif concerne (ex: "EUR/USD"),
  resultat (ex: "+120 pips"), date du trade
- **Relations** : image → Media
- **Permissions** : lecture publique. Creation/modification admin uniquement.

### Media (Fichiers)

- **Champs** : fichier, nom, type, taille, dimensions
- **Relations** : utilise par TradeScreenshot, Testimonial
- **Permissions** : lecture publique pour images publiees. Upload admin uniquement.

## Regles metier

### Abonnements

- Un utilisateur ne peut avoir qu'un seul abonnement actif a la fois (contrainte DB)
- L'essai gratuit est unique : un meme email/pseudo TradingView ne peut en beneficier qu'une fois
- L'essai de 7 jours demarre a l'activation TradingView (pas a l'inscription)
- CB collectee a l'inscription via Stripe Setup Intent
- Paiement automatique a J+7 si pas d'annulation
- Le desabonnement maintient l'acces jusqu'a la fin de la periode payee
- Un ancien abonne qui revient → souscription directe (pas de nouvel essai)

### Acces TradingView

- L'admin donne l'acces TradingView sous 12h max apres inscription
- Statut tracke : pending → granted → revoked
- Chaque transition declenche un email au client et une notification admin
- Modification du pseudo TradingView possible avec notification admin

### Paiements et promos

- Grace period de 7 jours apres echec de paiement (Stripe gere les retries)
- Code promo : validation atomique (pas d'exposition publique de la liste)
- Webhooks Stripe idempotents (deduplication par event ID)
- Evenements Stripe : checkout.session.completed, invoice.payment_succeeded,
  invoice.payment_failed, customer.subscription.updated, customer.subscription.deleted

### Securite

- Rate limiting sur l'inscription (5 tentatives/IP/heure)
- Verification signature webhook Stripe (raw body)
- Pseudo TradingView non expose dans les API publiques
- Contraintes UNIQUE au niveau DB (email, pseudo TradingView)

### Infrastructure

- Analytics PostHog des le jour 1
- Stripe Customer Portal pour la gestion bancaire
- Vercel Cron pour les jobs planifies (rappel essai, escalade admin)
- ISR sur les pages publiques (revalidate: 3600)
- Site en anglais au MVP
