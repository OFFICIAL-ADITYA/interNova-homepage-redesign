(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#nav-menu');
  const dropdowns = [...document.querySelectorAll('.has-dropdown')];
  const mobile = () => window.matchMedia('(max-width: 991px)').matches;

  const closeDropdowns = (except = null) => dropdowns.forEach(item => {
    if (item !== except) {
      item.classList.remove('is-open');
      item.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    }
  });
  const closeMenu = () => {
    menu?.classList.remove('open');
    toggle?.classList.remove('is-active');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open navigation');
    closeDropdowns();
  };

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.classList.toggle('is-active', open);
    menu?.classList.toggle('open', open);
    if (!open) closeDropdowns();
  });

  dropdowns.forEach(item => {
    const button = item.querySelector('.dropdown-toggle');
    button?.addEventListener('click', event => {
      event.preventDefault();
      const willOpen = !item.classList.contains('is-open');
      closeDropdowns(item);
      item.classList.toggle('is-open', willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
    });
  });

  document.addEventListener('click', event => {
    if (mobile() && menu?.classList.contains('open') && !menu.contains(event.target) && !toggle?.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
      toggle?.focus();
    }
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { if (mobile()) closeMenu(); }));
  window.addEventListener('resize', () => { if (!mobile()) closeMenu(); });
  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 12), { passive: true });

  // Reveal elements gracefully; content remains visible if scripting is unavailable.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));
})();
