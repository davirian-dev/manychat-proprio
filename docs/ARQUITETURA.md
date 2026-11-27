# Social Webhook Engine (ManyChat Próprio) — Arquitetura & Documentação

> Documento em Markdown (compatível com Obsidian e agentes de IA).

## 1. Visão Geral
- **Nome:** `social-webhook-engine` (`manychat-proprio`)
- **Descrição:** Hub e Engine unificado de webhooks das redes sociais (Instagram Graph API, WhatsApp Takeshi Bot, Telegram Bot API e Casalzaum Pix Webhook).
- **Stack:** Node.js (ESM), Express (`^4.21.2`), `cors`, `dotenv`.

## 2. Estrutura do Projeto
- `src/server.js`: Servidor Express (porta padrão `3333` / `PORT`), verificação Meta (`META_VERIFY_TOKEN`), recebimento de webhooks e logs recentes (`eventLogs`).
- `public/index.html`: Interface/painel web servido como estático pelo Express.
- `test_webhook.js`: Script de teste local (`npm test`).
- `ROTEIRO_MANYCHAT.md`: Passo a passo de configuração no Meta for Developers e fluxos de DM.
- `.env.example` e `iniciar_webhook_engine.sh`.

## 3. Regras para IA
1. **Segurança de Tokens:** Nunca commitar segredos de `.env`; novos tokens devem constar apenas em `.env.example`.
2. **Contratos de Webhook:** Preservar compatibilidade com as rotas e payloads esperados por Instagram Graph API, Telegram e Pix Webhook em `src/server.js`.
3. **Verificação Obrigatória:** Rodar `node --check src/server.js` e `npm test` (ou validar rotas com servidor local) após alterações.
