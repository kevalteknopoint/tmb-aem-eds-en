import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex,
  downloadDocument
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.accordion-container .button-container')) {
    const link = e.target.closest('.accordion-container .accordion-wrapper .button-container a');
    if (!link) return;

    const container = link.closest('.accordion-container');
    const section = link.closest('.section');
    const pageRegion = getPageRegion(link);
    const componentIndex = getComponentIndex(link);
    const nextPageURL = link.getAttribute("href");
    const ctaText = minifyText(link?.textContent);
    const sectionHeading = minifyText(
      section?.querySelector('h1,h2,h3,h4,h5,h6')?.textContent || ''
    );

    const ctaSource = sectionHeading;
    const ctaTitle = sectionHeading;
    const componentName = sectionHeading;

    let componentType = 'component';

    if (container?.classList.contains('accordion-container')) {
      componentType = 'accordion';
    } else if (container?.classList.contains('columns-container')) {
      componentType = 'column';
    }

    ctaInteraction(
      pageRegion,
      ctaText,
      ctaTitle,
      ctaSource,
      componentName,
      componentType,
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
      '',
      '',
      '',
      '',
      ''
    );
  }

  if (e.target.closest('.tmb-acc-sec.accordion-container .button-container')) {
    const secondaryLink = e.target.closest('.tmb-acc-sec.accordion-container .accordion-wrapper .button-container a');
    const pageRegion = getPageRegion(e.target.closest('.tmb-acc-sec.accordion-container .button-container a'));
    const componentIndex = getComponentIndex(e.target.closest('.tmb-acc-sec.accordion-container .button-container a'));
    const ctaTitle = e.target.closest('.tmb-acc-sec.accordion-container .accordion-wrapper').querySelector('p');
    const nextPageURL = e.target.closest(".tmb-acc-sec.accordion-container .button-container a")?.getAttribute("href");

    ctaInteraction(
      pageRegion,
      minifyText(secondaryLink?.textContent),
      minifyText(ctaTitle?.textContent),
      '',
      'faq links',
      'accordion-container',
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
      'faq links',
      '',
      '',
      '',
      ''
    );
  }

  if (e.target.closest('.tmb-acc-sec.accordion-container ol li')) {
    const secondaryLink = e.target.closest('.tmb-acc-sec.accordion-container .accordion-wrapper li a');
    const pageRegion = getPageRegion(e.target.closest('.tmb-acc-sec.accordion-container li a'));
    const componentIndex = getComponentIndex(e.target.closest('.tmb-acc-sec.accordion-container li a'));
    const ctaTitle = e.target.closest('.tmb-acc-sec.accordion-container .accordion-wrapper').querySelector('p');
    const nextPageURL = e.target.closest(".tmb-acc-sec.accordion-container li a")?.getAttribute("href");

    ctaInteraction(
      pageRegion,
      minifyText(secondaryLink?.textContent),
      minifyText(ctaTitle?.textContent),
      '',
      'faq links',
      'accordion-container',
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
      'faq links',
      '',
      '',
      '',
      ''
    );
  }

const ctaLink = e.target.closest(
  '.who-can-apply-section.accordion-container ul li a'
);

if (!ctaLink) return;

const accordionItem = ctaLink.closest('.accordion-item');
const yearTitle = accordionItem?.querySelector('summary p');

const pageRegion = getPageRegion(ctaLink);
const componentIndex = getComponentIndex(ctaLink);
const nextPageURL = ctaLink.getAttribute('href');
const persona = getPersona();

const ctaText = minifyText(ctaLink.textContent);
const titleText = minifyText(yearTitle?.textContent);

const sectionEl = ctaLink.closest('.section');
const componentId = sectionEl?.getAttribute('id') || '';

/**
 * ✅ Normalize URL safely (removes query + hash)
 */
const getCleanUrl = (url = '') => {
  const baseUrl = url.split('?')[0].split('#')[0];
  return baseUrl.toLowerCase();
};

/**
 * ✅ Extract file extension safely
 */
const getFileExtension = (url = '') => {
  const parts = url.split('.');
  return parts.length > 1 ? parts.pop() : '';
};

const fileExtensions = [
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'csv',
  'ppt',
  'pptx',
  'zip',
  'rar',
  'txt'
];

const cleanUrl = getCleanUrl(nextPageURL);
const fileExt = getFileExtension(cleanUrl);
const isDownload = fileExtensions.includes(fileExt);

if (isDownload) {
  downloadDocument(
    pageRegion,
    'faq links',
    'accordion-container',
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
  'faq links',
  'accordion-container',
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
  ''
);
});
