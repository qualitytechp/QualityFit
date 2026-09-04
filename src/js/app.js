document.addEventListener('DOMContentLoaded', () => {
  /* ---------------------------------------------------------------
     Navegación: fondo al bajar y enlace activo según la sección
     --------------------------------------------------------------- */
  const nav = document.querySelector('nav');
  const navLinks = Array.from(document.querySelectorAll('.nav__links a'));
  const sections = Array.from(document.querySelectorAll('section[id], header[id]'));

  const setActiveLink = () => {
    const currentPosition = window.scrollY + 140;
    let activeId = null;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (currentPosition >= top && currentPosition < top + height) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === activeId);
    });
  };

  const handleScroll = () => {
    if (nav) nav.classList.toggle('nav--scrolled', window.scrollY > 20);
    setActiveLink();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------------------------------------------------------------
     Videos por módulo: al cambiar de módulo se muestra su panel y se
     detiene el video que estuviera sonando, para que nunca queden dos
     reproduciéndose al tiempo.
     --------------------------------------------------------------- */
  const modules = document.getElementById('modules');
  if (!modules) return;

  const chips = Array.from(modules.querySelectorAll('.modules__chip'));
  const panels = Array.from(modules.querySelectorAll('.modules__panel'));

  const showModule = (id, { scroll = false } = {}) => {
    const target = panels.find((p) => p.dataset.mod === id);
    if (!target) return;

    panels.forEach((panel) => {
      const isTarget = panel === target;
      panel.hidden = !isTarget;
      panel.classList.toggle('is-active', isTarget);
      if (!isTarget) {
        const video = panel.querySelector('video');
        if (video && !video.paused) video.pause();
      }
    });

    chips.forEach((chip) => {
      const isTarget = chip.dataset.mod === id;
      chip.classList.toggle('is-active', isTarget);
      chip.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    if (scroll) modules.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => showModule(chip.dataset.mod));
  });

  // Al reproducir un video, se pausan los demás
  modules.querySelectorAll('video').forEach((video) => {
    video.addEventListener('play', () => {
      modules.querySelectorAll('video').forEach((other) => {
        if (other !== video && !other.paused) other.pause();
      });
    });
  });

  // Enlaces del pie de página que llevan directo a un módulo
  document.querySelectorAll('[data-goto]').forEach((link) => {
    link.addEventListener('click', () => {
      showModule(link.dataset.goto, { scroll: true });
    });
  });

  // Permite compartir un módulo por URL: .../#modulos=tesoreria
  const fromHash = window.location.hash.match(/^#modulos=([a-z]+)$/i);
  if (fromHash) showModule(fromHash[1].toLowerCase(), { scroll: true });
});
