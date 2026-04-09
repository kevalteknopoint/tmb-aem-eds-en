import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const link = e.target.closest('.legal-tc-guide:not(.rates-saver, .background-color-secondary) a');
  if (link) {
    const block = link.closest('.legal-tc-guide');
    const pageRegion = getPageRegion(link);
    const componentIndex = getComponentIndex(block);
    const sectionTitleEl = block.querySelector('h1, h2, h3, h4, h5, h6');
    const componentName = minifyText(sectionTitleEl?.textContent || '');
    const componentType = 'column container';
    const ctaText = minifyText(link.textContent || '');
    const nextPageURL = link.href || '';
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";

    // FINAL FIX (based on actual mapping)
    ctaInteraction(
      pageRegion,
      ctaText,
      componentName,
      '',
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
      ''
    );
  }

  const faqLink = e.target.closest('.faq-legal a');

  if (faqLink) {
    const container = faqLink.closest('.faq-legal');

    const ctaText = minifyText(faqLink.innerText || '');

    const accordionItem = faqLink.closest('.accordion-item');
    const sectionTitle = accordionItem?.querySelector('summary p');

    const componentName = minifyText(sectionTitle?.innerText || '');
    const componentType = 'faq';

    const pageRegion = getPageRegion(faqLink);

    const allLinks = Array.from(container.querySelectorAll('a'));
    const componentIndex = allLinks.indexOf(faqLink) + 1;

    const nextPageURL = faqLink.getAttribute('href') || '';

    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";

    ctaInteraction(
      pageRegion,
      ctaText,
      componentName,
      '',
      componentName,
      componentType,
      componentIndex,
      getPersona(),
      nextPageURL,
      'cta-click',
      'internal',
      'accordion-link',
      'internal',
      '',
      '',
      '',
      componentId,
      ''
    );
  }
});
