// ====================================
// 💖 TRANS GIRLIES TRADING CLUB
// main.js — Sparkle & Functionality
// ====================================

// ── FLOATING PARTICLES ──
const PARTICLE_EMOJIS = [
  '💖', '🌸', '✨', '💅', '🦋', '🩷', '🌷', '💎',
  '⭐', '🌈', '🏳️‍⚧️', '🏳️‍🌈', '💸', '🌺', '🎀', '💫', '🔮', '🌟'
];

function createParticles() {
  const container = document.getElementById('particles');
  const count = 25;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.classList.add('particle');
    el.textContent = PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)];

    // Random horizontal position
    el.style.left = `${Math.random() * 100}%`;

    // Random duration between 8s and 20s
    const duration = 8 + Math.random() * 12;
    el.style.animationDuration = `${duration}s`;

    // Staggered start so they don't all spawn at once
    el.style.animationDelay = `${Math.random() * duration * -1}s`;

    // Random size
    const size = 0.8 + Math.random() * 0.8;
    el.style.fontSize = `${size}rem`;

    container.appendChild(el);
  }
}

// ── POPUP ──
function openPopup() {
  document.getElementById('popup').classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closePopup() {
  document.getElementById('popup').classList.remove('active');
  document.body.style.overflow = '';
}

// Close if user clicks the dark overlay backdrop (not the box itself)
function closePopupOutside(event) {
  if (event.target === document.getElementById('popup')) {
    closePopup();
  }
}

// Close popup with Escape key — good accessibility practice
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePopup();
});

// ── MOBILE NAV ──
function toggleNav() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// Close nav when a link is clicked on mobile
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// ── SCROLL REVEAL ──
// We mark elements with class="reveal" and transition them in as they scroll into view.
// Using IntersectionObserver is more performant than scroll event listeners.
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.about-card, .rule-item, .trading-card, .ed-card, .ji-item'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger each card's reveal slightly based on its index
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,       // trigger when 10% of element is visible
      rootMargin: '0px 0px -40px 0px', // trigger slightly before it's fully in view
    }
  );

  targets.forEach(el => observer.observe(el));
}

// ── AUTO POPUP on first visit ──
// Shows the join popup after a short delay on the user's first visit to the page.
// Uses sessionStorage so it only fires once per session.
function maybeShowWelcomePopup() {
  if (!sessionStorage.getItem('tgtc_visited')) {
    sessionStorage.setItem('tgtc_visited', '1');
    setTimeout(openPopup, 3500); // delay so the page loads beautifully first
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initScrollReveal();
  maybeShowWelcomePopup();
});
