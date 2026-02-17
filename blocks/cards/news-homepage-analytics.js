import { ctaInteraction, minifyText , getPersona } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.news-helpful-homepage.news-helpful .button-container')) {
    const secondaryLink = e.target.closest('.news-helpful-homepage.news-helpful .button-container .button');
     const nextPageURL = e.target.closest('.news-helpful-homepage.news-helpful .button-container .button')?.getAttribute("href");
    ctaInteraction('', minifyText(secondaryLink?.textContent) , '', 'read more','news-helpful','news-helpful ','',getPersona(),nextPageURL,'cta-link','internal','quick-link','in-content','','','','','','','');
  }   
});

  window.adobeDataLayer