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
      const secondaryLink = e.target.closest('.faq-frequently-question-list .button-container .button');
      // const titleContainer = targetContainer?.previousElementSibling;
      const ctaTitle =e.target.closest('.faq-frequently-question-list').querySelector("h3");
      const ctaSourceEle = linkEle?.closest('.faq-frequently-question-title')?.parentElement?.querySelector('h1, h2, h3, h4, h5, h6');
      const pageRegion = getPageRegion(e.target.closest('.faq-frequently-question-list .button-container .button'));
      const componentIndex = getComponentIndex(e.target.closest('.faq-frequently-question-list .button-container .button'));
      const nextPageURL = e.target.closest(".faq-frequently-question-list .button-container .button")?.getAttribute("href");

      ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent),minifyText(ctaSourceEle?.textContent), 'faq category', 'faq', componentIndex, getPersona(),nextPageURL, 'cta-click', 'internal', 'in-page-nav', 'in-content', '', '', '', 'faq', '');
    } else if (target.closest('.faq-cant-find-looking-for')) {
      const targetContainer = target.closest('.faq-cant-find-looking-for');
      const titleContainer = targetContainer?.querySelector('.default-content-wrapper');
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaTitleEle = linkEle?.closest('.cards-card-body')?.querySelector('h1, h2, h3, h4, h5, h6');

      ctaInteraction('', ctaText, minifyText(ctaTitleEle?.textContent), '', minifyText(title?.textContent), '', '');
    }
  }
});
