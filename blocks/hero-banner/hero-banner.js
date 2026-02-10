import { applyCapsizeToElement } from "../../libs/capsize/capsize.min.js";
import { div, source, video, span, h3 } from "../../scripts/dom-helpers.js";

const jsonMap = {
  1: 'desktop-media',
  2: 'desktop-img-alt',
  3: 'mobile-media',
  4: 'mobile-img-alt',
  5: 'sub-heading',
  6: 'heading',
  7: 'int-1-sub',
  8: 'int-1-val',
  9: 'int-1-disc',
  10: 'int-2-sub',
  11: 'int-2-val',
  12: 'int-2-disc',
  13: 'content',
  14: 'btn-1-text',
  15: 'btn-1-title',
  16: 'btn-1-link',
  17: 'btn-1-target',
  18: 'btn-1-style',
  19: 'btn-2-text',
  20: 'btn-2-title',
  21: 'btn-2-link',
  22: 'btn-2-target',
  23: 'btn-2-style',
};

const videoRegex = /\.(mp4|mov|wmv|avi|mkv|flv|webm|mpeg|mpg|m4v|3gp|3g2|ogv|ts|m2ts|mts)(\?.*)?$/i;

const getText = (el, fallback = '') => el?.textContent?.trim() || fallback;
const getLink = (el) => el?.querySelector('a');

export default function decorate(block) {
  if (window.location.origin.includes('author')) return;
  
  const blockMainChild = block.querySelector(':scope > div');
  blockMainChild.classList.add('hero-banner-main');

  // Map classes based on the new JSON structure
  [...blockMainChild.children].forEach((child, index) => {
    const className = jsonMap[index + 1];
    if (className) child.classList.add(className);
  });

  /* ---------------- Media handling ---------------- */
  ['desktop', 'mobile'].forEach((view) => {
    const media = block.querySelector(`.${view}-media`);
    const alt = block.querySelector(`.${view}-img-alt`);
    const anchor = media?.querySelector('a');

    if (anchor && videoRegex.test(anchor.href)) {
      media.replaceChildren(video(source({ src: anchor.href })));
    } else if (media?.querySelector('img')) {
      media.querySelector('img').setAttribute('alt', getText(alt));
    } else {
      media?.remove();
    }
    alt?.remove();
  });

  /* ---------------- Content & Heading Logic ---------------- */
  const subHeading = block.querySelector('.sub-heading');
  const mainHeading = block.querySelector('.heading');
  const content = block.querySelector('.content');

  const innerContent = div({ class: 'hero-banner-content' });
  
  // Append standard text elements
  if (subHeading) innerContent.append(div({ class: 'hero-sub-heading' }, ...subHeading.children));
  if (mainHeading) innerContent.append(div({ class: 'hero-heading' }, ...mainHeading.children));

  /* ---------------- Interest Rates ---------------- */
  const rateWrap = div({ class: 'interest-rates-wrapper' });
  
  [1, 2].forEach((num) => {
    const sub = block.querySelector(`.int-${num}-sub`);
    const val = block.querySelector(`.int-${num}-val`);
    const disc = block.querySelector(`.int-${num}-disc`);

    if (val && getText(val)) {
      const rateEl = h3(
        getText(sub),
        div({ class: 'rate-break' }), // To mimic the <br> in your old HTML
        ...val.childNodes,
        div({ class: 'rate-disclaimer' }, getText(disc))
      );
      rateWrap.append(rateEl);
    }
  });

  if (rateWrap.children.length > 0) {
    innerContent.append(rateWrap);
  }

  if (content) innerContent.append(...content.childNodes);

  /* ---------------- Buttons ---------------- */
  const actions = div({ class: 'hero-banner-actions' });

  [1, 2].forEach((num) => {
    const btnText = getText(block.querySelector(`.btn-${num}-text`));
    const btnLink = getLink(block.querySelector(`.btn-${num}-link`));
    if (btnLink && btnText) {
      btnLink.textContent = btnText;
      btnLink.title = getText(block.querySelector(`.btn-${num}-title`)) || btnText;
      btnLink.target = getText(block.querySelector(`.btn-${num}-target`), '_self');
      btnLink.className = `button ${getText(block.querySelector(`.btn-${num}-style`))}`;
      actions.append(btnLink);
    }
  });

  if (actions.children.length) innerContent.append(actions);

  /* ---------------- Final Assembly ---------------- */
  const wrapperDiv = div({ class: 'hero-banner-content-wrap' }, innerContent);
  
  // Cleanup: Remove the source divs for everything except the media containers
  [...blockMainChild.children].forEach(child => {
    if (!child.classList.contains('desktop-media') && !child.classList.contains('mobile-media')) {
      child.remove();
    }
  });

  blockMainChild.append(wrapperDiv);

  // Trigger Capsize
  setTimeout(() => {
    block.querySelectorAll('.rate-num, .rate-percent, .rate-pa').forEach(applyCapsizeToElement);
  }, 1000);
}