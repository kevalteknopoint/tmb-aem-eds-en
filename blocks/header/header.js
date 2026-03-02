import './header-analytics.js';
import { createOptimizedPicture, getMetadata, injectIcon, isMobile, isTablet } from '../../scripts/aem.js';
import { div, ul, li, a, button, input, form, h2, span } from '../../scripts/dom-helpers.js';
import { loadFragment } from '../fragment/fragment.js';

function toCapitalCase(str) {
  return str
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

async function fetchQueryJson() {
  try {
    const basePath = getMetadata('base-path');
    const queryRes = await fetch('/query-index.json');
    const jsonRes = await queryRes.json();
    window.searchData = jsonRes?.data?.filter((result) => result?.path?.startsWith(basePath));
  } catch (error) {
    console.log('Failed to fetch query-index: ', error);
  }
}

function populateSearchData(wrapper, data) {
  wrapper.innerHTML = '';

  const taggedObj = {
    default: []
  };

  data.forEach((item) => {
    if (!item.tags) return taggedObj.default.push(item);

    const firstTag = item.tags.split(',')?.[0];

    if (!Object.prototype.hasOwnProperty.call(taggedObj, firstTag)) taggedObj[firstTag] = [];

    taggedObj[firstTag].push(item);

    return null;
  });

  const allWrappers = [];

  Object.keys(taggedObj).forEach((tag) => {
    if (!taggedObj[tag].length) return;

    let resultTitle = toCapitalCase(tag);

    if (tag === 'default') {
      resultTitle = 'Others';
    }

    const defaultWrapper = div({ class: 'default-content-wrapper' }, h2(resultTitle));
    const dataUl = ul();

    taggedObj[tag].forEach((item) => {
      const itemPath = item.path;
      const splitPath = itemPath?.split('/');
      const title = item.title || item.ogTitle || splitPath?.[splitPath.length - 1];
      const link = a({ href: item.path }, toCapitalCase(title));
      injectIcon('chevron-right-links', link);
      dataUl.appendChild(li(
        link
      ));
    });

    defaultWrapper.appendChild(dataUl);
    allWrappers.push(defaultWrapper);
  });

  const reversedWrappers = allWrappers.reverse();

  const dataWrapper = div({ class: 'dynamic-search-results', id: 'dynamicSearchResults' }, ...reversedWrappers);
  wrapper.appendChild(dataWrapper);
}

function showToast(message, timeout = 3000) {
  const toast = div({ class: 'mui-toast-wrapper' },
    span({ class: 'toast-message' }, message)
  );

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('visible'), 10);

  // 3. Auto-remove logic
  setTimeout(() => {
    toast.classList.remove('visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, timeout);
}

export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  const searchPath = `${getMetadata('base-path')}/search-results`;

  fetchQueryJson();

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
  // const hamMenuImg = block.querySelector('.section.columns-container > .default-content-wrapper picture > img');
  // const optimizedHamMenuPic = createOptimizedPicture(
  //   hamMenuImg.src,
  //   hamMenuImg.alt,
  //   false,
  //   [{ media: "(min-width: 768px)", width: "40" }, { width: "24" }]
  // );

  const hamBtnEle = button(
    { class: 'ham-menu-btn' },
  );

  injectIcon('ham-icon', hamBtnEle);

  const hamMenuBtn = div(
    { class: 'ham-menu-btn-wrap' },
    hamBtnEle
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
  const logoPic = a({ href: `${getMetadata('base-path')}/` }, createOptimizedPicture(logoImg?.src, logoImg?.alt, false, [
    { media: '(min-width: 768px)', width: '195' },
    { width: '105' },
  ]));

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

    newPrimarySection.classList.remove('search-active');
  });

  primaryContainer.replaceWith(newPrimarySection);

  const primaryCopy = primaryNavList.cloneNode(true);
  const secondaryCopy = secondaryList.cloneNode(true);

  const closeBtn = button({ class: "close-mobile-menu" });
  injectIcon('close-icon', closeBtn);

  const mobileMenuSection = div({ class: "mobile-menu-wrapper" }, closeBtn, primaryCopy);

  if (isMobile()) {
    mobileMenuSection.appendChild(secondaryCopy);
    block.appendChild(mobileMenuSection);
  } else if (isTablet()) {
    block.appendChild(mobileMenuSection);
  }

  // Search Results Section
  const searchSection = block.querySelector('.search-results-section');
  if (window.location.origin.includes('author')) searchSection?.classList.add('author-mode');

  // Popular searches
  const popularSearches = div({ class: 'popular-search-results' });
  const contentWrapper = searchSection.querySelector('.default-content-wrapper');
  popularSearches.append(contentWrapper);
  searchSection.appendChild(popularSearches);

  const searchDataWrapper = div({ class: 'dynamic-search-results-wrapper' });

  searchSection.insertAdjacentElement('afterbegin', searchDataWrapper);

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    window.location.href = `${searchPath}?search=${searchInp.value}`;
    showToast("Please wait you're being redirected...");
  });

  searchInp.addEventListener('input', (e) => {
    const targetValue = e.target.value;

    if (targetValue?.length < 3) {
      searchDataWrapper.innerHTML = '';
      return;
    }

    const filteredResults = window.searchData?.filter((item) => JSON.stringify(item)?.toLowerCase()?.includes(targetValue?.toLowerCase()));

    if (!filteredResults.length) {
      searchDataWrapper.innerHTML = '';
      return;
    }

    populateSearchData(searchDataWrapper, filteredResults);
  });

  hamMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();

    mobileMenuSection.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();

    document.body.style.overflow = 'auto';
    mobileMenuSection.classList.remove('active');
  });
}
