document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = Array.from(document.querySelectorAll('section[id], header.hero'));

  const setActiveLink = () => {
    const currentPosition = window.scrollY + 120;
    let activeLink = null;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (currentPosition >= top && currentPosition < top + height) {
        activeLink = section.id ? section.id : 'inicio';
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === activeLink);
    });
  };

  const handleScroll = () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > 20);
    setActiveLink();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (window.AOS) {
    window.AOS.init({ duration: 850, once: true, easing: 'ease-out-cubic', offset: 120 });
  }
});
