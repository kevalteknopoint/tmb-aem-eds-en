import Swiperblock from "../../libs/swiper/swiper-bundle.min.js";
import { injectIcon } from "../../scripts/aem.js";
import appendclasses from "../../scripts/constatnt-classes.js";

function createSwiper(block) {
  if (!block.classList.contains("swiper")) {
    block.classList.add("swiper");
    const rows = Array.from(block.children);
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");
    rows.forEach((row) => {
      const towrapdeskandmob = document.createElement("div");
      towrapdeskandmob.classList.add("mob-desk-wrapper");
      row.lastElementChild?.setAttribute("data-aos", "fade-up");
      row.lastElementChild?.setAttribute("data-aos-duration", "2000");

      const desktopDiv = row.children[0];
      const mobDiv = row.children[1];
      const richtextdiv = row.children[2];
      row.classList.add("swiper-slide");
      row.classList.add(`swiperinnerdiv`); // ${i + 1}
      swiperWrapper.append(row);
      desktopDiv.classList.add("desktop-banner");
      mobDiv.classList.add("mob-pbanner");
      richtextdiv.classList.add("richtext-class");

      towrapdeskandmob.appendChild(desktopDiv);
      towrapdeskandmob.appendChild(mobDiv);
      row.append(towrapdeskandmob);
    });
    block.append(swiperWrapper);
    const swiperpagination = document.createElement("div");
    swiperpagination.classList.add("swiper-pagination");
    const swiperpaginationouter = document.createElement("div");
    swiperpaginationouter.classList.add("outer-pagination-div"); // for play btn
    const playbtn = document.createElement("button");
    playbtn.classList.add("play-btn");
    injectIcon('play', playbtn);
    swiperpaginationouter.append(swiperpagination);
    swiperpaginationouter.append(playbtn);
    block.append(swiperpaginationouter);
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
      Array.from(row.children).forEach((child) => {
        if (child.tagName === "DIV" && child.innerHTML.trim() === "") {
          child.remove();
        }
        // appendclasses.CLASS_PREFIXES = ["swiper-inner"]; /// classes add to section div
        //   appendclasses.addIndexed(child);
      });
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
function mobileviewswiper(block) {
  document
    .querySelectorAll(".secsecond.bannervideo-container")
    .forEach((e) => {
      const mobnoswiper = Array.from(e.children);
      mobnoswiper.forEach((child, i) => {
        child.classList.add(`mob-noswiper-child${i + 1}`);
      });
    });
  console.log(block);
  const rows = Array.from(block.children);
  rows.forEach((row) => {
    row.classList.add("mob-swiper");
    Array.from(row.children).forEach((child) => {
      if (child.tagName === "DIV" && child.innerHTML.trim() === "") {
        child.remove();
      }
    });
  });

  document.querySelectorAll(".mob-swiper").forEach((swipermob) => {
    const btn = swipermob.querySelector(".button-container a");
    const picture = swipermob.querySelector("picture");
    if (btn && picture) {
      const link = btn.getAttribute("href");
      // check if picture already wrapped
      if (!picture.parentElement.matches("a")) {
        const anchor = document.createElement("a");
        anchor.href = link;
        anchor.title = btn.title || "Discover more";
        picture.parentNode.insertBefore(anchor, picture);
        anchor.appendChild(picture);
      }
    }
  });
}
export default function decorate(block) {
  console.log(block);
  if (!block.closest(".secsecond")) {
    createSwiper(block);
    const swiper = new Swiperblock(block, {
      slidesPerView: 1,
      spaceBetween: 2,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
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
    // autoplay js //

    const playBtn = document.querySelector(".play-btn");
    let isPlaying = false;
    swiper.autoplay.stop();
    playBtn.addEventListener("click", () => {
      if (!isPlaying) {
        swiper.autoplay.start();
        isPlaying = true;
        playBtn?.lastElementChild?.remove();
        injectIcon('pause', playBtn);
      } else {
        swiper.autoplay.stop();
        isPlaying = false;
        playBtn?.lastElementChild?.remove();
        injectIcon('play', playBtn);
      }
    });
  }
  /// ///second block//////////////

  document
    .querySelectorAll(".secsecond.bannervideo-container .video-banner")
    .forEach((eachBlock) => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        createSwiper2(eachBlock);

        // eslint-disable-next-line no-new
        new Swiperblock(eachBlock, {
          slidesPerView: "auto",
          spaceBetween: 32,
          loop: false,
          // autoplay: {
          //   delay: 1000,
          //   disableOnInteraction: false,
          // },
          navigation: {
            nextEl: eachBlock.querySelector(".swiper-button-next"),
            prevEl: eachBlock.querySelector(".swiper-button-prev"),
          },
        });
        const navbtn = eachBlock.querySelector(".nav-buttons");
        const sec = eachBlock.closest(".section");
        appendclasses.CLASS_PREFIXES = ["inner-section"]; /// classes add to section div
        appendclasses.addIndexed(sec);
        if (navbtn !== null) {
          const def = sec.querySelector(".default-content-wrapper");
          def.append(navbtn);
        }
      } else {
        mobileviewswiper(eachBlock);
      }
    });
}
