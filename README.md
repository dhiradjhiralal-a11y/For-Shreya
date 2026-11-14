const screens = [...document.querySelectorAll('.screen')];
const nextButtons = document.querySelectorAll('.next-btn');
const envelopeButton = document.getElementById('envelopeButton');
const letterPaper = document.getElementById('letterPaper');
const musicPlayer = document.getElementById('musicPlayer');
const declineMessage = document.getElementById('declineMessage');
const wrongButton = document.getElementById('wrongButton');

let currentStep = 'intro';
let musicStarted = false;

function showScreen(stepName) {
  currentStep = stepName;

  screens.forEach((screen) => {
    const isActive = screen.dataset.screen === stepName;
    screen.classList.toggle('active', isActive);
  });
}

function goToNext(stepName) {
  showScreen(stepName);
}

function startMusic() {
  if (musicStarted) return;

  musicStarted = true;

  const iframe = document.createElement('iframe');
  iframe.src = "https://www.youtube.com/embed/kU1DSF-ayDA?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&loop=1&playlist=kU1DSF-ayDA";
  iframe.allow = "autoplay; encrypted-media";
  iframe.title = "Background music";
  iframe.setAttribute('allowfullscreen', 'false');
  iframe.style.width = '1px';
  iframe.style.height = '1px';
  iframe.style.border = '0';
  iframe.style.position = 'fixed';
  iframe.style.left = '-1000px';
  iframe.style.top = '-1000px';

  musicPlayer.appendChild(iframe);
}

nextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const nextStep = button.dataset.next;
    if (nextStep) {
      goToNext(nextStep);
    }
  });
});

document.querySelector('[data-action="play-audio"]').addEventListener('click', () => {
  startMusic();
  goToNext('letter');
});

document.querySelector('[data-action="skip-audio"]').addEventListener('click', () => {
  goToNext('letter');
});

envelopeButton.addEventListener('click', () => {
  envelopeButton.classList.toggle('open');
  letterPaper.classList.toggle('hidden');
});

wrongButton.addEventListener('click', () => {
  declineMessage.classList.remove('hidden');
  wrongButton.textContent = 'Try again';
  wrongButton.disabled = true;
  wrongButton.style.opacity = '0.7';
});

showScreen('intro');
