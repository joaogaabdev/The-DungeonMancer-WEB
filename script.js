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

/* ── TEASER PLAYER ──────────────────────── */
function initTeaser() {
  const player    = document.getElementById('teaserPlayer');
  const thumb     = document.getElementById('teaserThumb');
  const playBtn   = document.getElementById('teaserPlayBtn');
  const iframeWrap = document.getElementById('teaserIframeWrap');

  if (!player || !playBtn) return;

  const videoId = player.dataset.videoId;

  function loadVideo() {
    // Don't embed if no real ID has been set yet
    if (!videoId || videoId === 'YOUR_VIDEO_ID') {
      window.open(`https://www.youtube.com/results?search_query=The+DungeonMancer`, '_blank');
      return;
    }

    // Build embed URL with autoplay + rel=0 (no suggested videos)
    const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`;

    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = 'The DungeonMancer — Teaser Oficial';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    iframeWrap.innerHTML = '';
    iframeWrap.appendChild(iframe);

    // Fade out thumb, fade in iframe
    thumb.classList.add('is-hidden');
    iframeWrap.classList.add('is-active');
    iframeWrap.setAttribute('aria-hidden', 'false');
  }

  playBtn.addEventListener('click', loadVideo);
  // Also allow clicking anywhere on the thumb
  thumb.addEventListener('click', (e) => {
    if (e.target !== playBtn && !playBtn.contains(e.target)) loadVideo();
  });
}

/* ── IMAGE CARDS — Flip & Lightbox ─────── */
const LIGHTBOX_DATA = [
  { src: '1776014212206_image.png',  caption: 'The DungeonMancer — Tela de Título'         },
  { src: '1776014219927_image.png',  caption: 'Defesas & Acampamentos'                     },
  { src: '1776014224168_image.png',  caption: 'Os Funcionários — Sua Equipe Multifatorial'  },
  { src: '1776014228006_image.png',  caption: 'Os Fornecedores — Sua Principal Fonte de Renda' },
];

let lightboxIndex = 0;

function initImageCards() {
  const cards    = document.querySelectorAll('.img-card');
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightboxImg');
  const lbCap    = document.getElementById('lightboxCaption');
  const lbClose  = document.getElementById('lightboxClose');
  const lbBack   = document.getElementById('lightboxBackdrop');
  const lbPrev   = document.getElementById('lightboxPrev');
  const lbNext   = document.getElementById('lightboxNext');

  if (!lightbox) return;

  /* ─ flip on click ─ */
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // If click lands on the back face, open lightbox instead of un-flipping
      if (card.classList.contains('is-flipped')) {
        openLightbox(parseInt(card.dataset.index, 10));
        return;
      }
      // First click → flip to show info
      card.classList.add('is-flipped');
    });
  });

  /* Keyboard: Escape un-flips all cards or closes lightbox */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (lightbox.classList.contains('is-open')) {
        closeLightbox();
      } else {
        document.querySelectorAll('.img-card.is-flipped').forEach(c => c.classList.remove('is-flipped'));
      }
    }
    if (lightbox.classList.contains('is-open')) {
      if (e.key === 'ArrowLeft')  navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    }
  });

  /* ─ lightbox controls ─ */
  lbClose.addEventListener('click', closeLightbox);
  lbBack.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => navigateLightbox(-1));
  lbNext.addEventListener('click', () => navigateLightbox(1));

  function openLightbox(index) {
    lightboxIndex = ((index % LIGHTBOX_DATA.length) + LIGHTBOX_DATA.length) % LIGHTBOX_DATA.length;
    const data = LIGHTBOX_DATA[lightboxIndex];
    lbImg.src = data.src;
    lbImg.alt = data.caption;
    lbCap.textContent = data.caption;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function navigateLightbox(dir) {
    openLightbox(lightboxIndex + dir);
  }
}


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
  initTeaser();
  initImageCards();
  initTabs();
  initScrollReveal();
  initSmoothAnchors();
  initParallax();
});