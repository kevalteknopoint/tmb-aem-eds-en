import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex
} from "../../scripts/analytics/exports.js";

export default function executeAnalytics() {
  document.addEventListener('click', (e) => {

    const link = e.target.closest('.customer a');
    if (!link) return;

    const section = link.closest('.customer');
    const headingEl = section?.querySelector('h1, h2, h3, h4, h5, h6');
    const headingText = minifyText(headingEl?.textContent);
    const componentType = section?.querySelector('[data-block-name]')?.getAttribute('data-block-name') || '';
    const ctaText = minifyText(link?.textContent);
    const ctaTitle = headingText;
    const ctaSource = headingText;
    const componentName = headingText;
    const componentId = section?.getAttribute('data-component-id') || section?.id ||'';
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
  });

  window.customerAnalyticsLoaded = true;
}
