import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex,
  downloadDocument,
  accrodianExpand,
  faqInteraction
} from "../../scripts/analytics/exports.js";

let pageLoaded = false;
window.addEventListener('load', () => {
  pageLoaded = true;
});

const resolveComponentMeta = (el) => {
  const section = el.closest('.section');

  const container = el.closest('.accordion-container')
    || el.closest('.columns-container')
    || el.closest('[class*="container"]');

  const heading = section?.querySelector('h1,h2,h3,h4,h5,h6');

  return {
    componentId: section?.getAttribute('id') || '',

    componentName: minifyText(heading?.textContent)
      || minifyText(container?.querySelector('h1,h2,h3,h4,h5,h6')?.textContent)
      || 'component',

    componentType: container?.getAttribute('data-block-name')
      || container?.className?.split(' ')[0]
      || 'component',

    ctaTitle: minifyText(heading?.textContent) || '',

    ctaSource: container?.getAttribute('data-block-name')
      || container?.className?.split(' ')[0]
      || 'component'
  };
};

/**
 * ACCORDION + FAQ TOGGLE TRACKING (FIXED LOGIC)
 */
document.addEventListener(
  'toggle',
  (e) => {
    if (!pageLoaded) return;
    const accordion = e.target;

    if (!accordion.matches('.accordion-item')) return;
    if (!accordion.open) return;

    // ❌ IMPORTANT: avoid conflict with FAQ system (file 2)
    if (accordion.closest('.faq-accordion')) return;

    const isSingleExpansion = !!accordion.closest('.single-expansion');

    const persona = getPersona();
    const meta = resolveComponentMeta(accordion);
    const pageRegion = getPageRegion(accordion);
    const componentIndex = getComponentIndex(accordion);

    const summary = accordion.querySelector('.accordion-item-label');
    const ctaText = minifyText(summary?.textContent || '');

    /**
     * CASE 1: single-expansion → FAQ interaction
     */
    if (isSingleExpansion) {
      faqInteraction(
        pageRegion,
        ctaText,
        meta.ctaTitle,
        meta.componentName,
        meta.componentType,
        componentIndex,
        persona,
        'faq-toggle',
        'faq-expand',
        'FAQ_CARD_LIMITS',
        'open',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        meta.componentId
      );

      return;
    }

    /**
     * CASE 2: normal accordion → expand tracking
     */
    accrodianExpand(
      pageRegion,
      ctaText,
      meta.ctaTitle,
      meta.componentName,
      meta.componentType,
      componentIndex,
      persona,
      'expand',
      'accordion',
      'in-content',
      meta.componentId
    );
  },
  true
);

/**
 * 1. GENERIC ACCORDION CTA
 */
document.addEventListener('click', (e) => {
  const persona = getPersona();

  const accordionBtn = e.target.closest(
    '.accordion-container .button-container a'
  );

  if (accordionBtn) {
    const meta = resolveComponentMeta(accordionBtn);

    const pageRegion = getPageRegion(accordionBtn);
    const componentIndex = getComponentIndex(accordionBtn);
    const nextPageURL = accordionBtn.getAttribute("href");

    const ctaText = minifyText(accordionBtn.textContent);

    ctaInteraction(
      pageRegion,
      ctaText,
      meta.ctaTitle,
      meta.ctaSource,
      meta.componentName,
      meta.componentType,
      componentIndex,
      persona,
      nextPageURL,
      'cta-link',
      'internal',
      meta.ctaSource,
      'in-content',
      '',
      '',
      '',
      meta.componentId,
      '',
      '',
      ''
    );

    return;
  }

  /**
   * 2. FAQ LINKS (non-media)
   */
  const faqLink = e.target.closest(
    '.tmb-acc-sec.accordion-container .accordion-item-body a'
  );

  const isMediaRelease = e.target.closest(
    '.faq-accordion.accordion-container .accordion-item-body a'
  );

  if (faqLink && !isMediaRelease) {
    const meta = resolveComponentMeta(faqLink);

    const pageRegion = getPageRegion(faqLink);
    const componentIndex = getComponentIndex(faqLink);
    const nextPageURL = faqLink.getAttribute("href");

    const ctaText = minifyText(faqLink.textContent);

    ctaInteraction(
      pageRegion,
      ctaText,
      meta.ctaTitle,
      meta.ctaSource,
      meta.componentName,
      meta.componentType,
      componentIndex,
      persona,
      nextPageURL,
      'cta-link',
      'internal',
      meta.ctaSource,
      'in-content',
      '',
      '',
      '',
      meta.componentId,
      '',
      '',
      ''
    );

    return;
  }

  /**
   * 3. WHO CAN APPLY (DOWNLOAD + CTA)
   */
  const applyLink = e.target.closest(
    '.who-can-apply-section.accordion-container ul li a'
  );

  if (applyLink) {
    const meta = resolveComponentMeta(applyLink);

    const pageRegion = getPageRegion(applyLink);
    const componentIndex = getComponentIndex(applyLink);
    const nextPageURL = applyLink.getAttribute('href');

    const ctaText = minifyText(applyLink.textContent);

    const cleanUrl = nextPageURL?.split('?')[0].split('#')[0].toLowerCase();

    const fileExt = cleanUrl?.split('.').pop();

    const fileExtensions = [
      'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv',
      'ppt', 'pptx', 'zip', 'rar', 'txt'
    ];

    const isDownload = fileExtensions.includes(fileExt);

    if (isDownload) {
      downloadDocument(
        pageRegion,
        meta.componentName,
        meta.componentType,
        componentIndex,
        persona,
        meta.componentId,
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
      meta.ctaTitle,
      meta.ctaSource,
      meta.componentName,
      meta.componentType,
      componentIndex,
      persona,
      nextPageURL,
      'cta-link',
      'internal',
      meta.ctaSource,
      'in-content',
      '',
      '',
      '',
      meta.componentId,
      '',
      '',
      ''
    );

    return;
  }

  /**
   * 4. MEDIA RELEASES
   */
  const mediaReleaseLink = e.target.closest(
    '.faq-accordion.accordion-container .accordion-item-body a'
  );

  if (!mediaReleaseLink) return;

  const meta = resolveComponentMeta(mediaReleaseLink);

  const pageRegion = getPageRegion(mediaReleaseLink);
  const componentIndex = getComponentIndex(mediaReleaseLink);
  const nextPageURL = mediaReleaseLink.getAttribute('href');

  const ctaText = minifyText(mediaReleaseLink.textContent);

  const cleanUrl = nextPageURL?.split('?')[0].split('#')[0].toLowerCase();

  const fileExt = cleanUrl?.split('.').pop();

  const fileExtensions = [
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv',
    'ppt', 'pptx', 'zip', 'rar', 'txt'
  ];

  const isDownload = fileExtensions.includes(fileExt);

  if (isDownload) {
    downloadDocument(
      pageRegion,
      meta.componentName,
      meta.componentType,
      componentIndex,
      persona,
      meta.componentId,
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
    meta.ctaTitle,
    meta.ctaSource,
    meta.componentName,
    meta.componentType,
    componentIndex,
    persona,
    nextPageURL,
    'cta-link',
    'internal',
    meta.ctaSource,
    'in-content',
    '',
    '',
    '',
    meta.componentId,
    '',
    '',
    ''
  );
});
