import { startFx } from './fx.js';
import { initCalculator } from './calculator.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---- Loqodan açılış: ilk girişdə loqo böyüyüb səhnəyə çevrilir, sonrakı keçidlərdə header loqosundan açılır ---- */
const scenes = $('#scenes'), intro = $('#intro');
const firstVisit = false;
if (firstVisit) {
  sessionStorage.setItem('ces-intro', '1');
  scenes.style.setProperty('--ox', '50%'); scenes.style.setProperty('--oy', '45%');
  setTimeout(() => { scenes.classList.add('reveal-logo'); intro.classList.add('hide'); }, 1500);
} else {
  const b = $('.brand-logo').getBoundingClientRect();
  scenes.style.setProperty('--ox', `${((b.left + b.width / 2) / innerWidth) * 100}%`);
  scenes.style.setProperty('--oy', `${((b.top + b.height / 2) / innerHeight) * 100}%`);
  intro.remove();
  scenes.classList.add('reveal-logo');
}
startFx($('#fx-canvas'));

/* ---- Fon səhnəsi: kartlara/menyuya toxunanda həmin xidmətin səhnəsinə keçir ---- */
const baseScene = document.body.dataset.scene;
const setScene = (key) => $$('.scene-layer').forEach((l) => l.classList.toggle('is-active', l.dataset.layer === key));

let back;
$$('[data-scene]').forEach((el) => {
  const on = () => { clearTimeout(back); setScene(el.dataset.scene); };
  const off = () => { clearTimeout(back); back = setTimeout(() => setScene(baseScene), 250); };
  el.addEventListener('mouseenter', on);
  el.addEventListener('focus', on);
  el.addEventListener('mouseleave', off);
  el.addEventListener('blur', off);
});

/* ---- Parallax + scroll zamanı fonun qaralması ---- */
addEventListener('pointermove', (e) => {
  scenes.style.setProperty('--px', `${(0.5 - e.clientX / innerWidth) * 18}px`);
  scenes.style.setProperty('--py', `${(0.5 - e.clientY / innerHeight) * 12}px`);
});
const onScroll = () => document.body.classList.toggle('scrolled', scrollY > innerHeight * 0.45);
addEventListener('scroll', onScroll, { passive: true });
onScroll();


/* ---- Səhifə keçidi (su dalğası) silinib, birbaşa keçid olunur ---- */
/* ---- Mobil menyu ---- */
const burger = $('#burger'), nav = $('#main-nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', (e) => { if (e.target.closest('a')) nav.classList.remove('open'); });

/* ---- Kalkulyator ---- */
const calc = $('#calc-root');
if (calc) initCalculator(calc);

/* ---- Scroll reveal ---- */
const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); } }), { threshold: 0.12 });
$$('.card, .step, .calc, .section-title').forEach((el, i) => { el.classList.add('reveal'); el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });

