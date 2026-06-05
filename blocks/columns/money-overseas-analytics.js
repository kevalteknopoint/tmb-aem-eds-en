import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex,
  downloadApp
} from "../../scripts/analytics/exports.js";

/* =======================================================
   CTA + PHONE TRACKING (OVERSEAS)
======================================================= */

document.addEventListener(
  'click',
  (e) => {
    /* -----------------------------
       BUTTON CTA TRACKING
    ----------------------------- */

    const buttonLink = e.target.closest(
      '.money-overseas.overseas-variant .button-container a'
    );

    if (buttonLink) {
      const pageRegion = getPageRegion(buttonLink);
      const componentIndex = getComponentIndex(buttonLink);

      const ctaTitle = buttonLink
        .closest('.overseas-columns-wrapper')
        ?.querySelector('h1,h2,h3,h4,h5,h6');

      const nextPageURL = buttonLink.getAttribute('href');

      const sectionEl = buttonLink.closest('.section');
      const componentId = sectionEl?.id || '';

      ctaInteraction(
        pageRegion,
        minifyText(buttonLink.textContent),
        minifyText(ctaTitle?.textContent),
        '',
        'money-overseas',
        'columns-container',
        componentIndex,
        getPersona(),
        nextPageURL,
        'cta-link',
        'internal',
        'quick-link',
        'in-content',
        '',
        '',
        '',
        componentId,
        '',
        '',
        '',
        ''
      );

      return;
    }

    /* -----------------------------
       PHONE TRACKING
    ----------------------------- */

    const phoneLink = e.target.closest('a[href^="tel:"]');

    if (phoneLink) {
      const section = phoneLink.closest(
        '.money-overseas.overseas-variant'
      );

      if (!section) return;

      const sectionEl = phoneLink.closest('.section');
      const componentId = sectionEl?.id || '';

      const ctaTitle = phoneLink
        .closest('.overseas-columns-wrapper')
        ?.querySelector('h1,h2,h3,h4,h5,h6');

      ctaInteraction(
        getPageRegion(phoneLink),
        minifyText(phoneLink.textContent),
        minifyText(ctaTitle?.textContent),
        '',
        'money-overseas',
        'columns-container',
        getComponentIndex(phoneLink),
        getPersona(),
        phoneLink.getAttribute('href'),
        'cta-link',
        'internal',
        'phone',
        'in-content',
        '',
        '',
        '',
        componentId,
        '',
        '',
        '',
        ''
      );
    }
  },
  true // capture phase
);

/* =======================================================
   DOWNLOAD APP TRACKING (OVERSEAS)
======================================================= */

document.addEventListener('click', (e) => {
  const clickedLink = e.target.closest('a');
  if (!clickedLink) return;

  const section = clickedLink.closest(
    '.money-overseas.overseas-variant'
  );
  if (!section) return;

  const isDownload = clickedLink.href?.includes('apps.apple.com')
    || clickedLink.href?.includes('play.google.com');

  if (!isDownload) return;

  const sectionEl = clickedLink.closest('.section');
  const componentId = sectionEl?.id || '';

  const iconContainer = clickedLink.closest(
    '.content-with-icon, .overseas-columns-wrapper'
  );

  const iconName = minifyText(
    iconContainer
      ?.querySelector(
        '.icon-google-play-badge, .icon-app-store-badge'
      )
      ?.classList?.value
      ?.split(' ')
      ?.find((c) => c.includes('icon')) || ''
  );

  const titleEl = clickedLink
    .closest('.overseas-columns-wrapper')
    ?.querySelector('h1,h2,h3,h4,h5,h6');

  downloadApp(
    getPageRegion(clickedLink),
    iconName,
    minifyText(titleEl?.textContent || ''),
    'money-overseas',
    'columns-container',
    getComponentIndex(clickedLink),
    getPersona(),
    'cta-click',
    'download',
    clickedLink.href || '',
    'internal',
    componentId
  );
});
