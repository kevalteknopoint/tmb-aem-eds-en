import { ctaInteraction, minifyText, getPageRegion, getPersona, getComponentIndex, downloadApp } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  const clickedAnchor = e.target.closest('.online-banking .banking-li-1  a');
  const componentIndex = getComponentIndex(e.target.closest('.online-banking .banking-li-1  a'));
  const ctaTitle = e.target.closest('.online-banking .banking-li-1 .cards-card-body')?.querySelector('h2');
  const nextPageURL = e.target.closest('.online-banking .banking-li-1 .cards-card-body  a')?.getAttribute("href");

  if (clickedAnchor) {
    if (!clickedAnchor) return;

    const pageRegion = getPageRegion(clickedAnchor);
    ctaInteraction(
      pageRegion,
      minifyText(clickedAnchor.textContent),
      minifyText(ctaTitle.textContent),
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
  if (e.target.closest('.online-banking .banking-li-2')?.querySelector(".card-bottom-2 a")) {
    // const secondaryLink = e.target.closest('.quick-links-container').querySelector("card-bottom-2 a");
    const pageRegion = getPageRegion(e.target.closest('.online-banking .banking-li-2')?.querySelector(".card-bottom-2 a"));
    const componentIndexLi2 = getComponentIndex(e.target.closest('.online-banking .banking-li-2')?.querySelector(".card-bottom-2 a"));
    const ctaLink = e.target.closest('.online-banking .banking-li-2')?.querySelector(".card-bottom-2 a");
    const ctaTitleLi2 = e.target.closest('.online-banking .banking-li-2').querySelector('.banking-desc-1');
    const nextPageURL2 = e.target.closest('.online-banking .banking-li-2').querySelector(".card-bottom-2 a")?.getAttribute("href");
    ctaInteraction(pageRegion, minifyText(ctaLink?.textContent), minifyText(ctaTitleLi2?.textContent), '', 'online-banking', 'cards-container', componentIndexLi2, getPersona(), nextPageURL2, 'cta-click', 'internal', 'quick-link', 'internal', '', '', '', 'online-banking', '');
  }
  const badgeLink = e.target.closest('.online-banking .banking-li-3')?.querySelector(".card-bottom-2.is-badge-link a");

  if (e.target.closest('.online-banking .banking-li-3')?.querySelector(".card-bottom-2.is-badge-link a")) {
    const clickedBadge = e.target.closest('a'); // the actual clicked <a>

    let iconName = '';
    if (clickedBadge?.querySelector('.icon-google-play-badge')) {
      iconName = 'google play';
    } else if (clickedBadge?.querySelector('.icon-app-store-badge')) {
      iconName = 'app store';
    }

    const pageRegion = getPageRegion(badgeLink);
    const componentIndexLi3 = getComponentIndex(badgeLink);
    const parentCard = e.target.closest('.online-banking .banking-li-3');

    const ctaTitleLi3 = parentCard?.querySelector('.card-bottom-1 .banking-desc-1');

    downloadApp(
      pageRegion,
      iconName,
      minifyText(ctaTitleLi3?.textContent),
      'online banking',
      'cards container',
      componentIndexLi3,
      getPersona(),
      'cta-click',
      'download',
      '',
      'internal',
      'online banking',
    );
  }
const card = e.target.closest('.online-banking li');
if (card?.querySelector('.card-bottom-2 a')) {
  const ctaLink = card.querySelector('.card-bottom-2 a');
  const ctaTitleEl = card.querySelector('.banking-desc-1');
  const sectionEl = e.target.closest('.online-banking');
  const componentId = sectionEl?.getAttribute('data-component-id') || sectionEl?.id || '';
  const titleText = minifyText(ctaTitleEl?.textContent);
  const ctaSource = minifyText(sectionEl?.querySelector('h1, h2, h3, h4, h5, h6')?.textContent);
  const componentIndex = getComponentIndex(ctaLink);
  const pageRegion = getPageRegion(ctaLink);
  const nextPageURL = ctaLink.getAttribute("href");

  ctaInteraction(
    pageRegion,
    minifyText(ctaLink?.textContent),
    titleText,
    ctaSource,
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
