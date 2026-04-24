import {
  getPageRegion,
  getPersona,
  menuInteraction,
  minifyText,
  popularSearchClick,
  searchInitiate,
  suggestedSearchClick,
  headerlogoClick
} from "../../scripts/analytics/exports.js";

const getComponentName = (el) =>
  minifyText(
    el.getAttribute('title')
    || el.querySelector('img')?.alt
    || el.textContent
    || 'na'
  );

const getComponentType = (el) =>
  (el.querySelector('img') ? 'image' : el.tagName.toLowerCase());

const getComponentId = (el) =>
  el.id
  || el.getAttribute('data-id')
  || el.dataset?.componentId
  || el.closest('[data-component-id]')?.getAttribute('data-component-id')
  || '';

document.addEventListener('click', (e) => {
  const logoEl = e.target.closest('.logo-wrap a');

  if (logoEl) {
    headerlogoClick(
      getPageRegion(logoEl),
      getComponentName(logoEl),
      getComponentType(logoEl),
      '1',
      'header',
      logoEl.getAttribute('href') || '',
      'click',
      'internal',
      getComponentId(logoEl)
    );
    return;
  }

  if (e.target.closest('.primary-nav-link')) {
    const el = e.target.closest('.primary-nav-link');

    menuInteraction(
      getPageRegion(el),
      getComponentName(el),
      getComponentType(el),
      '',
      'header',
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
      el.getAttribute('href') || ''
    );
  }

  if (e.target.closest('.secondary-nav-link')) {
    const el = e.target.closest('.secondary-nav-link');

    menuInteraction(
      getPageRegion(el),
      getComponentName(el),
      getComponentType(el),
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
      el.getAttribute('href') || ''
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

  if (e.target.closest('a') && e.target.closest('.popular-search-results')) {
    const el = e.target.closest('a');
    const searchTerm = document.querySelector('.header-search-inp')?.value;

    popularSearchClick(
      getPageRegion(el),
      getComponentName(el),
      getComponentType(el),
      '1',
      getPersona(),
      '',
      el.href,
      'click',
      'anchor',
      window.location.pathname,
      'global site search',
      minifyText(searchTerm),
      'popular searches'
    );
  }

  if (e.target.closest('a') && e.target.closest('.dynamic-search-results')) {
    const el = e.target.closest('a');
    const headEle = el.closest('.default-content-wrapper')
      ?.querySelector('h1, h2, h3, h4, h5, h6');
    const searchTerm = document.querySelector('.header-search-inp')?.value;

    suggestedSearchClick(
      getPageRegion(el),
      getComponentName(el),
      getComponentType(el),
      '1',
      getPersona(),
      '',
      el.href,
      'click',
      'anchor',
      window.location.pathname,
      'global site search',
      minifyText(searchTerm),
      minifyText(el?.textContent),
      minifyText(headEle?.textContent),
      getComponentId(el)
    );
  }
});
