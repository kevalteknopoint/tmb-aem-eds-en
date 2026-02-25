import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.quick-links .button-container')?.querySelector("a")) {
    const pageRegion = e.target.closest('.quick-links-container .quick-links').querySelector('.button-container a');
    const componentIndex = getComponentIndex(e.target.closest('.quick-links-container .quick-links').querySelector('.button-container'));
    const nextPageURL =e.target.closest('.quick-links-container .quick-links').querySelector('.button-container a')?.getAttribute("href");
    const ctaText = e.target.closest('.quick-links-container .quick-links').querySelector('.button-container');
    ctaInteraction(pageRegion, minifyText(ctaText?.textContent), '', '', 'quick-links', 'quick-links', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'quick-link', 'internal', '', '', '', 'quicklinkshomepage', '');
  }
  if (e.target.closest('.quick-links-container')?.querySelector("ul li a")) {
    // const secondaryLink = e.target.closest('.quick-links-container').querySelector("ul li a");
    const pageRegion = getPageRegion(e.target.closest('.quick-links-container')?.querySelector("ul li a"));
    const componentIndex = getComponentIndex(e.target.closest('.quick-links-container')?.querySelector("ul li a"));
    const ctaLink = e.target.closest('.quick-links-container .quick-links')?.querySelector("ul li a");
    const ctaTitle = e.target.closest('.quick-links-container .quick-links').querySelector('.quick-link-text');
    const nextPageURL = e.target.closest('.quick-links-container').querySelector("ul li a")?.getAttribute("href");
    ctaInteraction(pageRegion, minifyText(ctaLink?.textContent), minifyText(ctaTitle?.textContent), '', 'quick-links', 'quick-links', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'quick-link', 'internal', '', '', '', 'quicklinkshomepage', '');
  }

});
