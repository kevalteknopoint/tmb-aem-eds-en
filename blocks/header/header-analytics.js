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
  minifyText(el.getAttribute('title') || el.querySelector('img')?.alt || el.textContent || 'na');

const getComponentType = (el) =>
  (el.querySelector('img') ? 'image' : el.tagName.toLowerCase());

const getComponentId = (el) => el.id || el.getAttribute('data-id') || el.dataset?.componentId || el.closest('[data-component-id]')?.getAttribute('data-component-id') || '';

const getSafeHref = (el) => {
  const href = el?.getAttribute('href') || el?.href || '';
  if (!href) return '';

  try {
    return new URL(href, window.location.origin).pathname;
  } catch (e) {
    return href;
  }
};

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
    const el = e.target.closest('.primary-nav-link');
    const linkEl = el.closest('a');

    const nextpageUrl = getSafeHref(linkEl);

    const leveltwoMenu = linkEl?.getAttribute('title') || linkEl?.textContent?.trim() || 'na';

    menuInteraction(
      getPageRegion(linkEl),
      '',
      leveltwoMenu,
      '',
      getComponentName(linkEl),
      'menu',
      '1',
      getPersona(),
      nextpageUrl,
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
    const el = e.target.closest('.secondary-nav-link');
    const linkEl = el?.tagName === 'A' ? el : el?.closest('a');

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

  if (e.target.closest('a') && e.target.closest('.popular-search-results')) {
    const linkEle = e.target.closest('a');

    const wrapper = linkEle.closest('.popular-search-results');
    const section = linkEle.closest('.section');
    const clickedText = linkEle.getAttribute('title')?.trim() || linkEle.textContent.trim();

    const componentName = wrapper.querySelector('h2')?.textContent.trim() || '';
    const componentType = 'popular-search-results';

    const componentId = section?.id || '';

    const componentIndex = Array.from(wrapper.querySelectorAll('a')).indexOf(linkEle) + 1;

    popularSearchClick(
      getPageRegion(linkEle),
      componentName,
      componentType,
      componentIndex.toString(),
      getPersona(),
      componentId,
      linkEle.href,
      'click',
      'anchor',
      window.location.pathname,
      'global site search',
      minifyText(clickedText),
      clickedText
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
      getSafeHref(el),
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
