import { getMetadata, injectIcon } from "../../scripts/aem.js";
import { a, b, button, div, form, input, li, p, span, ul } from "../../scripts/dom-helpers.js";

const ITEMS_PER_PAGE = 10;
const VISIBLE_PAGES = 4;

function getQuery(key) {
  const queryObj = Array.from(new URL(window.location.href).searchParams.entries()).reduce(
    (acc, v) => {
      acc[v[0]] = decodeURIComponent(v[1]);
      return acc;
    }, {});

  if (key) return queryObj[key];

  return queryObj;
}

function toCapitalCase(str) {
  if (!str) return '';
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
    console.error(error);
  }
}

function renderSearchUI(container, searchVal, allResults, currentPage, onPageChange) {
  container.innerHTML = '';

  if (!allResults.length) {
    container.appendChild(p({ class: 'no-results' }, `No results found for "${searchVal}"`));
    return;
  }

  const totalPages = Math.ceil(allResults.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentResults = allResults.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const resultDetailsDiv = div({ class: 'search-result-details' },
    p({ class: 'search-results-num' }, `${allResults.length} results for `, b(`${searchVal}`)),
    p({ class: 'search-page-details' }, `Page ${currentPage} of ${totalPages}`)
  );

  const resultsList = div({ class: 'search-results-list' });
  currentResults.forEach((res) => {
    resultsList.appendChild(
      div({ class: 'search-result-item' },
        div({ class: 'item-detail-section' },
          a({ class: 'item-title', href: res.link }, res.title),
          span({ class: 'item-desc' }, res.desc)
        ),
        div({ class: 'item-category-section' },
          a({ class: 'item-category', href: res.link }, res.category)
        ),
      )
    );
  });

  container.append(resultDetailsDiv, resultsList);

  if (totalPages > 1) {
    const pageNumWrap = ul({ class: 'search-page-num-wrap' });

    let startPage = Math.max(1, currentPage - Math.floor(VISIBLE_PAGES / 2));
    let endPage = startPage + VISIBLE_PAGES - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - VISIBLE_PAGES + 1);
    }

    for (let i = startPage; i <= endPage; i += 1) {
      const pageBtn = li({ class: `page-btn${i === currentPage ? ' active' : ''}` }, i);
      pageBtn.addEventListener('click', () => onPageChange(i));
      pageNumWrap.appendChild(pageBtn);
    }

    const prevBtn = button({ class: 'page-prev-btn', type: 'button' });
    const nextBtn = button({ class: 'page-next-btn', type: 'button' });

    if (currentPage === 1) prevBtn.disabled = true;
    if (currentPage === totalPages) nextBtn.disabled = true;

    injectIcon('chevron-right-circle', prevBtn);
    injectIcon('chevron-right-circle', nextBtn);

    prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));
    nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));

    const paginationContainer = div({ class: 'search-pagination-wrapper' }, prevBtn, pageNumWrap, nextBtn);
    container.appendChild(paginationContainer);
  }
}

(async function decorateSearchPage() {
  if (window.location.origin.includes('author')) return;

  const searchPageSection = document.querySelector('.search-results-page');
  const searchResultsContainer = div({ class: 'search-page-results-container', id: 'searchPageResults' });

  let currentFilteredData = [];
  let currentSearchTerm = '';

  const searchInp = input({ class: 'results-search-inp', name: 'resultsSearch', id: 'resultsSearch', placeholder: 'Start typing...' });
  const crossIcon = searchPageSection.querySelector('p span:nth-child(1) svg');
  const crossBtn = button({ class: 'results-cross-btn', type: 'button' }, crossIcon);
  const searchIcon = searchPageSection.querySelector('p span:nth-child(2) svg');
  const searchBtn = button({ class: 'results-search-btn', type: 'button' }, searchIcon);
  const searchForm = form({ class: 'results-search-form' }, searchInp, crossBtn, searchBtn);

  const replaceP = searchPageSection.querySelector('p:has(.icon)');
  replaceP.replaceWith(searchForm);

  if (!window.searchData) await fetchQueryJson();

  const handlePageChange = (newPage) => {
    renderSearchUI(searchResultsContainer, currentSearchTerm, currentFilteredData, newPage, handlePageChange);
    window.scrollTo({ top: searchPageSection.offsetTop, behavior: 'smooth' });
  };

  searchForm.addEventListener('submit', (e) => e.preventDefault());

  searchInp.addEventListener('input', (e) => {
    currentSearchTerm = e.target.value;

    if (currentSearchTerm.length < 3) {
      searchResultsContainer.innerHTML = '';
      currentFilteredData = [];
      return;
    }

    const rawResults = window.searchData?.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(currentSearchTerm.toLowerCase())
    ) || [];

    currentFilteredData = rawResults.map((item) => {
      const firstTag = item.tags?.split(',')?.[0] || '';
      const splitPath = item.path?.split('/') || [];
      return {
        title: item.title || item.ogTitle || toCapitalCase(splitPath[splitPath.length - 1]),
        desc: item.description || item.ogDescription,
        link: item.path,
        category: toCapitalCase(firstTag)
      };
    });

    handlePageChange(1);
  });

  crossBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchInp.value = '';
    searchResultsContainer.innerHTML = '';
    currentFilteredData = [];
  });

  searchPageSection.appendChild(searchResultsContainer);

  const searchVal = getQuery('search');
  if (searchVal) {
    searchInp.value = searchVal;
    searchInp.dispatchEvent(new Event('input'));
  }
}());
