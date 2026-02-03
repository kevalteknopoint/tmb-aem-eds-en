import { ctaInteraction, minifyText } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.quick-links-container').querySelector("ul li a")) {
    const secondaryLink = e.target.closest('.quick-links-container').querySelector("ul li a");
    ctaInteraction('', minifyText(secondaryLink?.textContent) , '', '','banking/savings/loans','','','','cta-click','internal','quick-link','in-content','','','','','','');
  }   
});