import { 
  ctaInteraction,
  subMenuClick,
  minifyText,
  getComponentIndex,
  getPageRegion,
  getPersona 
} from "../../scripts/analytics/exports.js";


/* ---------------- PRODUCT NAV LINKS ---------------- */

document.addEventListener('click', (e) => {

  const link = e.target.closest('.product-navigation ul li a');

  if (link) {

    const pageRegion = getPageRegion(link);
    const componentIndex = getComponentIndex(link);
    const nextPageURL = link.getAttribute("href");
    const menuText = minifyText(link.textContent);

    subMenuClick(
      pageRegion,
      menuText,
      'navigation',
      'navigation',
      componentIndex,
      getPersona(),
      nextPageURL,
      'cta-click',
      'in-page-nav',
      'external',
      'in-content',
      'navigation'
    );
  }
});


/* ---------------- APPLY BUTTON ---------------- */

document.addEventListener('click', (e) => {

  const button = e.target.closest('.product-navigation .button-container .button');

  if (button) {

    const pageRegion = getPageRegion(button);
    const componentIndex = getComponentIndex(button);
    const nextPageURL = button.getAttribute("href");

    ctaInteraction(
      pageRegion,
      '',
      '',
      minifyText(button.textContent),
      'navigation',
      'navigation',
      componentIndex,
      getPersona(),
      nextPageURL,
      'cta-link',
      'internal',
      'quick-link',
      'in-content',
      '',
      '',
      '',
      'navigation',
      ''
    );
  }
});