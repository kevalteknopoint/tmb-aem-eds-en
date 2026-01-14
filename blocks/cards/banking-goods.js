import { injectIcon, isTablet } from "../../scripts/aem.js";
import { div } from "../../scripts/dom-helpers.js";

export default function decorateBankingGoods(block) {
  const allListItems = block.querySelectorAll('li');

  allListItems?.forEach((item, index) => {
    // 1. Consolidate multiple card-body divs
    const bodies = item.querySelectorAll('.cards-card-body');
    if (bodies.length > 1) {
      const mainBody = bodies[0];
      for (let i = 1; i < bodies.length; i += 1) {
        while (bodies[i].firstChild) {
          mainBody.appendChild(bodies[i].firstChild);
        }
        bodies[i].remove();
      }
    }

    const cardBody = item.querySelector('.cards-card-body');
    if (cardBody) {
      // 1b. Consolidate multiple button-containers into ONE
      const btnContainers = cardBody.querySelectorAll('.button-container');
      if (btnContainers.length > 1) {
        const mainBtnContainer = btnContainers[0];
        for (let i = 1; i < btnContainers.length; i += 1) {
          while (btnContainers[i].firstChild) {
            mainBtnContainer.appendChild(btnContainers[i].firstChild);
          }
          btnContainers[i].remove();
        }
      }

      // 1c. NEW: Remove em and strong tags from inside button-container
      const finalContainer = cardBody.querySelector('.button-container');
      if (finalContainer) {
        const wrappers = finalContainer.querySelectorAll('strong, em');
        wrappers.forEach((wrapper) => {
          // Move the <a> tags out of the strong/em and into the p tag
          while (wrapper.firstChild) {
            finalContainer.insertBefore(wrapper.firstChild, wrapper);
          }
          // Remove the now-empty strong/em tag
          wrapper.remove();
        });
      }
    }

    // 2. Tablet logic for the first item
    if (isTablet() && index === 0) {
      const contentWrapper = div({ class: 'banking-goods-mb' });
      contentWrapper.innerHTML = item.innerHTML;
      block.insertAdjacentElement('beforebegin', contentWrapper);
      item.innerHTML = '';
      return;
    }

    // 3. Inject Icons
    const cardBtns = item.querySelectorAll('.button-container a');
    cardBtns.forEach((btn) => {
      if (!btn.querySelector('.icon')) {
        injectIcon('chevron-right-links', btn);
      }
    });

    if (isTablet() || index === 0) return;

    // 4. Height Calculation logic
    const cardHeading = cardBody?.querySelector('h1, h2, h3, h4, h5, h6');
    if (cardBody && cardHeading) {
      const computedStyle = window.getComputedStyle(cardBody);
      const paddingTop = Number(computedStyle.paddingTop.replace(/[^\d.]/g, ''));
      const height = (paddingTop * 2) + cardHeading.offsetHeight;

      cardBody.style.height = `${height}px`;

      item.addEventListener('mouseenter', () => {
        cardBody.style.height = `${cardBody.scrollHeight}px`;
        cardBody.classList.add('active');
      });

      item.addEventListener('mouseleave', () => {
        cardBody.style.height = `${height}px`;
        cardBody.classList.remove('active');
      });
    }
  });
}
