import {
  ctaInteraction,
  minifyText,
  getPageRegion,
  getPersona,
  getComponentIndex,
  downloadApp
} from "../../scripts/analytics/exports.js";

/* ---------------- HELPERS ---------------- */

const getComponentName = (section) =>
  minifyText(
    section?.querySelector('h1, h2, h3, h4, h5, h6')?.textContent || ''
  );

const getComponentId = (section) =>
  section?.getAttribute('data-component-id') || section?.id || '';

const getCardTitle = (card) =>
  minifyText(
    card?.querySelector('h2, h3, .banking-desc-1')?.textContent || ''
  );

/* ---------------- LISTENER ---------------- */

document.addEventListener('click', (e) => {
  const section = e.target.closest('.online-banking');
  if (!section) return;

  const componentName = getComponentName(section);
  const componentId = getComponentId(section);

  /* =======================================================
     LI-1 (simple list links)
  ======================================================= */
  const li1Link = e.target.closest('.banking-li-1 .cards-card-body a');

  if (li1Link) {
    const card = li1Link.closest('.banking-li-1');

    ctaInteraction(
      getPageRegion(li1Link),
      minifyText(li1Link.textContent),
      getCardTitle(card),
      componentName,
      'online-banking',
      'text-card',
      getComponentIndex(li1Link),
      getPersona(),
      li1Link.getAttribute('href'),
      'cta-click',
      'internal',
      'quick-link',
      'in-content',
      '',
      '',
      '',
      componentId,
      ''
    );
  }

  /* =======================================================
     LI-2 (standard CTA card)
  ======================================================= */
  const li2CTA = e.target.closest('.banking-li-2 .card-bottom-2 a');

  if (li2CTA) {
    const card = li2CTA.closest('.banking-li-2');

    const ctaTitle = getCardTitle(card);

    ctaInteraction(
      getPageRegion(li2CTA),
      minifyText(li2CTA.textContent),
      ctaTitle,
      componentName,
      'online-banking',
      'cards-container',
      getComponentIndex(li2CTA),
      getPersona(),
      li2CTA.getAttribute('href'),
      'cta-click',
      'internal',
      'quick-link',
      'in-content',
      '',
      '',
      '',
      componentId,
      ''
    );
  }

  /* =======================================================
     LI-3 (download app)
  ======================================================= */
  const li3Card = e.target.closest('.banking-li-3');

  if (li3Card && e.target.closest('.card-bottom-2.is-badge-link a')) {
    const clickedBadge = e.target.closest('a');

    let iconName = '';
    if (clickedBadge?.querySelector('.icon-google-play-badge')) {
      iconName = 'google play';
    } else if (clickedBadge?.querySelector('.icon-app-store-badge')) {
      iconName = 'app store';
    }

    downloadApp(
      getPageRegion(clickedBadge),
      iconName,
      getCardTitle(li3Card),
      'online-banking',
      'cards-container',
      getComponentIndex(clickedBadge),
      getPersona(),
      'cta-click',
      'download',
      '',
      'internal',
      componentId
    );
  }
});
