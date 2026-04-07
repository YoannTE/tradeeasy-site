# Roadmap — SimplifyPro

## Round 1 — Fondations — DONE

- [x] Setup Next.js 15.4 + Payload CMS 3.x + PostgreSQL + TypeScript strict
- [x] Configuration du design system : theme sombre fintech (zinc-950, blue-500), Inter font, shadcn/ui, Tailwind CSS (F15)
- [x] Collections Payload : Users (avec tradingviewAccessStatus, stripeCustomerId, referralCode, referredBy, lastLoginAt), Subscription, Media
- [x] Collections contenu : Video, Testimonial, TradeScreenshot, PromoCode (avec champs alignes Stripe Coupons)
- [x] Seed admin (admin@admin.com / password) via hook onInit
- [x] Layout principal : navbar (logo, liens, CTA "Start Free Trial") + footer (4 colonnes, disclaimer legal, copyright)
- [ ] Creation Discord communautaire : 3 salons (annonces, discussion, support) + lien d'invitation permanent _(a faire manuellement)_

## Round 2 — Pages publiques — DONE

- [x] Page d'accueil : 9 sections (hero, social proof, features, TradingView native, live performance, how it works, temoignages, pricing preview, CTA) (F1)
- [x] Page Pricing : 2 cartes (Monthly $49 / Annual $349 "Best Value"), essai 7 jours, champ code promo, FAQ accordion (F2)
- [x] Page Videos/Tutos : grille de videos YouTube par categorie avec filtres, 4 videos placeholder (F3)
- [x] Page Contact : formulaire email avec validation zod + toast de confirmation (F14)
- [x] Pages legales : Terms of Service, Privacy Policy, Trading Disclaimer + liens footer mis a jour (F13)

## Round 3 — Authentification & Paiement Stripe — DONE

- [x] Inscription : formulaire email + mdp + pseudo TradingView + Stripe Customer creation, API /api/auth/signup avec overrideAccess (F4 + F7)
- [x] Connexion : email + mdp via Payload auth native, redirect conditionnel (F4)
- [x] Mot de passe oublie + reset : Payload forgotPassword/resetPassword, pages + API routes (F5)
- [x] Webhooks Stripe : /api/webhooks/stripe, raw body + signature, idempotence stripeEventId unique, 5 events (subscription.created, payment_succeeded/failed, subscription.updated/deleted) (F7)
- [x] Logique abonnement : lib/stripe/subscription-logic.ts (createTrial, activate, handleFailed, cancel, isActive), Subscription unique constraints (F7)
- [x] API /api/promo/validate : validation zod, check actif/dates/limites, pas d'increment (F8)
- [x] Helpers auth : get-user.ts, require-auth.ts, navbar Server/Client split

## Round 4 — Dashboard admin & Gestion TradingView — DONE

- [x] Dashboard admin : API /api/admin/stats (MRR, abonnes actifs/trial, acces pending), collections groupees (Subscribers/Content/Marketing) (F10)
- [x] Vue "Acces en attente" : hook afterChange detecte transition → granted, set trialActivatedAt sur Subscription, envoie email "acces accorde" (F12)
- [x] Gestion contenu : CRUD natif Payload pour Videos, Testimonials, TradeScreenshots (F11)
- [x] Gestion promos : CRUD natif Payload pour PromoCode (F8)
- [x] Notification admin : hook afterChange sur creation user → email admin avec pseudo TradingView (F10)
- [x] Utilitaire email : lib/email/send-email.ts + 2 templates (access-granted, new-subscriber-admin)

## Round 5 — Espace abonne & Emails — DONE

- [x] Page d'attente post-inscription : onboarding checklist, video placeholder, statut acces TradingView, redirect si granted (F4)
- [x] Espace personnel abonne : subscription card, TradingView status, quick links, manage billing + cancel avec AlertDialog (F6)
- [x] Integration Stripe Customer Portal : API /api/stripe/create-portal-session, mock en dev (F6)
- [x] Email bienvenue : template welcome.ts, branche dans signup route (fire-and-forget) (F9)
- [x] Email "Acces accorde" : deja fait Round 4 (hook + template access-granted.ts) (F9)
- [x] Email rappel fin essai J+5 : template trial-reminder.ts + cron /api/cron/trial-reminder securise CRON_SECRET (F9)
- [x] Email echec paiement : template payment-failed.ts, branche dans webhook handlePaymentFailed (F9)

## Round 6 — Finitions & Deploiement — DONE

- [x] SEO : OG tags sur 9 pages, sitemap.xml dynamique, robots.txt, Schema.org JSON-LD (Product + FAQ)
- [x] Analytics PostHog : provider + track-event helper + wrapping layout (skip si placeholder)
- [x] ISR : revalidate 3600 sur 6 pages publiques
- [x] Rate limiting : lib/rate-limit.ts + applique sur signup (5/IP/heure)
- [x] Responsive : mobile-first natif (Tailwind), verification manuelle a faire
- [x] Vercel Cron : /api/cron/daily-checks (escalade admin >6h + trial reminders) + vercel.json
- [x] Config deploiement : DEPLOY.md complet, .env.example avec toutes les variables, template escalation admin

## Round 7 — Systeme multilingue EN/FR — DONE

- [x] Setup next-intl : config, provider NextIntlClientProvider, i18n/request.ts avec cookie + Accept-Language
- [x] Selecteur de langue : LanguageSwitcher (drapeau + code) dans la navbar, cookie persistant
- [x] Fichiers traduction : messages/en.json + messages/fr.json (395 cles identiques, traductions naturelles)
- [x] Traduire pages publiques : 28 composants (home 9, pricing 4, videos 4, contact 3, legal 4, layout 2, SEO 2)
- [x] Traduire pages auth : 4 formulaires + 4 schemas zod + 4 pages generateMetadata
- [x] Traduire pages protegees : onboarding 3 composants + dashboard 4 composants
- [x] Traduire templates email : 4 templates bilingues (welcome, access-granted, payment-failed, trial-reminder)
- [x] Traduire metadata SEO : generateMetadata sur toutes les pages avec cles i18n
