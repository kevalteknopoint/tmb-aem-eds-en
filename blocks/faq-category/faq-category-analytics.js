import { ctaInteraction, faqInteraction, minifyText } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const { target } = e;

  if (target.closest('.faq-link')) {
    const linkEle = target.closest('.faq-link');
    const faqTitle = minifyText(linkEle?.textContent);
    if (target.closest('.faq-frequently-question')) {
      const targetContainer = target.closest('.faq-frequently-question');
      const titleContainer = targetContainer?.previousElementSibling;
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');

      faqInteraction('', faqTitle, '', minifyText(title?.textContent), '', '');
    } else if (target.closest('.faq-frequently-question-list')) {
      const targetContainer = target.closest('.faq-frequently-question-list');
      const titleContainer = targetContainer?.previousElementSibling;
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaSourceEle = linkEle?.closest('.faq-items-list')?.parentElement?.querySelector('h1, h2, h3, h4, h5, h6');

      faqInteraction('', faqTitle, minifyText(ctaSourceEle?.textContent), minifyText(title?.textContent), '', '');
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

      ctaInteraction('', ctaText, minifyText(ctaSourceEle?.textContent), minifyText(title?.textContent), 'frequently asked questions', '', '');
    } else if (target.closest('.faq-cant-find-looking-for')) {
      const targetContainer = target.closest('.faq-cant-find-looking-for');
      const titleContainer = targetContainer?.querySelector('.default-content-wrapper');
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaTitleEle = linkEle?.closest('.cards-card-body')?.querySelector('h1, h2, h3, h4, h5, h6');

      ctaInteraction('', ctaText, minifyText(ctaTitleEle?.textContent), '', minifyText(title?.textContent), '', '');
    }
  }
});
