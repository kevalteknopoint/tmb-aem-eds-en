import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {

    if (e.target.closest('.who-can-apply-section.accordion-container .button-container')) {
        const secondaryLink = e.target.closest('.who-can-apply-section.accordion-container .accordion-wrapper .button-container a');
        const pageRegion = getPageRegion(e.target.closest('.who-can-apply-section.accordion-container .button-container a'));
        console.log("click occured from second");
        const componentIndex = getComponentIndex(e.target.closest('.who-can-apply-section.accordion-container .button-container a'));
        const ctaTitle = e.target.closest('.who-can-apply-section.accordion-container .accordion-wrapper').querySelector('p');
        const nextPageURL = e.target.closest(".who-can-apply-section.accordion-container .button-container a")?.getAttribute("href");
        ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'who-can-apply-section', 'accordion-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', 'momentum-saver', '', '', '', '');
    }
})