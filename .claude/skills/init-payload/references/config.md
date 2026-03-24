# Configuration Payload CMS — Reference

## Fichiers a creer apres l'installation

### payload.config.ts

```typescript
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    {
      slug: "users",
      auth: true,
      admin: { useAsTitle: "email" },
      fields: [],
    },
    {
      slug: "media",
      upload: {
        staticDir: "media",
        mimeTypes: ["image/*"],
      },
      fields: [{ name: "alt", type: "text", required: true }],
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "CHANGE-ME-IN-PRODUCTION",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  onInit: async (payload) => {
    const users = await payload.find({ collection: "users", limit: 1 });
    if (users.totalDocs === 0) {
      await payload.create({
        collection: "users",
        data: {
          email: "admin@admin.com",
          password: "password",
        },
      });
      payload.logger.info(
        "--- Admin par defaut cree : admin@admin.com / password ---",
      );
    }
  },
});
```

### app/(payload)/layout.tsx

IMPORTANT Payload 3.76+ : handleServerFunctions recoit `config: configPromise`
(pas `configPromise` seul) et `importMap`. RootLayout recoit aussi `importMap`.

```tsx
import type { ServerFunctionClient } from "payload";
import configPromise from "@payload-config";
import "@payloadcms/next/css";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";
import { importMap } from "./admin/importMap";
import "./custom.scss";

type Args = { children: React.ReactNode };

const serverFunctions: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout
    config={configPromise}
    importMap={importMap}
    serverFunction={serverFunctions}
  >
    {children}
  </RootLayout>
);

export default Layout;
```

### app/(payload)/admin/[[...segments]]/page.tsx

```tsx
import type { AdminViewProps } from "payload";
import { DefaultTemplate } from "@payloadcms/next/templates";
import { importMap } from "../importMap";
import configPromise from "@payload-config";

const Page = ({ params, searchParams }: AdminViewProps) => {
  return (
    <DefaultTemplate
      config={configPromise}
      importMap={importMap}
      params={params}
      searchParams={searchParams}
    />
  );
};

export default Page;
```

### app/(payload)/admin/importMap.js

```js
export const importMap = {};
```

### app/(payload)/api/[...slug]/route.ts

```typescript
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from "@payloadcms/next/routes";
import configPromise from "@payload-config";

export const GET = REST_GET(configPromise);
export const POST = REST_POST(configPromise);
export const DELETE = REST_DELETE(configPromise);
export const PATCH = REST_PATCH(configPromise);
export const PUT = REST_PUT(configPromise);
export const OPTIONS = REST_OPTIONS(configPromise);
```

### app/(payload)/custom.scss

```scss
// Custom styles for Payload admin
```

### next.config.ts

```typescript
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default withPayload(nextConfig);
```

### tsconfig.json — Ajouter l'alias

Ajouter dans `compilerOptions.paths` :

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@payload-config": ["./payload.config.ts"]
    }
  }
}
```

### .env.local

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
PAYLOAD_SECRET=your-secret-key-change-in-production
```

## Gotchas importants

- **Next.js version** : Payload 3.x requiert Next.js 15.4.x (incompatible avec 16.x)
- **Access control** : les collections publiques (menu, temoignages, pages) doivent avoir `read: () => true`
- **Admin par defaut** : le hook onInit cree admin@admin.com / password si aucun utilisateur n'existe
- **Import map** : le fichier importMap.js est requis meme s'il exporte un objet vide
- **handleServerFunctions** : depuis Payload 3.76+, il faut passer `config: configPromise` (pas juste configPromise)
- **Dossier media/** : creer le dossier media/ a la racine pour les uploads
- **Port** : le serveur demarre sur http://localhost:3000, admin sur http://localhost:3000/admin
