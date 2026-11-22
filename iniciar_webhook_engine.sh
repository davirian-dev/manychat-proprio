#!/usr/bin/env bash
# ==============================================================================
# Iniciar Central de Webhooks & Mensagens das Redes Sociais — Davi Rian Tech
# ==============================================================================

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PATH="/home/daviemari/.gemini/antigravity/scratch/node/bin:$PATH"

cd "$DIR" || exit 1

echo "============================================================"
echo "🚀 Iniciando Social Webhook Engine na porta 3333..."
echo "============================================================"

node src/server.js
