import {
  ctaInteraction,
  minifyText,
  getComponentIndex,
  getPageRegion,
  getPersona,
  downloadDocument
} from "../../scripts/analytics/exports.js";

const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6';

const fileExtensions = [
  'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv',
  'ppt', 'pptx', 'zip', 'rar', 'txt'
];

const getFileExt = (url = '') => {
  const cleanUrl = url.split('?')[0].toLowerCase();
  return cleanUrl.split('.').pop();
};

// =========================
// COMPONENT TYPE HELPER
// =========================
const getComponentType = (element) => {
  if (!element) return '';

  if (element.closest('.faq-cant-find-looking-for-variant')) {
    return 'faq-cant-find-looking-for-variant';
  }

  if (element.closest('.rates-saver')) {
    return 'faq-rates-saver';
  }

  if (element.closest('.navigation-cards-container')) {
    return 'navigation-cards';
  }

  return element.closest('[data-block-name]')?.getAttribute('data-block-name') || '';
};

document.addEventListener('click', (e) => {
  const { target } = e;

  const linkEle = target.closest('a');
  if (!linkEle) return;

  const nextPageURL = linkEle.getAttribute('href') || '';
  const fileExt = getFileExt(nextPageURL);
  const isDownload = fileExtensions.includes(fileExt);

  const persona = getPersona();
  const pageRegion = getPageRegion(linkEle);
  const componentIndex = getComponentIndex(linkEle);
  const componentId = linkEle.closest('.section')?.getAttribute('id') || '';

  const baseCtaText = minifyText(linkEle?.textContent || '');

  // =========================
  // 1. FAQ RATES SAVER
  // =========================
  if (
    target.closest('.faq-cant-find-looking-for.rates-saver:not(.navigation-cards-container)')
  ) {
    const container = target.closest('.faq-cant-find-looking-for');

    const title = container?.querySelector(
      '.default-content-wrapper h1,h2,h3,h4,h5,h6'
    );

    const ctaTitleEle = linkEle
      ?.closest('.cards-card-body')
      ?.querySelector(HEADING_SELECTOR);

    const componentType = getComponentType(target);

    if (isDownload) {
      downloadDocument(
        pageRegion,
        'faq-rates-saver',
        componentType,
        componentIndex,
        persona,
        componentId,
        nextPageURL,
        'cta-click',
        'external',
        'in-content',
        baseCtaText,
        fileExt,
        'download'
      );

      return;
    }

    ctaInteraction(
      pageRegion,
      baseCtaText,
      minifyText(ctaTitleEle?.textContent),
      'cant find what you are looking for?',
      minifyText(title?.textContent),
      componentType,
      componentIndex,
      persona,
      nextPageURL,
      'cta-click',
      'external',
      'in-page-nav',
      'in-content',
      '',
      '',
      '',
      componentId,
      ''
    );

    return;
  }

  // =========================
  // 2. FAQ VARIANT
  // =========================
  if (
    target.closest(
      '.faq-cant-find-looking-for.faq-cant-find-looking-for-variant.cards-container:not(.navigation-cards-container)'
    )
  ) {
    const container = target.closest('.faq-cant-find-looking-for');

    const title = container?.querySelector(
      '.default-content-wrapper h1,h2,h3,h4,h5,h6'
    );

    const ctaTitleEle = linkEle
      ?.closest('.cards-card-body')
      ?.querySelector(HEADING_SELECTOR);

    const componentType = getComponentType(target);

    if (isDownload) {
      downloadDocument(
        pageRegion,
        'faq-variant',
        componentType,
        componentIndex,
        persona,
        componentId,
        nextPageURL,
        'cta-click',
        'external',
        'in-content',
        baseCtaText,
        fileExt,
        'download'
      );

      return;
    }

    ctaInteraction(
      pageRegion,
      baseCtaText,
      minifyText(ctaTitleEle?.textContent),
      'WAYS TO GET IN TOUCH',
      minifyText(title?.textContent),
      componentType,
      componentIndex,
      persona,
      nextPageURL,
      'cta-click',
      'external',
      'in-page-nav',
      'in-content',
      '',
      '',
      '',
      componentId,
      ''
    );

    return;
  }

// =========================
// 3. NAVIGATION CARDS (FULLY DYNAMIC FIX)
// =========================
if (target.closest('.navigation-cards-container')) {
  const link = target.closest('.navigation-cards-container a.is-clickable');
  if (!link) return;

  const container = link.closest('.navigation-cards-container');
  const card = link.closest('.nav-card');

  const pageTitle =
    container?.querySelector(`.default-content-wrapper ${HEADING_SELECTOR}`)?.textContent?.trim() ||
    container?.querySelector('h1,h2,h3,h4,h5,h6')?.textContent?.trim() ||
    '';

  const cardTitle =
    card?.querySelector('h3')?.textContent?.trim() ||
    '';

  const cardPrefix =
    card?.querySelector('.card-header p')?.textContent?.trim() ||
    '';

  const ctaText = minifyText(cardTitle || cardPrefix || link.textContent);

  const componentName =
    container?.getAttribute('data-block-name') ||
    'navigation-cards';

  const componentType = getComponentType(link) || 'navigation-cards';

  const nextPageURL = link.getAttribute('href') || '';

  if (isDownload) {
    downloadDocument(
      pageRegion,
      componentName,
      componentType,
      componentIndex,
      persona,
      componentId,
      nextPageURL,
      'cta-click',
      'internal',
      'card',
      ctaText,
      fileExt,
      'download'
    );
    return;
  }

  ctaInteraction(
    pageRegion,
    ctaText,              // CTA TEXT (dynamic)
    cardTitle || ctaText, // CTA TITLE (dynamic)
    cardPrefix,           // CTA SOURCE (dynamic small label like "Buy my")
    pageTitle,            // section/component title (dynamic)
    componentType,
    componentIndex,
    persona,
    nextPageURL,
    'cta-click',
    'internal',
    'card',
    'in-content',
    '',
    '',
    '',
    componentId,
    ''
  );

  return;
}

  // =========================
  // 4. NAV CARD (PDF OR CTA)
  // =========================
  const ctaLink = target.closest(
    '.navigation-cards-container .nav-card a.is-clickable'
  );

  if (ctaLink) {
    const card = ctaLink.closest('.nav-card');

    const container = ctaLink.closest('.navigation-cards-container');

    const ctaText = minifyText(
      card?.querySelector('h3')?.textContent || ''
    );

    const sectionTitle = minifyText(
      container?.querySelector(
        `.default-content-wrapper ${HEADING_SELECTOR}`
      )?.textContent || ''
    );

    const componentType = getComponentType(target);

    if (isDownload) {
      downloadDocument(
        pageRegion,
        sectionTitle,
        componentType,
        componentIndex,
        persona,
        componentId,
        nextPageURL,
        'cta-link',
        'internal',
        'card',
        ctaText,
        fileExt,
        'download'
      );

      return;
    }

    ctaInteraction(
      pageRegion,
      ctaText,
      sectionTitle,
      '',
      sectionTitle,
      componentType,
      componentIndex,
      persona,
      nextPageURL,
      'cta-link',
      'internal',
      'card',
      'in-content',
      '',
      '',
      '',
      componentId,
      ''
    );
  }
});
