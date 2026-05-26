import {
  ctaInteraction,
  minifyText,
  getPersona,
  getPageRegion,
  getComponentIndex,
  downloadApp
} from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (
    e.target.closest('.money-overseas.money-overseas-variant .button-container')
  ) {
    const secondaryLink = e.target.closest(
      '.money-overseas.money-overseas-variant .overseas-columns-wrapper .button-container a'
    );

    const pageRegion = getPageRegion(
      e.target.closest(
        '.money-overseas.money-overseas-variant .button-container a'
      )
    );

    const componentIndex = getComponentIndex(
      e.target.closest(
        '.money-overseas.money-overseas-variant .button-container a'
      )
    );

    const ctaTitle = e.target
      .closest('.money-overseas.money-overseas-variant .overseas-columns-wrapper')
      .querySelector('h1,h2,h3,h4,h5,h6');

    const nextPageURL = e.target
      .closest('.money-overseas.money-overseas-variant .button-container a')
      ?.getAttribute('href');

    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || '';

    ctaInteraction(
      pageRegion,
      minifyText(secondaryLink?.textContent),
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
  }
});

/* =======================================================
   DOWNLOAD APP TRACKING (OVERSEAS)
======================================================= */

document.addEventListener('click', (e) => {
  const section = e.target.closest('.money-overseas.overseas-variant');
  if (!section) return;

  const clickedLink = e.target.closest('a');
  if (!clickedLink) return;

  const sectionEl = e.target.closest('.section');
  const componentId = sectionEl?.getAttribute('id') || '';

  const iconContainer = clickedLink.closest('.content-with-icon') || clickedLink.closest('.overseas-columns-wrapper');

  const iconEl = iconContainer?.querySelector('.icon-google-play-badge, .icon-app-store-badge');

  const iconName = iconEl ? minifyText([...iconEl.classList].find((c) => c.includes('icon')) || '') : '';

  const isDownload = clickedLink.href?.includes('apps.apple.com') || clickedLink.href?.includes('play.google.com');
  if (!isDownload) return;

  const titleEl = e.target.closest('.overseas-columns-wrapper')?.querySelector('h1,h2,h3,h4,h5,h6');

  downloadApp(
    getPageRegion(clickedLink),
    iconName,
    minifyText(titleEl?.textContent),
    'money-overseas',
    'columns-container',
    getComponentIndex(clickedLink),
    getPersona(),
    'cta-click',
    'download',
    clickedLink.getAttribute('href') || '',
    'internal',
    componentId
  );
});
