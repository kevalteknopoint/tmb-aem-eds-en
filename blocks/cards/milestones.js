import Swiper from "../../libs/swiper/swiper-bundle.min.js";
import { injectIcon } from "../../scripts/aem.js";
import { button, div } from "../../scripts/dom-helpers.js";

export default function cardCarousel(block) {
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
  const swiper = new Swiper(container, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    breakpoints: {
      640: {
        spaceBetween: 24
      },
      1024: {
        spaceBetween: 32
      },
      1400: {
        spaceBetween: 32
      }
    }
  });
}