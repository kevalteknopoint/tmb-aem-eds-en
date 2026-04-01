import { ctaInteraction, menuInteraction, minifyText, socialmediaClick, getComponentIndex, getPersona } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.footer-col')) {
    const anchor = e.target.closest('a');
    const icon = anchor.querySelector('.icon');
    if (!anchor) return;
    if (!icon) {
      const componentIndex = getComponentIndex(anchor);
      const nextPageURL = anchor?.getAttribute('href') || '';
      const closestLi = anchor?.closest('ul')?.closest('li');
      let text = "";
      if (closestLi) {
        closestLi.childNodes?.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            text += minifyText(node.textContent);
          }
        });
      }
      if (!text && closestLi?.querySelector(':scope > p')) {
        text = minifyText(closestLi?.querySelector(':scope > p')?.textContent);
      }
      menuInteraction('bottom', minifyText(text), minifyText(anchor.textContent), '', 'global footer', 'footer', componentIndex, getPersona(), nextPageURL, 'menu-click', 'internal', '', '', '', 'footer', '');
    }
  }
  if (e.target.closest('.footer-links')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const icon = anchor.querySelector('.icon');
    let iconClassString;
    let iconName;
    if (icon) {
      iconClassString = icon.classList.toString();
      iconName = iconClassString?.replaceAll('icon-', '')?.replaceAll('icon', '')?.replaceAll(' ', '');
      const componentIndex = getComponentIndex(anchor);
      socialmediaClick('bottom', minifyText(iconName), 'global footer', 'footer', componentIndex, getPersona(), 'socialmedia-click', '', '', '', 'global footer', '');
    }
  }
  if (e.target.closest('.footer-bottom')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const anchorLi = anchor?.closest('li');
    const componentIndex = getComponentIndex(anchor);
    const nextPageURL = anchor?.getAttribute('href') || '';
    ctaInteraction('bottom', minifyText(anchorLi?.textContent), minifyText(anchor?.getAttribute('title')), 'menu-click', 'global footer', 'footer', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'link', 'footer', '', '', '', 'global footer', '');
  }

  if (e.target.closest('.footer-contact')) {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const anchorLi = anchor?.closest('li');
    const componentIndex = getComponentIndex(anchor);
    const nextPageURL = anchor?.getAttribute('href') || '';
    ctaInteraction('bottom', minifyText(anchorLi?.textContent), minifyText(anchor?.getAttribute('title')), 'socialmedia-click', 'global footer', 'footer', componentIndex, getPersona(), nextPageURL, 'cta-click', 'internal', 'link', 'footer', '', '', '', 'global footer', '');
  }
});
