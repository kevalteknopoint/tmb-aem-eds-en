import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
   const link = e.target.closest('.quick-links-container ul li a');
  if (e.target.closest('.quick-links:not(.quick-links-container) .button-container')?.querySelector("a")) {
    const pageRegion = e.target.closest('.quick-links-container .quick-links').querySelector('.button-container a');
    const componentIndex = getComponentIndex(e.target.closest('.quick-links-container .quick-links').querySelector('.button-container'));
    const nextPageURL =e.target.closest('.quick-links-container .quick-links').querySelector('.button-container a')?.getAttribute("href");
    const ctaText = e.target.closest('.quick-links-container .quick-links').querySelector('.button-container');
    ctaInteraction(pageRegion, minifyText(ctaText?.textContent), 'cta-click', '', 'quick-links', 'quick-links', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'quick-link', 'internal', '', '', '', 'quicklinkshomepage', '');
  }
  if (link) {

    const pageRegion = getPageRegion(link);
    const componentIndex = getComponentIndex(link);

    const ctaLink = link;
    const ctaTitle = link.closest('li')?.querySelector('.quick-link-text');

    const nextPageURL = link.getAttribute("href");
    ctaInteraction(pageRegion, minifyText(ctaLink?.textContent), minifyText(ctaTitle?.textContent), 'cta-click', 'quick-links', 'quick-links', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'quick-link', 'internal', '', '', '', 'quicklinkshomepage', '');
  }

});
