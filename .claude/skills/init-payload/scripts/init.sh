#!/usr/bin/env bash
# ----------------------------------------------------------
# Init Payload CMS project
# Usage:
#   bash init.sh backup    — Sauvegarde les fichiers existants
#   bash init.sh install   — Lance create-next-app + installe Payload
#   bash init.sh restore   — Restaure les fichiers sauvegardes
#   bash init.sh all       — Execute backup + install + restore
# ----------------------------------------------------------
set -e

BACKUP_DIR="/tmp/project-backup-$$"

backup() {
  echo "=== Sauvegarde des fichiers existants ==="
  mkdir -p "$BACKUP_DIR"
  for f in .project BRIEF.md .env.example .gitignore README.md .claude; do
    if [ -e "$f" ]; then
      cp -r "$f" "$BACKUP_DIR/"
      echo "  Sauvegarde: $f"
    fi
  done
  # Nettoyer pour que create-next-app accepte le dossier
  rm -rf .project BRIEF.md .env.example README.md
  # Garder .gitignore seulement s'il est vide ou minimal
  echo "=== Dossier pret pour create-next-app ==="
}

install() {
  echo "=== Creation du projet Next.js ==="
  npx create-next-app@latest . \
    --ts --tailwind --eslint --app \
    --no-src-dir --import-alias="@/*" --yes

  echo ""
  echo "=== Installation de Next.js 15.4.x (requis par Payload 3.x) ==="
  npm install next@15.4 react@19 react-dom@19

  echo ""
  echo "=== Installation de Payload CMS ==="
  npm install payload @payloadcms/db-postgres @payloadcms/richtext-lexical @payloadcms/next sharp

  echo ""
  echo "=== Installation de shadcn/ui ==="
  npx shadcn@latest init --defaults

  echo ""
  echo "=== Installation terminee ==="
  echo "Prochaine etape : creer les fichiers de configuration (voir references/config.md)"
}

restore() {
  echo "=== Restauration des fichiers sauvegardes ==="
  if [ -d "$BACKUP_DIR" ]; then
    cp -r "$BACKUP_DIR"/.project . 2>/dev/null || true
    cp "$BACKUP_DIR"/BRIEF.md . 2>/dev/null || true
    cp "$BACKUP_DIR"/.env.example . 2>/dev/null || true
    cp -r "$BACKUP_DIR"/.claude . 2>/dev/null || true
    rm -rf "$BACKUP_DIR"
    echo "=== Fichiers restaures ==="
  else
    echo "Pas de sauvegarde trouvee dans $BACKUP_DIR"
  fi
}

case "${1:-all}" in
  backup)  backup ;;
  install) install ;;
  restore) restore ;;
  all)     backup && install && restore ;;
  *)       echo "Usage: bash init.sh [backup|install|restore|all]" ;;
esac
