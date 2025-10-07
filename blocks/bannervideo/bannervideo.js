import Swiperblock from "./swiper-bundle.min.js";
import embedblock from "../embed/embed.js";
import appendclasses from "../../scripts/constatnt-classes.js";

function createSwiper(block) {
  if (!block.classList.contains("swiper")) {
    block.classList.add("swiper");
    const rows = Array.from(block.children);
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");
    rows.forEach((row, i) => {
      const towrapdeskandmob = document.createElement("div");
      towrapdeskandmob.classList.add("mob-desk-wrapper");
      const innercontainer = document.createElement("div");
      innercontainer.classList.add("inner-container");
      const desktopDiv = row.children[0];
      const mobDiv = row.children[1];
      const middelcontainer =row.children[2];
      row.classList.add("swiper-slide");
      row.classList.add(`swiperinnerdiv`); //${i + 1}
      swiperWrapper.append(row);
      desktopDiv.classList.add("desktop-banner");
      mobDiv.classList.add("mob-pbanner");
      innercontainer.appendChild(middelcontainer)   //////inner container h1 and button 
      towrapdeskandmob.appendChild(desktopDiv);
      towrapdeskandmob.appendChild(mobDiv);
      row.append(towrapdeskandmob);
      row.append(innercontainer)
      // appendclasses.CLASS_PREFIXES = ['mainswrapper'];
      // appendclasses.addIndexed(row)
      // Array.from(row.children).forEach((child, i) => {
      //   if (child.tagName === "DIV" && child.innerHTML.trim() === "") {
      //     child.remove();
      //   }
      // });
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
      Array.from(row.children).forEach((child, i) => {
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
   document.querySelectorAll(".secsecond.bannervideo-container").forEach(function (e) {
        const mobnoswiper=Array.from(e.children)
        mobnoswiper.forEach(function(child,i){
          child.classList.add("mob-noswiper-child"+(i+1));
        })
    })
  const rows = Array.from(block.children);
  rows.forEach((row) => {
    row.classList.add("mob-swiper");
    Array.from(row.children).forEach((child, i) => {
        if (child.tagName === "DIV" && child.innerHTML.trim() === "") {
          child.remove();
        }
      });
  });
}
export default function decorate(block) {
  if (!block.closest(".secsecond")) {
    createSwiper(block);
    const swiper = Swiperblock(block, {
      slidesPerView: 1,
      spaceBetween: 2,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      // autoplay: {
      //   delay: 40000000,
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
  }

  /// ///second block//////////////

  document
    .querySelectorAll(".secsecond.bannervideo-container .video-banner")
    .forEach((block) => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        createSwiper2(block);
        Swiperblock(block, {
          slidesPerView: "auto",
          spaceBetween: 32,
          loop: true,
          // autoplay: {
          //   delay: 1000,
          //   disableOnInteraction: false,
          // },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
        const navbtn = block.querySelector(".nav-buttons");
        const sec = block.closest(".section");
        appendclasses.CLASS_PREFIXES = ["inner-section"]; /// classes add to section div
        appendclasses.addIndexed(sec);
        if (navbtn !== null) {
          const def = sec.querySelector(".default-content-wrapper");
          def.append(navbtn);
        }
      } else {
        mobileviewswiper(block);
      }
    });

    /////////second block mobile ///////

  const link1 = block.querySelector(
    ".secfirst .swiperinnerdiv3 .button-container"
  );
  embedblock(link1);
}
