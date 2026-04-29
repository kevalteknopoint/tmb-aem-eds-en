import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex,
  downloadDocument
} from "../../scripts/analytics/exports.js";

/**
 * Extract best possible CTA context from article/content sections
 * - Title: nearest h1–h6
 * - Source: first meaningful paragraph
 */
const getCTAContext = (ctaLink) => {
  const section = ctaLink.closest('.section');

  if (!section) {
    return { title: '', source: '' };
  }

  // =========================
  // TITLE (h1–h6)
  // =========================
  const heading = section.querySelector('h1,h2,h3,h4,h5,h6');

  const title = heading
    ? minifyText(heading.textContent)
    : '';

  // =========================
  // SOURCE (best paragraph fallback)
  // =========================
  const paragraphs = section.querySelectorAll('p');

  let source = '';

  if (paragraphs.length > 0) {
    // pick first meaningful paragraph (not empty)
    for (const p of paragraphs) {
      const text = minifyText(p.textContent);
      if (text) {
        source = text;
        break;
      }
    }
  }

  return {
    title,
    source
  };
};

/**
 * Normalize URL safely
 */
const getCleanUrl = (url = '') =>
  url.split('?')[0].split('#')[0].toLowerCase();

/**
 * Extract file extension safely
 */
const getFileExtension = (url = '') =>
  url
    .split('?')[0]
    .split('#')[0]
    .split('.')
    .pop()
    .toLowerCase();

const fileExtensions = [
  'pdf','doc','docx','xls','xlsx','csv',
  'ppt','pptx','zip','rar','txt'
];

/**
 * MAIN CTA HANDLER
 */
export function handleBoxContainerCtaClick(e) {
  const ctaLink = e.target.closest(
    '.section.box-container.generic-body-copy a'
  );

  if (!ctaLink) return;

  const sectionEl = ctaLink.closest('.section');
  const componentId = sectionEl?.getAttribute('id') || '';

  const pageRegion = getPageRegion(ctaLink);
  const componentIndex = getComponentIndex(ctaLink);
  const nextPageURL = ctaLink.getAttribute('href') || '';
  const persona = getPersona();

  // CTA text
  const ctaText = minifyText(ctaLink.textContent);

  // ✅ FIXED CONTEXT (this solves your blank fields)
  const { title: ctaTitle, source: ctaSource } = getCTAContext(ctaLink);

  const cleanUrl = getCleanUrl(nextPageURL);
  const fileExt = getFileExtension(cleanUrl);
  const isDownload = fileExtensions.includes(fileExt);

  // =========================
  // DOWNLOAD TRACKING
  // =========================
  if (isDownload) {
    downloadDocument(
      pageRegion,
      'box container links',
      'generic-body-copy',
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
  // CTA TRACKING
  // =========================
  ctaInteraction(
    pageRegion,
    ctaText,
    ctaTitle,
    ctaSource,
    'box container links',
    'generic-body-copy',
    componentIndex,
    persona,
    nextPageURL,
    'cta-link',
    'internal',
    'inline-link',
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