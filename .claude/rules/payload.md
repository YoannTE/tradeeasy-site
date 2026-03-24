---
globs:
  [
    "collections/**/*",
    "payload.config.ts",
    "globals/**/*",
    "blocks/**/*",
    "app/(payload)/**/*",
  ]
---

# Conventions Payload CMS

- **Version** : Payload 3.x requiert Next.js 15.4.x (incompatible avec 16.x)
- Collections dans collections/ (un fichier par collection)
- Configuration centralisee dans payload.config.ts
- Nommage collections : PascalCase singulier (User, Page, BlogPost)
- Access control defini pour chaque collection (read, create, update, delete)
- **Collections publiques** (menu, temoignages, pages, blog) : `read: () => true`
  sinon les donnees ne sont pas accessibles cote frontend
- Hooks (beforeChange, afterChange) pour la logique metier
- Collection Media pour les uploads
- Globals pour les donnees uniques (settings, navigation, footer)
- Admin panel : necessite les fichiers dans app/(payload)/ :
  - `app/(payload)/layout.tsx` (IMPORTANT Payload 3.76+ : handleServerFunctions recoit
    `config: configPromise` + `importMap`, RootLayout recoit aussi `importMap`)
  - `app/(payload)/admin/[[...segments]]/page.tsx`
  - `app/(payload)/admin/importMap.js`
  - `app/(payload)/api/[...slug]/route.ts`
  - `app/(payload)/custom.scss`
- next.config.ts doit utiliser `withPayload` de `@payloadcms/next/withPayload`
- tsconfig.json doit inclure l'alias `@payload-config` pointant vers payload.config.ts
- **Admin par defaut** : toujours ajouter un hook `onInit` dans payload.config.ts
  qui cree un admin `admin@admin.com` / `password` si aucun utilisateur n'existe.
  En production, changer ces identifiants apres le premier deploiement.
