import { ctaInteraction, minifyText, getPersona, getComponentIndex, getPageRegion, } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const link = e.target.closest('.quick-links-container a');
  if (link && link.querySelector('.quick-link-text')) {
    const quickLinksBlock = link.closest('.quick-links');
    const sectionEl = link.closest('.section');
    const componentId = sectionEl?.id || "";
    const componentName = quickLinksBlock?.dataset.blockName || "quick-links";
    const componentType = quickLinksBlock?.dataset.blockName || "quick-links";
    const ctaTitle = link.querySelector('.quick-link-text')?.textContent || "";
    const ctaText = link.textContent || "";
    const ctaSource = componentName;
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

  if (e.target.closest('a')?.closest('li')?.closest('.quick-links')) {
    const block = e.target.closest('.quick-links');
    const ctaTitle = block?.querySelector('.quick-link-text');
    const elink = e.target.closest('a');
    const componentIndex = getComponentIndex(block);
    const nextPageURL = elink?.getAttribute("href");
    const ctaText = minifyText(elink.textContent);
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";

    ctaInteraction(
      getPageRegion(elink),
      ctaText,
      minifyText(ctaTitle?.textContent),
      '',
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
