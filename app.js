document.addEventListener('DOMContentLoaded', () => {
  // ===== MENU SHOW/HIDE =====
  const navMenu   = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose  = document.getElementById('nav-close');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show');
    });
  }

  if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show');
    });
  }

  // hide menu when any nav link is clicked
  document.querySelectorAll('.nav__list .nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('show');
    });
  });

  // ===== SCROLLREVEAL =====
  if (window.ScrollReveal) {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: true
    });
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
  const skillGroups = document.querySelectorAll('.skills__group');
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
  const carousel = document.querySelector('#featured .carousel');
  if (carousel) {
    const originals = Array.from(carousel.children);
    originals.forEach(card => carousel.appendChild(card.cloneNode(true)));
    carousel.style.overflow = 'hidden';
  }

  // ===== DYNAMIC COPYRIGHT YEAR =====
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ===== BACK TO TOP BUTTON =====
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    // hide/show on scroll
    window.addEventListener('scroll', () => {
      backBtn.style.display = (window.scrollY > 300 ? 'block' : 'none');
    });

    // scroll up smoothly
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // keyboard accessibility
    backBtn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        backBtn.click();
      }
    });
  }
});
