import { a, img, li, span, ul, div, button } from "../../scripts/dom-helpers.js";

// Fetch FAQs from GraphQL
async function fetchFaqs(tagValue, limit = 10, offset = 0) {
  try {
    const res = await fetch(
      `https://publish-p162853-e1744823.adobeaemcloud.com/graphql/execute.json/tmb/faqListByTags;tagValue=${tagValue};limit=${limit};offset=${offset}`
    );
    const json = await res.json();
    return json?.data?.faqList?.items || [];
  } catch (e) {
    console.error("FAQ fetch error:", e);
    return [];
  }
}

export default async function decorate(block) {
  const paramsWrap = block.querySelector("p");
  const params = paramsWrap?.textContent?.trim();

  if (!params) return;

  if (!block?.classList.contains('enable-pagination')) {
    const [tag, limit, offset] = params.split(";");
    const allFaqs = await fetchFaqs(tag, Number(limit), Number(offset));
    const faqList = ul({ class: "faq-items-list" });
    allFaqs.forEach((item) => {
      faqList.append(
        li(
          { class: "faq-item" },
          a(
            { class: "faq-link", href: item?.faqPageUrl?._path?.replace(/\/content\/[A-Za-z]+\//, '/') || "#" },
            item.question,
            span(
              { class: "faq-link-icon" },
              img({ src: "/icons/flyout-menu-icon.svg", alt: "FAQ Link Icon" })
            )
          )
        )
      );
    });

    paramsWrap?.replaceWith(faqList);

    return;
  }

  const [tag] = params.split(";");
  block.innerHTML = "";

  const faqList = ul({ class: "faq-items-list" });
  const paginationContainer = div({ class: "faq-pagination-container" });
  block.append(faqList, paginationContainer);

  let itemsPerPage = window.innerWidth <= 768 ? 5 : 10;
  let currentPage = 1;
  const totalItems = 32; // total FAQs known
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Mobile pagination sliding window
  let mobilePageWindowStart = 1; // first page shown in mobile pagination

  // Range indicator
  let rangeIndicator = document.querySelector(".faq-range-indicator");
  if (!rangeIndicator) {
    rangeIndicator = div({ class: "faq-range-indicator" });
    const wrapper = document.querySelector(".default-content-wrapper");
    if (wrapper) wrapper.appendChild(rangeIndicator);
  }

  function renderPagination() {
    paginationContainer.innerHTML = "";

    const isMobile = window.innerWidth <= 768;
    const maxMobileBtns = 4; // max pages shown in mobile at a time

    // Previous button
    const prevBtn = button({ class: "faq-page-btn prev" }, img({ src: "/icons/page-left.svg", alt: "Previous" }));
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage -= 1;
        if (isMobile && currentPage < mobilePageWindowStart) {
          mobilePageWindowStart = Math.max(1, mobilePageWindowStart - maxMobileBtns);
        }

        // eslint-disable-next-line
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

    for (let i = startPage; i <= endPage; i += 1) {
      const btn = button(
        { class: `faq-page-btn number ${i === currentPage ? "active" : ""}` },
        i
      );

      // eslint-disable-next-line
      btn.addEventListener("click", () => {
        if (currentPage !== i) {
          currentPage = i;

          // eslint-disable-next-line
          renderPage(currentPage);
        }
      });

      paginationContainer.append(btn);
    }

    // Next button
    const nextBtn = button({ class: "faq-page-btn next" }, img({ src: "/icons/page-right.svg", alt: "Previous" }));
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage += 1;
        if (isMobile && currentPage > endPage) {
          mobilePageWindowStart += maxMobileBtns;
        }

        // eslint-disable-next-line
        renderPage(currentPage);
      }
    });
    paginationContainer.append(nextBtn);
  }

  function renderRangeIndicator(start, end, total) {
    if (rangeIndicator) {
      if (window.innerWidth <= 768) {
        rangeIndicator.textContent = `${end} of ${total}`;
      } else {
        rangeIndicator.textContent = `${start} – ${end} of ${total}`;
      }
    }
  }

  async function renderPage(page) {
    currentPage = page;
    const offset = (page - 1) * itemsPerPage;
    let limit = itemsPerPage;

    // Adjust limit for last page
    if (offset + itemsPerPage > totalItems) {
      limit = totalItems - offset;
    }

    const faqs = await fetchFaqs(tag, limit, offset);

    faqList.innerHTML = "";
    if (!faqs.length) {
      faqList.append(li({}, "No FAQs found."));
      renderRangeIndicator(0, 0, totalItems);
      return;
    }

    faqs.forEach((item) => {
      faqList.append(
        li(
          { class: "faq-item" },
          a(
            { class: "faq-link", href: item?.faqPageUrl?._path?.replace(/\/content\/[A-Za-z]+\//, '/') || "#" },
            item.question,
            span(
              { class: "faq-link-icon" },
              img({ src: "/icons/flyout-menu-icon.svg", alt: "FAQ Link Icon" })
            )
          )
        )
      );
    });

    renderRangeIndicator(offset + 1, offset + faqs.length, totalItems);
    renderPagination();
  }

  window.addEventListener("resize", async () => {
    const newItemsPerPage = window.innerWidth <= 768 ? 5 : 10;
    if (newItemsPerPage !== itemsPerPage) {
      itemsPerPage = newItemsPerPage;
      currentPage = 1;
      mobilePageWindowStart = 1;
      renderPage(currentPage);
    }
  });

  // Initial render
  renderPage(currentPage);
}
