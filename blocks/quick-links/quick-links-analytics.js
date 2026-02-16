import { ctaInteraction, minifyText } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.quick-links-container').querySelector("ul li a")) {
    const secondaryLink = e.target.closest('.quick-links-container').querySelector("ul li a");
    const ctaLink = e.target.closest('.quick-links-container').querySelector("ul li a");
     const nextPageURL = e.target.closest('.quick-links-container').querySelector("ul li a")?.getAttribute("href");
    ctaInteraction('', minifyText(secondaryLink?.textContent) , minifyText(ctaLink?.textContent), '','banking/savings/loans','','','',nextPageURL,'cta-click','internal','quick-link','internal','','','','','');
  }   
});
pageRegion,ctaText,bannerName,bannerPosition,componentName,componentType,componentIndex,componentPersona,nextpageUrl,interactionType,linkType,requiredFieldMissingFlag,testUserFlag,qaSessionFlag,componentId,componentIdValidFlag