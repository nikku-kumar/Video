const app = document.querySelector('#app');
let step = 0;
let noAttempts = 0;
let selectedMoment = '';
let selectedFood = '';
let selectedDate = '';
let musicOn = false;
let audioContext;
const foods = [
  ['🍕', 'Pizza'], ['🍔', 'Burger'], ['🍜', 'Noodles'], ['🍝', 'Pasta'],
  ['🍣', 'Sushi'], ['🍛', 'Indian Food'], ['🍰', 'Dessert'], ['💝', 'Surprise Me']
];
const moments = [['💋', 'Kiss'], ['🤗', 'Hug'], ['🌙', 'Walk Together'], ['❤️', 'More Time Together']];

function decor() { return `<div class="decor" aria-hidden="true"><span class="heart h1">♥</span><span class="heart h2">♥</span><span class="heart h3">♥</span><span class="heart h4">♥</span><span class="spark s1">✦</span><span class="spark s2">✧</span><span class="spark s3">✦</span><span class="spark s4">✧</span></div>`; }
function layout(content, className = '') { app.innerHTML = `<main class="story ${className}">${decor()}<button class="music" data-music aria-label="Toggle romantic music">${musicOn ? '♫' : '♪'}</button><div class="stage">${content}</div></main>`; document.querySelector('[data-music]').addEventListener('click', toggleMusic); }
function actions(button, handler) { document.querySelector(button)?.addEventListener('click', handler); }
function render() { if (step === 0) welcome(); if (step === 1) yesReaction(); if (step === 2) datePlan(); if (step === 3) foodPlan(); if (step === 4) momentChoices(); if (step === 5) momentReveal(); if (step === 6) moreTime(); if (step === 7) shayari(); if (step === 8) finalSurprise(); if (step === 9) finalLove(); }

function welcome() {
  layout(`<section class="screen"><div class="card"><p class="kicker reveal">A little adventure from Nikku</p><h1 class="reveal reveal-late">Hey Sama <span class="accent">❤️</span></h1><p class="lead reveal reveal-later">I have something very important to ask you... 🥰</p><p class="lead reveal reveal-later"><strong>Sama, will you go on a date with me? ❤️🥺</strong></p><div class="actions reveal reveal-later"><button class="primary" data-yes>YES ❤️</button><div class="no-wrap"><button class="secondary no-button" data-no>NO 🙈</button><p class="no-message" data-no-message></p></div></div><p class="small-note reveal reveal-later">P.S. I promise good food and very bad jokes.</p></div></section>`);
  actions('[data-yes]', () => { step = 1; confetti(); render(); });
  actions('[data-no]', playfulNo);
}
function playfulNo() {
  noAttempts += 1;
  const button = document.querySelector('[data-no]');
  const message = document.querySelector('[data-no-message]');
  const lines = ['Are you sure, Sama? 🥺', "Think again... I'll make it special ❤️", 'The button is getting shy now 🙈', 'Okay, okay... you can choose NO. But I will be very cute about it.'];
  message.textContent = lines[Math.min(noAttempts - 1, lines.length - 1)];
  if (noAttempts < 4) {
    button.style.transform = `translate(${(Math.random() * 130) - 65}px, ${(Math.random() * 80) - 40}px)`;
    button.textContent = noAttempts === 3 ? 'NO (really) 🙈' : 'NO 🙈';
  } else {
    button.style.transform = 'none';
    button.textContent = 'NO (I understand)';
    button.onclick = () => { message.textContent = 'I will respect that, Sama. Thank you for being honest. ❤️'; button.disabled = true; };
  }
}
function yesReaction() {
  layout(`<section class="screen yes-screen"><div class="card"><p class="kicker">Emergency happiness alert</p><div class="celebrate">🎉 ❤️ ✨</div><h2>WAIT... DID YOU ACTUALLY SAY YES?! 😭❤️</h2><p class="lead">Sama, you just made Nikku the happiest person ever. 🥰</p><p class="lead"><strong>Okay... now we have to plan our date! ❤️</strong></p><button class="primary" data-next> NEXT → </button></div></section>`, 'yes-screen');
  actions('[data-next]', () => { step = 2; render(); });
}
function datePlan() {
  layout(`<section class="screen"><div class="card"><p class="kicker">Chapter one: the date</p><h2>So Sama... when are you free for our date? 📅❤️</h2><p class="lead">Pick a day that feels like ours.</p><input class="date-input" type="date" data-date aria-label="Choose a date"><button class="primary date-confirm" data-date-confirm>Choose this date</button><p class="lead date-result" data-date-result></p></div></section>`);
  actions('[data-date-confirm]', () => { const input = document.querySelector('[data-date]'); if (!input.value) { input.focus(); return; } selectedDate = new Date(`${input.value}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); document.querySelector('[data-date-result]').innerHTML = `Our date is officially planned for <strong>${selectedDate} ❤️🥰</strong><br><br>Now comes the most important question...<br><button class="primary" data-food-next>Next →</button>`; actions('[data-food-next]', () => { step = 3; render(); }); });
}
function foodPlan() {
  const cards = foods.map(([emoji, name]) => `<button class="choice" data-food="${name}"><span>${emoji}</span>${name}</button>`).join('');
  layout(`<section class="screen"><div class="card"><p class="kicker">Chapter two: the menu</p><h2>What is your favourite food, Sama? 🍕❤️</h2><div class="food-grid">${cards}</div><p class="lead food-result" data-food-result></p></div></section>`);
  document.querySelectorAll('[data-food]').forEach((choice) => choice.addEventListener('click', () => { selectedFood = choice.dataset.food; document.querySelectorAll('[data-food]').forEach((item) => item.classList.remove('selected')); choice.classList.add('selected'); document.querySelector('[data-food-result]').innerHTML = `Perfect choice, Sama! ❤️<br>Nikku will remember this. 😌❤️<br><button class="primary" data-moment-next>Next →</button>`; actions('[data-moment-next]', () => { step = 4; render(); }); }));
}
function momentChoices() {
  const cards = moments.map(([emoji, name]) => `<button class="balloon moment-balloon" data-moment="${name}"><span>${emoji}<br>${name}</span><i></i></button>`).join('');
  layout(`<section class="screen"><div class="card"><p class="kicker">Chapter three: after the date</p><h2>Okay... after our date, what should we do next? 👀❤️</h2><div class="balloon-field">${cards}</div><p class="small-note">Choose your favourite balloon.</p></div></section>`);
  document.querySelectorAll('[data-moment]').forEach((balloon) => balloon.addEventListener('click', () => { selectedMoment = balloon.dataset.moment; balloon.classList.add('popping'); confetti(balloon); setTimeout(() => { step = 5; render(); }, 540); }));
}
function momentReveal() {
  const copy = selectedMoment === 'Kiss' ? ['A kiss? Hehehe... 😳💋', "Okay Sama... that's a pretty romantic plan. ❤️", ['Teri ek muskurahat pe dil haar jaata hoon,', 'Tere saath har pal ko khaas banaata hoon.', 'Tu paas ho toh har lamha haseen lagta hai,', 'Sama, tera naam hi dil ko sukoon deta hai. ❤️']] : selectedMoment === 'Hug' ? ['And after that... one long warm hug? 🤗❤️', "Because sometimes words aren't enough... a hug says everything.", ['Tere kareeb aane ka bas ek bahaana chahiye,', 'Tere saath bitane ko har pal suhaana chahiye.', 'Ek pal ke liye duniya bhool jaaun,', 'Bas tera haath mere haath mein chahiye. ❤️']] : ['That sounds perfect. 🌙❤️', 'The kind of plan where time forgets to hurry.', ['Chaand bhi ruk jaaye hum dono ko dekhne ke liye,', 'Har raasta khubsurat lage tere saath chalne ke liye.', 'Sama, tu meri favourite feeling hai,', 'Aur meri favourite place is wherever you are. ❤️']];
  layout(`<section class="screen moment-card"><div class="card"><p class="kicker">A very good choice</p><h2>${copy[0]}</h2><p class="lead">${copy[1]}</p><div class="soft-heart">${selectedMoment === 'Kiss' ? '💋' : selectedMoment === 'Hug' ? '🤗' : '🌙'}</div><div class="shayari">${copy[2].map((line) => `<span>${line}</span>`).join('')}</div><button class="primary" data-next>Next ❤️</button></div></section>`);
  actions('[data-next]', () => { step = selectedMoment === 'Hug' ? 6 : 6; render(); });
}
function moreTime() {
  const cards = [['❤️', 'Talk for hours'], ['🌙', 'Take a late-night walk'], ['🥰', 'Watch something together'], ['✨', 'Just sit together']].map(([emoji, label]) => `<button class="choice" data-time="${label}"><span>${emoji}</span>${label}</button>`).join('');
  layout(`<section class="screen"><div class="card"><p class="kicker">Chapter four: no rush</p><h2>And then... let's just spend some more time together. 🌙❤️</h2><div class="moment-grid">${cards}</div><p class="lead" data-time-result></p></div></section>`);
  document.querySelectorAll('[data-time]').forEach((choice) => choice.addEventListener('click', () => { document.querySelectorAll('[data-time]').forEach((item) => item.classList.remove('selected')); choice.classList.add('selected'); document.querySelector('[data-time-result]').innerHTML = `Honestly, Sama... as long as I'm with you, I'm happy. ❤️<br><button class="primary" data-next>Next →</button>`; actions('[data-next]', () => { step = 7; render(); }); }));
}
function shayari() {
  const lines = ['Chaand bhi sharmaaye teri roshni ke saamne,', 'Dil ruk sa jaaye teri ek muskaan ke saamne.', 'Sama, tu sirf khoobsurat nahi,', 'Tu meri favourite feeling hai. ❤️'];
  layout(`<section class="screen"><div class="card"><p class="kicker">A few words from the heart</p><h2>For the girl who makes ordinary moments glow ✨</h2><div class="letter-list">${lines.map((line) => `<div class="letter-line">${line}</div>`).join('')}</div><p class="lead">Na koi perfect date chahiye, na koi perfect jagah. Bas tu saath ho Sama, toh har jagah meri favourite jagah. ❤️</p><button class="primary" data-next>One last surprise 🎁</button></div></section>`);
  actions('[data-next]', () => { step = 8; render(); });
}
function photoPlaceholder() { const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e7929e"/><stop offset=".52" stop-color="#c9a8d3"/><stop offset="1" stop-color="#f4ce98"/></linearGradient></defs><rect width="700" height="700" fill="url(#g)"/><circle cx="120" cy="130" r="60" fill="#fff" opacity=".25"/><circle cx="565" cy="545" r="145" fill="#fff" opacity=".18"/><text x="350" y="325" text-anchor="middle" fill="#fff" font-family="Georgia" font-size="48">Sama's photo</text><text x="350" y="380" text-anchor="middle" fill="#fff" opacity=".8" font-family="sans-serif" font-size="20">add images/surprise.jpg</text></svg>`; return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`; }
function finalSurprise() {
  layout(`<section class="screen"><div class="card"><p class="kicker">The final chapter</p><h2 class="reveal">Sama... I have one last surprise for you. 👀❤️</h2><p class="lead reveal reveal-late">Close your eyes...</p><p class="lead reveal reveal-later">Okay okay... you can open them now. 😂❤️</p><div class="celebrate reveal reveal-later">SURPRISE! 🎁</div><figure class="photo-frame"><img src="./images/surprise.jpg" data-photo alt="Sama's surprise photo"><figcaption class="photo-caption">This is my favourite person. ❤️<br>My favourite smile.<br>My favourite Sama. 🥰</figcaption></figure><button class="primary" data-next>I Love You ❤️</button></div></section>`);
  const image = document.querySelector('[data-photo]'); image.onerror = () => { image.onerror = null; image.src = photoPlaceholder(); }; actions('[data-next]', () => { step = 9; render(); });
}
function finalLove() { layout(`<section class="screen"><div class="card"><p class="kicker">Always and forever</p><h1>Sama <span class="accent">❤️</span></h1><h2>I love you.</h2><p class="lead">More than all the words on this website could ever explain.</p><p class="lead">Thank you for being you. ❤️</p><div class="final-heart">♥</div><h2 class="accent">I Love You Sama ❤️</h2><p class="lead"><em>— Forever Yours, Nikku ❤️</em></p><button class="secondary" data-replay>Replay our little adventure</button></div></section>`, 'final-screen'); actions('[data-replay]', () => { step = 0; noAttempts = 0; render(); }); }
function confetti(source) { const rect = source?.getBoundingClientRect?.() || { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 }; for (let index = 0; index < 24; index += 1) { const bit = document.createElement('span'); bit.className = 'confetti'; bit.textContent = index % 2 ? '♥' : '✦'; bit.style.left = `${rect.left + rect.width / 2}px`; bit.style.top = `${rect.top + rect.height / 2}px`; bit.style.color = ['#df5c7c','#f5bb72','#a995d1','#81bcca'][index % 4]; bit.style.setProperty('--x', `${Math.cos(index * .27) * (80 + Math.random() * 130)}px`); bit.style.setProperty('--y', `${Math.sin(index * .27) * (80 + Math.random() * 130)}px`); document.body.appendChild(bit); setTimeout(() => bit.remove(), 1400); } }
function toggleMusic() { musicOn = !musicOn; if (musicOn) { audioContext ||= new (window.AudioContext || window.webkitAudioContext)(); const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain(); oscillator.frequency.value = 523.25; gain.gain.value = .035; oscillator.connect(gain).connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + .22); } render(); }
render();
