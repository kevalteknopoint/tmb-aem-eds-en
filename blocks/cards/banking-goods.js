import { injectIcon, isTablet } from "../../scripts/aem.js";
import { div } from "../../scripts/dom-helpers.js";

export default function decorateBankingGoods(block) {
  const allListItems = block.querySelectorAll('li');

  allListItems?.forEach((item, index) => {
    if (isTablet() && index === 0) {
      const contentWrapper = div({ class: 'banking-goods-mb' });
      contentWrapper.innerHTML = item.innerHTML;
      block.insertAdjacentElement('beforebegin', contentWrapper);
      item.innerHTML = '';
    }

    const cardBtn = item?.querySelector('.button-container a');
    injectIcon('chevron-right-links', cardBtn);

    if (isTablet() || index === 0) return;

    const cardBody = item?.querySelector('.cards-card-body');
    const cardHeading = cardBody?.querySelector('h1, h2, h3, h4, h5, h6');

    const paddingTop = Number(window.getComputedStyle(cardBody)?.paddingTop?.replaceAll(/\D+/g, ''));
    const height = (paddingTop * 2) + cardHeading.offsetHeight;

    cardBody.style.height = `${height}px`;

    item.addEventListener('mouseover', () => {
      cardBody?.classList.add('active');
    });

    item.addEventListener('mouseout', () => {
      cardBody?.classList.remove('active');
    });
  });
}
