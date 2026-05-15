import {
  getPageRegion,
  getPersona,
  menuInteraction,
  minifyText,
  popularSearchClick,
  searchInitiate,
  suggestedSearchClick,
  headerlogoClick,
  internalSearch,
  searchresultitemClick,
  ctaInteraction,
  getComponentIndex // ✅ FIX: ADDED (was missing and causing crash)
} from "../../scripts/analytics/exports.js";

/**
 * HELPERS
 */
const getComponentName = (el) =>
  minifyText(
    el?.getAttribute('title')
    || el?.querySelector('img')?.alt
    || el?.textContent
    || 'na'
  );

const getComponentType = (el) =>
  (el?.querySelector('img') ? 'image' : el?.tagName?.toLowerCase());

const getComponentId = (el) =>
  el?.id
  || el?.getAttribute('data-id')
  || el?.dataset?.componentId
  || el?.closest('[data-component-id]')?.getAttribute('data-component-id')
  || '';

const getSafeHref = (el) => {
  const href = el?.getAttribute('href') || el?.href || '';
  if (!href) return '';

  try {
    return new URL(href, window.location.origin).pathname;
  } catch {
    return href;
  }
};

const fireInternalSearchOnLoad = () => {
  const page = document.querySelector('.search-results-page');
  if (!page || page.dataset.internalTracked) return;

  const input = document.querySelector('.results-search-inp')
    || document.querySelector('.header-search-inp');

  const searchTerm = (input?.value || '').trim();

  const resultsContainer = document.querySelector('.search-results-list');
  if (!resultsContainer) return;

  const triggerAnalytics = () => {
    const count = resultsContainer.querySelectorAll('.search-result-item').length;

    if (count === 0) return;
    if (page.dataset.internalTracked) return;

    page.dataset.internalTracked = 'true';

    internalSearch(
      getPageRegion(page),
      'search-results-page',
      'search-results-page',
      '1',
      getPersona(),
      page.id || 'search-results-page',
      'page-load',
      'global site search',
      searchTerm,
      count
    );
  };

  triggerAnalytics();

  const observer = new MutationObserver(() => triggerAnalytics());

  observer.observe(resultsContainer, {
    childList: true,
    subtree: true
  });
};

document.addEventListener('DOMContentLoaded', fireInternalSearchOnLoad);

const observer = new MutationObserver(fireInternalSearchOnLoad);

observer.observe(document.body, {
  childList: true,
  subtree: true
});

document.addEventListener('click', (e) => {
  // =========================
  // HEADER LOGO + LOGIN CTA
  // =========================

  const headerEl = e.target.closest(
    '.logo-wrap a, .login-btn-wrap a.login-btn'
  );

  if (headerEl) {
    const isLogin = headerEl.classList.contains('login-btn');

    // LOGIN CTA
    if (isLogin) {
      ctaInteraction(
        getPageRegion(headerEl),
        minifyText(headerEl.textContent),
        'login',
        'login',
        'header',
        'columns-container',
        getComponentIndex(headerEl),
        getPersona(),
        getSafeHref(headerEl),
        'cta-link',
        'internal',
        'header-login',
        'in-content',
        '',
        '',
        '',
        getComponentId(headerEl),
        '',
        '',
        '',
        ''
      );

      return;
    }

    // LOGO CLICK
    headerlogoClick(
      getPageRegion(headerEl),
      getComponentName(headerEl),
      getComponentType(headerEl),
      '1',
      'header',
      getSafeHref(headerEl),
      'click',
      'internal',
      getComponentId(headerEl)
    );

    return;
  }

  // =========================
  // PRIMARY NAV
  // =========================

  if (e.target.closest('.primary-nav-link')) {
    const linkEl = e.target.closest('a');

    menuInteraction(
      getPageRegion(linkEl),
      linkEl?.getAttribute('title') || linkEl?.textContent?.trim() || 'na',
      '',
      '',
      getComponentName(linkEl),
      'menu',
      '1',
      getPersona(),
      getSafeHref(linkEl),
      'menu-click',
      'internal',
      '',
      '',
      '',
      getComponentId(linkEl),
      ''
    );
  }

  // =========================
  // SECONDARY NAV
  // =========================

  if (e.target.closest('.secondary-nav-link')) {
    const linkEl = e.target.closest('a');

    menuInteraction(
      getPageRegion(linkEl),
      getComponentName(linkEl),
      getComponentType(linkEl),
      '',
      'top menu',
      'menu',
      '1',
      getPersona(),
      '',
      'menu-click',
      'internal',
      '',
      '',
      '',
      'header',
      getSafeHref(linkEl)
    );
  }

  // =========================
  // SEARCH INITIATE
  // =========================

  if (e.target.closest('.search-btn')) {
    const el = e.target.closest('.search-btn');

    const sectionEl = el.closest('.section');

    const container = el.closest('[data-block-name]')
      || el.closest('[class*="header"]')
      || el.closest('[class*="container"]');

    const componentId = sectionEl?.getAttribute('id') || '';

    const componentName = minifyText(
      [...el.classList]
        ?.find((cls) => cls.includes('search'))
        ?.replace(/-/g, ' ')
    )
      || minifyText(container?.className?.split(' ')[0])
      || 'component';

    const componentType = container?.getAttribute('data-block-name')
      || minifyText(container?.className?.split(' ')[0])
      || minifyText(sectionEl?.className?.split(' ')[1])
      || 'component';

    searchInitiate(
      getPageRegion(el),
      componentName,
      componentType,
      '1',
      getPersona(),
      'click',
      componentId
    );
  }

  // =========================
  // SEARCH BUTTON
  // =========================

  if (
    e.target.closest('button.search-btn')
    || e.target.closest('button.results-search-btn')
  ) {
    const btn = e.target.closest(
      'button.search-btn, button.results-search-btn'
    );

    const section = btn.closest('.section') || document;

    const input = section.querySelector('.results-search-inp')
      || section.querySelector('.header-search-inp')
      || document.querySelector('.results-search-inp')
      || document.querySelector('.header-search-inp');

    const searchTerm = (input?.value || '').trim();

    if (
      e.target.closest('.primary-header')?.classList.contains('search-active')
    ) {
      internalSearch(
        getPageRegion(btn),
        'search-results-page',
        'search-results-page',
        '1',
        getPersona(),
        section?.id || 'search-results-page',
        'click',
        'global site search',
        searchTerm,
        0
      );
    }
  }

  // =========================
  // POPULAR SEARCH
  // =========================

  if (e.target.closest('.popular-search-results a')) {
    const linkEle = e.target.closest('a');
    const wrapper = linkEle.closest('.popular-search-results');
    const section = linkEle.closest('.section');

    const clickedText = linkEle.getAttribute('title')?.trim()
      || linkEle.textContent.trim();

    const componentIndex = Array.from(wrapper.querySelectorAll('a')).indexOf(linkEle) + 1;

    popularSearchClick(
      getPageRegion(linkEle),
      wrapper.querySelector('h2')?.textContent.trim() || '',
      'popular-search-results',
      componentIndex.toString(),
      getPersona(),
      section?.id || '',
      linkEle.href,
      'click',
      'anchor',
      window.location.pathname,
      'global site search',
      minifyText(clickedText),
      clickedText
    );
  }

  // =========================
  // DYNAMIC SEARCH RESULTS
  // =========================

  if (e.target.closest('.dynamic-search-results a')) {
    const el = e.target.closest('a');

    const sectionEl = el.closest('.section');

    const container = el.closest('.dynamic-search-results')
      || el.closest('[data-block-name]')
      || el.closest('[class*="container"]');

    const headEle = el.closest('.default-content-wrapper')
      ?.querySelector('h1, h2, h3, h4, h5, h6');

    const componentId = sectionEl?.getAttribute('id') || '';

    const componentName = minifyText(headEle?.textContent)
      || minifyText(sectionEl?.className?.split(' ')[1])
      || 'component';

    const componentType = container?.getAttribute('data-block-name')
      || minifyText(container?.className?.split(' ')[0])
      || minifyText(sectionEl?.className?.split(' ')[1])
      || 'component';

    const searchTerm = document.querySelector('.header-search-inp')?.value || '';

    suggestedSearchClick(
      getPageRegion(el),
      componentName,
      componentType,
      '1',
      getPersona(),
      '',
      getSafeHref(el),
      'click',
      'anchor',
      window.location.pathname,
      'global site search',
      minifyText(searchTerm),
      minifyText(el?.textContent),
      minifyText(headEle?.textContent || ''),
      componentId
    );
  }

  // =========================
  // SEARCH RESULTS CLICK
  // =========================

  if (e.target.closest('.search-results-page a')) {
    const el = e.target.closest('a');

    const pageRegion = getPageRegion(el);

    const parent = el.closest('.search-results-page');
    const links = Array.from(parent?.querySelectorAll('a') || []);
    const componentIndex = (links.indexOf(el) + 1).toString();

    const isRightSide = el.classList.contains('item-category');

    let ctaText = '';
    let ctaTitle = '';

    const componentRoot = el.closest('.search-results-page')
      || el.closest('.search-result-item');

    const componentName = componentRoot?.className?.split(' ')[0] || 'search-results';

    const componentType = componentRoot?.className?.includes('item-category-section')
      ? 'category-result'
      : 'search-result';

    const rawLabel = el.cloneNode(true)?.textContent || '';

    ctaText = minifyText(rawLabel.replace(/\s+/g, ' ').trim());

    if (isRightSide) {
      const titleEl = el.closest('.search-result-item')?.querySelector('.item-title');

      ctaTitle = minifyText(titleEl?.textContent || '');
    }

    const searchTerm = document.querySelector('.results-search-inp')?.value
      || document.querySelector('.header-search-inp')?.value
      || '';

    searchresultitemClick(
      pageRegion,
      componentName,
      componentType,
      componentIndex,
      getPersona(),
      el.closest('.section')?.id || '',
      el.getAttribute('href') || '',
      'click',
      'anchor',
      'in-content',
      'global site search',
      minifyText(searchTerm),
      minifyText(el.textContent),
      ctaTitle,
      ctaText
    );
  }
});
