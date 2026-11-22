# 🌐 Social Webhook Engine — Central Unificada de Redes Sociais

Motor unificado de **Webhooks e Automação de Mensagens** para redes sociais, desenvolvido sob medida para o ecossistema Davi Rian (Instagram, WhatsApp Takeshi Bot, Telegram Portaria e Checkout Pix Casalzaum).

---

## 🏆 Os Melhores Repositórios do GitHub Avaliados

1. **[Zernio Unified Inbox](https://github.com/zernio-dev/unified-inbox)** (Clonado localmente em `scratch/unified-inbox`):
   - Inbox unificado em Next.js para WhatsApp, Instagram, Messenger, Telegram, X, Reddit e Bluesky.
2. **[Chatwoot](https://github.com/chatwoot/chatwoot)**:
   - A plataforma open-source líder mundial para atendimento omnicanal (Instagram, WhatsApp, Telegram, Facebook e Webhooks).
3. **[Evolution API](https://github.com/evolution-foundation/evolution-api)**:
   - A maior API open-source de WhatsApp do Brasil, especializada em disparar e receber webhooks de eventos para múltiplos bots.
4. **[Typebot](https://github.com/baptisteArno/typebot.io)**:
   - Construtor visual de fluxos conversacionais que se conecta com qualquer webhook.

---

## ⚡ O Que Foi Instalado & Implementado Aqui

Neste projeto (`manychat-proprio`), foi implementado um **Webhook Router em Node.js com Express** 100% autoral, leve e sem custo de mensalidade:

- 📸 **Meta / Instagram (`/webhook/meta`)**:
  - `GET`: Validação do Handshake da Meta (`hub.challenge` e `hub.verify_token`).
  - `POST`: Detecta comentários em Reels e Posts (palavras-chave como "VIP", "QUERO") e mensagens no Direct (DM).
- 💬 **Takeshi Bot Bridge (`/webhook/takeshi`)**:
  - Comunicação com a engine Baileys do WhatsApp local.
- ✈️ **Telegram (`/webhook/telegram`)**:
  - Recepção de mensagens da Portaria e privados com respostas automáticas.
- 💰 **Casalzaum Pix Checkout (`/webhook/pix`)**:
  - Liberação automática de acesso VIP assim que o pagamento é identificado.
- 🖥️ **Painel Visual em Tempo Real (`http://localhost:3333`)**:
  - Interface moderna para acompanhar todos os webhooks disparados.

---

## 🚀 Como Iniciar

Execute o script:
```bash
./iniciar_webhook_engine.sh
```

Ou via npm:
```bash
npm start
```

Para rodar os testes simulando todos os canais:
```bash
npm test
```
