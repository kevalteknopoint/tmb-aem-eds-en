import './header-analytics.js';
import { createOptimizedPicture, getMetadata } from '../../scripts/aem.js';
import { div, ul, li, a, button, input, form } from '../../scripts/dom-helpers.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.innerHTML = fragment.innerHTML;

  // --- SECONDARY NAV ---
  const secondarySection = block.querySelector('.section:first-child');
  const secondaryListItems = [...secondarySection.querySelectorAll('ul > li')];

  const secondaryList = ul(
    { class: 'secondary-nav-list' },
    ...secondaryListItems.map((liItem) => {
      const link = liItem.querySelector('a');
      return li(
        { class: 'secondary-nav-item' },
        a({ class: 'secondary-nav-link', href: link.href, title: link.title }, link.textContent)
      );
    })
  );

  const newSecondarySection = div({ class: 'section secondary-header' },
    div({ class: 'secondary-header-wrap' }, secondaryList)
  );
  secondarySection.replaceWith(newSecondarySection);

  // --- HAM MENU BUTTON ---
  const hamMenuImg = block.querySelector('.section.columns-container > .default-content-wrapper picture > img');
  const optimizedHamMenuPic = createOptimizedPicture(
    hamMenuImg.src,
    hamMenuImg.alt,
    false,
    [{ media: "(min-width: 768px)", width: "40" }, { width: "24" }]
  );
  const hamMenuBtn = div(
    { class: 'ham-menu-btn-wrap' },
    button(
      { class: 'ham-menu-btn' },
      optimizedHamMenuPic,
    )
  );

  // --- PRIMARY NAV + LOGO + SEARCH/LOGIN ---
  const primaryContainer = block.querySelector('.section.columns-container');
  const columns = primaryContainer.querySelector('.columns-wrapper > .columns');

  const [col1, col2] = [...columns.children[0].children];

  // Column 1 - Primary nav list
  const primaryNavItems = [...col1.querySelectorAll('ul > li')];
  const primaryNavList = ul(
    { class: 'primary-nav-list' },
    ...primaryNavItems.map((liItem) => {
      const link = liItem.querySelector('a');
      return li(
        { class: 'primary-nav-item' },
        a({ class: 'primary-nav-link', href: link.href, title: link.title }, link.textContent)
      );
    })
  );

  // Column 2 - Logo + search + login
  const logoImg = col1.querySelector('picture > img');
  const logoPic = createOptimizedPicture(logoImg?.src, logoImg?.alt, false, [
    { media: '(min-width: 768px)', width: '195' },
    { width: '105' },
  ]);

  const logoWrap = div({ class: 'logo-wrap' }, logoPic);
  const logoNavWrap = div({ class: 'logo-nav-wrap' }, hamMenuBtn, logoWrap, primaryNavList);

  const crossIcon = col2.querySelector('p span:nth-child(2) svg');
  const crossBtn = button({ class: 'search-cross-btn' }, crossIcon);

  const backIcon = col2.querySelector('p span:nth-child(1) svg');
  const backBtn = button({ class: 'search-back-btn' }, backIcon);

  // Search button
  const searchInp = input({ class: 'header-search-inp', name: 'headerSearch', id: 'headerSearch', placeholder: 'Start typing...' });
  const searchForm = form({ class: 'header-search-form' }, backBtn, searchInp, crossBtn);
  const searchIcon = col2.querySelector('p span:nth-child(3) svg');
  const searchBtn = button({ class: 'search-btn' }, searchIcon);
  const searchBtnWrap = div({ class: 'search-btn-wrap' }, searchForm, searchBtn);

  // Login button
  const loginLink = col2.querySelector('.button');
  const loginBtn = a({ class: 'login-btn', href: loginLink.href, title: loginLink.title }, loginLink.textContent);
  const loginBtnWrap = div({ class: 'login-btn-wrap' }, loginBtn);

  const searchLoginWrap = div({ class: 'header-actions-wrap' }, searchBtnWrap, loginBtnWrap);

  const newPrimarySection = div(
    { class: 'section primary-header' },
    div({ class: 'primary-header-wrap' },
      logoNavWrap,
      searchLoginWrap
    )
  );

  crossBtn.addEventListener('click', (e) => {
    e.preventDefault();

    searchInp.value = '';
  });

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    newPrimarySection.classList.add('search-active');
    searchInp.focus();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-back-btn') && e.target.closest('.search-btn-wrap')) return;

    e.preventDefault();
    newPrimarySection.classList.remove('search-active');
  });

  primaryContainer.replaceWith(newPrimarySection);

  // Search Results Section
  const searchSection = block.querySelector('.search-results-section');
  if (window.location.origin.includes('author')) searchSection?.classList.add('author-mode');

  // Popular searches
  const popularSearches = div({ class: 'popular-search-results' });
  const contentWrapper = searchSection.querySelector('.default-content-wrapper');
  popularSearches.append(contentWrapper);
  searchSection.appendChild(popularSearches);

  searchSection.insertAdjacentElement('afterbegin', div({ class: 'dynamic-search-results', id: 'dynamicSearchResults' }, contentWrapper.cloneNode(true)));
}
