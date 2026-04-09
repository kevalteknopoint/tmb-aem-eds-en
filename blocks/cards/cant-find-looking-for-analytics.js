import { ctaInteraction, minifyText, getComponentIndex, getPageRegion, getPersona } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const { target } = e;

  if (target.closest('a')) {
    const linkEle = target.closest('a');
    const ctaText = minifyText(linkEle?.textContent);

    if (target.closest('.faq-cant-find-looking-for.rates-saver:not(.navigation-cards-container)')) {
      const targetContainer = target.closest('.faq-cant-find-looking-for');
      const titleContainer = targetContainer?.querySelector('.default-content-wrapper');
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaTitleEle = linkEle?.closest('.cards-card-body')?.querySelector('h1, h2, h3, h4, h5, h6');
      const pageRegion = getPageRegion(linkEle);
      const componentIndex = getComponentIndex(linkEle);
      const nextPageURL = (linkEle)?.getAttribute("href");
      const componentId = target.closest('.section').getAttribute('id');
      ctaInteraction(pageRegion, ctaText, minifyText(ctaTitleEle?.textContent), 'cant find what you are looking for?', minifyText(title?.textContent), '', componentIndex, getPersona(), nextPageURL, 'cta-click', 'external', 'in-page-nav', 'in-content', '', '', '', componentId, '');
    }
    if (e.target.closest('.faq-cant-find-looking-for.faq-cant-find-looking-for-variant.cards-container:not(.navigation-cards-container)')) {
      const targetContainer = target.closest('.faq-cant-find-looking-for.faq-cant-find-looking-for-variant');
      const titleContainer = targetContainer?.querySelector('.default-content-wrapper');
      const title = titleContainer?.querySelector('h1, h2, h3, h4, h5, h6');
      const ctaTitleEle = linkEle?.closest('.cards-card-body')?.querySelector('h1, h2, h3, h4, h5, h6');
      const pageRegion = getPageRegion(linkEle);
      const componentIndex = getComponentIndex(linkEle);
      const nextPageURL = (linkEle)?.getAttribute("href");
      const componentId = target.closest('.section').getAttribute('id');
      ctaInteraction(pageRegion, ctaText, minifyText(ctaTitleEle?.textContent), 'WAYS TO GET IN TOUCH', minifyText(title?.textContent), '', componentIndex, getPersona(), nextPageURL, 'cta-click', 'external', 'in-page-nav', 'in-content', '', '', '', componentId, '');
    }
    const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6';
    // NORMAL LINKS (exclude clickable cards)
    if (
      e.target.closest('.navigation-cards-container .navigation-cards-wrapper:not(.rates-saver.faq-cant-find-looking-for-variant)') && !e.target.closest('.navigation-cards-container .nav-card a.is-clickable') // ✅ prevent overlap
    ) {
      const link = e.target.closest('.navigation-cards-container a');
      if (!link) return;

      const card = link.closest('.nav-card');
      if (!card) return;

      const container = link.closest('.navigation-cards-container');
      const cardTitle = card.querySelector(HEADING_SELECTOR);
      const ctaSource = card.querySelector('.card-header p:nth-of-type(2)');
      const sectionTitleEl = container?.querySelector(`.default-content-wrapper ${HEADING_SELECTOR}`);
      const sectionTitle = minifyText(sectionTitleEl?.textContent || '');
      const componentName = sectionTitle;
      const ctaTitle = sectionTitle;
      const componentType = container?.querySelector('[data-block-name]')?.getAttribute('data-block-name') || 'navigation-cards';
      const pageRegion = getPageRegion(link);
      const componentIndex = getComponentIndex(link);
      const nextPageURL = link.getAttribute("href");
      const componentId = link.closest('.section')?.getAttribute('id') || '';
      const titlectaText = minifyText(link.textContent || cardTitle?.textContent);

      ctaInteraction(
        pageRegion,
        titlectaText,
        ctaTitle,
        minifyText(ctaSource?.textContent || ''),
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

    // ==========================
    // CLICKABLE CARD LINKS ONLY
    // ==========================
    const ctaLink = e.target.closest('.navigation-cards-container .nav-card a.is-clickable');

    if (ctaLink) {
      const card = ctaLink.closest('.nav-card');
      const container = ctaLink.closest('.navigation-cards-container');

      const cardTitleEl = card?.querySelector('h3');

      const sectionTitleEl = container?.querySelector(`.default-content-wrapper ${HEADING_SELECTOR}`);
      const sectionTitle = minifyText(sectionTitleEl?.textContent || '');

      const componentName = sectionTitle;
      const ctaTitle = sectionTitle;
      const componentType =
        container?.querySelector('[data-block-name]')?.getAttribute('data-block-name') ||
        'navigation-cards';

      const pageRegion = getPageRegion(ctaLink);
      const componentIndex = getComponentIndex(ctaLink);
      const nextPageURL = ctaLink.getAttribute("href");
      const persona = getPersona();

      const ectaText = minifyText(cardTitleEl?.textContent);
      const sectionEl = ctaLink.closest('.section');
      const componentId = sectionEl?.getAttribute('id') || "";

      ctaInteraction(
        pageRegion,
        ectaText,
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
