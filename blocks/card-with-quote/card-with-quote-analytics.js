import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const ctaLink = e.target.closest('.card-with-quote-container a.button');
  if (!ctaLink) return;

  const sectionEl = ctaLink.closest('.section');
  const blockEl = ctaLink.closest('.card-with-quote');
  const contentEl = ctaLink.closest('.card-with-quote-content');

  // =========================
  // COMPONENT DYNAMIC VALUES
  // =========================

  const componentId = sectionEl?.id
    || sectionEl?.getAttribute('data-component-id')
    || '';

  const componentName = sectionEl?.className
    ?.split(' ')
    ?.find((cls) => cls.includes('card'))
    || 'card-with-quote';

  const componentType = blockEl?.getAttribute('data-block-name')
    || sectionEl?.getAttribute('data-block-name')
    || 'component';

  // =========================
  // CTA VALUES (FULLY DYNAMIC)
  // =========================

  const ctaText = minifyText(ctaLink.textContent);

  const ctaTitle = minifyText(
    contentEl?.querySelector('h1,h2,h3,h4,h5,h6')?.textContent
      || sectionEl?.querySelector('h1,h2,h3,h4,h5,h6')?.textContent
      || ''
  );

  const ctaSource = minifyText(
    sectionEl?.querySelector('.card-with-quote-content h1,h2,h3,h4,h5,h6')?.textContent
      || sectionEl?.querySelector('.card-with-quote-content p')?.textContent
      || ''
  );

  const pageRegion = getPageRegion(ctaLink);
  const componentIndex = getComponentIndex(ctaLink);
  const nextPageURL = ctaLink.getAttribute("href");

  // =========================
  // ANALYTICS CALL
  // =========================

  ctaInteraction(
    pageRegion,
    ctaText, // CTA text
    ctaTitle, // title (heading)
    ctaSource, // source (description/content)
    componentName, // component name
    componentType, // component type
    componentIndex,
    getPersona(),
    nextPageURL,
    'cta-link',
    'internal',
    componentId,
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
});
