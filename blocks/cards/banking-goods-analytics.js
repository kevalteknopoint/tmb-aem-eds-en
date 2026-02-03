import { ctaInteraction, minifyText } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.banking-goods .button-container')) {
    const secondaryLink = e.target.closest('.banking-goods .button-container .buttons');
    ctaInteraction('', minifyText(secondaryLink?.textContent) , '', 'learn more','built for health professionals','','','','','','cta-link','internal','','quick-link','in-content','','','','','');
  }   
});

