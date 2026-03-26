import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.rate-details .button-container')) {
    const secondaryLink = e.target.closest('.rate-details .button-container a');
    const pageRegion = getPageRegion(e.target.closest('.rate-details .button-container a'));
    const componentIndex = getComponentIndex(e.target.closest('.rate-details .button-container a'));
    const ctaTitle = e.target.closest('.rate-details').querySelector("h1,h2,h3,h4,h5,h6");
    const ctaSource = e.target.closest('.rate-details').querySelector("h1,h2,h3,h4,h5,h6");

    const nextPageURL = e.target.closest(".rate-details .button-container a")?.getAttribute("href");
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent),minifyText(ctaSource?.textContent), 'rate-details', 'columns-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', 'rate-details', '', '', '', '');
  }
})
