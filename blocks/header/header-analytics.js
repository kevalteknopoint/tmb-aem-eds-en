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
  searchresultitemClick
} from "../../scripts/analytics/exports.js";

/**
 * HELPERS
 */
const getComponentName = (el) =>
  minifyText(
    el?.getAttribute('title') ||
    el?.querySelector('img')?.alt ||
    el?.textContent ||
    'na'
  );

const getComponentType = (el) => el?.querySelector('img') ? 'image' : el?.tagName?.toLowerCase();

const getComponentId = (el) => el?.id || el?.getAttribute('data-id') || el?.dataset?.componentId || el?.closest('[data-component-id]')?.getAttribute('data-component-id') || '';

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

  const input = document.querySelector('.results-search-inp') || document.querySelector('.header-search-inp');

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
  const observer = new MutationObserver(() => {
    triggerAnalytics();
  });

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

  const logoEl = e.target.closest('.logo-wrap a');

  if (logoEl) {
    headerlogoClick(
      getPageRegion(logoEl),
      getComponentName(logoEl),
      getComponentType(logoEl),
      '1',
      'header',
      getSafeHref(logoEl),
      'click',
      'internal',
      getComponentId(logoEl)
    );
    return;
  }

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

  if (e.target.closest('.search-btn')) {
    const el = e.target.closest('.search-btn');

    searchInitiate(
      getPageRegion(el),
      getComponentName(el),
      'header',
      '1',
      getPersona(),
      'click',
      getComponentId(el)
    );
  }

  if (
    e.target.closest('button.search-btn') ||
    e.target.closest('button.results-search-btn')
  ) {
    const btn = e.target.closest(
      'button.search-btn, button.results-search-btn'
    );

    const section = btn.closest('.section') || document;

    const input = section.querySelector('.results-search-inp') || section.querySelector('.header-search-inp') || document.querySelector('.results-search-inp') || document.querySelector('.header-search-inp');

    const searchTerm = (input?.value || '').trim();

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
  if (e.target.closest('.popular-search-results a')) {
    const linkEle = e.target.closest('a');

    const wrapper = linkEle.closest('.popular-search-results');
    const section = linkEle.closest('.section');
    const clickedText = linkEle.getAttribute('title')?.trim() || linkEle.textContent.trim();
    const componentIndex =
      Array.from(wrapper.querySelectorAll('a')).indexOf(linkEle) + 1;

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

  if (e.target.closest('.dynamic-search-results a')) {
    const el = e.target.closest('a');

    const headEle = el.closest('.default-content-wrapper') ?.querySelector('h1, h2, h3, h4, h5, h6');

    const searchTerm =
      document.querySelector('.header-search-inp')?.value || '';

    suggestedSearchClick(
      getPageRegion(el),
      getComponentName(el),
      getComponentType(el),
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
      getComponentId(el)
    );
  }

  if (e.target.closest('.search-results-page a')) {
    const el = e.target.closest('a');

    const pageRegion = getPageRegion(el);

    const parent = el.closest('.search-results-page');
    const links = Array.from(parent?.querySelectorAll('a') || []);
    const componentIndex = (links.indexOf(el) + 1).toString();

    const isRightSide = el.classList.contains('item-category');

    let ctaText = '';
    let ctaTitle = '';

    if (isRightSide) {
      ctaText = 'reports and disclosure';
      ctaTitle = 'annual reports';
    } else {
      ctaText = minifyText(el.textContent);
      ctaTitle = '';
    }

    const searchTerm = document.querySelector('.results-search-inp')?.value || document.querySelector('.header-search-inp')?.value || '';
    searchresultitemClick(
      pageRegion,
      ctaText,
      'search-result',
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
      ctaTitle
    );
  }
});
