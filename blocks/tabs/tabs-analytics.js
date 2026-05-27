import {
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex,
  sideNavMenuClick,
  ctaInteraction,
  tabInteraction
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {

  const tab = e.target.closest('.tabs-tab');

  /* ================= TAB CLICK ================= */
  if (tab) {

    const componentWrapper = tab.closest('.tabs-container');
    if (!componentWrapper) return;

    const homeSection = tab.closest('.home-loan-explained');

    const componentId =
      componentWrapper.getAttribute('id') || '';

    const pageRegion = getPageRegion(tab);
    const componentIndex = getComponentIndex(tab);

    const tabText = minifyText(
      tab.querySelector('p')?.textContent
      || tab.textContent
      || ''
    );

    const rawTabHTML =
      tab.querySelector('p')?.innerHTML
      || tab.innerHTML
      || '';

    const ctaTitle = minifyText(
      rawTabHTML
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
    );

    const activePanel =
      componentWrapper.querySelector('.tabs-panel[aria-hidden="false"]');

    const componentName =
      minifyText(componentWrapper.querySelector('h1, h2')?.textContent || '');

    const componentType =
      componentWrapper.dataset?.blockName || 'tabs';

    const interactionSource =
      activePanel?.getAttribute('id') || componentId;

    /* ================= TAB INTERACTION ================= */
    if (homeSection) {

      tabInteraction(
        pageRegion,
        tabText,
        ctaTitle,
        componentName,
        componentType,
        componentIndex,
        getPersona(),
        "cta-link",
        "in-content",
        "in-page-nav",
        "tabs",
        interactionSource,
        componentId
      );

    } else {

      sideNavMenuClick(
        pageRegion,
        tabText,
        '',
        'side widget',
        'tabs',
        componentIndex,
        getPersona(),
        '',
        'cta-link',
        'internal',
        componentId
      );
    }

    return;
  }

  /* ================= CTA CLICK ================= */
  const primaryLink = e.target.closest('.tab-content-actions .button');

  if (!primaryLink) return;

  const componentWrapper =
    primaryLink.closest('.tabs-container');

  const currentSection =
    primaryLink.closest('.tab-content-container');

  const activePanel =
    componentWrapper?.querySelector('.tabs-panel[aria-hidden="false"]');

  const tabContentItem =
    primaryLink.closest('.tab-content-item')
    || activePanel?.querySelector('.tab-content-item');

  const activeTab =
    componentWrapper?.querySelector('.tabs-tab[aria-selected="true"]');

  const componentId =
    componentWrapper?.getAttribute('id') || '';

  const ctaSource = minifyText(activeTab?.textContent || '');
  const ctaText = minifyText(primaryLink.textContent || '');

  const ctaTitle =
    minifyText(tabContentItem?.querySelector('h1, h2, h3')?.textContent || '');

  const nextPageURL =
    primaryLink.getAttribute('href') || '';

  const pageRegion = getPageRegion(primaryLink);

  const componentIndex =
    getComponentIndex(currentSection);

  ctaInteraction(
    pageRegion,
    ctaText,
    ctaTitle,
    ctaSource,
    'side widget',
    'tabs',
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