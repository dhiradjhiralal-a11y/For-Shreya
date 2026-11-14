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
  button.addEventListener('click', () => showScreen(button.dataset.next));
});

document.querySelector('[data-action="play-audio"]').addEventListener('click', () => {
  if (!musicPlayer.querySelector('iframe')) {
    const player = document.createElement('iframe');
    player.src = 'https://www.youtube-nocookie.com/embed/kU1DSF-ayDA?autoplay=1&controls=1&playsinline=1&loop=1&playlist=kU1DSF-ayDA';
    player.title = 'Background music — tap play if it does not start automatically';
    player.allow = 'autoplay; encrypted-media; picture-in-picture';
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    player.allowFullscreen = true;
    musicPlayer.appendChild(player);
  }
  musicPlayer.classList.add('visible');
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
