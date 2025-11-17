// import { a, img, li, span, ul, div, button } from "../../scripts/dom-helpers.js";
// import { fetchPlaceholders } from "../../scripts/placeholders.js";

// // Fetch FAQs from GraphQL
// async function fetchFaqs(tagValue, limit = 10, offset = 0) {
//   try {
//     const placeholders = await fetchPlaceholders();
//     const res = await fetch(
//       `${placeholders.graphqlurl}faqListByTags;tagValue=${tagValue};limit=${limit};offset=${offset}`
//     );
//     const json = await res.json();
//     return json?.data?.faqList?.items || [];
//   } catch (e) {
//     console.error("FAQ fetch error:", e);
//     return [];
//   }
// }

// export default async function decorate(block) {
//   const dynamicTextWrap = block.querySelector("pre");

//   const tagWrap = block.querySelector("div:nth-child(2)")?.querySelector('p');
//   const tagValue = tagWrap?.textContent?.trim();

//   const limitWrap = block.querySelector("div:nth-child(3)")?.querySelector('p');
//   const limitValue = limitWrap?.textContent?.trim();

//   if (!tagValue) return;

//   if (!block?.classList.contains('enable-pagination')) {
//     const allFaqs = await fetchFaqs(tagValue, Number(limitValue));
//     const faqList = ul({ class: "faq-items-list" });
//     allFaqs.forEach((item) => {
//       faqList.append(
//         li(
//           { class: "faq-item" },
//           a(
//             { class: "faq-link", href: item?.faqPageUrl?._path?.replace(/\/content\/[A-Za-z]+\//, '/') || "#" },
//             item.question,
//             span(
//               { class: "faq-link-icon" },
//               img({ src: "/icons/faq-link-icon.svg", alt: "FAQ Link Icon" })
//             )
//           )
//         )
//       );
//     });

//     if (dynamicTextWrap) dynamicTextWrap?.replaceWith(faqList);
//     else {
//       block.innerHTML = '';
//       block.appendChild(faqList);
//     }

//     tagWrap?.parentElement?.parentElement?.remove();
//     limitWrap?.parentElement?.parentElement?.remove();

//     return;
//   }

//   block.innerHTML = "";

//   const faqList = ul({ class: "faq-items-list" });
//   const paginationContainer = div({ class: "faq-pagination-container" });
//   block.append(faqList, paginationContainer);

//   let itemsPerPage = window.innerWidth <= 768 ? 5 : 10;
//   let currentPage = 1;
//   const totalItems = 32; // total FAQs known
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Mobile pagination sliding window
//   let mobilePageWindowStart = 1; // first page shown in mobile pagination

//   // Range indicator
//   let rangeIndicator = document.querySelector(".faq-range-indicator");
//   if (!rangeIndicator) {
//     rangeIndicator = div({ class: "faq-range-indicator" });
//     const wrapper = document.querySelector(".default-content-wrapper");
//     if (wrapper) wrapper.appendChild(rangeIndicator);
//   }

//   function renderPagination() {
//     paginationContainer.innerHTML = "";

//     const isMobile = window.innerWidth <= 768;
//     const maxMobileBtns = 4; // max pages shown in mobile at a time

//     // Previous button
//     const prevBtn = button({ class: "faq-page-btn prev" }, img({ src: "/icons/page-left.svg", alt: "Previous" }));
//     prevBtn.disabled = currentPage === 1;
//     prevBtn.addEventListener("click", () => {
//       if (currentPage > 1) {
//         currentPage -= 1;
//         if (isMobile && currentPage < mobilePageWindowStart) {
//           mobilePageWindowStart = Math.max(1, mobilePageWindowStart - maxMobileBtns);
//         }

//         // eslint-disable-next-line
//         renderPage(currentPage);
//       }
//     });
//     paginationContainer.append(prevBtn);

//     // Page numbers
//     let startPage = 1;
//     let endPage = totalPages;

//     if (isMobile) {
//       startPage = mobilePageWindowStart;
//       endPage = Math.min(totalPages, mobilePageWindowStart + maxMobileBtns - 1);
//     }

//     for (let i = startPage; i <= endPage; i += 1) {
//       const btn = button(
//         { class: `faq-page-btn number ${i === currentPage ? "active" : ""}` },
//         i
//       );

//       // eslint-disable-next-line
//       btn.addEventListener("click", () => {
//         if (currentPage !== i) {
//           currentPage = i;

//           // eslint-disable-next-line
//           renderPage(currentPage);
//         }
//       });

//       paginationContainer.append(btn);
//     }

//     // Next button
//     const nextBtn = button({ class: "faq-page-btn next" }, img({ src: "/icons/page-right.svg", alt: "Previous" }));
//     nextBtn.disabled = currentPage === totalPages;
//     nextBtn.addEventListener("click", () => {
//       if (currentPage < totalPages) {
//         currentPage += 1;
//         if (isMobile && currentPage > endPage) {
//           mobilePageWindowStart += maxMobileBtns;
//         }

//         // eslint-disable-next-line
//         renderPage(currentPage);
//       }
//     });
//     paginationContainer.append(nextBtn);
//   }

//   function renderRangeIndicator(start, end, total) {
//     if (rangeIndicator) {
//       if (window.innerWidth <= 768) {
//         rangeIndicator.textContent = `${end} of ${total}`;
//       } else {
//         rangeIndicator.textContent = `${start} – ${end} of ${total}`;
//       }
//     }
//   }

//   async function renderPage(page) {
//     currentPage = page;
//     const offset = (page - 1) * itemsPerPage;
//     let limit = itemsPerPage;

//     // Adjust limit for last page
//     if (offset + itemsPerPage > totalItems) {
//       limit = totalItems - offset;
//     }

//     const faqs = await fetchFaqs(tagValue, limit, offset);

//     faqList.innerHTML = "";
//     if (!faqs.length) {
//       faqList.append(li({}, "No FAQs found."));
//       renderRangeIndicator(0, 0, totalItems);
//       return;
//     }

//     faqs.forEach((item) => {
//       faqList.append(
//         li(
//           { class: "faq-item" },
//           a(
//             { class: "faq-link", href: item?.faqPageUrl?._path?.replace(/\/content\/[A-Za-z]+\//, '/') || "#" },
//             item.question,
//             span(
//               { class: "faq-link-icon" },
//               img({ src: "/icons/faq-link-icon.svg", alt: "FAQ Link Icon" })
//             )
//           )
//         )
//       );
//     });

//     renderRangeIndicator(offset + 1, offset + faqs.length, totalItems);
//     renderPagination();
//   }

//   window.addEventListener("resize", async () => {
//     const newItemsPerPage = window.innerWidth <= 768 ? 5 : 10;
//     if (newItemsPerPage !== itemsPerPage) {
//       itemsPerPage = newItemsPerPage;
//       currentPage = 1;
//       mobilePageWindowStart = 1;
//       renderPage(currentPage);
//     }
//   });

//   // Initial render
//   renderPage(currentPage);
// }




import { a, img, li, span, ul, div, button } from "../../scripts/dom-helpers.js";
import { fetchPlaceholders } from "../../scripts/placeholders.js";

// Fetch Paginated FAQs from GraphQL
async function fetchFaqs(tagValue, limit = 10, offset = 0) {
  try {
    const placeholders = await fetchPlaceholders();
    const res = await fetch(
      `${placeholders.graphqlurl}faqListByTags;tagValue=${tagValue};limit=${limit};offset=${offset}`
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
      `${placeholders.graphqlurl}allFaqsByTag;tagValue=${tagValue}`
    );
    const json = await res.json();
    return json?.data?.faqList?.items || [];
  } catch (e) {
    console.error("All FAQ fetch error:", e);
    return [];
  }
}

export default async function decorate(block) {
  const dynamicTextWrap = block.querySelector("pre");

  const tagWrap = block.querySelector("div:nth-child(2)")?.querySelector('p');
  const tagValue = tagWrap?.textContent?.trim();

  const limitWrap = block.querySelector("div:nth-child(3)")?.querySelector('p');
  const limitValue = limitWrap?.textContent?.trim();

  if (!tagValue) return;


  // NON-PAGINATION MODE — USE original API call

  if (!block?.classList.contains('enable-pagination')) {
    const faqs = await fetchFaqs(tagValue, limitValue ? parseInt(limitValue) : 10, 0);

    const faqList = ul({ class: "faq-items-list" });
    faqs.forEach((item) => {
      faqList.append(
        li(
          { class: "faq-item" },
          a(
            { class: "faq-link", href: item?.faqPageUrl?._path?.replace(/\/content\/[A-Za-z]+\//, '/') || "#" },
            item.question,
            span(
              { class: "faq-link-icon" },
              img({ src: "/icons/faq-link-icon.svg", alt: "FAQ Link Icon" })
            )
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

  let itemsPerPage = window.innerWidth <= 768 ? 5 : 10;
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

  function renderRangeIndicator(start, end, total) {
    if (!rangeIndicator) return;
    rangeIndicator.textContent = window.innerWidth <= 768 ? `${end} of ${total}` : `${start} - ${end} of ${total}`;
  }

  function renderPagination() {
    paginationContainer.innerHTML = "";

    const isMobile = window.innerWidth <= 768;
    const maxMobileBtns = 4;

    // Previous button
    const prevBtn = button({ class: "faq-page-btn prev" }, img({ src: "/icons/page-left.svg", alt: "Previous" }));
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

    for (let i = startPage; i <= endPage; i++) {
      const btn = button({ class: `faq-page-btn number ${i === currentPage ? "active" : ""}` }, i);
      btn.addEventListener("click", () => {
        if (currentPage !== i) {
          currentPage = i;
          renderPage(currentPage);
        }
      });
      paginationContainer.append(btn);
    }

    // Next button
    const nextBtn = button({ class: "faq-page-btn next" }, img({ src: "/icons/page-right.svg", alt: "Next" }));
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
      faqList.append(
        li(
          { class: "faq-item" },
          a(
            { class: "faq-link", href: item?.faqPageUrl?._path?.replace(/\/content\/[A-Za-z]+\//, '/') || "#" },
            item.question,
            span(
              { class: "faq-link-icon" },
              img({ src: "/icons/faq-link-icon.svg", alt: "FAQ Link Icon" })
            )
          )
        )
      );
    });

    renderRangeIndicator(start + 1, end, totalItems);
    renderPagination();
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

