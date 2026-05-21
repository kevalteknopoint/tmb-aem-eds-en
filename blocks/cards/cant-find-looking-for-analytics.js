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

document.addEventListener('click', (e) => {
  const { target } = e;

  const linkEle = target.closest('a');
  if (!linkEle) return;

  const nextPageURL = linkEle.getAttribute("href") || '';
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
    const title = container?.querySelector('.default-content-wrapper h1,h2,h3,h4,h5,h6');
    const ctaTitleEle = linkEle?.closest('.cards-card-body')?.querySelector(HEADING_SELECTOR);

    if (isDownload) {
      downloadDocument(
        pageRegion,
        'faq-rates-saver',
        'component',
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
      '',
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
    target.closest('.faq-cant-find-looking-for.faq-cant-find-looking-for-variant.cards-container:not(.navigation-cards-container)')
  ) {
    const container = target.closest('.faq-cant-find-looking-for');
    const title = container?.querySelector('.default-content-wrapper h1,h2,h3,h4,h5,h6');
    const ctaTitleEle = linkEle?.closest('.cards-card-body')?.querySelector(HEADING_SELECTOR);

    if (isDownload) {
      downloadDocument(
        pageRegion,
        'faq-variant',
        'component',
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
      '',
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
  // 3. NAVIGATION CARDS
  // =========================
  if (
    target.closest('.navigation-cards-container .navigation-cards-wrapper:not(.rates-saver.faq-cant-find-looking-for-variant)')
  ) {
    const link = target.closest('.navigation-cards-container a');
    if (!link) return;

    const container = link.closest('.navigation-cards-container');

    const ctaText = minifyText(link.textContent || '');
    const ctaTitle = ctaText;

    const componentName = minifyText(container?.getAttribute('data-block-name'))
      || 'navigation-cards';

    const componentType = container?.querySelector('[data-block-name]')?.getAttribute('data-block-name')
      || 'navigation-cards';

    if (isDownload) {
      downloadDocument(
        pageRegion,
        componentName,
        componentType,
        componentIndex,
        persona,
        componentId,
        nextPageURL,
        'cta-link',
        'internal',
        'in-content',
        ctaText,
        fileExt,
        'download'
      );
      return;
    }

    ctaInteraction(
      pageRegion,
      ctaText,
      ctaTitle,
      ctaText,
      componentName,
      componentType,
      componentIndex,
      persona,
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
    return;
  }

  // =========================
  // 4. NAV CARD (PDF OR CTA)
  // =========================
  const ctaLink = target.closest('.navigation-cards-container .nav-card a.is-clickable');

  if (ctaLink) {
    const card = ctaLink.closest('.nav-card');
    const container = ctaLink.closest('.navigation-cards-container');

    const ctaText = minifyText(card?.querySelector('h3')?.textContent || '');

    const sectionTitle = minifyText(container?.querySelector(`.default-content-wrapper ${HEADING_SELECTOR}`)?.textContent || '');

    if (isDownload) {
      downloadDocument(
        pageRegion,
        sectionTitle,
        'navigation-cards',
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
      'navigation-cards',
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
