import { b, button, div, form, input, p, span } from "../../scripts/dom-helpers.js";

const dummyResults = [
  {
    title: 'Low rate visa card',
    desc: 'Flexible card with no bonus conditions.',
    category: 'Credit Card'
  },
  {
    title: 'Credit Cards',
    desc: 'Flexible card with no bonus conditions.',
    category: 'Everyday Direct'
  },
  {
    title: 'Activate a Credit Card',
    desc: 'Flexible card with no bonus conditions.',
    category: 'Credit Card'
  },
  {
    title: 'Low rate visa card',
    desc: 'Flexible card with no bonus conditions.',
    category: 'Everyday Direct'
  },
  {
    title: 'Credit Cards',
    desc: 'Flexible card with no bonus conditions.',
    category: 'Cash Card'
  },
  {
    title: 'Activate a Credit Card',
    desc: 'Flexible card with no bonus conditions.',
    category: 'Credit Card'
  },
  {
    title: 'Low rate visa card',
    desc: 'Flexible card with no bonus conditions.',
    category: 'Credit Card'
  },
  {
    title: 'Credit Cards',
    desc: 'Flexible card with no bonus conditions.',
    category: 'Everyday Direct'
  },
  {
    title: 'Low rate visa card',
    desc: 'Flexible card with no bonus conditions.',
    category: 'Credit Card'
  },
  {
    title: 'Credit Cards',
    desc: 'Flexible card with no bonus conditions.',
    category: 'Cash Card'
  }
];

function populateResults(searchVal, results) {
  const resultDetailsDiv = div({ class: 'search-result-details' },
    p({ class: 'search-results-num' }, `${results.length} results for `, b(`${searchVal}`)),
    p({ class: 'search-page-details' }, `Page 1 of 4`)
  );

  const resultsContainer = div({ class: 'search-results-list' });

  results.forEach((res) => {
    resultsContainer.appendChild(
      div({ class: 'search-result-item' },
        div(
          { class: 'item-detail-section' },
          span({ class: 'item-title' }, res.title),
          span({ class: 'item-desc' }, res.desc)
        ),
        div(
          { class: 'item-category-section' },
          span({ class: 'item-category' }, res.category)
        ),
      )
    );
  });

  return [resultDetailsDiv, resultsContainer];
}

(function decorateSearchPage() {
  if (window.location.origin.includes('author')) return;

  const searchPageSection = document.querySelector('.search-results-page');

  const crossIcon = searchPageSection.querySelector('p span:nth-child(1) svg');
  const crossBtn = button({ class: 'results-cross-btn' }, crossIcon);

  // Search button
  const searchInp = input({ class: 'results-search-inp', name: 'resultsSearch', id: 'resultsSearch', placeholder: 'Start typing...' });
  const searchIcon = searchPageSection.querySelector('p span:nth-child(2) svg');
  const searchBtn = button({ class: 'results-search-btn' }, searchIcon);
  const searchForm = form({ class: 'results-search-form' }, searchInp, crossBtn, searchBtn);

  const replaceP = searchPageSection.querySelector('p:has(.icon)');
  replaceP.replaceWith(searchForm);

  crossBtn.addEventListener('click', (e) => {
    e.preventDefault();

    searchInp.value = '';
  });

  const resultElements = populateResults('Card', dummyResults);
  const searchResultsContainer = div({ class: 'search-page-results-container', id: 'searchPageResults' }, ...resultElements);
  searchPageSection.appendChild(searchResultsContainer);
}());
