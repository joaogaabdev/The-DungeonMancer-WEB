/* ══════════════════════════════════════════
   The DungeonMancer — Scripts
   script.js
   ══════════════════════════════════════════ */

const RUNES = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ','ᚺ','ᚾ','ᛁ','ᛃ','ᛇ','ᛈ','ᛉ','ᛊ','ᛏ','ᛒ','ᛖ','ᛗ','ᛚ','ᛜ','ᛞ','ᛟ'];

/* ── PARTICLES ──────────────────────────── */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left              = Math.random() * 100 + 'vw';
    p.style.animationDuration = (8 + Math.random() * 15) + 's';
    p.style.animationDelay    = (Math.random() * 15) + 's';
    container.appendChild(p);
  }
}

/* ── FLOATING RUNES ─────────────────────── */
function initRunes() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  for (let i = 0; i < 12; i++) {
    const r = document.createElement('div');
    r.className   = 'rune';
    r.textContent = RUNES[Math.floor(Math.random() * RUNES.length)];
    r.style.left              = (5  + Math.random() * 90) + 'vw';
    r.style.top               = (10 + Math.random() * 80) + 'vh';
    r.style.animationDuration = (10 + Math.random() * 20) + 's';
    r.style.animationDelay    = (Math.random() * 10) + 's';
    r.style.fontSize          = (1  + Math.random() * 1.5) + 'rem';
    hero.appendChild(r);
  }
}

/* ── CHARACTER TABS ─────────────────────── */
function switchTab(tabId) {
  document.querySelectorAll('.chars-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.chars-panel').forEach(p => p.classList.remove('active'));

  // Mark the clicked button as active
  const btn = document.querySelector(`.chars-tab[data-tab="${tabId}"]`);
  if (btn) btn.classList.add('active');

  const panel = document.getElementById(tabId);
  if (panel) panel.classList.add('active');
}

function initTabs() {
  document.querySelectorAll('.chars-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

/* ── SCROLL REVEAL ──────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── SMOOTH ANCHOR SCROLL ───────────────── */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ── HERO PARALLAX ──────────────────────── */
function initParallax() {
  document.addEventListener('mousemove', e => {
    const mx   = (e.clientX / window.innerWidth  - 0.5) * 20;
    const my   = (e.clientY / window.innerHeight - 0.5) * 10;
    const logo = document.querySelector('.hero-logo');
    if (logo) logo.style.transform = `translate(${mx * 0.3}px, ${my * 0.3}px)`;
  });
}

/* ── BOOTSTRAP ──────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initRunes();
  initTabs();
  initScrollReveal();
  initSmoothAnchors();
  initParallax();
});