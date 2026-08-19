const photos = [
  { file: 'AL839524_nikku image.jpg', caption: 'This smile ❤️' },
  { file: 'nikku image.jfif', caption: 'One of my favorite memories 🥰' },
  { file: 'nikku pan.jpeg', caption: 'You look beautiful ✨' },
  { file: 'WhatsApp Image 2026-06-24 at 9.21.05 PM.jpeg', caption: 'A moment worth keeping 💕' },
  { file: 'photo5.jpg', caption: 'My favorite kind of happy ❤️' },
  { file: 'photo6.jpg', caption: 'More memories to come 🌷' }
];

const app = document.querySelector('#app');
let step = 0;
let lightboxIndex = 0;
const fallbackColors = ['#e8949e,#f6c4a8', '#a997d0,#e6b7cb', '#83bed0,#dcefbf', '#dc697e,#f5b67e', '#b4c9df,#e9a5b7', '#d7a4c9,#ffe0a8'];

function decorate() {
  return `<div class="decor" aria-hidden="true">
    <span class="heart h1">♥</span><span class="heart h2">♥</span><span class="heart h3">♥</span><span class="heart h4">♥</span>
    <span class="spark s1">✦</span><span class="spark s2">✧</span><span class="spark s3">✦</span><span class="spark s4">✧</span>
  </div>`;
}

function layout(content, className = '') {
  app.innerHTML = `<main class="surprise ${className}">${decorate()}<div class="stage">${content}</div></main>`;
}

function render() {
  if (step === 0) renderOpening();
  if (step === 1) renderBalloons();
  if (step === 2) renderGirlMessage();
  if (step === 3) renderSurprise();
  if (step === 4) renderGallery();
  if (step === 5) renderFinal();
}

function renderOpening() {
  layout(`<section class="screen opening"><div class="message-card"><p class="kicker">A tiny love letter</p><h1 class="type-line"><span>Hey ❤️<br>How are you?</span></h1><p class="lead delay-line">I have been saving a little surprise for you.</p><p class="lead delay-line"><strong>I love you too much ❤️🥰</strong></p><button class="primary-button" data-next="1">Open my surprise ✨</button></div></section>`, 'opening');
  bindNext();
}

function renderBalloons() {
  const balloons = ['pink', 'purple', 'blue', 'red'].map((color) => `<button class="balloon ${color}" data-balloon="${color}" aria-label="Pop the ${color} balloon"><span>♥</span><i></i></button>`).join('');
  layout(`<section class="screen balloon-screen"><div class="message-card"><p class="kicker">A little game for you</p><h2>I have something<br><span class="accent">for you... 🥰</span></h2><p class="lead">Click on any balloon 🎈</p><div class="balloon-field">${balloons}</div><p class="small-note">Just one is enough...</p></div></section>`, 'balloon-screen');
  document.querySelectorAll('[data-balloon]').forEach((balloon) => balloon.addEventListener('click', () => popBalloon(balloon)));
}

function popBalloon(balloon) {
  balloon.classList.add('popping');
  createBurst(balloon);
  document.querySelectorAll('.balloon:not(.popping)').forEach((other) => { other.style.opacity = '0'; other.style.transform = 'translateY(20px) scale(.7)'; });
  setTimeout(() => { step = 2; render(); }, 620);
}

function createBurst(source) {
  const rect = source.getBoundingClientRect();
  for (let index = 0; index < 18; index += 1) {
    const particle = document.createElement('span');
    particle.className = 'burst';
    particle.textContent = index % 2 ? '✦' : '♥';
    particle.style.left = `${rect.left + rect.width / 2}px`;
    particle.style.top = `${rect.top + rect.height / 2}px`;
    particle.style.color = ['#e65e7c', '#f4bd72', '#a895d2', '#7ebdcc'][index % 4];
    particle.style.setProperty('--x', `${Math.cos(index * .35) * (70 + Math.random() * 90)}px`);
    particle.style.setProperty('--y', `${Math.sin(index * .35) * (70 + Math.random() * 90)}px`);
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1050);
  }
}

function renderGirlMessage() {
  layout(`<section class="screen girl-screen"><div class="message-card"><p class="kicker">The truth is...</p><h2>Hey! ❤️</h2><p class="lead">You are one of the most beautiful girls in the world 🥰❤️</p><p class="lead surprise-line"><strong>And you know what?</strong><br><span class="accent">You're even more beautiful than you think. 💕✨</span></p><div class="next-wrap"><button class="primary-button" data-next="3">Next 💕</button></div></div></section>`, 'girl-screen');
  bindNext();
}

function renderSurprise() {
  layout(`<section class="screen surprise-screen"><div class="message-card"><p class="kicker">Wait for it...</p><h2>Wait... I have one more surprise for you 👀❤️</h2><p class="lead">Click next... I have something special for you 🥰</p><button class="primary-button" data-next="4">Next → 💕</button></div></section>`, 'surprise-screen');
  bindNext();
}

function placeholder(index) {
  const [first, second] = fallbackColors[index].split(',');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${first}"/><stop offset="1" stop-color="${second}"/></linearGradient></defs><rect width="700" height="700" fill="url(#g)"/><circle cx="120" cy="130" r="58" fill="#fff" opacity=".25"/><circle cx="570" cy="560" r="150" fill="#fff" opacity=".18"/><text x="350" y="330" text-anchor="middle" fill="#fff" font-family="Georgia" font-size="48">your photo here</text><text x="350" y="385" text-anchor="middle" fill="#fff" opacity=".8" font-family="sans-serif" font-size="20">photo ${index + 1}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderGallery() {
  const cards = photos.map((photo, index) => `<button class="photo-card" data-photo="${index}" style="animation-delay:${index * 90}ms"><img src="./images/${photo.file}" data-fallback="${placeholder(index)}" alt="${photo.caption}" onerror="this.onerror=null; this.src=this.dataset.fallback"><span class="photo-label">${photo.caption}</span></button>`).join('');
  layout(`<section class="screen gallery-screen"><p class="kicker">Memory lane</p><h2>A few beautiful memories ❤️</h2><p class="lead">Every picture has a story... 🥰</p><div class="gallery-grid">${cards}</div><p class="gallery-note">Replace the files in <strong>images/</strong> with your own photos.</p><button class="primary-button" data-next="5">There is more 💌</button></section>`, 'gallery-screen');
  document.querySelectorAll('[data-photo]').forEach((card) => card.addEventListener('click', () => openLightbox(Number(card.dataset.photo))));
  bindNext();
}

function renderFinal() {
  layout(`<section class="screen final-screen"><div class="message-card"><p class="kicker">One last thing</p><h2>And that's not even all... ❤️</h2><p class="lead">I just wanted to remind you how special you are to me. 🥰</p><p class="lead"><strong>Never forget that. ❤️</strong></p><div class="final-heart">♥</div><p class="small-note">Made with all my love.</p><button class="ghost-button" data-next="0">Replay surprise</button></div></section>`, 'final-screen');
  bindNext();
}

function bindNext() {
  document.querySelectorAll('[data-next]').forEach((button) => button.addEventListener('click', () => { step = Number(button.dataset.next); render(); }));
}

function openLightbox(index) {
  lightboxIndex = index;
  const lightbox = document.querySelector('#lightbox');
  if (!lightbox) document.body.insertAdjacentHTML('beforeend', `<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer"><button class="lightbox-close" data-close aria-label="Close photo viewer">×</button><button class="lightbox-nav lightbox-prev" data-prev aria-label="Previous photo">‹</button><figure class="lightbox-figure"><img class="lightbox-image" alt=""><figcaption class="lightbox-caption"></figcaption></figure><button class="lightbox-nav lightbox-next" data-next-photo aria-label="Next photo">›</button></div>`);
  updateLightbox();
  document.querySelector('#lightbox').hidden = false;
  document.querySelector('[data-close]').onclick = closeLightbox;
  document.querySelector('[data-prev]').onclick = () => changePhoto(-1);
  document.querySelector('[data-next-photo]').onclick = () => changePhoto(1);
}

function updateLightbox() {
  const photo = photos[lightboxIndex];
  const image = document.querySelector('.lightbox-image');
  image.src = `./images/${photo.file}`;
  image.onerror = () => { image.onerror = null; image.src = placeholder(lightboxIndex); };
  image.alt = photo.caption;
  document.querySelector('.lightbox-caption').textContent = photo.caption;
}
function closeLightbox() { document.querySelector('#lightbox').hidden = true; }
function changePhoto(direction) { lightboxIndex = (lightboxIndex + direction + photos.length) % photos.length; updateLightbox(); }

document.addEventListener('keydown', (event) => {
  if (!document.querySelector('#lightbox') || document.querySelector('#lightbox').hidden) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') changePhoto(-1);
  if (event.key === 'ArrowRight') changePhoto(1);
});

let touchStartX = 0;
document.addEventListener('touchstart', (event) => { if (!event.target.closest('#lightbox')) return; touchStartX = event.changedTouches[0].screenX; }, { passive: true });
document.addEventListener('touchend', (event) => { if (!event.target.closest('#lightbox')) return; const distance = event.changedTouches[0].screenX - touchStartX; if (Math.abs(distance) > 45) changePhoto(distance > 0 ? -1 : 1); }, { passive: true });

render();
