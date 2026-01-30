import { applyCapsizeToElement } from "../../libs/capsize/capsize.min.js";
import { div, source, video } from "../../scripts/dom-helpers.js";

const jsonMap = {
  1: 'desktop-media',
  2: 'desktop-img-alt',
  3: 'mobile-media',
  4: 'mobile-img-alt',
  5: 'content',
  6: 'btn-1-text',
  7: 'btn-1-title',
  8: 'btn-1-link',
  9: 'btn-1-target',
  10: 'btn-1-style',
  11: 'btn-2-text',
  12: 'btn-2-title',
  13: 'btn-2-link',
  14: 'btn-2-target',
  15: 'btn-2-style',
};

const videoRegex = /\.(mp4|mov|wmv|avi|mkv|flv|webm|mpeg|mpg|m4v|3gp|3g2|ogv|ts|m2ts|mts)(\?.*)?$/i;

const getText = (el, fallback = '') =>
  el?.textContent?.trim() || fallback;

const getLink = (el) => el?.querySelector('a');

export default function decorate(block) {
  const blockMainChild = block.querySelector('div');
  blockMainChild.classList.add('hero-banner-main');

  [...blockMainChild.children].forEach((child, index) => {
    child.classList.add(jsonMap[index + 1]);
  });

  /* ---------------- Media handling ---------------- */
  const desktopMedia = block.querySelector('.desktop-media');
  const desktopAlt = block.querySelector('.desktop-img-alt');

  if (desktopMedia?.querySelector('a') && videoRegex.test(desktopMedia.querySelector('a').href)) {
    desktopMedia.replaceChildren(
      video(source({ src: desktopMedia.querySelector('a').href }))
    );
  } else if (desktopMedia?.querySelector('img')) {
    desktopMedia.querySelector('img')
      .setAttribute('alt', getText(desktopAlt));
  } else {
    desktopMedia?.remove();
  }
  desktopAlt?.remove();

  const mobileMedia = block.querySelector('.mobile-media');
  const mobileAlt = block.querySelector('.mobile-img-alt');

  if (mobileMedia?.querySelector('a') && videoRegex.test(mobileMedia.querySelector('a').href)) {
    mobileMedia.replaceChildren(
      video(source({ src: mobileMedia.querySelector('a').href }))
    );
  } else if (mobileMedia?.querySelector('img')) {
    mobileMedia.querySelector('img')
      .setAttribute('alt', getText(mobileAlt));
  } else {
    mobileMedia?.remove();
  }
  mobileAlt?.remove();

  /* ---------------- Content ---------------- */
  const bannerContent = block.querySelector('.content');
  bannerContent.classList.remove('content');
  bannerContent.classList.add('hero-banner-content');

  const innerContent = div(
    { class: 'hero-banner-content' },
    ...bannerContent.children
  );

  const wrapperDiv = div(
    { class: 'hero-banner-content-wrap' },
    innerContent
  );

  const interestRates = wrapperDiv.querySelectorAll('.interest-rate');
  const rateWrap = div({ class: 'interest-rates-wrapper' });

  interestRates.forEach((item, index) => {
    if (item.parentElement.classList.contains('hero-banner-content')) {
      if (index === 0) item.insertAdjacentElement('beforebegin', rateWrap);
      rateWrap.appendChild(item);
    } else {
      if (index === 0) item.parentElement.insertAdjacentElement('beforebegin', rateWrap);
      rateWrap.appendChild(item.parentElement);
    }
  });

  /* ---------------- Buttons ---------------- */
  const actions = div({ class: 'hero-banner-actions' });

  const btn1Text = getText(block.querySelector('.btn-1-text'));
  const btn1Title = getText(block.querySelector('.btn-1-title'));
  const btn1Link = getLink(block.querySelector('.btn-1-link'));
  const btn1Target = getText(block.querySelector('.btn-1-target'), '_self');
  const btn1Style = getText(block.querySelector('.btn-1-style'), 'primary');

  if (btn1Link && btn1Text) {
    btn1Link.textContent = btn1Text;
    btn1Link.title = btn1Title || btn1Text;
    btn1Link.target = btn1Target;
    btn1Link.className = `button ${btn1Style}`;
    actions.append(btn1Link);
  }

  const btn2Text = getText(block.querySelector('.btn-2-text'));
  const btn2Title = getText(block.querySelector('.btn-2-title'));
  const btn2Link = getLink(block.querySelector('.btn-2-link'));
  const btn2Target = getText(block.querySelector('.btn-2-target'), '_self');
  const btn2Style = getText(block.querySelector('.btn-2-style'), 'outlined');

  if (btn2Link && btn2Text) {
    btn2Link.textContent = btn2Text;
    btn2Link.title = btn2Title || btn2Text;
    btn2Link.target = btn2Target;
    btn2Link.className = `button ${btn2Style}`;
    actions.append(btn2Link);
  }

  if (actions.children.length) {
    innerContent.append(actions);
  }

  /* Replace original content safely */
  bannerContent.replaceWith(wrapperDiv);

  Object.values(jsonMap).slice(5).forEach((cls) => block.querySelector(`.${cls}`)?.remove());

  setTimeout(() => {
    const capsizeItems = document.querySelectorAll('.rate-num, .rate-percent, .rate-pa');
    capsizeItems.forEach(applyCapsizeToElement);
  }, 3000);
}
