import { getMetadata, injectIcon } from "../../scripts/aem.js";
import { button, div, form, input, label, ul, li, span, a, h2 } from "../../scripts/dom-helpers.js";
import { fetchPlaceholders } from "../../scripts/placeholders.js";

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
  const filterPath = block.children[0]?.textContent?.trim() || '/content/tmb';

  if (!window.location.origin.includes('author')) return;

  (function loadStyles() {
    // Resolve values
    const theme = getMetadata("theme") || 'tmb';
    const stylesheet = `/styles/${theme}/styles.css`;

    // Inject tags directly into the document stream
    document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${stylesheet}">`);
  }());

  const placeholders = await fetchPlaceholders();
  const allPlaceholders = Object.keys(placeholders);

  const searchInput = input({
    id: 'querySearchInp',
    class: 'query-search-inp',
    name: 'querySearchInp',
    autocomplete: 'off',
    placeholder: 'Search placeholders...'
  });

  const suggestionsList = ul({ class: 'query-suggestions-list' });

  const searchInputWrap = form({ class: 'query-search-inp-wrap' },
    label({ for: "querySearchInp", class: 'd-none' }, 'Search Placeholders'),
    searchInput,
    button({ type: 'submit', class: 'query-search-btn' }, 'Search'),
    suggestionsList // Dropdown is now cleanly managed via CSS classes
  );

  const resultsWrapper = div({ class: 'query-results-wrapper' });

  // Helper function to populate the dropdown
  const renderSuggestions = (items) => {
    suggestionsList.innerHTML = '';

    // Handle "No results found" state
    if (items.length === 0) {
      const noResults = li({ class: 'query-suggestion-no-results' }, 'No results found');
      suggestionsList.append(noResults);
      return;
    }

    // Populate matches
    items.forEach((match) => {
      const suggestionItem = li({ class: 'query-suggestion-item' }, match);

      // Use 'mousedown' instead of 'click'.
      // If the input loses focus, a blur event might hide the dropdown before a 'click' registers.
      suggestionItem.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevents input from losing focus immediately
        searchInput.value = match;
        suggestionsList.classList.remove('show');
      });

      suggestionsList.append(suggestionItem);
    });
  };

  // 1. Show all results when the input gains focus
  searchInput.addEventListener('focus', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
      renderSuggestions(allPlaceholders);
    } else {
      const matches = allPlaceholders.filter((p) => p.toLowerCase().includes(query));
      renderSuggestions(matches);
    }
    suggestionsList.classList.add('show');
  });

  // 2. Filter results as the user types
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const matches = allPlaceholders.filter((placeholder) =>
      placeholder.toLowerCase().includes(query)
    );
    renderSuggestions(matches);
    suggestionsList.classList.add('show');
  });

  // 3. Hide the dropdown when clicking anywhere outside the wrapper
  document.addEventListener('mousedown', (e) => {
    if (!searchInputWrap.contains(e.target)) {
      suggestionsList.classList.remove('show');
    }
  });

  searchInputWrap.addEventListener('submit', async (e) => {
    e.preventDefault();

    const searchVal = searchInput.value?.trim();

    if (!searchVal) {
      showToast('Please enter a search term!');
      return;
    }

    const encodedFilterPath = encodeURIComponent(filterPath);
    const queryApiUrl = `/bin/querybuilder.json?fulltext=${searchVal}&p.limit=-1&path=${encodedFilterPath}&type=cq%3aPage`;
    const noResultsFound = h2({ class: 'no-data-text-query' }, 'No Results Found!');
    const errorFound = h2({ class: 'no-data-text-query' }, 'Something Went Wrong!');
    const loader = span({ class: 'loader' });

    resultsWrapper.innerHTML = '';
    resultsWrapper.appendChild(loader);

    try {
      const apiData = await fetch(queryApiUrl);
      const jsonData = await apiData.json();

      if (jsonData && jsonData.success && jsonData.results > 0) {
        resultsWrapper.innerHTML = '';
        jsonData.hits.forEach((item) => {
          if (item.path.includes('/placeholders')) return;

          const itemName = item.title;
          const itemPath = item.path;

          const titleButton = button({ class: 'result-action-button', value: itemName }, 'Copy Title');
          const pathButton = button({ class: 'result-action-button', value: itemPath }, 'Copy Path');
          const authorButton = a({ class: 'result-action-button', target: '_blank', href: `/ui#/@tmbank/aem/universal-editor/canvas/${window.location.origin?.replace('https://', '')}${itemPath}.html` }, 'Author Page');

          injectIcon('document-note-paper-multiple', titleButton, 'afterbegin');
          injectIcon('document-note-paper-multiple', pathButton, 'afterbegin');
          injectIcon('arrow-web-external-link', authorButton, 'afterbegin');

          const copyButtonValue = (clickEvent) => {
            clickEvent.preventDefault();
            navigator.clipboard.writeText(clickEvent.target.value);
            showToast('Copied to clipboard!');
          };

          titleButton.addEventListener('click', copyButtonValue);
          pathButton.addEventListener('click', copyButtonValue);

          const resultItem = div({ class: 'query-result-item' },
            div({ class: 'result-title-wrap' },
              span({ class: 'result-title' }, itemName),
              span({ class: 'result-path' }, itemPath),
            ),
            div({ class: 'result-actions-wrap' },
              titleButton,
              pathButton,
              authorButton
            )
          );

          resultsWrapper.appendChild(resultItem);
        });
      } else {
        resultsWrapper.appendChild(noResultsFound);
      }
    } catch (error) {
      resultsWrapper.innerHTML = '';
      resultsWrapper.appendChild(errorFound);
      console.log('Failed to fetch query builder data: ', error);
    }
  });

  block.innerHTML = '';
  block.append(searchInputWrap, resultsWrapper);
}
