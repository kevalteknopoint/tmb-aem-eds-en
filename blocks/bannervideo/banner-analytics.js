import { bannerInteraction, minifyText } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.bannervideo-wrapper .button')) {
    const secondaryLink = e.target.closest('.secondary-nav-link');
    bannerInteraction('', minifyText(secondaryLink?.textContent), '', '', 'top menu', '', '');
  }

});