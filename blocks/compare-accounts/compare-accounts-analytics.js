import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex} from "../../scripts/analytics/exports.js";

export function executeAnalytics() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.compare-accounts a')) {
      const secondaryLink = e.target.closest('.compare-accounts a');
      const pageRegion = getPageRegion(e.target.closest('.compare-accounts a'));
       const componentIndex = getComponentIndex(e.target.closest('.compare-accounts a'));
       const ctaTitle =e.target.closest('.compare-accounts').querySelector("h1,h2,h3,h4");
      const nextPageURL = e.target.closest(".compare-accounts a")?.getAttribute("href");
      ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent) , 'customer', 'customer','customer',componentIndex,getPersona(),nextPageURL,'cta-link','internal','quick-link','in-content','','','','','','','','');
    } 
        if (e.target.closest('.customer .compare-accounts-wrapper .button-container')) {
      const secondaryLink = e.target.closest('.customer .compare-accounts-wrapper .button-container a');
      const pageRegion = getPageRegion(e.target.closest('.customer .compare-accounts-wrapper .button-container a'));
       const componentIndex = getComponentIndex(e.target.closest('.customer .compare-accounts-wrapper .button-container a'));
       const ctaTitle =e.target.closest('.customer').querySelector("h1,h2,h3,h4");
      const nextPageURL = e.target.closest(".customer .compare-accounts-wrapper .button-container a")?.getAttribute("href");
      ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent) , 'customer', 'customer','customer',componentIndex,getPersona(),nextPageURL,'cta-link','internal','quick-link','in-content','','','','','','','','');
    }   
  });
  window.customerAnalyticsLoaded = true;
}
