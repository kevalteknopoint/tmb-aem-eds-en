import Swiperblock from "../../libs/swiper/swiper-bundle.min.js";

function createSwiper(block) {
  if (!block.classList.contains("swiper")) {
    block.classList.add("swiper");
    const rows = Array.from(block.children);
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");
    rows.forEach((row) => {
      //   const towrapdeskandmob = document.createElement("div");
      //   towrapdeskandmob.classList.add("mob-desk-wrapper");
      //   row.lastElementChild?.setAttribute('data-aos', 'fade-up');
      //   row.lastElementChild?.setAttribute('data-aos-duration', '2000');

      //   const desktopDiv = row.children[0];
      //   const mobDiv = row.children[1];
      //   const richtextdiv = row.children[2];
      row.classList.add("swiper-slide");
      //   row.classList.add(`swiperinnerdiv`); // ${i + 1}
      swiperWrapper.append(row);
      //   desktopDiv.classList.add("desktop-banner");
      //   mobDiv.classList.add("mob-pbanner");
      //   richtextdiv.classList.add("richtext-class");

      //   towrapdeskandmob.appendChild(desktopDiv);
      //   towrapdeskandmob.appendChild(mobDiv);
      //   row.append(towrapdeskandmob);
      //   // appendclasses.CLASS_PREFIXES = ['mainswrapper'];
      //   // appendclasses.addIndexed(row)
      //   // Array.from(row.children).forEach((child, i) => {
      //   //   if (child.tagName === "DIV" && child.innerHTML.trim() === "") {
      //   //     child.remove();
      //   //   }
      //   // });
    });
    block.append(swiperWrapper);
    const swiperpagination = document.createElement("div");
    swiperpagination.classList.add("swiper-pagination");
    // const swiperpaginationouter = document.createElement("div");
    // swiperpaginationouter.classList.add("outer-pegination-div"); // for play btn
    // const playbtn = document.createElement("button");
    // playbtn.classList.add("play-btn");
    // const iconp = document.createElement("img");
    // iconp.src = "../../icons/Vector.svg";
    // iconp.alt = "play Icon";
    // playbtn.appendChild(iconp);
    // swiperpaginationouter.append(swiperpagination);
    // swiperpaginationouter.append(playbtn);
    block.append(swiperpagination);
  }
}
export default function decorate(block) {
}
let block = document.querySelector(".section.faq-category-container")
createSwiper(block);
const swiper = new Swiperblock(block, {
  slidesPerView: 2,
  spaceBetween: 2,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
          // Numbered pagination: 1, 2, 3, 4 ...
          return `<span class="${className}">${index + 1}</span>`;
        },
  },
  breakpoints: {
      320: { // mobile
        slidesPerView: 1,
        spaceBetween: 10,
      },
      1366:{
        slidesPerView : 2,
        spaceBetween:2,
      }
    }
  // autoplay: {
  //   delay: 1000,
  //   disableOnInteraction: false,
  // },
});

swiper.on("slideChange", () => {
  const prevIndex = swiper.previousIndex;
  const currentIndex = swiper.activeIndex;
  const prevSlide = swiper.slides[prevIndex];
  const currentSlide = swiper.slides[currentIndex];
});
