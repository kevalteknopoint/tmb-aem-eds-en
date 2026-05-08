import {
  ctaInteraction,
  minifyText,
  getPersona,
  getComponentIndex,
  getPageRegion,
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const link = e.target.closest('.quick-links-container a');

  // First condition
  if (link && link.querySelector('.quick-link-text')) {
    const quickLinksBlock = link.closest('.quick-links');
    const sectionEl = link.closest('.section');

    const componentId = sectionEl?.id || "";
    const componentName = quickLinksBlock?.dataset.blockName || "quick-links";
    const componentType = quickLinksBlock?.dataset.blockName || "quick-links";

    const ctaTitle = link.querySelector('.quick-link-text')?.textContent || "";

    const ctaText = link.textContent || "";

    // Dynamic CTA Source
    const ctaSource = minifyText(
      quickLinksBlock?.querySelector('.quick-link-text')?.textContent || ""
    );

    const componentIndex = getComponentIndex(
      quickLinksBlock?.querySelector('.button-container')
    );

    const nextPageURL = link.getAttribute("href") || "";

    ctaInteraction(
      getPageRegion(link),
      minifyText(ctaText),
      minifyText(ctaTitle),
      ctaSource,
      componentName,
      componentType,
      componentIndex,
      getPersona(),
      nextPageURL,
      'cta-click',
      'internal',
      'quick-link',
      'internal',
      '',
      '',
      '',
      componentId,
      ""
    );
  }

  // Second condition
  if (e.target.closest('a')?.closest('li')?.closest('.quick-links')) {
    const block = e.target.closest('.quick-links');
    const ctaTitle = block?.querySelector('.quick-link-text');
    const elink = e.target.closest('a');

    const componentIndex = getComponentIndex(block);
    const nextPageURL = elink?.getAttribute("href");

    const ctaText = minifyText(elink.textContent);

    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";

    // Dynamic CTA Source
    const ctaSource = minifyText(
      block?.querySelector('.quick-link-text')?.textContent || ""
    );

    ctaInteraction(
      getPageRegion(elink),
      ctaText,
      minifyText(ctaTitle?.textContent),
      ctaSource,
      'quick links',
      'quick links',
      componentIndex,
      getPersona(),
      nextPageURL,
      'cta-click',
      'internal',
      'quick-link',
      'internal',
      '',
      '',
      '',
      componentId,
      ''
    );
  }
});
