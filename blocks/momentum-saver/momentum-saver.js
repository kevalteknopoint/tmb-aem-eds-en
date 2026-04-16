import { applyCapsizeToElement } from "../../libs/capsize/capsize.min.js";
import { div } from "../../scripts/dom-helpers.js";
import './momentum-saver-analytics.js';

(function decorateMomentumSaver() {
  if (window.location.origin.includes('author')) return;

  const momentumSaverSections = document.querySelectorAll('.momentum-saver-section, .momentum-image-saver, .image-swapping, .momentum-app-badges, .momentum-direct-variant, .circular-image, .variant-404, .momentum-corporate-variation');

  momentumSaverSections.forEach((section) => {
    if (section.dataset.initialized) return;
    section.dataset.initialized = 'true';

    const newWrapper = div({ class: 'momentum-section-wrapper' });

    if (section.classList.contains('momentum-corporate-variation') && section.classList.contains('section-with-bg')) {
      section.classList.remove('section-with-bg');
      newWrapper.classList.add('section-with-bg');
      newWrapper.style.backgroundImage = section.style.backgroundImage;
      section.style.backgroundImage = '';
    }

    [...section.children].forEach((child) => {
      newWrapper.appendChild(child);
    });

    section.appendChild(newWrapper);

    try {
      setTimeout(() => {
        const capsizeItems = section.querySelectorAll('.rate-num, .rate-percent, .rate-pa');
        capsizeItems.forEach(applyCapsizeToElement);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  });

  // ---------- Identified brand class and added to the container for specific style ----------- //

  const momentumImpactContainer = document.querySelector('.momentum-impact');
  const body = document.querySelector('body');
  const brandClassName = body?.className?.split(' ')[0];

  if (momentumImpactContainer && brandClassName) {
    momentumImpactContainer.classList.add(brandClassName);
  }
}());
