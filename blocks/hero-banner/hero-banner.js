import { div, source, video } from "../../scripts/dom-helpers.js";

const jsonMap = {
  1: 'desktop-media',
  2: 'desktop-img-alt',
  3: 'mobile-media',
  4: 'mobile-img-alt',
  5: 'content'
};

const videoRegex = /\.(mp4|mov|wmv|avi|mkv|flv|webm|mpeg|mpg|m4v|3gp|3g2|ogv|ts|m2ts|mts)(\?.*)?$/i;

export default function decorate(block) {
  const blockMainChild = block.querySelector('div');

  blockMainChild.classList.add('hero-banner-main');

  [...blockMainChild.children].forEach((child, index) => {
    child.classList.add(jsonMap[String(index + 1)]);
  });

  const desktopMedia = block.querySelector(`.${jsonMap['1']}`);
  const desktopAlt = block.querySelector(`.${jsonMap['2']}`);
  if (desktopMedia?.querySelector('a') && videoRegex.test(desktopMedia?.querySelector('a')?.href)) {
    const videoBlock = video(source({ src: desktopMedia?.querySelector('a')?.href }));
    desktopMedia.innerHTML = '';
    desktopMedia.appendChild(videoBlock);
  } else if (desktopMedia?.querySelector('img')) {
    const desktopImg = desktopMedia?.querySelector('img');
    desktopImg?.setAttribute('alt', desktopAlt?.textContent?.trim());
  } else {
    desktopMedia.remove();
  }
  desktopAlt.remove();

  const mobileMedia = block.querySelector(`.${jsonMap['3']}`);
  const mobileAlt = block.querySelector(`.${jsonMap['4']}`);
  if (mobileMedia?.querySelector('a') && videoRegex.test(mobileMedia?.querySelector('a')?.href)) {
    const videoBlock = video(source({ src: mobileMedia?.querySelector('a')?.href }));
    mobileMedia.innerHTML = '';
    mobileMedia.appendChild(videoBlock);
  } else if (mobileMedia?.querySelector('img')) {
    const mobileImg = mobileMedia?.querySelector('img');
    mobileImg?.setAttribute('alt', mobileAlt?.textContent?.trim());
  } else {
    mobileMedia.remove();
  }
  mobileAlt.remove();

  const bannerContent = block.querySelector(`.${jsonMap['5']}`);
  bannerContent?.classList.remove('content');
  bannerContent?.classList.add('hero-banner-content');
  const wrapperDiv = div({ class: 'hero-banner-content-wrap' }, div({ class: 'hero-banner-content' }, ...bannerContent.children));
  bannerContent.replaceWith(wrapperDiv);
}
