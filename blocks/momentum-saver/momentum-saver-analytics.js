import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex,
  downloadDocument,
  downloadApp
} from "../../scripts/analytics/exports.js";

const FILE_EXTENSIONS = [
  'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv',
  'ppt', 'pptx', 'zip', 'rar', 'txt'
];

document.addEventListener('click', (e) => {
  // =========================================================
  // momentum-saver-section
  // =========================================================

  if (e.target.closest('.momentum-saver-section:not(.momentum-image-saver)')) {
    const ctaLink = e.target.closest('.momentum-saver-section a');

    if (ctaLink) {
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

      const cleanUrl = nextPageURL?.split('?')[0]?.toLowerCase();

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
      } else {
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
    }
  }

  // =========================================================
  // momentum-image-saver
  // =========================================================

  if (
    e.target.closest(
      '.momentum-image-saver:not(.image-swapping) .button-container'
    )
  ) {
    const ctaLink = e.target.closest('.momentum-image-saver .button');

    if (ctaLink) {
      const container = ctaLink.closest('.momentum-image-saver');

      const heading = container?.querySelector('h1,h2,h3,h4,h5,h6');

      const nextPageURL = ctaLink.getAttribute('href');

      const pageRegion = getPageRegion(ctaLink);

      const componentIndex = getComponentIndex(ctaLink);

      const persona = getPersona();

      const ctaText = minifyText(ctaLink.textContent);

      const titleText = minifyText(heading?.textContent);

      const ctaSource = minifyText(heading?.textContent || '');

      const sectionEl = e.target.closest('.section');

      const componentId = sectionEl?.getAttribute('id') || '';

      const cleanUrl = nextPageURL
        ?.split('?')[0]
        ?.split('#')[0]
        ?.toLowerCase();

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
      } else {
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
    }
  }

  // =========================================================
  // momentum-app-badges
  // =========================================================

  const clickedBadge = e.target.closest('.momentum-app-badges a');

  if (clickedBadge) {
    const appBadgeSection = clickedBadge.closest('.momentum-app-badges');

    const componentName = [...appBadgeSection.classList]
      .find((cls) =>
        cls.startsWith('momentum-')
      ) || '';

    const componentType = [...appBadgeSection.classList]
      .find((cls) =>
        cls.includes('container')
      ) || '';

    const componentId = appBadgeSection.getAttribute('id')
      || clickedBadge.closest('.section')
        ?.getAttribute('id')
      || '';

    const heading = appBadgeSection.querySelector(
      'h1,h2,h3,h4,h5,h6'
    );

    const titleText = minifyText(heading?.textContent || '');

    const ctaSource = titleText;

    let ctaText = minifyText(clickedBadge.textContent || '');

    if (!ctaText) {
      if (
        clickedBadge.querySelector(
          '.icon-google-play-badge'
        )
      ) {
        ctaText = 'google play';
      } else if (
        clickedBadge.querySelector(
          '.icon-app-store-badge'
        )
      ) {
        ctaText = 'app store';
      } else {
        ctaText = 'app badge';
      }
    }

    downloadApp(
      getPageRegion(clickedBadge),
      ctaText,
      titleText,
      componentName,
      componentType,
      getComponentIndex(clickedBadge),
      getPersona(),
      'cta-click',
      'download',
      clickedBadge.getAttribute('href') || '',
      'external',
      componentId,
      ctaSource
    );
  }

  // =========================================================
  // image-swapping (non-variant-404)
  // =========================================================

  if (
    e.target.closest(
      '.image-swapping:not(.variant-404, .momentum-impact) p a'
    )
  ) {
    const secondaryLink = e.target.closest('.image-swapping p a');

    const pageRegion = getPageRegion(secondaryLink);

    const componentIndex = getComponentIndex(secondaryLink);

    const ctaTitle = e.target.closest('.image-swapping')
      .querySelector("h1,h2,h3,h4,h5,h6");

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

  // =========================================================
  // momentum-impact
  // =========================================================

  const impactLink = e.target.closest('.momentum-impact p a');

  if (impactLink) {
    const container = impactLink.closest('.momentum-impact');

    const heading = container?.querySelector('h1,h2,h3,h4,h5,h6');

    const pageRegion = getPageRegion(impactLink);

    const componentIndex = getComponentIndex(impactLink);

    const nextPageURL = impactLink.getAttribute('href');

    const persona = getPersona();

    const ctaText = minifyText(impactLink.textContent);

    const titleText = minifyText(heading?.textContent);

    const sectionEl = impactLink.closest('.section');

    const componentId = sectionEl?.getAttribute('id') || '';

    const cleanUrl = nextPageURL
      ?.split('?')[0]
      ?.split('#')[0]
      ?.toLowerCase();

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
    } else {
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
    }
  }
});
