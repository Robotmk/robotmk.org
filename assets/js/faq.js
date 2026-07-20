// Category pills + live search for the FAQ page.
//
// Progressive enhancement over a page that already works: the markup ships a
// plain, grouped list of native <details> accordions, and the control bar is
// server-rendered with `hidden`. This module is what un-hides it — so if the
// bundle fails to load, the visitor never sees controls that do nothing.

export function init() {
  const controls = document.querySelector('[data-faq-controls]');
  if (!controls) return;

  const list = document.querySelector('.faq__list');
  const input = document.getElementById('faq-search');
  const noResults = document.querySelector('[data-faq-no-results]');
  if (!list || !input || !noResults) return;

  const pills = Array.from(controls.querySelectorAll('.faq__pill'));
  const groups = Array.from(list.querySelectorAll('.faq__category'));

  // Fold case and strip diacritics, so "Ausfuhrung" finds "Ausführung".
  const normalise = (s) =>
    s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // Question and answer text are searched together, indexed once up front.
  const items = Array.from(list.querySelectorAll('.faq__item')).map((el) => ({
    el,
    haystack: normalise(el.textContent),
  }));

  let category = 'all';
  let query = '';

  function apply() {
    let totalVisible = 0;

    groups.forEach((group) => {
      const inCategory = category === 'all' || group.dataset.category === category;
      let groupVisible = 0;

      items
        .filter(({ el }) => group.contains(el))
        .forEach(({ el, haystack }) => {
          const show = inCategory && (query === '' || haystack.includes(query));
          el.hidden = !show;
          // Collapse anything being filtered away, so it isn't left open
          // when it comes back into view.
          if (!show) el.open = false;
          if (show) groupVisible += 1;
        });

      group.hidden = groupVisible === 0;
      totalVisible += groupVisible;
    });

    noResults.hidden = totalVisible > 0;
  }

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('faq__pill--active'));
      pill.classList.add('faq__pill--active');
      category = pill.dataset.category;
      apply();
    });
  });

  input.addEventListener('input', () => {
    query = normalise(input.value.trim());
    apply();
  });

  // Deep link like /de/faq/#licensing preselects that category.
  const hash = window.location.hash.slice(1);
  const hashPill = hash && pills.find((p) => p.dataset.category === hash);
  if (hashPill) hashPill.click();

  controls.hidden = false;
}
