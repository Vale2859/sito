const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const frameSlider = document.getElementById('frameSlider');
const slides = frameSlider ? Array.from(frameSlider.querySelectorAll('.slide')) : [];
const chatFab = document.getElementById('chatFab');
const chatWidget = document.getElementById('chatWidget');
const chatClose = document.getElementById('chatClose');
const chatIntro = document.getElementById('chatIntro');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');
const suggestions = () => Array.from(document.querySelectorAll('.suggestion'));

const botReplies = {
  '💊 Consiglio per un sintomo': 'Per sintomi comuni puoi chiedermi un primo orientamento. Per sintomi importanti o persistenti è sempre meglio contattare direttamente la farmacia o il medico.',
  '🩺 Servizi disponibili': 'Possiamo mostrare servizi come ECG, holter, consulenze, analisi e giornate dedicate. Ti basta personalizzare i testi nelle pagine interne.',
  '🎁 Promo e offerte': 'Qui puoi inserire le promo del mese, sconti attivi, marchi in evidenza e offerte stagionali.',
  '👸 Giornate Beauty': 'Puoi usare questa sezione per eventi beauty, check pelle, consulenze cosmetiche e prenotazioni.',
  '🕒 Farmacia di turno': 'Questa sezione può collegarsi alla tua pagina turni oppure a un servizio esterno con l’elenco aggiornato.'
};

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

if (slides.length > 1) {
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 3400);
}

function openChat() {
  chatWidget.classList.add('open');
  chatIntro.classList.add('hidden');
  setTimeout(() => chatInput?.focus(), 150);
}

function closeChat() {
  chatWidget.classList.remove('open');
}

if (chatFab) chatFab.addEventListener('click', openChat);
if (chatClose) chatClose.addEventListener('click', closeChat);

setTimeout(() => {
  if (chatIntro) chatIntro.classList.add('hidden');
}, 5000);

function appendMessage(text, type = 'bot') {
  const bubble = document.createElement('div');
  bubble.className = type === 'user' ? 'user-message' : 'bot-message';
  bubble.textContent = text;
  chatBody.appendChild(bubble);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function answerUser(message) {
  const normalized = message.toLowerCase();

  if (normalized.includes('turno')) {
    return 'Puoi collegare qui il link reale della farmacia di turno oppure la tua pagina turni personalizzata.';
  }
  if (normalized.includes('promo') || normalized.includes('offert')) {
    return 'Puoi aggiornare promo, offerte e volantini direttamente nella pagina Promo e nelle card della home.';
  }
  if (normalized.includes('serviz')) {
    return 'Nella pagina Servizi puoi inserire ECG, holter, autoanalisi, consulenze e prenotazioni.';
  }
  if (normalized.includes('beauty') || normalized.includes('pelle')) {
    return 'La sezione Beauty è pronta per giornate evento, check pelle e consulenze cosmetiche.';
  }
  if (normalized.includes('orari') || normalized.includes('apert')) {
    return 'Gli orari attuali inseriti nella demo sono Lun-Sab 8:30-20:00. Li puoi cambiare in pochi secondi nel file index.html.';
  }

  return 'Messaggio ricevuto. Questa è una demo pronta per GitHub Pages: se vuoi, puoi collegarla poi a un vero backend o a una chat AI.';
}

if (chatForm) {
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    appendMessage(message, 'user');
    chatInput.value = '';

    setTimeout(() => {
      appendMessage(answerUser(message), 'bot');
    }, 500);
  });
}

suggestions().forEach((button) => {
  button.addEventListener('click', () => {
    openChat();
    const label = button.textContent.trim();
    appendMessage(label, 'user');
    setTimeout(() => appendMessage(botReplies[label] || 'Questa sezione è pronta da personalizzare.', 'bot'), 400);
  });
});

// Chiusura menu mobile dopo click
Array.from(document.querySelectorAll('.mobile-menu a')).forEach((link) => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});
