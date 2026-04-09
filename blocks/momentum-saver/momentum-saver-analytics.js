import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex, downloadDocument } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
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

    // ✅ File detection
    const fileExtensions = [
      'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv',
      'ppt', 'pptx', 'zip', 'rar', 'txt'
    ];

    const cleanUrl = nextPageURL?.split('?')[0].toLowerCase();
    const fileExt = cleanUrl?.split('.').pop();
    const isDownload = fileExtensions.includes(fileExt);

    // ✅ If file → download only
    if (isDownload) {
      downloadDocument(
        pageRegion,
        'momentum-saver-section',
        'columns-container',
        componentIndex,
        persona,
        '',
        nextPageURL,
        'cta-link',
        'internal',
        'in-content',
        ctaText,
        fileExt,
        componentId
      );
      return;
    }

    // ✅ Otherwise → CTA tracking
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
  if (e.target.closest('.momentum-image-saver .button-container')) {
    const ctaLink = e.target.closest('.momentum-image-saver .button');
    if (!ctaLink) return;

    const container = ctaLink.closest('.momentum-image-saver');
    const heading = container?.querySelector('h1,h2,h3,h4,h5,h6');
    const nextPageURL = ctaLink.getAttribute("href");

    const pageRegion = getPageRegion(ctaLink);
    const componentIndex = getComponentIndex(ctaLink);
    const persona = getPersona();
    const ctaText = minifyText(ctaLink.textContent);
    const titleText = minifyText(heading?.textContent);
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";

    // ✅ File detection
    const fileExtensions = [
      'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv',
      'ppt', 'pptx', 'zip', 'rar', 'txt'
    ];

    const cleanUrl = nextPageURL?.split('?')[0].toLowerCase();
    const fileExt = cleanUrl?.split('.').pop();
    const isDownload = fileExtensions.includes(fileExt);

    // ✅ If file → downloadDocument ONLY
    if (isDownload) {
      downloadDocument(
        pageRegion,
        'momentum-image-saver',
        'columns-container',
        componentIndex,
        persona,
        '',
        nextPageURL,
        'cta-link',
        'internal',
        'in-content',
        ctaText,
        fileExt,
        componentId
      );
      return; // 🚨 important: stop CTA firing
    }

    // ✅ Otherwise → CTA tracking
    ctaInteraction(
      pageRegion,
      ctaText,
      titleText,
      '',
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
  document.addEventListener('click', (e) => {

    // ======================
    // MOMENTUM IMAGE SAVER
    // ======================
    if (e.target.closest('.momentum-image-saver .button-container')) {
      const ctaLink = e.target.closest('.momentum-image-saver .button');
      if (!ctaLink) return;

      const container = ctaLink.closest('.momentum-image-saver');
      const heading = container?.querySelector('h1,h2,h3,h4,h5,h6');
      const nextPageURL = ctaLink.getAttribute("href");

      ctaInteraction(
        getPageRegion(ctaLink),
        minifyText(ctaLink.textContent),
        minifyText(heading?.textContent),
        '',
        'momentum-image-saver',
        'columns-container',
        getComponentIndex(ctaLink),
        getPersona(),
        nextPageURL,
        'cta-link',
        'internal',
        'quick-link',
        'in-content',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      );
    }

    // ======================
    // IMAGE SWAPPING
    // ======================
    const imageSwapContainer = e.target.closest('.image-swapping:not(.variant-404)');
    if (!imageSwapContainer) return;

    const ctaLink = e.target.closest('.image-swapping .button');
    if (!ctaLink) return;

    const heading = imageSwapContainer.querySelector('h1,h2,h3,h4,h5,h6');
    const nextPageURL = ctaLink.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";

    const ctaText = minifyText(ctaLink.textContent);
    const titleText = minifyText(heading?.textContent);

    // File detection
    const fileExtensions = [
      'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv',
      'ppt', 'pptx', 'zip', 'rar', 'txt'
    ];

    const cleanUrl = nextPageURL?.split('?')[0].toLowerCase();
    const fileExt = cleanUrl?.split('.').pop();
    const isDownload = fileExtensions.includes(fileExt);

    if (isDownload) {
      downloadDocument(
        getPageRegion(ctaLink),
        'image-swapping',
        'columns-container',
        getComponentIndex(ctaLink),
        getPersona(),
        '',
        nextPageURL,
        'cta-link',
        'internal',
        'in-content',
        ctaText,
        fileExt,
        componentId
      );
      return;
    }

    ctaInteraction(
      getPageRegion(ctaLink),
      ctaText,
      titleText,
      '',
      'image-swapping',
      'columns-container',
      getComponentIndex(ctaLink),
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

  });

  if (e.target.closest('.image-swapping:not(.variant-404, .momentum-impact)  p a')) {
    const secondaryLink = e.target.closest('.image-swapping p a');
    const pageRegion = getPageRegion(e.target.closest('.image-swapping p a'));
    const componentIndex = getComponentIndex(e.target.closest('.image-swapping p a'));
    const ctaTitle = e.target.closest('.image-swapping').querySelector("h1,h2,h3,h4,h5,h6");
    const nextPageURL = e.target.closest(".image-swapping p a")?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'image-swapping', 'columns-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', componentId, '', '', '', '');
  }
  if (e.target.closest('.image-swapping.variant-404 p a')) {
    const secondaryLink = e.target.closest('.image-swapping.variant-404 p a');
    const pageRegion = getPageRegion(e.target.closest('.image-swapping.variant-404 p a'));
    const componentIndex = getComponentIndex(e.target.closest('.image-swapping.variant-404 p a'));
    const ctaTitle = e.target.closest('.image-swapping.variant-404').querySelector("h1,h2,h3,h4,h5,h6");
    const nextPageURL = e.target.closest(".image-swapping.variant-404 p a")?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'image-swapping', 'columns-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', componentId, '', '', '', '');
  }
  if (e.target.closest('.variant-404 +.box-container p a')) {
    const secondaryLink = e.target.closest('.variant-404 +.box-container p a');
    const pageRegion = getPageRegion(e.target.closest('.variant-404 +.box-container p a'));
    const componentIndex = getComponentIndex(e.target.closest('.variant-404 +.box-container p a'));
    const ctaTitle = e.target.closest('.variant-404 +.box-container').querySelector("pf");
    const nextPageURL = e.target.closest(".variant-404 +.box-container p a")?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'image-swapping', 'columns-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', componentId, '', '', '', '');
  }
  if (e.target.closest('.section-with-bg:not(.variant-404)  p a')) {
    const secondaryLink = e.target.closest('.section-with-bg p a');
    const pageRegion = getPageRegion(e.target.closest('.section-with-bg p a'));
    const componentIndex = getComponentIndex(e.target.closest('.section-with-bg p a'));
    const ctaTitle = e.target.closest('.section-with-bg').querySelector("h1,h2,h3,h4,h5,h6");
    const nextPageURL = e.target.closest(".section-with-bg p a")?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'image-swapping', 'columns-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', componentId, '', '', '', '');
  }
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

  // File detection
  const fileExtensions = [
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv',
    'ppt', 'pptx', 'zip', 'rar', 'txt'
  ];

  const cleanUrl = nextPageURL?.split('?')[0].toLowerCase();
  const fileExt = cleanUrl?.split('.').pop();

  const isDownload = fileExtensions.includes(fileExt);

  // If file → ONLY downloadDocument
  if (isDownload) {
    downloadDocument(
      pageRegion,
      'momentum impact',
      'columns container',
      componentIndex,
      persona,
      '',
      nextPageURL,
      'cta-link',
      'internal',
      'in-content',
      ctaText,
      fileExt,
      componentId
    );
    return; //  prevents ctaInteraction
  }

  //  Otherwise → normal CTA tracking
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
