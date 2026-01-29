// import Swiper from "../../libs/swiper/swiper-bundle.min.js";
// import { injectIcon } from "../../scripts/aem.js";
// import { button, div } from "../../scripts/dom-helpers.js";

// export default function milestones(block) {
//   const slides = Array.from(block.children);
//   slides.forEach((el) => {
//     el.classList.add("swiper-slide");
//   });

//   const swiperWrapper = div(
//     { class: "swiper-wrapper" },
//     ...slides
//   );

//   const nextBtn = button({ class: "swiper-button-next" });
//   const prevBtn = button({ class: "swiper-button-prev" });

//   injectIcon('chevron-right-circle-filled', nextBtn);
//   injectIcon('chevron-right-circle-filled', prevBtn);

//   const navWrapper = div(
//     { class: "nav-wrapper" },
//     prevBtn,
//     nextBtn
//   );

//   const container = div(
//     { class: "news-help-wrapper cards block swiper" },
//     swiperWrapper,
//     navWrapper
//   );

//   block.replaceWith(container);

//   // eslint-disable-next-line
//   const swiper = new Swiper(container, {
//     slidesPerView: 'auto',
//     spaceBetween: 16,
//     navigation: {
//       nextEl: nextBtn,
//       prevEl: prevBtn,
//     },
//     breakpoints: {
//       640: {
//         spaceBetween: 24
//       },
//       1024: {
//         spaceBetween: 32
//       },
//       1400: {
//         spaceBetween: 32
//       }
//     }
//   });
// }

import Swiper from "../../libs/swiper/swiper-bundle.min.js";
import { injectIcon } from "../../scripts/aem.js";
import { button, div } from "../../scripts/dom-helpers.js";

export default function milestones(block) {
  if (window.location.origin.includes('author')) return;

  const slides = Array.from(block.children);
  slides.forEach((el) => el.classList.add("swiper-slide"));

  const swiperWrapper = div({ class: "swiper-wrapper" }, ...slides);

  const nextBtn = button({ class: "swiper-button-next" });
  const prevBtn = button({ class: "swiper-button-prev" });

  injectIcon("chevron-right-circle-filled", nextBtn);
  injectIcon("chevron-right-circle-filled", prevBtn);

  const navWrapper = div({ class: "nav-wrapper" }, prevBtn, nextBtn);

  const container = div(
    { class: "news-help-wrapper cards block swiper" },
    swiperWrapper,
    navWrapper
  );

  block.replaceWith(container);

  // Wait for next frame to ensure container has layout
  requestAnimationFrame(() => {
    // eslint-disable-next-line
    const swiper = new Swiper(container, {
      slidesPerView: "auto",
      // spaceBetween: 16,
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      observer: true,
      observeParents: true,
      resizeObserver: true,
      breakpoints: {
        0: { slidesPerView: "auto", spaceBetween: 16 },
        640: { slidesPerView: "2.5", spaceBetween: 24 },
        1024: { slidesPerView: "3.5", spaceBetween: 32 },
        1400: { slidesPerView: 4.5, spaceBetween: 32 },
      },
      on: {
        init() {
          this.update(); // Force update after init
        },
        resize() {
          this.update(); // Update on resize to fix mobile issues
        },
      },
    });
  });
}
