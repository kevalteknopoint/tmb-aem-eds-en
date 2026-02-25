import { ctaInteraction, menuInteraction, minifyText, socialmediaClick, getComponentIndex,getPageRegion,getPersona } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
// ✅ Define once here
const pageRegion = getPageRegion();
const componentIndex = getComponentIndex();



  if (e.target.closest('.ul-4') || e.target.closest('.ul-9')) {

    const anchor = e.target.closest('a');
    if (!anchor) return;

    const nextpageUrl = anchor.href || '';

    menuInteraction(
      pageRegion,
      '',
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
    const iconClassString = icon.classList.toString();
    const iconName = iconClassString?.replaceAll('icon-', '')?.replaceAll('icon', '')?.replaceAll(' ', '');

    socialmediaClick(pageRegion, minifyText(iconName), 'global footer', '', '');
  }
  pageRegion,iconName,componentName,componentType,componentIndex,componentPersona,interactionType,requiredFieldMissingFlag,testUserFlag,qaSessionFlag,componentId,componentIdValidFlag

  if (e.target.closest('.ul-17')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const anchorLi = anchor?.closest('li');
    ctaInteraction('', minifyText(anchorLi?.textContent), '', '', 'global footer', '', '');
  }
});
