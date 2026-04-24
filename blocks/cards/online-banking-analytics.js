import {
  ctaInteraction,
  minifyText,
  getPageRegion,
  getPersona,
  getComponentIndex,
  downloadApp
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const clickedAnchor = e.target.closest('.online-banking .banking-li-1 a');

  if (clickedAnchor) {
    const componentIndex = getComponentIndex(clickedAnchor);
    const ctaTitle = clickedAnchor.closest('.cards-card-body')?.querySelector('h2');
    const nextPageURL = clickedAnchor.getAttribute("href");

    const pageRegion = getPageRegion(clickedAnchor);

    ctaInteraction(
      pageRegion,
      minifyText(clickedAnchor.textContent),
      minifyText(ctaTitle?.textContent),
      '',
      'online-banking',
      '',
      componentIndex,
      getPersona(),
      nextPageURL,
      'cta-click',
      'internal',
      'quick-link',
      'in-content',
      '',
      '',
      '',
      'online-banking',
      ''
    );
  }

  const li2CTA = e.target.closest('.online-banking .banking-li-2')?.querySelector('.card-bottom-2 a');

  if (li2CTA) {
    const pageRegion = getPageRegion(li2CTA);
    const componentIndex = getComponentIndex(li2CTA);
    const ctaTitleLi2 = e.target
      .closest('.online-banking .banking-li-2')
      .querySelector('.banking-desc-1');
    const nextPageURL2 = li2CTA.getAttribute("href");

    ctaInteraction(
      pageRegion,
      minifyText(li2CTA.textContent),
      minifyText(ctaTitleLi2?.textContent),
      '',
      'online-banking',
      'cards-container',
      componentIndex,
      getPersona(),
      nextPageURL2,
      'cta-click',
      'internal',
      'quick-link',
      'internal',
      '',
      '',
      '',
      'online-banking',
      ''
    );
  }

  const badgeLink = e.target.closest('.online-banking .banking-li-3')?.querySelector('.card-bottom-2.is-badge-link a');

  if (badgeLink) {
    const clickedBadge = e.target.closest('a');

    let iconName = '';
    if (clickedBadge?.querySelector('.icon-google-play-badge')) {
      iconName = 'google play';
    } else if (clickedBadge?.querySelector('.icon-app-store-badge')) {
      iconName = 'app store';
    }

    const pageRegion = getPageRegion(badgeLink);
    const componentIndex = getComponentIndex(badgeLink);
    const parentCard = e.target.closest('.online-banking .banking-li-3');
    const ctaTitleLi3 = parentCard?.querySelector('.banking-desc-1');

    downloadApp(
      pageRegion,
      iconName,
      minifyText(ctaTitleLi3?.textContent),
      'online banking',
      'cards container',
      componentIndex,
      getPersona(),
      'cta-click',
      'download',
      '',
      'internal',
      'online banking'
    );
  }

  const card = e.target.closest('.online-banking li');

  if (card?.querySelector('.card-bottom-2 a')) {
    const ctaLink = card.querySelector('.card-bottom-2 a');
    const ctaTitleEl = card.querySelector('.banking-desc-1');

    const sectionEl = e.target.closest('.online-banking');
    const componentId = sectionEl?.getAttribute('data-component-id') || sectionEl?.id || '';

    const componentIndex = getComponentIndex(ctaLink);
    const pageRegion = getPageRegion(ctaLink);
    const nextPageURL = ctaLink.getAttribute("href");

    ctaInteraction(
      pageRegion,
      minifyText(ctaLink.textContent),
      minifyText(ctaTitleEl?.textContent),
      minifyText(sectionEl?.querySelector('h1, h2, h3, h4, h5, h6')?.textContent),
      'online-banking',
      '',
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
