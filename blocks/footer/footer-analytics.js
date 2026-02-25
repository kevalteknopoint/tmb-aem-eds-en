// import { ctaInteraction, menuInteraction, minifyText, socialmediaClick, getComponentIndex,getPageRegion,getPersona } from "../../scripts/analytics/exports.js";

// document.addEventListener('click', (e) => {
//   if (e.target.closest('.ul-4') || e.target.closest('.ul-9')) {
//     const anchor = e.target.closest('a');
//     if (!anchor) return;

//     const closestLi = anchor?.closest('ul')?.closest('li');

//     let text = "";

//     closestLi.childNodes.forEach((node) => {
//       if (node.nodeType === Node.TEXT_NODE) {
//         text += minifyText(node.textContent);
//       }
//     });

//     if (!text && closestLi?.querySelector('& > p')) {
//       text = minifyText(closestLi?.querySelector('& > p')?.textContent);
      
//     }

//     menuInteraction(pageRegion, minifyText(text), minifyText(anchor.textContent), '', 'global footer', 'footer', componentIndex,getPersona(),nextpageUrl,'menu-click','internal','','','','footer','');
//   }

   

//   if (e.target.closest('.ul-16')) {
//     const anchor = e.target.closest('a');
//     if (!anchor) return;

//     const icon = anchor.querySelector('.icon');
//     const iconClassString = icon.classList.toString();
//     const iconName = iconClassString?.replaceAll('icon-', '')?.replaceAll('icon', '')?.replaceAll(' ', '');

//     socialmediaClick(pageRegion, minifyText(iconName), 'global footer', '', '');
//   }
//   pageRegion,iconName,componentName,componentType,componentIndex,componentPersona,interactionType,requiredFieldMissingFlag,testUserFlag,qaSessionFlag,componentId,componentIdValidFlag

//   if (e.target.closest('.ul-17')) {
//     const anchor = e.target.closest('a');
//     if (!anchor) return;
//     const anchorLi = anchor?.closest('li');
//     ctaInteraction('', minifyText(anchorLi?.textContent), '', '', 'global footer', '', '');
//   }
// });
import { 
  ctaInteraction, 
  menuInteraction, 
  minifyText, 
  socialmediaClick, 
  getComponentIndex,
  getPageRegion,
  getPersona 
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {

  // ✅ DEFINE THEM HERE
  const pageRegion = getPageRegion();
  const componentIndex = getComponentIndex();
  const nextpageUrl = e.target.closest('a')?.href || '';

  if (e.target.closest('.ul-4') || e.target.closest('.ul-9')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const closestLi = anchor.closest('ul')?.closest('li');

    let text = "";

    closestLi?.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += minifyText(node.textContent);
      }
    });

    // ❌ This selector is wrong: '& > p'
    if (!text && closestLi?.querySelector(':scope > p')) {
      text = minifyText(closestLi.querySelector(':scope > p')?.textContent);
    }

    menuInteraction(
      pageRegion,
      minifyText(text),
      minifyText(anchor.textContent),
      '',
      'global footer',
      'footer',
      componentIndex,
      getPersona(),
      nextpageUrl,
      'menu-click',
      'internal',
      '',
      '',
      '',
      'footer',
      ''
    );
  }

  if (e.target.closest('.ul-16')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const icon = anchor.querySelector('.icon');
    if (!icon) return;

    const iconClassString = icon.classList.toString();
    const iconName = iconClassString
      ?.replaceAll('icon-', '')
      ?.replaceAll('icon', '')
      ?.replaceAll(' ', '');

    socialmediaClick(
      pageRegion,
      minifyText(iconName),
      'global footer',
      '',
      ''
    );
  }

  if (e.target.closest('.ul-17')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const anchorLi = anchor.closest('li');

    ctaInteraction(
      '',
      minifyText(anchorLi?.textContent),
      '',
      '',
      'global footer',
      '',
      ''
    );
  }
});