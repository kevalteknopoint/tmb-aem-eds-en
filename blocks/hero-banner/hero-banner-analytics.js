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
      'hero banner container',
      'hero banner container',
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
  ctaInteraction(
    pageRegion,
    ctaText,
    titleText,
    titleText,
    'hero banner container',
    'hero banner container',
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
