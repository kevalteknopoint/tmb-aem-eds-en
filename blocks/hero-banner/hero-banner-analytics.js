import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex,
  downloadDocument
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const ctaLink = e.target.closest('.hero-banner-container .hero-banner-actions a');

  if (!ctaLink) return;

  const container = ctaLink.closest('.hero-banner-container');

  const heading = container?.querySelector('h1,h2,h3,h4,h5,h6');
  const pageRegion = getPageRegion(ctaLink);
  const componentIndex = getComponentIndex(ctaLink);
  const nextPageURL = ctaLink.getAttribute("href");
  const persona = getPersona();
  const ctaText = minifyText(ctaLink.textContent);
  const titleText = minifyText(heading?.textContent);
  const sectionEl = ctaLink.closest('.section');
  const componentId = sectionEl?.getAttribute('id') || "";
  const componentName = minifyText(heading?.textContent) || minifyText(container?.querySelector('.hero-banner-content')?.textContent) || 'hero banner';
  const componentType = container?.getAttribute('data-block-name') || sectionEl?.className?.split(' ')?.[0] || 'hero-banner';
  // File detection
  const fileExtensions = [
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv',
    'ppt', 'pptx', 'zip', 'rar', 'txt'
  ];

  const cleanUrl = nextPageURL?.split('?')[0].toLowerCase();
  const fileExt = cleanUrl?.split('.').pop();

  const isDownload = fileExtensions.includes(fileExt);

  // =========================
  // DOWNLOAD CASE
  // =========================
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

  // =========================
  // CTA CASE
  // =========================
  ctaInteraction(
    pageRegion,
    ctaText,
    titleText,
    titleText,
    componentName,
    componentType,
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
