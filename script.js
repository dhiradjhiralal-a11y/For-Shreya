const screens = Array.from(document.querySelectorAll('.screen'));
const nextButtons = document.querySelectorAll('.next-btn');
const envelopeButton = document.getElementById('envelopeButton');
const letterPaper = document.getElementById('letterPaper');
const musicPlayer = document.getElementById('musicPlayer');
const declineMessage = document.getElementById('declineMessage');
const wrongButton = document.getElementById('wrongButton');

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.dataset.screen === name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

nextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showScreen(button.dataset.next);
  });
});

document.querySelector('[data-action="play-audio"]').addEventListener('click', () => {
  if (!musicPlayer.querySelector('iframe')) {
    const player = document.createElement('iframe');
    player.src = 'https://www.youtube-nocookie.com/embed/kU1DSF-ayDA?autoplay=1&controls=0&loop=1&playlist=kU1DSF-ayDA';
    player.title = 'Background music';
    player.allow = 'autoplay; encrypted-media';
    player.style.cssText = 'position:fixed;width:1px;height:1px;left:-10px;bottom:-10px;border:0';
    musicPlayer.appendChild(player);
  }
  showScreen('letter');
});

document.querySelector('[data-action="skip-audio"]').addEventListener('click', () => {
  showScreen('letter');
});

envelopeButton.addEventListener('click', () => {
  const isOpening = letterPaper.classList.contains('hidden');
  letterPaper.classList.toggle('hidden');
  envelopeButton.classList.toggle('open', isOpening);
  envelopeButton.setAttribute('aria-expanded', String(isOpening));
});

wrongButton.addEventListener('click', () => {
  declineMessage.classList.remove('hidden');
  wrongButton.textContent = 'No worries';
  wrongButton.disabled = true;
});
