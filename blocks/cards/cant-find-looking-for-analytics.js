import {
  ctaInteraction,
  minifyText,
  getComponentIndex,
  getPageRegion,
  getPersona
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const { target } = e;

  if (target.closest('a')) {
    const linkEle = target.closest('a');
    const baseCtaText = minifyText(linkEle?.textContent);

    if (
      target.closest('.faq-cant-find-looking-for.rates-saver:not(.navigation-cards-container)')
    ) {
      const container = target.closest('.faq-cant-find-looking-for');
      const titleContainer = container?.querySelector('.default-content-wrapper');
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaTitleEle = linkEle?.closest('.cards-card-body')?.querySelector('h1, h2, h3, h4, h5, h6');

      const pageRegion = getPageRegion(linkEle);
      const componentIndex = getComponentIndex(linkEle);
      const nextPageURL = linkEle?.getAttribute("href");
      const componentId = target.closest('.section')?.getAttribute('id') || '';

      ctaInteraction(
        pageRegion,
        baseCtaText,
        minifyText(ctaTitleEle?.textContent),
        'cant find what you are looking for?',
        minifyText(title?.textContent),
        '',
        componentIndex,
        getPersona(),
        nextPageURL,
        'cta-click',
        'external',
        'in-page-nav',
        'in-content',
        '',
        '',
        '',
        componentId,
        ''
      );
    }

    if (
      target.closest('.faq-cant-find-looking-for.faq-cant-find-looking-for-variant.cards-container:not(.navigation-cards-container)')
    ) {
      const container = target.closest('.faq-cant-find-looking-for.faq-cant-find-looking-for-variant');
      const titleContainer = container?.querySelector('.default-content-wrapper');
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaTitleEle = linkEle?.closest('.cards-card-body')?.querySelector('h1, h2, h3, h4, h5, h6');

      const pageRegion = getPageRegion(linkEle);
      const componentIndex = getComponentIndex(linkEle);
      const nextPageURL = linkEle?.getAttribute("href");
      const componentId = target.closest('.section')?.getAttribute('id') || '';

      ctaInteraction(
        pageRegion,
        baseCtaText,
        minifyText(ctaTitleEle?.textContent),
        'WAYS TO GET IN TOUCH',
        minifyText(title?.textContent),
        '',
        componentIndex,
        getPersona(),
        nextPageURL,
        'cta-click',
        'external',
        'in-page-nav',
        'in-content',
        '',
        '',
        '',
        componentId,
        ''
      );
    }

    const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6';

    if (
      target.closest('.navigation-cards-container .navigation-cards-wrapper:not(.rates-saver.faq-cant-find-looking-for-variant)') && !target.closest('.navigation-cards-container .nav-card a.is-clickable')
    ) {
      const link = target.closest('.navigation-cards-container a');
      if (!link) return;
      const container = link.closest('.navigation-cards-container');
      const sectionTitleEl = container?.querySelector(`.default-content-wrapper ${HEADING_SELECTOR}`);
      const sectionHeading = minifyText(sectionTitleEl?.textContent || '');
      const ctaText = minifyText(link.textContent);
      const ctaTitle = sectionHeading;
      const ctaSource = sectionHeading;
      const componentName = sectionHeading;
      const componentType = container?.querySelector('[data-block-name]')?.getAttribute('data-block-name') || 'navigation-cards';
      const pageRegion = getPageRegion(link);
      const componentIndex = getComponentIndex(link);
      const nextPageURL = link.getAttribute("href");
      const componentId = link.closest('.section')?.getAttribute('id') || '';

      ctaInteraction(
        pageRegion,
        ctaText,
        ctaTitle,
        ctaSource,
        componentName,
        componentType,
        componentIndex,
        getPersona(),
        nextPageURL,
        'cta-click',
        'internal',
        'in-page-nav',
        'in-content',
        '',
        '',
        '',
        componentId,
        ''
      );
    }

    const ctaLink = target.closest('.navigation-cards-container .nav-card a.is-clickable');

    if (ctaLink) {
      const card = ctaLink.closest('.nav-card');
      const container = ctaLink.closest('.navigation-cards-container');
      const cardTitleEl = card?.querySelector('h3');
      const sectionTitleEl = container?.querySelector(`.default-content-wrapper ${HEADING_SELECTOR}`);

      const sectionTitle = minifyText(sectionTitleEl?.textContent || '');

      const componentName = sectionTitle;
      const ctaTitle = sectionTitle;

      const componentType = container?.querySelector('[data-block-name]')?.getAttribute('data-block-name') || 'navigation-cards';

      const pageRegion = getPageRegion(ctaLink);
      const componentIndex = getComponentIndex(ctaLink);
      const nextPageURL = ctaLink.getAttribute("href");
      const persona = getPersona();

      const ctaText = minifyText(cardTitleEl?.textContent);
      const componentId = ctaLink.closest('.section')?.getAttribute('id') || "";

      ctaInteraction(
        pageRegion,
        ctaText,
        ctaTitle,
        '',
        componentName,
        componentType,
        componentIndex,
        persona,
        nextPageURL,
        'cta-link',
        'internal',
        'card',
        'in-content',
        '',
        '',
        '',
        componentId,
        '',
        '',
        ''
      );
    }
  }
});
