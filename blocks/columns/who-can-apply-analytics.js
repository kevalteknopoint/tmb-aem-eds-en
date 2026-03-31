import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.accordion-container .button-container')) {
    const secondaryLink = e.target.closest('.accordion-container .accordion-wrapper .button-container a');
    const pageRegion = getPageRegion(e.target.closest('.accordion-container .button-container a'));
    const componentIndex = getComponentIndex(e.target.closest('.accordion-container .button-container a'));
    const ctaTitle = e.target.closest('.accordion-container .accordion-wrapper').querySelector('p');
    const nextPageURL = e.target.closest(".accordion-container .button-container a")?.getAttribute("href");
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'faq links', 'accordion-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', 'faq links', '', '', '', '');
  }

  if (e.target.closest('.tmb-acc-sec.accordion-container .button-container')) {
    const secondaryLink = e.target.closest('.tmb-acc-sec.accordion-container .accordion-wrapper .button-container a');
    const pageRegion = getPageRegion(e.target.closest('.tmb-acc-sec.accordion-container .button-container a'));
    const componentIndex = getComponentIndex(e.target.closest('.tmb-acc-sec.accordion-container .button-container a'));
    const ctaTitle = e.target.closest('.tmb-acc-sec.accordion-container .accordion-wrapper').querySelector('p');
    const nextPageURL = e.target.closest(".tmb-acc-sec.accordion-container .button-container a")?.getAttribute("href");
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'faq links', 'accordion-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', 'faq links', '', '', '', '');
  }
});
