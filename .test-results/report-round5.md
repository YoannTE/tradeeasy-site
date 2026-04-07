# Test Report — Round 5 (Espace abonne & Emails)

Date: 2026-03-25
Test level: 1 + 2

## Summary

- Pages tested: 6 (/onboarding, /dashboard, /login, /signup, /pricing + mobile)
- Endpoints tested: 2 (POST /api/stripe/create-portal-session, GET /api/cron/trial-reminder)
- Tests passed: 23/24
- Errors found: 1 (mineur — 500 au lieu de 401 sur create-portal-session sans DB)

## Detail by page

### /onboarding — http://localhost:3001/onboarding

- HTTP Status: 307 -> /login (OK, protege par requireAuth)
- Build: OK (presence confirmee dans routemap Next.js)
- Desktop: OK (Playwright)
- Mobile: OK (Playwright)
- Console errors: unhandledRejection Postgres (bruit No-DB, non bloquant)
- Network errors: none

### /dashboard — http://localhost:3001/dashboard

- HTTP Status: 307 -> /login (OK, protege par requireAuth)
- Build: OK (presence confirmee dans routemap Next.js)
- Desktop: OK (Playwright)
- Mobile: OK (Playwright)
- Console errors: unhandledRejection Postgres (bruit No-DB, non bloquant)
- Network errors: none

### /login — http://localhost:3001/login

- HTTP Status: 200
- Build: OK
- Desktop: OK
- Mobile: OK (375px)
- Console errors: unhandledRejection Postgres (bruit No-DB)
- Network errors: none

### /signup — http://localhost:3001/signup

- HTTP Status: 200
- Build: OK
- Desktop: OK
- Redirect post-signup: /onboarding (confirmed by grep)
- Console errors: unhandledRejection Postgres (bruit No-DB)

### /pricing — http://localhost:3001/pricing

- HTTP Status: 200
- Build: OK
- Desktop: OK

## Detail by endpoint

### POST /api/stripe/create-portal-session

- HTTP Status: 500 (attendu: 401)
- Root cause: getPayload() plante sur ECONNREFUSED avant la verif auth
- Code logique: CORRECT (la verif auth est bien presente)
- Impact: sans DB locale, retourne 500 au lieu de 401. En prod avec DB = OK.

### GET /api/cron/trial-reminder

- HTTP Status: 401 (correct, CRON_SECRET defini dans .env.local)
- Response: {"error":"Unauthorized"} — JSON valide
- Securite: Bearer token verifie — OK
- Logique: cherche subscriptions en trial, envoie email trial-reminder — OK

## Detail des composants

### Onboarding (3/3 fichiers)

- components/onboarding/onboarding-status.tsx — 29 lignes OK
- components/onboarding/onboarding-checklist.tsx — 88 lignes OK
- components/onboarding/onboarding-video.tsx — 18 lignes OK

### Dashboard (4/4 fichiers)

- components/dashboard/subscription-card.tsx — 118 lignes OK
- components/dashboard/tradingview-status.tsx — 56 lignes OK
- components/dashboard/dashboard-links.tsx — 73 lignes OK
- components/dashboard/dashboard-actions.tsx — 91 lignes OK

### Templates email (5/5 fichiers)

- lib/email/templates/welcome.ts — 54 lignes OK
- lib/email/templates/access-granted.ts — present (Round 4)
- lib/email/templates/payment-failed.ts — 48 lignes OK
- lib/email/templates/trial-reminder.ts — 58 lignes OK
- lib/email/templates/new-subscriber-admin.ts — present (Round 4)

## Branchements email

- welcome.ts branche dans /api/auth/signup/route.ts — OK (ligne 6 import, ligne 89-90 utilisation)
- payment-failed.ts branche dans lib/stripe/webhook-handlers-extra.ts — OK (ligne 6 import, ligne 47 utilisation)

## Navigation

- login-form.tsx redirect vers /dashboard apres login — OK
- signup-form.tsx redirect vers /onboarding apres signup — OK

## Variables environnement

- .env.example contient CRON_SECRET — OK

## Unresolved Errors

1. [app/api/stripe/create-portal-session/route.ts:9] — POST retourne 500 sans DB locale
   car getPayload() lance une exception ECONNREFUSED avant la verif user.
   Contournement suggere : wrapper getPayload() dans un try/catch separe,
   retourner 503 "Service Unavailable" quand la DB est inaccessible.
   Non bloquant en production.
