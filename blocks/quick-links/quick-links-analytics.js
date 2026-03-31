import { ctaInteraction, minifyText, getPersona, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const link = e.target.closest('.quick-links-container a');
  if (e.target.closest('a')?.querySelector('.quick-link-text')) {
    const ctaTitle = link.closest('.quick-links')?.querySelector('.quick-link-text');
    const pageRegion = e.target.closest('.quick-links-container .quick-links').querySelector('.button-container a');
    const componentIndex = getComponentIndex(e.target.closest('.quick-links-container .quick-links').querySelector('.button-container'));
    const nextPageURL = e.target.closest('.quick-links-container .quick-links').querySelector('.button-container a')?.getAttribute("href");
    const ctaText = e.target.closest('.quick-links-container .quick-links').querySelector('.button-container');
    ctaInteraction(pageRegion, minifyText(ctaText?.textContent), minifyText(ctaTitle?.textContent), 'cta-click', '', 'quick-links', 'quick-links', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'quick-link', 'internal', '', '', '', 'quicklinkshomepage', '');
  }

  if (e.target.closest('a')?.closest('li')?.closest('.quick-links')) {
    const ctaTitle = e.target.closest('.quick-links')?.querySelector('.quick-links-text');
    const pageRegion = e.target.closest('.quick-links-container .quick-links').querySelector('a');
    const componentIndex = getComponentIndex(e.target.closest('.quick-links-container .quick-links').querySelector('.button-container'));
    const nextPageURL = e.target.closest('.quick-links-container .quick-links').querySelector('.button-container a')?.getAttribute("href");
    const ctaText = e.target.closest('.quick-links-container .quick-links').querySelector('.button-container');
    ctaInteraction(pageRegion, minifyText(ctaText?.textContent), minifyText(ctaTitle?.textContent), 'cta-click', '', 'quick-links', 'quick-links', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'quick-link', 'internal', '', '', '', 'quicklinkshomepage', '');
  }
});
