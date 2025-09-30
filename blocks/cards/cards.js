import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import Swiper from './swiper-bundle.min.js';

function htmlToElement(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.firstChild;
}

export default function decorate(block) {
  if (block.classList.contains('expandable-tiles')) {
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
      btnElement?.replaceWith(htmlToElement(`<div class="content-cta">${btnElement.innerHTML}</div>`));
      btnElement?.querySelector('a')?.classList?.remove('button');

      imgCol.querySelectorAll('picture > img').forEach((img) => {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        img.closest('picture').replaceWith(optimizedPic);
      });

      /* eslint-disable no-nested-ternary */
      const bannerSlide = htmlToElement(`
        <div class="expandable-tile${window.innerWidth < 768 ? ' swiper-slide' : (index === 0 ? ' active' : '')}">${row.innerHTML}</div>  
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
              if (block?.querySelector('.expandable-tile.active')?.nextElementSibling) {
                block?.querySelector('.expandable-tile.active')?.nextElementSibling?.firstElementChild?.dispatchEvent(new Event('click'));
              } else {
                block?.querySelector('.expandable-tile .tile-image')?.dispatchEvent(new Event('click'));
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
              if (block?.querySelector('.expandable-tile.active')?.nextElementSibling) {
                block?.querySelector('.expandable-tile.active')?.nextElementSibling?.firstElementChild?.dispatchEvent(new Event('click'));
              } else {
                block?.querySelector('.expandable-tile .tile-image')?.dispatchEvent(new Event('click'));
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

    if (window.innerWidth < 768) {
      const swiperWrapper = htmlToElement('<div class="swiper-wrapper"></div>');
      [...block.children].forEach((row) => swiperWrapper.appendChild(row));

      block?.classList.add('swiper', 'expandable-tiles-swiper');
      block.appendChild(swiperWrapper);
      block?.insertAdjacentHTML('beforeend', '<div class="swiper-pagination"></div>');

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
          block?.querySelector('.expandable-tile.active')?.nextElementSibling?.firstElementChild?.dispatchEvent(new Event('click'));
        } else {
          block?.querySelector('.expandable-tile .tile-image')?.dispatchEvent(new Event('click'));
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
  } else {
    /* change to ul, li */
    const ul = document.createElement('ul');
    [...block.children].forEach((row) => {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      while (row.firstElementChild) li.append(row.firstElementChild);
      [...li.children].forEach((div) => {
        if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
        else div.className = 'cards-card-body';
      });
      ul.append(li);
    });
    ul.querySelectorAll('picture > img').forEach((img) => {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    });
    block.textContent = '';
    block.append(ul);
    // online banking help js starts
    const cardsUl = block.querySelector('.online-banking .cards-wrapper .cards ul');
    cardsUl.classList.add('banking-cards-ul');
    block.querySelectorAll('.banking-cards-ul > li').forEach((li, idx) => {
      li.classList.add(`banking-li-${idx + 1}`);
    });
    block.querySelectorAll('.online-banking .cards-wrapper .cards ul li:nth-child(2) .cards-card-body ul').forEach((ul, idx) => {
      ul.classList.add(`card-bottom-${idx + 1}`);
    });
    block.querySelectorAll('.online-banking .cards-wrapper .cards ul li:nth-child(2) .cards-card-body li').forEach((li, idx) => {
      li.classList.add(`banking-desc-${idx + 1}`);
    });
    block.querySelectorAll('.online-banking .cards-wrapper .cards ul li:nth-child(3) .cards-card-body ul').forEach((ul, idx) => {
      ul.classList.add(`card-bottom-${idx + 1}`);
    });
    block.querySelectorAll('.online-banking .cards-wrapper .cards ul li:nth-child(3) .cards-card-body li').forEach((li, idx) => {
      li.classList.add(`banking-desc-${idx + 1}`);
    });
    // online banking help js end
  }
}
