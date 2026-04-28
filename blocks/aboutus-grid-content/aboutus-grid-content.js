import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex
} from "../../scripts/analytics/exports.js";

const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6';

const eventListener = (e) => {
  const link = e.target.closest('.aboutus-grid-content .button-container a');
  if (!link) return;

  const section = link.closest('.aboutus-grid-content');
  const card = link.closest('div');

  // Card title
  const ctaTitleEl = card?.querySelector(HEADING_SELECTOR);
  const ctaTitle = minifyText(ctaTitleEl?.textContent || '');

  // Section heading
  const sectionHeadingEl = section?.querySelector(`.default-content-wrapper ${HEADING_SELECTOR}`) || section?.querySelector(HEADING_SELECTOR);

  const sectionHeading = minifyText(sectionHeadingEl?.textContent || '');

  // Dynamic fields
  const ctaText = minifyText(link.textContent);
  const ctaSource = sectionHeading;
  const componentName = sectionHeading;

  const componentType = section?.querySelector('[data-block-name]')?.getAttribute('data-block-name') || '';

  const componentId = section?.getAttribute('data-component-id') || section?.id || '';

  const pageRegion = getPageRegion(link);
  const componentIndex = getComponentIndex(link);
  const nextPageURL = link.getAttribute("href");

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
    componentId,
    '',
    '',
    '',
    ''
  );
};

document.removeEventListener('click', eventListener);
document.addEventListener('click', eventListener);
