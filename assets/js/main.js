import { init as initNav }        from './nav.js';
import { init as initGapViz }     from './gap-viz.js';
import { init as initNewsletter } from './newsletter.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initGapViz();
  initNewsletter();
});
