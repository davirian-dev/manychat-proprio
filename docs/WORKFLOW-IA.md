# Workflow de Desenvolvimento com IA — ManyChat Próprio

1. **Contexto:** Consulte `docs/ARQUITETURA.md` e `ROTEIRO_MANYCHAT.md` antes de adicionar novos gatilhos ou canais em `src/server.js`.
2. **Prompts Atômicos:** Peça por canal/rota específica mantendo o padrão de log (`registrarLog`) e leitura de `process.env`.
3. **Validação:** Execute `node --check src/server.js` e `node --check test_webhook.js` após alterações.
