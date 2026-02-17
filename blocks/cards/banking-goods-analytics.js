import { ctaInteraction, minifyText, getPersona} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.banking-goods .button-container')) {
    const secondaryLink = e.target.closest('.banking-goods .button-container .button');
     const ctaTitle =e.target.closest('.banking-goods').querySelector("h3");
    const nextPageURL = e.target.closest(".banking-goods .button-container .button")?.getAttribute("href");
    ctaInteraction('', minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent) , '', 'banking goods','banking goods','',getPersona(),nextPageURL,'cta-link','internal','quick-link','in-content','','','','','','','','');
  }   
});

