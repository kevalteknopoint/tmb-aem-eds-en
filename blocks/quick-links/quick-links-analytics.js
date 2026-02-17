import { ctaInteraction, minifyText, getPersona } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.quick-links-container')?.querySelector("ul li a")) {
    // const secondaryLink = e.target.closest('.quick-links-container').querySelector("ul li a");
    const ctaLink = e.target.closest('.quick-links-container').querySelector("ul li a");
    const ctaTitle =e.target.closest('.quick-links-container').querySelector("ul").previousElementSibling.querySelector("a");
     const nextPageURL = e.target.closest('.quick-links-container').querySelector("ul li a")?.getAttribute("href");
    ctaInteraction('', minifyText(ctaTitle?.textContent) , minifyText(ctaLink?.textContent), '','quick-links','quick-links','',getPersona(),nextPageURL,'cta-click','internal','quick-link','internal','','','','','');
  }   
});
