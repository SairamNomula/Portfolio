const throttle = (fn, wait = 100) => {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...args);
    }
  };
}


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

  // SCROLL HANDLER (throttled)
  const onScroll = () => {
    const y = window.scrollY;
    // shrink header after 50px
    header?.classList.toggle("header--scrolled", y > 50);
    // show back-to-top after 300px
    backBtn?.classList.toggle("visible", y > 300);
  };
  window.addEventListener("scroll", throttle(onScroll, 100));


  // SCROLL-SPY: highlight nav link for section in view
  const sections = document.querySelectorAll("section[id]");
  const spy = new IntersectionObserver((entries) => {
    for (const ent of entries) {
      const navLink = document.querySelector(`.nav__link[href="#${ent.target.id}"]`);
      navLink?.classList.toggle("active", ent.isIntersecting);
    }
  }, { rootMargin: "-50% 0px -50% 0px" });
  sections.forEach(sec => spy.observe(sec));

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

  // BACK TO TOP CLICK
  backBtn?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );


  // 1) Close on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    navMenu?.classList.remove('show');
  }
});

// 2) Simple focus-trap inside the menu when open
const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const trapFocus = () => {
  const nodes = Array.from(navMenu.querySelectorAll(focusableSelectors));
  if (!nodes.length) return;
  const first = nodes[0], last = nodes[nodes.length - 1];

  navMenu.addEventListener('keydown', function onKey(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
};

// invoke whenever you open the menu
navToggle?.addEventListener('click', () => {
  navMenu?.classList.add('show');
  setTimeout(() => navClose.focus(), 300); // move focus into menu
  trapFocus();
});

});


