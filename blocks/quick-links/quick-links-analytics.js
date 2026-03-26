import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const link = e.target.closest('.quick-links-container a');
  if (e.target.closest('a')?.querySelector('.quick-link-text')) {
    const ctaTitle = link.closest('.quick-links')?.querySelector('.quick-link-text');
    const pageRegion = e.target.closest('.quick-links-container .quick-links').querySelector('.button-container a');
    const componentIndex = getComponentIndex(e.target.closest('.quick-links-container .quick-links').querySelector('.button-container'));
    const nextPageURL = e.target.closest('.quick-links-container .quick-links').querySelector('.button-container a')?.getAttribute("href");
    const ctaText = e.target.closest('.quick-links-container .quick-links').querySelector('.button-container');
    ctaInteraction(pageRegion, minifyText(ctaText?.textContent), minifyText(ctaTitle?.textContent), 'cta-click', '', 'quick-links', 'quick-links', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'quick-link', 'internal', '', '', '', 'quicklinkshomepage', '');
  }
  
  const sublink = e.target.closest('.quick-links-container ul li a');
  if (e.target.closest('a')?.closest('li')?.closest('.quick-links')) {
    const ctaTitle = e.target.closest('.quick-links')?.querySelector('.quick-links-text');
    const pageRegion = e.target.closest('.quick-links-container .quick-links').querySelector('a');
    const componentIndex = getComponentIndex(e.target.closest('.quick-links-container .quick-links').querySelector('.button-container'));
    const nextPageURL = e.target.closest('.quick-links-container .quick-links').querySelector('.button-container a')?.getAttribute("href");
    const ctaText = e.target.closest('.quick-links-container .quick-links').querySelector('.button-container');
    ctaInteraction(pageRegion, minifyText(ctaText?.textContent), minifyText(ctaTitle?.textContent), 'cta-click', '', 'quick-links', 'quick-links', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'quick-link', 'internal', '', '', '', 'quicklinkshomepage', '');
  }
  // const link = e.target.closest('.quick-links-container ul li a');

// if (link && e.target.closest('.quick-links-container .quick-links')?.querySelector(".button-container a")) {

//   const wrapper = link.closest('.quick-links-wrapper');
//   if (!wrapper) return;

//   const ctaTitle = wrapper.querySelector('.quick-link-text');
//   const buttonLink = wrapper.querySelector('.button-container a');

//   const pageRegion = buttonLink;
//   const componentIndex = getComponentIndex(wrapper.querySelector('.button-container'));
//   const nextPageURL = buttonLink?.getAttribute("href");
//   const ctaText = wrapper.querySelector('.button-container');

//   ctaInteraction(
//     pageRegion,
//     minifyText(ctaText?.textContent),
//     minifyText(ctaTitle?.textContent),
//     'cta-click',
//     '',
//     'quick-links',
//     'quick-links',
//     componentIndex,
//     getPersona(),
//     nextPageURL,
//     'cta-click',
//     'internal',
//     'quick-link',
//     'internal',
//     '',
//     '',
//     '',
//     'quicklinkshomepage',
//     ''
//   );
// }
  // if (quickLinkText) {
  //   const link = quickLinkText.closest('a'); 
  //    const pageRegion = getPageRegion(link);
  //   const componentIndex = getComponentIndex(link);
  //   ctaInteraction(pageRegion, minifyText(link?.textContent), '', 'cta-click', 'quick-links', 'quick-links', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'quick-link', 'internal', '', '', '', 'quicklinkshomepage', '');

  // }
  // if (link) {
  //   const pageRegion = getPageRegion(link);
  //   const componentIndex = getComponentIndex(link);

  //   const ctaLink = link;
  //   const ctaTitle = link.closest('.quick-links')?.querySelector('.quick-link-text');

  //   const nextPageURL = link.getAttribute("href");
  //   ctaInteraction(pageRegion, minifyText(ctaLink?.textContent), minifyText(ctaTitle?.textContent), 'cta-click', 'quick-links', 'quick-links', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'quick-link', 'internal', '', '', '', 'quicklinkshomepage', '');
  // }
});
