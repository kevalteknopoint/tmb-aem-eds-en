import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const link = (e.target.closest('.legal-tc-guide:not(.rates-saver) a'));
  if (link) {
    const block = link.closest('.legal-tc-guide');

    const pageRegion = getPageRegion(link);
    const componentIndex = getComponentIndex(block);
    const ctaTitle = block.querySelector('h1, h2, h3, h4, h5, h6');

    const ctaText = minifyText(link.textContent);
    const nextPageURL = link.href;
    console.log('legal');
    
    ctaInteraction(
      pageRegion,
      ctaText,
      minifyText(ctaTitle?.textContent),
      '',
      'legal tc guide',
      'legal tc guide',
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
      'legaltc',
      ''
    );
  }

  const faqLink = e.target.closest('.faq-legal a');

  if (faqLink) {
    const container = faqLink.closest('.faq-legal');
    const ctaText = minifyText(faqLink.innerText || '');
    const accordionItem = faqLink.closest('.accordion-item');
    const sectionTitle = accordionItem?.querySelector('summary p');
    const ctaTitle = minifyText(sectionTitle?.innerText || '');
    const pageRegion = getPageRegion(faqLink);
    const allLinks = Array.from(container.querySelectorAll('a'));
    const componentIndex = allLinks.indexOf(faqLink) + 1;
    const nextPageURL = faqLink.getAttribute('href') || '';

    ctaInteraction(
      pageRegion,
      ctaText,
      ctaTitle,
      '',
      'faq legal',
      'faq legal',
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
      'faqlegal',
      ''
    );
  }
});
