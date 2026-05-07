import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex,
  downloadDocument
} from "./exports.js";

const getCTAContext = (ctaLink) => {
  const section = ctaLink.closest('.section');

  if (!section) return { title: '', source: '' };

  const heading = section.querySelector('h1,h2,h3,h4,h5,h6');

  const title = heading ? minifyText(heading.textContent) : '';
  const paragraphs = section.querySelectorAll('p');

  let source = '';
  if (paragraphs.length > 0) {
    const texts = Array.from(paragraphs).map((p) => minifyText(p.textContent)).filter((text) => text);
    if (texts.length > 0) {
      [source] = texts;
    }
  }

  return {
    title,
    source
  };
};

const getCleanUrl = (url = '') => url.split('?')[0].split('#')[0].toLowerCase();

const getFileExtension = (url = '') => url.split('?')[0].split('#')[0].split('.').pop().toLowerCase();

const fileExtensions = [
  'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv',
  'ppt', 'pptx', 'zip', 'rar', 'txt'
];

export default function handleBoxContainerCtaClick(e) {
  const ctaLink = e.target.closest('.section.box-container.generic-body-copy a');

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
