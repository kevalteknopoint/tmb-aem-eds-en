import { ctaInteraction, menuInteraction, minifyText, socialmediaClick, getComponentIndex, getPageRegion, getPersona } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.ul-4') || e.target.closest('.ul-9')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const pageRegion = getPageRegion(anchor);
    const componentIndex = getComponentIndex(anchor);
    const nextPageURL = anchor?.getAttribute('href') || '';

    const closestLi = anchor?.closest('ul')?.closest('li');

    let text = "";

    closestLi.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += minifyText(node.textContent);
      }
    });

    if (!text && closestLi?.querySelector(':scope > p')) {
      text = minifyText(closestLi?.querySelector(':scope > p')?.textContent);
    }

    menuInteraction(pageRegion, minifyText(text), minifyText(anchor.textContent), '', 'global footer', 'footer', componentIndex, getPersona(), nextPageURL, 'menu-click', 'internal', '', '', '', 'footer', '');
  }

  if (e.target.closest('.ul-16')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const icon = anchor.querySelector('.icon');
    const iconClassString = icon.classList.toString();
    const iconName = iconClassString?.replaceAll('icon-', '')?.replaceAll('icon', '')?.replaceAll(' ', '');
    const pageRegion = getPageRegion(anchor);
    const componentIndex = getComponentIndex(anchor);

    socialmediaClick(pageRegion, minifyText(iconName), 'global footer', 'footer', componentIndex, getPersona(), 'socialmedia-click', '', '', '', 'global footer', '');
  }

  if (e.target.closest('.ul-17')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const anchorLi = anchor?.closest('li');
    const pageRegion = getPageRegion(anchor);
    const componentIndex = getComponentIndex(anchor);
    const nextPageURL = anchor?.getAttribute('href') || '';

    ctaInteraction(pageRegion, minifyText(anchorLi?.textContent), minifyText(anchor?.getAttribute('title')), 'socialmedia-click', 'global footer', 'footer', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'link', 'footer', '', '', '', 'global footer', '');
  }
});
