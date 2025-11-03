import Swiper from "../../libs/swiper/swiper-bundle.min.js";
import { a, img, li, span, ul } from "../../scripts/dom-helpers.js";

async function fetchFaqs(tagValue, limit = 5, offset = 0, fill = 0) {
  try {
    const apiRes = await fetch(`https://publish-p162853-e1744823.adobeaemcloud.com/graphql/execute.json/tmb/faqListByTags;tagValue=${tagValue};limit=${limit};offset=${offset}`);
    const faqsJson = await apiRes.json();
    let allFaqs = faqsJson?.data?.faqList?.items;

    if (fill) {
      allFaqs = Array(fill).fill(allFaqs?.[0]);
    }

    return allFaqs;
  } catch (error) {
    console.log('[FAQ_FETCH_ERROR]: ', error);
  }

  return null;
}

function createSwiper(block) {
  if (!block.classList.contains("swiper")) {
    block.classList.add("swiper");

    const rows = Array.from(block.children);
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");

    rows.forEach((row) => {
      row.classList.add("swiper-slide");
      swiperWrapper.append(row);
    });

    block.append(swiperWrapper);

    const swiperPaginationWrap = document.createElement("div");
    swiperPaginationWrap.classList.add("swiper-pagination-wrap");
    block.append(swiperPaginationWrap);

    const swiperPagination = document.createElement("div");
    swiperPagination.classList.add("swiper-pagination");

    const indicatorContainer = document.querySelector(".faq-question .default-content-wrapper");
    if (indicatorContainer && !indicatorContainer.querySelector(".slide-indicator")) {
      const slideIndicator = document.createElement("div");
      slideIndicator.classList.add("slide-indicator");

      //  Accessibility attributes for the indicator
      slideIndicator.setAttribute("role", "status");
      slideIndicator.setAttribute("aria-live", "polite");
      slideIndicator.setAttribute("aria-atomic", "true");

      indicatorContainer.append(slideIndicator);
    }

    const prevBtn = document.createElement("button");
    prevBtn.classList.add("faq-swiper-button-prev");
    prevBtn.setAttribute("aria-label", "Previous FAQ category");
    prevBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;

    const nextBtn = document.createElement("button");
    nextBtn.classList.add("faq-swiper-button-next");
    nextBtn.setAttribute("aria-label", "Next FAQ category");
    nextBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;

    swiperPaginationWrap.append(prevBtn, swiperPagination, nextBtn);
  }
}

function updateIndicator(swiperInstance, mainFaqContainer) {
  const allItems = Array.from(mainFaqContainer.querySelectorAll("li"));
  const totalLinks = allItems.length;
  const indicator = document.querySelector(".faq-question .slide-indicator");
  if (!indicator) return;

  let ariaMessage = "";
  const firstSlideItems = swiperInstance.slides[0].querySelectorAll("li").length || 0;
  const linksPerPage = firstSlideItems * swiperInstance.params.slidesPerGroup;
  const currentPage = swiperInstance.activeIndex / swiperInstance.params.slidesPerGroup + 1;
  const currentStart = (currentPage - 1) * linksPerPage + 1;
  const currentEnd = Math.min(currentPage * linksPerPage, totalLinks);

  indicator.innerHTML = `
    <span class="active-slide-indicator" aria-label="Items ${currentStart} to ${currentEnd} of ${totalLinks}">
      ${currentStart}-${currentEnd}
    </span>
    of
    <span class="total-slide-indicator">${totalLinks}</span>
    <span class="sr-only">Currently viewing items ${currentStart} to ${currentEnd} of ${totalLinks}</span>
  `;
  ariaMessage = `Currently viewing items ${currentStart} to ${currentEnd} of ${totalLinks}`;

  indicator.setAttribute("aria-label", ariaMessage);
}

const mainFaqContainer = document.querySelector(".faq-category-container:not(.faq-frequently-question,.faq-frequently-question-list)");
let swiper = null;

export default async function decorate(block) {
  const paramsBlock = block.querySelector("p");
  const params = paramsBlock?.textContent?.trim();

  if (!params) return;

  const [tag, fill] = params.split(";");
  const allFaqs = await fetchFaqs(tag, 5, 0, Number(fill));

  if (!allFaqs) return;

  const htmlElement = ul(
    { class: "faq-items-list" },
    ...allFaqs.map((item) =>
      li(
        { class: "faq-item" },
        a(
          { class: "faq-link", href: item?.faqPageUrl?._path },
          item.question,
          span(
            { class: "faq-link-icon" },
            img({ src: "/icons/flyout-menu-icon.svg", alt: "FAQ Link Icon" })
          )
        )
      )
    )
  );

  paramsBlock?.replaceWith(htmlElement);

  if (swiper) updateIndicator(swiper, mainFaqContainer);
}

createSwiper(mainFaqContainer);

swiper = new Swiper(mainFaqContainer, {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 2,
  a11y: {
    enabled: true,
    prevSlideMessage: "Previous FAQ items",
    nextSlideMessage: "Next FAQ items",
    paginationBulletMessage: "Go to FAQ slide {{index}}",
  },
  navigation: {
    nextEl: ".faq-swiper-button-next",
    prevEl: ".faq-swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: (index, className) =>
      `<span class="${className}" role="button" aria-label="Go to slide ${index + 1}">${index + 1}</span>`,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 16,
      slidesPerGroup: 1,
    },
    1366: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 32,
    },
  },
  on: {
    init() {
      updateIndicator(this, mainFaqContainer);
    },
    slideChange() {
      updateIndicator(this, mainFaqContainer);
    },
  },
});

window.addEventListener("resize", () => updateIndicator(swiper, mainFaqContainer));
