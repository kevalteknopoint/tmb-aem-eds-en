import { div } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  if (window.location.origin.includes('author')) return;

  const wrapper = div({ class: 'interest-rates-wrap' });
  let hasValidContent = false;

  [...block.children].forEach((item) => {
    const titleP = item.children?.[0]?.querySelector('p');
    const rateP = item.children?.[1]?.querySelector('p');
    const disclaimerP = item.children?.[2]?.querySelector('p');

    const titleText = titleP?.textContent?.trim();
    const rateText = rateP?.textContent?.trim();
    const disclaimerText = disclaimerP?.textContent?.trim();

    if (!titleText || !rateText) return;

    hasValidContent = true;

    titleP.classList.add('rate-title');
    rateP.classList.add('rate-block');

    const children = [titleP, rateP];

    if (disclaimerText) {
      disclaimerP.classList.add('rate-disclaimer');
      children.push(disclaimerP);
    }

    wrapper.append(div({ class: 'rate-content' }, ...children));
  });

  if (!hasValidContent) {
    block.remove();
    return;
  }

  block.innerHTML = '';
  block.append(wrapper);
}
