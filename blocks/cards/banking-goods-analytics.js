import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.banking-goods .button-container')) {
    const secondaryLink = e.target.closest('.banking-goods .button-container .button');
    const pageRegion = getPageRegion(e.target.closest('.banking-goods .button-container .button'));
     const componentIndex = getComponentIndex(e.target.closest('.banking-goods .button-container .button'));
     const ctaTitle =e.target.closest('.banking-goods').querySelector("h3");
    const nextPageURL = e.target.closest(".banking-goods .button-container .button")?.getAttribute("href");
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent) , 'banking for good', 'banking goods','banking goods',componentIndex,getPersona(),nextPageURL,'cta-link','internal','quick-link','in-content','','','','','','','','');
  }   
});

