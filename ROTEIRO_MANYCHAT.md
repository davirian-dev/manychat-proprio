# Roteiro: Automação Própria do Instagram (Substituto ManyChat)

Baseado no método oficial via Meta Graph API (App Router, Supabase, Vercel e Webhooks do Instagram).

## O que este sistema faz:
1. **Gatilho de Comentário:** Monitora quando alguém comenta uma palavra-chave (ex: "VIP", "QUERO", "CUPOM") em qualquer Reel ou Post.
2. **Disparo no Direct:** Envia instantaneamente uma mensagem privada via DM com um botão interativo.
3. **Verificação de Seguidor (Growth):** 
   - Se a pessoa já segue seu perfil -> Envia o link direto do material / grupo VIP.
   - Se a pessoa ainda não segue -> Solicita que siga a página para desbloquear o link.
4. **Follow-up Automático:** Se a pessoa não abriu o link após determinado tempo (ex: 5 minutos ou 24h), manda um lembrete no Direct.
5. **Custo:** R$ 0,00 de mensalidade (Roda dentro das cotas gratuitas do Supabase, Vercel e Meta Developers).

---

## Passo a Passo para Configuração:

### Etapa 1. Meta for Developers (developers.facebook.com)
1. Acesse com a conta do Facebook que administra seu Instagram Comercial/Criador.
2. Crie um app:
   - Tipo de caso de uso: **Gerenciamento de conteúdo** -> **Gerenciar mensagens e conteúdo no Instagram**.
   - Defina o nome do aplicativo (ex: `DaviBot-Instagram`).

### Etapa 2. Configurar Testador e Permissões
1. No menu do app, acesse **Funções** -> **Funções**.
2. Adicione seu Instagram como **Testador do Instagram**.
3. No celular (no Instagram), vá em: *Configurações > Ferramentas para Criadores/Empresas > Solicitações de Testador do App* e **Aceite o convite**.

### Etapa 3. Banco de Dados e Backend
1. **Supabase:** Projeto Postgres gratuito para salvar as palavras-chave, logs de comentários e status de envio.
2. **Next.js na Vercel:** Hospeda os webhooks que recebem as notificações em tempo real da Meta.

### Etapa 4. Conectar Webhooks na Meta
1. Callback URL: `https://seu-app.vercel.app/api/webhook`
2. Campos assinados:
   - `comments` (detecta comentários)
   - `messages` (gerencia DMs)
   - `messaging_postbacks` (detecta cliques nos botões da DM)
3. Mudar o aplicativo de "Modo de Desenvolvimento" para **Publicado / Em produção**.
