# Roadmap — EasyTrade

## Round 1 — Fondations

- [ ] Setup Next.js 15.4 + Payload CMS 3.x + PostgreSQL + TypeScript strict
- [ ] Configuration du design system : theme sombre fintech (zinc-950, blue-500), Inter font, shadcn/ui, Tailwind CSS (F15)
- [ ] Collections Payload : Users (avec tradingviewAccessStatus, stripeCustomerId, referralCode, referredBy, lastLoginAt), Subscription, Media
- [ ] Collections contenu : Video, Testimonial, TradeScreenshot, PromoCode (avec champs alignes Stripe Coupons)
- [ ] Seed admin (admin@admin.com / password) via hook onInit
- [ ] Layout principal : navbar (logo, liens, CTA "Start Free Trial") + footer (4 colonnes, disclaimer legal, copyright)
- [ ] Creation Discord communautaire : 3 salons (annonces, discussion, support) + lien d'invitation permanent

## Round 2 — Pages publiques

- [ ] Page d'accueil : hero "Stop Guessing", demo indicateur, social proof, features 2x3, trade screenshots, how it works, temoignages, pricing preview, CTA final (F1) — ref: mockup homepage
- [ ] Page Pricing : 2 cartes (Monthly $49 / Annual $349 "Best Value"), essai 7 jours, champ code promo, FAQ accordion (F2)
- [ ] Page Videos/Tutos : grille de videos YouTube integrees par categorie (installation, utilisation, strategie, trading live), acces public (F3)
- [ ] Page Contact : formulaire email (nom, email, sujet, message) avec validation zod et toast de confirmation (F14)
- [ ] Pages legales : mentions legales, CGV, politique de confidentialite, disclaimer trading "Not financial advice" (F13)

## Round 3 — Authentification & Paiement Stripe

- [ ] Inscription : formulaire email + mot de passe + pseudo TradingView + Stripe Setup Intent (CB collectee, 0$ preleve), creation Stripe Customer (F4 + F7)
- [ ] Connexion : email + mot de passe, redirect vers espace perso (F4)
- [ ] Mot de passe oublie : envoi email de reinitialisation via Resend (F5)
- [ ] Webhooks Stripe : endpoint /api/webhooks/stripe, verification signature raw body, idempotence par event ID. Events : checkout.session.completed, invoice.payment_succeeded, invoice.payment_failed, customer.subscription.updated, customer.subscription.deleted (F7)
- [ ] Logique abonnement : creation Subscription a l'inscription (statut essai), trial_end base sur trialActivatedAt, paiement auto a J+7, gestion grace period 7j (F7)
- [ ] API route /api/promo/validate : validation atomique du code promo, non-exposition de la liste, increment compteur (F8)

## Round 4 — Dashboard admin & Gestion TradingView

- [ ] Dashboard admin Payload : liste abonnes avec statuts (essai/actif/echec/annule), pseudos TradingView, dates inscription, MRR calcule (F10)
- [ ] Vue "Acces en attente" : filtre abonnes avec tradingviewAccessStatus=pending, triee par anciennete, bouton "Acces accorde" qui passe le statut a granted et declenche l'email + set trialActivatedAt (F12)
- [ ] Gestion contenu : CRUD complet pour Videos (titre, description, URL YouTube, categorie, ordre), Testimonials (nom, role, contenu, note, avatar), TradeScreenshots (image, description, actif, resultat, date) (F11)
- [ ] Gestion promos : CRUD PromoCode dans Payload (code, discountType, discountValue, appliesTo, duration, dates validite, actif, limites) (F8)
- [ ] Notification admin : email a l'admin a chaque nouvelle inscription (pseudo TradingView + email du nouvel inscrit) (F10)

## Round 5 — Espace abonne & Emails

- [ ] Page d'attente post-inscription : video tuto d'onboarding, checklist "Prepare your TradingView", lien Discord, statut acces TradingView en temps reel (F4)
- [ ] Espace personnel abonne : statut abonnement (essai/actif/annule), date renouvellement, pseudo TradingView, lien Discord, bouton "Manage Billing" vers Stripe Customer Portal, bouton desabonnement (F6)
- [ ] Integration Stripe Customer Portal : gestion carte bancaire, historique factures, changement de formule, desabonnement — via redirect Stripe (F6)
- [ ] Email bienvenue : envoye a l'inscription via Resend, template HTML, contenu : "Votre acces arrive sous 12h" + lien Discord + tuto preparation (F9)
- [ ] Email "Acces accorde" : declenche quand l'admin clique "Acces accorde", contient les instructions pour activer l'indicateur sur TradingView (F9)
- [ ] Email rappel fin essai J+5 : Vercel Cron quotidien /api/cron/trial-reminder, envoye 2 jours avant la fin de l'essai (F9)
- [ ] Email echec paiement : declenche par webhook invoice.payment_failed, contient un lien pour mettre a jour le moyen de paiement (F9)

## Round 6 — Finitions & Deploiement

- [ ] SEO : meta tags (title, description, OG) sur chaque page, sitemap dynamique, Schema.org markup (Product, FAQ), balises hreflang preparees
- [ ] Analytics PostHog : script dans le layout root, events custom (signup, trial_start, payment_success, churn)
- [ ] ISR sur pages publiques : revalidate 3600 sur accueil, pricing, videos, temoignages
- [ ] Rate limiting : protection endpoint inscription (5 tentatives/IP/heure)
- [ ] Responsive : verification mobile-first de toutes les pages et composants
- [ ] Vercel Cron : endpoint /api/cron/daily-checks pour rappel essai, escalade admin (>6h sans acces TV)
- [ ] Deploiement Vercel Pro + PostgreSQL (Neon) + configuration .env production (Stripe keys, Resend API key, PostHog key)
