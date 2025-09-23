/* eslint-disable */

import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import Swiper from './swiper-bundle.min.js';

function htmlToElement(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.firstChild;
}

export default function decorate(block) {
  /* change to ul, li */
  // const ul = document.createElement('ul');
  // [...block.children].forEach((row) => {
  //   const li = document.createElement('li');
  //   moveInstrumentation(row, li);
  //   while (row.firstElementChild) li.append(row.firstElementChild);
  //   [...li.children].forEach((div) => {
  //     if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
  //     else div.className = 'cards-card-body';
  //   });
  //   ul.append(li);
  // });
  // ul.querySelectorAll('picture > img').forEach((img) => {
  //   const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
  //   moveInstrumentation(img, optimizedPic.querySelector('img'));
  //   img.closest('picture').replaceWith(optimizedPic);
  // });
  // block.textContent = '';
  // block.append(ul);

  if (block.classList.contains('expandable-tiles')) {
    [...block.children].forEach(row => {
      const imgCol = row.firstElementChild;

      if (row.lastElementChild?.querySelector('[data-aue-type]')) {
        row.lastElementChild?.replaceWith(row.lastElementChild.firstElementChild)
      }

      let textCol = row.lastElementChild;
  
      imgCol.classList.add('tile-image');
      textCol.classList.add('tile-content');
  
      textCol.firstElementChild.classList.add('content-title');
      textCol?.querySelector('p:not(.button-container)')?.classList.add('content-description');
      textCol?.querySelector('p.button-container')?.replaceWith(textCol.lastElementChild.firstElementChild);
      textCol?.lastElementChild?.classList.add('tile-cta');
      textCol?.lastElementChild?.classList.remove('button');
  
      imgCol.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '730' }])));
  
      const bannerSlide = htmlToElement(`
        <div class="expandable-tile${screen.width < 768 ? ' swiper-slide' : ''}">${row.innerHTML}</div>  
      `);
  
      row.replaceWith(bannerSlide);
  
      if (screen.width > 768) {
        bannerSlide?.firstElementChild?.addEventListener('click', function(e) {
          e.preventDefault();
    
          const allSlides = document.querySelectorAll('.expandable-tile');
    
          if (bannerSlide?.classList.contains('active')) {
            bannerSlide?.classList.remove('active')
          } else {
            allSlides?.forEach(slide => slide.classList.remove('active'));
            bannerSlide?.classList.add('active')
          }
        })
      } else {
      }
    })
  
    if (screen.width < 768) {
      const swiperWrapper = htmlToElement(`<div class="swiper-wrapper"></div"`);
      [...block.children].forEach(row => swiperWrapper.appendChild(row));
  
      block?.classList.add('swiper');
      block.appendChild(swiperWrapper);    
      block?.insertAdjacentHTML('beforeend', `<div class="swiper-pagination"></div>`);
  
      const swiper = new Swiper('.swiper', {
        slidersPerView: 1,
        centeredSlides: true,
        spaceBetween: 24,
        pagination: {
          el: '.swiper-pagination',
        },
      });
    }
  
    function documentHandler(e) {
      if (!e.target.closest('.expandable-tile') && document.querySelector('.expandable-tile.active')) {
        document.querySelectorAll('.expandable-tile.active')?.forEach(slide => slide.classList.remove('active'));
      }
    }
  
    document.removeEventListener('click', documentHandler);
  }

  document.addEventListener('click', documentHandler);
}
