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

      // ✅ Accessibility attributes for the indicator
      slideIndicator.setAttribute("role", "status");
      slideIndicator.setAttribute("aria-live", "polite");
      slideIndicator.setAttribute("aria-atomic", "true");

      indicatorContainer.append(slideIndicator);
    }
  }
}

createSwiper(mainFaqContainer);

const swiper = new Swiperblock(mainFaqContainer, {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 2,
  a11y: {
    enabled: true,
    prevSlideMessage: "Previous FAQ items",
    nextSlideMessage: "Next FAQ items",
    paginationBulletMessage: "Go to FAQ slide {{index}}",
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
  const allItems = Array.from(mainFaqContainer.querySelectorAll("li"));
  const totalLinks = allItems.length;
  const indicator = document.querySelector(".faq-question .slide-indicator");
  if (!indicator) return;

  const isMobile = window.innerWidth <= 768;
  let ariaMessage = "";

  if (isMobile) {
    //  Mobile: show "5 of 32"
    let currentIndex = 0;
    for (let i = 0; i < swiperInstance.activeIndex; i++) {
      currentIndex += swiperInstance.slides[i].querySelectorAll("li").length;
    }
    currentIndex += 1;

    indicator.innerHTML = `
      <span class="active-slide-indicator" aria-label="Item ${currentIndex} of ${totalLinks}">
        ${currentIndex}
      </span>
      of
      <span class="total-slide-indicator">${totalLinks}</span>
      <span class="sr-only">Currently viewing item ${currentIndex} of ${totalLinks}</span>
    `;
    ariaMessage = `Currently viewing item ${currentIndex} of ${totalLinks}`;
  } else {
    //  Desktop: show "1–4 of 32"
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
  }

 
  indicator.setAttribute("aria-label", ariaMessage);
}

window.addEventListener("resize", () => updateIndicator(swiper));
