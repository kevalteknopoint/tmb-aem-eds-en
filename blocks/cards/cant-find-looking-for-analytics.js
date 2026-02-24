import { ctaInteraction, minifyText,getComponentIndex,getPageRegion,getPersona } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const { target } = e;

  if (target.closest('a') && target.closest('.button-container')) {
    const linkEle = target.closest('a');
    const ctaText = minifyText(linkEle?.textContent);

    if (target.closest('.faq-cant-find-looking-for')) {
      const targetContainer = target.closest('.faq-cant-find-looking-for');
      const titleContainer = targetContainer?.querySelector('.default-content-wrapper');
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaTitleEle = linkEle?.closest('.cards-card-body')?.querySelector('h1, h2, h3, h4, h5, h6');
      const pageRegion = getPageRegion(e.target.closest('.cards-wrapper')?.querySelector("ul li a"));
      const componentIndex = getComponentIndex(e.target.closest('.cards-wrapper')?.querySelector("ul li a"));
      const nextPageURL = target.closest('.button-container')?.getAttribute("href");

      ctaInteraction(pageRegion, ctaText, minifyText(ctaTitleEle?.textContent), 'can’t find what you are looking for?', minifyText(title?.textContent), '', componentIndex,getPersona(),nextPageURL,'cta-click','external','in-page-nav','in-content','','','','can’t find what you are looking for?','');
    }
  }
});

