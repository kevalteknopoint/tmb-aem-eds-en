import Swiperblock from "./swiper-bundle.min.js";
import embedblock from "../embed/embed.js";

function createSwiper(block) {
  if (!block.classList.contains("swiper")) {
    block.classList.add("swiper");
    const rows = Array.from(block.children);
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");
    console.log(block);

    rows.forEach((row) => {
      row.classList.add("swiper-slide");
      swiperWrapper.append(row);
    });
    block.append(swiperWrapper);
    const swiperpagination = document.createElement("div");
    swiperpagination.classList.add("swiper-pagination");
    block.append(swiperpagination);
  }
}
function createSwiper2(block) {
  if (!block.classList.contains("swiper")) {
    block.classList.add("swiper");
    const rows = Array.from(block.children);
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");

    rows.forEach((row) => {
      row.classList.add("swiper-slide");
      swiperWrapper.append(row);
    });
    const navWrapper = document.createElement("div");
    navWrapper.classList.add("nav-buttons");
    block.append(navWrapper);

    const prevBtn = document.createElement("button");
    prevBtn.classList.add("swiper-button-prev");
    navWrapper.append(prevBtn);
    const nextBtn = document.createElement("button");
    nextBtn.classList.add("swiper-button-next");
    navWrapper.append(nextBtn);
    block.append(swiperWrapper);
  }
}
function mobileviewswiper(block){
  console.log(block)
  const rows = Array.from(block.children);
  rows.forEach((row) => {
      row.classList.add('mob-swiper')
    });
}
export default function decorate(block) {
  const link1 = block.querySelector(".button-container");
  embedblock(link1);
  createSwiper(block);
  const swiper = Swiperblock(block, {
    slidesPerView: 1,
    spaceBetween: 2,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // autoplay: {
    //   delay: 4000,
    //   disableOnInteraction: false,
    // },
  });

  swiper.on("slideChange", () => {
    const prevIndex = swiper.previousIndex;
    const currentIndex = swiper.activeIndex;
    const prevSlide = swiper.slides[prevIndex];
    const currentSlide = swiper.slides[currentIndex];

    // Example: mute last active video
    const prevIframe = prevSlide?.querySelector("iframe");
    // debugger
    if (prevIframe && prevIframe.src.includes("youtube")) {
      prevIframe.contentWindow.postMessage(
        '{"event":"command","func":"mute","args":""}',
        "*"
      );
    }

    // Example: unmute current video
    const currentIframe = currentSlide?.querySelector("iframe");
    if (currentIframe && currentIframe.src.includes("youtube")) {
      currentIframe.contentWindow.postMessage(
        '{"event":"command","func":"unMute","args":""}',
        "*"
      );
      currentIframe.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );
    }
  });

  document.querySelectorAll(".secsecond.bannervideo-container .video-banner").forEach((block, index) => {
    console.log(block)
    if (window.matchMedia("(min-width: 1024px)").matches) {
      createSwiper2(block);
    }else{
      mobileviewswiper(block)
    }
      Swiperblock(block, {
        slidesPerView: 3,
        spaceBetween: 2,
        loop: true,
        // autoplay: {
        //   delay: 1000,
        //   disableOnInteraction: false,
        // },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      });
      const navbtn = block.querySelector(".nav-buttons");
      const sec = block.closest(".section");
      const def = sec.querySelector(".default-content-wrapper");
      def.append(navbtn);
    });
}
