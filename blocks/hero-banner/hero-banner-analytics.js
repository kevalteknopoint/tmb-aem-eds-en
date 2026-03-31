import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.hero-banner-container .hero-banner-actions a')) {
    // const secondaryLink = e.target.closest('.news-helpful .hero-banner-actions a .button');
    const ctaSource = e.target.closest('.hero-banner-container').querySelector("h1,h2,h3,h4,h5,h6");
    const componentIndex = getComponentIndex(e.target.closest('.hero-banner-container .hero-banner-actions a '));
    const nextPageURL = e.target.closest('.hero-banner-container .hero-banner-actions a ')?.getAttribute("href");
    const ctaLink = e.target.closest('.hero-banner-container .hero-banner-actions a ');
    const ctaTitle = e.target.closest('.hero-banner-container').querySelector("h1,h2,h3,h4,h5,h6");
    const pageRegion = getPageRegion(e.target.closest('.hero-banner-container .hero-banner-actions a '));
    ctaInteraction(pageRegion, minifyText(ctaLink?.textContent), minifyText(ctaTitle?.textContent), minifyText(ctaSource?.textContent), 'hero banner container', 'hero banner container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'hero-banner', 'in-content', '', '', '', 'hero banner container', '', '', '');
  }
});
