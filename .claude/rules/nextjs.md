---
globs:
  [
    "app/**/*.tsx",
    "app/**/*.ts",
    "components/**/*.tsx",
    "lib/**/*.ts",
    "lib/**/*.tsx",
  ]
---

# Conventions Next.js

- App Router uniquement (jamais Pages Router)
- Server Components par defaut, "use client" seulement si necessaire
- Metadata dans chaque page.tsx (title, description)
- Server Actions pour les mutations simples
- Route Handlers (app/api/) pour webhooks et endpoints complexes
- Images via next/image, liens via next/link
- Redirections via redirect() de next/navigation
- Charger les donnees Payload avec `getPayload()` dans les Server Components
