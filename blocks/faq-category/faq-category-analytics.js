import { ctaInteraction, faqInteraction, minifyText, getComponentIndex, getPageRegion, getPersona} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const { target } = e;

  if (target.closest('.faq-link')) {
    const linkEle = target.closest('.faq-link');
    const faqTitle = minifyText(linkEle?.textContent);
    if (target.closest('.faq-frequently-question')) {
      const targetContainer = target.closest('.faq-frequently-question');
      const titleContainer = targetContainer?.previousElementSibling;
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaSourceEle = linkEle?.closest('.faq-items-list')?.parentElement?.querySelector('h1, h2, h3, h4, h5, h6');
      const pageRegion = getPageRegion(target.closest('.faq-link'));
      const componentIndex = getComponentIndex(target.closest('.faq-link'));
      faqInteraction(pageRegion, faqTitle, minifyText(ctaSourceEle?.textContent), minifyText(title?.textContent), 'faq-frequently', '',componentIndex,getPersona(),'faq-toggle','faq-expand','FAQ_CARD_LIMITS','','open','','faq swift code','','','','','','faq','');
    } else if (target.closest('.faq-frequently-question-list')) {
      const targetContainer = target.closest('.faq-frequently-question-list');
      const titleContainer = targetContainer?.previousElementSibling;
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaSourceEle = linkEle?.closest('.faq-items-list')?.parentElement?.querySelector('h1, h2, h3, h4, h5, h6');
      const pageRegion = getPageRegion(target.closest('.faq-link'));
      const componentIndex = getComponentIndex(target.closest('.faq-link'));

      faqInteraction(pageRegion, faqTitle, minifyText(ctaSourceEle?.textContent), minifyText(title?.textContent), 'faq-frequently', '',componentIndex,getPersona(),'faq-toggle','faq-expand','FAQ_CARD_LIMITS','','open','','faq swift code','','','','','','faq','');
    }
  }


  if (target.closest('a') && target.closest('.button-container')) {
    const linkEle = target.closest('a');
    const ctaText = minifyText(linkEle?.textContent);

    if (target.closest('.faq-frequently-question-list')) {
      const targetContainer = target.closest('.faq-frequently-question-list');
      const titleContainer = targetContainer?.previousElementSibling;
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaSourceEle = linkEle?.closest('.button-container')?.parentElement?.querySelector('h1, h2, h3, h4, h5, h6');
      const pageRegion = getPageRegion(target.closest('.faq-link'));
      const componentIndex = getComponentIndex(target.closest('.faq-link'));
      const nextPageURL = target.closest('.button-container')?.getAttribute("href");

    
      ctaInteraction(pageRegion, ctaText, minifyText(ctaSourceEle?.textContent), minifyText(title?.textContent), 'fragment-container', 'cards', componentIndex,getPersona(),nextPageURL,'cta-click','external','in-page-nav','in-content','','','');
    }
  }
});
