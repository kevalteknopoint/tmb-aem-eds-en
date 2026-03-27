import { ctaInteraction, menuInteraction, minifyText, socialmediaClick, getComponentIndex, getPageRegion, getPersona } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.footer-col')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const pageRegion = getPageRegion(anchor);
    const componentIndex = getComponentIndex(anchor);
    const nextPageURL = anchor?.getAttribute('href') || '';

    const closestLi = anchor?.closest('ul')?.closest('li');

    let text = "";
    if (closestLi){
    closestLi.childNodes?.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += minifyText(node.textContent);
      }
    });
  }
    if (!text && closestLi?.querySelector(':scope > p')) {
      text = minifyText(closestLi?.querySelector(':scope > p')?.textContent);
    }
console.log('hi')
    menuInteraction(pageRegion, minifyText(text), minifyText(anchor.textContent), '', 'global footer', 'footer', componentIndex, getPersona(), nextPageURL, 'menu-click', 'internal', '', '', '', 'footer', '');
  }

  if (e.target.closest('.footer-meta-item')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const icon = anchor.querySelector('.icon');
    let iconClassString;
    let iconName;
    if(icon){
     iconClassString = icon.classList.toString();
     iconName = iconClassString?.replaceAll('icon-', '')?.replaceAll('icon', '')?.replaceAll(' ', '');}
    const pageRegion = getPageRegion(anchor);
    const componentIndex = getComponentIndex(anchor);
      console.log('social')
    socialmediaClick(pageRegion, minifyText(iconName), 'global footer', 'footer', componentIndex, getPersona(), 'socialmedia-click', '', '', '', 'global footer', '');
  }

  if (e.target.closest('.footer-contact')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const anchorLi = anchor?.closest('li');
    const pageRegion = getPageRegion(anchor);
    const componentIndex = getComponentIndex(anchor);
    const nextPageURL = anchor?.getAttribute('href') || '';
console.log('ta')
    ctaInteraction(pageRegion, minifyText(anchorLi?.textContent), minifyText(anchor?.getAttribute('title')), 'socialmedia-click', 'global footer', 'footer', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'link', 'footer', '', '', '', 'global footer', '');
  }
});
// import {
//   ctaInteraction,
//   menuInteraction,
//   minifyText,
//   socialmediaClick,
//   getComponentIndex,
//   getPageRegion,
//   getPersona
// } from "../../scripts/analytics/exports.js";

// document.addEventListener('click', (e) => {
//   const anchor = e.target.closest('a');
//   if (!anchor) return;

//   //  pageRegion fallback
//   const pageRegion =
//     getPageRegion(anchor) ||
//     getPageRegion(anchor.closest('.footer-col')) ||
//     getPageRegion(anchor.closest('.footer-wrapper')) ||
//     'footer';

//   // prevent negative index
//   let componentIndex = getComponentIndex(anchor);
//   if (componentIndex < 0 || componentIndex === undefined || componentIndex === null) {
//     componentIndex = 0;
//   }

//   const nextPageURL = anchor.getAttribute('href') || '';

//   /**
//    * ========================
//    * MENU CLICK (footer links)
//    * ========================
//    */
//   if (anchor.closest('.footer-links')) {
//     const closestLi = anchor.closest('li');

//     // FIX: simpler + safe
//     const text = minifyText(closestLi?.textContent || '');

//     menuInteraction(
//       pageRegion,
//       text,
//       minifyText(anchor.textContent),
//       '',
//       'global footer',
//       'footer',
//       componentIndex,
//       getPersona(),
//       nextPageURL,
//       'menu-click',
//       'internal',
//       '',
//       '',
//       '',
//       'footer',
//       ''
//     );
//   }

//   /**
//    * ========================
//    * META (help, phone, etc.)
//    * ========================
//    */
//   if (anchor.closest('.footer-meta-item')) {
//     const icon = anchor.querySelector('.icon');

//     let iconName = '';
//     if (icon) {
//       const iconClassString = icon.className || '';
//       iconName = iconClassString
//         .replaceAll('icon-', '')
//         .replaceAll('icon', '')
//         .replaceAll(' ', '');
//     }

//     socialmediaClick(
//       pageRegion,
//       minifyText(iconName || anchor.textContent),
//       'global footer',
//       'footer',
//       componentIndex,
//       getPersona(),
//       'socialmedia-click',
//       '',
//       '',
//       '',
//       'global footer',
//       ''
//     );
//   }

//   /**
//    * ========================
//    * CTA + SOCIAL (bottom area)
//    * ========================
//    */
//   if (anchor.closest('.footer-contact')) {
//     const anchorLi = anchor.closest('li');

//     ctaInteraction(
//       pageRegion,
//       minifyText(anchorLi?.textContent || ''),
//       minifyText(anchor.getAttribute('title') || ''),
//       'socialmedia-click',
//       'global footer',
//       'footer',
//       componentIndex,
//       getPersona(),
//       nextPageURL,
//       'cta-click',
//       'internal',
//       'link',
//       'footer',
//       '',
//       '',
//       '',
//       'global footer',
//       ''
//     );
//   }
// });