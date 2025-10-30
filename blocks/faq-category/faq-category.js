import Swiperblock from "../../libs/swiper/swiper-bundle.min.js";

const mainFaqContainer = document.querySelector(".faq-category-container");

function createSwiper(block) {
  if (!block.classList.contains("swiper")) {
    block.classList.add("swiper");

    // Wrap slides
    const rows = Array.from(block.children);
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");

    rows.forEach((row) => {
      row.classList.add("swiper-slide");
      swiperWrapper.append(row);
    });

    block.append(swiperWrapper);

    // Add pagination container
    const swiperPagination = document.createElement("div");
    swiperPagination.classList.add("swiper-pagination");
    block.append(swiperPagination);

    // Add indicator below "Questions"
    const indicatorContainer = document.querySelector(".faq-question .default-content-wrapper");
    if (indicatorContainer && !indicatorContainer.querySelector(".slide-indicator")) {
      const slideIndicator = document.createElement("div");
      slideIndicator.classList.add("slide-indicator");
      indicatorContainer.append(slideIndicator);
    }
  }
}

// Initialize Swiper creation
createSwiper(mainFaqContainer);

// ✅ Initialize Swiper instance
const swiper = new Swiperblock(mainFaqContainer, {
  slidesPerView: 2,
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

// ✅ Function to update “1–10 of 32” style indicator
function updateIndicator(swiperInstance) {
  const currentStart = swiperInstance.activeIndex * 5 + 1;
  const currentEnd = Math.min(currentStart + 4, swiperInstance.slides.length * 5);
  const total = swiperInstance.slides.length * 5;

  const indicator = document.querySelector(".faq-question .slide-indicator");
  if (indicator) {
    indicator.innerHTML = `
      <span class="active-slide-indicator">${currentStart}-${currentEnd}</span>
      of
      <span class="total-slide-indicator">${total}</span>
    `;
  }
}
