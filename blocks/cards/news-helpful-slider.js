import Swiper from "../../libs/swiper/swiper-bundle.min.js";
import { injectIcon } from "../../scripts/aem.js";
import { button, div } from "../../scripts/dom-helpers.js";

function setMobileView(block) {
  const cards = block.querySelectorAll(".swiper-wrapper .swiper-slide");
  const navWrapper = block.querySelector(".nav-wrapper");

  // Create <p> only for mobile
  const viewAllPara = document.createElement("p");
  viewAllPara.textContent = "View all articles";
  viewAllPara.classList.add("view-all");

  const viewAllDiv = div(
    { class: "view-all-wrapper" },
    viewAllPara
  );

  // Append the div inside navWrapper
  if (navWrapper) {
    navWrapper.appendChild(viewAllDiv);
  }

  // Show only first 3 slides initially
  cards.forEach((card, index) => {
    if (index < 3) {
      card.classList.add("show");
    }
  });

  viewAllPara.addEventListener("click", () => {
    cards.forEach((card) => card.classList.add("show")); // show all
    viewAllDiv.remove(); // hide the "View All" button
  });
}

export default function newsHomepageSlider(block) {
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
  new Swiper(container, {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    }
  });

  if (window.innerWidth < 767) {
    setMobileView(container);
  }
}
