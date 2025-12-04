import { ctaInteraction, menuInteraction, minifyText, socialmediaClick } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.ul-4') || e.target.closest('.ul-9')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const closestLi = anchor?.closest('ul')?.closest('li');

    let text = "";

    closestLi.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += minifyText(node.textContent);
      }
    });

    if (!text && closestLi?.querySelector('& > p')) {
      text = minifyText(closestLi?.querySelector('& > p')?.textContent);
    }

    menuInteraction('', minifyText(text), minifyText(anchor.textContent), '', 'global footer', '', '');
  }

  if (e.target.closest('.ul-16')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const icon = anchor.querySelector('.icon');
    const iconClassString = icon.classList.toString();
    const iconName = iconClassString?.replaceAll('icon-', '')?.replaceAll('icon', '')?.replaceAll(' ', '');

    socialmediaClick('', minifyText(iconName), 'global footer', '', '');
  }

  if (e.target.closest('.ul-17')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const anchorLi = anchor?.closest('li');
    ctaInteraction('', minifyText(anchorLi?.textContent), '', '', 'global footer', '', '');
  }
});
