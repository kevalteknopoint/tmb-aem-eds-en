import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex, downloadDocument } from "../../scripts/analytics/exports.js";

const FILE_EXTENSIONS = [
  'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv',
  'ppt', 'pptx', 'zip', 'rar', 'txt'
];

document.addEventListener('click', (e) => {
  // momentum-saver-section (excluding momentum-image-saver)
  if (e.target.closest('.momentum-saver-section:not(.momentum-image-saver)')) {
    const ctaLink = e.target.closest('.momentum-saver-section a');
    if (!ctaLink) return;
    const container = ctaLink.closest('.momentum-saver-section');
    const heading = container?.querySelector('h1,h2,h3,h4,h5,h6');
    const nextPageURL = ctaLink.getAttribute("href");
    const pageRegion = getPageRegion(ctaLink);
    const componentIndex = getComponentIndex(ctaLink);
    const persona = getPersona();
    const ctaText = minifyText(ctaLink.textContent);
    const titleText = minifyText(heading?.textContent);
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";

    const cleanUrl = nextPageURL?.split('?')[0].toLowerCase();
    const fileExt = cleanUrl?.split('.').pop();
    const isDownload = FILE_EXTENSIONS.includes(fileExt);

    if (isDownload) {
      downloadDocument(
        pageRegion,
        'momentum-saver-section',
        'columns-container',
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
      titleText,
      '',
      'momentum-saver-section',
      'columns-container',
      componentIndex,
      persona,
      nextPageURL,
      'cta-link',
      'internal',
      'quick-link',
      'in-content',
      '',
      '',
      '',
      componentId,
      '',
      '',
      '',
      ''
    );
  }

  // momentum-image-saver
  if (e.target.closest('.momentum-image-saver:not(.image-swapping) .button-container')) {
    const ctaLink = e.target.closest('.momentum-image-saver .button');
    if (!ctaLink) return;

    const container = ctaLink.closest('.momentum-image-saver');
    const heading = container?.querySelector('h1,h2,h3,h4,h5,h6');

    const nextPageURL = ctaLink.getAttribute('href');
    const pageRegion = getPageRegion(ctaLink);
    const componentIndex = getComponentIndex(ctaLink);
    const persona = getPersona();

    const ctaText = minifyText(ctaLink.textContent);
    const titleText = minifyText(heading?.textContent);

    // ✅ NEW: CTA SOURCE (required change)
    const ctaSource = minifyText(heading?.textContent || '');

    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || '';

    const cleanUrl = nextPageURL?.split('?')[0]?.split('#')[0]?.toLowerCase();
    const fileExt = cleanUrl?.split('.').pop();

    const isDownload = FILE_EXTENSIONS.includes(fileExt);

    if (isDownload) {
      downloadDocument(
        pageRegion,
        'momentum-image-saver',
        'columns-container',
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
      titleText,
      ctaSource,
      'momentum-image-saver',
      'columns-container',
      componentIndex,
      persona,
      nextPageURL,
      'cta-link',
      'internal',
      'quick-link',
      'in-content',
      '',
      '',
      '',
      componentId,
      '',
      '',
      '',
      ''
    );
  }

  // image-swapping (non-variant-404)
  if (e.target.closest('.image-swapping:not(.variant-404, .momentum-impact) p a')) {
    const secondaryLink = e.target.closest('.image-swapping p a');
    const pageRegion = getPageRegion(secondaryLink);
    const componentIndex = getComponentIndex(secondaryLink);
    const ctaTitle = e.target.closest('.image-swapping').querySelector("h1,h2,h3,h4,h5,h6");
    const nextPageURL = secondaryLink?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";

    ctaInteraction(
      pageRegion,
      minifyText(secondaryLink?.textContent),
      minifyText(ctaTitle?.textContent),
      '',
      'image-swapping',
      'columns-container',
      componentIndex,
      getPersona(),
      nextPageURL,
      'cta-link',
      'internal',
      'quick-link',
      'in-content',
      '',
      '',
      '',
      componentId,
      '',
      '',
      '',
      ''
    );
  }

  // image-swapping variant-404
  if (e.target.closest('.image-swapping.variant-404 p a')) {
    const secondaryLink = e.target.closest('.image-swapping.variant-404 p a');
    const pageRegion = getPageRegion(secondaryLink);
    const componentIndex = getComponentIndex(secondaryLink);
    const ctaTitle = e.target.closest('.image-swapping.variant-404').querySelector("h1,h2,h3,h4,h5,h6");
    const nextPageURL = secondaryLink?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";

    ctaInteraction(
      pageRegion,
      minifyText(secondaryLink?.textContent),
      minifyText(ctaTitle?.textContent),
      '',
      'image-swapping',
      'columns-container',
      componentIndex,
      getPersona(),
      nextPageURL,
      'cta-link',
      'internal',
      'quick-link',
      'in-content',
      '',
      '',
      '',
      componentId,
      '',
      '',
      '',
      ''
    );
  }

  // variant-404 + box-container
  if (e.target.closest('.variant-404 + .box-container p a')) {
    const secondaryLink = e.target.closest('.variant-404 + .box-container p a');
    const pageRegion = getPageRegion(secondaryLink);
    const componentIndex = getComponentIndex(secondaryLink);
    const ctaTitle = e.target.closest('.variant-404 + .box-container').querySelector("p");
    const nextPageURL = secondaryLink?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";

    ctaInteraction(
      pageRegion,
      minifyText(secondaryLink?.textContent),
      minifyText(ctaTitle?.textContent),
      '',
      'image-swapping',
      'columns-container',
      componentIndex,
      getPersona(),
      nextPageURL,
      'cta-link',
      'internal',
      'quick-link',
      'in-content',
      '',
      '',
      '',
      componentId,
      '',
      '',
      '',
      ''
    );
  }

  // section-with-bg (excluding variant-404)
  if (e.target.closest('.section-with-bg:not(.variant-404) p a')) {
    const secondaryLink = e.target.closest('.section-with-bg p a');
    const pageRegion = getPageRegion(secondaryLink);
    const componentIndex = getComponentIndex(secondaryLink);
    const ctaTitle = e.target.closest('.section-with-bg').querySelector("h1,h2,h3,h4,h5,h6");
    const nextPageURL = secondaryLink?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";

    ctaInteraction(
      pageRegion,
      minifyText(secondaryLink?.textContent),
      minifyText(ctaTitle?.textContent),
      '',
      'image-swapping',
      'columns-container',
      componentIndex,
      getPersona(),
      nextPageURL,
      'cta-link',
      'internal',
      'quick-link',
      'in-content',
      '',
      '',
      '',
      componentId,
      '',
      '',
      '',
      ''
    );
  }

  // momentum-impact p a
  const ctaLink = e.target.closest('.momentum-impact p a');
  if (!ctaLink) return;

  const container = ctaLink.closest('.momentum-impact');
  const heading = container?.querySelector('h1,h2,h3,h4,h5,h6');
  const pageRegion = getPageRegion(ctaLink);
  const componentIndex = getComponentIndex(ctaLink);
  const nextPageURL = ctaLink.getAttribute("href");
  const persona = getPersona();
  const ctaText = minifyText(ctaLink.textContent);
  const titleText = minifyText(heading?.textContent);
  const sectionEl = e.target.closest('.section');
  const componentId = sectionEl?.getAttribute('id') || "";

  const cleanUrl = nextPageURL?.split('?')[0].toLowerCase();
  const fileExt = cleanUrl?.split('.').pop();
  const isDownload = FILE_EXTENSIONS.includes(fileExt);

  if (isDownload) {
    downloadDocument(
      pageRegion,
      'momentum impact',
      'columns container',
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
    titleText,
    titleText,
    'momentum impact',
    'columns container',
    componentIndex,
    persona,
    nextPageURL,
    'cta-link',
    'internal',
    'hero-banner',
    'in-content',
    '',
    '',
    '',
    componentId,
    '',
    '',
    ''
  );
});
