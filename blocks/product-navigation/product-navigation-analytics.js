import { ctaInteraction,subMenuClick, getComponentIndex, getPageRegion, getPersona } from "../../scripts/analytics/exports.js";
document.addEventListener('click', (e) => {
  if (e.target.closest('.product-navigation ul li a')) {
    const button = e.target.closest('.product-navigation ul li a');
    const pageRegion = getPageRegion(button);
    const componentIndex = getComponentIndex(button);
    const nextPageURL = e.target.closest(".product-navigation ul li a")?.getAttribute("href");
    const menuText  = e.target.closest(".product-navigation ul li a")?.getAttribute("href");
    subMenuClick(pageRegion, menuText , 'navigation', 'navigation', componentIndex, getPersona(), nextPageURL, 'cta-click', 'in-page-nav', 'external', 'in-content', 'navigation');
  }
  
});

document.addEventListener('click', (e) => {
  if (e.target.closest('.product-navigation .button-container')) {
    const secondaryLink = e.target.closest('.product-navigation .button-container .button');
    const pageRegion = getPageRegion(e.target.closest('.product-navigation .button-container .button'));
     const componentIndex = getComponentIndex(e.target.closest('.product-navigation .button-container .button'));
    //  const ctaTitle =e.target.closest('.product-navigation').querySelector("h3");
    const nextPageURL = e.target.closest(".product-navigation .button-container .button")?.getAttribute("href");
    ctaInteraction(pageRegion,'', minifyText(secondaryLink?.textContent), 'navigation' , 'navigation',componentIndex,getPersona(),nextPageURL,'cta-link','internal','quick-link','in-content','','','','navigation','',);
  }   
});
pageRegion, ctaText, ctaTitle, ctaSource, componentName, componentType, componentIndex, componentPersona, nextpageUrl, interactionType, linkType, navElementType, navLocation, requiredFieldMissingFlag, testUserFlag, qaSessionFlag, componentId, componentIdValidFlag