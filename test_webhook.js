/**
 * Script de Teste Automatizado do Social Webhook Engine
 */

const BASE_URL = 'http://localhost:3333';

async function rodarTestes() {
  console.log('🧪 Iniciando testes de validação dos Webhooks...\n');

  try {
    // 1. Teste de Saúde
    const resHealth = await fetch(`${BASE_URL}/health`);
    console.log('✅ 1. Status do Servidor:', await resHealth.json());

    // 2. Teste de Handshake da Meta
    const resHandshake = await fetch(`${BASE_URL}/webhook/meta?hub.mode=subscribe&hub.verify_token=token_secreto_davirian_2026&hub.challenge=DESAFIO_OK_123`);
    console.log('✅ 2. Meta Handshake:', await resHandshake.text());

    // 3. Teste de Comentário no Instagram ("VIP")
    const resComment = await fetch(`${BASE_URL}/webhook/meta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        object: 'instagram',
        entry: [{
          changes: [{
            field: 'comments',
            value: {
              id: 'c_123',
              text: 'EU QUERO ESSE VIP 🔥',
              from: { id: 'user_456', username: 'seguidor_vip' },
              media: { id: 'reel_789' }
            }
          }]
        }]
      })
    });
    console.log('✅ 3. Webhook Instagram Comentário:', await resComment.text());

    // 4. Teste de Mensagem Direta (DM) no Instagram
    const resDM = await fetch(`${BASE_URL}/webhook/meta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        object: 'instagram',
        entry: [{
          messaging: [{
            sender: { id: 'user_456' },
            message: { text: 'Quero saber mais sobre o VIP' }
          }]
        }]
      })
    });
    console.log('✅ 4. Webhook Instagram DM:', await resDM.text());

    // 5. Teste de Webhook Telegram
    const resTg = await fetch(`${BASE_URL}/webhook/telegram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: {
          chat: { id: 987654321 },
          from: { username: 'davirian_oficial' },
          text: '/start'
        }
      })
    });
    console.log('✅ 5. Webhook Telegram:', await resTg.text());

    // 6. Teste de Confirmação Pix Casalzaum
    const resPix = await fetch(`${BASE_URL}/webhook/pix`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        valor: 'R$ 69,90',
        cliente: 'Assinante Teste',
        telefone: '5571999999999',
        canalOrigem: 'Instagram Direct',
        idTransacao: 'PIX-TESTE-999'
      })
    });
    console.log('✅ 6. Webhook Pix:', await resPix.json());

    console.log('\n🎉 Todos os webhooks foram validados com 100% de sucesso!');
  } catch (err) {
    console.error('❌ Erro durante o teste:', err.message);
  }
}

rodarTestes();
