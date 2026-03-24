---
globs: ["components/**/*.tsx", "app/**/*.tsx"]
---

# Conventions UI

- Composants shadcn/ui en priorite absolue
- Tailwind CSS pour le styling, jamais de CSS modules
- Mobile-first : mobile d'abord, adapter avec md:, lg:
- Couleurs : CSS variables du theme shadcn (--primary, --secondary...)
- Dark mode : supporter via les classes dark: de shadcn
- Icones : lucide-react
- Notifications : sonner (toast shadcn)
- Loading : Skeleton de shadcn
- Formulaires : Form shadcn + react-hook-form + zod
