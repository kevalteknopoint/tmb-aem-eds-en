import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.news-helpful:not(.news-helpful-homepage) .button-container')) {
    const component = e.target.closest('.news-helpful');

    const ctaLink = e.target.closest(
      '.news-helpful .button-container .button'
    );

    // dynamic source
    const ctaSource = component.querySelector("h1,h2,h3,h4,h5,h6");

    // dynamic title from current slide/card
    const ctaTitle = ctaLink?.closest('.swiper-slide')?.querySelector('p:not(.button-container)')
      || component.querySelector('p');

    // dynamic component type
    const componentType = component?.querySelector('[data-block-name]')?.getAttribute('data-block-name')
      || 'news-helpful';

    // dynamic component name
    const componentName = [...component.classList].find((cls) =>
      ![
        'section',
        'aos-enabled',
        'aos-init',
        'aos-animate',
        'spacer-bottom',
        'secsecond'
      ].includes(cls)
    ) || 'news-helpful';

    // ✅ updated authored component id (must come from section, not heading)
    const sectionEl = ctaSource?.closest('.section');
    const componentId = sectionEl?.id?.trim() ? sectionEl.id : '';

    // existing logic preserved
    const componentIndex = getComponentIndex(ctaLink);
    const nextPageURL = ctaLink?.getAttribute("href");
    const pageRegion = getPageRegion(ctaLink);

    ctaInteraction(
      pageRegion,
      minifyText(ctaLink?.textContent),
      minifyText(ctaTitle?.textContent),
      minifyText(ctaSource?.textContent),
      componentType,
      componentName,
      componentIndex,
      getPersona(),
      nextPageURL,
      'cta-link',
      'internal',
      'quick-link',
      'in-content',
      '',
      '',
      '',
      componentId, // now correctly empty if not authored on section
      '',
      '',
      ''
    );
  }
});
