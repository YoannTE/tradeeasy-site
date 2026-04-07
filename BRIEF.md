# BRIEF — SimplifyPro

## Vision

SimplifyPro simplifie la prise de decision en trading pour les particuliers
en fournissant des signaux visuels clairs (fleches achat/vente) directement
sur TradingView. Les traders n'ont plus qu'a se concentrer sur la psychologie
et le money management.

## Produit

- **Indicateur** : SimplifyPro V6.0, script TradingView en invite-only
- **Signaux** : fleches vertes (achat) et rouges (vente) sur le graphique
- **Marches** : Indices, Forex, Crypto — toutes unites de temps
- **Distribution** : acces invite-only TradingView, donne manuellement (delai 12h max)
- **Acces tracke** : statut pending/granted/revoked dans le dashboard admin

## Pricing

| Formule       | Prix            | Details                                                          |
| ------------- | --------------- | ---------------------------------------------------------------- |
| Essai gratuit | 0$ (CB requise) | 7 jours, demarre a l'activation TradingView, paiement auto a J+7 |
| Mensuel       | 49$/mois        | Renouvellement automatique                                       |
| Annuel        | 349$/an         | ~29$/mois (40% reduction), renouvellement automatique            |
| Promos        | ~24,90$/mois    | Fetes, evenements (codes promo admin, remise via Stripe Coupons) |

## Cible prioritaire

Trader intermediaire, 25-40 ans, connait deja TradingView,
a teste des indicateurs gratuits sans succes. Marches : Indices, Forex, Crypto.

## Utilisateurs

1. **Visiteur** — decouvre, explore les preuves et tutos, s'inscrit a l'essai
2. **Utilisateur en essai** — CB collectee, teste 7 jours (a partir de l'activation TV), paiement auto a J+7
3. **Abonne** — paye, utilise l'indicateur, espace perso via Stripe Portal, Discord
4. **Admin** — gere abonnements, acces TradingView (vue "en attente"), contenu, promos

## Pages du site (anglais uniquement au MVP)

### Publiques

- Page d'accueil (accroche, demo, preuves, temoignages, pricing, CTA)
- Page Pricing (formules, FAQ, promos)
- Page Videos/Tutos (YouTube, acces libre)
- Page Contact (formulaire email)
- Pages legales (mentions, CGV, confidentialite, disclaimer trading)

### Authentifiees

- Inscription (email, mot de passe, pseudo TradingView, CB via Stripe Setup Intent)
- Connexion / Mot de passe oublie
- Page d'attente post-inscription (video tuto, checklist, lien Discord)
- Espace personnel (abonnement via Stripe Customer Portal, desabonnement)

### Admin (Payload CMS)

- Dashboard abonnes (liste, statuts, pseudos TradingView, vue "acces en attente", MRR)
- Bouton "Acces accorde" (declenche email auto + debut essai)
- Gestion contenu (videos, temoignages, screenshots de trades)
- Gestion promos (codes promo alignes Stripe Coupons)

## Entites principales

- **User** : email (unique), mdp, nom, pseudo TradingView (unique), role,
  tradingviewAccessStatus, stripeCustomerId, referralCode, referredBy, lastLoginAt
- **Subscription** : type, statut, dates, trialActivatedAt, stripeSubscriptionId, stripeEventId, promo
- **PromoCode** : code, discountType (% ou montant), discountValue, appliesTo, duration, validite, limites
- **Video** : titre, description, URL YouTube, categorie, ordre, date (localisation Payload)
- **Testimonial** : nom, role, contenu, note/5, avatar (localisation Payload)
- **TradeScreenshot** : image, description, actif concerne, resultat, date (localisation Payload)
- **Media** : fichiers uploades

## Regles metier cles

- CB collectee a l'inscription (Stripe Setup Intent, 0$ preleve)
- Essai 7 jours demarre a l'activation TradingView (pas a l'inscription)
- Paiement automatique a J+7 si pas d'annulation
- 1 seul abonnement actif par utilisateur (contrainte DB)
- Essai gratuit unique (1 par email/pseudo TradingView)
- Ancien abonne = souscription directe, pas de nouvel essai
- Grace period 7 jours apres echec de paiement (Stripe retries)
- Desabonnement = acces maintenu jusqu'a fin de periode
- Acces TradingView sous 12h max, statut tracke (pending/granted/revoked)
- Webhooks Stripe idempotents (deduplication par event ID)
- Site en anglais au MVP

## Design

- Theme fintech sombre, couleurs neon
- Mobile-first, responsive
- shadcn/ui + Tailwind CSS

## Stack technique

- Next.js 15.4.x + Payload CMS 3.x (localisation native)
- Stripe (paiements, Setup Intent, Customer Portal, Coupons, Webhooks)
- shadcn/ui + Tailwind CSS
- TypeScript strict
- Resend (4 emails MVP : bienvenue, acces accorde, rappel J+5, echec paiement)
- PostHog (analytics produit des le jour 1)
- Vercel Pro (hosting, Cron jobs) + PostgreSQL (Neon/Supabase)
- Discord (3 salons : annonces, discussion, support — lien dans l'espace abonne)

## Fonctionnalites MVP (15)

F1-Page accueil, F2-Pricing, F3-Videos, F4-Inscription (CB + pseudo TV),
F5-Mot de passe oublie, F6-Espace perso (Stripe Portal), F7-Paiement Stripe (Setup Intent + webhooks),
F8-Promos (Stripe Coupons), F9-4 Emails auto, F10-Dashboard admin (+ MRR + vue acces en attente),
F11-Gestion contenu, F12-Tracking acces TradingView, F13-Pages legales + disclaimer,
F14-Contact, F15-Design fintech sombre + PostHog + ISR

## Phase 2 (7)

F16-Bilingue FR/EN, F17-Page indicateur, F18-Programme parrainage,
F19-Emails nurturing, F20-Blog SEO, F21-Analytics avancees, F22-Discord auto

## Nice-to-have (5)

F23-Screenshots partageables, F24-Tier premium 99$, F25-Chatbot FAQ,
F26-Temoignages video, F27-Webapp proprietaire
