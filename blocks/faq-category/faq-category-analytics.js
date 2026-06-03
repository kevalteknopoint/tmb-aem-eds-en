import {
  ctaInteraction,
  faqInteraction,
  minifyText,
  getComponentIndex,
  getPageRegion,
  getPersona,
  downloadDocument
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const { target } = e;

  // =====================================================
  // 1. FAQ CATEGORY CONTAINER (NEW - YOUR HTML)
  // =====================================================
  const faqCategoryLink = target.closest('.faq-category-container .faq-link');

  if (faqCategoryLink) {
    const container = faqCategoryLink.closest('.faq-category');

    const faqTitle = minifyText(faqCategoryLink.textContent || '');
    const pageRegion = getPageRegion(faqCategoryLink);

    const section = faqCategoryLink.closest('.section');
    const componentId = section?.getAttribute('id') || '';

    const persona = getPersona();

    // index from HTML data-index (best source)
    const componentIndex = faqCategoryLink.getAttribute('data-index') ? Number(faqCategoryLink.getAttribute('data-index')) + 1 : getComponentIndex(faqCategoryLink);

    const categoryTitleEl = container?.querySelector('h1, h2, h3, h4, h5, h6');

    const categoryTitle = minifyText(categoryTitleEl?.textContent || '');
    console.log("hiii");

    faqInteraction(
      pageRegion,
      faqTitle,
      categoryTitle,
      'faq category',
      container?.getAttribute('data-block-name') || 'faq-category',
      componentIndex,
      persona,
      'faq click',
      'faq open',
      'faq category container',
      'open',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      componentId
    );

    return;
  }

  // =====================================================
  // 2. EXISTING FAQ LINK LOGIC (UNCHANGED)
  // =====================================================
  if (target.closest('.faq-link')) {
    const linkEle = target.closest('.faq-link');
    const faqTitle = minifyText(linkEle?.textContent);

    if (target.closest('.faq-frequently-question')) {
      const ctaSourceEle = linkEle?.closest('.faq-items-list')?.parentElement?.querySelector('h1, h2, h3, h4, h5, h6');

      const pageRegion = getPageRegion(target.closest('.faq-link'));
      const componentIndex = getComponentIndex(target.closest('.faq-link'));
      const componentId = target.closest('.section')?.getAttribute('id') || '';

      faqInteraction(
        pageRegion,
        faqTitle,
        minifyText(ctaSourceEle?.textContent),
        'faq frequently',
        'faq',
        componentIndex,
        getPersona(),
        'faq toggle',
        'faq expand',
        'FAQ CARD LIMITS',
        'open',
        '',
        'faq swift code',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        componentId
      );
    } else if (target.closest('.faq-frequently-question-list')) {
      const targetContainer = target.closest('.faq-frequently-question-list');
      const titleContainer = targetContainer?.previousElementSibling;
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');

      const ctaSourceEle = linkEle?.closest('.faq-items-list')?.parentElement?.querySelector('h1, h2, h3, h4, h5, h6');
      const pageRegion = getPageRegion(target.closest('.faq-link'));
      const componentIndex = getComponentIndex(target.closest('.faq-link'));
      const componentId = target.closest('.section')?.getAttribute('id') || '';

      faqInteraction(
        pageRegion,
        faqTitle,
        minifyText(ctaSourceEle?.textContent),
        minifyText(title?.textContent),
        'faq frequently',
        '',
        componentIndex,
        getPersona(),
        'faq toggle',
        'faq expand',
        'FAQ CARD LIMITS',
        '',
        'open',
        '',
        'faq swift code',
        '',
        '',
        '',
        '',
        '',
        componentId
      );
    }
  }

  // =====================================================
  // 3. CTA BUTTON LOGIC (UNCHANGED)
  // =====================================================
  if (target.closest('a') && target.closest('.button-container')) {
    const linkEle = target.closest('a');
    const ctaText = minifyText(linkEle?.textContent);

    if (target.closest('.faq-frequently-question-list')) {
      const listSection = target.closest('.faq-frequently-question-list');

      const cardWrapper = linkEle.closest('.faq-category-wrapper');
      const ctaTitle = cardWrapper?.querySelector('h1, h2, h3, h4, h5, h6');

      const ctaSourceEle = listSection?.previousElementSibling?.classList.contains('faq-frequently-question-title')
        ? listSection.previousElementSibling.querySelector('h1, h2, h3, h4, h5, h6')
        : document.querySelector('.faq-frequently-question-title h1, .faq-frequently-question-title h2, .faq-frequently-question-title h3, .faq-frequently-question-title h4, .faq-frequently-question-title h5, .faq-frequently-question-title h6');

      const pageRegion = getPageRegion(linkEle);
      const componentIndex = getComponentIndex(linkEle);
      const nextPageURL = linkEle?.getAttribute('href');
      const componentId = target.closest('.section')?.getAttribute('id') || '';

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
    } else if (target.closest('.faq-cant-find-looking-for:not(.rates-saver, .navigation-cards-container)')) {
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

  // =====================================================
  // 4. FAQ DETAIL DOWNLOAD LOGIC (UNCHANGED)
  // =====================================================
  const subLink = target.closest('.sub-section-wrapper a');

  if (subLink && subLink.closest('.section-wrapper.faq-detail-container')) {
    const ctaText = minifyText(subLink.textContent);
    const pageRegion = getPageRegion(subLink);
    const componentIndex = getComponentIndex(subLink);
    const nextPageURL = subLink.getAttribute('href') || '';

    const cleanURL = nextPageURL.split('?')[0].toLowerCase();

    const isDownload = cleanURL.endsWith('.pdf')
      || cleanURL.endsWith('.doc')
      || cleanURL.endsWith('.docx')
      || cleanURL.endsWith('.xls')
      || cleanURL.endsWith('.xlsx')
      || cleanURL.endsWith('.ashx');

    const componentId = target.closest('.section')?.getAttribute('id') || '';

    if (isDownload) {
      downloadDocument(
        pageRegion,
        'faq category',
        'faq',
        componentIndex,
        getPersona(),
        componentId,
        nextPageURL,
        '',
        '',
        '',
        ctaText,
        'pdf',
        'download'
      );
    } else {
      const ctaTitle = subLink.getAttribute('title') || ctaText;

      ctaInteraction(
        pageRegion,
        ctaText,
        ctaTitle,
        'faq',
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

  // =====================================================
  // 5. SCROLL FAQ (UNCHANGED)
  // =====================================================
  if (target.closest('#faqs-section-scroll')) {
    const section = target.closest('.section');
    const faqTitle = minifyText(
      target.closest('.accordion-item-label')?.textContent
      || section?.querySelector('.default-content-wrapper h1, h2, h3, h4, h5, h6')?.textContent
    );

    const heading = section?.querySelector('h1, h2, h3, h4, h5, h6');
    const pageRegion = getPageRegion(target);
    const componentIndex = getComponentIndex(target);
    const componentId = section?.getAttribute('id') || '';

    faqInteraction(
      pageRegion,
      faqTitle,
      minifyText(heading?.textContent),
      'faq frequently',
      'faq',
      componentIndex,
      getPersona(),
      'faq toggle',
      'faq expand',
      'FAQ CARD LIMITS',
      'open',
      '',
      'faq swift code',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      componentId
    );
  }

  // =====================================================
  // 6. ACCORDION FAQ (UNCHANGED)
  // =====================================================
  const faqLabel = target.closest('.faq-accordion:not(#faqs-section-scroll) .accordion-item-label');

  if (faqLabel) {
    const faqItem = faqLabel.closest('.accordion-item');
    const faqContainer = target.closest('.faq-accordion');

    const faqItems = [...faqContainer.querySelectorAll('.accordion-item')];

    let faqQuestionRank = '';

    for (let i = 0; i < faqItems.length; i += 1) {
      if (faqItems[i].contains(faqLabel)) {
        faqQuestionRank = String(i + 1);
        break;
      }
    }

    const section = faqLabel.closest('.section');

    const sectionHeading = minifyText(section?.querySelector('.default-content-wrapper h1, h2, h3, h4, h5, h6')?.textContent);
    const pageRegion = getPageRegion(faqLabel);
    const componentIndex = getComponentIndex(faqItem);
    const componentId = section?.getAttribute('id') || '';
    const container = section?.querySelector('.accordion-container');
    const componentType = container?.getAttribute('data-block-name') || container?.className?.split(' ')[0] || 'faq';
    const componentName = sectionHeading || 'faq';

    faqInteraction(
      pageRegion,
      // faqTitle,
      // ctaSource,
      componentName,
      componentType,
      componentIndex,
      getPersona(),
      'faq-toggle',
      'faq-expand',
      'FAQ_CARD_LIMITS',
      ' ',
      'open',
      'faq swift code',
      faqQuestionRank,
      '',
      '',
      'faq',
      '',
      '',
      '',
      componentId,
      ''
    );
  }
});
