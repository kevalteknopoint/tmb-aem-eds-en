import { div, input, p } from "../../scripts/dom-helpers.js";
import './faq-banner-analytics.js';
import '../faq-category/faq-category-analytics.js';

function handleFaqSearch(searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const categoryWrappers = document.querySelectorAll('.faq-category-wrapper');

    categoryWrappers.forEach((wrapper) => {
      const items = wrapper.querySelectorAll('.faq-item');
      let visibleCount = 0;

      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (!query || text.includes(query)) {
          item.style.display = '';
          visibleCount += 1;
        } else {
          item.style.display = 'none';
        }
      });

      const faqList = wrapper.querySelector('.faq-items-list');
      let noResultsMsg = wrapper.querySelector('.faq-no-results');
      if (visibleCount === 0 && query) {
        if (!noResultsMsg) {
          noResultsMsg = p({ class: 'faq-no-results' }, 'No questions found');
          faqList.insertAdjacentElement('afterend', noResultsMsg);
        }
        noResultsMsg.style.display = '';
      } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
      }
    });
  });
}

export default function decorateFaqBanner(block) {
  // Get the inner wrapper (the first div inside .columns.block)
  const wrapper = block.querySelector('div');
  if (!wrapper) return;

  // Get its two inner columns (text + image)
  const [textCol, imgCol] = wrapper.children;
  if (!textCol || !imgCol) return;

  const searchInput = input({ type: 'text', class: 'faq-search-input', placeholder: 'Search', id: 'faq-search', name: 'faq-search' });

  // Rebuild the structure using your dom util helpers
  const faqBanner = div({ class: 'faq-banner-wrap' },
    div({ class: 'faq-banner-content' },
      ...textCol.children,
    ),
    div({ class: 'faq-banner-search' },
      ...imgCol.children,
      searchInput,
    ),
  );

  // Clear the original wrapper and append the decorated structure
  wrapper.replaceWith(faqBanner);

  // Initialize search functionality
  handleFaqSearch(searchInput);
}
