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

// Envelope-opening spectacle: falling roses, swirling hearts, sparkles, and a glow.
const magicStyles = document.createElement('style');
magicStyles.textContent = `
  .magic-overlay{position:fixed;inset:0;z-index:20;overflow:hidden;pointer-events:none;}
  .magic-rose,.magic-heart,.magic-sparkle{position:absolute;top:-12vh;left:var(--left);opacity:0;will-change:transform,opacity;}
  .magic-rose{font-size:var(--size);filter:drop-shadow(0 5px 8px rgba(80,0,20,.28));animation:roseCascade var(--duration) cubic-bezier(.2,.65,.3,1) var(--delay) forwards;}
  .magic-heart{font-size:var(--size);color:#ff477e;text-shadow:0 0 16px #ffc1d5;animation:heartDrift var(--duration) ease-out var(--delay) forwards;}
  .magic-sparkle{font-size:var(--size);color:#fff3b0;text-shadow:0 0 14px #ffe58c;animation:sparkleDrift var(--duration) ease-out var(--delay) forwards;}
  @keyframes roseCascade{0%{opacity:0;transform:translate3d(0,-5vh,0) rotate(0) scale(.5)}8%{opacity:1}72%{opacity:1}100%{opacity:0;transform:translate3d(var(--sway),115vh,0) rotate(var(--spin)) scale(1.15)}}
  @keyframes heartDrift{0%{opacity:0;transform:translate3d(0,0,0) scale(.3) rotate(-20deg)}15%{opacity:1}100%{opacity:0;transform:translate3d(var(--sway),-85vh,0) scale(1.5) rotate(25deg)}}
  @keyframes sparkleDrift{0%{opacity:0;transform:scale(.2) rotate(0)}25%{opacity:1}75%{opacity:1}100%{opacity:0;transform:translate3d(var(--sway),65vh,0) scale(1.4) rotate(180deg)}}
  .letter-card.magic-glow{animation:loveGlow 1.8s ease-in-out 2;}
  .envelope.magic-pop{animation:envelopePop .75s cubic-bezier(.18,.89,.32,1.28);}
  @keyframes loveGlow{0%,100%{box-shadow:0 18px 40px rgba(43,18,33,.4)}35%{box-shadow:0 0 45px 12px rgba(255,111,157,.78),0 0 100px 25px rgba(255,209,127,.35)}}
  @keyframes envelopePop{0%{transform:scale(1)}35%{transform:scale(1.16) rotate(-3deg)}70%{transform:scale(.96) rotate(2deg)}100%{transform:scale(1)}}
  @media(prefers-reduced-motion:reduce){.magic-rose,.magic-heart,.magic-sparkle,.letter-card.magic-glow,.envelope.magic-pop{animation-duration:.01ms!important;animation-iteration-count:1!important}}
`;
document.head.appendChild(magicStyles);

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.dataset.screen === name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function makeMagic() {
  const overlay = document.createElement('div');
  overlay.className = 'magic-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    for (let i = 0; i < 34; i += 1) {
      const rose = document.createElement('span');
      rose.className = 'magic-rose';
      rose.textContent = i % 4 === 0 ? '🌹' : '🌸';
      rose.style.setProperty('--left', `${Math.random() * 100}%`);
      rose.style.setProperty('--size', `${1.2 + Math.random() * 1.6}rem`);
      rose.style.setProperty('--duration', `${3.8 + Math.random() * 3}s`);
      rose.style.setProperty('--delay', `${Math.random() * 1.8}s`);
      rose.style.setProperty('--sway', `${Math.random() * 220 - 110}px`);
      rose.style.setProperty('--spin', `${Math.random() * 900 - 450}deg`);
      overlay.appendChild(rose);
    }

    for (let i = 0; i < 18; i += 1) {
      const heart = document.createElement('span');
      heart.className = 'magic-heart';
      heart.textContent = i % 2 ? '♥' : '❤';
      heart.style.setProperty('--left', `${Math.random() * 100}%`);
      heart.style.setProperty('--size', `${1 + Math.random() * 1.8}rem`);
      heart.style.setProperty('--duration', `${2.8 + Math.random() * 2.2}s`);
      heart.style.setProperty('--delay', `${Math.random() * 1.2}s`);
      heart.style.setProperty('--sway', `${Math.random() * 180 - 90}px`);
      overlay.appendChild(heart);
    }

    for (let i = 0; i < 24; i += 1) {
      const sparkle = document.createElement('span');
      sparkle.className = 'magic-sparkle';
      sparkle.textContent = i % 2 ? '✦' : '✨';
      sparkle.style.setProperty('--left', `${Math.random() * 100}%`);
      sparkle.style.setProperty('--size', `${0.8 + Math.random() * 1.4}rem`);
      sparkle.style.setProperty('--duration', `${2.2 + Math.random() * 2}s`);
      sparkle.style.setProperty('--delay', `${Math.random() * 1.5}s`);
      sparkle.style.setProperty('--sway', `${Math.random() * 140 - 70}px`);
      overlay.appendChild(sparkle);
    }
  }

  const card = envelopeButton.closest('.card');
  card.classList.remove('magic-glow');
  envelopeButton.classList.remove('magic-pop');
  // Restart the short glow/pop animations when the effect is triggered again.
  void card.offsetWidth;
  card.classList.add('magic-glow');
  envelopeButton.classList.add('magic-pop');

  window.setTimeout(() => overlay.remove(), 7500);
  window.setTimeout(() => {
    card.classList.remove('magic-glow');
    envelopeButton.classList.remove('magic-pop');
  }, 4000);
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
  if (isOpening) makeMagic();
});

wrongButton.addEventListener('click', () => {
  declineMessage.classList.remove('hidden');
  wrongButton.textContent = 'No worries';
  wrongButton.disabled = true;
});
