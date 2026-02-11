import { bannerInteraction, minifyText } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.bannervideo-wrapper .button')) {
    const secondaryLink = e.target.closest('.bannervideo-wrapper .button');
    bannerInteraction('', minifyText(secondaryLink?.textContent) , 'banking for teachers, owned by teachers','','','','','','','','banner-click','internal','','','','','');
  }   
   if (e.target.closest('.bannervideo-wrapper .swiper-pagination-bullet')) {
    const secondaryLink = e.target.closest('.bannervideo-wrapper .swiper-pagination-bullet');
    let carouselPosition = secondaryLink.getAttribute("aria-label").replaceAll(/\D+/g, "")
    bannerInteraction('', minifyText(secondaryLink?.textContent) , 'banking for teachers, owned by teachers',carouselPosition,'','','','','','','banner-click','internal','','','','','');
  } 
});