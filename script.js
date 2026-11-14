const screens = Array.from(document.querySelectorAll('.screen'));
const nextButtons = document.querySelectorAll('.next-btn');
const envelopeButton = document.getElementById('envelopeButton');
const letterPaper = document.getElementById('letterPaper');
const musicPlayer = document.getElementById('musicPlayer');
const declineMessage = document.getElementById('declineMessage');
const wrongButton = document.getElementById('wrongButton');

// The MP3 is stored in the repository root. Keep this audio element alive
// while changing screens so the song continues across the whole experience.
const song = new Audio(
  new URL(
    'Pehla%20Nasha%20-%20Instrumental%20Pehla%20Nasha%20Pehla%20Nasha%20-%20Piano.mp3',
    document.baseURI
  ).href
);
song.loop = true;
song.preload = 'auto';
song.volume = 0.65;

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.dataset.screen === name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

nextButtons.forEach((button) => {
  button.addEventListener('click', () => showScreen(button.dataset.next));
});

document.querySelector('[data-action="play-audio"]').addEventListener('click', async () => {
  try {
    await song.play();
  } catch (error) {
    console.error('The background song could not be played:', error);
    alert('The music could not start. Please check your phone volume and try tapping Yes again.');
  }
  showScreen('letter');
});

document.querySelector('[data-action="skip-audio"]').addEventListener('click', () => {
  song.pause();
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
