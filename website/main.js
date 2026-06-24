/* ============================================================
   GORUN HECTOR DARIUS ȘTEFAN — Shared JS
   ============================================================ */

/* ── Menu toggle ── */
function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.nav-overlay');
  if (!toggle) return;

  function openMenu()  { document.body.classList.add('menu-open'); }
  function closeMenu() { document.body.classList.remove('menu-open'); }

  toggle.addEventListener('click', () => {
    document.body.classList.contains('menu-open') ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

/* ── Language switcher ── */
const LS_KEY = 'ghds-lang';

function setLang(lang) {
  localStorage.setItem(LS_KEY, lang);
  document.documentElement.setAttribute('data-active-lang', lang);

  // Show/hide all lang elements
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.toggle('lang-active', el.getAttribute('data-lang') === lang);
  });

  // Update buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
  });
}

function initLang() {
  const saved = localStorage.getItem(LS_KEY) || 'en';
  setLang(saved);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang-btn')));
  });
}

/* ── Scroll reveal ── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── Mark active nav link ── */
function initActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initLang();
  initReveal();
  initActiveNav();
});