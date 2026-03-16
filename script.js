const chatFab = document.getElementById('chatFab');
const chatWindow = document.getElementById('chatWindow');
const closeChat = document.getElementById('closeChat');
const chatIntro = document.getElementById('chatIntro');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');
const quickButtons = document.querySelectorAll('.quick-btn');

window.addEventListener('load', () => {
  if (window.innerWidth > 768 && chatIntro) {
    setTimeout(() => {
      chatIntro.classList.add('hide');
    }, 5000);
  }
});

function openChat() {
  chatWindow.classList.add('open');
  if (chatIntro) {
    chatIntro.classList.add('hide');
  }
}

function closeChatWindow() {
  chatWindow.classList.remove('open');
}

chatFab.addEventListener('click', openChat);
closeChat.addEventListener('click', closeChatWindow);

quickButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const link = button.getAttribute('data-link');
    if (link) {
      window.location.href = link;
    }
  });
});

function addUserMessage(text) {
  const div = document.createElement('div');
  div.className = 'user-message';
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addBotMessage(text) {
  const div = document.createElement('div');
  div.className = 'bot-message';
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes('turno') || msg.includes('farmacia di turno')) {
    return 'Ti porto subito alla sezione Farmacia di turno.';
  }

  if (msg.includes('promo') || msg.includes('offerta') || msg.includes('sconto')) {
    return 'Ti aiuto con promo e offerte. Controlla la pagina dedicata.';
  }

  if (msg.includes('beauty') || msg.includes('pelle') || msg.includes('viso')) {
    return 'Per beauty e consulenze puoi aprire la pagina dedicata.';
  }

  if (msg.includes('servizi') || msg.includes('pressione') || msg.includes('controllo')) {
    return 'Abbiamo diversi servizi disponibili in farmacia. Ti consiglio di aprire la pagina Servizi.';
  }

  if (msg.includes('orari') || msg.includes('aperti') || msg.includes('orario')) {
    return 'Siamo aperti dal lunedì al sabato, dalle 8:30 alle 20:00.';
  }

  if (msg.includes('telefono') || msg.includes('whatsapp') || msg.includes('email') || msg.includes('contatti')) {
    return 'Puoi contattarci dai pulsanti rapidi presenti nella homepage.';
  }

  return 'Grazie per il messaggio. Puoi usare i pulsanti rapidi oppure consultare le sezioni del sito per trovare subito ciò che ti serve.';
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = chatInput.value.trim();
  if (!text) return;

  addUserMessage(text);
  chatInput.value = '';

  setTimeout(() => {
    const reply = getBotReply(text);
    addBotMessage(reply);
  }, 500);
});
