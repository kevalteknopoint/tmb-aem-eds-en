// import Swiperblock from "../../libs/swiper/swiper-bundle.min.js";
// import { injectIcon } from "../../scripts/aem.js";
// import appendclasses from "../../scripts/constatnt-classes.js";

// function createSwiper(block) {
//   if (!block.classList.contains("swiper")) {
//     block.classList.add("swiper");
//     const rows = Array.from(block.children);
//     const swiperWrapper = document.createElement("div");
//     swiperWrapper.classList.add("swiper-wrapper");
//     rows.forEach((row) => {
//       const towrapdeskandmob = document.createElement("div");
//       towrapdeskandmob.classList.add("mob-desk-wrapper");
//       // debugger;

//       const desktopDiv = row.children[0];
//       const mobDiv = row.children[1];
//       const richtextdiv = row.children[2];
//       const buttonDiv = row.children[3];

//       row.classList.add("swiper-slide");
//       row.classList.add(`swiperinnerdiv`); // ${i + 1}
//       swiperWrapper.append(row);
//       desktopDiv.classList.add("desktop-banner");
//       mobDiv.classList.add("mob-pbanner");
//       richtextdiv.classList.add("richtext-class");
//       if (buttonDiv && buttonDiv.firstElementChild) {
//         richtextdiv.appendChild(buttonDiv.firstElementChild);
//       }

//       row.lastElementChild?.setAttribute("data-aos", "fade-up");
//       row.lastElementChild?.setAttribute("data-aos-duration", "2000");

//       towrapdeskandmob.appendChild(desktopDiv);
//       towrapdeskandmob.appendChild(mobDiv);
//       row.append(towrapdeskandmob);
//     });
//     block.append(swiperWrapper);
//     const swiperpagination = document.createElement("div");
//     swiperpagination.classList.add("swiper-pagination");
//     const swiperpaginationouter = document.createElement("div");
//     swiperpaginationouter.classList.add("outer-pagination-div"); // for play btn
//     const playbtn = document.createElement("button");
//     playbtn.classList.add("play-btn");
//     injectIcon('play', playbtn);
//     swiperpaginationouter.append(swiperpagination);
//     swiperpaginationouter.append(playbtn);
//     block.append(swiperpaginationouter);
//   }
// }
// function createSwiper2(block) {
//   if (!block.classList.contains("swiper")) {
//     block.classList.add("swiper");
//     const rows = Array.from(block.children);
//     const swiperWrapper = document.createElement("div");
//     swiperWrapper.classList.add("swiper-wrapper");

//     rows.forEach((row) => {
//       row.classList.add("swiper-slide");
//       swiperWrapper.append(row);
//       Array.from(row.children).forEach((child) => {
//         if (child.tagName === "DIV" && child.innerHTML.trim() === "") {
//           child.remove();
//         }
//         // appendclasses.CLASS_PREFIXES = ["swiper-inner"]; /// classes add to section div
//         //   appendclasses.addIndexed(child);
//       });
//     });

//     const navWrapper = document.createElement("div");
//     navWrapper.classList.add("nav-buttons");
//     block.append(navWrapper);

//     const prevBtn = document.createElement("button");
//     prevBtn.classList.add("swiper-button-prev");
//     navWrapper.append(prevBtn);
//     const nextBtn = document.createElement("button");
//     nextBtn.classList.add("swiper-button-next");
//     navWrapper.append(nextBtn);
//     block.append(swiperWrapper);
//   }
// }
// function mobileviewswiper(block) {
//   document
//     .querySelectorAll(".secsecond.bannervideo-container")
//     .forEach((e) => {
//       const mobnoswiper = Array.from(e.children);
//       mobnoswiper.forEach((child, i) => {
//         child.classList.add(`mob-noswiper-child${i + 1}`);
//       });
//     });
//   console.log(block);
//   const rows = Array.from(block.children);
//   rows.forEach((row) => {
//     row.classList.add("mob-swiper");
//     Array.from(row.children).forEach((child) => {
//       if (child.tagName === "DIV" && child.innerHTML.trim() === "") {
//         child.remove();
//       }
//     });
//   });

//   document.querySelectorAll(".mob-swiper").forEach((swipermob) => {
//     const btn = swipermob.querySelector(".button-container a");
//     const picture = swipermob.querySelector("picture");
//     if (btn && picture) {
//       const link = btn.getAttribute("href");
//       // check if picture already wrapped
//       if (!picture.parentElement.matches("a")) {
//         const anchor = document.createElement("a");
//         anchor.href = link;
//         anchor.title = btn.title || "Discover more";
//         picture.parentNode.insertBefore(anchor, picture);
//         anchor.appendChild(picture);
//       }
//     }
//   });
// }
// export default function decorate(block) {
//   console.log(block);
//   if (!block.closest(".secsecond")) {
//     createSwiper(block);
//     const swiper = new Swiperblock(block, {
//       slidesPerView: 1,
//       spaceBetween: 2,
//       loop: true,
//       pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//       },
//       autoplay: {
//         delay: 1000,
//         disableOnInteraction: false,
//       },
//     });

//     swiper.on("slideChange", () => {
//       const prevIndex = swiper.previousIndex;
//       const currentIndex = swiper.activeIndex;
//       const prevSlide = swiper.slides[prevIndex];
//       const currentSlide = swiper.slides[currentIndex];

//       // Example: mute last active video
//       const prevIframe = prevSlide?.querySelector("iframe");
//       // debugger
//       if (prevIframe && prevIframe.src.includes("youtube")) {
//         prevIframe.contentWindow.postMessage(
//           '{"event":"command","func":"mute","args":""}',
//           "*"
//         );
//       }

//       // Example: unmute current video
//       const currentIframe = currentSlide?.querySelector("iframe");
//       if (currentIframe && currentIframe.src.includes("youtube")) {
//         currentIframe.contentWindow.postMessage(
//           '{"event":"command","func":"unMute","args":""}',
//           "*"
//         );
//         currentIframe.contentWindow.postMessage(
//           '{"event":"command","func":"playVideo","args":""}',
//           "*"
//         );
//       }
//     });
//     // autoplay js //

//     const playBtn = document.querySelector(".play-btn");
//     let isPlaying = false;
//     swiper.autoplay.stop();
//     playBtn.addEventListener("click", () => {
//       if (!isPlaying) {
//         swiper.autoplay.start();
//         isPlaying = true;
//         playBtn?.lastElementChild?.remove();
//         injectIcon('pause', playBtn);
//       } else {
//         swiper.autoplay.stop();
//         isPlaying = false;
//         playBtn?.lastElementChild?.remove();
//         injectIcon('play', playBtn);
//       }
//     });
//   }
//   /// ///second block//////////////

//   document
//     .querySelectorAll(".secsecond.bannervideo-container .video-banner")
//     .forEach((eachBlock) => {
//       if (window.matchMedia("(min-width: 1024px)").matches) {
//         createSwiper2(eachBlock);

//         // eslint-disable-next-line no-new
//         new Swiperblock(eachBlock, {
//           slidesPerView: "auto",
//           spaceBetween: 32,
//           loop: false,
//           // autoplay: {
//           //   delay: 1000,
//           //   disableOnInteraction: false,
//           // },
//           navigation: {
//             nextEl: eachBlock.querySelector(".swiper-button-next"),
//             prevEl: eachBlock.querySelector(".swiper-button-prev"),
//           },
//         });
//         const navbtn = eachBlock.querySelector(".nav-buttons");
//         const sec = eachBlock.closest(".section");
//         appendclasses.CLASS_PREFIXES = ["inner-section"]; /// classes add to section div
//         appendclasses.addIndexed(sec);
//         if (navbtn !== null) {
//           const def = sec.querySelector(".default-content-wrapper");
//           def.append(navbtn);
//         }
//       } else {
//         mobileviewswiper(eachBlock);
//       }
//     });
// }



// trial 2

import Swiperblock from "../../libs/swiper/swiper-bundle.min.js";
import { injectIcon } from "../../scripts/aem.js";
import appendclasses from "../../scripts/constatnt-classes.js";

// working for both button and one button
// function createSwiper(block) {
//   if (!block.classList.contains("swiper")) {
//     block.classList.add("swiper");
//     const rows = Array.from(block.children);
//     const swiperWrapper = document.createElement("div");
//     swiperWrapper.classList.add("swiper-wrapper");

//     rows.forEach((row) => {
//       const children = Array.from(row.children);
      
//       // 1. Identify existing containers based on your HTML structure
//       const desktopDiv = children[0];
//       const mobDiv = children[1];
//       const richtextdiv = children[2];
//       const button1Div = children[3]; // The one containing 'learn'
//       const button2LinkDiv = children[4]; // The one containing '#'
//       const button2TextDiv = children[5]; // The one containing 'discover'
//       const button2ClassDiv = children[7]; // The one containing 'primary'

//       // 2. Setup Slide Classes
//       row.classList.add("swiper-slide", "swiperinnerdiv");

//       // 3. Construct the Unified Button Container
//       if (button1Div && button1Div.querySelector('.button-container')) {
//         const btnContainer = button1Div.querySelector('.button-container');
//         const strongWrapper = btnContainer.querySelector('strong') || btnContainer;

//         // Extract values for Button 2
//         const b2Href = button2LinkDiv?.textContent?.trim();
//         const b2Text = button2TextDiv?.textContent?.trim();
//         const b2Class = button2ClassDiv?.textContent?.trim() || 'primary';

//         if (b2Href && b2Text) {
//           const btn2 = document.createElement('a');
//           btn2.href = b2Href;
//           btn2.title = b2Text;
//           btn2.textContent = b2Text;
//           btn2.className = `button ${b2Class}`;
          
//           // Append Button 2 into the same strong tag as Button 1
//           strongWrapper.appendChild(btn2);
//         }

//         // Move the now-combined button container into the rich text area
//         if (richtextdiv) {
//           richtextdiv.appendChild(btnContainer);
//         }
//       }

//       // 4. Cleanup: Remove the extra raw data divs so they don't show as text
//       children.slice(4).forEach(child => child.remove());

//       // 5. Final Assembly (AOS and Image Wrappers)
//       desktopDiv.classList.add("desktop-banner");
//       mobDiv.classList.add("mob-pbanner");
//       richtextdiv.classList.add("richtext-class");

//       const towrapdeskandmob = document.createElement("div");
//       towrapdeskandmob.classList.add("mob-desk-wrapper");
//       towrapdeskandmob.appendChild(desktopDiv);
//       towrapdeskandmob.appendChild(mobDiv);
      
//       row.append(towrapdeskandmob);
//       swiperWrapper.append(row);

//       row.lastElementChild?.setAttribute("data-aos", "fade-up");
//       row.lastElementChild?.setAttribute("data-aos-duration", "2000");
//     });

//     block.append(swiperWrapper);

//     // ... (rest of your pagination/play button code remains the same)
//     const swiperpagination = document.createElement("div");
//     swiperpagination.classList.add("swiper-pagination");
//     const swiperpaginationouter = document.createElement("div");
//     swiperpaginationouter.classList.add("outer-pagination-div");
//     const playbtn = document.createElement("button");
//     playbtn.classList.add("play-btn");
//     injectIcon('play', playbtn);
//     swiperpaginationouter.append(swiperpagination);
//     swiperpaginationouter.append(playbtn);
//     block.append(swiperpaginationouter);
//   }
// }

// trial 2 starts and its working for both single and both button if one removes still its working
function createSwiper(block) {
  if (!block.classList.contains("swiper")) {
    block.classList.add("swiper");
    const rows = Array.from(block.children);
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");

    rows.forEach((row) => {
      const children = Array.from(row.children);
      
      // 1. Map authored children based on your specific view-source structure
      const desktopDiv = children[0];
      const mobDiv = children[1];
      const richtextdiv = children[2];
      const button1Div = children[3];      // Div containing "<strong><a href="#">learn</a></strong>"
      const button2LinkDiv = children[4];  // Div containing "<a href="#">#</a>"
      const button2TextDiv = children[5];  // Div containing "discover" (Text)
      const button2TitleDiv = children[6]; // Div containing "discover" (Title)
      const button2ClassDiv = children[7]; // Div containing "secondary"

      row.classList.add("swiper-slide", "swiperinnerdiv");

      // 2. Setup a fresh button container to replace the fragmented divs
      const btnContainer = document.createElement('p');
      btnContainer.className = 'button-container';

      // 3. Extract Button 1: Remove the <strong> tag by targeting the anchor directly
      if (button1Div) {
        const btn1Anchor = button1Div.querySelector('a');
        if (btn1Anchor) {
          btn1Anchor.className = 'button primary'; // Apply standard button classes
          btnContainer.appendChild(btn1Anchor);
        }
      }

      // 4. Extract Button 2: Handle raw text and anchor even if href is "#"
      const b2Href = button2LinkDiv?.querySelector('a')?.getAttribute('href') || '#';
      const b2Text = button2TextDiv?.textContent?.trim();
      const b2Title = button2TitleDiv?.textContent?.trim();
      const b2Class = button2ClassDiv?.textContent?.trim() || 'primary';

      // Build Button 2 only if actual text (like "discover") is authored
      if (b2Text && b2Text !== "") {
        const btn2 = document.createElement('a');
        btn2.href = b2Href;
        btn2.title = b2Title || b2Text;
        btn2.textContent = b2Text;
        btn2.className = `button ${b2Class}`;
        btnContainer.appendChild(btn2);
      }

      // 5. Cleanup and Assembly: Rebuild the slide structure
      row.innerHTML = ''; // Delete all original data divs to prevent ghost text

      desktopDiv.classList.add("desktop-banner");
      mobDiv.classList.add("mob-pbanner");
      richtextdiv.classList.add("richtext-class");

      // Append buttons to the text content area
      if (btnContainer.hasChildNodes()) {
        richtextdiv.appendChild(btnContainer);
      }

      const towrapdeskandmob = document.createElement("div");
      towrapdeskandmob.classList.add("mob-desk-wrapper");
      towrapdeskandmob.appendChild(desktopDiv);
      towrapdeskandmob.appendChild(mobDiv);
      
      row.append(richtextdiv, towrapdeskandmob);

      towrapdeskandmob.setAttribute("data-aos", "fade-up");
      towrapdeskandmob.setAttribute("data-aos-duration", "2000");

      swiperWrapper.append(row);
    });

    block.append(swiperWrapper);

    // 6. Pagination and UI elements
    const swiperpagination = document.createElement("div");
    swiperpagination.classList.add("swiper-pagination");
    const swiperpaginationouter = document.createElement("div");
    swiperpaginationouter.classList.add("outer-pagination-div");
    const playbtn = document.createElement("button");
    playbtn.classList.add("play-btn");
    injectIcon('play', playbtn);
    swiperpaginationouter.append(swiperpagination);
    swiperpaginationouter.append(playbtn);
    block.append(swiperpaginationouter);
  }
}
// trial 2 ends
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
      loop: true,
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
