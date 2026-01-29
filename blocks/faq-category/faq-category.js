import { getMetadata, injectIcon } from "../../scripts/aem.js";
import { a, li, span, ul, div, button } from "../../scripts/dom-helpers.js";
import { fetchPlaceholders } from "../../scripts/placeholders.js";
import './faq-category-analytics.js';

// Fetch Paginated FAQs from GraphQL
async function fetchFaqs(tagValue, limit = 10, offset = 0) {
  try {
    const placeholders = await fetchPlaceholders();
    const res = await fetch(
      `${placeholders.graphqlUrl}faqListByTags;tagValue=${tagValue};limit=${limit};offset=${offset}`
    );
    const json = await res.json();
    return json?.data?.faqList?.items || [];
  } catch (e) {
    console.error("FAQ fetch error:", e);
    return [];
  }
}

// Fetch ALL FAQs from GraphQL
async function fetchAllFaqsByTag(tagValue) {
  try {
    const placeholders = await fetchPlaceholders();
    const res = await fetch(
      `${placeholders.graphqlUrl}allFaqsByTag;tagValue=${tagValue}`
    );
    const json = await res.json();
    return json?.data?.faqList?.items || [];
  } catch (e) {
    console.error("All FAQ fetch error:", e);
    return [];
  }
}

export default async function decorate(block) {
  const basePath = getMetadata('base-path');

  const dynamicTextWrap = block.querySelector("pre");

  const tagWrap = block.querySelector("div:nth-child(2)")?.querySelector('p');
  const tagValue = tagWrap?.textContent?.trim();

  const limitWrap = block.querySelector("div:nth-child(3)")?.querySelector('p');
  const limitValue = limitWrap?.textContent?.trim();

  if (!tagValue) return;

  // NON-PAGINATION MODE — USE original API call
  if (!block?.classList.contains('enable-pagination')) {
    const faqs = await fetchFaqs(tagValue, limitValue ? parseInt(limitValue, 10) : 10, 0);

    const faqList = ul({ class: "faq-items-list" });
    faqs.forEach((item) => {
      const icon = span({ class: "faq-link-icon" });
      injectIcon('chevron-right-links-default', icon);
      let faqUrl = item?.faqPageUrl?._path?.replace(/\/content\/[A-Za-z]+\//, '/');
      if (faqUrl?.split('/')?.[1] !== basePath?.split('/')?.[1]) {
        const splitUrl = faqUrl?.split('/');
        if (splitUrl && splitUrl[1]) splitUrl[1] = basePath?.split('/')?.[1];
        faqUrl = splitUrl?.join('/') || '#';
      }

      faqList.append(
        li(
          { class: "faq-item" },
          a(
            { class: "faq-link", href: faqUrl },
            item.question,
            icon
          )
        )
      );
    });

    if (dynamicTextWrap) dynamicTextWrap.replaceWith(faqList);
    else {
      block.innerHTML = '';
      block.appendChild(faqList);
    }

    tagWrap?.parentElement?.parentElement?.remove();
    limitWrap?.parentElement?.parentElement?.remove();

    return;
  }

  // PAGINATION MODE — FETCH ALL ONCE
  block.innerHTML = "";

  const faqList = ul({ class: "faq-items-list" });
  const paginationContainer = div({ class: "faq-pagination-container" });
  block.append(faqList, paginationContainer);

  let itemsPerPage = window.innerWidth <= 768 ? 5 : 10; // Mobile 5, Desktop 10
  let currentPage = 1;
  let mobilePageWindowStart = 1;

  const rangeIndicator = (() => {
    let ri = document.querySelector(".faq-range-indicator");
    if (!ri) {
      ri = div({ class: "faq-range-indicator" });
      const wrapper = document.querySelector(".default-content-wrapper");
      if (wrapper) wrapper.appendChild(ri);
    }
    return ri;
  })();

  // Fetch all FAQs once for pagination
  const allFaqs = await fetchAllFaqsByTag(tagValue);
  const totalItems = allFaqs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Updated: Always show start - end of total
  function renderRangeIndicator(start, end, total) {
    if (!rangeIndicator) return;
    rangeIndicator.textContent = `${start} - ${end} of ${total}`;
  }

  function renderPage(page) {
    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, totalItems);
    const faqs = allFaqs.slice(start, end);

    faqList.innerHTML = "";
    if (!faqs.length) {
      faqList.append(li({}, "No FAQs found."));
      renderRangeIndicator(0, 0, totalItems);
      return;
    }

    faqs.forEach((item) => {
      const icon = span({ class: "faq-link-icon" });
      injectIcon('chevron-right-links-default', icon);
      let faqUrl = item?.faqPageUrl?._path?.replace(/\/content\/[A-Za-z]+\//, '/');
      if (faqUrl?.split('/')?.[1] !== basePath?.split('/')?.[1]) {
        const splitUrl = faqUrl?.split('/');
        if (splitUrl && splitUrl[1]) splitUrl[1] = basePath?.split('/')?.[1];
        faqUrl = splitUrl?.join('/') || '#';
      }

      faqList.append(
        li(
          { class: "faq-item" },
          a(
            { class: "faq-link", href: faqUrl },
            item.question,
            icon
          )
        )
      );
    });

    renderRangeIndicator(start + 1, end, totalItems); // Always show start-end

    // eslint-disable-next-line
    renderPagination();
  }

  function renderPagination() {
    paginationContainer.innerHTML = "";

    const isMobile = window.innerWidth <= 768;
    const maxMobileBtns = 5; // Show 5 page numbers for mobile

    // Previous button
    const prevBtn = button({ class: "faq-page-btn prev" });
    injectIcon('chevron-left-default', prevBtn);
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage -= 1;
        if (isMobile && currentPage < mobilePageWindowStart) {
          mobilePageWindowStart = Math.max(1, mobilePageWindowStart - maxMobileBtns);
        }

        renderPage(currentPage);
      }
    });
    paginationContainer.append(prevBtn);

    // Page numbers
    let startPage = 1;
    let endPage = totalPages;
    if (isMobile) {
      startPage = mobilePageWindowStart;
      endPage = Math.min(totalPages, mobilePageWindowStart + maxMobileBtns - 1);
    }

    function paginationBtnListener(index) {
      return () => {
        if (currentPage !== index) {
          currentPage = index;
          renderPage(currentPage);
        }
      };
    }

    for (let i = startPage; i <= endPage; i += 1) {
      const btn = button({ class: `faq-page-btn number ${i === currentPage ? "active" : ""}` }, i);
      btn.addEventListener("click", paginationBtnListener(i));
      paginationContainer.append(btn);
    }

    // Next button
    const nextBtn = button({ class: "faq-page-btn next" });
    injectIcon('chevron-right-links-default', nextBtn);
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage += 1;
        if (isMobile && currentPage > endPage) {
          mobilePageWindowStart += maxMobileBtns;
        }

        renderPage(currentPage);
      }
    });
    paginationContainer.append(nextBtn);
  }

  window.addEventListener("resize", () => {
    const newItemsPerPage = window.innerWidth <= 768 ? 5 : 10;
    if (newItemsPerPage !== itemsPerPage) {
      itemsPerPage = newItemsPerPage;
      currentPage = 1;
      mobilePageWindowStart = 1;
      renderPage(currentPage);
    }
  });

  renderPage(currentPage);
}
