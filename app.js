document.addEventListener('DOMContentLoaded', () => {
  // ===== MENU SHOW =====
  const navToggle = document.getElementById('nav-toggle');
  const navMenu   = document.getElementById('nav-menu');
  navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('show');
  });

  // ===== ACTIVE LINK & HIDE MOBILE MENU =====
  const navLinks = Array.from(document.querySelectorAll('.nav__link'));
  navLinks.forEach(link =>
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      navMenu?.classList.remove('show');
    })
  );

  // ===== SCROLLREVEAL =====
  if (window.ScrollReveal) {
    const sr = ScrollReveal({ origin: 'top', distance: '80px', duration: 2000, reset: true });
    sr.reveal('.home__title');
    sr.reveal('.button',            { delay: 200 });
    sr.reveal('.home__img',         { delay: 400 });
    sr.reveal('.home__social-icon', { interval: 200 });
    sr.reveal('.about__img');
    sr.reveal('.about__subtitle', { delay: 400 });
    sr.reveal('.about__typing',   { delay: 400 });
    sr.reveal('.about__text',     { delay: 400 });
    sr.reveal('.work__img',      { interval: 200 });
    sr.reveal('.contact__input', { interval: 200 });
  }

  // ===== TYPED.JS =====
  if (window.Typed) {
    new Typed('.typing-1', {
      strings:   ['Developer', 'Designer', 'Engineer', 'Analyst'],
      typeSpeed: 70,
      backSpeed: 40,
      loop:      true
    });
    new Typed('.typing', {
      strings:   ['Developer', 'Designer', 'Engineer', 'Analyst'],
      typeSpeed: 70,
      backSpeed: 30,
      loop:      true
    });
  }

  // ===== SKILLS ANIMATION =====
  const skillGroups = Array.from(document.querySelectorAll('.skills__group'));
  if (skillGroups.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    skillGroups.forEach(group => observer.observe(group));
  }

  // ===== FEATURED MARQUEE SETUP =====
  // In app.js, inside DOMContentLoaded:
const carousel = document.querySelector('#featured .carousel');
if (carousel) {
  // clone original five cards so the loop has 10 total
  const originals = Array.from(carousel.children);
  originals.forEach(card => carousel.appendChild(card.cloneNode(true)));
  // hide native scrollbars
  carousel.style.overflow = 'hidden';
}

});
