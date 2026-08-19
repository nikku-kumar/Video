document.title = "Sama's Romantic Surprise - From Nikku";
const app = document.querySelector('#app');
let step = 0;
let noAttempts = 0;
let selectedFood = '';
let selectedDate = '';
let selectedPlans = [];
let selectedMoment = '';
let musicOn = false;
let audioContext;

const foods = [
  ['🍕', 'Pizza'], ['🍔', 'Burger'], ['🍗', 'Chicken'], ['🍖', 'Mutton'], ['🍗', 'Chicken Biryani'],
  ['🍛', 'Mutton Biryani'], ['🍜', 'Noodles'], ['🍝', 'Pasta'], ['🍣', 'Sushi'], ['🌮', 'Mexican'],
  ['🍛', 'Indian Food'], ['🍰', 'Dessert'], ['🍦', 'Ice Cream'], ['🥤', 'Just Snacks'], ['❤️', 'Surprise Me']
];
const plans = [['☕', 'Coffee together'], ['🌅', 'Watch the sunset'], ['🚶', 'Long walk together'], ['🎬', 'Movie together'], ['📸', 'Take cute pictures'], ['🍦', 'Ice cream after dinner']];
const moments = [['💋', 'A Sweet Kiss'], ['🤗', 'A Long Hug'], ['🌙', 'A Late-Night Walk'], ['🥰', 'Stay Close & Talk'], ['🛋️', 'Cuddle & Watch Something'], ['❤️', 'A Little More Romance'], ['😏', 'Let the Chemistry Decide']];
const chemistry = [['🌸', 'Cute'], ['💕', 'Very Romantic'], ['🔥', 'Dangerously Romantic'], ['😈', 'Sama Decides']];

function decor() { return `<div class="decor" aria-hidden="true"><span class="heart h1">♥</span><span class="heart h2">♥</span><span class="heart h3">♥</span><span class="heart h4">♥</span><span class="spark s1">✦</span><span class="spark s2">✧</span><span class="spark s3">✦</span><span class="spark s4">✧</span></div>`; }
function layout(content, className = '') {
  const progress = step === 0 ? '' : `<div class="progress" aria-label="Story progress">❤️ ${Math.min(step, 8)} / 8</div>`;
  app.innerHTML = `<main class="story ${className}">${decor()}<button class="music" data-music aria-label="Toggle romantic music">${musicOn ? '♫' : '♪'}</button>${progress}<div class="stage">${content}</div></main>`;
  document.querySelector('[data-music]').addEventListener('click', toggleMusic);
}
function action(selector, handler) { document.querySelector(selector)?.addEventListener('click', handler); }
function render() { if (step === 0) welcome(); if (step === 1) yesReaction(); if (step === 2) datePlan(); if (step === 3) foodPlan(); if (step === 4) dateFantasy(); if (step === 5) afterDate(); if (step === 6) momentReaction(); if (step === 7) chemistryPage(); if (step === 8) shayari(); if (step === 9) finalIntro(); if (step === 10) finalReveal(); if (step === 11) finalLove(); }

function welcome() {
  layout(`<section class="screen"><div class="card"><p class="kicker reveal">A little adventure from Nikku</p><h1 class="reveal reveal-late">Hey Sama <span class="accent">❤️</span></h1><p class="lead reveal reveal-later">I have something very important to ask you... 🥰</p><p class="lead reveal reveal-later"><strong>Sama, will you go on a date with me? ❤️🥺</strong></p><div class="actions reveal reveal-later"><button class="primary" data-yes>YES ❤️</button><div class="no-wrap"><button class="secondary no-button" data-no>NO 🙈</button><p class="no-message" data-no-message></p></div></div><p class="small-note reveal reveal-later">P.S. I promise good food and very bad jokes.</p></div></section>`);
  action('[data-yes]', () => { step = 1; confetti(); celebrationTone(); render(); });
  action('[data-no]', playfulNo);
}
function playfulNo() {
  noAttempts += 1;
  const button = document.querySelector('[data-no]');
  const message = document.querySelector('[data-no-message]');
  const lines = ['Ehh Sama... are you sure? 🥺👉👈', 'Wait wait... I think you clicked the wrong button. 😂❤️', "Let's try that again, Sama... 😌", 'Samaaa... think about it one more time 🥺❤️', "Nikku is standing here with his best date proposal... 😭😂", 'One tiny YES could make someone’s whole day. 🥰', 'Okay okay... I’ll give you one last chance. 😌❤️'];
  message.textContent = lines[Math.min(noAttempts - 1, lines.length - 1)];
  if (noAttempts < 7) { button.style.transform = `translate(${(Math.random() * 150) - 75}px, ${(Math.random() * 95) - 45}px) rotate(${(Math.random() * 8) - 4}deg)`; button.textContent = noAttempts > 3 ? 'NO (really?) 🙈' : 'NO 🙈'; return; }
  button.style.transform = 'none'; button.textContent = 'Fineee 😂❤️ You win!';
  button.onclick = () => { message.innerHTML = `Okay Sama 😂❤️ I'll stop bothering you... for now.<br>But that smile of yours is still my favourite. 🥰<br><button class="secondary" data-restart>Start Again ❤️</button>`; action('[data-restart]', restart); };
}
function yesReaction() {
  layout(`<section class="screen yes-screen"><div class="card celebration-card"><div class="celebrate">🎉 ❤️ ✨</div><p class="kicker reveal">Emergency happiness alert</p><h2 class="reveal reveal-late">WAIT... 😳</h2><h2 class="reveal reveal-later">DID SAMA ACTUALLY SAY YES?! 😭❤️</h2><p class="lead reveal reveal-later">Okay... someone please tell Nikku to calm down. 😂</p><p class="lead reveal reveal-later"><strong>Because I'm officially the happiest guy right now. 🥰❤️</strong></p><p class="lead reveal reveal-later">You just turned an ordinary day into my favourite day. ✨</p><button class="primary glow-button reveal reveal-later" data-next>LET'S PLAN OUR DATE → ❤️</button></div></section>`, 'yes-screen');
  for (let index = 0; index < 12; index += 1) { const balloon = document.createElement('span'); balloon.className = `celebration-balloon cb-${index % 4}`; balloon.textContent = '♥'; balloon.style.left = `${8 + index * 7}%`; balloon.style.animationDelay = `${index * 80}ms`; document.querySelector('.story').appendChild(balloon); }
  action('[data-next]', () => { step = 2; render(); });
}
function datePlan() {
  layout(`<section class="screen"><div class="card"><p class="kicker">Chapter one: the date</p><h2>Okay Sama... important question. 👀❤️</h2><p class="lead">If Nikku gets one day with you...</p><h3 class="accent">Which day are you giving him? 🥰</h3><input class="date-input" type="date" data-date aria-label="Choose a date"><p class="small-note">Pick a day that feels like ours. ❤️</p><button class="primary date-confirm" data-date-confirm>Choose this date</button><p class="lead date-result" data-date-result></p></div></section>`);
  action('[data-date-confirm]', () => { const input = document.querySelector('[data-date]'); if (!input.value) { input.focus(); return; } selectedDate = new Date(`${input.value}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); document.querySelector('[data-date-result]').innerHTML = `<span class="date-heart">♡ 📅 ♡</span><strong>IT'S A DATE! 🥹❤️</strong><br>${selectedDate}<br><small>Okay... Nikku is officially saving this date in his heart. ❤️</small><br><br>But wait... the date plan isn't complete yet. 👀<br><button class="primary" data-food-next>What's next? → ❤️</button>`; action('[data-food-next]', () => { step = 3; render(); }); });
}
function foodPlan() {
  const cards = foods.map(([emoji, name]) => `<button class="choice food-choice" data-food="${name}"><span>${emoji}</span>${name}</button>`).join('');
  layout(`<section class="screen wide-screen"><div class="card"><p class="kicker">Chapter two: the menu</p><h2>What is your favourite food, Sama? 🍗❤️</h2><div class="food-grid expanded-food">${cards}</div><p class="lead food-result" data-food-result></p></div></section>`);
  document.querySelectorAll('[data-food]').forEach((choice) => choice.addEventListener('click', () => { selectedFood = choice.dataset.food; document.querySelectorAll('[data-food]').forEach((item) => item.classList.remove('selected')); choice.classList.add('selected'); document.querySelector('[data-food-result]').innerHTML = `Ooooh... good choice, Sama. 😋❤️<br>So we're having <strong>${selectedFood}</strong> on our date!<br>Nikku approves this decision. 😂❤️<br><button class="primary" data-plan-next>Plan the date day →</button>`; action('[data-plan-next]', () => { step = 4; render(); }); }));
}
function dateFantasy() {
  const cards = plans.map(([emoji, name]) => `<button class="choice plan-choice" data-plan="${name}"><span>${emoji}</span>${name}</button>`).join('');
  layout(`<section class="screen wide-screen"><div class="card"><p class="kicker">Chapter three: imagine this</p><h2>Okay... imagine our date day. ❤️</h2><p class="lead">Pick one or more cute little moments.</p><div class="moment-grid plan-grid">${cards}</div><div class="plan-summary" data-plan-summary>Choose as many as make you smile. ✨</div></div></section>`);
  selectedPlans = [];
  document.querySelectorAll('[data-plan]').forEach((choice) => choice.addEventListener('click', () => { const name = choice.dataset.plan; selectedPlans = selectedPlans.includes(name) ? selectedPlans.filter((item) => item !== name) : [...selectedPlans, name]; choice.classList.toggle('selected', selectedPlans.includes(name)); document.querySelector('[data-plan-summary]').innerHTML = selectedPlans.length ? `Okayyy... I can already imagine this. 🥰<p><strong>Our perfect date so far:</strong><br>📅 ${selectedDate}<br>🍽️ ${selectedFood}<br>${selectedPlans.map((item) => `✨ ${item}`).join('<br>')}</p><button class="primary" data-after-next>Continue ❤️</button>` : 'Choose as many as make you smile. ✨'; action('[data-after-next]', () => { step = 5; render(); }); }));
}
function afterDate() {
  layout(`<section class="screen"><div class="card suspense-card"><p class="kicker">Chapter four: after the date</p><p class="lead reveal">So... dinner is done. 😌</p><p class="lead reveal reveal-late">We're walking together...</p><p class="lead reveal reveal-later">The night is beautiful... 🌙</p><h2 class="reveal reveal-later">And now comes the dangerous question... 👀😂</h2><h3 class="accent">What happens next? ❤️</h3><div class="moment-grid romantic-grid">${moments.map(([emoji, name]) => `<button class="choice" data-moment="${name}"><span>${emoji}</span>${name}</button>`).join('')}</div></div></section>`);
  document.querySelectorAll('[data-moment]').forEach((choice) => choice.addEventListener('click', () => { selectedMoment = choice.dataset.moment; choice.classList.add('selected'); confetti(choice); setTimeout(() => { step = 6; render(); }, 500); }));
}
function momentReaction() {
  const copy = { 'A Sweet Kiss': ['Hehehe... someone is getting brave today. 😳💋', 'A sweet kiss it is. Nikku is blushing already. ❤️', '💋'], 'A Long Hug': ['Okay... one very long hug coming right up. 🤗❤️', "Because sometimes words aren't enough... a hug says everything.", '🤗'], 'A Little More Romance': ['Ohhh Sama... now you’re making Nikku blush. 😳❤️', 'I like where this little story is going.', '❤️'] }[selectedMoment] || ['That sounds lovely. 🌙❤️', 'As long as we are together, the plan is perfect.', '🌙'];
  layout(`<section class="screen"><div class="card moment-card"><p class="kicker">A very good choice</p><div class="soft-heart">${copy[2]}</div><h2>${copy[0]}</h2><p class="lead">${copy[1]}</p><p class="small-note">Flirty, sweet, and completely ours. 😌</p><button class="primary" data-next>One last question →</button></div></section>`);
  action('[data-next]', () => { step = 7; render(); });
}
function chemistryPage() {
  layout(`<section class="screen"><div class="card"><p class="kicker">The chemistry check</p><h2>Okay Sama... one last question. 👀</h2><p class="lead"><strong>How romantic should tonight be?</strong></p><div class="moment-grid chemistry-grid">${chemistry.map(([emoji, name]) => `<button class="choice" data-chemistry="${name}"><span>${emoji}</span>${name}</button>`).join('')}</div><p class="lead chemistry-result" data-chemistry-result></p></div></section>`);
  document.querySelectorAll('[data-chemistry]').forEach((choice) => choice.addEventListener('click', () => { const responses = { Cute: 'Okayyy... keeping it sweet. 🥰', 'Very Romantic': 'Now we’re talking. ❤️', 'Dangerously Romantic': 'Umm... Sama, should Nikku be nervous? 😳🔥', 'Sama Decides': 'Best answer. 😂❤️' }; document.querySelectorAll('[data-chemistry]').forEach((item) => item.classList.remove('selected')); choice.classList.add('selected'); document.querySelector('[data-chemistry-result]').innerHTML = `${responses[choice.dataset.chemistry]}<br><button class="primary" data-next>Read something from my heart ✨</button>`; action('[data-next]', () => { step = 8; render(); }); }));
}
function shayari() {
  const lines = ['Teri muskurahat ka koi jawaab nahi...', 'Tere jaisa khoobsurat koi khwaab nahi...', 'Tu saath ho toh har pal khaas lagta hai...', 'Sama, tera naam hi dil ke sabse paas lagta hai. ❤️'];
  layout(`<section class="screen poetry-screen"><div class="card"><p class="kicker">A few words from the heart</p><h2>For Sama, line by line ✨</h2><div class="poetry-lines">${lines.map((line) => `<p>${line}</p>`).join('')}</div><div class="letter-list"><div class="letter-line">Chaand ko dekha toh tera khayal aaya,<br>Teri hasi ne phir dil ko muskuraaya...</div><div class="letter-line">Sach kahun Sama... mujhe perfect date nahi chahiye.</div><div class="letter-line">Bas tere saath ek imperfect moment bhi perfect lagta hai. ❤️</div></div><button class="primary" data-next>One last surprise 🎁</button></div></section>`);
  action('[data-next]', () => { step = 9; render(); });
}
function photoPlaceholder() { const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e7929e"/><stop offset=".52" stop-color="#c9a8d3"/><stop offset="1" stop-color="#f4ce98"/></linearGradient></defs><rect width="700" height="700" fill="url(#g)"/><circle cx="120" cy="130" r="60" fill="#fff" opacity=".25"/><circle cx="565" cy="545" r="145" fill="#fff" opacity=".18"/><text x="350" y="325" text-anchor="middle" fill="#fff" font-family="Georgia" font-size="48">Sama's photo</text><text x="350" y="380" text-anchor="middle" fill="#fff" opacity=".8" font-family="sans-serif" font-size="20">add images/surprise.jpg</text></svg>`; return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`; }
function finalIntro() {
  layout(`<section class="screen"><div class="card"><p class="kicker">The final chapter</p><h2>Sama...</h2><p class="lead">You've reached the final surprise. 👀</p><p class="lead"><strong>But I need you to promise me something...</strong></p><button class="primary" data-promise>What? 👀</button></div></section>`);
  action('[data-promise]', () => { document.querySelector('.card').innerHTML = `<p class="kicker">Promise me this</p><h2>Promise you'll smile when you see it. ❤️</h2><p class="lead">Ready?</p><button class="primary glow-button" data-show>SHOW ME THE SURPRISE 🎁</button>`; action('[data-show]', () => { step = 10; render(); }); });
}
function finalReveal() {
  layout(`<section class="screen final-reveal"><div class="card"><div class="reveal-sparkles">✦ ✧ ✦</div><p class="kicker">For my favourite person</p><h2>SURPRISE, Sama 🎁</h2><figure class="photo-frame"><img src="./images/surprise.jpg" data-photo alt="Sama's surprise photo"><figcaption class="photo-caption">This is my favourite person. ❤️<br>My favourite smile.<br>My favourite Sama. 🥰</figcaption></figure><button class="primary" data-next>I Love You ❤️</button></div></section>`, 'final-reveal');
  const image = document.querySelector('[data-photo]'); image.onerror = () => { image.onerror = null; image.src = photoPlaceholder(); }; action('[data-next]', () => { step = 11; render(); });
}
function finalLove() { layout(`<section class="screen final-screen"><div class="card"><p class="kicker">Always and forever</p><h1>Sama <span class="accent">❤️</span></h1><h2>If you ever forget how special you are...</h2><p class="lead">Come back to this little page.</p><p class="lead">Because somewhere out there...<br>Nikku is always going to be grateful that you exist. ❤️</p><div class="final-heart">♥</div><h2 class="accent">I love you, Sama.</h2><p class="lead">More than this little website can ever explain.</p><p class="lead"><em>With all my love ❤️<br>— Nikku</em></p><p>One more thing...</p><button class="secondary" data-replay>Replay our little adventure 🔄❤️</button></div></section>`, 'final-screen'); action('[data-replay]', restart); }
function confetti(source) { const rect = source?.getBoundingClientRect?.() || { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 }; for (let index = 0; index < 28; index += 1) { const bit = document.createElement('span'); bit.className = 'confetti'; bit.textContent = index % 2 ? '♥' : '✦'; bit.style.left = `${rect.left + rect.width / 2}px`; bit.style.top = `${rect.top + rect.height / 2}px`; bit.style.color = ['#df5c7c','#f5bb72','#a995d1','#81bcca'][index % 4]; bit.style.setProperty('--x', `${Math.cos(index * .27) * (80 + Math.random() * 130)}px`); bit.style.setProperty('--y', `${Math.sin(index * .27) * (80 + Math.random() * 130)}px`); document.body.appendChild(bit); setTimeout(() => bit.remove(), 1400); } }
function celebrationTone() { try { audioContext ||= new (window.AudioContext || window.webkitAudioContext)(); const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain(); oscillator.frequency.value = 659.25; gain.gain.value = .025; oscillator.connect(gain).connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + .18); } catch {} }
function toggleMusic() { musicOn = !musicOn; if (musicOn) celebrationTone(); render(); }
function restart() { step = 0; noAttempts = 0; selectedFood = ''; selectedDate = ''; selectedPlans = []; selectedMoment = ''; render(); }
render();
