import { getComponentIndex, getPageRegion, getPersona, menuInteraction, minifyText, popularSearchClick, searchInitiate, suggestedSearchClick } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  // --- Existing tracking ---
  if (e.target.closest('.secondary-nav-link')) {
    const secondaryLink = e.target.closest('.secondary-nav-link');
    menuInteraction(
      getPageRegion(secondaryLink),
      minifyText(secondaryLink?.textContent),
      '',
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
      ''
    );
  }

  if (e.target.closest('.primary-nav-link')) {
    const primaryLink = e.target.closest('.primary-nav-link');
    menuInteraction(
      getPageRegion(primaryLink),
      minifyText(primaryLink?.textContent),
      '',
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
      ''
    );
  }

  if (e.target.closest('.search-btn')) {
    searchInitiate(
      getPageRegion(e.target.closest('.search-btn')),
      'search button',
      'header',
      getComponentIndex(e.target.closest('.search-btn')),
      getPersona(),
      'click',
      ''
    );
  }

  if (e.target.closest('a') && e.target.closest('a')?.closest('.popular-search-results')) {
    const linkEle = e.target.closest('a');
    const searchTerm = document.querySelector('.header-search-inp')?.value;

    popularSearchClick(
      getPageRegion(linkEle),
      'search item',
      'search result item',
      getComponentIndex(linkEle),
      getPersona(),
      '',
      linkEle.href,
      'click',
      'anchor',
      window.location.pathname,
      'global site search',
      minifyText(searchTerm),
      'popular searches'
    );
  }

  if (e.target.closest('a') && e.target.closest('a')?.closest('.dynamic-search-results')) {
    const linkEle = e.target.closest('a');
    const headEle = linkEle.closest('.default-content-wrapper')?.querySelector('h1, h2, h3, h4, h5, h6');
    const searchTerm = document.querySelector('.header-search-inp')?.value;

    suggestedSearchClick(
      getPageRegion(linkEle),
      'search item',
      'search result item',
      getComponentIndex(linkEle),
      getPersona(),
      '',
      linkEle.href,
      'click',
      'anchor',
      window.location.pathname,
      'global site search',
      minifyText(searchTerm),
      minifyText(linkEle?.textContent),
      minifyText(headEle?.textContent)
    );
  }

  if (e.target.closest('.logo-wrap a')) {
    const logoLink = e.target.closest('.logo-wrap a');

    menuInteraction(
      getPageRegion(logoLink),
      'Logo',
      '',
      '',
      'Header',
      'header',
      getComponentIndex(logoLink),
      getPersona(),
      '',
      'cta-link',
      'internal',
      '',
      '',
      '',
      'header',
      logoLink.href
    );
  }
});
