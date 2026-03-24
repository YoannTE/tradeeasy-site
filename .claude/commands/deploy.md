Deploie l'application sur Dokploy. Domaine demande : $ARGUMENTS

Pre-requis verifies automatiquement :

- Le build passe (npm run build)
- Le code est pousse sur GitHub
- Les variables d'environnement sont definies

Detecter la configuration :

- Si medusa-config.ts existe → Medusa (2 services)
- Si lib/supabase/ existe → Supabase (frontend seul, pas de PostgreSQL Dokploy)
- Sinon → Payload CMS (1 service + PostgreSQL)

Si premier deploiement et Payload CMS ou Supabase :

1. mcp**dokploy**project-create
2. Si Payload → mcp**dokploy**postgres-create (password aleatoire securise)
   Si Supabase → skip (BDD sur Supabase Cloud)
3. mcp**dokploy**application-create
4. mcp**dokploy**application-saveGithubProvider
5. mcp**dokploy**application-saveBuildType (nixpacks)
6. mcp**dokploy**application-saveEnvironment :
   Payload → DATABASE_URL + toutes les cles
   Supabase → NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY + cles
7. mcp**dokploy**domain-create (https, letsencrypt, port 3000)
8. mcp**dokploy**application-deploy

Si premier deploiement et Medusa (2 services) :

1. mcp**dokploy**project-create
2. mcp**dokploy**postgres-create (password aleatoire securise, pour le backend Medusa)
3. Application 1 — Backend Medusa :
   a. mcp**dokploy**application-create (nom: [projet]-backend)
   b. mcp**dokploy**application-saveGithubProvider (chemin: backend/)
   c. mcp**dokploy**application-saveBuildType (nixpacks)
   d. mcp**dokploy**application-saveEnvironment :
   - DATABASE_URL (vers le postgres cree a l'etape 2)
   - MEDUSA_ADMIN_ONBOARDING_TYPE=default
   - MEDUSA_ADMIN_ONBOARDING_NEXTJS_DIRECTORY=[nom]-storefront
   - STORE_CORS=https://$ARGUMENTS
   - ADMIN_CORS=https://$ARGUMENTS
   e. mcp__dokploy__domain-create (api.$ARGUMENTS, https, letsencrypt, port 9000)
     f. mcp**dokploy**application-deploy
4. Application 2 — Storefront :
   a. mcp**dokploy**application-create (nom: [projet]-storefront)
   b. mcp**dokploy**application-saveGithubProvider (chemin: [nom]-storefront/)
   c. mcp**dokploy**application-saveBuildType (nixpacks)
   d. mcp**dokploy**application-saveEnvironment :
   - NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.$ARGUMENTS
     e. mcp**dokploy**domain-create ($ARGUMENTS, https, letsencrypt, port 8000)
     f. mcp**dokploy**application-deploy

Si deja deploye :

1. git push
2. mcp**dokploy**application-redeploy
   (Si Medusa : redeploy les 2 applications)

Affiche : URL du site, statut, rappel DNS si domaine custom.
