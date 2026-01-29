import { menuInteraction, minifyText } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.secondary-nav-link')) {
    const secondaryLink = e.target.closest('.secondary-nav-link');
    menuInteraction('', minifyText(secondaryLink?.textContent), '', '', 'top menu', '', '');
  }

  if (e.target.closest('.primary-nav-link')) {
    const primaryLink = e.target.closest('.primary-nav-link');
    menuInteraction('', minifyText(primaryLink?.textContent), '', '', 'main menu', '', '');
  }
});
