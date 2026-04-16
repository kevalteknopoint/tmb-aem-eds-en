import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex
} from "../../scripts/analytics/exports.js";

const eventListener = (e) => {
  const link = e.target.closest('.aboutus-grid-content .button-container a');
  if (!link) return;

  //  Get the correct card (each <div> block)
  const card = link.closest('div');

  //  Title for that specific card
  const ctaTitle = card?.querySelector('h1, h2, h3, h4');

  //  Optional source (keep if needed, else remove)
  const ctaSource = card?.querySelector('p');

  const pageRegion = getPageRegion(link);
  const componentIndex = getComponentIndex(link);
  const nextPageURL = link.getAttribute("href");

  ctaInteraction(
    pageRegion,
    minifyText(link.textContent),
    minifyText(ctaTitle?.textContent),
    minifyText(ctaSource?.textContent || ''),
    'committee',
    'columns',
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
    'committee'
  );
};

document.removeEventListener('click', eventListener);
document.addEventListener('click', eventListener);
