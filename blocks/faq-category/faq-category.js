import Swiperblock from "../../libs/swiper/swiper-bundle.min.js";

const mainFaqContainer = document.querySelector(".faq-category-container");

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

    const swiperPagination = document.createElement("div");
    swiperPagination.classList.add("swiper-pagination");
    block.append(swiperPagination);

    const indicatorContainer = document.querySelector(".faq-question .default-content-wrapper");
    if (indicatorContainer && !indicatorContainer.querySelector(".slide-indicator")) {
      const slideIndicator = document.createElement("div");
      slideIndicator.classList.add("slide-indicator");
      indicatorContainer.append(slideIndicator);
    }
  }
}

createSwiper(mainFaqContainer);

const swiper = new Swiperblock(mainFaqContainer, {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 2,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>`,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1366: {
      slidesPerView: 2,
      spaceBetween: 2,
    },
  },
  on: {
    init() {
      updateIndicator(this);
    },
    slideChange() {
      updateIndicator(this);
    },
  },
});

function updateIndicator(swiperInstance) {
  // ✅ Count total FAQ items across all slides
  const allItems = Array.from(mainFaqContainer.querySelectorAll("li"));
  const totalLinks = allItems.length;

  // ✅ Determine how many links per slide (from first slide)
  const firstSlideItems = swiperInstance.slides[0].querySelectorAll("li").length || 0;
  const linksPerPage = firstSlideItems * swiperInstance.params.slidesPerGroup;

  // ✅ Calculate current range
  const currentPage = swiperInstance.activeIndex / swiperInstance.params.slidesPerGroup + 1;
  const currentStart = (currentPage - 1) * linksPerPage + 1;
  const currentEnd = Math.min(currentPage * linksPerPage, totalLinks);

  // ✅ Update indicator
  const indicator = document.querySelector(".faq-question .slide-indicator");
  if (indicator) {
    indicator.innerHTML = `
      <span class="active-slide-indicator">${currentStart}-${currentEnd}</span>
      of
      <span class="total-slide-indicator">${totalLinks}</span>
    `;
  }
}
