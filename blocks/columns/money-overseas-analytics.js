import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.money-overseas.money-overseas-variant .button-container')) {
    const secondaryLink = e.target.closest('.money-overseas.money-overseas-variant .overseas-columns-wrapper .button-container a');
    const pageRegion = getPageRegion(e.target.closest('.money-overseas.money-overseas-variant .button-container a'));
    const componentIndex = getComponentIndex(e.target.closest('.money-overseas.money-overseas-variant .button-container a'));
    const ctaTitle = e.target.closest('.money-overseas.money-overseas-variant .overseas-columns-wrapper').querySelector("h1,h2,h3,h4,h5,h6");
    const nextPageURL = e.target.closest(".money-overseas.money-overseas-variant .button-container a")?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'money-overseas', 'columns-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', componentId, '', '', '', '');
  }
});
