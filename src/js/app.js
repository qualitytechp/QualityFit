document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const navLinks = Array.from(document.querySelectorAll('.nav__links a'));
  const sections = Array.from(document.querySelectorAll('section[id]'));

  const setActiveLink = () => {
    const currentPosition = window.scrollY + 120;
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
    nav.classList.toggle('nav--scrolled', window.scrollY > 20);
    setActiveLink();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});
