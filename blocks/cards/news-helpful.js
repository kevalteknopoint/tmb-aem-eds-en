import Swiper from "../../libs/swiper/swiper-bundle.min.js";
import { div } from "../../scripts/dom-helpers.js";

export default function cardCarousel(block) {
  const slides = Array.from(block.children);
  slides.forEach((el) => {
    el.classList.add("swiper-slide");
  });

  const swiperWrapper = div(
    { class: "swiper-wrapper" },
    ...slides
  );

  const container = div(
    { class: "news-help-wrapper cards block swiper" },
    swiperWrapper
  );

  block.replaceWith(container);

  // eslint-disable-next-line
  new Swiper(container);
}
