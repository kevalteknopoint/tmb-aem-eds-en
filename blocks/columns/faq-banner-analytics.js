import { ctaInteraction, minifyText , getPersona, getPageRegion, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.news-helpful-homepage.news-helpful .button-container')) {
    // const secondaryLink = e.target.closest('.news-helpful-homepage.news-helpful .button-container .button');
     const componentIndex = getComponentIndex(e.target.closest('.news-helpful-homepage.news-helpful .button-container .button'));
     const nextPageURL = e.target.closest('.news-helpful-homepage.news-helpful .button-container .button')?.getAttribute("href");
      const ctaLink = e.target.closest('.news-helpful-homepage.news-helpful .button-container .button');
    const ctaTitle =e.target.closest('.news-helpful-homepage.news-helpful').querySelector('p');
     const pageRegion = getPageRegion(e.target.closest('.news-helpful-homepage.news-helpful .button-container .button'));
    ctaInteraction(pageRegion, minifyText(ctaLink?.textContent),minifyText(ctaTitle?.textContent)  , '', 'read more','news-helpful',componentIndex,getPersona(),nextPageURL,'cta-link','internal','quick-link','in-content','','','','news-info-homepage','','','');
  }   
});

