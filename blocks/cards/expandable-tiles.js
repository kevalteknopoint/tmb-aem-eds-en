// import Swiper from '../../libs/swiper/swiper-bundle.min.js';
import { createOptimizedPicture, injectIcon } from '../../scripts/aem.js';
import { button, div } from '../../scripts/dom-helpers.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function htmlToElement(htmlString) {
  if (!htmlString) return document.createElement('div');
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.firstChild;
}

export default function expandableTiles(block) {
  let autoplayTimeoutId;

  const autoplay = () => {
    autoplayTimeoutId = setInterval(() => {
      if (window.innerWidth > 767) {
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
    }, 5000);
  };

  [...block.children].forEach((row, index) => {
    let imgCol = row.firstElementChild;
    if (imgCol?.textContent?.toLowerCase()?.trim() === 'card') {
      row?.firstElementChild?.remove();
      imgCol = row.firstElementChild;
    }

    if (row.lastElementChild?.querySelector('[data-aue-type]')) {
      row.lastElementChild?.replaceWith(row.lastElementChild.firstElementChild);
    }

    const textCol = row.firstElementChild.nextElementSibling;

    imgCol.classList.add('tile-image');
    textCol.classList.add('tile-content');

    textCol.firstElementChild.classList.add('content-title');
    textCol?.querySelector('p:not(& a)')?.classList.add('content-description');

    const allButtons = [];

    const btnElement = textCol?.querySelector('p:has(a)');

    if (btnElement) allButtons.push(btnElement.querySelector('a'));

    const otherBtns = row.querySelectorAll('div:nth-child(3), div:nth-child(4)');
    otherBtns.forEach((btnDiv) => {
      const btn = btnDiv.querySelector('a');

      if (btn.parentElement.tagName === 'EM') {
        btn.classList.add('secondary');
      } else {
        btn.classList.add('primary');
      }

      allButtons.push(btn);
    });

    if (allButtons.length) {
      const firstBtn = allButtons[0];
      const anchorLink = firstBtn?.getAttribute('href');

      const contentCtaDiv = div({ class: 'content-cta' });

      allButtons.forEach((btn) => {
        btn.classList.add('cta-link');
        if (!btn?.textContent?.trim()) btn.classList.add('icon-btn');
        contentCtaDiv.appendChild(btn);
      });

      textCol.appendChild(contentCtaDiv);

      if (anchorLink) {
        allButtons.forEach((btn) => {
          const newBtn = htmlToElement(`<span>${btn.innerHTML}</span>`);
          newBtn.classList.add(...btn.classList);
          btn.replaceWith(newBtn);
        });

        textCol.replaceWith(
          htmlToElement(`<a href="${anchorLink}" class="tile-content">${textCol.innerHTML}</a>`),
        );
      }

      btnElement.remove();
      otherBtns.forEach((btn) => btn.remove());
    }

    imgCol.querySelectorAll('picture > img').forEach((eachImg) => {
      const optimizedPic = createOptimizedPicture(eachImg.src, eachImg.alt, false, [
        { width: '750' },
      ]);
      moveInstrumentation(eachImg, optimizedPic.querySelector('img'));
      eachImg.closest('picture').replaceWith(optimizedPic);
    });

    /* eslint-disable no-nested-ternary */
    const bannerSlide = htmlToElement(`
      <div class="expandable-tile${window.innerWidth <= 767 ? ' swiper-slide' : index === 0 ? ' active' : ''}">${row.innerHTML}</div>  
    `);

    moveInstrumentation(row, bannerSlide);

    row.replaceWith(bannerSlide);

    if (window.innerWidth > 767) {
      bannerSlide?.firstElementChild?.addEventListener('click', (e) => {
        e.preventDefault();

        const allSlides = document.querySelectorAll('.expandable-tile');
        allSlides?.forEach((slide) => slide.classList.remove('active'));
        bannerSlide?.classList.add('active');

        // if (bannerSlide?.classList.contains('active')) {
        //   bannerSlide?.classList.remove('active')
        // } else {
        //   allSlides?.forEach(slide => slide.classList.remove('active'));
        //   bannerSlide?.classList.add('active');
        // }
      });

      bannerSlide?.querySelector('.tile-content')?.addEventListener('focus', () => {
        bannerSlide?.firstElementChild?.dispatchEvent(new Event('click'));
      });
    }
  });

  if (window.innerWidth <= 767) {
    // const swiperWrapper = htmlToElement('<div class="swiper-wrapper"></div>');
    // [...block.children].forEach((row) => swiperWrapper.appendChild(row));

    // block?.classList.add('swiper', 'expandable-tiles-swiper');
    // block.appendChild(swiperWrapper);
    // block?.insertAdjacentHTML(
    //   'beforeend',
    //   '<div class="swiper-pagination"></div>',
    // );

    // /* eslint-disable no-new */
    // new Swiper('.expandable-tiles-swiper', {
    //   effect: 'fade',
    //   loop: true,
    //   fadeEffect: {
    //     crossFade: true,
    //   },
    //   autoplay: {
    //     delay: 3000,
    //   },
    //   slidersPerView: 1,
    //   centeredSlides: true,
    //   spaceBetween: 24,
    //   pagination: {
    //     el: '.expandable-tiles-swiper .swiper-pagination',
    //     clickable: true,
    //   },
    // });
  } else {
    const autoplayBtn = button({ class: 'autoplay-btn' });
    injectIcon('pause', autoplayBtn);
    block?.parentElement?.insertAdjacentElement('afterend', div({ class: 'autoplay-btn-wrapper' }, autoplayBtn));
    autoplay();
    autoplayBtn?.addEventListener('click', (e) => {
      e.preventDefault();

      if (autoplayBtn?.classList.contains('paused')) {
        autoplayBtn.lastElementChild.remove();
        injectIcon('pause', autoplayBtn);
        autoplayBtn?.classList.remove('paused');
        autoplay();
      } else {
        autoplayBtn.lastElementChild.remove();
        injectIcon('play', autoplayBtn);
        autoplayBtn?.classList.add('paused');
        clearInterval(autoplayTimeoutId);
      }
    });
  }

  // function documentHandler(e) {
  //   if (!e.target.closest('.expandable-tile') && document.querySelector('.expandable-tile.active')) {
  //     document.querySelectorAll('.expandable-tile.active')?.forEach(slide => slide.classList.remove('active'));
  //   }
  // }

  // document.removeEventListener('click', documentHandler);
  // document.addEventListener('click', documentHandler);
}
