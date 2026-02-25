import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.momentum-saver-section .button-container')) {
    const secondaryLink = e.target.closest('.momentum-saver-section .button-container .button');
    const pageRegion = getPageRegion(e.target.closest('.momentum-saver-section .button-container .button'));
     const componentIndex = getComponentIndex(e.target.closest('.momentum-saver-section .button-container .button'));
     const ctaTitle =e.target.closest('.momentum-saver-section').querySelector("h2");
    const nextPageURL = e.target.closest(".momentum-saver-section .button-container .button")?.getAttribute("href");
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent) , '', 'momentum-saver-section','columns-container',componentIndex,getPersona(),nextPageURL,'cta-link','internal','quick-link','in-content','','','','momentum-saver','','','','');
  } 
    if (e.target.closest('.momentum-image-saver .button-container')) {
    const secondaryLink = e.target.closest('.momentum-image-saver .button-container .button');
    const pageRegion = getPageRegion(e.target.closest('.momentum-image-saver .button-container .button'));
     const componentIndex = getComponentIndex(e.target.closest('.momentum-image-saver .button-container .button'));
     const ctaTitle =e.target.closest('.momentum-image-saver').querySelector("h2");
    const nextPageURL = e.target.closest(".momentum-image-saver .button-container .button")?.getAttribute("href");
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent) , '', 'momentum-image-saver','columns-container',componentIndex,getPersona(),nextPageURL,'cta-link','internal','quick-link','in-content','','','','momentum-saver','','','','');
  }     
});