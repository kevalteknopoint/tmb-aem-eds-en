import Swiper from "../../libs/swiper/swiper-bundle.min.js";
import { div } from "../../scripts/dom-helpers.js";

export default function cardCarousel(block) {
  Array.from(block.children).forEach((el) => {
    el.classList.add("swiper-slide");
  });
  const innerWrap = div({ class: "cards block swiper" }, ...block.children);
  const swiperWrapper = div(
    { class: "news-help-wrapper swiper-wrapper" },
    innerWrap
  );
  block.replaceWith(swiperWrapper);
  new Swiper('.news-help-wrapper .swiper', {
    effect: "fade",
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 3000,
    },
    slidersPerView: 1,
    centeredSlides: true,
    spaceBetween: 24,
  });
}
