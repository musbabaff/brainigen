#!/bin/bash
set -e
VERSION_TYPE=${1:-patch}

echo "🚀 Deploying Brainigen..."

# Check clean working directory
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Commit your changes first"; exit 1
fi

# Pull, test, build
git pull origin main
pnpm run lint
pnpm run type-check
pnpm run build

# Bump version + tag + push
pnpm version $VERSION_TYPE -m "chore: release v%s"
git push origin main --follow-tags

NEW_VERSION=$(node -p "require('./package.json').version")
echo "✅ Deployed v$NEW_VERSION — Vercel is building at https://vercel.com/musbabaff/brainigen"
