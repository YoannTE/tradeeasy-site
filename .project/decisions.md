# Decisions — SimplifyPro

## 2026-04-08 — Trois axes de mise en avant prioritaires

L'utilisateur souhaite mettre en avant beaucoup plus fortement ces 3 points sur le site :

1. **Signaux en temps réel (non-repaint)** : les signaux d'achat/vente apparaissent en Live et ne changent jamais après coup. C'est un différenciateur majeur par rapport aux indicateurs qui "repeignent" (modifient les signaux passés pour paraître plus précis). Cela rend l'indicateur fiable et puissant pour du trading réel.

2. **Notifications TradingView (alertes)** : il est possible de configurer des alertes TradingView pour recevoir une notification à chaque signal (achat ou vente) sur son téléphone, PC, ou même par email. L'utilisateur n'a pas besoin de rester devant son écran.

3. **Programme d'affiliation** : les utilisateurs peuvent partager le service et gagner une commission récurrente. C'est un levier de croissance par le bouche-à-oreilles qui doit être mis en avant de manière visible sur le site.

Ces 3 points doivent être reflétés dans : la page d'accueil (hero, features), la page pricing, et potentiellement une page dédiée à l'indicateur (Phase 2 - F17).

## 2026-04-07 — Paiement Stripe Checkout

- Utilisation de Stripe Checkout (page hébergée) plutôt que Stripe Elements (formulaire custom)
- Essai 7 jours avec CB collectée à l'inscription
- Webhook checkout.session.completed crée l'abonnement dans Payload
- Domaine email : simplify-pro.com (avec tiret)
