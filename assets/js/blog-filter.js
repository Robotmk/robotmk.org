// Taxonomie-Filter auf der Blog-Übersicht.
//
// Progressive Enhancement über einer Seite, die bereits funktioniert: die Chips
// sind server-gerenderte Links auf ihre Term-Seite. Ohne diesen Bundle bleiben
// sie genau das. Mit ihm wird der Klick abgefangen und stattdessen im Grid
// gefiltert — Zähler und Reset-Button liegen deshalb `hidden` im Markup und
// werden erst hier eingeblendet.
//
// Verknüpfung ist ODER: eine Karte bleibt stehen, sobald sie mindestens einen
// der aktiven Terms trägt. Ohne Auswahl ist alles sichtbar.

export function init() {
  const filter = document.querySelector('[data-blog-filter]');
  const grid = document.querySelector('.blog-list__grid');
  if (!filter || !grid) return;

  const countEl = filter.querySelector('[data-blog-filter-count]');
  const resetBtn = filter.querySelector('[data-blog-filter-reset]');
  if (!countEl || !resetBtn) return;

  const chips = Array.from(filter.querySelectorAll('.filter-chip'));
  const cards = Array.from(grid.querySelectorAll('.blog-card')).map((el) => ({
    el,
    terms: new Set((el.dataset.terms || '').split(' ').filter(Boolean)),
  }));

  const active = new Set();

  function apply() {
    const selected = Array.from(active);
    let shown = 0;

    for (const card of cards) {
      const visible = selected.length === 0 || selected.some((key) => card.terms.has(key));
      card.el.hidden = !visible;
      if (visible) shown++;
    }

    for (const chip of chips) {
      const on = active.has(chip.dataset.key);
      chip.classList.toggle('filter-chip--active', on);
      // aria-current statt aria-pressed: die Chips bleiben Links, keine Buttons.
      if (on) chip.setAttribute('aria-current', 'true');
      else chip.removeAttribute('aria-current');
    }

    const filtering = selected.length > 0;
    countEl.hidden = !filtering;
    resetBtn.hidden = !filtering;
    if (filtering) {
      countEl.textContent = (countEl.dataset.template || '{shown}/{total}')
        .replace('{shown}', shown)
        .replace('{total}', cards.length);
    }
  }

  for (const chip of chips) {
    chip.addEventListener('click', (event) => {
      // Modifier-Klicks gehören dem Browser (neuer Tab auf die Term-Seite).
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();

      const key = chip.dataset.key;
      if (active.has(key)) active.delete(key);
      else active.add(key);
      apply();
    });
  }

  resetBtn.addEventListener('click', () => {
    active.clear();
    apply();
  });

  apply();
}
