import { div } from "../../scripts/dom-helpers.js";

export default function decorateBankingGoods(block) {
  const allListItems = block.querySelectorAll('li');

  allListItems?.forEach((item, index) => {
    if (window.innerWidth <= 767 && index === 0) {
      const contentWrapper = div({ class: 'banking-goods-mb' });
      contentWrapper.innerHTML = item.innerHTML;
      block.insertAdjacentElement('beforebegin', contentWrapper);
      item.innerHTML = '';
    }

    if (window.innerWidth <= 767 || index === 0) return;

    const cardBody = item?.querySelector('.cards-card-body');
    const cardHeading = cardBody?.querySelector('h1, h2, h3, h4, h5, h6');

    const paddingTop = Number(window.getComputedStyle(cardBody)?.paddingTop?.replaceAll(/\D+/g, ''));
    const height = (paddingTop * 2) + cardHeading.offsetHeight;

    cardBody.style.height = `${height}px`;

    if (window.innerWidth <= 1279) {
      item.addEventListener('click', () => {
        cardBody?.classList.toggle('active');
      });
    } else {
      item.addEventListener('mouseover', () => {
        cardBody?.classList.add('active');
      });

      item.addEventListener('mouseout', () => {
        cardBody?.classList.remove('active');
      });
    }
  });
}
