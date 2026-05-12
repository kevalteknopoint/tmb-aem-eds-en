import {
  breadcrumbItemClick,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const link = e.target.closest('.breadcrumb-container .breadcrumb a');
  if (!link) return;

  const container = e.target.closest('.breadcrumb-container');
  const breadcrumb = container?.querySelector('.breadcrumb');

  const pageRegion = getPageRegion(link);
  const componentIndex = getComponentIndex(link);
  const nextPageURL = link.getAttribute("href");

  const breadcrumblevel = breadcrumb?.innerText.replace(/[\n\r]+/g, '') || '';
  const level = breadcrumb?.innerText.split("/").length || 0;

  const ctaText = minifyText(link?.textContent);

  const componentName = minifyText(container?.closest('.section')?.querySelector('h1, h2, h3, h4, h5, h6')?.textContent)
    || 'breadcrumb';

  const componentType = container?.getAttribute('data-block-name')
    || container?.className?.split(' ')[0]
    || 'breadcrumb';

  const componentId = container?.closest('.section')?.getAttribute('id') || '';

  breadcrumbItemClick(
    pageRegion,
    ctaText,
    nextPageURL,
    'breadcrumb-click',
    'internal',

    componentType,
    'in-content',

    breadcrumblevel,
    level,

    componentName,
    ctaText,

    componentIndex,
    getPersona(),

    '',
    '',
    '',
    '',
    '',

    componentId,
    ''
  );
});
