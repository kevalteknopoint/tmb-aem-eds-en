import { ctaInteraction, minifyText, getComponentIndex, getPageRegion, getPersona } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const { target } = e;

  if (target.closest('a')) {
    const linkEle = target.closest('a');
    const ctaText = minifyText(linkEle?.textContent);

    if (target.closest('.faq-cant-find-looking-for.rates-saver')) {
      const targetContainer = target.closest('.faq-cant-find-looking-for');
      const titleContainer = targetContainer?.querySelector('.default-content-wrapper');
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaTitleEle = linkEle?.closest('.cards-card-body')?.querySelector('h1, h2, h3, h4, h5, h6');
      const pageRegion = getPageRegion(linkEle);
      const componentIndex = getComponentIndex(linkEle);
      const nextPageURL = (linkEle)?.getAttribute("href");
      console.log('rtyu');

      ctaInteraction(pageRegion, ctaText, minifyText(ctaTitleEle?.textContent), 'cant find what you are looking for?', minifyText(title?.textContent), '', componentIndex, getPersona(), nextPageURL, 'cta-click', 'external', 'in-page-nav', 'in-content', '', '', '', 'cant find what you are looking for?', '');
    }
    if (e.target.closest('.faq-cant-find-looking-for.faq-cant-find-looking-for-variant:not(.rates-saver)')) {
      const targetContainer = target.closest('.faq-cant-find-looking-for.faq-cant-find-looking-for-variant');
      const titleContainer = targetContainer?.querySelector('.default-content-wrapper');
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaTitleEle = linkEle?.closest('.cards-card-body')?.querySelector('h1, h2, h3, h4, h5, h6');
      const pageRegion = getPageRegion(linkEle);
      const componentIndex = getComponentIndex(linkEle);
      const nextPageURL = (linkEle)?.getAttribute("href");
      ctaInteraction(pageRegion, ctaText, minifyText(ctaTitleEle?.textContent), 'WAYS TO GET IN TOUCH', minifyText(title?.textContent), '', componentIndex, getPersona(), nextPageURL, 'cta-click', 'external', 'in-page-nav', 'in-content', '', '', '', 'WAYS TO GET IN TOUCH', '');
    }
  }
});
