import { a, div } from "../../scripts/dom-helpers.js";

export default function decorate(block) {
  const jsonMap = [
    'tab-content-heading',
    'tab-content-body',
    'tab-content-rate',
    'tab-content-image',
    'tab-content-button-text',
    'tab-content-button-title',
    'tab-content-button-link',
    'tab-content-button-target',
    'tab-content-button-style'
  ];

  [...block.children].forEach((child) => {
    child.classList.add('tab-content-item');
    [...child.children].forEach((content, index) => {
      content?.classList.add(jsonMap[index + 1]);
    });

    // Tab Body Handling
    const tabBody = child?.querySelector('.tab-content-body');
    const tabRate = child?.querySelector('.tab-content-rate');
    const tabImage = child?.querySelector('.tab-content-image');

    if (tabRate) {
      const tabBodyWrap = div({ class: 'tab-body-wrap' }, tabBody?.cloneNode(true), tabRate?.cloneNode(true));
      tabBody?.replaceWith(tabBodyWrap);
      tabRate?.remove();
      tabImage?.remove();
    } else if (tabImage) {
      const tabBodyWrap = div({ class: 'tab-body-wrap' }, tabBody?.cloneNode(true), tabImage?.cloneNode(true));
      tabBody?.replaceWith(tabBodyWrap);
      tabRate?.remove();
      tabImage?.remove();
    }

    // Tab button rendering
    const tabBtnText = child?.querySelector('.tab-content-button-text');
    const tabBtnTitle = child?.querySelector('.tab-content-button-title');
    const tabBtnLink = child?.querySelector('.tab-content-button-link');
    const tabBtnTarget = child?.querySelector('.tab-content-button-target');
    const tabBtnStyle = child?.querySelector('.tab-content-button-style');

    const tabBtn = a({ href: tabBtnLink?.textContent, class: tabBtnStyle?.textContent, target: tabBtnTarget?.textContent, title: tabBtnTitle?.textContent }, tabBtnText?.textContent);
    tabBtnText.replaceWith(tabBtn);

    tabBtnTitle?.remove();
    tabBtnLink?.remove();
    tabBtnTarget?.remove();
    tabBtnStyle?.remove();
  });
}
