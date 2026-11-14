const screens = Array.from(document.querySelectorAll('.screen'));
const nextButtons = document.querySelectorAll('.next-btn');
const envelopeButton = document.getElementById('envelopeButton');
const letterPaper = document.getElementById('letterPaper');
const declineMessage = document.getElementById('declineMessage');
const wrongButton = document.getElementById('wrongButton');

// Keep the uploaded MP3 playing across screen changes.
const song = new Audio(
  new URL(
    'Pehla%20Nasha%20-%20Instrumental%20Pehla%20Nasha%20Pehla%20Nasha%20-%20Piano.mp3',
    document.baseURI
  ).href
);
song.loop = true;
song.preload = 'auto';
song.volume = 0.65;

// Define the animation once in the page stylesheet so it is easy for browsers
// (including mobile browsers) to render the falling petals reliably.
const magicCss = document.createElement('style');
magicCss.textContent = `
  .rose-rain-layer{position:fixed;inset:0;z-index:9999;overflow:hidden;pointer-events:none}
  .rose-petal{position:absolute;top:-12vh;left:var(--x);font-size:var(--size);line-height:1;filter:drop-shadow(0 4px 5px rgba(80,0,20,.32));animation:rose-fall var(--time) linear var(--delay) both}
  .magic-heart-pop{position:absolute;left:var(--x);bottom:-12vh;font-size:var(--size);color:#ff4d83;text-shadow:0 0 16px #ffb1cb;animation:heart-rise var(--time) ease-out var(--delay) both}
  @keyframes rose-fall{0%{transform:translate3d(0,-5vh,0) rotate(0) scale(.7);opacity:0}8%{opacity:1}90%{opacity:1}100%{transform:translate3d(var(--drift),115vh,0) rotate(var(--spin)) scale(1.15);opacity:0}}
  @keyframes heart-rise{0%{transform:translate3d(0,0,0) scale(.3);opacity:0}15%{opacity:1}100%{transform:translate3d(var(--drift),-115vh,0) scale(1.5) rotate(25deg);opacity:0}}
  .letter-card.magic-bloom{animation:magic-bloom 1.1s ease-in-out 3}
  .envelope.magic-bounce{animation:magic-bounce .8s cubic-bezier(.2,.8,.2,1.3)}
  @keyframes magic-bloom{0%,100%{box-shadow:0 18px 40px rgba(43,18,33,.4)}50%{box-shadow:0 0 55px 16px rgba(255,87,145,.9),0 0 120px 25px rgba(255,218,139,.55)}}
  @keyframes magic-bounce{0%{transform:scale(1)}35%{transform:scale(1.2) rotate(-5deg)}70%{transform:scale(.94) rotate(3deg)}100%{transform:scale(1)}}
  @media(prefers-reduced-motion:reduce){.rose-petal,.magic-heart-pop,.letter-card.magic-bloom,.envelope.magic-bounce{animation-duration:1ms!important;animation-iteration-count:1!important}}
`;
document.head.appendChild(magicCss);

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.dataset.screen === name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function launchRomanticMagic() {
  const layer = document.createElement('div');
  layer.className = 'rose-rain-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    // Dense, staggered shower of rose petals, with a burst of hearts.
    for (let i = 0; i < 56; i += 1) {
      const petal = document.createElement('span');
      petal.className = 'rose-petal';
      petal.textContent = ['🌹', '🌸', '🌺', '💮'][i % 4];
      petal.style.setProperty('--x', `${Math.random() * 100}%`);
      petal.style.setProperty('--size', `${1.6 + Math.random() * 2.2}rem`);
      petal.style.setProperty('--time', `${3.2 + Math.random() * 2.2}s`);
      petal.style.setProperty('--delay', `${Math.random() * 1.1}s`);
      petal.style.setProperty('--drift', `${Math.random() * 220 - 110}px`);
      petal.style.setProperty('--spin', `${Math.random() * 1080 - 540}deg`);
      layer.appendChild(petal);
    }

    for (let i = 0; i < 24; i += 1) {
      const heart = document.createElement('span');
      heart.className = 'magic-heart-pop';
      heart.textContent = i % 2 ? '❤' : '♥';
      heart.style.setProperty('--x', `${Math.random() * 100}%`);
      heart.style.setProperty('--size', `${1.5 + Math.random() * 2}rem`);
      heart.style.setProperty('--time', `${2.8 + Math.random() * 1.8}s`);
      heart.style.setProperty('--delay', `${Math.random() * 0.8}s`);
      heart.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
      layer.appendChild(heart);
    }
  }

  const card = envelopeButton.closest('.card');
  card.classList.remove('magic-bloom');
  envelopeButton.classList.remove('magic-bounce');
  void card.offsetWidth;
  card.classList.add('magic-bloom');
  envelopeButton.classList.add('magic-bounce');

  window.setTimeout(() => layer.remove(), 7500);
  window.setTimeout(() => {
    card.classList.remove('magic-bloom');
    envelopeButton.classList.remove('magic-bounce');
  }, 3500);
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
  if (isOpening) launchRomanticMagic();
});

wrongButton.addEventListener('click', () => {
  declineMessage.classList.remove('hidden');
  wrongButton.textContent = 'No worries';
  wrongButton.disabled = true;
});
