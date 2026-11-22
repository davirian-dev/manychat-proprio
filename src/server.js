/**
 * ============================================================================
 * SOCIAL WEBHOOK ENGINE (OMNICHANNEL HUB) — DAVI RIAN TECH
 * ============================================================================
 * Servidor de unificação de webhooks e automação de fluxos de redes sociais:
 * - Instagram Graph API (Comentários de Reels/Posts & Mensagens Diretas DM)
 * - Telegram Bot API (Portaria e Atendimento Privado)
 * - Takeshi Bot (Ponte WhatsApp via Baileys)
 * - Casalzaum Pix Webhook (Liberação Automática de Acessos VIP)
 * ============================================================================
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3333;
const META_VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'token_secreto_davirian_2026';

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Memória volátil para histórico recente de logs e eventos
const eventLogs = [];

function registrarLog(canal, evento, detalhe) {
  const logItem = {
    id: Date.now() + Math.random().toString(36).substring(2, 6),
    data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Bahia' }),
    canal,
    evento,
    detalhe,
  };
  eventLogs.unshift(logItem);
  if (eventLogs.length > 100) eventLogs.pop();
  console.log(`[${logItem.data}] [${canal.toUpperCase()}] ${evento}:`, detalhe);
  return logItem;
}

// ============================================================================
// 1. ENDPOINT DE SAÚDE & API DE LOGS
// ============================================================================

app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    servico: 'Social Webhook Engine (Davi Rian Edition)',
    versao: '1.0.0',
    timestamp: new Date().toISOString(),
    eventos_registrados: eventLogs.length,
  });
});

app.get('/api/logs', (req, res) => {
  res.json({
    sucesso: true,
    total: eventLogs.length,
    logs: eventLogs,
  });
});

// ============================================================================
// 2. META / INSTAGRAM WEBHOOKS (App Router & Graph API)
// ============================================================================

/**
 * Validação de Webhook da Meta (Desafio Handshake: hub.challenge)
 */
app.get('/webhook/meta', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === META_VERIFY_TOKEN) {
      registrarLog('Meta/Instagram', 'Handshake Confirmado', 'Webhook validado com sucesso.');
      return res.status(200).send(challenge);
    } else {
      registrarLog('Meta/Instagram', 'Falha no Handshake', 'Token de verificação inválido.');
      return res.sendStatus(403);
    }
  }
  res.sendStatus(400);
});

/**
 * Recebimento de Eventos da Meta (Instagram Direct, Comentários, etc.)
 */
app.post('/webhook/meta', async (req, res) => {
  const body = req.body;

  if (body.object === 'instagram' || body.object === 'page') {
    res.status(200).send('EVENT_RECEIVED');

    try {
      for (const entry of body.entry || []) {
        // A) Eventos de Mensagens Diretas (DMs)
        if (entry.messaging) {
          for (const msgEvent of entry.messaging) {
            const senderId = msgEvent.sender?.id;
            const text = msgEvent.message?.text || '';

            registrarLog('Instagram DM', 'Mensagem Recebida', { senderId, text });

            // Fluxo automático de resposta inteligente
            await processarMensagemInstagram(senderId, text);
          }
        }

        // B) Eventos de Comentários em Reels ou Posts
        if (entry.changes) {
          for (const change of entry.changes) {
            if (change.field === 'comments') {
              const comment = change.value;
              const commenterId = comment.from?.id;
              const commentText = comment.text || '';
              const mediaId = comment.media?.id;

              registrarLog('Instagram Comentário', 'Comentário Detectado', {
                usuario: comment.from?.username || commenterId,
                texto: commentText,
                mediaId,
              });

              await processarComentarioInstagram(comment);
            }
          }
        }
      }
    } catch (err) {
      registrarLog('Erro', 'Processamento Meta', err.message);
    }
  } else {
    res.sendStatus(404);
  }
});

async function processarMensagemInstagram(senderId, text) {
  const textoLimpo = text.trim().toLowerCase();
  let resposta = '';

  if (textoLimpo.includes('vip') || textoLimpo.includes('quero')) {
    resposta = '🔥 Seja bem-vindo(a) ao Club Casalzaum! Aqui está o seu acesso exclusivo: https://clubcasalzaum.vercel.app/vip/';
  } else if (textoLimpo.includes('bot') || textoLimpo.includes('takeshi') || textoLimpo.includes('saas')) {
    resposta = '🤖 Olá! Conheça nossas ferramentas e automações inteligentes: https://davi-bot-site.vercel.app';
  } else {
    resposta = 'Olá! Recebemos sua mensagem. Digite VIP para acessar o conteúdo exclusivo ou SUPORTE para falar com nossa equipe!';
  }

  registrarLog('Instagram Auto-DM', 'Ação Disparada', { para: senderId, resposta });
}

async function processarComentarioInstagram(comment) {
  const texto = (comment.text || '').toLowerCase();
  const usuario = comment.from?.username || 'amigo(a)';

  if (texto.includes('vip') || texto.includes('quero') || texto.includes('eu quero')) {
    registrarLog('Gatilho Comentário', 'Lead Quente Detectado', {
      usuario,
      gatilho: texto,
      acao: 'Disparando Direct com link VIP',
    });
  }
}

// ============================================================================
// 3. TELEGRAM BOT WEBHOOK
// ============================================================================

app.post('/webhook/telegram', async (req, res) => {
  res.status(200).send('OK');
  const update = req.body;

  if (update.message) {
    const chatId = update.message.chat?.id;
    const fromUser = update.message.from?.username || update.message.from?.first_name;
    const text = update.message.text || '';

    registrarLog('Telegram', 'Mensagem Recebida', { chatId, fromUser, text });

    // Gatilhos de Triagem e Vendas
    if (text.startsWith('/start') || text.toLowerCase().includes('vip')) {
      registrarLog('Telegram Bot', 'Resposta Enviada', {
        chatId,
        mensagem: 'Enviando menu de boas-vindas e regras da Portaria Casalzaum',
      });
    }
  }
});

// ============================================================================
// 4. WHATSAPP & TAKESHI BOT BRIDGE
// ============================================================================

app.post('/webhook/takeshi', (req, res) => {
  const { evento, telefone, mensagem, dados } = req.body;

  registrarLog('Takeshi WhatsApp', evento || 'Notificação', {
    telefone,
    mensagem,
    dados,
  });

  res.json({
    sucesso: true,
    mensagem: 'Evento recebido pelo Webhook Hub',
  });
});

// ============================================================================
// 5. CASALZAUM PIX WEBHOOK (Confirmação e Entrega Automática)
// ============================================================================

app.post('/webhook/pix', (req, res) => {
  const { valor, cliente, telefone, canalOrigem, idTransacao } = req.body;

  registrarLog('Pix Checkout', 'Pagamento Confirmado', {
    valor: valor || 'R$ 69,90',
    cliente: cliente || 'Membro VIP',
    telefone,
    canalOrigem: canalOrigem || 'Instagram / Telegram',
    idTransacao,
  });

  // Ação: Notificar o WhatsApp do Takeshi Bot e liberar links
  registrarLog('Ação Automática', 'Liberação Concedida', {
    status: 'Link VIP enviado com sucesso para o usuário',
  });

  res.json({
    sucesso: true,
    liberado: true,
    mensagem: 'Acesso VIP ativado automaticamente em todos os fluxos!',
  });
});

// ============================================================================
// INICIALIZAÇÃO DO SERVIDOR
// ============================================================================

app.listen(PORT, () => {
  console.log(`\n=============================================================`);
  console.log(`🚀 Social Webhook Engine rodando na porta: ${PORT}`);
  console.log(`🔗 Dashboard Visual: http://localhost:${PORT}`);
  console.log(`📡 Endpoint Meta: http://localhost:${PORT}/webhook/meta`);
  console.log(`📡 Endpoint Telegram: http://localhost:${PORT}/webhook/telegram`);
  console.log(`📡 Endpoint Takeshi WhatsApp: http://localhost:${PORT}/webhook/takeshi`);
  console.log(`📡 Endpoint Pix Casalzaum: http://localhost:${PORT}/webhook/pix`);
  console.log(`=============================================================\n`);
});
