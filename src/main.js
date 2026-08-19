const states = [
  { title: 'The surprise starts here', duration: 3950, kind: 'opening', label: 'Opening reaction' },
  { title: 'Happy Birthday, Aanya Sharma', duration: 1450, kind: 'intro', label: 'The invitation' },
  { title: 'Pop all 4 balloons', duration: 1700, kind: 'balloons', label: 'A tiny game' },
  { title: 'You', duration: 800, kind: 'pop', balloon: 'blue', word: 'You', label: 'First reveal' },
  { title: 'You are', duration: 1000, kind: 'pop', balloon: 'pink', word: 'are', label: 'Second reveal' },
  { title: 'You are so', duration: 700, kind: 'pop', balloon: 'green', word: 'so', label: 'Third reveal' },
  { title: 'You are so special', duration: 900, kind: 'pop', balloon: 'violet', word: 'special', label: 'Final reveal' },
  { title: 'You are so special', duration: 1650, kind: 'phrase', label: 'Let it land' },
  { title: 'Blow the candle, Aanya Sharma', duration: 2050, kind: 'cake', label: 'Make a wish' },
  { title: 'Close your eyes & make a wish', duration: 1900, kind: 'wish', label: 'Wish made' },
  { title: 'Your Rose Bouquet', duration: 3300, kind: 'bouquet', label: 'A bouquet for you' },
  { title: 'Some Sweet Moments', duration: 1000, kind: 'gallery', card: 0, label: 'Memory lane' },
  { title: 'Celebrating you', duration: 600, kind: 'gallery', card: 1, label: 'Memory one' },
  { title: 'Make a wish', duration: 1200, kind: 'gallery', card: 2, label: 'Memory two' },
  { title: 'Happy Birthday', duration: 1000, kind: 'gallery', card: 3, label: 'Memory three' },
  { title: 'Keep these close', duration: 1000, kind: 'gallery', card: 4, label: 'Memory four' },
  { title: 'A Message From My Heart', duration: 1600, kind: 'envelope', label: 'A personal note' },
  { title: 'For the girl who makes life brighter', duration: 9300, kind: 'letter', label: 'The letter' },
  { title: 'One Last Thing...', duration: 2300, kind: 'gift', label: 'One last thing' },
  { title: 'Lots of love for you', duration: 3700, kind: 'celebration', label: 'The celebration' },
  { title: 'Made with love', duration: 4313, kind: 'outro', label: 'The final frame' }
];

const app = document.querySelector('#app');
let current = 0;
let playing = false;
let timer;
let burst = false;

const icon = (name) => ({ play: '&#9654;', pause: '&#10074;&#10074;', prev: '&#8592;', next: '&#8594;', download: '&#8681;' })[name];

function render() {
  const state = states[current];
  const progress = ((current + 1) / states.length) * 100;
  app.innerHTML = `
    <main class="reel-shell ${state.kind}">
      <div class="grain"></div>
      <header class="topbar">
        <div class="brand-mark"><span class="brand-dot"></span> HEARTCRAFT <small>birthday edition</small></div>
        <div class="topbar-actions"><button class="download-button" data-action="download" aria-label="Download this surprise" title="Download this surprise">${icon('download')}</button><div class="state-count">${String(current + 1).padStart(2, '0')} <span>/ ${String(states.length).padStart(2, '0')}</span></div></div>
      </header>
      <section class="reel-stage" aria-live="polite">
        <div class="ambient ambient-one"></div><div class="ambient ambient-two"></div>
        ${scene(state)}
      </section>
      <footer class="controls">
        <div class="progress-track"><span style="width:${progress}%"></span></div>
        <div class="control-row">
          <button class="icon-button" data-action="prev" aria-label="Previous state" title="Previous">${icon('prev')}</button>
          <button class="play-button" data-action="play" aria-label="${playing ? 'Pause' : 'Play'}">${icon(playing ? 'pause' : 'play')} <span>${playing ? 'PAUSE' : 'PLAY SEQUENCE'}</span></button>
          <button class="icon-button" data-action="next" aria-label="Next state" title="Next">${icon('next')}</button>
        </div>
        <div class="sequence-note"><span>${state.label}</span><span>${(state.duration / 1000).toFixed(3)} sec</span></div>
      </footer>
    </main>`;
  bindEvents();
}

function scene(state) {
  if (state.kind === 'opening') return `<div class="opening-scene"><div class="sunset-window"></div><div class="portrait-frame"><div class="portrait-face"><span class="hair"></span><span class="eye eye-left"></span><span class="eye eye-right"></span><span class="nose-ring"></span><span class="smile"></span></div><div class="portrait-body"><span class="bow"></span><span class="bracelet"></span></div></div><div class="hook-copy"><span>look what my</span><strong>boyfriend sent me</strong><span>for my birthday</span></div><div class="handwritten">stay with me...</div></div>`;
  if (state.kind === 'intro') return `<div class="page-card intro-card"><div class="tiny-eyebrow">A little digital surprise</div><h1>Happy Birthday,<br><em>Aanya Sharma</em></h1><div class="mini-cake">&#127874;</div><p>Are you excited for what's next?</p><div class="button-pair"><button class="soft-button">Yes, I am</button><button class="plain-button">Maybe...</button></div><div class="cursor">&#8599;</div></div>`;
  if (['balloons', 'pop', 'phrase'].includes(state.kind)) return balloonScene(state);
  if (state.kind === 'cake' || state.kind === 'wish') return `<div class="page-card cake-card"><div class="tiny-eyebrow">A wish for your new year</div><h2>${state.title}</h2><div class="cake-illustration"><div class="flame ${state.kind === 'wish' ? 'blown' : ''}"></div><div class="candle"></div><div class="frosting"></div><div class="cake-base"><i></i><i></i><i></i></div></div><p>${state.kind === 'wish' ? 'Close your eyes. The best things are already on their way.' : 'Tap to blow the candle'}</p><button class="soft-button">${state.kind === 'wish' ? 'Make a wish' : 'Blow the candle'}</button>${state.kind === 'cake' ? '<div class="cursor">&#8599;</div>' : ''}</div>`;
  if (state.kind === 'bouquet') return `<div class="page-card bouquet-card"><div class="tiny-eyebrow">A little something beautiful</div><h2>${state.title} <span class="rose-symbol">rose</span></h2><div class="bouquet"><span class="rose r1"></span><span class="rose r2"></span><span class="rose r3"></span><span class="rose r4"></span><span class="rose r5"></span><div class="wrap"></div><div class="ribbon"></div></div><button class="soft-button">Continue <span>&#8594;</span></button></div>`;
  if (state.kind === 'gallery') return galleryScene(state);
  if (state.kind === 'envelope') return `<div class="page-card envelope-card"><div class="tiny-eyebrow">Something I wanted to say</div><h2>A Message<br><em>From My Heart</em></h2><div class="envelope"><div class="envelope-flap"></div><div class="seal">love</div></div><button class="soft-button">Tap to open</button><div class="cursor">&#8599;</div></div>`;
  if (state.kind === 'letter') return `<div class="page-card letter-card"><div class="paper-top"><span>Dear Aanya,</span><span class="heart-line">&#10084;</span></div><div class="letter-body"><p>I hope this little surprise reminds you of how deeply loved you are.</p><p>You make ordinary days feel softer, brighter, and completely ours.</p><p>Here is to every dream, every laugh, and every beautiful thing still ahead.</p><p class="signature">Always yours,<br><em>your favourite person</em></p></div><div class="paper-stamp">A + love</div><div class="comment-pill">comment for link</div></div>`;
  if (state.kind === 'gift') return `<div class="page-card gift-card"><div class="tiny-eyebrow">There is one more little surprise</div><h2>One Last<br><em>Thing...</em></h2><div class="gift-box"><div class="gift-lid"></div><div class="gift-body"><span></span></div></div><p>Tap the gift</p><button class="soft-button">Open it</button><div class="cursor">&#8599;</div></div>`;
  if (state.kind === 'celebration') return `<div class="celebration-scene"><div class="confetti confetti-one"></div><div class="confetti confetti-two"></div><div class="confetti confetti-three"></div><div class="celebrate-card"><div class="card-spark">&#10022;</div><div class="animal-row"><span class="bear">bear</span><span class="cake-mini">&#127874;</span><span class="rabbit">bunny</span></div><h1>Lots of love<br><em>for you</em></h1><p>Once again, Happy Birthday<br><strong>AANYA SHARMA</strong></p><div class="button-pair"><button class="soft-button">Replay</button><button class="plain-button">Write a letter</button></div></div></div>`;
  return `<div class="outro-scene"><div class="outro-heart">&#10084;</div><div class="outro-handle">@heartcraft.app</div><div class="outro-copy">comment for link</div><div class="outro-line"></div></div>`;
}

function balloonScene(state) {
  const popped = state.kind === 'balloons' ? [] : ['blue', ...(state.balloon === 'blue' ? [] : ['pink']), ...(state.balloon === 'pink' ? [] : ['green']), ...(state.balloon === 'green' || state.balloon === 'violet' ? [] : ['violet'])];
  const phrase = state.kind === 'balloons' ? '' : state.kind === 'phrase' ? 'You are so special' : ['You', 'You are', 'You are so', 'You are so special'][['blue', 'pink', 'green', 'violet'].indexOf(state.balloon)];
  return `<div class="page-card balloon-card"><div class="tiny-eyebrow">A tiny game for you</div><h2>${state.kind === 'phrase' ? 'A little truth' : 'Pop all 4 balloons'}</h2><div class="balloon-field">${['blue', 'pink', 'green', 'violet'].map((color, i) => `<div class="balloon-wrap ${color} ${popped.includes(color) ? 'popped' : ''}" style="--i:${i}"><div class="balloon-shape"></div><div class="balloon-string"></div>${!popped.includes(color) ? '<span class="balloon-mark">+</span>' : ''}</div>`).join('')}</div><div class="revealed-phrase">${phrase || 'find the message'}</div>${state.kind === 'balloons' ? '<div class="cursor">&#8599;</div>' : '<div class="sparkle-text">you are so special</div>'}</div>`;
}

function galleryScene(state) {
  const card = state.card ?? 0;
  const captions = ['Some Sweet Moments', 'Celebrating you', 'Make a wish', 'Happy Birthday', 'Keep these close'];
  return `<div class="page-card gallery-card"><div class="tiny-eyebrow">${card === 0 ? 'A little memory lane' : 'memory ' + card}</div><h2>${captions[card]}</h2><div class="polaroid-stack"><div class="polaroid back"></div><div class="polaroid middle"></div><div class="polaroid front"><div class="photo-placeholder photo-${card}"><span>${card === 0 ? 'our story' : 'a sweet moment'}</span></div><div class="photo-caption">${card === 0 ? 'swipe the cards' : captions[card]}</div></div></div>${card === 0 ? '<p>Swipe through a few of my favourite moments.</p>' : '<p>Somewhere between then and now, you became home.</p>'}<button class="soft-button">${card === 4 ? 'Continue' : 'Next memory'} <span>&#8594;</span></button></div>`;
}

function advance(nextIndex = current + 1) {
  current = (nextIndex + states.length) % states.length;
  render();
  if (playing) schedule();
}
function schedule() {
  clearTimeout(timer);
  timer = setTimeout(() => advance(), states[current].duration);
}
function bindEvents() {
  document.querySelectorAll('[data-action]').forEach((button) => button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'prev') advance(current - 1);
    if (action === 'next') advance(current + 1);
    if (action === 'play') { playing = !playing; render(); if (playing) schedule(); else clearTimeout(timer); }
    if (action === 'download') downloadKeepsake();
  }));
}

function downloadKeepsake() {
  const shell = document.querySelector('.reel-shell').cloneNode(true);
  shell.querySelector('.controls')?.remove();
  shell.querySelector('.download-button')?.remove();
  const styles = [...document.styleSheets].flatMap((sheet) => {
    try { return [...sheet.cssRules].map((rule) => rule.cssText); } catch { return []; }
  }).join('\n');
  const documentMarkup = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Aanya's Birthday Surprise</title><style>${styles}</style></head><body><div id="app">${shell.outerHTML}</div></body></html>`;
  const url = URL.createObjectURL(new Blob([documentMarkup], { type: 'text/html' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `aanya-birthday-surprise-${String(current + 1).padStart(2, '0')}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

render();
