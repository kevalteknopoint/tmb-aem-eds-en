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
    if (e.target.closest('.navigation-cards-container:not(.rates-saver.faq-cant-find-looking-for-variant')) {
      const link = e.target.closest('a');
      if (!link) return;

      const card = link.closest('.nav-card');
      if (!card) return; //  ensure it's inside a card
      // const container = link.closest('.navigation-cards-container');
      // Card title (2025–2026 etc.)
      const cardTitle = card.querySelector('h1, h2, h3, h4, h5, h6');
      // Source (Financial year)
      const ctaSource = card.querySelector('.card-header p:nth-of-type(2)');
      const pageRegion = getPageRegion(link);
      const componentIndex = getComponentIndex(link);
      const nextPageURL = link.getAttribute("href");
      const componentId = link.closest('.section')?.getAttribute('id') || '';

      ctaInteraction(
        pageRegion,
        minifyText(link.textContent),
        minifyText(cardTitle?.textContent),
        minifyText(ctaSource?.textContent || ''),
        'navigation cards',
        'navigation cards',
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

    const ctaLink = e.target.closest('.navigation-cards-container .nav-card a.is-clickable');
    if (!ctaLink) return; {
      const card = ctaLink.closest('.nav-card');
      const container = ctaLink.closest('.navigation-cards-container');
      // Card title (h3)
      const cardTitleEl = card?.querySelector('h3');
      // Section title (h2 → Leadership)
      const sectionTitleEl = container?.querySelector('.default-content-wrapper h2');
      const pageRegion = getPageRegion(ctaLink);
      const componentIndex = getComponentIndex(ctaLink);
      const nextPageURL = ctaLink.getAttribute("href");
      const persona = getPersona();
      const ectaText = minifyText(cardTitleEl?.textContent);
      const titleText = minifyText(sectionTitleEl?.textContent);
      const sectionEl = ctaLink.closest('.section');
      const componentId = sectionEl?.getAttribute('id') || "";
      // CTA tracking only
      ctaInteraction(
        pageRegion,
        ectaText,
        titleText,
        '',
        'navigation cards',
        'navigation-cards-container',
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
