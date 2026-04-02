import { ctaInteraction, minifyText, getPersona, getPageRegion, getComponentIndex } from "../../scripts/analytics/exports.js";

document.addEventListener('click', (e) => {
  if (e.target.closest('.momentum-saver-section:not(.momentum-image-saver) .button-container')) {
    const secondaryLink = e.target.closest('.momentum-saver-section .button-container .button');
    const pageRegion = getPageRegion(e.target.closest('.momentum-saver-section .button-container .button'));
    const componentIndex = getComponentIndex(e.target.closest('.momentum-saver-section .button-container .button'));
    const ctaTitle = e.target.closest('.momentum-saver-section').querySelector("h1,h2,h3,h4,h5,h6");
    const nextPageURL = e.target.closest(".momentum-saver-section .button-container .button")?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'momentum-saver-section', 'columns-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', componentId, '', '', '', '');
  }
  if (e.target.closest('.momentum-image-saver .button-container')) {
    const secondaryLink = e.target.closest('.momentum-image-saver .button-container .button');
    const pageRegion = getPageRegion(e.target.closest('.momentum-image-saver .button-container .button'));
    const componentIndex = getComponentIndex(e.target.closest('.momentum-image-saver .button-container .button'));
    const ctaTitle = e.target.closest('.momentum-image-saver').querySelector("h1,h2,h3,h4,h5,h6");
    const nextPageURL = e.target.closest(".momentum-image-saver .button-container .button")?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'momentum-image-saver', 'columns-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', componentId, '', '', '', '');
  }
  if (e.target.closest('.image-swapping:not(.variant-404) .button-container')) {
    const secondaryLink = e.target.closest('.image-swapping .button-container .button');
    const pageRegion = getPageRegion(e.target.closest('.image-swapping .button-container .button'));
    const componentIndex = getComponentIndex(e.target.closest('.image-swapping .button-container .button'));
    const ctaTitle = e.target.closest('.image-swapping').querySelector("h1,h2,h3,h4,h5,h6");
    const nextPageURL = e.target.closest(".image-swapping .button-container .button")?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'image-swapping', 'columns-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', componentId, '', '', '', '');
  }
  if (e.target.closest('.image-swapping:not(.variant-404)  p a')) {
    const secondaryLink = e.target.closest('.image-swapping p a');
    const pageRegion = getPageRegion(e.target.closest('.image-swapping p a'));
    const componentIndex = getComponentIndex(e.target.closest('.image-swapping p a'));
    const ctaTitle = e.target.closest('.image-swapping').querySelector("h1,h2,h3,h4,h5,h6");
    const nextPageURL = e.target.closest(".image-swapping p a")?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'image-swapping', 'columns-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', componentId, '', '', '', '');
  }
  if (e.target.closest('.image-swapping.variant-404 p a')) {
    const secondaryLink = e.target.closest('.image-swapping.variant-404 p a');
    const pageRegion = getPageRegion(e.target.closest('.image-swapping.variant-404 p a'));
    const componentIndex = getComponentIndex(e.target.closest('.image-swapping.variant-404 p a'));
    const ctaTitle = e.target.closest('.image-swapping.variant-404').querySelector("h1,h2,h3,h4,h5,h6");
    const nextPageURL = e.target.closest(".image-swapping.variant-404 p a")?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'image-swapping', 'columns-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', componentId, '', '', '', '');
  }
  if (e.target.closest('.variant-404 +.box-container p a')) {
    const secondaryLink = e.target.closest('.variant-404 +.box-container p a');
    const pageRegion = getPageRegion(e.target.closest('.variant-404 +.box-container p a'));
    const componentIndex = getComponentIndex(e.target.closest('.variant-404 +.box-container p a'));
    const ctaTitle = e.target.closest('.variant-404 +.box-container').querySelector("pf");
    const nextPageURL = e.target.closest(".variant-404 +.box-container p a")?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'image-swapping', 'columns-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', componentId, '', '', '', '');
  }
  if (e.target.closest('.section-with-bg:not(.variant-404)  p a')) {
    const secondaryLink = e.target.closest('.section-with-bg p a');
    const pageRegion = getPageRegion(e.target.closest('.section-with-bg p a'));
    const componentIndex = getComponentIndex(e.target.closest('.section-with-bg p a'));
    const ctaTitle = e.target.closest('.section-with-bg').querySelector("h1,h2,h3,h4,h5,h6");
    const nextPageURL = e.target.closest(".section-with-bg p a")?.getAttribute("href");
    const sectionEl = e.target.closest('.section');
    const componentId = sectionEl?.getAttribute('id') || "";
    ctaInteraction(pageRegion, minifyText(secondaryLink?.textContent), minifyText(ctaTitle?.textContent), '', 'image-swapping', 'columns-container', componentIndex, getPersona(), nextPageURL, 'cta-link', 'internal', 'quick-link', 'in-content', '', '', '', componentId, '', '', '', '');
  }
});
