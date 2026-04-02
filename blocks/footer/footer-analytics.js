import { ctaInteraction, menuInteraction, minifyText, socialmediaClick, getComponentIndex, getPersona } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.footer-col')) {
  const anchor = e.target.closest('a');
  if (!anchor) return;
  const icon = anchor.querySelector('.icon');
  if (icon) return;
  const componentIndex = getComponentIndex(anchor);
  const nextPageURL = anchor.getAttribute('href') || '';
  const sectionEl = e.target.closest('.section');
  const componentId = sectionEl?.getAttribute('id') || "";
  const closestLi = anchor.closest('li');
  // LEVEL 1 MENU (h3)
  const footerCol = anchor.closest('.footer-col');
  const levelOneMenu = minifyText(
    footerCol?.querySelector('h1,h2,h3,h4,h5,h6')?.textContent
  );

  let text = "";
  if (closestLi) {
    closestLi.childNodes?.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += minifyText(node.textContent);
      }
    });
  }

  if (!text && closestLi?.querySelector(':scope > p')) {
    text = minifyText(
      closestLi.querySelector(':scope > p')?.textContent
    );
  }
  menuInteraction(
    'bottom',
    levelOneMenu, // FIXED: Level 1 menu instead of random text
    minifyText(anchor.textContent),
    '',
    'global footer',
    'footer',
    componentIndex,
    getPersona(),
    nextPageURL,
    'menu-click',
    'internal',
    '',
    '',
    '',
    componentId,
    ''
  );
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
