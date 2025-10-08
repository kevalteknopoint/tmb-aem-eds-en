import Swiper from './swiper-bundle.min.js';
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function htmlToElement(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.firstChild;
}

export default function expandableTiles(block) {
  let autoplayTimeoutId;

  [...block.children].forEach((row, index) => {
    let imgCol = row.firstElementChild;
    if (imgCol?.textContent?.toLowerCase()?.trim() === 'card') {
      row?.firstElementChild?.remove();
      imgCol = row.firstElementChild;
    }

    if (row.lastElementChild?.querySelector('[data-aue-type]')) {
      row.lastElementChild?.replaceWith(row.lastElementChild.firstElementChild);
    }

    const textCol = row.lastElementChild;

    imgCol.classList.add('tile-image');
    textCol.classList.add('tile-content');

    textCol.firstElementChild.classList.add('content-title');
    textCol?.querySelector('p:not(& a)')?.classList.add('content-description');

    const btnElement = textCol?.querySelector('p:has(a)');
    const anchorElement = btnElement?.querySelector('a');
    const anchorLink = anchorElement?.getAttribute('href');

    if (window.innerWidth <= 768) {
      btnElement?.querySelector('a')?.classList?.remove('button');
      btnElement?.querySelector('a')?.classList?.add('cta-link');
    } else {
      anchorElement?.replaceWith(
        htmlToElement(`<span class="cta-link">${anchorElement.innerHTML}</span>`),
      );
    }

    btnElement?.replaceWith(
      htmlToElement(`<div class="content-cta">${btnElement.innerHTML}</div>`),
    );

    if (anchorLink) {
      textCol.replaceWith(
        htmlToElement(`<a href="${anchorLink}" class="tile-content">${textCol.innerHTML}</a>`),
      );
    }

    imgCol.querySelectorAll('picture > img').forEach((img) => {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
        { width: '750' },
      ]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    });

    /* eslint-disable no-nested-ternary */
    const bannerSlide = htmlToElement(`
      <div class="expandable-tile${window.innerWidth <= 768 ? ' swiper-slide' : index === 0 ? ' active' : ''}">${row.innerHTML}</div>  
    `);

    moveInstrumentation(row, bannerSlide);

    row.replaceWith(bannerSlide);

    if (window.innerWidth > 768) {
      bannerSlide?.firstElementChild?.addEventListener('mouseover', () => {
        clearInterval(autoplayTimeoutId);
      });

      bannerSlide?.firstElementChild?.addEventListener('mouseout', () => {
        clearInterval(autoplayTimeoutId);
        autoplayTimeoutId = setInterval(() => {
          if (window.innerWidth > 768) {
            if (
              block?.querySelector('.expandable-tile.active')
                ?.nextElementSibling
            ) {
              block
                ?.querySelector('.expandable-tile.active')
                ?.nextElementSibling?.firstElementChild?.dispatchEvent(
                  new Event('click'),
                );
            } else {
              block
                ?.querySelector('.expandable-tile .tile-image')
                ?.dispatchEvent(new Event('click'));
            }
          }
        }, 3000);
      });

      bannerSlide?.firstElementChild?.addEventListener('click', (e) => {
        e.preventDefault();

        const allSlides = document.querySelectorAll('.expandable-tile');
        allSlides?.forEach((slide) => slide.classList.remove('active'));
        bannerSlide?.classList.add('active');

        clearInterval(autoplayTimeoutId);

        autoplayTimeoutId = setInterval(() => {
          if (window.innerWidth > 768) {
            if (
              block?.querySelector('.expandable-tile.active')
                ?.nextElementSibling
            ) {
              block
                ?.querySelector('.expandable-tile.active')
                ?.nextElementSibling?.firstElementChild?.dispatchEvent(
                  new Event('click'),
                );
            } else {
              block
                ?.querySelector('.expandable-tile .tile-image')
                ?.dispatchEvent(new Event('click'));
            }
          }
        }, 3000);

        // if (bannerSlide?.classList.contains('active')) {
        //   bannerSlide?.classList.remove('active')
        // } else {
        // allSlides?.forEach(slide => slide.classList.remove('active'));
        // bannerSlide?.classList.add('active');
        // }
      });
    }
  });

  if (window.innerWidth <= 768) {
    const swiperWrapper = htmlToElement('<div class="swiper-wrapper"></div>');
    [...block.children].forEach((row) => swiperWrapper.appendChild(row));

    block?.classList.add('swiper', 'expandable-tiles-swiper');
    block.appendChild(swiperWrapper);
    block?.insertAdjacentHTML(
      'beforeend',
      '<div class="swiper-pagination"></div>',
    );

    /* eslint-disable no-new */
    new Swiper('.expandable-tiles-swiper', {
      effect: 'fade',
      loop: true,
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 3000,
      },
      slidersPerView: 1,
      centeredSlides: true,
      spaceBetween: 24,
      pagination: {
        el: '.expandable-tiles-swiper .swiper-pagination',
        clickable: true,
      },
    });
  }

  clearInterval(autoplayTimeoutId);
  autoplayTimeoutId = setInterval(() => {
    if (window.innerWidth > 768) {
      if (block?.querySelector('.expandable-tile.active')?.nextElementSibling) {
        block
          ?.querySelector('.expandable-tile.active')
          ?.nextElementSibling?.firstElementChild?.dispatchEvent(
            new Event('click'),
          );
      } else {
        block
          ?.querySelector('.expandable-tile .tile-image')
          ?.dispatchEvent(new Event('click'));
      }
    }
  }, 3000);

  // function documentHandler(e) {
  //   if (!e.target.closest('.expandable-tile') && document.querySelector('.expandable-tile.active')) {
  //     document.querySelectorAll('.expandable-tile.active')?.forEach(slide => slide.classList.remove('active'));
  //   }
  // }

  // document.removeEventListener('click', documentHandler);
  // document.addEventListener('click', documentHandler);
}
