import { init as initNav }             from './nav.js';
import { init as initGapViz }          from './gap-viz.js';
import { init as initNewsletter }      from './newsletter.js';
import { init as initLeadMagnets }     from './lead-magnets.js';
import { init as initTestimonials }    from './testimonials.js';
import { init as initPricingExplorer } from './pricing-explorer.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initGapViz();
  initNewsletter();
  initLeadMagnets();
  initTestimonials();
  initPricingExplorer();
});
