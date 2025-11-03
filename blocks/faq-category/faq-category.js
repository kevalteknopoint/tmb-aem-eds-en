import { a, img, li, span, ul, div, button } from "../../scripts/dom-helpers.js";

async function fetchFaqs(tagValue, limit = 50, offset = 0) {
  try {
    const apiRes = await fetch(
      `https://publish-p162853-e1744823.adobeaemcloud.com/graphql/execute.json/tmb/faqListByTags;tagValue=${tagValue};limit=${limit};offset=${offset}`
    );
    const faqsJson = await apiRes.json();
    return faqsJson?.data?.faqList?.items || [];
  } catch (error) {
    console.error("[FAQ_FETCH_ERROR]: ", error);
    return [];
  }
}

export default async function decorate(block) {
  const params = block.querySelector("p")?.textContent?.trim();
  if (!params) return;

  const [tag] = params.split(";");
  const allFaqs = await fetchFaqs(tag, 100);
  if (!allFaqs.length) return;

  block.innerHTML = "";

  function getItemsPerPage() {
    return window.innerWidth <= 768 ? 5 : 10;
  }

  let itemsPerPage = getItemsPerPage();
  let currentPage = 1;
  let totalPages = Math.ceil(allFaqs.length / itemsPerPage);

  const faqList = ul({ class: "faq-items-list" });
  const paginationContainer = div({ class: "faq-pagination-container" });

  block.append(faqList, paginationContainer);

  // Append range indicator in default-content-wrapper
  let rangeIndicator = document.querySelector(".faq-range-indicator");
  if (!rangeIndicator) {
    rangeIndicator = div({ class: "faq-range-indicator" });
    const defaultContentWrapper = document.querySelector(".default-content-wrapper");
    if (defaultContentWrapper) {
      defaultContentWrapper.appendChild(rangeIndicator);
    }
  }

  function renderPage(page) {
    faqList.innerHTML = "";

    const start = (page - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, allFaqs.length);
    const pageFaqs = allFaqs.slice(start, end);

    pageFaqs.forEach((item) => {
      faqList.append(
        li(
          { class: "faq-item" },
          a(
            { class: "faq-link", href: item?.faqPageUrl?._path || "#" },
            item.question,
            span(
              { class: "faq-link-icon" },
              img({ src: "/icons/flyout-menu-icon.svg", alt: "FAQ Link Icon" })
            )
          )
        )
      );
    });

    renderPagination();
    renderRangeIndicator(start + 1, end, allFaqs.length);
  }

  function renderPagination() {
    paginationContainer.innerHTML = "";

    const prevBtn = button({ class: "faq-page-btn prev" }, "‹");
    prevBtn.disabled = currentPage === 1;

    const nextBtn = button({ class: "faq-page-btn next" }, "›");
    nextBtn.disabled = currentPage === totalPages;

    paginationContainer.append(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = button(
        { class: `faq-page-btn number ${i === currentPage ? "active" : ""}` },
        i.toString()
      );
      pageBtn.addEventListener("click", () => {
        currentPage = i;
        renderPage(currentPage);
      });
      paginationContainer.append(pageBtn);
    }

    paginationContainer.append(nextBtn);

    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
      }
    });
  }

  function renderRangeIndicator(start, end, total) {
    if (rangeIndicator) {
      rangeIndicator.textContent = `${start} – ${end} of ${total}`;
    }
  }

  window.addEventListener("resize", () => {
    const newItemsPerPage = getItemsPerPage();
    if (newItemsPerPage !== itemsPerPage) {
      itemsPerPage = newItemsPerPage;
      totalPages = Math.ceil(allFaqs.length / itemsPerPage);
      currentPage = 1;
      renderPage(currentPage);
    }
  });

  renderPage(currentPage);
}
