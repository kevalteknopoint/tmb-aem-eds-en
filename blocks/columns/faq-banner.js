import { div, input } from "../../scripts/dom-helpers.js";

export default function decorateFaqBanner(block) {
  // Get the inner wrapper (the first div inside .columns.block)
  const wrapper = block.querySelector('div');
  if (!wrapper) return;

  // Get its two inner columns (text + image)
  const [textCol, imgCol] = wrapper.children;
  if (!textCol || !imgCol) return;

  // Rebuild the structure using your dom util helpers
  const faqBanner = div({ class: 'faq-banner-wrap' },
    div({ class: 'faq-banner-content' },
      ...textCol.children,
    ),
    div({ class: 'faq-banner-search' },
      ...imgCol.children,
      input({ type: 'text', class: 'faq-search-input', placeholder: 'Search', id: 'faq-search', name: 'faq-search' }),
    ),
  );

  // Clear the original wrapper and append the decorated structure
  wrapper.replaceWith(faqBanner);
}
