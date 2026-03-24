---
name: init-payload
description: Initialize a Payload CMS project with Next.js. This skill should be used when bootstrapping a new project that uses Payload CMS (site vitrine, blog, app with managed content). It handles create-next-app, Payload installation, admin setup, and shadcn/ui initialization. Use this skill during Round 1 of /code when BRIEF.md indicates a Payload CMS project.
---

# Init Payload CMS

## Overview

Initialize a complete Payload CMS project with Next.js, including admin panel,
default admin user, and shadcn/ui. Handles the backup/restore dance required
when .project/ and BRIEF.md already exist in the directory.

## When to Use

- During Round 1 (Fondations) of `/code` when the project uses Payload CMS
- When BRIEF.md mentions CMS, site vitrine, blog, or content management
- When manually bootstrapping a new Payload project

## Core Workflow

### Step 1: Backup existing files

The project directory already contains .project/ and BRIEF.md from `/start`.
`create-next-app` refuses non-empty directories, so backup first.

```bash
bash scripts/init.sh backup
```

### Step 2: Run the init script

Execute the full initialization:

```bash
bash scripts/init.sh install
```

This runs create-next-app, installs Payload and dependencies, and sets up shadcn/ui.

### Step 3: Restore project files

```bash
bash scripts/init.sh restore
```

### Step 4: Configure Payload

After the script completes, create the configuration files manually.
Read `references/config.md` for the exact file contents and structure.

Key files to create:

- `payload.config.ts` — Main config with Users + Media collections and onInit admin hook
- `app/(payload)/layout.tsx` — Admin layout (Payload 3.76+ format)
- `app/(payload)/admin/[[...segments]]/page.tsx` — Admin page
- `app/(payload)/admin/importMap.js` — Import map
- `app/(payload)/api/[...slug]/route.ts` — API routes
- `app/(payload)/custom.scss` — Custom styles
- `next.config.ts` — With withPayload wrapper
- `tsconfig.json` — Add @payload-config alias
- `.env.local` — DATABASE_URL and PAYLOAD_SECRET

### Step 5: Verify

```bash
npm run build
npm run dev
```

Admin panel accessible at http://localhost:3000/admin
Default admin: admin@admin.com / password
