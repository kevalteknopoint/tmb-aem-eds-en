import Swiper from "../../libs/swiper/swiper-bundle.min.js";
import { injectIcon } from "../../scripts/aem.js";
import { button, div } from "../../scripts/dom-helpers.js";

function setMobileView(block) {
  const cards = block.querySelectorAll(".swiper-wrapper .swiper-slide");
  const navWrapper = block.querySelector(".nav-wrapper");

  const viewAllPara = document.createElement("p");
  viewAllPara.textContent = "View all articles";
  viewAllPara.classList.add("view-all");

  const viewAllDiv = div(
    { class: "view-all-wrapper" },
    viewAllPara
  );

  if (navWrapper) {
    navWrapper.appendChild(viewAllDiv);
  }

  cards.forEach((card, index) => {
    if (index < 3) {
      card.classList.add("show");
    }
  });

  viewAllPara.addEventListener("click", () => {
    cards.forEach((card) => card.classList.add("show"));
    viewAllDiv.remove();
  });
}

export default function cardCarouselHomepage(block) {
  if (window.location.origin.includes('author')) return;

  const slides = Array.from(block.children);

  slides.forEach((el) => {
    el.classList.add("swiper-slide");

    // --- RESTRUCTURING LOGIC START ---
    const children = Array.from(el.children);

    // Check if we have at least 3 children (Image, Content, and at least 1 Button div)
    if (children.length > 2) {
      const contentDiv = children[1]; // This is the div where we want the buttons to go
      const buttonDivs = children.slice(2); // Get all divs from the 3rd one onwards

      // Create the single <p class="button-container">
      const newButtonPara = document.createElement('p');
      newButtonPara.className = 'button-container';

      buttonDivs.forEach((btnDiv) => {
        const anchor = btnDiv.querySelector('a');
        if (anchor) {
          // Append only the anchor to the new paragraph (strips extra wrappers)
          newButtonPara.appendChild(anchor);
        }
        // Remove the original extra div wrapper
        btnDiv.remove();
      });

      // Move the consolidated paragraph into the content div
      contentDiv.appendChild(newButtonPara);
    }
    // --- RESTRUCTURING LOGIC END ---
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
