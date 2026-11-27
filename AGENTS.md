# Regras do Projeto — Social Webhook Engine (`manychat-proprio`)

- **Documentação Base:** Consulte `docs/ARQUITETURA.md`, `docs/WORKFLOW-IA.md` e `ROTEIRO_MANYCHAT.md`.
- **Arquivos Principais:**
  - Servidor Express ESM: `src/server.js`
  - Painel estático: `public/index.html`
  - Teste de webhook: `test_webhook.js` (`npm test`)
- **Segurança:** Nunca gravar chaves/tokens reais em código-fonte; usar `process.env` e documentar novas variáveis em `.env.example`.
- **Verificação:** Executar `node --check src/server.js` após qualquer edição no servidor.

## Padrões de Qualidade & Engenharia (Antigravity Suite)
- **Rigor Técnico & Invariantes (Gravitas)**:
  - Grounding pré-mutação obrigatório (ler o módulo, os chamadores e configurações antes de editar).
  - Nunca fechar tarefa sem validação real (executar python -m py_compile, pytest ou teste funcional do bot/serviço).
- **Ciclo de Features & Bugs (Superpowers)**:
  - Usar systematic-debugging (reproduzir -> isolar causa raiz -> corrigir pontualmente -> testar regressão).
  - Mudanças de arquitetura devem ser precedidas por plano estruturado (writing-plans).
- **Arquitetura (Graphify)**: Grafo de dependências gerado em graphify-out/. Para rastrear rotas, imports e fluxos, consulte o grafo ou execute graphify query.
