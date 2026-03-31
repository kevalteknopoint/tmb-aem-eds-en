import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.aboutus-grid-content .button-container')) {
    const ctaSource = e.target.closest('.aboutus-grid-content').querySelector("#explore-other-ways-to-save");
    const secondaryLink = e.target.closest('.aboutus-grid-content .button-container a');
    const pageRegion = getPageRegion(e.target.closest('.aboutus-grid-content .button-container a'));
    const componentIndex = getComponentIndex(e.target.closest('.aboutus-grid-content .button-container a'));
    const ctaTitle = e.target.closest('.aboutus-grid-content').querySelector("h1,h2,h3,h4");
    const nextPageURL = e.target.closest(".aboutus-grid-content .button-container a")?.getAttribute("href");
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), minifyText(ctaSource?.textContent), 'committee', 'columns', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', '', '', '', '', 'committee ');
  }
});
