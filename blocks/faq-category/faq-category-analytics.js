import { ctaInteraction, faqInteraction, minifyText, getComponentIndex, getPageRegion, getPersona, downloadDocument } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const { target } = e;

  if (target.closest('.faq-link')) {
    const linkEle = target.closest('.faq-link');
    const faqTitle = minifyText(linkEle?.textContent);

    if (target.closest('.faq-frequently-question')) {
      const ctaSourceEle = linkEle?.closest('.faq-items-list')?.parentElement?.querySelector('h1, h2, h3, h4, h5, h6');
      const pageRegion = getPageRegion(target.closest('.faq-link'));
      const componentIndex = getComponentIndex(target.closest('.faq-link'));
      const componentId = target.closest('.section').getAttribute('id');
      faqInteraction(pageRegion, faqTitle, minifyText(ctaSourceEle?.textContent), 'faq frequently', 'faq', componentIndex, getPersona(), 'faq toggle', 'faq expand', 'FAQ CARD LIMITS', 'open', '', 'faq swift code', '', '', '', '', '', '', '', '', '', '', componentId);
    } else if (target.closest('.faq-frequently-question-list')) {
      const targetContainer = target.closest('.faq-frequently-question-list');
      const titleContainer = targetContainer?.previousElementSibling;
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaSourceEle = linkEle?.closest('.faq-items-list')?.parentElement?.querySelector('h1, h2, h3, h4, h5, h6');
      const pageRegion = getPageRegion(target.closest('.faq-link'));
      const componentIndex = getComponentIndex(target.closest('.faq-link'));
      const componentId = target.closest('.section').getAttribute('id');
      faqInteraction(pageRegion, faqTitle, minifyText(ctaSourceEle?.textContent), minifyText(title?.textContent), 'faq frequently', '', componentIndex, getPersona(), 'faq toggle', 'faq expand', 'FAQ CARD LIMITS', '', 'open', '', 'faq swift code', '', '', '', '', '', componentId, '');
    }
  }

  if (target.closest('a') && target.closest('.button-container')) {
    const linkEle = target.closest('a');
    const ctaText = minifyText(linkEle?.textContent);

    if (target.closest('.faq-frequently-question-list')) {
      const listSection = target.closest('.faq-frequently-question-list');

      const cardWrapper = linkEle.closest('.faq-category-wrapper');
      const ctaTitle = cardWrapper?.querySelector('h1, h2, h3, h4, h5, h6');

      const ctaSourceEle = listSection
        ?.previousElementSibling
        ?.classList.contains('faq-frequently-question-title')
        ? listSection.previousElementSibling.querySelector('h1, h2, h3, h4, h5, h6')
        : document.querySelector('.faq-frequently-question-title h1, .faq-frequently-question-title h2, .faq-frequently-question-title h3, .faq-frequently-question-title h4, .faq-frequently-question-title h5, .faq-frequently-question-title h6');

      const pageRegion = getPageRegion(linkEle);
      const componentIndex = getComponentIndex(linkEle);
      const nextPageURL = linkEle?.getAttribute('href');
      const componentId = target.closest('.section').getAttribute('id');
      ctaInteraction(
        pageRegion,
        minifyText(linkEle?.textContent),
        minifyText(ctaTitle?.textContent),
        minifyText(ctaSourceEle?.textContent),
        'faq category',
        'faq',
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
    } else if (target.closest('.faq-cant-find-looking-for:not(.rates-saver)')) {
      const targetContainer = target.closest('.faq-cant-find-looking-for');
      const titleContainer = targetContainer?.querySelector('.default-content-wrapper');
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaTitleEle = linkEle?.closest('.cards-card-body')?.querySelector('h1, h2, h3, h4, h5, h6');

      ctaInteraction(
        '',
        ctaText,
        minifyText(ctaTitleEle?.textContent),
        '',
        minifyText(title?.textContent),
        '',
        ''
      );
    }
  }
  const linkEle = target.closest('.sub-section-wrapper a');

  if (linkEle && linkEle.closest('.section-wrapper.faq-detail-container')) {
    const ctaText = minifyText(linkEle.textContent);
    const pageRegion = getPageRegion(linkEle);
    const componentIndex = getComponentIndex(linkEle);
    const nextPageURL = linkEle.getAttribute('href') || '';
    
    //  Identify downloadable documents
    const cleanURL = nextPageURL.split('?')[0].toLowerCase();
    const isDownload = cleanURL.endsWith('.pdf') || cleanURL.endsWith('.doc') || cleanURL.endsWith('.docx') || cleanURL.endsWith('.xls') || cleanURL.endsWith('.xlsx') || cleanURL.endsWith('.ashx'); // 👈 important for your case
    const componentId = target.closest('.section').getAttribute('id');
    if (isDownload) {
      downloadDocument(
        pageRegion, 'faq category', 'faq', componentIndex, getPersona(), componentId, nextPageURL, '', '', '', ctaText, 'pdf', 'download'
      );
    } else {
      const ctaTitle = linkEle.getAttribute('title') || ctaText;
      const ctaSource = 'faq'; // or derive if you have logic
      ctaInteraction(
        pageRegion,
        ctaText,
        ctaTitle,
        ctaSource,
        'faq category',
        'faq',
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
