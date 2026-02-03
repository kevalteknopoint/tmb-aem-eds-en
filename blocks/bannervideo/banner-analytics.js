import { bannerInteraction, minifyText } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.bannervideo-wrapper .button')) {
    const secondaryLink = e.target.closest('.bannervideo-wrapper .button');
    bannerInteraction('', minifyText(secondaryLink?.textContent) , 'banking for teachers, owned by teachers','','','','','','','','banner-click','internal','','','','','');
  }   
});