import { applyCapsizeToElement } from "../../libs/capsize/capsize.min.js";
import { div } from "../../scripts/dom-helpers.js";
import './momentum-saver-analytics.js'

(function decorateMomentumSaver() {
  if (window.location.origin.includes('author')) return;

  const momentumSaverSections = document.querySelectorAll('.momentum-saver-section, .momentum-image-saver, .image-swapping, .momentum-app-badges, .momentum-direct-variant, .circular-image');

  momentumSaverSections.forEach((section) => {
    const newWrapper = div({ class: 'momentum-section-wrapper' });

    [...section.children].forEach((child) => {
      newWrapper.appendChild(child);
    });

    section.appendChild(newWrapper);

    setTimeout(() => {
      const capsizeItems = section.querySelectorAll('.rate-num, .rate-percent, .rate-pa');
      capsizeItems.forEach(applyCapsizeToElement);
    }, 1000);
  });
}());
