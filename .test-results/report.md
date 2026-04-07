# Test Report — Round 2 (Pages publiques)

Date: 2026-03-25
Test level: 1 + 2 (Smoke + Playwright)

## Summary

- Pages testées : 7 (/, /pricing, /videos, /contact, /legal/terms, /legal/privacy, /legal/disclaimer)
- Endpoints testés : 7
- Tests passés (Smoke Level 1) : 10/10
- Tests Playwright (Level 2) : 12/22 passés (10 strict mode violations — faux positifs du script, contenu confirmé par curl)
- Bugs réels trouvés : 1

## Detail by page

### Homepage — http://localhost:3001/

- HTTP Status: 200
- Build: OK
- Contenu "Stop Guessing": OK
- Contenu "TRUSTED BY": OK
- Contenu "Why Traders Choose": OK
- Contenu "TradingView Native": OK
- Contenu "Live Performance": OK
- Contenu "Start Trading in Minutes": OK
- Contenu "Voices of the Community": OK
- Contenu "Invest in Your Trading": OK
- Contenu "Ready to trade with confidence": OK
- Desktop: OK
- Mobile: OK
- Console errors: WARN (voir bug #1)

### Pricing — http://localhost:3001/pricing

- HTTP Status: 200
- Contenu "$49": OK
- Contenu "$349": OK
- Contenu "BEST VALUE": OK
- Contenu "Save 40%": OK
- Contenu "Frequently Asked Questions": OK
- Desktop: OK
- Mobile: OK
- Console errors: WARN (voir bug #1)

### Videos — http://localhost:3001/videos

- HTTP Status: 200
- Contenu "Videos": OK
- Contenu "Installation": OK
- Contenu "Strategy": OK
- Desktop: OK
- Mobile: OK
- Console errors: none

### Contact — http://localhost:3001/contact

- HTTP Status: 200
- Contenu "Get in Touch": OK
- Formulaire (name/email): OK
- Desktop: OK
- Mobile: OK
- Console errors: none

### Legal Terms — http://localhost:3001/legal/terms

- HTTP Status: 200
- Contenu "Terms of Service": OK
- Desktop: OK
- Console errors: none

### Legal Privacy — http://localhost:3001/legal/privacy

- HTTP Status: 200
- Contenu "Privacy Policy": OK
- Desktop: OK
- Console errors: none

### Legal Disclaimer — http://localhost:3001/legal/disclaimer

- HTTP Status: 200
- Contenu "Financial Advice" / "risk": OK
- Desktop: OK
- Console errors: none

## Structure des fichiers

- Fichiers > 150 lignes : 0 (max = 112 lignes dans contact-form.tsx)
- Composants home/ : 9 fichiers (attendu 9) — OK
- Séparation composants : OK

## Build / TypeScript

- npm run build : OK (0 erreurs)
- npx tsc --noEmit : OK (0 erreurs)

## Bugs trouvés

### Bug #1 — Erreur console Base UI Button avec render + Link

**Fichiers concernés :**

- `components/layout/navbar.tsx` lignes 48, 84
- `components/home/hero-section.tsx` lignes 30, 37
- `components/pricing/pricing-card-monthly.tsx` ligne 31
- `components/pricing/pricing-card-annual.tsx` ligne 44

**Message d'erreur :**

```
Base UI: A component that acts as a button expected a native <button> because
the `nativeButton` prop is true. Rendering a non-<button> removes native button
semantics, which can impact forms and accessibility. Use a real <button> in the
`render` prop, or set `nativeButton` to `false`.
```

**Cause :** Le composant `Button` est basé sur `@base-ui/react/button` qui attend un `<button>` natif dans `render`. Utiliser `render={<Link href="..." />}` passe un `<a>` au lieu d'un `<button>`, ce qui génère ce warning d'accessibilité.

**Impact :** Avertissement visible dans la console navigateur — pas de crash, mais problème d'accessibilité.

**Correction recommandée :** Ajouter `nativeButton={false}` à chaque `<Button render={<Link ... />}>`.

## Unresolved Errors

- Bug #1 : Warning accessibilité Base UI Button sur navbar + hero + pricing (4 fichiers)

---

# Test Report — Round 3 (Auth & Stripe)

Date: 2026-03-25
Test level: 1 + 2

## Summary

- Pages testées : 4 (/signup, /login, /forgot-password, /reset-password)
- Endpoints testés : 6 (signup, forgot-password, reset-password, webhooks/stripe, promo/validate, stripe/create-subscription)
- Tests Playwright : 9 exécutés — 5 passés, 4 avec anomalies (1 vrai bug code, 3 environnementaux)
- Bugs de code trouvés : 1 (create-subscription 500 au lieu de 401)
- Warnings : 1 (accessibilité FormField)

## Detail by page

### /signup — http://localhost:3001/signup

- HTTP Status: 200
- Build: OK
- Contenu "Create your account": OK
- Contenu "TradingView Username": OK
- Formulaire email + password: OK
- Desktop: OK
- Mobile: OK
- Navigation vers /login: OK
- Console errors: unhandledRejection Postgres (DATABASE_URL non configurée — environnemental)

### /login — http://localhost:3001/login

- HTTP Status: 200
- Contenu "Welcome back": OK
- Contenu "Sign In": OK
- Formulaire email + password: OK
- Lien "Forgot password": OK
- Desktop: OK
- Mobile: OK
- Navigation vers /forgot-password: OK
- Console errors: unhandledRejection Postgres (DATABASE_URL non configurée — environnemental)

### /forgot-password — http://localhost:3001/forgot-password

- HTTP Status: 200
- Contenu "Forgot password": OK
- Formulaire email: OK
- Bouton "Send Reset Link": OK
- Desktop: OK
- Console errors: unhandledRejection Postgres (DATABASE_URL non configurée — environnemental)

### /reset-password — http://localhost:3001/reset-password

- HTTP Status: 200
- Sans token : affiche "Invalid link" (comportement correct)
- Avec ?token=abc123 : affiche formulaire "Reset your password" avec champs password (OK)
- Desktop: OK

## Detail by endpoint

### POST /api/auth/signup

- HTTP Status: 400 (body vide invalide) — OK
- Response: JSON valide

### POST /api/auth/forgot-password

- HTTP Status: 400 (body vide invalide) — OK
- Response: JSON valide

### POST /api/auth/reset-password

- HTTP Status: 400 (body vide invalide) — OK
- Response: JSON valide

### POST /api/webhooks/stripe

- HTTP Status: 200 (Stripe non configuré — early return correct)
- Response: {"received":true} — OK

### POST /api/promo/validate

- HTTP Status: 400 (body vide invalide) — OK
- Response: JSON valide

### POST /api/stripe/create-subscription

- HTTP Status: 500 (attendu 401) — BUG
- Response: {"error":"Failed to create subscription. Please try again."}
- Cause : getPayload() crash avant le check user à cause de DATABASE_URL manquante

## Structure fichiers

| Fichier                                  | Existe | Lignes | Limite 150 |
| ---------------------------------------- | ------ | ------ | ---------- |
| lib/stripe/stripe.ts                     | OK     | 30     | OK         |
| lib/stripe/subscription-logic.ts         | OK     | 133    | OK         |
| lib/stripe/create-checkout.ts            | OK     | 62     | OK         |
| lib/stripe/webhook-handlers.ts           | OK     | 138    | OK         |
| lib/auth/get-user.ts                     | OK     | 21     | OK         |
| lib/auth/require-auth.ts                 | OK     | 17     | OK         |
| components/auth/signup-form.tsx          | OK     | 120    | OK         |
| components/auth/login-form.tsx           | OK     | 111    | OK         |
| components/auth/forgot-password-form.tsx | OK     | 113    | OK         |
| components/auth/reset-password-form.tsx  | OK     | 148    | OK         |
| components/layout/navbar.tsx             | OK     | 11     | OK         |
| components/layout/navbar-client.tsx      | OK     | 107    | OK         |

## Variables d'environnement

- .env.example contient STRIPE_SECRET_KEY : OK
- .env.example contient STRIPE_WEBHOOK_SECRET : OK
- .env.example contient RESEND_API_KEY : OK
- .env.example contient NEXT_PUBLIC_APP_URL : OK

## Contraintes UNIQUE Subscription

- collections/Subscription.ts — stripeSubscriptionId unique: true : OK
- collections/Subscription.ts — stripeEventId unique: true : OK

## Bugs trouvés — Round 3

### Bug R3-1 (A corriger) — /api/stripe/create-subscription retourne 500 au lieu de 401

**Fichier** : `app/api/stripe/create-subscription/route.ts` ligne 15
**Symptome** : POST sans auth → 500 au lieu de 401
**Cause** : `getPayload({ config })` est appelé avant tout check d'authentification. Sans DATABASE_URL, Payload lance une exception qui est interceptée par le catch global, masquant le 401 attendu.
**Impact** : En prod avec DB configurée, le comportement pourrait être correct (401). En local sans DB, retourne systématiquement 500.
**Correction suggérée** : Vérifier l'authentification via les headers avant d'appeler getPayload(), ou s'assurer que DATABASE_URL est toujours défini en dev.

### Warning R3-2 (Accessibilité) — FormField sans association label/input

**Fichier** : `components/auth/form-field.tsx` ligne 24
**Symptome** : `<Label>` sans `htmlFor`, `<Input>` sans `id`. Aucune association sémantique.
**Impact** : Lecteurs d'écran incapables d'associer label et champ. Viole WCAG 2.1 critère 1.3.1. Empêche les sélecteurs `getByLabel()` de fonctionner.
**Correction** : Ajouter `id={registration.name}` sur `<Input>` et `htmlFor={registration.name}` sur `<Label>`.

## Unresolved Errors — Round 3

- Bug R3-1 : create-subscription retourne 500 sans DB (comportement ambigu en prod)
- Warning R3-2 : FormField inaccessible — label non lié à l'input (tous les formulaires auth)
