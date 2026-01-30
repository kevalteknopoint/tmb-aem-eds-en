import { div } from "../../scripts/dom-helpers.js";

(function decorateMomentumSaver() {
  if (window.location.origin.includes('author')) return;

  const momentumSaverSections = document.querySelectorAll('.momentum-saver-section, .momentum-image-saver, .image-swapping, .momentum-app-badges, .momentum-direct-variant');

  momentumSaverSections.forEach((section) => {
    const newWrapper = div({ class: 'momentum-section-wrapper' });

    [...section.children].forEach((child) => {
      newWrapper.appendChild(child);
    });

    section.appendChild(newWrapper);
  });
}());
