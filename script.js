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

// A YouTube embed may show video and its playback controls. The audio-only
// playback URL is used here, and playback begins directly from the user's tap.
document.querySelector('[data-action="play-audio"]').addEventListener('click', () => {
  if (!musicPlayer.querySelector('audio')) {
    const audio = document.createElement('audio');
    audio.src = 'https://www.youtube.com/watch?v=kU1DSF-ayDA';
    audio.controls = false;
    audio.loop = true;
    audio.autoplay = true;
    audio.preload = 'auto';
    musicPlayer.appendChild(audio);
    audio.play().catch(() => {
      // Browsers may prevent remote media playback; show an explicit audio control.
      audio.controls = true;
      audio.play().catch(() => {});
    });
  } else {
    musicPlayer.querySelector('audio').play().catch(() => {});
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
