import { minifyText, getPersona, getPageRegion, getComponentIndex, sideNavMenuClick } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.tabbed-navigation.tabs-container .tabs-tab')) {
    // const secondaryLink = e.target.closest('.tabbed-navigation.tabs-container .tabs-tab .button');
    const ctaSource = e.target.closest('.tabbed-navigation').querySelector("p");
    const componentIndex = getComponentIndex(e.target.closest('.tabbed-navigation.tabs-container .tabs-tab'));
    const nextPageURL = e.target.closest('.tabbed-navigation.tabs-container .tabs-tab')?.getAttribute("href") ? e.target.closest('.tabbed-navigation.tabs-container .tabs-tab')?.getAttribute("href") : "";
    const ctaLink = e.target.closest('.tabbed-navigation.tabs-container .tabs-tab');
    const ctaTitle = e.target.closest('.tabbed-navigation.tabs-container').querySelector('p');
    const pageRegion = getPageRegion(e.target.closest('.tabbed-navigation.tabs-container .tabs-tab'));
    sideNavMenuClick(pageRegion, minifyText(ctaLink?.textContent), minifyText(ctaTitle?.textContent), minifyText(ctaSource?.textContent), 'tabs', 'tabs navigation', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content',"");
  }

});
