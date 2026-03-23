import { applyCapsizeToElement } from "../../libs/capsize/capsize.min.js";
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

  [...block.children].forEach((row) => {
    row.classList.add('tab-content-item');

    [...row.children].forEach((col, index) => {
      if (jsonMap[index]) {
        col.classList.add(jsonMap[index]);
      }
    });

    const tabBody = row.querySelector('.tab-content-body');
    const tabRate = row.querySelector('.tab-content-rate');
    const tabImage = row.querySelector('.tab-content-image');

    const isEmpty = (el) => !el || (el.innerHTML.trim() === '' && !el.querySelector('img'));

    if (tabBody && (!isEmpty(tabRate) || !isEmpty(tabImage))) {
      const mediaElement = !isEmpty(tabRate) ? tabRate : tabImage;

      const tabBodyWrap = div({ class: 'tab-body-wrap' });
      // Move existing content into the wrapper rather than cloning to preserve event listeners if any
      tabBodyWrap.append(tabBody.cloneNode(true));
      tabBodyWrap.append(mediaElement.cloneNode(true));

      tabBody.replaceWith(tabBodyWrap);

      tabRate?.remove();
      tabImage?.remove();

      if (!isEmpty(tabRate)) {
        try {
          setTimeout(() => {
            const capsizeItems = row.querySelectorAll('.rate-num, .rate-percent, .rate-pa');
            if (capsizeItems.length > 0) {
              capsizeItems.forEach(applyCapsizeToElement);
            }
          }, 1000);
        } catch (error) {
          console.error('Capsize error:', error);
        }
      }
    }

    const btnText = row.querySelector('.tab-content-button-text');
    const btnLink = row.querySelector('.tab-content-button-link');

    if (!isEmpty(btnText) || !isEmpty(btnLink)) {
      const btnTitle = row.querySelector('.tab-content-button-title')?.textContent.trim() || '';
      const href = btnLink?.querySelector('a')?.href || btnLink?.textContent.trim() || '#';
      const target = row.querySelector('.tab-content-button-target')?.textContent.trim() || '_self';
      const style = row.querySelector('.tab-content-button-style')?.textContent.trim() || 'primary';

      const tabBtn = a({
        href,
        class: `button ${style}`,
        target,
        title: btnTitle
      }, btnText?.textContent.trim() || 'Learn More');

      const tabBtnWrap = div({ class: 'tab-content-actions' }, tabBtn);

      if (btnText) {
        btnText.replaceWith(tabBtnWrap);
      } else {
        row.append(tabBtnWrap);
      }
    }

    const metadataSelectors = [
      '.tab-content-button-title',
      '.tab-content-button-link',
      '.tab-content-button-target',
      '.tab-content-button-style'
    ];
    metadataSelectors.forEach((selector) => row.querySelector(selector)?.remove());
  });
}
