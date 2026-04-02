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
      const componentId = target.closest('.section').getAttribute('id');

      ctaInteraction(pageRegion, ctaText, minifyText(ctaTitleEle?.textContent), 'cant find what you are looking for?', minifyText(title?.textContent), '', componentIndex, getPersona(), nextPageURL, 'cta-click', 'external', 'in-page-nav', 'in-content', '', '', '', componentId, '');
    }
    if (e.target.closest('.faq-cant-find-looking-for.faq-cant-find-looking-for-variant.cards-container:not(.navigation-cards-container)')) {
      const targetContainer = target.closest('.faq-cant-find-looking-for.faq-cant-find-looking-for-variant');
      const titleContainer = targetContainer?.querySelector('.default-content-wrapper');
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaTitleEle = linkEle?.closest('.cards-card-body')?.querySelector('h1, h2, h3, h4, h5, h6');
      const pageRegion = getPageRegion(linkEle);
      const componentIndex = getComponentIndex(linkEle);
      const nextPageURL = (linkEle)?.getAttribute("href");
      const componentId = target.closest('.section').getAttribute('id');
      ctaInteraction(pageRegion, ctaText, minifyText(ctaTitleEle?.textContent), 'WAYS TO GET IN TOUCH', minifyText(title?.textContent), '', componentIndex, getPersona(), nextPageURL, 'cta-click', 'external', 'in-page-nav', 'in-content', '', '', '', componentId, '');
    }
    if (e.target.closest('.navigation-cards-container:not(.rates-saver.faq-cant-find-looking-for-variant)')) {

      const link = e.target.closest('.nav-card a');
      if (!link) return;

      const container = link.closest('.navigation-cards-container');
      //  Section title (top heading)
      const sectionTitle = container?.querySelector('.default-content-wrapper h1, h2, h3, h4, h5, h6');

      //  Card title (year like 2024)
      const cardTitle = link.closest('.nav-card')?.querySelector('h1, h2, h3, h4, h5, h6');

      const pageRegion = getPageRegion(link);
      const componentIndex = getComponentIndex(link);
      const nextPageURL = link.getAttribute("href");

      const componentId = link.closest('.section')?.getAttribute('id') || '';

      ctaInteraction(
        pageRegion,
        minifyText(cardTitle?.textContent),                 
        minifyText(sectionTitle?.textContent),              
        minifyText(sectionTitle?.textContent),             
        'navigation cards',                                 
        'navigation cards',
        componentIndex,
        getPersona(),
        nextPageURL,
        'cta-click',
        'internal',                                       
        'in-page-nav',
        'in-content',
        '',
        '',
        '',
        componentId,
        ''
      );
    }
  }
});
