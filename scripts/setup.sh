#!/bin/bash
echo "Setting up Brainigen for development..."
pnpm install
cp .env.example .env.local
echo "✅ Setup complete. Please configure .env.local and run 'pnpm run dev'."
