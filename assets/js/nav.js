export function init() {
  const hamburger = document.querySelector('.nav__hamburger');
  const overlay = document.getElementById('nav-overlay');

  if (!hamburger || !overlay) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Menü öffnen' : 'Menü schließen');
    overlay.setAttribute('aria-hidden', String(isOpen));
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close overlay on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Menü öffnen');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      hamburger.focus();
    }
  });

  // Close overlay on overlay link click
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Menü öffnen');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}
