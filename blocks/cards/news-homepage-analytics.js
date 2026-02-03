import { ctaInteraction, minifyText } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.news-helpful-homepage.news-helpful .button-container')) {
    const secondaryLink = e.target.closest('.news-helpful-homepage.news-helpful .button-container .buttons');
    ctaInteraction('', minifyText(secondaryLink?.textContent) , '', 'read more','Teachers Mutual Bank comes in top of the class in Money magazine awards','','','','','','cta-link','internal','','quick-link','in-content','','','','','');
  }   
});
