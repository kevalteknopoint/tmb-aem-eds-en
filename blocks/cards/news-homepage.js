// import Swiper from "../../libs/swiper/swiper-bundle.min.js";
// import { injectIcon } from "../../scripts/aem.js";
// import { button, div } from "../../scripts/dom-helpers.js";

// export default function cardCarouselHomepage(block) {
//     console.log("-dkjak");

//   const slides = Array.from(block.children);
//   slides.forEach((el) => {
//     el.classList.add("swiper-slide");
//   });

//   const swiperWrapper = div(
//     { class: "swiper-wrapper" },
//     ...slides
//   );

//   const nextBtn  = button({ class: "swiper-button-next" });
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


// const swiper = new Swiper(container, {
//     slidesPerView: 1,
//     // spaceBetween: 16,
//     navigation: {
//       nextEl: nextBtn,
//       prevEl: prevBtn,
//     },
//     breakpoints: {
//       400: {  
//         slidesPerView: 1,
//         spaceBetween: 8
//       },
//       640: {    
//         slidesPerView: 2,
//         spaceBetween: 8
//       },
//       834: {
//         slidesPerView: 2.5,
//       },
//       1024: { 
//         slidesPerView: 3,
//       },
//       1400: {
//         slidesPerView: 3.5,
//       }
//     }
//   });
// };



import Swiper from "../../libs/swiper/swiper-bundle.min.js";
import { injectIcon } from "../../scripts/aem.js";
import { button, div } from "../../scripts/dom-helpers.js";

export default function cardCarouselHomepage(block) {
  const slides = Array.from(block.children);
  slides.forEach((el) => {
    el.classList.add("swiper-slide");
  });

  const swiperWrapper = div(
    { class: "swiper-wrapper" },
    ...slides
  );

  const nextBtn = button({ class: "swiper-button-next" });
  const prevBtn = button({ class: "swiper-button-prev" });

  injectIcon('chevron-right-circle-filled', nextBtn);
  injectIcon('chevron-right-circle-filled', prevBtn);

  const navWrapper = div(
    { class: "nav-wrapper" },
    prevBtn,
    nextBtn
  );

  const container = div(
    { class: "news-help-wrapper cards block swiper" },
    swiperWrapper,
    navWrapper
  );

  block.replaceWith(container);

  // eslint-disable-next-line
//   const swiper = new Swiper(container, {
//     slidesPerView: 1,
//     spaceBetween: 16,
//     navigation: {
//       nextEl: nextBtn,
//       prevEl: prevBtn,
//     },
//     breakpoints: {
//       400: {
//         slidesPerView: 1.5,
//       },
//       640: {
//         slidesPerView: 2,
//         spaceBetween: 24
//       },
//       834: {
//         slidesPerView: 3,
//       },
//       1024: {
//         slidesPerView: 3.5,
//         spaceBetween: 32
//       },
//       1400: {
//         slidesPerView: 4,
//         spaceBetween: 32
//       }
//     }
//   });

const swiper = new Swiper(container, {
    slidesPerView: 1,
    // spaceBetween: 16,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    breakpoints: {
      400: {  
        slidesPerView: 1,
        spaceBetween: 16
      },
      640: {    
        slidesPerView: 2,
        spaceBetween: 16
      },
      834: {
        slidesPerView: 2.5,
        spaceBetween: 24
      },
      1024: { 
        slidesPerView: 3,
        spaceBetween: 24
      },
      1400: {
        slidesPerView: 3.5,
        spaceBetween: 32
      }
    }
  });

}
