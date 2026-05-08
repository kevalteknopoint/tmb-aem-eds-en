import {
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex,
  sideNavMenuClick,
  ctaInteraction
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  /* ---------------- TAB CLICK ---------------- */
  const tab = e.target.closest(
    '.tabbed-navigation.tabs-container .tabs-tab'
  );

  if (tab) {
    const componentWrapper = tab.closest(
      '.tabbed-navigation.tabs-container'
    );

    const sectionTitleEl = componentWrapper?.querySelector(
      '.default-content-wrapper h2'
    );

    const sectionTitle = minifyText(
      sectionTitleEl?.textContent || ''
    );

    const componentId = componentWrapper?.getAttribute('id') || '';

    const ctaSource = minifyText(
      tab?.textContent || ''
    );

    const pageRegion = getPageRegion(tab);

    const componentIndex = getComponentIndex(tab);

    sideNavMenuClick(
      pageRegion,
      ctaSource,
      '',
      sectionTitle,
      'tabs',
      componentIndex,
      getPersona(),
      '',
      'cta-link',
      'internal',
      componentId
    );
  }

  /* ---------------- CTA CLICK ---------------- */
  const primaryLink = e.target.closest(
    '.tab-content-actions .button'
  );

  if (!primaryLink) return;

  const componentWrapper = primaryLink.closest(
    '.tabbed-navigation.tabs-container'
  );

  const currentSection = primaryLink.closest(
    '.tab-content-container'
  );

  /* ✅ FIX: Get ACTIVE visible tab panel */
  const activePanel = componentWrapper?.querySelector(
    '.tabs-panel[aria-hidden="false"]'
  );

  /* Optional fallback: ensure correct item */
  const tabContentItem = primaryLink.closest('.tab-content-item')
    || activePanel?.querySelector('.tab-content-item');

  const activeTab = componentWrapper?.querySelector(
    '.tabs-tab[aria-selected="true"]'
  );

  /* ---------- DYNAMIC VALUES ---------- */

  const sectionTitleEl = componentWrapper?.querySelector(
    '.default-content-wrapper h2'
  );

  const sectionTitle = minifyText(
    sectionTitleEl?.textContent || ''
  );

  const componentId = componentWrapper?.getAttribute('id') || '';

  const ctaSource = minifyText(
    activeTab?.textContent || ''
  );

  const ctaText = minifyText(
    primaryLink?.textContent || ''
  );

  /* ✅ FIXED: Dynamic CTA title */
  const ctaTitle = minifyText(
    tabContentItem?.querySelector(
      '.tab-content-heading h3'
    )?.textContent || ''
  );

  const nextPageURL = primaryLink?.getAttribute('href') || '';

  const pageRegion = getPageRegion(primaryLink);

  const componentIndex = getComponentIndex(currentSection);

  ctaInteraction(
    pageRegion,
    ctaText,
    ctaTitle,
    ctaSource,
    sectionTitle,
    sectionTitle,
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
